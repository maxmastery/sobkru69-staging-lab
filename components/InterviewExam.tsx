import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  RefreshCw,
  Send,
  User,
} from 'lucide-react';

interface InterviewExamProps {
  onBack: () => void;
}

type InterviewCategory =
  | 'การเตรียมตัว'
  | 'Portfolio'
  | 'สาธิตการสอน'
  | 'แนวคำถามสัมภาษณ์';

type InterviewQuestion = {
  category: InterviewCategory;
  question: string;
  focus: string;
};

const INTERVIEW_DURATION_SECONDS = 10 * 60;
const INTERVIEW_QUESTION_COUNT = 10;

const CATEGORY_PICK_COUNTS: Record<InterviewCategory, number> = {
  การเตรียมตัว: 2,
  Portfolio: 2,
  สาธิตการสอน: 2,
  แนวคำถามสัมภาษณ์: 4,
};

const CATEGORY_STYLES: Record<InterviewCategory, string> = {
  การเตรียมตัว: 'bg-blue-50 text-blue-700 border-blue-100',
  Portfolio: 'bg-amber-50 text-amber-700 border-amber-100',
  สาธิตการสอน: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  แนวคำถามสัมภาษณ์: 'bg-rose-50 text-rose-700 border-rose-100',
};

const INTERVIEW_QUESTION_BANK: InterviewQuestion[] = [
  {
    category: 'การเตรียมตัว',
    question: 'แนะนำตัวเองภายใน 1 นาที โดยเชื่อมโยงประสบการณ์ของคุณกับความพร้อมในการเป็นครูผู้ช่วย',
    focus: 'ชื่อ สาขา จุดแข็ง ประสบการณ์เด่น และเหตุผลที่เหมาะกับตำแหน่ง',
  },
  {
    category: 'การเตรียมตัว',
    question: 'ก่อนเข้าสอบสัมภาษณ์ คุณเตรียมตัวเรื่องข้อมูลโรงเรียน ชุมชน และสังกัดอย่างไร',
    focus: 'แสดงการศึกษาข้อมูลล่วงหน้า เข้าใจบริบท และพร้อมปรับตัว',
  },
  {
    category: 'การเตรียมตัว',
    question: 'ถ้าวันสอบคุณตื่นเต้นมากจนตอบติดขัด คุณจะควบคุมสถานการณ์อย่างไร',
    focus: 'วุฒิภาวะ การตั้งสติ การสื่อสารสุภาพ และการกลับเข้าสู่ประเด็น',
  },
  {
    category: 'การเตรียมตัว',
    question: 'จุดแข็ง 3 ข้อของคุณที่เกี่ยวข้องกับงานครูคืออะไร และมีหลักฐานใดสนับสนุน',
    focus: 'ไม่ตอบลอย ๆ ควรยกตัวอย่างพฤติกรรมหรือผลงานจริงประกอบ',
  },
  {
    category: 'การเตรียมตัว',
    question: 'จุดที่คุณต้องพัฒนาในฐานะครูคืออะไร และคุณมีแผนพัฒนาตนเองอย่างไร',
    focus: 'ตอบอย่างซื่อสัตย์ ไม่ลดคุณค่าตนเอง และมีแผนปรับปรุงชัดเจน',
  },
  {
    category: 'การเตรียมตัว',
    question: 'ถ้าได้รับการบรรจุในพื้นที่ห่างไกลและทรัพยากรจำกัด คุณจะเตรียมใจและเตรียมงานอย่างไร',
    focus: 'ความเสียสละ การใช้ทรัพยากรท้องถิ่น และการทำงานร่วมกับชุมชน',
  },
  {
    category: 'Portfolio',
    question: 'ในแฟ้มสะสมงานของคุณ ผลงานใดสะท้อนความเป็นครูมากที่สุด เพราะเหตุใด',
    focus: 'เลือกผลงานที่เชื่อมผู้เรียน การจัดการเรียนรู้ จิตอาสา หรือการพัฒนาตน',
  },
  {
    category: 'Portfolio',
    question: 'ถ้ากรรมการเปิดแฟ้มสะสมงานแล้วถามว่า “ผลงานนี้เกิดผลต่อผู้เรียนอย่างไร” คุณจะตอบอย่างไร',
    focus: 'อธิบายผลลัพธ์ต่อผู้เรียนด้วยหลักฐาน เช่น พฤติกรรม คะแนน ผลงาน หรือ feedback',
  },
  {
    category: 'Portfolio',
    question: 'แฟ้มสะสมงานของคุณมีจุดใดที่ยังควรปรับปรุง และจะทำให้ดีขึ้นอย่างไร',
    focus: 'มองเห็นข้อจำกัดของตนเองและมีแนวทางพัฒนางานให้ชัดขึ้น',
  },
  {
    category: 'Portfolio',
    question: 'หากกรรมการถามถึงกิจกรรมจิตอาสาหรือการทำงานเป็นทีมใน Portfolio คุณจะเชื่อมกับบทบาทครูอย่างไร',
    focus: 'โยงความรับผิดชอบ การสื่อสาร ภาวะผู้นำ และการทำงานกับผู้อื่น',
  },
  {
    category: 'Portfolio',
    question: 'ผลงานใดใน Portfolio ที่แสดงว่าคุณสามารถใช้เทคโนโลยีเพื่อการเรียนรู้ได้จริง',
    focus: 'เน้นเทคโนโลยีที่ช่วยเป้าหมายการเรียน ไม่ใช่ใช้เพราะทันสมัยอย่างเดียว',
  },
  {
    category: 'Portfolio',
    question: 'ถ้ามีเวลานำเสนอ Portfolio เพียง 3 นาที คุณจะเลือกเล่าอะไรบ้าง',
    focus: 'จัดลำดับเรื่องสำคัญ: ตัวตน ความสามารถ ผลงานเด่น และความพร้อมรับราชการ',
  },
  {
    category: 'สาธิตการสอน',
    question: 'ถ้าต้องสาธิตการสอน 10 นาที คุณจะวางโครงขั้นนำเข้าสู่บทเรียน ขั้นกิจกรรม และขั้นสรุปอย่างไร',
    focus: 'ตอบให้เห็นกระบวนการสอนที่กระชับ มีเป้าหมาย และผู้เรียนมีส่วนร่วม',
  },
  {
    category: 'สาธิตการสอน',
    question: 'คุณจะเตรียมสื่อการสอนอย่างไรให้เหมาะกับเวลาสั้น ๆ และทำให้กรรมการเห็นภาพการเรียนรู้',
    focus: 'เลือกสื่อชัด ใช้ง่าย ไม่ซับซ้อน และเชื่อมกับจุดประสงค์การเรียนรู้',
  },
  {
    category: 'สาธิตการสอน',
    question: 'ระหว่างสาธิตการสอน คุณจะทำให้ผู้เรียนมีส่วนร่วมอย่างไร แม้มีเวลาจำกัด',
    focus: 'ใช้คำถาม กระตุ้นคิด กิจกรรมสั้น การตอบเร็ว หรือ mini task',
  },
  {
    category: 'สาธิตการสอน',
    question: 'ถ้าสื่อการสอนมีปัญหาหน้างาน คุณจะสอนต่ออย่างไรให้ยังคงบรรลุเป้าหมาย',
    focus: 'แสดงแผนสำรอง การใช้กระดาน วัตถุใกล้ตัว หรือการตั้งคำถามแทนสื่อ',
  },
  {
    category: 'สาธิตการสอน',
    question: 'หลังผู้เรียนนำเสนอคำตอบหรือผลงานสั้น ๆ คุณจะให้ feedback อย่างไร',
    focus: 'ให้ feedback ทันที ชัดเจน ชี้จุดดี จุดปรับ และเชื่อมเป้าหมายบทเรียน',
  },
  {
    category: 'สาธิตการสอน',
    question: 'ถ้ากรรมการถามว่า “แผนการสอนของคุณเน้นผู้เรียนเป็นสำคัญตรงไหน” คุณจะตอบอย่างไร',
    focus: 'อธิบายบทบาทผู้เรียน การลงมือคิด/ทำ/นำเสนอ และการประเมินระหว่างเรียน',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'ทำไมคุณถึงอยากเป็นครู และทำไมจึงเลือกสมัครในสังกัดนี้',
    focus: 'แรงจูงใจที่ไม่ใช่แค่ความมั่นคง แต่ต้องสะท้อนคุณค่าต่อผู้เรียนและราชการ',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'ถ้านักเรียนไม่สนใจเรียนและรบกวนเพื่อน คุณจะจัดการอย่างไร',
    focus: 'วิเคราะห์สาเหตุ ตั้งกติกา ใช้วินัยเชิงบวก และติดตามผล',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'ถ้าผู้ปกครองตำหนิการสอนของคุณต่อหน้าคนอื่น คุณจะตอบสนองอย่างไร',
    focus: 'รับฟังอย่างสุภาพ ไม่โต้เถียง ใช้ข้อมูล และนัดคุยในช่องทางเหมาะสม',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'คุณมองบทบาทของครูในยุคดิจิทัลอย่างไร',
    focus: 'ครูเป็นผู้ออกแบบการเรียนรู้ ใช้เทคโนโลยีอย่างมีเป้าหมาย และปลูกฝังพลเมืองดิจิทัล',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'ถ้าพบว่านักเรียนถูกกลั่นแกล้งในห้องเรียน คุณจะดำเนินการอย่างไร',
    focus: 'หยุดเหตุ ดูแลผู้ถูกกระทำ สอบข้อเท็จจริง ฟื้นฟูความสัมพันธ์ และติดตามความปลอดภัย',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'คุณจะทำอย่างไรให้เด็กเก่ง เด็กปานกลาง และเด็กอ่อนเรียนรู้ร่วมกันได้',
    focus: 'ออกแบบงานต่างระดับ ใช้เพื่อนช่วยเพื่อน และประเมินความก้าวหน้ารายบุคคล',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'ถ้าผู้บริหารมอบหมายงานเร่งด่วนชนกับภาระสอน คุณจะจัดลำดับความสำคัญอย่างไร',
    focus: 'รักษาหน้าที่สอน ประสานงาน แจ้งข้อจำกัด และบริหารเวลาอย่างรับผิดชอบ',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'คุณคิดว่าครูที่ดีควรมีคุณธรรมข้อใดสำคัญที่สุด และเพราะอะไร',
    focus: 'เชื่อมคุณธรรมกับพฤติกรรมจริง เช่น เมตตา ยุติธรรม ซื่อสัตย์ รับผิดชอบ',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'หากนักเรียนถามคำถามที่คุณยังตอบไม่ได้ คุณจะทำอย่างไร',
    focus: 'ยอมรับอย่างมืออาชีพ ชวนค้นคว้า ตรวจสอบข้อมูล และกลับมาตอบอย่างถูกต้อง',
  },
  {
    category: 'แนวคำถามสัมภาษณ์',
    question: 'คุณมีความคิดเห็นและรู้สึกอย่างไรต่อสถาบันพระมหากษัตริย์ไทย',
    focus: 'ตอบด้วยความเคารพ สุภาพ และเชื่อมบทบาทพลเมืองกับการปฏิบัติหน้าที่ราชการ',
  },
];

