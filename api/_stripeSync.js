import { stripeFetch } from './_stripeFulfillment.js';
import { fulfillCheckoutSession } from './stripe-webhook.js';

export const syncRecentStripeSessions = async ({ limit = 50, eventIdPrefix = 'stripe_sync' } = {}) => {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 50, 100));
  const sessionsResponse = await stripeFetch(`/v1/checkout/sessions?limit=${safeLimit}`);
  const sessions = Array.isArray(sessionsResponse.data) ? sessionsResponse.data : [];
  const paidSessions = sessions.filter((session) => session.payment_status === 'paid');
  const results = [];

  for (const session of paidSessions) {
    try {
      const result = await fulfillCheckoutSession({
        session,
        event: {
          id: `${eventIdPrefix}_${session.id}`,
          type: `${eventIdPrefix}.checkout.session.sync`,
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

  return {
    synced,
    skipped,
    failed,
    checked: sessions.length,
    paid: paidSessions.length,
    results,
  };
};
