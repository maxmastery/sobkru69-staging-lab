export const CHAPTER_11_SPEED_GCD_LCM = `
# 11. ความเร็ว รถไฟ กระแสน้ำ และ ห.ร.ม. / ค.ร.น.

### 1. ความเร็ว ระยะทาง และเวลา
> **สูตรรักษาการ:** $V = \\frac{S}{T}$ (ความเร็ว = ระยะทาง $\\div$ เวลา) หรือ
> ระยะทาง (S) = ความเร็ว (V) $\\times$ เวลา (T)

**1.1 รถไฟ (มีเรื่องความยาวตัวรถมาเกี่ยว):**
เวลาที่ใช้แล่นผ่านด่าน / สิ่งของยาวๆ = $\\frac{ระยะทาง (ยาวรวมกัน)}{ความเร็ว}$
*   แล่นตามกัน: $V_{ลัพธ์} = V_{มาก} - V_{น้อย}$
*   แล่นสวนกัน: $V_{ลัพธ์} = V_{1} + V_{2}$

**1.2 ความเร็วเรือต่อน้ำ (กระแสน้ำ):**
*   ความเร็วเรือในน้ำนิ่ง $= x$
*   ความเร็วกระแสน้ำ $= y$
*   ความเร็วล่องตามน้ำ $= x + y$
*   ความเร็วต้าน/ทวนน้ำ $= x - y$

**ตัวอย่างที่ 1** ชายคนหนึ่งล่องเรือตามน้ำระยะทาง 60 กม. ใช้เวลา 3 ชม. และพายเรือทวนน้ำระยะทางเท่ากันกลับบ้านใช้เวลา 5 ชม. จงหาความเร็วของกระแสน้ำ

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 150" class="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="150" fill="#f0f9ff" rx="10" />
<path d="M 50 100 Q 150 120 250 100 T 400 100" fill="none" stroke="#60a5fa" stroke-width="8" stroke-opacity="0.5" />
<path d="M 0 120 Q 100 140 200 120 T 350 120" fill="none" stroke="#3b82f6" stroke-width="6" stroke-opacity="0.6" />
<path d="M 100 80 L 140 80 L 150 60 L 110 60 Z" fill="#fcd34d" />
<polygon points="120,60 140,60 140,40" fill="#fbbf24" />
<path d="M 155 70 L 180 70" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-ch11-1)" />
<text x="125" y="30" font-size="12" text-anchor="middle" fill="#92400e" font-weight="bold">ตามน้ำ 3 ชม.</text>
<path d="M 300 80 L 260 80 L 250 60 L 290 60 Z" fill="#fca5a5" />
<polygon points="280,60 260,60 260,40" fill="#f87171" />
<path d="M 245 70 L 220 70" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-left-ch11-1)" />
<text x="275" y="30" font-size="12" text-anchor="middle" fill="#991b1b" font-weight="bold">ทวนน้ำ 5 ชม.</text>
<text x="200" y="145" font-size="12" text-anchor="middle" fill="#1e3a8a">ระยะทาง 60 กม.</text>
<defs>
<marker id="arrow-ch11-1" viewBox="0 0 10 10" refX="5" refY="5" marker-width="5" marker-height="5" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
</marker>
<marker id="arrow-left-ch11-1" viewBox="0 0 10 10" refX="5" refY="5" marker-width="5" marker-height="5" orient="auto-start-reverse">
<path d="M 10 0 L 0 5 L 10 10 z" fill="#dc2626" />
</marker>
</defs>
</svg>
</div>

**วิธีทำ** 
ความเร็วตามน้ำ: $V_{ตาม} = \\frac{60}{3} = 20$ กม./ชม. $\\rightarrow x + y = 20$
ความเร็วทวนน้ำ: $V_{ทวน} = \\frac{60}{5} = 12$ กม./ชม. $\\rightarrow x - y = 12$
แก้สมการหากระแสน้ำ ($y$): นำสมการมาลบกัน
$$
\\begin{aligned}
(x+y) - (x-y) &= 20 - 12 \\\\
2y &= 8 \\\\
y &= 4 \\text{ กม./ชม.}
\\end{aligned}
$$

**ตอบ** 4 กม./ชม.

**ตัวอย่างที่ 2** ขับรถ 300 กม. ตอนครึ่งทางแรกขับด้วยความเร็ว 100 กม./ชม. ครึ่งทางหลังขับด้วยความเร็ว 75 กม./ชม. ใช้เวลารวมกี่ชั่วโมง

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 120" class="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="120" fill="#f8fafc" rx="10" stroke="#e2e8f0" />
<line x1="50" y1="60" x2="350" y2="60" stroke="#94a3b8" stroke-width="4" />
<circle cx="50" cy="60" r="6" fill="#3b82f6" />
<circle cx="200" cy="60" r="6" fill="#f59e0b" />
<circle cx="350" cy="60" r="6" fill="#ef4444" />
<text x="50" y="85" font-size="12" text-anchor="middle" fill="#64748b">จุดเริ่มต้น</text>
<text x="200" y="85" font-size="12" text-anchor="middle" fill="#64748b">ครึ่งทาง (150 กม.)</text>
<text x="350" y="85" font-size="12" text-anchor="middle" fill="#64748b">ถึงที่หมาย (300 กม.)</text>
<path d="M 60 50 L 190 50" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-blue-ch11)" />
<text x="125" y="40" font-size="12" text-anchor="middle" fill="#1d4ed8" font-weight="bold">100 km/h</text>
<path d="M 210 50 L 340 50" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-red-ch11)" />
<text x="275" y="40" font-size="12" text-anchor="middle" fill="#b91c1c" font-weight="bold">75 km/h</text>
<defs>
<marker id="arrow-blue-ch11" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
</marker>
<marker id="arrow-red-ch11" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
</marker>
</defs>
</svg>
</div>

**วิธีทำ** 
ครึ่งทางแรก 150 กม. ใช้เวลา = $\\frac{150}{100} = 1.5$ ชั่วโมง
ครึ่งทางหลัง 150 กม. ใช้เวลา = $\\frac{150}{75} = 2$ ชั่วโมง
รวมเวลาทั้งหมด = $1.5 + 2 = 3.5$ ชั่วโมง

**ตอบ** 3.5 ชั่วโมง

---

### 2. ห.ร.ม. และ ค.ร.น.
*   **ห.ร.ม. (หารร่วมมาก):** ตัวหารที่เยอะที่สุดที่นำไปหารกลุ่มตัวเลขลงตัว
*   **ค.ร.น. (คูณร่วมน้อย):** ผลคูณที่น้อยที่สุดที่กลุ่มตัวเลขนำไปหารลงตัว

> **สมการสำคัญ:**  (ห.ร.ม. ของสองจำนวน) $\\times$ (ค.ร.น. ของสองจำนวน) = จำนวนที่ 1 $\\times$ จำนวนที่ 2

**เทคนิคการทำโจทย์ ห.ร.ม. / ค.ร.น. แบบมีเศษ (ออกสอบบ่อย!)**
*   **ห.ร.ม. แบบมีเศษ:** ให้เอาเศษไปลบออกจากตัวตั้งแต่ละตัวก่อน แล้วจึงหา ห.ร.ม. ทีเดียว
*   **ค.ร.น. แบบมีเศษ:** ให้หา ค.ร.น. ของกลุ่มตัวเลขให้จบก่อน แล้วค่อยนำเศษไปบวกทีหลัง

**ตัวอย่างที่ 3** จำนวนสองจำนวนมี ห.ร.ม. คือ 5 และ ค.ร.น. คือ 150 ถ้าจำนวนหนึ่งคือ 25 อีกจำนวนคืออะไร?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 100" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="100" fill="#fdf2f8" rx="8" stroke="#fbcfe8" />
<text x="175" y="35" font-size="16" text-anchor="middle" fill="#831843" font-weight="bold">ห.ร.ม. × ค.ร.น. = เลข 1 × เลข 2</text>
<rect x="30" y="55" width="60" height="30" rx="4" fill="#f472b6" />
<text x="60" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">5</text>
<text x="105" y="75" font-size="14" text-anchor="middle" fill="#be185d" font-weight="bold">×</text>
<rect x="120" y="55" width="60" height="30" rx="4" fill="#fb7185" />
<text x="150" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">150</text>
<text x="195" y="75" font-size="14" text-anchor="middle" fill="#be185d" font-weight="bold">=</text>
<rect x="210" y="55" width="60" height="30" rx="4" fill="#38bdf8" />
<text x="240" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">25</text>
<text x="285" y="75" font-size="14" text-anchor="middle" fill="#be185d" font-weight="bold">×</text>
<rect x="300" y="55" width="40" height="30" rx="4" fill="#fbbf24" stroke="#f59e0b" stroke-dasharray="2,2"/>
<text x="320" y="75" font-size="14" text-anchor="middle" fill="#b45309" font-weight="bold">Y</text>
</svg>
</div>

**วิธีทำ** 
จากสูตร: ห.ร.ม. $\\times$ ค.ร.น. = $X \\times Y$
$$
\\begin{aligned}
5 \\times 150 &= 25 \\times Y \\\\
750 &= 25Y \\\\
Y &= \\frac{750}{25} \\\\
Y &= 30
\\end{aligned}
$$

**ตอบ** 30

**ตัวอย่างที่ 4** จงหาเลขที่มากที่สุดที่นำไปหาร 45 และ 81 แล้วเหลือเศษ 3 เท่ากัน?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 120" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="120" fill="#ecfdf5" rx="8" />
<text x="175" y="25" font-size="14" text-anchor="middle" fill="#065f46" font-weight="bold">มากที่สุด -> ห.ร.ม. (ลบเศษก่อน)</text>
<rect x="50" y="40" width="80" height="30" rx="4" fill="#34d399" />
<text x="90" y="60" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">45 - 3 = 42</text>
<rect x="220" y="40" width="80" height="30" rx="4" fill="#10b981" />
<text x="260" y="60" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">81 - 3 = 78</text>
<path d="M 90 70 L 175 100" stroke="#059669" stroke-width="2" marker-end="url(#arr-green-ch11)" />
<path d="M 260 70 L 175 100" stroke="#059669" stroke-width="2" marker-end="url(#arr-green-ch11)" />
<circle cx="175" cy="100" r="15" fill="#fcd34d" />
<text x="175" y="105" font-size="14" text-anchor="middle" fill="#b45309" font-weight="bold">6</text>
<defs>
<marker id="arr-green-ch11" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
</marker>
</defs>
</svg>
</div>

**วิธีทำ** 
คำว่า "หาร..แล้วเหลือเศษ" แล้วหาเลขมากที่สุด ชี้เป้าว่าคือ ห.ร.ม.
มีเศษ เอาเศษไปลบก่อน: $45 - 3 = 42$ และ $81 - 3 = 78$
จากนั้นหา ห.ร.ม. ของ 42 และ 78
2 ) 42 , 78
3 ) 21 , 39
<br/>7  , 13 (ทำต่อไม่ได้แล้ว)
ห.ร.ม. คือ $2 \\times 3 = 6$

**ตอบ** 6

**ตัวอย่างที่ 5** จงหาเลขที่น้อยที่สุดที่หารด้วย 4, 6 และ 8 แล้วเหลือเศษ 2 เสมอ?

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 120" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="120" fill="#fffbeb" rx="8" />
<text x="175" y="25" font-size="14" text-anchor="middle" fill="#92400e" font-weight="bold">น้อยที่สุด -> ค.ร.น. (บวกเศษทีหลัง)</text>
<circle cx="100" cy="50" r="15" fill="#fbbf24" /><text x="100" y="55" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">4</text>
<circle cx="175" cy="50" r="15" fill="#fbbf24" /><text x="175" y="55" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">6</text>
<circle cx="250" cy="50" r="15" fill="#fbbf24" /><text x="250" y="55" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">8</text>
<path d="M 100 70 L 175 90 M 175 65 L 175 90 M 250 70 L 175 90" stroke="#d97706" stroke-width="2" />
<rect x="135" y="90" width="80" height="25" rx="4" fill="#f59e0b" />
<text x="175" y="107" font-size="12" text-anchor="middle" fill="#fff" font-weight="bold">24 + 2 = 26</text>
</svg>
</div>

**วิธีทำ** 
คำว่า "หารด้วย..แล้วเหลือเศษ" แล้วหาเลขที่น้อยที่สุด ชี้เป้าว่าคือ ค.ร.น.
หา ค.ร.น. ปกติก่อน: ค.ร.น. ของ 4, 6 และ 8 คือ 24
เอาเศษมาบวกตอนท้าย: $24 + 2 = 26$

**ตอบ** 26

<div class="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
#### 🌟 เพิ่มเติม: ฝึกโจทย์ความเร็ว และ ห.ร.ม/ค.ร.น. (ระดับ ง่าย-กลาง-ยาก)

**ตัวอย่างเสริม 1 (ง่าย):** รถยนต์คันหนึ่งวิ่งด้วยความเร็วคงที่ 80 กม./ชม. เป็นเวลา 2 ชั่วโมง 30 นาที รถคันนี้วิ่งได้ระยะทางเท่าใด

**วิธีทำ** 
2 ชั่วโมง 30 นาที = 2.5 ชั่วโมง
จากสูตร ระยะทาง = ความเร็ว $x$ เวลา
$$
\\begin{aligned}
S &= 80 \\times 2.5 \\\\
S &= 200 \\text{ กม.}
\\end{aligned}
$$

**ตอบ** 200 กม.

**ตัวอย่างเสริม 2 (ง่าย):** ห.ร.ม. และ ค.ร.น. ของจำนวนสองจำนวนคือ 4 และ 24 ตามลำดับ ถ้าจำนวนแรกคือ 8 จำนวนที่สองคือเท่าไร?

**วิธีทำ** 
เข้าสูตร: ห.ร.ม. $\\times$ ค.ร.น. = จำนวนแรก $\\times$ จำนวนที่สอง
$$
\\begin{aligned}
4 \\times 24 &= 8 \\times Y \\\\
96 &= 8Y \\\\
Y &= \\frac{96}{8} \\\\
Y &= 12
\\end{aligned}
$$

**ตอบ** 12

**ตัวอย่างเสริม 3 (กลาง):** รถไฟขบวนหนึ่งยาว 100 เมตร แล่นด้วยความเร็ว 72 กม./ชม. จะต้องใช้เวลาเท่าไรในการแล่นผ่านเสาไฟฟ้า 1 ต้น

**วิธีทำ** 
เปลี่ยนหน่วย กม./ชม. เป็น เมตร/วินาที โดยคูณ $\\frac{5}{18}$
ความเร็ว $V = 72 \\times \\frac{5}{18} = 20$ เมตร/วินาที
แล่นผ่านเสาไฟฟ้า ใช้ระยะทางเท่ากับความยาวรถไฟ = 100 เมตร
$$
\\begin{aligned}
เวลา (T) &= \\frac{S}{V} \\\\
&= \\frac{100}{20} \\\\
&= 5 \\text{ วินาที}
\\end{aligned}
$$

**ตอบ** 5 วินาที

**ตัวอย่างเสริม 4 (ยาก):** เรือลำหนึ่งพายทวนน้ำจากจุด A ไปจุด B ระยะทาง 48 กม. ใช้เวลา 6 ชั่วโมง ถ้าความเร็วของกระแสน้ำคือ 2 กม./ชม. เรือลำนี้จะพายตามน้ำกลับจาก B ไป A ใช้เวลาเท่าใด?

**วิธีทำ** 
หาความเร็วทวนน้ำก่อน: $V_{ทวน} = \\frac{48}{6} = 8$ กม./ชม.
จากสูตร $V_{ทวน} = x - y$ (เมื่อ $x$ คือความเร็วเรือน้ำนิ่ง, $y$ คือน้ำ = 2)
$$
\\begin{aligned}
8 &= x - 2 \\\\
x &= 10 \\text{ กม./ชม.}
\\end{aligned}
$$
หาความเร็วตามน้ำ: $V_{ตาม} = x + y = 10 + 2 = 12$ กม./ชม.
หาเวลาขากลับ: $T = \\frac{S}{V_{ตาม}}$
$$
\\begin{aligned}
T &= \\frac{48}{12} \\\\
&= 4 \\text{ ชั่วโมง}
\\end{aligned}
$$

**ตอบ** 4 ชั่วโมง
</div>
`;
