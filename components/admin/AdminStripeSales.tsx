import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, CreditCard, Loader2, Package, RefreshCcw, Send, TrendingUp } from 'lucide-react';

type DeliveryStatus = 'pending' | 'sent' | 'failed' | 'no_file';

type StripeOrder = {
  id: string;
  stripe_checkout_session_id: string;
  customer_name: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  delivery_status: DeliveryStatus;
  created_at: string;
};

type StripeOrderItem = {
  id: string;
  order_id: string;
  local_product_name?: string;
  stripe_product_name?: string;
  quantity: number;
  amount_total: number;
};

type StripeSalesPayload = {
  summary?: {
    totalRevenue: number;
    paidOrders: number;
    sentDeliveries: number;
    failedDeliveries: number;
    pendingDeliveries: number;
    productSales: Array<{ name: string; quantity: number; revenue: number }>;
  };
  orders: StripeOrder[];
  items: StripeOrderItem[];
};

const TOKEN_KEY = 'sobkru69_stripe_admin_token';

const formatMoney = (amount: number, currency = 'thb') =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency: currency.toUpperCase() }).format(Number(amount || 0) / 100);

const formatDate = (value: string) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
};

const deliveryBadge = (status: DeliveryStatus) => {
  if (status === 'sent') return { text: 'ส่งไฟล์แล้ว', className: 'bg-emerald-100 text-emerald-700' };
  if (status === 'failed') return { text: 'ส่งไม่สำเร็จ', className: 'bg-red-100 text-red-700' };
  if (status === 'no_file') return { text: 'ยังไม่ตั้งไฟล์', className: 'bg-amber-100 text-amber-700' };
  return { text: 'รอส่งไฟล์', className: 'bg-slate-100 text-slate-600' };
};

