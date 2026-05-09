import { json, parseProductMeta, stripeFetch, supabaseRequest } from './_stripeFulfillment.js';

const getOrigin = (req) => {
  const configured = process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${protocol}://${host}`;
};

const readBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  return req.body;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    const body = readBody(req);
    const productId = String(body.productId || '').trim();
    if (!productId) {
      return json(res, 400, { success: false, message: 'ไม่พบรหัสสินค้า' });
    }

    const products = await supabaseRequest(`/rest/v1/products?id=eq.${encodeURIComponent(productId)}&select=*&limit=1`);
    const product = Array.isArray(products) && products.length > 0 ? products[0] : null;
    if (!product) {
      return json(res, 404, { success: false, message: 'ไม่พบสินค้า' });
    }
    if (product.status !== 'in_stock') {
      return json(res, 400, { success: false, message: 'สินค้านี้ยังไม่พร้อมขาย' });
    }

    const meta = parseProductMeta(product.features);
    const stripePriceId = String(meta.stripePriceId || '').trim();
    if (!stripePriceId) {
      return json(res, 400, { success: false, message: 'สินค้านี้ยังไม่ได้ตั้งค่า Stripe Price ID' });
    }

    const origin = getOrigin(req);
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('line_items[0][price]', stripePriceId);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', `${origin}/api/stripe-checkout-return?session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/`);
    params.set('allow_promotion_codes', 'true');
    params.set('metadata[product_id]', product.id);
    params.set('metadata[local_product_name]', product.name || '');
    params.set('payment_intent_data[metadata][product_id]', product.id);
    params.set('payment_intent_data[metadata][local_product_name]', product.name || '');

    const session = await stripeFetch('/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    return json(res, 200, { success: true, url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Create Stripe Checkout failed', error);
    return json(res, 500, { success: false, message: error.message || 'สร้างลิงก์ชำระเงินไม่สำเร็จ' });
  }
}
