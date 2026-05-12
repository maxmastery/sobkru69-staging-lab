import { json, loadLocalProducts, readJsonBody, stripeRequest } from './_stripe-utils.js';

const getOrigin = (req) => {
  const configured = process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (host && !String(host).includes('.vercel.app')) return `${protocol}://${host}`;
  if (process.env.VERCEL === '1') return 'https://course.coolcom.click';

  throw new Error('ไม่สามารถระบุ URL เว็บไซต์สำหรับกลับหลังชำระเงินได้');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const productId = String(body.productId || '').trim();
    if (!productId) {
      return json(res, 400, { success: false, message: 'ไม่พบรหัสสินค้า' });
    }

    const products = await loadLocalProducts();
    const product = products.find((item) => String(item.id) === productId);
    if (!product) {
      return json(res, 404, { success: false, message: 'ไม่พบสินค้า' });
    }
    if (product.status && product.status !== 'in_stock') {
      return json(res, 400, { success: false, message: 'สินค้านี้ยังไม่พร้อมขาย' });
    }

    const stripePriceId = String(product.stripePriceId || '').trim();
    if (!stripePriceId) {
      return json(res, 400, { success: false, message: 'สินค้านี้ยังไม่ได้ตั้งค่า Stripe Price ID' });
    }

    const origin = getOrigin(req);
    const session = await stripeRequest('/checkout/sessions', {
      mode: 'payment',
      'line_items[0][price]': stripePriceId,
      'line_items[0][quantity]': '1',
      success_url: `${origin}/api/stripe-checkout-return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      'metadata[product_id]': product.id,
      'metadata[local_product_name]': product.name || '',
      'payment_intent_data[metadata][product_id]': product.id,
      'payment_intent_data[metadata][local_product_name]': product.name || '',
    }, 'POST');

    return json(res, 200, { success: true, url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Create Stripe Checkout failed', error);
    return json(res, 500, { success: false, message: error.message || 'สร้างลิงก์ชำระเงินไม่สำเร็จ' });
  }
}
