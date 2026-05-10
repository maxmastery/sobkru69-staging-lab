import { ensureStripeFulfillmentWebhook, json } from './_stripeFulfillment.js';
import { syncRecentStripeSessions } from './_stripeSync.js';

const getOrigin = (req) => {
  const configured = process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configured) return configured.replace(/\/+$/, '');

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return host ? `${protocol}://${host}` : '';
};

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  if (process.env.STRIPE_AUTO_SYNC_ENABLED === 'false') {
    return json(res, 200, { success: true, disabled: true });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');

  try {
    const origin = getOrigin(req);
    if (origin) {
      await ensureStripeFulfillmentWebhook(origin);
    }

    const result = await syncRecentStripeSessions({ limit: 20, eventIdPrefix: 'auto_sync' });
    return json(res, 200, {
      success: true,
      serverSide: req.method === 'GET',
      webhookChecked: Boolean(origin),
      synced: result.synced,
      skipped: result.skipped,
      failed: result.failed,
      checked: result.checked,
      paid: result.paid,
    });
  } catch (error) {
    console.error('Stripe auto sync failed', error);
    return json(res, 500, { success: false, message: error.message || 'Stripe auto sync failed' });
  }
}
