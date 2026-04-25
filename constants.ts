
import { ExamPart, PartId } from './types';
import { CHAPTER_1_PHONOLOGY } from './content/A1-1/chapter1';
import { CHAPTER_2_SYLLABLES } from './content/A1-1/chapter2';
import { CHAPTER_3_WORD_TYPES } from './content/A1-1/chapter3';
import { CHAPTER_4_WORD_BUILDING } from './content/A1-1/chapter4';
import { CHAPTER_5_LOANWORDS } from './content/A1-1/chapter5';
import { CHAPTER_6_IDIOMS } from './content/A1-1/chapter6';
import { CHAPTER_7_SENTENCE } from './content/A1-1/chapter7';
import { CHAPTER_8_ROYAL_VOCAB } from './content/A1-1/chapter8';
import { CHAPTER_9_WORD_USAGE } from './content/A1-1/chapter9';
import { CHAPTER_10_SUMMARY_QUIZ } from './content/A1-1/chapter10';

import { CHAPTER_0_SERIES_1 } from './content/A1-2/chapter0';
import { CHAPTER_0_SERIES_2 } from './content/A1-2/chapter0_2';
import { CHAPTER_MATH_SUMMARY_QUIZ } from './content/A1-2/chapter_summary_quiz';

import { CHAPTER_1_CONSECUTIVE_NUMBERS } from './content/A1-2/chapter1';
import { CHAPTER_2_SUM_CONSECUTIVE } from './content/A1-2/chapter2';
import { CHAPTER_3_DIVISIBILITY_FRACTIONS } from './content/A1-2/chapter3';
import { CHAPTER_4_POWERS } from './content/A1-2/chapter4';
import { CHAPTER_5_ROOTS_EQUATIONS } from './content/A1-2/chapter5';
import { CHAPTER_6_SQUARE_ROOT_POLYNOMIALS } from './content/A1-2/chapter6';
import { CHAPTER_7_PROPORTION_WORK } from './content/A1-2/chapter7';
import { CHAPTER_8_PERCENTAGE_RATIO } from './content/A1-2/chapter8';
import { CHAPTER_9_EQUATIONS } from './content/A1-2/chapter9';
import { CHAPTER_10_POLES_AND_AGE } from './content/A1-2/chapter10';
import { CHAPTER_11_SPEED_GCD_LCM } from './content/A1-2/chapter11';
import { CHAPTER_12_COMBINATORICS_STATISTICS } from './content/A1-2/chapter12';
import { CHAPTER_13_QUIZ } from './content/A1-2/chapter13';

import { CHAPTER_14_AREA_PERIMETER } from './content/A1-2/chapter14';
import { CHAPTER_15_VOLUME_SURFACE } from './content/A1-2/chapter15';
import { CHAPTER_16_SHADED_AREA } from './content/A1-2/chapter16';
import { CHAPTER_17_PIE_CHART } from './content/A1-2/chapter17';
import { CHAPTER_19_SYMBOLIC_CONDITION } from './content/A1-2/chapter19';
import { CHAPTER_20_LANGUAGE_CONDITION } from './content/A1-2/chapter20';
import { CHAPTER_21_DATA_SUFFICIENCY } from './content/A1-2/chapter21';
import { CHAPTER_18_QUIZ_PART2 } from './content/A1-2/chapter18';

import { CHAPTER_22_REASONING_CONDITIONAL } from './content/A1-2/chapter22';
import { CHAPTER_23_REASONING_OR } from './content/A1-2/chapter23';
import { CHAPTER_24_REASONING_VENN } from './content/A1-2/chapter24';
import { CHAPTER_25_REASONING_PRACTICE } from './content/A1-2/chapter25';
import { A2_GRAMMAR_CHAPTERS } from './content/A2/grammar';
import { A2_VOCABULARY_CHAPTERS, A2_READING_CHAPTERS, A2_CONVERSATION_CHAPTERS } from './content/A2/index';

import { CHAPTER_0_OVERVIEW } from './content/A3-1/chapter0';
import { CHAPTER_1_INTRO, CHAPTER_1_PART1, CHAPTER_1_PART2, CHAPTER_1_PART3, CHAPTER_1_PART4, CHAPTER_1_PART5, CHAPTER_1_PART6, CHAPTER_1_SUMMARY } from './content/A3-1/chapter1';
import { A3_2_INTRODUCTION, A3_2_CHAPTER1, A3_2_CHAPTER2, A3_2_CHAPTER3, A3_2_CHAPTER4, A3_2_CHAPTER5, A3_2_CHAPTER6, A3_2_CHAPTER7, A3_2_CHAPTER8 } from './content/A3-2/index';
import { A3_3_INTRODUCTION, A3_3_CHAPTER1, A3_3_CHAPTER2, A3_3_CHAPTER3, A3_3_CHAPTER4, A3_3_CHAPTER5, A3_3_SUMMARY } from './content/A3-3/index';
import { A3_4_INTRODUCTION, A3_4_CHAPTER1, A3_4_CHAPTER2, A3_4_CHAPTER3, A3_4_CHAPTER4, A3_4_CHAPTER5, A3_4_CHAPTER6, A3_4_CHAPTER7, A3_4_SUMMARY } from './content/A3-4/index';
import { A3_5_INTRODUCTION, A3_5_CHAPTER1, A3_5_CHAPTER2, A3_5_CHAPTER3, A3_5_CHAPTER4, A3_5_CHAPTER5, A3_5_CHAPTER6, A3_5_CHAPTER7, A3_5_SUMMARY } from './content/A3-5/index';
import { A3_6_INTRODUCTION, A3_6_CHAPTER1, A3_6_CHAPTER2, A3_6_CHAPTER3, A3_6_CHAPTER4, A3_6_CHAPTER5, A3_6_CHAPTER6, A3_6_CHAPTER7, A3_6_SUMMARY } from './content/A3-6/index';
import { B1_1_INTRODUCTION, B1_1_CHAPTER1, B1_1_CHAPTER2, B1_1_CHAPTER3, B1_1_CHAPTER4, B1_1_CHAPTER5, B1_1_CHAPTER6, B1_1_SUMMARY } from './content/B1-1/index';
import { B1_2_INTRODUCTION, B1_2_CHAPTER1, B1_2_CHAPTER2, B1_2_CHAPTER3, B1_2_CHAPTER4, B1_2_CHAPTER5, B1_2_CHAPTER6, B1_2_CHAPTER7, B1_2_CHAPTER8, B1_2_SUMMARY } from './content/B1-2/index';
import { B1_3_INTRODUCTION, B1_3_CHAPTER1, B1_3_CHAPTER2, B1_3_CHAPTER3, B1_3_CHAPTER4, B1_3_CHAPTER5, B1_3_CHAPTER6, B1_3_CHAPTER7, B1_3_SUMMARY, B1_3_CORE_CURRICULUM, B1_3_CORE_CURRICULUM_CHAPTER1, B1_3_CORE_CURRICULUM_CHAPTER2, B1_3_CORE_CURRICULUM_CHAPTER3, B1_3_CORE_CURRICULUM_CHAPTER4, B1_3_CORE_CURRICULUM_CHAPTER5, B1_3_CORE_CURRICULUM_CHAPTER6, B1_3_CORE_CURRICULUM_SUMMARY, B1_3_LEARNER_CENTERED, B1_3_LEARNER_CENTERED_CHAPTER1, B1_3_LEARNER_CENTERED_CHAPTER2, B1_3_LEARNER_CENTERED_CHAPTER3, B1_3_LEARNER_CENTERED_CHAPTER4, B1_3_LEARNER_CENTERED_CHAPTER5, B1_3_LEARNER_CENTERED_CHAPTER6, B1_3_LEARNER_CENTERED_CHAPTER7, B1_3_LEARNER_CENTERED_SUMMARY, B1_3_CLASSROOM_MANAGEMENT, B1_3_CLASSROOM_MANAGEMENT_CHAPTER1, B1_3_CLASSROOM_MANAGEMENT_CHAPTER2, B1_3_CLASSROOM_MANAGEMENT_CHAPTER3, B1_3_CLASSROOM_MANAGEMENT_CHAPTER4, B1_3_CLASSROOM_MANAGEMENT_CHAPTER5, B1_3_CLASSROOM_MANAGEMENT_CHAPTER6, B1_3_CLASSROOM_MANAGEMENT_SUMMARY, B1_3_DIGITAL_LEARNING, B1_3_DIGITAL_LEARNING_CHAPTER1, B1_3_DIGITAL_LEARNING_CHAPTER2, B1_3_DIGITAL_LEARNING_CHAPTER3, B1_3_DIGITAL_LEARNING_CHAPTER4, B1_3_DIGITAL_LEARNING_CHAPTER5, B1_3_DIGITAL_LEARNING_CHAPTER6, B1_3_DIGITAL_LEARNING_CHAPTER7, B1_3_DIGITAL_LEARNING_SUMMARY } from './content/B1-3/index';
import { B1_4_RESEARCH_INTRODUCTION, B1_4_RESEARCH_CHAPTER1, B1_4_RESEARCH_CHAPTER2, B1_4_RESEARCH_CHAPTER3, B1_4_RESEARCH_CHAPTER4, B1_4_RESEARCH_CHAPTER5, B1_4_RESEARCH_CHAPTER6, B1_4_RESEARCH_CHAPTER7, B1_4_RESEARCH_SUMMARY } from './content/B1-4/index';
import { B1_4_ASSESSMENT_INTRODUCTION, B1_4_ASSESSMENT_CHAPTER1, B1_4_ASSESSMENT_CHAPTER2, B1_4_ASSESSMENT_CHAPTER3, B1_4_ASSESSMENT_CHAPTER4, B1_4_ASSESSMENT_CHAPTER5, B1_4_ASSESSMENT_CHAPTER6, B1_4_ASSESSMENT_CHAPTER7, B1_4_ASSESSMENT_SUMMARY } from './content/B1-4/index';
import { B1_5_INTRODUCTION, B1_5_CHAPTER1, B1_5_CHAPTER2, B1_5_CHAPTER3, B1_5_CHAPTER4, B1_5_CHAPTER5, B1_5_CHAPTER6, B1_5_CHAPTER7, B1_5_SUMMARY } from './content/B1-5/index';
import { B3_1_INTRODUCTION, B3_1_CHAPTER1, B3_1_CHAPTER2, B3_1_CHAPTER3, B3_1_CHAPTER4, B3_1_CHAPTER5, B3_1_CHAPTER6, B3_1_CHAPTER7, B3_1_CHAPTER8, B3_1_SUMMARY } from './content/B3-1/index';
import { B3_2_INTRODUCTION, B3_2_CHAPTER1, B3_2_CHAPTER2, B3_2_CHAPTER3, B3_2_CHAPTER4, B3_2_CHAPTER5, B3_2_CHAPTER6, B3_2_CHAPTER7, B3_2_CHAPTER8, B3_2_CHAPTER9, B3_2_SUMMARY } from './content/B3-2/index';
import { B3_3_INTRODUCTION, B3_3_CHAPTER1, B3_3_CHAPTER2, B3_3_CHAPTER3, B3_3_CHAPTER4, B3_3_CHAPTER5, B3_3_CHAPTER6, B3_3_SUMMARY } from './content/B3-3/index';
import { B3_4_INTRODUCTION, B3_4_CHAPTER1, B3_4_CHAPTER2, B3_4_CHAPTER3, B3_4_CHAPTER4, B3_4_CHAPTER5, B3_4_CHAPTER6, B3_4_CHAPTER7, B3_4_CHAPTER8, B3_4_CHAPTER9, B3_4_SUMMARY } from './content/B3-4/index';
import { B3_5_INTRODUCTION, B3_5_CHAPTER1, B3_5_CHAPTER2, B3_5_CHAPTER3, B3_5_CHAPTER4, B3_5_CHAPTER5, B3_5_CHAPTER6, B3_5_CHAPTER7, B3_5_CHAPTER8, B3_5_CHAPTER9, B3_5_SUMMARY } from './content/B3-5/index';
import { B3_6_INTRODUCTION, B3_6_CHAPTER1, B3_6_CHAPTER2, B3_6_CHAPTER3, B3_6_CHAPTER4, B3_6_CHAPTER5, B3_6_CHAPTER6, B3_6_CHAPTER7, B3_6_CHAPTER8, B3_6_CHAPTER9, B3_6_CHAPTER10, B3_6_SUMMARY } from './content/B3-6/index';
import { B3_7_INTRODUCTION, B3_7_CHAPTER1, B3_7_CHAPTER2, B3_7_CHAPTER3, B3_7_CHAPTER4, B3_7_CHAPTER5, B3_7_CHAPTER6, B3_7_CHAPTER7, B3_7_CHAPTER8, B3_7_CHAPTER9, B3_7_CHAPTER10, B3_7_SUMMARY } from './content/B3-7/index';
import { B3_8_INTRODUCTION, B3_8_CHAPTER1, B3_8_CHAPTER2, B3_8_CHAPTER3, B3_8_CHAPTER4, B3_8_CHAPTER5, B3_8_CHAPTER6, B3_8_CHAPTER7, B3_8_SUMMARY } from './content/B3-8/index';
import { B3_9_INTRODUCTION, B3_9_CHAPTER1, B3_9_CHAPTER2, B3_9_CHAPTER3, B3_9_CHAPTER4, B3_9_CHAPTER5, B3_9_CHAPTER6, B3_9_CHAPTER7, B3_9_CHAPTER8, B3_9_SUMMARY } from './content/B3-9/index';
import { B3_10_INTRODUCTION, B3_10_CHAPTER1, B3_10_CHAPTER2, B3_10_CHAPTER3, B3_10_CHAPTER4, B3_10_CHAPTER5, B3_10_CHAPTER6, B3_10_CHAPTER7, B3_10_CHAPTER8, B3_10_CHAPTER9, B3_10_SUMMARY } from './content/B3-10/index';
import { C_INTERVIEW_CHAPTERS } from './content/C/index';

