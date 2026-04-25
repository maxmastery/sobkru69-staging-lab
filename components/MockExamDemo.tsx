import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Brain, GraduationCap, ChevronRight } from 'lucide-react';
import { StandardExam, Question } from './StandardExam';
import { PART_A1_THAI_EXAM_META, getPartA1ThaiExamQuestions } from '../data/mockExamA1Thai';
import { PART_A1_MATH_EXAM_META, getPartA1MathExamQuestions } from '../data/mockExamA1Math';
import { PART_A2_ENGLISH_EXAM_META, getPartA2EnglishExamQuestions } from '../data/mockExamA2English';
import { PART_A3_GOOD_GOV_EXAM_META, getPartA3GoodGovExamQuestions } from '../data/mockExamA3GoodGov';
import { PART_B1_TEACHING_EXAM_META, getPartB1TeachingExamQuestions } from '../data/mockExamB1Teaching';
import { PART_B3_EDUCATION_LAW_EXAM_META, getPartB3EducationLawExamQuestions } from '../data/mockExamB3EducationLaw';

interface MockExamDemoProps {
  onBack: () => void;
}

type ViewState = 'hub' | 'partA_menu' | 'partB_menu' | 'exam';

export const MockExamDemo: React.FC<MockExamDemoProps> = ({ onBack }) => {
  const [view, setView] = useState<ViewState>('hub');
  
  // Exam State
  const [examTitle, setExamTitle] = useState('');
  const [examDuration, setExamDuration] = useState(0);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);

  const startStandardExam = (title: string, duration: number, questions: Question[]) => {
    setExamTitle(title);
    setExamDuration(duration);
    setExamQuestions(questions);
    setView('exam');
  };

  const startPartA1Exam = () => {
    const questions = [
      ...getPartA1ThaiExamQuestions(PART_A1_THAI_EXAM_META.currentQuestionCount),
      ...getPartA1MathExamQuestions(PART_A1_MATH_EXAM_META.questionCount),
    ];

    startStandardExam('ภาค ก1: การคิดวิเคราะห์', PART_A1_THAI_EXAM_META.durationSeconds, questions);
  };

  const startPartA2Exam = () => {
    startStandardExam(
      PART_A2_ENGLISH_EXAM_META.title,
      PART_A2_ENGLISH_EXAM_META.durationSeconds,
      getPartA2EnglishExamQuestions(PART_A2_ENGLISH_EXAM_META.questionCount),
    );
  };

  const startPartA3Exam = () => {
    startStandardExam(
      PART_A3_GOOD_GOV_EXAM_META.title,
      PART_A3_GOOD_GOV_EXAM_META.durationSeconds,
      getPartA3GoodGovExamQuestions(PART_A3_GOOD_GOV_EXAM_META.questionCount),
    );
  };

  const startPartB1Exam = () => {
    startStandardExam(
      PART_B1_TEACHING_EXAM_META.title,
      PART_B1_TEACHING_EXAM_META.durationSeconds,
      getPartB1TeachingExamQuestions(PART_B1_TEACHING_EXAM_META.questionCount),
    );
  };

  const startPartB3Exam = () => {
    startStandardExam(
      PART_B3_EDUCATION_LAW_EXAM_META.title,
      PART_B3_EDUCATION_LAW_EXAM_META.durationSeconds,
      getPartB3EducationLawExamQuestions(PART_B3_EDUCATION_LAW_EXAM_META.questionCount),
    );
  };

  if (view === 'exam') {
    return <StandardExam title={examTitle} durationSeconds={examDuration} questions={examQuestions} onBack={() => setView('hub')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={view === 'hub' ? onBack : () => setView('hub')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {view === 'hub' ? 'ระบบจำลองการสอบบรรจุครู' : 
               view === 'partA_menu' ? 'ภาค ก: ความรู้ความสามารถทั่วไป' : 
               'ภาค ข: มาตรฐานความรู้และประสบการณ์วิชาชีพ'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {view === 'hub' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-4">เลือกหมวดหมู่การสอบ</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                ระบบจำลองการสอบที่ครอบคลุมทั้ง 3 ภาค เพื่อเตรียมความพร้อมสู่การเป็นครูผู้ช่วยอย่างมั่นใจ
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Part A Card */}
              <button 
                onClick={() => setView('partA_menu')}
                className="bg-white rounded-3xl p-8 text-left border border-slate-200 hover:border-blue-300 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">ภาค ก</h3>
                <p className="text-slate-600 mb-6 relative z-10 h-12">ความรู้ความสามารถทั่วไป (คิดวิเคราะห์, อังกฤษ, ข้าราชการที่ดี)</p>
                <div className="flex items-center text-blue-600 font-bold relative z-10">
                  เลือกทำข้อสอบ <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Part B Card */}
              <button 
                onClick={() => setView('partB_menu')}
                className="bg-white rounded-3xl p-8 text-left border border-slate-200 hover:border-purple-300 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">ภาค ข</h3>
                <p className="text-slate-600 mb-6 relative z-10 h-12">มาตรฐานความรู้และประสบการณ์วิชาชีพ (วิชาการศึกษา, วิชาเอก, กฎหมาย)</p>
                <div className="flex items-center text-purple-600 font-bold relative z-10">
                  เลือกทำข้อสอบ <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Part C Card: self-study guidance only for now */}
              <div
                className="bg-white rounded-3xl p-8 text-left border border-emerald-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10"></div>
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">ภาค ค</h3>
                <p className="text-slate-600 mb-6 relative z-10 h-12">
                  ความเหมาะสมกับตำแหน่ง (เตรียมตัวด้วยตนเอง)
                </p>
                <div className="relative z-10 space-y-2 text-sm font-semibold text-emerald-700">
                  <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1">
                    ศึกษาเนื้อหาเทคนิคการสอบสัมภาษณ์
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    ฝึกตอบคำถาม เตรียม Portfolio และซ้อมสาธิตการสอนเพิ่มเติมด้วยตนเอง
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'partA_menu' && (
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ก1: การคิดวิเคราะห์</h3>
                <p className="text-slate-500 text-sm">ภาษาไทยและคณิตศาสตร์ ครบ 100 ข้อ พร้อมสุ่มจากคลังข้อสอบ</p>
                <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{PART_A1_THAI_EXAM_META.totalPlannedQuestions} ข้อ</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">3 ชั่วโมง</span>
                </div>
              </div>
              <button 
                onClick={startPartA1Exam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shrink-0"
              >
                เริ่มทำข้อสอบ
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ก2: ทักษะภาษาอังกฤษ</h3>
                <p className="text-slate-500 text-sm">Grammar, Vocabulary, Reading, Conversation ครบทุกแนว</p>
                <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                  <span className="bg-slate-100 px-2 py-1 rounded">{PART_A2_ENGLISH_EXAM_META.questionCount} ข้อ</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">1 ชั่วโมง 30 นาที</span>
                </div>
              </div>
              <button 
                onClick={startPartA2Exam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shrink-0"
              >
                เริ่มทำข้อสอบ
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ก3: ข้าราชการที่ดี</h3>
                <p className="text-slate-500 text-sm">กฎหมายข้าราชการที่ดี คุณธรรม จริยธรรม และธรรมาภิบาล</p>
                <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                  <span className="bg-slate-100 px-2 py-1 rounded">{PART_A3_GOOD_GOV_EXAM_META.questionCount} ข้อ</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">1 ชั่วโมง 30 นาที</span>
                </div>
              </div>
              <button 
                onClick={startPartA3Exam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shrink-0"
              >
                เริ่มทำข้อสอบ
              </button>
            </div>
          </div>
        )}

        {view === 'partB_menu' && (
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ข1: มาตรฐานการสอนและวิชาชีพครู</h3>
                <p className="text-slate-500 text-sm">จิตวิทยา หลักสูตร การสอน เทคโนโลยี วัดผล วิจัย และประกันคุณภาพ</p>
                <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                  <span className="bg-slate-100 px-2 py-1 rounded">{PART_B1_TEACHING_EXAM_META.questionCount} ข้อ</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">2 ชั่วโมง</span>
                </div>
              </div>
              <button 
                onClick={startPartB1Exam}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shrink-0"
              >
                เริ่มทำข้อสอบ
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ข2: วิชาเอก (ศึกษาด้วยตนเอง)</h3>
                <p className="text-slate-500 text-sm mt-1">
                  วิชาเอกมีความหลากหลาย ผู้สมัครต้องศึกษาตามสาขาวิชาของตนเอง
                </p>

                <div className="flex flex-wrap gap-2 mt-4 text-sm font-medium text-slate-600">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">ศึกษาตามสาขาวิชา</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">เตรียมข้อสอบเฉพาะทางด้วยตนเอง</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาค ข3: กฎหมายและแนวทางปฏิรูป</h3>
                <p className="text-slate-500 text-sm">กฎหมายการศึกษา, ยุทธศาสตร์ชาติ, แผนการศึกษา</p>
                <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                  <span className="bg-slate-100 px-2 py-1 rounded">{PART_B3_EDUCATION_LAW_EXAM_META.questionCount} ข้อ</span>
                  <span className="bg-slate-100 px-2 py-1 rounded">1 ชั่วโมง</span>
                </div>
              </div>
              <button 
                onClick={startPartB3Exam}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shrink-0"
              >
                เริ่มทำข้อสอบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockExamDemo;
