import { EXAM_CURRICULUM } from '../constants';

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
  partTitle: string;
  sectionTitle: string;
  topicTitle: string;
  focus?: string;
  accent: string;
};

const stripLeadingPartLabel = (title: string) => title.replace(/^Part\s*\d+\s*/i, '').trim();

const createQuestSources = (
  partTitle: string,
  sectionTitle: string,
  accent: string,
  topicTitles: string[],
): QuestSource[] => {
  return topicTitles.map(rawTopicTitle => {
    const topicTitle = stripLeadingPartLabel(rawTopicTitle);
    return {
      partTitle,
      sectionTitle,
      topicTitle,
      focus: topicTitle,
      accent,
    };
  });
};

const QUEST_SOURCES: QuestSource[] = [
  ...createQuestSources('ภาค ก', 'ภาษาไทย', 'amber', [
    'ระบบเสียง สระ พยัญชนะ วรรณยุกต์ คำเป็นคำตาย และคำครุ-คำลหุ',
    'ชนิดของคำและการสร้างคำในภาษาไทย',
    'คำยืมภาษาต่างประเทศ สำนวน คำพังเพย และสุภาษิต',
    'ประโยค คำราชาศัพท์ และการใช้คำ',
    'ข้อสอบรวมภาษาไทยทุกเรื่อง',
  ]),
  ...createQuestSources('ภาค ก', 'คณิตศาสตร์', 'cyan', [
    'อนุกรมลำดับตัวเลข',
    'จำนวนเรียงกัน',
    'ผลบวกของเลขหลายจำนวนเรียงกันและการหาจำนวนข้อมูล',
    'การหารลงตัว เศษส่วน และทศนิยม',
    'เลขยกกำลัง',
    'รูท (ราก) และสมการเลขยกกำลัง',
    'สมบัติและการคำนวณรากที่สอง (Square Root)',
    'บัญญัติไตรยางศ์และเรื่องงาน',
    'ร้อยละ กำไรขาดทุน และอัตราส่วน',
    'สมการ ขาสัตว์ และเหรียญ',
    'การปักเสาและเรื่องอายุ',
    'ความเร็วยานพาหนะ และ ห.ร.ม. ค.ร.น.',
    'นาฬิกา สถิติ ความน่าจะเป็น และการจัดหมู่',
    'พื้นที่และเส้นรอบรูปแบบต่าง ๆ',
    'ปริมาตรและพื้นที่ผิว',
    'การหาพื้นที่แรเงาและพื้นที่ซับซ้อน',
    'แผนภูมิรูปวงกลม (Pie Chart)',
    'เงื่อนไขสัญลักษณ์',
    'เงื่อนไขภาษา',
    'ความเพียงพอของข้อมูล',
    'การให้เหตุผลแบบประโยคเงื่อนไข (ถ้า...แล้ว)',
    'การให้เหตุผลแบบมีตัวเลือก (หรือ)',
    'การสรุปความและการให้เหตุผล: แบบวาดรูปหาความสัมพันธ์ (Venn Euler)',
    'แนวข้อสอบการสรุปเหตุผล',
    'ข้อสอบรวมคณิตศาสตร์และการให้เหตุผล',
  ]),
  ...createQuestSources('ภาค ก', 'ภาษาอังกฤษ', 'blue', [
    'Grammar: Parts of Speech, Noun และ Article',
    'Grammar: Quantifier และ Pronoun',
    'Grammar: Subject-Verb Agreement',
    'Grammar: Present, Past และ Future Tenses',
    'Grammar: สรุปเทคนิคจำ Tenses 12 ช่อง',
    'Grammar: Passive Voice และ Conditional Sentence',
    'Grammar: Non-finite Verb และ Modal Verb',
    'Grammar: Reported Speech, Adjective และ Adverb',
    'Grammar: Comparison, Preposition และ Conjunction',
    'Grammar: Question Tag, กริยา 3 ช่อง และโครงสร้างขั้นสูง',
    'Reading: Skimming, Scanning และ Main Idea',
    'Reading: Detail, Inference และ Reference',
    'Conversation: Greeting, Request, Offering Help และ Opinion',
    'Conversation: Classroom English และสถานการณ์ข้อสอบ',
    'Graph, Picture, Email และข้อความจริง',
  ]),
  ...createQuestSources('ภาค ก', 'การเป็นข้าราชการที่ดี', 'orange', [
    'พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน',
    'พ.ร.ฎ.หลักเกณฑ์และวิธีการบริหารกิจการบ้านเมืองที่ดี',
    'พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง',
    'พ.ร.บ.ความรับผิดทางละเมิดของเจ้าหน้าที่',
    'พ.ร.บ.มาตรฐานทางจริยธรรม และ พ.ร.บ.ให้ใช้ประมวลกฎหมายอาญา',
  ]),
  ...createQuestSources('ภาค ข', 'วิชาการศึกษา', 'emerald', [
    'Part 1 บริบทโลก สังคม และภาพการศึกษายุคใหม่',
    'Part 1 SDGs และการศึกษาเพื่อความยั่งยืน',
    'Part 1 สมรรถนะครู บริบทนโยบายไทย และทักษะคน',
    'Part 1 โลกใหม่ เทคโนโลยีใหม่ และการเรียนรู้ตลอดชีวิต',
    'Part 1 เศรษฐกิจพอเพียง ทฤษฎีใหม่ และพระบรมราโชบายด้านการศึกษา',
    'Part 2 พื้นฐานจิตวิทยา ความแตกต่างระหว่างบุคคล พฤติกรรม และเจตคติ',
    'Part 2 จิตวิทยาการศึกษา จิตวิทยาการเรียนรู้ และประโยชน์ต่อครู',
    'Part 2 จิตวิทยาพัฒนาการและองค์ประกอบของพัฒนาการ',
    'Part 2 สำนักจิตวิทยาและนักคิดสำคัญ',
    'Part 2 ทฤษฎีการเรียนรู้: Pavlov, Watson, Thorndike และ Gestalt',
    'Part 2 มนุษยนิยม ปัญญานิยม Bloom นักการศึกษาสำคัญ และ Piaget',
    'Part 2 Skinner การเสริมแรง การลงโทษ และ Freud',
    'Part 2 การแนะแนว การให้คำปรึกษา และระบบดูแลช่วยเหลือนักเรียน',
    'Part 2 สรุปจิตวิทยาและวิทยาการเรียนรู้',
    'Part 2 ข้อสอบรวมจิตวิทยาและวิทยาการเรียนรู้',
    'Part 3 การพัฒนาหลักสูตร',
    'Part 3 หลักสูตรแกนกลาง',
    'Part 3 หลักการสอนเน้นผู้เรียนเป็นสำคัญ',
    'Part 3 รูปแบบและวิธีสอน',
    'Part 3 การเรียนรู้แบบร่วมมือ Active Learning, Coding และ STEM',
    'Part 3 การบริหารจัดการชั้นเรียน',
    'Part 3 บรรยากาศและการปกครองชั้นเรียน',
    'Part 3 การพัฒนาผู้เรียนตามศักยภาพ',
    'Part 3 เทคโนโลยีดิจิทัลและสื่อการเรียนรู้',
    'Part 3 นวัตกรรม แพลตฟอร์ม และความปลอดภัยดิจิทัล',
    'Part 4 ความหมาย ความสำคัญ และวัตถุประสงค์ของการวิจัย',
    'Part 4 ประเภทและกระบวนการวิจัย',
    'Part 4 เครื่องมือวิจัยและการตรวจสอบคุณภาพ',
    'Part 4 สมมติฐาน ประชากร กลุ่มตัวอย่าง และตัวแปร',
    'Part 4 วิจัยในชั้นเรียน PAOR และการนำผลไปใช้',
    'Part 4 หลักการวัดผลการศึกษา',
    'Part 4 เครื่องมือวัดและประเมินผล',
    'Part 4 จุดมุ่งหมายและประโยชน์ของการวัดประเมินผล',
    'Part 4 สถิติพื้นฐานเพื่อการวัดประเมิน',
    'Part 4 ข้อสอบรวมการวิจัยและการวัดประเมินผล',
    'Part 5 มาตรฐานการศึกษาและฐานคิดของการประกันคุณภาพ',
    'Part 5 ระบบประกันคุณภาพภายในและวงจร PDCA',
    'Part 5 มาตรฐานและขั้นตอนประกันคุณภาพภายในสถานศึกษา',
    'Part 5 SAR และการใช้ข้อมูลเพื่อพัฒนาคุณภาพ',
    'Part 5 การประกันคุณภาพภายนอกและกรอบรอบใหม่ พ.ศ. 2567-2571',
  ]),
  ...createQuestSources('ภาค ข', 'กฎหมายการศึกษา', 'violet', [
    'Part 1 รัฐธรรมนูญ 2560',
    'Part 2 พ.ร.บ.การศึกษาแห่งชาติ',
    'Part 3 พ.ร.บ.การศึกษาภาคบังคับ',
    'Part 4 พ.ร.บ.ระเบียบบริหาร ศธ.',
    'Part 5 พ.ร.บ.สภาครูและบุคลากรทางการศึกษา',
    'Part 6 พ.ร.บ.ระเบียบข้าราชการครู',
    'Part 7 พ.ร.บ.คุ้มครองเด็ก',
    'Part 8 พ.ร.บ.การพัฒนาเด็กปฐมวัย',
    'Part 9 พ.ร.บ.การศึกษาคนพิการ',
    'Part 10 แนวทางปฏิรูปการศึกษา',
  ]),
];

