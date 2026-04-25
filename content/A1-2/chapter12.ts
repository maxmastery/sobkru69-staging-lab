export const CHAPTER_12_COMBINATORICS_STATISTICS = `
# 12. การจัดหมู่ ความน่าจะเป็น สถิติ และนาฬิกา

### 1. การจับมือ / แจกการ์ด / เส้นทแยงมุม
โจทย์ปัญหากลุ่มนี้มักมีแนวคิดตายตัว เพียงแค่จำสูตรไปใช้ได้เลย:
*   **สูตรที่ 1: แจกการ์ด / ของขวัญ (ทำแบบได้ไปและได้กลับ 2 ทาง)**
    จำนวนรวม = $n(n - 1)$
*   **สูตรที่ 2: จับมือ / ทักทาย / แข่งกีฬากันรอบเดียว (แบบไม่มีอันดับ หรือทิศทางเดียว)**
    จำนวนครั้ง = $\\frac{n(n - 1)}{2}$
*   **สูตรที่ 3: จำนวนเส้นทแยงมุมของรูปหลายเหลี่ยม**
    จำนวนเส้น = $\\frac{n(n - 3)}{2}$
*(n คือ จำนวนคน, หรือจำนวนด้านของเหลี่ยม)*

**ตัวอย่างที่ 1** นักเรียน 12 คน แลกการ์ดปีใหม่กันทุกคนจะต้องใช้การ์ดรวมทั้งหมดกี่ใบ?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 120" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="120" fill="#f0fdf4" rx="10" />
<circle cx="100" cy="60" r="25" fill="#4ade80" />
<circle cx="250" cy="60" r="25" fill="#60a5fa" />
<text x="100" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">A</text>
<text x="250" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">B</text>
<path d="M 120 45 Q 175 20 230 45" fill="none" stroke="#f43f5e" stroke-width="3" marker-end="url(#arrow-ch12-1)" />
<path d="M 230 75 Q 175 100 120 75" fill="none" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow-ch12-1-blue)" />
<text x="175" y="30" font-size="12" text-anchor="middle" fill="#e11d48">แลกไป</text>
<text x="175" y="100" font-size="12" text-anchor="middle" fill="#1d4ed8">แลกกลับ</text>
<text x="175" y="60" font-size="10" text-anchor="middle" fill="#166534">สูตร: n(n-1)</text>
<defs>
<marker id="arrow-ch12-1" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
</marker>
<marker id="arrow-ch12-1-blue" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
</marker>
</defs>
</svg>
</div>

**วิธีทำ** 
แลกการ์ดใช้สูตร $n(n - 1)$
$$
\\begin{aligned}
จำนวนการ์ด &= 12(12 - 1) \\\\
&= 12 \\times 11 \\\\
&= 132 \\text{ ใบ}
\\end{aligned}
$$

**ตอบ** 132 ใบ

**ตัวอย่างที่ 2** ทีมฟุตบอล 6 ทีม แข่งแบบพบกันหมด 1 รอบ จะมีการแข่งขันกี่แมตช์?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 120" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="120" fill="#fdf4ff" rx="10" />
<circle cx="100" cy="60" r="25" fill="#c084fc" />
<circle cx="250" cy="60" r="25" fill="#f472b6" />
<text x="100" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">ทีม 1</text>
<text x="250" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">ทีม 2</text>
<path d="M 130 60 L 220 60" stroke="#9333ea" stroke-width="4" />
<text x="175" y="50" font-size="12" text-anchor="middle" fill="#7e22ce" font-weight="bold">แข่งรอบเดียว (นับ 1)</text>
<text x="175" y="80" font-size="10" text-anchor="middle" fill="#86198f">สูตร: [n(n-1)] / 2</text>
</svg>
</div>

**วิธีทำ** 
แข่งแบบพบกันหมด 1 รอบ เหมือนการจับมือ
$$
\\begin{aligned}
แมตช์ &= \\frac{6(6 - 1)}{2} \\\\
&= \\frac{6 \\times 5}{2} \\\\
&= 15 \\text{ แมตช์}
\\end{aligned}
$$

**ตอบ** 15 แมตช์

**ตัวอย่างที่ 3** รูป 10 เหลี่ยม มีเส้นทแยงมุมกี่เส้น?

**วิธีทำ** 
ใช้สูตรเส้นทแยงมุม
$$
\\begin{aligned}
เส้นทแยงมุม &= \\frac{10(10 - 3)}{2} \\\\
&= \\frac{10 \\times 7}{2} \\\\
&= 35 \\text{ เส้น}
\\end{aligned}
$$

**ตอบ** 35 เส้น

---

### 2. สถิติ และค่ากลางของข้อมูล
*   **ค่าเฉลี่ยเลขคณิต (Mean):** $x̄ = \\frac{ผลรวมข้อมูลทั้งหมด}{จำนวนของข้อมูล}$
*   **มัธยฐาน (Median):** ค่ากึ่งกลาง **เมื่อเรียงลำดับข้อมูลจากน้อยไปมากแล้ว** (หาตำแหน่งที่ $= \\frac{n+1}{2}$)
*   **ฐานนิยม (Mode):** ข้อมูลที่มีความถี่หรือซ้ำกันมากที่สุดในกลุ่ม
*   **พิสัย (Range):** ค่าที่มากที่สุด - ค่าที่น้อยที่สุด

**ตัวอย่างที่ 4** กำหนดข้อมูล: 8, 12, 10, 8, 17 จงหาค่าเฉลี่ย มัธยฐาน และฐานนิยม

**วิธีทำ** 
เรียงข้อมูลก่อน: 8, 8, 10, 12, 17
*   **ค่าเฉลี่ย:** $\\frac{8 + 8 + 10 + 12 + 17}{5} = \\frac{55}{5} = 11$
*   **มัธยฐาน (ตัวตรงกลาง):** มี 5 ตัว ตำแหน่งตรงกลางคือตัวที่ $\\frac{5+1}{2} = 3$ ซึ่งคือเลข 10
*   **ฐานนิยม:** เลขที่ซ้ำมากที่สุด คือ 8

---

### 3. สูตรลัด มุมของนาฬิกา
> **สูตรเด็ด:** $|30H - 5.5M|$
*H = เข็มชั่วโมง (Hour), M = เข็มนาที (Minute)*
*หมายเหตุ: คำตอบจะออกมาเป็นหน่วยองศาแบบมุมเล็ก หากโจทย์ถามมุมกลับ ให้นำมุมเล็กที่ได้ไปลบออกจาก $360^{\\circ}$*

**ตัวอย่างที่ 5** เวลา 14:40 น. เข็มสั้นกับเข็มยาวทำมุมกันกี่องศา?

<div class="flex justify-center my-6">
<svg viewBox="0 0 200 200" class="w-full max-w-[200px]" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="100" r="90" fill="#f8fafc" stroke="#94a3b8" stroke-width="4" />
    {/* Clock numbers */}
<text x="100" y="25" font-size="12" text-anchor="middle" fill="#64748b">12</text>
<text x="175" y="104" font-size="12" text-anchor="middle" fill="#64748b">3</text>
<text x="100" y="180" font-size="12" text-anchor="middle" fill="#64748b">6</text>
<text x="25" y="104" font-size="12" text-anchor="middle" fill="#64748b">9</text>
    {/* 14:40 Hands */}
    {/* center point */}
<circle cx="100" cy="100" r="4" fill="#334155" />
<g transform="translate(100, 100)">
      {/* 40 min = 240 deg */}
<line x1="0" y1="0" x2="-60" y2="34.64" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
      {/* 2 hours = 60 deg + 40/60*30 = 80 deg. x = 80sin(80) y = - cos(80)? Wait visually 80 deg from 12 is near 3 */}
      {/* Just draw roughly */}
<line x1="0" y1="0" x2="35" y2="-5" stroke="#334155" stroke-width="5" stroke-linecap="round" />
      {/* Arc for Angle */}
<path d="M 15 -2 A 20 20 0 0 1 -15 8" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="2,2"/>
</g>
<rect x="65" y="140" width="70" height="24" rx="4" fill="#1e293b" />
<text x="100" y="156" font-size="12" fill="#fff" text-anchor="middle">14:40</text>
</svg>
</div>

**วิธีทำ** 
H = 2 (เลข 14 คือบ่าย 2 เข็มสั้นชี้เลข 2), M = 40
$$
\\begin{aligned}
มุม &= |30(2) - 5.5(40)| \\\\
&= |60 - 220| \\\\
&= |-160| = 160^{\\circ} \\text{ (มุมเล็ก)}
\\end{aligned}
$$

**ตอบ** 160 องศา

---

### 4. ความน่าจะเป็น (Probability)
> $P(E) = \\frac{n(E)}{n(S)}$ หรือ $\\frac{เหตุการณ์ที่เราสนใจ}{เหตุการณ์ที่เป็นไปได้ทั้งหมด}$

**ตัวอย่างที่ 6** โยนเหรียญ 3 เหรียญ 1 ครั้ง จงหาความน่าจะเป็นที่ออกหัวอย่างน้อย 1 เหรียญ

**วิธีทำ** 
โยนเหรียญ 3 เหรียญ จำนวนแบบทั้งหมดที่อาจเกิดขึ้น $n(S) = 2 \\times 2 \\times 2 = 8$ แบบ
(หัวอย่างน้อย 1 เหรียญ คิดง่ายๆ คือเอาแบบทั้งหมดลบด้วยโอกาสที่จะ **ไม่ออกหัวเลย**)
ไม่ออกหัวเลย คือ ออก "ก้อย-ก้อย-ก้อย" มีอยู่ 1 วิธี (ก้อยล้วน)
ดังนั้น ออกหัวอย่างน้อย 1 เหรียญจึงมี $8 - 1 = 7$ แบบ
$$
\\begin{aligned}
P &= \\frac{7}{8}
\\end{aligned}
$$

**ตอบ** $\\frac{7}{8}$

**ตัวอย่างที่ 7** กล่องใบหนึ่งมีลูกบอลสีแดง 5 ลูก สีขาว 3 ลูก สุ่มหยิบ 1 ลูก โอกาสได้สีแดงคือเท่าใด?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 150" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="150" fill="#fef2f2" rx="10" />
<path d="M 100 130 L 70 50 L 230 50 L 200 130 Z" fill="#fff" stroke="#cbd5e1" stroke-width="3" />
<path d="M 60 50 L 240 50" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
    {/* Red balls */}
<circle cx="105" cy="115" r="10" fill="#ef4444" />
<circle cx="130" cy="110" r="10" fill="#ef4444" />
<circle cx="160" cy="115" r="10" fill="#ef4444" />
<circle cx="185" cy="112" r="10" fill="#ef4444" />
<circle cx="145" cy="95" r="10" fill="#ef4444" />
    {/* White balls */}
<circle cx="115" cy="90" r="10" fill="#fff" stroke="#cbd5e1" />
<circle cx="170" cy="95" r="10" fill="#fff" stroke="#cbd5e1" />
<circle cx="140" cy="75" r="10" fill="#fff" stroke="#cbd5e1" />
<path d="M 140 75 Q 160 30 230 30" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#hand-arr)" />
<rect x="235" y="15" width="30" height="30" rx="15" fill="#ef4444" />
<text x="250" y="35" font-size="18" fill="#fff" text-anchor="middle">?</text>
<text x="150" y="145" font-size="12" fill="#64748b" text-anchor="middle">รวม n(S) = 8 ลูก</text>
<defs>
<marker id="hand-arr" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
</marker>
</defs>
</svg>
</div>

**วิธีทำ** 
ลูกบอลทั้งหมด $= 5 + 3 = 8$ ลูก ($n(S) = 8$)
ลูกบอลสีแดงมี 5 ลูก ($n(E) = 5$)
ดังนั้น ความน่าจะเป็น $= \\frac{5}{8}$

**ตอบ** $\\frac{5}{8}$

<div class="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
#### 🌟 เพิ่มเติม: ฝึกโจทย์สถิติ ความน่าจะเป็น ฯลฯ (ระดับ ง่าย-กลาง-ยาก)

**ตัวอย่างเสริม 1 (ง่าย):** ข้อมูลชุดหนึ่งประกอบด้วย 4, 7, 7, 9, 13 จงหาฐานนิยมและมัธยฐาน

**วิธีทำ** 
ข้อมูลเรียงแล้วคือ 4, 7, 7, 9, 13
ฐานนิยม (ตัวซ้ำ) = 7
มัธยฐาน (ตัวตรงกลางของ 5 ตัว) คือตำแหน่งที่ 3 = 7

**ตอบ** ฐานนิยม 7, มัธยฐาน 7

**ตัวอย่างเสริม 2 (ง่าย):** โยนลูกเต๋า 1 ลูก 1 ครั้ง จงหาความน่าจะเป็นที่ได้แต้มเป็นเลขคู่

**วิธีทำ** 
ลูกเต๋ามี 6 หน้า $n(S) = 6$
แต้มคู่มี 2, 4, 6 รวม 3 แบบ $n(E) = 3$
$$
\\begin{aligned}
P &= \\frac{n(E)}{n(S)} \\\\
&= \\frac{3}{6} = \\frac{1}{2}
\\end{aligned}
$$

**ตอบ** $\\frac{1}{2}$

**ตัวอย่างเสริม 3 (กลาง):** ในการประชุมมีผู้เข้าร่วม 15 คน ถ้าทุกคนต้องจับมือทักทายกันทุกคน จะมีการจับมือทั้งหมดกี่ครั้ง

**วิธีทำ** 
ใช้สูตรจับมือ $\\frac{n(n - 1)}{2}$
$$
\\begin{aligned}
ครั้ง &= \\frac{15(15 - 1)}{2} \\\\
&= \\frac{15(14)}{2} \\\\
&= 15 \\times 7 \\\\
&= 105 \\text{ ครั้ง}
\\end{aligned}
$$

**ตอบ** 105 ครั้ง

**ตัวอย่างเสริม 4 (ยาก):** ค่าเฉลี่ยเลขคณิตของข้อมูลชุดหนึ่งที่มี 8 จำนวน เท่ากับ 12 ต่อมาปรากฏว่าอ่านค่าผิดไป 1 จำนวน คืออ่านข้อมูล 10 เป็น 18 จงหาค่าเฉลี่ยเลขคณิตที่ถูกต้อง

**วิธีทำ** 
ผลรวมที่ผิดๆ = $8 \\times 12 = 96$
ค่าที่อ่านผิดคือ 18 ค่าที่ถูกคือ 10 (แปลว่าถูกบวกเกินไป 8)
ผลรวมที่ถูกต้อง = $96 - 8 = 88$
ค่าเฉลี่ยใหม่ (ที่ถูกต้อง) = $\\frac{88}{8} = 11$

**ตอบ** 11
</div>
`;
