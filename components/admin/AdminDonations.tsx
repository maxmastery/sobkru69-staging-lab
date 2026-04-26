import React, { useEffect, useState, useMemo } from 'react';
import { Coffee, DollarSign, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { contentService, ContentDonationRecord } from '../../services/contentService';

const AdminDonations: React.FC = () => {
  const [donations, setDonations] = useState<ContentDonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await contentService.getAllDonations();
        setDonations(data);
      } catch (error) {
        console.error('Failed to load donations', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const summary = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // Start of week (Monday)
    const startOfWeek = new Date(now);
    const dayOfWeek = startOfWeek.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Start of month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalAll = 0;
    let totalToday = 0;
    let totalWeek = 0;
    let totalMonth = 0;
    let countAll = 0;

    donations.forEach(d => {
      const amount = Number(d.amount || 0);
      const dDate = new Date(d.date);
      const dDateStr = d.date.split('T')[0];

      totalAll += amount;
      countAll++;

      if (dDateStr === todayStr) totalToday += amount;
      if (dDate >= startOfWeek) totalWeek += amount;
      if (dDate >= startOfMonth) totalMonth += amount;
    });

    return { totalAll, totalToday, totalWeek, totalMonth, countAll };
  }, [donations]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p>กำลังโหลดข้อมูลการเลี้ยงกาแฟ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[50px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Coffee className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">ยอดรวมทั้งหมด</p>
            <h4 className="text-3xl font-black">{summary.totalAll.toLocaleString()} ฿</h4>
            <p className="text-xs text-white/70 mt-1">{summary.countAll} รายการ</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">วันนี้</p>
            <h4 className="text-3xl font-black text-green-600">{summary.totalToday.toLocaleString()} ฿</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">สัปดาห์นี้</p>
            <h4 className="text-3xl font-black text-blue-600">{summary.totalWeek.toLocaleString()} ฿</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-[40px] -mr-4 -mt-4"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">เดือนนี้</p>
            <h4 className="text-3xl font-black text-purple-600">{summary.totalMonth.toLocaleString()} ฿</h4>
          </div>
        </div>
      </div>

      {/* Donation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-500" />
            ประวัติการเลี้ยงกาแฟทั้งหมด ({donations.length} รายการ)
          </h3>
        </div>
        {donations.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-amber-300" />
            </div>
            <h4 className="text-lg font-bold text-slate-700 mb-2">ยังไม่มีรายการเลี้ยงกาแฟ</h4>
            <p className="text-slate-500 text-sm">รายการที่ผ่านการยืนยันสลิปแล้วจะปรากฏที่นี่</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">วันที่</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ประเภท</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ยอดเงิน</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.map((d, idx) => (
                  <tr key={d.id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{new Date(d.date).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{d.type || 'ไม่ระบุ'}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-600">{Number(d.amount).toLocaleString()} ฿</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        ยืนยันแล้ว
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;
