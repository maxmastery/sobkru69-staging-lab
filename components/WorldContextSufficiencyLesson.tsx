import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronLeft,
  CircleDot,
  FileCheck2,
  Flag,
  Globe2,
  Landmark,
  Layers3,
  Leaf,
  LibraryBig,
  Lightbulb,
  ListChecks,
  Network,
  PenLine,
  Rocket,
  Sparkles,
  Target,
} from 'lucide-react';
import type { SubTopic } from '../types';

interface WorldContextSufficiencyLessonProps {
  topic: SubTopic;
  onBack: () => void;
  theme?: 'light' | 'dark';
  examLabel?: string;
  backLabel?: string;
}

type LessonCard = {
  title: string;
  body: string;
  tag?: string;
};

type LessonSection = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  remember: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: 'blue' | 'amber' | 'emerald' | 'rose' | 'violet' | 'slate';
  visual?: 'flow' | 'skills' | 'sdgs' | 'tech' | 'bani' | 'sep' | 'new-theory';
  cards?: LessonCard[];
  list?: string[];
  rows?: { label: string; value: string; note?: string }[];
};

const blueprintCards = [
  { label: '01', title: 'บริบทโลกและสังคม', body: 'โลกาภิวัตน์ การเมือง เศรษฐกิจ สังคม วัฒนธรรม สิ่งแวดล้อม สุขภาพ และการเปลี่ยนแปลงที่กระทบการศึกษา' },
  { label: '02', title: 'นวัตกรรมและเทคโนโลยี', body: 'Digital Disruption, AI, IoT, Cloud, สื่อดิจิทัล และเทคโนโลยีอนาคตที่ทำให้ครูต้องปรับวิธีสอน' },
  { label: '03', title: 'ทักษะคนยุคใหม่', body: '3Rs8Cs, Active Learning, STEM, EF, การเรียนรู้ตลอดชีวิต, Reskill และ Upskill' },
  { label: '04', title: 'เศรษฐกิจพอเพียง', body: '3 ห่วง 2 เงื่อนไข สมดุล 4 มิติ ทฤษฎีใหม่ หลักธรรม และการประยุกต์ใช้กับตน ผู้เรียน งาน และชุมชน' },
];

