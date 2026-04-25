export const CHAPTER_15_VOLUME_SURFACE = `
# 2. ปริมาตรและพื้นที่ผิว

ในการทำข้อสอบ เรื่องปริมาตรมักเป็นเรื่องที่ออกสอบบ่อย โดยเฉพาะการประยุกต์เกี่ยวกับการเติมน้ำ การตักดิน หรือการเปรียบเทียบความจุ ซึ่งรูปทรงพื้นฐานที่ควรจำมีดังนี้

## 2.1 ปริซึม และ ทรงกระบอก

หลักการจำง่ายๆ ทั้งคู่มีหน้าตัด(ฐาน) สองด้านที่เท่ากันทุกประการ ดังนั้นสูตรปริมาตรคือ "เอาพื้นที่ฐานมาคูณกับความสูง" ได้เลย

<div class="flex flex-col sm:flex-row justify-center gap-8 my-6">
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 50L110 30L110 110L40 130Z" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round"/>
<path d="M110 30L140 50L140 130L110 110" fill="#C7D2FE" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round"/>
<path d="M40 50L70 70L140 50" fill="#A5B4FC" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round"/>
<path d="M70 70L70 150L40 130" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round" stroke-dasharray="4 4"/>
<path d="M70 150L140 130" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round" stroke-dasharray="4 4"/>
<text x="75" y="145" fill="#4F46E5" font-family="sans-serif" font-size="12" text-anchor="middle">กว้าง</text>
<text x="125" y="145" fill="#4F46E5" font-family="sans-serif" font-size="12" text-anchor="middle">ยาว</text>
<text x="25" y="95" fill="#4F46E5" font-family="sans-serif" font-size="12" text-anchor="middle">สูง</text>
</svg>
<span class="text-sm text-indigo-700 mt-2 font-bold">ปริซึมสี่เหลี่ยม / กล่อง</span>
</div>
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="75" cy="40" rx="40" ry="15" fill="#D1FAE5" stroke="#059669" stroke-width="2"/>
<path d="M35 40V120A40 15 0 0 0 115 120V40" fill="#A7F3D0" stroke="#059669" stroke-width="2"/>
<ellipse cx="75" cy="120" rx="40" ry="15" fill="#D1FAE5" stroke="#059669" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M75 40L115 40" stroke="#059669" stroke-width="1.5" stroke-dasharray="2 2"/>
<text x="95" y="35" fill="#059669" font-family="sans-serif" font-size="12">r</text>
<path d="M20 40V120" stroke="#059669" stroke-width="1.5" stroke-dasharray="2 2"/>
<text x="10" y="85" fill="#059669" font-family="sans-serif" font-size="12">h</text>
</svg>
<span class="text-sm text-emerald-700 mt-2 font-bold">ทรงกระบอก</span>
</div>
</div>

### 1. ปริซึม (Prism)
ลักษณะเป็นได้ตั้งแต่กล่อง กล่องสี่เหลี่ยมลูกบาศก์ ปริซึมสามเหลี่ยม ฯลฯ
*   **ปริมาตร** = $\\text{พื้นที่ฐาน} \\times \\text{สูง}$
*   **(พบบ่อย) ปริมาตรกล่องสี่เหลี่ยมมุมฉาก** = $\\text{กว้าง} \\times \\text{ยาว} \\times \\text{สูง}$
*   **(พบบ่อย) ปริมาตรลูกบาศก์** = $\\text{ด้าน} \\times \\text{ด้าน} \\times \\text{ด้าน}$
*   **พื้นที่ผิวปริมซึม** = $\\text{พื้นที่ผิวข้าง} + \\text{พื้นที่ฐานทั้งสอง}$

### 2. ทรงกระบอก (Cylinder)
ฐานเป็นรูปวงกลม
*   **ปริมาตรทรงกระบอก** = $\\text{พื้นที่ฐาน} \\times \\text{สูง} = \\pi r^2 h$
*   **พื้นที่ผิวทั้งหมด** = $\\text{พ.ท.ผิวข้าง} + \\text{พ.ท.ฐาน 2 ด้าน} = 2\\pi rh + 2\\pi r^2$

---

## 2.2 พีระมิด และ กรวย

หลักการจำคือ ทั้งพีระมิดและกรวยจะมีลักษณะ "ปลายแหลม" เมื่อเทน้ำจากรูปปลายแหลมเหล่านี้ใส่ลงในรูปทรงตรง (ปริซึม/ทรงกระบอก) ที่มีฐานและส่วนสูงเท่ากัน จะต้องเทถึง "3 ครั้ง" จึงจะเต็มพอดี จึงเป็นที่มาว่ามีค่าเป็น 1 ใน 3 ของรูปทรงตรง

<div class="flex flex-col sm:flex-row justify-center gap-12 my-6">
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 120L80 90L140 120L80 150Z" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" stroke-linejoin="round"/>
<path d="M20 120L75 20L140 120" fill="none" stroke="#EF4444" stroke-width="2" stroke-linejoin="round"/>
<path d="M75 20L80 150" fill="none" stroke="#EF4444" stroke-width="2" stroke-linejoin="round"/>
<path d="M75 20L80 90" fill="none" stroke="#EF4444" stroke-width="2" stroke-linejoin="round" stroke-dasharray="4 4"/>
<path d="M75 20L75 120" stroke="#DC2626" stroke-width="2" stroke-dasharray="3 3"/>
<text x="60" y="80" fill="#DC2626" font-family="sans-serif" font-size="12">สูงตรง</text>
</svg>
<span class="text-sm text-red-700 mt-2 font-bold">พีระมิด</span>
</div>
<div class="flex flex-col items-center">
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="75" cy="120" rx="45" ry="15" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
<path d="M30 120L75 20L120 120" fill="#FDE68A" fill-opacity="0.5" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
<ellipse cx="75" cy="120" rx="45" ry="15" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="2 2"/>
<path d="M75 120L120 120" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2 2"/>
<text x="95" y="115" fill="#F59E0B" font-family="sans-serif" font-size="12">r</text>
<path d="M75 20L75 120" stroke="#D97706" stroke-width="2" stroke-dasharray="3 3"/>
<text x="60" y="80" fill="#D97706" font-family="sans-serif" font-size="12">h</text>
<text x="105" y="70" fill="#B45309" font-family="sans-serif" font-size="12">l (เอียง)</text>
</svg>
<span class="text-sm text-yellow-700 mt-2 font-bold">กรวย</span>
</div>
</div>

### 1. พีระมิด (Pyramid)
*   **ปริมาตรพีระมิด** = $\\frac{1}{3} \\times \\text{พื้นที่ฐาน} \\times \\text{สูง(ตรง)}$
*   **พื้นที่ผิวทั้งหมด** = $\\text{พื้นที่ผิวข้าง} + \\text{พื้นที่ฐาน}$

### 2. กรวย (Cone)
*   **ปริมาตรกรวย** = $\\frac{1}{3} \\times \\text{พื้นที่วงกลม} \\times \\text{สูง(ตรง)} = \\frac{1}{3} \\pi r^2 h$
*   **พื้นที่ผิวทั้งหมด** = $\\text{พ.ท.ผิวข้าง} + \\text{พ.ท.ฐาน} = \\pi rl + \\pi r^2$ (เมื่อ $l$ คือความสูงเอียง)

---

## ตัวอย่างโจทย์ (ระดับง่าย - กลาง - ยาก)

### ตัวอย่างที่ 1: ระดับง่าย (ลูกบาศก์และปริมาตรกล่อง)
บริษัทขนส่งต้องการนำกล่องพัสดุทรงลูกบาศก์ขนาดด้านละ 10 เซนติเมตร จัดเรียงใส่ลงในตู้คอนเทนเนอร์ขนาดเล็ก กว้าง 40 เซนติเมตร ยาว 50 เซนติเมตร และสูง 30 เซนติเมตร จะสามารถใส่กล่องพัสดุได้มากที่สุดกี่กล่อง?

**วิธีทำ** 
**วิธีคิดแบบที่ 1: เทียบปริมาตร**
$$ \\text{ปริมาตรตู้} = 40 \\times 50 \\times 30 = 60,000 \\text{ ลบ.ซม.} $$
$$ \\text{ปริมาตรกล่องเล็ก} = 10 \\times 10 \\times 10 = 1,000 \\text{ ลบ.ซม.} $$
$$ \\text{จำนวนกล่อง} = \\frac{60,000}{1,000} = 60 \\text{ กล่อง} $$

**วิธีคิดแบบที่ 2: นับจำนวนด้าน (แนะนำ ลดความผิดพลาด)**
ด้านกว้างใส่ได้ = $\\frac{40}{10} = 4$ กล่อง
ด้านยาวใส่ได้ = $\\frac{50}{10} = 5$ กล่อง
ด้านสูงใส่ได้ = $\\frac{30}{10} = 3$ ชั้น
รวมจำนวนกล่องทั้งหมด = $4 \\times 5 \\times 3 = 60$ กล่อง

ดังนั้น สามารถจัดเรียงกล่องได้ทั้งหมด 60 กล่อง!

<br>

### ตัวอย่างที่ 2: ระดับกลาง (การตักดิน กว้าง ยาว ลึก)
ชาวบ้านต้องการขุดสระน้ำรูปสี่เหลี่ยมมุมฉาก โดยมีความกว้าง 10 เมตร ยาว 20 เมตร และขุดลึกลงไป 3 เมตร หากรถบรรทุกดินสามารถขนดินได้รอบละ 15 ลูกบาศก์เมตร จะต้องใช้รถบรรทุกทั้งหมดกี่รอบจึงจะขนดินออกไปได้หมด?

**วิธีทำ** 
ต้องหาปริมาตรของดินทั้งหมดที่ขุดขึ้นมาให้ได้ก่อน
$$ \\text{ปริมาตรดิน} = \\text{กว้าง} \\times \\text{ยาว} \\times \\text{ลึก} $$
$$ \\text{ปริมาตรดิน} = 10 \\times 20 \\times 3 = 600 \\text{ ลูกบาศก์เมตร} $$

หากรถขนได้รอบละ 15 ลูกบาศก์เมตร
$$ \\text{จำนวนรอบ} = \\frac{600}{15} = 40 \\text{ รอบ} $$

ดังนั้น จะต้องใช้งานรถบรรทุกดินทั้งหมด 40 รอบ!

<br>

### ตัวอย่างที่ 3: ระดับยาก (การเติมน้ำตู้ปลาให้เต็ม)
ตู้ปลาตู้หนึ่งมีขนาดกว้าง 30 ซม. ยาว 60 ซม. และสูง 45 ซม. ขณะนี้มีน้ำอยู่ในตู้ปลาสูงจากก้นตู้ 25 ซม. หากต้องการเติมน้ำเพิ่มให้ระดับน้ำห่างจากขอบตู้ด้านบน 5 ซม. พอดี จะต้องเติมน้ำเพิ่มอีกกี่ลูกบาศก์เซนติเมตร? (และคิดเป็นกี่ลิตร?)

**วิธีทำ** 
ข้อนี้โจทย์ไม่ได้ให้หาปริมาตรน้ำหรือตู้ทั้งหมด แต่ให้หาปริมาตรของ "น้ำส่วนที่ต้องเติมเพิ่ม"

**ขั้นที่ 1: วิเคราะห์ความสูงของน้ำที่ต้องเตรียมเติมเพิ่ม**
ความสูงรวมของตู้ = 45 ซม.
ระดับนำ้เดิม = 25 ซม.
ระดับปลายทางที่ต้องการคือ ห่างขอบตู้ 5 ซม. แปลว่าต้องการให้น้ำสูง = 45 - 5 = 40 ซม.

ดังนั้น ความสูงของชั้นน้ำที่จะต้องถูกเติมลงไปเพิ่มคือ
$$ 40 \\text{ (เป้าหมาย)} - 25 \\text{ (ของเดิม)} = 15 \\text{ ซม.} $$

**ขั้นที่ 2: หาปริมาตรของปริมาณน้ำที่ต้องเติม**
โดยใช้ส่วนกว้างยาวเดิมของตู้ปลา แต่ใช้ความสูงแค่ส่วนที่จะเติม
$$ \\text{ปริมาตรน้ำที่เติมเพิ่ม} = \\text{กว้าง} \\times \\text{ยาว} \\times \\text{สูงส่วนที่เติม} $$
$$ \\text{ปริมาตรน้ำที่เติมเพิ่ม} = 30 \\times 60 \\times 15 $$
$$ \\text{ปริมาตรน้ำที่เติมเพิ่ม} = 1,800 \\times 15 = 27,000 \\text{ ลบ.ซม.} $$

**ขั้นที่ 3: หากโจทย์ถามเป็นหน่วยลิตร**
หลักการจำ: 1,000 ลูกบาศก์เซนติเมตร = 1 ลิตร
$$ \\frac{27,000}{1,000} = 27 \\text{ ลิตร} $$

ดังนั้น ต้องเติมน้ำเพิ่มอีก 27,000 ลบ.ซม. (หรือคิดเป็น 27 ลิตร)!
`;
