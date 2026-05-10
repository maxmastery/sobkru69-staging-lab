import { buildSalesPayload, json, readJsonBody, requireAdminToken, resendOrderDelivery } from './_stripe-utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    requireAdminToken(req);
    const body = await readJsonBody(req);
    const orderId = String(body.orderId || '').trim();
    if (!orderId) {
      return json(res, 400, { success: false, message: 'กรุณาระบุ orderId' });
    }

    const result = await resendOrderDelivery(orderId);
    return json(res, 200, {
      ...buildSalesPayload(result.store),
      message: result.message,
    });
  } catch (error) {
    return json(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || 'ส่งไฟล์ซ้ำไม่สำเร็จ',
    });
  }
}
