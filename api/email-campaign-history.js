const json = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};

const env = (key, fallback = '') => process.env[key] || fallback;

const getSupabaseServerConfig = () => {
  const url = env('SUPABASE_URL') || env('VITE_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return null;
  return {
    url: url.replace(/\/+$/, ''),
    serviceKey,
  };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const expectedToken = env('EMAIL_CAMPAIGN_ADMIN_TOKEN');
  const providedToken = String(req.headers['x-email-campaign-token'] || '').trim();
  if (!expectedToken || providedToken !== expectedToken) {
    return json(res, 401, {
      success: false,
      message: 'รหัสสำหรับดูประวัติอีเมลไม่ถูกต้อง หรือยังไม่ได้ตั้งค่า EMAIL_CAMPAIGN_ADMIN_TOKEN',
    });
  }

  const config = getSupabaseServerConfig();
  if (!config) {
    return json(res, 500, {
      success: false,
      message: 'ยังไม่ได้ตั้งค่า SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY บน Server',
      history: [],
    });
  }

  const limit = Math.min(100, Math.max(1, Number(req.query?.limit || 50)));
  const url = `${config.url}/rest/v1/email_campaign_logs?select=*&order=created_at.desc&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: config.serviceKey,
        authorization: `Bearer ${config.serviceKey}`,
      },
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return json(res, response.status, {
        success: false,
        message: detail || 'โหลดประวัติการส่งไม่สำเร็จ',
        history: [],
      });
    }

    const history = await response.json();
    return json(res, 200, {
      success: true,
      message: 'โหลดประวัติการส่งสำเร็จ',
      history,
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message: error?.message || 'โหลดประวัติการส่งไม่สำเร็จ',
      history: [],
    });
  }
}
