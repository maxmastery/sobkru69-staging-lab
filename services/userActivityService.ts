import { isSupabaseConfigured } from './supabaseRest';
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
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('chapter_id')
      .eq('user_id', userId)
      .eq('topic_id', topicId);
    
    if (error) {
      console.error('getCompletedChapterIds error:', error);
      return [];
    }
    return (data || []).map(row => row.chapter_id);
  },

  async markChapterCompleted(userId: string, topicId: string, chapterId: string) {
    ensureSupabase();
    const supabase = getSupabaseClient();
    await supabase.from('lesson_progress').upsert({
      user_id: userId,
      topic_id: topicId,
      chapter_id: chapterId,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,topic_id,chapter_id' });
  },

  async resetTopicProgress(userId: string, topicId: string) {
    ensureSupabase();
    const supabase = getSupabaseClient();
    await supabase.from('lesson_progress').delete().eq('user_id', userId).eq('topic_id', topicId);
  },

  // --- Study Time ---
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
    
    // First, try to get existing record
    const { data: existing, error: fetchError } = await supabase
      .from('study_time')
      .select('id, seconds')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .maybeSingle();

    if (fetchError) {
      console.error('incrementStudyTime fetch error:', fetchError);
      return;
    }

    if (existing) {
      const { error: updateError } = await supabase
        .from('study_time')
        .update({
          seconds: Number(existing.seconds || 0) + seconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
      
      if (updateError) console.error('incrementStudyTime update error:', updateError);
    } else {
      const { error: insertError } = await supabase
        .from('study_time')
        .insert({
          id: createId(),
          user_id: userId,
          topic_id: topicId,
          seconds: seconds,
          updated_at: new Date().toISOString(),
        });
      
      if (insertError) console.error('incrementStudyTime insert error:', insertError);
    }
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

  // --- Quiz & Exam ---
  async recordQuizAttempt(userId: string, topicId: string | null, score: number, total: number, answers: unknown[]) {
    ensureSupabase();
    const supabase = getSupabaseClient();
    await supabase.from('quiz_attempts').insert({
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
    const supabase = getSupabaseClient();
    await supabase.from('mock_exam_attempts').insert({
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
      const supabase = getSupabaseClient();
      
      // We use upsert for user_id (primary key)
      const { error } = await supabase.from('user_sessions').upsert({
        user_id: userId,
        user_name: userName || 'Anonymous',
        current_page: currentPage || 'dashboard',
        last_active_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
      
      if (error) {
        console.error('updateUserSession upsert error:', error);
      }
    } catch (err) {
      console.error('updateUserSession failed:', err);
    }
  },

  async getOnlineSessions(): Promise<UserSessionRow[]> {
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
    return (data || []) as UserSessionRow[];
  },

  // --- Daily Log ---
  async logDailyLogin(userId: string) {
    if (!userId) return;
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
};
