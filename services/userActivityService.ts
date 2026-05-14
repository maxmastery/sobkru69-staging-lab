import { isSupabaseConfigured, supabaseRest } from './supabaseRest';
import { User } from './authService';

type LessonProgressRow = {
  id: string;
  user_id: string;
  topic_id: string;
  chapter_id: string;
  completed_at: string;
};

type StudyTimeRow = {
  id: string;
  user_id: string;
  topic_id: string;
  seconds: number;
  updated_at: string;
};

type QuizAttemptRow = {
  id: string;
  user_id: string;
  quiz_id: string;
  topic_id: string | null;
  score: number;
  total: number;
  answers: Record<string, unknown>;
  completed_at: string;
};

type UserSessionRow = {
  user_id: string;
  user_name: string;
  current_page: string;
  last_active_at: string;
  device_type?: string | null;
  device_label?: string | null;
};

const encodeValue = (value: string) => encodeURIComponent(value);

const ensureSupabase = () => {
  if (!isSupabaseConfigured()) {
    throw new Error('ยังไม่ได้ตั้งค่า Supabase');
  }
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
};

const getClientDeviceInfo = () => {
  if (typeof navigator === 'undefined') {
    return { device_type: 'unknown', device_label: 'ไม่ทราบอุปกรณ์' };
  }

  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const isIPadOS = /Macintosh/i.test(ua) && maxTouchPoints > 1;

  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || isIPadOS || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
    return { device_type: 'tablet', device_label: 'iPad / Tablet' };
  }
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) {
    return { device_type: 'mobile', device_label: 'มือถือ' };
  }
  if (/Win|Mac|Linux|CrOS/i.test(platform) || /Windows NT|Macintosh|X11|CrOS/i.test(ua)) {
    return { device_type: 'desktop', device_label: 'คอมพิวเตอร์' };
  }
  return { device_type: 'unknown', device_label: 'ไม่ทราบอุปกรณ์' };
};

export const getStoredUser = (): User | null => {
  try {
    const saved =
      sessionStorage.getItem('sobkru69_current_user') ||
      localStorage.getItem('sobkru69_current_user') ||
      localStorage.getItem('sobkru69_user') ||
      localStorage.getItem('user');
    return saved ? JSON.parse(saved) as User : null;
  } catch {
    return null;
  }
};

