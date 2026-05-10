import { buildSalesPayload, json, loadSalesStore, requireAdminToken } from './_stripe-utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    requireAdminToken(req);
    const store = await loadSalesStore();
    return json(res, 200, buildSalesPayload(store));
  } catch (error) {
    return json(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || 'โหลดข้อมูลยอดขาย Stripe ไม่สำเร็จ',
    });
  }
}
