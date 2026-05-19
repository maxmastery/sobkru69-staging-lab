import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Brain,
  CheckCircle2,
  ChevronLeft,
  Globe2,
  GraduationCap,
  HelpCircle,
  Layers3,
  Leaf,
  LibraryBig,
  Lightbulb,
  LockKeyhole,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { LessonChapter, SubTopic } from '../types';

interface WorldContextSufficiencyLessonProps {
  topic: SubTopic;
  onBack: () => void;
  theme?: 'light' | 'dark';
  examLabel?: string;
  backLabel?: string;
}

const sectionId = (prefix: string, value: string) =>
  `${prefix}-${value.toLowerCase().replace(/[^a-z0-9ก-๙]+/gi, '-').replace(/^-+|-+$/g, '')}`;

const shouldShowChapter = (chapter: LessonChapter) => !chapter.isQuiz;

const markdownComponents: Components = {
  h1: ({ children }) => <h2 className="b11-md-title">{children}</h2>,
  h2: ({ children }) => <h3 className="b11-md-heading">{children}</h3>,
  h3: ({ children }) => (
    <h4 className="b11-md-subheading">
      <Sparkles className="h-4 w-4" />
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="b11-md-copy">{children}</p>,
  blockquote: ({ children }) => (
    <div className="b11-memory-note">
      <Lightbulb className="h-6 w-6" />
      <div>{children}</div>
    </div>
  ),
  table: ({ children }) => (
    <div className="b11-table-scroll">
      <table>{children}</table>
    </div>
  ),
  ul: ({ children }) => <ul className="b11-md-list">{children}</ul>,
  ol: ({ children }) => <ol className="b11-md-list b11-md-list--ordered">{children}</ol>,
  li: ({ children }) => (
    <li>
      <span aria-hidden="true" />
      <div>{children}</div>
    </li>
  ),
  strong: ({ children }) => <strong className="b11-strong">{children}</strong>,
};

const chapterTone = [
  'blue',
  'emerald',
  'violet',
  'amber',
  'sky',
  'lime',
  'rose',
  'slate',
] as const;

const heroStats = [
  { value: '12', label: 'ข้อใน Blueprint', detail: 'บริบทโลก + พอเพียง' },
  { value: '8', label: 'บทเรียนย่อย', detail: 'อ่านเป็นลำดับความคิด' },
  { value: '15', label: 'แบบฝึกท้ายบท', detail: 'ซ่อนเฉลยไว้ฝึกจำ' },
];

const learningPath = [
  {
    icon: Globe2,
    title: 'โลกเปลี่ยน',
    caption: 'Thailand 4.0, BANI, Digital Disruption, AI และบริบทสังคมใหม่',
  },
  {
    icon: Brain,
    title: 'คนต้องมีทักษะ',
    caption: '3Rs8Cs, EF, STEM, Active Learning และการเรียนรู้ตลอดชีวิต',
  },
  {
    icon: GraduationCap,
    title: 'ครูต้องออกแบบ',
    caption: 'บทบาทครูแบบโค้ช SEA-TCF และการเรียนรู้ New Normal',
  },
  {
    icon: Leaf,
    title: 'ชีวิตต้องสมดุล',
    caption: '3 ห่วง 2 เงื่อนไข สมดุล 4 มิติ ทฤษฎีใหม่ และพระบรมราโชบาย',
  },
];

const blueprintCards = [
  { title: 'นโยบายและสังคม', value: 'บริบทภายใน-ภายนอกประเทศ', tone: 'blue' },
  { title: 'เศรษฐกิจและชีวิต', value: 'การดำรงชีวิตและการเปลี่ยนแปลงอาชีพ', tone: 'amber' },
  { title: 'นวัตกรรมและเทคโนโลยี', value: 'AI, IoT, Metaverse, Digital Literacy', tone: 'violet' },
  { title: 'ยั่งยืนและพอเพียง', value: 'SDGs, สิ่งแวดล้อม, สุขภาพ, SEP', tone: 'emerald' },
];

const practiceQuestions = [
  {
    question: 'ข้อใดเป็นเป้าหมายการพัฒนาที่ยั่งยืนของสหประชาชาติที่ออกสอบบ่อย',
    choices: ['HDGs', 'SDGs', 'SEA-TCF', 'NEETs'],
    answer: 'SDGs',
    explain: 'SDGs คือ Sustainable Development Goals เป้าหมายการพัฒนาที่ยั่งยืนของสหประชาชาติ',
  },
  {
    question: 'SDGs ตั้งเป้าให้บรรลุความมุ่งหมายภายในปีใด',
    choices: ['ค.ศ. 2010', 'ค.ศ. 2020', 'ค.ศ. 2030', 'ค.ศ. 2050'],
    answer: 'ค.ศ. 2030',
    explain: 'กรอบ SDGs ใช้เป้าหมายปี 2030 เป็นปลายทางสำคัญ',
  },
  {
    question: 'ข้อใดไม่ใช่ทักษะ 3Rs ตามทักษะการเรียนรู้ในศตวรรษที่ 21',
    choices: ['การอ่านออก', 'การเขียนได้', 'การคิดเลขเป็น', 'การฟังได้'],
    answer: 'การฟังได้',
    explain: '3Rs คือ Reading, Writing และ Arithmetic เท่านั้น',
  },
  {
    question: 'SDG ด้านการศึกษา คือเป้าหมายใด',
    choices: ['Goal 1', 'Goal 3', 'Goal 4', 'Goal 8'],
    answer: 'Goal 4',
    explain: 'SDG 4 เน้นการศึกษาที่มีคุณภาพ เท่าเทียม ทั่วถึง และการเรียนรู้ตลอดชีวิต',
  },
  {
    question: 'โลกแห่งการเรียนรู้ไร้พรมแดน สื่อถึงข้อใดมากที่สุด',
    choices: ['การสื่อสารและเข้าถึงความรู้ได้กว้างขึ้น', 'การเรียนเฉพาะในห้องเรียน', 'การลดบทบาทเทคโนโลยี', 'การจำกัดแหล่งเรียนรู้ในประเทศ'],
    answer: 'การสื่อสารและเข้าถึงความรู้ได้กว้างขึ้น',
    explain: 'คำนี้โยงกับโลกาภิวัตน์ เครือข่ายดิจิทัล และการเข้าถึงความรู้ข้ามพรมแดน',
  },
  {
    question: 'หลัก 3 ห่วง 2 เงื่อนไข ประกอบด้วยอะไร',
    choices: ['พอประมาณ มีเหตุผล มีภูมิคุ้มกัน บนความรู้และคุณธรรม', 'ประหยัด อดทน เสียสละ บนระเบียบและวินัย', 'เก่ง ดี มีสุข บนความรู้และทักษะ', 'รู้ รัก สามัคคี บนวัฒนธรรมและสิ่งแวดล้อม'],
    answer: 'พอประมาณ มีเหตุผล มีภูมิคุ้มกัน บนความรู้และคุณธรรม',
    explain: 'สามห่วงคือพอประมาณ มีเหตุผล มีภูมิคุ้มกัน ส่วนสองเงื่อนไขคือความรู้และคุณธรรม',
  },
  {
    question: '“เตรียมพร้อมรับผลกระทบและการเปลี่ยนแปลงในอนาคต” ตรงกับหลักใด',
    choices: ['ความพอประมาณ', 'ความมีเหตุผล', 'การมีภูมิคุ้มกัน', 'เงื่อนไขคุณธรรม'],
    answer: 'การมีภูมิคุ้มกัน',
    explain: 'ภูมิคุ้มกันคือการเตรียมตัวรับความเสี่ยงและผลกระทบที่อาจเกิดขึ้น',
  },
  {
    question: 'ทฤษฎีใหม่ขั้นต้นใช้สัดส่วนจัดสรรพื้นที่แบบใด',
    choices: ['20:30:30:20', '30:30:30:10', '40:20:20:20', '50:20:20:10'],
    answer: '30:30:30:10',
    explain: 'จำเป็นภาพ: น้ำ 30 ข้าว 30 พืชผสมผสาน 30 ที่อยู่อาศัยและอื่น ๆ 10',
  },
  {
    question: '“เห็นอะไรที่จะทำเพื่อบ้านเมืองได้ก็ต้องทำ” อยู่ในพระบรมราโชบายด้านใด',
    choices: ['มีทัศนคติที่ถูกต้องต่อบ้านเมือง', 'มีพื้นฐานชีวิตที่มั่นคง มีคุณธรรม', 'มีงานทำ มีอาชีพ', 'เป็นพลเมืองดี'],
    answer: 'เป็นพลเมืองดี',
    explain: 'ประโยคนี้เน้นหน้าที่ต่อบ้านเมืองและการทำประโยชน์ส่วนรวม',
  },
  {
    question: 'ข้อใดสะท้อนบทบาทครูในยุค Thailand 4.0 ได้ดีที่สุด',
    choices: ['ผู้บอกคำตอบเป็นหลัก', 'ผู้ควบคุมให้จำเนื้อหา', 'โค้ชและผู้ออกแบบการเรียนรู้', 'ผู้ลดการใช้เทคโนโลยีทั้งหมด'],
    answer: 'โค้ชและผู้ออกแบบการเรียนรู้',
    explain: 'ครูยุคใหม่ช่วยให้ผู้เรียนสร้างองค์ความรู้ ใช้เทคโนโลยีอย่างมีวิจารณญาณ และสร้างนวัตกรรมได้',
  },
  {
    question: 'BANI World เน้นภาพโลกแบบใด',
    choices: ['มั่นคง เรียบง่าย คาดเดาได้', 'เปราะบาง กังวล ไม่เป็นเส้นตรง เข้าใจยาก', 'ปิดประเทศและพึ่งตนเองเท่านั้น', 'เรียนรู้ด้วยเอกสารอย่างเดียว'],
    answer: 'เปราะบาง กังวล ไม่เป็นเส้นตรง เข้าใจยาก',
    explain: 'BANI ย่อจาก Brittle, Anxious, Nonlinear, Incomprehensible',
  },
  {
    question: 'Reuse หมายถึงอะไร',
    choices: ['ลดการใช้', 'ใช้ซ้ำ', 'แปรรูปกลับมาใช้ใหม่', 'เลิกใช้ทันที'],
    answer: 'ใช้ซ้ำ',
    explain: 'Reuse คือการนำของเดิมกลับมาใช้ซ้ำ ส่วน Recycle คือแปรรูปกลับมาใช้ใหม่',
  },
  {
    question: 'SEA-TCF ควรออกแบบให้สอดคล้องกับบริบทใด',
    choices: ['แต่ละประเทศและภูมิภาค', 'ครูเป็นศูนย์กลางเท่านั้น', 'ข้อสอบกลางทุกประเทศเหมือนกัน', 'เฉพาะบริบทโรงเรียนเดียว'],
    answer: 'แต่ละประเทศและภูมิภาค',
    explain: 'กรอบสมรรถนะครูเอเชียตะวันออกเฉียงใต้ต้องสัมพันธ์กับบริบทประเทศและบริบทภูมิภาค',
  },
  {
    question: 'ข้อใดเป็นสมดุล 4 มิติของเศรษฐกิจพอเพียง',
    choices: ['คน เงิน งาน เวลา', 'เศรษฐกิจ สังคม สิ่งแวดล้อม วัฒนธรรม', 'บ้าน วัด โรงเรียน ชุมชน', 'รู้ คิด ทำ จำ'],
    answer: 'เศรษฐกิจ สังคม สิ่งแวดล้อม วัฒนธรรม',
    explain: 'การประยุกต์ SEP ต้องมองสมดุลทั้ง 4 มิติ ไม่ใช่เพียงการประหยัดเงิน',
  },
  {
    question: 'การเรียนรู้แบบ Active Learning เน้นอะไร',
    choices: ['ครูบรรยายตลอดคาบ', 'ผู้เรียนลงมือปฏิบัติและสร้างความรู้', 'อ่านเฉพาะชีทสรุป', 'จำคำตอบโดยไม่วิเคราะห์'],
    answer: 'ผู้เรียนลงมือปฏิบัติและสร้างความรู้',
    explain: 'Active Learning ทำให้ผู้เรียนมีส่วนร่วม ลงมือคิด ลงมือทำ และสะท้อนการเรียนรู้',
  },
];

const WorldContextSufficiencyLesson: React.FC<WorldContextSufficiencyLessonProps> = ({
  topic,
  onBack,
  theme = 'light',
  examLabel = 'สนามสอบใบประกอบวิชาชีพครู',
  backLabel = 'กลับสู่สนามสอบใบประกอบฯ',
}) => {
  const [activeId, setActiveId] = useState('b11-overview');
  const isDark = theme === 'dark';
  const chapters = useMemo(() => (topic.chapters || []).filter(shouldShowChapter), [topic.chapters]);

  const tocItems = useMemo(
    () => [
      { id: 'b11-overview', label: 'ภาพรวมบทเรียน', type: 'overview' },
      ...chapters.map((chapter, index) => ({
        id: sectionId('b11-chapter', chapter.id || `${index}`),
        label: chapter.title.replace(/^\d+\.\s*/, ''),
        type: 'chapter',
      })),
      { id: 'b11-practice', label: 'แบบฝึกหัดท้ายบท', type: 'practice' },
    ],
    [chapters],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id]);

  useEffect(() => {
    const sections = tocItems
      .map(item => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-25% 0px -62% 0px', threshold: [0.08, 0.2, 0.4] },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [tocItems]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`b11-page ${isDark ? 'b11-page--dark' : 'b11-page--light'}`}>
      <section className="b11-hero">
        <div className="b11-hero__inner">
          <button type="button" onClick={onBack} className="b11-back-button">
            <ChevronLeft className="h-5 w-5" />
            {backLabel}
          </button>

          <div className="b11-hero__copy">
            <div className="b11-hero__badge">
              <span />
              {examLabel} | บทเรียนสังเคราะห์จาก PDF ที่แนบ | Test Blueprint 12 ข้อ
            </div>

            <h1>
              บริบทโลก
              <span>และเศรษฐกิจพอเพียง</span>
            </h1>

            <p className="b11-hero__lead">
              อ่านแบบชีทเลคเชอร์หน้าเดียว ครบตั้งแต่การเปลี่ยนแปลงบริบทโลก สังคม เทคโนโลยี
              การศึกษาเพื่อความยั่งยืน ไปจนถึงการประยุกต์หลักปรัชญาของเศรษฐกิจพอเพียงในการพัฒนาตน ผู้เรียน งาน และชุมชน
            </p>

            <div className="b11-hero__facts" aria-label="ข้อมูลบทเรียน">
              {heroStats.map(stat => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <em>{stat.detail}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="b11-hero__visual" aria-hidden="true">
            <div className="b11-orbit b11-orbit--one" />
            <div className="b11-orbit b11-orbit--two" />
            <div className="b11-visual-core">
              <Globe2 className="h-12 w-12" />
              <span>World Context</span>
            </div>
            <div className="b11-visual-panel b11-visual-panel--top">
              <span>Blueprint</span>
              <strong>12 ข้อ</strong>
            </div>
            <div className="b11-visual-panel b11-visual-panel--bottom">
              <span>Learning Flow</span>
              <strong>โลก → ทักษะ → ครู → พอเพียง</strong>
            </div>
            <div className="b11-floating-chip b11-floating-chip--left">
              <Brain className="h-5 w-5" />
              3Rs8Cs
            </div>
            <div className="b11-floating-chip b11-floating-chip--right">
              <Leaf className="h-5 w-5" />
              3 ห่วง 2 เงื่อนไข
            </div>
            <div className="b11-floating-chip b11-floating-chip--bottom">
              <ShieldCheck className="h-5 w-5" />
              ภูมิคุ้มกัน
            </div>
          </div>
        </div>
      </section>

      <section className="b11-body">
        <aside className="b11-toc" aria-label="สารบัญเนื้อหา">
          <div className="b11-toc__surface">
            <div className="b11-toc__heading">
              <LibraryBig className="h-6 w-6" />
              <div>
                <strong>สารบัญเนื้อหา</strong>
                <span>Sticky หลัง Hero</span>
              </div>
            </div>
            <nav>
              {tocItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`b11-toc__item ${activeId === item.id ? 'is-active' : ''} is-${item.type}`}
                  onClick={() => scrollTo(item.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.label}</strong>
                </button>
              ))}
            </nav>
            <div className="b11-toc__source">
              <LockKeyhole className="h-5 w-5" />
              <p>แบบฝึกหัดท้ายบทซ่อนเฉลยไว้ กดเปิดเฉพาะตอนตรวจคำตอบ</p>
            </div>
          </div>
        </aside>

        <main className="b11-reader">
          <section id="b11-overview" className="b11-section b11-section--overview">
            <div className="b11-section-kicker">
              <Layers3 className="h-5 w-5" />
              Lecture Sheet Map
            </div>
            <h2>อ่านภาพรวมก่อนลงรายละเอียด</h2>
            <p>
              บทนี้ให้จำเป็นโครงเดียวกันว่า โลกเปลี่ยนเร็วขึ้น ผู้เรียนต้องมีทักษะใหม่ ครูต้องปรับบทบาท
              และหลักเศรษฐกิจพอเพียงคือฐานคิดสำหรับตัดสินใจอย่างสมดุลในชีวิตจริงและงานการศึกษา
            </p>

            <div className="b11-map-grid">
              <div className="b11-map-card">
                <Globe2 className="h-8 w-8" />
                <strong>บริบทโลกและสังคม</strong>
                <span>โลกาภิวัตน์, Thailand 4.0, BANI World, Digital Disruption, AI และ IoT</span>
              </div>
              <div className="b11-map-card">
                <Target className="h-8 w-8" />
                <strong>การพัฒนาที่ยั่งยืน</strong>
                <span>SDGs 2030, SDG 4, 5P และหลักการไม่ทิ้งใครไว้ข้างหลัง</span>
              </div>
              <div className="b11-map-card">
                <Brain className="h-8 w-8" />
                <strong>ครูและผู้เรียนยุคใหม่</strong>
                <span>3Rs8Cs, Active Learning, STEM, EF, Reskill, Upskill และบทบาทครูแบบโค้ช</span>
              </div>
              <div className="b11-map-card">
                <Leaf className="h-8 w-8" />
                <strong>เศรษฐกิจพอเพียง</strong>
                <span>3 ห่วง 2 เงื่อนไข สมดุล 4 มิติ ทฤษฎีใหม่ และการประยุกต์ใช้ทุกระดับ</span>
              </div>
            </div>

            <div className="b11-highlight-band">
              <MapPinned className="h-8 w-8" />
              <div>
                <strong>ภาพจำข้อสอบ</strong>
                <span>โลกเปลี่ยน สู่ คนต้องมีทักษะ สู่ ครูต้องออกแบบการเรียนรู้ สู่ ใช้พอเพียงเป็นฐานคิด</span>
              </div>
            </div>

            <div className="b11-learning-path" aria-label="เส้นทางการจำบทเรียน">
              {learningPath.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="b11-path-card">
                    <div className="b11-path-card__index">{String(index + 1).padStart(2, '0')}</div>
                    <Icon className="h-8 w-8" />
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </article>
                );
              })}
            </div>

            <div className="b11-blueprint-strip">
              <div className="b11-blueprint-strip__intro">
                <Route className="h-7 w-7" />
                <div>
                  <strong>กรอบที่ต้องครอบคลุม</strong>
                  <span>ครบตามโจทย์สนามสอบ แต่จัดใหม่ให้เป็นแผนที่จำง่าย</span>
                </div>
              </div>
              <div className="b11-blueprint-grid">
                {blueprintCards.map(card => (
                  <div key={card.title} className={`b11-blueprint-card is-${card.tone}`}>
                    <span>{card.title}</span>
                    <strong>{card.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {chapters.map((chapter, index) => {
            const id = sectionId('b11-chapter', chapter.id || `${index}`);
            const tone = chapterTone[index % chapterTone.length];

            return (
              <section key={chapter.id} id={id} className={`b11-section b11-chapter b11-chapter--${tone}`}>
                <div className="b11-chapter__number">{String(index + 1).padStart(2, '0')}</div>
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                >
                  {chapter.content}
                </ReactMarkdown>
              </section>
            );
          })}

          <section id="b11-practice" className="b11-section b11-practice">
            <div className="b11-section-kicker">
              <Trophy className="h-5 w-5" />
              Practice Mode
            </div>
            <h2>แบบฝึกหัดท้ายบทแบบซ่อนเฉลย</h2>
            <p>
              ฝึกตอบก่อนเปิดเฉลย ข้อสอบชุดนี้จัดใหม่จากประเด็นที่อยู่ในไฟล์แนบให้เป็นคำถามท้ายบท
              เพื่อใช้ทวนหลังอ่าน ไม่ใช่การคัดข้อความต้นฉบับมาวางยาว ๆ
            </p>

            <div className="b11-practice__summary">
              <div>
                <HelpCircle className="h-7 w-7" />
                <strong>{practiceQuestions.length} ข้อ</strong>
                <span>คล้ายสนามสอบ เน้นจับ concept</span>
              </div>
              <div>
                <CheckCircle2 className="h-7 w-7" />
                <strong>เปิดเฉลยเอง</strong>
                <span>ลดการเผลอมองคำตอบก่อนคิด</span>
              </div>
              <div>
                <Zap className="h-7 w-7" />
                <strong>อ่านจบแล้วทำทันที</strong>
                <span>ใช้ active recall แทนการอ่านซ้ำ</span>
              </div>
            </div>

            <div className="b11-practice-list">
              {practiceQuestions.map((item, index) => (
                <article key={item.question} className="b11-practice-card">
                  <div className="b11-practice-card__header">
                    <span>ข้อ {String(index + 1).padStart(2, '0')}</span>
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3>{item.question}</h3>
                  <ol className="b11-choice-list">
                    {item.choices.map((choice, choiceIndex) => (
                      <li key={choice}>
                        <span>{['ก', 'ข', 'ค', 'ง'][choiceIndex]}</span>
                        <p>{choice}</p>
                      </li>
                    ))}
                  </ol>
                  <details className="b11-answer">
                    <summary>
                      <LockKeyhole className="h-4 w-4" />
                      เปิดเฉลย
                    </summary>
                    <div>
                      <strong>คำตอบ: {item.answer}</strong>
                      <p>{item.explain}</p>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </section>
        </main>
      </section>
    </div>
  );
};

export default WorldContextSufficiencyLesson;
