import { buildSalesPayload, json, requireAdminToken, syncRecentStripeSessions } from './_stripe-utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    requireAdminToken(req);
    const result = await syncRecentStripeSessions({ sendDeliveries: true });
    return json(res, 200, {
      ...buildSalesPayload(result.store),
      message: result.message,
      syncedCount: result.syncedCount,
      deliveredCount: result.deliveredCount,
      retriedCount: result.retriedCount,
    });
  } catch (error) {
    return json(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || 'ซิงก์ Stripe ไม่สำเร็จ',
    });
  }
}
