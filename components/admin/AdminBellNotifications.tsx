import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { authService, BellNotification } from '../../services/authService';

const AdminBellNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<BellNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newNotification, setNewNotification] = useState({ title: '', message: '' });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getBellNotifications();
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch bell notifications", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotification.title || !newNotification.message) return;

    setIsLoading(true);
    try {
      const res = await authService.saveBellNotification({
        title: newNotification.title,
        message: newNotification.message
      });
      
      if (res.success) {
        await fetchNotifications();
        setNewNotification({ title: '', message: '' });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Failed to add notification", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleDeleteNotification = async () => {
    if (!deletingId) return;
    
    setIsLoading(true);
    try {
      const res = await authService.deleteBellNotification(deletingId);
      if (res.success) {
        const updatedNotifications = notifications.filter(n => n.id !== deletingId);
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error("Failed to delete notification", error);
    } finally {
      setIsLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">รายการแจ้งเตือนทั้งหมด</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          เพิ่มการแจ้งเตือน
        </button>
      </div>

      {isAdding && (
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <form onSubmit={handleAddNotification} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">หัวข้อ</label>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">รายละเอียด</label>
              <textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none h-24 resize-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            ไม่มีข้อมูลการแจ้งเตือน
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{notif.title}</h4>
                  <p className="text-slate-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(notif.date).toLocaleString('th-TH')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => confirmDelete(notif.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="ลบ"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">ยืนยันการลบ</h3>
            <p className="text-slate-600 mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการลบการแจ้งเตือนนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteNotification}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ลบ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBellNotifications;
