import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { ExamPart, SubjectSection, SubTopic } from '../types';

interface TopicListProps {
  part: ExamPart;
  onBack: () => void;
  onSelectTopic: (topic: SubTopic) => void;
}

const TopicList: React.FC<TopicListProps> = ({ part, onBack, onSelectTopic }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(part.sections[0]?.id || null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-12 md:pt-[80px] pb-6">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        กลับสู่หน้าหลัก
      </button>

      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{part.subtitle}</h1>
        <span className={`inline-block px-8 py-3 rounded-2xl text-2xl font-bold text-white ${part.color === 'blue' ? 'bg-blue-600' : part.color === 'orange' ? 'bg-orange-600' : 'bg-green-600'}`}>
          {part.title}
        </span>
      </div>

      <div className="space-y-4">
        {part.sections.map((section: SubjectSection) => (
          <div key={section.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <h3 className="font-semibold text-lg text-slate-800">{section.title}</h3>
              {expandedSection === section.id ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="p-2 space-y-1">
                {section.subTopics.map((topic) => (
                  <div key={topic.id} className="relative">
                    {section.isSelfStudy ? (
                       <div className="p-4 m-2 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-3">
                         <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                         <div>
                           <h4 className="font-medium text-yellow-800">{topic.title}</h4>
                           <p className="text-sm text-yellow-700 mt-1">
                             วิชาเอกมีความหลากหลาย ผู้สมัครต้องศึกษาตามสาขาวิชาของตนเอง
                           </p>
                         </div>
                       </div>
                    ) : (
                      <button
                        onClick={() => onSelectTopic(topic)}
                        className="w-full p-4 rounded-md hover:bg-blue-50 text-left transition-colors flex justify-between items-center group"
                      >
                        <div>
                          <h4 className="font-medium text-slate-700 group-hover:text-blue-700">
                            {topic.title}
                          </h4>
                          {topic.description && (
                            <p className="text-sm text-slate-500 mt-1">{topic.description}</p>
                          )}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600">
                          เริ่มเรียน
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicList;
