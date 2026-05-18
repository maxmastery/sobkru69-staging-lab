import React, { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, BookOpenCheck, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type ExamTrack = 'teacher-assistant' | 'teacher-license';

interface ExamTrackSelectionProps {
  userName?: string;
  onSelect: (track: ExamTrack) => void;
}

const tracks = [
  {
    id: 'teacher-assistant' as const,
    title: 'บรรจุครูผู้ช่วย',
    subtitle: 'เส้นทางหลักของระบบ Sobkru ตอนนี้',
    body: 'เรียนภาค ก ภาค ข ภาค ค ทำโจทย์ และวัดอัตราการสอบติดจากความคืบหน้าจริง',
    imageUrl: 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/krutoppic.png',
    icon: ShieldCheck,
    cta: 'เลือกสายครูผู้ช่วย',
    disabled: false,
  },
  {
    id: 'teacher-license' as const,
    title: 'ใบประกอบวิชาชีพครู',
    subtitle: 'พื้นที่เตรียมสอบใบประกอบฯ',
    body: 'โครงสร้างบทเรียนสำหรับสอบใบประกอบวิชาชีพครู เตรียมไว้สำหรับการพัฒนาชุดถัดไป',
    imageUrl: 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/krutoppic%202.png',
    icon: BadgeCheck,
    cta: 'กำลังมาเร็ว ๆ นี้',
    disabled: true,
  },
];

const ExamTrackSelection: React.FC<ExamTrackSelectionProps> = ({ userName, onSelect }) => {
  const [launchTrackId, setLaunchTrackId] = useState<ExamTrack | null>(null);
  const launchTrack = tracks.find(track => track.id === launchTrackId);

  useEffect(() => {
    if (!launchTrackId) return;
    const timer = window.setTimeout(() => onSelect(launchTrackId), 1200);
    return () => window.clearTimeout(timer);
  }, [launchTrackId, onSelect]);

  const handleSelectTrack = (track: typeof tracks[number]) => {
    if (track.disabled || launchTrackId) return;
    setLaunchTrackId(track.id);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white md:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,.16),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(14,165,233,.12),transparent_30%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-200">
            <BookOpenCheck className="h-4 w-4" />
            Select Exam Track
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">เลือกสนามสอบของคุณ</h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {tracks.map(track => {
            const content = (
              <>
                <img src={track.imageUrl} alt={track.title} className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${track.disabled ? 'grayscale opacity-60 saturate-75' : 'group-hover:scale-105'}`} />
                <div className={`absolute inset-0 ${track.disabled ? 'bg-[linear-gradient(90deg,rgba(2,6,23,.78)_0%,rgba(2,6,23,.56)_42%,rgba(2,6,23,.28)_78%,rgba(2,6,23,.18)_100%)]' : 'bg-[linear-gradient(90deg,rgba(2,6,23,.94)_0%,rgba(2,6,23,.78)_38%,rgba(2,6,23,.2)_70%,rgba(2,6,23,.1)_100%)]'}`} />
                <div className="relative flex h-full max-w-[58%] flex-col justify-between p-6 md:p-8">
                  <div>
                    <track.icon className={`h-9 w-9 ${track.disabled ? 'text-white/75' : 'text-amber-300'}`} />
                    <p className={`mt-8 text-xs font-black uppercase tracking-[0.2em] ${track.disabled ? 'text-white/65' : 'text-amber-200/85'}`}>{track.subtitle}</p>
                    <h2 className={`mt-3 text-3xl font-black leading-tight md:text-5xl ${track.disabled ? 'text-white/85' : 'text-white'}`}>{track.title}</h2>
                    <p className={`mt-4 text-sm font-semibold leading-7 md:text-base ${track.disabled ? 'text-white/68' : 'text-white/68'}`}>{track.body}</p>
                  </div>
                  {track.disabled ? (
                    <p className="mt-8 text-base font-black text-white md:text-lg">{track.cta}</p>
                  ) : (
                    <span className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition group-hover:bg-white">
                      {track.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </>
            );

            return track.disabled ? (
              <div
                key={track.id}
                className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 text-left opacity-75 shadow-[0_30px_90px_rgba(0,0,0,.35)]"
                aria-disabled="true"
              >
                {content}
              </div>
            ) : (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(track)}
                className="group relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/15 text-left shadow-[0_30px_90px_rgba(0,0,0,.35)] transition hover:-translate-y-1 hover:border-amber-300/60"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {launchTrack && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-slate-950 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.img
              src={launchTrack.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.18, opacity: 0.35 }}
              animate={{ scale: 1.02, opacity: 0.72 }}
              transition={{ duration: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,.15),transparent_26%),linear-gradient(90deg,rgba(2,6,23,.96),rgba(2,6,23,.58),rgba(2,6,23,.96))]" />
            <motion.div
              className="absolute h-[34rem] w-[34rem] rounded-full border border-amber-200/20"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: 1.45, opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.05, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute h-[22rem] w-[22rem] rounded-full border border-white/15"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.9, opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.05, delay: 0.12, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-amber-200/25 to-transparent blur-xl"
              initial={{ x: '-65vw', opacity: 0 }}
              animate={{ x: '65vw', opacity: [0, 1, 0] }}
              transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <motion.div
              className="relative z-10 text-center"
              initial={{ y: 28, scale: 0.94, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200/90">Launching Exam Track</p>
              <h2 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">{launchTrack.title}</h2>
              <p className="mt-4 text-lg font-bold text-white/65">{userName ? `${userName} กำลังเข้าสู่สนามสอบ` : 'กำลังเข้าสู่สนามสอบ'}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamTrackSelection;