// --- Modular Content for A1-1 (Thai Language) ---


// Legacy fallback for other lessons
const CONTENT_LAW_EDU = `
# กฎหมายการศึกษาที่สำคัญ

## 1. พ.ร.บ. การศึกษาแห่งชาติ
*   เป็นกฎหมายแม่บททางการศึกษา
*   **หัวใจสำคัญ:** "ผู้เรียนทุกคนมีความสามารถเรียนรู้และพัฒนาตนเองได้ และถือว่าผู้เรียนสำคัญที่สุด"

## 2. พ.ร.บ. สภาครูและบุคลากรทางการศึกษา (2546)
*   กำหนดให้มี "คุรุสภา" มีหน้าที่ออกและเพิกถอนใบอนุญาตประกอบวิชาชีพ
*   วิชาชีพครูถือเป็น **"วิชาชีพควบคุม"**

---

### เกร็ดความจำ
> จำไว้ว่า **ก.ค.ศ.** ดูแลเรื่อง "คน" (บรรจุ แต่งตั้ง เงินเดือน วินัย)
> ส่วน **คุรุสภา** ดูแลเรื่อง "ตั๋ว" (ใบประกอบวิชาชีพ จรรยาบรรณ)
`;

const CONTENT_PLACEHOLDER = `
# เนื้อหาบทเรียน

อยู่ระหว่างการปรับปรุงเนื้อหาให้เป็นปัจจุบัน (อัพเดต ปี 2569)

---

*กรุณากลับมาใหม่ในภายหลัง หรือใช้ **AI Tutor** (ปุ่มขวาล่าง) เพื่อสอบถามหัวข้อนี้ได้ทันที*
`;

// Shared video for demo purposes (The Notion MP4 User provided)
const SHARED_VIDEO_URL = "https://file.notion.so/f/f/7220b31d-47b0-42ee-97be-2c8d49668dbb/4f8292f5-aea5-4ed9-9504-e9498932f244/.mp4?table=block&id=2cba3a8d-1d30-80b1-a51d-ecf4437be379&spaceId=7220b31d-47b0-42ee-97be-2c8d49668dbb&expirationTimestamp=1765908000000&signature=jxsjnHcbzlz8P9CEXpXJFC3S7m7H5BTPJN9iIuPjU_8&downloadName=%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2.mp4";
const SHARED_IMG_URL = "https://drive.google.com/file/d/10FUAKVRaqjdmi7ycmnPGNPUtYl1ehqIQ/view?usp=drive_link";
const SHARED_PDF_URL = "https://drive.google.com/file/d/1n1T-e1c8QXGQktC2k2NiWIguKPUqj_Er/view?usp=drive_link";

