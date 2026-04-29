import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Link as LinkIcon, X, ArrowRight } from 'lucide-react';
import { NewsItem } from './admin/AdminNews';
import { contentService } from '../services/contentService';

interface NewsPageProps {
  onBack: () => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onBack }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const rows = await contentService.getNewsPosts();
        setNews(rows.filter(item => item.status === 'published') as NewsItem[]);
      } catch (error) {
        console.error('Failed to load news posts', error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  const openNews = async (item: NewsItem) => {
    setSelectedNews(item);
    try {
      await contentService.recordContentView('news', item.id);
    } catch (error) {
      console.error('Failed to record news view', error);
    }
  };

  if (selectedNews) {
    return (
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-0 pt-8 md:pt-[60px] pb-12 animate-in fade-in duration-300">
        <button onClick={() => setSelectedNews(null)} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับไปหน้าข่าวสาร
        </button>
        
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {selectedNews.title}
          </h1>

          {selectedNews.imageUrl && (
            <div className="w-full mb-8 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src={selectedNews.imageUrl} alt={selectedNews.title} className="max-w-full h-auto object-contain" />
            </div>
          )}
          
          <div className="">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4" />
                {selectedNews.date}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4" />
                {selectedNews.author}
              </div>
              {selectedNews.source && (
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                  <LinkIcon className="w-4 h-4" />
                  {selectedNews.source}
                </div>
              )}
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed ql-editor-display">
              <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[60px] pb-8 animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" />
        กลับหน้าหลัก
      </button>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        ข่าวสารประชาสัมพันธ์
      </h1>

      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">กำลังโหลดข่าวสาร</h3>
          <p className="text-slate-500">กำลังดึงข้อมูลจากระบบกลาง...</p>
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div 
              key={item.id}
              onClick={() => void openNews(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow flex flex-col h-full group cursor-pointer"
            >
              <div className="h-48 bg-slate-100 overflow-hidden relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">ไม่มีรูปภาพ</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      void openNews(item);
                    }}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-100 group/btn"
                  >
                    อ่านเพิ่มเติม
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.author}
                  </div>
                  {item.source && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" />
                      {item.source.length > 20 ? item.source.substring(0, 20) + '...' : item.source}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">ยังไม่มีข่าวสารในขณะนี้</h3>
          <p className="text-slate-500">โปรดติดตามประกาศใหม่ๆ เร็วๆ นี้</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
