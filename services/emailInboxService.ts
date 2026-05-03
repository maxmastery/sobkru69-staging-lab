export interface EmailInboxAddress {
  name: string;
  address: string;
}

export interface EmailInboxMessage {
  uid: number;
  subject: string;
  from: EmailInboxAddress;
  date: string;
  text: string;
  seen: boolean;
}

export interface EmailInboxResult {
  success: boolean;
  message: string;
  messages: EmailInboxMessage[];
}

export const EMAIL_INBOX_TOKEN_STORAGE_KEY = 'sobkru_email_inbox_token';

const EMAIL_INBOX_READ_UIDS_STORAGE_KEY = 'sobkru_email_inbox_read_uids';

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const getReadUidSet = () => {
  if (!canUseStorage()) return new Set<number>();

  try {
    const rawValue = window.localStorage.getItem(EMAIL_INBOX_READ_UIDS_STORAGE_KEY);
    const parsed = rawValue ? JSON.parse(rawValue) : [];
    return new Set<number>(
      Array.isArray(parsed)
        ? parsed.map((value) => Number(value)).filter((value) => Number.isFinite(value))
        : []
    );
  } catch (error) {
    console.warn('Failed to parse stored inbox read state', error);
    return new Set<number>();
  }
};

const saveReadUidSet = (readUids: Set<number>) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(EMAIL_INBOX_READ_UIDS_STORAGE_KEY, JSON.stringify(Array.from(readUids).slice(-300)));
};

export const emailInboxService = {
  getStoredToken() {
    if (!canUseStorage()) return '';
    return window.localStorage.getItem(EMAIL_INBOX_TOKEN_STORAGE_KEY) || '';
  },

  storeToken(adminToken: string) {
    if (!canUseStorage()) return;
    const token = adminToken.trim();
    if (token) {
      window.localStorage.setItem(EMAIL_INBOX_TOKEN_STORAGE_KEY, token);
    }
  },

  clearStoredToken() {
    if (!canUseStorage()) return;
    window.localStorage.removeItem(EMAIL_INBOX_TOKEN_STORAGE_KEY);
  },

  isMessageReadLocally(uid: number) {
    return getReadUidSet().has(uid);
  },

  markMessageRead(uid: number) {
    if (!Number.isFinite(uid)) return;
    const readUids = getReadUidSet();
    readUids.add(uid);
    saveReadUidSet(readUids);
  },

  getUnreadCount(messages: EmailInboxMessage[]) {
    const readUids = getReadUidSet();
    return messages.filter((message) => !message.seen && !readUids.has(message.uid)).length;
  },

  async getMessages(adminToken: string, limit = 25): Promise<EmailInboxResult> {
    const response = await fetch(`/api/email-inbox?limit=${encodeURIComponent(String(limit))}`, {
      headers: {
        'x-email-campaign-token': adminToken.trim(),
      },
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: 'ไม่สามารถอ่าน Inbox จาก Server ได้',
      messages: [],
    }));

    return {
      success: response.ok && Boolean(data?.success),
      message: data?.message || (response.ok ? 'โหลด Inbox สำเร็จ' : 'โหลด Inbox ไม่สำเร็จ'),
      messages: Array.isArray(data?.messages) ? data.messages : [],
    };
  },
};
