import React, { useState } from 'react';
import {
  BadgeCheck,
  BookOpenCheck,
  Check,
  ClipboardCheck,
  GraduationCap,
  Monitor,
  PenLine,
  Play,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { FeatureTheme } from './FeatureThemeToggle';
import type { SubTopic } from '../types';
import WorldContextSufficiencyLesson from './WorldContextSufficiencyLesson';

interface TeacherLicenseMockupProps {
  onBackToSelector: () => void;
  theme?: FeatureTheme;
}

const HERO_IMAGE_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/krutoppic%202.png';

const licenseLessons = [
  {
    id: 'world-context',
    title: 'บริบทโลกและเศรษฐกิจพอเพียง',
    description: 'การเปลี่ยนแปลงของโลก สังคม และแนวคิดปรัชญาเศรษฐกิจพอเพียงที่เชื่อมกับความเป็นครู',
    icon: GraduationCap,
    accent: 'from-amber-300 to-orange-400',
  },
  {
    id: 'psychology',
    title: 'จิตวิทยาสำหรับครู',
    description: 'จิตวิทยาพัฒนาการ จิตวิทยาการศึกษา การแนะแนว และการดูแลผู้เรียนตามศักยภาพ',
    icon: BadgeCheck,
    accent: 'from-rose-300 to-pink-400',
  },
  {
    id: 'curriculum-pedagogy',
    title: 'หลักสูตรและศาสตร์การสอน',
    description: 'การออกแบบหลักสูตร แผนการจัดการเรียนรู้ วิธีสอน และการจัดกิจกรรมในชั้นเรียน',
    icon: BookOpenCheck,
    accent: 'from-violet-300 to-indigo-400',
  },
  {
    id: 'assessment-research',
    title: 'วัดผล วิจัย และพัฒนาผู้เรียน',
    description: 'การวัดประเมินผล การใช้ข้อมูล และการวิจัยเพื่อแก้ปัญหาและพัฒนาผู้เรียน',
    icon: ClipboardCheck,
    accent: 'from-sky-300 to-cyan-400',
  },
  {
    id: 'quality-assurance',
    title: 'ประกันคุณภาพการศึกษา',
    description: 'การออกแบบและดำเนินงานประกันคุณภาพในสถานศึกษาให้สอดคล้องมาตรฐาน',
    icon: ShieldCheck,
    accent: 'from-emerald-300 to-teal-400',
  },
  {
    id: 'digital-technology',
    title: 'เทคโนโลยีดิจิทัล',
    description: 'การใช้เทคโนโลยี สื่อ และนวัตกรรมดิจิทัลเพื่อสนับสนุนการจัดการเรียนรู้',
    icon: Monitor,
    accent: 'from-fuchsia-300 to-purple-400',
  },
];

const worldContextLicenseTopic: SubTopic = {
  id: 'TL-1-world-context-sufficiency',
  title: 'บริบทโลกและเศรษฐกิจพอเพียง',
  description: 'การเปลี่ยนแปลงบริบทโลก สังคม และแนวคิดปรัชญาเศรษฐกิจพอเพียง สำหรับสนามสอบใบประกอบวิชาชีพครู',
  promptContext: 'สนามสอบใบประกอบวิชาชีพครู บริบทโลก สังคม และเศรษฐกิจพอเพียง',
  contentPath: '/content/teacher-license/world-context-sufficiency.md',
  chapters: [],
};

const readinessItems = [
  { label: 'Lessons', value: '6', caption: 'บทเรียนหลัก' },
  { label: 'Progress', value: '0%', caption: 'รอเริ่มบทเรียน' },
  { label: 'Exam Mode', value: 'Soon', caption: 'สนามสอบถัดไป' },
];

const TeacherLicenseMockup: React.FC<TeacherLicenseMockupProps> = ({ theme = 'dark' }) => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const isDark = theme === 'dark';
  const pageClass = isDark
    ? 'bg-slate-950 text-white'
    : 'bg-white text-slate-950';
  const mutedText = isDark ? 'text-white/64' : 'text-slate-600';
  const heroStatusClass = isDark
    ? 'border-white/10 bg-white/[.06] text-white'
    : 'border-white/70 bg-white/60 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,.12)]';
  const surfaceClass = isDark
    ? 'border-white/10 bg-white/[.06] text-white'
    : 'border-slate-200 bg-white text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,.08)]';
  const lessonCardClass = isDark
    ? 'border-white/10 bg-white/[.07] text-white'
    : 'border-slate-200 bg-white text-slate-950 shadow-xl shadow-slate-200/60';

  if (activeLessonId === 'world-context') {
    return (
      <WorldContextSufficiencyLesson
        topic={worldContextLicenseTopic}
        onBack={() => setActiveLessonId(null)}
        theme="light"
        examLabel="สนามสอบใบประกอบวิชาชีพครู"
        backLabel="กลับสู่สนามสอบใบประกอบฯ"
      />
    );
  }

  return (
    <div className={`teacher-license-page teacher-license-page--${theme} min-h-screen transition-colors duration-500 ${pageClass}`}>
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden px-4 py-7 md:px-8 md:py-10">
        <img
          src={HERO_IMAGE_URL}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`teacher-license-hero-overlay absolute inset-0 ${
            isDark
              ? 'bg-[linear-gradient(90deg,rgba(2,6,23,.96)_0%,rgba(2,6,23,.82)_42%,rgba(2,6,23,.42)_74%,rgba(2,6,23,.76)_100%)]'
              : 'bg-[linear-gradient(90deg,rgba(255,255,255,.97)_0%,rgba(255,255,255,.88)_42%,rgba(255,255,255,.40)_72%,rgba(15,23,42,.12)_100%)]'
          }`}
        />

        <div className="relative mx-auto grid min-h-[calc(100svh-128px)] max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <motion.div
            className="max-w-3xl text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p
              className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${
                isDark
                  ? 'border-amber-200/25 bg-amber-300/10 text-amber-200'
                  : 'border-slate-950 bg-transparent text-slate-950'
              }`}
            >
              <Target className="h-4 w-4" />
              Teacher License Arena
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              สนามสอบใบประกอบวิชาชีพครู
            </h1>
            <p className={`mt-5 max-w-2xl text-base font-semibold leading-8 ${mutedText} lg:mx-0 mx-auto`}>
              หน้าหลักหลักสูตรใบประกอบฯ สำหรับวางระบบบทเรียนและสนามสอบจริง โครงสร้างแรกเปิดเป็น 6 เรื่องก่อน
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-stretch">
              <a
                href="#license-lessons"
                className="inline-flex min-h-12 w-[260px] max-w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3 font-black text-slate-950 shadow-[0_18px_50px_rgba(251,191,36,.24)] transition hover:-translate-y-0.5 hover:bg-amber-300 lg:w-auto"
              >
                <Play className="h-5 w-5 fill-current" />
                ดูบทเรียน
              </a>
              <button
                type="button"
                className={`teacher-license-exam-button inline-flex min-h-12 w-[260px] max-w-full items-center justify-center gap-3 rounded-full border px-6 py-3 font-black transition lg:w-auto ${
                  isDark
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-slate-950 bg-transparent text-slate-950 hover:bg-transparent hover:shadow-[0_10px_24px_rgba(15,23,42,.10)]'
                }`}
              >
                สนามสอบเสมือนจริง
                <PenLine className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            className={`teacher-license-status-card rounded-[28px] border p-5 backdrop-blur-xl ${heroStatusClass}`}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.62, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={`text-xs font-black uppercase tracking-[0.18em] ${isDark ? 'text-white/45' : 'text-slate-950/65'}`}>
                  Course Status
                </div>
                <div className={`mt-3 whitespace-nowrap text-3xl font-black uppercase tracking-[0.035em] sm:text-4xl sm:tracking-[0.06em] md:text-5xl ${
                  isDark
                    ? 'bg-gradient-to-r from-white via-amber-200 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_7px_rgba(251,191,36,.22)]'
                    : 'text-slate-950'
                }`}>
                  Completed 0%
                </div>
              </div>
              <div className={`teacher-license-status-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${isDark ? 'border-amber-200/20 bg-amber-300/10' : 'border-white/70 bg-white/65'}`}>
                <Check className={`h-9 w-9 ${isDark ? 'text-amber-200' : 'text-slate-950'}`} strokeWidth={3.2} />
              </div>
            </div>

            <div className={`mt-6 h-4 overflow-hidden rounded-full ring-1 ${isDark ? 'bg-slate-950/15 ring-white/10' : 'bg-slate-950/14 ring-slate-950/10'}`}>
              <div className={`h-full w-0 rounded-full ${isDark ? 'bg-gradient-to-r from-amber-300 to-orange-400 shadow-[0_0_20px_rgba(250,204,21,.42)]' : 'bg-slate-950'}`} />
            </div>
            <p className={`mt-3 text-sm font-bold leading-6 ${isDark ? mutedText : 'text-slate-950/75'}`}>
              ระบบใบประกอบฯ จะใช้โครงเดียวกับครูผู้ช่วย: บทเรียน ความคืบหน้า ข้อสอบ และสถิติเพื่อวัดความพร้อมจริง
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {readinessItems.map(item => (
                <div key={item.label} className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-950/35' : 'bg-white/42'}`}>
                  <div className="text-lg font-black">{item.value}</div>
                  <div className={`mt-1 text-[11px] font-black uppercase tracking-[0.14em] ${isDark ? 'text-white/42' : 'text-slate-950/60'}`}>{item.label}</div>
                  <div className={`mt-1 text-xs font-bold ${isDark ? 'text-white/55' : 'text-slate-950/62'}`}>{item.caption}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main id="license-lessons" className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <section>
          <div className="mb-6 flex flex-col gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-400">License Curriculum</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">บทเรียน 6 เรื่อง</h2>
            </div>
            <p className={`mx-auto max-w-xl text-sm font-semibold leading-7 md:mx-0 md:text-right ${mutedText}`}>
              วางหัวข้อหลักไว้ก่อนเพื่อเตรียมต่อบทเรียนจริง แบบทดสอบ และระบบเก็บความคืบหน้า
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {licenseLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              const isOpenable = lesson.id === 'world-context';

              return (
                <motion.button
                  key={lesson.title}
                  type="button"
                  disabled={!isOpenable}
                  onClick={() => isOpenable && setActiveLessonId(lesson.id)}
                  aria-label={isOpenable ? `เปิดบทเรียน ${lesson.title}` : `${lesson.title} ยังไม่เปิดใช้งาน`}
                  className={`topic-section-card teacher-license-lesson-card group relative min-h-[300px] overflow-hidden rounded-[30px] border ring-1 ring-amber-300/15 backdrop-blur-xl transition-[transform,opacity,filter,border-color,background-color,box-shadow] duration-300 ease-out hover:z-20 md:min-h-[350px] ${isOpenable ? 'cursor-pointer hover:-translate-y-1 hover:border-amber-300/55' : 'cursor-default'} ${lessonCardClass}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.18) }}
                >
                  <div className="topic-section-card-sheen pointer-events-none absolute inset-0 opacity-70" />
                  <div className="topic-section-card-orb pointer-events-none absolute left-1/2 top-[32%] h-36 w-36 -translate-x-1/2 rounded-full opacity-70 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-100" />

                  <div className="teacher-license-lesson-shell relative flex min-h-[inherit] w-full flex-col p-6 md:p-7">
                    <div className="topic-section-card-main teacher-license-lesson-main flex flex-1 flex-col items-center justify-center gap-9 text-center transition-transform duration-500">
                      <div className="teacher-license-lesson-icon flex items-center justify-center transition-all duration-300">
                        <Icon className="h-9 w-9 transition-all duration-300" />
                      </div>

                      <h3 className={`teacher-license-lesson-title max-w-[24rem] text-center text-2xl font-black leading-tight transition-all duration-300 md:text-3xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {lesson.title}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className={`mt-8 overflow-hidden rounded-3xl border p-6 md:p-8 ${surfaceClass}`}>
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-400">Next Build</p>
              <h2 className="mt-2 text-3xl font-black">พร้อมต่อระบบบทเรียนจริงและข้อสอบใบประกอบฯ</h2>
              <p className={`mt-3 max-w-2xl text-sm font-semibold leading-7 ${mutedText}`}>
                หน้าแรกนี้วางโครงสนามสอบไว้แล้ว รอบถัดไปสามารถเติมเนื้อหา บทเรียนย่อย แบบทดสอบ และระบบสถิติได้ทันที
              </p>
            </div>
            <div className={`inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-black ${isDark ? 'bg-white/10 text-white' : 'bg-slate-950 text-white'}`}>
              <BookOpenCheck className="h-5 w-5" />
              6 Lessons Ready
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherLicenseMockup;
