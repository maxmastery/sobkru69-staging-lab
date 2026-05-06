import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpenText, CalendarDays, Languages, Loader2, Play, RefreshCcw, Square, Volume2 } from 'lucide-react';
import { contentService, ContentDailyEnglishLesson } from '../services/contentService';

interface DailyEnglishPageProps {
  onBack: () => void;
}

const stripHtml = (value: string) => {
  if (typeof window !== 'undefined' && 'DOMParser' in window) {
    const doc = new DOMParser().parseFromString(value || '', 'text/html');
    return doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
  }

  return (value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
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

const pickEnglishVoice = () => {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find(voice => /^en[-_](US|GB|AU|CA)/i.test(voice.lang) && /female|natural|google|samantha|zira/i.test(voice.name))
    || voices.find(voice => /^en[-_]/i.test(voice.lang))
    || null;
};

const DailyEnglishPage: React.FC<DailyEnglishPageProps> = ({ onBack }) => {
  const [lesson, setLesson] = useState<ContentDailyEnglishLesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const articleText = useMemo(() => lesson ? stripHtml(lesson.content) : '', [lesson]);
  const translationParagraphs = useMemo(() => {
    if (!lesson?.translation) return [];
    return lesson.translation
      .split(/\n{2,}/)
      .map(item => item.trim())
      .filter(Boolean);
  }, [lesson]);

  const loadLesson = async () => {
    setIsLoading(true);
    setError('');
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    try {
      const latestLesson = await contentService.getLatestDailyEnglishLesson();
      setLesson(latestLesson);
    } catch (err: any) {
      console.error('Failed to load daily English lesson', err);
      setError(err?.message || 'โหลดบทเรียนภาษาอังกฤษไม่สำเร็จ');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadLesson();

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speakArticle = () => {
    if (!articleText || !('speechSynthesis' in window)) {
      setError('เบราว์เซอร์นี้ยังไม่รองรับการอ่านออกเสียง');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(articleText);
    const voice = pickEnglishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[56px] pb-14 animate-in fade-in duration-300">
      <button onClick={onBack} className="mb-7 inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold">
        <ArrowLeft className="w-5 h-5 mr-2" />
        กลับหน้าหลัก
      </button>

      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
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

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <button
            onClick={isSpeaking ? stopSpeech : speakArticle}
            disabled={!lesson || isLoading}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSpeaking ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isSpeaking ? 'หยุดอ่าน' : 'อ่านให้ฟัง'}
          </button>
          <button
            onClick={() => void loadLesson()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-black text-cyan-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            โหลดล่าสุด
          </button>
        </div>
      </header>

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
      ) : !lesson ? (
        <div className="rounded-[32px] border border-dashed border-cyan-200 bg-cyan-50/40 p-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-cyan-700 shadow-sm">
            <Languages className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">ยังไม่มีบทเรียนเผยแพร่</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">ผู้ดูแลสามารถสร้างบทเรียนได้จากหลังบ้านเมนู Daily English</p>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-700">บทเรียนประจำวัน</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">{formatDisplayDate(lesson.date)}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black leading-tight text-slate-950">{lesson.title}</h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="prose prose-slate max-w-none ql-editor-display">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <BookOpenText className="h-6 w-6 text-cyan-600" />
              <h3 className="text-2xl font-black text-slate-950">คำแปลภาษาไทย</h3>
            </div>
            <div className="space-y-5">
              {(translationParagraphs.length > 0 ? translationParagraphs : [lesson.translation]).map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-orange-500" />
                <h3 className="text-2xl font-black text-slate-950">คำศัพท์น่าสนใจ</h3>
              </div>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                {lesson.vocabulary.length} words
              </span>
            </div>
            {lesson.vocabulary.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    <tr>
                      <th className="w-[38%] px-4 py-3">Word</th>
                      <th className="px-4 py-3">คำแปล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.vocabulary.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-black text-slate-950">{item.word}</td>
                        <td className="whitespace-pre-line px-4 py-3 leading-7 text-slate-700">{item.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-bold text-slate-400">
                บทเรียนนี้ยังไม่มีคำศัพท์เพิ่มเติม
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default DailyEnglishPage;
