export type KnowledgeNodeType =
  | 'subject'
  | 'category'
  | 'lesson'
  | 'topic'
  | 'page'
  | 'quiz'
  | 'formula'
  | 'example';

export type KnowledgeNodeStatus =
  | 'available'
  | 'locked'
  | 'completed'
  | 'in_progress'
  | 'recommended';

export type KnowledgeGraphMode = 'global' | 'subject' | 'lesson';

export type KnowledgeLinkRelation =
  | 'contains'
  | 'related'
  | 'prerequisite'
  | 'next'
  | 'review'
  | 'quiz';

export interface KnowledgeNode {
  id: string;
  label: string;
  type: KnowledgeNodeType;
  subject?: string;
  category?: string;
  description?: string;
  size?: number;
  status?: KnowledgeNodeStatus;
  progress?: number;
  lessonSlug?: string;
  pageNumber?: number;
  url?: string;
  tags?: string[];
  importance?: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  relation?: KnowledgeLinkRelation;
  strength?: number;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

export interface KnowledgeGraphViewProps {
  data: KnowledgeGraphData;
  initialSubject?: string;
  initialMode?: KnowledgeGraphMode;
  initialLessonId?: string;
  onOpenLesson?: (node: KnowledgeNode) => void;
  onBack?: () => void;
}
