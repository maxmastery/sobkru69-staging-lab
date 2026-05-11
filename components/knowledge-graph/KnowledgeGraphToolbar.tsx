import React from 'react';
import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface KnowledgeGraphToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFit: () => void;
}

const iconButtonClass = 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100';

const KnowledgeGraphToolbar: React.FC<KnowledgeGraphToolbarProps> = ({ zoom, onZoomIn, onZoomOut, onReset, onFit }) => (
  <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
    <button type="button" className={iconButtonClass} onClick={onZoomOut} aria-label="ซูมออก" title="ซูมออก">
      <ZoomOut className="h-4 w-4" />
    </button>
    <div className="min-w-[58px] rounded-xl bg-black/30 px-3 py-2 text-center text-xs font-black text-slate-200">
      {Math.round(zoom * 100)}%
    </div>
    <button type="button" className={iconButtonClass} onClick={onZoomIn} aria-label="ซูมเข้า" title="ซูมเข้า">
      <ZoomIn className="h-4 w-4" />
    </button>
    <button type="button" className={iconButtonClass} onClick={onReset} aria-label="รีเซ็ตมุมมอง" title="รีเซ็ตมุมมอง">
      <RotateCcw className="h-4 w-4" />
    </button>
    <button type="button" className={iconButtonClass} onClick={onFit} aria-label="จัดกราฟให้พอดีหน้าจอ" title="จัดกราฟให้พอดีหน้าจอ">
      <Maximize2 className="h-4 w-4" />
    </button>
  </div>
);

export default KnowledgeGraphToolbar;
