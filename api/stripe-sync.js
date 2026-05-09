import { json, requireAdminToken, stripeFetch } from './_stripeFulfillment.js';
import { fulfillCheckoutSession } from './stripe-webhook.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const token = requireAdminToken(req);
  if (!token.ok) {
    return json(res, 401, { success: false, message: token.message });
  }

  try {
    const sessionsResponse = await stripeFetch('/v1/checkout/sessions?limit=50');
    const sessions = Array.isArray(sessionsResponse.data) ? sessionsResponse.data : [];
    const paidSessions = sessions.filter((session) => session.payment_status === 'paid');
    const results = [];

    for (const session of paidSessions) {
      try {
        const result = await fulfillCheckoutSession({
          session,
          event: {
            id: `manual_sync_${session.id}`,
            type: 'manual.checkout.session.sync',
            data: { object: session },
          },
        });
        results.push({ sessionId: session.id, ok: true, ...result });
      } catch (error) {
        results.push({ sessionId: session.id, ok: false, message: error.message || 'sync failed' });
      }
    }

    const synced = results.filter((item) => item.ok && !item.skipped).length;
    const skipped = results.filter((item) => item.ok && item.skipped).length;
    const failed = results.filter((item) => !item.ok).length;

    return json(res, 200, {
      success: true,
      message: `ซิงก์สำเร็จ ${synced} รายการ, ข้าม ${skipped} รายการ, ไม่สำเร็จ ${failed} รายการ`,
      results,
    });
  } catch (error) {
    console.error('Stripe sync failed', error);
    return json(res, 500, { success: false, message: error.message || 'ซิงก์ Stripe ไม่สำเร็จ' });
  }
}
