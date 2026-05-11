import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KnowledgeGraphData, KnowledgeNode } from '../../lib/knowledge-graph/types';
import { NODE_TYPE_COLORS } from './KnowledgeGraphLegend';
import KnowledgeGraphToolbar from './KnowledgeGraphToolbar';

interface KnowledgeGraphCanvasProps {
  data: KnowledgeGraphData;
  selectedNodeId?: string;
  relatedNodeIds: Set<string>;
  matchedNodeIds: Set<string>;
  dimUnrelated: boolean;
  onSelectNode: (nodeId: string) => void;
  onOpenNode?: (node: KnowledgeNode) => void;
}

interface Point {
  x: number;
  y: number;
}

const WORLD_WIDTH = 1280;
const WORLD_HEIGHT = 820;
const MIN_ZOOM = 0.42;
const MAX_ZOOM = 2.4;

const typeWeight: Record<KnowledgeNode['type'], number> = {
  subject: 42,
  category: 30,
  lesson: 22,
  topic: 16,
  page: 11,
  quiz: 14,
  formula: 13,
  example: 13,
};

const relationColor = {
  contains: '#64748b',
  related: '#38bdf8',
  prerequisite: '#f59e0b',
  next: '#a78bfa',
  review: '#34d399',
  quiz: '#34d399',
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const nodeRadius = (node: KnowledgeNode) => clamp(node.size || typeWeight[node.type] || 14, 8, 48);

const shortLabel = (label: string, max = 24) => (label.length > max ? `${label.slice(0, max - 1)}...` : label);

const createInitialPositions = (data: KnowledgeGraphData): Record<string, Point> => {
  const positions: Record<string, Point> = {};
  const center = { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 };
  const byParent = new Map<string, string[]>();
  const parentOf = new Map<string, string>();

  data.links.forEach((link) => {
    if (link.relation === 'contains' || link.relation === 'quiz') {
      const children = byParent.get(link.source) || [];
      children.push(link.target);
      byParent.set(link.source, children);
      if (!parentOf.has(link.target)) parentOf.set(link.target, link.source);
    }
  });

  const subjectNodes = data.nodes.filter((node) => node.type === 'subject');
  const subjectCount = Math.max(1, subjectNodes.length);
  subjectNodes.forEach((node, index) => {
    const angle = (Math.PI * 2 * index) / subjectCount - Math.PI / 2;
    const radius = subjectCount === 1 ? 0 : 240;
    positions[node.id] = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius * 0.72,
    };
  });

  const placeChildren = (parentId: string, depth = 0) => {
    const parent = positions[parentId] || center;
    const children = (byParent.get(parentId) || []).filter((id) => data.nodes.some((node) => node.id === id));
    if (!children.length) return;

    const spread = Math.PI * (depth === 0 ? 1.55 : 1.8);
    const baseAngle = depth === 0 ? -Math.PI * 0.82 : -Math.PI * 0.9;
    const distance = depth === 0 ? 185 : depth === 1 ? 135 : 92;

    children.forEach((id, index) => {
      const angle = baseAngle + (spread * (index + 0.5)) / children.length + depth * 0.45;
      const jitter = ((index % 5) - 2) * 10;
      positions[id] = {
        x: parent.x + Math.cos(angle) * (distance + jitter),
        y: parent.y + Math.sin(angle) * (distance * 0.72 + jitter),
      };
      placeChildren(id, depth + 1);
    });
  };

  subjectNodes.forEach((node) => placeChildren(node.id));

  data.nodes.forEach((node, index) => {
    if (positions[node.id]) return;
    const parentId = parentOf.get(node.id);
    const parent = parentId ? positions[parentId] : center;
    const angle = (index * 2.399963229728653) % (Math.PI * 2);
    const radius = 260 + (index % 7) * 28;
    positions[node.id] = {
      x: parent.x + Math.cos(angle) * radius * 0.42,
      y: parent.y + Math.sin(angle) * radius * 0.32,
    };
  });

  return positions;
};

