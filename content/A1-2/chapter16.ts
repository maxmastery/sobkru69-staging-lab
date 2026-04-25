export const CHAPTER_16_SHADED_AREA = `
# 3. การหาพื้นที่แรเงาและพื้นที่ซับซ้อน

หัวข้อการหาพื้นที่แรเงามักออกสอบอย่างสม่ำเสมอ หลักการและเครื่องมือในการไขปริศนาเรื่องนี้มีจำกัดเพียงไม่กี่วิธี หากเราเข้าใจหลักการเหล่านี้ จะสามารถทำโจทย์ได้ทุกรูปแบบ

## หลักการหลักๆ ในการทำโจทย์พื้นที่แรเงา

**1. หาพื้นที่แผ่นใหญ่ แล้วลบด้วยพื้นที่สีขาว (ส่วนที่ไม่ต้องการ)**
นี่คือวิธีมาตรฐานที่สุด
$$ \\text{พื้นที่แรเงา} = \\text{พื้นที่รูปแผ่นใหญ่ทั้งหมด} - \\text{พื้นที่ส่วนว่าง (สีขาว)} $$

**2. การตัดแปะจิ๊กซอว์ / การเลื่อนรูป**
บางครั้งรูปแรเงาแยกกัน หรือดูเป็นรูปที่คำนวณสูตรไม่ได้ ให้ลองลากเส้นสมมติ หรือแบ่งชิ้นส่วนที่มี แล้วสลับเอาไปเติมในส่วนที่เว้าแหว่ง บางครั้งมันจะประกอบร่างกลายเป็นรูปเรขาคณิตธรรมดาๆ (เช่น สี่เหลี่ยม หรือ สามเหลี่ยมเต็มรูปพอดี)

**3. การเทียบสัดส่วน หรือ หาส่วนของพื้นที่**
หากมีการแบ่งด้านต่างๆ เท่าๆ กัน เราอาจใช้การนับช่อง เพื่อหาว่าส่วนที่แรเงาคิดเป็นกี่ส่วนจากทั้งหมด แล้วนำเศษส่วนนั้นไปคูณกับพื้นที่ทั้งหมด

---

## เทคนิคลัดรูปพิเศษ (สี่เหลี่ยมผืนผ้าและสามเหลี่ยมภายใน)

หากเจอโจทย์ที่มีรูป **สี่เหลี่ยมผืนผ้า** แล้วมีเส้นลากจากมุมล่างซ้ายและขวา ขึ้นไปตัดกันที่กึ่งกลางของกรอบด้านบน เกิดเป็นรูปสามเหลี่ยมที่อยู่ด้านในสุด แล้วโจทย์ถามหาพื้นที่แรเงาที่มีการแบ่งส่วนลากเส้นต่อไปยังจุดกึ่งกลางของด้านข้าง ดังรูป

<div class="flex justify-center my-6">
<svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="200" height="120" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
<path d="M20 140L120 20L220 140Z" fill="none" stroke="#64748B" stroke-width="2"/>
<path d="M20 140L120 80L220 140" fill="#CBD5E1"/>
<path d="M20 80L120 20L220 80" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 4"/>
<path d="M20 140L120 80L220 140Z" fill="#3B82F6" fill-opacity="0.6" stroke="#2563EB" stroke-width="2"/>
<text x="120" y="120" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">3/8</text>
<circle cx="120" cy="20" r="4" fill="#64748B"/>
<circle cx="20" cy="80" r="4" fill="#64748B"/>
<circle cx="220" cy="80" r="4" fill="#64748B"/>
<circle cx="120" cy="80" r="4" fill="#2563EB"/>
</svg>
</div>

*(จำลองลักษณะ: จุดยอดของสามเหลี่ยมอยู่กึ่งกลางด้านบน และมีเส้นลากกึ่งกลางด้านซ้ายขวาประกอบกันเกิดเป็นพื้นที่แรเงาภายในรูปสามเหลี่ยมใหญ่นั้น)*

**สูตรลัด:** หากแบ่งครึ่ง 2 ด้าน
$$ \\text{พื้นที่แรเงาบริเวณนั้น} = \\frac{3}{8} \\times \\text{พื้นที่สี่เหลี่ยมรูปใหญ่} $$

---

## ตัวอย่างโจทย์ (ระดับง่าย - กลาง - ยาก)

### ตัวอย่างที่ 1: ระดับง่าย (สี่เหลี่ยมและวงกลม)
รูปสี่เหลี่ยมจัตุรัสมีความยาวด้านละ 14 เซนติเมตร ภายในมีรูปวงกลมที่มีขนาดใหญ่ที่สุดบรรจุอยู่พอดี จงหาพื้นที่ส่วนที่แรเงาซึ่งอยู่นอกวงกลมแต่อยู่ภายในสี่เหลี่ยมจัตุรัส (กำหนด $\\pi = \\frac{22}{7}$)

<div class="flex justify-center my-6">
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- Square -->
<rect x="20" y="20" width="160" height="160" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
<!-- Circle in the center -->
<circle cx="100" cy="100" r="80" fill="#FFFFFF" stroke="#64748B" stroke-width="2"/>
<!-- Dimensions -->
<path d="M20 190 L180 190" stroke="#64748B" stroke-width="1" stroke-dasharray="4 4"/>
<text x="100" y="185" fill="#475569" font-size="14" text-anchor="middle">14 cm</text>
<path d="M10 20 L10 180" stroke="#64748B" stroke-width="1" stroke-dasharray="4 4"/>
<text x="-80" y="15" fill="#475569" font-size="14" transform="rotate(-90)" text-anchor="middle">14 cm</text>
</svg>
</div>

**วิธีทำ** 
$$
\\begin{aligned}
\\text{เป้าหมาย} &= \\text{พื้นที่สี่เหลี่ยมจัตุรัส} - \\text{พื้นที่วงกลม} \\\\
\\text{พื้นที่สี่เหลี่ยมจัตุรัส} &= \\text{ด้าน} \\times \\text{ด้าน} \\\\
&= 14 \\times 14 \\\\
&= 196 \\text{ ตร.ซม.} \\\\
\\\\
\\text{เส้นผ่านศูนย์กลางวงกลม} &= 14 \\text{ ซม.} \\\\
\\text{รัศมี } (r) &= \\frac{14}{2} = 7 \\text{ ซม.} \\\\
\\text{พื้นที่วงกลม} &= \\pi r^2 \\\\
&= \\frac{22}{7} \\times 7 \\times 7 \\\\
&= 154 \\text{ ตร.ซม.} \\\\
\\\\
\\text{พื้นที่แรเงา} &= 196 - 154 \\\\
&= \\mathbf{42 \\text{ ตร.ซม.}}
\\end{aligned}
$$

<br>

### ตัวอย่างที่ 2: ระดับกลาง (การเดินรอบสนามรูปเหลี่ยมต่างๆ)
สนามรูปสี่เหลี่ยมผืนผ้า กว้าง 90 เมตร ยาว 160 เมตร ถ้าสมรเดินรอบสนามนี้จำนวน 2 รอบ แล้วเปลี่ยนไปเดินรอบสนามรูปสี่เหลี่ยมจัตุรัสที่มีขนาดพื้นที่เท่ากับสนามรูปสี่เหลี่ยมผืนผ้าใบแรก อีก 1 รอบ สมรจะเดินได้ระยะทางทั้งหมดกี่เมตร? 

<div class="flex flex-col md:flex-row justify-center items-center gap-8 my-6">
<div class="flex flex-col items-center">
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="180" height="100" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
<path d="M15 15 L185 15 L185 105 L15 105 Z" fill="none" stroke="#2563EB" stroke-width="2" stroke-dasharray="4 4"/>
<text x="100" y="60" fill="#475569" font-size="14" text-anchor="middle">Area = X</text>
<text x="100" y="25" fill="#475569" font-size="12" text-anchor="middle">160m</text>
<text x="35" y="60" fill="#475569" font-size="12" text-anchor="middle">90m</text>
</svg>
<p class="text-sm text-slate-500 mt-2">สี่เหลี่ยมผืนผ้า (เดิน 2 รอบ)</p>
</div>
<div class="flex flex-col items-center">
<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="120" height="120" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
<path d="M15 15 L125 15 L125 125 L15 125 Z" fill="none" stroke="#2563EB" stroke-width="2" stroke-dasharray="4 4"/>
<text x="70" y="70" fill="#475569" font-size="14" text-anchor="middle">Area = X</text>
</svg>
<p class="text-sm text-slate-500 mt-2">สี่เหลี่ยมจัตุรัส (เดิน 1 รอบ)</p>
</div>
</div>

**วิธีทำ** 
$$
\\begin{aligned}
\\text{เส้นรอบรูปผืนผ้า (1 รอบ)} &= 2 \\times (\\text{กว้าง} + \\text{ยาว}) \\\\
&= 2 \\times (90 + 160) \\\\
&= 2 \\times 250 \\\\
&= 500 \\text{ เมตร} \\\\
\\text{เดิน 2 รอบ (ระยะทางชุดแรก)} &= 500 \\times 2 \\\\
&= 1,000 \\text{ เมตร} \\\\
\\\\
\\text{พื้นที่สนามจัตุรัส} &= \\text{พื้นที่สนามผืนผ้า} \\\\
&= 90 \\times 160 \\\\
&= 14,400 \\text{ ตร.ม.} \\\\
\\text{ด้านของจัตุรัส} &= \\sqrt{14,400} \\\\
&= 120 \\text{ เมตร} \\\\
\\text{เส้นรอบรูปจัตุรัส (เดิน 1 รอบ)} &= 4 \\times 120 \\\\
&= 480 \\text{ เมตร} \\\\
\\\\
\\text{ระยะทางรวมทั้งหมด} &= 1,000 + 480 \\\\
&= \\mathbf{1,480 \\text{ เมตร}}
\\end{aligned}
$$

<br>

### ตัวอย่างที่ 3: ระดับยาก (ประยุกต์ใช้สูตรลัด หรือ พื้นที่ใหญ่ลบพื้นที่ขาว)
สี่เหลี่ยมผืนผ้า กว้าง 16 หน่วย ยาว 20 หน่วย มีรูปแรเงาที่เกิดจากการลากเส้นจากมุมล่างซ้ายและขวา ขึ้นไปตัดกันที่กึ่งกลางของกรอบด้านบน เกิดเป็นรูปสามเหลี่ยมที่อยู่ด้านในสุด แล้วลากเส้นต่อไปยังจุดกึ่งกลางของด้านข้าง ดังรูปในสูตรลัดด้านบน จงหาพื้นที่ส่วนที่แรเงาในรูปนี้

<div class="flex justify-center my-6">
<svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="200" height="120" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
<path d="M20 140L120 20L220 140Z" fill="none" stroke="#64748B" stroke-width="2"/>
<path d="M20 140L120 80L220 140" fill="#CBD5E1"/>
<path d="M20 80L120 20L220 80" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 4"/>
<path d="M20 140L120 80L220 140Z" fill="#3B82F6" fill-opacity="0.6" stroke="#2563EB" stroke-width="2"/>
<circle cx="120" cy="20" r="4" fill="#64748B"/>
<circle cx="20" cy="80" r="4" fill="#64748B"/>
<circle cx="220" cy="80" r="4" fill="#64748B"/>
<path d="M20 150 L220 150" stroke="#64748B" stroke-width="1" stroke-dasharray="4 4"/>
<text x="120" y="155" fill="#475569" font-size="12" text-anchor="middle">ยาว 20</text>
<path d="M10 20 L10 140" stroke="#64748B" stroke-width="1" stroke-dasharray="4 4"/>
<text x="-70" y="15" fill="#475569" font-size="12" transform="rotate(-90)" text-anchor="middle">กว้าง 16</text>
</svg>
</div>

**วิธีทำ** 
$$
\\begin{aligned}
\\text{พื้นที่ผืนผ้ารูปใหญ่} &= \\text{กว้าง} \\times \\text{ยาว} \\\\
&= 16 \\times 20 \\\\
&= 320 \\text{ ตร.หน่วย} \\\\
\\\\
\\text{จากสูตรลัด พื้นที่แรเงา} &= \\frac{3}{8} \\times \\text{พื้นที่สี่เหลี่ยมรูปใหญ่} \\\\
&= \\frac{3}{8} \\times 320 \\\\
&= 3 \\times 40 \\\\
&= \\mathbf{120 \\text{ ตร.หน่วย}}
\\end{aligned}
$$
`;
