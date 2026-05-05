import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock3, Image as ImageIcon, KeyRound, Loader2, Mail, RefreshCw, Search, Send, Sparkles, UploadCloud, Users, X } from 'lucide-react';
import { authService, User } from '../../services/authService';
import { emailCampaignService, EmailCampaignHistoryItem, EmailRecipientMode, SendEmailCampaignResult, userToEmailRecipient } from '../../services/emailCampaignService';

type RecipientMode = Exclude<EmailRecipientMode, 'test'>;

const defaultForm = {
  subject: 'มีฟีเจอร์ใหม่ใน SobKru69 มาให้ลองใช้งานแล้ว',
  preheader: 'อัปเดตใหม่จาก SobKru69 เข้าไปดูรายละเอียดได้เลย',
  title: 'มีอัปเดตใหม่ใน SobKru69',
  message: 'เราเพิ่มฟีเจอร์และเนื้อหาใหม่เพื่อช่วยให้การเตรียมสอบสะดวกขึ้น ลองเข้าไปดูรายละเอียดในระบบได้เลยครับ',
  imageUrl: '',
  ctaLabel: 'เปิดดูอัปเดตใหม่',
  ctaUrl: 'https://www.coolcom.click/',
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const formatDateTime = (value?: string) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const AdminEmailCampaigns: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('selected');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState<SendEmailCampaignResult | null>(null);
  const [loadMessage, setLoadMessage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [history, setHistory] = useState<EmailCampaignHistoryItem[]>([]);
  const [historyMessage, setHistoryMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const response = await authService.getUsers();
        if (response.success) {
          setUsers(response.users || []);
          setLoadMessage(response.message || '');
        } else {
          setLoadMessage(response.message || 'โหลดรายชื่อผู้ใช้งานไม่สำเร็จ');
        }
      } catch (error: any) {
        setLoadMessage(error?.message || 'โหลดรายชื่อผู้ใช้งานไม่สำเร็จ');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    void loadUsers();
  }, []);

  const usersWithEmail = useMemo(() => {
    return users
      .map(userToEmailRecipient)
      .filter(Boolean) as NonNullable<ReturnType<typeof userToEmailRecipient>>[];
  }, [users]);

  const activeUsersWithEmail = useMemo(() => {
    return users
      .filter((user) => user.isActive !== false)
      .map(userToEmailRecipient)
      .filter(Boolean) as NonNullable<ReturnType<typeof userToEmailRecipient>>[];
  }, [users]);

  const selectedRecipients = useMemo(() => {
    return usersWithEmail.filter((recipient) => recipient.id && selectedIds.has(recipient.id));
  }, [selectedIds, usersWithEmail]);

  const campaignRecipients = useMemo(() => {
    if (recipientMode === 'all') return usersWithEmail;
    if (recipientMode === 'active') return activeUsersWithEmail;
    return selectedRecipients;
  }, [activeUsersWithEmail, recipientMode, selectedRecipients, usersWithEmail]);

  const filteredUsers = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    const rows = users.filter((user) => {
      if (!user.email || !user.email.includes('@')) return false;
      if (!normalized) return true;
      return user.name.toLowerCase().includes(normalized) || user.email.toLowerCase().includes(normalized);
    });

    return rows.slice(0, 200);
  }, [searchQuery, users]);

  const selectedCount = selectedIds.size;
  const canSendCampaign = Boolean(adminToken.trim() && form.subject.trim() && form.title.trim() && form.message.trim() && campaignRecipients.length > 0);
  const canSendTest = Boolean(adminToken.trim() && isEmail(testEmail) && form.subject.trim() && form.title.trim() && form.message.trim());

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const uploadCampaignImage = async (file?: File) => {
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const response = await authService.uploadImage(file);
      if (response.success && response.url) {
        updateForm('imageUrl', response.url);
      } else {
        window.alert(response.message || 'อัปโหลดรูปภาพไม่สำเร็จ');
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const loadHistory = async () => {
    if (!adminToken.trim()) {
      setHistoryMessage('กรุณากรอกรหัสส่งอีเมลก่อนโหลดประวัติ');
      return;
    }

    setIsLoadingHistory(true);
    setHistoryMessage('');
    try {
      const response = await emailCampaignService.getHistory(adminToken);
      setHistory(response.history);
      setHistoryMessage(response.message);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const toggleUser = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectFilteredUsers = () => {
    setSelectedIds((current) => {
      const next = new Set(current);
      filteredUsers.forEach((user) => {
        if (user.id && user.email?.includes('@')) {
          next.add(user.id);
        }
      });
      return next;
    });
  };

  const clearSelectedUsers = () => {
    setSelectedIds(new Set());
  };

  const sendTest = async () => {
    if (!canSendTest) return;

    setIsSending(true);
    setResult(null);
    try {
      const response = await emailCampaignService.sendCampaign({
        adminToken,
        mode: 'test',
        ...form,
        testEmail,
      });
      setResult(response);
      void loadHistory();
    } finally {
      setIsSending(false);
    }
  };

  const sendCampaign = async () => {
    if (!canSendCampaign) return;

    const confirmed = window.confirm(`ยืนยันส่งอีเมลประชาสัมพันธ์ไปยังผู้รับ ${campaignRecipients.length.toLocaleString('th-TH')} คนใช่ไหม?`);
    if (!confirmed) return;

    setIsSending(true);
    setResult(null);
    try {
      const response = await emailCampaignService.sendCampaign({
        adminToken,
        mode: recipientMode,
        ...form,
        recipients: campaignRecipients,
      });
      setResult(response);
      void loadHistory();
    } finally {
      setIsSending(false);
    }
  };

  const recipientModeOptions: { id: RecipientMode; label: string; description: string; count: number }[] = [
    { id: 'selected', label: 'เลือกเอง', description: 'เลือกทีละรายชื่อจากตารางด้านล่าง', count: selectedRecipients.length },
    { id: 'active', label: 'บัญชีใช้งานอยู่', description: 'ส่งเฉพาะบัญชีที่ยังไม่ถูกปิดใช้งาน', count: activeUsersWithEmail.length },
    { id: 'all', label: 'ผู้ใช้ทั้งหมด', description: 'ส่งถึงรายชื่อที่มีอีเมลทั้งหมดในระบบ', count: usersWithEmail.length },
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Email Campaign
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-950">ส่งอีเมลประชาสัมพันธ์</h4>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              ใช้สำหรับแจ้งฟีเจอร์ใหม่ สินค้าใหม่ หรือข่าวสำคัญ โดยส่งผ่าน SMTP ฝั่ง server เท่านั้นเพื่อป้องกันรหัสอีเมลรั่ว
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white/80 p-4 text-sm text-slate-600">
            <p className="font-bold text-slate-900">สถานะรายชื่อ</p>
            <p className="mt-1">มีอีเมลใช้งานได้ {usersWithEmail.length.toLocaleString('th-TH')} รายชื่อ</p>
            {loadMessage && <p className="mt-1 text-amber-700">{loadMessage}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-900">
              <Mail className="h-6 w-6 text-orange-500" />
              เนื้อหาอีเมล
            </h4>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Subject อีเมล</label>
                <input
                  value={form.subject}
                  onChange={(event) => updateForm('subject', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="เช่น มีสินค้าใหม่มาแล้ว"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">ข้อความ Preview สั้น ๆ</label>
                <input
                  value={form.preheader}
                  onChange={(event) => updateForm('preheader', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="ข้อความสั้นที่แสดงใน inbox"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">หัวข้อหลักในอีเมล</label>
                <input
                  value={form.title}
                  onChange={(event) => updateForm('title', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="หัวข้อใหญ่ในตัวอีเมล"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">เนื้อหา</label>
                <textarea
                  value={form.message}
                  onChange={(event) => updateForm('message', event.target.value)}
                  className="min-h-[180px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-7 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="เขียนเนื้อหาประกาศ..."
                />
              </div>
              <div className="rounded-3xl border border-orange-100 bg-orange-50/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-black text-slate-800">
                    <ImageIcon className="h-5 w-5 text-orange-500" />
                    รูปภาพประกอบอีเมล
                  </label>
                  {form.imageUrl && (
                    <button
                      type="button"
                      onClick={() => updateForm('imageUrl', '')}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-500 shadow-sm hover:text-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                      เอารูปออก
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[auto_1fr]">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-orange-600 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-md">
                    {isUploadingImage ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
                    อัปโหลดรูป
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploadingImage}
                      onChange={(event) => {
                        void uploadCampaignImage(event.target.files?.[0]);
                        event.currentTarget.value = '';
                      }}
                    />
                  </label>
                  <input
                    value={form.imageUrl}
                    onChange={(event) => updateForm('imageUrl', event.target.value)}
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="หรือวาง URL รูปภาพ https://..."
                  />
                </div>
                {form.imageUrl && (
                  <div className="mt-4 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
                    <img src={form.imageUrl} alt="Email preview" className="h-48 w-full object-cover" />
                  </div>
                )}
                <p className="mt-3 text-xs font-semibold leading-5 text-orange-900/70">
                  แนะนำรูปแนวนอนขนาดไม่เกิน 1200px เพื่อให้โหลดเร็ว และลดโอกาสมือถือแสดงผลเพี้ยน
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">ข้อความปุ่ม CTA</label>
                  <input
                    value={form.ctaLabel}
                    onChange={(event) => updateForm('ctaLabel', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="เช่น ดูสินค้าใหม่"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">ลิงก์ปลายทาง</label>
                  <input
                    value={form.ctaUrl}
                    onChange={(event) => updateForm('ctaUrl', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-900">
              <KeyRound className="h-6 w-6 text-slate-700" />
              ส่งทดสอบก่อนส่งจริง
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-3">
              <input
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                placeholder="รหัสส่งอีเมลจาก EMAIL_CAMPAIGN_ADMIN_TOKEN"
              />
              <input
                value={testEmail}
                onChange={(event) => setTestEmail(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                placeholder="อีเมลสำหรับส่งทดสอบ"
              />
              <button
                onClick={sendTest}
                disabled={!canSendTest || isSending}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                ส่งทดสอบ
              </button>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              ต้องตั้งค่า Environment Variables บน Vercel ก่อนใช้งานจริง: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_CAMPAIGN_ADMIN_TOKEN
              และแนะนำให้ใช้ EMAIL_DELIVERY_MODE=individual เพื่อเลี่ยงการโดนบล็อกจากการส่งแบบ BCC จำนวนมาก
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-900">
              <Users className="h-6 w-6 text-emerald-600" />
              เลือกผู้รับ
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {recipientModeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRecipientMode(option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    recipientMode === option.id
                      ? 'border-orange-300 bg-orange-50 shadow-[0_14px_30px_rgba(250,107,25,.12)]'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black text-slate-900">{option.label}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${recipientMode === option.id ? 'bg-orange-500 text-white' : 'bg-white text-slate-600'}`}>
                      {option.count.toLocaleString('th-TH')} คน
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{option.description}</p>
                </button>
              ))}
            </div>

            {recipientMode === 'selected' && (
              <div className="mt-5 space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="ค้นหาชื่อหรืออีเมล..."
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={selectFilteredUsers} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-800">
                    เลือกที่ค้นหา
                  </button>
                  <button onClick={clearSelectedUsers} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-200">
                    ล้างทั้งหมด
                  </button>
                  <span className="text-xs font-bold text-slate-500">เลือกแล้ว {selectedCount.toLocaleString('th-TH')} คน</span>
                </div>
                <div className="max-h-[440px] overflow-y-auto rounded-2xl border border-slate-200">
                  {isLoadingUsers ? (
                    <div className="flex items-center justify-center gap-3 p-8 text-slate-500">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      กำลังโหลดรายชื่อ...
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-sm text-slate-500">ไม่พบรายชื่อที่ค้นหา</div>
                  ) : (
                    filteredUsers.map((user) => (
                      <label key={user.id} className="flex cursor-pointer items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-orange-50/50">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(user.id)}
                          onChange={() => toggleUser(user.id)}
                          className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-black text-slate-900">{user.name || user.email}</span>
                          <span className="block truncate text-xs font-semibold text-slate-500">{user.email}</span>
                        </span>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${user.isActive === false ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {user.isActive === false ? 'ปิดใช้งาน' : 'Active'}
                        </span>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-slate-400">ตารางจะแสดงสูงสุด 200 รายการต่อการค้นหา เพื่อให้หน้าเว็บยังเร็วและลื่น</p>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-orange-200 bg-orange-50 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-orange-700">พร้อมส่งถึง</p>
                <p className="mt-1 text-4xl font-black text-slate-950">{campaignRecipients.length.toLocaleString('th-TH')}</p>
                <p className="text-sm text-slate-600">ระบบจะส่งแบบรายคนจากฝั่ง Server เพื่อให้ปลอดภัยกว่า BCC จำนวนมาก</p>
                {campaignRecipients.length > 80 && (
                  <p className="mt-2 text-xs font-bold leading-5 text-amber-700">
                    แนะนำแบ่งส่งครั้งละไม่เกิน 80 คน หรือเพิ่ม EMAIL_MAX_RECIPIENTS_PER_REQUEST อย่างระวัง เพราะ Hostinger/MailChannels อาจบล็อกการส่งจำนวนมาก
                  </p>
                )}
              </div>
              <Mail className="h-10 w-10 text-orange-500" />
            </div>
            <button
              onClick={sendCampaign}
              disabled={!canSendCampaign || isSending}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FA6B19] px-5 py-4 text-sm font-black text-white shadow-[0_18px_38px_rgba(250,107,25,.28)] transition hover:bg-[#e85f12] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              ส่งอีเมลประชาสัมพันธ์
            </button>
          </div>

          {result && (
            <div className={`rounded-[28px] border p-6 shadow-sm ${result.success ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
              <div className="flex items-start gap-3">
                {result.success ? <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-600" /> : <AlertTriangle className="mt-1 h-6 w-6 text-amber-600" />}
                <div>
                  <h4 className="text-lg font-black text-slate-900">{result.message}</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    ผู้รับ {result.recipientCount?.toLocaleString('th-TH') || 0} คน, สำเร็จ {result.successCount?.toLocaleString('th-TH') || 0}, ไม่สำเร็จ {result.failedCount?.toLocaleString('th-TH') || 0}, จำนวนชุด {result.batches || 0}
                  </p>
                  {result.deliveryMode && (
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      รูปแบบการส่ง: {result.deliveryMode === 'individual' ? 'ส่งรายคน' : 'ส่งแบบ BCC'}
                    </p>
                  )}
                  {result.historySaved === false && result.historyMessage && (
                    <p className="mt-2 text-xs font-bold text-amber-700">หมายเหตุ: {result.historyMessage}</p>
                  )}
                  {result.errors && result.errors.length > 0 && (
                    <div className="mt-3 space-y-1 text-xs font-semibold text-red-700">
                      {result.errors.slice(0, 5).map((error, index) => <p key={`${error}-${index}`}>{error}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="flex items-center gap-2 text-xl font-black text-slate-900">
              <Clock3 className="h-6 w-6 text-orange-500" />
              ประวัติการส่งอีเมล
            </h4>
            <p className="mt-1 text-sm text-slate-500">ดูย้อนหลังว่าเคยส่งหัวข้อไหน ส่งถึงกี่คน และส่งสำเร็จเท่าไร</p>
          </div>
          <button
            type="button"
            onClick={loadHistory}
            disabled={isLoadingHistory}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingHistory ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            โหลดประวัติ
          </button>
        </div>

        {historyMessage && (
          <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
            {historyMessage}
          </div>
        )}

        {history.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
            ยังไม่มีประวัติการส่ง หรือยังไม่ได้กดโหลดประวัติ
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {history.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                {item.image_url && (
                  <img src={item.image_url} alt="" className="h-32 w-full object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-black text-slate-950">{item.subject}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{formatDateTime(item.created_at)}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-orange-600 shadow-sm">
                      {item.mode === 'test' ? 'ทดสอบ' : item.mode === 'all' ? 'ทั้งหมด' : item.mode === 'active' ? 'Active' : 'เลือกเอง'}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-[11px] font-bold text-slate-400">ผู้รับ</p>
                      <p className="text-lg font-black text-slate-950">{item.recipient_count?.toLocaleString('th-TH') || 0}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-[11px] font-bold text-slate-400">สำเร็จ</p>
                      <p className="text-lg font-black text-emerald-600">{item.success_count?.toLocaleString('th-TH') || 0}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-[11px] font-bold text-slate-400">ไม่สำเร็จ</p>
                      <p className="text-lg font-black text-red-500">{item.failed_count?.toLocaleString('th-TH') || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmailCampaigns;
