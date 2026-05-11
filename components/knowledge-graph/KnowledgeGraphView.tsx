import React, { useMemo, useState } from 'react';
import { KnowledgeGraphData, KnowledgeGraphMode, KnowledgeGraphViewProps, KnowledgeNode, KnowledgeNodeType } from '../../lib/knowledge-graph/types';
import KnowledgeGraphCanvas from './KnowledgeGraphCanvas';
import KnowledgeGraphDetailPanel from './KnowledgeGraphDetailPanel';
import KnowledgeGraphSidebar from './KnowledgeGraphSidebar';

const allTypes: KnowledgeNodeType[] = ['subject', 'category', 'lesson', 'topic', 'page', 'quiz', 'formula', 'example'];

const subjectLabels: Record<string, string> = {
  english: 'ภาษาอังกฤษ',
  math: 'คณิตศาสตร์',
  thai: 'ภาษาไทย',
  law: 'กฎหมาย / ข้าราชการที่ดี',
  profession: 'วิชาการศึกษา',
  interview: 'สัมภาษณ์',
  part_a: 'ภาค ก',
  part_b: 'ภาค ข',
  part_c: 'ภาค ค',
};

const normalize = (value: string) => value.toLowerCase().trim();

const subjectLabel = (subject: string) => {
  const clean = subject.replace(/-/g, '_').toLowerCase();
  if (clean === 'part_a' || clean === 'part_a_subject' || clean === 'part_a_lower') return 'ภาค ก';
  if (clean === 'part_b' || clean === 'part_b_subject' || clean === 'part_b_lower') return 'ภาค ข';
  if (clean === 'part_c' || clean === 'part_c_subject' || clean === 'part_c_lower') return 'ภาค ค';
  return subjectLabels[clean] || subject;
};

const filterGraph = (
  data: KnowledgeGraphData,
  searchTerm: string,
  selectedSubject: string,
  selectedTypes: KnowledgeNodeType[],
  mode: KnowledgeGraphMode,
  onlyRecommended: boolean,
): KnowledgeGraphData => {
  const search = normalize(searchTerm);
  const allowedTypes = new Set(selectedTypes);
  const selectedSubjectValue = selectedSubject === 'all' ? '' : selectedSubject;

  let nodes = data.nodes.filter((node) => {
    const matchesSearch = !search || [node.label, node.description, node.category, node.subject, ...(node.tags || [])]
      .filter(Boolean)
      .some((value) => normalize(String(value)).includes(search));
    const matchesSubject = !selectedSubjectValue || node.subject === selectedSubjectValue || node.id === selectedSubjectValue;
    const matchesType = allowedTypes.has(node.type);
    const matchesRecommended = !onlyRecommended || node.status === 'recommended' || node.importance === 5;
    return matchesSearch && matchesSubject && matchesType && matchesRecommended;
  });

  if (mode === 'subject' && !selectedSubjectValue) {
    nodes = nodes.filter((node) => node.type !== 'page' && node.type !== 'example');
  }

  if (mode === 'lesson') {
    nodes = nodes.filter((node) => ['lesson', 'topic', 'page', 'quiz', 'formula', 'example'].includes(node.type));
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  const links = data.links.filter((link) => nodeIds.has(link.source) && nodeIds.has(link.target));

  return { nodes, links };
};

const getRelatedNodeIds = (data: KnowledgeGraphData, nodeId?: string) => {
  const ids = new Set<string>();
  if (!nodeId) return ids;
  data.links.forEach((link) => {
    if (link.source === nodeId) ids.add(link.target);
    if (link.target === nodeId) ids.add(link.source);
  });
  ids.add(nodeId);
  return ids;
};

const getMatchedNodeIds = (nodes: KnowledgeNode[], searchTerm: string) => {
  const search = normalize(searchTerm);
  if (!search) return new Set<string>();
  return new Set(
    nodes
      .filter((node) => [node.label, node.description, node.category, node.subject, ...(node.tags || [])]
        .filter(Boolean)
        .some((value) => normalize(String(value)).includes(search)))
      .map((node) => node.id),
  );
};

const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  data,
  initialSubject = 'all',
  initialMode = 'global',
  initialLessonId,
  onOpenLesson,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedTypes, setSelectedTypes] = useState<KnowledgeNodeType[]>(allTypes);
  const [mode, setMode] = useState<KnowledgeGraphMode>(initialMode);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(initialLessonId);
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [dimUnrelated, setDimUnrelated] = useState(true);

  const subjects = useMemo(() => {
    const values = Array.from(new Set(data.nodes.map((node) => node.subject).filter(Boolean) as string[]));
    return values.map((value) => ({ value, label: subjectLabel(value) })).sort((a, b) => a.label.localeCompare(b.label, 'th'));
  }, [data.nodes]);

  const filteredData = useMemo(
    () => filterGraph(data, searchTerm, selectedSubject, selectedTypes, mode, onlyRecommended),
    [data, searchTerm, selectedSubject, selectedTypes, mode, onlyRecommended],
  );

  const selectedNode = useMemo(
    () => filteredData.nodes.find((node) => node.id === selectedNodeId) || data.nodes.find((node) => node.id === selectedNodeId),
    [data.nodes, filteredData.nodes, selectedNodeId],
  );
  const relatedNodeIds = useMemo(() => getRelatedNodeIds(filteredData, selectedNodeId), [filteredData, selectedNodeId]);
  const matchedNodeIds = useMemo(() => getMatchedNodeIds(filteredData.nodes, searchTerm), [filteredData.nodes, searchTerm]);
  const relatedNodes = useMemo(
    () => filteredData.nodes.filter((node) => node.id !== selectedNodeId && relatedNodeIds.has(node.id)),
    [filteredData.nodes, relatedNodeIds, selectedNodeId],
  );

  const handleTypeToggle = (type: KnowledgeNodeType) => {
    setSelectedTypes((current) => {
      if (current.includes(type)) {
        return current.length === 1 ? current : current.filter((item) => item !== type);
      }
      return [...current, type];
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col overflow-hidden bg-[#171a1c] text-slate-100 lg:h-[calc(100vh-72px)] lg:flex-row">
      <KnowledgeGraphSidebar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSubject={selectedSubject}
        onSubjectChange={(value) => {
          setSelectedSubject(value);
          if (value !== 'all') setMode('subject');
        }}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        mode={mode}
        onModeChange={setMode}
        subjects={subjects}
        visibleNodeCount={filteredData.nodes.length}
        totalNodeCount={data.nodes.length}
        onlyRecommended={onlyRecommended}
        onOnlyRecommendedChange={setOnlyRecommended}
        dimUnrelated={dimUnrelated}
        onDimUnrelatedChange={setDimUnrelated}
        onBack={onBack}
      />

      <KnowledgeGraphCanvas
        data={filteredData}
        selectedNodeId={selectedNodeId}
        relatedNodeIds={relatedNodeIds}
        matchedNodeIds={matchedNodeIds}
        dimUnrelated={dimUnrelated}
        onSelectNode={setSelectedNodeId}
        onOpenNode={onOpenLesson}
      />

      <KnowledgeGraphDetailPanel
        node={selectedNode}
        relatedNodes={relatedNodes}
        links={filteredData.links}
        onOpenLesson={onOpenLesson}
        onSelectNode={setSelectedNodeId}
      />
    </div>
  );
};

export default KnowledgeGraphView;
