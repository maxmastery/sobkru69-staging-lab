import React from 'react';
import { KnowledgeNodeType } from '../../lib/knowledge-graph/types';

export const NODE_TYPE_LABELS: Record<KnowledgeNodeType, string> = {
  subject: 'วิชาใหญ่',
  category: 'หมวดหมู่',
  lesson: 'บทเรียน',
  topic: 'หัวข้อย่อย',
  page: 'หน้าเรียน',
  quiz: 'แบบทดสอบ',
  formula: 'สูตร',
  example: 'ตัวอย่าง',
};

export const NODE_TYPE_COLORS: Record<KnowledgeNodeType, string> = {
  subject: '#f6c453',
  category: '#22d3ee',
  lesson: '#a78bfa',
  topic: '#e5e7eb',
  page: '#94a3b8',
  quiz: '#34d399',
  formula: '#fb923c',
  example: '#60a5fa',
};

interface KnowledgeGraphLegendProps {
  compact?: boolean;
}

const KnowledgeGraphLegend: React.FC<KnowledgeGraphLegendProps> = ({ compact = false }) => (
  <div className={compact ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
    {(Object.keys(NODE_TYPE_LABELS) as KnowledgeNodeType[]).map((type) => (
      <div key={type} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
        <span
          className="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_currentColor]"
          style={{ backgroundColor: NODE_TYPE_COLORS[type], color: NODE_TYPE_COLORS[type] }}
        />
        <span>{NODE_TYPE_LABELS[type]}</span>
      </div>
    ))}
  </div>
);

export default KnowledgeGraphLegend;