export const EXAM_CURRICULUM: ExamPart[] = [
  {
    id: PartId.PART_A,
    title: "ภาค ก",
    subtitle: "ความรู้ความสามารถทั่วไป (200 คะแนน)",
    color: "blue",
    sections: [
      {
        id: "A1",
        title: "1. ความสามารถในการคิดวิเคราะห์ (100 คะแนน)",
        subTopics: [
          {
            id: "A1-1",
            title: "1.1 ภาษาไทย",
            description: "ภาษาไทย: ระบบเสียง, ชนิดและการสร้างคำ, คำยืม, สำนวน, ประโยค, ราชาศัพท์, และการใช้คำ",
            promptContext: "วิชาภาษาไทย ระบบเสียง คำเป็นคำตาย ชนิดของคำ การสร้างคำ คำยืมภาษาต่างประเทศ สำนวนสุภาษิต ประโยค คำราชาศัพท์ และการใช้คำ",
            contentPath: "/content/part-a/A1-1.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { 
                id: 'c1', 
                title: '1. สระ พยัญชนะ วรรณยุกต์', 
                content: CHAPTER_1_PHONOLOGY, 
                videoUrl: "https://drive.google.com/file/d/1fwzEMIq8fH0pTDwDAjLr3U-YDWDgmqct/view?usp=drive_link"
              },
              { id: 'c2', title: '2. คำเป็น – คำตาย , คำครุ - คำลหุ , พยางค์ปิด - พยางค์เปิด', content: CHAPTER_2_SYLLABLES, videoUrl: "https://drive.google.com/file/d/1vowTMgujuVXJyfPnG8H5rPWuzwvr8ziz/view?usp=drive_link" },
              { id: 'c3', title: '3. ชนิดของคำ', content: CHAPTER_3_WORD_TYPES, videoUrl: "https://drive.google.com/file/d/1LDKnXFT0EpveiK90AsAmqfzuHEMxNoC7/view?usp=drive_link" },
              { id: 'c4', title: '4. การสร้างคำ', content: CHAPTER_4_WORD_BUILDING, videoUrl: "https://drive.google.com/file/d/1ik1KzAExoMZmLMoCxYkOfh-mZzSRqSa1/view?usp=drive_link" },
              { id: 'c5', title: '5. คำยืมภาษาต่างประเทศ', content: CHAPTER_5_LOANWORDS, videoUrl: "https://drive.google.com/file/d/1RKcd-ZXeQULT-PqD2Lzg2maZKQMWWE5v/view?usp=drive_link" },
              { id: 'c6', title: '6. สำนวน คำพังเพย สุภาษิต', content: CHAPTER_6_IDIOMS, videoUrl: "https://drive.google.com/file/d/1faI4UUv48LZ6HtTCDvs6IQEf-QDG81ip/view?usp=drive_link" },
              { id: 'c7', title: '7. ประโยค', content: CHAPTER_7_SENTENCE, videoUrl: "https://drive.google.com/file/d/19ySp9NbRK9ZXKMnVa--lILgF4MOlNDbL/view?usp=drive_link" },
              { id: 'c8', title: '8. คำราชาศัพท์', content: CHAPTER_8_ROYAL_VOCAB, videoUrl: "https://drive.google.com/file/d/1SG1qmCSJvj5VUEhBwFuPb4GcpJDnud4L/view?usp=drive_link" },
              { id: 'c9', title: '9. คำและวิธีการใช้คำ', content: CHAPTER_9_WORD_USAGE, videoUrl: "https://drive.google.com/file/d/1Rdk-wUl13lwBMHaIl0Y6umLhyRCznlg2/view?usp=drive_link" },
              { id: 'quiz', title: 'แบบทดสอบท้ายบท', content: CHAPTER_10_SUMMARY_QUIZ, isQuiz: true }
            ]
          },
          {
            id: "A1-2",
            title: "1.2 คณิตศาสตร์",
            description: "ความสามารถในการคิดวิเคราะห์เชิงตรรกะ ตัวเลข และเหตุผล: อุปมาอุปไมย, เงื่อนไขสัญลักษณ์, ตรรกศาสตร์, คณิตศาสตร์พื้นฐาน และการวิเคราะห์ข้อมูล",
            promptContext: "การคิดวิเคราะห์เชิงนามธรรมและปริมาณ อุปมาอุปไมย ตรรกศาสตร์ เงื่อนไขสัญลักษณ์ คณิตศาสตร์พื้นฐาน อนุกรม และการวิเคราะห์ข้อมูล",
            contentPath: "/content/part-a/A1-2.md",
            summaryImageUrl: "https://drive.google.com/thumbnail?id=1p_TyxFT9WIxzmeKxAUrhz-RoIY-K0Qiv&sz=w1200",
            topicParts: [
              { id: 'part0', title: 'Part 0 อนุกรม' },
              { id: 'part1', title: 'Part 1 การคิดวิเคราะห์และคณิตศาสตร์พื้นฐาน' },
              { id: 'part2', title: 'Part 2 พื้นที่ปริมาตร แผนภูมิ และเงื่อนไขสัญลักษณ์' },
              { id: 'part3', title: 'Part 3 การให้เหตุผลและความน่าจะเป็น' }
            ],
            chapters: [
              { 
                id: 'c0_1', 
                part: 'part0', 
                title: '1. อนุกรมตอนที่ 1', 
                videoUrl: 'https://drive.google.com/file/d/1ZRYcSnJ7peWwdzJZAa1Z9V0VSewZ01nx/view?usp=drive_link', 
                summaryImageUrl: 'https://drive.google.com/file/d/1eYhP_wKKTFquMBIVPovhdmvxljNybvZZ/view?usp=drive_link',
                content: CHAPTER_0_SERIES_1 
              },
              { 
                id: 'c0_2', 
                part: 'part0', 
                title: '2. อนุกรมตอนที่ 2', 
                videoUrl: 'https://drive.google.com/file/d/1QhJpyXbRNEOJCQQBxJMDBlWksTO4qHcX/view?usp=drive_link', 
                summaryImageUrl: 'https://drive.google.com/file/d/1dz2C14Y9jJIUiqufeEOWW65TYp3QJ6U9/view?usp=drive_link',
                content: CHAPTER_0_SERIES_2 
              },
              { id: 'quiz_part0', part: 'part0', title: 'แบบทดสอบ Part 0 อนุกรม', content: '# ⭐️ 📝 แบบทดสอบ Part 0 อนุกรม\n\nเมื่อน้องๆ ทบทวนสรุปและเทคนิคทั้งหมดใน Part 0 แล้ว สามารถทดสอบความรู้เพื่อวัดความเข้าใจได้เลยครับ ขอให้โชคดี สอบผ่านทุกคนครับ!', isQuiz: true },
              { id: 'c1', part: 'part1', title: '1. จำนวนเรียงกัน', videoUrl: 'https://drive.google.com/file/d/1dJzkGUGWYbjAHGvrug3e11flU6d4D2bJ/view?usp=drive_link', content: CHAPTER_1_CONSECUTIVE_NUMBERS },
              { id: 'c2', part: 'part1', title: '2. ผลบวกของเลขหลายจำนวนเรียงกันและการหาจำนวนข้อมูล', content: CHAPTER_2_SUM_CONSECUTIVE },
              { id: 'c3', part: 'part1', title: '3. การหารลงตัว & เศษส่วน ทศนิยม', content: CHAPTER_3_DIVISIBILITY_FRACTIONS },
              { id: 'c4', part: 'part1', title: '4. เลขยกกำลัง', content: CHAPTER_4_POWERS },
              { id: 'c5', part: 'part1', title: '5. รูท (ราก) และสมการเลขยกกำลัง', content: CHAPTER_5_ROOTS_EQUATIONS },
              { id: 'c6', part: 'part1', title: '6. สมบัติและการคำนวณรากที่สอง (Square Root)', content: CHAPTER_6_SQUARE_ROOT_POLYNOMIALS },
              { id: 'c7', part: 'part1', title: '7. บัญญัติไตรยางศ์ และ เรื่องงาน', content: CHAPTER_7_PROPORTION_WORK },
              { id: 'c8', part: 'part1', title: '8. ร้อยละ กำไรขาดทุน และอัตราส่วน', content: CHAPTER_8_PERCENTAGE_RATIO },
              { id: 'c9', part: 'part1', title: '9. สมการ ขาสัตว์ และเหรียญ', content: CHAPTER_9_EQUATIONS },
              { id: 'c10', part: 'part1', title: '10. การปักเสา และเรื่องอายุ', content: CHAPTER_10_POLES_AND_AGE },
              { id: 'c11', part: 'part1', title: '11. ความเร็วยานพาหนะ และ ห.ร.ม. ค.ร.น.', content: CHAPTER_11_SPEED_GCD_LCM },
              { id: 'c12', part: 'part1', title: '12. นาฬิกา สถิติ ความน่าจะเป็น และการจัดหมู่', content: CHAPTER_12_COMBINATORICS_STATISTICS },
              { id: 'quiz_part1', part: 'part1', title: 'แบบทดสอบ Part 1 การคิดวิเคราะห์และคณิตศาสตร์พื้นฐาน', content: '# ⭐️ 📝 แบบทดสอบ Part 1\n\nเมื่อน้องๆ ทบทวนสรุปและเทคนิคทั้งหมดใน Part 1 การคิดวิเคราะห์และคณิตศาสตร์พื้นฐาน แล้ว สามารถทดสอบความรู้เพื่อวัดความเข้าใจได้เลยครับ ขอให้โชคดี สอบผ่านทุกคนครับ!', isQuiz: true },
              { id: 'c14', part: 'part2', title: '13. พื้นที่และเส้นรอบรูปแบบต่างๆ', videoUrl: "https://drive.google.com/file/d/1q6tEjuwTs6CTYxzlqYrj_Z2hh1MbU9Ka/view?usp=drive_link", content: CHAPTER_14_AREA_PERIMETER },
              { id: 'c15', part: 'part2', title: '14. ปริมาตรและพื้นที่ผิว', content: CHAPTER_15_VOLUME_SURFACE },
              { id: 'c16', part: 'part2', title: '15. การหาพื้นที่แรเงาและพื้นที่ซับซ้อน', content: CHAPTER_16_SHADED_AREA },
              { id: 'c17', part: 'part2', title: '16. แผนภูมิรูปวงกลม (Pie Chart)', content: CHAPTER_17_PIE_CHART },
              { id: 'c19', part: 'part2', title: '17. เงื่อนไขสัญลักษณ์', content: CHAPTER_19_SYMBOLIC_CONDITION },
              { id: 'c20', part: 'part2', title: '18. เงื่อนไขภาษา', content: CHAPTER_20_LANGUAGE_CONDITION },
              { id: 'c21', part: 'part2', title: '19. ความเพียงพอของข้อมูล', content: CHAPTER_21_DATA_SUFFICIENCY },
              { id: 'quiz_part2', part: 'part2', title: 'แบบทดสอบ Part 2 พื้นที่ปริมาตร แผนภูมิ และเงื่อนไขสัญลักษณ์', content: '# ⭐️ 📝 แบบทดสอบ Part 2\n\nเมื่อน้องๆ ทบทวนสรุปและเทคนิคทั้งหมดใน Part 2 พื้นที่ปริมาตร แผนภูมิ และเงื่อนไขสัญลักษณ์ แล้ว สามารถทดสอบความรู้เพื่อวัดความเข้าใจได้เลยครับ ขอให้โชคดี สอบผ่านทุกคนครับ!', isQuiz: true },
              { id: 'c22', part: 'part3', title: '20. การให้เหตุผลแบบประโยคเงื่อนไข (ถ้า...แล้ว)', videoUrl: "https://drive.google.com/file/d/1RKud-SAB6s0Uwb08WSMtxGohgU7LZ4QY/view?usp=drive_link", content: CHAPTER_22_REASONING_CONDITIONAL },
              { id: 'c23', part: 'part3', title: '21. การให้เหตุผลแบบมีตัวเลือก (หรือ)', content: CHAPTER_23_REASONING_OR },
              { id: 'c24', part: 'part3', title: '22. การให้เหตุผลแบบวาดรูป (Venn Diagram)', content: CHAPTER_24_REASONING_VENN },
              { id: 'c25', part: 'part3', title: '23. แนวข้อสอบ: เรื่องการสรุปเหตุผล', content: CHAPTER_25_REASONING_PRACTICE },
              { id: 'quiz_part3', part: 'part3', title: 'แบบทดสอบ Part 3 การให้เหตุผลและความน่าจะเป็น', content: '# ⭐️ 📝 แบบทดสอบ Part 3\n\nเมื่อน้องๆ ทบทวนสรุปและเทคนิคทั้งหมดใน Part 3 การให้เหตุผลและความน่าจะเป็น แล้ว สามารถทดสอบความรู้เพื่อวัดความเข้าใจได้เลยครับ ขอให้โชคดี สอบผ่านทุกคนครับ!', isQuiz: true }
            ]
          }
        ]
      },
      {
        id: "A2",
        title: "2. ทักษะภาษาอังกฤษ (50 คะแนน)",
        subTopics: [
          {
            id: "A2-1",
            title: "2.1 Part 1 Grammar",
            description: "โครงสร้างประโยค Parts of Speech, Tenses, Agreement, Active และ Passive Voice",
            promptContext: "English Grammar for Teacher Assistant Exam",
            contentPath: "/content/part-a/A2/grammar.md",
            chapters: A2_GRAMMAR_CHAPTERS
          },
          {
            id: "A2-2",
            title: "2.2 Part 2 Vocabulary",
            description: "Prefix, Suffix, Word Form, Context Clues, Synonym และ Antonym",
            promptContext: "English Vocabulary for Teacher Assistant Exam",
            contentPath: "/content/part-a/A2/vocabulary.md",
            chapters: A2_VOCABULARY_CHAPTERS
          },
          {
            id: "A2-3",
            title: "2.3 Part 3 Reading",
            description: "Skimming, Scanning, Main Idea, Detail, Inference และ Reference",
            promptContext: "English Reading for Teacher Assistant Exam",
            contentPath: "/content/part-a/A2/reading.md",
            chapters: A2_READING_CHAPTERS
          },
          {
            id: "A2-4",
            title: "2.4 Part 4 Conversation",
            description: "บทสนทนา Greeting, Request, Offering Help, Opinion และ Classroom English",
            promptContext: "English Conversation for Teacher Assistant Exam",
            contentPath: "/content/part-a/A2/conversation.md",
            chapters: A2_CONVERSATION_CHAPTERS
          }
        ]
      },
      {
        id: "A3",
        title: "3. การเป็นข้าราชการที่ดี (50 คะแนน)",
        subTopics: [
          {
            id: "A3-0",
            title: "Part 0 สรุปภาพรวม วิชา การเป็นข้าราชการที่ดี",
            description: "สรุปเนื้อหาและแนวข้อสอบ",
            promptContext: "กฎหมายและระเบียบข้าราชการ ภาพรวม",
            contentPath: "/content/A3/part0.md",
            videoUrl: "https://drive.google.com/file/d/1nbFyECo-Uv6I_-GPWSNJ-8NZjATzFAUd/view?usp=drive_link",
            chapters: [
              { id: 'c0_1', title: '1. สรุปภาพรวม', content: CHAPTER_0_OVERVIEW, videoUrl: "https://drive.google.com/file/d/1nbFyECo-Uv6I_-GPWSNJ-8NZjATzFAUd/view?usp=drive_link", summaryImageUrl: "https://drive.google.com/file/d/1ViWJ9wh5NIlvXLbtwU7mr_9qhsGDB4M9/view?usp=drive_link" }
            ]
          },
          {
            id: "A3-1",
            title: "Part 1 พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน",
            description: "พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน พ.ศ. 2534",
            promptContext: "กฎหมายบริหารราชการแผ่นดิน",
            contentPath: "/content/A3/part1.md",
            summaryImageUrl: "https://drive.google.com/file/d/1kmjhAU9VV_9pNeuGaJac9U7rCiy5dlK-/view?usp=drive_link",
            chapters: [
              { id: 'c1_0', title: '1. บทนำ ภาพรวม พ.ร.บ. บริหารราชการแผ่นดิน', content: CHAPTER_1_INTRO, videoUrl: "https://drive.google.com/file/d/1Z4RMc1Z-Z-zszCxEJCK1D7zak0J77cFe/view?usp=drive_link" },
              { id: 'c1_1', title: '2. บทเรียนที่ 1 ส่วนที่ 1 การจัดระเบียบราชการส่วนกลาง', content: CHAPTER_1_PART1 },
              { id: 'c1_2', title: '3. บทเรียนที่ 2 ส่วนที่ 2 การบริหารราชการส่วนภูมิภาค', content: CHAPTER_1_PART2 },
              { id: 'c1_3', title: '4. บทเรียนที่ 3 ส่วนที่ 3 การจัดระเบียบบริหารราชการส่วนท้องถิ่น', content: CHAPTER_1_PART3 },
              { id: 'c1_4', title: '5. บทเรียนที่ 4 ส่วนที่ 4 คณะกรรมการพัฒนาระบบราชการ (ก.พ.ร.)', content: CHAPTER_1_PART4 },
              { id: 'c1_5', title: '6. บทเรียนที่ 5 ส่วนที่ 4 การไกล่เกลี่ยประนอมข้อพิพาทของประชาชน', content: CHAPTER_1_PART5 },
              { id: 'c1_6', title: '7. บทเรียนที่ 6 การไกล่เกลี่ยประนอมข้อพิพาทของประชาชน (ต่อ)', content: CHAPTER_1_PART6 },
              { id: 'c1_7', title: '8. บทสรุป พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน', content: CHAPTER_1_SUMMARY, summaryImageUrl: "https://drive.google.com/file/d/1kmjhAU9VV_9pNeuGaJac9U7rCiy5dlK-/view?usp=drive_link" },
              { id: 'quiz_part1', title: '9. ฝึกทำแบบทดสอบหลังเรียน', content: '# ⭐️ 📝 แบบทดสอบ Part 1\n\nทดสอบความเข้าใจเนื้อหา Part 1', isQuiz: true }
            ]
          },
          {
            id: "A3-2",
            title: "Part 2 พ.ร.ฎ.บ้านเมืองที่ดี",
            description: "หลักเกณฑ์และวิธีการบริหารกิจการบ้านเมืองที่ดี",
            promptContext: "ธรรมาภิบาล บ้านเมืองที่ดี",
            contentPath: "/content/A3/part2.md",
            summaryImageUrl: "https://drive.google.com/file/d/1WroSUHfk7dUFQmqsAxaUuWCsDvIXuZ3q/view?usp=drive_link",
            chapters: [
              { id: 'c2_intro', title: '2.1 บทนำ', content: A3_2_INTRODUCTION, videoUrl: "https://drive.google.com/file/d/1aQypDEMCQr6Mhq21z4fUY-CLRt8XImmI/view?usp=drive_link" },
              { id: 'c2_1', title: '2.2 บทที่ 1 หมวด 1', content: A3_2_CHAPTER1 },
              { id: 'c2_2', title: '2.3 บทที่ 2 หมวด 2', content: A3_2_CHAPTER2 },
              { id: 'c2_3', title: '2.4 บทที่ 3 หมวด 3', content: A3_2_CHAPTER3 },
              { id: 'c2_4', title: '2.5 บทที่ 4 หมวด 4', content: A3_2_CHAPTER4 },
              { id: 'c2_5', title: '2.6 บทที่ 5 หมวด 5', content: A3_2_CHAPTER5 },
              { id: 'c2_6', title: '2.7 บทที่ 6 หมวด 6', content: A3_2_CHAPTER6 },
              { id: 'c2_7', title: '2.8 บทที่ 7 หมวด 7', content: A3_2_CHAPTER7 },
              { id: 'c2_8', title: '2.9 บทที่ 8 หมวด 8 และ 9', content: A3_2_CHAPTER8 },
              { id: 'quiz_part2', title: 'แบบทดสอบ Part 2', content: '# ⭐️ 📝 แบบทดสอบ Part 2\n\nทดสอบความเข้าใจเนื้อหา Part 2', isQuiz: true }
            ]
          },
          {
            id: "A3-3",
            title: "Part 3 พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง",
            description: "กฎหมายวิธีปฏิบัติราชการทางปกครอง",
            promptContext: "วิธีปฏิบัติราชการทางปกครอง",
            contentPath: "/content/A3/part3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'c3_intro', title: '1. บทนำ', content: A3_3_INTRODUCTION, videoUrl: SHARED_VIDEO_URL },
              { id: 'c3_1', title: '2. บทเรียนที่ 1 หมวด 1', content: A3_3_CHAPTER1 },
              { id: 'c3_2', title: '3. บทเรียนที่ 2 หมวด 2', content: A3_3_CHAPTER2 },
              { id: 'c3_3', title: '4. บทเรียนที่ 3 หมวด 3', content: A3_3_CHAPTER3 },
              { id: 'c3_4', title: '5. บทเรียนที่ 4 หมวด 4', content: A3_3_CHAPTER4 },
              { id: 'c3_5', title: '6. บทเรียนที่ 5 หมวด 5', content: A3_3_CHAPTER5 },
              { id: 'c3_summary', title: '7. บทสรุป', content: A3_3_SUMMARY },
              { id: 'quiz_part3', title: 'แบบทดสอบ Part 3', content: '# ⭐️ 📝 แบบทดสอบ Part 3\n\nทดสอบความเข้าใจเนื้อหา Part 3', isQuiz: true }
            ]
          },
          {
            id: "A3-4",
            title: "Part 4 พ.ร.บ.มาตรฐานทางจริยธรรม",
            description: "มาตรฐานทางจริยธรรมของเจ้าหน้าที่ของรัฐ",
            promptContext: "มาตรฐานทางจริยธรรม",
            contentPath: "/content/A3/part4.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'c4_intro', title: '1. บทนำ', content: A3_4_INTRODUCTION, videoUrl: SHARED_VIDEO_URL },
              { id: 'c4_1', title: '2. บทเรียนที่ 1 ภาพรวมกฎหมายและนิยามสำคัญ', content: A3_4_CHAPTER1 },
              { id: 'c4_2', title: '3. บทเรียนที่ 2 มาตรฐานทางจริยธรรมและประมวลจริยธรรม', content: A3_4_CHAPTER2 },
              { id: 'c4_3', title: '4. บทเรียนที่ 3 ผู้จัดทำประมวลจริยธรรมและโครงสร้างการกำหนดกติกา', content: A3_4_CHAPTER3 },
              { id: 'c4_4', title: '5. บทเรียนที่ 4 ก.ม.จ. คณะกรรมการมาตรฐานทางจริยธรรม', content: A3_4_CHAPTER4 },
              { id: 'c4_5', title: '6. บทเรียนที่ 5 การรักษาจริยธรรมของเจ้าหน้าที่ของรัฐ', content: A3_4_CHAPTER5 },
              { id: 'c4_6', title: '7. บทเรียนที่ 6 ประมวลจริยธรรมครูและบุคลากรทางการศึกษา (ข้อ 1-4)', content: A3_4_CHAPTER6 },
              { id: 'c4_7', title: '8. บทเรียนที่ 7 ประมวลจริยธรรมครูและบุคลากรทางการศึกษา (ข้อ 5-8 และการใช้จริง)', content: A3_4_CHAPTER7 },
              { id: 'c4_summary', title: '9. บทสรุป', content: A3_4_SUMMARY },
              { id: 'quiz_part4', title: 'แบบทดสอบ Part 4', content: '# ⭐️ 📝 แบบทดสอบ Part 4\n\nทดสอบความเข้าใจเนื้อหา Part 4', isQuiz: true }
            ]
          },
          {
            id: "A3-5",
            title: "Part 5 พ.ร.บ.ความรับผิดทางละเมิดของเจ้าหน้าที่",
            description: "ความรับผิดทางละเมิดของเจ้าหน้าที่",
            promptContext: "ความรับผิดทางละเมิด",
            contentPath: "/content/A3/part5.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'c5_intro', title: '1. บทนำ', content: A3_5_INTRODUCTION, videoUrl: SHARED_VIDEO_URL },
              { id: 'c5_1', title: '2. บทเรียนที่ 1 ภาพรวมกฎหมายและนิยามสำคัญ', content: A3_5_CHAPTER1 },
              { id: 'c5_2', title: '3. บทเรียนที่ 2 หลักรับผิดเมื่อกระทำในการปฏิบัติหน้าที่ และเมื่ออยู่นอกหน้าที่', content: A3_5_CHAPTER2 },
              { id: 'c5_3', title: '4. บทเรียนที่ 3 คู่ความ การไล่เบี้ย และอายุความสำคัญ', content: A3_5_CHAPTER3 },
              { id: 'c5_4', title: '5. บทเรียนที่ 4 ขั้นตอนยื่นคำขอ ชดใช้ค่าสินไหม และการออกคำสั่งเรียกชำระ', content: A3_5_CHAPTER4 },
              { id: 'c5_5', title: '6. บทเรียนที่ 5 แยกให้ออก ระหว่างประมาท เหตุสุดวิสัย ประมาทเลินเล่ออย่างร้ายแรง และจงใจ', content: A3_5_CHAPTER5 },
              { id: 'c5_6', title: '7. บทเรียนที่ 6 ตารางตัดสิน 4 สถานการณ์ใหญ่ของข้อสอบ', content: A3_5_CHAPTER6 },
              { id: 'c5_7', title: '8. บทเรียนที่ 7 จุดหลอกข้อสอบและตัวอย่างที่ต้องระวัง', content: A3_5_CHAPTER7 },
              { id: 'c5_summary', title: '9. บทสรุป', content: A3_5_SUMMARY },
              { id: 'quiz_part5', title: 'แบบทดสอบ Part 5', content: '# ⭐️ 📝 แบบทดสอบ Part 5\n\nทดสอบความเข้าใจเนื้อหา Part 5', isQuiz: true }
            ]
          },
          {
            id: "A3-6",
            title: "Part 6 พ.ร.บ. ให้ใช้ประมวลกฎหมายอาญา",
            description: "ความผิดต่อตำแหน่งหน้าที่ราชการ",
            promptContext: "ประมวลกฎหมายอาญา",
            contentPath: "/content/A3/part6.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'c6_intro', title: '1. บทนำ', content: A3_6_INTRODUCTION, videoUrl: SHARED_VIDEO_URL },
              { id: 'c6_1', title: '2. บทเรียนที่ 1 ภาพรวม พ.ร.บ. ให้ใช้ประมวลกฎหมายอาญา และฐานคิดก่อนจำมาตรา', content: A3_6_CHAPTER1 },
              { id: 'c6_2', title: '3. บทเรียนที่ 2 แผนที่มาตรา 147-166 และวิธีจำทั้งหมวดแบบไม่หลง', content: A3_6_CHAPTER2 },
              { id: 'c6_3', title: '4. บทเรียนที่ 3 กลุ่มทุจริตโทษหนัก มาตรา 147-151', content: A3_6_CHAPTER3 },
              { id: 'c6_4', title: '5. บทเรียนที่ 4 กลุ่มผลประโยชน์ทับซ้อน ภาษี และบัญชี มาตรา 152-156', content: A3_6_CHAPTER4 },
              { id: 'c6_5', title: '6. บทเรียนที่ 5 มาตรา 157 ปฏิบัติหรือละเว้นหน้าที่โดยมิชอบ หรือโดยทุจริต', content: A3_6_CHAPTER5 },
              { id: 'c6_6', title: '7. บทเรียนที่ 6 เอกสาร ตรา ความลับราชการ และการสื่อสาร มาตรา 158-164', content: A3_6_CHAPTER6 },
              { id: 'c6_7', title: '8. บทเรียนที่ 7 ขัดขวางกฎหมายและละทิ้งงานประท้วง มาตรา 165-166', content: A3_6_CHAPTER7 },
              { id: 'c6_summary', title: '9. บทสรุป', content: A3_6_SUMMARY },
              { id: 'quiz_part6', title: 'แบบทดสอบ Part 6', content: '# ⭐️ 📝 แบบทดสอบ Part 6\n\nทดสอบความเข้าใจเนื้อหา Part 6', isQuiz: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: PartId.PART_B,
    title: "ภาค ข",
    subtitle: "มาตรฐานความรู้และประสบการณ์วิชาชีพ (200 คะแนน)",
    color: "orange",
    sections: [
      {
        id: "B1",
        title: "1. วิชาการศึกษา (75 คะแนน)",
        subTopics: [
          {
            id: "B1-1",
            title: "1.1 Part 1 การเปลี่ยนแปลงบริบทของโลก สังคม และแนวคิดปรัชญาเศรษฐกิจพอเพียง",
            description: "บริบทโลก สังคม และแนวคิดปรัชญาเศรษฐกิจพอเพียง",
            promptContext: "ภาค ข วิชาการศึกษา Part 1",
            contentPath: "/content/part-b/B1.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b1_1_intro', title: '1. บทนำ', content: B1_1_INTRODUCTION },
              { id: 'b1_1_c1', title: '2. บทเรียนที่ 1 ทักษะผู้เรียนในศตวรรษที่ 21 และภาพการศึกษายุคใหม่', content: B1_1_CHAPTER1 },
              { id: 'b1_1_c2', title: '3. บทเรียนที่ 2 SDGs และการศึกษาเพื่อความยั่งยืน', content: B1_1_CHAPTER2 },
              { id: 'b1_1_c3', title: '4. บทเรียนที่ 3 สมรรถนะครู บริบทนโยบายไทย และการพัฒนาทักษะคน', content: B1_1_CHAPTER3 },
              { id: 'b1_1_c4', title: '5. บทเรียนที่ 4 โลกใหม่ เทคโนโลยีใหม่ และการเรียนรู้ตลอดชีวิต', content: B1_1_CHAPTER4 },
              { id: 'b1_1_c5', title: '6. บทเรียนที่ 5 แนวคิดปรัชญาของเศรษฐกิจพอเพียง', content: B1_1_CHAPTER5 },
              { id: 'b1_1_c6', title: '7. บทเรียนที่ 6 ทฤษฎีใหม่ สัปปุริสธรรม 7 และพระบรมราโชบายด้านการศึกษา', content: B1_1_CHAPTER6 },
              { id: 'b1_1_summary', title: '8. บทสรุป', content: B1_1_SUMMARY }
            ]
          },
          {
            id: "B1-2",
            title: "1.2 Part 2 จิตวิทยา จิตวิทยาพัฒนาการ จิตวิทยาการศึกษา และจิตวิทยาให้คำปรึกษาในการวิเคราะห์ จิตวิทยาและวิทยาการเรียนรู้",
            description: "จิตวิทยาและวิทยาการเรียนรู้",
            promptContext: "ภาค ข วิชาการศึกษา Part 2",
            contentPath: "/content/part-b/B1.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b1_2_intro', title: '1. บทนำ', content: B1_2_INTRODUCTION },
              { id: 'b1_2_c1', title: '2. บทเรียนที่ 1 พื้นฐานจิตวิทยา ความแตกต่างระหว่างบุคคล พฤติกรรม และเจตคติ', content: B1_2_CHAPTER1 },
              { id: 'b1_2_c2', title: '3. บทเรียนที่ 2 จิตวิทยาการศึกษา จิตวิทยาการเรียนรู้ และประโยชน์ต่อครู', content: B1_2_CHAPTER2 },
              { id: 'b1_2_c3', title: '4. บทเรียนที่ 3 จิตวิทยาพัฒนาการ และองค์ประกอบของพัฒนาการ', content: B1_2_CHAPTER3 },
              { id: 'b1_2_c4', title: '5. บทเรียนที่ 4 สำนักจิตวิทยาและนักคิดสำคัญ', content: B1_2_CHAPTER4 },
              { id: 'b1_2_c5', title: '6. บทเรียนที่ 5 ทฤษฎีการเรียนรู้ที่ออกสอบบ่อย: Pavlov, Watson, Thorndike และ Gestalt', content: B1_2_CHAPTER5 },
              { id: 'b1_2_c6', title: '7. บทเรียนที่ 6 มนุษยนิยม ปัญญานิยม Bloom นักการศึกษาสำคัญ และ Piaget', content: B1_2_CHAPTER6 },
              { id: 'b1_2_c7', title: '8. บทเรียนที่ 7 Skinner การเสริมแรง การลงโทษ และ Freud เรื่องบุคลิกภาพ', content: B1_2_CHAPTER7 },
              { id: 'b1_2_c8', title: '9. บทเรียนที่ 8 การแนะแนว การให้คำปรึกษา และระบบดูแลช่วยเหลือนักเรียน', content: B1_2_CHAPTER8 },
              { id: 'b1_2_summary', title: '10. บทสรุป', content: B1_2_SUMMARY }
            ]
          },
          {
            id: "B1-3",
            title: "1.3 Part 3 หลักการศึกษา หลักสูตร ศาสตร์การสอน และการใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้",
            description: "หลักการศึกษา หลักสูตร ศาสตร์การสอน และเทคโนโลยีดิจิทัล",
            promptContext: "ภาค ข วิชาการศึกษา Part 3",
            contentPath: "/content/part-b/B1.md",
            videoUrl: SHARED_VIDEO_URL,
            topicParts: [
              { id: 'part1', title: '1. การพัฒนาหลักสูตร' },
              { id: 'part2', title: '2. หลักสูตรแกนกลาง' },
              { id: 'part3', title: '3. หลักการสอนเน้นผู้เรียนเป็นสำคัญ' },
              { id: 'part4', title: '4. การบริหารจัดการชั้นเรียน + การพัฒนาผู้เรียน' },
              { id: 'part5', title: '5. การใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้' }
            ],
            chapters: [
              { id: 'b1_3_intro', part: 'part1', title: '1. บทนำ', content: B1_3_INTRODUCTION },
              { id: 'b1_3_c1', part: 'part1', title: '2. บทเรียนที่ 1 ความหมายและความสำคัญของหลักสูตร', content: B1_3_CHAPTER1 },
              { id: 'b1_3_c2', part: 'part1', title: '3. บทเรียนที่ 2 องค์ประกอบของหลักสูตร และหัวใจของการนำหลักสูตรไปใช้', content: B1_3_CHAPTER2 },
              { id: 'b1_3_c3', part: 'part1', title: '4. บทเรียนที่ 3 ลักษณะของหลักสูตรที่ดี', content: B1_3_CHAPTER3 },
              { id: 'b1_3_c4', part: 'part1', title: '5. บทเรียนที่ 4 ความหมายของการพัฒนาหลักสูตร ระดับของการพัฒนา และพื้นฐานที่ต้องพิจารณา', content: B1_3_CHAPTER4 },
              { id: 'b1_3_c5', part: 'part1', title: '6. บทเรียนที่ 5 กระบวนการพัฒนาหลักสูตร: Taba, Tyler และภาพรวม 5 ขั้น', content: B1_3_CHAPTER5 },
              { id: 'b1_3_c6', part: 'part1', title: '7. บทเรียนที่ 6 การบริหารจัดการหลักสูตร และหลักสูตรระดับท้องถิ่น', content: B1_3_CHAPTER6 },
              { id: 'b1_3_c7', part: 'part1', title: '8. บทเรียนที่ 7 หลักสูตรสถานศึกษา กระบวนการจัดทำ และบทบาทของผู้เกี่ยวข้อง', content: B1_3_CHAPTER7 },
              { id: 'b1_3_summary', part: 'part1', title: '9. บทสรุป', content: B1_3_SUMMARY },
              { id: 'b1_3_part2_intro', part: 'part2', title: '1. บทนำ', content: B1_3_CORE_CURRICULUM },
              { id: 'b1_3_part2_c1', part: 'part2', title: '2. บทเรียนที่ 1 การใช้หลักสูตรแกนกลาง วิสัยทัศน์ หลักการ และจุดหมาย', content: B1_3_CORE_CURRICULUM_CHAPTER1 },
              { id: 'b1_3_part2_c2', part: 'part2', title: '3. บทเรียนที่ 2 สมรรถนะสำคัญของผู้เรียนและคุณลักษณะอันพึงประสงค์', content: B1_3_CORE_CURRICULUM_CHAPTER2 },
              { id: 'b1_3_part2_c3', part: 'part2', title: '4. บทเรียนที่ 3 มาตรฐานการเรียนรู้ ตัวชี้วัด รหัสกลุ่มสาระ และรหัสวิชา', content: B1_3_CORE_CURRICULUM_CHAPTER3 },
              { id: 'b1_3_part2_c4', part: 'part2', title: '5. บทเรียนที่ 4 สาระการเรียนรู้ 8 กลุ่ม หน่วยการเรียนรู้ และการปรับปรุงโครงสร้าง', content: B1_3_CORE_CURRICULUM_CHAPTER4 },
              { id: 'b1_3_part2_c5', part: 'part2', title: '6. บทเรียนที่ 5 กิจกรรมพัฒนาผู้เรียน ระดับการศึกษา และเวลาเรียน', content: B1_3_CORE_CURRICULUM_CHAPTER5 },
              { id: 'b1_3_part2_c6', part: 'part2', title: '7. บทเรียนที่ 6 การวัดและประเมินผล เกณฑ์การจบ เอกสารหลักฐาน และอัปเดตสำคัญ', content: B1_3_CORE_CURRICULUM_CHAPTER6 },
              { id: 'b1_3_part2_summary', part: 'part2', title: '8. บทสรุป', content: B1_3_CORE_CURRICULUM_SUMMARY },
              { id: 'b1_3_part3_intro', part: 'part3', title: '1. บทนำ', content: B1_3_LEARNER_CENTERED },
              { id: 'b1_3_part3_c1', part: 'part3', title: '2. บทเรียนที่ 1 ฐานคิดการจัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ', content: B1_3_LEARNER_CENTERED_CHAPTER1 },
              { id: 'b1_3_part3_c2', part: 'part3', title: '3. บทเรียนที่ 2 การจัดการเรียนรู้ที่เน้นการคิดวิเคราะห์', content: B1_3_LEARNER_CENTERED_CHAPTER2 },
              { id: 'b1_3_part3_c3', part: 'part3', title: '4. บทเรียนที่ 3 องค์ประกอบของการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญและการสอนที่ดี', content: B1_3_LEARNER_CENTERED_CHAPTER3 },
              { id: 'b1_3_part3_c4', part: 'part3', title: '5. บทเรียนที่ 4 รูปแบบและวิธีสอนกลุ่มสร้างประสบการณ์ แก้ปัญหา และบูรณาการ', content: B1_3_LEARNER_CENTERED_CHAPTER4 },
              { id: 'b1_3_part3_c5', part: 'part3', title: '6. บทเรียนที่ 5 โมเดลและเทคนิคสอนที่เน้นผู้เรียนเป็นศูนย์กลาง', content: B1_3_LEARNER_CENTERED_CHAPTER5 },
              { id: 'b1_3_part3_c6', part: 'part3', title: '7. บทเรียนที่ 6 เทคนิค วิธีสอน และสื่อที่ต้องแยกให้ออก', content: B1_3_LEARNER_CENTERED_CHAPTER6 },
              { id: 'b1_3_part3_c7', part: 'part3', title: '8. บทเรียนที่ 7 การเรียนรู้แบบร่วมมือ Backward Design Coding STEM Active Learning และ Flipped Classroom', content: B1_3_LEARNER_CENTERED_CHAPTER7 },
              { id: 'b1_3_part3_summary', part: 'part3', title: '9. บทสรุป', content: B1_3_LEARNER_CENTERED_SUMMARY },
              { id: 'b1_3_part4_intro', part: 'part4', title: '1. บทนำ', content: B1_3_CLASSROOM_MANAGEMENT },
              { id: 'b1_3_part4_c1', part: 'part4', title: '2. บทเรียนที่ 1 ความหมาย เป้าหมาย และลักษณะของชั้นเรียนที่ดี', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER1 },
              { id: 'b1_3_part4_c2', part: 'part4', title: '3. บทเรียนที่ 2 รูปแบบการจัดชั้นเรียน: แบบธรรมดาและแบบนวัตกรรม', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER2 },
              { id: 'b1_3_part4_c3', part: 'part4', title: '4. บทเรียนที่ 3 บรรยากาศทางกายภาพ: ห้องเรียนที่เอื้อต่อการเรียนรู้', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER3 },
              { id: 'b1_3_part4_c4', part: 'part4', title: '5. บทเรียนที่ 4 บรรยากาศทางจิตวิทยาและบรรยากาศส่งเสริมการเรียนรู้ 6 แบบ', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER4 },
              { id: 'b1_3_part4_c5', part: 'part4', title: '6. บทเรียนที่ 5 บุคลิกภาพของครูและเทคนิคการปกครองชั้นเรียน', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER5 },
              { id: 'b1_3_part4_c6', part: 'part4', title: '7. บทเรียนที่ 6 การพัฒนาผู้เรียนตามศักยภาพ', content: B1_3_CLASSROOM_MANAGEMENT_CHAPTER6 },
              { id: 'b1_3_part4_summary', part: 'part4', title: '8. บทสรุป', content: B1_3_CLASSROOM_MANAGEMENT_SUMMARY },
              { id: 'b1_3_part5_intro', part: 'part5', title: '1. บทนำ', content: B1_3_DIGITAL_LEARNING },
              { id: 'b1_3_part5_c1', part: 'part5', title: '2. บทเรียนที่ 1 สื่อการสอนและประเภทของสื่อการเรียนรู้', content: B1_3_DIGITAL_LEARNING_CHAPTER1 },
              { id: 'b1_3_part5_c2', part: 'part5', title: '3. บทเรียนที่ 2 กรวยประสบการณ์ของ Edgar Dale หลักการเลือกสื่อ และคุณค่าของสื่อ', content: B1_3_DIGITAL_LEARNING_CHAPTER2 },
              { id: 'b1_3_part5_c3', part: 'part5', title: '4. บทเรียนที่ 3 CAI และนวัตกรรมการศึกษา', content: B1_3_DIGITAL_LEARNING_CHAPTER3 },
              { id: 'b1_3_part5_c4', part: 'part5', title: '5. บทเรียนที่ 4 ระบบการเรียนรู้ดิจิทัล: E-Learning Virtual Classroom DLTV MOOCs และ Smart Classroom', content: B1_3_DIGITAL_LEARNING_CHAPTER4 },
              { id: 'b1_3_part5_c5', part: 'part5', title: '6. บทเรียนที่ 5 สารสนเทศ เครือข่าย Smart City และแพลตฟอร์มการศึกษา', content: B1_3_DIGITAL_LEARNING_CHAPTER5 },
              { id: 'b1_3_part5_c6', part: 'part5', title: '7. บทเรียนที่ 6 เครื่องมือดิจิทัลและโปรแกรมที่ใช้ในการจัดการเรียนรู้', content: B1_3_DIGITAL_LEARNING_CHAPTER6 },
              { id: 'b1_3_part5_c7', part: 'part5', title: '8. บทเรียนที่ 7 การรู้ดิจิทัล เทคโนโลยีอนาคต และความปลอดภัยข้อมูล', content: B1_3_DIGITAL_LEARNING_CHAPTER7 },
              { id: 'b1_3_part5_summary', part: 'part5', title: '9. บทสรุป', content: B1_3_DIGITAL_LEARNING_SUMMARY }
            ]
          },
          {
            id: "B1-4",
            title: "1.4 Part 4 การวัดประเมินผลการเรียนรู้และการวิจัยเพื่อแก้ปัญหาพัฒนาผู้เรียน",
            description: "การวัดผล ประเมินผล และวิจัยเพื่อพัฒนาผู้เรียน",
            promptContext: "ภาค ข วิชาการศึกษา Part 4",
            contentPath: "/content/part-b/B1.md",
            videoUrl: SHARED_VIDEO_URL,
            topicParts: [
              { id: 'part1', title: '1. การวิจัยเพื่อแก้ปัญหาพัฒนาผู้เรียน' },
              { id: 'part2', title: '2. การวัดประเมินผลการเรียนรู้' }
            ],
            chapters: [
              { id: 'b1_4_part1_intro', part: 'part1', title: '1. บทนำ', content: B1_4_RESEARCH_INTRODUCTION },
              { id: 'b1_4_part1_c1', part: 'part1', title: '2. บทเรียนที่ 1 ความหมาย ความสำคัญ และวัตถุประสงค์ของการวิจัย', content: B1_4_RESEARCH_CHAPTER1 },
              { id: 'b1_4_part1_c2', part: 'part1', title: '3. บทเรียนที่ 2 ประเภทของการวิจัย', content: B1_4_RESEARCH_CHAPTER2 },
              { id: 'b1_4_part1_c3', part: 'part1', title: '4. บทเรียนที่ 3 กระบวนการวิจัย วิธีแก้ปัญหาทางวิทยาศาสตร์ และเค้าโครงวิจัย', content: B1_4_RESEARCH_CHAPTER3 },
              { id: 'b1_4_part1_c4', part: 'part1', title: '5. บทเรียนที่ 4 เครื่องมือวิจัยและการตรวจสอบคุณภาพเครื่องมือ', content: B1_4_RESEARCH_CHAPTER4 },
              { id: 'b1_4_part1_c5', part: 'part1', title: '6. บทเรียนที่ 5 การทดสอบสมมติฐาน t-test ประชากร และกลุ่มตัวอย่าง', content: B1_4_RESEARCH_CHAPTER5 },
              { id: 'b1_4_part1_c6', part: 'part1', title: '7. บทเรียนที่ 6 ตัวแปรในงานวิจัย', content: B1_4_RESEARCH_CHAPTER6 },
              { id: 'b1_4_part1_c7', part: 'part1', title: '8. บทเรียนที่ 7 ข้อมูล การวิจัยในชั้นเรียน PAOR และการนำผลไปใช้', content: B1_4_RESEARCH_CHAPTER7 },
              { id: 'b1_4_part1_summary', part: 'part1', title: '9. บทสรุป', content: B1_4_RESEARCH_SUMMARY },
              { id: 'b1_4_part2_intro', part: 'part2', title: '1. บทนำ', content: B1_4_ASSESSMENT_INTRODUCTION },
              { id: 'b1_4_part2_c1', part: 'part2', title: '2. บทเรียนที่ 1 ความสำคัญ หลักพื้นฐาน และระดับของการวัดประเมินผล', content: B1_4_ASSESSMENT_CHAPTER1 },
              { id: 'b1_4_part2_c2', part: 'part2', title: '3. บทเรียนที่ 2 การวัด การวัดผล หลักการวัดผล และมาตราวัด 4 ระดับ', content: B1_4_ASSESSMENT_CHAPTER2 },
              { id: 'b1_4_part2_c3', part: 'part2', title: '4. บทเรียนที่ 3 เครื่องมือวัดตาม Bloom และการเลือกเครื่องมือให้ตรงพฤติกรรม', content: B1_4_ASSESSMENT_CHAPTER3 },
              { id: 'b1_4_part2_c4', part: 'part2', title: '5. บทเรียนที่ 4 การประเมินผล ความหมาย ประเภท และจุดมุ่งหมาย', content: B1_4_ASSESSMENT_CHAPTER4 },
              { id: 'b1_4_part2_c5', part: 'part2', title: '6. บทเรียนที่ 5 ประโยชน์และเครื่องมือวัดประเมินผลทางการศึกษา', content: B1_4_ASSESSMENT_CHAPTER5 },
              { id: 'b1_4_part2_c6', part: 'part2', title: '7. บทเรียนที่ 6 การประเมินตามสภาพจริง ภาคปฏิบัติ แฟ้มสะสมผลงาน และแบบทดสอบ', content: B1_4_ASSESSMENT_CHAPTER6 },
              { id: 'b1_4_part2_c7', part: 'part2', title: '8. บทเรียนที่ 7 สถิติเบื้องต้นในการวัดผลเพื่อประเมินผล', content: B1_4_ASSESSMENT_CHAPTER7 },
              { id: 'b1_4_part2_summary', part: 'part2', title: '9. บทสรุป', content: B1_4_ASSESSMENT_SUMMARY }
            ]
          },
          {
            id: "B1-5",
            title: "1.5 Part 5 การออกแบบและการดำเนินการเกี่ยวกับงานประกันคุณภาพการศึกษา",
            description: "การออกแบบและการดำเนินงานประกันคุณภาพการศึกษา",
            promptContext: "ภาค ข วิชาการศึกษา Part 5",
            contentPath: "/content/part-b/B1.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b1_5_intro', title: '1. บทนำ', content: B1_5_INTRODUCTION },
              { id: 'b1_5_c1', title: '2. บทเรียนที่ 1 มาตรฐานการศึกษาและฐานคิดของการประกันคุณภาพ', content: B1_5_CHAPTER1 },
              { id: 'b1_5_c2', title: '3. บทเรียนที่ 2 ระบบประกันคุณภาพภายในและวงจร PDCA', content: B1_5_CHAPTER2 },
              { id: 'b1_5_c3', title: '4. บทเรียนที่ 3 มาตรฐานการศึกษาเพื่อการประกันคุณภาพภายใน', content: B1_5_CHAPTER3 },
              { id: 'b1_5_c4', title: '5. บทเรียนที่ 4 ขั้นตอนบริหารงานประกันคุณภาพภายในสถานศึกษา', content: B1_5_CHAPTER4 },
              { id: 'b1_5_c5', title: '6. บทเรียนที่ 5 SAR และการใช้ข้อมูลเพื่อพัฒนาคุณภาพ', content: B1_5_CHAPTER5 },
              { id: 'b1_5_c6', title: '7. บทเรียนที่ 6 การประกันคุณภาพภายนอกและกรอบรอบใหม่ พ.ศ. 2567-2571', content: B1_5_CHAPTER6 },
              { id: 'b1_5_c7', title: '8. บทเรียนที่ 7 เปรียบเทียบภายใน-ภายนอก และตัวชี้วัดภายนอกระดับขั้นพื้นฐาน', content: B1_5_CHAPTER7 },
              { id: 'b1_5_summary', title: '9. บทสรุป', content: B1_5_SUMMARY }
            ]
          }
        ]
      },
      {
        id: "B2",
        title: "2. วิชาเอก (100 คะแนน)",
        isSelfStudy: true,
        subTopics: [
          {
            id: "B2-1",
            title: "วิชาเอก (ศึกษาด้วยตนเอง)",
            description: "วิชาเอกมีความหลากหลาย ผู้สมัครต้องศึกษาตามสาขาวิชาของตนเอง",
            promptContext: "แนวทางการเตรียมสอบวิชาเอก",
            contentPath: "/content/part-b/B2.md",
            chapters: [
                { id: 'intro', title: 'คำแนะนำการเตรียมตัว', content: '# การเตรียมสอบวิชาเอก\n\nวิชาเอกมีความหลากหลาย ผู้สมัครต้องศึกษาตามสาขาวิชาของตนเอง', videoUrl: SHARED_VIDEO_URL }
            ]
          }
        ]
      },
      {
        id: "B3",
        title: "3. กฎหมายการศึกษา (25 คะแนน)",
        subTopics: [
          {
            id: "B3-1",
            title: "3.1 Part 1 รัฐธรรมนูญ 2560",
            description: "รัฐธรรมนูญ 2560",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 1",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_1_intro', title: '1. บทนำ', content: B3_1_INTRODUCTION },
              { id: 'b3_1_c1', title: '2. บทเรียนที่ 1 ภาพรวมรัฐธรรมนูญ 2560 และฉบับแก้ไขเพิ่มเติม', content: B3_1_CHAPTER1 },
              { id: 'b3_1_c2', title: '3. บทเรียนที่ 2 หมวด 1 บททั่วไป และหมวด 2 พระมหากษัตริย์', content: B3_1_CHAPTER2 },
              { id: 'b3_1_c3', title: '4. บทเรียนที่ 3 หมวด 3 สิทธิและเสรีภาพ และหมวด 4 หน้าที่ของปวงชนชาวไทย', content: B3_1_CHAPTER3 },
              { id: 'b3_1_c4', title: '5. บทเรียนที่ 4 หมวด 5 หน้าที่ของรัฐด้านการศึกษา', content: B3_1_CHAPTER4 },
              { id: 'b3_1_c5', title: '6. บทเรียนที่ 5 หมวด 6 แนวนโยบายแห่งรัฐ', content: B3_1_CHAPTER5 },
              { id: 'b3_1_c6', title: '7. บทเรียนที่ 6 หมวด 7 รัฐสภา และตัวเลขที่แก้ไขแล้ว', content: B3_1_CHAPTER6 },
              { id: 'b3_1_c7', title: '8. บทเรียนที่ 7 คณะรัฐมนตรี ศาล องค์กรอิสระ และการปกครองส่วนท้องถิ่น', content: B3_1_CHAPTER7 },
              { id: 'b3_1_c8', title: '9. บทเรียนที่ 8 การแก้ไขรัฐธรรมนูญ การปฏิรูปประเทศ และบทเฉพาะกาล', content: B3_1_CHAPTER8 },
              { id: 'b3_1_summary', title: '10. บทสรุป', content: B3_1_SUMMARY }
            ]
          },
          {
            id: "B3-2",
            title: "3.2 Part 2 พ.ร.บ.การศึกษาแห่งชาติ",
            description: "พ.ร.บ.การศึกษาแห่งชาติ",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 2",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_2_intro', title: '1. บทนำ', content: B3_2_INTRODUCTION },
              { id: 'b3_2_c1', title: '2. บทเรียนที่ 1 คำนิยามสำคัญ', content: B3_2_CHAPTER1 },
              { id: 'b3_2_c2', title: '3. บทเรียนที่ 2 หมวด 1 ความมุ่งหมายและหลักการจัดการศึกษา', content: B3_2_CHAPTER2 },
              { id: 'b3_2_c3', title: '4. บทเรียนที่ 3 หมวด 2 สิทธิและหน้าที่ทางการศึกษา', content: B3_2_CHAPTER3 },
              { id: 'b3_2_c4', title: '5. บทเรียนที่ 4 หมวด 3 ระบบการศึกษา', content: B3_2_CHAPTER4 },
              { id: 'b3_2_c5', title: '6. บทเรียนที่ 5 หมวด 4 แนวการจัดการศึกษา', content: B3_2_CHAPTER5 },
              { id: 'b3_2_c6', title: '7. บทเรียนที่ 6 หมวด 5 การบริหารและการจัดการศึกษา', content: B3_2_CHAPTER6 },
              { id: 'b3_2_c7', title: '8. บทเรียนที่ 7 หมวด 6 มาตรฐานและการประกันคุณภาพการศึกษา', content: B3_2_CHAPTER7 },
              { id: 'b3_2_c8', title: '9. บทเรียนที่ 8 หมวด 7 ครู คณาจารย์ และบุคลากรทางการศึกษา', content: B3_2_CHAPTER8 },
              { id: 'b3_2_c9', title: '10. บทเรียนที่ 9 หมวด 8 ทรัพยากร และหมวด 9 เทคโนโลยีเพื่อการศึกษา', content: B3_2_CHAPTER9 },
              { id: 'b3_2_summary', title: '11. บทสรุป', content: B3_2_SUMMARY }
            ]
          },
          {
            id: "B3-3",
            title: "3.3 Part 3 พ.ร.บ.การศึกษาภาคบังคับ",
            description: "พ.ร.บ.การศึกษาภาคบังคับ",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 3",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_3_intro', title: '1. บทนำ', content: B3_3_INTRODUCTION },
              { id: 'b3_3_c1', title: '2. บทเรียนที่ 1 คำนิยามและฐานคิดของการศึกษาภาคบังคับ', content: B3_3_CHAPTER1 },
              { id: 'b3_3_c2', title: '3. บทเรียนที่ 2 หน้าที่ผู้ปกครองและการส่งเด็กเข้าเรียน', content: B3_3_CHAPTER2 },
              { id: 'b3_3_c3', title: '4. บทเรียนที่ 3 ขั้นตอนเตือน หยุดเรียน และย้ายสถานศึกษา', content: B3_3_CHAPTER3 },
              { id: 'b3_3_c4', title: '5. บทเรียนที่ 4 พนักงานเจ้าหน้าที่ และคนที่มีเด็กอาศัยอยู่ด้วย', content: B3_3_CHAPTER4 },
              { id: 'b3_3_c5', title: '6. บทเรียนที่ 5 เด็กกลุ่มพิเศษและความเสมอภาคทางการศึกษา', content: B3_3_CHAPTER5 },
              { id: 'b3_3_c6', title: '7. บทเรียนที่ 6 บทกำหนดโทษและบทเฉพาะกาล', content: B3_3_CHAPTER6 },
              { id: 'b3_3_summary', title: '8. บทสรุป', content: B3_3_SUMMARY }
            ]
          },
          {
            id: "B3-4",
            title: "3.4 Part 4 พ.ร.บ.ระเบียบบริหาร ศธ.",
            description: "พ.ร.บ.ระเบียบบริหาร ศธ.",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 4",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_4_intro', title: '1. บทนำ', content: B3_4_INTRODUCTION },
              { id: 'b3_4_c1', title: '2. บทเรียนที่ 1 ภาพรวมและฉบับแก้ไขที่ต้องอัปเดต', content: B3_4_CHAPTER1 },
              { id: 'b3_4_c2', title: '3. บทเรียนที่ 2 หมวด 1 ส่วนกลาง: 6 ส่วนราชการ 5 กรม 3 องค์กรหลัก', content: B3_4_CHAPTER2 },
              { id: 'b3_4_c3', title: '4. บทเรียนที่ 3 รัฐมนตรี ปลัดกระทรวง ผู้ตรวจราชการ และงานสนับสนุนส่วนกลาง', content: B3_4_CHAPTER3 },
              { id: 'b3_4_c4', title: '5. บทเรียนที่ 4 หมวด 2 เขตพื้นที่การศึกษา', content: B3_4_CHAPTER4 },
              { id: 'b3_4_c5', title: '6. บทเรียนที่ 5 สถานศึกษาขั้นพื้นฐาน คณะกรรมการสถานศึกษา และอำนาจผู้อำนวยการ', content: B3_4_CHAPTER5 },
              { id: 'b3_4_c6', title: '7. บทเรียนที่ 6 การศึกษาพิเศษ บุคคลความสามารถพิเศษ และหมวดสถานศึกษาระดับปริญญา', content: B3_4_CHAPTER6 },
              { id: 'b3_4_c7', title: '8. บทเรียนที่ 7 หมวด 4 การปฏิบัติราชการแทน', content: B3_4_CHAPTER7 },
              { id: 'b3_4_c8', title: '9. บทเรียนที่ 8 หมวด 5 การรักษาราชการแทน', content: B3_4_CHAPTER8 },
              { id: 'b3_4_c9', title: '10. บทเรียนที่ 9 บทเฉพาะกาลและจุดอัปเดตเชิงโครงสร้าง', content: B3_4_CHAPTER9 },
              { id: 'b3_4_summary', title: '11. บทสรุป', content: B3_4_SUMMARY }
            ]
          },
          {
            id: "B3-5",
            title: "3.5 Part 5 พ.ร.บ.สภาครูและบุคลากรทางการศึกษา",
            description: "พ.ร.บ.สภาครูและบุคลากรทางการศึกษา",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 5",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_5_intro', title: '1. บทนำ', content: B3_5_INTRODUCTION },
              { id: 'b3_5_c1', title: '2. บทเรียนที่ 1 ภาพรวม บทนิยาม และผู้ประกอบวิชาชีพทางการศึกษา', content: B3_5_CHAPTER1 },
              { id: 'b3_5_c2', title: '3. บทเรียนที่ 2 คุรุสภา: วัตถุประสงค์ อำนาจหน้าที่ และข้อบังคับ', content: B3_5_CHAPTER2 },
              { id: 'b3_5_c3', title: '4. บทเรียนที่ 3 คณะกรรมการคุรุสภา และสำนักงานเลขาธิการคุรุสภา', content: B3_5_CHAPTER3 },
              { id: 'b3_5_c4', title: '5. บทเรียนที่ 4 คณะกรรมการมาตรฐานวิชาชีพ', content: B3_5_CHAPTER4 },
              { id: 'b3_5_c5', title: '6. บทเรียนที่ 5 การประกอบวิชาชีพควบคุมและระบบใบอนุญาต', content: B3_5_CHAPTER5 },
              { id: 'b3_5_c6', title: '7. บทเรียนที่ 6 มาตรฐานวิชาชีพและจรรยาบรรณ', content: B3_5_CHAPTER6 },
              { id: 'b3_5_c7', title: '8. บทเรียนที่ 7 การประพฤติผิดจรรยาบรรณและโทษทางวิชาชีพ', content: B3_5_CHAPTER7 },
              { id: 'b3_5_c8', title: '9. บทเรียนที่ 8 สมาชิกคุรุสภา และ สกสค.', content: B3_5_CHAPTER8 },
              { id: 'b3_5_c9', title: '10. บทเรียนที่ 9 การกำกับดูแล บทกำหนดโทษ และบทเฉพาะกาล', content: B3_5_CHAPTER9 },
              { id: 'b3_5_summary', title: '11. บทสรุป', content: B3_5_SUMMARY }
            ]
          },
          {
            id: "B3-6",
            title: "3.6 Part 6 พ.ร.บ. ระเบียบข้าราชการครู",
            description: "พ.ร.บ. ระเบียบข้าราชการครู",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 6",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_6_intro', title: '1. บทนำ', content: B3_6_INTRODUCTION },
              { id: 'b3_6_c1', title: '2. บทเรียนที่ 1 ภาพรวม ฉบับแก้ไข และบทนิยาม', content: B3_6_CHAPTER1 },
              { id: 'b3_6_c2', title: '3. บทเรียนที่ 2 หมวด 1 ก.ค.ศ. อ.ก.ค.ศ. และอำนาจในพื้นที่', content: B3_6_CHAPTER2 },
              { id: 'b3_6_c3', title: '4. บทเรียนที่ 3 หมวด 2 คุณสมบัติทั่วไปและลักษณะต้องห้าม', content: B3_6_CHAPTER3 },
              { id: 'b3_6_c4', title: '5. บทเรียนที่ 4 หมวด 3 ตำแหน่ง วิทยฐานะ เงินวิทยฐานะ และมาตรฐานตำแหน่ง', content: B3_6_CHAPTER4 },
              { id: 'b3_6_c5', title: '6. บทเรียนที่ 5 หมวด 4 การบรรจุ แต่งตั้ง ครูผู้ช่วย และการย้าย', content: B3_6_CHAPTER5 },
              { id: 'b3_6_c6', title: '7. บทเรียนที่ 6 หมวด 5 การเสริมสร้างประสิทธิภาพและการเลื่อนเงินเดือน', content: B3_6_CHAPTER6 },
              { id: 'b3_6_c7', title: '8. บทเรียนที่ 7 หมวด 6 วินัยและการรักษาวินัย', content: B3_6_CHAPTER7 },
              { id: 'b3_6_c8', title: '9. บทเรียนที่ 8 หมวด 7 การดำเนินการทางวินัย', content: B3_6_CHAPTER8 },
              { id: 'b3_6_c9', title: '10. บทเรียนที่ 9 หมวด 8 การออกจากราชการ', content: B3_6_CHAPTER9 },
              { id: 'b3_6_c10', title: '11. บทเรียนที่ 10 หมวด 9 การอุทธรณ์และการร้องทุกข์', content: B3_6_CHAPTER10 },
              { id: 'b3_6_summary', title: '12. บทสรุป', content: B3_6_SUMMARY }
            ]
          },
          {
            id: "B3-7",
            title: "3.7 Part 7 พ.ร.บ.คุ้มครองเด็ก",
            description: "พ.ร.บ.คุ้มครองเด็ก",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 7",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_7_intro', title: '1. บทนำ', content: B3_7_INTRODUCTION },
              { id: 'b3_7_c1', title: '2. บทเรียนที่ 1 ภาพรวม บทนิยาม และผู้รักษาการ', content: B3_7_CHAPTER1 },
              { id: 'b3_7_c2', title: '3. บทเรียนที่ 2 หมวด 1 คณะกรรมการคุ้มครองเด็ก', content: B3_7_CHAPTER2 },
              { id: 'b3_7_c3', title: '4. บทเรียนที่ 3 หมวด 2 การปฏิบัติต่อเด็ก', content: B3_7_CHAPTER3 },
              { id: 'b3_7_c4', title: '5. บทเรียนที่ 4 หมวด 3 การสงเคราะห์เด็ก', content: B3_7_CHAPTER4 },
              { id: 'b3_7_c5', title: '6. บทเรียนที่ 5 หมวด 4 การคุ้มครองสวัสดิภาพเด็ก', content: B3_7_CHAPTER5 },
              { id: 'b3_7_c6', title: '7. บทเรียนที่ 6 หมวด 5 ผู้คุ้มครองสวัสดิภาพเด็ก', content: B3_7_CHAPTER6 },
              { id: 'b3_7_c7', title: '8. บทเรียนที่ 7 หมวด 6 สถานรับเลี้ยงเด็ก สถานแรกรับ สถานสงเคราะห์ สถานคุ้มครองสวัสดิภาพ และสถานพัฒนาและฟื้นฟู', content: B3_7_CHAPTER7 },
              { id: 'b3_7_c8', title: '9. บทเรียนที่ 8 หมวด 7 การส่งเสริมความประพฤตินักเรียนและนักศึกษา', content: B3_7_CHAPTER8 },
              { id: 'b3_7_c9', title: '10. บทเรียนที่ 9 หมวด 8 กองทุนคุ้มครองเด็ก', content: B3_7_CHAPTER9 },
              { id: 'b3_7_c10', title: '11. บทเรียนที่ 10 หมวด 9 บทกำหนดโทษและบทเฉพาะกาล', content: B3_7_CHAPTER10 },
              { id: 'b3_7_summary', title: '12. บทสรุป', content: B3_7_SUMMARY }
            ]
          },
          {
            id: "B3-8",
            title: "3.8 Part 8 พ.ร.บ.การพัฒนาเด็กปฐมวัย",
            description: "พ.ร.บ.การพัฒนาเด็กปฐมวัย",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 8",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_8_intro', title: '1. บทนำ', content: B3_8_INTRODUCTION },
              { id: 'b3_8_c1', title: '2. บทเรียนที่ 1 ภาพรวม บทนิยาม และผู้รักษาการ', content: B3_8_CHAPTER1 },
              { id: 'b3_8_c2', title: '3. บทเรียนที่ 2 หมวด 1 วัตถุประสงค์และหลักทั่วไป', content: B3_8_CHAPTER2 },
              { id: 'b3_8_c3', title: '4. บทเรียนที่ 3 หมวด 2 องค์ประกอบ คุณสมบัติ วาระ และการพ้นจากตำแหน่ง', content: B3_8_CHAPTER3 },
              { id: 'b3_8_c4', title: '5. บทเรียนที่ 4 หมวด 2 หน้าที่อำนาจ อนุกรรมการ และสำนักงานเลขานุการ', content: B3_8_CHAPTER4 },
              { id: 'b3_8_c5', title: '6. บทเรียนที่ 5 หมวด 3 แผนพัฒนาเด็กปฐมวัย', content: B3_8_CHAPTER5 },
              { id: 'b3_8_c6', title: '7. บทเรียนที่ 6 หมวด 4 การพัฒนาเด็กปฐมวัย', content: B3_8_CHAPTER6 },
              { id: 'b3_8_c7', title: '8. บทเรียนที่ 7 บทเฉพาะกาลและเหตุผล', content: B3_8_CHAPTER7 },
              { id: 'b3_8_summary', title: '9. บทสรุป', content: B3_8_SUMMARY }
            ]
          },
          {
            id: "B3-9",
            title: "3.9 Part 9 พ.ร.บ.การศึกษาคนพิการ",
            description: "พ.ร.บ.การศึกษาคนพิการ",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 9",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_9_intro', title: '1. บทนำ', content: B3_9_INTRODUCTION },
              { id: 'b3_9_c1', title: '2. บทเรียนที่ 1 ภาพรวม บทนิยาม และฉบับแก้ไขเพิ่มเติม', content: B3_9_CHAPTER1 },
              { id: 'b3_9_c2', title: '3. บทเรียนที่ 2 ประเภทคนพิการและหลักคิดทางการศึกษา', content: B3_9_CHAPTER2 },
              { id: 'b3_9_c3', title: '4. บทเรียนที่ 3 หมวด 1 สิทธิและหน้าที่ทางการศึกษา', content: B3_9_CHAPTER3 },
              { id: 'b3_9_c4', title: '5. บทเรียนที่ 4 IEP, IIP, การเรียนร่วม และเงินเพิ่มพิเศษครูผู้สอนคนพิการ', content: B3_9_CHAPTER4 },
              { id: 'b3_9_c5', title: '6. บทเรียนที่ 5 หมวด 2 คณะกรรมการส่งเสริมการจัดการศึกษาสำหรับคนพิการ', content: B3_9_CHAPTER5 },
              { id: 'b3_9_c6', title: '7. บทเรียนที่ 6 สำนักบริหารงานการศึกษาพิเศษ เขตพื้นที่ และสถานศึกษาเฉพาะความพิการ', content: B3_9_CHAPTER6 },
              { id: 'b3_9_c7', title: '8. บทเรียนที่ 7 หมวด 3 กองทุนส่งเสริมและพัฒนาการศึกษาสำหรับคนพิการ', content: B3_9_CHAPTER7 },
              { id: 'b3_9_c8', title: '9. บทเรียนที่ 8 บทเฉพาะกาลและจุดเชื่อมกับกฎหมายอื่น', content: B3_9_CHAPTER8 },
              { id: 'b3_9_summary', title: '10. บทสรุป', content: B3_9_SUMMARY }
            ]
          },
          {
            id: "B3-10",
            title: "3.10 Part 10 แนวทางปฏิรูปการศึกษา",
            description: "แนวทางปฏิรูปการศึกษา",
            promptContext: "ภาค ข กฎหมายการศึกษา Part 10",
            contentPath: "/content/part-b/B3.md",
            videoUrl: SHARED_VIDEO_URL,
            chapters: [
              { id: 'b3_10_intro', title: '1. บทนำ', content: B3_10_INTRODUCTION },
              { id: 'b3_10_c1', title: '2. บทเรียนที่ 1 ยุทธศาสตร์ชาติ 20 ปี', content: B3_10_CHAPTER1 },
              { id: 'b3_10_c2', title: '3. บทเรียนที่ 2 ยุทธศาสตร์ด้านทรัพยากรมนุษย์', content: B3_10_CHAPTER2 },
              { id: 'b3_10_c3', title: '4. บทเรียนที่ 3 แผนการศึกษาแห่งชาติ พ.ศ. 2560-2579', content: B3_10_CHAPTER3 },
              { id: 'b3_10_c4', title: '5. บทเรียนที่ 4 6 ยุทธศาสตร์ของแผนการศึกษาแห่งชาติ', content: B3_10_CHAPTER4 },
              { id: 'b3_10_c5', title: '6. บทเรียนที่ 5 การศึกษาไทย 1.0-4.0 และทักษะโลกใหม่', content: B3_10_CHAPTER5 },
              { id: 'b3_10_c6', title: '7. บทเรียนที่ 6 นโยบาย ศธ. 2568-2569', content: B3_10_CHAPTER6 },
              { id: 'b3_10_c7', title: '8. บทเรียนที่ 7 เครื่องมือ โครงการ และระบบสนับสนุน', content: B3_10_CHAPTER7 },
              { id: 'b3_10_c8', title: '9. บทเรียนที่ 8 นโยบายและจุดเน้น สพฐ. 2568-2569', content: B3_10_CHAPTER8 },
              { id: 'b3_10_c9', title: '10. บทเรียนที่ 9 ยกเลิกและลดภาระงาน', content: B3_10_CHAPTER9 },
              { id: 'b3_10_summary', title: '11. บทสรุป', content: B3_10_SUMMARY }
            ]
          }
        ]
      }
    ]
  },
  {
    id: PartId.PART_C,
    title: "ภาค ค",
    subtitle: "ความเหมาะสมกับตำแหน่ง (100 คะแนน)",
    color: "green",
    sections: [
      {
        id: "C1",
        title: "1. สัมภาษณ์และสาธิตการสอน",
        subTopics: [
          {
            id: "C1-1",
            title: "เทคนิคการสอบสัมภาษณ์",
            description: "การเตรียมตัว, Portfolio, สาธิตการสอน, แนวคำถามสัมภาษณ์",
            promptContext: "การสอบสัมภาษณ์ครูผู้ช่วย Portfolio",
            contentPath: "/content/part-c/C1.md",
            chapters: C_INTERVIEW_CHAPTERS
          }
        ]
      }
    ]
  }
];
