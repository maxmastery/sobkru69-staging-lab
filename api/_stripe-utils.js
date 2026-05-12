import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
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

export const readRawBody = async (req) => {
  if (typeof req.body === 'string') return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (typeof req.rawBody === 'string') return req.rawBody;
  if (Buffer.isBuffer(req.rawBody)) return req.rawBody.toString('utf8');
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body);

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
};

export const readJsonBody = async (req) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  const raw = await readRawBody(req);
  if (!raw) return {};
  return JSON.parse(raw);
};

export const requireAdminToken = (req) => {
  const expected = env('STRIPE_ADMIN_TOKEN') || env('EMAIL_CAMPAIGN_ADMIN_TOKEN');
  const provided = String(req.headers['x-stripe-admin-token'] || req.headers['x-email-campaign-token'] || '').trim();

  if (!expected || provided !== expected) {
    const error = new Error('Admin token ไม่ถูกต้อง หรือยังไม่ได้ตั้งค่า STRIPE_ADMIN_TOKEN บน Server');
    error.statusCode = 401;
    throw error;
  }
};

const getSupabaseServerConfig = () => {
  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL')).replace(/\/+$/, '');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return null;
  return { url, serviceKey };
};

const supabaseHeaders = (config, extra = {}) => ({
  apikey: config.serviceKey,
  authorization: `Bearer ${config.serviceKey}`,
  ...extra,
});

export const supabaseRequest = async (path, options = {}) => {
  const config = getSupabaseServerConfig();
  if (!config) {
    throw new Error('ยังไม่ได้ตั้งค่า SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY บน Server');
  }

  const response = await fetch(`${config.url}${path}`, {
    ...options,
    headers: supabaseHeaders(config, options.headers || {}),
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message = data?.message || data?.hint || data?.details || text || 'Supabase request failed';
    throw new Error(message);
  }

  return data;
};

const getAppSetting = async (key) => {
  const rows = await supabaseRequest(`/rest/v1/app_settings?select=value&key=eq.${encodeURIComponent(key)}&limit=1`);
  return rows?.[0]?.value || null;
};

const setAppSetting = async (key, value) => {
  await supabaseRequest('/rest/v1/app_settings?on_conflict=key', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({
      key,
      value,
      updated_at: new Date().toISOString(),
    }),
  });
};

const parseProductFeatures = (features) => {
  if (!features || typeof features !== 'object') {
    return {};
  }
  return features;
};

export const loadLocalProducts = async () => {
  try {
    const rows = await supabaseRequest('/rest/v1/products?select=id,name,price,status,features&limit=1000');
    return (rows || []).map((row) => {
      const features = parseProductFeatures(row.features);
      return {
        id: row.id,
        name: row.name || '',
        price: Number(row.price || 0),
        status: row.status || '',
        stripePriceId: features.stripePriceId || '',
        stripeProductId: features.stripeProductId || '',
        stripeUrl: features.stripeUrl || '',
        deliveryFileUrl: features.deliveryFileUrl || '',
        deliveryFileLabel: features.deliveryFileLabel || '',
        deliveryEmailNote: features.deliveryEmailNote || '',
      };
    });
  } catch (error) {
    console.warn('Failed to load local products for Stripe fulfillment', error);
    return [];
  }
};

const appendSearchParam = (searchParams, key, value) => {
  if (value === undefined || value === null || value === '') return;
  if (Array.isArray(value)) {
    value.forEach((item) => appendSearchParam(searchParams, key, item));
    return;
  }
  searchParams.append(key, String(value));
};

export const stripeRequest = async (path, params = {}, method = 'GET') => {
  const secretKey = env('STRIPE_SECRET_KEY');
  if (!secretKey) {
    throw new Error('ยังไม่ได้ตั้งค่า STRIPE_SECRET_KEY บน Server');
  }

  const normalizedPath = String(path).replace(/^\/+/, '');
  const url = new URL(`https://api.stripe.com/v1/${normalizedPath}`);
  const headers = {
    authorization: `Bearer ${secretKey}`,
  };
  const options = { method, headers };

  if (method === 'GET') {
    Object.entries(params).forEach(([key, value]) => appendSearchParam(url.searchParams, key, value));
  } else {
    const body = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => appendSearchParam(body, key, value));
    headers['content-type'] = 'application/x-www-form-urlencoded';
    options.body = body;
  }

  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || 'Stripe request failed');
  }
  return data;
};

