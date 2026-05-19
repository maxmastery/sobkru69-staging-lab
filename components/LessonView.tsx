
import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Loader2, AlertCircle, BookOpen, BookOpenCheck, Lightbulb, Star, CheckCircle, PlayCircle, Menu, ArrowRight, FileText, Play } from 'lucide-react';
import { LessonChapter, SubTopic } from '../types';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import ChatBot from './ChatBot';
import QuizGenerator from './QuizGenerator';
import { getStoredUser, userActivityService } from '../services/userActivityService';

const ListDepthContext = createContext(0);
const SvgContext = createContext(false);

interface LessonViewProps {
  topic: SubTopic;
  onBack: () => void;
  theme?: 'light' | 'dark';
}

// Keep post-lesson assessments in the codebase, but hide them from lessons for now.
const SHOW_LESSON_ASSESSMENTS = false;
// Keep AI Tutor available in code, but hide the floating chat from lessons for now.
const SHOW_AI_TUTOR = false;
const shouldShowLessonChapter = (chapter: LessonChapter) => SHOW_LESSON_ASSESSMENTS || !chapter.isQuiz;
const lessonAccentClasses = [
  'border-l-blue-400 bg-blue-50/80 text-blue-700 shadow-blue-100/70',
  'border-l-emerald-400 bg-emerald-50/80 text-emerald-700 shadow-emerald-100/70',
  'border-l-amber-400 bg-amber-50/85 text-amber-700 shadow-amber-100/70',
  'border-l-violet-400 bg-violet-50/80 text-violet-700 shadow-violet-100/70',
  'border-l-rose-400 bg-rose-50/80 text-rose-700 shadow-rose-100/70',
];
const lessonMenuToneClasses = [
  'lesson-menu-tone-blue',
  'lesson-menu-tone-orange',
  'lesson-menu-tone-emerald',
  'lesson-menu-tone-violet',
  'lesson-menu-tone-rose',
  'lesson-menu-tone-sky',
  'lesson-menu-tone-amber',
];
const getLessonToneClass = (index: number) => lessonMenuToneClasses[index % lessonMenuToneClasses.length];

const getLessonGalleryBackLabel = (topicId: string) => {
  if (topicId.startsWith('A')) return 'กลับสู่หน้า Lesson Gallery ภาค ก';
  if (topicId.startsWith('B')) return 'กลับสู่หน้า Lesson Gallery ภาค ข';
  if (topicId.startsWith('C')) return 'กลับสู่หน้า Lesson Gallery ภาค ค';
  return 'กลับสู่หน้า Lesson Gallery';
};

