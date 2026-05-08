import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpenText, CalendarDays, Eye, Languages, Loader2, Play, RefreshCcw, Square, TableProperties, Volume2 } from 'lucide-react';
import { contentService, ContentDailyEnglishLesson, DailyEnglishSpeakerGender, DailyEnglishVocabularyItem } from '../services/contentService';

interface DailyEnglishPageProps {
  onBack: () => void;
}

type PageMode = 'list' | 'lesson' | 'vocabulary';

const VOCABULARY_PAGE_SIZE = 100;
const ARTICLE_WORD_PATTERN = /[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu;

const stripHtml = (value: string) => {
  if (typeof window !== 'undefined' && 'DOMParser' in window) {
    const doc = new DOMParser().parseFromString(value || '', 'text/html');
    return doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
  }

  return (value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};

const normalizeArticleHtml = (value: string) => (value || '')
  .replace(/&nbsp;|&#160;|\u00a0/gi, ' ')
  .replace(/white-space\s*:\s*nowrap;?/gi, '');

const styleStringToObject = (value: string): CSSProperties => {
  return value
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .reduce<CSSProperties>((styles, rule) => {
      const [rawKey, ...rawValue] = rule.split(':');
      const key = rawKey?.trim();
      const styleValue = rawValue.join(':').trim();
      if (!key || !styleValue || /^(white-space|word-break|overflow-wrap)$/i.test(key)) {
        return styles;
      }

      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return { ...styles, [camelKey]: styleValue };
    }, {});
};

const buildNaturalSpeechText = (value: string) => value
  .replace(/\s+/g, ' ')
  .replace(/\s*([,;:])\s*/g, '$1  ')
  .replace(/\s*([.!?])\s*/g, '$1   ')
  .trim();

const stripSpeakerPrefix = (value: string, speaker: string) => {
  const escapedSpeaker = speaker.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return value
    .replace(new RegExp(`^\\s*(?:${escapedSpeaker}|speaker\\s*\\d+)\\s*[:：-]\\s*`, 'i'), '')
    .trim();
};

const getWordStarts = (value: string) => {
  const starts: number[] = [];
  for (const match of value.matchAll(ARTICLE_WORD_PATTERN)) {
    starts.push(match.index || 0);
  }
  return starts;
};

const getWordIndexAtChar = (wordStarts: number[], charIndex: number) => {
  if (wordStarts.length === 0) return -1;
  let low = 0;
  let high = wordStarts.length - 1;
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (wordStarts[mid] <= charIndex) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
};

const renderHighlightedText = (
  text: string,
  wordCounter: { current: number },
  activeWordIndex: number,
  keyPrefix: string
) => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(ARTICLE_WORD_PATTERN)) {
    const word = match[0];
    const start = match.index || 0;
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const wordIndex = wordCounter.current;
    wordCounter.current += 1;
    nodes.push(
      <span
        key={`${keyPrefix}-${wordIndex}`}
        className={`rounded-[6px] px-0.5 transition-colors duration-150 ${
          activeWordIndex === wordIndex
            ? 'bg-sky-200 text-sky-950 shadow-[0_0_0_3px_rgba(125,211,252,0.45)]'
            : ''
        }`}
      >
        {word}
      </span>
    );
    lastIndex = start + word.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const renderArticleNode = (
  node: ChildNode,
  key: string,
  wordCounter: { current: number },
  activeWordIndex: number
): ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    return renderHighlightedText(node.textContent || '', wordCounter, activeWordIndex, key);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  if (tag === 'br') return <br key={key} />;

  const allowedTags = new Set([
    'a', 'b', 'blockquote', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'i',
    'li', 'mark', 'ol', 'p', 'span', 'strong', 'u', 'ul',
  ]);
  const children = Array.from(element.childNodes).map((child, index) =>
    renderArticleNode(child, `${key}-${index}`, wordCounter, activeWordIndex)
  );

  if (!allowedTags.has(tag)) {
    return <React.Fragment key={key}>{children}</React.Fragment>;
  }

  const props: Record<string, unknown> = { key };
  const className = element.getAttribute('class');
  const style = styleStringToObject(element.getAttribute('style') || '');
  if (className) props.className = className;
  if (Object.keys(style).length > 0) props.style = style;
  if (tag === 'a') {
    props.href = element.getAttribute('href') || '#';
    props.target = '_blank';
    props.rel = 'noreferrer';
  }

  return React.createElement(tag, props, children);
};

const renderArticleWithWordHighlights = (html: string, activeWordIndex: number) => {
  if (typeof window === 'undefined' || !('DOMParser' in window)) {
    return stripHtml(html);
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const wordCounter = { current: 0 };
  return Array.from(doc.body.childNodes).map((node, index) =>
    renderArticleNode(node, `article-${index}`, wordCounter, activeWordIndex)
  );
};

const renderDialogueWithWordHighlights = (
  lines: ContentDailyEnglishLesson['dialogueLines'],
  activeWordIndex: number
) => {
  if (typeof window === 'undefined' || !('DOMParser' in window)) {
    return lines.map(line => (
      <div key={line.id}>
        <strong>{line.speaker}: </strong>
        {stripHtml(line.content)}
      </div>
    ));
  }

  const wordCounter = { current: 0 };
  return lines.map((line, index) => {
    const doc = new DOMParser().parseFromString(normalizeArticleHtml(line.content), 'text/html');
    return (
      <div key={line.id} className="my-2 grid gap-2 md:grid-cols-[128px_minmax(0,1fr)] md:items-start">
        <div className="inline-flex items-center gap-2 text-sm font-black text-cyan-700">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-xs text-white">{index + 1}</span>
          {line.speaker}
        </div>
        <div className="min-w-0 leading-8 text-slate-700">
          {Array.from(doc.body.childNodes).map((node, childIndex) =>
            renderArticleNode(node, `dialogue-${line.id}-${childIndex}`, wordCounter, activeWordIndex)
          )}
        </div>
      </div>
    );
  });
};

const formatDisplayDate = (value: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getTodayKey = () => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const splitVocabulary = (item: DailyEnglishVocabularyItem) => {
  const match = item.word.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return {
    word: (match?.[1] || item.word).trim(),
    type: (item.type || match?.[2] || '-').trim(),
    meaning: item.meaning,
  };
};

const getEnglishVoices = () => {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const scoreVoice = (voice: SpeechSynthesisVoice) => {
    const name = voice.name.toLowerCase();
    const langScore = /^en[-_](US|GB|AU|CA)/i.test(voice.lang) ? 20 : /^en[-_]/i.test(voice.lang) ? 10 : -100;
    const premiumScore = /google|microsoft|natural|neural|samantha|alex|daniel|karen|moira|aria|jenny|guy/i.test(voice.name) ? 12 : 0;
    const localScore = voice.localService ? 3 : 0;
    const penalty = /compact|novelty|whisper|bad news|bells|boing|bubbles|cellos|deranged|hysterical|pipe organ|trinoids|zarvox/i.test(name) ? 50 : 0;
    return langScore + premiumScore + localScore - penalty;
  };

  return voices
    .filter(voice => /^en[-_]/i.test(voice.lang))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));
};

const pickEnglishVoice = (index = 0, gender?: DailyEnglishSpeakerGender) => {
  const voices = getEnglishVoices();
  const preferredFemale = /samantha|karen|moira|victoria|allison|ava|serena|tessa|veena|zira|aria|jenny|susan|female/i;
  const preferredMale = /alex|daniel|guy|david|mark|fred|tom|arthur|george|oliver|rishi|male/i;
  const genderVoices = gender
    ? voices.filter(voice => (gender === 'male' ? preferredMale : preferredFemale).test(voice.name))
    : [];
  const naturalVoice = voices.find(voice => /google|microsoft|natural|neural|samantha|alex|daniel|karen|moira|aria|jenny|guy/i.test(voice.name));
  return genderVoices[index % Math.max(genderVoices.length, 1)]
    || voices[index % Math.max(Math.min(voices.length, 4), 1)]
    || naturalVoice
    || null;
};

const getLessonPreviewText = (lesson: ContentDailyEnglishLesson) => {
  if (lesson.lessonType === 'dialogue' && lesson.dialogueLines.length > 0) {
    return lesson.dialogueLines.map(line => `${line.speaker}: ${stripHtml(line.content)}`).join(' ');
  }

  return stripHtml(lesson.content);
};

const DailyEnglishPage: React.FC<DailyEnglishPageProps> = ({ onBack }) => {
  const [lessons, setLessons] = useState<ContentDailyEnglishLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [mode, setMode] = useState<PageMode>('list');
  const [vocabularyPage, setVocabularyPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const speechRunIdRef = useRef(0);
  const todayKey = useMemo(() => getTodayKey(), []);
  const selectedLesson = useMemo(
    () => lessons.find(item => item.id === selectedLessonId) || null,
    [lessons, selectedLessonId]
  );
  const articleHtml = useMemo(() => selectedLesson ? normalizeArticleHtml(selectedLesson.content) : '', [selectedLesson]);
  const articleText = useMemo(() => articleHtml ? stripHtml(articleHtml) : '', [articleHtml]);
  const speechSegments = useMemo(() => {
    if (!selectedLesson) return [];
    const source = selectedLesson.lessonType === 'dialogue'
      ? selectedLesson.dialogueLines
          .filter(line => stripHtml(line.content))
          .map((line) => ({
            voiceIndex: Math.max(0, selectedLesson.dialogueSpeakers.findIndex(speaker => speaker === line.speaker)),
            voiceGender: selectedLesson.dialogueSpeakerProfiles.find(speaker => speaker.name === line.speaker)?.gender,
            text: buildNaturalSpeechText(stripSpeakerPrefix(stripHtml(line.content), line.speaker)),
          }))
      : [{
          voiceIndex: 0,
          voiceGender: undefined,
          text: buildNaturalSpeechText(articleText),
        }];

    let wordOffset = 0;
    return source
      .filter(segment => segment.text)
      .map(segment => {
        const wordStarts = getWordStarts(segment.text);
        const next = { ...segment, wordStarts, wordOffset };
        wordOffset += wordStarts.length;
        return next;
      });
  }, [articleText, selectedLesson]);
  const renderedArticle = useMemo(
    () => selectedLesson?.lessonType === 'dialogue'
      ? renderDialogueWithWordHighlights(selectedLesson.dialogueLines, activeWordIndex)
      : renderArticleWithWordHighlights(articleHtml, activeWordIndex),
    [articleHtml, activeWordIndex, selectedLesson]
  );
  const translationParagraphs = useMemo(() => {
    if (!selectedLesson?.translation) return [];
    return selectedLesson.translation
      .split(/\n{2,}/)
      .map(item => item.trim())
      .filter(Boolean);
  }, [selectedLesson]);
  const allVocabulary = useMemo(() => lessons.flatMap(lesson =>
    lesson.vocabulary.map(item => ({
      lesson,
      vocabulary: splitVocabulary(item),
    }))
  ), [lessons]);
  const vocabularyTotalPages = Math.max(1, Math.ceil(allVocabulary.length / VOCABULARY_PAGE_SIZE));
  const visibleVocabulary = allVocabulary.slice(
    (vocabularyPage - 1) * VOCABULARY_PAGE_SIZE,
    vocabularyPage * VOCABULARY_PAGE_SIZE
  );

  const loadLessons = async () => {
    setIsLoading(true);
    setError('');
    speechRunIdRef.current += 1;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setActiveWordIndex(-1);

    try {
      const publishedLessons = (await contentService.getDailyEnglishLessons())
        .filter(item => item.status === 'published');
      setLessons(publishedLessons);
    } catch (err: any) {
      console.error('Failed to load daily English lesson', err);
      setError(err?.message || 'โหลดบทเรียนภาษาอังกฤษไม่สำเร็จ');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadLessons();

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const openLesson = (id: string) => {
    speechRunIdRef.current += 1;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setActiveWordIndex(-1);
    setSelectedLessonId(id);
    setMode('lesson');
    void contentService.recordContentView('daily_english', id);
  };

  const showList = () => {
    speechRunIdRef.current += 1;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setActiveWordIndex(-1);
    setMode('list');
  };

  const speakArticle = () => {
    if (speechSegments.length === 0 || !('speechSynthesis' in window)) {
      setError('เบราว์เซอร์นี้ยังไม่รองรับการอ่านออกเสียง');
      return;
    }

    const runId = speechRunIdRef.current + 1;
    speechRunIdRef.current = runId;
    window.speechSynthesis.cancel();
    setActiveWordIndex(-1);
    setIsSpeaking(true);

    const speakSegment = (index: number) => {
      if (speechRunIdRef.current !== runId) return;
      const segment = speechSegments[index];
      if (!segment) {
        setIsSpeaking(false);
        setActiveWordIndex(-1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(segment.text);
      const voice = pickEnglishVoice(segment.voiceIndex, segment.voiceGender);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      utterance.rate = 0.82;
      utterance.pitch = segment.voiceGender === 'male' ? 0.92 : 1.02;
      utterance.volume = 1;
      utterance.onboundary = (event) => {
        if (event.charIndex < 0) return;
        const nextWordIndex = getWordIndexAtChar(segment.wordStarts, event.charIndex);
        if (nextWordIndex >= 0) {
          setActiveWordIndex(segment.wordOffset + nextWordIndex);
        }
      };
      utterance.onend = () => speakSegment(index + 1);
      utterance.onerror = () => speakSegment(index + 1);
      window.speechSynthesis.speak(utterance);
    };

    speakSegment(0);
  };

  const stopSpeech = () => {
    speechRunIdRef.current += 1;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setActiveWordIndex(-1);
  };

  const renderVocabularyTable = (items: Array<{ vocabulary: ReturnType<typeof splitVocabulary> }>) => (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="w-full table-fixed border-collapse text-left text-base md:text-lg">
        <colgroup>
          <col className="w-1/3" />
          <col className="w-1/3" />
          <col className="w-1/3" />
        </colgroup>
        <thead className="bg-slate-950 text-sm font-black uppercase tracking-[0.18em] text-white">
          <tr>
            <th className="px-5 py-5 md:px-7">Vocabulary</th>
            <th className="px-5 py-5 md:px-7">Type</th>
            <th className="px-5 py-5 pl-14 md:px-7 md:pl-20">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ vocabulary }, index) => (
            <tr key={`${vocabulary.word}-${index}`} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'} border-t border-slate-100`}>
              <td className="px-5 py-5 font-black leading-8 text-slate-950 md:px-7">{vocabulary.word}</td>
              <td className="px-5 py-5 md:px-7">
                <span className="rounded-full bg-cyan-50 px-3.5 py-1.5 text-sm font-black leading-none text-cyan-700">
                  {vocabulary.type}
                </span>
              </td>
              <td className="whitespace-pre-line px-5 py-5 pl-14 font-semibold leading-8 text-slate-700 md:px-7 md:pl-20">{vocabulary.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHeader = () => (
    <>
      <button onClick={mode === 'list' ? onBack : showList} className="mb-7 inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold">
        <ArrowLeft className="w-5 h-5 mr-2" />
        {mode === 'list' ? 'กลับหน้าหลัก' : 'กลับหน้าเลือกบทเรียน'}
      </button>

      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
            <CalendarDays className="h-4 w-4" />
            Daily English
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950">ฝึกภาษาอังกฤษประจำวัน</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            บทเรียนภาษาอังกฤษจากผู้ดูแล พร้อมคำแปลไทยและตารางคำศัพท์สำหรับทบทวน
          </p>
        </div>

        {mode === 'list' && (
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <button
              onClick={() => {
                setVocabularyPage(1);
                setMode('vocabulary');
              }}
              disabled={allVocabulary.length === 0}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <TableProperties className="h-4 w-4" />
              คำศัพท์ทั้งหมด
            </button>
            <button
              onClick={() => void loadLessons()}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-black text-cyan-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              โหลดล่าสุด
            </button>
          </div>
        )}

      </header>
    </>
  );

  const renderList = () => (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-950">เลือกบทเรียน</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">บทเรียนล่าสุดจะอยู่มุมซ้ายบนเสมอ</p>
        </div>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
          {lessons.length} lessons
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {lessons.map((item, index) => {
          const isToday = item.date === todayKey;
          const preview = getLessonPreviewText(item);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => openLesson(item.id)}
              className="group min-h-[154px] rounded-3xl border border-slate-200 bg-white/55 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:ring-4 hover:ring-cyan-100"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${isToday ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {isToday ? 'Today' : formatDisplayDate(item.date)}
                </span>
                {index === 0 && (
                  <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-black text-white">
                    ล่าสุด
                  </span>
                )}
              </div>
            <h3 className="line-clamp-2 text-base font-black leading-snug text-slate-950 group-hover:text-cyan-700">
                {item.title || 'ไม่มีหัวข้อ'}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {preview || 'ยังไม่มีตัวอย่างเนื้อหา'}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-slate-400">
                <Eye className="h-3.5 w-3.5" />
                {item.viewCount} reads
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );

  const renderLesson = () => {
    if (!selectedLesson) return null;
    const vocabularyItems = selectedLesson.vocabulary.map(item => ({ vocabulary: splitVocabulary(item) }));

    return (
      <div className="space-y-8">
        {selectedLesson.imageUrl && (
          <div className="rounded-[30px] border border-slate-200 bg-white p-2">
            <img src={selectedLesson.imageUrl} alt={selectedLesson.title} className="mx-auto max-h-[520px] w-full object-contain" />
          </div>
        )}

        <section className="overflow-visible border-t border-slate-200 pt-7">
          <div className="border-b border-slate-200 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-700">บทเรียนประจำวัน</span>
              {selectedLesson.date === todayKey && <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">Today</span>}
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">{formatDisplayDate(selectedLesson.date)}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                <Eye className="h-3.5 w-3.5" />
                {selectedLesson.viewCount} reads
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black leading-tight text-slate-950">{selectedLesson.title}</h2>
          </div>
          <div className="flex justify-center border-b border-slate-200 py-4">
            <button
              onClick={isSpeaking ? stopSpeech : speakArticle}
              disabled={!selectedLesson}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSpeaking ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isSpeaking ? 'หยุดอ่าน' : 'อ่านให้ฟัง'}
            </button>
          </div>
          <div className="py-6 md:py-8">
            <div className="prose prose-slate min-w-0 max-w-none overflow-x-hidden leading-8 text-slate-700 [hyphens:none] [overflow-wrap:normal] [white-space:normal] [word-break:normal] [&_*]:min-w-0 [&_*]:max-w-full [&_*]:whitespace-normal [&_*]:[hyphens:none] [&_*]:[overflow-wrap:normal] [&_*]:[word-break:normal] ql-editor-display">
              <div>{renderedArticle}</div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-7">
          <div className="mb-5 flex items-center gap-3">
            <BookOpenText className="h-6 w-6 text-cyan-600" />
            <h3 className="text-2xl font-black text-slate-950">คำแปลภาษาไทย</h3>
          </div>
          <div className="space-y-5">
            {(translationParagraphs.length > 0 ? translationParagraphs : [selectedLesson.translation]).map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line text-base leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-orange-500" />
              <h3 className="text-2xl font-black text-slate-950">คำศัพท์น่าสนใจ</h3>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
              {selectedLesson.vocabulary.length} words
            </span>
          </div>
          {selectedLesson.vocabulary.length > 0 ? (
            renderVocabularyTable(vocabularyItems)
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-bold text-slate-400">
              บทเรียนนี้ยังไม่มีคำศัพท์เพิ่มเติม
            </div>
          )}
        </section>
      </div>
    );
  };

  const renderAllVocabulary = () => {
    return (
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">คำศัพท์ทั้งหมด</h2>
            <p className="mt-1 text-sm text-slate-500">รวมคำศัพท์จากทุกบทเรียน แสดงหน้าละ {VOCABULARY_PAGE_SIZE} คำ</p>
          </div>
          <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">
            {allVocabulary.length} words
          </span>
        </div>

        <div className="space-y-6">
          {visibleVocabulary.reduce<Array<{ lesson: ContentDailyEnglishLesson; items: Array<{ vocabulary: ReturnType<typeof splitVocabulary> }> }>>((groups, item) => {
            const current = groups[groups.length - 1];
            if (current?.lesson.id === item.lesson.id) {
              current.items.push({ vocabulary: item.vocabulary });
            } else {
              groups.push({ lesson: item.lesson, items: [{ vocabulary: item.vocabulary }] });
            }
            return groups;
          }, []).map(group => (
            <div key={group.lesson.id} className="space-y-3">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 px-5 py-4">
                <h3 className="font-black text-slate-950">{group.lesson.title}</h3>
                <p className="mt-1 text-sm font-bold text-cyan-700">{formatDisplayDate(group.lesson.date)}</p>
              </div>
              {renderVocabularyTable(group.items)}
            </div>
          ))}
        </div>

        {allVocabulary.length > VOCABULARY_PAGE_SIZE && (
          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              disabled={vocabularyPage <= 1}
              onClick={() => setVocabularyPage(page => Math.max(1, page - 1))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-600 disabled:opacity-40"
            >
              ก่อนหน้า
            </button>
            <span className="text-sm font-black text-slate-500">
              หน้า {vocabularyPage} / {vocabularyTotalPages}
            </span>
            <button
              type="button"
              disabled={vocabularyPage >= vocabularyTotalPages}
              onClick={() => setVocabularyPage(page => Math.min(vocabularyTotalPages, page + 1))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-600 disabled:opacity-40"
            >
              ถัดไป
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[56px] pb-14 animate-in fade-in duration-300">
      {renderHeader()}

      {isLoading ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-cyan-100 bg-white">
          <Loader2 className="mb-5 h-12 w-12 animate-spin text-cyan-600" />
          <div className="text-lg font-black text-slate-900">กำลังโหลดบทเรียนภาษาอังกฤษ</div>
          <p className="mt-2 text-sm text-slate-500">กำลังดึงบทเรียนล่าสุดจากระบบหลังบ้าน</p>
        </div>
      ) : error ? (
        <div className="rounded-[28px] border border-red-100 bg-red-50 p-7 text-red-700">
          <div className="font-black">โหลดบทเรียนไม่สำเร็จ</div>
          <p className="mt-2 text-sm leading-6">{error}</p>
        </div>
      ) : lessons.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-cyan-200 bg-cyan-50/40 p-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-cyan-700 shadow-sm">
            <Languages className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">ยังไม่มีบทเรียนเผยแพร่</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">ผู้ดูแลสามารถสร้างบทเรียนได้จากหลังบ้านเมนู Daily English</p>
        </div>
      ) : mode === 'lesson' ? (
        renderLesson()
      ) : mode === 'vocabulary' ? (
        renderAllVocabulary()
      ) : (
        renderList()
      )}
    </div>
  );
};

export default DailyEnglishPage;
