import React, { useMemo, useState } from 'react';
import { AlertTriangle, Inbox, Loader2, MailOpen, RefreshCw } from 'lucide-react';
import { EmailInboxMessage, emailInboxService } from '../../services/emailInboxService';

const formatDateTime = (value?: string) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const getSenderLabel = (message: EmailInboxMessage) => {
  const name = message.from?.name?.trim();
  const address = message.from?.address?.trim();
  if (name && address) return `${name} <${address}>`;
  return name || address || 'ไม่ทราบผู้ส่ง';
};

const AdminEmailInbox: React.FC = () => {
  const [adminToken, setAdminToken] = useState('');
  const [messages, setMessages] = useState<EmailInboxMessage[]>([]);
  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const selectedMessage = useMemo(() => {
    return messages.find((message) => message.uid === selectedUid) || messages[0] || null;
  }, [messages, selectedUid]);

  const loadInbox = async () => {
    if (!adminToken.trim()) {
      setStatusMessage('กรุณากรอกรหัส Inbox ก่อนโหลดเมลตอบกลับ');
      return;
    }

    setIsLoading(true);
    setStatusMessage('');
    try {
      const response = await emailInboxService.getMessages(adminToken);
      setMessages(response.messages);
      setStatusMessage(response.message);
      if (response.messages.length > 0) {
        setSelectedUid((current) => current || response.messages[0].uid);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-600 shadow-sm">
              <Inbox className="h-4 w-4" />
              Email Inbox
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-950">Inbox เมลตอบกลับ</h4>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              ดึงเมลที่ตอบกลับมายัง contact@coolcom.click ผ่าน IMAP โดยรหัสอีเมลจะอยู่ใน Environment Variables ฝั่ง Server เท่านั้น
            </p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 text-sm leading-6 text-slate-600">
            <p className="font-bold text-slate-900">ต้องตั้งค่า Server ก่อนใช้งานจริง</p>
            <p>IMAP_HOST, IMAP_USER, IMAP_PASS และ EMAIL_INBOX_ADMIN_TOKEN</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
          <input
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="รหัส Inbox จาก EMAIL_INBOX_ADMIN_TOKEN หรือ EMAIL_CAMPAIGN_ADMIN_TOKEN"
          />
          <button
            type="button"
            onClick={loadInbox}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            โหลด Inbox
          </button>
        </div>
        {statusMessage && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
            {statusMessage}
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center">
          <MailOpen className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-lg font-black text-slate-800">ยังไม่มีเมลให้แสดง</p>
          <p className="mt-1 text-sm text-slate-500">กดโหลด Inbox หลังตั้งค่า IMAP บน Vercel แล้ว ระบบจะแสดงเมลตอบกลับล่าสุดตรงนี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
          <div className="max-h-[680px] overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-sm">
            {messages.map((message) => (
              <button
                key={message.uid}
                type="button"
                onClick={() => setSelectedUid(message.uid)}
                className={`block w-full border-b border-slate-100 p-4 text-left transition last:border-b-0 ${
                  selectedMessage?.uid === message.uid ? 'bg-sky-50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-950">{message.subject}</p>
                    <p className="mt-1 truncate text-xs font-bold text-slate-500">{getSenderLabel(message)}</p>
                  </div>
                  {!message.seen && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{message.text || 'ไม่มีข้อความตัวอักษร'}</p>
                <p className="mt-2 text-[11px] font-bold text-slate-400">{formatDateTime(message.date)}</p>
              </button>
            ))}
          </div>

          <div className="min-h-[520px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            {selectedMessage ? (
              <div>
                <div className="mb-5 border-b border-slate-100 pb-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
                    <MailOpen className="h-4 w-4" />
                    เมลตอบกลับ
                  </div>
                  <h4 className="text-2xl font-black text-slate-950">{selectedMessage.subject}</h4>
                  <p className="mt-2 text-sm font-bold text-slate-600">{getSenderLabel(selectedMessage)}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">{formatDateTime(selectedMessage.date)}</p>
                </div>
                <pre className="whitespace-pre-wrap break-words rounded-3xl bg-slate-50 p-5 font-sans text-sm leading-7 text-slate-700">
                  {selectedMessage.text || 'เมลฉบับนี้ไม่มีข้อความแบบ text ให้แสดง'}
                </pre>
              </div>
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-200 text-center text-slate-500">
                <div>
                  <AlertTriangle className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="mt-2 text-sm font-bold">เลือกเมลจากรายการด้านซ้ายเพื่ออ่านรายละเอียด</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmailInbox;
