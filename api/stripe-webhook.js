import { json, readRawBody, syncCheckoutSession, verifyStripeSignature } from './_stripe-utils.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    verifyStripeSignature(rawBody, req.headers['stripe-signature']);
    event = JSON.parse(rawBody);
  } catch (error) {
    console.error('Stripe webhook verification failed', error);
    return json(res, 400, {
      received: false,
      ignored: false,
      message: 'Webhook verification failed',
    });
  }

  const object = event?.data?.object || {};
  if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type) && object.id) {
    try {
      const result = await syncCheckoutSession(object.id, { sendDelivery: true });
      return json(res, 200, {
        received: true,
        synced: result.synced,
        delivered: result.delivered,
        message: result.message,
      });
    } catch (error) {
      console.error('Stripe webhook processing failed', {
        eventId: event.id,
        eventType: event.type,
        sessionId: object.id,
        error,
      });
      return json(res, 200, {
        received: true,
        synced: false,
        delivered: false,
        message: 'Webhook received; processing will be retried by cron sync',
      });
    }
  }

  return json(res, 200, { received: true, ignored: true });
}
