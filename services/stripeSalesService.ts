export interface StripeOrder {
  id: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  amount_total: number;
  currency: string;
  payment_status: string;
  status: string;
  delivery_status: string;
  created_at: string;
  updated_at: string;
}

export interface StripeOrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  local_product_name: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_product_name: string;
  quantity: number;
  amount_total: number;
  currency: string;
  delivery_file_url: string;
  delivery_file_label: string;
  delivery_email_note: string;
  created_at: string;
}

export interface StripeDeliveryLog {
  id: string;
  order_id: string;
  order_item_id: string | null;
  customer_email: string | null;
  status: string;
  message: string;
  provider_message_id: string;
  created_at: string;
}

export interface StripeProductSaleSummary {
  name: string;
  quantity: number;
  revenue: number;
}

export interface StripeSalesSummary {
  totalOrders: number;
  paidOrders: number;
  totalRevenue: number;
  sentDeliveries: number;
  failedDeliveries: number;
  pendingDeliveries: number;
  productSales: StripeProductSaleSummary[];
}

export interface StripeSalesResponse {
  success: boolean;
  orders: StripeOrder[];
  items: StripeOrderItem[];
  logs: StripeDeliveryLog[];
  summary: StripeSalesSummary;
  message?: string;
}

const TOKEN_KEY = 'sobkru69_stripe_admin_token';

export const stripeSalesService = {
  getStoredToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  },

  setStoredToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // Ignore storage failures in private browsing.
    }
  },

  async getSales(adminToken: string): Promise<StripeSalesResponse> {
    const response = await fetch('/api/stripe-sales', {
      headers: {
        'x-stripe-admin-token': adminToken,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'โหลดข้อมูลยอดขายไม่สำเร็จ');
    }
    return data as StripeSalesResponse;
  },

  async resendDelivery(adminToken: string, orderId: string): Promise<string> {
    const response = await fetch('/api/stripe-resend-delivery', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-stripe-admin-token': adminToken,
      },
      body: JSON.stringify({ orderId }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'ส่งไฟล์ซ้ำไม่สำเร็จ');
    }
    return data.message || 'ส่งไฟล์ซ้ำสำเร็จ';
  },
};
