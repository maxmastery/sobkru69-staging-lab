import { json, requireAdminToken, sendDeliveryEmail, supabaseRequest } from './_stripeFulfillment.js';

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

  return supabaseRequest('/rest/v1/digital_delivery_logs', {
    method: 'POST',
    headers: { prefer: 'return=minimal' },
    body: JSON.stringify(logs),
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const token = requireAdminToken(req);
  if (!token.ok) {
    return json(res, 401, { success: false, message: token.message });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const orderId = String(body.orderId || '').trim();
    if (!orderId) return json(res, 400, { success: false, message: 'ไม่พบ orderId' });

    const orders = await supabaseRequest(`/rest/v1/stripe_orders?id=eq.${encodeURIComponent(orderId)}&select=*`);
    const order = Array.isArray(orders) && orders.length > 0 ? orders[0] : null;
    if (!order) return json(res, 404, { success: false, message: 'ไม่พบคำสั่งซื้อ' });

    const items = await supabaseRequest(`/rest/v1/stripe_order_items?order_id=eq.${encodeURIComponent(orderId)}&select=*&order=created_at.asc`);
    const deliverableItems = Array.isArray(items) ? items.filter((item) => item.delivery_file_url) : [];
    if (deliverableItems.length === 0) {
      return json(res, 400, { success: false, message: 'คำสั่งซื้อนี้ไม่มีไฟล์สำหรับส่งอัตโนมัติ' });
    }

    const result = await sendDeliveryEmail({ order, items: deliverableItems });
    await updateOrderDelivery(order.id, result.sent ? 'sent' : 'no_file');
    await logDelivery({
      order,
      items: deliverableItems,
      status: result.sent ? 'sent' : 'no_file',
      message: result.message,
      providerMessageId: result.messageId,
    });

    return json(res, 200, { success: true, message: result.message });
  } catch (error) {
    console.error('Stripe resend delivery failed', error);
    return json(res, 500, { success: false, message: error.message || 'ส่งไฟล์ซ้ำไม่สำเร็จ' });
  }
}
