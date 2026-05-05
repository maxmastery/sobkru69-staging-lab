import { type User } from './authService';

export type EmailRecipientMode = 'test' | 'all' | 'active' | 'selected';

export interface EmailRecipient {
  id?: string;
  name?: string;
  email: string;
}

export interface SendEmailCampaignPayload {
  adminToken: string;
  mode: EmailRecipientMode;
  subject: string;
  preheader?: string;
  title: string;
  message: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  testEmail?: string;
  recipients?: EmailRecipient[];
}

export interface SendEmailCampaignResult {
  success: boolean;
  message: string;
  recipientCount?: number;
  successCount?: number;
  failedCount?: number;
  batches?: number;
  deliveryMode?: 'individual' | 'bcc';
  errors?: string[];
  historySaved?: boolean;
  historyMessage?: string;
}

export interface EmailCampaignHistoryItem {
  id: string;
  mode: EmailRecipientMode;
  subject: string;
  title?: string;
  message?: string;
  cta_label?: string;
  cta_url?: string;
  image_url?: string;
  recipient_count: number;
  success_count: number;
  failed_count: number;
  batches: number;
  errors?: string[];
  sent_by?: string;
  created_at: string;
}

export interface EmailCampaignHistoryResult {
  success: boolean;
  message: string;
  history: EmailCampaignHistoryItem[];
}

const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const userToEmailRecipient = (user: User): EmailRecipient | null => {
  const email = normalizeEmail(user.email || '');
  if (!email || !email.includes('@')) {
    return null;
  }

  return {
    id: user.id,
    name: user.name || email,
    email,
  };
};

export const emailCampaignService = {
  async sendCampaign(payload: SendEmailCampaignPayload): Promise<SendEmailCampaignResult> {
    const response = await fetch('/api/send-email-campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-email-campaign-token': payload.adminToken,
      },
      body: JSON.stringify({
        mode: payload.mode,
        subject: payload.subject,
        preheader: payload.preheader,
        title: payload.title,
        message: payload.message,
        imageUrl: payload.imageUrl,
        ctaLabel: payload.ctaLabel,
        ctaUrl: payload.ctaUrl,
        testEmail: payload.testEmail,
        recipients: payload.recipients,
      }),
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: 'ไม่สามารถอ่านผลลัพธ์จาก API ส่งอีเมลได้',
    }));

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'ส่งอีเมลไม่สำเร็จ',
        errors: data?.errors || [],
      };
    }

    return data as SendEmailCampaignResult;
  },

  async getHistory(adminToken: string): Promise<EmailCampaignHistoryResult> {
    const response = await fetch('/api/email-campaign-history?limit=50', {
      headers: {
        'x-email-campaign-token': adminToken,
      },
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: 'ไม่สามารถอ่านประวัติการส่งจาก Server ได้',
      history: [],
    }));

    return {
      success: response.ok && Boolean(data?.success),
      message: data?.message || (response.ok ? 'โหลดประวัติสำเร็จ' : 'โหลดประวัติไม่สำเร็จ'),
      history: Array.isArray(data?.history) ? data.history : [],
    };
  },
};
