import { json, requireAdminToken, supabaseRequest } from './_stripeFulfillment.js';

const summarize = (orders, items) => {
  const paidOrders = orders.filter((order) => order.payment_status === 'paid' || order.status === 'paid');
  const productMap = new Map();

  for (const item of items) {
    const key = item.local_product_name || item.stripe_product_name || item.stripe_price_id || 'ไม่ระบุสินค้า';
    const current = productMap.get(key) || { name: key, quantity: 0, revenue: 0 };
    current.quantity += Number(item.quantity || 0);
    current.revenue += Number(item.amount_total || 0);
    productMap.set(key, current);
  }

  return {
    totalOrders: orders.length,
    paidOrders: paidOrders.length,
    totalRevenue: paidOrders.reduce((sum, order) => sum + Number(order.amount_total || 0), 0),
    sentDeliveries: orders.filter((order) => order.delivery_status === 'sent').length,
    failedDeliveries: orders.filter((order) => order.delivery_status === 'failed').length,
    pendingDeliveries: orders.filter((order) => ['pending', 'no_file'].includes(order.delivery_status)).length,
    productSales: Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue),
  };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const token = requireAdminToken(req);
  if (!token.ok) {
    return json(res, 401, { success: false, message: token.message });
  }

  try {
    const orders = await supabaseRequest('/rest/v1/stripe_orders?select=*&order=created_at.desc&limit=300');
    const items = await supabaseRequest('/rest/v1/stripe_order_items?select=*&order=created_at.desc&limit=1000');
    const logs = await supabaseRequest('/rest/v1/digital_delivery_logs?select=*&order=created_at.desc&limit=200');

    return json(res, 200, {
      success: true,
      orders,
      items,
      logs,
      summary: summarize(Array.isArray(orders) ? orders : [], Array.isArray(items) ? items : []),
    });
  } catch (error) {
    console.error('Stripe sales failed', error);
    return json(res, 500, { success: false, message: error.message || 'โหลดข้อมูลยอดขายไม่สำเร็จ' });
  }
}
