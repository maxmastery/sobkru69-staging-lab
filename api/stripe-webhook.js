import {
  getProductsForFulfillment,
  json,
  matchLocalProduct,
  normalizeEmail,
  sendDeliveryEmail,
  stripeFetch,
  supabaseRequest,
  verifyStripeSignature,
} from './_stripeFulfillment.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const getRawBody = async (req) => {
  if (typeof req.body === 'string') return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
};

const getExistingOrder = async (sessionId) => {
  const rows = await supabaseRequest(`/rest/v1/stripe_orders?stripe_checkout_session_id=eq.${encodeURIComponent(sessionId)}&select=*`);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};

const saveOrder = async ({ session, event }) => {
  const email = normalizeEmail(session.customer_details?.email || session.customer_email || '');
  const payload = {
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent || null,
    stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id || null,
    customer_email: email || null,
    customer_name: session.customer_details?.name || null,
    amount_total: Number(session.amount_total || 0),
    currency: session.currency || 'thb',
    payment_status: session.payment_status || '',
    status: session.payment_status === 'paid' ? 'paid' : 'pending',
    raw_event: event,
    updated_at: new Date().toISOString(),
  };

  const rows = await supabaseRequest('/rest/v1/stripe_orders?on_conflict=stripe_checkout_session_id', {
    method: 'POST',
    headers: { prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(payload),
  });

  return Array.isArray(rows) ? rows[0] : rows;
};

const saveOrderItems = async ({ order, lineItems }) => {
  const products = await getProductsForFulfillment();
  const items = lineItems.map((lineItem) => {
    const stripeProduct = lineItem?.price?.product;
    const stripeProductId = typeof stripeProduct === 'string' ? stripeProduct : stripeProduct?.id || '';
    const stripeProductName = (typeof stripeProduct === 'object' && stripeProduct?.name) || lineItem.description || '';
    const localProduct = matchLocalProduct(products, lineItem);

    return {
      order_id: order.id,
      product_id: localProduct?.id || null,
      local_product_name: localProduct?.name || stripeProductName || '',
      stripe_product_id: stripeProductId || null,
      stripe_price_id: lineItem?.price?.id || null,
      stripe_product_name: stripeProductName || '',
      quantity: Number(lineItem.quantity || 1),
      amount_total: Number(lineItem.amount_total || 0),
      currency: lineItem.currency || order.currency || 'thb',
      delivery_file_url: localProduct?.deliveryFileUrl || '',
      delivery_file_label: localProduct?.deliveryFileLabel || localProduct?.name || stripeProductName || '',
      delivery_email_note: localProduct?.deliveryEmailNote || '',
    };
  });

  await supabaseRequest(`/rest/v1/stripe_order_items?order_id=eq.${encodeURIComponent(order.id)}`, { method: 'DELETE' });
  if (items.length === 0) return [];

  return supabaseRequest('/rest/v1/stripe_order_items', {
    method: 'POST',
    headers: { prefer: 'return=representation' },
    body: JSON.stringify(items),
  });
};

const updateOrderDelivery = async (orderId, deliveryStatus) =>
  supabaseRequest(`/rest/v1/stripe_orders?id=eq.${encodeURIComponent(orderId)}`, {
    method: 'PATCH',
    headers: { prefer: 'return=minimal' },
    body: JSON.stringify({ delivery_status: deliveryStatus, updated_at: new Date().toISOString() }),
  });

const logDelivery = async ({ order, items, status, message, providerMessageId = '' }) => {
  const logs = items.map((item) => ({
    order_id: order.id,
    order_item_id: item.id || null,
    customer_email: order.customer_email,
    status,
    message,
    provider_message_id: providerMessageId,
  }));
  if (logs.length === 0) {
    logs.push({
      order_id: order.id,
      order_item_id: null,
      customer_email: order.customer_email,
      status,
      message,
      provider_message_id: providerMessageId,
    });
  }

  return supabaseRequest('/rest/v1/digital_delivery_logs', {
    method: 'POST',
    headers: { prefer: 'return=minimal' },
    body: JSON.stringify(logs),
  });
};

export const fulfillCheckoutSession = async ({ session, event }) => {
  if (session.payment_status !== 'paid') {
    return { skipped: true, message: 'checkout session ยังไม่ได้ชำระเงินสำเร็จ' };
  }

  const existingOrder = await getExistingOrder(session.id);
  if (existingOrder?.delivery_status === 'sent') {
    return { skipped: true, message: 'คำสั่งซื้อนี้ส่งไฟล์แล้ว' };
  }

  const lineItemsResponse = await stripeFetch(
    `/v1/checkout/sessions/${encodeURIComponent(session.id)}/line_items?limit=100&expand[]=data.price.product`
  );
  const lineItems = Array.isArray(lineItemsResponse.data) ? lineItemsResponse.data : [];
  const order = await saveOrder({ session, event });
  const items = await saveOrderItems({ order, lineItems });
  const deliverableItems = items.filter((item) => item.delivery_file_url);

  if (!order.customer_email) {
    await updateOrderDelivery(order.id, 'failed');
    await logDelivery({ order, items, status: 'failed', message: 'ไม่พบอีเมลลูกค้าจาก Stripe Checkout' });
    return { skipped: false, message: 'ไม่พบอีเมลลูกค้า' };
  }

  if (deliverableItems.length === 0) {
    await updateOrderDelivery(order.id, 'no_file');
    await logDelivery({ order, items, status: 'no_file', message: 'สินค้าในออเดอร์นี้ยังไม่ได้ตั้งค่าลิงก์ไฟล์ส่งอัตโนมัติ' });
    return { skipped: false, message: 'ไม่มีไฟล์ที่ตั้งค่าไว้สำหรับส่งอัตโนมัติ' };
  }

  try {
    const result = await sendDeliveryEmail({ order, items: deliverableItems });
    await updateOrderDelivery(order.id, result.sent ? 'sent' : 'no_file');
    await logDelivery({
      order,
      items: deliverableItems,
      status: result.sent ? 'sent' : 'no_file',
      message: result.message,
      providerMessageId: result.messageId,
    });
    return { skipped: false, message: result.message };
  } catch (error) {
    await updateOrderDelivery(order.id, 'failed');
    await logDelivery({ order, items: deliverableItems, status: 'failed', message: error.message });
    throw error;
  }
};

export const fulfillPaymentIntent = async ({ paymentIntent, event }) => {
  const paymentIntentId = String(paymentIntent?.id || '').trim();
  if (!paymentIntentId) {
    return { skipped: true, message: 'ไม่พบเลขอ้างอิง payment intent จาก Stripe' };
  }

  const sessionsResponse = await stripeFetch(
    `/v1/checkout/sessions?payment_intent=${encodeURIComponent(paymentIntentId)}&limit=1`
  );
  const session = Array.isArray(sessionsResponse.data) && sessionsResponse.data.length > 0
    ? sessionsResponse.data[0]
    : null;

  if (!session) {
    return { skipped: true, message: 'ไม่พบ Checkout Session ที่ผูกกับ payment intent นี้' };
  }

  return fulfillCheckoutSession({ session, event });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event = JSON.parse(rawBody);

    if (!verifyStripeSignature({ rawBody, signatureHeader: signature, secret: webhookSecret })) {
      if (!event?.id) {
        return json(res, 400, { success: false, message: 'Stripe signature ไม่ถูกต้อง' });
      }

      // Some serverless runtimes parse the body before this handler sees it,
      // which makes raw signature verification impossible. When that happens,
      // fetch the event back from Stripe with our secret key and only process
      // the event that exists in this Stripe account.
      const verifiedEvent = await stripeFetch(`/v1/events/${encodeURIComponent(event.id)}`);
      if (!verifiedEvent?.id || verifiedEvent.id !== event.id) {
        return json(res, 400, { success: false, message: 'Stripe event ตรวจสอบไม่สำเร็จ' });
      }
      event = verifiedEvent;
    }

    if (![
      'checkout.session.completed',
      'checkout.session.async_payment_succeeded',
      'payment_intent.succeeded',
    ].includes(event.type)) {
      return json(res, 200, { received: true, ignored: true });
    }

    const result = event.type === 'payment_intent.succeeded'
      ? await fulfillPaymentIntent({ paymentIntent: event.data.object, event })
      : await fulfillCheckoutSession({ session: event.data.object, event });
    return json(res, 200, { received: true, ...result });
  } catch (error) {
    console.error('Stripe webhook failed', error);
    return json(res, 500, { success: false, message: error.message || 'Stripe webhook failed' });
  }
}
