import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, CheckCircle2, Reply, Clock, User as UserIcon, Loader2 } from 'lucide-react';
import { authService, SupportMessage } from '../../services/authService';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getSupportMessages();
      if (res.success) {
        // Sort by date descending
        const sorted = res.messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMessages(sorted);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: SupportMessage['status']) => {
    if (newStatus === 'acknowledged') setIsAcknowledging(true);
    try {
      let newReplies = undefined;
      const messageToUpdate = messages.find(m => m.id === id);
      
      // If acknowledging, automatically send a reply
      if (newStatus === 'acknowledged' && messageToUpdate) {
        const newReply = {
          id: Date.now().toString(),
          sender: 'admin' as const,
          content: 'ผู้ดูแลระบบได้รับทราบข้อความของคุณแล้ว และกำลังดำเนินการตรวจสอบครับ',
          date: new Date().toISOString()
        };
        newReplies = [...messageToUpdate.replies, newReply];
        newStatus = 'replied'; // Change status to replied so user sees it
      }

      const updateData: any = { status: newStatus };
      if (newReplies) {
        updateData.replies = newReplies;
      }

      const res = await authService.updateSupportMessage(id, updateData);
      if (res.success) {
        const updatedMessages = messages.map(m => 
          m.id === id ? { ...m, status: newStatus, replies: newReplies || m.replies } : m
        );
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsAcknowledging(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessageId || !replyContent.trim()) return;

    setIsReplying(true);
    try {
      const messageToUpdate = messages.find(m => m.id === activeMessageId);
      if (!messageToUpdate) return;

      const newReply = {
        id: Date.now().toString(),
        sender: 'admin' as const,
        content: replyContent,
        date: new Date().toISOString()
      };

      const newReplies = [...messageToUpdate.replies, newReply];

      const res = await authService.updateSupportMessage(activeMessageId, { 
        status: 'replied', 
        replies: newReplies 
      });

      if (res.success) {
        const updatedMessages = messages.map(m => {
          if (m.id === activeMessageId) {
            return {
              ...m,
              status: 'replied' as const,
              replies: newReplies
            };
          }
          return m;
        });
        setMessages(updatedMessages);
        setReplyContent('');
      }
    } catch (error) {
      console.error("Failed to send reply", error);
    } finally {
      setIsReplying(false);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadMessages = filteredMessages.filter(m => m.status === 'unread');
  const readMessages = filteredMessages.filter(m => m.status !== 'unread');

  const activeMessage = messages.find(m => m.id === activeMessageId);

  // Mark as read when opened
  useEffect(() => {
    if (activeMessage && activeMessage.status === 'unread') {
      handleStatusChange(activeMessage.id, 'read');
    }
  }, [activeMessageId]);

  const renderMessageItem = (msg: SupportMessage) => (
    <button
      key={msg.id}
      onClick={() => setActiveMessageId(msg.id)}
      className={`w-full text-left p-4 transition-colors relative ${
        activeMessageId === msg.id ? 'bg-indigo-50' : 'hover:bg-slate-50'
      } ${msg.status === 'unread' ? 'bg-white font-bold' : 'bg-slate-50/30'}`}
    >
      {msg.status === 'unread' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
      )}
      <div className="flex justify-between items-baseline mb-1">
        <span className={`text-sm truncate pr-2 ${msg.status === 'unread' ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
          {msg.userName}
        </span>
        <span className="text-[10px] text-slate-500 shrink-0">
          {new Date(msg.date).toLocaleDateString('th-TH')} {new Date(msg.date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className={`text-sm truncate mb-1 ${msg.status === 'unread' ? 'text-slate-900 font-bold' : 'text-slate-800'}`}>
        {msg.subject}
      </div>
      <div className="text-xs text-slate-500 truncate flex items-center justify-between">
        <span className="truncate">{msg.content}</span>
        {msg.status === 'acknowledged' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-2" />}
        {msg.status === 'replied' && <Reply className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-2" />}
      </div>
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
      {/* Left Column: Message List (Gmail style) */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 shrink-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาข้อความ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 p-8">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              ไม่พบข้อความ
            </div>
          ) : (
            <>
              {unreadMessages.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-indigo-50/50 text-xs font-bold text-indigo-800 uppercase tracking-wider">
                    ข้อความใหม่ ({unreadMessages.length})
                  </div>
                  {unreadMessages.map(renderMessageItem)}
                </div>
              )}
              {readMessages.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-slate-100/50 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    อ่านแล้ว
                  </div>
                  {readMessages.map(renderMessageItem)}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Column: Message Details & Reply */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
        {activeMessage ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-slate-200 shrink-0">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-900">{activeMessage.subject}</h2>
                <div className="flex gap-2">
                  {activeMessage.status !== 'acknowledged' && activeMessage.status !== 'replied' && (
                    <button
                      onClick={() => handleStatusChange(activeMessage.id, 'acknowledged')}
                      disabled={isAcknowledging}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
                    >
                      {isAcknowledging ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {isAcknowledging ? 'กำลังดำเนินการ...' : 'รับทราบเรื่อง'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{activeMessage.userName}</div>
                  <div className="text-sm text-slate-500">{activeMessage.userEmail}</div>
                </div>
                <div className="ml-auto text-sm text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {new Date(activeMessage.date).toLocaleString('th-TH')}
                </div>
              </div>
            </div>

            {/* Email History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
              {/* Original Message */}
              <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                {activeMessage.content}
              </div>

              {/* Replies */}
              {activeMessage.replies.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  {activeMessage.replies.map((reply, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          reply.sender === 'admin' ? 'bg-slate-800 text-white' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {reply.sender === 'admin' ? 'A' : activeMessage.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm">
                            {reply.sender === 'admin' ? 'Admin ผู้ดูแลระบบ' : activeMessage.userName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(reply.date).toLocaleString('th-TH')}
                          </div>
                        </div>
                      </div>
                      <div className="pl-11 text-slate-800 whitespace-pre-wrap leading-relaxed text-sm">
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
              <form onSubmit={handleReply} className="flex flex-col gap-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="พิมพ์ข้อความตอบกลับ..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 text-sm"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!replyContent.trim() || isReplying}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {isReplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Reply className="w-4 h-4" />}
                    {isReplying ? 'กำลังส่ง...' : 'ส่งข้อความตอบกลับ'}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p>เลือกข้อความเพื่อดูรายละเอียดและตอบกลับ</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
