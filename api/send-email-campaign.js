import nodemailer from 'nodemailer';

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

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const normalizeEmail = (value = '') => String(value).trim().toLowerCase();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const cleanRecipients = (recipients = []) => {
  const seen = new Set();
  const cleaned = [];

  for (const item of recipients) {
    const email = normalizeEmail(item?.email);
    if (!email || !isValidEmail(email) || seen.has(email)) continue;

    seen.add(email);
    cleaned.push({
      id: item?.id || '',
      name: String(item?.name || email).trim().slice(0, 120),
      email,
    });
  }

  return cleaned;
};

const chunk = (items, size) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

const buildEmailHtml = ({ title, message, ctaLabel, ctaUrl, preheader }) => {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const safePreheader = escapeHtml(preheader || title);
  const safeCtaLabel = escapeHtml(ctaLabel || 'เปิดดูรายละเอียด');
  const safeCtaUrl = String(ctaUrl || '').trim();
  const brandColor = env('EMAIL_BRAND_COLOR', '#FA6B19');
  const unsubscribeUrl = env('EMAIL_UNSUBSCRIBE_URL', '').trim();

  return `<!doctype html>
<html lang="th">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;background:#f6f8fb;font-family:Arial,'Noto Sans Thai',sans-serif;color:#101828;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safePreheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #e8eef7;box-shadow:0 18px 48px rgba(15,23,42,.08);">
            <tr>
              <td style="padding:28px 32px 10px;">
                <div style="font-size:14px;font-weight:800;letter-spacing:.04em;color:${brandColor};text-transform:uppercase;">SobKru69</div>
                <h1 style="margin:12px 0 14px;font-size:30px;line-height:1.25;color:#0f172a;">${safeTitle}</h1>
                <div style="font-size:17px;line-height:1.8;color:#475569;">${safeMessage}</div>
              </td>
            </tr>
            ${safeCtaUrl ? `
            <tr>
              <td style="padding:18px 32px 30px;">
                <a href="${escapeHtml(safeCtaUrl)}" style="display:inline-block;background:${brandColor};color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;border-radius:999px;padding:14px 24px;box-shadow:0 14px 28px rgba(250,107,25,.22);">${safeCtaLabel}</a>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:20px 32px;background:#fff7ed;border-top:1px solid #ffedd5;color:#64748b;font-size:13px;line-height:1.7;">
                อีเมลนี้ส่งจากระบบ SobKru69 เพื่อแจ้งข่าวสาร ฟีเจอร์ใหม่ หรือสินค้าใหม่ของระบบ
                ${unsubscribeUrl ? `<br />หากไม่ต้องการรับอีเมลประชาสัมพันธ์ สามารถกดยกเลิกได้ที่ <a href="${escapeHtml(unsubscribeUrl)}" style="color:${brandColor};font-weight:700;">ยกเลิกรับอีเมล</a>` : '<br />หากไม่ต้องการรับอีเมลประชาสัมพันธ์ กรุณาติดต่อผู้ดูแลระบบ'}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const buildEmailText = ({ title, message, ctaLabel, ctaUrl }) => {
  const lines = [stripHtml(title), '', stripHtml(message)];
  if (ctaUrl) {
    lines.push('', `${ctaLabel || 'เปิดดูรายละเอียด'}: ${ctaUrl}`);
  }
  lines.push('', 'SobKru69');
  return lines.join('\n');
};

const createTransport = () => {
  const host = env('SMTP_HOST') || env('HOSTINGER_SMTP_HOST');
  const user = env('SMTP_USER') || env('HOSTINGER_SMTP_USER');
  const pass = env('SMTP_PASS') || env('HOSTINGER_SMTP_PASS');
  const port = toNumber(env('SMTP_PORT') || env('HOSTINGER_SMTP_PORT'), 465);
  const secure = toBoolean(env('SMTP_SECURE') || env('HOSTINGER_SMTP_SECURE'), port === 465);

  if (!host || !user || !pass) {
    throw new Error('ยังไม่ได้ตั้งค่า SMTP_HOST, SMTP_USER, SMTP_PASS ใน Environment Variables');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    const expectedToken = env('EMAIL_CAMPAIGN_ADMIN_TOKEN');
    const providedToken = String(req.headers['x-email-campaign-token'] || '').trim();
    if (!expectedToken || providedToken !== expectedToken) {
      return json(res, 401, {
        success: false,
        message: 'รหัสอนุญาตส่งอีเมลไม่ถูกต้อง หรือยังไม่ได้ตั้งค่า EMAIL_CAMPAIGN_ADMIN_TOKEN บน Server',
      });
    }

    const body = req.body || {};
    const mode = body.mode || 'selected';
    const subject = String(body.subject || '').trim();
    const title = String(body.title || '').trim();
    const message = String(body.message || '').trim();
    const ctaLabel = String(body.ctaLabel || '').trim();
    const ctaUrl = String(body.ctaUrl || '').trim();
    const preheader = String(body.preheader || '').trim();

    if (!subject || !title || !message) {
      return json(res, 400, { success: false, message: 'กรุณากรอกหัวข้ออีเมล หัวข้อหลัก และเนื้อหาให้ครบ' });
    }

    const maxRecipients = toNumber(env('EMAIL_MAX_RECIPIENTS_PER_REQUEST'), 3000);
    const batchSize = Math.min(100, Math.max(1, toNumber(env('EMAIL_BATCH_SIZE'), 40)));
    const batchDelayMs = Math.max(0, toNumber(env('EMAIL_BATCH_DELAY_MS'), 250));
    const testEmail = normalizeEmail(body.testEmail || '');
    const recipients = mode === 'test'
      ? cleanRecipients([{ email: testEmail, name: 'Test recipient' }])
      : cleanRecipients(body.recipients || []);

    if (recipients.length === 0) {
      return json(res, 400, { success: false, message: mode === 'test' ? 'กรุณากรอกอีเมลสำหรับส่งทดสอบ' : 'ยังไม่มีรายชื่อผู้รับอีเมล' });
    }

    if (recipients.length > maxRecipients) {
      return json(res, 400, {
        success: false,
        message: `จำนวนผู้รับ ${recipients.length} คน เกินขีดจำกัดต่อครั้ง (${maxRecipients} คน) กรุณาแบ่งส่งเป็นรอบ`,
      });
    }

    const transporter = createTransport();
    const fromEmail = env('EMAIL_FROM') || env('SMTP_FROM') || env('SMTP_USER') || env('HOSTINGER_SMTP_USER');
    const fromName = env('EMAIL_FROM_NAME', 'SobKru69');
    const replyTo = env('EMAIL_REPLY_TO') || fromEmail;
    const html = buildEmailHtml({ title, message, ctaLabel, ctaUrl, preheader });
    const text = buildEmailText({ title, message, ctaLabel, ctaUrl });
    const batches = mode === 'test' ? [recipients] : chunk(recipients, batchSize);

    let successCount = 0;
    let failedCount = 0;
    const errors = [];

    for (const [index, batch] of batches.entries()) {
      try {
        if (mode === 'test') {
          await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: batch[0].email,
            replyTo,
            subject,
            html,
            text,
          });
        } else {
          await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: `"${fromName}" <${fromEmail}>`,
            bcc: batch.map((recipient) => recipient.email),
            replyTo,
            subject,
            html,
            text,
          });
        }
        successCount += batch.length;
      } catch (error) {
        failedCount += batch.length;
        errors.push(error?.message || 'ส่งบางชุดไม่สำเร็จ');
      }

      if (batchDelayMs > 0 && index < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, batchDelayMs));
      }
    }

    return json(res, failedCount > 0 ? 207 : 200, {
      success: failedCount === 0,
      message: failedCount === 0 ? 'ส่งอีเมลสำเร็จ' : 'ส่งอีเมลสำเร็จบางส่วน',
      recipientCount: recipients.length,
      successCount,
      failedCount,
      batches: batches.length,
      errors,
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message: error?.message || 'เกิดข้อผิดพลาดระหว่างส่งอีเมล',
    });
  }
}
