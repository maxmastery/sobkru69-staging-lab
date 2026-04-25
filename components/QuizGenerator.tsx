
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { BrainCircuit, CheckCircle, XCircle, RefreshCw, Trophy, Loader2, ArrowRight, Settings, BarChart, ListOrdered, ChevronLeft, ChevronRight, Clock, AlertTriangle, LogOut, BookOpen, CheckSquare, Download, FileText, Printer } from 'lucide-react';
import { generateQuizFromContent } from '../services/geminiService';
import { QuizQuestion } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { getStoredUser, userActivityService } from '../services/userActivityService';

const SvgContext = createContext(false);

// SVG Attribute mapping for React rendering
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
  'font-style': 'fontStyle',
  'letter-spacing': 'letterSpacing',
  'word-spacing': 'wordSpacing',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'view-box': 'viewBox',
  viewbox: 'viewBox',
  'preserve-aspect-ratio': 'preserveAspectRatio',
  preserveaspectratio: 'preserveAspectRatio',
  'gradient-units': 'gradientUnits',
  gradientunits: 'gradientUnits',
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
  cx: 'cx',
  cy: 'cy',
  r: 'r',
  x: 'x',
  y: 'y',
  width: 'width',
  height: 'height',
  d: 'd',
  points: 'points',
  version: 'version',
  xmlns: 'xmlns',
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
    const children = nodeProps.children ? fixSvgTree(nodeProps.children) : null;
    return React.createElement(node.type as any, fixSvgProps(nodeProps), children);
  });
};

interface QuizGeneratorProps {
  content: string;
  topicId?: string;
}