const getStorageBucket = () => env('STRIPE_DELIVERY_FILE_BUCKET') || env('VITE_SUPABASE_FILES_BUCKET') || 'sobkru-files';

const signSupabaseFilePath = async (rawPath, rawBucket = getStorageBucket()) => {
  const config = getSupabaseServerConfig();
  if (!config) return '';

  const bucket = String(rawBucket || getStorageBucket()).replace(/^\/+|\/+$/g, '');
  const path = String(rawPath || '').replace(/^\/+/, '');
  if (!bucket || !path) return '';

  const expiresIn = Math.max(60, toNumber(env('STRIPE_DELIVERY_LINK_EXPIRES_SECONDS'), 7 * 24 * 60 * 60));
  const response = await fetch(`${config.url}/storage/v1/object/sign/${encodeURIComponent(bucket)}/${path.split('/').map(encodeURIComponent).join('/')}`, {
    method: 'POST',
    headers: supabaseHeaders(config, {
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ expiresIn }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return '';

  const signedPath = data?.signedURL || data?.signedUrl || '';
  if (!signedPath) return '';
  return signedPath.startsWith('http') ? signedPath : `${config.url}${signedPath}`;
};

const createStripeFileLink = async (fileId) => {
  const expiresAt = Math.floor(Date.now() / 1000) + Math.max(60, toNumber(env('STRIPE_DELIVERY_LINK_EXPIRES_SECONDS'), 7 * 24 * 60 * 60));
  const fileLink = await stripeRequest('/file_links', {
    file: fileId,
    expires_at: expiresAt,
  }, 'POST');
  return isSafeHttpUrl(fileLink?.url) ? fileLink.url : '';
};

const extractMarkdownUrl = (value) => {
  const match = String(value).match(/\((https?:\/\/[^)\s]+)\)/i);
  return match?.[1] || value;
};

const splitMetadataValue = (value) => {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value.flatMap(splitMetadataValue);
  if (typeof value === 'object') {
    return Object.values(value).flatMap(splitMetadataValue);
  }

  const raw = String(value).trim();
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (parsed !== raw) return splitMetadataValue(parsed);
  } catch {
    // Plain text metadata is expected.
  }

  return raw
    .split(/\r?\n|[,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const deliveryKeyPattern = /(delivery|deliver|download|file|files|pdf|ebook|e-book|link|url|ไฟล์)/i;

const extractFileCandidatesFromMetadata = (metadata = {}) => {
  const candidates = [];
  for (const [key, value] of Object.entries(metadata || {})) {
    if (!deliveryKeyPattern.test(key)) continue;
    splitMetadataValue(value).forEach((item) => candidates.push({ value: item, label: key }));
  }
  return candidates;
};

const resolveFileCandidate = async (candidate, fallbackLabel) => {
  const rawValue = extractMarkdownUrl(candidate?.value || '').trim().replace(/^["']|["']$/g, '');
  if (!rawValue) return null;

  let url = '';
  if (isSafeHttpUrl(rawValue)) {
    url = rawValue;
  } else if (/^file_[A-Za-z0-9]+/.test(rawValue)) {
    url = await createStripeFileLink(rawValue);
  } else if (rawValue.startsWith('storage://')) {
    const withoutScheme = rawValue.replace(/^storage:\/\//, '');
    const [bucket, ...pathParts] = withoutScheme.split('/');
    url = await signSupabaseFilePath(pathParts.join('/'), bucket);
  } else if (/^[\w.-]+\/.+/.test(rawValue) || /\.[a-z0-9]{2,8}$/i.test(rawValue)) {
    url = await signSupabaseFilePath(rawValue);
  }

  if (!url) return null;
  return {
    label: String(candidate?.label || fallbackLabel || 'ไฟล์สินค้า').trim(),
    url,
  };
};

const dedupeFiles = (files) => {
  const seen = new Set();
  return files.filter((file) => {
    if (!file?.url || seen.has(file.url)) return false;
    seen.add(file.url);
    return true;
  });
};

const findLocalProduct = (lineItem, localProducts) => {
  const price = lineItem.price || {};
  const product = price.product && typeof price.product === 'object' ? price.product : {};
  const stripeProductId = product.id || (typeof price.product === 'string' ? price.product : '');
  const stripePriceId = price.id || '';
  const stripeName = String(product.name || lineItem.description || '').trim().toLowerCase();

  return localProducts.find((item) => item.stripePriceId && item.stripePriceId === stripePriceId)
    || localProducts.find((item) => item.stripeProductId && item.stripeProductId === stripeProductId)
    || localProducts.find((item) => item.name && item.name.trim().toLowerCase() === stripeName)
    || null;
};

const collectDeliveryFiles = async ({ session, paymentLink, lineItem, localProduct }) => {
  const price = lineItem.price || {};
  const product = price.product && typeof price.product === 'object' ? price.product : {};
  const fallbackLabel = localProduct?.deliveryFileLabel || product.name || lineItem.description || 'ไฟล์สินค้า';
  const candidates = [];

  if (localProduct?.deliveryFileUrl) {
    candidates.push({ value: localProduct.deliveryFileUrl, label: localProduct.deliveryFileLabel || fallbackLabel });
  }

  [
    session?.metadata,
    paymentLink?.metadata,
    price?.metadata,
    product?.metadata,
  ].forEach((metadata) => {
    candidates.push(...extractFileCandidatesFromMetadata(metadata));
  });

  const files = [];
  for (const candidate of candidates) {
    try {
      const resolved = await resolveFileCandidate(candidate, fallbackLabel);
      if (resolved) files.push(resolved);
    } catch (error) {
      console.warn('Failed to resolve delivery file candidate', error);
    }
  }

  return dedupeFiles(files);
};

const getPaymentLink = async (session, cache) => {
  const id = typeof session?.payment_link === 'string' ? session.payment_link : session?.payment_link?.id;
  if (!id) return null;
  if (cache.has(id)) return cache.get(id);

  try {
    const paymentLink = await stripeRequest(`/payment_links/${encodeURIComponent(id)}`);
    cache.set(id, paymentLink);
    return paymentLink;
  } catch (error) {
    console.warn('Failed to load Stripe payment link metadata', error);
    cache.set(id, null);
    return null;
  }
};

const listCheckoutSessions = async () => {
  const lookbackDays = Math.max(1, toNumber(env('STRIPE_SYNC_LOOKBACK_DAYS'), 90));
  const maxSessions = Math.max(1, toNumber(env('STRIPE_SYNC_MAX_SESSIONS'), 500));
  const sessions = [];
  let startingAfter = '';

  while (sessions.length < maxSessions) {
    const page = await stripeRequest('/checkout/sessions', {
      limit: Math.min(100, maxSessions - sessions.length),
      'created[gte]': Math.floor(Date.now() / 1000) - lookbackDays * 24 * 60 * 60,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    sessions.push(...(page?.data || []));
    if (!page?.has_more || !page?.data?.length) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  return sessions;
};

const retrieveCheckoutSession = async (sessionId) => stripeRequest(`/checkout/sessions/${encodeURIComponent(sessionId)}`);

const retrievePaymentIntent = async (paymentIntentId) => {
  if (!paymentIntentId) return null;
  try {
    return await stripeRequest(`/payment_intents/${encodeURIComponent(paymentIntentId)}`, {
      'expand[]': 'latest_charge',
    });
  } catch (error) {
    console.warn('Failed to load Stripe payment intent timestamp', error);
    return null;
  }
};

const getPaidAt = async (session) => {
  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id || '';
  const paymentIntent = await retrievePaymentIntent(paymentIntentId);
  const latestCharge = paymentIntent?.latest_charge;
  const chargeCreated = typeof latestCharge === 'object' ? latestCharge?.created : null;
  const paymentIntentCreated = paymentIntent?.created;
  const paidUnix = chargeCreated || paymentIntentCreated || session.created;
  return paidUnix ? new Date(paidUnix * 1000).toISOString() : new Date().toISOString();
};

const getLineItems = async (sessionId) => {
  const items = [];
  let startingAfter = '';

  while (true) {
    const page = await stripeRequest(`/checkout/sessions/${encodeURIComponent(sessionId)}/line_items`, {
      limit: 100,
      'expand[]': ['data.price.product'],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    items.push(...(page?.data || []));
    if (!page?.has_more || !page?.data?.length) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  return items;
};

const buildOrderFromSession = async (session, context) => {
  const localProducts = context.localProducts || [];
  const paymentLink = await getPaymentLink(session, context.paymentLinkCache);
  const lineItems = await getLineItems(session.id);
  const paidAt = await getPaidAt(session);
  const customerDetails = session.customer_details || {};
  const customerEmail = normalizeEmail(customerDetails.email || session.customer_email || '');
  const order = {
    id: session.id,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || '',
    customer_name: customerDetails.name || session.customer_name || '',
    customer_email: customerEmail,
    amount_total: Number(session.amount_total || 0),
    currency: session.currency || 'thb',
    payment_status: session.payment_status || '',
    delivery_status: 'pending',
    delivery_error: '',
    delivery_sent_at: '',
    delivery_retry_count: 0,
    checkout_created_at: session.created ? new Date(session.created * 1000).toISOString() : '',
    paid_at: paidAt,
    created_at: paidAt,
    updated_at: new Date().toISOString(),
    delivery_files: [],
  };

  const items = [];
  for (const [index, lineItem] of lineItems.entries()) {
    const price = lineItem.price || {};
    const product = price.product && typeof price.product === 'object' ? price.product : {};
    const localProduct = findLocalProduct(lineItem, localProducts);
    const deliveryFiles = await collectDeliveryFiles({ session, paymentLink, lineItem, localProduct });
    const stripeProductName = product.name || lineItem.description || '';

    items.push({
      id: lineItem.id || `${session.id}_${index}`,
      order_id: session.id,
      stripe_line_item_id: lineItem.id || '',
      stripe_product_id: product.id || (typeof price.product === 'string' ? price.product : ''),
      stripe_price_id: price.id || '',
      stripe_product_name: stripeProductName,
      local_product_id: localProduct?.id || '',
      local_product_name: localProduct?.name || '',
      quantity: Number(lineItem.quantity || 1),
      amount_total: Number(lineItem.amount_total || 0),
      currency: lineItem.currency || session.currency || 'thb',
      delivery_files: deliveryFiles,
      delivery_email_note: localProduct?.deliveryEmailNote || '',
    });
  }

  order.delivery_files = dedupeFiles(items.flatMap((item) => item.delivery_files || []));
  return { order, items };
};

const SALES_KEY = 'stripe_sales';
const MAX_RETRY_COUNT = 2;

export const loadSalesStore = async () => {
  const value = await getAppSetting(SALES_KEY).catch(() => null);
  return {
    orders: Array.isArray(value?.orders) ? value.orders : [],
    items: Array.isArray(value?.items) ? value.items : [],
    updatedAt: value?.updatedAt || '',
  };
};

const saveSalesStore = async (store) => {
  const normalized = {
    orders: [...(store.orders || [])]
      .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
      .slice(0, Math.max(20, toNumber(env('STRIPE_SALES_MAX_STORED_ORDERS'), 250))),
    items: store.items || [],
    updatedAt: new Date().toISOString(),
  };
  const orderIds = new Set(normalized.orders.map((order) => order.id));
  normalized.items = normalized.items.filter((item) => orderIds.has(item.order_id)).slice(0, 2000);
  await setAppSetting(SALES_KEY, normalized);
  return normalized;
};

const mergeSyncedOrder = (store, nextOrder, nextItems) => {
  const existingOrder = store.orders.find((order) => order.id === nextOrder.id);
  const order = {
    ...nextOrder,
    delivery_status: existingOrder?.delivery_status || nextOrder.delivery_status,
    delivery_error: existingOrder?.delivery_error || '',
    delivery_sent_at: existingOrder?.delivery_sent_at || '',
    delivery_retry_count: Number(existingOrder?.delivery_retry_count || nextOrder.delivery_retry_count || 0),
    checkout_created_at: nextOrder.checkout_created_at || existingOrder?.checkout_created_at || '',
    paid_at: nextOrder.paid_at || existingOrder?.paid_at || nextOrder.created_at,
  };

  store.orders = [
    order,
    ...store.orders.filter((item) => item.id !== order.id),
  ];
  store.items = [
    ...nextItems,
    ...store.items.filter((item) => item.order_id !== order.id),
  ];

  return order;
};

const createTransport = () => {
  const host = env('SMTP_HOST') || env('HOSTINGER_SMTP_HOST');
  const user = env('SMTP_USER') || env('HOSTINGER_SMTP_USER');
  const pass = env('SMTP_PASS') || env('HOSTINGER_SMTP_PASS');
  const port = toNumber(env('SMTP_PORT') || env('HOSTINGER_SMTP_PORT'), 465);
  const secure = toBoolean(env('SMTP_SECURE') || env('HOSTINGER_SMTP_SECURE'), port === 465);

  if (!host || !user || !pass) {
    throw new Error('ยังไม่ได้ตั้งค่า SMTP_HOST, SMTP_USER, SMTP_PASS บน Server');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    pool: false,
    name: env('SMTP_HELO_NAME') || env('EMAIL_MESSAGE_ID_DOMAIN') || 'course.coolcom.click',
    auth: { user, pass },
  });
};

const buildDeliveryHtml = ({ order, items, files }) => {
  const brandColor = env('EMAIL_BRAND_COLOR', '#FA6B19');
  const productList = items
    .map((item) => `<li>${escapeHtml(item.local_product_name || item.stripe_product_name || 'สินค้า')} x${Number(item.quantity || 1)}</li>`)
    .join('');
  const fileButtons = files
    .map((file) => `<p style="margin:14px 0;"><a href="${escapeHtml(file.url)}" style="display:inline-block;background:${brandColor};color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;border-radius:999px;padding:13px 22px;">ดาวโหลดไฟล์</a></p>`)
    .join('');
  const notes = items
    .map((item) => item.delivery_email_note)
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
    .map((note) => `<p style="margin:12px 0;color:#475569;">${escapeHtml(note).replace(/\n/g, '<br />')}</p>`)
    .join('');

  return `<!doctype html>
<html lang="th">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
  <body style="margin:0;background:#f8fafc;font-family:Arial,'Noto Sans Thai',Tahoma,sans-serif;color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 14px;background:#f8fafc;">
      <tr><td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:26px;overflow:hidden;">
          <tr><td style="padding:30px 32px 12px;">
            <div style="font-size:13px;font-weight:900;letter-spacing:.08em;color:${brandColor};text-transform:uppercase;">CoolCom Sheet | SobKru69</div>
            <h1 style="margin:12px 0 10px;font-size:28px;line-height:1.3;color:#0f172a;">ขอบคุณสำหรับคำสั่งซื้อ</h1>
            <p style="margin:0;color:#475569;font-size:16px;line-height:1.8;">ระบบจัดส่งลิงก์ดาวน์โหลดสินค้าให้เรียบร้อยแล้ว กรุณากดปุ่มด้านล่างเพื่อรับไฟล์</p>
          </td></tr>
          <tr><td style="padding:10px 32px 6px;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:16px 18px;">
              <div style="font-size:13px;font-weight:800;color:#64748b;">รายการสินค้า</div>
              <ul style="margin:10px 0 0;padding-left:20px;color:#0f172a;font-size:15px;line-height:1.8;">${productList}</ul>
            </div>
          </td></tr>
          <tr><td style="padding:18px 32px 8px;">${fileButtons}${notes}</td></tr>
          <tr><td style="padding:20px 32px;background:#fff7ed;border-top:1px solid #ffedd5;color:#64748b;font-size:13px;line-height:1.7;">
            หมายเลขคำสั่งซื้อ: ${escapeHtml(order.stripe_checkout_session_id || order.id)}<br />
            อีเมลฉบับนี้เป็นอีเมลอัตโนมัติหลังการสั่งซื้อจากเว็บไซต์ course.coolcom.click<br />
            หากเปิดลิงก์ไม่ได้ กรุณาติดต่อผู้ดูแลระบบพร้อมแนบอีเมลที่ใช้ชำระเงิน
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
};

const buildDeliveryText = ({ order, items, files }) => {
  const lines = [
    'CoolCom Sheet | SobKru69',
    'ขอบคุณสำหรับคำสั่งซื้อ ระบบจัดส่งลิงก์ดาวน์โหลดสินค้าให้เรียบร้อยแล้ว',
    '',
    'รายการสินค้า:',
    ...items.map((item) => `- ${stripHtml(item.local_product_name || item.stripe_product_name || 'สินค้า')} x${Number(item.quantity || 1)}`),
    '',
    'ลิงก์ดาวน์โหลด:',
    ...files.map((file) => `- ${stripHtml(file.label || 'ไฟล์สินค้า')}: ${file.url}`),
    '',
    `หมายเลขคำสั่งซื้อ: ${order.stripe_checkout_session_id || order.id}`,
  ];
  return lines.join('\n');
};

const sendDeliveryEmail = async ({ order, items, files }) => {
  if (!order.customer_email || !isValidEmail(order.customer_email)) {
    throw new Error('ไม่พบอีเมลลูกค้าใน Stripe order');
  }
  if (!files.length) {
    throw new Error('ยังไม่พบไฟล์สำหรับส่งใน Stripe metadata หรือสินค้าในระบบ');
  }

  const transporter = createTransport();
  const fromEmail = env('EMAIL_FROM') || env('SMTP_FROM') || env('SMTP_USER') || env('HOSTINGER_SMTP_USER');
  const fromName = env('EMAIL_FROM_NAME', 'CoolCom Sheet | SobKru69');
  const replyTo = env('EMAIL_REPLY_TO') || fromEmail;
  const messageIdDomain = env('EMAIL_MESSAGE_ID_DOMAIN') || (fromEmail.split('@')[1] || 'coolcom.click');
  const subject = env('STRIPE_DELIVERY_EMAIL_SUBJECT', 'ลิงก์ดาวน์โหลด E-book จาก CoolCom Sheet | SobKru69');

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: order.customer_email,
      replyTo,
      subject,
      html: buildDeliveryHtml({ order, items, files }),
      text: buildDeliveryText({ order, items, files }),
      messageId: `<sobkru69-stripe-${Date.now()}-${randomUUID()}@${messageIdDomain}>`,
      envelope: {
        from: fromEmail,
        to: order.customer_email,
      },
      headers: {
        'X-Entity-Ref-ID': `sobkru69-stripe-${order.id}-${Date.now()}`,
        'X-Transactional-Email': 'true',
        'Auto-Submitted': 'auto-generated',
      },
    });
  } finally {
    transporter.close?.();
  }
};

const attemptDelivery = async (store, orderId, options = {}) => {
  const order = store.orders.find((item) => item.id === orderId);
  if (!order) {
    throw new Error('ไม่พบคำสั่งซื้อที่ต้องการส่งไฟล์');
  }

  const items = store.items.filter((item) => item.order_id === orderId);
  const files = dedupeFiles([
    ...(order.delivery_files || []),
    ...items.flatMap((item) => item.delivery_files || []),
  ]);

  if (!files.length) {
    order.delivery_status = 'no_file';
    order.delivery_error = 'ยังไม่พบ metadata ไฟล์ใน Stripe หรือสินค้าในระบบ';
    order.updated_at = new Date().toISOString();
    return { delivered: false, status: order.delivery_status, message: order.delivery_error };
  }

  if (!options.force && order.delivery_status === 'sent') {
    return { delivered: false, status: order.delivery_status, message: 'ส่งไฟล์แล้ว' };
  }

  try {
    await sendDeliveryEmail({ order, items, files });
    order.delivery_status = 'sent';
    order.delivery_error = '';
    order.delivery_sent_at = new Date().toISOString();
    order.updated_at = new Date().toISOString();
    return { delivered: true, status: order.delivery_status, message: 'ส่งไฟล์สำเร็จ' };
  } catch (error) {
    order.delivery_status = 'failed';
    order.delivery_error = error?.message || 'ส่งไฟล์ไม่สำเร็จ';
    order.delivery_retry_count = Number(order.delivery_retry_count || 0) + 1;
    order.updated_at = new Date().toISOString();
    return { delivered: false, status: order.delivery_status, message: order.delivery_error };
  }
};

const retryFailedDeliveries = async (store) => {
  let retriedCount = 0;
  let deliveredCount = 0;

  const retryableOrders = (store.orders || []).filter((order) => (
    order.delivery_status === 'failed'
    && !order.delivery_sent_at
    && Number(order.delivery_retry_count || 0) < MAX_RETRY_COUNT
  ));

  for (const order of retryableOrders) {
    retriedCount += 1;
    const delivery = await attemptDelivery(store, order.id, { force: true });
    if (delivery.delivered) {
      deliveredCount += 1;
    }
  }

  return { retriedCount, deliveredCount };
};

export const syncCheckoutSession = async (sessionId, options = {}) => {
  const store = await loadSalesStore();
  const localProducts = await loadLocalProducts();
  const context = { localProducts, paymentLinkCache: new Map() };
  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== 'paid') {
    return { synced: false, delivered: false, message: 'Checkout Session ยังไม่ได้ชำระเงิน', store };
  }

  const { order, items } = await buildOrderFromSession(session, context);
  mergeSyncedOrder(store, order, items);
  const delivery = options.sendDelivery === false
    ? { delivered: false, status: order.delivery_status, message: 'ไม่ได้ส่งไฟล์ในรอบนี้' }
    : await attemptDelivery(store, order.id, { force: Boolean(options.forceDelivery) });
  const saved = await saveSalesStore(store);
  return { synced: true, delivered: delivery.delivered, message: delivery.message, store: saved };
};

export const syncRecentStripeSessions = async (options = {}) => {
  const store = await loadSalesStore();
  const localProducts = await loadLocalProducts();
  const context = { localProducts, paymentLinkCache: new Map() };
  const sessions = await listCheckoutSessions();
  let syncedCount = 0;
  let deliveredCount = 0;

  for (const session of sessions) {
    if (session.payment_status !== 'paid') continue;
    const { order, items } = await buildOrderFromSession(session, context);
    const mergedOrder = mergeSyncedOrder(store, order, items);
    syncedCount += 1;
    if (options.sendDeliveries !== false) {
      if (mergedOrder.delivery_status !== 'failed') {
        const delivery = await attemptDelivery(store, mergedOrder.id, { force: false });
        if (delivery.delivered) deliveredCount += 1;
      }
    }
  }

  const retryResult = options.sendDeliveries === false
    ? { retriedCount: 0, deliveredCount: 0 }
    : await retryFailedDeliveries(store);
  deliveredCount += retryResult.deliveredCount;

  const saved = await saveSalesStore(store);
  return {
    syncedCount,
    deliveredCount,
    retriedCount: retryResult.retriedCount,
    store: saved,
    message: syncedCount > 0
      ? `ซิงก์ Stripe ${syncedCount} ออเดอร์ ส่งไฟล์ใหม่ ${deliveredCount} รายการ และลองส่งซ้ำ ${retryResult.retriedCount} รายการ`
      : 'ยังไม่พบออเดอร์ Stripe ใหม่ในช่วงเวลาที่ตั้งไว้',
  };
};

export const resendOrderDelivery = async (orderId) => {
  const store = await loadSalesStore();
  const delivery = await attemptDelivery(store, orderId, { force: true });
  const saved = await saveSalesStore(store);
  if (!delivery.delivered) {
    throw new Error(delivery.message || 'ส่งไฟล์ซ้ำไม่สำเร็จ');
  }
  return { message: delivery.message, store: saved };
};

export const buildSalesPayload = (store) => {
  const orders = [...(store.orders || [])].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  const items = store.items || [];
  const paidOrders = orders.filter((order) => order.payment_status === 'paid');
  const productSalesMap = new Map();

  for (const item of items) {
    const name = item.local_product_name || item.stripe_product_name || 'ไม่ระบุสินค้า';
    const current = productSalesMap.get(name) || { name, quantity: 0, revenue: 0 };
    current.quantity += Number(item.quantity || 0);
    current.revenue += Number(item.amount_total || 0);
    productSalesMap.set(name, current);
  }

  return {
    success: true,
    updatedAt: store.updatedAt || '',
    summary: {
      totalRevenue: paidOrders.reduce((sum, order) => sum + Number(order.amount_total || 0), 0),
      paidOrders: paidOrders.length,
      sentDeliveries: orders.filter((order) => order.delivery_status === 'sent').length,
      failedDeliveries: orders.filter((order) => order.delivery_status === 'failed').length,
      pendingDeliveries: orders.filter((order) => !['sent', 'failed'].includes(order.delivery_status)).length,
      productSales: [...productSalesMap.values()].sort((a, b) => b.quantity - a.quantity),
    },
    orders,
    items,
  };
};

export const verifyStripeSignature = (rawBody, signatureHeader) => {
  const secret = env('STRIPE_WEBHOOK_SECRET');
  if (!secret) {
    throw new Error('ยังไม่ได้ตั้งค่า STRIPE_WEBHOOK_SECRET บน Server');
  }

  const parts = String(signatureHeader || '').split(',').reduce((acc, item) => {
    const [key, value] = item.split('=');
    if (!key || !value) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});
  const timestamp = parts.t?.[0];
  const signatures = parts.v1 || [];
  if (!timestamp || signatures.length === 0) {
    throw new Error('Stripe signature header ไม่ถูกต้อง');
  }

  const tolerance = Math.max(30, toNumber(env('STRIPE_WEBHOOK_TOLERANCE_SECONDS'), 300));
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > tolerance) {
    throw new Error('Stripe webhook signature หมดอายุ');
  }

  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  const isValid = signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, 'hex');
    return signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
  });

  if (!isValid) {
    throw new Error('Stripe webhook signature ไม่ถูกต้อง');
  }
};
