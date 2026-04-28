import { isSupabaseConfigured, supabaseRest } from './supabaseRest';
import { User } from './authService';
import { getSupabaseClient } from './supabaseClient';

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
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('study_time')
      .select('topic_id, seconds')
      .eq('user_id', userId);
    
    if (error) {
      console.error('getStudyTimeMap error:', error);
      return {};
    }
    return (data || []).reduce<Record<string, number>>((acc, row) => {
      acc[row.topic_id] = Number(row.seconds || 0);
      return acc;
    }, {});
  },

  async incrementStudyTime(userId: string, topicId: string, seconds: number) {
    ensureSupabase();
    const supabase = getSupabaseClient();
    
    // Check existing
    const { data: existing } = await supabase
      .from('study_time')
      .select('id, seconds')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('study_time')
        .update({
          seconds: Number(existing.seconds || 0) + seconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('study_time')
        .insert({
          id: createId(),
          user_id: userId,
          topic_id: topicId,
          seconds,
          updated_at: new Date().toISOString(),
        });
    }
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
      const supabase = getSupabaseClient();
      const today = new Date().toISOString().split('T')[0];
      await supabase.from('daily_login_log').upsert({
        id: `${userId}_${today}`,
        user_id: userId,
        login_date: today,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id' });
    } catch (err) {
      console.error('logDailyLogin error:', err);
    }
  },

  async getDailyLoginLogs(): Promise<any[]> {
    ensureSupabase();
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('daily_login_log')
      .select('user_id, login_date, created_at')
      .order('login_date', { ascending: false })
      .limit(1000);
    
    if (error) {
      console.error('getDailyLoginLogs error:', error);
      return [];
    }
    return data || [];
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

  async updateUserSession(userId: string, userName: string, currentPage: string) {
    try {
      ensureSupabase();
      const supabase = getSupabaseClient();
      await supabase.from('user_sessions').upsert({
        user_id: userId,
        user_name: userName,
        current_page: currentPage,
        last_active_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    } catch (err) {
      console.error('updateUserSession failed:', err);
    }
  },

  async getOnlineSessions(): Promise<any[]> {
    ensureSupabase();
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('user_sessions')
      .select('user_id, user_name, current_page, last_active_at')
      .order('last_active_at', { ascending: false });
    
    if (error) {
      console.error('getOnlineSessions error:', error);
      return [];
    }
    return data || [];
  },

  async getAllStudyTimeRecords(): Promise<any[]> {
    ensureSupabase();
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('study_time')
      .select('user_id, topic_id, seconds');
    
    if (error) {
      console.error('getAllStudyTimeRecords error:', error);
      return [];
    }
    return data || [];
  },
};