export const QUEST_LEVELS: QuestLevel[] = Array.from({ length: 100 }, (_, index) => {
  const level = index + 1;
  const source = QUEST_SOURCES[index] || QUEST_SOURCES[QUEST_SOURCES.length - 1];

  return {
    level,
    title: `Level ${level} - ${source.topicTitle}`,
    focus: source.focus || source.topicTitle,
    band: source.sectionTitle,
    passPercent: 75,
    questionCount: 30,
    exp: 100 + Math.ceil(level / 10) * 25,
    accent: source.accent,
    partTitle: source.partTitle,
    sectionTitle: source.sectionTitle,
    topicTitle: source.topicTitle,
  };
});

export type QuestProgress = {
  currentLevel: number;
  unlockedLevel: number;
  exp: number;
  streak: number;
  clearedLevels: number[];
  levelResults: Record<string, QuestLevelResult>;
  lastPlayedAt?: string;
};

export type QuestLevelResult = {
  correct: number;
  total: number;
  answeredCount?: number;
  completedAt?: string;
};

export type QuestAccuracyStats = {
  correct: number;
  total: number;
  percent: number;
};

const getProgressKey = (userId: string) => `sobkru:quest-progress:${userId}:v1`;

const normalizeLevelResult = (raw: Partial<QuestLevelResult> | null | undefined): QuestLevelResult | null => {
  const total = Math.max(0, Math.floor(Number(raw?.total || 0)));
  if (total <= 0) {
    return null;
  }

  const correct = Math.min(total, Math.max(0, Math.floor(Number(raw?.correct || 0))));
  const answeredCount = raw?.answeredCount === undefined
    ? undefined
    : Math.min(total, Math.max(0, Math.floor(Number(raw.answeredCount || 0))));

  return {
    correct,
    total,
    ...(answeredCount === undefined ? {} : { answeredCount }),
    completedAt: raw?.completedAt,
  };
};

