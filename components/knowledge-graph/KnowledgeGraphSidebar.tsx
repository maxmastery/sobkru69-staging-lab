import React from 'react';
import { ArrowLeft, Filter, Network, Search, Sparkles } from 'lucide-react';
import { KnowledgeGraphMode, KnowledgeNodeType } from '../../lib/knowledge-graph/types';
import KnowledgeGraphLegend, { NODE_TYPE_LABELS } from './KnowledgeGraphLegend';

interface KnowledgeGraphSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  selectedTypes: KnowledgeNodeType[];
  onTypeToggle: (type: KnowledgeNodeType) => void;
  mode: KnowledgeGraphMode;
  onModeChange: (mode: KnowledgeGraphMode) => void;
  subjects: { value: string; label: string }[];
  visibleNodeCount: number;
  totalNodeCount: number;
  onlyRecommended: boolean;
  onOnlyRecommendedChange: (value: boolean) => void;
  dimUnrelated: boolean;
  onDimUnrelatedChange: (value: boolean) => void;
  onBack?: () => void;
}

const modeOptions: { value: KnowledgeGraphMode; label: string }[] = [
  { value: 'global', label: 'ทั้งหมด' },
  { value: 'subject', label: 'รายวิชา' },
  { value: 'lesson', label: 'บทเรียน' },
];

const KnowledgeGraphSidebar: React.FC<KnowledgeGraphSidebarProps> = ({
  searchTerm,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedTypes,
  onTypeToggle,
  mode,
  onModeChange,
  subjects,
  visibleNodeCount,
  totalNodeCount,
  onlyRecommended,
  onOnlyRecommendedChange,
  dimUnrelated,
  onDimUnrelatedChange,
  onBack,
}) => (
  <aside className="flex h-full min-h-0 w-full flex-col border-b border-white/10 bg-[#111315]/95 p-4 text-slate-100 lg:w-[310px] lg:border-b-0 lg:border-r">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
          <Network className="h-3.5 w-3.5" />
          Graph View
        </div>
        <h1 className="text-2xl font-black leading-tight tracking-tight text-white">SobKru Knowledge Map</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">เห็นภาพรวมทุกบทเรียน และความเชื่อมโยงของเนื้อหาในที่เดียว</p>
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="กลับหน้าหลัก"
          title="กลับหน้าหลัก"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
    </div>

    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-3">
      <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        <Search className="h-3.5 w-3.5" />
        Search
      </label>
      <input
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="ค้นหาหัวข้อ บทเรียน หรือแบบทดสอบ..."
        className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
      />
    </div>

    <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
      {modeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onModeChange(option.value)}
          className={`rounded-xl px-2 py-2 text-xs font-black transition ${mode === option.value ? 'bg-cyan-300 text-slate-950' : 'text-slate-400 hover:bg-white/8 hover:text-white'}`}
        >
          {option.label}
        </button>
      ))}
    </div>

    <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          รายวิชา
        </label>
        <select
          value={selectedSubject}
          onChange={(event) => onSubjectChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3 text-sm font-bold text-slate-100 outline-none focus:border-cyan-300/50"
        >
          <option value="all">ทุกวิชา</option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>{subject.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <div className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">ประเภท Node</div>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(NODE_TYPE_LABELS) as KnowledgeNodeType[]).map((type) => {
            const checked = selectedTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => onTypeToggle(type)}
                className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${checked ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'}`}
              >
                {NODE_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-bold text-slate-300">
          <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-amber-200" /> เฉพาะแนะนำ</span>
          <input type="checkbox" checked={onlyRecommended} onChange={(event) => onOnlyRecommendedChange(event.target.checked)} className="h-4 w-4 accent-cyan-300" />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-bold text-slate-300">
          <span>ลดแสง Node ที่ไม่เกี่ยวข้อง</span>
          <input type="checkbox" checked={dimUnrelated} onChange={(event) => onDimUnrelatedChange(event.target.checked)} className="h-4 w-4 accent-cyan-300" />
        </label>
      </div>

      <div className="mb-5 rounded-2xl border border-white/10 bg-black/20 p-3">
        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">กำลังแสดง</div>
        <div className="mt-2 text-3xl font-black text-white">{visibleNodeCount}</div>
        <div className="text-xs font-bold text-slate-500">จากทั้งหมด {totalNodeCount} nodes</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
        <div className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Legend</div>
        <KnowledgeGraphLegend />
      </div>
    </div>
  </aside>
);

export default KnowledgeGraphSidebar;
