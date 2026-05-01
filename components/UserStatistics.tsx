import React, { useEffect, useState } from 'react';
import { BarChart3, Users, MapPin, GraduationCap, Calendar, ChevronLeft, Loader2, TrendingUp, UserCheck } from 'lucide-react';
import { authService, User } from '../services/authService';

interface UserStatisticsProps {
  onBack: () => void;
}

interface StatsData {
  totalUsers: number;
  provinceCount: number;
  majorCount: number;
  firstTimeCount: number;
  byProvince: { name: string; count: number; percentage: number }[];
  byMajor: { name: string; count: number; percentage: number }[];
  byGender: { name: string; count: number; percentage: number }[];
  byExamCount: { name: string; count: number; percentage: number }[];
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const summary = await authService.getUserStatisticsSummary();
        if (summary.success && summary.stats) {
          setStats(summary.stats);
          return;
        }

        const res = await authService.getUsers();
        if (res.success && res.users) {
          const users = res.users;
          const total = users.length;

          // Provinces
          const provinceMap: Record<string, number> = {};
          const majorMap: Record<string, number> = {};
          const genderMap: Record<string, number> = {};
          const examCountMap: Record<string, number> = {};
          let firstTime = 0;

          users.forEach(u => {
            if (u.province) provinceMap[u.province] = (provinceMap[u.province] || 0) + 1;
            if (u.major) majorMap[u.major] = (majorMap[u.major] || 0) + 1;
            if (u.gender) genderMap[u.gender] = (genderMap[u.gender] || 0) + 1;
            
            const ec = u.examCount || '1';
            examCountMap[ec] = (examCountMap[ec] || 0) + 1;
            if (ec === '1') firstTime++;
          });

          const sortAndMap = (map: Record<string, number>) => 
            Object.entries(map)
              .map(([name, count]) => ({ name, count, percentage: total > 0 ? Math.round((count / total) * 100) : 0 }))
              .sort((a, b) => b.count - a.count);

          setStats({
            totalUsers: total,
            provinceCount: Object.keys(provinceMap).length,
            majorCount: Object.keys(majorMap).length,
            firstTimeCount: firstTime,
            byProvince: sortAndMap(provinceMap).slice(0, 10), // Top 10
            byMajor: sortAndMap(majorMap).slice(0, 10),
            byGender: sortAndMap(genderMap),
            byExamCount: Object.entries(examCountMap)
              .map(([name, count]) => ({ 
                name: name === '1' ? 'สอบครั้งที่ 1' : name === '2' ? 'สอบครั้งที่ 2' : `สอบครั้งที่ ${name}`, 
                count, 
                percentage: total > 0 ? Math.round((count / total) * 100) : 0 
              }))
              .sort((a, b) => a.name.localeCompare(b.name))
          });
        }
      } catch (error) {
        console.error('Failed to fetch user stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">กำลังโหลดข้อมูลสถิติ...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] py-8 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-8 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        กลับสู่หน้าหลัก
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">สถิติผู้ใช้งาน</h1>
        </div>
        <p className="text-slate-500">ข้อมูลสรุปภาพรวมของผู้ใช้งานในระบบ SobKru69</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Users className="w-6 h-6" />} label="ผู้ใช้งานทั้งหมด" value={stats.totalUsers} unit="คน" color="blue" />
        <StatCard icon={<MapPin className="w-6 h-6" />} label="จังหวัดที่เข้าร่วม" value={stats.provinceCount} unit="จังหวัด" color="emerald" />
        <StatCard icon={<GraduationCap className="w-6 h-6" />} label="เอกวิชาที่เลือกสอบ" value={stats.majorCount} unit="วิชาเอก" color="purple" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label="สอบครั้งแรก" value={stats.firstTimeCount} unit="คน" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gender Chart */}
        <ChartBox 
          title="สถิติเพศ" 
          icon={<Users className="w-5 h-5 text-blue-600" />}
          data={stats.byGender}
          barColor="bg-blue-500"
        />

        {/* Exam Count Chart */}
        <ChartBox 
          title="สถิติการสอบครั้งที่" 
          icon={<UserCheck className="w-5 h-5 text-orange-600" />}
          data={stats.byExamCount}
          barColor="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Province Chart */}
        <ChartBox 
          title="สถิติผู้ใช้งานตามจังหวัด (TOP 10)" 
          icon={<MapPin className="w-5 h-5 text-emerald-600" />}
          data={stats.byProvince}
          barColor="bg-emerald-500"
        />

        {/* Major Chart */}
        <ChartBox 
          title="สถิติเอกที่เลือกสอบ" 
          icon={<GraduationCap className="w-5 h-5 text-purple-600" />}
          data={stats.byMajor}
          barColor="bg-purple-500"
        />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number, unit: string, color: string }> = ({ icon, label, value, unit, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          <span className="text-sm text-slate-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const ChartBox: React.FC<{ title: string, icon: React.ReactNode, data: { name: string, count: number, percentage: number }[], barColor: string }> = ({ title, icon, data, barColor }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      
      <div className="space-y-6">
        {data.length === 0 ? (
          <p className="text-center text-slate-400 py-10">ยังไม่มีข้อมูล</p>
        ) : (
          data.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.name || 'ไม่ระบุ'}</span>
                <span className="text-xs font-medium text-slate-500">
                  <span className="text-slate-900 font-bold">{item.count}</span> คน ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`${barColor} h-full rounded-full transition-all duration-1000 ease-out origin-left`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserStatistics;
