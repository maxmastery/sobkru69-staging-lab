import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CalendarDays, Clock3, Loader2, RadioTower, RefreshCcw, UserCheck, Wifi } from 'lucide-react';
import { User } from '../../services/authService';
import { getStoredUser, userActivityService } from '../../services/userActivityService';

interface AdminUserActiveProps {
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

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate());
const toDateKey = (value: Date) => startOfDay(value).toISOString().split('T')[0];

const sessionLabel = (page: string) => {
  if (page.startsWith('admin')) return 'อยู่ในระบบหลังบ้าน';
  if (page.startsWith('lesson')) return 'กำลังเรียนบทเรียน';
  if (page.startsWith('topic')) return 'กำลังเลือกหัวข้อ';
  if (page.includes('exam')) return 'กำลังทำแบบทดสอบ';
  if (page === 'news') return 'กำลังอ่านข่าว';
  if (page === 'discussion') return 'กำลังใช้กระดานสนทนา';
  if (page === 'shop') return 'กำลังดูไฟล์ E-book';
  return 'กำลังใช้งานหน้าแดชบอร์ด';
};

const formatLastSeen = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('th-TH', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const resolveDisplayName = (userId: string, sessions: SessionRow[], userMap: Map<string, User>) => {
  const user = userMap.get(userId);
  if (user?.name) return user.name;
  const session = sessions.find((entry) => entry.user_id === userId);
  return session?.user_name || 'ผู้ใช้งาน';
};

const AdminUserActive: React.FC<AdminUserActiveProps> = ({ users }) => {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLogRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const loadActivity = async () => {
    setIsLoading(true);
    try {
      const [sessionsData, logsData] = await Promise.all([
        userActivityService.getOnlineSessions(),
        userActivityService.getDailyLoginLogs(),
      ]);
      setSessions(sessionsData || []);
      setLoginLogs(logsData || []);
      setUpdatedAt(new Date());
    } catch (error) {
      console.error('Failed to load active users', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadActivity();
    const interval = window.setInterval(() => {
      void loadActivity();
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const sevenDaysAgoKey = toDateKey(new Date(now.getTime() - 6 * MS_PER_DAY));
    const thirtyDaysAgoKey = toDateKey(new Date(now.getTime() - 29 * MS_PER_DAY));
    const userMap = new Map(users.map((user) => [user.id, user]));

    const onlineUsers = sessions.filter((entry) => new Date(entry.last_active_at) >= fiveMinutesAgo);
    const currentUser = getStoredUser();
    if (currentUser && !onlineUsers.some((entry) => entry.user_id === currentUser.id)) {
      onlineUsers.push({
        user_id: currentUser.id,
        user_name: currentUser.name,
        current_page: 'admin:user-active',
        last_active_at: now.toISOString(),
      });
    }

    const weekIds = new Set<string>();
    const monthIds = new Set<string>();

    loginLogs.forEach((entry) => {
      if (entry.login_date >= sevenDaysAgoKey) weekIds.add(entry.user_id);
      if (entry.login_date >= thirtyDaysAgoKey) monthIds.add(entry.user_id);
    });

    sessions.forEach((entry) => {
      const activeKey = toDateKey(new Date(entry.last_active_at));
      if (activeKey >= sevenDaysAgoKey) weekIds.add(entry.user_id);
      if (activeKey >= thirtyDaysAgoKey) monthIds.add(entry.user_id);
    });

    onlineUsers.forEach((entry) => {
      weekIds.add(entry.user_id);
      monthIds.add(entry.user_id);
    });

    const buildActiveRows = (ids: Set<string>) => Array.from(ids).map((userId) => {
      const session = sessions.find((entry) => entry.user_id === userId);
      const user = userMap.get(userId);
      const lastLogin = loginLogs
        .filter((entry) => entry.user_id === userId)
        .sort((a, b) => b.login_date.localeCompare(a.login_date))[0];

      return {
        userId,
        name: resolveDisplayName(userId, sessions, userMap),
        email: user?.email || '-',
        lastPage: session ? sessionLabel(session.current_page) : 'มีประวัติเข้าใช้งาน',
        lastSeenAt: session?.last_active_at || lastLogin?.created_at || lastLogin?.login_date || '',
        isOnline: onlineUsers.some((entry) => entry.user_id === userId),
      };
    }).sort((a, b) => {
      if (a.isOnline !== b.isOnline) return a.isOnline ? -1 : 1;
      return new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime();
    });

    const activeSystemUsers = users.filter((user) => user.isActive !== false).length;

    return {
      activeSystemUsers,
      onlineUsers,
      weekUsers: buildActiveRows(weekIds),
      monthUsers: buildActiveRows(monthIds),
      weekPercent: activeSystemUsers > 0 ? Math.round((weekIds.size / activeSystemUsers) * 100) : 0,
      monthPercent: activeSystemUsers > 0 ? Math.round((monthIds.size / activeSystemUsers) * 100) : 0,
    };
  }, [loginLogs, sessions, users]);

  if (isLoading && !updatedAt) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-white py-20 text-slate-500">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-emerald-500" />
        กำลังโหลดข้อมูล User Active...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[34px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
              <RadioTower className="h-4 w-4" />
              User Active Monitor
            </div>
            <h3 className="mt-4 text-3xl font-black text-slate-950">ภาพรวมผู้ใช้งาน Active</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              แยกจำนวนบัญชีที่เปิดใช้งานทั้งหมด ออกจากสถานะออนไลน์แบบ heartbeat และบัญชีที่มีการเข้าใช้งานในรอบ 7 วันและ 30 วันล่าสุด
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadActivity()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            รีเฟรช
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <UserCheck className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">บัญชีที่เปิดใช้งาน</div>
            <div className="mt-2 text-4xl font-black text-slate-950">{metrics.activeSystemUsers}</div>
            <div className="mt-1 text-xs font-bold text-slate-400">ไม่รวมบัญชีที่ถูกปิดใช้งาน</div>
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-emerald-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Wifi className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">ออนไลน์ตอนนี้</div>
            <div className="mt-2 text-4xl font-black text-emerald-600">{metrics.onlineUsers.length}</div>
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-cyan-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Active 7 วัน</div>
            <div className="mt-2 text-4xl font-black text-cyan-700">{metrics.weekUsers.length}</div>
            <div className="mt-1 text-xs font-bold text-slate-400">{metrics.weekPercent}% ของบัญชีที่เปิดใช้งาน</div>
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-indigo-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <Activity className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Active 30 วัน</div>
            <div className="mt-2 text-4xl font-black text-indigo-700">{metrics.monthUsers.length}</div>
            <div className="mt-1 text-xs font-bold text-slate-400">{metrics.monthPercent}% ของบัญชีที่เปิดใช้งาน</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[30px] border border-emerald-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-950">
                <Wifi className="h-5 w-5 text-emerald-500" />
                ออนไลน์อยู่ตอนนี้
              </div>
              <p className="mt-1 text-sm text-slate-500">ผู้ใช้ที่มี heartbeat ภายใน 5 นาทีล่าสุด</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">
              {metrics.onlineUsers.length} คน
            </div>
          </div>

          {metrics.onlineUsers.length > 0 ? (
            <div className="space-y-3">
              {metrics.onlineUsers.map((entry) => (
                <div key={entry.user_id} className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                  <div className="min-w-0">
                    <div className="truncate font-black text-slate-950">{entry.user_name || 'ผู้ใช้งาน'}</div>
                    <div className="truncate text-sm text-slate-500">{sessionLabel(entry.current_page)}</div>
                  </div>
                  <div className="text-sm font-black text-emerald-700">
                    {new Date(entry.last_active_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-12 text-center text-sm font-semibold text-slate-500">
              ยังไม่มีผู้ใช้งานออนไลน์ในขณะนี้
            </div>
          )}
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-950">
                <Clock3 className="h-5 w-5 text-cyan-600" />
                Active รอบสัปดาห์
              </div>
              <p className="mt-1 text-sm text-slate-500">บัญชีที่มีการเข้าใช้งานใน 7 วันล่าสุด</p>
            </div>
            <div className="rounded-full bg-cyan-50 px-3 py-2 text-sm font-black text-cyan-700">
              {metrics.weekUsers.length} คน
            </div>
          </div>
          <div className="max-h-[420px] overflow-y-auto pr-1">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  <th className="py-3 pr-4">ชื่อ</th>
                  <th className="py-3 pr-4">สถานะล่าสุด</th>
                  <th className="py-3 text-right">ล่าสุด</th>
                </tr>
              </thead>
              <tbody>
                {metrics.weekUsers.map((entry) => (
                  <tr key={entry.userId} className="border-b border-slate-50 last:border-b-0">
                    <td className="py-3 pr-4">
                      <div className="font-bold text-slate-900">{entry.name}</div>
                      <div className="text-xs text-slate-400">{entry.email}</div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-500">
                      {entry.isOnline ? <span className="font-bold text-emerald-600">ออนไลน์ตอนนี้</span> : entry.lastPage}
                    </td>
                    <td className="py-3 text-right text-xs font-bold text-slate-500">{formatLastSeen(entry.lastSeenAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xl font-black text-slate-950">
              <CalendarDays className="h-5 w-5 text-indigo-600" />
              Active รอบเดือน
            </div>
            <p className="mt-1 text-sm text-slate-500">บัญชีที่มีการเข้าใช้งานใน 30 วันล่าสุด ใช้ตรวจภาพรวมผู้ใช้ที่ยังกลับมาใช้ระบบ</p>
          </div>
          {updatedAt && (
            <div className="text-xs font-bold text-slate-400">
              อัปเดตล่าสุด {updatedAt.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {metrics.monthUsers.slice(0, 30).map((entry) => (
            <div key={entry.userId} className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-black text-slate-950">{entry.name}</div>
                  <div className="truncate text-xs text-slate-400">{entry.email}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${entry.isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  {entry.isOnline ? 'Online' : 'Active'}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>{entry.lastPage}</span>
                <span>{formatLastSeen(entry.lastSeenAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserActive;
