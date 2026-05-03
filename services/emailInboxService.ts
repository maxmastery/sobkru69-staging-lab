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

export const emailInboxService = {
  async getMessages(adminToken: string): Promise<EmailInboxResult> {
    const response = await fetch('/api/email-inbox?limit=25', {
      headers: {
        'x-email-campaign-token': adminToken,
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