const sections: LessonSection[] = [
  {
    id: 'borderless-learning',
    eyebrow: 'World Context',
    title: 'โลกแห่งการเรียนรู้ไร้พรมแดน',
    intro:
      'โลกปัจจุบันเป็นโลกของการติดต่อสื่อสารที่ทำให้คนเชื่อมถึงกันได้รวดเร็ว ไม่จำกัดเชื้อชาติ ศาสนา เพศ อายุ หรือพื้นที่ ข่าวสารและองค์ความรู้เดินทางถึงผู้เรียนได้ทันทีผ่านสื่อดิจิทัล แพลตฟอร์มออนไลน์ และเครือข่ายสังคม',
    remember: 'ข้อสอบชอบถามภาพจำว่า โลกเชื่อมต่อเร็วขึ้น -> ความรู้เข้าถึงง่ายขึ้น -> ครูต้องออกแบบการเรียนรู้ให้ผู้เรียนใช้ข้อมูลอย่างรู้เท่าทัน',
    icon: Globe2,
    tone: 'blue',
    visual: 'flow',
    cards: [
      { title: 'Globalization', body: 'การพึ่งพาและเชื่อมโยงกันทั่วโลกทำให้เศรษฐกิจ วัฒนธรรม การศึกษา และการทำงานข้ามพรมแดนมากขึ้น' },
      { title: 'Native / Immigrant Digital', body: 'ผู้เรียนจำนวนมากเติบโตมากับดิจิทัล ส่วนผู้ใหญ่บางกลุ่มต้องปรับตัว แต่ทั้งสองกลุ่มต้องพัฒนาทักษะรู้เท่าทันสื่อและข้อมูล' },
      { title: 'New Normal Learning', body: 'การเรียนรู้หลังวิกฤตเน้นแพลตฟอร์มออนไลน์ พื้นที่เรียนรู้ยืดหยุ่น การกำกับตนเอง และการสะท้อนผลการเรียนรู้' },
      { title: 'AI + IoT + Cloud', body: 'เทคโนโลยีช่วยให้ข้อมูลและเครื่องมือเรียนรู้เข้าถึงง่าย แต่ครูต้องคัดกรองความน่าเชื่อถือและดูแลจริยธรรมการใช้เทคโนโลยี' },
    ],
    rows: [
      { label: 'Education 1.0', value: 'ครูเป็นศูนย์กลาง', note: 'ผู้สอนถ่ายทอดความรู้เป็นหลัก' },
      { label: 'Education 2.0', value: 'ผู้เรียนค้นคว้ามากขึ้น', note: 'ครูเป็นผู้อำนวยความสะดวก' },
      { label: 'Education 3.0', value: 'ผู้เรียนสร้างองค์ความรู้', note: 'เน้นคิด วิเคราะห์ และสังเคราะห์' },
      { label: 'Education 4.0', value: 'สร้างนวัตกรรม', note: 'ครูเป็นโค้ชและผู้ออกแบบประสบการณ์เรียนรู้' },
    ],
  },
  {
    id: 'skills-teacher',
    eyebrow: 'Learner & Teacher',
    title: 'ทักษะผู้เรียนและบทบาทครูยุคใหม่',
    intro:
      'ผู้เรียนศตวรรษที่ 21 ต้องมีทั้งพื้นฐาน 3Rs และทักษะ 8Cs เพื่อใช้ชีวิต ทำงาน ร่วมมือกับผู้อื่น สื่อสาร คิดอย่างมีวิจารณญาณ ใช้เทคโนโลยี และมีคุณธรรม ส่วนครูต้องย้ายบทบาทจากผู้บอกความรู้ไปเป็นผู้ออกแบบการเรียนรู้',
    remember: 'จำคู่กันเสมอ: 3Rs คือฐานอ่าน เขียน คิดเลข ส่วน 8Cs คือทักษะต่อยอดที่ใช้แก้ปัญหาในชีวิตจริง',
    icon: Brain,
    tone: 'violet',
    visual: 'skills',
    cards: [
      { tag: '3Rs', title: 'Reading', body: 'อ่านออก เข้าใจสาร และใช้การอ่านเป็นฐานการเรียนรู้' },
      { tag: '3Rs', title: 'Writing', body: 'เขียนได้ สื่อสารความคิดและความเข้าใจอย่างเป็นระบบ' },
      { tag: '3Rs', title: 'Arithmetic', body: 'คิดเลขเป็น ใช้เหตุผลเชิงจำนวนและข้อมูลประกอบการตัดสินใจ' },
      { tag: '8Cs', title: 'Critical Thinking', body: 'คิดวิเคราะห์ มีวิจารณญาณ และแก้ปัญหาได้' },
      { tag: '8Cs', title: 'Creativity', body: 'คิดสร้างสรรค์ สร้างนวัตกรรม และมองทางเลือกใหม่' },
      { tag: '8Cs', title: 'Collaboration', body: 'ทำงานเป็นทีม มีภาวะผู้นำ และรับผิดชอบร่วมกัน' },
      { tag: '8Cs', title: 'Communication', body: 'สื่อสาร รู้เท่าทันข้อมูล ข่าวสาร และสื่อ' },
      { tag: '8Cs', title: 'Compassion', body: 'มีเมตตา วินัย คุณธรรม และความรับผิดชอบต่อสังคม' },
    ],
    list: [
      'SEA-TCF คือกรอบสมรรถนะครูเอเชียตะวันออกเฉียงใต้ ครอบคลุมทักษะ ความรู้ พฤติกรรม และคุณลักษณะของครูตามบริบทภูมิภาค',
      'Thailand 4.0 และแผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 13 เน้นคนมีสมรรถนะสูง เศรษฐกิจสร้างมูลค่า และการพัฒนาอย่างยั่งยืน',
      'แนวทางจัดการเรียนรู้ที่เชื่อมกับข้อสอบ ได้แก่ Active Learning, STEM, EF, Project-based Learning, การใช้เทคโนโลยี และการเรียนรู้แบบผู้เรียนเป็นสำคัญ',
      'Reskill คือเรียนทักษะใหม่เพื่อเปลี่ยนหรือปรับงาน Upskill คือยกระดับทักษะเดิมให้ทันเทคโนโลยีและตลาดแรงงาน',
    ],
  },
  {
    id: 'sdgs',
    eyebrow: 'Sustainable Development',
    title: 'SDGs 2030 และการศึกษาเพื่อความยั่งยืน',
    intro:
      'SDGs คือเป้าหมายการพัฒนาที่ยั่งยืนของสหประชาชาติ ระยะเวลา 15 ปี ตั้งแต่ ค.ศ. 2015-2030 มี 17 เป้าหมาย มุ่งพัฒนาที่ครอบคลุม ยั่งยืน และมีภูมิคุ้มกันต่อวิกฤต โดยมีหลักสำคัญคือไม่ทิ้งใครไว้ข้างหลัง',
    remember: 'ถ้าข้อสอบถาม “การศึกษาที่มีคุณภาพ เท่าเทียม ทั่วถึง และเรียนรู้ตลอดชีวิต” ให้ตอบ SDG 4',
    icon: Target,
    tone: 'emerald',
    visual: 'sdgs',
    cards: [
      { title: 'People', body: 'มิติด้านสังคม ครอบคลุมเป้าหมาย 1-5 เช่น ความยากจน สุขภาพ การศึกษา และความเท่าเทียม' },
      { title: 'Prosperity', body: 'มิติด้านเศรษฐกิจ ครอบคลุมเป้าหมาย 7-11 เช่น พลังงาน งานที่มีคุณค่า เมืองยั่งยืน และนวัตกรรม' },
      { title: 'Planet', body: 'มิติด้านสิ่งแวดล้อม ครอบคลุมเป้าหมาย 6 และ 12-15 เช่น น้ำ การผลิตบริโภคที่ยั่งยืน ภูมิอากาศ และระบบนิเวศ' },
      { title: 'Peace', body: 'มิติด้านสันติภาพและสถาบัน ครอบคลุมเป้าหมาย 16 เน้นสังคมสงบ ยุติธรรม และสถาบันเข้มแข็ง' },
      { title: 'Partnership', body: 'มิติด้านหุ้นส่วนการพัฒนา ครอบคลุมเป้าหมาย 17 เน้นความร่วมมือระหว่างประเทศและทุกภาคส่วน' },
    ],
    list: [
      'SDG 4 ครอบคลุมการศึกษาปฐมวัย ประถมศึกษา มัธยมศึกษา เทคนิค อาชีวศึกษา อุดมศึกษา และโอกาสเรียนรู้ตลอดชีวิต',
      'การศึกษาเพื่อการพัฒนาที่ยั่งยืนต้องเชื่อมสังคม วัฒนธรรม สิ่งแวดล้อม สุขภาพ เศรษฐกิจ และพลเมืองโลก',
      'แนวคิดไม่ทิ้งใครไว้ข้างหลังทำให้ครูต้องออกแบบการเรียนรู้ที่เข้าถึงผู้เรียนหลากหลาย ลดความเหลื่อมล้ำ และคำนึงถึงความแตกต่าง',
    ],
  },
  {
    id: 'new-world',
    eyebrow: 'Megatrends',
    title: 'โลกใหม่ เทคโนโลยีใหม่ และคำสำคัญที่ออกสอบบ่อย',
    intro:
      'บริบทโลกยุคใหม่เปลี่ยนทั้งเศรษฐกิจ อาชีพ วัฒนธรรม และรูปแบบการเรียนรู้ คำสำคัญอย่าง Soft Power, NEETs, Digital Disruption, Education For All และ Lifelong Learning จึงมักถูกนำมาออกข้อสอบเพื่อวัดความเข้าใจภาพใหญ่',
    remember: 'เวลาทำข้อสอบให้แยกคำให้ได้: Soft Power คืออิทธิพลทางความคิด, NEETs คือเยาวชนที่ไม่เรียน ไม่ทำงาน ไม่ฝึกอบรม, Digital Disruption คือเทคโนโลยีทำให้ระบบเดิมต้องปรับตัว',
    icon: Rocket,
    tone: 'amber',
    visual: 'tech',
    cards: [
      { title: 'Soft Power', body: 'การขยายอิทธิพลผ่านวัฒนธรรม ค่านิยม นโยบาย คุณภาพชีวิต การศึกษา กฎหมาย และบทบาทในเวทีนานาชาติ' },
      { title: 'NEETs', body: 'Not in Education, Employment or Training มักหมายถึงเยาวชนอายุ 15-24 ปีที่ไม่อยู่ในระบบเรียน งาน หรือฝึกอบรม' },
      { title: 'Digital Disruption', body: 'การเปลี่ยนแปลงที่เกิดจากดิจิทัล โมเดลธุรกิจใหม่ ข้อมูล real-time mobile technology และ cloud' },
      { title: 'Lifelong Learning', body: 'การเรียนรู้ตลอดชีวิต ทั้งในระบบ นอกระบบ และตามอัธยาศัย เพื่อพัฒนาคุณภาพชีวิตอย่างต่อเนื่อง' },
      { title: 'Education For All', body: 'การศึกษาสำหรับประชาชนทุกคน รัฐต้องจัดการศึกษาขั้นพื้นฐานอย่างน้อย 12 ปี และเปิดโอกาสให้เรียนรู้ทุกช่วงวัย' },
    ],
    rows: [
      { label: '5G/6G', value: 'เครือข่ายมือถือยุคใหม่' },
      { label: 'Quantum Computing', value: 'การคำนวณและวิศวกรรมควอนตัม' },
      { label: 'Future AI / Metaverse', value: 'AI และจักรวาลนฤมิต' },
      { label: 'Mobility-as-a-Service', value: 'การเดินทางแบบไร้รอยต่อ' },
      { label: 'Perovskite Solar Cell', value: 'เซลล์แสงอาทิตย์รูปแบบใหม่' },
      { label: 'Next Gen Battery', value: 'แบตเตอรี่ลิเทียมยุคหน้า' },
      { label: 'Exoskeleton', value: 'โครงเสริมภายนอกกาย' },
      { label: 'Microbial Fiber', value: 'ไฟเบอร์จากจุลินทรีย์' },
      { label: 'Companion Diagnostics', value: 'กายจำลองทดสอบยา' },
      { label: 'Personalized Cancer Vaccine', value: 'วัคซีนมะเร็งเฉพาะบุคคล' },
    ],
  },
  {
    id: 'bani',
    eyebrow: 'BANI World',
    title: 'BANI World: โลกเปราะ กังวล ไม่เป็นเส้นตรง และเข้าใจยาก',
    intro:
      'BANI เป็นกรอบอธิบายโลกที่ซับซ้อนหลังยุค VUCA ระบบจำนวนมากดูแข็งแรงแต่เปราะบาง ผู้คนกังวลเพราะความไม่แน่นอน เหตุและผลไม่เป็นเส้นตรง และข้อมูลจำนวนมากทำให้เข้าใจภาพรวมได้ยาก',
    remember: 'จำ BANI เป็น 4 คำ: Brittle, Anxious, Nonlinear, Incomprehensible แล้วเชื่อมกับบทบาทครูที่ต้องสร้างภูมิคุ้มกันทางความคิดให้ผู้เรียน',
    icon: Network,
    tone: 'rose',
    visual: 'bani',
    cards: [
      { tag: 'B', title: 'Brittle', body: 'ระบบดูแข็งแรงแต่เปราะ ภายใต้ความเครียดหรือวิกฤตอาจล้มเร็ว' },
      { tag: 'A', title: 'Anxious', body: 'สังคมเต็มไปด้วยความกังวล เพราะตัดสินใจภายใต้ความไม่แน่นอนสูง' },
      { tag: 'N', title: 'Nonlinear', body: 'เหตุและผลไม่เป็นเส้นตรง เรื่องเล็กอาจสร้างผลกระทบใหญ่เกินคาด' },
      { tag: 'I', title: 'Incomprehensible', body: 'ข้อมูลมากและซับซ้อนจนเข้าใจยาก ต้องใช้การคิดวิเคราะห์และความรู้หลายมิติ' },
    ],
    list: [
      'ครูต้องช่วยให้ผู้เรียนอ่านข้อมูลอย่างมีวิจารณญาณ ไม่ตื่นตระหนกกับข่าวสาร และฝึกวางแผนรับมือความเปลี่ยนแปลง',
      'เศรษฐกิจพอเพียงเชื่อมกับ BANI ได้โดยตรง เพราะเน้นพอประมาณ มีเหตุผล และมีภูมิคุ้มกันก่อนตัดสินใจ',
    ],
  },
  {
    id: 'sep',
    eyebrow: 'Sufficiency Economy Philosophy',
    title: 'ปรัชญาของเศรษฐกิจพอเพียง',
    intro:
      'หลักปรัชญาของเศรษฐกิจพอเพียงเป็นแนวคิดการพัฒนาบนทางสายกลาง ช่วยให้บุคคล ชุมชน องค์กร และประเทศดำเนินชีวิตอย่างสมดุล รอบคอบ และพร้อมรับการเปลี่ยนแปลง โดยไม่เน้นความสุดโต่งหรือการเติบโตที่ขาดภูมิคุ้มกัน',
    remember: 'แกนจำที่ต้องแม่นที่สุดคือ 3 ห่วง 2 เงื่อนไข สมดุล 4 มิติ',
    icon: Leaf,
    tone: 'emerald',
    visual: 'sep',
    cards: [
      { tag: '3 ห่วง', title: 'พอประมาณ', body: 'ทำสิ่งต่าง ๆ ให้พอดีกับกำลัง ทรัพยากร และบริบท ไม่มากหรือน้อยเกินไป' },
      { tag: '3 ห่วง', title: 'มีเหตุผล', body: 'ตัดสินใจจากข้อมูล เหตุและผล เห็นผลกระทบต่อระยะสั้นและระยะยาว' },
      { tag: '3 ห่วง', title: 'มีภูมิคุ้มกันในตัวที่ดี', body: 'เตรียมพร้อมรับความเสี่ยง วิกฤต และการเปลี่ยนแปลงที่อาจเกิดขึ้น' },
      { tag: '2 เงื่อนไข', title: 'ความรู้', body: 'รอบรู้ รอบคอบ ระมัดระวัง ใช้ความรู้จริงก่อนตัดสินใจ' },
      { tag: '2 เงื่อนไข', title: 'คุณธรรม', body: 'ซื่อสัตย์ อดทน เพียร มีสติ และไม่เบียดเบียนผู้อื่น' },
      { tag: '4 มิติ', title: 'เศรษฐกิจ สังคม สิ่งแวดล้อม วัฒนธรรม', body: 'ผลลัพธ์ที่ดีต้องสมดุลทั้งชีวิต ความสัมพันธ์ ทรัพยากร และรากวัฒนธรรม' },
    ],
    list: [
      'ประยุกต์กับตนเอง: วางแผนชีวิต การเงิน การเรียน และการใช้เทคโนโลยีอย่างพอดี มีเหตุผล และพร้อมรับความเสี่ยง',
      'ประยุกต์กับผู้เรียน: จัดการเรียนรู้ที่ให้เด็กคิด ตัดสินใจ ลงมือทำ และเห็นผลกระทบต่อผู้อื่นและสิ่งแวดล้อม',
      'ประยุกต์กับงานครู: ใช้ทรัพยากรอย่างคุ้มค่า วางแผนรอบคอบ และพัฒนานวัตกรรมที่เหมาะกับบริบทโรงเรียน',
      'ประยุกต์กับชุมชน: เชื่อมโรงเรียนกับชุมชน ใช้ภูมิปัญญาท้องถิ่น และพัฒนาอย่างสมดุลไม่ทำลายฐานชีวิตเดิม',
    ],
  },
  {
    id: 'new-theory',
    eyebrow: 'New Theory & Ethics',
    title: 'ทฤษฎีใหม่ สัปปุริสธรรม 7 และพระบรมราโชบายด้านการศึกษา',
    intro:
      'ทฤษฎีใหม่เป็นแนวทางจัดการทรัพยากรเพื่อพึ่งตนเองและพัฒนาต่อเป็นเครือข่าย ส่วนสัปปุริสธรรม 7 และพระบรมราโชบายด้านการศึกษาช่วยเชื่อมมิติคุณธรรม ความเป็นพลเมือง และอาชีพเข้ากับการพัฒนาผู้เรียน',
    remember: 'ตัวเลขที่ออกสอบง่าย: ทฤษฎีใหม่ 30:30:30:10, สัปปุริสธรรม 7, พระบรมราโชบาย 4 ด้าน',
    icon: Landmark,
    tone: 'slate',
    visual: 'new-theory',
    cards: [
      { tag: '30%', title: 'แหล่งน้ำ', body: 'เก็บน้ำไว้ใช้ในหน้าแล้งและรองรับการผลิต' },
      { tag: '30%', title: 'นาข้าว', body: 'ผลิตอาหารหลักเพื่อความมั่นคงทางอาหาร' },
      { tag: '30%', title: 'พืชผสมผสาน', body: 'ปลูกไม้ผล พืชไร่ พืชผัก หรือเลี้ยงสัตว์เพื่อกระจายความเสี่ยง' },
      { tag: '10%', title: 'ที่อยู่อาศัยและทางใช้สอย', body: 'บ้าน ทางเดิน โรงเรือน และพื้นที่จำเป็นในการดำรงชีวิต' },
    ],
    list: [
      'ขั้นต้น: จัดสรรพื้นที่และทรัพยากรเพื่อพึ่งตนเองให้ได้ก่อน',
      'ขั้นกลาง: รวมกลุ่มเป็นสหกรณ์หรือวิสาหกิจชุมชน เพื่อช่วยกันผลิต แปรรูป และจัดการทรัพยากร',
      'ขั้นก้าวหน้า: เชื่อมทุน ตลาด เครือข่าย และองค์กรภายนอก เพื่อเพิ่มความเข้มแข็งอย่างไม่หลุดจากหลักพอเพียง',
      'สัปปุริสธรรม 7 ได้แก่ ธัมมัญญุตา อัตถัญญุตา อัตตัญญุตา มัตตัญญุตา กาลัญญุตา ปริสัญญุตา และปุคคลัญญุตา',
      'พระบรมราโชบายด้านการศึกษา 4 ด้าน ได้แก่ มีทัศนคติที่ถูกต้องต่อบ้านเมือง มีพื้นฐานชีวิตมั่นคงมีคุณธรรม มีงานทำมีอาชีพ และเป็นพลเมืองดี',
    ],
  },
];

