import { EXAM_CURRICULUM } from '../constants';
import { PartId } from '../types';

export type QuestBand = {
  from: number;
  to: number;
  title: string;
  focus: string;
  accent: string;
};

export type QuestLevel = {
  level: number;
  title: string;
  focus: string;
  band: string;
  passPercent: number;
  questionCount: number;
  exp: number;
  accent: string;
  partTitle: string;
  sectionTitle: string;
  topicTitle: string;
};

export const QUEST_BANDS: QuestBand[] = [
  { from: 1, to: 100, title: 'ภาค ก และ ภาค ข', focus: 'ภารกิจทบทวนจากเนื้อหาหลักทั้งหมดของระบบ', accent: 'amber' },
];

type QuestSource = {
  title: string;
  focus: string;
  partTitle: string;
  sectionTitle: string;
  topicTitle: string;
  accent: string;
};

const QUEST_ACCENTS = ['amber', 'cyan', 'emerald', 'violet', 'blue', 'rose', 'orange', 'indigo', 'lime', 'slate'];

const stripScore = (title: string) => title.replace(/\s*\([^)]*\)\s*$/g, '').trim();

const trimFocus = (text: string | undefined) => {
  const normalized = (text || '').replace(/\s+/g, ' ').trim();
  return normalized.length > 140 ? `${normalized.slice(0, 137)}...` : normalized;
};

const buildQuestSources = (): QuestSource[] => {
  const sources: QuestSource[] = [];

  EXAM_CURRICULUM
    .filter(part => part.id === PartId.PART_A || part.id === PartId.PART_B)
    .forEach(part => {
      part.sections.forEach(section => {
        section.subTopics.forEach(topic => {
          const chapters = (topic.chapters || []).filter(chapter => !chapter.isQuiz);
          const base = {
            partTitle: part.title,
            sectionTitle: stripScore(section.title),
            topicTitle: topic.title,
          };

          if (chapters.length === 0) {
            sources.push({
              ...base,
              title: topic.title,
              focus: trimFocus(topic.description || topic.promptContext || section.title),
              accent: QUEST_ACCENTS[sources.length % QUEST_ACCENTS.length],
            });
            return;
          }

          chapters.forEach(chapter => {
            sources.push({
              ...base,
              title: chapter.title || topic.title,
              focus: trimFocus(topic.description || topic.promptContext || section.title),
              accent: QUEST_ACCENTS[sources.length % QUEST_ACCENTS.length],
            });
          });
        });
      });
    });

  return sources.length
    ? sources
    : [{
      title: 'ทบทวนรวม ภาค ก และ ภาค ข',
      focus: 'ชุดภารกิจรวมสำหรับเตรียมสอบครูผู้ช่วย',
      partTitle: 'ภาค ก และ ภาค ข',
      sectionTitle: 'ภาพรวมบทเรียน',
      topicTitle: 'ภาพรวม',
      accent: 'amber',
    }];
};

const QUEST_SOURCES = buildQuestSources();

export const QUEST_LEVELS: QuestLevel[] = Array.from({ length: 100 }, (_, index) => {
  const level = index + 1;
  const sourceIndex = QUEST_SOURCES.length > 100
    ? Math.min(QUEST_SOURCES.length - 1, Math.floor((index / 100) * QUEST_SOURCES.length))
    : index % QUEST_SOURCES.length;
  const source = QUEST_SOURCES[sourceIndex];

  return {
    level,
    title: `Level ${level} - ${source.title}`,
    focus: source.focus,
    band: source.sectionTitle,
    passPercent: 75,
    questionCount: 30,
    exp: 100 + Math.ceil(level / 10) * 25,
    accent: source.accent,
    partTitle: source.partTitle,
    sectionTitle: source.sectionTitle,
    topicTitle: source.title,
  };
});

export type QuestProgress = {
  currentLevel: number;
  unlockedLevel: number;
  exp: number;
  streak: number;
  clearedLevels: number[];
  lastPlayedAt?: string;
};

const getProgressKey = (userId: string) => `sobkru:quest-progress:${userId}:v1`;

const normalizeProgress = (raw: Partial<QuestProgress> | null | undefined): QuestProgress => {
  const clearedLevels = Array.isArray(raw?.clearedLevels)
    ? raw!.clearedLevels.filter(level => Number.isInteger(level) && level >= 1 && level <= 100)
    : [];
  const unlockedLevel = Math.min(100, Math.max(1, Number(raw?.unlockedLevel || clearedLevels.length + 1 || 1)));

  return {
    currentLevel: Math.min(100, Math.max(1, Number(raw?.currentLevel || unlockedLevel))),
    unlockedLevel,
    exp: Math.max(0, Number(raw?.exp || clearedLevels.length * 100 || 0)),
    streak: Math.max(0, Number(raw?.streak || 1)),
    clearedLevels: Array.from(new Set(clearedLevels)).sort((a, b) => a - b),
    lastPlayedAt: raw?.lastPlayedAt,
  };
};

export const getQuestProgress = (userId: string): QuestProgress => {
  if (typeof localStorage === 'undefined') {
    return normalizeProgress(null);
  }

  try {
    return normalizeProgress(JSON.parse(localStorage.getItem(getProgressKey(userId)) || 'null'));
  } catch {
    return normalizeProgress(null);
  }
};

export const saveQuestProgress = (userId: string, progress: QuestProgress) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(getProgressKey(userId), JSON.stringify(normalizeProgress(progress)));
};

export const completeQuestLevel = (userId: string, level: number, exp: number) => {
  const progress = getQuestProgress(userId);
  const clearedLevels = Array.from(new Set([...progress.clearedLevels, level])).sort((a, b) => a - b);
  const nextProgress = normalizeProgress({
    ...progress,
    clearedLevels,
    currentLevel: Math.min(100, Math.max(progress.unlockedLevel, level + 1)),
    unlockedLevel: Math.min(100, Math.max(progress.unlockedLevel, level + 1)),
    exp: progress.exp + exp,
    lastPlayedAt: new Date().toISOString(),
  });
  saveQuestProgress(userId, nextProgress);
  return nextProgress;
};

export const getCurriculumStats = () => {
  let topics = 0;
  let chapters = 0;

  EXAM_CURRICULUM.forEach(part => {
    part.sections.forEach(section => {
      section.subTopics.forEach(topic => {
        topics += 1;
        chapters += topic.chapters?.length || 1;
      });
    });
  });

  return {
    parts: EXAM_CURRICULUM.length,
    topics,
    chapters,
  };
};
