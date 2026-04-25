export const CHAPTER_0_SERIES_2 = `
# อนุกรมตอนที่ 2: เจาะลึกโจทย์ซับซ้อนขั้นสุดยอด

เนื้อหาในส่วนนี้จะเน้นไปที่โจทย์อนุกรมระดับยากและซับซ้อน ซึ่งเป็นโจทย์ที่ผู้ออกข้อสอบตั้งใจใช้เพื่อ "ดึงเวลา" ของผู้สอบให้เสียเวลามากที่สุด โดยเป็นส่วนต่อยอดที่ต้องใช้เทคนิคลูกเล่นที่ลึกซึ้งขึ้น

---

## 1. การตีแฉกขั้นสูง (Advanced Branching)

เมื่อการตีแฉกชั้นเดียวไม่ได้ผล ให้ลองมองหาสามลูกเล่นนี้:

### 1.1 อนุกรมแบบวนลูป (Looping Series / แบบกั้นห้อง)
เป็นการหาความสัมพันธ์ที่เกิดขึ้นเป็นรอบๆ (Room) หากตีแฉกแล้วเจอตัวเลขเพิ่มและลดสลับกันแปลกๆ อย่าเพิ่งถอดใจ ให้ลองกั้นห้องดู

### ตัวอย่างที่ 1: อนุกรมวนลูป (ระดับง่าย)
**โจทย์:** 18, 16, 20, 120, 118, 122, ?

**วิธีทำ:**
1. สังเกตว่าเลขชุดแรก $18, 16, 20$ และชุดหลัง $120, 118, 122$ มีความสัมพันธ์ที่คล้ายกัน
2. ลองกั้นห้องทุกๆ 3 ตัว:

<div class="flex justify-center my-6">
<svg width="420" height="130" viewBox="0 0 420 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="190" height="100" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 4"/>
<text x="105" y="100" fill="#64748B" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">Room 1</text>
<rect x="220" y="10" width="190" height="100" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 4"/>
<text x="315" y="100" fill="#64748B" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">Room 2</text>
<text x="45" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">18</text>
<text x="105" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">16</text>
<text x="165" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">20</text>
<text x="210" y="50" fill="#94A3B8" font-size="18" font-family="Sarabun, sans-serif" text-anchor="middle">|</text>
<text x="250" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">120</text>
<text x="310" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">118</text>
<text x="370" y="50" fill="#1E293B" font-size="18" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">122</text>
<text x="405" y="50" fill="#EF4444" font-size="20" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">?</text>
<path d="M45 60 Q 75 90 105 60" stroke="#3B82F6" stroke-width="2" fill="none"/>
<text x="75" y="88" fill="#3B82F6" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">-2</text>
<path d="M105 60 Q 135 90 165 60" stroke="#10B981" stroke-width="2" fill="none"/>
<text x="135" y="88" fill="#10B981" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">+4</text>
<path d="M165 60 Q 207 95 250 60" stroke="#F59E0B" stroke-width="2" fill="none"/>
<text x="210" y="92" fill="#F59E0B" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">x6</text>
<path d="M250 60 Q 280 90 310 60" stroke="#3B82F6" stroke-width="2" fill="none"/>
<text x="280" y="88" fill="#3B82F6" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">-2</text>
<path d="M310 60 Q 340 90 370 60" stroke="#10B981" stroke-width="2" fill="none"/>
<text x="340" y="88" fill="#10B981" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">+4</text>
<path d="M370 60 Q 392 90 415 60" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="4 2" fill="none"/>
<text x="395" y="90" fill="#EF4444" font-size="12" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">x6</text>
</svg>
</div>

3. แพทเทิร์นในแต่ละห้องคือ: ลบ 2, บวก 4 และตัวเชื่อมระหว่างห้องคือ คูณ 6
4. ดังนั้นคำตอบคือ $122 \\times 6 = 732$
**ตอบ: 732**

---

### 1.2 อนุกรมแบบซ่อนรูปยกกำลัง (Power Series)
เป็นรูปแบบที่มักจะตีแฉกต่อไม่ได้ด้วยการบวก ลบ คูณ หารปกติ ต้องอาศัย "ความคุ้นเคย" กับชุดตัวเลขยกกำลัง

### ตัวอย่างที่ 2: ซ่อนรูปยกกำลัง (ระดับง่าย)
**โจทย์:** 5, 6, 10, 19, 35, 60, ?

**วิธีทำ:**
1. ลองตีแฉกหาค่าต่างชั้นที่ 1:

<div class="flex justify-center my-6">
<svg width="320" height="140" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="30" fill="#1E293B" font-size="14" font-weight="bold">5</text>
<text x="60" y="30" fill="#1E293B" font-size="14" font-weight="bold">6</text>
<text x="105" y="30" fill="#1E293B" font-size="14" font-weight="bold">10</text>
<text x="155" y="30" fill="#1E293B" font-size="14" font-weight="bold">19</text>
<text x="205" y="30" fill="#1E293B" font-size="14" font-weight="bold">35</text>
<text x="255" y="30" fill="#1E293B" font-size="14" font-weight="bold">60</text>
<text x="300" y="30" fill="#EF4444" font-size="16" font-weight="bold">?</text>
<path d="M22 40 L 40 70 M 58 40 L 40 70" stroke="#94A3B8" stroke-width="1"/>
<text x="40" y="85" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">+1</text>
<text x="40" y="105" fill="#64748B" font-size="9" text-anchor="middle">(1²)</text>
<path d="M62 40 L 85 70 M 103 40 L 85 70" stroke="#94A3B8" stroke-width="1"/>
<text x="85" y="85" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">+4</text>
<text x="85" y="105" fill="#64748B" font-size="9" text-anchor="middle">(2²)</text>
<path d="M107 40 L 130 70 M 153 40 L 130 70" stroke="#94A3B8" stroke-width="1"/>
<text x="130" y="85" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">+9</text>
<text x="130" y="105" fill="#64748B" font-size="9" text-anchor="middle">(3²)</text>
<path d="M157 40 L 180 70 M 203 40 L 180 70" stroke="#94A3B8" stroke-width="1"/>
<text x="180" y="85" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">+16</text>
<text x="180" y="105" fill="#64748B" font-size="9" text-anchor="middle">(4²)</text>
<path d="M207 40 L 230 70 M 253 40 L 230 70" stroke="#94A3B8" stroke-width="1"/>
<text x="230" y="85" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">+25</text>
<text x="230" y="105" fill="#64748B" font-size="9" text-anchor="middle">(5²)</text>
<path d="M257 40 L 280 70 M 298 40 L 280 70" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2 2"/>
<text x="280" y="85" fill="#EF4444" font-size="12" font-weight="bold" text-anchor="middle">[+36]</text>
<text x="280" y="105" fill="#EF4444" font-size="9" text-anchor="middle">(6²)</text>
</svg>
</div>

2. สังเกตค่าต่าง: $1, 4, 9, 16, 25$ คือเลขชุด $1^2, 2^2, 3^2, 4^2, 5^2$
3. ค่าต่างตัวถัดไปต้องเป็น $6^2 = 36$
4. คำตอบคือ $60 + 36 = 96$
**ตอบ: 96**

---

### 1.3 อนุกรมแบบดำเนินการ 2 รอบ (Double Operation)
ใน 1 ช่วงความห่าง จะมีการกระทำถึง 2 อย่างซ้อนกัน เช่น คูณแล้วบวก หรือ คูณแล้วลบ

### ตัวอย่างที่ 3: ดำเนินการ 2 รอบ (ระดับกลาง)
**โจทย์:** 9, 19, 40, 83, ?

**วิธีทำ:**
1. ตีแฉกแล้วค่าเพิ่มขึ้นประมาณ 2 เท่า แต่ไม่เป๊ะ
2. ลองสมมติฐาน "คูณ 2" แล้วหาเศษที่ขาด:

<div class="flex justify-center my-6">
<svg width="300" height="150" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="30" fill="#1E293B" font-size="14" font-weight="bold">9</text>
<text x="80" y="30" fill="#1E293B" font-size="14" font-weight="bold">19</text>
<text x="140" y="30" fill="#1E293B" font-size="14" font-weight="bold">40</text>
<text x="200" y="30" fill="#1E293B" font-size="14" font-weight="bold">83</text>
<text x="260" y="30" fill="#EF4444" font-size="16" font-weight="bold">?</text>
<path d="M30 40 Q 55 70 80 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="55" y="80" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">x2 + 1</text>
<path d="M90 40 Q 115 70 140 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="115" y="80" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">x2 + 2</text>
<path d="M150 40 Q 175 70 200 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="175" y="80" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">x2 + 3</text>
<path d="M210 40 Q 235 70 260 40" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" fill="none"/>
<text x="240" y="80" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">x2 + 4</text>
</svg>
</div>

3. $9 \\times 2 = 18$ (+1 ได้ 19)
4. $19 \\times 2 = 38$ (+2 ได้ 40)
5. $40 \\times 2 = 80$ (+3 ได้ 83)
6. ตัวถัดไป: $83 \\times 2 = 166$ (+4 ได้ 170)
**ตอบ: 170**

---

### ตัวอย่างที่ 4: ผสมลูปและสองจังหวะ (ระดับกลาง)
**โจทย์:** 2, 6, 4, 12, 10, 30, ?

**วิธีทำ:**
1. สังเกตตัวเลข กระโดดขึ้นแล้วลง

<div class="flex justify-center my-6">
<svg width="350" height="100" viewBox="0 0 350 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="40" fill="#1E293B" font-size="14" font-weight="bold">2</text>
<text x="60" y="40" fill="#1E293B" font-size="14" font-weight="bold">6</text>
<text x="100" y="40" fill="#1E293B" font-size="14" font-weight="bold">4</text>
<text x="140" y="40" fill="#1E293B" font-size="14" font-weight="bold">12</text>
<text x="185" y="40" fill="#1E293B" font-size="14" font-weight="bold">10</text>
<text x="230" y="40" fill="#1E293B" font-size="14" font-weight="bold">30</text>
<text x="275" y="40" fill="#EF4444" font-size="16" font-weight="bold">?</text>
<path d="M25 50 Q 40 70 55 50" stroke="#F59E0B" stroke-width="1.5" fill="none"/>
<text x="40" y="80" fill="#F59E0B" font-size="10" text-anchor="middle">x3</text>
<path d="M65 50 Q 82.5 70 100 50" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="82.5" y="80" fill="#3B82F6" font-size="10" text-anchor="middle">-2</text>
<path d="M105 50 Q 122.5 70 140 50" stroke="#F59E0B" stroke-width="1.5" fill="none"/>
<text x="122.5" y="80" fill="#F59E0B" font-size="10" text-anchor="middle">x3</text>
<path d="M145 50 Q 165 70 185 50" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="165" y="80" fill="#3B82F6" font-size="10" text-anchor="middle">-2</text>
<path d="M190 50 Q 210 70 230 50" stroke="#F59E0B" stroke-width="1.5" fill="none"/>
<text x="210" y="80" fill="#F59E0B" font-size="10" text-anchor="middle">x3</text>
<path d="M235 50 Q 255 70 275 50" stroke="#EF4444" stroke-width="2" stroke-dasharray="3" fill="none"/>
<text x="255" y="80" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">-2</text>
</svg>
</div>

2. แพทเทิร์นคือ $x3$ แล้ว $-2$ สลับกันไปเรื่อยๆ
3. ตัวถัดไปคือ $30 - 2 = 28$
**ตอบ: 28**

---

## 2. อนุกรมเศษส่วน (Fraction Series)

โจทย์เศษส่วนมีระบบการคิดที่แยกต่างหากจากตัวเลขปกติ โดยมี 3 เลเวลความยาก:

### 2.1 แบบซ่อนบน-ล่าง (Parallel Tracks)
เป็นระดับง่ายที่สุด คือให้มองเศษ (บน) และส่วน (ล่าง) แยกเป็นโจทย์ 2 ข้อ

### ตัวอย่างที่ 5: เศษส่วนแยกชุด (ระดับกลาง)
**โจทย์:** $\\frac{1}{2}, \\frac{3}{4}, \\frac{5}{8}, \\frac{7}{16}, ?$

**วิธีทำ:**
1. ชุดเศษ (บน): 1, 3, 5, 7 (เพิ่มทีละ 2) → ตัวถัดไปคือ 9
2. ชุดส่วน (ล่าง): 2, 4, 8, 16 (คูณ 2) → ตัวถัดไปคือ 32

<div class="flex justify-center my-6">
<svg width="280" height="100" viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="50" x2="40" y2="50" stroke="#1E293B" stroke-width="1.5"/>
<text x="30" y="40" fill="#1E293B" font-size="14" text-anchor="middle">1</text>
<text x="30" y="65" fill="#1E293B" font-size="14" text-anchor="middle">2</text>
<line x1="70" y1="50" x2="90" y2="50" stroke="#1E293B" stroke-width="1.5"/>
<text x="80" y="40" fill="#1E293B" font-size="14" text-anchor="middle">3</text>
<text x="80" y="65" fill="#1E293B" font-size="14" text-anchor="middle">4</text>
<line x1="120" y1="50" x2="140" y2="50" stroke="#1E293B" stroke-width="1.5"/>
<text x="130" y="40" fill="#1E293B" font-size="14" text-anchor="middle">5</text>
<text x="130" y="65" fill="#1E293B" font-size="14" text-anchor="middle">8</text>
<line x1="170" y1="50" x2="190" y2="50" stroke="#1E293B" stroke-width="1.5"/>
<text x="180" y="40" fill="#1E293B" font-size="14" text-anchor="middle">7</text>
<text x="180" y="65" fill="#1E293B" font-size="14" text-anchor="middle">16</text>
<line x1="220" y1="50" x2="240" y2="50" stroke="#EF4444" stroke-width="1.5"/>
<text x="230" y="40" fill="#EF4444" font-size="16" font-weight="bold" text-anchor="middle">9</text>
<text x="230" y="65" fill="#EF4444" font-size="16" font-weight="bold" text-anchor="middle">32</text>
<path d="M30 25 Q 55 10 80 25" stroke="#3B82F6" stroke-width="1" fill="none"/>
<text x="55" y="15" fill="#3B82F6" font-size="10" text-anchor="middle">+2</text>
<path d="M80 25 Q 105 10 130 25" stroke="#3B82F6" stroke-width="1" fill="none"/>
<text x="105" y="15" fill="#3B82F6" font-size="10" text-anchor="middle">+2</text>
<path d="M130 25 Q 155 10 180 25" stroke="#3B82F6" stroke-width="1" fill="none"/>
<text x="155" y="15" fill="#3B82F6" font-size="10" text-anchor="middle">+2</text>
<path d="M180 25 Q 205 10 230 25" stroke="#EF4444" stroke-width="1.5" fill="none"/>
<text x="205" y="15" fill="#EF4444" font-size="10" text-anchor="middle">+2</text>
<path d="M30 75 Q 55 90 80 75" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="55" y="95" fill="#F59E0B" font-size="10" text-anchor="middle">x2</text>
<path d="M80 75 Q 105 90 130 75" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="105" y="95" fill="#F59E0B" font-size="10" text-anchor="middle">x2</text>
<path d="M130 75 Q 155 90 180 75" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="155" y="95" fill="#F59E0B" font-size="10" text-anchor="middle">x2</text>
<path d="M180 75 Q 205 90 230 75" stroke="#EF4444" stroke-width="1.5" fill="none"/>
<text x="205" y="95" fill="#EF4444" font-size="10" text-anchor="middle">x2</text>
</svg>
</div>

**ตอบ: 9/32**

---

### 2.2 แบบสะสมเศษส่วน (Cumulative Fraction)
ตัวเลขบนและล่างมีปฏิสัมพันธ์กัน เพื่อสร้างตัวถัดไป

### ตัวอย่างที่ 6: สะสมข้ามฝั่ง (ระดับกลาง)
**โจทย์:** $\\frac{4}{?}, \\frac{9}{13}, \\frac{22}{31}, \\frac{53}{75}, ?$

**วิธีทำ:**
1. สังเกตว่า $4 + 5 = 9$ (ตัวเลขถัดไป) และ $9 = 4 + 5$ (ส่วนของตัวเอง)
2. ลองเช็กความสัมพันธ์: บน + ส่วน = บนตัวถัดไป / บนตัวถัดไป + บนตัวมันเอง = ส่วนตัวถัดไป

<div class="flex justify-center my-6">
<svg width="350" height="120" viewBox="0 0 350 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="45" fill="#1E293B" font-size="18" font-weight="bold" text-anchor="middle">4</text>
<line x1="20" y1="55" x2="40" y2="55" stroke="#1E293B" stroke-width="1.5"/>
<text x="30" y="75" fill="#94A3B8" font-size="16" text-anchor="middle">5</text>
<text x="90" y="45" fill="#1E293B" font-size="18" font-weight="bold" text-anchor="middle">9</text>
<line x1="80" y1="55" x2="100" y2="55" stroke="#1E293B" stroke-width="1.5"/>
<text x="90" y="75" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">13</text>
<text x="160" y="45" fill="#1E293B" font-size="18" font-weight="bold" text-anchor="middle">22</text>
<line x1="150" y1="55" x2="170" y2="55" stroke="#1E293B" stroke-width="1.5"/>
<text x="160" y="75" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">31</text>
<text x="240" y="45" fill="#1E293B" font-size="18" font-weight="bold" text-anchor="middle">53</text>
<line x1="230" y1="55" x2="250" y2="55" stroke="#1E293B" stroke-width="1.5"/>
<text x="240" y="75" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">75</text>
<text x="310" y="45" fill="#EF4444" font-size="18" font-weight="bold" text-anchor="middle">128</text>
<line x1="290" y1="55" x2="330" y2="55" stroke="#EF4444" stroke-width="1.5"/>
<text x="310" y="75" fill="#EF4444" font-size="16" font-weight="bold" text-anchor="middle">181</text>
<path d="M30 30 Q 60 10 90 30" stroke="#3B82F6" stroke-width="2" fill="none"/>
<text x="60" y="15" fill="#3B82F6" font-size="10" font-weight="bold" text-anchor="middle">4 + 5 = 9</text>
<path d="M90 30 Q 125 10 160 30" stroke="#3B82F6" stroke-width="2" fill="none"/>
<text x="125" y="15" fill="#3B82F6" font-size="10" font-weight="bold" text-anchor="middle">9 + 13 = 22</text>
<path d="M160 30 Q 200 10 240 30" stroke="#3B82F6" stroke-width="2" fill="none"/>
<text x="200" y="15" fill="#3B82F6" font-size="10" font-weight="bold" text-anchor="middle">22 + 31 = 53</text>
<path d="M240 30 Q 275 10 310 30" stroke="#EF4444" stroke-width="2" fill="none"/>
<text x="275" y="15" fill="#EF4444" font-size="10" font-weight="bold" text-anchor="middle">53 + 75 = 128</text>
<path d="M30 85 Q 90 115 150 85" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
<text x="90" y="115" fill="#94A3B8" font-size="10" font-weight="bold" text-anchor="middle">9 + 22 = 31</text>
<path d="M90 85 Q 165 115 240 85" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
<text x="165" y="115" fill="#94A3B8" font-size="10" font-weight="bold" text-anchor="middle">22 + 53 = 75</text>
<path d="M160 85 Q 235 115 310 85" stroke="#EF4444" stroke-width="1.5" fill="none"/>
<text x="235" y="115" fill="#EF4444" font-size="10" font-weight="bold" text-anchor="middle">53 + 128 = 181</text>
</svg>
</div>

3. บนตัวถัดไปคือ ผลบวกของ บน + ส่วน ของตัวก่อนหน้า → $53 + 75 = 128$
4. ส่วนตัวถัดไปคือ ผลบวกของ บนตัวมันเอง + ส่วนของตัวมันเอง → $53 + 128 = 181$
**ตอบ: $\\frac{128}{181}$**

---

### 2.3 การจัดการก้างขวางคอ (The Intruder / Formatting)
เป็นเลเวลยากที่สุด เมื่อมีเลขจำนวนเต็มโผล่มากลางอนุกรมเศษส่วน ต้องทำการ "จัดรูป" เสียก่อน

### ตัวอย่างที่ 7: เลข 1 คือก้างขวางคอ (ระดับยาก)
**โจทย์:** $\\frac{4}{7}, 1, \\frac{16}{11}, \\frac{25}{13}, ?$

**วิธีทำ:**
1. สังเกตส่วน (ล่าง): $7, ?, 11, 13$ → น่าจะเป็นอนุกรมบวกทีละ 2 ดังนั้นตัวที่หายไปคือ 9
2. จัดรูปเลข 1 ให้มีส่วนเป็น 9 → $1 = \\frac{9}{9}$
3. อนุกรมใหม่คือ $\\frac{4}{7}, \\frac{9}{9}, \\frac{16}{11}, \\frac{25}{13}$

<div class="flex justify-center my-6">
<svg width="320" height="150" viewBox="0 0 320 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="50" y="40" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">4</text>
<line x1="40" y1="48" x2="60" y2="48" stroke="#1E293B" stroke-width="1.5"/>
<text x="50" y="65" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" text-anchor="middle">7</text>
<text x="110" y="55" fill="#EF4444" font-size="20" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">1</text>
<text x="170" y="40" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">16</text>
<line x1="160" y1="48" x2="180" y2="48" stroke="#1E293B" stroke-width="1.5"/>
<text x="170" y="65" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" text-anchor="middle">11</text>
<text x="240" y="40" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">25</text>
<line x1="230" y1="48" x2="250" y2="48" stroke="#1E293B" stroke-width="1.5"/>
<text x="240" y="65" fill="#1E293B" font-size="16" font-family="Sarabun, sans-serif" text-anchor="middle">13</text>
<text x="300" y="40" fill="#EF4444" font-size="16" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">36</text>
<line x1="290" y1="48" x2="310" y2="48" stroke="#EF4444" stroke-width="1.5"/>
<text x="300" y="65" fill="#EF4444" font-size="16" font-family="Sarabun, sans-serif" text-anchor="middle">15</text>
<path d="M110 65 L 110 100" stroke="#EF4444" stroke-width="1" stroke-dasharray="3 3"/>
<text x="110" y="115" fill="#EF4444" font-size="16" font-family="Sarabun, sans-serif" font-weight="bold" text-anchor="middle">9</text>
<line x1="100" y1="123" x2="120" y2="123" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="140" fill="#EF4444" font-size="16" font-family="Sarabun, sans-serif" text-anchor="middle">9</text>
<text x="50" y="25" fill="#64748B" font-size="10" font-family="Sarabun, sans-serif" text-anchor="middle">2²</text>
<text x="110" y="25" fill="#64748B" font-size="10" font-family="Sarabun, sans-serif" text-anchor="middle">3²</text>
<text x="170" y="25" fill="#64748B" font-size="10" font-family="Sarabun, sans-serif" text-anchor="middle">4²</text>
<text x="240" y="25" fill="#64748B" font-size="10" font-family="Sarabun, sans-serif" text-anchor="middle">5²</text>
<text x="300" y="25" fill="#EF4444" font-size="10" font-family="Sarabun, sans-serif" text-anchor="middle">6²</text>
<path d="M50 75 Q 80 95 105 120" stroke="#94A3B8" stroke-width="1" fill="none"/>
<text x="80" y="105" fill="#64748B" font-size="9" text-anchor="middle">+2</text>
<path d="M115 120 Q 145 95 170 75" stroke="#94A3B8" stroke-width="1" fill="none"/>
<text x="145" y="105" fill="#64748B" font-size="9" text-anchor="middle">+2</text>
<path d="M170 75 Q 205 95 240 75" stroke="#94A3B8" stroke-width="1" fill="none"/>
<text x="205" y="95" fill="#64748B" font-size="9" text-anchor="middle">+2</text>
<path d="M240 75 Q 270 95 300 75" stroke="#EF4444" stroke-width="1.5" fill="none"/>
<text x="270" y="95" fill="#EF4444" font-size="9" text-anchor="middle">+2</text>
</svg>
</div>

4. เศษ (บน) คือ $2^{2}, 3^{2}, 4^{2}, 5^{2}$ ตัวถัดไปคือ $6^{2} = 36$
5. ส่วน (ล่าง) คือ $7, 9, 11, 13$ ตัวถัดไปคือ $15$
**ตอบ: $\\frac{36}{15}$**

---

### ตัวอย่างที่ 8: ก้างขวางคอที่ไม่ใช่เลข 1 (ระดับยาก)
**โจทย์:** $\\frac{1}{6}, \\frac{1}{2}, \\frac{7}{6}, \\frac{19}{6}, \\frac{67}{6}, ?$

**วิธีทำ:**
1. ส่วนใหญ่เป็นเลข 6 มี $\\frac{1}{2}$ โผล่มาตัวเดียว
2. จัดรูป $\\frac{1}{2}$ ให้ส่วนเป็น 6 โดยคูณ $\\frac{3}{3}$ → $\\frac{1}{2} = \\frac{3}{6}$
3. อนุกรมใหม่คือ $1, 3, 7, 19, 67$ (ทั้งหมดส่วน 6)
4. ตีแฉกหาค่าต่างของเศษ:

<div class="flex justify-center my-6">
<svg width="350" height="150" viewBox="0 0 350 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="30" fill="#1E293B" font-size="14" font-weight="bold">1</text>
<text x="80" y="30" fill="#1E293B" font-size="14" font-weight="bold">3</text>
<text x="130" y="30" fill="#1E293B" font-size="14" font-weight="bold">7</text>
<text x="180" y="30" fill="#1E293B" font-size="14" font-weight="bold">19</text>
<text x="240" y="30" fill="#1E293B" font-size="14" font-weight="bold">67</text>
<text x="300" y="30" fill="#EF4444" font-size="14" font-weight="bold">?</text>
<path d="M30 40 L 55 70 M 80 40 L 55 70" stroke="#94A3B8" stroke-width="1"/>
<text x="55" y="85" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">+2</text>
<path d="M80 40 L 105 70 M 130 40 L 105 70" stroke="#94A3B8" stroke-width="1"/>
<text x="105" y="85" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">+4</text>
<path d="M130 40 L 155 70 M 180 40 L 155 70" stroke="#94A3B8" stroke-width="1"/>
<text x="155" y="85" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">+12</text>
<path d="M180 40 L 210 70 M 240 40 L 210 70" stroke="#94A3B8" stroke-width="1"/>
<text x="210" y="85" fill="#10B981" font-size="12" font-weight="bold" text-anchor="middle">+48</text>
<path d="M55 90 Q 80 110 105 90" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="80" y="115" fill="#D97706" font-size="8">x2</text>
<path d="M105 90 Q 130 110 155 90" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="130" y="115" fill="#D97706" font-size="8">x3</text>
<path d="M155 90 Q 182.5 110 210 90" stroke="#F59E0B" stroke-width="1" fill="none"/>
<text x="182.5" y="115" fill="#D97706" font-size="8">x4</text>
</svg>
</div>

5. ค่าต่างชั้นที่ 2 คือคูณถัดไป: $x2, x3, x4$ → ตัวถัดไปต้อง $x5$
6. $48 × 5 = 240$
7. เศษตัวถัดไปคือ $67 + 240 = 307$
**ตอบ: $\\frac{307}{6}$**

---

## สรุปกลยุทธ์: "สอบเพื่อให้ผ่าน ไม่ใช่สอบเพื่อให้ได้เต็ม"

ในการทำข้อสอบจริง หากเจอโจทย์ "จัดรูปเศษส่วน" หรือ "ตีแฉกหลายชั้น" ที่ใช้เวลานานเกิน 2 นาที **ให้ข้ามไปก่อน** แล้วค่อยกลับมาทำหากมีเวลาเหลือ เพราะคะแนนข้อที่ยากที่สุด มีค่าเท่ากับข้อที่ง่ายที่สุดเสมอ!
`;