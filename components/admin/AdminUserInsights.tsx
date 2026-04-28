import React, { useEffect, useState, useMemo } from 'react';
import { Users, Wifi, BookOpen, UserX, Clock, Activity, Loader2, RefreshCw } from 'lucide-react';
import { User } from '../../services/authService';
import { userActivityService } from '../../services/userActivityService';

interface AdminUserInsightsProps {
  users: User[];
}

interface SessionRow {
  user_id: string;
  user_name: string;
  current_page: string;
  last_active_at: string;
}

interface LoginLogRow {
  user_id: string;
  login_date: string;
  created_at: string;
}

const AdminUserInsights: React.FC<AdminUserInsightsProps> = ({ users }) => {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLogRow[]>([]);
  const [studyTimeMap, setStudyTimeMap] = useState<Record<string, Record<string, number>>>({});
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    if (!users || users.length === 0) return;
    
    setIsLoading(true);
    try {
      const [sessionsData, logsData, allStudyRows] = await Promise.all([
        userActivityService.getOnlineSessions(),
        userActivityService.getDailyLoginLogs(),
        userActivityService.getAllStudyTimeRecords(),
      ]);
      
      setSessions(Array.isArray(sessionsData) ? sessionsData : []);
      setLoginLogs(Array.isArray(logsData) ? logsData : []);

      const allStudyTime: Record<string, Record<string, number>> = {};
      if (Array.isArray(allStudyRows)) {
        allStudyRows.forEach(row => {
          if (!allStudyTime[row.user_id]) {
            allStudyTime[row.user_id] = {};
          }
          allStudyTime[row.user_id][row.topic_id] = (allStudyTime[row.user_id][row.topic_id] || 0) + (row.seconds || 0);
        });
      }

      setStudyTimeMap(allStudyTime);
    } catch (error) {
      console.error('Failed to load insights', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [users]);

  const insights = useMemo(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const totalUsers = users.length;

    // Online users (active in last 5 minutes)
    const onlineUsers = sessions.filter(s => {
      if (!s.last_active_at) return false;
      try {
        const lastActive = new Date(s.last_active_at);
        return lastActive >= fiveMinutesAgo;
      } catch {
        return false;
      }
    });
    
    const onlineCount = onlineUsers.length;
    
    // Check if user is in lesson or exam
    const learningUsers = onlineUsers.filter(s => 
      s.current_page && (s.current_page.startsWith('lesson') || s.current_page.startsWith('learning'))
    );
    const examUsers = onlineUsers.filter(s => 
      s.current_page && (s.current_page === 'exam' || s.current_page === 'mock-exam')
    );
    const learningOrExamCount = learningUsers.length + examUsers.length;

    // Users who have study time > 0
    const usersWithStudyTime = Object.keys(studyTimeMap).length;
    const usersWithoutStudyTime = totalUsers - usersWithStudyTime;

    // Users with > 5 minutes study time
    const usersOver5Min = Object.entries(studyTimeMap).filter(([, timeMap]) => {
      const totalSecs = Object.values(timeMap).reduce((a, b) => a + b, 0);
      return totalSecs >= 300;
    }).length;
    const over5MinPercent = totalUsers > 0 ? Math.round((usersOver5Min / totalUsers) * 100) : 0;

    // Part A / Part B breakdown - Updated to match subTopic IDs from constants
    const partATopics = ['a1', 'a2', 'a3'];
    const partBTopics = ['b1', 'b2', 'b3'];

    let partACount = 0;
    let partBCount = 0;
    let partATotalTime = 0;
    let partBTotalTime = 0;

    Object.values(studyTimeMap).forEach(timeMap => {
      let hasA = false;
      let hasB = false;
      Object.entries(timeMap).forEach(([topicId, seconds]) => {
        const lower = topicId.toLowerCase();
        
        // Categorize based on topic ID prefixes (e.g. A1-1, B3-2)
        if (partATopics.some(p => lower.startsWith(p)) || lower.startsWith('a')) {
          hasA = true;
          partATotalTime += seconds;
        } else if (partBTopics.some(p => lower.startsWith(p)) || lower.startsWith('b')) {
          hasB = true;
          partBTotalTime += seconds;
        }
      });
      if (hasA) partACount++;
      if (hasB) partBCount++;
    });

    // Inactive users (last active > 3 days ago or no session record)
    const activeUserIds = new Set(sessions.filter(s => s.last_active_at && new Date(s.last_active_at) >= threeDaysAgo).map(s => s.user_id));
    const inactiveUsers = users.filter(u => !activeUserIds.has(u.id));

    // Daily login chart (last 7 days)
    const dailyChart: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const count = loginLogs.filter(l => l.login_date === dateStr).length;
      dailyChart.push({ date: dateStr, count });
    }
    const maxDailyLogin = Math.max(...dailyChart.map(d => d.count), 1);

    return {
      totalUsers,
      onlineCount,
      learningOrExamCount,
      usersWithStudyTime,
      usersWithoutStudyTime,
      usersOver5Min,
      over5MinPercent,
      partACount,
      partBCount,
      partATotalTime,
      partBTotalTime,
      inactiveUsers: inactiveUsers.slice(0, 50),
      dailyChart,
      maxDailyLogin,
      onlineUsers,
    };
  }, [users, sessions, loginLogs, studyTimeMap]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p>กำลังโหลดข้อมูลผู้ใช้งาน...</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} วินาที`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} นาที`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs} ชม. ${remainingMins} นาที`;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <Activity className="w-6 h-6 text-teal-600" />
          ภาพรวมพฤติกรรมผู้ใช้งาน
        </h2>
        <button 
          onClick={load}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-teal-50 hover:border-teal-200 transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          อัปเดตข้อมูล
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ผู้ใช้งานทั้งหมด</p>
            <h4 className="text-3xl font-black text-slate-900">{insights.totalUsers}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <Wifi className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ออนไลน์อยู่</p>
            <h4 className="text-3xl font-black text-emerald-600">{insights.onlineCount}</h4>
            <p className="text-[10px] text-slate-400 mt-1">ภายใน 5 นาทีล่าสุด</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">เรียน/สอบอยู่</p>
            <h4 className="text-3xl font-black text-purple-600">{insights.learningOrExamCount}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">เข้าบทเรียนแล้ว</p>
            <h4 className="text-3xl font-black text-amber-600">{insights.usersWithStudyTime}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-red-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-3">
              <UserX className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ยังไม่เข้าเลย</p>
            <h4 className="text-3xl font-black text-red-600">{insights.usersWithoutStudyTime}</h4>
          </div>
        </div>
      </div>

      {/* Part A / Part B Breakdown + Study Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black">ก</div>
            สถิติภาค ก
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">ผู้เข้าเรียน</span>
              <span className="text-2xl font-black text-blue-600">{insights.partACount} <span className="text-sm font-normal text-slate-500">คน</span></span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">คิดเป็น</span>
              <span className="text-lg font-bold text-blue-600">{insights.totalUsers > 0 ? Math.round((insights.partACount / insights.totalUsers) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">เวลาเรียนรวม</span>
              <span className="text-sm font-bold text-slate-700">{formatTime(insights.partATotalTime)}</span>
            </div>
            <div className="w-full bg-blue-50 rounded-full h-2.5 mt-2">
              <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-700" style={{ width: `${insights.totalUsers > 0 ? Math.min(100, (insights.partACount / insights.totalUsers) * 100) : 0}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-purple-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-black">ข</div>
            สถิติภาค ข
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">ผู้เข้าเรียน</span>
              <span className="text-2xl font-black text-purple-600">{insights.partBCount} <span className="text-sm font-normal text-slate-500">คน</span></span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">คิดเป็น</span>
              <span className="text-lg font-bold text-purple-600">{insights.totalUsers > 0 ? Math.round((insights.partBCount / insights.totalUsers) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-600">เวลาเรียนรวม</span>
              <span className="text-sm font-bold text-slate-700">{formatTime(insights.partBTotalTime)}</span>
            </div>
            <div className="w-full bg-purple-50 rounded-full h-2.5 mt-2">
              <div className="bg-purple-500 h-2.5 rounded-full transition-all duration-700" style={{ width: `${insights.totalUsers > 0 ? Math.min(100, (insights.partBCount / insights.totalUsers) * 100) : 0}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-500" />
            เรียนเกิน 5 นาที
          </h3>
          <div className="text-center py-2">
            <div className="text-5xl font-black text-emerald-600 mb-1">{insights.usersOver5Min}</div>
            <div className="text-sm text-slate-500">คน ({insights.over5MinPercent}% ของทั้งหมด)</div>
          </div>
          <div className="w-full bg-emerald-50 rounded-full h-2.5 mt-4">
            <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700" style={{ width: `${insights.over5MinPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Daily Login Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          การเข้าใช้งานรายวัน (7 วันล่าสุด)
        </h3>
        <div className="flex items-end gap-2 h-48">
          {insights.dailyChart.map((day, idx) => {
            const heightPercent = insights.maxDailyLogin > 0 ? (day.count / insights.maxDailyLogin) * 100 : 0;
            const dateObj = new Date(day.date);
            const dayLabel = dateObj.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric' });
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-600">{day.count}</span>
                <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '160px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-700"
                    style={{
                      height: `${Math.max(heightPercent, 2)}%`,
                      animationDelay: `${idx * 100}ms`,
                    }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Online Users */}
      {insights.onlineUsers.length > 0 && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-emerald-500" />
            ผู้ที่กำลังออนไลน์ ({insights.onlineUsers.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {insights.onlineUsers.map((s, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate">{s.user_name || 'ผู้ใช้งาน'}</div>
                  <div className="text-xs text-slate-500">{s.current_page === 'exam' ? '🧪 กำลังทำข้อสอบ' : s.current_page === 'lesson' ? '📖 กำลังเรียน' : '🏠 หน้าหลัก'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inactive Users */}
      {insights.inactiveUsers.length > 0 && (
        <div className="bg-white rounded-2xl border border-red-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <UserX className="w-5 h-5 text-red-500" />
            บัญชีที่ไม่เข้าใช้งานเกิน 3 วัน ({insights.inactiveUsers.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-100">
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase">ชื่อ</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase">อีเมล</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase">สมัครเมื่อ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-50">
                {insights.inactiveUsers.slice(0, 20).map((u, idx) => (
                  <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{u.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString('th-TH') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserInsights;
