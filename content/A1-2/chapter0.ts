
export const CHAPTER_0_SERIES_1 = `
# 1. อนุกรมตอนที่ 1 (เทคนิคการคิดอย่างเป็นระบบ)

ข้อสอบอนุกรมเป็นหนึ่งในเรื่องที่สำคัญมากในการสอบ ก.พ. ภาค ก. โดยจะออกสอบจำนวน 5 ข้อในทุกรอบ สิ่งที่ผู้ออกข้อสอบต้องการทดสอบไม่ใช่แค่ความยากของการคิดเลข แต่ต้องการ **"ดักเวลา"** ของผู้สอบเป็นหลัก เนื่องจากในห้องสอบมีเวลาทำข้อสอบเฉลี่ยเพียงข้อละประมาณ 1.5 นาที

การใช้วิธีสุ่มเดาตัวเลขไปเรื่อยๆ จะทำให้สูญเสียเวลาและส่งผลให้ทำข้อสอบพาร์ทอื่นๆ ไม่ทัน ดังนั้นการทำข้อสอบอนุกรมจึงต้องใช้เทคนิค **"การคิดอย่างเป็นระบบ"** เพื่อหาคำตอบให้แม่นยำและใช้เวลาไวที่สุด โดยมีขั้นตอนการทำดังนี้

---

## 3 ขั้นตอนทลายโจทย์อนุกรม (The Tactician's Flow)

### ขั้นที่ 1: ตรวจสอบความสัมพันธ์แบบ "สะสม" (0-5 วินาที)
เป็นวิธีที่ควรเริ่มทำอันดับแรกเพราะสามารถคิดในใจได้รวดเร็วที่สุด ถ้าใช่จะได้คำตอบทันที

*   **สะสม 2:** นำตัวเลข 2 ตัวหน้ามาบวกกัน (หรือทำปฏิกิริยากัน) แล้วได้ผลลัพธ์เป็นตัวเลขถัดไป
*   **สะสม 3:** นำตัวเลข 3 ตัวหน้ามาบวกกันเพื่อระบุตัวเลขถัดไป

<div class="flex justify-center my-6">
<svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="40" width="40" height="30" rx="4" fill="#E2E8F0"></rect>
<text x="30" y="60" fill="#475569" font-size="14" font-weight="bold" text-anchor="middle">2</text>
<rect x="60" y="40" width="40" height="30" rx="4" fill="#E2E8F0"></rect>
<text x="80" y="60" fill="#475569" font-size="14" font-weight="bold" text-anchor="middle">6</text>
<rect x="110" y="40" width="40" height="30" rx="4" fill="#E2E8F0"></rect>
<text x="130" y="60" fill="#475569" font-size="14" font-weight="bold" text-anchor="middle">8</text>
<rect x="160" y="40" width="40" height="30" rx="4" fill="#FDE047"></rect>
<text x="180" y="60" fill="#854D0E" font-size="14" font-weight="bold" text-anchor="middle">14</text>
<path d="M30 75 Q 80 100 130 75" stroke="#94A3B8" stroke-width="2" fill="none" marker-end="url(#arrowhead)"></path>
<text x="80" y="110" fill="#64748B" font-size="12" text-anchor="middle">2 + 6 = 8</text>
<path d="M80 75 Q 130 100 180 75" stroke="#94A3B8" stroke-width="2" fill="none" marker-end="url(#arrowhead)"></path>
<text x="135" y="110" fill="#64748B" font-size="12" text-anchor="middle">6 + 8 = 14</text>
<defs>
<marker id="arrowhead" marker-width="10" marker-height="7" refX="0" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#94A3B8"></polygon>
</marker>
</defs>
</svg>
</div>

### ขั้นที่ 2: นับจำนวนตัวเลขเพื่อตรวจสอบแบบ "ซ้อน" (5-10 วินาที)
หากวิธีสะสมไม่ได้ผล ให้สังเกตจำนวนตัวเลขที่โจทย์ให้มา

*   **Rule of 6:** หากมีตัวเลข **น้อยกว่า 6 ตัว** ให้ข้ามวิธีนี้ไปได้เลย (เพราะข้อมูลไม่พอที่จะซ้อน)
*   **ถ้ามี 6 ตัวขึ้นไป:** มีโอกาสสูงที่จะเป็นอนุกรมแบบซ้อน (มี 2 หรือ 3 ชุดสลับกัน) ให้ลองพิจารณาตัวเลขแบบข้ามลำดับ

### ขั้นที่ 3: การหาความสัมพันธ์แบบ "ตีแฉก" (10+ วินาที)
หากตัด 2 วิธีแรกทิ้งไปแล้ว ให้ใช้การตีแฉกเพื่อหาค่าความต่าง โดยสังเกตลักษณะดังนี้:
*   เพิ่มขึ้นไม่มาก → **บวก**
*   ลดลง → **ลบ**
*   เพิ่มขึ้นแบบก้าวกระโดด → **คูณ**

---

## 💡 เทคนิคโกงเวลา (ดูเลขท้าย)
เมื่อเจอเลขจำนวนมหาศาล (หลักพัน/หมื่น) **ไม่ต้องคำนวณเต็มจำนวน** ให้นำเลขหลักหน่วยมาทำปฏิกิริยากัน แล้วดูช้อยส์ที่มีเลขท้ายตรงกัน จะช่วยประหยัดเวลาได้มหาศาล

---

## 📝 รวมตัวอย่างแบบฝึกหัด (10 ข้อ)

### ตัวอย่างที่ 1 (ระดับง่าย: สะสม 2)
**โจทย์:** 2, 6, 8, 14, 22, 36, ... 

**วิธีทำ:** 
1. ลองเช็กระบบสะสม: $2 + 6 = 8$ (ใช่!)
2. $6 + 8 = 14$ (ใช่!)
3. ดังนั้น ตัวถัดไปคือ $22 + 36 = 58$
**ตอบ: 58**

### ตัวอย่างที่ 2 (ระดับง่าย: สะสม 3)
**โจทย์:** 2, -1, 5, 6, 10, 21, ...

**วิธีทำ:**
1. สะสม 2 ไม่ได้ผล ($2 + (-1) \\neq 5$)
2. ลองสะสม 3: $2 + (-1) + 5 = 6$ (ใช่!)
3. $(-1) + 5 + 6 = 10$ (ใช่!)
4. $5 + 6 + 10 = 21$ (ใช่!)
5. ตัวถัดไปคือ $6 + 10 + 21 = 37$
**ตอบ: 37**

### ตัวอย่างที่ 3 (ระดับง่าย: ตีแฉกบวก)
**โจทย์:** 59, 76, 93, 110, ...

**วิธีทำ:** 
1. สะสมไม่ได้ ซ้อนไม่ได้ (เลขน้อยกว่า 6)
2. ตีแฉก: $76 - 59 = 17$, $93 - 76 = 17$, $110 - 93 = 17$

<div class="flex justify-center my-4">
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">59</text>
<text x="80" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">76</text>
<text x="130" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">93</text>
<text x="180" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">110</text>
<path d="M30 40 Q 55 70 80 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="55" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+17</text>
<path d="M80 40 Q 105 70 130 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="105" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+17</text>
<path d="M130 40 Q 155 70 180 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="155" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+17</text>
</svg>
</div>

3. เป็นอนุกรมบวก $17$ คงที่
4. ตัวถัดไปคือ $110 + 17 = 127$
**ตอบ: 127**

### ตัวอย่างที่ 4 (ระดับง่าย: ตีแฉกคูณ)
**โจทย์:** 4, 16, 64, 256, ...

**วิธีทำ:**
1. เลขเพิ่มแบบก้าวกระโดด ลองเช็กการคูณ
2. $4 × 4 = 16$, $16 × 4 = 64$, $64 × 4 = 256$

<div class="flex justify-center my-4">
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">4</text>
<text x="80" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">16</text>
<text x="130" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">64</text>
<text x="180" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">256</text>
<path d="M30 40 Q 55 70 80 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="55" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">x 4</text>
<path d="M80 40 Q 105 70 130 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="105" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">x 4</text>
<path d="M130 40 Q 155 70 180 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="155" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">x 4</text>
</svg>
</div>

3. ตัวถัดไปคือ $256 × 4 = 1,024$
**ตอบ: 1,024**

### ตัวอย่างที่ 5 (ระดับกลาง: อนุกรมซ้อน 2 ชุด)
**โจทย์:** 50, 7, 65, 9, 80, 11, 95, ...

**วิธีทำ:**
1. มีเลขเกิน 6 ตัว ลองเช็กแบบซ้อน

<div class="flex justify-center my-4">
<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="60" fill="#1E293B" font-size="14" font-weight="bold">50</text>
<text x="50" y="60" fill="#94A3B8" font-size="12">7</text>
<text x="80" y="60" fill="#1E293B" font-size="14" font-weight="bold">65</text>
<text x="110" y="60" fill="#94A3B8" font-size="12">9</text>
<text x="140" y="60" fill="#1E293B" font-size="14" font-weight="bold">80</text>
<text x="170" y="60" fill="#94A3B8" font-size="12">11</text>
<text x="200" y="60" fill="#1E293B" font-size="14" font-weight="bold">95</text>
<text x="235" y="60" fill="#EF4444" font-size="14" font-weight="bold">?</text>
<path d="M30 40 Q 55 20 85 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<text x="57" y="25" fill="#3B82F6" font-size="10" font-weight="bold">+15</text>
<path d="M90 40 Q 115 20 145 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<path d="M150 40 Q 175 20 205 40" stroke="#3B82F6" stroke-width="1.5" fill="none"/>
<path d="M55 75 Q 85 95 115 75" stroke="#94A3B8" stroke-width="1.2" fill="none"/>
<text x="85" y="95" fill="#64748B" font-size="10" font-weight="bold">+2</text>
<path d="M115 75 Q 145 95 175 75" stroke="#94A3B8" stroke-width="1.2" fill="none"/>
<path d="M175 75 Q 210 95 240 75" stroke="#EF4444" stroke-width="1.5" fill="none" stroke-dasharray="2 2"/>
<text x="210" y="95" fill="#EF4444" font-size="10" font-weight="bold">+2</text>
</svg>
</div>

2. ชุดที่ 1 (ตัวที่ 1, 3, 5, 7): $50, 65, 80, 95$ (เพิ่มทีละ 15)
3. ชุดที่ 2 (ตัวที่ 2, 4, 6, 8): $7, 9, 11, ...$ (เพิ่มทีละ 2)
4. โจทย์ถามตัวถัดจาก 95 ซึ่งเป็นลำดับที่ 8 (ชุดที่ 2)
5. ดังนั้นคำตอบคือ $11 + 2 = 13$
**ตอบ: 13**

### ตัวอย่างที่ 6 (ระดับกลาง: อนุกรมซ้อน 3 ชุด)
**โจทย์:** 3, 2, 1, 4, 4, 3, 5, 8, 9, 6, 16, 27, ...

**วิธีทำ:**
1. ชุดที่ 1: $3 → 4 → 5 → 6$ (บวก 1)
2. ชุดที่ 2: $2 → 4 → 8 → 16$ (คูณ 2)
3. ชุดที่ 3: $1 → 3 → 9 → 27$ (คูณ 3)
4. ตัวถัดไปต่อจาก 27 คือตัวถัดไปของชุดที่ 1 → $6 + 1 = 7$
**ตอบ: 7**

<div class="flex justify-center my-6">
<svg width="400" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Numbers Row -->
<text x="30" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">3</text>
<text x="60" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">2</text>
<text x="90" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">1</text>
<text x="120" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">4</text>
<text x="150" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">4</text>
<text x="180" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">3</text>
<text x="210" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">5</text>
<text x="240" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">8</text>
<text x="270" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">9</text>
<text x="300" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">6</text>
<text x="330" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">16</text>
<text x="360" y="40" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">27</text>
<text x="390" y="40" fill="#0EA5E9" font-size="16" font-weight="bold" text-anchor="middle">?</text>
<!-- Path Series 1 (Top) -->
<path d="M30 25 Q 75 -10 120 25" stroke="#94A3B8" stroke-width="1.5" fill="none" />
<path d="M120 25 Q 165 -10 210 25" stroke="#94A3B8" stroke-width="1.5" fill="none" />
<path d="M210 25 Q 255 -10 300 25" stroke="#94A3B8" stroke-width="1.5" fill="none" />
<path d="M300 25 Q 345 -10 390 25" stroke="#0EA5E9" stroke-width="2" stroke-dasharray="4" fill="none" />
<text x="75" y="10" fill="#64748B" font-size="10" text-anchor="middle">+1</text>
<text x="345" y="10" fill="#0EA5E9" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
<!-- Path Series 2 (Bottom) -->
<path d="M60 55 Q 105 85 150 55" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<path d="M150 55 Q 195 85 240 55" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<path d="M240 55 Q 285 85 330 55" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="105" y="85" fill="#3B82F6" font-size="10" text-anchor="middle">x2</text>
<!-- Path Series 3 (Deep Bottom) -->
<path d="M90 55 Q 135 125 180 55" stroke="#EF4444" stroke-width="1.5" fill="none" />
<path d="M180 55 Q 225 125 270 55" stroke="#EF4444" stroke-width="1.5" fill="none" />
<path d="M270 55 Q 315 125 360 55" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="135" y="115" fill="#EF4444" font-size="10" text-anchor="middle">x3</text>
<!-- Legend -->
<rect x="50" y="150" width="10" height="10" fill="#94A3B8" rx="2" />
<text x="65" y="159" fill="#64748B" font-size="11">ชุดที่ 1 (+1)</text>
<rect x="150" y="150" width="10" height="10" fill="#3B82F6" rx="2" />
<text x="165" y="159" fill="#3B82F6" font-size="11">ชุดที่ 2 (x2)</text>
<rect x="250" y="150" width="10" height="10" fill="#EF4444" rx="2" />
<text x="265" y="159" fill="#EF4444" font-size="11">ชุดที่ 3 (x3)</text>
</svg>
</div>

### ตัวอย่างที่ 7 (ระดับกลาง: ตีแฉกแบบแพทเทิร์น)
**โจทย์:** 22, 23, 34, 145, ...

**วิธีทำ:**
1. ชั้นที่ 1: $+1, +11, +111$

<div class="flex justify-center my-4">
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="30" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">22</text>
<text x="80" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">23</text>
<text x="130" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">34</text>
<text x="180" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">145</text>
<path d="M30 40 Q 55 70 80 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="55" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
<path d="M80 40 Q 105 70 130 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="105" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+11</text>
<path d="M130 40 Q 155 70 180 40" stroke="#3B82F6" stroke-width="1.5" fill="none" />
<text x="155" y="70" fill="#3B82F6" font-size="11" font-weight="bold" text-anchor="middle">+111</text>
</svg>
</div>

2. สังเกตแพทเทิร์นเลข 1 เพิ่มขึ้นทีละหลัก
3. ค่าต่างตัวถัดไปคือ $+1,111$
4. คำตอบคือ $145 + 1,111 = 1,256$
**ตอบ: 1,256**

### ตัวอย่างที่ 8 (ระดับยาก: ตีแฉกลบสลับ)
**โจทย์:** 105, 104, 101, 96, 89, ...

**วิธีทำ:**
1. ตีแฉกหาค่าต่าง: $-1, -3, -5, -7$ (เป็นเลขคี่ติดลบ)

<div class="flex justify-center my-4">
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">105</text>
<text x="65" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">104</text>
<text x="110" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">101</text>
<text x="155" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">96</text>
<text x="200" y="30" fill="#1E293B" font-size="14" font-weight="bold" text-anchor="middle">89</text>
<path d="M20 40 Q 42 70 65 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="42" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">-1</text>
<path d="M65 40 Q 87 70 110 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="87" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">-3</text>
<path d="M110 40 Q 132 70 155 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="132" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">-5</text>
<path d="M155 40 Q 177 70 200 40" stroke="#EF4444" stroke-width="1.5" fill="none" />
<text x="177" y="70" fill="#EF4444" font-size="11" font-weight="bold" text-anchor="middle">-7</text>
</svg>
</div>

2. ค่าต่างตัวถัดไปคือ $-9$
3. คำตอบคือ $89 - 9 = 80$
**ตอบ: 80**

### ตัวอย่างที่ 9 (ระดับยาก: การใช้เทคนิคเลขท้าย)
**โจทย์:** $2,566 × 44$ มีค่าเท่ากับเท่าใด?
ก. 112,900 | ข. 112,904 | ค. 112,910 | ง. 112,912

**วิธีทำ:**
1. ใช้เทคนิคดูเลขท้าย: $6 × 4 = 24$

<div class="flex justify-center my-4">
<svg width="280" height="80" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="55" y="15" width="20" height="25" rx="2" fill="#FEF9C3" stroke="#FACC15"></rect>
<rect x="105" y="15" width="20" height="25" rx="2" fill="#FEF9C3" stroke="#FACC15"></rect>
<text x="30" y="32" fill="#1E293B" font-size="14" font-weight="bold">256</text>
<text x="65" y="32" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">6</text>
<text x="85" y="32" fill="#1E293B" font-size="14" font-weight="bold">x</text>
<text x="100" y="32" fill="#1E293B" font-size="14" font-weight="bold">4</text>
<text x="115" y="32" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">4</text>
<path d="M65 45 Q 90 65 115 45" stroke="#F59E0B" stroke-width="2" fill="none"></path>
<text x="90" y="75" fill="#D97706" font-size="14" font-weight="bold" text-anchor="middle">24 (ลงท้ายด้วย 4)</text>
</svg>
</div>

2. คำตอบต้องลงท้ายด้วย **4** 
3. ดูช้อยส์ มีข้อ ข. ข้อเดียวที่ลงท้ายด้วย 4
**ตอบ: ข. 112,904**

### ตัวอย่างที่ 10 (ระดับยาก: ตีแฉก 2 ชั้น)
**โจทย์:** 5, 11, 23, 44, 77, ...

**วิธีทำ:**
1. ชั้นที่ 1 (ความต่าง): $+6, +12, +21, +33$
2. ชั้นที่ 2 (ความต่างของความต่าง): $+6, +9, +12$ (เพิ่มทีละ 3)
3. ดังนั้น ชั้นที่ 2 ตัวถัดไปคือ $12 + 3 = 15$
4. กลับไปชั้นที่ 1: $33 + 15 = 48$
5. คำตอบคือ $77 + 48 = 125$
**ตอบ: 125**
`;
