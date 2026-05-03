import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Inbox, Loader2, MailOpen, RefreshCw, Search, Settings2, ShieldCheck, X } from 'lucide-react';
import { EmailInboxMessage, emailInboxService } from '../../services/emailInboxService';

interface AdminEmailInboxProps {
  onUnreadCountChange?: (count: number) => void;
}

const formatDateTime = (value?: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const formatInboxDate = (value?: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  if (isToday) {
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  }

  return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
};

const getSenderLabel = (message: EmailInboxMessage) => {
  const name = message.from?.name?.trim();
  const address = message.from?.address?.trim();
  if (name && address) return `${name} <${address}>`;
  return name || address || 'ไม่ทราบผู้ส่ง';
};

const getSenderName = (message: EmailInboxMessage) => {
  return message.from?.name?.trim() || message.from?.address?.trim() || 'ไม่ทราบผู้ส่ง';
};

const getSenderInitial = (message: EmailInboxMessage) => {
  const label = getSenderName(message);
  return label.trim().charAt(0).toUpperCase() || 'M';
};

const getMessagePreview = (message: EmailInboxMessage) => {
  return (message.text || 'ไม่มีข้อความตัวอักษร').replace(/\s+/g, ' ').trim();
};

const AdminEmailInbox: React.FC<AdminEmailInboxProps> = ({ onUnreadCountChange }) => {
  const [adminToken, setAdminToken] = useState('');
  const [messages, setMessages] = useState<EmailInboxMessage[]>([]);
  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenPanel, setShowTokenPanel] = useState(false);
  const [readRefreshKey, setReadRefreshKey] = useState(0);

  const unreadCount = useMemo(() => {
    return emailInboxService.getUnreadCount(messages);
  }, [messages, readRefreshKey]);

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return messages;

    return messages.filter((message) => {
      const haystack = [
        message.subject,
        getSenderLabel(message),
        message.text,
      ].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [messages, searchQuery]);

  const selectedMessage = useMemo(() => {
    return messages.find((message) => message.uid === selectedUid) || null;
  }, [messages, selectedUid]);

  const loadInbox = async (tokenOverride?: string, silent = false) => {
    const token = (tokenOverride ?? adminToken).trim();
    if (!token) {
      setShowTokenPanel(true);
      setStatusMessage('กรุณากรอกรหัส Inbox ก่อนโหลดเมลตอบกลับ');
      return;
    }

    setIsLoading(true);
    if (!silent) setStatusMessage('');
    try {
      const response = await emailInboxService.getMessages(token, 30);
      setMessages(response.messages);
      setStatusMessage(response.message);
      setSelectedUid((current) => {
        if (current && response.messages.some((message) => message.uid === current)) return current;
        return null;
      });
      if (response.success) {
        emailInboxService.storeToken(token);
        setAdminToken(token);
        setShowTokenPanel(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = emailInboxService.getStoredToken();
    if (storedToken) {
      setAdminToken(storedToken);
      void loadInbox(storedToken, true);
    } else {
      setShowTokenPanel(true);
    }
  }, []);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

  const handleSelectMessage = (message: EmailInboxMessage) => {
    setSelectedUid(message.uid);
    if (!message.seen && !emailInboxService.isMessageReadLocally(message.uid)) {
      emailInboxService.markMessageRead(message.uid);
      setReadRefreshKey((value) => value + 1);
    }
  };

  const handleForgetToken = () => {
    emailInboxService.clearStoredToken();
    setAdminToken('');
    setShowTokenPanel(true);
    setStatusMessage('ลบรหัส Inbox ที่จำไว้ในเครื่องนี้แล้ว');
  };

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Inbox className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-950">Inbox เมลตอบกลับ</h4>
              <p className="text-sm font-semibold text-slate-500">อ่านอีเมลที่ตอบกลับมายัง contact@coolcom.click</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm ring-1 ring-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              ยังไม่อ่าน {unreadCount} ฉบับ
            </span>
            <button
              type="button"
              onClick={() => void loadInbox()}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              รีเฟรช
            </button>
            <button
              type="button"
              onClick={() => setShowTokenPanel((value) => !value)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-black text-white transition hover:bg-slate-800"
            >
              <Settings2 className="h-4 w-4" />
              ตั้งค่า
            </button>
          </div>
        </div>

        {showTokenPanel && (
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Secure local token
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  กรอกรหัส Inbox ครั้งเดียว ระบบจะจำไว้เฉพาะเบราว์เซอร์เครื่องแอดมินนี้ ไม่ฝังรหัสไว้ในไฟล์ frontend ที่ผู้ใช้งานทั่วไปเห็นได้
                </p>
              </div>
              <button type="button" onClick={() => setShowTokenPanel(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_auto]">
              <input
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="รหัสจาก EMAIL_INBOX_ADMIN_TOKEN"
              />
              <button
                type="button"
                onClick={() => void loadInbox()}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Inbox className="h-4 w-4" />}
                โหลด Inbox
              </button>
              <button
                type="button"
                onClick={handleForgetToken}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                ลบรหัสที่จำไว้
              </button>
            </div>
          </div>
        )}

        {statusMessage && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-600">
            {statusMessage}
          </div>
        )}
      </div>

      <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[430px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-50/60 lg:border-b-0 lg:border-r">
          <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/95 p-4 backdrop-blur">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="ค้นหาผู้ส่ง หัวข้อ หรือข้อความ..."
              />
            </div>
          </div>

          <div className="max-h-[620px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center">
                <MailOpen className="mx-auto h-10 w-10 text-slate-300" />
                <p className="mt-3 text-base font-black text-slate-800">ยังไม่มีเมลให้แสดง</p>
                <p className="mt-1 text-sm text-slate-500">กดรีเฟรชหลังตั้งค่า IMAP บน Vercel แล้วเมลล่าสุดจะแสดงตรงนี้</p>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const isUnread = !message.seen && !emailInboxService.isMessageReadLocally(message.uid);
                const isSelected = selectedMessage?.uid === message.uid;

                return (
                  <button
                    key={message.uid}
                    type="button"
                    onClick={() => handleSelectMessage(message)}
                    className={`group flex w-full gap-3 border-b border-slate-200 px-4 py-4 text-left transition last:border-b-0 ${
                      isSelected ? 'bg-white shadow-[inset_4px_0_0_#0284c7]' : 'hover:bg-white'
                    }`}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      isUnread ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {getSenderInitial(message)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`truncate text-sm ${isUnread ? 'font-black text-slate-950' : 'font-bold text-slate-700'}`}>
                          {getSenderName(message)}
                        </p>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400">{formatInboxDate(message.date)}</span>
                          {isUnread && <span className="h-2.5 w-2.5 rounded-full bg-red-500" />}
                        </div>
                      </div>
                      <p className={`mt-1 truncate text-sm ${isUnread ? 'font-black text-slate-950' : 'font-semibold text-slate-600'}`}>
                        {message.subject || '(ไม่มีหัวข้อ)'}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{getMessagePreview(message)}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <section className="bg-white">
          {selectedMessage ? (
            <div className="flex min-h-full flex-col">
              <div className="border-b border-slate-100 px-5 py-5 md:px-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
                  <MailOpen className="h-4 w-4" />
                  เมลตอบกลับ
                </div>
                <h4 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">{selectedMessage.subject || '(ไม่มีหัวข้อ)'}</h4>
                <div className="mt-4 flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
                  <p className="font-bold text-slate-700">{getSenderLabel(selectedMessage)}</p>
                  <p className="text-xs font-bold text-slate-400">{formatDateTime(selectedMessage.date)}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
                <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-8 text-slate-700">
                  {selectedMessage.text || 'เมลฉบับนี้ไม่มีข้อความแบบ text ให้แสดง'}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[560px] items-center justify-center p-8 text-center">
              <div className="max-w-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <p className="mt-4 text-xl font-black text-slate-900">เลือกอีเมลเพื่ออ่านรายละเอียด</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">Inbox จะจำสถานะที่เปิดอ่านแล้วในเครื่องนี้ เพื่อให้ badge สีแดงแจ้งเฉพาะเมลใหม่จริง ๆ</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminEmailInbox;
