import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, Calendar, User, Link as LinkIcon, X, Save, CheckCircle2, Newspaper } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { contentService } from '../../services/contentService';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string;
  imageUrl: string;
  date: string;
  status: 'published' | 'draft';
}

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'color', 'background'
  ];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const rows = await contentService.getNewsPosts();
      setNews(rows as NewsItem[]);
    } catch (error) {
      console.error('Failed to load news', error);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentNews({
      title: '',
      content: '',
      author: 'Admin ผู้ดูแลระบบ',
      source: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      status: 'published'
    });
    setIsEditing(true);
  };

  const handleEdit = (item: NewsItem) => {
    setCurrentNews(item);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      setIsLoading(true);
      try {
        await contentService.deleteNewsPost(deleteConfirmId);
        setNews(current => current.filter(n => n.id !== deleteConfirmId));
      } catch (error) {
        console.error('Failed to delete news', error);
      } finally {
        setIsLoading(false);
      }
      setDeleteConfirmId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const saved = await contentService.saveNewsPost(currentNews);
      setNews(current =>
        currentNews.id
          ? current.map(item => item.id === saved.id ? saved as NewsItem : item)
          : [saved as NewsItem, ...current]
      );
      setIsEditing(false);
      setSaveMessage('บันทึกข่าวสารสำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save news', error);
      setSaveMessage('บันทึกข่าวสารไม่สำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {currentNews.id ? 'แก้ไขข่าวสาร' : 'สร้างข่าวสารใหม่'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">หัวข้อข่าว</label>
              <input
                type="text"
                required
                value={currentNews.title || ''}
                onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-medium"
                placeholder="ใส่หัวข้อข่าวที่นี่..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">เนื้อหาข่าว</label>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <style>{`
                  .ql-editor {
                    min-height: 400px;
                    height: auto;
                    padding-bottom: 40px;
                    font-size: 16px;
                  }
                  .ql-container.ql-snow {
                    border: none !important;
                  }
                  .ql-toolbar.ql-snow {
                    border: none !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                    background-color: #f8fafc;
                  }
                `}</style>
                <ReactQuill
                  theme="snow"
                  value={currentNews.content || ''}
                  onChange={(val) => setCurrentNews({ ...currentNews, content: val })}
                  modules={modules}
                  formats={formats}
                  placeholder="เขียนเนื้อหาข่าวที่นี่..."
                  className="bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> ผู้โพสต์
              </label>
              <input
                type="text"
                required
                value={currentNews.author || ''}
                onChange={(e) => setCurrentNews({ ...currentNews, author: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> วันที่
              </label>
              <input
                type="date"
                required
                value={currentNews.date || ''}
                onChange={(e) => setCurrentNews({ ...currentNews, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> ที่มา / แหล่งอ้างอิง
              </label>
              <input
                type="text"
                value={currentNews.source || ''}
                onChange={(e) => setCurrentNews({ ...currentNews, source: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="เช่น เว็บไซต์ สพฐ."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">สถานะ</label>
              <select
                value={currentNews.status || 'published'}
                onChange={(e) => setCurrentNews({ ...currentNews, status: e.target.value as 'published' | 'draft' })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="published">เผยแพร่ (Published)</option>
                <option value="draft">ฉบับร่าง (Draft)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> รูปภาพหน้าปก
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    try {
                      // Use the specific folder ID requested
                      const folderId = '1Um6oJEFzHQojCwTLc1wei_3MIEuZ7np9';
                      
                      // We need authService to upload the image
                      const { authService } = await import('../../services/authService');
                      const res = await authService.uploadImage(file, folderId);
                      
                      if (res.success && res.url) {
                        setCurrentNews({ ...currentNews, imageUrl: res.url });
                      } else {
                        alert('อัพโหลดรูปภาพไม่สำเร็จ');
                      }
                    } catch (error) {
                      console.error('Error uploading image:', error);
                      alert('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {currentNews.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-48 relative">
                  <img src={currentNews.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x400?text=Image+Error')} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              บันทึกข่าวสาร
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {saveMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {saveMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาข่าวสาร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          สร้างข่าวใหม่
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-24">รูปภาพ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-auto">หัวข้อข่าว</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-32">ผู้โพสต์</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-32">วันที่</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-28">สถานะ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-24 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && filteredNews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    กำลังโหลดข้อมูลข่าวสาร...
                  </td>
                </tr>
              )}
              {filteredNews.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300 m-auto mt-3" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-slate-900 line-clamp-2 break-words">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1 break-all line-clamp-1">{item.source}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.author}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status === 'published' ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex" title="แก้ไข">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex" title="ลบ">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredNews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Newspaper className="w-12 h-12 text-slate-300 mb-3" />
                      <p>ไม่พบข้อมูลข่าวสาร</p>
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
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">ยืนยันการลบข่าว</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">
              คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้? การดำเนินการนี้ไม่สามารถกู้คืนได้
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
                ลบข่าว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
