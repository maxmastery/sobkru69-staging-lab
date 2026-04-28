import React, { useEffect, useState, useMemo } from 'react';
import { Coffee, DollarSign, TrendingUp, Calendar, Loader2, Eye, ArrowLeft, ArrowRight, X, ImageIcon } from 'lucide-react';
import { contentService, ContentDonationRecord } from '../../services/contentService';
import { getSupabaseConfig } from '../../services/supabaseRest';

const AdminDonations: React.FC = () => {
  const [donations, setDonations] = useState<ContentDonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSlip, setSelectedSlip] = useState<string | null>(null);
  const itemsPerPage = 100;

  const supabaseConfig = useMemo(() => getSupabaseConfig(), []);

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

  const getSlipUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Note: We'll fetch this with headers in the modal instead of a direct link
    return path;
  };

  const filteredByDate = useMemo(() => {
    const startDate = new Date('2026-04-28T00:00:00');
    return donations.filter(d => new Date(d.date) >= startDate);
  }, [donations]);

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

    filteredByDate.forEach(d => {
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

  const totalPages = Math.ceil(filteredByDate.length / itemsPerPage);
  const paginatedDonations = filteredByDate.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [isFetchingSlip, setIsFetchingSlip] = useState(false);
  const [slipDataUrl, setSlipDataUrl] = useState<string | null>(null);

  const handleViewSlip = async (path: string) => {
    setIsFetchingSlip(true);
    setSelectedSlip(path);
    try {
      const res = await fetch(`${supabaseConfig.url}/storage/v1/object/authenticated/${supabaseConfig.slipsBucket}/${path}`, {
        headers: {
          'apikey': supabaseConfig.anonKey,
          'Authorization': `Bearer ${supabaseConfig.anonKey}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch slip');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setSlipDataUrl(url);
    } catch (error) {
      console.error('Error fetching slip:', error);
      setSlipDataUrl(null);
    } finally {
      setIsFetchingSlip(false);
    }
  };

  useEffect(() => {
    return () => {
      if (slipDataUrl) URL.revokeObjectURL(slipDataUrl);
    };
  }, [slipDataUrl]);

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
          <div className="relative text-slate-900">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Coffee className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">ยอดรวมทั้งหมด</p>
            <h4 className="text-3xl font-black">{summary.totalAll.toLocaleString()} ฿</h4>
            <p className="text-xs opacity-70 mt-1">{summary.countAll} รายการ</p>
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
            ประวัติการเลี้ยงกาแฟทั้งหมด ({filteredByDate.length} รายการ)
          </h3>
        </div>
        {filteredByDate.length === 0 ? (
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase w-16">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">วันที่</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ผู้เลี้ยงกาแฟ</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ประเภท</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ยอดเงิน</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">ใบเสร็จ</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDonations.map((d, idx) => (
                  <tr key={d.id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{new Date(d.date).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      <div className="font-bold">{(d as any).userName || 'ไม่ระบุ'}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{(d as any).userEmail || ''}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{d.type || 'ไม่ระบุ'}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-600">{Number(d.amount).toLocaleString()} ฿</td>
                    <td className="px-6 py-4">
                      {d.slip ? (
                        <button 
                          onClick={() => handleViewSlip(d.slip)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          ดูสลิป
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic">ไม่มีหลักฐาน</span>
                      )}
                    </td>
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

        {/* Footer with Stats and Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-slate-600">
            รวมทั้งหมด <span className="text-amber-600 font-bold">{summary.totalAll.toLocaleString()} ฿</span> ({summary.countAll} รายการ)
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="text-sm text-slate-500 font-medium">
                หน้า {currentPage} / {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slip Preview Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-[400px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                หลักฐานการโอนเงิน
              </h4>
              <button 
                onClick={() => {
                  setSelectedSlip(null);
                  setSlipDataUrl(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-50 flex items-center justify-center min-h-[300px]">
              {isFetchingSlip ? (
                <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  กำลังโหลดรูปภาพ...
                </div>
              ) : slipDataUrl ? (
                <img 
                  src={slipDataUrl} 
                  alt="Donation Slip" 
                  className="max-w-full max-h-[70vh] rounded-xl shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
                  <X className="w-8 h-8 text-red-400" />
                  ไม่สามารถโหลดรูปภาพได้
                </div>
              )}
            </div>
            <div className="p-4 bg-white border-t border-slate-100 text-center">
              <button 
                onClick={() => {
                  setSelectedSlip(null);
                  setSlipDataUrl(null);
                }}
                className="px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDonations;
