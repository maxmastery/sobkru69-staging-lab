

export enum PartId {
  PART_A = 'PART_A', // ภาค ก
  PART_B = 'PART_B', // ภาค ข
  PART_C = 'PART_C'  // ภาค ค
}

export interface LessonChapter {
  id: string;
  title: string;
  content: string; // Markdown content for this specific chapter
  duration?: string; // e.g., "15 min"
  isCompleted?: boolean;
  videoUrl?: string; // Google Drive Video URL
  summaryImageUrl?: string; // Google Drive Image URL
  summaryPdfUrl?: string; // Google Drive PDF URL
  part?: string; // e.g. "Part 1 การคิดวิเคราะห์และคณิตศาสตร์พื้นฐาน"
  isQuiz?: boolean;
}

export interface SubTopic {
  id: string;
  title: string;
  description?: string;
  promptContext: string; // Context to send to AI
  contentPath: string; // Keep for backward compatibility or full download
  content?: string; // Legacy: Full content string
  chapters?: LessonChapter[]; // NEW: Modular content
  coverImage?: string; // URL for lesson banner image
  videoUrl?: string; // Legacy: Main topic video
  summaryPdfUrl?: string; // Legacy: PDF for single page lesson
  summaryImageUrl?: string; // NEW: Infographic summary image
  topicParts?: { id: string; title: string; videoUrl?: string; }[]; // Sub-groupings within LessonView
}

export interface SubjectSection {
  id: string;
  title: string;
  subTopics: SubTopic[];
  isSelfStudy?: boolean; // For Part B Major
}

export interface ExamPart {
  id: PartId;
  title: string;
  subtitle: string;
  color: string;
  sections: SubjectSection[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}