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
  errors?: string[];
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
};
