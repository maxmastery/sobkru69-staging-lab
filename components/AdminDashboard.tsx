import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Users, Bell, Save, Trash2, Edit2, Loader2, Plus, X, ArrowLeft, CheckCircle2, Megaphone, Newspaper, MessageSquare, ShoppingCart, Search, BarChart3, Eye, Image as ImageIcon, ShieldAlert } from 'lucide-react';
import { authService, User } from '../services/authService';
import AdminNews from './admin/AdminNews';
import AdminDiscussion from './admin/AdminDiscussion';
import AdminShop from './admin/AdminShop';
import AdminStatistics from './admin/AdminStatistics';
import AdminBellNotifications from './admin/AdminBellNotifications';
import AdminMessages from './admin/AdminMessages';
import AdminReports from './admin/AdminReports';
import { contentService } from '../services/contentService';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const viteEnv = (import.meta as any).env || {};
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'notification' | 'bell' | 'messages' | 'marquee' | 'news' | 'discussion' | 'shop' | 'statistics' | 'reports'>('settings');
  const normalizeSupabaseUrl = (rawValue: string) => {
    const value = rawValue.trim();
    const markdownMatch = value.match(/\((https?:\/\/[^)\s]+)\)/i);
    const extracted = markdownMatch?.[1] || value.replace(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/i, '$2');
    return extracted.replace(/^["']|["']$/g, '').replace(/\/+$/, '');
  };

  const [supabaseUrl, setSupabaseUrl] = useState(() => normalizeSupabaseUrl(localStorage.getItem('VITE_SUPABASE_URL') || viteEnv.VITE_SUPABASE_URL || ''));
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(localStorage.getItem('VITE_SUPABASE_ANON_KEY') || viteEnv.VITE_SUPABASE_ANON_KEY || '');
  const [imagesBucket, setImagesBucket] = useState(localStorage.getItem('VITE_SUPABASE_IMAGES_BUCKET') || viteEnv.VITE_SUPABASE_IMAGES_BUCKET || 'sobkru-images');
  const [slipsBucket, setSlipsBucket] = useState(localStorage.getItem('VITE_SUPABASE_SLIPS_BUCKET') || viteEnv.VITE_SUPABASE_SLIPS_BUCKET || 'sobkru-slips');
  const [filesBucket, setFilesBucket] = useState(localStorage.getItem('VITE_SUPABASE_FILES_BUCKET') || viteEnv.VITE_SUPABASE_FILES_BUCKET || 'sobkru-files');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ title: '', message: '', imageUrl: '', isActive: false });
  const [marquee, setMarquee] = useState({ text: '', isActive: true });
  const [saveMessage, setSaveMessage] = useState('');
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  // Users Table State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Editing & Viewing User State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', password: '' });

  const getAuthProviderLabel = (provider?: string) => {
    switch ((provider || '').toLowerCase()) {
      case 'google':
        return 'Google';
      case 'email':
        return 'อีเมล';
      case 'legacy':
        return 'บัญชีเก่า';
      case 'local-admin':
        return 'ผู้ดูแลระบบ';
      default:
        return provider || 'ไม่ระบุ';
    }
  };

  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'statistics') {
      fetchUsers();
    } else if (activeTab === 'notification') {
      fetchNotification();
    } else if (activeTab === 'marquee') {
      fetchMarquee();
    }
    fetchUnreadMessagesCount();
  }, [activeTab]);

  const fetchUnreadMessagesCount = async () => {
    try {
      const res = await authService.getSupportMessages();
      if (res.success) {
        const count = res.messages.filter(m => m.status === 'unread').length;
        setUnreadMessagesCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch messages count", error);
    }
  };

  const [pendingReportsCount, setPendingReportsCount] = useState(0);

  useEffect(() => {
    const loadPendingReports = async () => {
      try {
        const count = await contentService.getPendingReportsCount();
        setPendingReportsCount(count);
      } catch (error) {
        console.error('Failed to load pending reports count', error);
        setPendingReportsCount(0);
      }
    };

    loadPendingReports();
  }, [activeTab]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getNotification();
      if (res.success && res.notification) {
        setNotification(res.notification as any);
      }
    } catch (error) {
      console.error("Failed to fetch notification", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMarquee = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getMarquee();
      if (res.success) {
        setMarquee({ text: res.text, isActive: res.isActive });
      }
    } catch (error) {
      console.error("Failed to fetch marquee", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBackendSettings = () => {
    const cleanedUrl = normalizeSupabaseUrl(supabaseUrl);
    localStorage.setItem('VITE_SUPABASE_URL', cleanedUrl);
    localStorage.setItem('VITE_SUPABASE_ANON_KEY', supabaseAnonKey.trim());
    localStorage.setItem('VITE_SUPABASE_IMAGES_BUCKET', imagesBucket.trim() || 'sobkru-images');
    localStorage.setItem('VITE_SUPABASE_SLIPS_BUCKET', slipsBucket.trim() || 'sobkru-slips');
    localStorage.setItem('VITE_SUPABASE_FILES_BUCKET', filesBucket.trim() || 'sobkru-files');
    setSupabaseUrl(cleanedUrl);
    setSaveMessage('บันทึกการตั้งค่า Supabase สำเร็จ');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveNotification = async () => {
    setIsLoading(true);
    try {
      const res = await authService.setNotification(notification.title, notification.message, notification.isActive, notification.imageUrl);
      if (res.success) {
        setSaveMessage('บันทึกการแจ้งเตือนสำเร็จ');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error("Failed to save notification", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMarquee = async () => {
    setIsLoading(true);
    try {
      const res = await authService.setMarquee(marquee.text, marquee.isActive);
      if (res.success) {
        setSaveMessage('บันทึกข้อความประชาสัมพันธ์สำเร็จ');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error("Failed to save marquee", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    setIsLoading(true);
    try {
      const res = await authService.deleteUser(userToDelete);
      if (res.success) {
        setUsers(users.filter(u => u.id !== userToDelete));
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setIsLoading(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.map((u, index) => ({
      ...u,
      skId: `SK${String(index + 1).padStart(5, '0')}`
    })).filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.skId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditFormData({ name: user.name, email: user.email, password: '' });
  };

  const handleViewClick = (user: User) => {
    setViewingUser(user);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setIsLoading(true);
    try {
      const res = await authService.updateUser(editingUser.id, editFormData.name, editFormData.email, editFormData.password);
      if (res.success) {
        setUsers(users.map(u => u.id === editingUser.id ? (res.user || { ...u, name: editFormData.name, email: editFormData.email }) : u));
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
          <p className="text-sm text-slate-500">ระบบจัดการหลังบ้าน</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-2">ระบบหลัก</div>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            ตั้งค่า Backend
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            จัดการผู้ใช้งาน
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'reports' ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5" />
              รายงานผู้ไม่เหมาะสม
            </div>
            {pendingReportsCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'reports' ? 'bg-white text-red-600' : 'bg-red-100 text-red-600'
              }`}>
                {pendingReportsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'statistics' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            สถิติผู้ใช้งาน
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'notification' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-5 h-5" />
            แจ้งเตือน Popup
          </button>
          <button
            onClick={() => setActiveTab('bell')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'bell' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            ระฆังแจ้งเตือน
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              ข้อความติดต่อ
            </div>
            {unreadMessagesCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadMessagesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('marquee')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'marquee' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-5 h-5" />
            ข้อความประชาสัมพันธ์
          </button>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">ระบบเนื้อหา</div>
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'news' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            ข่าวสารประชาสัมพันธ์
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'discussion' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            กระดานสนทนา
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'shop' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            จัดการสินค้า (ชีทสรุป)
          </button>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5" />
            {saveMessage}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-amber-500" />
              ตั้งค่า Backend (Supabase)
            </h3>
            <div className="space-y-5">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">
                <p className="font-bold mb-1">ขั้นตอนก่อนเชื่อมต่อ</p>
                <p>ให้เปิดไฟล์ <span className="font-mono text-xs bg-white/70 px-2 py-0.5 rounded">supabase/schema.sql</span> แล้วนำ SQL ทั้งหมดไปรันใน Supabase SQL Editor เพื่อสร้าง Table, Function, Policy และ Bucket ให้ครบก่อน จากนั้นค่อยนำ Project URL และ Anon Key มาใส่ตรงนี้</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Supabase Project URL</label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                  placeholder="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Supabase Anon Public Key</label>
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bucket รูปภาพ</label>
                  <input
                    type="text"
                    value={imagesBucket}
                    onChange={(e) => setImagesBucket(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                    placeholder="sobkru-images"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bucket สลิป</label>
                  <input
                    type="text"
                    value={slipsBucket}
                    onChange={(e) => setSlipsBucket(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                    placeholder="sobkru-slips"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bucket ไฟล์</label>
                  <input
                    type="text"
                    value={filesBucket}
                    onChange={(e) => setFilesBucket(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                    placeholder="sobkru-files"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveBackendSettings}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 mt-4"
              >
                <Save className="w-5 h-5" />
                บันทึกการตั้งค่า
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-500" />
                จัดการผู้ใช้งาน ({users.length})
              </h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อ หรือ ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                  />
                </div>
                <button onClick={fetchUsers} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                  <Loader2 className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">ชื่อผู้ใช้งาน</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">อีเมล</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">วิธีเข้าสู่ระบบ</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">สถานะ</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-500 space-y-4">
                          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                          <p>กำลังโหลดข้อมูล...</p>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        ไม่พบข้อมูลผู้ใช้งาน
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((u: any) => (
                      <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500 font-mono">{u.skId}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{u.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{getAuthProviderLabel(u.authProvider)}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            u.isActive === false ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {u.isActive === false ? 'ปิดใช้งาน' : 'ใช้งานอยู่'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right space-x-2">
                          <button onClick={() => handleViewClick(u)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="ดูรายละเอียด">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEditClick(u)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="แก้ไข">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ลบ">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination & Info */}
            <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
              <div className="text-sm text-slate-500">
                แสดงข้อมูล {filteredUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} ถึง {Math.min(currentPage * itemsPerPage, filteredUsers.length)} จากทั้งหมด {filteredUsers.length} รายการ
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ก่อนหน้า
                </button>
                <span className="text-sm text-slate-600 font-medium px-2">
                  หน้า {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-red-600" />
              </div>
              รายงานผู้ไม่เหมาะสม
            </h3>
            <AdminReports />
          </div>
        )}

        {activeTab === 'notification' && (
          <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-amber-500" />
              ตั้งค่าการแจ้งเตือน (Pop-up)
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">สถานะการแจ้งเตือน</p>
                  <p className="text-sm text-slate-500">เปิด/ปิด การแสดง Pop-up แจ้งเตือนเมื่อเข้าสู่ระบบ</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notification.isActive}
                    onChange={(e) => setNotification({ ...notification, isActive: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">หัวข้อแจ้งเตือน</label>
                <input
                  type="text"
                  value={notification.title}
                  onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                  placeholder="เช่น ประกาศสำคัญ!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">อัปโหลดรูปภาพ (ถ้ามี)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsLoading(true);
                        try {
                          const folderId = '1Um6oJEFzHQojCwTLc1wei_3MIEuZ7np9';
                          const res = await authService.uploadImage(file, folderId);
                          if (res.success && res.url) {
                            setNotification({ ...notification, imageUrl: res.url });
                          } else {
                            alert(res.message || 'อัปโหลดรูปภาพไม่สำเร็จ');
                          }
                        } catch (error) {
                          console.error("Upload error", error);
                          alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
                        } finally {
                          setIsLoading(false);
                        }
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
                  />
                </div>
                {notification.imageUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 max-w-xs relative group">
                    <img src={notification.imageUrl} alt="Preview" className="w-full h-auto object-cover" />
                    <button 
                      onClick={() => setNotification({ ...notification, imageUrl: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียด</label>
                <textarea
                  value={notification.message}
                  onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all min-h-[120px] resize-none"
                  placeholder="รายละเอียดการแจ้งเตือน..."
                />
              </div>
              <button
                onClick={handleSaveNotification}
                disabled={isLoading}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                บันทึกการแจ้งเตือน
              </button>
            </div>
          </div>
        )}

        {activeTab === 'marquee' && (
          <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center font-bold text-amber-500 text-xl">M</div>
              ตั้งค่าข้อความประชาสัมพันธ์ (ตัววิ่ง)
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="isMarqueeActive"
                  checked={marquee.isActive}
                  onChange={(e) => setMarquee({ ...marquee, isActive: e.target.checked })}
                  className="w-5 h-5 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                />
                <label htmlFor="isMarqueeActive" className="font-medium text-slate-700 cursor-pointer">
                  เปิดใช้งานข้อความวิ่งที่แถบด้านบน
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ข้อความประชาสัมพันธ์</label>
                <input
                  type="text"
                  value={marquee.text}
                  onChange={(e) => setMarquee({ ...marquee, text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                  placeholder="เช่น ยินดีต้อนรับสู่ระบบติวสอบ..."
                />
              </div>
              <button
                onClick={handleSaveMarquee}
                disabled={isLoading}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                บันทึกข้อความประชาสัมพันธ์
              </button>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-blue-600" />
              </div>
              จัดการข่าวสารประชาสัมพันธ์
            </h3>
            <AdminNews />
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              จัดการกระดานสนทนา
            </h3>
            <AdminDiscussion />
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-amber-600" />
              </div>
              จัดการสินค้า (ชีทสรุป)
            </h3>
            <AdminShop />
          </div>
        )}

        {activeTab === 'bell' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-slate-600" />
              </div>
              จัดการระฆังแจ้งเตือน
            </h3>
            <AdminBellNotifications />
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              ข้อความติดต่อจากผู้ใช้
            </h3>
            <AdminMessages />
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="w-full max-w-6xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              สถิติผู้ใช้งาน
            </h3>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4 bg-white rounded-2xl border border-slate-200">
                <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p>กำลังโหลดข้อมูลสถิติ...</p>
              </div>
            ) : (
              <AdminStatistics users={users} />
            )}
          </div>
        )}
      </div>

      {/* View User Details Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">รายละเอียดผู้ใช้งาน</h3>
              <button onClick={() => setViewingUser(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">ชื่อผู้ใช้งาน</p>
                  <p className="font-medium text-slate-900">{viewingUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">อีเมล</p>
                  <p className="font-medium text-slate-900">{viewingUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">อายุ</p>
                  <p className="font-medium text-slate-900">{viewingUser.age ? `${viewingUser.age} ปี` : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">เพศ</p>
                  <p className="font-medium text-slate-900">{viewingUser.gender || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">เอกที่เลือกสอบ</p>
                  <p className="font-medium text-slate-900">{viewingUser.major || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">จังหวัด</p>
                  <p className="font-medium text-slate-900">{viewingUser.province || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">สอบครั้งที่</p>
                  <p className="font-medium text-slate-900">{viewingUser.examCount || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">วันที่สมัคร</p>
                  <p className="font-medium text-slate-900">
                    {viewingUser.createdAt ? new Date(viewingUser.createdAt).toLocaleString('th-TH') : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">วิธีเข้าสู่ระบบ</p>
                  <p className="font-medium text-slate-900">{getAuthProviderLabel(viewingUser.authProvider)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">สถานะบัญชี</p>
                  <p className="font-medium text-slate-900">{viewingUser.isActive === false ? 'ปิดใช้งาน' : 'ใช้งานอยู่'}</p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setViewingUser(null)}
                  className="w-full px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">แก้ไขข้อมูลผู้ใช้งาน</h3>
              <button onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อผู้ใช้งาน</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน (ปล่อยว่างไว้)</label>
                <input
                  type="text"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="ระบบจะไม่แก้ไขรหัสผ่านของผู้ใช้อื่น"
                />
                <p className="text-xs text-slate-500 mt-1">
                  สำหรับบัญชี Supabase Auth ผู้ดูแลระบบจะอัปเดตได้เฉพาะข้อมูลโปรไฟล์ทั่วไป ส่วนรหัสผ่านให้เจ้าของบัญชีเปลี่ยนเองจะปลอดภัยกว่า
                </p>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'บันทึก'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete User Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ยืนยันการลบผู้ใช้งาน</h3>
              <p className="text-slate-500 text-sm mb-6">
                ระบบจะปิดการใช้งานบัญชีนี้ในฐานข้อมูลหลัก เพื่อป้องกันการเข้าถึงต่อ โดยยังคงข้อมูลไว้สำหรับตรวจสอบย้อนหลัง
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteUser}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-70 flex items-center justify-center transition-colors"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ปิดการใช้งาน'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