const AdminStripeSales: React.FC = () => {
  const [token, setToken] = useState('');
  const [data, setData] = useState<StripeSalesPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState('');
  const [autoMessage, setAutoMessage] = useState('');
  const [resendingOrderId, setResendingOrderId] = useState<string | null>(null);
  const latestTokenRef = useRef('');

  useEffect(() => {
    latestTokenRef.current = token;
  }, [token]);

  const itemsByOrder = useMemo(() => {
    const map = new Map<string, StripeOrderItem[]>();
    for (const item of data?.items || []) {
      map.set(item.order_id, [...(map.get(item.order_id) || []), item]);
    }
    return map;
  }, [data?.items]);

  const loadSales = async (nextToken = token) => {
    setIsLoading(true);
    setMessage('');
    try {
      localStorage.setItem(TOKEN_KEY, nextToken);
      const response = await fetch('/api/stripe-sales', {
        headers: { 'x-stripe-admin-token': nextToken },
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'โหลดข้อมูลยอดขายไม่สำเร็จ');
      }
      setData(payload);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'โหลดข้อมูลยอดขายไม่สำเร็จ');
    } finally {
      setIsLoading(false);
    }
  };

  const syncStripe = async () => {
    setIsSyncing(true);
    setMessage('');
    try {
      localStorage.setItem(TOKEN_KEY, token);
      const response = await fetch('/api/stripe-sync', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-stripe-admin-token': token,
        },
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'ซิงก์ Stripe ไม่สำเร็จ');
      }
      setData(payload);
      setMessage(payload.message || 'ซิงก์ Stripe สำเร็จ');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'ซิงก์ Stripe ไม่สำเร็จ');
    } finally {
      setIsSyncing(false);
    }
  };

  const resendDelivery = async (orderId: string) => {
    setResendingOrderId(orderId);
    setMessage('');
    try {
      const response = await fetch('/api/stripe-resend-delivery', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-stripe-admin-token': token,
        },
        body: JSON.stringify({ orderId }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'ส่งไฟล์ซ้ำไม่สำเร็จ');
      }
      setData(payload);
      setMessage(payload.message || 'ส่งไฟล์ซ้ำสำเร็จ');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'ส่งไฟล์ซ้ำไม่สำเร็จ');
    } finally {
      setResendingOrderId(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY) || '';
    setToken(storedToken);
    if (storedToken) {
      void loadSales(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    let isActive = true;
    let isRunning = false;
    const runAutoSync = async () => {
      if (isRunning || document.visibilityState !== 'visible') return;
      isRunning = true;
      try {
        const currentToken = latestTokenRef.current;
        if (!currentToken) return;
        await fetch('/api/stripe-sync', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-stripe-admin-token': currentToken,
          },
        });
        const response = await fetch('/api/stripe-sales', {
          headers: { 'x-stripe-admin-token': currentToken },
        });
        const payload = await response.json().catch(() => ({}));
        if (isActive && response.ok && payload.success) {
          setData(payload);
          setAutoMessage('Auto sync ทำงานอยู่ · ตรวจทุก 5 วินาทีเมื่อเปิดหน้านี้');
        }
      } catch (error) {
        if (isActive) {
          setAutoMessage(error instanceof Error ? `Auto sync ล้มเหลว: ${error.message}` : 'Auto sync ล้มเหลว');
        }
      } finally {
        isRunning = false;
      }
    };

    void runAutoSync();
    const interval = window.setInterval(() => {
      void runAutoSync();
    }, 5000);
    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, [token]);

  const summary = data?.summary;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <CreditCard className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">ยอดขายสินค้า Stripe</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">ดูคำสั่งซื้อ สินค้าที่ขายได้ และสถานะส่งไฟล์อัตโนมัติ</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => void syncStripe()}
            disabled={isSyncing || isLoading || !token}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/15 transition hover:bg-orange-700 disabled:opacity-50"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            ซิงก์ Stripe ล่าสุด
          </button>
          <button
            onClick={() => void loadSales()}
            disabled={isLoading || !token}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-black text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            รีเฟรชข้อมูล
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-black text-slate-700">Admin Token สำหรับดูยอดขาย</label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
            placeholder="ใส่ STRIPE_ADMIN_TOKEN หรือ EMAIL_CAMPAIGN_ADMIN_TOKEN"
          />
          <button
            onClick={() => void loadSales()}
            disabled={isLoading || !token}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:opacity-50"
          >
            <Package className="h-4 w-4" />
            โหลดข้อมูล
          </button>
        </div>
        {message && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">{message}</div>}
        {autoMessage && <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800">{autoMessage}</div>}
      </div>

      {summary && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'ยอดขายรวม', value: formatMoney(summary.totalRevenue), icon: TrendingUp, className: 'bg-emerald-100 text-emerald-600' },
            { label: 'ออเดอร์ชำระแล้ว', value: summary.paidOrders.toLocaleString(), icon: CreditCard, className: 'bg-orange-100 text-orange-600' },
            { label: 'ส่งไฟล์สำเร็จ', value: summary.sentDeliveries.toLocaleString(), icon: CheckCircle2, className: 'bg-cyan-100 text-cyan-600' },
            { label: 'ต้องตรวจสอบ', value: (summary.failedDeliveries + summary.pendingDeliveries).toLocaleString(), icon: AlertTriangle, className: 'bg-rose-100 text-rose-600' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${item.className}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-black text-slate-400">{item.label}</div>
                <div className="mt-2 text-3xl font-black text-slate-950">{item.value}</div>
              </div>
            );
          })}
        </div>
      )}

      {summary?.productSales?.length ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Package className="h-5 w-5 text-orange-500" />
            <h3 className="text-xl font-black text-slate-900">สินค้าที่ขายได้</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {summary.productSales.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="line-clamp-1 text-sm font-black text-slate-900">{item.name}</div>
                <div className="mt-1 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>ขาย {item.quantity.toLocaleString()} ชิ้น</span>
                  <span className="text-orange-600">{formatMoney(item.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-xl font-black text-slate-900">รายการคำสั่งซื้อ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">ลูกค้า</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">สินค้า</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">ยอดเงิน</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">สถานะไฟล์</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">วันที่</th>
                <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-[0.18em]">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {(data?.orders || []).map((order) => {
                const orderItems = itemsByOrder.get(order.id) || [];
                const badge = deliveryBadge(order.delivery_status);
                return (
                  <tr key={order.id} className="border-b border-slate-100 align-top hover:bg-slate-50/60">
                    <td className="px-6 py-5">
                      <div className="font-black text-slate-900">{order.customer_name || 'ไม่ระบุชื่อ'}</div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">{order.customer_email || '-'}</div>
                      <div className="mt-2 text-[11px] font-bold text-slate-400">{order.stripe_checkout_session_id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        {orderItems.map((item) => (
                          <div key={item.id} className="text-sm font-bold text-slate-700">
                            {item.local_product_name || item.stripe_product_name || 'ไม่ระบุสินค้า'}
                            <span className="ml-2 text-xs text-slate-400">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-lg font-black text-orange-600">{formatMoney(order.amount_total, order.currency)}</div>
                      <div className="mt-1 text-xs font-bold text-slate-400">{order.payment_status || '-'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${badge.className}`}>{badge.text}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-slate-500">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => void resendDelivery(order.id)}
                        disabled={resendingOrderId === order.id}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700 transition hover:bg-cyan-100 disabled:opacity-50"
                      >
                        {resendingOrderId === order.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        ส่งไฟล์ซ้ำ
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && (!data || data.orders.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center text-slate-500">
                    <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                    ยังไม่มีรายการขายจาก Stripe
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStripeSales;
