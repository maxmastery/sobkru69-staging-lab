import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, MessageSquare, Clock, CheckCircle2, Edit3, Inbox, Send as SendIcon, Loader2 } from 'lucide-react';
import { authService, User, SupportMessage } from '../services/authService';

interface ContactSupportProps {
  user: User;
  onBack: () => void;
  readSupportMessageIds?: string[];
  onMarkMessageRead?: (messageId: string) => void | Promise<void>;
}

const ContactSupport: React.FC<ContactSupportProps> = ({
  user,
  onBack,
  readSupportMessageIds = [],
  onMarkMessageRead,
}) => {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [view, setView] = useState<'inbox' | 'compose' | 'message'>('inbox');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getSupportMessages();
      if (res.success) {
        const userMessages = res.messages.filter(m => m.userId === user.id);
        userMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMessages(userMessages);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await authService.saveSupportMessage({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        subject,
        content
      });
      
      if (res.success) {
        setSubject('');
        setContent('');
        await fetchMessages();
        setView('inbox');
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeMessage = messages.find(m => m.id === activeMessageId);

  useEffect(() => {
    if (activeMessageId && activeMessage && activeMessage.status === 'replied') {
      if (!readSupportMessageIds.includes(activeMessageId)) {
        void onMarkMessageRead?.(activeMessageId);
      }
    }
  }, [activeMessageId, activeMessage, readSupportMessageIds, onMarkMessageRead]);

  const handleMessageClick = (id: string) => {
    setActiveMessageId(id);
    setView('message');
  };

  const getUnreadCount = () => {
    return messages.filter(m => m.status === 'replied' && !readSupportMessageIds.includes(m.id)).length;
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full animate-in fade-in duration-500 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-2xl font-medium text-slate-800">ติดต่อผู้ดูแลระบบ</h1>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-xl flex items-start gap-3 shrink-0">
        <div className="bg-amber-100 p-1.5 rounded-full shrink-0">
          <MessageSquare className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="font-bold text-amber-800 mb-1">ประกาศจากผู้ดูแลระบบ</h4>
          <p className="text-amber-700 text-sm">
            กรุณาใช้ถ้อยคำที่สุภาพในการติดต่อสอบถาม เพื่อสร้างสังคมการเรียนรู้ที่ดีร่วมกัน หากพบข้อความที่ไม่เหมาะสม ผู้ดูแลระบบขอสงวนสิทธิ์ในการระงับการใช้งานโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white rounded-2xl border border-slate-200">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-200 p-4 flex flex-col shrink-0 bg-slate-50/50">
          <button
            onClick={() => setView('compose')}
            className="flex items-center gap-3 px-6 py-4 bg-blue-100 text-blue-800 rounded-2xl hover:bg-blue-200 transition-colors font-medium mb-6"
          >
            <Edit3 className="w-5 h-5" />
            เขียน
          </button>

          <nav className="space-y-1">
            <button
              onClick={() => { setView('inbox'); setActiveMessageId(null); }}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full transition-colors ${
                view === 'inbox' ? 'bg-blue-100/50 text-blue-800 font-medium' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" />
                กล่องจดหมาย
              </div>
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          ) : view === 'compose' ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                <button onClick={() => setView('inbox')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h2 className="text-lg font-medium text-slate-800">ข้อความใหม่</h2>
              </div>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 max-w-3xl">
                <div className="mb-4 border-b border-slate-200 pb-2">
                  <input
                    type="text"
                    placeholder="หัวข้อ"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-2 py-1 text-lg focus:outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="flex-1 mb-4">
                  <textarea
                    placeholder="รายละเอียดข้อความ..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full px-2 py-1 resize-none focus:outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4" />}
                    {isSubmitting ? 'กำลังส่ง...' : 'ส่ง'}
                  </button>
                </div>
              </form>
            </div>
          ) : view === 'message' && activeMessage ? (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center gap-4 shrink-0">
                <button onClick={() => setView('inbox')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <h2 className="text-2xl font-normal text-slate-900 mb-8">{activeMessage.subject}</h2>
                
                {/* Original Message */}
                <div className="flex gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                    {activeMessage.userName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-bold text-slate-900 mr-2">{activeMessage.userName}</span>
                        <span className="text-sm text-slate-500">&lt;{activeMessage.userEmail}&gt;</span>
                      </div>
                      <span className="text-sm text-slate-500">{new Date(activeMessage.date).toLocaleString('th-TH')}</span>
                    </div>
                    <div className="text-slate-800 whitespace-pre-wrap mt-4">
                      {activeMessage.content}
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {activeMessage.replies.map((reply, idx) => (
                  <div key={idx} className="flex gap-4 mb-8 border-t border-slate-100 pt-8">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      reply.sender === 'user' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-600 text-white'
                    }`}>
                      {reply.sender === 'user' ? activeMessage.userName.charAt(0) : 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="font-bold text-slate-900 mr-2">
                            {reply.sender === 'user' ? activeMessage.userName : 'Admin ผู้ดูแลระบบ'}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">{new Date(reply.date).toLocaleString('th-TH')}</span>
                      </div>
                      <div className="text-slate-800 whitespace-pre-wrap mt-4">
                        {reply.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden bg-slate-50/30">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Inbox className="w-16 h-16 mb-4 opacity-20" />
                  <p>ไม่มีข้อความ</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-8">
                  {(() => {
                    const unreadMessages = messages.filter(msg => msg.status === 'replied' && !readSupportMessageIds.includes(msg.id));
                    const readMessages = messages.filter(msg => !(msg.status === 'replied' && !readSupportMessageIds.includes(msg.id)));

                    return (
                      <>
                        {unreadMessages.length > 0 && (
                          <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-3 px-2 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              ข้อความที่ยังไม่ได้อ่าน ({unreadMessages.length})
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                              {unreadMessages.map(msg => (
                                <button
                                  key={msg.id}
                                  onClick={() => handleMessageClick(msg.id)}
                                  className="w-full text-left flex items-center px-4 py-4 hover:bg-slate-50 transition-colors group"
                                >
                                  <div className="w-48 shrink-0 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                                      {msg.userName.charAt(0)}
                                    </div>
                                    <span className="truncate font-bold text-slate-900">
                                      {msg.userName}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0 flex items-center gap-2 px-4">
                                    <span className="truncate font-bold text-slate-900">
                                      {msg.subject}
                                    </span>
                                    <span className="text-slate-400 shrink-0">-</span>
                                    <span className="text-slate-500 truncate">
                                      {msg.content}
                                    </span>
                                  </div>
                                  <div className="w-32 shrink-0 text-right text-sm font-bold text-blue-600">
                                    {new Date(msg.date).toLocaleString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {readMessages.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-3 px-2">
                              ข้อความทั้งหมด
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                              {readMessages.map(msg => (
                                <button
                                  key={msg.id}
                                  onClick={() => handleMessageClick(msg.id)}
                                  className="w-full text-left flex items-center px-4 py-4 hover:bg-slate-50 transition-colors group opacity-80 hover:opacity-100"
                                >
                                  <div className="w-48 shrink-0 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                                      {msg.userName.charAt(0)}
                                    </div>
                                    <span className="truncate font-medium text-slate-700">
                                      {msg.userName}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0 flex items-center gap-2 px-4">
                                    <span className="truncate text-slate-800">
                                      {msg.subject}
                                    </span>
                                    <span className="text-slate-400 shrink-0">-</span>
                                    <span className="text-slate-500 truncate">
                                      {msg.content}
                                    </span>
                                  </div>
                                  <div className="w-32 shrink-0 text-right text-sm text-slate-500">
                                    {new Date(msg.date).toLocaleString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
