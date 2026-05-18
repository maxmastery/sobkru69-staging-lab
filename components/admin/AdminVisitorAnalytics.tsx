import React, { useEffect, useState } from 'react';
import { BarChart3, Globe2, MonitorSmartphone, MousePointerClick, RefreshCw, RotateCcw, Smartphone, Users } from 'lucide-react';
import { visitorAnalyticsService, VisitorAnalyticsSummary } from '../../services/visitorAnalyticsService';

const emptySummary: VisitorAnalyticsSummary = {
  totalVisitors: 0,
  totalEvents: 0,
  dailyVisitors: 0,
  returningVisitors: 0,
  mobileVisitors: 0,
  desktopVisitors: 0,
  topPages: [],
  topClicks: [],
  sources: [],
  averageScrollDepth: 0,
};

const AdminVisitorAnalytics: React.FC = () => {
  const [summary, setSummary] = useState<VisitorAnalyticsSummary>(emptySummary);

  const refresh = () => setSummary(visitorAnalyticsService.getSummary());

  useEffect(() => {
    refresh();
  }, []);

  const resetLocal = () => {
    localStorage.removeItem('sobkru:visitor-events:v1');
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold leading-6 text-amber-900">
        Analytics ชุดนี้เก็บใน localStorage สำหรับทดสอบ localhost เท่านั้น ยังไม่เขียนลง production database จนกว่าจะเพิ่ม migration และอนุมัติ deploy
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Visitor Analytics</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">สถิติ public access, traffic source, click และ scroll depth</p>
        </div>
        <div className="flex gap-2">
          <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button onClick={resetLocal} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50">
            <RotateCcw className="h-4 w-4" />
            Reset local
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: 'Total Visitors', value: summary.totalVisitors },
          { icon: Globe2, label: 'Daily Visitors', value: summary.dailyVisitors },
          { icon: MonitorSmartphone, label: 'Returning', value: summary.returningVisitors },
          { icon: BarChart3, label: 'Avg. Scroll', value: `${summary.averageScrollDepth}%` },
        ].map(item => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <item.icon className="h-6 w-6 text-slate-700" />
            <div className="mt-4 text-3xl font-black text-slate-900">{item.value}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            หน้าที่ถูกเข้าชม
          </h3>
          <div className="space-y-3">
            {summary.topPages.length === 0 ? <EmptyRow /> : summary.topPages.map(row => <BarRow key={row.page} label={row.page} value={row.count} max={summary.topPages[0]?.count || 1} />)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
            <MousePointerClick className="h-5 w-5 text-amber-600" />
            Click Tracking
          </h3>
          <div className="space-y-3">
            {summary.topClicks.length === 0 ? <EmptyRow /> : summary.topClicks.map(row => <BarRow key={row.label} label={row.label} value={row.count} max={summary.topClicks[0]?.count || 1} />)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
            <Globe2 className="h-5 w-5 text-emerald-600" />
            Traffic Source
          </h3>
          <div className="space-y-3">
            {summary.sources.length === 0 ? <EmptyRow /> : summary.sources.map(row => <BarRow key={row.source} label={row.source} value={row.count} max={summary.sources[0]?.count || 1} />)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
            <Smartphone className="h-5 w-5 text-indigo-600" />
            Device Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-2xl font-black text-slate-900">{summary.mobileVisitors}</div>
              <div className="text-sm font-bold text-slate-500">Mobile</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-2xl font-black text-slate-900">{summary.desktopVisitors}</div>
              <div className="text-sm font-bold text-slate-500">Desktop</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarRow = ({ label, value, max }: { label: string; value: number; max: number }) => (
  <div>
    <div className="mb-1 flex items-center justify-between gap-3 text-sm font-bold">
      <span className="truncate text-slate-700">{label}</span>
      <span className="text-slate-500">{value}</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.max(8, (value / max) * 100)}%` }} />
    </div>
  </div>
);

const EmptyRow = () => (
  <div className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm font-semibold text-slate-500">
    ยังไม่มีข้อมูลใน localhost
  </div>
);

export default AdminVisitorAnalytics;
