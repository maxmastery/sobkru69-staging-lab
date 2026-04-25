import React, { useMemo } from 'react';
import { User } from '../../services/authService';
import { BarChart3, Users, MapPin, GraduationCap, Calendar } from 'lucide-react';

interface AdminStatisticsProps {
  users: User[];
}

const AdminStatistics: React.FC<AdminStatisticsProps> = ({ users }) => {
  const stats = useMemo(() => {
    const totalUsers = users.length;
    if (totalUsers === 0) return null;

    // Calculate Gender Stats
    const genderCount: Record<string, number> = {};
    // Calculate Province Stats
    const provinceCount: Record<string, number> = {};
    // Calculate Major Stats
    const majorCount: Record<string, number> = {};
    // Calculate Exam Count Stats
    const examCountStats: Record<string, number> = {};

    users.forEach(user => {
      if (user.gender) {
        genderCount[user.gender] = (genderCount[user.gender] || 0) + 1;
      }
      if (user.province) {
        provinceCount[user.province] = (provinceCount[user.province] || 0) + 1;
      }
      if (user.major) {
        majorCount[user.major] = (majorCount[user.major] || 0) + 1;
      }
      if (user.examCount) {
        examCountStats[user.examCount] = (examCountStats[user.examCount] || 0) + 1;
      }
    });

    // Sort provinces by count
    const sortedProvinces = Object.entries(provinceCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / totalUsers) * 100) }));

    return {
      totalUsers,
      genderCount,
      sortedProvinces,
      majorCount,
      examCountStats
    };
  }, [users]);

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">ยังไม่มีข้อมูลสถิติ</h3>
        <p className="text-slate-500">รอให้มีผู้ใช้งานสมัครสมาชิกและกรอกข้อมูลก่อน</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">ผู้ใช้งานทั้งหมด</p>
              <h4 className="text-2xl font-bold text-slate-900">{stats.totalUsers}</h4>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">จังหวัดที่เข้าร่วม</p>
              <h4 className="text-2xl font-bold text-slate-900">{stats.sortedProvinces.length}</h4>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">เอกวิชาที่เลือกสอบ</p>
              <h4 className="text-2xl font-bold text-slate-900">{Object.keys(stats.majorCount).length}</h4>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">สอบครั้งแรก</p>
              <h4 className="text-2xl font-bold text-slate-900">
                {stats.examCountStats['1'] || 0} <span className="text-sm font-normal text-slate-500">คน</span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map / Provinces */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-500" />
            สถิติผู้ใช้งานตามจังหวัด (แผนที่)
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {stats.sortedProvinces.map((prov, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{prov.name}</span>
                  <span className="text-slate-500">{prov.count} คน ({prov.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className="bg-emerald-500 h-2.5 rounded-full" 
                    style={{ width: `${prov.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Majors */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            สถิติเอกที่เลือกสอบ
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {Object.entries(stats.majorCount)
              .sort((a, b) => b[1] - a[1])
              .map(([major, count], idx) => {
                const percentage = Math.round((count / stats.totalUsers) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{major}</span>
                      <span className="text-slate-500">{count} คน ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-purple-500 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Gender */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            สถิติเพศ
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.genderCount)
              .sort((a, b) => b[1] - a[1])
              .map(([gender, count], idx) => {
                const percentage = Math.round((count / stats.totalUsers) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{gender}</span>
                      <span className="text-slate-500">{count} คน ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Exam Count */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            สถิติการสอบครั้งที่
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.examCountStats)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([countStr, count], idx) => {
                const percentage = Math.round((count / stats.totalUsers) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">สอบครั้งที่ {countStr}</span>
                      <span className="text-slate-500">{count} คน ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-amber-500 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
