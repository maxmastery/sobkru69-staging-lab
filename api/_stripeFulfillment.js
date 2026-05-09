import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const json = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};

export const env = (key, fallback = '') => process.env[key] || fallback;

const toBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const normalizeEmail = (value = '') => String(value || '').trim().toLowerCase();

export const getSupabaseServerConfig = () => {
  const url = env('SUPABASE_URL') || env('VITE_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return null;
  return { url: url.replace(/\/+$/, ''), serviceKey };
};

export const requireAdminToken = (req) => {
  const expected = env('STRIPE_ADMIN_TOKEN') || env('EMAIL_CAMPAIGN_ADMIN_TOKEN');
  const received = req.headers['x-stripe-admin-token'] || req.headers['x-email-campaign-token'];
  if (!expected) return { ok: false, message: 'ยังไม่ได้ตั้งค่า STRIPE_ADMIN_TOKEN หรือ EMAIL_CAMPAIGN_ADMIN_TOKEN' };
  if (String(received || '') !== expected) return { ok: false, message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลยอดขาย' };
  return { ok: true };
};

export const supabaseRequest = async (path, options = {}) => {
  const config = getSupabaseServerConfig();
  if (!config) {
    throw new Error('ยังไม่ได้ตั้งค่า SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY');
  }

  const response = await fetch(`${config.url}${path}`, {
    ...options,
    headers: {
      apikey: config.serviceKey,
      authorization: `Bearer ${config.serviceKey}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `Supabase request failed with ${response.status}`);
  }
  return text ? JSON.parse(text) : null;
};

export const parseProductMeta = (features) => {
  if (!features || typeof features !== 'object' || Array.isArray(features)) return {};
  return features;
};

export const getProductsForFulfillment = async () => {
  const rows = await supabaseRequest('/rest/v1/products?select=*&order=created_at.desc');
  return Array.isArray(rows)
    ? rows.map((row) => {
        const meta = parseProductMeta(row.features);
        return {
          ...row,
          meta,
          stripePriceId: String(meta.stripePriceId || ''),
          stripeProductId: String(meta.stripeProductId || ''),
          deliveryFileUrl: String(meta.deliveryFileUrl || ''),
          deliveryFileLabel: String(meta.deliveryFileLabel || ''),
          deliveryEmailNote: String(meta.deliveryEmailNote || ''),
        };
      })
    : [];
};

export const matchLocalProduct = (products, lineItem) => {
  const priceId = lineItem?.price?.id || '';
  const stripeProduct = lineItem?.price?.product;
  const productId = typeof stripeProduct === 'string' ? stripeProduct : stripeProduct?.id || '';
  const productName = String(
    (typeof stripeProduct === 'object' && stripeProduct?.name) ||
      lineItem?.description ||
      ''
  ).trim().toLowerCase();

  return products.find((product) => product.stripePriceId && product.stripePriceId === priceId)
    || products.find((product) => product.stripeProductId && product.stripeProductId === productId)
    || products.find((product) => String(product.name || '').trim().toLowerCase() === productName)
    || null;
};

const createTransport = () => {
  const host = env('SMTP_HOST') || env('HOSTINGER_SMTP_HOST');
  const user = env('SMTP_USER') || env('HOSTINGER_SMTP_USER');
  const pass = env('SMTP_PASS') || env('HOSTINGER_SMTP_PASS');
  const port = toNumber(env('SMTP_PORT') || env('HOSTINGER_SMTP_PORT'), 465);
  const secure = toBoolean(env('SMTP_SECURE') || env('HOSTINGER_SMTP_SECURE'), port === 465);

  if (!host || !user || !pass) {
    throw new Error('ยังไม่ได้ตั้งค่า SMTP_HOST, SMTP_USER, SMTP_PASS');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

const buildDeliveryHtml = ({ order, items }) => {
  const brandColor = env('EMAIL_BRAND_COLOR', '#FA6B19');
  const rows = items.map((item) => {
    const label = item.delivery_file_label || item.local_product_name || item.stripe_product_name || 'ดาวน์โหลดไฟล์';
    return `
      <tr>
        <td style="padding:18px 0;border-top:1px solid #eef2f7;">
          <div style="font-size:17px;font-weight:800;color:#0f172a;">${escapeHtml(label)}</div>
          ${item.local_product_name ? `<div style="margin-top:4px;font-size:14px;color:#64748b;">${escapeHtml(item.local_product_name)}</div>` : ''}
          ${item.delivery_file_url ? `<a href="${escapeHtml(item.delivery_file_url)}" style="display:inline-block;margin-top:12px;background:${brandColor};color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:800;">ดาวน์โหลดไฟล์</a>` : ''}
          ${item.delivery_email_note ? `<div style="margin-top:10px;font-size:13px;line-height:1.6;color:#64748b;">${escapeHtml(item.delivery_email_note)}</div>` : ''}
        </td>
      </tr>`;
  }).join('');

  return `<!doctype html>
<html lang="th">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;background:#f8fafc;font-family:Arial,'Noto Sans Thai',Tahoma,sans-serif;color:#0f172a;">
    <table width="100%" role="presentation" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:28px 14px;">
      <tr><td align="center">
        <table width="100%" role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:28px;overflow:hidden;">
          <tr><td style="padding:30px 32px 16px;">
            <div style="font-size:13px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:${brandColor};">SobKru69</div>
            <h1 style="margin:12px 0 10px;font-size:30px;line-height:1.25;">ไฟล์ของคุณพร้อมดาวน์โหลดแล้ว</h1>
            <p style="margin:0;font-size:16px;line-height:1.8;color:#475569;">ขอบคุณสำหรับการสั่งซื้อ ระบบได้แนบลิงก์ดาวน์โหลดไฟล์ตามรายการด้านล่างนี้</p>
          </td></tr>
          <tr><td style="padding:0 32px 26px;">
            <table width="100%" role="presentation" cellpadding="0" cellspacing="0">${rows}</table>
          </td></tr>
          <tr><td style="padding:18px 32px;background:#fff7ed;border-top:1px solid #ffedd5;font-size:13px;line-height:1.7;color:#64748b;">
            เลขอ้างอิงคำสั่งซื้อ: ${escapeHtml(order.stripe_checkout_session_id || order.id || '')}<br />
            หากดาวน์โหลดไม่ได้ กรุณาติดต่อผู้ดูแลระบบพร้อมอีเมลที่ใช้ชำระเงิน
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};

const buildDeliveryText = ({ order, items }) => [
  'ไฟล์ของคุณพร้อมดาวน์โหลดแล้ว',
  '',
  ...items.flatMap((item) => [
    item.delivery_file_label || item.local_product_name || item.stripe_product_name || 'ดาวน์โหลดไฟล์',
    item.delivery_file_url || '',
    item.delivery_email_note || '',
    '',
  ]),
  `เลขอ้างอิงคำสั่งซื้อ: ${order.stripe_checkout_session_id || order.id || ''}`,
].join('\n');

export const sendDeliveryEmail = async ({ order, items }) => {
  const email = normalizeEmail(order.customer_email);
  if (!email) throw new Error('ไม่พบอีเมลลูกค้าในคำสั่งซื้อ');

  const deliverableItems = items.filter((item) => item.delivery_file_url);
  if (deliverableItems.length === 0) {
    return { sent: false, messageId: '', message: 'ไม่มีไฟล์ที่ตั้งค่าไว้สำหรับส่งอัตโนมัติ' };
  }

  const fromEmail = env('EMAIL_FROM') || env('SMTP_FROM') || env('HOSTINGER_SMTP_USER') || env('SMTP_USER');
  const fromName = env('EMAIL_FROM_NAME', 'SobKru69');
  const transport = createTransport();
  const result = await transport.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: env('STRIPE_DELIVERY_EMAIL_SUBJECT', 'ไฟล์ของคุณพร้อมดาวน์โหลดแล้ว | SobKru69'),
    html: buildDeliveryHtml({ order, items: deliverableItems }),
    text: buildDeliveryText({ order, items: deliverableItems }),
  });

  return { sent: true, messageId: result.messageId || '', message: 'ส่งอีเมลสำเร็จ' };
};

export const verifyStripeSignature = ({ rawBody, signatureHeader, secret }) => {
  if (!signatureHeader || !secret) return false;
  const parts = Object.fromEntries(String(signatureHeader).split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');

  const receivedBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  if (receivedBuffer.length !== expectedBuffer.length) return false;

  const toleranceSeconds = toNumber(env('STRIPE_WEBHOOK_TOLERANCE_SECONDS'), 300);
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (Number.isFinite(age) && age > toleranceSeconds) return false;

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
};

export const stripeFetch = async (path, options = {}) => {
  const secretKey = env('STRIPE_SECRET_KEY');
  if (!secretKey) throw new Error('ยังไม่ได้ตั้งค่า STRIPE_SECRET_KEY');
  const response = await fetch(`https://api.stripe.com${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${secretKey}`,
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || `Stripe request failed with ${response.status}`);
  }
  return data;
};
