import { ExamPart, LessonChapter, SubTopic } from '../../types';
import { KnowledgeGraphData, KnowledgeLink, KnowledgeNode, KnowledgeNodeType } from './types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\u0E00-\u0E7Fa-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

const cleanTitle = (value: string) => value.replace(/^\d+(\.\d+)?\s*/, '').trim();

const inferSubjectKey = (partId: string, sectionTitle: string, topicTitle: string) => {
  const text = `${partId} ${sectionTitle} ${topicTitle}`.toLowerCase();
  if (text.includes('ภาษาอังกฤษ') || text.includes('grammar') || text.includes('vocabulary') || text.includes('reading')) return 'english';
  if (text.includes('คณิต')) return 'math';
  if (text.includes('ภาษาไทย')) return 'thai';
  if (text.includes('ข้าราชการ') || text.includes('พ.ร.บ') || text.includes('กฎหมาย')) return 'law';
  if (partId === 'PART_B') return 'profession';
  if (partId === 'PART_C') return 'interview';
  return partId.toLowerCase();
};

const chapterType = (chapter: LessonChapter): KnowledgeNodeType => {
  if (chapter.isQuiz) return 'quiz';
  if (/สูตร|สมการ|ร้อยละ|อัตราส่วน|พื้นที่|ปริมาตร|เลขยกกำลัง|root|square/i.test(chapter.title)) return 'formula';
  if (/ตัวอย่าง|แนวข้อสอบ|ฝึกทำ|practice/i.test(chapter.title)) return 'example';
  return 'page';
};

const pushUniqueNode = (nodes: KnowledgeNode[], node: KnowledgeNode) => {
  if (!nodes.some((item) => item.id === node.id)) {
    nodes.push(node);
  }
};

const pushLink = (links: KnowledgeLink[], link: KnowledgeLink) => {
  if (!links.some((item) => item.source === link.source && item.target === link.target && item.relation === link.relation)) {
    links.push(link);
  }
};

export function convertLessonsToKnowledgeGraph(parts: ExamPart[]): KnowledgeGraphData {
  const nodes: KnowledgeNode[] = [];
  const links: KnowledgeLink[] = [];

  parts.forEach((part) => {
    const partId = `part-${part.id.toLowerCase()}`;
    pushUniqueNode(nodes, {
      id: partId,
      label: part.title,
      type: 'subject',
      subject: part.id.toLowerCase(),
      description: part.subtitle,
      size: 44,
      status: 'available',
      progress: part.id === 'PART_A' ? 58 : part.id === 'PART_B' ? 42 : 30,
      tags: ['sobkru', 'exam', part.title],
      importance: 5,
    });

    part.sections.forEach((section) => {
      const sectionId = `section-${slugify(section.id)}`;
      pushUniqueNode(nodes, {
        id: sectionId,
        label: cleanTitle(section.title),
        type: 'category',
        subject: part.id.toLowerCase(),
        category: part.title,
        description: section.title,
        size: 32,
        status: 'available',
        tags: [part.title, section.id],
        importance: 4,
      });
      pushLink(links, { source: partId, target: sectionId, relation: 'contains', strength: 5 });

      section.subTopics.forEach((topic: SubTopic) => {
        const subject = inferSubjectKey(part.id, section.title, topic.title);
        const topicId = `lesson-${slugify(topic.id)}`;
        pushUniqueNode(nodes, {
          id: topicId,
          label: cleanTitle(topic.title),
          type: 'lesson',
          subject,
          category: cleanTitle(section.title),
          description: topic.description || topic.promptContext,
          size: 24,
          status: topic.chapters?.some((chapter) => chapter.isQuiz) ? 'recommended' : 'available',
          lessonSlug: topic.id,
          url: topic.id,
          tags: [part.title, section.id, subject],
          importance: 3,
        });
        pushLink(links, { source: sectionId, target: topicId, relation: 'contains', strength: 4 });

        topic.topicParts?.forEach((topicPart) => {
          const topicPartId = `topic-${slugify(topic.id)}-${slugify(topicPart.id)}`;
          pushUniqueNode(nodes, {
            id: topicPartId,
            label: cleanTitle(topicPart.title),
            type: 'topic',
            subject,
            category: cleanTitle(topic.title),
            description: `หัวข้อย่อยใน ${cleanTitle(topic.title)}`,
            size: 17,
            status: 'available',
            lessonSlug: topic.id,
            tags: [subject, topic.id],
          });
          pushLink(links, { source: topicId, target: topicPartId, relation: 'contains', strength: 3 });
        });

        topic.chapters?.forEach((chapter, index) => {
          const nodeType = chapterType(chapter);
          const chapterId = `${nodeType}-${slugify(topic.id)}-${slugify(chapter.id)}`;
          const parentId = chapter.part
            ? `topic-${slugify(topic.id)}-${slugify(chapter.part)}`
            : topicId;

          pushUniqueNode(nodes, {
            id: chapterId,
            label: cleanTitle(chapter.title),
            type: nodeType,
            subject,
            category: cleanTitle(topic.title),
            description: chapter.isQuiz
              ? `แบบทดสอบสำหรับ ${cleanTitle(topic.title)}`
              : `หน้าเรียนลำดับที่ ${index + 1} ของ ${cleanTitle(topic.title)}`,
            size: chapter.isQuiz ? 16 : 13,
            status: chapter.isQuiz ? 'recommended' : 'available',
            lessonSlug: topic.id,
            pageNumber: index + 1,
            url: topic.id,
            tags: [subject, topic.id, nodeType],
          });
          pushLink(links, { source: parentId, target: chapterId, relation: chapter.isQuiz ? 'quiz' : 'contains', strength: chapter.isQuiz ? 3 : 2 });

          if (index > 0) {
            const prev = topic.chapters?.[index - 1];
            if (prev) {
              const prevType = chapterType(prev);
              pushLink(links, {
                source: `${prevType}-${slugify(topic.id)}-${slugify(prev.id)}`,
                target: chapterId,
                relation: 'next',
                strength: 1.5,
              });
            }
          }
        });
      });
    });
  });

  const lessonNodes = nodes.filter((node) => node.type === 'lesson');
  lessonNodes.forEach((node, index) => {
    const next = lessonNodes[index + 1];
    if (next && next.subject === node.subject) {
      pushLink(links, { source: node.id, target: next.id, relation: 'related', strength: 1 });
    }
  });

  return { nodes, links };
}
