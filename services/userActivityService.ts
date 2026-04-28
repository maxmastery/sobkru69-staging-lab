/**
 * userActivityService.ts
 */
import { isSupabaseConfigured, supabaseRest } from './supabaseRest';
import { User } from './authService';
import { getSupabaseClient } from './supabaseClient';

export interface LessonProgressRow {
  id?: string;
  user_id: string;
  topic_id: string;
  chapter_id: string;
  completed_at: string;
}

export interface StudyTimeRow {
  id?: string;
  user_id: string;
  topic_id: string;
  seconds: number;
  updated_at: string;
}

export interface UserSessionRow {
  user_id: string;
  user_name: string;
  current_page: string;
  last_active_at: string;
}

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
  // --- Lesson Progress ---
  async getCompletedChapterIds(userId: string, topicId: string): Promise<string[]> {
    ensureSupabase();
    const rows = await supabaseRest.select<LessonProgressRow[]>('lesson_progress', `select=chapter_id&user_id=eq.${encodeURIComponent(userId)}&topic_id=eq.${encodeURIComponent(topicId)}`);
    return (rows || []).map(row => row.chapter_id);
  },

  async markChapterCompleted(userId: string, topicId: string, chapterId: string) {
    ensureSupabase();
    await supabaseRest.upsert('lesson_progress', {
      user_id: userId,
      topic_id: topicId,
      chapter_id: chapterId,
      completed_at: new Date().toISOString(),
    }, 'user_id,topic_id,chapter_id');
  },

  async resetTopicProgress(userId: string, topicId: string) {
    ensureSupabase();
    await supabaseRest.delete('lesson_progress', `user_id=eq.${encodeURIComponent(userId)}&topic_id=eq.${encodeURIComponent(topicId)}`);
  },

  // --- Study Time ---
  async getStudyTimeMap(userId: string): Promise<Record<string, number>> {
    ensureSupabase();
    const rows = await supabaseRest.select<StudyTimeRow[]>('study_time', `select=topic_id,seconds&user_id=eq.${encodeURIComponent(userId)}`);
    return (rows || []).reduce<Record<string, number>>((acc, row) => {
      acc[row.topic_id] = Number(row.seconds || 0);
      return acc;
    }, {});
  },

  async incrementStudyTime(userId: string, topicId: string, seconds: number) {
    ensureSupabase();
    const existing = await supabaseRest.select<StudyTimeRow[]>('study_time', `select=id,user_id,topic_id,seconds&user_id=eq.${encodeURIComponent(userId)}&topic_id=eq.${encodeURIComponent(topicId)}&limit=1`);
    
    if (existing && existing.length > 0) {
      await supabaseRest.update('study_time', `id=eq.${encodeURIComponent(existing[0].id)}`, {
        seconds: Number(existing[0].seconds || 0) + seconds,
        updated_at: new Date().toISOString(),
      });
    } else {
      await supabaseRest.insert('study_time', {
        id: createId(),
        user_id: userId,
        topic_id: topicId,
        seconds,
        updated_at: new Date().toISOString(),
      });
    }
  },

  async getAllStudyTimeRecords(): Promise<any[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('study_time', 'select=user_id,topic_id,seconds');
  },

  // --- Quiz & Exam ---
  async recordQuizAttempt(userId: string, topicId: string | null, score: number, total: number, answers: unknown[]) {
    ensureSupabase();
    await supabaseRest.insert('quiz_attempts', {
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

  async saveMockExamAttempt(data: any) {
    ensureSupabase();
    await supabaseRest.insert('mock_exam_attempts', {
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
    });
  },

  // --- Session & Heartbeat ---
  async updateUserSession(userId: string, userName: string, currentPage: string) {
    if (!userId) return;
    try {
      ensureSupabase();
      await supabaseRest.upsert('user_sessions', {
        user_id: userId,
        user_name: userName || 'Anonymous',
        current_page: currentPage || 'dashboard',
        last_active_at: new Date().toISOString(),
      }, 'user_id');
    } catch (err) {
      console.error('updateUserSession failed:', err);
    }
  },

  async getOnlineSessions(): Promise<UserSessionRow[]> {
    ensureSupabase();
    return supabaseRest.select<UserSessionRow[]>('user_sessions', 'select=user_id,user_name,current_page,last_active_at&order=last_active_at.desc');
  },

  // --- Daily Log ---
  async logDailyLogin(userId: string) {
    if (!userId) return;
    try {
      ensureSupabase();
      const today = new Date().toISOString().split('T')[0];
      await supabaseRest.upsert('daily_login_log', {
        id: `${userId}_${today}`,
        user_id: userId,
        login_date: today,
        created_at: new Date().toISOString(),
      }, 'id');
    } catch (err) {
      console.error('logDailyLogin error:', err);
    }
  },

  async getDailyLoginLogs(): Promise<any[]> {
    ensureSupabase();
    return supabaseRest.select<any[]>('daily_login_log', 'select=user_id,login_date,created_at&order=login_date.desc&limit=1000');
  },
};
