import React from 'react';
import { BookOpen, CheckCircle2, ExternalLink, Layers3, Link2, Lock, PlayCircle, Sparkles } from 'lucide-react';
import { KnowledgeLink, KnowledgeNode } from '../../lib/knowledge-graph/types';
import { NODE_TYPE_COLORS, NODE_TYPE_LABELS } from './KnowledgeGraphLegend';

interface KnowledgeGraphDetailPanelProps {
  node?: KnowledgeNode;
  relatedNodes: KnowledgeNode[];
  links: KnowledgeLink[];
  onOpenLesson?: (node: KnowledgeNode) => void;
  onSelectNode: (nodeId: string) => void;
}

const statusMeta = {
  available: { label: 'พร้อมเรียน', icon: CheckCircle2, className: 'text-cyan-100 bg-cyan-300/10 border-cyan-300/20' },
  locked: { label: 'ล็อกอยู่', icon: Lock, className: 'text-slate-300 bg-slate-500/10 border-slate-400/20' },
  completed: { label: 'เรียนจบแล้ว', icon: CheckCircle2, className: 'text-emerald-100 bg-emerald-300/10 border-emerald-300/20' },
  in_progress: { label: 'กำลังเรียน', icon: PlayCircle, className: 'text-blue-100 bg-blue-300/10 border-blue-300/20' },
  recommended: { label: 'แนะนำ', icon: Sparkles, className: 'text-amber-100 bg-amber-300/10 border-amber-300/20' },
};

const KnowledgeGraphDetailPanel: React.FC<KnowledgeGraphDetailPanelProps> = ({ node, relatedNodes, links, onOpenLesson, onSelectNode }) => {
  if (!node) {
    return (
      <aside className="h-full w-full border-t border-white/10 bg-[#111315]/95 p-4 text-slate-100 lg:w-[330px] lg:border-l lg:border-t-0">
        <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <Layers3 className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-black text-white">เลือก Node บนกราฟเพื่อดูรายละเอียดบทเรียน</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">คลิกจุดใดก็ได้เพื่อดูคำอธิบาย ความคืบหน้า tags และหัวข้อที่เชื่อมโยงกัน</p>
        </div>
      </aside>
    );
  }

  const StatusIcon = statusMeta[node.status || 'available'].icon;
  const visibleLinks = links.filter((link) => link.source === node.id || link.target === node.id);

  return (
    <aside className="h-full w-full overflow-y-auto border-t border-white/10 bg-[#111315]/95 p-4 text-slate-100 lg:w-[330px] lg:border-l lg:border-t-0">
      <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="h-4 w-4 shrink-0 rounded-full shadow-[0_0_22px_currentColor]"
            style={{ backgroundColor: NODE_TYPE_COLORS[node.type], color: NODE_TYPE_COLORS[node.type] }}
          />
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-slate-300">
            {NODE_TYPE_LABELS[node.type]}
          </span>
        </div>

        <h2 className="text-2xl font-black leading-tight tracking-tight text-white">{node.label}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">{node.description || 'ยังไม่มีคำอธิบายสำหรับ node นี้'}</p>

        <div className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${statusMeta[node.status || 'available'].className}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {statusMeta[node.status || 'available'].label}
        </div>

        {typeof node.progress === 'number' && (
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
              <span>Progress</span>
              <span>{node.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-300" style={{ width: `${Math.max(0, Math.min(100, node.progress))}%` }} />
            </div>
          </div>
        )}

        {(node.tags?.length || node.subject || node.category) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {node.subject && <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-100">{node.subject}</span>}
            {node.category && <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-bold text-slate-300">{node.category}</span>}
            {node.tags?.slice(0, 5).map((tag) => (
              <span key={tag} className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-bold text-slate-400">#{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenLesson?.(node)}
            disabled={!node.url && !node.lessonSlug}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-amber-300 px-3 text-sm font-black text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            <BookOpen className="h-4 w-4" />
            เปิดบทเรียน
          </button>
          <button
            type="button"
            onClick={() => onOpenLesson?.(node)}
            disabled={node.type !== 'quiz' && !relatedNodes.some((item) => item.type === 'quiz')}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-3 text-sm font-black text-slate-100 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:text-slate-500"
          >
            <ExternalLink className="h-4 w-4" />
            ทำแบบทดสอบ
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          <Link2 className="h-3.5 w-3.5" />
          หัวข้อที่เกี่ยวข้อง
        </div>
        {relatedNodes.length > 0 ? (
          <div className="space-y-2">
            {relatedNodes.slice(0, 10).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectNode(item.id)}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NODE_TYPE_COLORS[item.type] }} />
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-200">{item.label}</span>
                <span className="text-[10px] font-black uppercase text-slate-500">{NODE_TYPE_LABELS[item.type]}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">ยังไม่มี node ที่เชื่อมโดยตรง</div>
        )}
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-4">
        <div className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Links</div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="text-2xl font-black text-white">{visibleLinks.length}</div>
            <div className="text-xs font-bold text-slate-500">relations</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="text-2xl font-black text-white">{node.size || 16}</div>
            <div className="text-xs font-bold text-slate-500">weight</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default KnowledgeGraphDetailPanel;
