import React, { useState, useEffect } from 'react';
import { ShieldAlert, Ban, CheckCircle2, XCircle, Search, AlertTriangle, UserX } from 'lucide-react';
import { contentService } from '../../services/contentService';

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  type: 'post' | 'comment' | 'user';
  targetId?: string; // ID of post or comment
  targetContent?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BannedUser {
  userId: string;
  userName: string;
  banType: 'temporary' | 'permanent';
  banUntil?: string; // ISO string for temporary bans
  reason: string;
  bannedAt: string;
  bannedBy: string;
}

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [activeTab, setActiveTab] = useState<'reports' | 'banned'>('reports');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ban modal state
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [banType, setBanType] = useState<'temporary' | 'permanent'>('temporary');
  const [banDurationDays, setBanDurationDays] = useState(1);
  const [banReason, setBanReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadModerationData();
  }, []);

  const loadModerationData = async () => {
    setIsLoading(true);
    try {
      const [reportRows, bannedRows] = await Promise.all([
        contentService.getReports(),
        contentService.getBannedUsers(),
      ]);
      setReports(reportRows as Report[]);
      setBannedUsers(bannedRows as BannedUser[]);
    } catch (error) {
      console.error('Failed to load moderation data', error);
      setReports([]);
      setBannedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectReport = async (reportId: string) => {
    setIsLoading(true);
    try {
      const updated = await contentService.updateReportStatus(reportId, 'rejected');
      setReports(current => current.map(item => item.id === reportId ? updated as Report : item));
    } catch (error) {
      console.error('Failed to reject report', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenBanModal = (report: Report) => {
    setSelectedReport(report);
    setBanReason(report.reason);
    setShowBanModal(true);
  };

  const handleConfirmBan = async () => {
    if (!selectedReport) return;

    const newBannedUser: BannedUser = {
      userId: selectedReport.reportedUserId,
      userName: selectedReport.reportedUserName,
      banType,
      reason: banReason,
      bannedAt: new Date().toISOString(),
      bannedBy: 'Admin ผู้ดูแลระบบ',
    };

    if (banType === 'temporary') {
      const banUntil = new Date();
      banUntil.setDate(banUntil.getDate() + banDurationDays);
      newBannedUser.banUntil = banUntil.toISOString();
    }

    setIsLoading(true);
    try {
      const [savedBan, updatedReport] = await Promise.all([
        contentService.saveBannedUser(newBannedUser),
        contentService.updateReportStatus(selectedReport.id, 'approved'),
      ]);

      setBannedUsers(current => [savedBan as BannedUser, ...current.filter(item => item.userId !== newBannedUser.userId)]);
      setReports(current => current.map(item => item.id === selectedReport.id ? updatedReport as Report : item));
      setShowBanModal(false);
      setSelectedReport(null);
    } catch (error) {
      console.error('Failed to ban user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnban = async (userId: string, userName: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะปลดแบนผู้ใช้นี้?')) {
      setIsLoading(true);
      try {
        await contentService.deleteBannedUser(userId);
        setBannedUsers(current => current.filter(item => item.userId !== userId && item.userName !== userName));
      } catch (error) {
        console.error('Failed to unban user', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  const filteredBannedUsers = bannedUsers.filter(u => u.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'reports' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          รายงานรอตรวจสอบ ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveTab('banned')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'banned' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          รายชื่อผู้ใช้ที่ถูกระงับ ({bannedUsers.length})
        </button>
      </div>

      {activeTab === 'reports' && (
        <div className="space-y-4">
          {isLoading && pendingReports.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">กำลังโหลดรายงาน...</p>
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">ไม่มีรายงานใหม่</p>
            </div>
          ) : (
            pendingReports.map(report => (
              <div key={report.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase">
                      {report.type === 'post' ? 'กระทู้' : report.type === 'comment' ? 'ความคิดเห็น' : 'ผู้ใช้'}
                    </span>
                    <span className="text-sm text-slate-500">{new Date(report.date).toLocaleString('th-TH')}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">ผู้ถูกรายงาน:</span>
                    <span className="ml-2 font-bold text-slate-800">{report.reportedUserName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">เหตุผล:</span>
                    <span className="ml-2 text-slate-800">{report.reason}</span>
                  </div>
                  {report.targetContent && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 italic">
                      "{report.targetContent}"
                    </div>
                  )}
                  <div className="text-xs text-slate-400">
                    รายงานโดย: {report.reporterName}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleRejectReport(report.id)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    เพิกเฉย
                  </button>
                  <button
                    onClick={() => handleOpenBanModal(report)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Ban className="w-4 h-4" />
                    ระงับผู้ใช้
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'banned' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-sm">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อผู้ใช้..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">ผู้ใช้งาน</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">ประเภทการระงับ</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">เหตุผล</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">วันที่ถูกระงับ</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && filteredBannedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      กำลังโหลดรายชื่อผู้ใช้ที่ถูกระงับ...
                    </td>
                  </tr>
                )}
                {filteredBannedUsers.map(user => (
                  <tr key={user.userId} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{user.userName}</td>
                    <td className="px-6 py-4">
                      {user.banType === 'permanent' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          <Ban className="w-3 h-3" /> ถาวร
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <AlertTriangle className="w-3 h-3" /> ชั่วคราว (ถึง {new Date(user.banUntil!).toLocaleDateString('th-TH')})
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{user.reason}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(user.bannedAt).toLocaleDateString('th-TH')}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleUnban(user.userId, user.userName)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                      >
                        ปลดแบน
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredBannedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      ไม่พบข้อมูลผู้ใช้ที่ถูกระงับ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {showBanModal && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <UserX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">ระงับผู้ใช้งาน</h3>
                <p className="text-sm text-slate-500">{selectedReport.reportedUserName}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ประเภทการระงับ</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBanType('temporary')}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                      banType === 'temporary' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ชั่วคราว
                  </button>
                  <button
                    onClick={() => setBanType('permanent')}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                      banType === 'permanent' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ถาวร
                  </button>
                </div>
              </div>

              {banType === 'temporary' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ระยะเวลา (วัน)</label>
                  <input
                    type="number"
                    min="1"
                    value={banDurationDays}
                    onChange={(e) => setBanDurationDays(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">ผู้ใช้จะสามารถเข้าเรียนได้ แต่ไม่สามารถตั้งกระทู้หรือตอบคำถามได้</p>
                </div>
              )}

              {banType === 'permanent' && (
                <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                  ผู้ใช้จะไม่สามารถเข้าสู่ระบบได้อีกต่อไป
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">เหตุผล</label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none h-24"
                  placeholder="ระบุเหตุผลในการระงับ..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBanModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmBan}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                ยืนยันการระงับ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
