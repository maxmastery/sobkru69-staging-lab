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
};
