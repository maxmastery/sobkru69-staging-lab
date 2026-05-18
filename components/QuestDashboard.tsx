import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, BookOpenCheck, FileQuestion, FileText, GraduationCap, Languages, MessageSquare, Newspaper, Play, Swords, Target, Trophy, Users, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EXAM_CURRICULUM } from '../constants';
import { ExamPart, PartId } from '../types';
import type { User } from '../services/authService';
import type { KnowledgeGraphSettings } from '../services/contentService';
import type { FeatureTheme } from './FeatureThemeToggle';
import { userActivityService } from '../services/userActivityService';

interface QuestDashboardProps {
  user: User;
  theme?: FeatureTheme;
  onSelectPart: (part: ExamPart) => void;
  onStartQuest: () => void;
  onContinueLesson: () => void | Promise<void>;
  onNavigateToNews: () => void;
  onNavigateToDiscussion: () => void;
  onNavigateToShop: () => void;
  onNavigateToMockExam: () => void;
  onNavigateToDailyEnglish: () => void;
  onNavigateToKnowledgeGraph: () => void;
  onNavigateToLeaderboard?: () => void;
  showShopButton?: boolean;
  showKnowledgeGraph?: boolean;
  knowledgeGraphSettings?: KnowledgeGraphSettings;
}

const countCurriculumUnits = () => {
  let learningUnits = 0;
  let quizUnits = 0;
  EXAM_CURRICULUM.forEach(part => {
    part.sections.forEach(section => {
      if (section.isSelfStudy) return;
      section.subTopics.forEach(topic => {
        const chapters = topic.chapters || [];
        const learningChapters = chapters.filter(chapter => !chapter.isQuiz);
        const quizChapters = chapters.filter(chapter => chapter.isQuiz);
        learningUnits += learningChapters.length || 1;
        quizUnits += quizChapters.length;
      });
    });
  });

  return {
    learningUnits: Math.max(learningUnits, 1),
    quizUnits: Math.max(quizUnits, 1),
  };
};

const curriculumStats = countCurriculumUnits();
const LESSON_TASK_TOTAL = 332;
const MISSION_TASK_TOTAL = 1000;
const RANK_IMAGE_BASE_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images';

const RANKS = [
  { label: 'Seed', thaiLabel: 'กากครับ', min: 1, max: 10, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank1.png` },
  { label: 'Rookie', thaiLabel: 'ฟันน้ำนม', min: 11, max: 20, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank2.png` },
  { label: 'Learner', thaiLabel: 'หัดเดิน', min: 21, max: 30, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank3.png` },
  { label: 'Challenger', thaiLabel: 'เด็กเกาะเบาะ', min: 31, max: 40, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank4.png` },
  { label: 'Achiever', thaiLabel: 'ไม่เท่าไร', min: 41, max: 50, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank5.png` },
  { label: 'Pro', thaiLabel: 'พอได้', min: 51, max: 60, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank6.png` },
  { label: 'Expert', thaiLabel: 'ทรงคือ', min: 61, max: 70, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank7.png` },
  { label: 'Master', thaiLabel: 'มีแวว', min: 71, max: 80, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank8.png` },
  { label: 'Elite', thaiLabel: 'มาดฐานแท้', min: 81, max: 90, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank9.png` },
  { label: 'Legend', thaiLabel: 'เกินปาย', min: 91, max: 99, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank10.png` },
  { label: 'Conqueror', thaiLabel: 'อาวเรื่อง!', min: 100, max: 100, imageUrl: `${RANK_IMAGE_BASE_URL}/Rank11.png` },
];

type RankInfo = typeof RANKS[number];

const getRankChanceDescription = (rank: RankInfo) => {
  if (rank.min >= 100) return 'มีโอกาสสอบติด 100%';
  return `มีโอกาสสอบติดมากกว่า ${Math.max(0, rank.min - 1)}%`;
};

