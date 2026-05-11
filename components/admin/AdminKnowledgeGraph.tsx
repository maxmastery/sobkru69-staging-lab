import React, { useEffect, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, Loader2, Network, RefreshCw, Save, Store } from 'lucide-react';
import { contentService, DEFAULT_KNOWLEDGE_GRAPH_SETTINGS, type KnowledgeGraphSettings } from '../../services/contentService';

interface AdminKnowledgeGraphProps {
  onPreviewKnowledgeGraph?: () => void;
  onSettingsChange?: (settings: KnowledgeGraphSettings) => void;
}

const AdminKnowledgeGraph: React.FC<AdminKnowledgeGraphProps> = ({ onPreviewKnowledgeGraph, onSettingsChange }) => {
  const [settings, setSettings] = useState<KnowledgeGraphSettings>(DEFAULT_KNOWLEDGE_GRAPH_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const nextSettings = await contentService.getKnowledgeGraphSettings();
      setSettings(nextSettings);
      onSettingsChange?.(nextSettings);
    } catch (error) {
      console.error('Failed to load knowledge graph settings', error);
      setSettings(DEFAULT_KNOWLEDGE_GRAPH_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (nextSettings: KnowledgeGraphSettings, successMessage = 'บันทึกแผนที่เครือข่ายความรู้สำเร็จ') => {
    setIsSaving(true);
    setMessage('');
    try {
      const saved = await contentService.setKnowledgeGraphSettings(nextSettings);
      setSettings(saved);
      onSettingsChange?.(saved);
      setMessage(successMessage);
      window.setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save knowledge graph settings', error);
      setMessage('บันทึกไม่สำเร็จ กรุณาตรวจสอบ Supabase app_settings');
      window.setTimeout(() => setMessage(''), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleVisibilityChange = (isVisible: boolean) => {
    const nextSettings = { ...settings, isVisible };
    setSettings(nextSettings);
    void saveSettings(
      nextSettings,
      isVisible ? 'แสดงเมนูแผนที่เครือข่ายความรู้ที่หน้าหลักแล้ว' : 'ซ่อนเมนูแผนที่เครือข่ายความรู้จากหน้าหลักแล้ว'
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void saveSettings(settings);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          {message}
        </div>
      )}

      <section className="relative overflow-hidden rounded-[28px] border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/70 to-white p-5 shadow-sm">
        <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-cyan-200/40 blur-2xl"></div>
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              settings.isVisible ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-100 text-slate-500'
            }`}>
              {settings.isVisible ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">Homepage Visibility</p>
              <h4 className="mt-1 text-xl font-black text-slate-900">เมนูแผนที่เครือข่ายความรู้</h4>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                เปิดเพื่อให้ผู้ใช้เห็น banner Knowledge Graph ที่หน้าหลัก หรือปิดเพื่อซ่อนจากผู้ใช้ทั่วไปโดยผู้ดูแลยัง preview ได้
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onPreviewKnowledgeGraph}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-black text-cyan-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50"
            >
              <Store className="h-4 w-4" />
              Preview Graph
            </button>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="text-sm font-bold text-slate-700">
                {settings.isVisible ? 'แสดงอยู่' : 'ซ่อนอยู่'}
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.isVisible}
                disabled={isSaving || isLoading}
                onChange={(event) => handleVisibilityChange(event.target.checked)}
              />
              <span className={`relative block h-8 w-14 shrink-0 rounded-full p-1 shadow-inner transition-colors duration-300 ${settings.isVisible ? 'bg-cyan-500 shadow-cyan-900/20' : 'bg-slate-300 shadow-slate-400/20'} ${isSaving || isLoading ? 'opacity-60' : ''}`}>
                <span className={`block h-6 w-6 rounded-full bg-white shadow-[0_3px_10px_rgba(15,23,42,.22)] transition-transform duration-300 ${settings.isVisible ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              <Network className="h-4 w-4" />
              Banner Content
            </div>
            <h4 className="mt-1 text-xl font-black text-slate-950">ข้อความบนหน้าหลัก</h4>
          </div>
          <button
            type="button"
            onClick={() => void loadSettings()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600 transition-all hover:border-cyan-300 hover:bg-cyan-50 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            โหลดใหม่
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-bold text-slate-700">หัวข้อ</span>
            <input
              value={settings.title}
              onChange={(event) => setSettings(current => ({ ...current, title: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-bold text-slate-900 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              placeholder={DEFAULT_KNOWLEDGE_GRAPH_SETTINGS.title}
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-bold text-slate-700">คำอธิบายสั้น</span>
            <textarea
              value={settings.subtitle}
              onChange={(event) => setSettings(current => ({ ...current, subtitle: event.target.value }))}
              className="min-h-[96px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              placeholder={DEFAULT_KNOWLEDGE_GRAPH_SETTINGS.subtitle}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">ข้อความบนปุ่ม</span>
            <input
              value={settings.buttonLabel}
              onChange={(event) => setSettings(current => ({ ...current, buttonLabel: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              placeholder={DEFAULT_KNOWLEDGE_GRAPH_SETTINGS.buttonLabel}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={isSaving || isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-black text-white transition-all hover:bg-cyan-700 disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            บันทึกข้อความ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminKnowledgeGraph;
