import { buildSalesPayload, env, json, syncRecentStripeSessions } from './_stripe-utils.js';

const isAuthorizedCronRequest = (req) => {
  const cronSecret = env('CRON_SECRET');
  const providedSecret = String(req.headers['x-cron-secret'] || '').trim();
  const authorization = String(req.headers.authorization || '').trim();
  const isVercelCron = String(req.headers['x-vercel-cron'] || '').trim() === '1';

  if (cronSecret) {
    return providedSecret === cronSecret || authorization === `Bearer ${cronSecret}` || isVercelCron;
  }

  return isVercelCron;
};

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  if (!isAuthorizedCronRequest(req)) {
    return json(res, 401, {
      success: false,
      message: 'Unauthorized cron request',
    });
  }

  try {
    const result = await syncRecentStripeSessions({ sendDeliveries: true });
    return json(res, 200, {
      ...buildSalesPayload(result.store),
      message: result.message,
      syncedCount: result.syncedCount,
      deliveredCount: result.deliveredCount,
      retriedCount: result.retriedCount,
    });
  } catch (error) {
    console.warn('Stripe auto sync failed', error);
    return json(res, 200, {
      success: false,
      message: error?.message || 'Auto sync Stripe ไม่สำเร็จ',
    });
  }
}
