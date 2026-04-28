
import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Loader2, AlertCircle, BookOpen, Lightbulb, Star, CheckCircle, PlayCircle, Menu, ArrowRight, FileText, Play } from 'lucide-react';
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
}

// Keep post-lesson assessments in the codebase, but hide them from lessons for now.
const SHOW_LESSON_ASSESSMENTS = false;
// Keep AI Tutor available in code, but hide the floating chat from lessons for now.
const SHOW_AI_TUTOR = false;
const shouldShowLessonChapter = (chapter: LessonChapter) => SHOW_LESSON_ASSESSMENTS || !chapter.isQuiz;

const LessonView: React.FC<LessonViewProps> = ({ topic, onBack }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  const [fullLessonContent, setFullLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Chapter State
  const hasChapters = topic.chapters && topic.chapters.length > 0;
  const isPartBLesson = topic.id.startsWith('B');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(hasChapters && topic.chapters!.length > 1 ? -1 : 0);
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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
          // Use topic.id instead of chapterId for better aggregation in admin stats
          await userActivityService.incrementStudyTime(user.id, topic.id, timeSpentSeconds);
          lastSaveTime = now;
        } catch (error) {
          console.error('Error saving learning time', error);
        }
      }

      // Heartbeat to track online status
      try {
        await userActivityService.updateUserSession(user.id, user.name, `learning:${topic.title}`);
      } catch (err) {
        // ignore
      }
    };

    const interval = setInterval(saveTime, 10000); // Save every 10 seconds (reduced frequency)

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
      setCurrentChapterIndex(-1);
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">สารบัญบทเรียน: {topic.title}</h1>
          <p className="text-lg text-slate-600">ภาพรวมเนื้อหาและลำดับการเรียนรู้</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button onClick={handleStartLearning} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-3 transform hover:scale-105 text-lg">
            <Play className="w-6 h-6 fill-current" />
            เริ่มต้นเรียน
          </button>
          {completedChapters.size > 0 && (
            <button onClick={handleResetLearning} className="bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-3 text-lg">
              <AlertCircle className="w-6 h-6" />
              รีเซตการเรียนของฉัน
            </button>
          )}
        </div>

        {/* Chapter List */}
        {topic.topicParts ? (
          <div className="space-y-4">
            {topic.topicParts.map((part, partIndex) => {
              const partChapters = topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => c.chapter.part === part.id && shouldShowLessonChapter(c.chapter)) || [];
              const isExpanded = expandedPart === part.id;
              
              const colorSchemes = [
                "bg-blue-50 hover:bg-blue-100 border-l-4 border-l-blue-500",
                "bg-green-50 hover:bg-green-100 border-l-4 border-l-green-500",
                "bg-orange-50 hover:bg-orange-100 border-l-4 border-l-orange-500",
                "bg-purple-50 hover:bg-purple-100 border-l-4 border-l-purple-500",
                "bg-pink-50 hover:bg-pink-100 border-l-4 border-l-pink-500"
              ];
              const headerColor = colorSchemes[partIndex % colorSchemes.length];
              
              return (
                <div key={part.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setExpandedPart(isExpanded ? null : part.id)}
                    className={`w-full px-6 py-5 transition-colors text-left flex items-center justify-between border-b border-slate-200 ${headerColor}`}
                  >
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-3">
                      <BookOpen className="w-5 h-5 opacity-80" />
                      {part.title} ({partChapters.length} บทเรียน)
                    </h3>
                    {isExpanded ? <ChevronDown className="w-6 h-6 text-slate-500" /> : <ChevronRight className="w-6 h-6 text-slate-500" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="divide-y divide-slate-100">
                      {partChapters.map(({ chapter, idx }) => (
                        <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-4 group">
                          <div className="mt-1">
                            {completedChapters.has(idx) ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-400 transition-colors flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-500">{idx + 1}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className={`font-bold text-lg mb-1 transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-slate-900 group-hover:text-indigo-700'}`}>{chapter.title}</h4>
                            <p className="text-slate-500 text-sm">คลิกเพื่อเข้าสู่บทเรียน</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Orphan Chapters (e.g. Global Quiz) */}
            {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).length! > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mt-6 shadow-sm border-l-4 border-l-rose-500">
                <div className="divide-y divide-slate-100">
                  {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => !c.chapter.part && shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                    <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="p-6 hover:bg-rose-50 transition-colors cursor-pointer flex items-start gap-4 group bg-rose-50/30">
                      <div className="mt-1">
                        {completedChapters.has(idx) ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-rose-300 group-hover:border-rose-400 transition-colors flex items-center justify-center">
                            <span className="text-xs font-bold text-rose-400 group-hover:text-rose-500">{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-rose-900 group-hover:text-rose-700'}`}>{chapter.title}</h4>
                        <p className="text-rose-500 text-sm">คลิกเพื่อเข้าสู่บทเรียน</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                เนื้อหาทั้งหมด ({visibleChapterTotal} บทเรียน)
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {topic.chapters?.map((chapter, idx) => ({ chapter, idx })).filter(c => shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                <div key={chapter.id} onClick={() => handleSelectChapter(idx)} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-4 group">
                  <div className="mt-1">
                    {completedChapters.has(idx) ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-400 transition-colors flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-500">{idx + 1}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg mb-1 transition-colors ${completedChapters.has(idx) ? 'text-slate-700' : 'text-slate-900 group-hover:text-indigo-700'}`}>{chapter.title}</h4>
                    <p className="text-slate-500 text-sm">คลิกเพื่อเข้าสู่บทเรียน</p>
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
      <div className="border-b-4 border-indigo-500 pb-4 mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-indigo-600 flex-shrink-0" />
          <span>{children}</span>
        </h1>
      </div>
    ),
    h2: ({ children }) => (
      <div className="flex items-center mt-12 mb-6 sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm py-2">
        <div className="w-2 h-10 bg-orange-500 rounded-lg mr-4"></div>
        <h2 className="text-2xl font-bold text-slate-800 bg-slate-50 px-4 py-2 rounded-lg w-full border border-slate-100">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-indigo-700 mt-8 mb-4 flex items-center gap-2 border-b border-indigo-100 pb-2 w-fit pr-8">
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0" />
        {children}
      </h3>
    ),
    p: ({ children }) => {
      return <div className="text-slate-700 leading-relaxed mb-4 text-lg font-normal">{children}</div>;
    },
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
    ul: ({ children }) => {
      const depth = useContext(ListDepthContext);
      return (
        <ListDepthContext.Provider value={depth + 1}>
          <ul className={`list-none mb-6 space-y-3 ${depth > 0 ? 'ml-6 mt-3' : 'ml-2'}`}>{children}</ul>
        </ListDepthContext.Provider>
      );
    },
    ol: ({ children }) => {
      const depth = useContext(ListDepthContext);
      return (
        <ListDepthContext.Provider value={depth + 1}>
          <ol className={`list-decimal mb-6 space-y-3 ${depth > 0 ? 'ml-6 mt-3' : 'ml-6'}`}>{children}</ol>
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
        <li className="flex items-start gap-3 text-slate-700 text-lg group">
          <div className={`mt-1.5 flex-shrink-0 ${bgColor} rounded-full p-0.5`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="flex-1 group-hover:text-slate-900 transition-colors">{children}</div>
        </li>
      );
    },
    blockquote: ({ children }) => (
      <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-indigo-500 rounded-r-xl relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 opacity-5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
          <BookOpen className="w-40 h-40 text-indigo-700" />
        </div>
        <div className="relative z-10 flex gap-4">
           <div className="flex-shrink-0 mt-1 bg-white p-3 rounded-full h-fit border border-indigo-100/50"><Lightbulb className="w-6 h-6 text-indigo-500 fill-indigo-100" /></div>
           <div className="text-indigo-900 text-lg space-y-2 font-medium w-full">
             <span className="block text-sm font-bold text-indigo-600 tracking-wider mb-2 flex items-center gap-2"><span className="w-6 h-0.5 bg-indigo-600"></span>สูตรสำคัญที่ต้องจำ</span>
             <div className="leading-relax bg-white/60 p-4 rounded-lg border border-white doc-formula">{children}</div>
           </div>
        </div>
      </div>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-indigo-700 bg-indigo-50 px-1 rounded-md border-b-[2px] border-indigo-200">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-pink-600 font-medium not-italic bg-pink-50 px-1 rounded-sm border-b-[2px] border-pink-200">{children}</em>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-xl border-2 border-indigo-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[700px]">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-indigo-600 text-white uppercase text-base font-bold tracking-wider border-b-2 border-indigo-200">{children}</thead>,
    th: ({ children }) => <th className="px-6 py-4 whitespace-nowrap text-center border-r border-indigo-200 last:border-r-0">{children}</th>,
    tbody: ({ children }) => <tbody className="divide-y divide-indigo-200">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-indigo-50/80 transition-colors even:bg-indigo-50/40">{children}</tr>,
    td: ({ children }) => <td className="px-6 py-4 text-slate-700 align-top text-lg border-r border-indigo-200 last:border-r-0">{children}</td>,
    br: () => <br />,
    img: ({ src, alt, className, ...props }: any) => {
      const imageUrl = src ? (getGoogleDriveImageUrl(src) || src) : '';
      return (
        <div className="flex justify-center my-6">
          <img src={imageUrl} alt={alt || ""} referrerPolicy="no-referrer" className={`max-w-full h-auto rounded-xl shadow-md border border-slate-200 ${className || ''}`} {...props} />
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
    <div className="flex flex-1 bg-slate-50 justify-center">
      <div className="flex w-full max-w-[95%] xl:max-w-[1400px] relative">
      <aside className={`fixed md:sticky z-40 w-72 bg-white border-r border-slate-200 h-[calc(100vh-73px)] transform transition-transform duration-300 ease-in-out flex flex-col top-[73px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 flex items-center text-sm font-medium">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400"><ChevronLeft className="w-6 h-6" /></button>
        </div>
        <div className="p-6">
            <h2 className="font-bold text-lg text-slate-900 leading-tight mb-2">{topic.title}</h2>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 mb-4">
                <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${hasChapters && visibleChapterTotal > 0 ? (visibleCompletedCount / visibleChapterTotal) * 100 : 0}%` }}></div>
            </div>
            <p className="text-xs text-slate-400 font-medium text-right">{hasChapters && visibleChapterTotal > 0 ? `${Math.round((visibleCompletedCount / visibleChapterTotal) * 100)}% Complete` : ''}</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8 space-y-2">
            {hasChapters ? (
                <>
                    {visibleChapterTotal > 1 && (
                        <button onClick={() => handleSelectChapter(-1)} className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all ${-1 === currentChapterIndex ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                            <div className="mt-0.5"><BookOpen className={`w-5 h-5 ${-1 === currentChapterIndex ? 'text-indigo-600' : 'text-slate-400'}`} /></div>
                            <div className="flex-1"><span className="text-sm font-bold block">สารบัญบทเรียน</span></div>
                        </button>
                    )}
                    {topic.topicParts ? (
                        <div className="space-y-3 mt-4">
                            {topic.topicParts.map((part) => {
                                const partChapters = topic.chapters!.map((chapter, idx) => ({ chapter, idx })).filter(item => item.chapter.part === part.id && shouldShowLessonChapter(item.chapter));
                                const isExpanded = expandedPart === part.id;
                                
                                return (
                                    <div key={part.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                                        <button 
                                            onClick={() => setExpandedPart(isExpanded ? null : part.id)}
                                            className="w-full text-left p-4 bg-indigo-900 text-white flex items-center justify-between hover:bg-indigo-800 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <BookOpen className="w-5 h-5 opacity-80" />
                                                <h3 className="font-bold text-sm leading-tight">{part.title}</h3>
                                            </div>
                                            {isExpanded ? <ChevronDown className="w-5 h-5 opacity-80" /> : <ChevronRight className="w-5 h-5 opacity-80" />}
                                        </button>
                                        
                                        {isExpanded && (
                                            <div className="divide-y divide-slate-100 bg-white">
                                                {partChapters.map(({ chapter, idx }) => (
                                                    <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`w-full text-left p-3 flex items-start gap-3 transition-all ${idx === currentChapterIndex ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
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
                                        <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all mb-2 ${idx === currentChapterIndex ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent'}`}>
                                            <div className="mt-0.5">{idx === currentChapterIndex ? <PlayCircle className="w-5 h-5 text-rose-600 fill-rose-100" /> : completedChapters.has(idx) ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white"></div>}</div>
                                            <div className="flex-1 text-sm font-bold block leading-snug">{chapter.title}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        topic.chapters!.map((chapter, idx) => ({ chapter, idx })).filter(c => shouldShowLessonChapter(c.chapter)).map(({ chapter, idx }) => (
                            <button key={chapter.id} onClick={() => handleSelectChapter(idx)} className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all ${idx === currentChapterIndex ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                                <div className="mt-0.5">{idx === currentChapterIndex ? <PlayCircle className="w-5 h-5 text-indigo-600 fill-indigo-100" /> : completedChapters.has(idx) ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>}</div>
                                <div className="flex-1"><span className="text-sm font-medium block">{chapter.title}</span></div>
                            </button>
                        ))
                    )}
                </>
            ) : <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">บทเรียนแบบหน้าเดียว</div>}
        </div>
      </aside>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      <main className="flex-1 flex flex-col relative bg-slate-50/50 min-w-0">
        <div className="md:hidden bg-white p-4 border-b border-slate-200 flex items-center z-20 sticky top-[73px]">
            <button onClick={() => setIsSidebarOpen(true)} className="mr-3 text-slate-600"><Menu className="w-6 h-6" /></button>
            <span className="font-bold text-slate-800 truncate">{hasChapters ? currentChapter?.title : topic.title}</span>
        </div>

        <div className="flex-1 p-6 md:p-8 relative" ref={contentRef}>
            <div className="w-full mx-auto min-h-full">
                <div className="pb-16">
                    {isLoading ? <div className="flex flex-col items-center justify-center py-20 text-slate-400"><Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" /><p>กำลังโหลดเนื้อหา...</p></div> : error ? <div className="text-center py-20 text-red-500"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><p>{error}</p></div> : (
                        <div className="lesson-markdown">
                            {hasChapters && currentChapterIndex === -1 ? (
                                renderTOC()
                            ) : SHOW_LESSON_ASSESSMENTS && hasChapters && currentChapter?.isQuiz && !isPartBLesson ? (
                                <div className="w-full">
                                    <div className="prose prose-slate max-w-none mb-12">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{content}</ReactMarkdown>
                                    </div>
                                    <div className="mt-12 pt-8 border-t-2 border-slate-100">
                                        <QuizGenerator topicId={currentPart ? `${topic.id}:${currentPart.id}` : topic.id} content={currentPart ? topic.chapters!.filter(c => c.part === currentPart.id && !c.isQuiz).map(c => c.content).join('\n\n') : fullLessonContent} />
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    )}
                    {currentChapterIndex !== -1 && (
                        <div className="mt-12 pt-12 border-t border-slate-100 flex justify-center pb-8 w-full"><button onClick={handleNextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-full transition-all flex items-center gap-3 transform hover:scale-105 text-lg mx-auto"><span>{isLastVisibleChapter ? "ฉันเข้าใจบทเรียนนี้แล้ว (กลับไปหน้าความรู้ความสามารถทั่วไป)" : "บทเรียนถัดไป"}</span><ArrowRight className="w-6 h-6" /></button></div>
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