// Helper to render Markdown and Math (for <u>, <b>, $ symbols from AI)
const RenderMarkdown = ({ content }: { content: string }) => (
  <ReactMarkdown 
    remarkPlugins={[remarkGfm, remarkMath]} 
    rehypePlugins={[rehypeRaw, rehypeKatex]}
    components={{
      p: ({ children }) => <div className="inline">{children}</div>,
      img: ({ src, alt, className, ...props }: any) => {
        let imageUrl = src;
        if (src) {
          const match = src.match(/\/d\/([a-zA-Z0-9_-]+)/) || src.match(/id=([a-zA-Z0-9_-]+)/) || src.match(/\/folders\/([a-zA-Z0-9_-]+)/);
          const id = match ? match[1] : null;
          if (id) {
            imageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
          }
        }
        return (
          <div className="flex justify-center my-6">
            <img src={imageUrl} alt={alt || ""} referrerPolicy="no-referrer" className={`max-w-full h-auto rounded-xl shadow-md border border-slate-200 ${className || ''}`} {...props} />
          </div>
        );
      },
      svg: ({ node, children, ...props }: any) => (
        <SvgContext.Provider value={true}>
          <div className="svg-container flex justify-center my-6 overflow-x-auto w-full bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
            <svg {...fixSvgProps(props)} className="max-w-full h-auto">
              {fixSvgTree(children)}
            </svg>
          </div>
        </SvgContext.Provider>
      ),
      text: function SvgText({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <text {...fixSvgProps(props)}>{children}</text>; },
      path: function SvgPath({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <path {...fixSvgProps(props)}>{children}</path>; },
      line: function SvgLine({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <line {...fixSvgProps(props)}>{children}</line>; },
      rect: function SvgRect({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <rect {...fixSvgProps(props)}>{children}</rect>; },
      circle: function SvgCircle({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <circle {...fixSvgProps(props)}>{children}</circle>; },
      g: function SvgG({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <g {...fixSvgProps(props)}>{children}</g>; },
      defs: function SvgDefs({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <defs {...fixSvgProps(props)}>{children}</defs>; },
      tspan: function SvgTspan({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <tspan {...fixSvgProps(props)}>{children}</tspan>; },
      polygon: function SvgPolygon({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <polygon {...fixSvgProps(props)}>{children}</polygon>; },
      polyline: function SvgPolyline({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <polyline {...fixSvgProps(props)}>{children}</polyline>; },
      marker: function SvgMarker({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <marker {...fixSvgProps(props)}>{children}</marker>; },
      symbol: function SvgSymbol({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <symbol {...fixSvgProps(props)}>{children}</symbol>; },
      use: function SvgUse({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <use {...fixSvgProps(props)}>{children}</use>; },
      linearGradient: function SvgLinearGradient({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <linearGradient {...fixSvgProps(props)}>{children}</linearGradient>; },
      stop: function SvgStop({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <stop {...fixSvgProps(props)}>{children}</stop>; },
      clipPath: function SvgClipPath({ node, children, ...props }: any) { const isSvg = useContext(SvgContext); if(!isSvg) return null; return <clipPath {...fixSvgProps(props)}>{children}</clipPath>; },
    }}
  >
    {content}
  </ReactMarkdown>
);

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ content, topicId }) => {
  const [status, setStatus] = useState<'idle' | 'setup' | 'loading' | 'taking' | 'finished'>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]); // Store all answers
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // Mode to show answers
  
  // Pagination State
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  
  // Setup States
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [subTopics, setSubTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Timer State
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const optionPrefixes = ['ก', 'ข', 'ค', 'ง'];

  // Extract Sub-topics from Markdown content
  useEffect(() => {
    if (content) {
      // Find all headers (H1 only for main chapters)
      const headers = content.match(/^#\s+(.+)$/gm);
      if (headers) {
        const topics = headers
            .map(h => h.replace(/^#\s+/, '').trim())
            .filter(topic => !topic.includes("สรุปภาพรวม") && !topic.includes("Key Takeaways"));
        setSubTopics(topics);
      }
    }
  }, [content]);

  // Timer Logic
  useEffect(() => {
    if (status === 'taking') {
      setStartTime(Date.now());
      timerRef.current = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getSpeedAnalysis = () => {
    const avgTimePerQuestion = elapsedTime / questions.length;
    if (avgTimePerQuestion < 30) return { text: "เร็วมาก (Fast)", color: "text-green-600" };
    if (avgTimePerQuestion < 60) return { text: "ปานกลาง (Average)", color: "text-blue-600" };
    return { text: "ช้า (Slow)", color: "text-orange-600" };
  };

  const handleStartSetup = () => {
    setStatus('setup');
  };

  const startQuiz = async () => {
    setStatus('loading');
    const quizData = await generateQuizFromContent(content, difficulty, questionCount, selectedTopic);
    if (quizData && quizData.length > 0) {
      setQuestions(quizData);
      setAnswers(new Array(quizData.length).fill(null));
      setElapsedTime(0);
      setStatus('taking');
      setCurrentPage(0);
      setScore(0);
      setIsChecked(false);
    } else {
      alert("ไม่สามารถสร้างข้อสอบได้ในขณะนี้ อาจเกิดจากข้อจำกัดของ AI หรือเนื้อหา กรุณาลองใหม่อีกครั้ง");
      setStatus('idle');
    }
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (isChecked) return; // Prevent changing after checking
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = async () => {
    let newScore = 0;
    questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
            newScore++;
        }
    });
    setScore(newScore);
    setIsChecked(true);
    setStatus('finished');

    try {
      const user = getStoredUser();
      if (user) {
        await userActivityService.recordQuizAttempt(user.id, topicId || null, newScore, questions.length, answers);
      }
    } catch (error) {
      console.error('Error saving quiz attempt', error);
    }
  };

  const exitQuiz = () => {
    setStatus('idle');
    setShowExitConfirm(false);
    setDifficulty('easy');
    setQuestionCount(10);
    setSelectedTopic('all');
    setIsChecked(false);
  };

  // Helper function to generate HTML content for both Word and PDF
  const generateDocumentHTML = (isWord: boolean) => {
    const title = 'ผลการทดสอบ: เตรียมสอบครูผู้ช่วย สพฐ.';
    const fontStyle = isWord 
      ? `/* Word Font Settings */
         body { font-family: 'TH Sarabun PSK', 'Sarabun', sans-serif; font-size: 16pt; line-height: 1.5; }`
      : `/* Web/PDF Font Settings - Use Google Fonts fallback */
         @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');
         body { font-family: 'TH Sarabun PSK', 'Sarabun', sans-serif; font-size: 16pt; line-height: 1.5; }`;

    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          ${fontStyle}
          h1 { font-size: 24pt; text-align: center; font-weight: bold; margin-bottom: 20px; }
          h2 { font-size: 20pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 20px; }
          .summary { text-align: center; font-size: 16pt; margin-bottom: 20px; border: 1px solid #000; padding: 15px; border-radius: 8px; }
          .question { margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 15px; page-break-inside: avoid; }
          .explanation { background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; margin-top: 10px; font-weight: normal; }
          .correct { color: green; font-weight: bold; }
          .wrong { color: red; font-weight: bold; }
          strong { font-weight: bold; }
          /* Ensure text in explanation is not bold by default unless specified */
          .explanation span, .explanation div { font-weight: normal; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="summary">
          <strong>คะแนนที่ได้:</strong> ${score} / ${questions.length} คะแนน<br/>
          <strong>เวลาที่ใช้:</strong> ${formatTime(elapsedTime)}
        </div>
        
        <h2>เฉลยคำตอบละเอียด</h2>
        ${questions.map((q, idx) => {
           const isCorrect = answers[idx] === q.correctAnswer;
           const userAnsIdx = answers[idx];
           const correctAnsIdx = q.correctAnswer;
           
           return `
             <div class="question">
               <p><strong>${idx + 1}. ${q.question}</strong></p>
               <p>
                 <span class="${isCorrect ? 'correct' : 'wrong'}">
                   คำตอบของคุณ: ${userAnsIdx !== null ? optionPrefixes[userAnsIdx] + '. ' + q.options[userAnsIdx] : 'ไม่ได้ตอบ'}
                 </span>
               </p>
               ${!isCorrect ? `
                 <p class="correct">
                   คำตอบที่ถูก: ${optionPrefixes[correctAnsIdx]}. ${q.options[correctAnsIdx]}
                 </p>
               ` : ''}
               <div class="explanation">
                 <strong>อธิบาย:</strong> <span style="font-weight: normal;">${q.explanation}</span>
               </div>
             </div>
           `;
        }).join('')}
        
        <p style="text-align: center; margin-top: 30px; color: #888; font-size: 14pt;">สร้างโดย SobKru69 by Thanit Lab</p>
      </body>
      </html>
    `;
  };

  const handleDownloadPDF = () => {
    // Open a new window for printing (more reliable than iframe/portal for some browsers)
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('กรุณาอนุญาต Pop-up เพื่อทำการพิมพ์เอกสาร');
      return;
    }

    const htmlContent = generateDocumentHTML(false);
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        // Optional: printWindow.close(); // Don't close immediately so user can retry if print dialog fails
      }, 500);
    };
  };

  const handleExportWord = () => {
    const contentHtml = generateDocumentHTML(true);

    // Create Blob and download link
    const blob = new Blob(['\ufeff', contentHtml], {
        type: 'application/msword'
    });
    
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `Quiz_Result_${new Date().toISOString().slice(0,10)}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  
  // Calculate Pagination
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const currentQuestions = questions.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;

  const handleNextPage = () => {
      if (currentPage < totalPages - 1) {
          setCurrentPage(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          // Finish
          calculateScore();
      }
  };

  const handlePrevPage = () => {
      if (currentPage > 0) {
          setCurrentPage(prev => prev - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  // 1. Idle Screen
  if (status === 'idle') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden border border-white shadow-2xl group">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 transform transition-transform duration-1000 group-hover:rotate-12">
            <BrainCircuit className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto py-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-indigo-100 text-sm font-bold mb-6 italic tracking-wider">
                <Trophy className="w-4 h-4 text-amber-400" />
                AI-POWERED ASSESSMENT
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-xl tracking-tight leading-tight">
                ฝึกทำแบบทดสอบหลังเรียน
            </h2>
            <p className="text-indigo-100 text-xl mb-10 font-medium leading-relaxed drop-shadow-sm max-w-xl mx-auto opacity-90">
                ให้ AI ช่วยสรุปความรู้และสร้างข้อสอบจำลองที่แม่นยำที่สุด<br className="hidden md:block" /> เพื่อวัดระดับความเข้าใจจริงของคุณ
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={handleStartSetup}
                    className="bg-white text-indigo-900 hover:bg-amber-400 hover:text-indigo-950 font-black py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg shadow-xl"
                >
                    <BrainCircuit className="w-6 h-6" />
                    เริ่มจำลองข้อสอบทันที
                </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-indigo-200/60 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> ประหยัดเวลา</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> แม่นยำสูง</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> วัดผลได้จริง</span>
            </div>
        </div>
      </div>
    );
  }

  // 2. Setup Screen
  if (status === 'setup') {
    return (
      <div className="bg-white border border-indigo-100 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
        <div className="text-left mb-8">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">ตั้งค่าแบบทดสอบ</h2>
            <p className="text-slate-500">เลือกรูปแบบข้อสอบที่คุณต้องการฝึกฝน</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
                <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                    <BarChart className="w-5 h-5 text-indigo-500" /> ระดับความยาก
                </label>
                <div className="space-y-3">
                    <button onClick={() => setDifficulty('easy')} className={`w-full p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${difficulty === 'easy' ? 'border-green-500 bg-green-50 text-green-800' : 'border-slate-200 hover:border-indigo-200'}`}>
                        <div><div className="font-bold">ระดับง่าย (พื้นฐาน)</div><div className="text-xs opacity-75">เน้นความจำและความเข้าใจ</div></div>
                        {difficulty === 'easy' && <CheckCircle className="w-6 h-6 text-green-600" />}
                    </button>
                    <button onClick={() => setDifficulty('hard')} className={`w-full p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${difficulty === 'hard' ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-slate-200 hover:border-indigo-200'}`}>
                        <div><div className="font-bold">ระดับยาก (วิเคราะห์)</div><div className="text-xs opacity-75">เน้นการวิเคราะห์และประยุกต์ใช้</div></div>
                        {difficulty === 'hard' && <CheckCircle className="w-6 h-6 text-orange-600" />}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                        <ListOrdered className="w-5 h-5 text-indigo-500" /> จำนวนข้อ
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[10, 20, 30].map((num) => (
                            <button key={num} onClick={() => setQuestionCount(num)} className={`p-4 rounded-xl border-2 text-center transition-all font-bold text-lg ${questionCount === num ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {subTopics.length > 0 && (
                    <div>
                        <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                            <BookOpen className="w-5 h-5 text-indigo-500" /> เลือกหัวข้อเฉพาะ
                        </label>
                        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="w-full p-3 rounded-xl border-2 border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                            <option value="all">ครอบคลุมทุกเนื้อหา (แนะนำ)</option>
                            {subTopics.map((topic, idx) => (
                                <option key={idx} value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify-start gap-4">
            <button onClick={() => setStatus('idle')} className="px-6 py-3 rounded-full text-slate-500 hover:bg-slate-100 font-medium transition-colors">ยกเลิก</button>
            <button onClick={startQuiz} className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-10 rounded-full transition-all transform hover:scale-105 flex items-center gap-2">เริ่มทำข้อสอบ <ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>
    );
  }

  // 3. Loading Screen
  if (status === 'loading') {
    return (
      <div className="bg-white border border-indigo-100 rounded-3xl p-12 text-center animate-pulse">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">กำลังออกข้อสอบ...</h3>
        <p className="text-slate-500 mb-2">AI กำลังวิเคราะห์เนื้อหาบทเรียนและสร้างโจทย์</p>
        <p className="text-slate-400 text-sm mb-4">กรุณารอสักครู่ ใช้เวลาประมาณ 30 - 60 วินาที</p>
      </div>
    );
  }

  // 4. Finished Screen (Score)
  if (status === 'finished') {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-2">สรุปผลคะแนน</h2>
        <div className="text-5xl font-extrabold text-indigo-600 mb-6">
            {score} / {questions.length}
        </div>
        
        <div className="flex justify-center items-center gap-6 mb-8 text-sm md:text-base bg-slate-50 p-4 rounded-xl inline-flex mx-auto">
            <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                <span className="font-semibold text-slate-700">เวลาที่ใช้: {formatTime(elapsedTime)}</span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-slate-500" />
                <span className={`font-bold ${getSpeedAnalysis().color}`}>
                    ความเร็ว: {getSpeedAnalysis().text}
                </span>
            </div>
        </div>

        {/* Answer Key Review Section - On Screen */}
        <div className="mt-8 mb-8 text-left w-full mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-4 gap-4">
                <h3 className="text-xl font-bold text-slate-800">เฉลยคำตอบ</h3>
                <div className="flex gap-3">
                    <button 
                    onClick={handleExportWord} 
                    className="flex items-center gap-2 text-white font-bold bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all transform hover:scale-105"
                    >
                        <FileText className="w-5 h-5" />
                        <span>ดาวน์โหลด Word</span>
                    </button>
                    <button 
                    onClick={handleDownloadPDF} 
                    className="flex items-center gap-2 text-slate-700 hover:text-indigo-800 font-semibold bg-slate-100 hover:bg-indigo-100 px-4 py-2.5 rounded-lg transition-colors border border-slate-200"
                    >
                        <Printer className="w-5 h-5" />
                        <span>พิมพ์ / บันทึก PDF</span>
                    </button>
                </div>
             </div>
             
             <div className="space-y-6 w-full">
                 {questions.map((q, idx) => (
                     <div key={idx} className={`p-6 rounded-lg border ${answers[idx] === q.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                         <div className="flex gap-2 mb-3">
                             <span className="font-bold text-slate-700 text-lg">{idx + 1}.</span>
                             <span className="font-bold text-slate-900 text-lg">
                                <RenderMarkdown content={q.question} />
                             </span>
                         </div>
                         <div className="text-base ml-6 space-y-2">
                             <div className={answers[idx] === q.correctAnswer ? 'text-green-700 font-medium' : 'text-red-600 font-medium'}>
                                 คำตอบของคุณ: {answers[idx] !== null ? (
                                    <>
                                      {optionPrefixes[answers[idx]!]}. <RenderMarkdown content={q.options[answers[idx]!]} />
                                    </>
                                 ) : 'ไม่ได้ตอบ'}
                             </div>
                             {answers[idx] !== q.correctAnswer && (
                                 <div className="text-green-700 font-bold">
                                     คำตอบที่ถูก: {optionPrefixes[q.correctAnswer]}. <RenderMarkdown content={q.options[q.correctAnswer]} />
                                 </div>
                             )}
                             <div className="mt-3 text-slate-700 text-sm bg-white/60 p-3 rounded border border-slate-200/50">
                                 <span className="font-bold underline">อธิบาย:</span> <RenderMarkdown content={q.explanation} />
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
            <button onClick={exitQuiz} className="text-slate-500 hover:text-slate-800 font-medium px-6 py-3 transition-colors">กลับหน้าหลัก</button>
            <button onClick={startQuiz} className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center gap-2"><RefreshCw className="w-5 h-5" /> สอบใหม่อีกครั้ง</button>
        </div>
      </div>
    );
  }

  // 5. Taking Quiz Screen (List View)
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden relative min-h-[600px] flex flex-col">
      {/* Exit Confirmation */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 max-w-md w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการออก</h3>
                <p className="text-slate-600 mb-6">คุณต้องการออกจากแบบทดสอบใช่หรือไม่? คะแนนจะไม่ถูกบันทึก</p>
                <div className="flex gap-3">
                    <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-2 rounded-lg border border-slate-300">ยกเลิก</button>
                    <button onClick={exitQuiz} className="flex-1 py-2 rounded-lg bg-red-600 text-white">ออกทันที</button>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-sm text-slate-600 font-medium">
                หน้า {currentPage + 1} / {totalPages} (ข้อที่ {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, questions.length)})
            </div>
        </div>
        <button onClick={() => setShowExitConfirm(true)} className="text-slate-400 hover:text-red-500 p-2"><LogOut className="w-5 h-5" /></button>
      </div>

      {/* Question List */}
      <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
        {currentQuestions.map((q, localIdx) => {
            const globalIdx = startIndex + localIdx;
            return (
                <div key={`question-${globalIdx}`} className="pb-8 border-b border-slate-100 last:border-0">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex gap-3">
                        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                            {globalIdx + 1}
                        </span>
                        <RenderMarkdown content={q.question} />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-11">
                        {q.options.map((option, optIdx) => (
                            <button
                                key={optIdx}
                                onClick={() => handleAnswer(globalIdx, optIdx)}
                                className={`p-3 rounded-lg border text-left text-base transition-all flex items-center gap-3
                                    ${answers[globalIdx] === optIdx 
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600' 
                                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0
                                    ${answers[globalIdx] === optIdx ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-slate-400'}
                                `}>
                                    {answers[globalIdx] === optIdx ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{optionPrefixes[optIdx]}</span>}
                                </div>
                                <div className="flex-1">
                                    <RenderMarkdown content={option} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center sticky bottom-0 z-20">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-colors ${currentPage === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:bg-slate-100'}`}
          >
              <ChevronLeft className="w-5 h-5" /> ย้อนกลับ
          </button>

          {currentPage < totalPages - 1 ? (
              <button
                onClick={handleNextPage}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
              >
                  หน้าถัดไป <ChevronRight className="w-5 h-5" />
              </button>
          ) : (
              <button
                onClick={calculateScore}
                className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
              >
                  <CheckSquare className="w-5 h-5" /> ส่งคำตอบ (ตรวจคะแนน)
              </button>
          )}
      </div>
    </div>
  );
};

export default QuizGenerator;
