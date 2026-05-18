import React, { useEffect, useState } from 'react';
import { BarChart3, Clock, BookOpen, ChevronLeft } from 'lucide-react';
import { EXAM_CURRICULUM } from '../constants';
import { getStoredUser, userActivityService } from '../services/userActivityService';
import { User } from '../services/authService';
import type { FeatureTheme } from './FeatureThemeToggle';

interface LearningStatsProps {
  onClose: () => void;
  user?: User | null;
  theme?: FeatureTheme;
}

const LearningStats: React.FC<LearningStatsProps> = ({ onClose, user: propUser, theme = 'light' }) => {
  const [stats, setStats] = useState<{ [chapterId: string]: number }>({});

  useEffect(() => {
    const loadStats = async () => {
      const user = propUser || getStoredUser();
      if (!user) return;

      try {
        const timeMap = await userActivityService.getStudyTimeMap(user.id);
        setStats(timeMap || {});
      } catch (error) {
        console.error('Error loading study time stats', error);
      }
    };

    loadStats();
  }, [propUser]);

  // Calculate totals
  let totalSeconds = 0;
  let viewedChaptersCount = 0;
  
  Object.values(stats).forEach(time => {
    totalSeconds += time;
    if (time > 0) viewedChaptersCount++;
  });

  const totalMinutes = Math.floor(totalSeconds / 60);

  // Calculate total possible chapters
  let totalChapters = 0;
  EXAM_CURRICULUM.forEach(part => {
    part.sections.forEach(section => {
      section.subTopics.forEach(subTopic => {
        if (subTopic.chapters) {
          totalChapters += subTopic.chapters.length;
        } else {
          totalChapters += 1;
        }
      });
    });
  });

  const progressPercentage = totalChapters > 0 ? Math.min(100, Math.round((viewedChaptersCount / totalChapters) * 100)) : 0;

  return (
    <div className={`feature-page ${theme === 'dark' ? 'feature-dark' : 'feature-light'} w-full`}>
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[60px] pb-8">
        <button
          onClick={onClose}
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          กลับสู่หน้าหลัก
        </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          สถิติการเรียนของคุณ
        </h1>
        <p className="text-slate-500 mt-2">ติดตามความคืบหน้าและประวัติการเข้าเรียนของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">บทเรียนที่เข้าดู</p>
            <p className="text-2xl font-bold text-slate-800">{viewedChaptersCount} <span className="text-sm font-normal text-slate-500">/ {totalChapters} บท</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">เวลาเรียนรวม</p>
            <p className="text-2xl font-bold text-slate-800">{totalMinutes} <span className="text-sm font-normal text-slate-500">นาที</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">ความคืบหน้าการเรียนทั้งหมด</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">ความคืบหน้า</span>
          <span className="text-sm font-bold text-indigo-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {Object.keys(stats).length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">ยังไม่มีข้อมูลสถิติ</h3>
          <p className="text-slate-500">เริ่มเข้าเรียนและทำแบบทดสอบเพื่อดูสถิติของคุณที่นี่</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">รายละเอียดเวลาเรียนแต่ละบท</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {Object.entries(stats).map(([chapterId, timeInSeconds]) => {
              // Find chapter name
              let chapterName = chapterId;
              EXAM_CURRICULUM.forEach(part => {
                part.sections.forEach(section => {
                  section.subTopics.forEach(subTopic => {
                    if (subTopic.chapters) {
                      const ch = subTopic.chapters.find(c => c.id === chapterId);
                      if (ch) chapterName = `${subTopic.title} - ${ch.title}`;
                    } else if (subTopic.id === chapterId) {
                      chapterName = subTopic.title;
                    }
                  });
                });
              });

              const mins = Math.floor(timeInSeconds / 60);
              const secs = timeInSeconds % 60;

              return (
                <div key={chapterId} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span className="text-slate-700 font-medium">{chapterName}</span>
                  <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full">
                    {mins} นาที {secs} วินาที
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default LearningStats;
