
import React from 'react';
import { BookOpen, GraduationCap, Users, Newspaper, MessageSquare, ShoppingCart, FileText, BarChart3 } from 'lucide-react';
import { EXAM_CURRICULUM } from '../constants';
import { ExamPart, PartId } from '../types';

interface DashboardProps {
  onSelectPart: (part: ExamPart) => void;
  onNavigateToNews: () => void;
  onNavigateToDiscussion: () => void;
  onNavigateToShop: () => void;
  onNavigateToMockExam: () => void;
  onNavigateToLeaderboard?: () => void;
  onlineCount?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectPart, onNavigateToNews, onNavigateToDiscussion, onNavigateToShop, onNavigateToMockExam, onNavigateToLeaderboard, onlineCount = 0 }) => {
  const getIcon = (id: PartId) => {
    switch (id) {
      case PartId.PART_A: return <BookOpen className="w-12 h-12 text-white mb-4" />;
      case PartId.PART_B: return <GraduationCap className="w-12 h-12 text-white mb-4" />;
      case PartId.PART_C: return <Users className="w-12 h-12 text-white mb-4" />;
    }
  };

  const getBgColor = (color: string) => {
    switch(color) {
        case 'blue': return 'bg-[#0D2E57] border-[#0D2E57] hover:bg-[#0a2446]';
        case 'orange': return 'bg-[#DB6216] border-[#DB6216] hover:bg-[#c25512]';
        case 'green': return 'bg-[#156618] border-[#156618] hover:bg-[#104d12]';
        default: return 'bg-slate-600 border-slate-600 hover:bg-slate-700';
    }
  }

  // Google Drive Image ID for Logo
  const LOGO_ID = "1w_UFtt85wv0STIlhAUAfKtg0nbuutIND";
  const LOGO_URL = `https://drive.google.com/thumbnail?id=${LOGO_ID}&sz=w400`;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-6 md:pt-10 pb-6">
      <header className="text-center mb-8 flex flex-col items-center">
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">SOBKRU <span className="text-amber-500">69</span></h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          คอร์สออนไลน์ เตรียมสอบครูผู้ช่วย สพฐ.
        </h2>
        <p className="text-base text-slate-600 w-full whitespace-normal">
          ระบบติวสอบออนไลน์อัจฉริยะ ครอบคลุมเนื้อหาตามเกณฑ์ใหม่ เจาะลึก ภาค ก ภาค ข และ ภาค ค ( อัพเดต ปี 2569 )
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXAM_CURRICULUM.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelectPart(part)}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${getBgColor(part.color)} text-center group h-full`}
          >
            {getIcon(part.id)}
            <h2 className="text-2xl font-bold text-white mb-2">{part.title}</h2>
            <div className="text-sm font-medium text-white/90 mb-3 uppercase tracking-wide flex flex-col gap-1">
              {part.subtitle.includes(' (') ? (
                <>
                  <span>{part.subtitle.split(' (')[0]}</span>
                  <span>({part.subtitle.split(' (')[1]}</span>
                </>
              ) : (
                <span>{part.subtitle}</span>
              )}
            </div>
            <span className="text-white/60 text-xs group-hover:text-white transition-colors mt-auto font-medium">
              คลิกเพื่อเข้าสู่บทเรียน
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 mt-10 max-w-6xl mx-auto">
        
        {/* Top Row: Mock Exam (Blue Box) */}
        <div className="border border-blue-500/0 p-1">
          <button 
            onClick={onNavigateToMockExam} 
            className="w-full flex items-center justify-center p-6 md:p-7 bg-gradient-to-r from-[#1D4ED8] via-[#4F46E5] to-[#0EA5E9] rounded-3xl border border-white/30 shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group text-center relative overflow-hidden hover:-translate-y-1"
          >
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125"></div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-white/25 shadow-inner">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="mb-1 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-blue-50">
                  Real Exam Mode
                </div>
                <h4 className="font-bold text-xl md:text-2xl text-white mb-1 transition-colors">ทำแบบทดสอบเสมือนจริง</h4>
                <p className="text-sm text-blue-50/95 font-medium">ทดลองทำข้อสอบแบบเสมือนสอบจริง ทั้ง ภาค ก และ ภาค ข</p>
              </div>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
          <button onClick={onNavigateToNews} className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-blue-100/70 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                <Newspaper className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base md:text-lg text-slate-900 transition-colors group-hover:text-blue-700 whitespace-nowrap">ข่าวสารประชาสัมพันธ์</h4>
                <p className="text-xs text-slate-500 transition-colors group-hover:text-blue-600 whitespace-nowrap">ติดตามข่าวสาร ประกาศ และอัปเดตต่างๆ</p>
              </div>
            </div>
            <span className="relative ml-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">ดูข่าว</span>
          </button>

          <button onClick={onNavigateToDiscussion} className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/70 to-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-900/10">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-indigo-100/70 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base md:text-lg text-slate-900 transition-colors group-hover:text-indigo-700 whitespace-nowrap">กระดานสนทนา</h4>
                <p className="text-xs text-slate-500 transition-colors group-hover:text-indigo-600 whitespace-nowrap">พูดคุย แลกเปลี่ยนความรู้</p>
              </div>
            </div>
            <span className="relative ml-3 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">ถามตอบ</span>
          </button>

          <button onClick={onNavigateToLeaderboard} className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-white via-amber-50/70 to-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/10">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-amber-100/70 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base md:text-lg text-slate-900 transition-colors group-hover:text-emerald-700 whitespace-nowrap">ข้อมูลผู้ใช้งาน</h4>
                <p className="text-xs text-slate-500 transition-colors group-hover:text-emerald-600 whitespace-nowrap">สถิติผู้ใช้งานในระบบ Hall of Fame</p>
              </div>
            </div>
            <span className="relative ml-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white transition-colors group-hover:bg-emerald-700 group-hover:text-white">ดูข้อมูล</span>
          </button>
        </div>

        {/* Hidden Shop Button */}
        <div className="border border-blue-500/0 p-1 hidden">
          <button onClick={onNavigateToShop} className="flex items-center p-4 bg-white rounded-2xl border border-slate-100 hover:bg-amber-500 hover:border-amber-500 transition-all duration-300 group text-left relative overflow-hidden mt-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-all duration-300 shrink-0">
              <ShoppingCart className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg text-slate-800 group-hover:text-white transition-colors mb-0.5">สั่งซื้อ ชีทสรุปรวมอ่านเตรียมสอบ</h4>
              <p className="text-xs text-slate-500 group-hover:text-amber-100 transition-colors">ชีทสรุปเนื้อหาเน้นๆ พร้อมเทคนิคทำข้อสอบ</p>
            </div>
          </button>
        </div>
        
        {/* Online Status Indicator */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm transition-all hover:shadow-md">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">
              {onlineCount} Online
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
