import React, { useEffect, useMemo, useState } from 'react';
import { Activity, BookOpen, Clock, Loader2, TrendingUp, UserPlus, UserX, Users, Wifi } from 'lucide-react';
import { User } from '../../services/authService';
import { getStoredUser, userActivityService } from '../../services/userActivityService';

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

interface LessonProgressSummaryRow {
  user_id: string;
  topic_id: string;
  chapter_id: string;
  completed_at: string;
}

type SignupRange = 'daily' | 'weekly' | 'monthly';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate());
const isoDay = (value: Date) => startOfDay(value).toISOString().split('T')[0];

const startOfWeek = (value: Date) => {
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const next = new Date(value);
  next.setDate(value.getDate() + diff);
  return startOfDay(next);
};

const weekKey = (value: Date) => isoDay(startOfWeek(value));
const monthKey = (value: Date) => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}`;

const rangeLabel = (key: string, range: SignupRange) => {
  if (range === 'daily') {
    return new Date(key).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  }
  if (range === 'weekly') {
    const date = new Date(key);
    const end = new Date(date);
    end.setDate(date.getDate() + 6);
    return `${date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}`;
  }
  const [year, month] = key.split('-');
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('th-TH', { month: 'short', year: '2-digit' });
};

const sessionLabel = (page: string) => {
  if (page.startsWith('lesson')) return 'กำลังเรียนบทเรียน';
  if (page.startsWith('topic')) return 'กำลังเลือกหัวข้อ';
  if (page.includes('exam')) return 'กำลังทำแบบทดสอบ';
  if (page === 'news') return 'กำลังอ่านข่าว';
  if (page === 'discussion') return 'กำลังใช้กระดานสนทนา';
  if (page === 'shop') return 'กำลังดูสินค้า';
  if (page === 'knowledge-graph') return 'กำลังดูแผนที่เครือข่ายความรู้';
  if (page.startsWith('admin')) return 'อยู่ในระบบหลังบ้าน';
  return 'กำลังใช้งานหน้าแดชบอร์ด';
};

const buildLinePath = (values: number[], width: number, height: number, padding: number) => {
  if (values.length === 0) return '';
  const max = Math.max(...values, 1);
  const step = values.length === 1 ? 0 : (width - padding * 2) / (values.length - 1);
  return values.map((value, index) => {
    const x = padding + step * index;
    const y = height - padding - ((value / max) * (height - padding * 2));
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
};

const buildAreaPath = (values: number[], width: number, height: number, padding: number) => {
  if (values.length === 0) return '';
  const line = buildLinePath(values, width, height, padding);
  const max = Math.max(...values, 1);
  const step = values.length === 1 ? 0 : (width - padding * 2) / (values.length - 1);
  const lastX = padding + step * (values.length - 1);
  const firstX = padding;
  const baseY = height - padding;
  const firstY = height - padding - ((values[0] / max) * (height - padding * 2));
  return `${line} L ${lastX} ${baseY} L ${firstX} ${baseY} L ${firstX} ${firstY} Z`;
};

const AdminUserInsights: React.FC<AdminUserInsightsProps> = ({ users }) => {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLogRow[]>([]);
  const [lessonProgressRows, setLessonProgressRows] = useState<LessonProgressSummaryRow[]>([]);
  const [studyTimeMap, setStudyTimeMap] = useState<Record<string, Record<string, number>>>({});
  const [signupRange, setSignupRange] = useState<SignupRange>('daily');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [sessionsData, logsData, studyRows, progressRows] = await Promise.all([
          userActivityService.getOnlineSessions(),
          userActivityService.getDailyLoginLogs(),
          userActivityService.getAllStudyTimeRows(),
          userActivityService.getAllLessonProgressRows(),
        ]);
        setSessions(sessionsData || []);
        setLoginLogs(logsData || []);
        setLessonProgressRows(progressRows || []);

        const studyMap: Record<string, Record<string, number>> = {};
        (studyRows || []).forEach((row) => {
          if (!row.user_id || !row.topic_id) return;
          if (!studyMap[row.user_id]) {
            studyMap[row.user_id] = {};
          }
          studyMap[row.user_id][row.topic_id] = (studyMap[row.user_id][row.topic_id] || 0) + Number(row.seconds || 0);
        });
        setStudyTimeMap(studyMap);
      } catch (error) {
        console.error('Failed to load user insights', error);
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [users]);

  const insights = useMemo(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * MS_PER_DAY);
    const totalUsers = users.length;
    const onlineUsers = sessions.filter(entry => new Date(entry.last_active_at) >= fiveMinutesAgo);
    const currentUser = getStoredUser();
    if (currentUser && !onlineUsers.some(entry => entry.user_id === currentUser.id)) {
      onlineUsers.push({
        user_id: currentUser.id,
        user_name: currentUser.name,
        current_page: 'admin:user-insights',
        last_active_at: now.toISOString(),
      });
    }
    const learningUsers = onlineUsers.filter(entry => entry.current_page.startsWith('lesson') || entry.current_page.startsWith('topic'));
    const examUsers = onlineUsers.filter(entry => entry.current_page.includes('exam'));
    const usersWithStudyTime = Object.entries(studyTimeMap).filter(([, value]) =>
      Object.values(value).some(seconds => Number(seconds || 0) > 0)
    ).length;
    const usersWithoutStudyTime = Math.max(0, totalUsers - usersWithStudyTime);
    const usersOver5Min = Object.entries(studyTimeMap).filter(([, value]) =>
      Object.values(value).reduce((sum, seconds) => sum + Number(seconds || 0), 0) >= 300
    ).length;
    const over5MinPercent = totalUsers > 0 ? Math.round((usersOver5Min / totalUsers) * 100) : 0;

    const partAUserIds = new Set<string>();
    const partBUserIds = new Set<string>();
    let partATotalTime = 0;
    let partBTotalTime = 0;

    Object.values(studyTimeMap).forEach((value) => {
      Object.entries(value).forEach(([topicId, seconds]) => {
        const lower = topicId.toLowerCase();
        if (lower.startsWith('a')) {
          partATotalTime += Number(seconds || 0);
        }
        if (lower.startsWith('b')) {
          partBTotalTime += Number(seconds || 0);
        }
      });
    });

    Object.entries(studyTimeMap).forEach(([userId, value]) => {
      Object.keys(value).forEach((topicId) => {
        const lower = topicId.toLowerCase();
        if (lower.startsWith('a')) partAUserIds.add(userId);
        if (lower.startsWith('b')) partBUserIds.add(userId);
      });
    });

    lessonProgressRows.forEach((row) => {
      const key = `${row.topic_id || row.chapter_id || ''}`.toLowerCase();
      if (key.startsWith('a')) partAUserIds.add(row.user_id);
      if (key.startsWith('b')) partBUserIds.add(row.user_id);
    });

    const partACount = partAUserIds.size;
    const partBCount = partBUserIds.size;

    const recentSessionUserIds = new Set(
      sessions
        .filter(entry => new Date(entry.last_active_at) >= threeDaysAgo)
        .map(entry => entry.user_id)
    );

    const inactiveUsers = users.filter(entry => !recentSessionUserIds.has(entry.id));

    const signupDaily = new Map<string, number>();
    const signupWeekly = new Map<string, number>();
    const signupMonthly = new Map<string, number>();

    users.forEach((entry) => {
      if (!entry.createdAt) return;
      const createdAt = new Date(entry.createdAt);
      if (Number.isNaN(createdAt.getTime())) return;
      const dailyKey = isoDay(createdAt);
      const weeklyKey = weekKey(createdAt);
      const monthlyValue = monthKey(createdAt);
      signupDaily.set(dailyKey, (signupDaily.get(dailyKey) || 0) + 1);
      signupWeekly.set(weeklyKey, (signupWeekly.get(weeklyKey) || 0) + 1);
      signupMonthly.set(monthlyValue, (signupMonthly.get(monthlyValue) || 0) + 1);
    });

    const todayKey = isoDay(now);
    const weekStartKey = weekKey(now);
    const currentMonthKey = monthKey(now);
    const signupsToday = signupDaily.get(todayKey) || 0;
    const signupsThisWeek = signupWeekly.get(weekStartKey) || 0;
    const signupsThisMonth = signupMonthly.get(currentMonthKey) || 0;

    const buildSeries = (range: SignupRange) => {
      const points: { label: string; count: number; rawKey: string }[] = [];
      if (range === 'daily') {
        for (let index = 13; index >= 0; index -= 1) {
          const date = new Date(now.getTime() - index * MS_PER_DAY);
          const key = isoDay(date);
          points.push({
            rawKey: key,
            label: rangeLabel(key, 'daily'),
            count: signupDaily.get(key) || 0,
          });
        }
      } else if (range === 'weekly') {
        const base = startOfWeek(now);
        for (let index = 9; index >= 0; index -= 1) {
          const date = new Date(base);
          date.setDate(base.getDate() - index * 7);
          const key = isoDay(date);
          points.push({
            rawKey: key,
            label: rangeLabel(key, 'weekly'),
            count: signupWeekly.get(key) || 0,
          });
        }
      } else {
        for (let index = 11; index >= 0; index -= 1) {
          const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
          const key = monthKey(date);
          points.push({
            rawKey: key,
            label: rangeLabel(key, 'monthly'),
            count: signupMonthly.get(key) || 0,
          });
        }
      }
      return points;
    };

    const signupSeries = buildSeries(signupRange);
    const maxSignupValue = Math.max(...signupSeries.map(point => point.count), 1);

    const dailyLogins = [];
    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(now.getTime() - index * MS_PER_DAY);
      const key = isoDay(date);
      dailyLogins.push({
        label: new Date(key).toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric' }),
        count: loginLogs.filter(entry => entry.login_date === key).length,
      });
    }

    return {
      totalUsers,
      onlineUsers,
      onlineCount: onlineUsers.length,
      learningCount: learningUsers.length,
      examCount: examUsers.length,
      usersWithStudyTime,
      usersWithoutStudyTime,
      usersOver5Min,
      over5MinPercent,
      partACount,
      partBCount,
      partATotalTime,
      partBTotalTime,
      inactiveUsers: inactiveUsers.slice(0, 20),
      signupsToday,
      signupsThisWeek,
      signupsThisMonth,
      signupSeries,
      maxSignupValue,
      dailyLogins,
    };
  }, [lessonProgressRows, loginLogs, sessions, signupRange, studyTimeMap, users]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} วินาที`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} นาที`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ชม. ${minutes % 60} นาที`;
  };

  const chartValues = insights.signupSeries.map(point => point.count);
  const chartLine = buildLinePath(chartValues, 920, 260, 24);
  const chartArea = buildAreaPath(chartValues, 920, 260, 24);
  const dailyLoginMax = Math.max(...insights.dailyLogins.map(entry => entry.count), 1);
  const dailyLoginBarColors = [
    'bg-rose-500',
    'bg-orange-500',
    'bg-amber-400',
    'bg-yellow-400',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-blue-600',
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p>กำลังโหลดข้อมูลผู้ใช้งาน...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5">
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">สมาชิกทั้งหมด</div>
          <div className="mt-2 text-4xl font-black text-slate-900">{insights.totalUsers}</div>
          <div className="mt-2 text-sm text-slate-500">นับจากโปรไฟล์สมาชิกในฐานข้อมูล</div>
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-white p-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <Wifi className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">ออนไลน์ตอนนี้</div>
          <div className="mt-2 text-4xl font-black text-emerald-600">{insights.onlineCount}</div>
          <div className="mt-2 text-sm text-slate-500">อัปเดตจากการใช้งานใน 5 นาทีล่าสุด</div>
        </div>

        <div className="rounded-[28px] border border-violet-200 bg-white p-5">
          <div className="w-11 h-11 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">เรียนหรือสอบอยู่</div>
          <div className="mt-2 text-4xl font-black text-violet-600">{insights.learningCount + insights.examCount}</div>
          <div className="mt-2 text-sm text-slate-500">กำลังเรียน {insights.learningCount} คน, ทำข้อสอบ {insights.examCount} คน</div>
        </div>

        <div className="rounded-[28px] border border-cyan-200 bg-white p-5">
          <div className="w-11 h-11 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">สมัครสัปดาห์นี้</div>
          <div className="mt-2 text-4xl font-black text-cyan-700">{insights.signupsThisWeek}</div>
          <div className="mt-2 text-sm text-slate-500">สมาชิกใหม่จากข้อมูลสมัครใช้งานจริง</div>
        </div>

        <div className="rounded-[28px] border border-rose-200 bg-white p-5">
          <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
            <UserX className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">ยังไม่เริ่มเรียน</div>
          <div className="mt-2 text-4xl font-black text-rose-600">{insights.usersWithoutStudyTime}</div>
          <div className="mt-2 text-sm text-slate-500">ผู้ใช้ที่ยังไม่มีเวลาเรียนสะสม</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-[28px] border border-blue-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">ก</div>
            <div>
              <div className="text-lg font-bold text-slate-900">สถิติภาค ก</div>
              <div className="text-sm text-slate-500">นับจากเวลาเรียนจริงในหมวดภาค ก</div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">ผู้เข้าเรียน</span>
              <span className="text-2xl font-black text-blue-700">{insights.partACount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">คิดเป็น</span>
              <span className="font-bold text-slate-900">{insights.totalUsers > 0 ? Math.round((insights.partACount / insights.totalUsers) * 100) : 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">เวลาเรียนรวม</span>
              <span className="font-bold text-slate-900">{formatTime(insights.partATotalTime)}</span>
            </div>
          </div>
          <div className="mt-5 h-2.5 rounded-full bg-blue-50 overflow-hidden">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${insights.totalUsers > 0 ? (insights.partACount / insights.totalUsers) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="rounded-[28px] border border-violet-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-black">ข</div>
            <div>
              <div className="text-lg font-bold text-slate-900">สถิติภาค ข</div>
              <div className="text-sm text-slate-500">นับจากเวลาเรียนจริงในหมวดภาค ข</div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">ผู้เข้าเรียน</span>
              <span className="text-2xl font-black text-violet-700">{insights.partBCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">คิดเป็น</span>
              <span className="font-bold text-slate-900">{insights.totalUsers > 0 ? Math.round((insights.partBCount / insights.totalUsers) * 100) : 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">เวลาเรียนรวม</span>
              <span className="font-bold text-slate-900">{formatTime(insights.partBTotalTime)}</span>
            </div>
          </div>
          <div className="mt-5 h-2.5 rounded-full bg-violet-50 overflow-hidden">
            <div className="h-full rounded-full bg-violet-500" style={{ width: `${insights.totalUsers > 0 ? (insights.partBCount / insights.totalUsers) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">เรียนเกิน 5 นาที</div>
              <div className="text-sm text-slate-500">สมาชิกที่เริ่มใช้งานจริงแล้ว</div>
            </div>
          </div>
          <div className="text-center py-4">
            <div className="text-5xl font-black text-emerald-600">{insights.usersOver5Min}</div>
            <div className="mt-2 text-sm text-slate-500">{insights.over5MinPercent}% ของสมาชิกทั้งหมด</div>
          </div>
          <div className="h-2.5 rounded-full bg-emerald-50 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${insights.over5MinPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              สมาชิกใหม่ในระบบ
            </div>
            <div className="text-sm text-slate-500 mt-1">ดูแนวโน้มการสมัครใช้งานแบบรายวัน รายสัปดาห์ และรายเดือนจากข้อมูลจริงของสมาชิก</div>
          </div>
          <div className="inline-flex rounded-2xl bg-slate-100 p-1">
            {(['daily', 'weekly', 'monthly'] as SignupRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setSignupRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  signupRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range === 'daily' ? 'รายวัน' : range === 'weekly' ? 'รายสัปดาห์' : 'รายเดือน'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">วันนี้</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{insights.signupsToday}</div>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">สัปดาห์นี้</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{insights.signupsThisWeek}</div>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">เดือนนี้</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{insights.signupsThisMonth}</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-white p-4 md:p-5">
          <svg viewBox="0 0 920 260" className="w-full h-[260px]">
            <defs>
              <linearGradient id="signup-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((index) => {
              const y = 24 + ((212 / 3) * index);
              return (
                <line
                  key={index}
                  x1="24"
                  x2="896"
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 6"
                />
              );
            })}
            <path d={chartArea} fill="url(#signup-area)" />
            <path d={chartLine} fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {insights.signupSeries.map((point, index) => {
              const x = 24 + ((920 - 48) / Math.max(insights.signupSeries.length - 1, 1)) * index;
              const y = 236 - ((point.count / insights.maxSignupValue) * 212);
              return (
                <g key={point.rawKey}>
                  <circle cx={x} cy={y} r="5" fill="#4f46e5" />
                  <circle cx={x} cy={y} r="10" fill="#4f46e5" fillOpacity="0.12" />
                  <text x={x} y={y - 14} textAnchor="middle" className="fill-slate-500 text-[11px] font-bold">
                    {point.count}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: `repeat(${insights.signupSeries.length}, minmax(0, 1fr))` }}>
            {insights.signupSeries.map((point) => (
              <div key={point.rawKey} className="text-center">
                <div className="text-[11px] font-semibold text-slate-600">{point.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-5">
            <Activity className="w-5 h-5 text-indigo-500" />
            การเข้าใช้งาน 7 วันล่าสุด
          </div>
          <div className="grid grid-cols-7 gap-3 items-end h-52">
            {insights.dailyLogins.map((item) => {
              const fillPercent = item.count > 0 ? Math.max((item.count / dailyLoginMax) * 100, 8) : 0;
              const colorIndex = item.count > 0 ? Math.min(6, Math.ceil((item.count / dailyLoginMax) * 7) - 1) : 0;
              return (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-bold text-slate-600">{item.count}</div>
                  <div
                    className="w-full h-40 rounded-2xl border border-indigo-100 bg-slate-100/80 p-1 flex items-end overflow-hidden"
                    title={`${item.label}: ${item.count} คน`}
                  >
                    <div
                      className={`w-full rounded-xl ${dailyLoginBarColors[colorIndex]} transition-[height] duration-300`}
                      style={{ height: `${fillPercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-white p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Wifi className="w-5 h-5 text-emerald-500" />
                ผู้ใช้งานที่กำลังออนไลน์
              </div>
              <div className="text-sm text-slate-500 mt-1">แสดงผู้ใช้ที่มี heartbeat ภายใน 5 นาทีล่าสุด</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {insights.onlineCount} คน
            </div>
          </div>

          {insights.onlineUsers.length > 0 ? (
            <div className="space-y-3">
              {insights.onlineUsers.slice(0, 8).map((entry) => (
                <div key={entry.user_id} className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{entry.user_name || 'ผู้ใช้งาน'}</div>
                    <div className="text-sm text-slate-500 truncate">{sessionLabel(entry.current_page)}</div>
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold whitespace-nowrap">
                    {new Date(entry.last_active_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-10 text-center text-slate-500">
              ยังไม่มีผู้ใช้งานออนไลน์ในขณะนี้
            </div>
          )}
        </div>
      </div>

      {insights.inactiveUsers.length > 0 && (
        <div className="rounded-[28px] border border-rose-200 bg-white p-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-5">
            <UserX className="w-5 h-5 text-rose-500" />
            บัญชีที่ไม่พบกิจกรรมเกิน 3 วัน
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-rose-100 bg-rose-50/60">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">ชื่อ</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">อีเมล</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">วันที่สมัคร</th>
                </tr>
              </thead>
              <tbody>
                {insights.inactiveUsers.map((entry) => (
                  <tr key={entry.id} className="border-b border-rose-50 last:border-b-0">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{entry.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('th-TH') : '-'}
                    </td>
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
