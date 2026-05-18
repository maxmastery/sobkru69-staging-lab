import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Link as LinkIcon, User } from 'lucide-react';
import { NewsItem } from './admin/AdminNews';
import { contentService } from '../services/contentService';
import type { FeatureTheme } from './FeatureThemeToggle';

interface NewsPageProps {
  onBack: () => void;
  theme?: FeatureTheme;
}

const NewsPage: React.FC<NewsPageProps> = ({ onBack, theme = 'light' }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pageThemeClass = `feature-page ${theme === 'dark' ? 'feature-dark' : 'feature-light'}`;

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
      setNews(current => current.map(entry =>
        entry.id === item.id ? { ...entry, viewCount: Math.max(entry.viewCount || 0, item.viewCount || 0) + 1 } : entry
      ));
      setSelectedNews(current => current && current.id === item.id
        ? { ...current, viewCount: Math.max(current.viewCount || 0, item.viewCount || 0) + 1 }
        : current
      );
    } catch (error) {
      console.error('Failed to record news view', error);
    }
  };

  if (selectedNews) {
    return (
      <div className={`${pageThemeClass} w-full px-6 pt-8 pb-12 animate-in fade-in duration-300 md:pt-[60px]`}>
        <div className="mx-auto max-w-[800px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => setSelectedNews(null)} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5 mr-2" />
              กลับไปหน้าข่าวสาร
            </button>
          </div>

          <div className="w-full">
            <h1 className="mb-8 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              {selectedNews.title}
            </h1>

            {selectedNews.imageUrl && (
              <div className="mb-8 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                <img src={selectedNews.imageUrl} alt={selectedNews.title} className="h-auto max-w-full object-contain" />
              </div>
            )}

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5">
                  <Calendar className="w-4 h-4" />
                  {selectedNews.date}
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5">
                  <User className="w-4 h-4" />
                  {selectedNews.author}
                </div>
                {selectedNews.source && (
                  <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5">
                    <LinkIcon className="w-4 h-4" />
                    {selectedNews.source}
                  </div>
                )}
              </div>

              <div className="prose prose-slate ql-editor-display max-w-none text-slate-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pageThemeClass} w-full px-6 pt-8 pb-8 animate-in fade-in duration-300 md:px-[80px] md:pt-[60px]`}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับหน้าหลัก
          </button>
        </div>
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-slate-800">
          ข่าวสารประชาสัมพันธ์
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-slate-100">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-700">กำลังโหลดข่าวสาร</h3>
            <p className="text-slate-500">กำลังดึงข้อมูลจากระบบกลาง...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map(item => (
              <div
                key={item.id}
                onClick={() => void openNews(item)}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">ไม่มีรูปภาพ</div>
                  )}
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <div className="mt-auto">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        void openNews(item);
                      }}
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
                    >
                      อ่านเพิ่มเติม
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.author}
                    </div>
                    {item.source && (
                      <div className="flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                        {item.source.length > 20 ? item.source.substring(0, 20) + '...' : item.source}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-700">ยังไม่มีข่าวสารในขณะนี้</h3>
            <p className="text-slate-500">โปรดติดตามประกาศใหม่ๆ เร็วๆ นี้</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
