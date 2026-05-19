import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, BookOpenCheck, Brain, BriefcaseBusiness, ChevronLeft, GraduationCap, Languages, Landmark, MessagesSquare, Scale, X } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ExamPart, PartId, SubjectSection, SubTopic } from '../types';
import type { FeatureTheme } from './FeatureThemeToggle';

interface TopicListProps {
  part: ExamPart;
  onBack: () => void;
  onSelectTopic: (topic: SubTopic) => void;
  theme?: FeatureTheme;
}

const sectionAccents = [
  {
    ring: 'ring-blue-300/25',
    orb: 'from-blue-400/30 to-cyan-300/10',
    number: 'bg-blue-500 text-white shadow-blue-500/25',
    line: 'from-blue-400 to-cyan-300',
    hover: 'hover:border-blue-300/45 hover:bg-blue-500/10',
    icon: Brain,
  },
  {
    ring: 'ring-emerald-300/25',
    orb: 'from-emerald-400/30 to-teal-300/10',
    number: 'bg-emerald-500 text-white shadow-emerald-500/25',
    line: 'from-emerald-400 to-teal-300',
    hover: 'hover:border-emerald-300/45 hover:bg-emerald-500/10',
    icon: Languages,
  },
  {
    ring: 'ring-amber-300/25',
    orb: 'from-amber-400/35 to-orange-300/10',
    number: 'bg-amber-400 text-slate-950 shadow-amber-500/25',
    line: 'from-amber-300 to-orange-400',
    hover: 'hover:border-amber-300/45 hover:bg-amber-400/10',
    icon: Landmark,
  },
  {
    ring: 'ring-violet-300/25',
    orb: 'from-violet-400/30 to-fuchsia-300/10',
    number: 'bg-violet-500 text-white shadow-violet-500/25',
    line: 'from-violet-400 to-fuchsia-300',
    hover: 'hover:border-violet-300/45 hover:bg-violet-500/10',
    icon: Scale,
  },
];

const sectionIconById = {
  A1: Brain,
  A2: Languages,
  A3: Landmark,
  B1: GraduationCap,
  B2: BriefcaseBusiness,
  B3: Scale,
  C1: MessagesSquare,
};

const getSectionAccent = (section: SubjectSection, sectionIndex: number) => ({
  ...sectionAccents[sectionIndex % sectionAccents.length],
  icon: sectionIconById[section.id as keyof typeof sectionIconById] || sectionAccents[sectionIndex % sectionAccents.length].icon,
});

