import React from 'react';
import { ArrowLeft, BadgeCheck, BookOpenCheck, ClipboardList, Sparkles } from 'lucide-react';

interface TeacherLicenseMockupProps {
  onBackToSelector: () => void;
}

const modules = [
  { title: 'มาตรฐานวิชาชีพครู', body: 'โครงสร้างความรู้และบทบาทตามข้อกำหนดวิชาชีพ', icon: BadgeCheck },
  { title: 'จรรยาบรรณและกฎหมาย', body: 'กรณีศึกษา วินัย และหลักปฏิบัติที่ออกสอบบ่อย', icon: ClipboardList },
  { title: 'ชุดฝึกข้อสอบ', body: 'Mockup สำหรับระบบโจทย์และแบบทดสอบที่จะตามมา', icon: BookOpenCheck },
];

const TeacherLicenseMockup: React.FC<TeacherLicenseMockupProps> = ({ onBackToSelector }) => (
  <div className="min-h-screen bg-[#f7f4ee] text-slate-950">
    <section className="relative overflow-hidden bg-slate-950 px-5 py-12 text-white md:px-8 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(251,191,36,.2),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(45,212,191,.14),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <button onClick={onBackToSelector} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white/80 transition hover:bg-white hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          เลือกหัวข้อสอบ
        </button>
        <p className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-950">
          <Sparkles className="h-4 w-4" />
          Mockup
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">บทเรียนสอบใบประกอบวิชาชีพครู</h1>
        <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/65">
          พื้นที่นี้เตรียมไว้สำหรับพัฒนาบทเรียนและแบบทดสอบใบประกอบวิชาชีพครูในรอบถัดไป ตอนนี้เปิดเป็น mockup เพื่อวางโครงประสบการณ์ก่อน
        </p>
      </div>
    </section>

    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {modules.map(item => (
          <article key={item.title} className="rounded-[28px] bg-white p-6 ring-1 ring-slate-200">
            <item.icon className="h-8 w-8 text-amber-500" />
            <h2 className="mt-6 text-2xl font-black">{item.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>
    </main>
  </div>
);

export default TeacherLicenseMockup;
