import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpenText, CalendarDays, Loader2, Play, RotateCcw, Square, Volume2, Wand2 } from 'lucide-react';
import { DailyEnglishLesson, generateDailyEnglishLesson, getLocalDateKey } from '../services/dailyEnglishService';

interface DailyEnglishPageProps {
  onBack: () => void;
}

const STORAGE_PREFIX = 'sobkru69_daily_english_lesson';

const cacheKeyForDate = (dateKey: string) => `${STORAGE_PREFIX}_${dateKey}`;

const safeColor = (value: string, fallback: string) => {
  if (/^#[0-9a-f]{6}$/i.test(value || '')) {
    return value;
  }
  return fallback;
};

const escapeSvgText = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const makeCartoonSvg = (lesson: DailyEnglishLesson) => {
  const colorA = safeColor(lesson.cartoonScene.colorA, '#38bdf8');
  const colorB = safeColor(lesson.cartoonScene.colorB, '#fb923c');
  const objects = lesson.cartoonScene.keyObjects.slice(0, 3);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" aria-label="${escapeSvgText(lesson.title)}">
      <defs>
        <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${colorA}" stop-opacity=".22"/>
          <stop offset="1" stop-color="${colorB}" stop-opacity=".28"/>
        </linearGradient>
        <linearGradient id="ground" x1="0" x2="1">
          <stop offset="0" stop-color="#dcfce7"/>
          <stop offset="1" stop-color="#fef3c7"/>
        </linearGradient>
      </defs>
      <rect width="960" height="540" rx="42" fill="#ffffff"/>
      <rect x="24" y="24" width="912" height="492" rx="34" fill="url(#sky)"/>
      <circle cx="806" cy="112" r="54" fill="#facc15" opacity=".82"/>
      <path d="M24 390 C174 330 278 424 424 364 C584 298 710 374 936 326 L936 516 L24 516 Z" fill="url(#ground)"/>
      <path d="M94 352 C170 296 254 294 330 350" fill="none" stroke="#60a5fa" stroke-width="16" stroke-linecap="round" opacity=".55"/>
      <g transform="translate(414 132)">
        <rect x="0" y="90" width="184" height="142" rx="28" fill="#0f172a" opacity=".9"/>
        <rect x="24" y="114" width="136" height="92" rx="18" fill="#f8fafc"/>
        <path d="M40 140 H142 M40 164 H122 M40 188 H150" stroke="${colorA}" stroke-width="9" stroke-linecap="round"/>
        <circle cx="92" cy="44" r="48" fill="#fed7aa"/>
        <path d="M44 44 C58 -6 132 -2 146 44 C124 25 72 25 44 44Z" fill="#334155"/>
        <circle cx="74" cy="48" r="5" fill="#0f172a"/>
        <circle cx="110" cy="48" r="5" fill="#0f172a"/>
        <path d="M74 76 C88 88 102 88 116 76" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      </g>
      <g transform="translate(184 182) rotate(-7)">
        <rect x="0" y="0" width="174" height="218" rx="22" fill="#ffffff" stroke="#bfdbfe" stroke-width="8"/>
        <path d="M38 52 H136 M38 88 H112 M38 124 H132" stroke="${colorB}" stroke-width="10" stroke-linecap="round"/>
        <path d="M28 170 C72 142 110 142 150 170" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round"/>
      </g>
      <g transform="translate(640 226)">
        <rect x="0" y="0" width="154" height="104" rx="24" fill="#ffffff" stroke="#fde68a" stroke-width="8"/>
        <path d="M34 34 H118 M34 62 H92" stroke="#f97316" stroke-width="10" stroke-linecap="round"/>
        <circle cx="126" cy="78" r="16" fill="#fb7185"/>
      </g>
      <g transform="translate(112 78)">
        <rect x="0" y="0" width="296" height="84" rx="28" fill="#ffffff" opacity=".9"/>
        <text x="28" y="35" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#0f172a">${escapeSvgText(lesson.cartoonScene.setting.slice(0, 28))}</text>
        <text x="28" y="63" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#64748b">${escapeSvgText(lesson.cartoonScene.mood.slice(0, 34))}</text>
      </g>
      ${objects.map((object, index) => `
        <g transform="translate(${136 + index * 216} 442)">
          <circle cx="0" cy="0" r="28" fill="${index % 2 ? colorB : colorA}" opacity=".88"/>
          <text x="42" y="6" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#334155">${escapeSvgText(object.slice(0, 18))}</text>
        </g>
      `).join('')}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const pickEnglishVoice = () => {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find(voice => /^en[-_](US|GB|AU|CA)/i.test(voice.lang) && /female|natural|google|samantha|zira/i.test(voice.name))
    || voices.find(voice => /^en[-_]/i.test(voice.lang))
    || null;
};

const DailyEnglishPage: React.FC<DailyEnglishPageProps> = ({ onBack }) => {
  const [lesson, setLesson] = useState<DailyEnglishLesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const articleText = useMemo(() => lesson?.englishParagraphs.join('\n\n') || '', [lesson]);
  const cartoonSrc = useMemo(() => lesson ? makeCartoonSvg(lesson) : '', [lesson]);

  const loadLesson = async (force = false) => {
    setIsLoading(true);
    setError('');
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    try {
      const key = cacheKeyForDate(todayKey);
      if (!force) {
        const cached = localStorage.getItem(key);
        if (cached) {
          setLesson(JSON.parse(cached) as DailyEnglishLesson);
          setIsLoading(false);
          return;
        }
      }

      const nextLesson = await generateDailyEnglishLesson(todayKey);
      localStorage.setItem(key, JSON.stringify(nextLesson));
      setLesson(nextLesson);
    } catch (err: any) {
      setError(err?.message || 'สร้างบทเรียนภาษาอังกฤษไม่สำเร็จ');
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

      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-700">
            <CalendarDays className="h-4 w-4" />
            Daily English
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950">ฝึกภาษาอังกฤษประจำวัน</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            บทความใหม่ตามวัน พร้อมคำแปล คำศัพท์ และเสียงอ่านภาษาอังกฤษจากระบบของเบราว์เซอร์
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
            onClick={() => void loadLesson(true)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-2xl border border-sky-200 bg-white px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
            สร้างใหม่
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-sky-100 bg-white">
          <Loader2 className="mb-5 h-12 w-12 animate-spin text-sky-600" />
          <div className="text-lg font-black text-slate-900">Gemini กำลังสร้างบทเรียนวันนี้</div>
          <p className="mt-2 text-sm text-slate-500">บทความ คำแปล คำศัพท์ และภาพการ์ตูนจะถูกเตรียมพร้อมในหน้านี้</p>
        </div>
      ) : error ? (
        <div className="rounded-[28px] border border-red-100 bg-red-50 p-7 text-red-700">
          <div className="font-black">สร้างบทเรียนไม่สำเร็จ</div>
          <p className="mt-2 text-sm leading-6">{error}</p>
        </div>
      ) : lesson && (
        <div className="space-y-8">
          <section className="grid overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">{lesson.level}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{lesson.dateKey}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black leading-tight text-slate-950">{lesson.title}</h2>
              <div className="mt-7 space-y-5">
                {lesson.englishParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-8 text-slate-800">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 bg-slate-50/70 p-4 lg:border-l lg:border-t-0">
              <img src={cartoonSrc} alt={lesson.title} className="h-full min-h-[300px] w-full rounded-[26px] object-cover shadow-sm" />
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <BookOpenText className="h-6 w-6 text-sky-600" />
              <h3 className="text-2xl font-black text-slate-950">คำแปลภาษาไทย</h3>
            </div>
            <div className="space-y-5">
              {lesson.thaiParagraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-8 text-slate-600">
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
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Word</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">ความหมาย</th>
                    <th className="hidden px-4 py-3 md:table-cell">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.vocabulary.map((item, index) => (
                    <tr key={`${item.word}-${index}`} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-black text-slate-950">{item.word}</td>
                      <td className="px-4 py-3 text-slate-500">{item.partOfSpeech}</td>
                      <td className="px-4 py-3 text-slate-700">{item.meaningTh}</td>
                      <td className="hidden px-4 py-3 text-slate-500 md:table-cell">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="rounded-[28px] border border-sky-100 bg-sky-50 p-5 text-sm leading-6 text-sky-800">
            <div className="mb-1 flex items-center gap-2 font-black">
              <Wand2 className="h-4 w-4" />
              การสร้างอัตโนมัติ
            </div>
            ระบบจะใช้บทเรียนที่ cache ตามวันที่ในเครื่องผู้ใช้ ถ้าวันเปลี่ยนหลัง 00:00 แล้วเข้าหน้านี้ ระบบจะสร้างบทเรียนใหม่ของวันนั้นด้วย Gemini โดยอัตโนมัติ หรือกด “สร้างใหม่” เพื่อสุ่มใหม่ได้ทันที
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyEnglishPage;
