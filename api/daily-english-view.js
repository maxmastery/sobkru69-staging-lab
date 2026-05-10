import { json, supabaseRequest } from './_stripeFulfillment.js';

const DAILY_ENGLISH_SETTINGS_KEY = 'daily_english_lessons';

const readRequestBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
};

const normalizeLessonId = (value) => String(value || '').trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    const body = await readRequestBody(req);
    const lessonId = normalizeLessonId(body.lessonId);

    if (!lessonId) {
      return json(res, 400, { success: false, message: 'ไม่พบบทเรียนที่ต้องการนับอ่าน' });
    }

    const now = new Date().toISOString();
    const rows = await supabaseRequest(
      `/rest/v1/app_settings?select=value&key=eq.${encodeURIComponent(DAILY_ENGLISH_SETTINGS_KEY)}&limit=1`,
    );
    const currentValue = rows?.[0]?.value || {};
    const lessons = Array.isArray(currentValue.lessons) ? currentValue.lessons : [];
    let viewCount = 0;
    let found = false;

    const nextLessons = lessons.map((lesson) => {
      if (lesson?.id !== lessonId) return lesson;

      found = true;
      viewCount = Number(lesson.viewCount || 0) + 1;
      return {
        ...lesson,
        viewCount,
        lastViewedAt: now,
      };
    });

    if (!found) {
      return json(res, 404, { success: false, message: 'ไม่พบบทเรียนนี้ในระบบ' });
    }

    await supabaseRequest(
      `/rest/v1/app_settings?key=eq.${encodeURIComponent(DAILY_ENGLISH_SETTINGS_KEY)}`,
      {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          value: {
            ...currentValue,
            lessons: nextLessons,
            updatedAt: now,
          },
          updated_at: now,
        }),
      },
    );

    return json(res, 200, { success: true, viewCount });
  } catch (error) {
    console.error('Failed to record Daily English view', error);
    return json(res, 500, {
      success: false,
      message: error?.message || 'นับจำนวนคนอ่านไม่สำเร็จ',
    });
  }
}