const LessonView: React.FC<LessonViewProps> = ({ topic, onBack, theme = 'light' }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  const [fullLessonContent, setFullLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = theme === 'dark';
  
  // Chapter State
  const hasChapters = topic.chapters && topic.chapters.length > 0;
  const isPartBLesson = topic.id.startsWith('B');
  const shouldSkipLessonOverview = topic.id.startsWith('C');
  const initialChapterIndex = hasChapters && topic.chapters!.length > 1 && !shouldSkipLessonOverview ? -1 : 0;
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapterIndex);
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    setCurrentChapterIndex(initialChapterIndex);
    setIsSidebarOpen(false);
  }, [topic.id, initialChapterIndex]);

  useEffect(() => {
    const loadCompletedChapters = async () => {
      const user = getStoredUser();
      if (!user || !topic?.id) {
        setCompletedChapters(new Set());
        return;
      }

      try {
        const completedIds = await userActivityService.getCompletedChapterIds(user.id, topic.id);
        const completedIndexes = new Set(
          (topic.chapters || [])
            .map((chapter, index) => completedIds.includes(chapter.id) ? index : -1)
            .filter(index => index >= 0)
        );
        setCompletedChapters(completedIndexes);
      } catch (error) {
        console.error('Error loading completed chapters', error);
        setCompletedChapters(new Set());
      }
    };

    loadCompletedChapters();
  }, [topic]);

  const currentChapter = hasChapters && currentChapterIndex >= 0 ? topic.chapters![currentChapterIndex] : null;
  const visibleChapterEntries = hasChapters
    ? topic.chapters!.map((chapter, idx) => ({ chapter, idx })).filter(({ chapter }) => shouldShowLessonChapter(chapter))
    : [];
  const visibleChapterTotal = visibleChapterEntries.length;
  const visibleCompletedCount = visibleChapterEntries.filter(({ idx }) => completedChapters.has(idx)).length;
  const firstVisibleChapterIndex = visibleChapterEntries[0]?.idx ?? 0;
  const nextVisibleChapterIndex = visibleChapterEntries.find(({ idx }) => idx > currentChapterIndex)?.idx ?? -1;
  const isLastVisibleChapter = hasChapters && currentChapterIndex >= 0 && nextVisibleChapterIndex === -1;
  const currentVisiblePosition = visibleChapterEntries.findIndex(({ idx }) => idx === currentChapterIndex) + 1;

  // Timer for learning stats
  useEffect(() => {
    const user = getStoredUser();
    if (!topic || !user) return;
    if (hasChapters && currentChapterIndex < 0) return;

    const chapterId = hasChapters ? topic.chapters![currentChapterIndex].id : topic.id;
    
    let lastSaveTime = Date.now();
    
    const saveTime = async () => {
      const now = Date.now();
      const timeSpentSeconds = Math.floor((now - lastSaveTime) / 1000);
      
      if (timeSpentSeconds > 0) {
        try {
          await userActivityService.incrementStudyTime(user.id, chapterId, timeSpentSeconds);
          lastSaveTime = now;
        } catch (error) {
          console.error('Error saving learning time', error);
        }
      }
    };

    const interval = setInterval(saveTime, 5000); // Save every 5 seconds

    return () => {
      clearInterval(interval);
      saveTime(); // Save remaining time on unmount
    };
  }, [topic, currentChapterIndex, hasChapters]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      setContent('');

      if (hasChapters) {
        if (currentChapterIndex === -1) {
          setContent(''); // TOC doesn't use markdown content
        } else {
          setContent(currentChapter!.content);
        }
        const combined = topic.chapters!.filter(shouldShowLessonChapter).map(c => c.content).join('\n\n');
        setFullLessonContent(combined);
        setIsLoading(false);
      } else {
        if (topic.content) {
          setContent(topic.content);
          setFullLessonContent(topic.content);
          setIsLoading(false);
        } else {
          try {
            const response = await fetch(topic.contentPath);
            if (!response.ok) throw new Error("Failed to load content");
            const text = await response.text();
            if (text.trim().startsWith('<!DOCTYPE html>')) throw new Error("Content 404");
            setContent(text);
            setFullLessonContent(text);
          } catch (err) {
            console.error(err);
            setError("ไม่พบไฟล์เนื้อหาบทเรียนนี้");
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    loadContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic, currentChapterIndex, hasChapters, currentChapter]);

  const handleNextStep = async () => {
    const newCompleted = new Set(completedChapters);
    newCompleted.add(currentChapterIndex);
    setCompletedChapters(newCompleted);

    const user = getStoredUser();
    if (user && hasChapters && currentChapter) {
      try {
        await userActivityService.markChapterCompleted(user.id, topic.id, currentChapter.id);
      } catch (error) {
        console.error('Error marking chapter completed', error);
      }
    }

    if (hasChapters) {
        if (nextVisibleChapterIndex !== -1) {
            setCurrentChapterIndex(nextVisibleChapterIndex);
            if (window.innerWidth < 768) setIsSidebarOpen(false);
        } else {
            onBack();
        }
    } else {
        onBack();
    }
  };

  const handleSelectChapter = (index: number) => {
      if (index >= 0 && hasChapters && !shouldShowLessonChapter(topic.chapters![index])) return;
      setCurrentChapterIndex(index);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
  }

  const extractDriveId = (url: string) => {
      if (!url) return null;
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
  };

  const getGoogleDriveImageUrl = (url: string) => {
      if (!url) return null;
      const id = extractDriveId(url);
      if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
      return url;
  };

  const svgAttributeMap: Record<string, string> = {
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-opacity': 'strokeOpacity',
    'fill-opacity': 'fillOpacity',
    'font-size': 'fontSize',
    'font-family': 'fontFamily',
    'font-weight': 'fontWeight',
    'text-anchor': 'textAnchor',
    'dominant-baseline': 'dominantBaseline',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'stroke-dashoffset': 'strokeDashoffset',
    'vector-effect': 'vectorEffect',
    'clip-path': 'clipPath',
    'flood-color': 'floodColor',
    'flood-opacity': 'floodOpacity',
    'lighting-color': 'lightingColor',
    'color-interpolation-filters': 'colorInterpolationFilters',
    'marker-end': 'markerEnd',
    'marker-mid': 'markerMid',
    'marker-start': 'markerStart',
    'shape-rendering': 'shapeRendering',
    'text-decoration': 'textDecoration',
    'writing-mode': 'writingMode',
    'pointer-events': 'pointerEvents',
    xmlns: 'xmlns',
    viewbox: 'viewBox',
    'view-box': 'viewBox',
    version: 'version',
    cx: 'cx',
    cy: 'cy',
    r: 'r',
    x: 'x',
    y: 'y',
    width: 'width',
    height: 'height',
    d: 'd',
    points: 'points',
    'font-style': 'fontStyle',
    'letter-spacing': 'letterSpacing',
    'word-spacing': 'wordSpacing',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    fontsize: 'fontSize',
    textanchor: 'textAnchor',
    fontweight: 'fontWeight',
    fontstyle: 'fontStyle',
    strokewidth: 'strokeWidth',
    strokedasharray: 'strokeDasharray',
    markerend: 'markerEnd',
    fillopacity: 'fillOpacity',
    strokelinecap: 'strokeLinecap',
    strokelinejoin: 'strokeLinejoin',
    preserveaspectratio: 'preserveAspectRatio',
    gradientunits: 'gradientUnits',
    gradienttransform: 'gradientTransform',
    spreadmethod: 'spreadMethod',
    patternunits: 'patternUnits',
    patterncontentunits: 'patternContentUnits',
    patterntransform: 'patternTransform',
    clippathunits: 'clipPathUnits',
    maskunits: 'maskUnits',
    maskcontentunits: 'maskContentUnits',
    stddeviation: 'stdDeviation',
    numoctaves: 'numOctaves',
    basefrequency: 'baseFrequency',
    kernelmatrix: 'kernelMatrix',
    specularconstant: 'specularConstant',
    specularexponent: 'specularExponent',
    surfacescale: 'surfaceScale',
    targetx: 'targetX',
    targety: 'targetY',
    edgemode: 'edgeMode',
    diffuseconstant: 'diffuseConstant',
    xchannelselector: 'xChannelSelector',
    ychannelselector: 'yChannelSelector',
    fontfamily: 'fontFamily',
    x1: 'x1',
    y1: 'y1',
    x2: 'x2',
    y2: 'y2',
    rx: 'rx',
    ry: 'ry',
    markerwidth: 'markerWidth',
    markerheight: 'markerHeight',
    refx: 'refX',
    refy: 'refY',
    orient: 'orient',
  };

  const fixSvgProps = (props: any) => {
    if (!props) return {};
    const newProps: any = {};
    const skipProps = ['node', 'index', 'siblings', 'parent'];
    
    for (const key in props) {
      if (skipProps.includes(key)) continue;
      
      const lowerKey = key.toLowerCase();
      if (svgAttributeMap[lowerKey]) {
        newProps[svgAttributeMap[lowerKey]] = props[key];
      } else if (key === 'class') {
        newProps.className = props[key];
      } else {
        newProps[key] = props[key];
      }
    }
    return newProps;
  };

  const fixSvgTree = (nodes: React.ReactNode): React.ReactNode => {
    return React.Children.map(nodes, node => {
      if (!React.isValidElement(node)) return node;
      
      const nodeProps = node.props as any;
      const newProps = fixSvgProps(nodeProps);
      const children = nodeProps.children ? fixSvgTree(nodeProps.children) : null;
      
      return React.createElement(node.type as any, { ...newProps }, children);
    });
  };

  const handleStartLearning = () => {
    setCurrentChapterIndex(firstVisibleChapterIndex);
  };

  const handleResetLearning = () => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะรีเซตประวัติการเรียนในวิชานี้? ข้อมูลการเรียนจะถูกลบทั้งหมด')) return;

    const resetProgress = async () => {
      setCompletedChapters(new Set());
      const user = getStoredUser();
      if (user && topic) {
        try {
          await userActivityService.resetTopicProgress(user.id, topic.id);
          const chapterIds = hasChapters ? topic.chapters!.map(chapter => chapter.id) : [topic.id];
          await userActivityService.resetStudyTime(user.id, chapterIds);
        } catch (error) {
          console.error(error);
        }
      }
      setCurrentChapterIndex(initialChapterIndex);
    };

    resetProgress();
  };

  const [expandedPart, setExpandedPart] = useState<string | null>(null);

  // Set default expanded part on component mount
  useEffect(() => {
    if (topic.topicParts && topic.topicParts.length > 0) {
      setExpandedPart(topic.topicParts[0].id);
    }
  }, [topic]);

  const renderTOC = () => {
    return (
      <div className="lesson-overview-toc mx-auto max-w-5xl animate-[sobkruRise_.45s_ease-out_both]">
        <div className="lesson-overview-header mb-10 text-center">
          <p className="lesson-overview-pill mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm">
            <BookOpenCheck className="h-4 w-4" />
            Lesson Overview
          </p>
          <h1 className="lesson-overview-title mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
            สารบัญบทเรียน: {topic.title}
          </h1>
          <p className="lesson-overview-subtitle mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-500">
            ภาพรวมเนื้อหาและลำดับการเรียนรู้ เลือกบทที่ต้องการเริ่ม หรือเรียนต่อจากจุดที่ค้างไว้ได้ทันที
          </p>
        </div>

        <div className="lesson-overview-actions mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <button onClick={handleStartLearning} className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-10 py-4 text-lg font-black text-slate-950 shadow-[0_18px_45px_rgba(245,158,11,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(245,158,11,.28)]">
            <Play className="h-6 w-6 fill-current transition group-hover:scale-110" />
            เริ่มต้นเรียน
          </button>
          {completedChapters.size > 0 && (
            <button onClick={handleResetLearning} className="inline-flex items-center justify-center gap-3 rounded-full border border-rose-200 bg-white px-10 py-4 text-lg font-black text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50">
              <AlertCircle className="h-6 w-6" />
              รีเซตการเรียนของฉัน
            </button>
          )}
        </div>

        {topic.topicParts ? (
          <div className="space-y-4">
            {topic.topicParts.map((part, partIndex) => {
              const partChapters = topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => c.chapter.part === part.id && shouldShowLessonChapter(c.chapter)) || [];
              const isExpanded = expandedPart === part.id;
              const headerColor = lessonAccentClasses[partIndex % lessonAccentClasses.length];
              
              return (
                <div
                  key={part.id}
                  className="lesson-overview-part-card animate-[sobkruCardStack_.45s_ease-out_both] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition hover:-translate-y-0.5"
                  style={{ animationDelay: `${partIndex * 70}ms` }}
                >
                  <button 
                    onClick={() => setExpandedPart(isExpanded ? null : part.id)}
                    className={`lesson-overview-part-toggle flex w-full items-center justify-between gap-4 border-l-4 px-6 py-5 text-left transition-colors ${headerColor}`}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="lesson-overview-part-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                        <BookOpen className="h-6 w-6 opacity-80" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="lesson-overview-part-title text-lg font-black text-slate-900 md:text-xl">{part.title}</h3>
                        <p className="lesson-overview-part-count mt-1 text-sm font-bold opacity-70">{partChapters.length} บทเรียน</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="h-6 w-6 text-slate-500" /> : <ChevronRight className="h-6 w-6 text-slate-500" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="lesson-overview-chapters divide-y divide-slate-100">
                      {partChapters.map(({ chapter, idx }) => (
                        <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="lesson-overview-chapter-row group flex cursor-pointer items-start gap-4 p-5 transition-all duration-300 hover:bg-slate-50 md:p-6">
                          <div className="mt-1">
                            {completedChapters.has(idx) ? (
                              <CheckCircle className="h-7 w-7 text-emerald-500" />
                            ) : (
                              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-300 transition-colors group-hover:border-amber-400 group-hover:bg-amber-50">
                                <span className="text-xs font-black text-slate-400 group-hover:text-amber-600">{idx + 1}</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className={`lesson-overview-chapter-title text-lg font-black transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-slate-900 group-hover:text-amber-700'}`}>{chapter.title}</h4>
                          </div>
                          <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Orphan Chapters (e.g. Global Quiz) */}
            {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).length! > 0 && (
              <div className="lesson-overview-part-card mt-6 overflow-hidden rounded-[28px] border border-slate-200 border-l-4 border-l-rose-500 bg-white shadow-xl shadow-rose-100/50">
                <div className="lesson-overview-chapters divide-y divide-slate-100">
                  {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                    <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="lesson-overview-chapter-row group flex cursor-pointer items-start gap-4 bg-rose-50/30 p-6 transition-colors hover:bg-rose-50">
                      <div className="mt-1">
                        {completedChapters.has(idx) ? (
                          <CheckCircle className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-rose-300 transition-colors group-hover:border-rose-400">
                            <span className="text-xs font-black text-rose-400 group-hover:text-rose-500">{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className={`lesson-overview-chapter-title font-bold text-lg mb-1 transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-rose-900 group-hover:text-rose-700'}`}>{chapter.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lesson-overview-flat-card overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="lesson-overview-flat-head border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h3 className="flex items-center gap-2 text-lg font-black text-slate-800">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                เนื้อหาทั้งหมด ({visibleChapterTotal} บทเรียน)
              </h3>
            </div>
            <div className="lesson-overview-chapters divide-y divide-slate-100">
              {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="lesson-overview-chapter-row group flex cursor-pointer items-start gap-4 p-6 transition-colors hover:bg-slate-50">
                  <div className="mt-1">
                    {completedChapters.has(idx) ? (
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300 transition-colors group-hover:border-amber-400">
                        <span className="text-xs font-black text-slate-400 group-hover:text-amber-500">{idx + 1}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`lesson-overview-chapter-title font-bold text-lg mb-1 transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-slate-900 group-hover:text-indigo-700'}`}>{chapter.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const currentPart = hasChapters && currentChapter ? topic.topicParts?.find(p => p.id === currentChapter.part) : null;
  const currentPdfUrl = hasChapters ? currentChapter?.summaryPdfUrl : topic.summaryPdfUrl;
  const readingProgressPercent = hasChapters && visibleChapterTotal > 0 && currentVisiblePosition > 0
    ? Math.round((currentVisiblePosition / visibleChapterTotal) * 100)
    : 100;
  const readingStatusLabel = hasChapters && visibleChapterTotal > 0 && currentVisiblePosition > 0
    ? `${currentVisiblePosition}/${visibleChapterTotal} บทเรียน`
    : 'บทเรียนเดียว';

  const renderReadingHeader = () => (
    <div className="lesson-reading-status">
      <div className="lesson-reading-status__main">
        <span className="lesson-reading-status__pill">
          <BookOpenCheck className="h-4 w-4" />
          Lesson Content
        </span>
        <div className="lesson-reading-status__text">
          <span>{currentPart?.title || topic.title}</span>
        </div>
      </div>
      <div className="lesson-reading-status__progress" aria-label={`อ่านถึง ${readingProgressPercent}%`}>
        <div className="lesson-reading-status__meta">
          <span>{readingStatusLabel}</span>
          <strong>{readingProgressPercent}%</strong>
        </div>
        <div className="lesson-reading-status__track">
          <div style={{ width: `${readingProgressPercent}%` }} />
        </div>
      </div>
    </div>
  );

  const SvgComponent = (props: any) => {
    const { children, ...rest } = props;

    return (
      <SvgContext.Provider value={true}>
        <div className="svg-container flex justify-center my-6 overflow-x-auto w-full">
          <svg {...fixSvgProps(rest)}>{fixSvgTree(children)}</svg>
        </div>
      </SvgContext.Provider>
    );
  };

  const markdownComponents: Components = {
    h1: ({ children }) => (
      <div className="lesson-chapter-hero">
        <div className="lesson-chapter-hero__icon">
          <BookOpen className="h-7 w-7" />
        </div>
        <h1>
          {children}
        </h1>
      </div>
    ),
    h2: ({ children }) => (
      <h2 className="lesson-section-heading">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="lesson-subheading">
        <Star className="h-5 w-5 flex-shrink-0" />
        {children}
      </h3>
    ),
    p: ({ children }) => {
      return <p className="lesson-copy">{children}</p>;
    },
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
    ul: ({ children }) => {
      const depth = useContext(ListDepthContext);
      return (
        <ListDepthContext.Provider value={depth + 1}>
          <ul className={`lesson-list lesson-list--unordered ${depth > 0 ? 'lesson-list--nested' : ''}`}>{children}</ul>
        </ListDepthContext.Provider>
      );
    },
    ol: ({ children }) => {
      const depth = useContext(ListDepthContext);
      return (
        <ListDepthContext.Provider value={depth + 1}>
          <ol className={`lesson-list lesson-list--ordered ${depth > 0 ? 'lesson-list--nested' : ''}`}>{children}</ol>
        </ListDepthContext.Provider>
      );
    },
    li: ({ children }) => {
      const depth = useContext(ListDepthContext);

      // Choose icon based on depth (depth starts at 1 for top-level list because ul/ol adds 1)
      let Icon = CheckCircle;
      let iconColor = "text-green-600";
      let bgColor = "bg-green-100";

      if (depth === 2) {
        Icon = ArrowRight;
        iconColor = "text-indigo-500";
        bgColor = "bg-indigo-50";
      } else if (depth >= 3) {
        Icon = Star;
        iconColor = "text-amber-500";
        bgColor = "bg-amber-50";
      }

      return (
        <li className="lesson-list-item group">
          <div className={`lesson-list-item__icon ${bgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div className="lesson-list-item__content">{children}</div>
        </li>
      );
    },
    blockquote: ({ children }) => (
      <div className="lesson-callout">
        <div className="lesson-callout__icon">
          <Lightbulb className="h-6 w-6" />
        </div>
        <div className="lesson-callout__body">
          <span>สูตรสำคัญที่ต้องจำ</span>
          <div className="doc-formula">{children}</div>
        </div>
      </div>
    ),
    strong: ({ children }) => (
      <strong className="lesson-inline-strong">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="lesson-inline-em">{children}</em>
    ),
    table: ({ children }) => (
      <div className="lesson-table-wrap">
        <table>{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    th: ({ children }) => <th>{children}</th>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    td: ({ children }) => <td>{children}</td>,
    br: () => <br />,
    img: ({ src, alt, className, ...props }: any) => {
      const imageUrl = src ? (getGoogleDriveImageUrl(src) || src) : '';
      return (
        <div className="lesson-image-frame">
          <img src={imageUrl} alt={alt || ""} referrerPolicy="no-referrer" className={className || ''} {...props} />
        </div>
      );
    },
    // Handle SVG elements specifically to fix attribute casing from rehype-raw
    svg: (props: any) => <SvgComponent {...props} />,
    text: function SvgText(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <text {...fixSvgProps(props)}>{props.children}</text>; },
    path: function SvgPath(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <path {...fixSvgProps(props)}>{props.children}</path>; },
    line: function SvgLine(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <line {...fixSvgProps(props)}>{props.children}</line>; },
    rect: function SvgRect(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <rect {...fixSvgProps(props)}>{props.children}</rect>; },
    circle: function SvgCircle(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <circle {...fixSvgProps(props)}>{props.children}</circle>; },
    g: function SvgG(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <g {...fixSvgProps(props)}>{props.children}</g>; },
    defs: function SvgDefs(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <defs {...fixSvgProps(props)}>{props.children}</defs>; },
    linearGradient: function SvgLinearGradient(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <linearGradient {...fixSvgProps(props)}>{props.children}</linearGradient>; },
    stop: function SvgStop(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <stop {...fixSvgProps(props)}>{props.children}</stop>; },
    tspan: function SvgTspan(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <tspan {...fixSvgProps(props)}>{props.children}</tspan>; },
    polygon: function SvgPolygon(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <polygon {...fixSvgProps(props)}>{props.children}</polygon>; },
    polyline: function SvgPolyline(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <polyline {...fixSvgProps(props)}>{props.children}</polyline>; },
    ellipse: function SvgEllipse(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <ellipse {...fixSvgProps(props)}>{props.children}</ellipse>; },
    marker: function SvgMarker(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <marker {...fixSvgProps(props)}>{props.children}</marker>; },
    symbol: function SvgSymbol(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <symbol {...fixSvgProps(props)}>{props.children}</symbol>; },
    use: function SvgUse(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <use {...fixSvgProps(props)}>{props.children}</use>; },
    clipPath: function SvgClipPath(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <clipPath {...fixSvgProps(props)}>{props.children}</clipPath>; },
    mask: function SvgMask(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <mask {...fixSvgProps(props)}>{props.children}</mask>; },
    image: function SvgImage(props: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <image {...fixSvgProps(props)}>{props.children}</image>; },
  };

  return (
    <div className={`flex flex-1 justify-center transition-colors duration-500 ${
      isDark
        ? 'lesson-dark bg-[radial-gradient(circle_at_84%_0%,rgba(250,204,21,.12),transparent_28%),radial-gradient(circle_at_12%_12%,rgba(99,102,241,.14),transparent_26%),linear-gradient(180deg,#10131d_0%,#0d1220_44%,#080d18_100%)] text-slate-100'
        : 'lesson-light bg-[radial-gradient(circle_at_84%_0%,rgba(180,83,9,.06),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f3f5f8_100%)]'
    }`}>
      <div className="relative flex w-full max-w-[1600px]">
      <aside className={`fixed md:sticky z-40 w-80 bg-white/92 border-r border-slate-200/80 h-[calc(100vh-73px)] transform transition-transform duration-300 ease-in-out flex flex-col top-[73px] shadow-2xl shadow-slate-900/10 backdrop-blur-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
            <button onClick={onBack} className="flex max-w-full items-center gap-1.5 rounded-full px-3 py-2 text-left text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="leading-tight">{getLessonGalleryBackLabel(topic.id)}</span>
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400"><ChevronLeft className="w-6 h-6" /></button>
        </div>
        <div className="p-6">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-amber-500">Learning Path</p>
            <h2 className="mb-3 text-xl font-black leading-tight text-slate-950">{topic.title}</h2>
            <div className="mt-2 mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-emerald-400 transition-all duration-500" style={{ width: `${hasChapters && visibleChapterTotal > 0 ? (visibleCompletedCount / visibleChapterTotal) * 100 : 0}%` }}></div>
            </div>
            <p className="text-right text-xs font-black uppercase tracking-[0.12em] text-slate-400">{hasChapters && visibleChapterTotal > 0 ? `${Math.round((visibleCompletedCount / visibleChapterTotal) * 100)}% Complete` : ''}</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8 space-y-2">
            {hasChapters ? (
                <>
                    {visibleChapterTotal > 1 && (
                        <button onClick={() => handleSelectChapter(-1)} className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all ${-1 === currentChapterIndex ? 'bg-amber-50 ring-1 ring-amber-200 text-amber-700 shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}>
                            <div className="mt-0.5"><BookOpen className={`w-5 h-5 ${-1 === currentChapterIndex ? 'text-indigo-600' : 'text-slate-400'}`} /></div>
                            <div className="flex-1"><span className="text-sm font-bold block">สารบัญบทเรียน</span></div>
                        </button>
                    )}
                    {topic.topicParts ? (
                        <div className="space-y-3 mt-4">
                            {topic.topicParts.map((part, partIndex) => {
                                const partChapters = topic.chapters!.map((chapter, idx) => ({ chapter, idx })).filter(item => item.chapter.part === part.id && shouldShowLessonChapter(item.chapter));
                                const isExpanded = expandedPart === part.id;
                                const partToneClass = getLessonToneClass(partIndex);
                                
                                return (
                                    <div key={part.id} className={`lesson-sidebar-part-card ${partToneClass} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm`}>
                                        <button 
                                            onClick={() => setExpandedPart(isExpanded ? null : part.id)}
                                            className="lesson-sidebar-part-toggle flex w-full items-center justify-between bg-slate-950 p-4 text-left text-white transition-colors hover:bg-slate-900"
                                        >
                                            <div className="flex items-center gap-3">
                                                <BookOpen className="w-5 h-5 opacity-80" />
                                                <h3 className="font-bold text-sm leading-tight">{part.title}</h3>
                                            </div>
                                            {isExpanded ? <ChevronDown className="w-5 h-5 opacity-80" /> : <ChevronRight className="w-5 h-5 opacity-80" />}
                                        </button>
                                        
                                        {isExpanded && (
                                            <div className="divide-y divide-slate-100 bg-white">
                                                {partChapters.map(({ chapter, idx }, chapterIndex) => (
                                                    <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`lesson-sidebar-chapter-button ${getLessonToneClass(partIndex + chapterIndex)} w-full text-left p-3 flex items-start gap-3 transition-all ${idx === currentChapterIndex ? 'is-active bg-amber-50 border-l-4 border-amber-400 text-amber-700' : 'hover:bg-slate-50 text-slate-600'} ${completedChapters.has(idx) ? 'is-completed' : ''}`}>
                                                        <div className="mt-0.5">{idx === currentChapterIndex ? <PlayCircle className="w-5 h-5 text-indigo-600 fill-indigo-100" /> : completedChapters.has(idx) ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>}</div>
                                                        <div className="flex-1"><span className="text-sm font-medium block">{chapter.title}</span></div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Orphan Chapters for Sidebar */}
                            {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).length! > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                                        <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`lesson-sidebar-chapter-button lesson-menu-tone-rose w-full text-left p-4 rounded-2xl flex items-center gap-3 transition-all mb-2 ${idx === currentChapterIndex ? 'is-active bg-rose-50 border border-rose-200 text-rose-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent'} ${completedChapters.has(idx) ? 'is-completed' : ''}`}>
                                            <div className="mt-0.5">{idx === currentChapterIndex ? <PlayCircle className="w-5 h-5 text-rose-600 fill-rose-100" /> : completedChapters.has(idx) ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white"></div>}</div>
                                            <div className="flex-1 text-sm font-bold block leading-snug">{chapter.title}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        topic.chapters!.map((chapter, idx) => ({ chapter, idx })).filter(c => shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                            <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`lesson-sidebar-chapter-button ${getLessonToneClass(idx)} w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all ${idx === currentChapterIndex ? 'is-active bg-amber-50 border-l-4 border-amber-400 text-amber-700' : 'hover:bg-slate-50 text-slate-600'} ${completedChapters.has(idx) ? 'is-completed' : ''}`}>
                                <div className="mt-0.5">{idx === currentChapterIndex ? <PlayCircle className="w-5 h-5 text-indigo-600 fill-indigo-100" /> : completedChapters.has(idx) ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>}</div>
                                <div className="flex-1"><span className="text-sm font-medium block">{chapter.title}</span></div>
                            </button>
                        ))
                    )}
                </>
            ) : <div className="rounded-2xl bg-amber-50 p-3 text-sm font-bold text-amber-700">บทเรียนแบบหน้าเดียว</div>}
        </div>
      </aside>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      <main className="relative flex min-w-0 flex-1 flex-col bg-transparent">
        <div className="sticky top-[73px] z-20 flex items-center border-b border-slate-200 bg-white/90 p-4 backdrop-blur md:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="mr-3 text-slate-600"><Menu className="w-6 h-6" /></button>
            <span className="font-bold text-slate-800 truncate">{hasChapters ? currentChapter?.title : topic.title}</span>
        </div>

        <div className="relative flex-1 p-5 md:p-8 lg:p-10" ref={contentRef}>
            <div className="mx-auto min-h-full w-full">
                <div className="pb-16">
                    {isLoading ? <div className="flex flex-col items-center justify-center py-20 text-slate-400"><Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" /><p>กำลังโหลดเนื้อหา...</p></div> : error ? <div className="text-center py-20 text-red-500"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><p>{error}</p></div> : (
                        <div className="lesson-markdown">
                            {hasChapters && currentChapterIndex === -1 ? (
                                renderTOC()
                            ) : SHOW_LESSON_ASSESSMENTS && hasChapters && currentChapter?.isQuiz && !isPartBLesson ? (
                                <div className="lesson-reader mx-auto w-full max-w-[1240px]">
                                    {renderReadingHeader()}
                                    <div className="prose prose-slate max-w-none mb-12">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{content}</ReactMarkdown>
                                    </div>
                                    <div className="mt-12 pt-8 border-t-2 border-slate-100">
                                        <QuizGenerator topicId={currentPart ? `${topic.id}:${currentPart.id}` : topic.id} content={currentPart ? topic.chapters!.filter(c => c.part === currentPart.id && !c.isQuiz).map(c => c.content).join('\n\n') : fullLessonContent} />
                                    </div>
                                </div>
                            ) : (
                                <div className="lesson-reader mx-auto w-full max-w-[1240px]">
                                    {renderReadingHeader()}
                                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{content}</ReactMarkdown>
                                    
                                    {/* Comprehension Check Section for standard chapters */}
                                    {SHOW_LESSON_ASSESSMENTS && hasChapters && !currentChapter?.isQuiz && topic.id !== "A3-0" && !isPartBLesson && !(currentPart ? topic.chapters?.some(c => c.part === currentPart.id && c.isQuiz) : topic.chapters?.some(c => c.isQuiz)) && (
                                        <div className="mt-16 pt-8 border-t-2 border-slate-200 bg-slate-50/50 p-6 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-800">ทดสอบความเข้าใจประจำส่วนนี้</h3>
                                                    <p className="text-sm text-slate-500 font-medium">ลองทำแบบฝึกหัดสั้นๆ เพื่อทบทวนสิ่งที่เราเพิ่งเรียนไป</p>
                                                </div>
                                            </div>
                                            <QuizGenerator topicId={currentPart ? `${topic.id}:${currentPart.id}` : topic.id} content={currentPart ? topic.chapters!.filter(c => c.part === currentPart.id).map(c => c.content).join('\n\n') : content} />
                                        </div>
                                    )}
                                    {currentPdfUrl && <div className="mt-8 mb-8 flex justify-center"><a href={currentPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"><FileText className="w-5 h-5" /><span>ดาวน์โหลดสรุปเนื้อหา (PDF)</span></a></div>}
                                </div>
                            )}
                        </div>
                    )}
                    {currentChapterIndex !== -1 && (
                        <div className="lesson-next-bar mx-auto w-full max-w-[1240px]"><button onClick={handleNextStep} className="lesson-next-button"><span>{isLastVisibleChapter ? "ฉันเข้าใจบทเรียนนี้แล้ว (กลับไปหน้าความรู้ความสามารถทั่วไป)" : "บทเรียนถัดไป"}</span><ArrowRight className="w-6 h-6" /></button></div>
                    )}
                </div>
            </div>
        </div>

        {SHOW_AI_TUTOR && !isLoading && !error && <ChatBot context={fullLessonContent} topicTitle={topic.title} />}
      </main>
      </div>
    </div>
  );
};

export default LessonView;
