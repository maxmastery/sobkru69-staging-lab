import { json, requireAdminToken } from './_stripeFulfillment.js';
import { syncRecentStripeSessions } from './_stripeSync.js';

const isCronAuthorized = (req) => {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) return req.headers.authorization === `Bearer ${cronSecret}`;

  const userAgent = String(req.headers['user-agent'] || '').toLowerCase();
  return req.headers['x-vercel-cron'] === '1' || userAgent.includes('vercel-cron');
};

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    if (!isCronAuthorized(req)) {
      return json(res, 401, { success: false, message: 'Unauthorized cron request' });
    }
  } else {
    const token = requireAdminToken(req);
    if (!token.ok) {
      return json(res, 401, { success: false, message: token.message });
    }
  }

  try {
    const result = await syncRecentStripeSessions({ limit: 50, eventIdPrefix: req.method === 'GET' ? 'cron_sync' : 'manual_sync' });

    return json(res, 200, {
      success: true,
      message: `ซิงก์สำเร็จ ${result.synced} รายการ, ข้าม ${result.skipped} รายการ, ไม่สำเร็จ ${result.failed} รายการ`,
      results: result.results,
    });
  } catch (error) {
    console.error('Stripe sync failed', error);
    return json(res, 500, { success: false, message: error.message || 'ซิงก์ Stripe ไม่สำเร็จ' });
  }
}