const practiceItems = [
  {
    question: 'ข้อใดอธิบาย “โลกแห่งการเรียนรู้ไร้พรมแดน” ได้ตรงที่สุด',
    choices: ['การเรียนรู้จำกัดเฉพาะห้องเรียน', 'การเข้าถึงองค์ความรู้ผ่านการสื่อสารที่ไม่จำกัดพื้นที่และเวลา', 'การลดบทบาทเทคโนโลยีในโรงเรียน', 'การสอนแบบครูเป็นศูนย์กลางเท่านั้น'],
    answer: 'การเข้าถึงองค์ความรู้ผ่านการสื่อสารที่ไม่จำกัดพื้นที่และเวลา',
    reason: 'คำนี้เน้นการเชื่อมต่อข่าวสารและความรู้ได้รวดเร็ว ไม่จำกัดเชื้อชาติ ศาสนา เพศ อายุ หรือพื้นที่',
  },
  {
    question: '3Rs ในทักษะศตวรรษที่ 21 ประกอบด้วยข้อใด',
    choices: ['Reading, Writing, Arithmetic', 'Research, Reading, Reflection', 'Robot, Reading, Reasoning', 'Responsibility, Respect, Resilience'],
    answer: 'Reading, Writing, Arithmetic',
    reason: '3Rs คืออ่านออก เขียนได้ และคิดเลขเป็น เป็นฐานก่อนต่อยอดสู่ 8Cs',
  },
  {
    question: 'ทักษะใดใน 8Cs เกี่ยวข้องกับการรู้เท่าทันข้อมูล ข่าวสาร และสื่อมากที่สุด',
    choices: ['Cross-cultural Understanding', 'Communication, Information and Media Literacy', 'Career and Learning Skills', 'Compassion'],
    answer: 'Communication, Information and Media Literacy',
    reason: 'กลุ่มนี้เน้นการสื่อสาร การใช้ข้อมูล และการรู้เท่าทันสื่อโดยตรง',
  },
  {
    question: 'SDGs มีระยะเวลาดำเนินการตามกรอบใด',
    choices: ['ค.ศ. 2000-2015', 'ค.ศ. 2015-2030', 'ค.ศ. 2020-2040', 'พ.ศ. 2566-2570'],
    answer: 'ค.ศ. 2015-2030',
    reason: 'SDGs เป็นเป้าหมายการพัฒนาที่ยั่งยืนช่วง 15 ปี ตั้งแต่ ค.ศ. 2015 ถึง 2030',
  },
  {
    question: 'เป้าหมาย SDG ใดเกี่ยวข้องกับการศึกษาที่มีคุณภาพ เท่าเทียม และเรียนรู้ตลอดชีวิต',
    choices: ['SDG 3', 'SDG 4', 'SDG 8', 'SDG 17'],
    answer: 'SDG 4',
    reason: 'SDG 4 มุ่งสร้างหลักประกันว่าทุกคนมีการศึกษาที่มีคุณภาพอย่างครอบคลุมและเท่าเทียม',
  },
  {
    question: 'หลัก “ไม่ทิ้งใครไว้ข้างหลัง” ใน SDGs มีนัยสำคัญต่อครูอย่างไร',
    choices: ['จัดการเรียนรู้ให้เข้าถึงผู้เรียนทุกกลุ่ม', 'สอนเฉพาะผู้เรียนที่พร้อมที่สุด', 'ลดบทบาทการประเมินรายบุคคล', 'เน้นการแข่งขันเป็นหลัก'],
    answer: 'จัดการเรียนรู้ให้เข้าถึงผู้เรียนทุกกลุ่ม',
    reason: 'ครูต้องออกแบบการเรียนรู้ที่ลดความเหลื่อมล้ำและคำนึงถึงความแตกต่างของผู้เรียน',
  },
  {
    question: 'NEETs หมายถึงกลุ่มใด',
    choices: ['นักเรียนที่เรียนออนไลน์', 'เยาวชนที่ไม่อยู่ในระบบการศึกษา การทำงาน หรือการฝึกอบรม', 'ครูที่ต้องพัฒนาเทคโนโลยี', 'แรงงานที่เรียนต่อระดับสูง'],
    answer: 'เยาวชนที่ไม่อยู่ในระบบการศึกษา การทำงาน หรือการฝึกอบรม',
    reason: 'NEETs ย่อมาจาก Not in Education, Employment or Training',
  },
  {
    question: 'Digital Disruption คืออะไร',
    choices: ['การลดการใช้เทคโนโลยีในสังคม', 'การเปลี่ยนแปลงระบบเดิมจากเทคโนโลยีดิจิทัลและโมเดลใหม่', 'การเรียนรู้เฉพาะในหนังสือ', 'การแยกโรงเรียนออกจากชุมชน'],
    answer: 'การเปลี่ยนแปลงระบบเดิมจากเทคโนโลยีดิจิทัลและโมเดลใหม่',
    reason: 'คำนี้เน้นผลกระทบจากดิจิทัล ข้อมูล real-time mobile technology cloud และนวัตกรรมที่ทำให้ระบบเดิมต้องปรับ',
  },
  {
    question: 'BANI World ตัว N หมายถึงอะไร',
    choices: ['Networked', 'Neutral', 'Nonlinear', 'Natural'],
    answer: 'Nonlinear',
    reason: 'Nonlinear คือเหตุและผลไม่เป็นเส้นตรง ผลกระทบอาจใหญ่กว่าสาเหตุที่เห็น',
  },
  {
    question: 'หัวใจของหลักปรัชญาของเศรษฐกิจพอเพียงคือข้อใด',
    choices: ['เติบโตให้เร็วที่สุด', 'ทางสายกลางที่มีพอประมาณ เหตุผล และภูมิคุ้มกัน', 'แข่งขันโดยไม่ต้องคำนึงถึงทรัพยากร', 'ใช้เทคโนโลยีแทนคุณธรรม'],
    answer: 'ทางสายกลางที่มีพอประมาณ เหตุผล และภูมิคุ้มกัน',
    reason: 'SEP เน้น 3 ห่วง 2 เงื่อนไข เพื่อความสมดุลและพร้อมรับการเปลี่ยนแปลง',
  },
  {
    question: '2 เงื่อนไขของเศรษฐกิจพอเพียงคือข้อใด',
    choices: ['เงินทุนและตลาด', 'ความรู้และคุณธรรม', 'เวลาและสถานที่', 'อำนาจและทรัพยากร'],
    answer: 'ความรู้และคุณธรรม',
    reason: 'การตัดสินใจตาม SEP ต้องอาศัยความรู้ที่รอบคอบและคุณธรรมกำกับ',
  },
  {
    question: 'สมดุล 4 มิติในเศรษฐกิจพอเพียง ได้แก่ข้อใด',
    choices: ['เศรษฐกิจ สังคม สิ่งแวดล้อม วัฒนธรรม', 'ครอบครัว โรงเรียน ชุมชน ประเทศ', 'อ่าน เขียน คิดเลข เทคโนโลยี', 'คน เงิน ตลาด ผลิตภัณฑ์'],
    answer: 'เศรษฐกิจ สังคม สิ่งแวดล้อม วัฒนธรรม',
    reason: 'ผลของการใช้ SEP ที่ดีควรสมดุลทั้ง 4 มิตินี้',
  },
  {
    question: 'ทฤษฎีใหม่แบ่งพื้นที่ตามสัดส่วนใด',
    choices: ['40:30:20:10', '30:30:30:10', '25:25:25:25', '60:20:10:10'],
    answer: '30:30:30:10',
    reason: 'ภาพจำคือแหล่งน้ำ 30 นาข้าว 30 พืชผสมผสาน 30 ที่อยู่อาศัยและใช้สอย 10',
  },
  {
    question: 'ข้อใดเป็นหนึ่งในพระบรมราโชบายด้านการศึกษา 4 ด้าน',
    choices: ['มีทัศนคติที่ถูกต้องต่อบ้านเมือง', 'เน้นท่องจำเป็นหลัก', 'เรียนเฉพาะทักษะดิจิทัล', 'ลดบทบาทคุณธรรมในโรงเรียน'],
    answer: 'มีทัศนคติที่ถูกต้องต่อบ้านเมือง',
    reason: 'อีก 3 ด้านคือพื้นฐานชีวิตมั่นคงมีคุณธรรม มีงานทำมีอาชีพ และเป็นพลเมืองดี',
  },
  {
    question: 'บทบาทครูใน Education 4.0 ควรเป็นอย่างไร',
    choices: ['ผู้บอกคำตอบทั้งหมด', 'ผู้ควบคุมให้ท่องจำ', 'โค้ชและผู้ออกแบบประสบการณ์เรียนรู้', 'ผู้ลดการใช้เทคโนโลยีทั้งหมด'],
    answer: 'โค้ชและผู้ออกแบบประสบการณ์เรียนรู้',
    reason: 'Education 4.0 เน้นผู้เรียนสร้างนวัตกรรมและแก้ปัญหา ครูจึงต้องออกแบบพื้นที่เรียนรู้',
  },
  {
    question: 'Reskill ต่างจาก Upskill อย่างไร',
    choices: ['Reskill คือเรียนทักษะใหม่ ส่วน Upskill คือยกระดับทักษะเดิม', 'Reskill ใช้กับครูเท่านั้น ส่วน Upskill ใช้กับนักเรียนเท่านั้น', 'Reskill คือหยุดเรียน ส่วน Upskill คือสอบ', 'ทั้งสองคำไม่มีความแตกต่าง'],
    answer: 'Reskill คือเรียนทักษะใหม่ ส่วน Upskill คือยกระดับทักษะเดิม',
    reason: 'สองคำนี้เชื่อมกับการพัฒนาคนให้ทันตลาดแรงงาน เทคโนโลยี และนวัตกรรม',
  },
];

