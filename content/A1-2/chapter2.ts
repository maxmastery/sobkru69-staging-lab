export const CHAPTER_2_SUM_CONSECUTIVE = `
# 2. ผลบวกของเลขหลายจำนวนเรียงกันและการหาจำนวนข้อมูล

### สูตรครอบจักรวาลที่ต้องจำ 
**สูตร 1 หาจำนวนเทอม (หาว่ามีกี่ตัว):**
> จำนวนเทอม (ตัว) = ((ปลาย - ต้น) / ห่าง) + 1
> *ย่อๆ: (ป - ต) / ห + 1*
>
> *(หมายเหตุ: "ห่าง" แทนระยะห่างระหว่างตัวเลข)*

**สูตร 2 หาผลบวก:**
> ผลบวก = ((ต้น + ปลาย) × เทอม) / 2 
> *ย่อๆ: (ต + ป) × ท / 2*
>
> *(หมายเหตุ: "เทอม" แทนจำนวนตัว, "ต้น" แทนตัวเลขแรกสุด, "ปลาย" แทนตัวเลขสุดท้าย)*

---

**ตัวอย่างที่ 1** ผลบวกของเลข 7 จำนวนเรียงกัน = 1435 เลขจำนวนกลางเท่ากับเท่าไร

<div class="flex justify-center my-6">
<svg width="280" height="80" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<rect x="40" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<rect x="80" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<rect x="120" y="25" width="40" height="30" rx="4" fill="#FEF08A" stroke="#EAB308" stroke-width="2"/>
<rect x="170" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<rect x="210" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<rect x="250" y="25" width="30" height="30" rx="4" fill="#E2E8F0"/>
<text x="140" y="45" fill="#ca8a04" font-size="14" font-weight="bold" text-anchor="middle">?</text>
<path d="M10 20 Q 140 -10 270 20" stroke="#3B82F6" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
<text x="140" y="10" fill="#3B82F6" font-size="12" text-anchor="middle">ผลรวม 1435</text>
</svg>
</div>

**วิธีทำ** 
ข้อนี้ใช้สูตรหาค่ากลางโดยตรงได้เลย
$$
\\begin{aligned}
\\text{กลาง} &= \\frac{\\text{ผลบวก}}{\\text{จำนวนเทอม}} \\\\
\\text{กลาง} &= \\frac{1435}{7} \\\\
&= 205
\\end{aligned}
$$

**ตอบ** 205

**ตัวอย่างที่ 2** จงหาผลรวมของเลขคี่จาก 41 ถึง 69

<div class="flex justify-center my-6">
<svg width="300" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="30" cy="30" r="16" fill="#FDE047"/>
<text x="30" y="34" fill="#854D0E" font-size="12" font-weight="bold" text-anchor="middle">41</text>
<circle cx="70" cy="30" r="16" fill="#FEF08A"/>
<text x="70" y="34" fill="#A16207" font-size="10" text-anchor="middle">43</text>
<circle cx="110" cy="30" r="16" fill="#FEF08A"/>
<text x="110" y="34" fill="#A16207" font-size="10" text-anchor="middle">45</text>
<circle cx="150" cy="30" r="4" fill="#CBD5E1"/>
<circle cx="170" cy="30" r="4" fill="#CBD5E1"/>
<circle cx="190" cy="30" r="4" fill="#CBD5E1"/>
<circle cx="230" cy="30" r="16" fill="#FEF08A"/>
<text x="230" y="34" fill="#A16207" font-size="10" text-anchor="middle">67</text>
<circle cx="270" cy="30" r="16" fill="#FDE047"/>
<text x="270" y="34" fill="#854D0E" font-size="12" font-weight="bold" text-anchor="middle">69</text>
</svg>
</div>

**วิธีทำ** 
ต้องใช้ทั้ง 2 สูตร (เนื่องจากเป็นเลขคี่ ระยะห่าง = 2)
**ขั้นที่ 1 หาจำนวนตัว:**
$$
\\begin{aligned}
\\text{ตัว} &= \\frac{69 - 41}{2} + 1 \\\\
&= \\frac{28}{2} + 1 \\\\
&= 14 + 1 \\\\
&= 15 \\text{ ตัว}
\\end{aligned}
$$
**ขั้นที่ 2 หาผลบวก:**
$$
\\begin{aligned}
\\text{ผลบวก} &= \\frac{(41 + 69) \\times 15}{2} \\\\
&= \\frac{110 \\times 15}{2} \\\\
&= 55 \\times 15 \\\\
&= 825
\\end{aligned}
$$

**ตอบ** 825

**ตัวอย่างที่ 3** จำนวนนับตั้งแต่ 30 ถึง 200 ที่หารด้วย 8 ลงตัว มีกี่จำนวน

<div class="flex justify-center my-6">
<svg width="340" height="60" viewBox="0 0 340 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="15" width="50" height="30" rx="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
<text x="25" y="35" fill="#64748B" font-size="12" text-anchor="middle">30</text>
<rect x="60" y="10" width="50" height="40" rx="4" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>
<text x="85" y="35" fill="#1E40AF" font-size="14" font-weight="bold" text-anchor="middle">32</text>
<text x="85" y="10" fill="#2563EB" font-size="10" text-anchor="middle">ต้น</text>
<rect x="120" y="15" width="50" height="30" rx="4" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
<text x="145" y="35" fill="#64748B" font-size="12" text-anchor="middle">...</text>
<rect x="230" y="10" width="50" height="40" rx="4" fill="#BFDBFE" stroke="#3B82F6" stroke-width="2"/>
<text x="255" y="35" fill="#1E40AF" font-size="14" font-weight="bold" text-anchor="middle">200</text>
<text x="255" y="10" fill="#2563EB" font-size="10" text-anchor="middle">ปลาย</text>
<path d="M85 55 L255 55" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow)"/>
<text x="170" y="52" fill="#2563EB" font-size="10" text-anchor="middle">หาร 8 ลงตัว ห่างทีละ 8</text>
</svg>
</div>

**วิธีทำ** 
ต้องหา "ต้น" และ "ปลาย" ที่หารด้วย 8 ลงตัวก่อน ช่วง 32, 40, ... , 200 (ระยะห่าง = 8)
ต้น = 32, ปลาย = 200
$$
\\begin{aligned}
\\text{จำนวนตัว} &= \\frac{200 - 32}{8} + 1 \\\\
&= \\frac{168}{8} + 1 \\\\
&= 21 + 1 \\\\
&= 22 \\text{ จำนวน}
\\end{aligned}
$$

**ตอบ** 22 จำนวน

**ตัวอย่างที่ 4** $\\frac{3}{4}$ ของเลขจำนวนมากเท่ากับจำนวนน้อย และผลรวมของเลข 2 จำนวน = 35 จงหาเลขจำนวนมาก

<div class="flex justify-center my-6">
<svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="60" height="60" rx="8" fill="#FCA5A5"/>
<text x="50" y="55" fill="#7F1D1D" font-size="14" font-weight="bold" text-anchor="middle">มาก (x)</text>
<rect x="120" y="30" width="45" height="45" rx="8" fill="#93C5FD"/>
<text x="142" y="57" fill="#1E3A8A" font-size="12" font-weight="bold" text-anchor="middle">น้อย (y)</text>
<path d="M50 15 Q 95 -10 142 25" stroke="#475569" stroke-width="2" fill="none" stroke-dasharray="2 2"/>
<text x="96" y="10" fill="#475569" font-size="10" text-anchor="middle">รวม=35</text>
</svg>
</div>

**วิธีทำ** 
สร้างเป็นสมการ
ให้จำนวนมาก = $x$, จำนวนน้อย = $y$
สมการที่ 1: $x + y = 35$
สมการที่ 2: $y = \\frac{3}{4}x$
แทนค่า $y$:
$$
\\begin{aligned}
x + \\frac{3}{4}x &= 35 \\\\
\\frac{7}{4}x &= 35 \\\\
x &= 35 \\times \\frac{4}{7} \\\\
x &= 20
\\end{aligned}
$$

**ตอบ** เลขจำนวนมากคือ 20

**ตัวอย่างที่ 5** ผลรวมของจำนวนนับตั้งแต่ 50 - 300 ที่หารด้วย 4 และ 5 ลงตัว มีค่าเท่าไหร่

<div class="flex justify-center my-6">
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="120" cy="40" r="30" fill="#D1FAE5" stroke="#10B981" stroke-width="3"/>
<text x="120" y="45" fill="#047857" font-size="14" font-weight="bold" text-anchor="middle">ค.ร.น. = 20</text>
<path d="M70 40 L40 20" stroke="#10B981" stroke-width="2" stroke-dasharray="4"/>
<text x="30" y="18" fill="#047857" font-size="12" text-anchor="middle">หาร 4</text>
<path d="M170 40 L200 60" stroke="#10B981" stroke-width="2" stroke-dasharray="4"/>
<text x="210" y="70" fill="#047857" font-size="12" text-anchor="middle">หาร 5</text>
</svg>
</div>

**วิธีทำ** 
คำว่า "หารด้วย 4 และ 5 ลงตัว" หมายถึงต้องหารด้วย **ค.ร.น. ของ 4 และ 5 คือ 20** ลงตัว
หา "ต้น" ช่วง 50-300 ที่ 20 หารลงตัว: $20 \\times 3 = 60$ (ต้น = 60)
หา "ปลาย" ช่วง 50-300 ที่ 20 หารลงตัว: $20 \\times 15 = 300$ (ปลาย = 300)
ข้อมูลชุดนี้คือ: 60, 80, ..., 300 (ระยะห่าง = 20)
**ขั้นที่ 1 หาจำนวนตัว:** 
$$
\\begin{aligned}
\\text{ตัว} &= \\frac{300 - 60}{20} + 1 \\\\
&= \\frac{240}{20} + 1 \\\\
&= 13 \\text{ ตัว}
\\end{aligned}
$$
**ขั้นที่ 2 หาผลบวก:**
$$
\\begin{aligned}
\\text{ผลบวก} &= \\frac{(60 + 300) \\times 13}{2} \\\\
&= \\frac{360 \\times 13}{2} \\\\
&= 180 \\times 13 \\\\
&= 2,340
\\end{aligned}
$$

**ตอบ** 2,340

**ตัวอย่างที่ 6** จำนวนนับตั้งแต่ 50 - 450 มีกี่จำนวนที่หารด้วย 4 ลงตัว แต่หารด้วย 6 ไม่ลงตัว

<div class="flex justify-center my-6">
<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Venn Diagram Style -->
<circle cx="90" cy="60" r="50" fill="#DBEAFE" fill-opacity="0.8" stroke="#3B82F6" stroke-width="2"/>
<circle cx="150" cy="60" r="50" fill="#FEE2E2" fill-opacity="0.8" stroke="#EF4444" stroke-width="2"/>
<text x="70" y="65" fill="#1E3A8A" font-size="14" font-weight="bold" text-anchor="middle">หาร 4</text>
<text x="170" y="65" fill="#991B1B" font-size="14" font-weight="bold" text-anchor="middle">หาร 6</text>
<text x="120" y="45" fill="#4B5563" font-size="10" text-anchor="middle">หาร 12 (ค.ร.น.)</text>
<path d="M50 15 L20 15 L20 105 L50 105" fill="none" stroke="#64748B" stroke-width="2"/>
<text x="35" y="115" fill="#1E3A8A" font-size="12" text-anchor="middle">ต้องการพื้นที่นี้!</text>
</svg>
</div>

**วิธีทำ** 
นำ (จำนวนที่หารด้วย 4 ลงตัว) ลบด้วย (จำนวนที่หารด้วย 12 ลงตัว) เพราะ 12 คือ ค.ร.น. ของ 4 และ 6
**1) หาจำนวนที่หาร 4 ลงตัวทั้งหมด (ต้น 52, ปลาย 448, ห่าง 4):**
$$
\\begin{aligned}
\\text{ตัว} &= \\frac{448 - 52}{4} + 1 \\\\
&= \\frac{396}{4} + 1 \\\\
&= 100 \\text{ ตัว}
\\end{aligned}
$$
**2) หาจำนวนที่หาร 12 ลงตัว (ต้น 60, ปลาย 444, ห่าง 12):**
$$
\\begin{aligned}
\\text{ตัว} &= \\frac{444 - 60}{12} + 1 \\\\
&= \\frac{384}{12} + 1 \\\\
&= 33 \\text{ ตัว}
\\end{aligned}
$$
**3) นำมาลบกัน:** 
$$
\\begin{aligned}
100 - 33 &= 67 \\text{ ตัว}
\\end{aligned}
$$

**ตอบ** 67 จำนวน

<div class="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
#### 🌟 เพิ่มเติม: ฝึกหาผลรวมและจำนวนเทอม (ระดับ ง่าย-กลาง-ยาก)

**ตัวอย่างเสริม 1 (ง่าย):** จงหาจำนวนเทอมของลำดับ 10, 15, 20, ..., 85

**วิธีทำ** 
ต้น = 10, ปลาย = 85, ห่าง = 5
$$
\\begin{aligned}
\\text{จำนวนเทอม} &= \\frac{85 - 10}{5} + 1 \\\\
&= \\frac{75}{5} + 1 \\\\
&= 15 + 1 \\\\
&= 16
\\end{aligned}
$$

**ตอบ** 16 เทอม

**ตัวอย่างเสริม 2 (กลาง):** จงหาผลรวมของจำนวนคู่ตั้งแต่ 20 ถึง 60

**วิธีทำ** 
ต้น = 20, ปลาย = 60, ห่าง = 2
**หาจำนวนเทอม:**
$$
\\begin{aligned}
\\text{เทอม} &= \\frac{60 - 20}{2} + 1 \\\\
&= \\frac{40}{2} + 1 \\\\
&= 21 \\text{ เทอม}
\\end{aligned}
$$
**หาผลรวม:**
$$
\\begin{aligned}
\\text{ผลบวก} &= \\frac{(20 + 60) \\times 21}{2} \\\\
&= \\frac{80 \\times 21}{2} \\\\
&= 40 \\times 21 \\\\
&= 840
\\end{aligned}
$$

**ตอบ** 840

**ตัวอย่างเสริม 3 (กลาง):** จำนวนนับตั้งแต่ 100 ถึง 500 มีกี่จำนวนที่หารด้วย 9 ลงตัว?

**วิธีทำ** 
ต้น (ตัวแรกที่ 9 หารลงตัว) = 108
ปลาย (ตัวสุดท้ายที่ 9 หารลงตัว) = 495
$$
\\begin{aligned}
\\text{เทอม} &= \\frac{495 - 108}{9} + 1 \\\\
&= \\frac{387}{9} + 1 \\\\
&= 43 + 1 \\\\
&= 44
\\end{aligned}
$$

**ตอบ** 44 จำนวน

**ตัวอย่างเสริม 4 (ยาก):** จงหาผลรวมของจำนวนที่หารด้วย 7 ลงตัว ตั้งแต่ 100 ถึง 300

**วิธีทำ** 
ต้น (ตัวแรกที่ 7 หารลง) = 105
ปลาย (ตัวสุดท้ายที่ 7 หารลง) = 294
**หาจำนวนเทอม:**
$$
\\begin{aligned}
\\text{เทอม} &= \\frac{294 - 105}{7} + 1 \\\\
&= \\frac{189}{7} + 1 \\\\
&= 27 + 1 \\\\
&= 28 \\text{ เทอม}
\\end{aligned}
$$
**หาผลรวม:**
$$
\\begin{aligned}
\\text{ผลบวก} &= \\frac{(105 + 294) \\times 28}{2} \\\\
&= \\frac{399 \\times 28}{2} \\\\
&= 399 \\times 14 \\\\
&= 5,586
\\end{aligned}
$$

**ตอบ** 5,586
</div>
`;
