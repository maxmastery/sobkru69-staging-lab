import { syncCheckoutSession } from './_stripe-utils.js';

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const html = ({ title, message, tone = 'success' }) => {
  const color = tone === 'success' ? '#16a34a' : '#ea580c';
  return `<!doctype html>
<html lang="th">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;font-family:Arial,'Noto Sans Thai',Tahoma,sans-serif;color:#0f172a}
      .card{width:min(92vw,560px);background:#fff;border:1px solid #e2e8f0;border-radius:28px;padding:32px;box-shadow:0 24px 70px rgba(15,23,42,.10);text-align:center}
      .badge{display:inline-grid;place-items:center;width:64px;height:64px;border-radius:22px;background:${color}1a;color:${color};font-size:32px;font-weight:900}
      h1{font-size:30px;line-height:1.25;margin:18px 0 10px}
      p{font-size:16px;line-height:1.8;color:#64748b;margin:0}
      a{display:inline-block;margin-top:24px;background:#0f172a;color:white;text-decoration:none;border-radius:999px;padding:13px 22px;font-weight:800}
    </style>
  </head>
  <body>
    <main class="card">
      <div class="badge">${tone === 'success' ? '✓' : '!'}</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      <a href="/">กลับหน้าหลัก</a>
    </main>
  </body>
</html>`;
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end('Method not allowed');
    return;
  }

  const sessionId = String(req.query?.session_id || '').trim();
  if (!sessionId) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html({ title: 'ไม่พบคำสั่งซื้อ', message: 'ระบบไม่พบเลขอ้างอิงจาก Stripe', tone: 'error' }));
    return;
  }

  try {
    const result = await syncCheckoutSession(sessionId, { sendDelivery: true });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html({
      title: result.delivered ? 'ส่งไฟล์ให้แล้ว' : 'ระบบรับคำสั่งซื้อแล้ว',
      message: result.message || 'กรุณาตรวจสอบอีเมลที่ใช้ชำระเงิน หากไม่พบให้ดูในกล่องจดหมายขยะ',
      tone: 'success',
    }));
  } catch (error) {
    console.error('Stripe checkout return failed', error);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html({
      title: 'กำลังตรวจสอบคำสั่งซื้อ',
      message: 'ระบบยังส่งไฟล์ไม่ได้ทันที แต่ cron จะซิงก์ซ้ำอัตโนมัติ หากยังไม่ได้รับอีเมลกรุณาติดต่อผู้ดูแลระบบ',
      tone: 'error',
    }));
  }
}
