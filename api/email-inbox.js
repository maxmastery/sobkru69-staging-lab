import { ImapFlow } from 'imapflow';
import mailparser from 'mailparser';

const { simpleParser } = mailparser;

const json = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};

const env = (key, fallback = '') => process.env[key] || fallback;

const toBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getInboxConfig = () => {
  const host = env('IMAP_HOST') || env('HOSTINGER_IMAP_HOST');
  const user = env('IMAP_USER') || env('HOSTINGER_IMAP_USER') || env('EMAIL_REPLY_TO');
  const pass = env('IMAP_PASS') || env('HOSTINGER_IMAP_PASS') || env('SMTP_PASS') || env('HOSTINGER_SMTP_PASS');
  const port = toNumber(env('IMAP_PORT') || env('HOSTINGER_IMAP_PORT'), 993);
  const secure = toBoolean(env('IMAP_SECURE') || env('HOSTINGER_IMAP_SECURE'), port === 993);

  if (!host || !user || !pass) {
    throw new Error('ยังไม่ได้ตั้งค่า IMAP_HOST, IMAP_USER, IMAP_PASS สำหรับอ่านเมลตอบกลับ');
  }

  return { host, user, pass, port, secure };
};

const formatAddress = (address) => ({
  name: address?.name || '',
  address: address?.address || '',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const expectedToken = env('EMAIL_INBOX_ADMIN_TOKEN') || env('EMAIL_CAMPAIGN_ADMIN_TOKEN');
  const providedToken = String(req.headers['x-email-campaign-token'] || '').trim();
  if (!expectedToken || providedToken !== expectedToken) {
    return json(res, 401, {
      success: false,
      message: 'รหัสสำหรับดู Inbox ไม่ถูกต้อง หรือยังไม่ได้ตั้งค่า EMAIL_INBOX_ADMIN_TOKEN / EMAIL_CAMPAIGN_ADMIN_TOKEN',
      messages: [],
    });
  }

  let client;
  try {
    const config = getInboxConfig();
    const limit = Math.min(50, Math.max(1, Number(req.query?.limit || env('EMAIL_INBOX_LIMIT', 25))));

    client = new ImapFlow({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      logger: false,
    });

    await client.connect();
    const mailbox = await client.mailboxOpen('INBOX');
    const total = mailbox.exists || 0;

    if (total === 0) {
      await client.logout();
      return json(res, 200, {
        success: true,
        message: 'ยังไม่มีเมลตอบกลับใน INBOX',
        messages: [],
      });
    }

    const fromSeq = Math.max(1, total - limit + 1);
    const messages = [];

    for await (const item of client.fetch(`${fromSeq}:*`, {
      uid: true,
      envelope: true,
      flags: true,
      internalDate: true,
      source: true,
    })) {
      const parsed = item.source ? await simpleParser(item.source) : null;
      const from = parsed?.from?.value?.[0] || item.envelope?.from?.[0] || {};
      const subject = parsed?.subject || item.envelope?.subject || '(ไม่มีหัวข้อ)';
      const date = parsed?.date || item.internalDate || item.envelope?.date || new Date();
      const text = (parsed?.text || '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
        .slice(0, 6000);

      messages.push({
        uid: item.uid,
        subject,
        from: formatAddress(from),
        date: new Date(date).toISOString(),
        text,
        seen: Array.isArray(item.flags) ? item.flags.includes('\\Seen') : false,
      });
    }

    await client.logout();

    return json(res, 200, {
      success: true,
      message: 'โหลด Inbox สำเร็จ',
      messages: messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    });
  } catch (error) {
    try {
      if (client && !client.closed) await client.logout();
    } catch {
      // Ignore logout errors so the real inbox error can be returned.
    }

    return json(res, 500, {
      success: false,
      message: error?.message || 'โหลด Inbox ไม่สำเร็จ',
      messages: [],
    });
  }
}
