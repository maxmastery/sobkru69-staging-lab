export const CHAPTER_1_CONSECUTIVE_NUMBERS = `
# 1. จำนวนเรียงกัน

การหาจำนวนโดยพิจารณาจากค่ากลาง ผลบวกและผลต่าง ในกรณีที่ข้อสอบกำหนดผลรวมทั้งหมดให้ แล้วให้หาเทอมต่างๆ เพื่อให้ได้คำตอบที่รวดเร็ว

### 1.1 กรณีกำหนดผลรวมทั้งหมดให้
> **สูตร:** เลขจำนวนกลาง = ผลบวกของเลขทุกจำนวน / จำนวนเทอม (ตัว)

**ตัวอย่างที่ 1** เลขคู่ 6 จำนวนเรียงกัน รวมกันได้ 210 จงหาจำนวนที่น้อยที่สุด

<div class="flex justify-center my-6">
<svg width="300" height="80" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<rect x="55" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<rect x="100" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<rect x="160" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<rect x="205" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<rect x="250" y="25" width="40" height="30" rx="4" fill="#E2E8F0"/>
<text x="150" y="45" fill="#EF4444" font-size="16" font-weight="bold" text-anchor="middle">35</text>
<path d="M150 20 L150 60" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 2"/>
<text x="150" y="15" fill="#64748B" font-size="12" text-anchor="middle">ค่ากลาง</text>
</svg>
</div>

**วิธีทำ** 
หาค่ากลางก่อน
$$
\\begin{aligned}
\\text{กลาง} &= \\frac{210}{6} \\\\
\\text{กลาง} &= 35
\\end{aligned}
$$
*วิเคราะห์ค่ากลาง:* ค่ากลางคือ 35 แต่โจทย์ต้องการ **เลขคู่** 6 จำนวน ให้กระจายตัวเลขคู่ไปทางซ้ายและขวาของ 35 ฝั่งละ 3 ตัว
ฝั่งซ้ายของ 35 (ลดลง): 34, 32, 30
ฝั่งขวาของ 35 (เพิ่มขึ้น): 36, 38, 40
ชุดตัวเลขคือ: [**30**], [32], [34], <span class="text-red-500">(35)</span>, [36], [38], [40]

**ตอบ** 30

### 1.2 กรณีกำหนดผลบวกจำนวนแรกและจำนวนสุดท้าย
> **สูตร:** เลขจำนวนกลาง = (ผลบวกของจำนวนแรกและจำนวนสุดท้าย) / 2

**ตัวอย่างที่ 2** เลข 9 จำนวนเรียงกันจากน้อยไปมาก มีผลรวมของจำนวนแรกและจำนวนสุดท้ายเป็น 150 จงหาจำนวนที่ 7

<div class="flex justify-center my-6">
<svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 50 Q 160 0 300 50" stroke="#3B82F6" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
<text x="160" y="20" fill="#3B82F6" font-size="14" text-anchor="middle">ผลรวม = 150</text>
<circle cx="20" cy="65" r="12" fill="#E2E8F0"/>
<text x="20" y="70" fill="#475569" font-size="12" text-anchor="middle">1</text>
<circle cx="55" cy="65" r="6" fill="#F1F5F9"/>
<circle cx="90" cy="65" r="6" fill="#F1F5F9"/>
<circle cx="125" cy="65" r="6" fill="#F1F5F9"/>
<circle cx="160" cy="65" r="15" fill="#EF4444" fill-opacity="0.2" stroke="#EF4444" stroke-width="2"/>
<text x="160" y="70" fill="#EF4444" font-size="12" text-anchor="middle">5</text>
<circle cx="195" cy="65" r="6" fill="#F1F5F9"/>
<circle cx="230" cy="65" r="12" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="2"/>
<text x="230" y="70" fill="#3B82F6" font-size="12" text-anchor="middle">7</text>
<circle cx="265" cy="65" r="6" fill="#F1F5F9"/>
<circle cx="300" cy="65" r="12" fill="#E2E8F0"/>
<text x="300" y="70" fill="#475569" font-size="12" text-anchor="middle">9</text>
<text x="160" y="95" fill="#EF4444" font-size="12" text-anchor="middle">ค่ากลาง = 75</text>
</svg>
</div>

**วิธีทำ** 
หาค่ากลาง
$$
\\begin{aligned}
\\text{กลาง} &= \\frac{150}{2} \\\\
\\text{กลาง} &= 75
\\end{aligned}
$$
*วิเคราะห์ค่ากลาง:* เลขเรียงกัน 9 จำนวน (ลำดับที่ 1 ถึง 9) ค่ากลางจะอยู่ลำดับที่ 5 ตรงกลางพอดี
จะได้ว่าลำดับที่ 5 คือ 75 (ลำดับที่: 5, 6, 7 $\\rightarrow$ ตัวเลข: [75], [76], **[77]**)

**ตอบ** 77

### 1.3 กรณีกำหนดผลบวกและผลต่างของจำนวน (ทำแค่ 1 ขั้น!)
> **สูตรหาจำนวนน้อย:** = (ผลบวก - ผลต่าง) / 2
> **สูตรหาจำนวนมาก:** = (ผลบวก + ผลต่าง) / 2

**ตัวอย่างที่ 3** เลข 2 จำนวน มีผลรวมเป็น 120 มีผลต่างเป็น 40 จงหาผลคูณของจำนวนทั้งสอง

<div class="flex justify-center my-6">
<svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="80" height="80" rx="8" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>
<rect x="140" y="40" width="80" height="60" rx="8" fill="#FCE7F3" stroke="#EC4899" stroke-width="2"/>
<text x="60" y="65" fill="#1E3A8A" font-size="16" font-weight="bold" text-anchor="middle">x</text>
<text x="180" y="75" fill="#831843" font-size="16" font-weight="bold" text-anchor="middle">y</text>
<path d="M100 60 L140 60" stroke="#64748B" stroke-width="2" stroke-dasharray="2 2"/>
<text x="120" y="55" fill="#475569" font-size="14" text-anchor="middle">+</text>
<text x="120" y="90" fill="#475569" font-size="12" text-anchor="middle">รวม=120</text>
</svg>
</div>

**วิธีทำ** 
ใช้สูตรหาจำนวนมากและน้อย
$$
\\begin{aligned}
\\text{จำนวนมาก} &= \\frac{120 + 40}{2} \\\\
&= \\frac{160}{2} = 80 \\\\
\\text{จำนวนน้อย} &= \\frac{120 - 40}{2} \\\\
&= \\frac{80}{2} = 40
\\end{aligned}
$$
*ตรวจสอบ:* 80 + 40 = 120 และ 80 - 40 = 40 (ถูกต้อง)
สิ่งที่โจทย์ถามคือผลคูณ จะได้ $80 \\times 40 = 3200$

**ตอบ** 3,200

<div class="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
#### 🌟 เพิ่มเติม: ฝึกโจทย์จำนวนเรียงกันและสมการ (ระดับ ง่าย-กลาง-ยาก)

**ตัวอย่างเสริม 1 (ง่าย):** เลข 5 จำนวนเรียงกันรวมกันได้ 100 จงหาตัวเลขที่มากที่สุด

<div class="flex justify-center my-4">
<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="10" fill="#CBD5E1"/>
<circle cx="60" cy="20" r="10" fill="#CBD5E1"/>
<circle cx="100" cy="20" r="15" fill="#F59E0B"/>
<circle cx="140" cy="20" r="10" fill="#CBD5E1"/>
<circle cx="180" cy="20" r="10" fill="#3B82F6"/>
<text x="100" y="24" fill="#FFFFFF" font-size="10" text-anchor="middle">20</text>
<text x="180" y="24" fill="#FFFFFF" font-size="10" text-anchor="middle">?</text>
</svg>
</div>

**วิธีทำ** 
อยู่ในรูปแบบ 1.1 หากลางโดยนำผลรวมหารด้วยจำนวนตัว
$$
\\begin{aligned}
\\text{กลาง} &= \\frac{100}{5} \\\\
\\text{กลาง} &= 20
\\end{aligned}
$$
แสดงว่าตัวกลาง (ตัวที่ 3) คือ 20 ซึ่งก็จะได้ชุดตัวเลขคือ 18, 19, 20, 21, 22

**ตอบ** ตัวเลขที่มากที่สุดคือ 22

**ตัวอย่างเสริม 2 (ง่าย):** ผลบวกของจำนวนสองจำนวนคือ 50 ผลต่างของจำนวนสองจำนวนคือ 10 จงหาจำนวนที่น้อยกว่า

<div class="flex justify-center my-4">
<svg width="150" height="60" viewBox="0 0 150 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="60" height="40" rx="4" fill="#E2E8F0"/>
<rect x="80" y="10" width="60" height="40" rx="4" fill="#E2E8F0"/>
<text x="75" y="35" fill="#64748B" font-size="16" text-anchor="middle">-</text>
<text x="120" y="35" fill="#475569" font-size="12" text-anchor="middle">10</text>
<text x="40" y="35" fill="#475569" font-size="12" text-anchor="middle">x</text>
</svg>
</div>

**วิธีทำ** 
$$
\\begin{aligned}
\\text{จำนวนน้อย} &= \\frac{50 - 10}{2} \\\\
&= \\frac{40}{2} \\\\
&= 20
\\end{aligned}
$$

**ตอบ** จำนวนน้อยคือ 20

**ตัวอย่างเสริม 3 (กลาง):** จำนวนคี่ 4 จำนวนเรียงกันจากน้อยไปมาก มีผลรวมของจำนวนแรกกับจำนวนสุดท้ายเป็น 46 จงหาผลคูณของจำนวนที่ 2 กับจำนวนที่ 3

<div class="flex justify-center my-4">
<svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 30 Q 100 0 180 30" stroke="#3B82F6" stroke-width="2" fill="none" stroke-dasharray="2 2"/>
<text x="100" y="15" fill="#3B82F6" font-size="12" text-anchor="middle">รวม 46</text>
<circle cx="20" cy="40" r="10" fill="#E2E8F0"/>
<circle cx="73" cy="40" r="10" fill="#FCD34D"/>
<circle cx="126" cy="40" r="10" fill="#FCD34D"/>
<circle cx="180" cy="40" r="10" fill="#E2E8F0"/>
<text x="100" y="44" fill="#EF4444" font-size="12" text-anchor="middle">23</text>
</svg>
</div>

**วิธีทำ** 
ใช้สูตรหาค่ากลางจากตัวแรก+ตัวท้าย
$$
\\begin{aligned}
\\text{กลาง} &= \\frac{46}{2} \\\\
\\text{กลาง} &= 23
\\end{aligned}
$$
ค่ากลางคือ 23 แต่เลขเป็นจำนวนคี่ 4 ตัว (ไม่มีตัวตรงกลางเป๊ะ) 23 จึงแทรกอยู่ระหว่างตัวที่ 2 และตัวที่ 3
ดังนั้นตัวที่ 2 คือ 21 และตัวที่ 3 คือ 25 (ชุดเลข: 19, 21, 25, 27)
เป้าหมาย: หาผลคูณของตัวที่ 2 และ 3
$$21 \\times 25 = 525$$

**ตอบ** 525

**ตัวอย่างเสริม 4 (ยาก):** เลข 3 จำนวนเรียงกัน ผลรวมของจำนวนที่หนึ่งและที่สาม มากกว่าจำนวนที่สองอยู่ 15 จงหาเลขจำนวนที่น้อยที่สุด

<div class="flex justify-center my-4">
<svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="40" height="40" rx="4" fill="#DBEAFE"/>
<rect x="70" y="10" width="40" height="40" rx="4" fill="#FEE2E2"/>
<rect x="130" y="10" width="40" height="40" rx="4" fill="#DBEAFE"/>
<text x="30" y="35" fill="#1E3A8A" font-size="12" text-anchor="middle">n</text>
<text x="90" y="35" fill="#991B1B" font-size="12" text-anchor="middle">n+1</text>
<text x="150" y="35" fill="#1E3A8A" font-size="12" text-anchor="middle">n+2</text>
</svg>
</div>

**วิธีทำ** 
สมมติให้เลขเรียงกันคือ $x, x+1, x+2$
ตามเงื่อนไข: ผลรวมตัวที่ 1 และ 3 คือ $x + (x + 2)$  มากกว่าตัวที่ 2 ($x+1$) อยู่ 15
ตั้งสมการ:
$$
\\begin{aligned}
(x + x + 2) - (x + 1) &= 15 \\\\
2x + 2 - x - 1 &= 15 \\\\
x + 1 &= 15 \\\\
x &= 14
\\end{aligned}
$$
จำนวนที่น้อยที่สุดคือ $x$ ซึ่งก็คือ 14

**ตอบ** 14
</div>
`;
