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

export const getStoredUser = (): User | null => {
  try {
    const saved = sessionStorage.getItem('sobkru69_current_user') || localStorage.getItem('sobkru69_user') || localStorage.getItem('user');
    return saved ? JSON.parse(saved) as User : null;
  } catch {
    return null;
  }
};

export const userActivityService = {
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

  // ── Heartbeat (online tracking) ──────────────────────────────

  async sendHeartbeat(userId: string, userName: string, currentPage: string) {
    try {
      ensureSupabase();
      await supabaseRest.upsert<any[]>('user_sessions', {
        user_id: userId,
        user_name: userName,
        current_page: currentPage,
        last_active_at: new Date().toISOString(),
      }, 'user_id');
    } catch {
      // silently fail – heartbeat is best-effort
    }
  },

  async getOnlineSessions(): Promise<{ user_id: string; user_name: string; current_page: string; last_active_at: string }[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('user_sessions', 'select=user_id,user_name,current_page,last_active_at&order=last_active_at.desc');
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
    durationSeconds: number;
    isCompleted: boolean;
  }) {
    ensureSupabase();
    await supabaseRest.insert<any[]>('mock_exam_attempts', {
      id: createId(),
      user_id: data.userId,
      user_name: data.userName,
      exam_key: data.examKey,
      score: data.score,
      total: data.total,
      duration_seconds: data.durationSeconds,
      is_completed: data.isCompleted,
      created_at: new Date().toISOString(),
    });
  },

  async getMockExamStats(userId: string): Promise<{ attemptCount: number; totalCorrect: number; totalQuestions: number }> {
    ensureSupabase();
    const rows = await supabaseRest.select<any[]>('mock_exam_attempts', `select=score,total&user_id=eq.${encodeValue(userId)}`);
    let totalCorrect = 0;
    let totalQuestions = 0;
    rows.forEach((r: any) => {
      totalCorrect += Number(r.score || 0);
      totalQuestions += Number(r.total || 0);
    });
    return { attemptCount: rows.length, totalCorrect, totalQuestions };
  },

  async getLeaderboard(): Promise<any[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('mock_exam_attempts', 'select=user_id,user_name,exam_key,score,total,duration_seconds,is_completed,created_at&is_completed=eq.true&order=created_at.desc');
  },
};

