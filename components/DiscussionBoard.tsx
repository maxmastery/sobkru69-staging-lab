import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Tag, Clock, Search, Plus, Send, AlertTriangle, ShieldAlert, Star, Lightbulb } from 'lucide-react';
import { DiscussionThread, DiscussionReply } from './admin/AdminDiscussion';
import { Report, BannedUser } from './admin/AdminReports';
import { contentService } from '../services/contentService';
import { User as AuthUser } from '../services/authService';

interface DiscussionBoardProps {
  onBack: () => void;
  currentUser: AuthUser;
}

const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ onBack, currentUser }) => {
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBoardTab, setActiveBoardTab] = useState<'question' | 'suggestion'>('question');
  const [view, setView] = useState<'list' | 'create' | 'thread' | 'edit'>('list');
  const [activeThread, setActiveThread] = useState<DiscussionThread | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<'question' | 'suggestion'>('question');

  // Reply form state
  const [replyContent, setReplyContent] = useState('');

  // Report state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<'post' | 'comment'>('post');
  const [reportTargetId, setReportTargetId] = useState('');
  const [reportTargetContent, setReportTargetContent] = useState('');
  const [reportedUserId, setReportedUserId] = useState('');
  const [reportedUserName, setReportedUserName] = useState('');
  const [reportReason, setReportReason] = useState('');

  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBoardData();
  }, []);

  const openThread = async (thread: DiscussionThread) => {
    setActiveThread(thread);
    setView('thread');

    try {
      await contentService.recordContentView('discussion', thread.id);
    } catch (error) {
      console.error('Failed to record discussion view', error);
    }
  };

  const loadBoardData = async (threadId?: string) => {
    setIsLoading(true);
    try {
      const [threadRows, bannedRows] = await Promise.all([
        contentService.getDiscussionThreads(),
        contentService.getBannedUsers(),
      ]);
      setThreads(threadRows as DiscussionThread[]);
      setBannedUsers(bannedRows as BannedUser[]);

      if (threadId) {
        const refreshedThread = (threadRows as DiscussionThread[]).find(item => item.id === threadId) || null;
        setActiveThread(refreshedThread);
        if (!refreshedThread && view === 'thread') {
          setView('list');
        }
      }
    } catch (error) {
      console.error('Failed to load discussion board data', error);
      setThreads([]);
      setBannedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: Partial<DiscussionThread> = {
      title: newTitle,
      content: newContent,
      author: currentUser.email === 'Krumax' ? 'Admin ผู้ดูแลระบบ' : currentUser.name,
      tag: newTag,
      date: new Date().toISOString(),
      repliesCount: 0,
      status: 'active',
      replies: []
    };

    setIsLoading(true);
    try {
      await contentService.saveDiscussionThread(newThread);
      await loadBoardData();
      setActiveBoardTab(newTag);
      setView('list');
      setNewTitle('');
      setNewContent('');
    } catch (error) {
      console.error('Failed to create discussion thread', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !newTitle.trim() || !newContent.trim()) return;

    const updatedThread: DiscussionThread = {
      ...activeThread,
      title: newTitle,
      content: newContent,
      tag: newTag
    };

    setIsLoading(true);
    try {
      await contentService.saveDiscussionThread(updatedThread);
      await loadBoardData(updatedThread.id);
      setView('thread');
    } catch (error) {
      console.error('Failed to update discussion thread', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!activeThread) return;
    setIsLoading(true);
    try {
      await contentService.deleteDiscussionThread(activeThread.id);
      setThreads(current => current.filter(item => item.id !== activeThread.id));
      setShowDeleteConfirm(false);
      setView('list');
      setActiveThread(null);
    } catch (error) {
      console.error('Failed to delete thread', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !replyContent.trim()) return;

    const newReply: Partial<DiscussionReply> = {
      author: currentUser.email === 'Krumax' ? 'Admin ผู้ดูแลระบบ' : currentUser.name,
      content: replyContent,
      date: new Date().toISOString(),
      isAdmin: currentUser.email === 'Krumax'
    };

    setIsLoading(true);
    try {
      await contentService.saveDiscussionReply(activeThread.id, newReply);
      await loadBoardData(activeThread.id);
      setReplyContent('');
    } catch (error) {
      console.error('Failed to save reply', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 100;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeBoardTab, searchTerm]);

  const handleToggleHighlight = async (id: string) => {
    const thread = threads.find(t => t.id === id);
    if (!thread) return;

    const currentHighlights = threads.filter(t => t.isHighlighted);
    
    if (!thread.isHighlighted && currentHighlights.length >= 2) {
      alert('สามารถปักหมุดกระทู้ได้สูงสุด 2 กระทู้เท่านั้น');
      return;
    }

    setIsLoading(true);
    try {
      await contentService.toggleDiscussionHighlight(id, !thread.isHighlighted);
      setThreads(current => current.map(item =>
        item.id === id ? { ...item, isHighlighted: !item.isHighlighted } : item
      ));
      if (activeThread?.id === id) {
        setActiveThread(current => current ? { ...current, isHighlighted: !current.isHighlighted } : current);
      }
    } catch (error) {
      console.error('Failed to toggle highlight', error);
    } finally {
      setIsLoading(false);
    }
  };

  const questionCount = threads.filter(t => t.tag === 'question').length;
  const suggestionCount = threads.filter(t => t.tag === 'suggestion').length;

  const filteredThreads = threads.filter(t =>
    t.tag === activeBoardTab &&
    (
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);
  const paginatedThreads = filteredThreads.slice(
    (currentPage - 1) * threadsPerPage,
    currentPage * threadsPerPage
  );

  const handleOpenReportModal = (type: 'post' | 'comment', targetId: string, targetContent: string, reportedUserId: string, reportedUserName: string) => {
    setReportType(type);
    setReportTargetId(targetId);
    setReportTargetContent(targetContent);
    setReportedUserId(reportedUserId);
    setReportedUserName(reportedUserName);
    setReportReason('');
    setShowReportModal(true);
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;

    const newReport: Omit<Report, 'id' | 'status' | 'date'> & { status?: Report['status']; date?: string } = {
      reporterId: currentUser.id || currentUser.email,
      reporterName: currentUser.name,
      reportedUserId,
      reportedUserName,
      reason: reportReason,
      type: reportType,
      targetId: reportTargetId,
      targetContent: reportTargetContent,
      date: new Date().toISOString(),
      status: 'pending'
    };

    setIsLoading(true);
    try {
      await contentService.saveReport(newReport);
      setShowReportModal(false);
      alert('ส่งรายงานเรียบร้อยแล้ว ผู้ดูแลระบบจะทำการตรวจสอบโดยเร็วที่สุด');
    } catch (error) {
      console.error('Failed to submit report', error);
      alert('ส่งรายงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const getBanCount = (userName: string) => {
    return bannedUsers.filter(u => u.userName === userName).length;
  };

  const isUserBanned = (userName: string, userId?: string) => {
    const banRecord = bannedUsers.find(u => u.userId === userId || u.userName === userName);
    if (banRecord) {
      if (banRecord.banType === 'permanent') return true;
      if (banRecord.banType === 'temporary' && banRecord.banUntil) {
        return new Date(banRecord.banUntil) > new Date();
      }
    }
    return false;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[60px] pb-8 animate-in fade-in duration-300">
      <button onClick={() => view === 'list' ? onBack() : setView('list')} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" />
        {view === 'list' ? 'กลับหน้าหลัก' : 'กลับไปหน้ารวมกระทู้'}
      </button>
      
      {view === 'list' && (
        <>
          <div className="relative mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              กระดานสนทนา / สอบถามปัญหา
            </h1>
            <p className="mt-2 text-base md:text-lg font-medium text-slate-500">
              ถามปัญหา แลกเปลี่ยนความรู้ และช่วยกันหาคำตอบ
            </p>
            <button 
              onClick={() => {
                setNewTag(activeBoardTab);
                setView('create');
              }}
              disabled={isUserBanned(currentUser.name, currentUser.id)}
              className={`mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-all duration-300 md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 ${
                isUserBanned(currentUser.name, currentUser.id) 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : activeBoardTab === 'question'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700'
                    : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700'
              }`}
              title={isUserBanned(currentUser.name, currentUser.id) ? 'บัญชีของคุณถูกระงับการตั้งกระทู้ชั่วคราว' : ''}
            >
              <Plus className="w-5 h-5" />
              {activeBoardTab === 'question' ? 'ตั้งกระทู้ใหม่' : 'ส่งคำแนะนำ'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
            <button
              onClick={() => setActiveBoardTab('question')}
              className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                activeBoardTab === 'question'
                  ? 'border-indigo-300 bg-indigo-600 text-white shadow-xl shadow-indigo-900/15'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                  activeBoardTab === 'question' ? 'bg-white/18 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                }`}>
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-black">กระดานสนทนา / สอบถามปัญหา</div>
                  <div className={`text-xs ${activeBoardTab === 'question' ? 'text-indigo-100' : 'text-slate-500'}`}>
                    คำถามและการแลกเปลี่ยนความรู้
                  </div>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                activeBoardTab === 'question' ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {questionCount}
              </span>
            </button>

            <button
              onClick={() => setActiveBoardTab('suggestion')}
              className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                activeBoardTab === 'suggestion'
                  ? 'border-emerald-300 bg-emerald-600 text-white shadow-xl shadow-emerald-900/15'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                  activeBoardTab === 'suggestion' ? 'bg-white/18 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }`}>
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-black">คำแนะนำ</div>
                  <div className={`text-xs ${activeBoardTab === 'suggestion' ? 'text-emerald-100' : 'text-slate-500'}`}>
                    เสนอไอเดียและสิ่งที่อยากให้พัฒนา
                  </div>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                activeBoardTab === 'suggestion' ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {suggestionCount}
              </span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder={activeBoardTab === 'question' ? 'ค้นหากระทู้หรือคำถาม...' : 'ค้นหาคำแนะนำ...'} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
          
          {isLoading && paginatedThreads.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">กำลังโหลดกระดานสนทนา</h3>
              <p className="text-slate-500">กำลังดึงกระทู้จากระบบกลาง...</p>
            </div>
          ) : paginatedThreads.length > 0 ? (
            <div className="space-y-4">
              {paginatedThreads.map((thread) => (
                <div key={thread.id} onClick={() => void openThread(thread)} className={`bg-white p-6 rounded-2xl border ${thread.isHighlighted ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200'} hover:border-indigo-300 transition-colors cursor-pointer group`}>
                  <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {thread.isHighlighted && (
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        thread.tag === 'question' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <Tag className="w-3.5 h-3.5" />
                        {thread.tag === 'question' ? 'คำถาม' : 'คำแนะนำ'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {thread.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {(() => {
                          const dateStr = thread.date;
                          // Handle both old format (YYYY-MM-DD) and new ISO format
                          const date = dateStr.includes('T') ? new Date(dateStr) : new Date(dateStr + 'T00:00:00');
                          return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                        })()}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium text-slate-700">{thread.repliesCount}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {thread.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {thread.author.charAt(0)}
                      </div>
                      โดย <span className="font-medium text-slate-700">{thread.author}</span>
                      {getBanCount(thread.author) > 0 && (
                        <div className="group/ban relative flex items-center">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/ban:block w-max bg-slate-800 text-white text-xs rounded py-1 px-2 z-10">
                            เคยถูกระงับการใช้งาน ({getBanCount(thread.author)} ครั้ง)
                          </div>
                        </div>
                      )}
                    </div>
                    {currentUser.email === 'Krumax' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleHighlight(thread.id);
                        }}
                        className={`p-2 rounded-lg transition-colors ${thread.isHighlighted ? 'text-amber-500 hover:bg-amber-100' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'}`}
                        title={thread.isHighlighted ? "ยกเลิกการปักหมุด" : "ปักหมุดกระทู้"}
                      >
                        <Star className={`w-5 h-5 ${thread.isHighlighted ? 'fill-amber-500' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">ไม่พบข้อมูลในหมวดนี้</h3>
              <p className="text-slate-500">ลองค้นหาด้วยคำอื่น หรือเริ่มสร้างรายการแรกในหมวดนี้เลย!</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-600">
                แสดง <span className="font-medium text-slate-900">{(currentPage - 1) * threadsPerPage + 1}</span> ถึง <span className="font-medium text-slate-900">{Math.min(currentPage * threadsPerPage, filteredThreads.length)}</span> จากทั้งหมด <span className="font-medium text-slate-900">{filteredThreads.length}</span> กระทู้
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ก่อนหน้า
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {view === 'create' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {newTag === 'question' ? 'ตั้งกระทู้ใหม่' : 'ส่งคำแนะนำ'}
          </h2>
          <form onSubmit={handleCreateThread} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">ประเภท</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    value="question"
                    checked={newTag === 'question'}
                    onChange={() => setNewTag('question')}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span>คำถาม</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    value="suggestion"
                    checked={newTag === 'suggestion'}
                    onChange={() => setNewTag('suggestion')}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span>คำแนะนำ</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {newTag === 'question' ? 'หัวข้อกระทู้' : 'หัวข้อคำแนะนำ'}
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={newTag === 'question' ? 'ระบุหัวข้อที่ต้องการสนทนา...' : 'ระบุหัวข้อคำแนะนำที่อยากเสนอ...'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียด</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-40 resize-none"
                placeholder={newTag === 'question' ? 'พิมพ์รายละเอียดเนื้อหา...' : 'พิมพ์คำแนะนำหรือไอเดียที่อยากให้พัฒนา...'}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setView('list')} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                ยกเลิก
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 text-white rounded-xl font-medium transition-colors ${
                  newTag === 'question' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {newTag === 'question' ? 'ตั้งกระทู้' : 'ส่งคำแนะนำ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {view === 'thread' && activeThread && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                activeThread.tag === 'question' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <Tag className="w-3.5 h-3.5" />
                {activeThread.tag === 'question' ? 'คำถาม' : 'คำแนะนำ'}
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {(() => {
                  const dateStr = activeThread.date;
                  const date = dateStr.includes('T') ? new Date(dateStr) : new Date(dateStr + 'T00:00:00');
                  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                })()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{activeThread.title}</h2>
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed mb-8">
              {activeThread.content}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {activeThread.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-slate-800 flex items-center gap-2">
                    {activeThread.author}
                    {getBanCount(activeThread.author) > 0 && (
                      <div className="group/ban relative flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/ban:block w-max bg-slate-800 text-white text-xs rounded py-1 px-2 z-10">
                          เคยถูกระงับการใช้งาน ({getBanCount(activeThread.author)} ครั้ง)
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">เจ้าของกระทู้</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activeThread.author !== currentUser.name && currentUser.email !== 'Krumax' && (
                  <button 
                    onClick={() => handleOpenReportModal('post', activeThread.id, activeThread.content, activeThread.author, activeThread.author)}
                    className="px-4 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    รายงาน
                  </button>
                )}
                {(activeThread.author === currentUser.name || currentUser.email === 'Krumax') && (
                  <>
                    {activeThread.author === currentUser.name && (
                    <button 
                      onClick={() => {
                        setNewTitle(activeThread.title);
                        setNewContent(activeThread.content);
                        setNewTag(activeThread.tag);
                        setView('edit');
                      }}
                      className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      แก้ไขกระทู้
                    </button>
                  )}
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    ลบกระทู้
                  </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              ความคิดเห็น ({activeThread.repliesCount || 0})
            </h3>
            
            <div className="space-y-6 mb-8">
              {activeThread.replies && activeThread.replies.length > 0 ? (
                activeThread.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      reply.isAdmin ? 'bg-slate-800 text-white' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {reply.isAdmin ? 'A' : reply.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium text-slate-800 flex items-center gap-1">
                          {reply.author}
                          {getBanCount(reply.author) > 0 && (
                            <div className="group/ban relative flex items-center ml-1">
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/ban:block w-max bg-slate-800 text-white text-[10px] rounded py-1 px-2 z-10">
                                เคยถูกระงับ ({getBanCount(reply.author)} ครั้ง)
                              </div>
                            </div>
                          )}
                        </span>
                        {reply.isAdmin && <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-full font-medium">ผู้ดูแลระบบ</span>}
                        <span className="text-xs text-slate-500 ml-auto">{new Date(reply.date).toLocaleString('th-TH')}</span>
                      </div>
                      <div className="text-slate-700 text-sm whitespace-pre-wrap">
                        {reply.content}
                      </div>
                      {reply.author !== currentUser.name && !reply.isAdmin && currentUser.email !== 'Krumax' && (
                        <div className="mt-2 flex justify-end">
                          <button 
                            onClick={() => handleOpenReportModal('comment', reply.id, reply.content, reply.author, reply.author)}
                            className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                          >
                            <ShieldAlert className="w-3 h-3" />
                            รายงาน
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-4">ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็นเลย!</div>
              )}
            </div>

            <form onSubmit={handleAddReply} className="flex gap-3">
              {isUserBanned(currentUser.name, currentUser.id) ? (
                <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100">
                  บัญชีของคุณถูกระงับการแสดงความคิดเห็นชั่วคราว
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="แสดงความคิดเห็น..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                  <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shrink-0">
                    <Send className="w-4 h-4" />
                    ส่ง
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
      {view === 'edit' && activeThread && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">แก้ไขกระทู้</h2>
          <form onSubmit={handleEditThread} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">ประเภท</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="tag" 
                    value="question"
                    checked={newTag === 'question'}
                    onChange={() => setNewTag('question')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">คำถาม</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="tag" 
                    value="suggestion"
                    checked={newTag === 'suggestion'}
                    onChange={() => setNewTag('suggestion')}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">คำแนะนำ</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">หัวข้อกระทู้</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="ตั้งหัวข้อที่ชัดเจนและเข้าใจง่าย"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียด</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="อธิบายรายละเอียดคำถามหรือข้อเสนอแนะของคุณ..."
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setView('thread')}
                className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                บันทึกการแก้ไข
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">ยืนยันการลบกระทู้</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">
              คุณแน่ใจหรือไม่ว่าต้องการลบกระทู้นี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleDeleteThread}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                ลบกระทู้
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">รายงานความไม่เหมาะสม</h3>
                <p className="text-sm text-slate-500">รายงานผู้ใช้: {reportedUserName}</p>
              </div>
            </div>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">เหตุผลที่รายงาน</label>
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none h-32"
                  placeholder="โปรดระบุเหตุผลที่รายงาน (เช่น ใช้ถ้อยคำไม่สุภาพ, สแปม, เนื้อหาไม่เหมาะสม)..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  ส่งรายงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionBoard;