const tocItems = [
  { id: 'overview', label: 'ภาพรวมและผังข้อสอบ' },
  ...sections.map(section => ({ id: section.id, label: section.title })),
  { id: 'practice', label: 'แบบฝึกหัดท้ายบท' },
];

const LessonVisual: React.FC<{ type?: LessonSection['visual'] }> = ({ type }) => {
  if (!type) return null;

  if (type === 'flow') {
    return (
      <div className="b11-visual b11-flow-visual" aria-label="แผนภาพโลกไร้พรมแดน">
        {[
          ['โลกเชื่อมต่อ', 'ข่าวสารและความรู้เดินทางเร็ว'],
          ['ผู้เรียนเข้าถึงข้อมูล', 'เรียนรู้ได้จากหลายพื้นที่'],
          ['ครูคัดกรองและออกแบบ', 'สร้างกิจกรรมให้ใช้ข้อมูลเป็น'],
          ['เรียนรู้อย่างรู้เท่าทัน', 'ใช้เทคโนโลยีอย่างมีจริยธรรม'],
        ].map(([title, body], index) => (
          <div key={title} className="b11-flow-step">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'skills') {
    return (
      <div className="b11-visual b11-skills-visual" aria-label="แผนภาพ 3Rs และ 8Cs">
        <div className="b11-skill-core">
          <strong>3Rs</strong>
          <span>Reading • Writing • Arithmetic</span>
        </div>
        <div className="b11-skill-ring">
          {['Critical', 'Creative', 'Collaborate', 'Communicate', 'Culture', 'Computing', 'Career', 'Compassion'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'sdgs') {
    return (
      <div className="b11-visual b11-sdgs-visual" aria-label="แผนภาพ SDGs 5P">
        <div className="b11-sdgs-main">
          <strong>SDG 4</strong>
          <span>Quality Education</span>
          <p>คุณภาพ • เท่าเทียม • เรียนรู้ตลอดชีวิต</p>
        </div>
        <div className="b11-sdgs-petals">
          {['People', 'Prosperity', 'Planet', 'Peace', 'Partnership'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'tech') {
    return (
      <div className="b11-visual b11-tech-visual" aria-label="แผนภาพเทคโนโลยีและคำออกสอบ">
        <div>
          <Rocket className="h-10 w-10" />
          <strong>Digital Disruption</strong>
          <span>AI • Cloud • Mobile • Real-time Data</span>
        </div>
        <div className="b11-tech-tags">
          {['Soft Power', 'NEETs', 'Lifelong Learning', 'Education For All', '5G/6G', 'Metaverse'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'bani') {
    return (
      <div className="b11-visual b11-bani-visual" aria-label="แผนภาพ BANI World">
        {[
          ['B', 'Brittle', 'เปราะ'],
          ['A', 'Anxious', 'กังวล'],
          ['N', 'Nonlinear', 'ไม่เป็นเส้นตรง'],
          ['I', 'Incomprehensible', 'เข้าใจยาก'],
        ].map(([letter, word, thai]) => (
          <div key={letter}>
            <span>{letter}</span>
            <strong>{word}</strong>
            <p>{thai}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'sep') {
    return (
      <div className="b11-visual b11-sep-visual" aria-label="แผนภาพเศรษฐกิจพอเพียง">
        <div className="b11-sep-orbit">
          <span>พอประมาณ</span>
          <span>มีเหตุผล</span>
          <span>ภูมิคุ้มกัน</span>
          <strong>ทางสายกลาง</strong>
        </div>
        <div className="b11-sep-conditions">
          <span>ความรู้</span>
          <span>คุณธรรม</span>
          <em>สมดุล 4 มิติ</em>
        </div>
      </div>
    );
  }

  return (
    <div className="b11-visual b11-theory-visual" aria-label="แผนภาพทฤษฎีใหม่">
      {[
        ['30%', 'แหล่งน้ำ'],
        ['30%', 'นาข้าว'],
        ['30%', 'พืชผสมผสาน'],
        ['10%', 'ที่อยู่อาศัย'],
      ].map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const WorldContextSufficiencyLesson: React.FC<WorldContextSufficiencyLessonProps> = ({
  topic,
  onBack,
  theme = 'light',
  examLabel = 'สนามสอบใบประกอบวิชาชีพครู',
  backLabel = 'กลับสู่สนามสอบใบประกอบฯ',
}) => {
  const [activeId, setActiveId] = useState('overview');
  const isDark = theme === 'dark';

  const totalConcepts = useMemo(
    () => sections.reduce((sum, section) => sum + (section.cards?.length || 0) + (section.list?.length || 0), 0),
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [topic.id]);

  useEffect(() => {
    const elements = tocItems
      .map(item => document.getElementById(`b11-${item.id}`))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id.replace('b11-', ''));
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0.08, 0.2, 0.45] },
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`b11-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`b11-page ${isDark ? 'b11-page--dark' : 'b11-page--light'}`}>
      <section className="b11-lesson-hero">
        <button type="button" onClick={onBack} className="b11-back-button">
          <ChevronLeft className="h-5 w-5" />
          {backLabel}
        </button>

        <div className="b11-lesson-hero__inner">
          <div className="b11-hero-badge">
            <span />
            {examLabel} 2569
          </div>

          <h1>
            {topic.title}
            <span>อ่านแบบชีทเลคเชอร์ก่อนลงสนามสอบ</span>
          </h1>

          <p>
            บทเรียนสนามสอบใบประกอบฯ ที่แปลงเนื้อหาจากไฟล์สรุปให้เป็นชีทอ่านง่าย
            จำภาพใหญ่ได้ไว และฝึกข้อสอบท้ายบทโดยซ่อนเฉลยไว้ก่อน
          </p>

          <div className="b11-hero-actions">
            <button type="button" onClick={() => scrollTo('overview')} className="b11-primary-action">
              เริ่มอ่านบทเรียน
              <ArrowRight className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scrollTo('practice')} className="b11-secondary-action">
              ไปแบบฝึกหัดท้ายบท
              <PenLine className="h-5 w-5" />
            </button>
          </div>

          <div className="b11-hero-proof" aria-label="ข้อมูลบทเรียน">
            <div>
              <strong>12</strong>
              <span>ข้อใน Blueprint</span>
            </div>
            <div>
              <strong>{sections.length}</strong>
              <span>ตอนเรียนหลัก</span>
            </div>
            <div>
              <strong>{practiceItems.length}</strong>
              <span>ข้อฝึกท้ายบท</span>
            </div>
          </div>

          <div className="b11-hero-topic-cloud" aria-label="ภาพรวมหัวข้อบทเรียน">
            <div className="is-blue">
              <Globe2 className="h-6 w-6" />
              <strong>บริบทโลก</strong>
              <span>Megatrends • BANI • Digital</span>
            </div>
            <div className="is-amber">
              <Target className="h-6 w-6" />
              <strong>SDGs และทักษะคน</strong>
              <span>3Rs8Cs • SDG 4 • Lifelong</span>
            </div>
            <div className="is-green">
              <Leaf className="h-6 w-6" />
              <strong>เศรษฐกิจพอเพียง</strong>
              <span>3 ห่วง 2 เงื่อนไข • ทฤษฎีใหม่</span>
            </div>
          </div>
        </div>
      </section>

      <div className="b11-study-layout">
        <aside className="b11-side-menu" aria-label="สารบัญเนื้อหา">
          <div className="b11-side-menu__surface">
            <div className="b11-side-menu__title">
              <LibraryBig className="h-6 w-6" />
              <div>
                <strong>สารบัญเนื้อหา</strong>
                <span>บทที่ 1 ใบประกอบฯ</span>
              </div>
            </div>

            <nav>
              {tocItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`b11-side-menu__item ${activeId === item.id ? 'is-active' : ''}`}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.label}</strong>
                </button>
              ))}
            </nav>

            <div className="b11-official-note">
              <FileCheck2 className="h-5 w-5" />
              <p>อ้างอิงแนว Test Blueprint ใบประกอบฯ: หัวข้อนี้อยู่ในหมวดการเปลี่ยนแปลงบริบทโลกและเศรษฐกิจพอเพียง</p>
            </div>
          </div>
        </aside>

        <main className="b11-lesson-content">
          <section id="b11-overview" className="b11-section b11-section--intro">
            <div className="b11-section-kicker">
              <Layers3 className="h-5 w-5" />
              Blueprint Map
            </div>
            <h2>อ่านโจทย์ให้ออกก่อน: บทนี้วัดอะไร</h2>
            <p>
              สนามสอบใบประกอบวิชาชีพครูไม่ได้วัดแค่จำคำศัพท์ แต่ต้องเชื่อมให้ได้ว่าโลกเปลี่ยนอย่างไร
              ผู้เรียนควรมีสมรรถนะใด ครูต้องออกแบบการเรียนรู้อย่างไร และหลักพอเพียงช่วยให้ตัดสินใจอย่างสมดุลได้อย่างไร
            </p>

            <div className="b11-blueprint-grid">
              {blueprintCards.map(card => (
                <article key={card.label} className="b11-blueprint-card">
                  <div>{card.label}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>

            <div className="b11-memory-strip">
              <Lightbulb className="h-7 w-7" />
              <div>
                <strong>ภาพจำทั้งบท</strong>
                <span>โลกเปลี่ยน → คนต้องมีทักษะ → ครูต้องปรับบทบาท → ใช้พอเพียงเป็นฐานคิดให้สมดุล</span>
              </div>
            </div>
          </section>

          {sections.map((section, sectionIndex) => {
            const Icon = section.icon;

            return (
              <section
                key={section.id}
                id={`b11-${section.id}`}
                className={`b11-section b11-section--${section.tone}`}
              >
                <div className="b11-section-header">
                  <div className="b11-section-number">{String(sectionIndex + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="b11-section-kicker">
                      <Icon className="h-5 w-5" />
                      {section.eyebrow}
                    </div>
                    <h2>{section.title}</h2>
                  </div>
                </div>

                <p>{section.intro}</p>

                <div className="b11-remember-box">
                  <Sparkles className="h-6 w-6" />
                  <div>
                    <strong>ควรจำ</strong>
                    <span>{section.remember}</span>
                  </div>
                </div>

                <LessonVisual type={section.visual} />

                {section.cards && (
                  <div className="b11-concept-grid">
                    {section.cards.map(card => (
                      <article key={`${section.id}-${card.title}`} className="b11-concept-card">
                        {card.tag && <div className="b11-concept-tag">{card.tag}</div>}
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </article>
                    ))}
                  </div>
                )}

                {section.rows && (
                  <div className="b11-note-table">
                    {section.rows.map(row => (
                      <div key={`${section.id}-${row.label}`} className="b11-note-row">
                        <strong>{row.label}</strong>
                        <span>{row.value}</span>
                        {row.note && <em>{row.note}</em>}
                      </div>
                    ))}
                  </div>
                )}

                {section.list && (
                  <div className="b11-check-list">
                    {section.list.map(item => (
                      <div key={item}>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          <section id="b11-practice" className="b11-section b11-practice-section">
            <div className="b11-section-header">
              <div className="b11-section-number">
                <ListChecks className="h-7 w-7" />
              </div>
              <div>
                <div className="b11-section-kicker">
                  <PenLine className="h-5 w-5" />
                  Practice
                </div>
                <h2>แบบฝึกหัดท้ายบท</h2>
              </div>
            </div>

            <p>
              ชุดนี้แปลงประเด็นจากไฟล์เรียนให้เป็นข้อสอบฝึกคิดแบบสนามสอบจริง
              เฉลยถูกซ่อนไว้ใต้แต่ละข้อเพื่อให้ลองตอบก่อนตรวจคำอธิบาย
            </p>

            <div className="b11-practice-grid">
              {practiceItems.map((item, index) => (
                <article key={item.question} className="b11-practice-card">
                  <div className="b11-practice-card__meta">
                    <span>ข้อ {index + 1}</span>
                    <CircleDot className="h-4 w-4" />
                  </div>
                  <h3>{item.question}</h3>
                  <ol>
                    {item.choices.map(choice => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ol>
                  <details>
                    <summary>ดูเฉลยและเหตุผล</summary>
                    <div>
                      <strong>ตอบ: {item.answer}</strong>
                      <p>{item.reason}</p>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section className="b11-finish-panel" aria-label="สรุปท้ายบท">
            <div>
              <Flag className="h-8 w-8" />
              <h2>สรุปปิดบท</h2>
              <p>
                ถ้าจะจำให้สั้นที่สุด ให้จำลำดับนี้: บริบทโลกทำให้ผู้เรียนต้องมีทักษะใหม่
                ครูจึงต้องออกแบบการเรียนรู้ใหม่ และเศรษฐกิจพอเพียงคือฐานคิดให้การพัฒนาคนไม่เสียสมดุล
              </p>
            </div>
            <div className="b11-finish-stats">
              <span>{totalConcepts}</span>
              <strong>ประเด็นจำหลัก</strong>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WorldContextSufficiencyLesson;
