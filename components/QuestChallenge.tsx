import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronRight,
  Flame,
  Lock,
  ScrollText,
  ShieldCheck,
  Swords,
  Trophy,
} from 'lucide-react';
import type { User } from '../services/authService';
import type { FeatureTheme } from './FeatureThemeToggle';
import { StandardExam, type Question } from './StandardExam';
import { getQuestThaiLevelQuestions, hasQuestThaiLevelExam, QUEST_THAI_LEVEL_DURATION_SECONDS } from '../data/questThaiLevels';
import {
  completeQuestLevel,
  getQuestAccuracyStats,
  getQuestProgress,
  QUEST_LEVELS,
  recordQuestLevelResult,
  type QuestLevel,
} from '../lib/questSystem';

interface QuestChallengeProps {
  user: User;
  onBack: () => void;
  onOpenLessons: () => void;
  theme?: FeatureTheme;
  onToggleTheme?: () => void;
}

const questionSlots = Array.from({ length: 30 }, (_, index) => index + 1);

const QuestChallenge: React.FC<QuestChallengeProps> = ({ user, onBack, onOpenLessons, theme = 'dark', onToggleTheme = () => {} }) => {
  const [progress, setProgress] = useState(() => getQuestProgress(user.id));
  const clearedLevels = useMemo(() => new Set(progress.clearedLevels), [progress.clearedLevels]);
  const accuracyStats = useMemo(() => getQuestAccuracyStats(progress), [progress]);
  const [selectedLevel, setSelectedLevel] = useState<QuestLevel | null>(null);
  const [activeExamLevel, setActiveExamLevel] = useState<QuestLevel | null>(null);
  const [activeExamQuestions, setActiveExamQuestions] = useState<Question[]>([]);
  const clearedCount = clearedLevels.size;
  const clearedPercent = Math.round((clearedCount / QUEST_LEVELS.length) * 100);
  const backButtonLabel = selectedLevel ? 'กลับสู่ด่านทั้งหมด' : 'กลับหน้าหลัก';
  const selectedLevelHasExam = selectedLevel ? hasQuestThaiLevelExam(selectedLevel.level) : false;

  const backFromDetail = () => setSelectedLevel(null);
  const handleBack = () => {
    if (selectedLevel) {
      backFromDetail();
      return;
    }
    onBack();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLevel]);

  useEffect(() => {
    setProgress(getQuestProgress(user.id));
  }, [user.id]);

  const startQuestExam = (level: QuestLevel) => {
    if (!hasQuestThaiLevelExam(level.level)) {
      onOpenLessons();
      return;
    }

    setActiveExamQuestions(getQuestThaiLevelQuestions(level.level, level.questionCount));
    setActiveExamLevel(level);
  };

  const closeQuestExam = () => {
    setActiveExamLevel(null);
    setActiveExamQuestions([]);
  };

  const handleQuestExamComplete = (data: { score: number; total: number; answeredCount: number; durationSeconds: number; isCompleted: boolean; examKey: string }) => {
    if (!activeExamLevel || !data.isCompleted) {
      return;
    }

    const result = {
      correct: data.score,
      total: data.total,
      answeredCount: data.answeredCount,
    };
    const percentage = data.total > 0 ? (data.score / data.total) * 100 : 0;
    const nextProgress = percentage >= activeExamLevel.passPercent
      ? completeQuestLevel(user.id, activeExamLevel.level, activeExamLevel.exp, result)
      : recordQuestLevelResult(user.id, activeExamLevel.level, result);

    setProgress(nextProgress);
  };

  if (activeExamLevel && activeExamQuestions.length > 0) {
    return (
      <StandardExam
        title={`พิชิต 100 ด่านอรหันต์: Level ${activeExamLevel.level} ${activeExamLevel.topicTitle}`}
        durationSeconds={QUEST_THAI_LEVEL_DURATION_SECONDS}
        questions={activeExamQuestions}
        onBack={closeQuestExam}
        examKey={`quest_level_${activeExamLevel.level}`}
        onExamComplete={handleQuestExamComplete}
        theme={theme}
        onToggleTheme={onToggleTheme}
        passPercent={activeExamLevel.passPercent}
        revealAnswers="passedOnly"
        resultBackLabel="กลับสู่หน้า Level"
        stopWarningDescription="ระบบจะไม่นำครั้งนี้ไปคำนวณอัตราการตอบถูก และจะไม่แสดงเฉลยจนกว่าจะส่งข้อสอบจริง"
      />
    );
  }

  return (
    <div className={`quest-challenge-page quest-challenge-page--${theme}`}>
      <div className="mx-auto max-w-[1480px] px-4 py-5 md:px-8 md:py-7">
        <section className="quest-stage-shell relative overflow-hidden rounded-[30px] px-5 py-5 text-white md:rounded-[36px] md:px-9 md:py-8">
          <div className="quest-stage-veil" />

          <header className="quest-stage-header relative z-10 grid gap-5 lg:grid-cols-[220px_1fr_220px] lg:items-start">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="quest-back-button"
                aria-label={selectedLevel ? 'กลับสู่เมนูด่าน' : 'กลับหน้าหลัก'}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>{backButtonLabel}</span>
              </button>
            </div>

            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-200">
                <Swords className="h-4 w-4" />
                Challenge Mode
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                พิชิตภารกิจ 100 ด่านอรหันต์
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-7 text-slate-300">
                ดึงหัวข้อจากเนื้อหา ภาค ก และ ภาค ข • ด่านละ 30 ข้อ • ผ่านขั้นต่ำ 75% • มีเฉลยเมื่อผ่านการทดสอบ
              </p>
            </div>

            <div aria-hidden="true" />
          </header>

          {!selectedLevel ? (
            <div className="relative z-10 mt-8">
              <div className="quest-gallery-stats grid gap-4 md:grid-cols-3">
                <div className="quest-stage-stat quest-stage-stat--orange">
                  <Trophy className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-black">{clearedCount}/100</div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Cleared</div>
                  </div>
                </div>
                <div className="quest-stage-stat quest-stage-stat--blue">
                  <Flame className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-black">{clearedPercent}%</div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Progress</div>
                  </div>
                </div>
                <div className="quest-stage-stat quest-stage-stat--green">
                  <ShieldCheck className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-black">{accuracyStats.percent}%</div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Accuracy Rate</div>
                  </div>
                </div>
              </div>

              <div className="quest-level-grid mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {QUEST_LEVELS.map(quest => {
                  const isCleared = clearedLevels.has(quest.level);

                  return (
                    <button
                      key={quest.level}
                      onClick={() => setSelectedLevel(quest)}
                      className={`quest-stage-level-card quest-stage-level-card--${quest.accent} ${isCleared ? 'is-cleared' : ''}`}
                    >
                      {isCleared && <span className="quest-cleared-ribbon">CLEARED</span>}
                      <div className="quest-level-card-body">
                        <div className="quest-level-badge" aria-label={`Level ${quest.level}`}>
                          <span>Level</span>
                          <strong>{quest.level}</strong>
                        </div>
                        <div className="quest-level-copy">
                          <div className="quest-level-topic">- {quest.topicTitle}</div>
                          <p className="line-clamp-1 text-xs font-black uppercase tracking-[0.16em] text-amber-100/70">
                            {quest.partTitle} • {quest.sectionTitle}
                          </p>
                        </div>
                        <ChevronRight className="quest-level-chevron h-5 w-5 shrink-0 text-amber-200/70 transition group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relative z-10 mt-8">
              <div className={`quest-stage-detail quest-stage-detail--${selectedLevel.accent} ${clearedLevels.has(selectedLevel.level) ? 'is-cleared' : ''}`}>
                {clearedLevels.has(selectedLevel.level) && <span className="quest-cleared-ribbon quest-cleared-ribbon--detail">CLEARED</span>}

                <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                  <div>
                    <h2 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
                      Level {selectedLevel.level} - {selectedLevel.topicTitle}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm font-bold leading-7 text-slate-300">
                      {selectedLevel.partTitle} • {selectedLevel.sectionTitle}
                    </p>
                    <p className="mt-3 max-w-3xl text-base font-semibold leading-8 text-slate-200">
                      เรื่องที่ออกข้อสอบ: {selectedLevel.focus}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <div className="quest-stage-stat">
                        <ScrollText className="h-5 w-5 text-cyan-200" />
                        <div>
                          <div className="text-xl font-black">{selectedLevel.questionCount} ข้อ</div>
                          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Question Set</div>
                        </div>
                      </div>
                      <div className="quest-stage-stat">
                        <ShieldCheck className="h-5 w-5 text-emerald-200" />
                        <div>
                          <div className="text-xl font-black">{selectedLevel.passPercent}%</div>
                          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Pass Criteria</div>
                        </div>
                      </div>
                      <div className="quest-stage-stat">
                        <Lock className="h-5 w-5 text-amber-200" />
                        <div>
                          <div className="text-xl font-black">เฉลยหลังผ่าน</div>
                          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Exam Mode</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <aside className="quest-stage-prep-card">
                    <BookOpenCheck className="h-10 w-10 text-amber-200" />
                    <h3 className="mt-5 text-2xl font-black">
                      {selectedLevelHasExam ? 'แบบทดสอบจริงพร้อมแล้ว' : 'กำลังเตรียมข้อสอบ'}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                      {selectedLevelHasExam
                        ? 'สุ่มข้อและสลับตัวเลือกทุกครั้ง มีเวลา 60 นาที ส่งแล้วจึงนับคะแนนเข้าสู่ Accuracy Rate ส่วนเฉลยจะเปิดเมื่อผ่าน 75%'
                        : 'Level นี้ยังอยู่ในคิวเพิ่มข้อสอบจริง สามารถกลับไปทบทวนบทเรียนจาก Lesson Gallery ก่อนได้'}
                    </p>
                    <button onClick={() => startQuestExam(selectedLevel)} className="quest-level-test-button mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-black transition hover:-translate-y-0.5">
                      {selectedLevelHasExam ? 'ทำแบบทดสอบจริง' : 'เปิด Lesson Gallery'}
                    </button>
                  </aside>
                </div>

                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-black text-white">ชุดข้อสอบ 30 ข้อ</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-slate-300">
                      {selectedLevelHasExam ? 'Randomized Exam' : 'Placeholder'}
                    </span>
                  </div>
                  <div className="quest-question-grid">
                    {questionSlots.map(slot => (
                      <div key={slot} className="quest-question-slot">
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default QuestChallenge;
