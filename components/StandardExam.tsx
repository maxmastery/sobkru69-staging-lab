import React, { useState, useEffect } from 'react';
import { Clock, Send, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertCircle } from 'lucide-react';

export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface StandardExamProps {
  title: string;
  durationSeconds: number;
  questions: Question[];
  onBack: () => void;
}

const OPTION_LABELS = ['ก', 'ข', 'ค', 'ง'];

const renderTextWithMathSymbols = (text: string) => {
  const normalizedText = text.replace(/\bpi\b/g, 'π');
  const parts: React.ReactNode[] = [];
  const exponentPattern = /\^([0-9]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = exponentPattern.exec(normalizedText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(normalizedText.slice(lastIndex, match.index));
    }

    parts.push(
      <sup key={`sup-${match.index}`} className="text-[0.68em] leading-none">
        {match[1]}
      </sup>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < normalizedText.length) {
    parts.push(normalizedText.slice(lastIndex));
  }

  return parts.length > 0 ? parts : normalizedText;
};

export const StandardExam: React.FC<StandardExamProps> = ({ title, durationSeconds, questions, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isFinished, setIsFinished] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  const handleFinishExam = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  if (isFinished) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const isPassed = percentage >= 60;
    const unansweredCount = questions.length - Object.keys(answers).length;

    return (
      <div className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto font-sans p-4 md:p-8">
        <div className="max-w-5xl mx-auto animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 p-6 md:p-10 text-center mb-6">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {isPassed ? <CheckCircle className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">ส่งข้อสอบเรียบร้อยแล้ว</h2>
            <p className="text-slate-500 mb-8">คุณได้ทำแบบทดสอบ {title} เสร็จสิ้น</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="text-sm text-blue-600 font-bold mb-2">คะแนนรวม</div>
                <div className="text-4xl font-black text-blue-900">{score} <span className="text-xl text-blue-400 font-medium">/ {questions.length}</span></div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-sm text-green-600 font-bold mb-2">เปอร์เซ็นต์</div>
                <div className="text-4xl font-black text-green-900">{percentage.toFixed(0)}%</div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="text-sm text-amber-700 font-bold mb-2">ยังไม่ได้ตอบ</div>
                <div className="text-4xl font-black text-amber-900">{unansweredCount}</div>
              </div>
            </div>

            <div className={`text-lg font-bold mb-8 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {isPassed ? 'ผ่านเกณฑ์ (60%)' : 'ยังไม่ผ่านเกณฑ์ ลองทบทวนจากเฉลยด้านล่างได้เลย'}
            </div>

            <button 
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
              <div>
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Answer Review</div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">เฉลยและคำอธิบายรายข้อ</h3>
              </div>
              <div className="text-sm text-slate-500">ตรวจสีเขียวคือถูก สีแดงคือผิด สีเหลืองคือยังไม่ได้ตอบ</div>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => {
                const selectedAnswer = answers[index];
                const isAnswered = selectedAnswer !== undefined;
                const isCorrect = selectedAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border-2 p-5 md:p-6 text-left ${
                      isCorrect
                        ? 'border-green-200 bg-green-50/40'
                        : isAnswered
                          ? 'border-red-200 bg-red-50/40'
                          : 'border-amber-200 bg-amber-50/40'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                          isCorrect
                            ? 'bg-green-600 text-white'
                            : isAnswered
                              ? 'bg-red-600 text-white'
                              : 'bg-amber-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-500">เรื่องที่ออก: {q.subject}</div>
                          <div className={`text-sm font-bold ${
                            isCorrect ? 'text-green-700' : isAnswered ? 'text-red-700' : 'text-amber-700'
                          }`}>
                            {isCorrect ? 'ตอบถูก' : isAnswered ? 'ตอบผิด' : 'ยังไม่ได้ตอบ'}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-600">
                        เฉลย: {OPTION_LABELS[q.correctAnswer]}. {renderTextWithMathSymbols(q.options[q.correctAnswer])}
                      </div>
                    </div>

                    <div className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line mb-4">
                      {renderTextWithMathSymbols(q.question)}
                    </div>

                    <div className="grid gap-2 mb-4">
                      {q.options.map((option, optIdx) => {
                        const isChosen = selectedAnswer === optIdx;
                        const isAnswer = q.correctAnswer === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`rounded-xl border px-4 py-3 flex gap-3 ${
                              isAnswer
                                ? 'border-green-300 bg-green-100 text-green-950'
                                : isChosen
                                  ? 'border-red-300 bg-red-100 text-red-950'
                                  : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <span className="font-black shrink-0">{OPTION_LABELS[optIdx]}.</span>
                            <span className="whitespace-pre-line">{renderTextWithMathSymbols(option)}</span>
                            {isAnswer && <span className="ml-auto text-sm font-bold text-green-700">คำตอบ</span>}
                            {isChosen && !isAnswer && <span className="ml-auto text-sm font-bold text-red-700">ที่เลือก</span>}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="rounded-xl bg-white border border-slate-200 p-4">
                        <div className="text-sm font-black text-blue-700 mb-1">คำอธิบาย</div>
                        <div className="text-xs font-bold text-slate-500 mb-2">เรื่องที่ออก: {q.subject}</div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line">{renderTextWithMathSymbols(q.explanation)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="hidden md:block font-bold text-xl text-slate-800">SOBKRU <span className="text-amber-500">69</span></div>
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          <div className="font-semibold text-slate-600 truncate max-w-[200px] md:max-w-md">{title}</div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`flex items-center gap-2 font-mono text-lg md:text-xl font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg ${timeLeft < 600 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setShowConfirmModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 md:px-5 rounded-lg flex items-center gap-2 transition-colors text-sm md:text-base"
          >
            <Send className="w-4 h-4" />
            <span className="hidden md:inline">ส่งข้อสอบ</span>
          </button>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">ยืนยันการส่งข้อสอบ</h3>
            <p className="text-center text-slate-600 mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการส่งข้อสอบ? <br/>
              <span className="text-sm text-slate-500">หากส่งแล้วจะไม่สามารถกลับมาแก้ไขได้อีก</span>
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  handleFinishExam();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                ยืนยันส่งข้อสอบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        
        {/* Sidebar (Question Navigator) */}
        <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 md:h-full h-48 order-2 md:order-1">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2">สถานะการทำข้อสอบ</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">ทำแล้ว: <strong className="text-green-600">{answeredCount}</strong></span>
              <span className="text-slate-500">เหลือ: <strong>{questions.length - answeredCount}</strong></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 md:grid-cols-4 gap-2">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isCurrent = currentQuestionIndex === index;
                const isFlagged = flagged[index];
                
                let btnClass = "h-10 rounded-lg text-sm font-medium transition-all flex items-center justify-center border ";
                
                if (isCurrent) {
                  btnClass += "border-blue-500 ring-2 ring-blue-200 text-blue-700 bg-blue-50 ";
                } else if (isFlagged) {
                  btnClass += "border-amber-400 bg-amber-50 text-amber-700 ";
                } else if (isAnswered) {
                  btnClass += "border-green-200 bg-green-50 text-green-700 ";
                } else {
                  btnClass += "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 ";
                }

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={btnClass}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs space-y-2 hidden md:block">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div> <span className="text-slate-600">ทำแล้ว</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-slate-200"></div> <span className="text-slate-600">ยังไม่ได้ทำ</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-50 border border-amber-400"></div> <span className="text-slate-600">ทำเครื่องหมายไว้ทบทวน</span></div>
          </div>
        </aside>

        {/* Question Area */}
        <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden order-1 md:order-2">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full">
                  ข้อที่ {currentQuestionIndex + 1} / {questions.length}
                </div>
                <button 
                  onClick={toggleFlag}
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${flagged[currentQuestionIndex] ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  <Flag className={`w-4 h-4 ${flagged[currentQuestionIndex] ? 'fill-current' : ''}`} />
                  <span className="hidden md:inline">ทำเครื่องหมายไว้ทบทวน</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 mb-6">
                <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">{currentQ.subject}</h3>
                <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-8 whitespace-pre-line">
                  {renderTextWithMathSymbols(currentQ.question)}
                </p>

                <div className="space-y-3">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = answers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerSelect(optIdx)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50/50' 
                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                          isSelected ? 'border-blue-500' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                        </div>
                        <span className={`text-base md:text-lg font-black ${isSelected ? 'text-blue-900' : 'text-slate-500'}`}>
                          {OPTION_LABELS[optIdx]}.
                        </span>
                        <span className={`text-base md:text-lg whitespace-pre-line ${isSelected ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>
                          {renderTextWithMathSymbols(option)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-slate-200 p-4 shrink-0">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden md:inline">ข้อก่อนหน้า</span>
              </button>
              
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <span className="hidden md:inline">ข้อถัดไป</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
