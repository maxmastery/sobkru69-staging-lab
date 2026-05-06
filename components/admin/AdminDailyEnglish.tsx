import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenText, CheckCircle2, Edit2, Languages, Loader2, Plus, Save, Search, Trash2, X } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { contentService, ContentDailyEnglishLesson, DailyEnglishVocabularyItem } from '../../services/contentService';

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createVocabularyRow = (): DailyEnglishVocabularyItem => ({
  id: createId(),
  word: '',
  meaning: '',
});

const createNewLesson = (): Partial<ContentDailyEnglishLesson> => ({
  title: '',
  content: '',
  translation: '',
  vocabulary: [createVocabularyRow()],
  date: new Date().toISOString().split('T')[0],
  status: 'published',
});

const stripHtml = (value: string) => value
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const AdminDailyEnglish: React.FC = () => {
  const [lessons, setLessons] = useState<ContentDailyEnglishLesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Partial<ContentDailyEnglishLesson>>(createNewLesson());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'clean'],
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'color', 'background',
    'align',
    'list', 'bullet', 'indent',
    'blockquote',
  ];

  const loadLessons = async () => {
    setIsLoading(true);
    try {
      const rows = await contentService.getDailyEnglishLessons();
      setLessons(rows);
    } catch (error) {
      console.error('Failed to load daily English lessons', error);
      setLessons([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadLessons();
  }, []);

  const handleAddNew = () => {
    setCurrentLesson(createNewLesson());
    setIsEditing(true);
  };

  const handleEdit = (lesson: ContentDailyEnglishLesson) => {
    setCurrentLesson({
      ...lesson,
      vocabulary: lesson.vocabulary.length > 0 ? lesson.vocabulary : [createVocabularyRow()],
    });
    setIsEditing(true);
  };

  const updateVocabulary = (id: string, field: keyof DailyEnglishVocabularyItem, value: string) => {
    setCurrentLesson(current => ({
      ...current,
      vocabulary: (current.vocabulary || []).map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  const addVocabulary = () => {
    setCurrentLesson(current => ({
      ...current,
      vocabulary: [...(current.vocabulary || []), createVocabularyRow()],
    }));
  };

  const removeVocabulary = (id: string) => {
    setCurrentLesson(current => {
      const nextVocabulary = (current.vocabulary || []).filter(item => item.id !== id);
      return {
        ...current,
        vocabulary: nextVocabulary.length > 0 ? nextVocabulary : [createVocabularyRow()],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const cleanedVocabulary = (currentLesson.vocabulary || [])
        .map(item => ({
          ...item,
          word: item.word.trim(),
          meaning: item.meaning.trim(),
        }))
        .filter(item => item.word || item.meaning);

      const saved = await contentService.saveDailyEnglishLesson({
        ...currentLesson,
        vocabulary: cleanedVocabulary,
      });

      setLessons(current => current.some(item => item.id === saved.id)
        ? current.map(item => item.id === saved.id ? saved : item)
        : [saved, ...current]
      );
      setIsEditing(false);
      setSaveMessage('บันทึกบทเรียนภาษาอังกฤษสำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save daily English lesson', error);
      setSaveMessage('บันทึกบทเรียนไม่สำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    setIsLoading(true);
    try {
      await contentService.deleteDailyEnglishLesson(deleteConfirmId);
      setLessons(current => current.filter(item => item.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete daily English lesson', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLessons = lessons.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stripHtml(item.content).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publishedCount = lessons.filter(item => item.status === 'published').length;
  const vocabularyCount = lessons.reduce((sum, item) => sum + item.vocabulary.length, 0);

  if (isEditing) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Daily English Editor
            </div>
            <h3 className="mt-1 text-2xl font-black text-slate-950">
              {currentLesson.id ? 'แก้ไขบทเรียนภาษาอังกฤษ' : 'สร้างบทเรียนภาษาอังกฤษใหม่'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">วันที่สร้างอัตโนมัติ: {currentLesson.date}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
            ปิด editor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6 rounded-[30px] border border-slate-200 bg-white p-5 md:p-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">หัวข้อบทเรียน</label>
                <input
                  type="text"
                  required
                  value={currentLesson.title || ''}
                  onChange={(event) => setCurrentLesson({ ...currentLesson, title: event.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-black text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  placeholder="เช่น A Small Habit That Changes Your Day"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">สถานะ</label>
                <select
                  value={currentLesson.status || 'published'}
                  onChange={(event) => setCurrentLesson({ ...currentLesson, status: event.target.value as 'published' | 'draft' })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="published">เผยแพร่</option>
                  <option value="draft">ฉบับร่าง</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">เนื้อหาบทความภาษาอังกฤษ</label>
              <div className="daily-english-editor overflow-hidden rounded-2xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-cyan-100">
                <style>{`
                  .daily-english-editor .ql-toolbar.ql-snow {
                    border: none !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                    background: #f8fafc;
                  }
                  .daily-english-editor .ql-container.ql-snow {
                    border: none !important;
                  }
                  .daily-english-editor .ql-editor {
                    min-height: 360px;
                    font-size: 16px;
                  }
                `}</style>
                <ReactQuill
                  theme="snow"
                  value={currentLesson.content || ''}
                  onChange={(value) => setCurrentLesson({ ...currentLesson, content: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="เขียนบทความภาษาอังกฤษ ใส่ตัวหนา เอียง สี ไฮไลท์ และจัดย่อหน้าได้..."
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">คำแปลภาษาไทยทั้งบทความ</label>
              <textarea
                required
                value={currentLesson.translation || ''}
                onChange={(event) => setCurrentLesson({ ...currentLesson, translation: event.target.value })}
                className="min-h-[220px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base leading-8 text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                placeholder="ใส่คำแปลภาษาไทยของบทความทั้งบท..."
              />
            </div>
          </div>

          <aside className="space-y-5 rounded-[30px] border border-cyan-100 bg-gradient-to-b from-cyan-50 to-white p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Vocabulary</div>
                <h4 className="mt-1 text-xl font-black text-slate-950">คำศัพท์ที่น่าสนใจ</h4>
                <p className="mt-1 text-sm text-slate-500">เพิ่มคำศัพท์และคำแปล ระบบจะแสดงเป็นตารางในหน้าเรียน</p>
              </div>
              <button
                type="button"
                onClick={addVocabulary}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5"
                title="เพิ่มคำศัพท์"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {(currentLesson.vocabulary || []).map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-cyan-100 bg-white p-3 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-black text-cyan-700">#{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeVocabulary(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      title="ลบคำศัพท์"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.word}
                    onChange={(event) => updateVocabulary(item.id, 'word', event.target.value)}
                    className="mb-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-900 outline-none focus:border-cyan-500"
                    placeholder="คำศัพท์ เช่น improve"
                  />
                  <textarea
                    value={item.meaning}
                    onChange={(event) => updateVocabulary(item.id, 'meaning', event.target.value)}
                    className="min-h-[76px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600 outline-none focus:border-cyan-500"
                    placeholder="คำแปล เช่น พัฒนา / ทำให้ดีขึ้น"
                  />
                </div>
              ))}
            </div>

            <div className="sticky bottom-4 flex flex-col gap-3 rounded-2xl border border-cyan-100 bg-white/90 p-3 shadow-xl shadow-cyan-900/10 backdrop-blur">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                บันทึกบทเรียน
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                ยกเลิก
              </button>
            </div>
          </aside>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {saveMessage && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">บทเรียนทั้งหมด</div>
          <div className="mt-2 text-4xl font-black text-slate-950">{lessons.length}</div>
        </div>
        <div className="rounded-[26px] border border-cyan-100 bg-white p-5">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-600">เผยแพร่แล้ว</div>
          <div className="mt-2 text-4xl font-black text-cyan-700">{publishedCount}</div>
        </div>
        <div className="rounded-[26px] border border-orange-100 bg-white p-5">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-orange-600">คำศัพท์รวม</div>
          <div className="mt-2 text-4xl font-black text-orange-600">{vocabularyCount}</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="ค้นหาบทเรียน..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
        >
          <Plus className="h-5 w-5" />
          สร้างบทเรียนใหม่
        </button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] table-fixed text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="w-auto px-6 py-4 text-sm font-black text-slate-600">บทเรียน</th>
                <th className="w-36 px-6 py-4 text-sm font-black text-slate-600">วันที่</th>
                <th className="w-32 px-6 py-4 text-sm font-black text-slate-600">คำศัพท์</th>
                <th className="w-32 px-6 py-4 text-sm font-black text-slate-600">สถานะ</th>
                <th className="w-28 px-6 py-4 text-right text-sm font-black text-slate-600">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && filteredLessons.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-14 text-center text-slate-500">
                    กำลังโหลดบทเรียนภาษาอังกฤษ...
                  </td>
                </tr>
              )}

              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-slate-100 transition hover:bg-cyan-50/40">
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                        <BookOpenText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="line-clamp-1 font-black text-slate-950">{lesson.title || 'ไม่มีหัวข้อ'}</div>
                        <div className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{stripHtml(lesson.content) || 'ยังไม่มีเนื้อหา'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top text-sm font-bold text-slate-500">{lesson.date}</td>
                  <td className="px-6 py-5 align-top text-sm font-black text-slate-800">{lesson.vocabulary.length} คำ</td>
                  <td className="px-6 py-5 align-top">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${lesson.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {lesson.status === 'published' ? 'เผยแพร่' : 'ฉบับร่าง'}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(lesson)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-cyan-700 transition hover:bg-cyan-50"
                        title="แก้ไข"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(lesson.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        title="ลบ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && filteredLessons.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-14 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                      <Languages className="h-8 w-8" />
                    </div>
                    <div className="font-black text-slate-700">ยังไม่มีบทเรียนภาษาอังกฤษ</div>
                    <p className="mt-1 text-sm text-slate-500">สร้างบทเรียนแรกเพื่อแสดงในหน้า Daily English</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-black text-slate-950">ยืนยันการลบบทเรียน</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">บทเรียนนี้จะถูกลบออกจากระบบ Daily English และไม่สามารถกู้คืนได้</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => void confirmDelete()}
                className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
              >
                ลบบทเรียน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDailyEnglish;