export const userActivityService = {
  async upsertSession(userId: string, userName: string, currentPage: string) {
    ensureSupabase();
    const payload = {
      user_id: userId,
      user_name: userName || '',
      current_page: currentPage || 'dashboard',
      last_active_at: new Date().toISOString(),
      ...getClientDeviceInfo(),
    };

    try {
      await supabaseRest.upsert<UserSessionRow[]>('user_sessions', payload, 'user_id');
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      if (!message.includes('device_type') && !message.includes('device_label')) {
        throw error;
      }
      const { device_type, device_label, ...legacyPayload } = payload;
      await supabaseRest.upsert<UserSessionRow[]>('user_sessions', legacyPayload, 'user_id');
    }
  },

  async getOnlineSessions(): Promise<UserSessionRow[]> {
    ensureSupabase();
    try {
      return await supabaseRest.select<UserSessionRow[]>('user_sessions', 'select=user_id,user_name,current_page,last_active_at,device_type,device_label&order=last_active_at.desc&limit=500');
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      if (!message.includes('device_type') && !message.includes('device_label')) {
        throw error;
      }
      return supabaseRest.select<UserSessionRow[]>('user_sessions', 'select=user_id,user_name,current_page,last_active_at&order=last_active_at.desc&limit=500');
    }
  },

  async getCompletedChapterIds(userId: string, topicId: string): Promise<string[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<LessonProgressRow[]>('lesson_progress', `select=chapter_id&user_id=eq.${encodeValue(userId)}&topic_id=eq.${encodeValue(topicId)}`);
    return rows.map(row => row.chapter_id);
  },

  async markChapterCompleted(userId: string, topicId: string, chapterId: string) {
    ensureSupabase();
    await supabaseRest.upsert<LessonProgressRow[]>('lesson_progress', {
      id: createId(),
      user_id: userId,
      topic_id: topicId,
      chapter_id: chapterId,
      completed_at: new Date().toISOString(),
    }, 'user_id,topic_id,chapter_id');
  },

  async resetTopicProgress(userId: string, topicId: string) {
    ensureSupabase();
    await supabaseRest.delete<LessonProgressRow[]>('lesson_progress', `user_id=eq.${encodeValue(userId)}&topic_id=eq.${encodeValue(topicId)}`);
  },

  async getStudyTimeMap(userId: string): Promise<Record<string, number>> {
    ensureSupabase();
    const rows = await supabaseRest.select<StudyTimeRow[]>('study_time', `select=topic_id,seconds&user_id=eq.${encodeValue(userId)}`);
    return rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.topic_id] = Number(row.seconds || 0);
      return acc;
    }, {});
  },

  async getAllStudyTimeRows(): Promise<Array<{ user_id: string; topic_id: string; seconds: number }>> {
    ensureSupabase();
    return supabaseRest.select<Array<{ user_id: string; topic_id: string; seconds: number }>>(
      'study_time',
      'select=user_id,topic_id,seconds&order=updated_at.desc&limit=20000'
    );
  },

  async getAllLessonProgressRows(): Promise<Array<{ user_id: string; topic_id: string; chapter_id: string; completed_at: string }>> {
    ensureSupabase();
    return supabaseRest.select<Array<{ user_id: string; topic_id: string; chapter_id: string; completed_at: string }>>(
      'lesson_progress',
      'select=user_id,topic_id,chapter_id,completed_at&order=completed_at.desc&limit=20000'
    );
  },

  async incrementStudyTime(userId: string, chapterId: string, seconds: number) {
    ensureSupabase();
    const existing = await supabaseRest.select<StudyTimeRow[]>('study_time', `select=id,user_id,topic_id,seconds&user_id=eq.${encodeValue(userId)}&topic_id=eq.${encodeValue(chapterId)}&limit=1`);
    if (existing.length > 0) {
      await supabaseRest.update<StudyTimeRow[]>('study_time', `id=eq.${encodeValue(existing[0].id)}`, {
        seconds: Number(existing[0].seconds || 0) + seconds,
        updated_at: new Date().toISOString(),
      });
      return;
    }

    await supabaseRest.insert<StudyTimeRow[]>('study_time', {
      id: createId(),
      user_id: userId,
      topic_id: chapterId,
      seconds,
      updated_at: new Date().toISOString(),
    });
  },

  async resetStudyTime(userId: string, chapterIds: string[]) {
    ensureSupabase();
    await Promise.all(
      chapterIds.map(chapterId =>
        supabaseRest.delete<StudyTimeRow[]>('study_time', `user_id=eq.${encodeValue(userId)}&topic_id=eq.${encodeValue(chapterId)}`)
      )
    );
  },

  async recordQuizAttempt(userId: string, topicId: string | null, score: number, total: number, answers: unknown[]) {
    ensureSupabase();
    await supabaseRest.insert<QuizAttemptRow[]>('quiz_attempts', {
      id: createId(),
      user_id: userId,
      quiz_id: `generated-${Date.now()}`,
      topic_id: topicId,
      score,
      total,
      answers,
      completed_at: new Date().toISOString(),
    });
  },

  async getQuizAttemptsCount(userId: string) {
    ensureSupabase();
    const rows = await supabaseRest.select<QuizAttemptRow[]>('quiz_attempts', `select=id&user_id=eq.${encodeValue(userId)}`);
    return rows.length;
  },

  // ── Daily login log ──────────────────────────────────────────

  async logDailyLogin(userId: string) {
    try {
      ensureSupabase();
      const today = new Date().toISOString().split('T')[0];
      await supabaseRest.upsert<any[]>('daily_login_log', {
        id: `${userId}_${today}`,
        user_id: userId,
        login_date: today,
        created_at: new Date().toISOString(),
      }, 'id');
    } catch {
      // silently fail
    }
  },

  async getDailyLoginLogs(): Promise<{ user_id: string; login_date: string; created_at: string }[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('daily_login_log', 'select=user_id,login_date,created_at&order=login_date.desc&limit=1000');
  },

  // ── Mock Exam Attempts (Win Rate + Leaderboard) ──────────────

  async saveMockExamAttempt(data: {
    userId: string;
    userName: string;
    examKey: string;
    score: number;
    total: number;
    answeredCount: number;
    durationSeconds: number;
    isCompleted: boolean;
  }, authToken?: string) {
    ensureSupabase();
    try {
      await supabaseRest.insert<any[]>('mock_exam_attempts', {
        id: createId(),
        user_id: data.userId,
        user_name: data.userName,
        exam_key: data.examKey,
        score: data.score,
        total: data.total,
        answered_count: data.answeredCount,
        duration_seconds: data.durationSeconds,
        is_completed: data.isCompleted,
        created_at: new Date().toISOString(),
      }, authToken);
    } catch (err) {
      console.error('saveMockExamAttempt failed, trying fallback:', err);
      // Fallback for older schema (missing columns)
      try {
        await supabaseRest.insert<any[]>('mock_exam_attempts', {
          id: createId(),
          user_id: data.userId,
          exam_key: data.examKey,
          score: data.score,
          total: data.total,
          duration_seconds: data.durationSeconds,
          completed_at: new Date().toISOString(),
        }, authToken);
      } catch (fallbackErr) {
        console.error('saveMockExamAttempt fallback also failed:', fallbackErr);
        throw fallbackErr;
      }
    }
  },

  async getMockExamStats(userId: string): Promise<{ attemptCount: number; totalCorrect: number; totalAnswered: number; totalQuestions: number }> {
    try {
      ensureSupabase();
      const rows = await supabaseRest.select<any[]>('mock_exam_attempts', `select=score,total,answered_count,is_completed&user_id=eq.${encodeValue(userId)}`);
      
      if (!Array.isArray(rows)) {
        return { attemptCount: 0, totalCorrect: 0, totalAnswered: 0, totalQuestions: 0 };
      }

      let totalCorrect = 0;
      let totalAnswered = 0;
      let totalQuestions = 0;
      rows.forEach((r: any) => {
        totalCorrect += Number(r.score || 0);
        // Use answered_count if available, otherwise fall back to total
        const answered = Number(r.answered_count || r.total || 0);
        totalAnswered += answered;
        totalQuestions += Number(r.total || 0);
      });
      return { attemptCount: rows.length, totalCorrect, totalAnswered, totalQuestions };
    } catch (err) {
      console.error('getMockExamStats error (might be missing columns):', err);
      // Fallback for older schema
      try {
        const rows = await supabaseRest.select<any[]>('mock_exam_attempts', `select=score,total&user_id=eq.${encodeValue(userId)}`);
        if (!Array.isArray(rows)) return { attemptCount: 0, totalCorrect: 0, totalAnswered: 0, totalQuestions: 0 };
        
        let totalCorrect = 0;
        let totalQuestions = 0;
        rows.forEach((r: any) => {
          totalCorrect += Number(r.score || 0);
          totalQuestions += Number(r.total || 0);
        });
        return { attemptCount: rows.length, totalCorrect, totalAnswered: totalQuestions, totalQuestions };
      } catch {
        return { attemptCount: 0, totalCorrect: 0, totalAnswered: 0, totalQuestions: 0 };
      }
    }
  },

  async getLeaderboard(): Promise<any[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('mock_exam_attempts', 'select=user_id,user_name,exam_key,score,total,duration_seconds,is_completed,created_at&is_completed=eq.true&order=created_at.desc');
  },

  async getSystemUserStats(): Promise<any> {
    ensureSupabase();
    // ดึงโปรไฟล์ทั้งหมด (สรุป)
    const profiles = await supabaseRest.select<any[]>('user_profiles', 'select=gender,age_range,province,target_major');
    // ดึงสถิติการสอบ
    const attempts = await supabaseRest.select<any[]>('mock_exam_attempts', 'select=id');
    
    return {
      profiles,
      totalAttempts: attempts.length
    };
  },
};
