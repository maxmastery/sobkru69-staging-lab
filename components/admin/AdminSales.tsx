import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowDownToLine, CheckCircle2, CreditCard, Loader2, MailCheck, PackageCheck, RefreshCw, ReceiptText, Send, TrendingUp } from 'lucide-react';
import { stripeSalesService, StripeOrder, StripeOrderItem, StripeSalesResponse } from '../../services/stripeSalesService';

const formatMoney = (amount: number, currency = 'thb') =>
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: String(currency || 'thb').toUpperCase(),
  }).format(Number(amount || 0) / 100);

const formatDate = (value: string) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const deliveryLabel = (status: string) => {
  if (status === 'sent') return { text: 'ส่งไฟล์แล้ว', className: 'bg-emerald-100 text-emerald-700' };
  if (status === 'failed') return { text: 'ส่งไม่สำเร็จ', className: 'bg-red-100 text-red-700' };
  if (status === 'no_file') return { text: 'ยังไม่ตั้งไฟล์', className: 'bg-amber-100 text-amber-700' };
  return { text: 'รอส่งไฟล์', className: 'bg-slate-100 text-slate-600' };
};

const metricIconClasses: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-600',
  orange: 'bg-orange-100 text-orange-600',
  cyan: 'bg-cyan-100 text-cyan-600',
  rose: 'bg-rose-100 text-rose-600',
};

const AdminSales: React.FC = () => {
  const [adminToken, setAdminToken] = useState('');
  const [sales, setSales] = useState<StripeSalesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resendingOrderId, setResendingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const stored = stripeSalesService.getStoredToken();
    setAdminToken(stored);
    if (stored) void loadSales(stored);
  }, []);

  const loadSales = async (token = adminToken) => {
    setIsLoading(true);
    setMessage('');
    try {
      stripeSalesService.setStoredToken(token);
      const data = await stripeSalesService.getSales(token);
      setSales(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'โหลดข้อมูลยอดขายไม่สำเร็จ');
    } finally {
      setIsLoading(false);
    }
  };

  const itemsByOrder = useMemo(() => {
    const map = new Map<string, StripeOrderItem[]>();
    for (const item of sales?.items || []) {
      map.set(item.order_id, [...(map.get(item.order_id) || []), item]);
    }
    return map;
  }, [sales?.items]);

  const handleResend = async (order: StripeOrder) => {
    setResendingOrderId(order.id);
    setMessage('');
    try {
      const nextMessage = await stripeSalesService.resendDelivery(adminToken, order.id);
      setMessage(nextMessage);
      await loadSales(adminToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'ส่งไฟล์ซ้ำไม่สำเร็จ');
    } finally {
      setResendingOrderId(null);
    }
  };

  const summary = sales?.summary;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <ReceiptText className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">ยอดขายสินค้า Stripe</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">ดูคำสั่งซื้อ สินค้าที่ขายได้ และสถานะส่งไฟล์อัตโนมัติ</p>
          </div>
        </div>
        <button
          onClick={() => loadSales()}
          disabled={isLoading || !adminToken}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-black text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          รีเฟรชข้อมูล
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-black text-slate-700">Admin Token สำหรับดูยอดขาย</label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
            placeholder="ใส่ STRIPE_ADMIN_TOKEN หรือ EMAIL_CAMPAIGN_ADMIN_TOKEN"
          />
          <button
            onClick={() => loadSales()}
            disabled={isLoading || !adminToken}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:opacity-50"
          >
            <ArrowDownToLine className="h-4 w-4" />
            โหลดข้อมูล
          </button>
        </div>
        {message && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
            {message}
          </div>
        )}
      </div>

      {summary && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'ยอดขายรวม', value: formatMoney(summary.totalRevenue), icon: TrendingUp, color: 'emerald' },
            { label: 'ออเดอร์ชำระแล้ว', value: summary.paidOrders.toLocaleString(), icon: CreditCard, color: 'orange' },
            { label: 'ส่งไฟล์สำเร็จ', value: summary.sentDeliveries.toLocaleString(), icon: MailCheck, color: 'cyan' },
            { label: 'ต้องตรวจสอบ', value: (summary.failedDeliveries + summary.pendingDeliveries).toLocaleString(), icon: AlertTriangle, color: 'rose' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${metricIconClasses[card.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-black text-slate-400">{card.label}</div>
                <div className="mt-2 text-3xl font-black text-slate-950">{card.value}</div>
              </div>
            );
          })}
        </div>
      )}

      {summary?.productSales?.length ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <PackageCheck className="h-5 w-5 text-orange-500" />
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
              {(sales?.orders || []).map((order) => {
                const orderItems = itemsByOrder.get(order.id) || [];
                const delivery = deliveryLabel(order.delivery_status);
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
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${delivery.className}`}>
                        {delivery.text}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-slate-500">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleResend(order)}
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
              {!isLoading && (!sales || sales.orders.length === 0) && (
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

export default AdminSales;
