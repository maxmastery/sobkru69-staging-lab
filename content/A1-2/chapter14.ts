export const CHAPTER_14_AREA_PERIMETER = `
# 1. การหาพื้นที่และเส้นรอบรูป

การหาพื้นที่และเส้นรอบรูปของรูปเรขาคณิตสองมิติเป็นพื้นฐานสำคัญที่นำไปประยุกต์ใช้ในการแก้โจทย์คณิตศาสตร์และปัญหาในชีวิตประจำวัน

## 1.1 พื้นที่รูปสามเหลี่ยม

<div class="flex justify-center my-6">
<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 20L180 130H20L100 20Z" fill="#E0E7FF" stroke="#4F46E5" stroke-width="3" stroke-linejoin="round"/>
<path d="M100 20V130" stroke="#4F46E5" stroke-width="2" stroke-dasharray="5 5"/>
<text x="110" y="80" fill="#4F46E5" font-family="sans-serif" font-size="14">สูง (h)</text>
<text x="100" y="145" fill="#4F46E5" font-family="sans-serif" font-size="14" text-anchor="middle">ฐาน (b)</text>
<rect x="100" y="120" width="10" height="10" fill="none" stroke="#4F46E5" stroke-width="1.5"/>
</svg>
</div>

สูตรการหาพื้นที่สามเหลี่ยมขึ้นอยู่กับข้อมูลที่โจทย์กำหนดให้ โดยทั่วไปจะใช้สูตรพื้นฐานดังนี้:

*   **พื้นที่ $\\Delta$ ใดๆ** = $\\frac{1}{2} \\times \\text{ฐาน} \\times \\text{สูง}$
*   **พื้นที่ $\\Delta$ ด้านเท่า** = $\\frac{\\sqrt{3}}{4} \\times (\\text{ด้าน})^2$

---

## 1.2 พื้นที่รูปสี่เหลี่ยมแบบต่างๆ

### 1. สี่เหลี่ยมมุมฉาก

<div class="flex flex-col sm:flex-row justify-center gap-8 my-6">
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="25" y="25" width="100" height="100" fill="#FEF08A" stroke="#CA8A04" stroke-width="3"/>
<path d="M25 25L125 125M125 25L25 125" stroke="#CA8A04" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="75" y="140" fill="#CA8A04" font-family="sans-serif" font-size="12" text-anchor="middle">ด้าน x ด้าน</text>
<rect x="25" y="25" width="10" height="10" fill="none" stroke="#CA8A04" stroke-width="1.5"/>
</svg>
<span class="text-sm text-yellow-700 mt-2 font-bold">สี่เหลี่ยมจัตุรัส</span>
</div>
<div class="flex flex-col items-center">
<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="40" width="160" height="70" fill="#BBF7D0" stroke="#16A34A" stroke-width="3"/>
<text x="100" y="130" fill="#16A34A" font-family="sans-serif" font-size="12" text-anchor="middle">ยาว</text>
<text x="10" y="80" fill="#16A34A" font-family="sans-serif" font-size="12" text-anchor="middle" transform="rotate(-90 10 80)">กว้าง</text>
<rect x="20" y="40" width="10" height="10" fill="none" stroke="#16A34A" stroke-width="1.5"/>
</svg>
<span class="text-sm text-green-700 mt-2 font-bold">สี่เหลี่ยมผืนผ้า</span>
</div>
</div>

*   **พื้นที่สี่เหลี่ยมจัตุรัส** = $\\text{ด้าน} \\times \\text{ด้าน}$ หรือ $\\frac{1}{2} \\times (\\text{เส้นทแยงมุม})^2$
*   **พื้นที่สี่เหลี่ยมผืนผ้า** = $\\text{กว้าง} \\times \\text{ยาว}$

### 2. สี่เหลี่ยมด้านขนานและขนมเปียกปูน

<div class="flex flex-col sm:flex-row justify-center gap-8 my-6">
<div class="flex flex-col items-center">
<svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 90L160 90L140 30L20 30Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 90L40 30" stroke="#2563EB" stroke-width="2" stroke-dasharray="4 4"/>
<text x="35" y="65" fill="#2563EB" font-family="sans-serif" font-size="12" text-anchor="end">สูง</text>
<text x="100" y="105" fill="#2563EB" font-family="sans-serif" font-size="12" text-anchor="middle">ฐาน</text>
<rect x="40" y="80" width="10" height="10" fill="none" stroke="#2563EB" stroke-width="1.5"/>
</svg>
<span class="text-sm text-blue-700 mt-2 font-bold">สี่เหลี่ยมด้านขนาน</span>
</div>
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M75 20L130 75L75 130L20 75Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="3" stroke-linejoin="round"/>
<path d="M75 20L75 130M20 75L130 75" stroke="#DB2777" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="95" y="65" fill="#DB2777" font-family="sans-serif" font-size="10">เส้นทแยงมุม</text>
<rect x="75" y="75" width="8" height="8" fill="none" stroke="#DB2777" stroke-width="1.5"/>
</svg>
<span class="text-sm text-pink-700 mt-2 font-bold">สี่เหลี่ยมขนมเปียกปูน</span>
</div>
</div>

*   **พื้นที่สี่เหลี่ยมด้านขนาน** = \$\\text{ฐาน} \\times \\text{สูง}\$
*   **พื้นที่สี่เหลี่ยมขนมเปียกปูน** = \$\\text{ฐาน} \\times \\text{สูง}\$ หรือ \$\\frac{1}{2} \\times \\text{ผลคูณของเส้นทแยงมุม}\$

### 3. สี่เหลี่ยมคางหมู ว่าว และด้านไม่เท่า

<div class="flex flex-col sm:flex-row justify-center gap-6 my-6 flex-wrap">
<div class="flex flex-col items-center">
<svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 30L110 30L140 100L10 100Z" fill="#F3E8FF" stroke="#9333EA" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 30L40 100" stroke="#9333EA" stroke-width="2" stroke-dasharray="4 4"/>
<rect x="40" y="90" width="10" height="10" fill="none" stroke="#9333EA" stroke-width="1.5"/>
<text x="75" y="25" fill="#9333EA" font-family="sans-serif" font-size="10" text-anchor="middle">คู่ขนาน</text>
<text x="75" y="115" fill="#9333EA" font-family="sans-serif" font-size="10" text-anchor="middle">คู่ขนาน</text>
<text x="35" y="70" fill="#9333EA" font-family="sans-serif" font-size="10" text-anchor="end">สูง</text>
</svg>
<span class="text-sm text-purple-700 mt-2 font-bold">สี่เหลี่ยมคางหมู</span>
</div>
<div class="flex flex-col items-center">
<svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M60 10L100 60L60 150L20 60Z" fill="#FFEDD5" stroke="#EA580C" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 10L60 150M20 60L100 60" stroke="#EA580C" stroke-width="1.5" stroke-dasharray="4 4"/>
<rect x="60" y="60" width="8" height="8" fill="none" stroke="#EA580C" stroke-width="1.5"/>
</svg>
<span class="text-sm text-orange-700 mt-2 font-bold">สี่เหลี่ยมรูปว่าว</span>
</div>
<div class="flex flex-col items-center">
<svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 50L80 20L140 80L50 110Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="3" stroke-linejoin="round"/>
<path d="M20 50L140 80" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="4 4"/>
<path d="M80 20L70 65M50 110L80 65" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="4 4"/>
<text x="60" y="30" fill="#0284C7" font-family="sans-serif" font-size="10">เส้นกิ่ง</text>
<text x="40" y="95" fill="#0284C7" font-family="sans-serif" font-size="10">เส้นกิ่ง</text>
</svg>
<span class="text-sm text-sky-700 mt-2 font-bold">สี่เหลี่ยมด้านไม่เท่า</span>
</div>
</div>

*   **พื้นที่สี่เหลี่ยมคางหมู** = \$\\frac{1}{2} \\times \\text{ผลบวกด้านคู่ขนาน} \\times \\text{สูง}\$
*   **พื้นที่สี่เหลี่ยมรูปว่าว** = \$\\frac{1}{2} \\times \\text{ผลคูณของเส้นทแยงมุม}\$
*   **พื้นที่สี่เหลี่ยมด้านไม่เท่า** = \$\\frac{1}{2} \\times \\text{เส้นทแยงมุม} \\times \\text{ผลบวกของเส้นกิ่ง}\$

---

## 1.3 พื้นที่และเส้นรอบวงของวงกลม

<div class="flex justify-center my-6">
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="100" r="80" fill="#FCE7F3" stroke="#DB2777" stroke-width="3"/>
<circle cx="100" cy="100" r="4" fill="#DB2777"/>
<path d="M100 100L180 100" stroke="#DB2777" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M20 100L100 100" stroke="#DB2777" stroke-width="2" stroke-dasharray="4 4"/>
<text x="140" y="90" fill="#DB2777" font-family="sans-serif" font-size="14" font-weight="bold">r (รัศมี)</text>
<text x="60" y="115" fill="#DB2777" font-family="sans-serif" font-size="12">d (เส้นผ่านศูนย์กลาง)</text>
<path d="M100 20A80 80 0 0 1 180 100" stroke="#BE185D" stroke-width="4" fill="none"/>
<text x="160" y="40" fill="#BE185D" font-family="sans-serif" font-size="12" font-weight="bold">เส้นรอบวง = 2πr</text>
</svg>
</div>

วงกลมมีสูตรหลักๆ ที่ต้องจำ 2 สูตร คือ การหาพื้นที่และการหาเส้นรอบวง

*   **เส้นรอบวง** = $2\\pi r$ หรือ $\\pi d$
*   **พื้นที่วงกลม** = $\\pi r^2$ หรือ $\\frac{\\pi d^2}{4}$

(**หมายเหตุ:** $\\pi \\approx \\frac{22}{7}$ หรือ $3.14$, $r = \\text{รัศมี}$, $d = \\text{เส้นผ่านศูนย์กลาง}$ โดย $d = 2r$)

### เคล็ดลับการทำโจทย์วงกลม
1. อ่านโจทย์ให้ดีว่าถามหา "เส้นรอบวง", "พื้นที่", หรือ "ผลต่าง"
2. หากโจทย์ให้เส้นผ่านศูนย์กลาง ($d$) มา อย่าลืมหาร 2 เพื่อหารัศมี ($r$) ก่อนนำไปแทนลงในสูตรที่มี $r$
3. บางครั้งโจทย์อาจให้หาความยาวเพียงครึ่งวงกลมหรือเสี้ยววงกลม ต้องนำองศามาหาร $360$ เสมอ

---

## ตัวอย่างโจทย์ (ระดับง่าย - กลาง - ยาก)

### ตัวอย่างที่ 1: ระดับง่าย (พื้นที่สี่เหลี่ยมผืนผ้า)
สนามหญ้าแห่งหนึ่งเป็นรูปสี่เหลี่ยมผืนผ้า กว้าง 15 เมตร และยาว 25 เมตร ถ้าต้องการปูหญ้าใหม่ทั้งหมด จะต้องซื้อหญ้ากี่ตารางเมตร?

**วิธีทำ** 
จากสูตรพื้นที่สี่เหลี่ยมผืนผ้า
$$ \\text{พื้นที่} = \\text{กว้าง} \\times \\text{ยาว} $$
$$ \\text{พื้นที่} = 15 \\times 25 $$
$$ \\text{พื้นที่} = 375 $$

ดังนั้น จะต้องซื้อหญ้าทั้งหมด 375 ตารางเมตร!

<br>

### ตัวอย่างที่ 2: ระดับกลาง (พื้นที่สี่เหลี่ยมคางหมูร่วมกับวงกลม)
สระน้ำรูปสี่เหลี่ยมคางหมู มีด้านคู่ขนานยาว 10 เมตร และ 16 เมตร มีระยะห่างระหว่างด้านคู่ขนาน (ความสูง) 8 เมตร ต้องการสร้างแปลงดอกไม้รูปครึ่งวงกลมติดกับด้านที่ยาว 10 เมตร โดยใช้ด้านนั้นเป็นเส้นผ่านศูนย์กลาง จงหาพื้นที่ทั้งหมดรวมกัน (กำหนด $\\pi = 3.14$)

**วิธีทำ** 
**ขั้นที่ 1: หาพื้นที่สระน้ำรูปสี่เหลี่ยมคางหมู**
$$ \\text{พื้นที่คางหมู} = \\frac{1}{2} \\times \\text{ผลบวกด้านคู่ขนาน} \\times \\text{สูง} $$
$$ \\text{พื้นที่คางหมู} = \\frac{1}{2} \\times (10 + 16) \\times 8 $$
$$ \\text{พื้นที่คางหมู} = \\frac{1}{2} \\times 26 \\times 8 = 104 \\text{ ตารางเมตร} $$

**ขั้นที่ 2: หาพื้นที่แปลงดอกไม้รูปครึ่งวงกลม**
เส้นผ่านศูนย์กลาง $d = 10$ เมตร จะได้รัศมี $r = 5$ เมตร
$$ \\text{พื้นที่วงกลมเต็มรูป} = \\pi r^2 = 3.14 \\times (5)^2 = 3.14 \\times 25 = 78.5 \\text{ ตารางเมตร} $$
$$ \\text{พื้นที่ครึ่งวงกลม} = \\frac{78.5}{2} = 39.25 \\text{ ตารางเมตร} $$

**ขั้นที่ 3: หาพื้นที่รวม**
$$ \\text{พื้นที่รวม} = 104 + 39.25 = 143.25 \\text{ ตารางเมตร} $$

ดังนั้น พื้นที่ทั้งหมดรวมกันคือ 143.25 ตารางเมตร!

<br>

### ตัวอย่างที่ 3: ระดับยาก (พื้นที่เส้นรอบรูปประยุกต์)
ลู่วิ่งรอบสนามแห่งหนึ่งประกอบด้วยสี่เหลี่ยมผืนผ้าตรงกลาง กว้าง 42 เมตร ยาว 100 เมตร และมีเส้นโค้งรูปครึ่งวงกลมติดอยู่ทั้งสองด้านของความกว้าง ถ้านักวิ่งวิ่งรอบลู่นี้ 5 รอบพอดี นักวิ่งคนนี้จะวิ่งได้ระยะทางทั้งหมดกี่กิโลเมตร? (กำหนด $\\pi = \\frac{22}{7}$)

**วิธีทำ** 
**ขั้นที่ 1: วิเคราะห์รูปร่างของลู่วิ่ง**
เส้นรอบรูปของลู่วิ่งเกิดจาก:
- เส้นตรง 2 เส้น (ความยาวของสนาม) เส้นละ 100 เมตร
- เส้นโค้งครึ่งวงกลม 2 เส้นซ้ายขวา รวมกันเป็น 1 วงกลมเต็ม โดยมีเส้นผ่านศูนย์กลางเท่ากับ 42 เมตร

**ขั้นที่ 2: หาความยาวของส่วนที่เป็นเส้นโค้งวงกลม**
เส้นผ่านศูนย์กลาง $d = 42$ เมตร ดังนั้น $r = 21$ เมตร
$$ \\text{เส้นรอบวงกลม} = 2\\pi r $$
$$ \\text{เส้นรอบวงกลม} = 2 \\times \\frac{22}{7} \\times 21 $$
$$ \\text{เส้นรอบวงกลม} = 2 \\times 22 \\times 3 = 132 \\text{ เมตร} $$

**ขั้นที่ 3: หาระยะทางต่อ 1 รอบ**
ระยะทาง 1 รอบ = ความยาวเส้นตรง 2 เส้น + ความยาวเส้นรอบวงกลม
$$ \\text{ระยะทาง 1 รอบ} = (100 \\times 2) + 132 $$
$$ \\text{ระยะทาง 1 รอบ} = 200 + 132 = 332 \\text{ เมตร} $$

**ขั้นที่ 4: หาระยะทางทั้งหมดเมื่อวิ่ง 5 รอบ**
$$ \\text{ระยะทาง 5 รอบ} = 332 \\times 5 = 1,660 \\text{ เมตร} $$

เปลี่ยนหน่วยเป็นกิโลเมตร โดยนำ 1,000 ไปหาร:
$$ \\frac{1,660}{1,000} = 1.66 \\text{ กิโลเมตร} $$

ดังนั้น นักวิ่งจะวิ่งได้ระยะทางทั้งหมด 1.66 กิโลเมตร!
`;