const getRankInfo = (score: number) => {
  return [...RANKS].reverse().find(rank => score >= rank.min) || RANKS[0];
};

const getAdmissionChanceClass = (score: number) => {
  if (score > 80) return 'quest-admission-value quest-admission-value--green';
  if (score > 51) return 'quest-admission-value quest-admission-value--blue';
  return 'quest-admission-value quest-admission-value--amber';
};

const RankBadgeButton = ({
  rank,
  onClick,
  className = '',
  compact = false,
}: {
  rank: RankInfo;
  onClick: () => void;
  className?: string;
  compact?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-col items-center rounded-3xl text-center transition hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/70 ${compact ? 'mx-auto w-full max-w-[240px] p-3' : 'min-w-[150px] p-2'} ${className}`}
    aria-label="ดูรายละเอียด Rank"
  >
    <div className="absolute inset-x-0 top-6 mx-auto h-20 w-20 rounded-full bg-amber-300/25 blur-2xl" />
    <div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Rank</div>
    <img
      src={rank.imageUrl}
      alt={`${rank.label} Rank`}
      className={`relative mt-1 object-contain drop-shadow-[0_16px_28px_rgba(251,191,36,.35)] ${compact ? 'h-28 w-28' : 'h-24 w-24 md:h-28 md:w-28'}`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
    <div
      className={`relative -mt-1 bg-gradient-to-b from-white via-amber-200 to-yellow-700 bg-clip-text font-black uppercase tracking-[0.08em] text-transparent drop-shadow-[0_2px_7px_rgba(251,191,36,.35)] ${compact ? 'text-4xl' : 'text-3xl md:text-4xl'}`}
      style={{ fontFamily: 'var(--sobkru-font-display)', WebkitTextStroke: '0.5px rgba(255,255,255,0.4)' }}
    >
      {rank.label}
    </div>
    <span className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Click for Roadmap</span>
  </button>
);

const QuestDashboard: React.FC<QuestDashboardProps> = ({
  user,
  theme = 'dark',
  onSelectPart,
  onStartQuest,
  onContinueLesson,
  onNavigateToNews,
  onNavigateToDiscussion,
  onNavigateToShop,
  onNavigateToMockExam,
  onNavigateToDailyEnglish,
  onNavigateToLeaderboard,
  showShopButton = false,
}) => {
  const [completedLearningUnits, setCompletedLearningUnits] = useState(0);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [mockStats, setMockStats] = useState({ attemptCount: 0, latestCorrect: 0, latestTotal: 0, totalAnswered: 0, totalQuestions: 0 });
  const [showRankRoadmap, setShowRankRoadmap] = useState(false);
  const [launchQuest, setLaunchQuest] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [progressRows, timeMap, quizCount, exams] = await Promise.all([
          userActivityService.getUserLessonProgressRows(user.id),
          userActivityService.getStudyTimeMap(user.id),
          userActivityService.getQuizAttemptsCount(user.id),
          userActivityService.getMockExamStats(user.id),
        ]);

        const completedKeys = new Set(progressRows.map(row => `${row.topic_id}:${row.chapter_id}`));
        setCompletedLearningUnits(Math.min(completedKeys.size, curriculumStats.learningUnits));
        setStudyMinutes(Math.floor(Object.values(timeMap || {}).reduce((sum, value) => sum + Number(value || 0), 0) / 60));
        setQuizAttempts(quizCount);
        setMockStats({
          attemptCount: exams.attemptCount,
          latestCorrect: Number(exams.latestCorrect || 0),
          latestTotal: Number(exams.latestTotal || 0),
          totalAnswered: Number(exams.totalAnswered || 0),
          totalQuestions: Number(exams.totalQuestions || 0),
        });
      } catch (error) {
        console.error('Quest dashboard stats fallback', error);
      }
    };
    void loadStats();
  }, [user.id]);

  useEffect(() => {
    if (!launchQuest) return;
    const timer = window.setTimeout(() => onStartQuest(), 1180);
    return () => window.clearTimeout(timer);
  }, [launchQuest, onStartQuest]);

  const lessonPercent = Math.min(100, Math.round((completedLearningUnits / curriculumStats.learningUnits) * 100));
  const quizPercent = Math.min(100, Math.round((quizAttempts / curriculumStats.quizUnits) * 100));
  const mockPercent = mockStats.latestTotal > 0 ? Math.round((mockStats.latestCorrect / mockStats.latestTotal) * 100) : 0;
  const admissionChance = Math.min(100, Math.round((lessonPercent * 0.5) + (quizPercent * 0.4) + (mockPercent * 0.1)));
  const lessonTaskPercent = Math.min(100, Math.round((completedLearningUnits / LESSON_TASK_TOTAL) * 100));
  const missionTaskCleared = Math.min(MISSION_TASK_TOTAL, quizAttempts);
  const missionTaskPercent = Math.min(100, Math.round((missionTaskCleared / MISSION_TASK_TOTAL) * 100));
  const mockTaskTotal = Math.max(mockStats.totalQuestions, mockStats.latestTotal, 0);
  const taskTotal = LESSON_TASK_TOTAL + MISSION_TASK_TOTAL + mockTaskTotal;
  const taskCleared = Math.min(completedLearningUnits, LESSON_TASK_TOTAL) + missionTaskCleared + Math.min(mockStats.totalAnswered, mockTaskTotal);
  const taskProgressPercent = taskTotal > 0 ? Math.min(100, Math.round((taskCleared / taskTotal) * 100)) : 0;
  const systemPercentile = Math.min(100, Math.max(1, admissionChance));
  const rankInfo = getRankInfo(admissionChance);
  const currentRankIndex = RANKS.findIndex(rank => rank.label === rankInfo.label);

  const scoreBreakdown = useMemo(() => [
    { label: 'บทเรียน', weight: `${LESSON_TASK_TOTAL} บท`, value: lessonTaskPercent, icon: BookOpenCheck, color: 'bg-emerald-400' },
    { label: 'พิชิตภารกิจ', weight: `${MISSION_TASK_TOTAL} ข้อ`, value: missionTaskPercent, icon: FileQuestion, color: 'bg-sky-400' },
    { label: 'แบบทดสอบ', weight: '10%', value: mockPercent, icon: Trophy, color: 'bg-amber-400' },
  ], [lessonTaskPercent, missionTaskPercent, mockPercent]);

  const getPartIcon = (id: PartId) => {
    switch (id) {
      case PartId.PART_A: return BookOpen;
      case PartId.PART_B: return GraduationCap;
      case PartId.PART_C: return Users;
      default: return BookOpen;
    }
  };

  const getPartCardClass = (color: string) => {
    switch (color) {
      case 'blue': return 'dashboard-part-card--blue bg-[linear-gradient(135deg,#fff6bf_0%,#ffd84d_38%,#f4a51c_70%,#ffe9a3_100%)] shadow-amber-500/25 hover:shadow-amber-300/40';
      case 'orange': return 'dashboard-part-card--orange bg-[linear-gradient(135deg,#fff1a8_0%,#ffca28_34%,#ff9f1c_68%,#ffe6a1_100%)] shadow-orange-500/25 hover:shadow-orange-300/40';
      case 'green': return 'dashboard-part-card--green bg-[linear-gradient(135deg,#fff8cf_0%,#facc15_42%,#d9a514_72%,#fff2ad_100%)] shadow-yellow-500/25 hover:shadow-yellow-300/40';
      default: return 'dashboard-part-card--blue bg-[linear-gradient(135deg,#fff6bf_0%,#ffd84d_38%,#f4a51c_70%,#ffe9a3_100%)] shadow-amber-500/25 hover:shadow-amber-300/40';
    }
  };

  const handleStartQuest = () => {
    if (launchQuest) return;
    setLaunchQuest(true);
  };

  return (
    <div className={`quest-dashboard quest-dashboard--${theme} min-h-screen bg-slate-950 pb-12 text-white`}>
      <section className="quest-dashboard-hero relative overflow-hidden bg-slate-950 px-4 py-8 text-white md:px-8 md:py-12">
        <div className="quest-dashboard-hero-aura absolute inset-0 opacity-80 [background-image:linear-gradient(120deg,rgba(251,191,36,.2),transparent_35%),radial-gradient(circle_at_88%_15%,rgba(45,212,191,.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="animate-[sobkruRise_.6s_ease-out_both] text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
              <Target className="h-4 w-4" />
              ระบบสรุปเนื้อหาสำหรับสอบครูผู้ช่วย
            </p>
            <h1 className="mt-5 font-black tracking-tight">
              <span className="block text-4xl md:inline md:text-6xl">โอกาสสอบติด</span>
              <span className={`mt-2 block text-6xl md:ml-3 md:mt-0 md:inline md:text-6xl ${getAdmissionChanceClass(admissionChance)}`}>{admissionChance}%</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-white/65 lg:mx-0">
              สูตรประเมินจากบทเรียน 50% การทำโจทย์ 40% และ แบบทดสอบเสมือนจริง 10%
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-stretch">
              <button
                onClick={onContinueLesson}
                className="inline-flex min-h-12 w-[260px] max-w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3 font-black text-slate-950 shadow-[0_18px_50px_rgba(251,191,36,.24)] transition hover:-translate-y-0.5 hover:bg-amber-300 lg:w-auto"
              >
                <Play className="h-5 w-5 fill-current" />
                เรียนต่อจากครั้งที่แล้ว
              </button>
              <button
                onClick={handleStartQuest}
                className="quest-mission-button inline-flex min-h-12 w-[260px] max-w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/20 lg:w-auto"
              >
                พิชิตภารกิจ
                <Swords className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="quest-level-card rounded-[28px] border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl md:p-5 sm:text-left">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="min-w-0">
                <div
                  className="bg-gradient-to-r from-white via-amber-200 to-yellow-700 bg-clip-text text-3xl font-black uppercase tracking-[0.06em] text-transparent drop-shadow-[0_2px_7px_rgba(251,191,36,.28)] md:text-4xl"
                  style={{ fontFamily: 'var(--sobkru-font-display)', WebkitTextStroke: '0.35px rgba(255,255,255,0.35)' }}
                >
                  Level {admissionChance}
                </div>
                <RankBadgeButton
                  rank={rankInfo}
                  onClick={() => setShowRankRoadmap(true)}
                  compact
                  className="mt-4 sm:hidden"
                />
                <div className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/50">EXP</div>
                <div className="mt-2 text-4xl font-black md:text-5xl">{taskCleared}/{taskTotal}</div>
                <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/40">Tasks Cleared</div>
                <div className="mt-2 w-full sm:max-w-[320px]">
                  <div className="h-4 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/10">
                    <div
                      className="h-full rounded-full shadow-[0_0_20px_rgba(250,204,21,.45)] transition-all duration-700 [background:linear-gradient(90deg,#facc15_0%,#facc15_72%,rgba(250,204,21,.28)_100%)]"
                      style={{ width: `${taskProgressPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-black leading-5 text-white/70 md:text-sm">
                    อยู่ในระดับสูงกว่าผู้ใช้งาน <span className="text-amber-300">{systemPercentile}%</span> ของระบบ
                  </p>
                </div>
              </div>
              <RankBadgeButton
                rank={rankInfo}
                onClick={() => setShowRankRoadmap(true)}
                className="hidden sm:flex"
              />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {scoreBreakdown.map(item => (
                <div key={item.label} className="quest-score-chip rounded-2xl bg-slate-950/35 px-4 py-3">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <item.icon className="h-5 w-5 text-white/75" />
                    <div className="text-lg font-black">{item.value}%</div>
                  </div>
                  <div className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-white/45">{item.label} {item.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <section>
          <div className="mb-5 flex flex-col gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-300">Core Curriculum</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">บทเรียนหลัก ภาค ก ข และ ค</h2>
            </div>
            <p className="mx-auto max-w-xl text-sm font-semibold leading-7 text-white/55 md:mx-0 md:text-right">เลือกภาคที่ต้องการเรียน ระบบจะเก็บความคืบหน้าเพื่อนำไปคำนวณโอกาสสอบติด</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {EXAM_CURRICULUM.map(part => {
              const Icon = getPartIcon(part.id);
              const scoreMatch = part.subtitle.match(/\(([^)]+)\)/);
              const subtitleText = part.subtitle.replace(/\s*\(([^)]+)\)\s*$/, '').trim();
              const scoreText = scoreMatch?.[1] || '';
              return (
                <button
                  key={part.id}
                  onClick={() => onSelectPart(part)}
                  className={`dashboard-part-card group flex min-h-[210px] flex-col items-center justify-center rounded-2xl p-6 text-center text-slate-950 shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${getPartCardClass(part.color)}`}
                >
                  <Icon className="mb-4 h-12 w-12 text-slate-950/90" />
                  <h3 className="text-3xl font-black">{part.title}</h3>
                  <p className="mt-2 max-w-[260px] text-sm font-black leading-6 text-slate-950/80">
                    <span className="block">{subtitleText}</span>
                    {scoreText && <span className="dashboard-part-score block">({scoreText})</span>}
                  </p>
                  <span className="mt-5 text-xs font-black text-slate-950/55 transition group-hover:text-slate-950">
                    คลิกเพื่อเข้าสู่บทเรียน
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <button onClick={onNavigateToMockExam} className="dashboard-menu-card dashboard-menu-card--violet group relative overflow-hidden rounded-3xl p-6 text-left text-white transition md:p-7">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
            <div className="relative flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-1 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]">Real Exam Mode</div>
                <h3 className="text-2xl font-black">ทำแบบทดสอบเสมือนจริง</h3>
                <p className="mt-1 text-sm font-bold text-white/90">ทดลองทำข้อสอบแบบเสมือนสอบจริง ทั้ง ภาค ก และ ภาค ข</p>
              </div>
            </div>
          </button>

          <button onClick={onNavigateToDailyEnglish} className="dashboard-menu-card dashboard-menu-card--cyan group relative overflow-hidden rounded-3xl p-6 text-left text-white transition md:p-7">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/15 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
            <div className="relative flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/35 bg-white/18">
                <Languages className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-1 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]">Daily English</div>
                <h3 className="text-2xl font-black">ฝึกภาษาอังกฤษประจำวัน</h3>
                <p className="mt-1 text-sm font-bold text-white/90">บทความ คำแปล เสียงอ่าน และคำศัพท์จากผู้ดูแล</p>
              </div>
            </div>
          </button>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <QuickActionCard icon={Newspaper} title="ข่าวสารประชาสัมพันธ์" description="ติดตามข่าวสาร ประกาศ และอัปเดตต่างๆ" badge="ดูข่าว" tone="blue" onClick={onNavigateToNews} />
          <QuickActionCard icon={MessageSquare} title="กระดานสนทนา" description="พูดคุย แลกเปลี่ยนความรู้" badge="ถามตอบ" tone="indigo" onClick={onNavigateToDiscussion} />
          <QuickActionCard icon={BarChart3} title="ข้อมูลผู้ใช้งาน" description="สถิติผู้ใช้งานในระบบ" badge="ดูข้อมูล" tone="emerald" onClick={() => onNavigateToLeaderboard?.()} />
        </section>

      </main>
      {showRankRoadmap && (
        <RankRoadmapModal
          theme={theme}
          currentRankIndex={currentRankIndex}
          admissionChance={admissionChance}
          onClose={() => setShowRankRoadmap(false)}
        />
      )}

      <AnimatePresence>
        {launchQuest && (
          <motion.div
            className={`fixed inset-0 z-[90] flex items-center justify-center overflow-hidden ${theme === 'light' ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className={`absolute inset-0 ${
                theme === 'light'
                  ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(15,23,42,.045),transparent_25%),radial-gradient(circle_at_20%_20%,rgba(148,163,184,.12),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(226,232,240,.45),transparent_32%),linear-gradient(120deg,#ffffff_0%,#f8fafc_52%,#ffffff_100%)]'
                  : 'bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,.22),transparent_25%),radial-gradient(circle_at_20%_20%,rgba(59,130,246,.16),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(16,185,129,.16),transparent_30%),linear-gradient(120deg,#020617_0%,#111827_52%,#030712_100%)]'
              }`}
            />
            <motion.div
              className={`absolute h-[34rem] w-[34rem] rounded-full border ${theme === 'light' ? 'border-slate-950/16' : 'border-orange-300/22'}`}
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: 1.55, opacity: [0, 0.95, 0] }}
              transition={{ duration: 1.05, ease: 'easeOut' }}
            />
            <motion.div
              className={`absolute h-[22rem] w-[22rem] rounded-full border ${theme === 'light' ? 'border-slate-950/12' : 'border-blue-200/18'}`}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.95, opacity: [0, 0.58, 0] }}
              transition={{ duration: 1.05, delay: 0.12, ease: 'easeOut' }}
            />
            <motion.div
              className={`absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent blur-xl ${theme === 'light' ? 'via-slate-950/10 to-transparent' : 'via-orange-200/28 to-transparent'}`}
              initial={{ x: '-65vw', opacity: 0 }}
              animate={{ x: '65vw', opacity: [0, 1, 0] }}
              transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <motion.div
              className="relative z-10 text-center"
              initial={{ y: 28, scale: 0.94, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <p className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.28em] ${theme === 'light' ? 'border-slate-950 bg-white text-slate-950 shadow-sm' : 'border-orange-200/25 bg-orange-300/10 text-orange-200'}`}>
                <Swords className="h-4 w-4" />
                Challenge Mode
              </p>
              <h2 className={`mt-5 text-5xl font-black tracking-tight md:text-7xl ${theme === 'light' ? 'text-slate-950' : 'bg-gradient-to-b from-yellow-100 via-amber-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_14px_42px_rgba(245,158,11,.32)]'}`}>
                พิชิตภารกิจ
              </h2>
              <p className={`mt-4 text-lg font-black ${theme === 'light' ? 'text-slate-950' : 'text-white drop-shadow-[0_0_24px_rgba(255,255,255,.22)]'}`}>ตะลุย 100 ด่านอรหันต์</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RankRoadmapModal = ({
  theme,
  currentRankIndex,
  admissionChance,
  onClose,
}: {
  theme: FeatureTheme;
  currentRankIndex: number;
  admissionChance: number;
  onClose: () => void;
}) => {
  const currentRank = RANKS[Math.max(0, currentRankIndex)] || RANKS[0];
  const [selectedRank, setSelectedRank] = useState<RankInfo | null>(null);

  return (
    <div className={`rank-roadmap-modal rank-roadmap-modal--${theme} fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md`}>
      <div className="rank-roadmap-surface relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-black/40 md:p-8">
        <div className="rank-roadmap-aura pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_15%_85%,rgba(250,204,21,.18),transparent_26%),radial-gradient(circle_at_90%_10%,rgba(45,212,191,.14),transparent_28%)]" />
        <button
          type="button"
          onClick={onClose}
          className="rank-roadmap-close absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="ปิดรายละเอียด Rank"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative grid gap-6 pr-14 lg:grid-cols-[1fr_280px] lg:items-start">
          <div>
            <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-200">
              Rank Roadmap
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">ความชำนาญของคุณ</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/60 md:text-base">
              Rank คำนวณจากโอกาสสอบติดปัจจุบันของคุณ ยิ่งเคลียร์บทเรียน พิชิตภารกิจ และทำแบบทดสอบได้ดี Rank จะไต่ขึ้นไปเรื่อย ๆ
            </p>
          </div>

          <div className="rank-current-card rounded-[28px] border border-amber-300/25 bg-white/10 p-4 text-center shadow-[0_0_38px_rgba(250,204,21,.12)]">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-200">Current Rank</p>
            <img
              src={currentRank.imageUrl}
              alt={`${currentRank.label} Rank`}
              className="mx-auto mt-2 h-24 w-24 object-contain drop-shadow-[0_16px_28px_rgba(251,191,36,.35)]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <h3 className="mt-1 text-2xl font-black uppercase tracking-[0.08em] text-white">{currentRank.label}</h3>
            <p className="mt-1 text-sm font-black text-white/65">Level {admissionChance}</p>
          </div>
        </div>

        <div className="relative mt-8 flex gap-4 overflow-x-auto pb-5 md:items-end">
          {RANKS.map((rank, index) => {
            const isCurrent = index === currentRankIndex;
            const isPassed = index < currentRankIndex;
            const isLocked = index > currentRankIndex;
            const statusLabel = isCurrent ? 'CURRENT' : isPassed ? 'CLEARED' : '';
            return (
              <button
                key={rank.label}
                type="button"
                onClick={() => setSelectedRank(rank)}
                className="rank-roadmap-step relative min-w-[94px] flex-1 animate-[sobkruRise_.45s_ease-out_both] md:min-w-[102px]"
                style={{ animationDelay: `${index * 55}ms`, transform: `translateY(${(RANKS.length - index - 1) * 8}px)` }}
              >
                <div className={`rank-roadmap-card group relative flex min-h-[200px] flex-col items-center justify-between overflow-hidden rounded-3xl border p-3 text-center transition duration-300 md:min-h-[230px] ${isCurrent ? 'is-current border-amber-300 bg-amber-300/15 shadow-[0_0_38px_rgba(250,204,21,.22)]' : isPassed ? 'is-passed border-emerald-300/25 bg-emerald-300/10' : 'is-locked border-white/10 bg-white/[.045]'}`}>
                  {isLocked && <div className="pointer-events-none absolute inset-0 z-10 bg-slate-950/55 backdrop-grayscale" />}
                  <h3 className={`relative z-20 w-full whitespace-nowrap px-1 text-center text-[9px] font-black uppercase leading-tight tracking-[0.025em] md:text-[10px] ${isLocked ? 'text-white/40' : 'text-white'}`}>{rank.label}</h3>
                  <img
                    src={rank.imageUrl}
                    alt={`${rank.label} Rank`}
                    className={`relative z-20 h-20 w-20 object-contain transition duration-300 group-hover:scale-110 ${isCurrent ? 'drop-shadow-[0_16px_28px_rgba(251,191,36,.45)]' : isLocked ? 'opacity-35 grayscale' : 'opacity-95'}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-20">
                    {statusLabel && (
                      <p className={`mb-2 rounded-sm px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-lg ${isCurrent ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                        {statusLabel}
                      </p>
                    )}
                    <p className={`text-xs font-black uppercase tracking-[0.08em] ${isLocked ? 'text-white/35' : 'text-white/65'}`}>Level {rank.min}</p>
                  </div>
                </div>
                <div className={`rank-roadmap-dot mx-auto mt-3 h-4 w-4 rounded-full border ${isCurrent ? 'is-current border-amber-200 bg-amber-300 shadow-[0_0_18px_rgba(250,204,21,.7)]' : isPassed ? 'is-passed border-emerald-200 bg-emerald-300' : 'is-locked border-white/20 bg-white/10'}`} />
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedRank && (
            <motion.div
              className="rank-detail-modal fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRank(null)}
            >
              <motion.div
                className="rank-detail-surface relative w-full max-w-md overflow-hidden rounded-[32px] border border-amber-200/25 bg-slate-900 p-6 text-center shadow-[0_35px_110px_rgba(0,0,0,.55)]"
                initial={{ y: 26, scale: 0.92, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 18, scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={event => event.stopPropagation()}
              >
                <div className="rank-detail-aura pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_50%_10%,rgba(250,204,21,.2),transparent_34%),radial-gradient(circle_at_85%_90%,rgba(45,212,191,.13),transparent_32%)]" />
                <button
                  type="button"
                  onClick={() => setSelectedRank(null)}
                  className="rank-roadmap-close absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="ปิดรายละเอียดแร้ง"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Rank Detail</p>
                  <img
                    src={selectedRank.imageUrl}
                    alt={`${selectedRank.label} Rank`}
                    className="mx-auto mt-4 h-36 w-36 object-contain drop-shadow-[0_22px_40px_rgba(251,191,36,.28)]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="mt-4 text-4xl font-black uppercase tracking-[0.08em] text-white">{selectedRank.label}</h3>
                  <p className="mt-2 text-2xl font-black text-amber-200">{selectedRank.thaiLabel}</p>
                  <div className="mx-auto mt-5 grid max-w-sm gap-3 rounded-3xl border border-white/10 bg-white/[.06] p-4 text-center">
                    <p className="text-sm font-black leading-7 text-white/75">{getRankChanceDescription(selectedRank)}</p>
                    <p className="text-center text-sm font-bold text-white/50">
                      เกณฑ์ระดับ: Level {selectedRank.min}{selectedRank.max !== selectedRank.min ? `-${selectedRank.max}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const quickActionStyles = {
  blue: {
    border: 'border-blue-400/20 hover:border-blue-300/60 hover:shadow-blue-500/10',
    glow: 'bg-blue-400/20',
    icon: 'bg-blue-600 shadow-blue-600/20',
    title: 'group-hover:text-blue-100',
    text: 'group-hover:text-blue-200',
    badge: 'bg-blue-400/15 text-blue-100 group-hover:bg-blue-500 group-hover:text-white',
  },
  indigo: {
    border: 'border-indigo-400/20 hover:border-indigo-300/60 hover:shadow-indigo-500/10',
    glow: 'bg-indigo-400/20',
    icon: 'bg-indigo-600 shadow-indigo-600/20',
    title: 'group-hover:text-indigo-100',
    text: 'group-hover:text-indigo-200',
    badge: 'bg-indigo-400/15 text-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
  },
  emerald: {
    border: 'border-emerald-400/20 hover:border-emerald-300/60 hover:shadow-emerald-500/10',
    glow: 'bg-emerald-400/20',
    icon: 'bg-emerald-500 shadow-emerald-600/20',
    title: 'group-hover:text-emerald-100',
    text: 'group-hover:text-emerald-200',
    badge: 'bg-emerald-400/15 text-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
  },
};

const QuickActionCard = ({ icon: Icon, title, description, badge, tone, onClick }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  tone: keyof typeof quickActionStyles;
  onClick: () => void;
}) => {
  const style = quickActionStyles[tone];
  return (
    <button onClick={onClick} className={`dashboard-quick-card dashboard-quick-card--${tone} group relative flex items-center justify-between overflow-hidden rounded-3xl border bg-white/10 p-5 text-left shadow-sm shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl ${style.border}`}>
      <div className={`dashboard-quick-card__glow absolute -right-8 -top-10 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-125 ${style.glow}`} />
      <div className="relative flex items-center gap-4">
        <div className={`dashboard-quick-card__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${style.icon}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h4 className={`whitespace-nowrap text-base font-black text-white transition-colors md:text-lg ${style.title}`}>{title}</h4>
          <p className={`whitespace-nowrap text-xs font-semibold text-white/55 transition-colors ${style.text}`}>{description}</p>
        </div>
      </div>
      <span className={`dashboard-quick-card__badge relative ml-3 rounded-full px-3 py-1 text-xs font-black transition-colors ${style.badge}`}>{badge}</span>
    </button>
  );
};

export default QuestDashboard;
