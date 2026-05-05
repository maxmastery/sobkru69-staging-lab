import nodemailer from 'nodemailer';
import { randomUUID } from 'crypto';

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

const isSafeHttpUrl = (value = '') => {
  try {
    const url = new URL(String(value).trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getEmailDomain = (email = '') => {
  const domain = String(email).split('@')[1]?.trim().toLowerCase();
  return domain && domain.includes('.') ? domain : 'coolcom.click';
};

const getDeliveryMode = () => {
  const mode = String(env('EMAIL_DELIVERY_MODE', 'individual')).trim().toLowerCase();
  return mode === 'bcc' ? 'bcc' : 'individual';
};

const getSupabaseServerConfig = () => {
  const url = env('SUPABASE_URL') || env('VITE_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return null;
  return {
    url: url.replace(/\/+$/, ''),
    serviceKey,
  };
};

const saveCampaignLog = async (payload) => {
  const config = getSupabaseServerConfig();
  if (!config) {
    return { saved: false, message: 'ยังไม่ได้ตั้งค่า SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY' };
  }

  const response = await fetch(`${config.url}/rest/v1/email_campaign_logs`, {
    method: 'POST',
    headers: {
      apikey: config.serviceKey,
      authorization: `Bearer ${config.serviceKey}`,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    return { saved: false, message: detail || 'บันทึกประวัติการส่งไม่สำเร็จ' };
  }

  return { saved: true, message: '' };
};

const buildEmailHtml = ({ title, message, ctaLabel, ctaUrl, preheader, imageUrl }) => {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const normalizedPreheader = stripHtml(preheader || '').replace(/^[.\s]+$/, '');
  const safePreheader = escapeHtml(normalizedPreheader || stripHtml(message).slice(0, 130) || title);
  const safeCtaLabel = escapeHtml(ctaLabel || 'เปิดดูรายละเอียด');
  const safeCtaUrl = isSafeHttpUrl(ctaUrl) ? String(ctaUrl || '').trim() : '';
  const safeImageUrl = isSafeHttpUrl(imageUrl) ? escapeHtml(String(imageUrl || '').trim()) : '';
  const brandColor = env('EMAIL_BRAND_COLOR', '#FA6B19');
  const unsubscribeUrl = env('EMAIL_UNSUBSCRIBE_URL', '').trim();

  return `<!doctype html>
<html lang="th" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${safeTitle}</title>
    <style>
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      @media only screen and (max-width: 620px) {
        .email-shell { padding: 18px 10px !important; }
        .email-card { border-radius: 22px !important; }
        .email-content { padding-left: 20px !important; padding-right: 20px !important; }
        .email-title { font-size: 24px !important; line-height: 1.35 !important; }
        .email-message { font-size: 16px !important; line-height: 1.85 !important; }
        .email-button { display: block !important; text-align: center !important; }
      }
    </style>
  </head>
  <body bgcolor="#f8fafc" style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,'Noto Sans Thai',Tahoma,sans-serif;color:#101828;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;line-height:1px;font-size:1px;mso-hide:all;">${safePreheader}</div>
    <table class="email-shell" role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8fafc" style="background-color:#f8fafc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table class="email-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:640px;background-color:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #e8eef7;box-shadow:0 18px 48px rgba(15,23,42,.08);">
            ${safeImageUrl ? `
            <tr>
              <td class="email-content" style="padding:28px 32px 0;">
                <img src="${safeImageUrl}" width="576" alt="" style="display:block;width:100%;max-width:576px;height:auto;border-radius:22px;background:#f1f5f9;" />
              </td>
            </tr>` : ''}
            <tr>
              <td class="email-content" style="padding:28px 32px 10px;">
                <div style="font-size:14px;font-weight:800;letter-spacing:.04em;color:${brandColor};text-transform:uppercase;">SobKru69</div>
                <h1 class="email-title" style="margin:12px 0 14px;font-size:30px;line-height:1.25;color:#0f172a;">${safeTitle}</h1>
                <div class="email-message" style="font-size:17px;line-height:1.8;color:#475569;">${safeMessage}</div>
              </td>
            </tr>
            ${safeCtaUrl ? `
            <tr>
              <td class="email-content" style="padding:18px 32px 30px;">
                <a class="email-button" href="${escapeHtml(safeCtaUrl)}" style="display:inline-block;background:${brandColor};color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;border-radius:999px;padding:14px 24px;box-shadow:0 14px 28px rgba(250,107,25,.22);">${safeCtaLabel}</a>
              </td>
            </tr>` : ''}
            <tr>
              <td class="email-content" bgcolor="#fff7ed" style="padding:20px 32px;background-color:#fff7ed;border-top:1px solid #ffedd5;color:#64748b;font-size:13px;line-height:1.7;">
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

const buildEmailText = ({ title, message, ctaLabel, ctaUrl, imageUrl }) => {
  const lines = [stripHtml(title), '', stripHtml(message)];
  if (imageUrl) {
    lines.push('', `รูปภาพประกอบ: ${imageUrl}`);
  }
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
  const pool = toBoolean(env('SMTP_POOL'), true);

  if (!host || !user || !pass) {
    throw new Error('ยังไม่ได้ตั้งค่า SMTP_HOST, SMTP_USER, SMTP_PASS ใน Environment Variables');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    pool,
    maxConnections: Math.max(1, toNumber(env('SMTP_MAX_CONNECTIONS'), 1)),
    maxMessages: Math.max(1, toNumber(env('SMTP_MAX_MESSAGES'), 100)),
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
    const imageUrl = isSafeHttpUrl(body.imageUrl) ? String(body.imageUrl || '').trim() : '';

    if (!subject || !title || !message) {
      return json(res, 400, { success: false, message: 'กรุณากรอกหัวข้ออีเมล หัวข้อหลัก และเนื้อหาให้ครบ' });
    }

    const deliveryMode = mode === 'test' ? 'individual' : getDeliveryMode();
    const maxRecipients = toNumber(env('EMAIL_MAX_RECIPIENTS_PER_REQUEST'), 80);
    const batchSize = Math.min(100, Math.max(1, toNumber(env('EMAIL_BATCH_SIZE'), 10)));
    const batchDelayMs = Math.max(0, toNumber(env('EMAIL_BATCH_DELAY_MS'), 500));
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
    const unsubscribeUrl = env('EMAIL_UNSUBSCRIBE_URL', '').trim();
    const messageIdDomain = env('EMAIL_MESSAGE_ID_DOMAIN') || getEmailDomain(fromEmail);
    const html = buildEmailHtml({ title, message, ctaLabel, ctaUrl, preheader, imageUrl });
    const text = buildEmailText({ title, message, ctaLabel, ctaUrl, imageUrl });
    const deliveryUnits = (mode === 'test' || deliveryMode === 'individual')
      ? recipients.map((recipient) => ({ type: 'individual', recipients: [recipient] }))
      : chunk(recipients, batchSize).map((batch) => ({ type: 'bcc', recipients: batch }));

    const buildMailOptions = (unit) => {
      const recipientEmails = unit.recipients.map((recipient) => recipient.email);
      const headers = {
        'X-Entity-Ref-ID': `sobkru69-${Date.now()}-${randomUUID()}`,
      };

      if (isSafeHttpUrl(unsubscribeUrl)) {
        headers['List-Unsubscribe'] = `<${unsubscribeUrl}>`;
        headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
      }

      const common = {
        from: `"${fromName}" <${fromEmail}>`,
        replyTo,
        subject,
        html,
        text,
        headers,
        messageId: `<sobkru69-${Date.now()}-${randomUUID()}@${messageIdDomain}>`,
        envelope: {
          from: fromEmail,
          to: recipientEmails,
        },
      };

      if (unit.type === 'bcc') {
        return {
          ...common,
          to: `"${fromName}" <${fromEmail}>`,
          bcc: recipientEmails,
        };
      }

      return {
        ...common,
        to: recipientEmails[0],
      };
    };

    let successCount = 0;
    let failedCount = 0;
    const errors = [];
    const recipientResults = [];

    try {
      for (const [index, unit] of deliveryUnits.entries()) {
        try {
          await transporter.sendMail(buildMailOptions(unit));
          successCount += unit.recipients.length;
          unit.recipients.forEach((recipient) => {
            recipientResults.push({
              id: recipient.id,
              name: recipient.name,
              email: recipient.email,
              status: 'sent',
            });
          });
        } catch (error) {
          const errorMessage = error?.message || 'ส่งบางชุดไม่สำเร็จ';
          failedCount += unit.recipients.length;
          errors.push(errorMessage);
          unit.recipients.forEach((recipient) => {
            recipientResults.push({
              id: recipient.id,
              name: recipient.name,
              email: recipient.email,
              status: 'failed',
              error: errorMessage,
            });
          });
        }

        if (batchDelayMs > 0 && index < deliveryUnits.length - 1) {
          await sleep(batchDelayMs);
        }
      }
    } finally {
      transporter.close?.();
    }

    const history = await saveCampaignLog({
      mode,
      subject,
      title,
      message,
      cta_label: ctaLabel,
      cta_url: ctaUrl,
      image_url: imageUrl,
      recipient_count: recipients.length,
      success_count: successCount,
      failed_count: failedCount,
      batches: deliveryUnits.length,
      errors,
      sent_by: req.headers['x-admin-name'] ? String(req.headers['x-admin-name']).slice(0, 120) : 'admin',
    }).catch((error) => ({ saved: false, message: error?.message || 'บันทึกประวัติไม่สำเร็จ' }));

    return json(res, failedCount > 0 ? 207 : 200, {
      success: failedCount === 0,
      message: failedCount === 0 ? 'ส่งอีเมลสำเร็จ' : 'ส่งอีเมลสำเร็จบางส่วน',
      recipientCount: recipients.length,
      successCount,
      failedCount,
      batches: deliveryUnits.length,
      deliveryMode,
      recipientResults,
      errors,
      historySaved: history.saved,
      historyMessage: history.message,
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message: error?.message || 'เกิดข้อผิดพลาดระหว่างส่งอีเมล',
    });
  }
}