const TopicList: React.FC<TopicListProps> = ({ part, onBack, onSelectTopic, theme = 'dark' }) => {
  const [selectedSection, setSelectedSection] = useState<SubjectSection | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [part.id]);

  const openSectionMap = (section: SubjectSection) => {
    if (part.id === PartId.PART_C && section.subTopics.length === 1) {
      onSelectTopic(section.subTopics[0]);
      return;
    }

    if (section.isSelfStudy) return;

    setSelectedSection(section);
  };

  const closeSectionMap = () => {
    setSelectedSection(null);
  };

  const selectedSectionIndex = selectedSection ? part.sections.findIndex(section => section.id === selectedSection.id) : -1;
  const partTitle = part.subtitle.replace(/\s*\(([^)]+)\)\s*$/, '');
  const partScoreText = part.subtitle.match(/\(([^)]+)\)/)?.[0] || '';

  const getTopicLessonCount = (topic: SubTopic) => topic.chapters?.length || topic.topicParts?.length || 1;
  const getSectionLessonCount = (section: SubjectSection) => section.subTopics.reduce((sum, topic) => sum + getTopicLessonCount(topic), 0);

  return (
    <div className={`topic-list-page topic-list-page--${theme} relative min-h-[calc(100vh-73px)] overflow-hidden bg-slate-950 text-white`} style={{ fontFamily: 'var(--sobkru-font-sans)' }}>
      <div className="topic-list-aura pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_12%_12%,rgba(250,204,21,.16),transparent_28%),radial-gradient(circle_at_88%_6%,rgba(45,212,191,.16),transparent_26%),linear-gradient(180deg,#020617_0%,#07111f_52%,#020617_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-3 md:px-8 md:pb-10 md:pt-4">
        <header className="mt-1 animate-[sobkruRise_.45s_ease-out_both] text-center md:mt-2">
          <div>
            <p className="topic-part-pill inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-7 py-3 text-2xl font-black tracking-[0.08em] text-amber-200 shadow-[0_0_28px_rgba(250,204,21,.08)] md:text-3xl">
              {part.title}
            </p>
            <h1 className="mx-auto mt-8 max-w-none text-4xl font-black leading-[1.05] tracking-tight md:whitespace-nowrap md:text-5xl xl:text-6xl" style={{ fontFamily: 'var(--sobkru-font-display)' }}>
              <span>{partTitle}</span>
              <span className="mt-5 block text-3xl text-amber-200 md:mt-6 md:text-4xl xl:text-5xl">
                {partScoreText}
              </span>
            </h1>
          </div>
        </header>

        <LayoutGroup id="lesson-path">
          <div className={`mt-10 grid gap-5 md:mt-12 ${part.sections.length === 1 ? 'mx-auto w-full max-w-[560px] grid-cols-1' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
            {part.sections.map((section: SubjectSection, sectionIndex) => {
              const accent = getSectionAccent(section, sectionIndex);
              const Icon = accent.icon || BookOpen;
              const scoreText = section.title.match(/\(([^)]+)\)/)?.[1] || '';
              const cleanTitle = section.title.replace(/\s*\(([^)]+)\)\s*$/, '');
              const progressPercent = 0;
              const lessonCount = section.isSelfStudy ? 0 : getSectionLessonCount(section);
              const isActiveSection = selectedSection?.id === section.id;
              const isPushedAside = selectedSection && !isActiveSection;
              const pushDirection = sectionIndex < selectedSectionIndex ? '-translate-x-[42vw]' : 'translate-x-[42vw]';

              return (
                <motion.button
                  key={section.id}
                  layoutId={`section-card-${section.id}`}
                  type="button"
                  onClick={() => openSectionMap(section)}
                  className={`topic-section-card topic-lesson-card group relative flex min-h-[340px] animate-[sobkruCardStack_.45s_ease-out_both] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-white/10 bg-white/[.07] text-center shadow-2xl shadow-black/20 ring-1 ${accent.ring} backdrop-blur-xl transition-[opacity,filter,border-color,background-color,box-shadow] duration-300 ease-out hover:z-20 hover:border-amber-200/45 hover:bg-white/[.12] hover:shadow-[0_0_0_1px_rgba(254,240,138,.24),0_32px_90px_rgba(0,0,0,.42)] md:min-h-[380px] ${section.isSelfStudy ? 'cursor-default' : ''} ${isActiveSection ? 'opacity-0' : ''} ${isPushedAside ? `${pushDirection} scale-90 opacity-0 blur-sm` : ''}`}
                  style={{ animationDelay: `${sectionIndex * 70}ms` }}
                  transition={{ layout: { duration: 0.52, ease: [0.2, 0.8, 0.2, 1] } }}
                >
                  <div className={`topic-section-card-orb pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${accent.orb} blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-90`} />
                  <div className="topic-section-card-sheen pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.12),transparent_42%,rgba(255,255,255,.06))] opacity-60" />
                  <div className="topic-section-card-fade pointer-events-none absolute inset-x-0 bottom-0 h-1/2 translate-y-8 bg-gradient-to-t from-slate-950/75 to-transparent opacity-80 transition duration-500 group-hover:translate-y-0" />

                  <div className="relative flex w-full flex-1 flex-col items-center justify-center p-6 md:p-7">
                    <div className="topic-section-card-main absolute inset-0 flex flex-col items-center justify-center px-6 transition-transform duration-500 group-hover:-translate-y-16 md:px-8">
                      <div className="topic-section-card-icon flex items-center justify-center text-amber-100 transition-all duration-300 group-hover:text-amber-200">
                        <Icon className="h-12 w-12 transition-all duration-300 group-hover:h-8 group-hover:w-8" />
                      </div>

                      <div className="mt-6 max-w-full transition duration-500">
                        <h3 className="text-3xl font-black leading-tight text-white transition-all duration-300 group-hover:text-2xl md:text-[2.05rem] md:group-hover:text-[1.7rem]">{cleanTitle}</h3>
                        {scoreText && <p className="mt-2 text-xl font-black text-amber-100 transition-all duration-300 group-hover:text-lg">{scoreText}</p>}
                      </div>
                    </div>

                    <div className="topic-section-card-details absolute inset-x-6 bottom-12 mx-auto max-w-[280px] translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-14">
                      {section.isSelfStudy ? (
                        <p className="rounded-2xl border border-amber-200/20 bg-white/8 px-5 py-4 text-base font-black leading-7 text-amber-100">
                          ให้ศึกษาด้วยตนเอง
                        </p>
                      ) : (
                        <>
                          <p className="mb-4 text-sm font-black text-white/60">
                            {lessonCount} บทเรียน
                          </p>
                          <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.12em] text-white/55">
                            <span>Progress</span>
                            <span className="text-amber-200">{progressPercent}%</span>
                          </div>
                          <div className="topic-progress-track mt-2 h-3 overflow-hidden rounded-full bg-white/12 ring-1 ring-white/10">
                            <div
                              className={`topic-progress-fill h-full rounded-full bg-gradient-to-r ${accent.line} shadow-[0_0_22px_rgba(250,204,21,.32)] transition-all duration-700`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <p className="mt-4 text-sm font-semibold leading-6 text-white/55">
                            ความคืบหน้าของการเรียน ณ ปัจจุบัน
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-lg transition group-hover:bg-amber-300">
                            เข้าสู่บทเรียน
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-white/35">
            <BookOpenCheck className="h-5 w-5 text-amber-200/70" />
            เรียนตามลำดับหรือเลือกหัวข้อที่ต้องการทบทวนได้ทันที
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onBack}
              className="topic-back-home-button inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-bold text-white/70 transition"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>กลับสู่หน้าหลัก</span>
            </button>
          </div>

          <AnimatePresence>
            {selectedSection && (
              <SectionGalleryOverlay
                section={selectedSection}
                accent={getSectionAccent(selectedSection, Math.max(0, selectedSectionIndex))}
                onClose={closeSectionMap}
                onSelectTopic={onSelectTopic}
                theme={theme}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

const SectionGalleryOverlay = ({
  section,
  accent,
  onClose,
  onSelectTopic,
  theme,
}: {
  section: SubjectSection;
  accent: typeof sectionAccents[number];
  onClose: () => void;
  onSelectTopic: (topic: SubTopic) => void;
  theme: FeatureTheme;
}) => {
  const scoreText = section.title.match(/\(([^)]+)\)/)?.[1] || '';
  const cleanTitle = section.title.replace(/\s*\(([^)]+)\)\s*$/, '');
  const Icon = accent.icon || BookOpen;
  const visibleTopics = section.subTopics;
  const getTopicLessonCount = (topic: SubTopic) => topic.chapters?.length || topic.topicParts?.length || 1;
  const totalLessons = visibleTopics.reduce((sum, topic) => sum + getTopicLessonCount(topic), 0);
  const completedLessons = 0;

  return (
    <motion.div
      className={`topic-section-overlay topic-section-overlay--${theme} fixed inset-0 z-[70] overflow-hidden bg-slate-950/60 text-white backdrop-blur-md`}
      initial={{ backgroundColor: 'rgba(2,6,23,0)', backdropFilter: 'blur(0px)' }}
      animate={{
        backgroundColor: theme === 'light' ? 'rgba(248,250,252,0.78)' : 'rgba(2,6,23,0.6)',
        backdropFilter: 'blur(10px)',
      }}
      exit={{ backgroundColor: 'rgba(2,6,23,0)', backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.28 }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.36 }}
      >
        <div className={`topic-overlay-ambient absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br ${accent.orb} blur-3xl`} />
        <div className={`topic-overlay-ambient absolute right-0 top-0 h-full w-1/2 bg-gradient-to-br ${accent.orb} opacity-60 blur-3xl`} />
      </motion.div>

      <motion.div
        layoutId={`section-card-${section.id}`}
        className={`topic-section-overlay-card absolute inset-3 overflow-hidden rounded-[34px] border border-amber-200/25 bg-white/[.07] shadow-[0_40px_120px_rgba(0,0,0,.55)] ring-1 ${accent.ring} backdrop-blur-2xl md:inset-8`}
        transition={{ layout: { duration: 0.52, ease: [0.2, 0.8, 0.2, 1] } }}
      >
        <div className="topic-overlay-card-sheen pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.12),transparent_40%,rgba(255,255,255,.06))]" />
        <div className={`topic-overlay-card-orb pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br ${accent.orb} blur-3xl`} />
        <div className="topic-overlay-card-fade pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
          aria-label="ปิดแผนที่บทเรียน"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 py-7 md:px-10 md:py-10">
          <div className="grid gap-8 pr-14 lg:grid-cols-[1fr_auto] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ delay: 0.12, duration: 0.34 }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                Lesson Gallery
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight md:text-[2.7rem]">{cleanTitle}</h2>
              {scoreText && <p className="mt-3 text-lg font-black text-amber-200">{scoreText}</p>}
            </motion.div>

            <motion.div className="text-center" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ delay: 0.16, duration: 0.34 }}>
              <div className="mx-auto flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[28px] bg-amber-300 text-slate-950 shadow-[0_0_35px_rgba(250,204,21,.3)]">
                <Icon className="h-10 w-10" />
              </div>
              <p className="mt-4 text-lg font-black text-white">{completedLessons}/{totalLessons} บทเรียน</p>
              <div className="topic-progress-track mx-auto mt-3 h-2 w-48 overflow-hidden rounded-full bg-white/12">
                <div className={`topic-progress-fill h-full rounded-full bg-gradient-to-r ${accent.line}`} style={{ width: totalLessons ? `${Math.round((completedLessons / totalLessons) * 100)}%` : '0%' }} />
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-6xl flex-1 flex-col gap-3">
            {visibleTopics.map((topic, topicIndex) => {
              const isLocked = section.isSelfStudy;
              const topicLessons = getTopicLessonCount(topic);
              const topicCompleted = 0;
              const topicProgress = topicLessons ? Math.round((topicCompleted / topicLessons) * 100) : 0;

              return (
                <motion.button
                  key={topic.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() => !isLocked && onSelectTopic(topic)}
                  className={`group relative min-h-[64px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[.065] px-6 py-3 text-left shadow-2xl shadow-black/12 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-200/45 hover:bg-white/[.10] md:px-8 ${isLocked ? 'cursor-not-allowed opacity-45' : ''}`}
                  initial={{ opacity: 0, x: topicIndex % 2 === 0 ? -36 : 36, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: topicIndex % 2 === 0 ? -24 : 24, scale: 0.98 }}
                  transition={{ delay: 0.18 + topicIndex * 0.045, duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className={`topic-row-orb pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br ${accent.orb} blur-2xl transition duration-500 group-hover:scale-125`} />
                  <div className="topic-row-sheen pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.1),transparent_45%)] opacity-80" />

                  <div className="relative grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(260px,.8fr)] md:items-center">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-black leading-tight text-white md:text-[1.45rem]">{topic.title}</h3>
                        <p className="shrink-0 text-xs font-black text-amber-200 md:text-sm">{topicCompleted}/{topicLessons} บทเรียน</p>
                      </div>
                      {topic.description && (
                        <p className="mt-1 line-clamp-1 text-xs font-semibold leading-5 text-white/50 md:text-sm">{topic.description}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-white/40">
                        <span>Progress</span>
                        <span className="text-amber-200">{topicProgress}%</span>
                      </div>
                      <div className="topic-progress-track mt-3 h-3 overflow-hidden rounded-full bg-white/12">
                        <div className={`topic-progress-fill h-full rounded-full bg-gradient-to-r ${accent.line}`} style={{ width: `${topicProgress}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopicList;
