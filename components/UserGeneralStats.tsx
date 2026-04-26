import React, { useEffect, useState, useMemo } from 'react';
import { Users, BarChart3, PieChart, MapPin, GraduationCap, Calendar, ChevronLeft, Loader2, Trophy } from 'lucide-react';
import { userActivityService } from '../services/userActivityService';

interface UserGeneralStatsProps {
  onBack: () => void;
}

const UserGeneralStats: React.FC<UserGeneralStatsProps> = ({ onBack }) => {
  const [data, setData] = useState<{ profiles: any[], totalAttempts: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const stats = await userActivityService.getSystemUserStats();
        setData(stats);
      } catch (error) {
        console.error('Failed to load system stats', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    if (!data) return {
      totalUsers: 0,
      totalAttempts: 0,
      gender: [],
      age: [],
      province: [],
      major: [],
    };
    const { profiles = [], totalAttempts = 0 } = data;
    const totalUsers = profiles.length;

    const genderMap: Record<string, number> = {};
    const ageMap: Record<string, number> = {};
    const provinceMap: Record<string, number> = {};
    const majorMap: Record<string, number> = {};

    profiles.forEach(p => {
      const g = p.gender || 'ไม่ระบุ';
      genderMap[g] = (genderMap[g] || 0) + 1;

      const a = p.age_range || 'ไม่ระบุ';
      ageMap[a] = (ageMap[a] || 0) + 1;

      const pr = p.province || 'ไม่ระบุ';
      provinceMap[pr] = (provinceMap[pr] || 0) + 1;

      const m = p.target_major || 'ไม่ระบุ';
      majorMap[m] = (majorMap[m] || 0) + 1;
    });

    const sortMap = (map: Record<string, number>) => 
      Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    return {
      totalUsers,
      totalAttempts,
      gender: sortMap(genderMap),
      age: sortMap(ageMap),
      province: sortMap(provinceMap),
      major: sortMap(majorMap),
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p>กำลังรวบรวมสถิติผู้ใช้งาน...</p>
      </div>
    );
  }

  // Removed null check to avoid white screen

  const StatHeader = ({ title, icon: Icon, color }: { title: string, icon: any, color: string }) => (
    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {title}
    </h3>
  );

  const BarItem = ({ label, value, total, color }: { label: string, value: number, total: number, color: string }) => {
    const percent = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-700 truncate max-w-[70%]">{label}</span>
          <span className="text-slate-500">{value.toLocaleString()} คน ({percent}%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-slate-800">สถิติผู้ใช้งาน</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-800 mb-3">ภาพรวมความเคลื่อนไหวในระบบ</h2>
          <p className="text-slate-500">ข้อมูลสถิติมวลรวมของผู้ใช้งานทั้งหมดใน SOBKRU 69</p>
        </div>

        {/* Global Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl w-fit mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 animate-in zoom-in duration-500">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-indigo-100 font-bold uppercase tracking-widest text-sm">จำนวนผู้ใช้งานทั้งหมดในระบบ</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-[32px] text-white shadow-xl shadow-amber-900/20 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl w-fit mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 animate-in zoom-in duration-500">{stats.totalAttempts.toLocaleString()}</div>
              <p className="text-amber-100 font-bold uppercase tracking-widest text-sm">จำนวนครั้งที่ทำแบบทดสอบรวม</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gender Stats */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <StatHeader title="สัดส่วนเพศ" icon={PieChart} color="bg-rose-500" />
            <div className="grid grid-cols-1 gap-5">
              {stats.gender.map(([label, val]) => (
                <BarItem key={label} label={label === 'male' ? 'ชาย' : label === 'female' ? 'หญิง' : label} value={val} total={stats.totalUsers} color="bg-rose-500" />
              ))}
            </div>
          </div>

          {/* Age Stats */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <StatHeader title="ช่วงอายุ" icon={Calendar} color="bg-sky-500" />
            <div className="grid grid-cols-1 gap-5">
              {stats.age.map(([label, val]) => (
                <BarItem key={label} label={label} value={val} total={stats.totalUsers} color="bg-sky-500" />
              ))}
            </div>
          </div>

          {/* Major Stats */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <StatHeader title="วิชาเอกที่ต้องการสอบ" icon={GraduationCap} color="bg-emerald-500" />
            <div className="grid grid-cols-1 gap-5">
              {stats.major.map(([label, val]) => (
                <BarItem key={label} label={label} value={val} total={stats.totalUsers} color="bg-emerald-500" />
              ))}
            </div>
          </div>

          {/* Province Stats */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <StatHeader title="จังหวัด" icon={MapPin} color="bg-violet-500" />
            <div className="grid grid-cols-1 gap-5">
              {stats.province.map(([label, val]) => (
                <BarItem key={label} label={label} value={val} total={stats.totalUsers} color="bg-violet-500" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-100 rounded-[24px] text-center text-slate-500 text-sm italic">
          * ข้อมูลสรุปโดยอัตโนมัติจากโปรไฟล์ผู้ใช้งานในระบบ เพื่อให้เห็นภาพรวมของการเตรียมตัวสอบครูผู้ช่วยในปีนี้
        </div>
      </div>
    </div>
  );
};

export default UserGeneralStats;