const shuffleItems = <T,>(items: T[]): T[] => {
  const nextItems = [...items];
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[index]];
  }
  return nextItems;
};

const createInterviewSet = (): InterviewQuestion[] => {
  const selectedQuestions = (Object.keys(CATEGORY_PICK_COUNTS) as InterviewCategory[]).flatMap(
    (category) =>
      shuffleItems(INTERVIEW_QUESTION_BANK.filter((question) => question.category === category)).slice(
        0,
        CATEGORY_PICK_COUNTS[category],
      ),
  );

  return shuffleItems(selectedQuestions).slice(0, INTERVIEW_QUESTION_COUNT);
};

const formatTime = (seconds: number) => {
  const minute = Math.floor(seconds / 60).toString().padStart(2, '0');
  const second = (seconds % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

export const InterviewExam: React.FC<InterviewExamProps> = ({ onBack }) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(() => createInterviewSet());
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INTERVIEW_DURATION_SECONDS);
  const [sessionKey, setSessionKey] = useState(1);

  useEffect(() => {
    if (isFinished) return;

    const timer = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          window.clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return previousTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isFinished, sessionKey]);

  const currentQuestion = questions[currentQIndex];
  const hasAnswered = typeof answers[currentQIndex] === 'string';
  const isTeachingDemo = currentQuestion?.category === 'สาธิตการสอน';
  const isTimeWarning = timeLeft <= 60;
  const answeredCount = Object.keys(answers).length;

  const handleSubmitAnswer = () => {
    if (!currentInput.trim() || timeLeft === 0) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQIndex]: currentInput.trim(),
    }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      const nextIndex = currentQIndex + 1;
      setCurrentQIndex(nextIndex);
      setCurrentInput(answers[nextIndex] || '');
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      const previousIndex = currentQIndex - 1;
      setCurrentQIndex(previousIndex);
      setCurrentInput(answers[previousIndex] || '');
    }
  };

  const handleRestart = () => {
    setQuestions(createInterviewSet());
    setCurrentQIndex(0);
    setAnswers({});
    setCurrentInput('');
    setIsFinished(false);
    setTimeLeft(INTERVIEW_DURATION_SECONDS);
    setSessionKey((key) => key + 1);
  };

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center mb-8 shadow-sm">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3">สรุปการฝึกสัมภาษณ์ ภาค ค</h2>
          <p className="text-lg text-slate-600 mb-6">
            ตอบแล้ว {answeredCount} / {questions.length} ข้อ ใช้เวลา {formatTime(INTERVIEW_DURATION_SECONDS - timeLeft)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleRestart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              สุ่มคำถามชุดใหม่
            </button>
            <button
              onClick={onBack}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-bold text-slate-800 px-2">คำถามและคำตอบที่บันทึกไว้</h3>
          {questions.map((question, index) => (
            <div key={`${question.question}-${index}`} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 font-black text-slate-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold mb-3 ${CATEGORY_STYLES[question.category]}`}>
                    {question.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-lg">{question.question}</h4>
                  <p className="text-sm text-slate-500 mt-2">จุดที่ควรครอบคลุม: {question.focus}</p>
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-slate-700 whitespace-pre-wrap">
                    {answers[index] || 'ยังไม่ได้ตอบข้อนี้'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> กลับ
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            ข้อที่ {currentQIndex + 1} / {questions.length}
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-black ${
              isTimeWarning ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            เหลือ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-6 shadow-sm">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-3 opacity-90 text-sm font-medium">
            <MessageSquare className="w-5 h-5" />
            <span>กรรมการสอบสัมภาษณ์</span>
          </div>
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold mb-4">
            {currentQuestion.category}
          </span>
          <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-bold text-slate-800 mb-1">จุดที่ควรครอบคลุมในการตอบ</div>
            <p className="text-slate-600">{currentQuestion.focus}</p>
          </div>

          {isTeachingDemo && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                หมวดสาธิตการสอนในหน้านี้ใช้ฝึกตอบแนวคิดและการจัดลำดับการสอนเท่านั้น หลังจบการฝึกควรไปซ้อมสาธิตจริง
                พร้อมสื่อการสอน น้ำเสียง จังหวะถามตอบ และการให้ feedback ให้ชำนาญอีกครั้ง
              </p>
            </div>
          )}

          {!hasAnswered ? (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                พิมพ์คำตอบของคุณเหมือนกำลังพูดตอบกรรมการ:
              </label>
              <textarea
                value={currentInput}
                onChange={(event) => setCurrentInput(event.target.value)}
                placeholder="เริ่มพิมพ์คำตอบที่นี่ เช่น เกริ่นสั้น ๆ ยกตัวอย่างจริง แล้วสรุปให้ชัด..."
                className="w-full h-48 p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-slate-700"
                disabled={timeLeft === 0}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!currentInput.trim() || timeLeft === 0}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  บันทึกคำตอบ
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold">
                <User className="w-4 h-4" />
                คำตอบของคุณ:
              </div>
              <p className="text-slate-800 whitespace-pre-wrap">{answers[currentQIndex]}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQIndex === 0}
          className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> ก่อนหน้า
        </button>

        {hasAnswered && (
          <button
            onClick={handleNext}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
          >
            {currentQIndex === questions.length - 1 ? 'ดูสรุปผล' : 'ข้อถัดไป'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
