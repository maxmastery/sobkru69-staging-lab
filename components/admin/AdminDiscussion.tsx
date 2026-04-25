import React, { useState, useEffect } from 'react';
import { Trash2, MessageSquare, Search, Eye, Tag, User, Calendar, CheckCircle2 } from 'lucide-react';
import { contentService } from '../../services/contentService';

export interface DiscussionReply {
  id: string;
  author: string;
  content: string;
  date: string;
  isAdmin?: boolean;
}

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  author: string;
  tag: 'question' | 'suggestion';
  date: string;
  repliesCount: number;
  status: 'active' | 'closed';
  replies?: DiscussionReply[];
  isHighlighted?: boolean;
}

const AdminDiscussion: React.FC = () => {
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<'all' | 'question' | 'suggestion'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [viewingThread, setViewingThread] = useState<DiscussionThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    setIsLoading(true);
    try {
      const rows = await contentService.getDiscussionThreads({ includeInactive: true });
      setThreads(rows as DiscussionThread[]);
    } catch (error) {
      console.error('Failed to load discussion threads', error);
      setThreads([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      setIsLoading(true);
      try {
        await contentService.deleteDiscussionThread(deleteConfirmId);
        setThreads(current => current.filter(t => t.id !== deleteConfirmId));
      } catch (error) {
        console.error('Failed to delete discussion thread', error);
      } finally {
        setIsLoading(false);
      }
      setDeleteConfirmId(null);
    }
  };

  const filteredThreads = threads.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || t.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหากระทู้ หรือชื่อผู้ตั้ง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value as any)}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
          >
            <option value="all">ทุกหมวดหมู่</option>
            <option value="question">คำถาม/ปัญหา</option>
            <option value="suggestion">ข้อเสนอแนะ</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">หัวข้อกระทู้</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ผู้ตั้งกระทู้</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">หมวดหมู่</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">ตอบกลับ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">วันที่</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && filteredThreads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    กำลังโหลดกระทู้จากระบบกลาง...
                  </td>
                </tr>
              )}
              {filteredThreads.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1 mt-1">{item.content}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {item.author.charAt(0)}
                      </div>
                      {item.author}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.tag === 'question' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      <Tag className="w-3 h-3" />
                      {item.tag === 'question' ? 'คำถาม' : 'เสนอแนะ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                      {item.repliesCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.date}</td>
                  <td className="px-6 py-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setViewingThread(item)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="ดูรายละเอียด">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ลบกระทู้">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredThreads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
                      <p>ไม่พบข้อมูลกระทู้สนทนา</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">ยืนยันการลบกระทู้</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">
              คุณแน่ใจหรือไม่ว่าต้องการลบกระทู้นี้? การดำเนินการนี้ไม่สามารถกู้คืนได้
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                ลบกระทู้
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Thread Modal */}
      {viewingThread && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">รายละเอียดกระทู้</h2>
              <button onClick={() => setViewingThread(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    viewingThread.tag === 'question' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Tag className="w-3.5 h-3.5" />
                    {viewingThread.tag === 'question' ? 'คำถาม' : 'เสนอแนะ'}
                  </span>
                  <span className="text-sm text-slate-500">{viewingThread.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{viewingThread.title}</h3>
                <div className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {viewingThread.content}
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  โดย <span className="font-medium text-slate-700">{viewingThread.author}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  ความคิดเห็น ({viewingThread.repliesCount || 0})
                </h4>
                <div className="space-y-4">
                  {viewingThread.replies && viewingThread.replies.length > 0 ? (
                    viewingThread.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm ${
                          reply.isAdmin ? 'bg-slate-800 text-white' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {reply.isAdmin ? 'A' : reply.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-medium text-slate-800 text-sm">{reply.author}</span>
                            {reply.isAdmin && <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-full font-medium">ผู้ดูแลระบบ</span>}
                            <span className="text-xs text-slate-500 ml-auto">{new Date(reply.date).toLocaleString('th-TH')}</span>
                          </div>
                          <div className="text-slate-700 text-sm whitespace-pre-wrap">
                            {reply.content}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-4 text-sm">ยังไม่มีความคิดเห็น</div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setViewingThread(null)}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDiscussion;