const normalizeLevelResults = (raw: Partial<QuestProgress> | null | undefined): Record<string, QuestLevelResult> => {
  const entries = Object.entries(raw?.levelResults || {});

  return entries.reduce<Record<string, QuestLevelResult>>((acc, [levelKey, result]) => {
    const level = Number(levelKey);
    if (!Number.isInteger(level) || level < 1 || level > 100) {
      return acc;
    }

    const normalizedResult = normalizeLevelResult(result);
    if (normalizedResult) {
      acc[String(level)] = normalizedResult;
    }
    return acc;
  }, {});
};

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
    levelResults: normalizeLevelResults(raw),
    lastPlayedAt: raw?.lastPlayedAt,
  };
};

const mergeQuestLevelResult = (
  currentResult: QuestLevelResult | undefined,
  nextResult: QuestLevelResult,
): QuestLevelResult => ({
  correct: (currentResult?.correct || 0) + nextResult.correct,
  total: (currentResult?.total || 0) + nextResult.total,
  answeredCount: (currentResult?.answeredCount || 0) + (nextResult.answeredCount ?? nextResult.total),
  completedAt: nextResult.completedAt || new Date().toISOString(),
});

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

export const getQuestAccuracyStats = (progress: QuestProgress): QuestAccuracyStats => {
  const totals = Object.values(progress.levelResults || {}).reduce(
    (acc, result) => ({
      correct: acc.correct + result.correct,
      total: acc.total + result.total,
    }),
    { correct: 0, total: 0 },
  );

  return {
    ...totals,
    percent: totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0,
  };
};

export const recordQuestLevelResult = (userId: string, level: number, result: Partial<QuestLevelResult>) => {
  const progress = getQuestProgress(userId);
  const normalizedResult = normalizeLevelResult(result);

  if (!normalizedResult) {
    return progress;
  }

  const nextProgress = normalizeProgress({
    ...progress,
    levelResults: {
      ...progress.levelResults,
      [String(level)]: mergeQuestLevelResult(progress.levelResults[String(level)], normalizedResult),
    },
    lastPlayedAt: new Date().toISOString(),
  });
  saveQuestProgress(userId, nextProgress);
  return nextProgress;
};

export const completeQuestLevel = (userId: string, level: number, exp: number, result?: Partial<QuestLevelResult>) => {
  const progress = getQuestProgress(userId);
  const wasAlreadyCleared = progress.clearedLevels.includes(level);
  const clearedLevels = Array.from(new Set([...progress.clearedLevels, level])).sort((a, b) => a - b);
  const normalizedResult = normalizeLevelResult(result);
  const nextProgress = normalizeProgress({
    ...progress,
    clearedLevels,
    levelResults: normalizedResult
      ? {
        ...progress.levelResults,
        [String(level)]: mergeQuestLevelResult(progress.levelResults[String(level)], normalizedResult),
      }
      : progress.levelResults,
    currentLevel: Math.min(100, Math.max(progress.unlockedLevel, level + 1)),
    unlockedLevel: Math.min(100, Math.max(progress.unlockedLevel, level + 1)),
    exp: progress.exp + (wasAlreadyCleared ? 0 : exp),
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
