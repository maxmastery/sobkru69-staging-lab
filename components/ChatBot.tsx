import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface ChatBotProps {
  context: string;
  topicTitle: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ context, topicTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    const initChat = async () => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    tools: [{ googleSearch: {} }],
                    systemInstruction: `คุณคือ 'AI Tutor' ผู้เชี่ยวชาญด้านการสอบบรรจุข้าราชการครู สังกัด สพฐ.
                    
                    หน้าที่ของคุณคือ:
                    1. เป็นติวเตอร์เฉพาะเรื่องที่กำลังเรียนอยู่เท่านั้น (${topicTitle})
                    2. ตอบคำถามให้ถูกต้องตามหลักความเป็นจริง โดยอ้างอิงจากเอกสารที่มีอยู่ (เนื้อหาบทเรียนด้านล่าง) หรือค้นหาจากอินเทอร์เน็ต
                    3. หากไม่รู้ หรือหาข้อมูลไม่ได้ ให้บอกว่า "ไม่ทราบ" หรือ "ไม่รู้" ห้ามเดาคำตอบเด็ดขาด
                    4. อธิบายให้เข้าใจง่าย เป็นกันเอง ให้กำลังใจ และกระชับ
                    5. ใช้ภาษาไทยที่ถูกต้องและสุภาพ
                    
                    เนื้อหาบทเรียนปัจจุบัน (${topicTitle}):
                    ${context}
                    `
                }
            });
            setChatSession(chat);
            
            // Add initial greeting if no messages
            if (messages.length === 0) {
                setMessages([{
                    id: 'init',
                    role: 'model',
                    text: `สวัสดีครับ! ผมคือ AI Tutor สำหรับหัวข้อ "**${topicTitle}**" \n\nสงสัยตรงไหนเกี่ยวกับบทเรียนนี้ ถามผมได้เลยนะครับ! 👇`,
                    timestamp: Date.now()
                }]);
            }
        } catch (e) {
            console.error("Failed to init chat", e);
        }
    };

    if (isOpen && !chatSession) {
        initChat();
    }
  }, [isOpen, context, topicTitle, chatSession, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: input,
        timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        const result = await chatSession.sendMessage({ message: userMsg.text });
        const text = result.text || "ขออภัย ผมไม่สามารถตอบคำถามนี้ได้";
        
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: text,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error("Chat error", error);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่ครับ",
            timestamp: Date.now()
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center border border-indigo-500 transition-all hover:scale-110 z-50 animate-bounce-slow"
          aria-label="Open AI Tutor"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
          {/* Header */}
          <div className="bg-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Tutor</h3>
                <p className="text-xs text-indigo-200 truncate max-w-[200px]">{topicTitle}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-indigo-100'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5 text-indigo-600" />}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-pre:bg-slate-800 prose-pre:text-white">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span className="ml-2 text-xs text-slate-500">กำลังพิมพ์...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="ถามข้อสงสัย..."
                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
