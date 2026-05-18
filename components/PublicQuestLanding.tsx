import React from 'react';
import { ArrowRight, BookOpenCheck, CheckCircle2, FileQuestion, Gift, Play, Users } from 'lucide-react';
import { visitorAnalyticsService } from '../services/visitorAnalyticsService';

interface PublicQuestLandingProps {
  onOpenAuth: (mode: 'login' | 'register', label: string) => void;
}

const HERO_IMAGE_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/banner2.png';
const COOL_COM_LOGO_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/cc2.png';

const stats = [
  { icon: Gift, label: 'ฟรี', value: '100%' },
  { icon: BookOpenCheck, label: 'บทเรียน', value: '300+' },
  { icon: FileQuestion, label: 'แบบทดสอบ', value: '1000+' },
];

const PublicQuestLanding: React.FC<PublicQuestLandingProps> = ({ onOpenAuth }) => {
  const openAuth = (mode: 'login' | 'register', label: string) => {
    visitorAnalyticsService.trackSignupIntent('public-landing', label);
    onOpenAuth(mode, label);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative flex min-h-screen overflow-hidden text-white">
        <img src={HERO_IMAGE_URL} alt="Sobkru exam preparation" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,.51),rgba(2,6,23,.56)),radial-gradient(circle_at_center,rgba(15,23,42,.08),rgba(2,6,23,.59))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-16 pb-32 text-center sm:pb-36">
          <div className="animate-[sobkruRise_.7s_ease-out_both]">
            <p className="mx-auto mb-9 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-amber-100 backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              UPDATE 2026
            </p>
            <h1
              className="sobkru-wordmark block text-[4rem] font-black leading-[.9] sm:text-[5rem] md:text-[6rem]"
              style={{
                fontFamily: 'var(--sobkru-font-display)',
              }}
            >
              SOBKRU <span className="sobkru-wordmark-gold">69</span>
            </h1>
            <p className="mx-auto mt-12 flex max-w-3xl flex-col gap-[1.3rem] text-xl font-bold leading-tight text-white sm:text-2xl md:gap-[1.7rem] md:text-3xl">
              <span className="block">ระบบสรุปเนื้อหาและองค์ความรู้สำหรับเตรียมสอบ</span>
              <span className="block">ครูผู้ช่วย และใบประกอบวิชาชีพครู</span>
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => openAuth('login', 'hero-enter-lessons')}
                className="inline-flex min-h-12 w-auto min-w-[170px] items-center justify-center gap-3 rounded-full bg-amber-400 px-7 py-3 font-black text-slate-950 shadow-[0_20px_60px_rgba(251,191,36,.28)] transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                <Play className="h-5 w-5 fill-current" />
                เข้าสู่บทเรียน
              </button>
              <button
                onClick={() => openAuth('register', 'hero-register')}
                className="inline-flex min-h-12 w-auto min-w-[170px] items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3 font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                สมัครเข้าใช้งาน
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid w-[min(92vw,46rem)] grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md">
            {stats.map(item => (
              <div key={item.label} className="bg-slate-950/40 px-3 py-4 sm:px-5">
                <div className="flex items-center justify-center gap-2">
                  <item.icon className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
                  <div className="text-xl font-black text-white sm:text-2xl md:text-3xl">{item.value}</div>
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/65">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-bold text-white/85 sm:text-base">
            <Users className="h-5 w-5 text-white" />
            มีผู้เข้าร่วมใช้งานแล้วกว่า <span className="text-amber-300">1,200</span> คน
          </p>
        </div>

        <footer className="absolute inset-x-0 bottom-5 z-10 flex flex-col items-center px-5 text-center text-sm font-semibold leading-7 text-white/55 sm:bottom-6">
          <img src={COOL_COM_LOGO_URL} alt="Cool Com" className="mb-3 h-5 w-auto opacity-80" />
          <p>© 2026 SobKru69 All Rights Reserved.</p>
          <p>
            Developed by Cool Com |{' '}
            <a href="https://www.coolcom.click" target="_blank" rel="noreferrer" className="transition hover:text-amber-200 hover:underline">
              www.coolcom.click
            </a>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default PublicQuestLanding;
