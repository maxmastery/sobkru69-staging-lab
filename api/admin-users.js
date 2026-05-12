import { json, readJsonBody, requireAdminToken, supabaseRequest } from './_stripe-utils.js';

const toInt = (value, fallback, min, max) => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

const normalizeSearch = (value) => String(value || '').trim().toLowerCase();

const selectUsers = async () => {
  const rows = await supabaseRequest('/rest/v1/user_profiles?select=id,name,email,age,gender,major,province,exam_count,role,auth_provider,is_active,created_at&order=created_at.asc&limit=5000');
  return Array.isArray(rows) ? rows : [];
};

const makeSkId = (index) => `SK${String(index + 1).padStart(5, '0')}`;

const matchesSearch = (row, index, search) => {
  if (!search) return true;
  return [
    row.name,
    row.email,
    makeSkId(index),
  ].some((value) => String(value || '').toLowerCase().includes(search));
};

const buildStats = (rows) => {
  const countBy = (key, labeler = (value) => value) => {
    const counts = new Map();
    rows.forEach((row) => {
      const raw = String(row[key] || '').trim();
      if (!raw) return;
      const label = labeler(raw);
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({
        name,
        count,
        percentage: rows.length > 0 ? Math.round((count / rows.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  };

  const byExamCount = countBy('exam_count', (value) => (
    value === '1' ? 'สอบครั้งที่ 1' : value === '2' ? 'สอบครั้งที่ 2' : `สอบครั้งที่ ${value}`
  ));

  return {
    totalUsers: rows.length,
    provinceCount: new Set(rows.map((row) => String(row.province || '').trim()).filter(Boolean)).size,
    majorCount: new Set(rows.map((row) => String(row.major || '').trim()).filter(Boolean)).size,
    firstTimeCount: rows.filter((row) => String(row.exam_count || '1').trim() === '1').length,
    byProvince: countBy('province').slice(0, 10),
    byMajor: countBy('major').slice(0, 10),
    byGender: countBy('gender'),
    byExamCount,
  };
};

const updateUser = async (body) => {
  const userId = String(body.userId || '').trim();
  if (!userId) throw new Error('ไม่พบรหัสผู้ใช้');

  const payload = {
    ...(body.name !== undefined ? { name: String(body.name || '').trim() } : {}),
    ...(body.email !== undefined ? { email: String(body.email || '').trim().toLowerCase() } : {}),
    ...(body.age !== undefined ? { age: body.age || null } : {}),
    ...(body.gender !== undefined ? { gender: body.gender || null } : {}),
    ...(body.major !== undefined ? { major: body.major || null } : {}),
    ...(body.province !== undefined ? { province: body.province || null } : {}),
    ...(body.examCount !== undefined ? { exam_count: body.examCount || null } : {}),
    ...(body.isActive !== undefined ? { is_active: Boolean(body.isActive) } : {}),
    updated_at: new Date().toISOString(),
  };

  const rows = await supabaseRequest(`/rest/v1/user_profiles?id=eq.${encodeURIComponent(userId)}&select=id,name,email,age,gender,major,province,exam_count,role,auth_provider,is_active,created_at`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
  return rows?.[0] || null;
};

const deleteUser = async (userId) => {
  const id = String(userId || '').trim();
  if (!id) throw new Error('ไม่พบรหัสผู้ใช้');

  const targetId = encodeURIComponent(id);
  const targetText = encodeURIComponent(id);
  const cleanup = [
    `/rest/v1/user_sessions?user_id=eq.${targetText}`,
    `/rest/v1/daily_login_log?user_id=eq.${targetText}`,
    `/rest/v1/lesson_progress?user_id=eq.${targetText}`,
    `/rest/v1/study_time?user_id=eq.${targetText}`,
    `/rest/v1/quiz_attempts?user_id=eq.${targetText}`,
    `/rest/v1/mock_exam_attempts?user_id=eq.${targetText}`,
    `/rest/v1/support_messages?user_id=eq.${targetText}`,
    `/rest/v1/donations?user_id=eq.${targetText}`,
    `/rest/v1/reports?or=(reporter_id.eq.${targetText},reported_user_id.eq.${targetText})`,
    `/rest/v1/banned_users?user_id=eq.${targetText}`,
    `/rest/v1/content_views?viewer_key=eq.${targetText}`,
  ];

  for (const path of cleanup) {
    await supabaseRequest(path, { method: 'DELETE' }).catch(() => null);
  }

  const rows = await supabaseRequest(`/rest/v1/user_profiles?id=eq.${targetId}`, {
    method: 'DELETE',
    headers: { prefer: 'return=representation' },
  });
  return Array.isArray(rows) && rows.length > 0;
};

export default async function handler(req, res) {
  try {
    requireAdminToken(req);

    if (req.method === 'GET') {
      const rows = await selectUsers();
      if (req.query?.stats === '1') {
        return json(res, 200, { success: true, stats: buildStats(rows) });
      }

      const page = toInt(req.query?.page, 1, 1, 100000);
      const pageSize = toInt(req.query?.pageSize, 100, 1, 500);
      const search = normalizeSearch(req.query?.search);
      const filtered = rows.filter((row, index) => matchesSearch(row, index, search));
      const offset = (page - 1) * pageSize;
      return json(res, 200, {
        success: true,
        users: filtered.slice(offset, offset + pageSize),
        total: filtered.length,
      });
    }

    if (req.method === 'PATCH') {
      const body = await readJsonBody(req);
      const user = await updateUser(body);
      return json(res, 200, { success: true, user });
    }

    if (req.method === 'DELETE') {
      const body = await readJsonBody(req);
      const deleted = await deleteUser(body.userId);
      return json(res, 200, { success: deleted });
    }

    return json(res, 405, { success: false, message: 'Method not allowed' });
  } catch (error) {
    return json(res, error?.statusCode || 500, {
      success: false,
      message: error?.message || 'จัดการผู้ใช้ไม่สำเร็จ',
    });
  }
}