const KnowledgeGraphCanvas: React.FC<KnowledgeGraphCanvasProps> = ({
  data,
  selectedNodeId,
  relatedNodeIds,
  matchedNodeIds,
  dimUnrelated,
  onSelectNode,
  onOpenNode,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.86);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
  const [pointerMode, setPointerMode] = useState<
    | { type: 'pan'; x: number; y: number }
    | { type: 'node'; nodeId: string; offset: Point }
    | null
  >(null);

  const initialPositions = useMemo(() => createInitialPositions(data), [data]);
  const nodeMap = useMemo(() => new Map(data.nodes.map((node) => [node.id, node])), [data.nodes]);

  useEffect(() => {
    setPositions(initialPositions);
    setPan({ x: 0, y: 0 });
    setZoom(0.86);
  }, [initialPositions]);

  const toWorldPoint = (clientX: number, clientY: number): Point => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom,
    };
  };

  const zoomBy = (nextZoom: number, anchor?: Point) => {
    const rect = svgRef.current?.getBoundingClientRect();
    const next = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
    if (!rect || !anchor) {
      setZoom(next);
      return;
    }
    const world = toWorldPoint(anchor.x, anchor.y);
    setPan({
      x: anchor.x - rect.left - world.x * next,
      y: anchor.y - rect.top - world.y * next,
    });
    setZoom(next);
  };

  const fitView = () => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || data.nodes.length === 0) return;

    const points = data.nodes.map((node) => positions[node.id]).filter(Boolean);
    if (!points.length) return;
    const minX = Math.min(...points.map((point) => point.x));
    const maxX = Math.max(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxY = Math.max(...points.map((point) => point.y));
    const width = Math.max(240, maxX - minX + 180);
    const height = Math.max(180, maxY - minY + 160);
    const nextZoom = clamp(Math.min(rect.width / width, rect.height / height), MIN_ZOOM, 1.35);
    setZoom(nextZoom);
    setPan({
      x: rect.width / 2 - ((minX + maxX) / 2) * nextZoom,
      y: rect.height / 2 - ((minY + maxY) / 2) * nextZoom,
    });
  };

  const resetView = () => {
    setPositions(initialPositions);
    setPan({ x: 0, y: 0 });
    setZoom(0.86);
  };

  const isFocusNode = (nodeId: string) => !selectedNodeId || nodeId === selectedNodeId || relatedNodeIds.has(nodeId);
  const nodeOpacity = (nodeId: string) => {
    if (matchedNodeIds.size && !matchedNodeIds.has(nodeId)) return 0.28;
    if (dimUnrelated && selectedNodeId && !isFocusNode(nodeId)) return 0.16;
    return 1;
  };

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.08 : 0.08;
    zoomBy(zoom + delta, { x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!pointerMode) return;
    if (pointerMode.type === 'pan') {
      setPan((current) => ({
        x: current.x + event.clientX - pointerMode.x,
        y: current.y + event.clientY - pointerMode.y,
      }));
      setPointerMode({ type: 'pan', x: event.clientX, y: event.clientY });
      return;
    }

    const point = toWorldPoint(event.clientX, event.clientY);
    setPositions((current) => ({
      ...current,
      [pointerMode.nodeId]: {
        x: point.x - pointerMode.offset.x,
        y: point.y - pointerMode.offset.y,
      },
    }));
  };

  const handleNodePointerDown = (event: React.PointerEvent<SVGGElement>, nodeId: string) => {
    event.stopPropagation();
    const point = toWorldPoint(event.clientX, event.clientY);
    const position = positions[nodeId] || { x: 0, y: 0 };
    setPointerMode({
      type: 'node',
      nodeId,
      offset: { x: point.x - position.x, y: point.y - position.y },
    });
    onSelectNode(nodeId);
  };

  return (
    <section className="relative min-h-[560px] flex-1 overflow-hidden bg-[#171a1c] lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,.18)_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,.12),transparent_32%),radial-gradient(circle_at_25%_75%,rgba(246,196,83,.08),transparent_28%)]" />

      <KnowledgeGraphToolbar
        zoom={zoom}
        onZoomIn={() => zoomBy(zoom + 0.12)}
        onZoomOut={() => zoomBy(zoom - 0.12)}
        onReset={resetView}
        onFit={fitView}
      />

      {data.nodes.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 text-center">
          <div className="max-w-sm rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <div className="text-xl font-black text-white">ไม่พบหัวข้อที่ตรงกับการค้นหา</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">ลองเปลี่ยนคำค้นหรือเปิดตัวกรองเพิ่มเติม</p>
          </div>
        </div>
      )}

      <svg
        ref={svgRef}
        className="relative z-0 h-full min-h-[560px] w-full touch-none select-none lg:min-h-0"
        onWheel={handleWheel}
        onPointerDown={(event) => {
          (event.currentTarget as SVGSVGElement).setPointerCapture(event.pointerId);
          setPointerMode({ type: 'pan', x: event.clientX, y: event.clientY });
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          try {
            (event.currentTarget as SVGSVGElement).releasePointerCapture(event.pointerId);
          } catch {
            // The pointer may already be released by the browser.
          }
          setPointerMode(null);
        }}
        onPointerLeave={() => setPointerMode(null)}
      >
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          <g>
            {data.links.map((link, index) => {
              const source = positions[link.source];
              const target = positions[link.target];
              if (!source || !target) return null;
              const isActive = selectedNodeId && (link.source === selectedNodeId || link.target === selectedNodeId);
              const opacity = selectedNodeId && dimUnrelated && !isActive ? 0.1 : 0.46;
              return (
                <line
                  key={`${link.source}-${link.target}-${index}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={relationColor[link.relation || 'contains']}
                  strokeWidth={isActive ? 2.8 : Math.max(0.8, link.strength || 1)}
                  strokeOpacity={isActive ? 0.9 : opacity}
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          <g>
            {data.nodes.map((node) => {
              const position = positions[node.id];
              if (!position) return null;
              const radius = nodeRadius(node);
              const selected = node.id === selectedNodeId;
              const matched = matchedNodeIds.has(node.id);
              const color = node.status === 'locked' ? '#64748b' : NODE_TYPE_COLORS[node.type];
              const opacity = nodeOpacity(node.id);
              const showLabel = radius > 13 || zoom > 1.05 || selected || matched;

              return (
                <g
                  key={node.id}
                  transform={`translate(${position.x} ${position.y})`}
                  className="cursor-grab active:cursor-grabbing"
                  opacity={opacity}
                  onPointerDown={(event) => handleNodePointerDown(event, node.id)}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    onOpenNode?.(node);
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {(selected || matched || node.status === 'recommended') && (
                    <circle
                      r={radius + (selected ? 12 : 8)}
                      fill="none"
                      stroke={selected ? '#f6c453' : matched ? '#22d3ee' : '#f6c453'}
                      strokeWidth={selected ? 3 : 2}
                      strokeOpacity={selected ? 0.82 : 0.42}
                    />
                  )}
                  <circle
                    r={radius}
                    fill={color}
                    stroke={selected ? '#ffffff' : 'rgba(255,255,255,.55)'}
                    strokeWidth={selected ? 2.5 : 1}
                    filter={selected || node.status === 'recommended' ? 'url(#nodeGlow)' : undefined}
                  />
                  <circle r={Math.max(2, radius * 0.28)} fill="rgba(255,255,255,.55)" cx={-radius * 0.18} cy={-radius * 0.18} />
                  {showLabel && (
                    <text
                      x={0}
                      y={radius + 15}
                      textAnchor="middle"
                      className="pointer-events-none fill-slate-100 text-[11px] font-black"
                      paintOrder="stroke"
                      stroke="#111315"
                      strokeWidth={3}
                    >
                      {shortLabel(node.label, selected ? 32 : 22)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          <defs>
            <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </g>
      </svg>

      {hoveredNode && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 max-w-xs rounded-2xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="text-sm font-black text-white">{hoveredNode.label}</div>
          <div className="mt-1 text-xs leading-5 text-slate-400">{hoveredNode.description || nodeMap.get(hoveredNode.id)?.category || hoveredNode.type}</div>
        </div>
      )}
    </section>
  );
};

export default KnowledgeGraphCanvas;
