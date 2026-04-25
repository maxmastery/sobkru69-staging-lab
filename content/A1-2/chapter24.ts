export const CHAPTER_24_REASONING_VENN = `
# 3. การสรุปความและการให้เหตุผล: แบบวาดรูปหาความสัมพันธ์ (Venn Euler)

นอกจากแบบเงื่อนไขหรือการเลือกแล้ว การตรวจสอบความสมเหตุสมผลโดยอาศัยการวาดรูปแผนภาพแวน-ออยเลอร์ (Venn-Euler) เป็นเทคนิคที่ครอบคลุมและสามารถไขปริศนาเหตุผลที่ซับซ้อนได้อย่างดีเยี่ยม ลักษณะของโจทย์มักจะมีคำสำคัญ คือ **"ทุก"**, **"บาง"**, หรือ **"ไม่"**

---

## 3.1 หลักการวาดแผนภาพเวนน์-ออยเลอร์

เมื่อเจอโจทย์แบบประโยคบอกเล่า เช่น **"สุนัขทุกตัวมี 4 ขา"** หรือ **"คนรวยบางคนไม่ใจบุญ"** ให้เปลี่ยนเป็นรูปภาพจะช่วยให้มองหา "ความขัดแย้ง" ได้ง่ายขึ้น:



<div class="flex justify-center my-8">
<svg viewBox="0 0 500 220" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="90" cy="100" r="60" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="2,2" />
<circle cx="90" cy="115" r="30" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="90" y="70" font-size="12" fill="#64748b" text-anchor="middle">สัตว์ 4 ขา</text>
<text x="90" y="120" font-size="10" fill="#1e40af" text-anchor="middle">สุนัข</text>
<text x="90" y="190" font-size="12" fill="#334155" text-anchor="middle" font-weight="bold">"ทุกตัว" (สับเซต)</text>
<circle cx="250" cy="100" r="50" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" fill-opacity="0.5" />
<circle cx="310" cy="100" r="50" fill="#fef2f2" stroke="#ef4444" stroke-width="2" fill-opacity="0.5" />
<text x="280" y="105" font-size="14" fill="#1e293b" text-anchor="middle" font-weight="bold">X</text>
<text x="280" y="190" font-size="12" fill="#334155" text-anchor="middle" font-weight="bold">"บางตัว" (อินเตอร์เซก)</text>
<circle cx="410" cy="100" r="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
<circle cx="475" cy="100" r="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
<text x="442" y="190" font-size="12" fill="#334155" text-anchor="middle" font-weight="bold">"ไม่มี" (แยกกัน)</text>
</svg>
</div>



| รูปแบบประโยค | ความหมายเชิงแผนภาพ | ตัวอย่างการวิเคราะห์ |
| :--- | :--- | :--- |
| **"ทุกตัว / ทุกคน"** | วงกลมเล็กอยู่ข้างในวงกลมใหญ่ | ถ้าเป็น "สุนัข" ต้องอยู่ในวง "สัตว์ 4 ขา" เสมอ |
| **"บางตัว / บางคน"** | วงกลมสองวงเกี่ยวกัน (มีส่วนซ้อน) | มี "คนรวย" บางส่วนที่คาบเกี่ยวกับ "คนใจบุญ" |
| **"ไม่มี...ที่เป็น"** | วงกลมสองวงแยกจากกันเด็ดขาด | "แมว" กับ "สุนัข" ไม่มีทางเป็นสัตว์ชนิดเดียวกันได้ |

---

## 3.3 รวมภาพตัวอย่างการวิเคราะห์ (Illustrations)


<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
<div class="bg-white p-4 rounded-xl border border-slate-100">
<p class="text-sm font-bold text-center mb-2">ตัวอย่าง: หมอทุกคนเรียนเก่ง</p>
<svg viewBox="0 0 300 180" class="w-full" xmlns="http://www.w3.org/2000/svg">
<circle cx="150" cy="90" r="70" fill="#f8fafc" stroke="#94a3b8" />
<circle cx="150" cy="100" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="150" y="45" font-size="12" fill="#64748b" text-anchor="middle">คนเรียนเก่ง</text>
<text x="150" y="105" font-size="11" fill="#1e40af" text-anchor="middle" font-weight="bold">หมอ</text>
<text x="150" y="170" font-size="10" fill="#94a3b8" text-anchor="middle" font-style="italic">หมอเป็นสับเซตของคนเรียนเก่ง</text>
</svg>
</div>

<div class="bg-white p-4 rounded-xl border border-slate-100">
<p class="text-sm font-bold text-center mb-2">ตัวอย่าง: คนรวยบางคนใจดี</p>
<svg viewBox="0 0 300 180" class="w-full" xmlns="http://www.w3.org/2000/svg">
<circle cx="110" cy="90" r="50" fill="#fdf2f8" stroke="#db2777" fill-opacity="0.4" />
<circle cx="190" cy="90" r="50" fill="#f0fdf4" stroke="#16a34a" fill-opacity="0.4" />
<text x="150" y="95" font-size="14" fill="#1e293b" text-anchor="middle" font-weight="bold">X</text>
<text x="80" y="95" font-size="10" fill="#9d174d" text-anchor="middle">คนรวย</text>
<text x="220" y="95" font-size="10" fill="#15803d" text-anchor="middle">คนใจดี</text>
<text x="150" y="160" font-size="10" fill="#94a3b8" text-anchor="middle" font-style="italic">X คือส่วนของคนรวยที่ใจดีด้วย</text>
</svg>
</div>
</div>


<div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 my-8">
<h3 class="text-amber-900 font-bold mb-4 flex items-center gap-2">
    💡 ทริกการจำสำหรับการสอบ ภาค ก
</h3>
<ul class="space-y-3 text-sm text-amber-800">
<li class="flex gap-2">
<div class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
<div><span class="font-bold underline">ทุกตัว:</span> วงกลมเล็ก (สิ่งที่อยู่หน้าคำว่าทุก) ต้องอยู่ข้างในวงกลมใหญ่</div>
</li>
<li class="flex gap-2">
<div class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
<div><span class="font-bold underline">บางตัว:</span> วงกลมทั้งสองต้องคาบเกี่ยวกันเสมอ (อินเตอร์เซก)</div>
</li>
<li class="flex gap-2">
<div class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
<div><span class="font-bold underline">ไม่มี:</span> วงกลมทั้งสองต้องแยกกันเด็ดขาด ห้ามโดนกันแม้แต่นิดเดียว</div>
</li>
</ul>
</div>

---

## 3.3 เพิ่มเติมตัวอย่างและแบบฝึกหัด (Part 3 - Venn)

### ตัวอย่างที่ 13 (ระดับปานกลาง)
**เหตุ:**
1. ทหารทุกคนแข็งแรง
2. คนขยันบางคนเป็นทหาร
3. นาย ก. เป็นคนขยันแต่ไม่แข็งแรง

**ข้อสรุปใดถูกต้อง:**
ก. นาย ก. เป็นทหาร
ข. นาย ก. ไม่เป็นทหาร
ค. ทหารบางคนไม่ขยัน
ง. สรุปไม่ได้

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 240" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Strong circle -->
<circle cx="200" cy="110" r="90" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
<text x="200" y="40" font-size="12" fill="#64748b" text-anchor="middle">คนแข็งแรง</text>
<!-- Military circle inside Strong -->
<circle cx="160" cy="120" r="45" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="160" y="125" font-size="11" fill="#1e40af" text-anchor="middle" font-weight="bold">ทหาร</text>
<!-- Diligent circle intersecting Military -->
<circle cx="300" cy="110" r="70" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" fill-opacity="0.4" />
<text x="340" y="60" font-size="12" fill="#166534" text-anchor="middle">คนขยัน</text>
<!-- Mr. A point (Diligent but not Strong) -->
<circle cx="350" cy="150" r="4" fill="#ef4444" />
<text x="360" y="165" font-size="12" fill="#b91c1c" font-weight="bold">นาย ก.</text>
<text x="250" y="220" font-size="11" fill="#94a3b8" text-anchor="middle" font-style="italic">แผนภาพ: นาย ก. อยู่นอกวง "แข็งแรง" จึงไม่มีทางอยู่ในวง "ทหาร" ได้</text>
</svg>
</div>

**เฉลยและวิธีคิด:**
- วัตถุประสงค์: วาดวง "ทหาร" (เล็ก) ในวง "แข็งแรง" (ใหญ่)
- วาดวง "คนขยัน" เหลื่อมกับวง "ทหาร"
- นาย ก. อยู่นอกวง "แข็งแรง" (เพราะโจทย์บอกไม่แข็งแรง)
- เมื่ออยู่นอกวงแข็งแรง นาย ก. ย่อมไม่สามารถอยู่ในวง "ทหาร" ได้เลย
- **ตอบข้อ ข. นาย ก. ไม่เป็นทหาร**

---

### ตัวอย่างที่ 14 (ระดับยาก)
**เหตุ:**
1. อาหารที่มีน้ำตาลทุกชนิดไม่ดีต่อสุขภาพ
2. ขนมปังบางชนิดมีน้ำตาล
3. สลัดผักไม่มีน้ำตาล

**ข้อสรุปใดสมเหตุสมผล:**
ก. ขนมปังบางชนิดไม่ดีต่อสุขภาพ
ข. สลัดผักดีต่อสุขภาพ
ค. ขนมปังทุกชนิดมีน้ำตาล
ง. ไม่มีข้อใดถูก

**เฉลยและวิธีคิด:**
- วาดวง "มีน้ำตาล" (เล็ก) ในวง "ไม่ดีต่อสุขภาพ" (ใหญ่)
- วง "ขนมปัง" เหลื่อมกับวง "มีน้ำตาล" (พื้นที่ที่เหลื่อมจะตกในวงไม่ดีต่อสุขภาพด้วย)
- วง "สลัดผัก" แยกจากวง "มีน้ำตาล" (แต่สลัดอาจจะไปอยู่ในวงไม่ดีต่อสุขภาพเขตอื่นก็ได้ เช่น มีโซเดียมสูง)

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 240" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Unhealthy circle -->
<circle cx="200" cy="110" r="90" fill="#fff1f2" stroke="#f43f5e" stroke-width="1" />
<text x="200" y="40" font-size="12" fill="#be123c" text-anchor="middle">ไม่ดีต่อสุขภาพ</text>
<!-- Sugar circle inside Unhealthy -->
<circle cx="170" cy="120" r="45" fill="#fef2f2" stroke="#fb7185" stroke-width="2" />
<text x="170" y="125" font-size="11" fill="#be123c" text-anchor="middle" font-weight="bold">มีน้ำตาล</text>
<!-- Bread circle intersecting Sugar -->
<circle cx="300" cy="130" r="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="350" y="100" font-size="12" fill="#1e40af" text-anchor="middle">ขนมปัง</text>
<!-- Salad circle separate from Sugar -->
<circle cx="80" cy="110" r="40" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" fill-opacity="0.4" />
<text x="80" y="90" font-size="12" fill="#166534" text-anchor="middle">สลัดผัก</text>
<text x="250" y="220" font-size="11" fill="#94a3b8" text-anchor="middle" font-style="italic">พื้นที่ขนมปังที่ทับกับ "มีน้ำตาล" จะต้องอยู่ภายใน "ไม่ดีต่อสุขภาพ" เสมอ</text>
</svg>
</div>

- จากรูป ฟันธงได้แค่ว่า ขนมปังส่วนที่มีน้ำตาล ย่อมไม่ดีต่อสุขภาพแน่นอน (ข้อ ก.)
- **ตอบข้อ ก. ขนมปังบางชนิดไม่ดีต่อสุขภาพ**

---

### ตัวอย่างที่ 15 (ระดับปานกลาง)
**เหตุ:**
1. นักกีฬาที่เก่งทุกคนต้องซ้อมหนัก
2. สมชายซ้อมหนัก

**ข้อสรุปใดถูกต้อง:**
ก. สมชายเป็นนักกีฬาที่เก่ง
ข. สมชายเป็นนักกีฬา
ค. สมชายจะชนะการแข่งขัน
ง. สรุปแน่นอนไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "นักกีฬาเก่ง" ในวง "ซ้อมหนัก"
- สมชาย (จุด) อยู่ในวง "ซ้อมหนัก"

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 220" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Practice Hard circle -->
<circle cx="250" cy="110" r="90" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
<text x="250" y="40" font-size="12" fill="#64748b" text-anchor="middle">ซ้อมหนัก</text>
<!-- Talented Athlete circle inside -->
<circle cx="200" cy="120" r="45" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="200" y="125" font-size="11" fill="#1e40af" text-anchor="middle" font-weight="bold">นักกีฬาเก่ง</text>
<!-- Somchai point (In Practice Hard circle, but position uncertain) -->
<circle cx="310" cy="130" r="4" fill="#ef4444" />
<text x="325" y="135" font-size="12" fill="#b91c1c" font-weight="bold">สมชาย (อาจอยู่นี่)</text>
<text x="250" y="210" font-size="11" fill="#94a3b8" text-anchor="middle" font-style="italic">สมชายอยู่ข้างใน "ซ้อมหนัก" แต่อาจจะไม่ได้อยู่ใน "นักกีฬาเก่ง"</text>
</svg>
</div>

- จุดสมชายอาจจะอยู่นอกวง "นักกีฬาเก่ง" ก็ได้ (ซ้อมหนักแต่ยังไม่เก่ง)
- **ตอบข้อ ง. สรุปไม่ได้**

---

### ตัวอย่างที่ 16 (ระดับยาก)
**เหตุ:**
1. ไม่มีนกตัวใดที่หายใจด้วยเหงือก
2. สัตว์น้ำบางชนิดหายใจด้วยเหงือก
**ข้อสรุปใดสมเหตุสมผล:**
ก. สัตว์น้ำบางชนิดไม่ใช่นก
ข. สัตว์น้ำทุกชนิดหายใจด้วยเหงือก
ค. นกบางตัวเป็นสัตว์น้ำ
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วง "นก" แยกจากวง "หายใจด้วยเหงือก"
- วง "สัตว์น้ำ" เหลื่อมกับวง "หายใจด้วยเหงือก"

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 240" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Bird circle -->
<circle cx="120" cy="110" r="60" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
<text x="120" y="115" font-size="12" fill="#166534" text-anchor="middle" font-weight="bold">นก</text>
<!-- Gills circle -->
<circle cx="350" cy="110" r="60" fill="#fef2f2" stroke="#ef4444" stroke-width="2" />
<text x="350" y="115" font-size="11" fill="#b91c1c" text-anchor="middle" font-weight="bold">หายใจด้วยเหงือก</text>
<!-- Aquatic circle intersecting Gills -->
<circle cx="280" cy="110" r="75" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="240" y="60" font-size="12" fill="#1e40af" text-anchor="middle">สัตว์น้ำ</text>
<text x="250" y="210" font-size="11" fill="#94a3b8" text-anchor="middle" font-style="italic">สัตว์น้ำส่วนที่ทับกับวง "เหงือก" จะต้องอยู่นอกวง "นก" เสมอ</text>
</svg>
</div>

- พื้นที่ "สัตว์น้ำ" ส่วนที่หายใจด้วยเหงือก ย่อมถูกผลักออกจากวง "นก" โดยปริยาย
- สรุปได้ว่า มีสัตว์น้ำบางส่วนแน่นอนที่ยืนยันได้ว่าไม่ใช่นก
- **ตอบข้อ ก. ถูกต้องที่สุด**

---

---

---

## 3.2 ขั้นตอนการตรวจสอบความสมเหตุสมผล

1. **วาดรูปตาม "เหตุ" ที่โจทย์ให้มา:** พยายามวาดให้คลุมเครือน้อยที่สุด หรือวาดเผื่อกรณีที่เป็นไปได้ทั้งหมดหากมีคำว่า "บาง"
2. **ตรวจสอบ "ผลสรุป":** นำผลสรุปที่โจทย์ให้มา ไปเทียบกับรูปที่เราวาด
   - หากรูป **ยืนยันผลได้ 100%** (ไม่สามารถแย้งเป็นอย่างอื่นได้) → **สมเหตุสมผล**
   - หากรูป **ขัดแย้งกับผลสรุป** หรือ **สามารถวาดรูปอื่นที่ทำให้ผลคลาดเคลื่อนได้** → **ไม่สมเหตุสมผล (สรุปไม่ได้)**

---

## ตะลุยโจทย์ประโยคเงื่อนไขแผนภาพแวน-ออยเลอร์

### ตัวอย่างที่ 1 : ระดับง่าย
**เหตุ:**
1. นักยิมนาสติกทุกคนมีอายุไม่เกิน 25 ปี
2. ดวงเดือนมีอายุ 26 ปี

**ข้อสรุปผลข้อใดถูกต้อง:**
ก. ดวงเดือนไม่ใช่นักกีฬา
ข. ดวงเดือนอาจเป็นนักยิมนาสติก
ค. ดวงเดือนไม่ใช่นักยิมนาสติก
ง. สรุปแน่ชัดไม่ได้

**เฉลยและวิธีคิด:**
- วาดวงกลม "อายุไม่เกิน 25 ปี" เป็นวงใหญ่ และดึง "นักยิมนาสติก" เป็นวงเล็กไปอยู่ข้างใน (เพราะทุกคนอายุไม่เกิน 25)
- ดวงเดือนอายุ 26 แปลว่าดวงเดือนกระเด็นออกจากอาณาเขต "ไม่เกิน 25 ปี" อย่างแน่นอน

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 200" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="200" y="45" font-size="12" fill="#64748b" text-anchor="middle">อายุไม่เกิน 25 ปี</text>
<circle cx="180" cy="110" r="40" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="180" y="115" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">นักยิมฯ</text>
<circle cx="320" cy="110" r="4" fill="#ef4444" />
<text x="320" y="130" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">ดวงเดือน (26 ปี)</text>
</svg>
</div>

- เมื่อขีด "ดวงเดือน" ไว้นอกวงใหญ่ ก็แปลว่าไม่มีทางที่จะอยู่ในวง "นักยิมนาสติก" ได้เลย
- **ตอบ ข้อ ค. ดวงเดือนไม่ใช่นักยิมนาสติก อย่างแน่นอน**

---

### ตัวอย่างที่ 2 : ระดับง่าย
**เหตุ:**
1. สุนัขทุกตัวมีหาง
2. แมวทุกตัวมีหาง

**ผลสรุปข้อใดสมเหตุสมผล:**
ก. แมวบางตัวเป็นสุนัข
ข. สุนัขเป็นแมว
ค. สัตว์ที่มีหางคือสุนัขและแมว
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวงกลม "สัตว์ที่มีหาง" เป็นวงใหญ่สุด
- นำ "สุนัข" เข้าไปเป็นวงกลมเล็กในวงกลม "สัตว์มีหาง"
- นำ "แมว" เข้าไปเป็นวงกลมเล็กอีกวงใน "สัตว์มีหาง" 

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 200" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="110" r="85" fill="#f8fafc" stroke="#94a3b8" />
<text x="200" y="40" font-size="12" fill="#64748b" text-anchor="middle">สัตว์ที่มีหาง</text>
<circle cx="150" cy="120" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="150" y="125" font-size="10" fill="#1e40af" text-anchor="middle">สุนัข</text>
<circle cx="250" cy="120" r="35" fill="#fef2f2" stroke="#ef4444" stroke-width="2" />
<text x="250" y="125" font-size="10" fill="#b91c1c" text-anchor="middle">แมว</text>
</svg>
</div>

- จะเห็นว่าวงกลม "สุนัข" กับ "แมว" อยู่ในวงใหญ่เดียวกัน แต่ไม่ได้แปลว่าจะต้องเกี่ยวข้องกัน หรือทับซ้อนกัน เรารู้แค่ว่าทั้งคู่มีหาง
- ข้อ ก และ ข จึงผิด ส่วนข้อ ค ก็สรุปแบบเหมารวมเกินไปเพราะยังมีสัตว์อื่นเช่น ลิง หรือหนู ที่อาจจะมีหางด้วย
- **ดังนั้น ตอบ ข้อ ง. สรุปไม่ได้**

---

### ตัวอย่างที่ 3 : ระดับปานกลาง
**เหตุ:**
1. หมอทุกคนเรียนเก่ง
2. คนเรียนเก่งบางคนไม่ประสบความสำเร็จในการทำงาน
3. คนที่ไม่ประสบความสำเร็จในการทำงานเป็นคนยากจน

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล?**
ก. หมอบางคนไม่ประสบความสำเร็จในการทำงาน
ข. หมอบางคนยากจน
ค. หมอทุกคนประสบความสำเร็จในการทำงาน
ง. ไม่มีข้อสรุปใดสมเหตุสมผล

**เฉลยและวิธีคิด:**
ใช้การวาดรูปทีละคำสั่ง
- วงกลม "หมอ" อยู่ในวงกลมวงใหญ่ "คนเรียนเก่ง"
- วงกลม "คนไม่ประสบความสำเร็จ..." มาซ้อนทับเพียง **"บางส่วน"** กับวงกลม "คนเรียนเก่ง" เท่านั้น (เพราะเหตุข้อ 2 บอกว่า "บางคน")

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="180" cy="110" r="85" fill="#f8fafc" stroke="#94a3b8" />
<text x="180" y="45" font-size="12" fill="#64748b" text-anchor="middle">คนเรียนเก่ง</text>
<circle cx="150" cy="120" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="150" y="125" font-size="10" fill="#1e40af" text-anchor="middle">หมอ</text>
<circle cx="280" cy="110" r="60" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" fill-opacity="0.4" />
<text x="320" y="70" font-size="10" fill="#92400e" text-anchor="middle">ไม่สำเร็จ</text>
</svg>
</div>

  *ข้อสังเกต:* วงกลมที่มาทับนี้อาจจะลึกไปโดนวงของ "หมอ" หรือ อาจจะทับแค่ผิวของ "คนเรียนเก่ง" โดยไม่โดนหมอเลยก็ได้ (สรุปไม่ได้ว่าโดนหมอไหม)
- วงกลม "คนยากจน" จะเป็นวงใหญ่ครอบคลุมวง "คนไม่ประสบความสำเร็จ..."
- เมื่อดูตัวเลือกทั้งหมด ไม่มีข้อไหนสรุปยืนยันได้เต็ม 100% เลย เนื่องจากความคลุมเครือที่มีวงเหลื่อมทับกันบางส่วน
- **ตอบ ข้อ ง. ไม่มีข้อสรุปใดสมเหตุสมผล**

---

### ตัวอย่างที่ 4 : ระดับปานกลาง
**เหตุ:**
1. นกทุกตัวมีปีก
2. สัตว์ที่มีปีกบางตัวบินไม่ได้
3. เพนกวินมีปีกแต่บินไม่ได้

**ข้อใดเป็นผลสรุปที่ถูกต้องที่สุด?**
ก. เพนกวินเป็นนก
ข. เพนกวินบางตัวเป็นนก
ค. นกบางตัวบินไม่ได้
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวงกลมครอบ: นก (วงเล็ก) อยู่ใน สัตว์มีปีก (วงใหญ่)
- มีวงกลม "บินไม่ได้" มาเหลื่อม (ตัดบางส่วน) กับวงใหญ่ "สัตว์มีปีก"
- เพนกวิน คือจุดที่อยู่ในพื้นที่อินเตอร์เซกต์ระหว่าง "สัตว์มีปีก" กับ "บินไม่ได้" (ตามเหตุ 3)

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="180" cy="110" r="85" fill="#f8fafc" stroke="#94a3b8" />
<text x="180" y="45" font-size="12" fill="#64748b" text-anchor="middle">สัตว์มีปีก</text>
<circle cx="150" cy="120" r="35" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
<text x="150" y="125" font-size="10" fill="#166534" text-anchor="middle">นก</text>
<circle cx="280" cy="110" r="65" fill="#fef2f2" stroke="#ef4444" stroke-width="2" fill-opacity="0.4" />
<text x="320" y="65" font-size="12" fill="#b91c1c" text-anchor="middle">บินไม่ได้</text>
<circle cx="250" cy="130" r="4" fill="#3b82f6" />
<text x="250" y="150" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">เพนกวิน</text>
</svg>
</div>

- คำถามคือ จุด "เพนกวิน" มันไปโดนเขตของ "นก" หรือไม่? ซึ่งจากรูป เราไม่สามารถระบุได้ชัดเจนว่าวง "นก" กับ "บินไม่ได้" มันทับซ้อนกันตรงที่มีเพนกวินอยู่หรือไม่
- **ตอบ ข้อ ง. สรุปไม่ได้**

---

### ตัวอย่างที่ 5 : ระดับยาก
**เหตุ:**
1. รถยนต์ทุกคนเป็นรถไฟ
2. BM เป็นรถไฟไม่ใช่รถยนต์
3. รถแท็กซี่บางคันเป็นรถไฟ

**ผล:** BM บางคันเป็นรถแท็กซี่
การให้เหตุผลในข้อนี้สมเหตุสมผลหรือไม่?

**เฉลยและวิธีคิด:**
อย่าเอาตรรกะโลกแห่งความเป็นจริงมาคิด ให้ยึดตามข้อความอย่างเคร่งครัด
- เหตุ 1: วงกลม "รถยนต์" วงเล็ก อยู่ซ้อนในวงกลมใหญ่ "รถไฟ"
- เหตุ 2: จุด BM อยู่ในวง "รถไฟ" แต่อยู่นอกวง "รถยนต์"
- เหตุ 3: วงกลม "รถแท็กซี่" ตัดเหลื่อมๆ กับวงกลม "รถไฟ" 

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="180" cy="110" r="85" fill="#f8fafc" stroke="#94a3b8" />
<text x="180" y="45" font-size="12" fill="#64748b" text-anchor="middle">รถไฟ</text>
<circle cx="150" cy="120" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="150" y="125" font-size="10" fill="#1e40af" text-anchor="middle">รถยนต์</text>
<circle cx="280" cy="110" r="60" fill="#fef2f2" stroke="#ef4444" stroke-width="2" fill-opacity="0.4" />
<text x="320" y="70" font-size="10" fill="#b91c1c" text-anchor="middle">รถแท็กซี่</text>
<circle cx="200" cy="80" r="4" fill="#16a34a" />
<text x="210" y="75" font-size="10" fill="#166534" font-weight="bold">BM</text>
</svg>
</div>

- จะสังเกตเห็นว่า "BM" ที่เป็นเพียงจุดๆ หนึ่งในพื้นที่รถไฟ อาจจะโดนเขตแดนของวง "รถแท็กซี่" ทับ หรืออาจจะไม่โดนเลยก็ได้ (เราแกล้งวาดให้มันไม่โดนได้)
- การที่ข้อสรุปฟันธงว่า "BM บางคันเป็นรถแท็กซี่" จึงไม่สามารถการันตีได้ 100% จากภาพวาด (มีโอกาสขัดแย้ง)
- **ดังนั้น ถือว่า "ไม่สมเหตุสมผล" (สรุปไม่ได้)**

---

### ตัวอย่างที่ 6 : ระดับยากมาก (ข้อสอบ ก.พ.)
**เหตุ:**
1. สิ่งที่มีชีวิตบางชนิดเป็นพืช
2. พืชทุกชนิดสังเคราะห์แสงได้
3. เห็ดสังเคราะห์แสงไม่ได้

**ผลสรุปข้อใดถูกต้อง:**
ก. เห็ดเป็นสิ่งมีชีวิตชนิดหนึ่ง
ข. สิ่งมีชีวิตบางชนิดสังเคราะห์แสงได้
ค. เห็ดไม่ใช่พืช
ง. ข และ ค ถูกต้อง

**เฉลยและวิธีคิด:**
- วงกลม "พืช" อยู่ภายในวงใหญ่ "สังเคราะห์แสงได้" (เหตุ 2)
- วงกลม "สิ่งมีชีวิต" ไปเหลื่อมกับวงกลม "พืช" (เหตุ 1 ระบุว่าบางชนิด) (ซึ่งพื้นที่ที่เหลื่อมก็อยู่ในเขต "สังเคราะห์แสงได้" ด้วย)
- "เห็ด" เป็นสิ่งที่อยู่นอกวง "สังเคราะห์แสงได้" เด็ดขาด (เหตุ 3) 

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 240" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="110" r="90" fill="#f8fafc" stroke="#94a3b8" />
<text x="200" y="40" font-size="12" fill="#64748b" text-anchor="middle">สังเคราะห์แสงได้</text>
<circle cx="170" cy="120" r="40" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
<text x="170" y="125" font-size="10" fill="#166534" text-anchor="middle">พืช</text>
<circle cx="280" cy="110" r="75" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="320" y="55" font-size="12" fill="#1e40af" text-anchor="middle">สิ่งมีชีวิต</text>
<circle cx="420" cy="110" r="35" fill="#fef2f2" stroke="#ef4444" stroke-width="2" fill-opacity="0.4" />
<text x="420" y="100" font-size="11" fill="#b91c1c" text-anchor="middle" font-weight="bold">เห็ด</text>
</svg>
</div>

- เมื่อเห็ดอยู่นอกวง "สังเคราะห์แสงได้" ย่อมแปลว่าเห็ดไม่โดนวง "พืช" ที่อยู่ข้างในอย่างแน่นอน จึงได้ข้อสรุปชัวร์ๆ ว่า **"เห็ดไม่ใช่พืช"** (ข้อ ค. ถูก)
- พื้นที่ที่ "สิ่งมีชีวิต" เหลื่อมกับ "พืช" ย่อมเป็นพื้นที่ที่สังเคราะห์แสงได้ด้วย ทำให้ได้ข้อสรุปยืนยันว่า **"สิ่งมีชีวิตบางชนิดสังเคราะห์แสงได้"** (ข้อ ข. ก็ถูก)
- **ดังนั้น ข้อ ง. (ข และ ค ถูก) เป็นคำตอบที่ถูกต้องที่สุด**

---

### ตัวอย่างที่ 7 : ระดับยาก (สถานการณ์หลอก)
**เหตุ:**
1. ผลไม้ทุกชนิดมีวิตามิน
2. ของที่มีวิตามินทุกอย่างมีประโยชน์
3. ยาบำรุงมีประโยชน์แต่ไม่ใช่ผลไม้

**ข้อสรุปใดถูกต้อง:**
ก. ยาบำรุงมีวิตามิน
ข. ของที่มีประโยชน์บางอย่างไม่ใช่ผลไม้
ค. ของที่มีประโยชน์คือผลไม้เท่านั้น
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "ผลไม้" ในวง "มีวิตามิน" และวาดวง "มีวิตามิน" ในวง "มีประโยชน์"
- วง "ผลไม้" จึงเป็นวงเล็กที่สุดที่อยู่ในวง "มีประโยชน์"
- "ยาบำรุง" เป็นจุดที่อยู่ในวง "มีประโยชน์" แต่อยู่ข้างนอกวง "ผลไม้"

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="110" r="95" fill="#f8fafc" stroke="#94a3b8" />
<text x="200" y="35" font-size="12" fill="#64748b" text-anchor="middle">มีประโยชน์</text>
<circle cx="200" cy="115" r="65" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
<text x="200" y="70" font-size="10" fill="#166534" text-anchor="middle">มีวิตามิน</text>
<circle cx="200" cy="125" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="200" y="130" font-size="10" fill="#1e40af" text-anchor="middle">ผลไม้</text>
<circle cx="130" cy="110" r="4" fill="#ef4444" />
<text x="130" y="100" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">ยาบำรุง</text>
</svg>
</div>

- คำถามคือ จุดยาบำรุง อยู่ในวง "มีวิตามิน" หรือไม่? รูปภาพแสดงว่าสามารถอยู่ได้ทั้งในและนอกวงวิตามิน (ตราบใดที่ยังอยู่นอกผลไม้) จึงสรุปข้อ ก. ไม่ได้
- แต่จากรูป เห็นได้ชัดว่าพื้นที่ในวง "มีประโยชน์" ที่อยู่นอกวง "ผลไม้" นั้นมีอยู่จริง (เช่น พื้นที่ที่ยาบำรุงอยู่)
- **ดังนั้น ข้อ ข. ของที่มีประโยชน์บางอย่างมีสิทธิ์ไม่ใช่ผลไม้ (สมเหตุสมผล 100%)**

---

### ตัวอย่างที่ 8 : การใช้แผนภาพกับชื่อเฉพาะ
**เหตุ:**
1. นกทุกตัวบินได้
2. เครื่องบินบินได้
3. นกกระจอกเทศบินไม่ได้

**ข้อสรุปใดถูกต้อง:**
ก. เครื่องบินเป็นนก
ข. นกกระจอกเทศไม่ใช่นก
ค. สัตว์ที่บินได้คือนก
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "นก" อยู่ในวง "บินได้"
- วาดจุด "เครื่องบิน" อยู่ในวง "บินได้" (แต่อาจจะอยู่นอกวงนก)
- วาดจุด "นกกระจอกเทศ" อยู่ข้างนอกวง "บินได้"

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="180" cy="110" r="85" fill="#f8fafc" stroke="#94a3b8" />
<text x="180" y="45" font-size="12" fill="#64748b" text-anchor="middle">บินได้</text>
<circle cx="150" cy="120" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="150" y="125" font-size="10" fill="#1e40af" text-anchor="middle">นก</text>
<circle cx="210" cy="90" r="4" fill="#f59e0b" />
<text x="220" y="85" font-size="10" fill="#92400e" font-weight="bold">เครื่องบิน</text>
<circle cx="320" cy="110" r="4" fill="#ef4444" />
<text x="320" y="130" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">นกกระจอกเทศ</text>
</svg>
</div>

- เมื่อ "นกกระจอกเทศ" อยู่ข้างนอกวงบินได้ และวง "นก" ทั้งหมดอยู่ข้างในวงบินได้
- สรุปได้แน่นอนว่า "นกกระจอกเทศ" ไม่สามารถเข้าไปอยู่ในวง "นก" ได้เลย
- **ดังนั้น ข้อ ข. ถูกต้องที่สุด**

---

### ตัวอย่างที่ 9 : ระดับยาก (ความสัมพันธ์ไขว้)
**เหตุ:**
1. นักการเมืองบางคนเป็นคนซื่อสัตย์
2. คนซื่อสัตย์ทุกคนหัวล้าน
3. สมปองเป็นนักการเมืองที่หัวไม่ล้าน

**ข้อสรุปใดถูกต้อง:**
ก. สมปองเป็นคนซื่อสัตย์
ข. สมปองไม่ใช่คนซื่อสัตย์
ค. นักการเมืองทุกคนหัวล้าน
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "คนซื่อสัตย์" อยู่ในวง "หัวล้าน"
- วาดวง "นักการเมือง" ไปเหลื่อมกับ "คนซื่อสัตย์"
- สมปอง เป็นจุดที่อยู่ใน "นักการเมือง" แต่นอกวง "หัวล้าน"

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="220" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="220" y="45" font-size="12" fill="#64748b" text-anchor="middle">หัวล้าน</text>
<circle cx="200" cy="120" r="35" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" />
<text x="200" y="125" font-size="10" fill="#92400e" text-anchor="middle">ซื่อสัตย์</text>
<circle cx="130" cy="110" r="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="100" y="70" font-size="12" fill="#1e40af" text-anchor="middle">นักการเมือง</text>
<circle cx="90" cy="110" r="4" fill="#ef4444" />
<text x="80" y="125" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">สมปอง</text>
</svg>
</div>

- ในเมื่อสมปองอยู่นอกวง "หัวล้าน" และวง "คนซื่อสัตย์" ทั้งหมดอยู่ในวงหัวล้าน
- สมปองจึงไม่มีทางซ้อนทับกับวง "คนซื่อสัตย์" ได้
- **ดังนั้น ข้อ ข. ถูกต้อง**

---

### ตัวอย่างที่ 10 : ระดับปานกลาง
**เหตุ:**
1. วิชาที่ยากมักมีคนตกเยอะ
2. วิชาคณิตศาสตร์เป็นวิชาที่ยาก
3. มานีสอบตกวิชาคณิตศาสตร์

**ข้อสรุปใด "ไม่" สมเหตุสมผล:**
ก. มานีอาจจะเรียนไม่เก่ง
ข. วิชาคณิตศาสตร์มีคนตกเยอะ
ค. คณิตศาสตร์ยากจึงทำให้มานีตก
ง. สรุปไม่ได้ว่าคณิตศาสตร์ยากที่สุด

**เฉลยและวิธีคิด:**
- "มักมี" ในตรรกศาสตร์ ก.พ. ให้ตีความว่า "บางคน/บางส่วน" หรือ "มีแนวโน้ม" ซึ่งวาดเป็นวงเหลื่อม
- วิชาคณิตศาสตร์ (จุด) อยู่ในวง "วิชาที่ยาก"
- วง "คนตกเยอะ" ไปเหลื่อมกับวง "วิชาที่ยาก"

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 200" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="150" cy="100" r="65" fill="#f8fafc" stroke="#94a3b8" />
<text x="150" y="50" font-size="12" fill="#64748b" text-anchor="middle">ยาก</text>
<circle cx="250" cy="100" r="65" fill="#fef2f2" stroke="#ef4444" stroke-width="2" fill-opacity="0.4" />
<text x="250" y="50" font-size="12" fill="#b91c1c" text-anchor="middle">ตกเยอะ</text>
<circle cx="130" cy="110" r="4" fill="#3b82f6" />
<text x="130" y="125" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">คณิตศาสตร์</text>
</svg>
</div>

- การที่มานีตก อาจจะเป็นเพราะคณิตศาสตร์อยู่ในส่วนที่เหลื่อม หรือมานีอาจจะตกเพราะเหตุผลส่วนตัวก็ได้
- ในเชิงตรรกะแบบแผนภาพ ข้อที่ "ไม่" สามารถฟันธงได้ 100% ว่าเกิดจากอะไรคือข้อ ค. (เพราะแผนภาพบอกแค่ว่ามันยาก แต่อาจจะไม่ใช่เหตุผลเดียวที่ทำให้ตก)
- **โจทย์ถามข้อที่ไม่สมเหตุสมผล: ตอบ ข้อ ค.**

---

### ตัวอย่างที่ 11 : ระดับยากมาก (เซตว่าง)
**เหตุ:**
1. ไม่มีมดตัวใดบินได้
2. ยุงทุกตัวบินได้
3. แมลงวันบางตัวบินได้

**ข้อสรุปใดถูกต้อง:**
ก. ยุงบางตัวเป็นมด
ข. ยุงและแมลงวันเป็นพวกเดียวกัน
ค. ไม่มีมดตัวใดเป็นยุง
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "มด" แยกขาดจากวง "บินได้"
- วาดวง "ยุง" อยู่ในวง "บินได้"
- วาดวง "แมลงวัน" เหลื่อมกับวง "บินได้"

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 220" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="350" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="350" y="45" font-size="12" fill="#64748b" text-anchor="middle">บินได้</text>
<circle cx="320" cy="120" r="30" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="320" y="125" font-size="10" fill="#1e40af" text-anchor="middle">ยุง</text>
<circle cx="100" cy="110" r="50" fill="#fef2f2" stroke="#ef4444" stroke-width="2" />
<text x="100" y="115" font-size="12" fill="#b91c1c" text-anchor="middle" font-weight="bold">มด</text>
<circle cx="420" cy="110" r="60" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" fill-opacity="0.4" />
<text x="440" y="70" font-size="10" fill="#166534" text-anchor="middle">แมลงวัน</text>
</svg>
</div>

- จะเห็นว่าวง "มด" และวง "ยุง" อยู่คนละที่กันโดยสิ้นเชิง ไม่มีทางทับกันได้
- **ดังนั้น ข้อ ค. สรุปได้ถูกต้องแม่นยำที่สุด**

---

### ตัวอย่างที่ 12 : โจทย์สรุปภาพรวม
**เหตุ:**
1. ครูทุกคนเป็นคนใจดี
2. คนใจดีบางคนชอบกินขนมหวาน
3. สมศรีชอบกินขนมหวานแต่ไม่ใจดี

**ข้อสรุปใดถูกต้อง:**
ก. สมศรีเป็นครู
ข. สมศรีไม่เป็นครู
ค. ครูทุกคนชอบกินขนมหวาน
ง. สรุปไม่ได้

**เฉลยและวิธีคิด:**
- วาดวง "ครู" อยู่ในวง "คนใจดี"
- วาดวง "ชอบกินขนม" เหลื่อมกับ "คนใจดี"
- สมศรี เป็นจุดที่อยู่ใน "ชอบกินขนม" แต่อยู่ "นอก" วงคนใจดี

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<circle cx="220" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="220" y="45" font-size="12" fill="#64748b" text-anchor="middle">คนใจดี</text>
<circle cx="200" cy="120" r="35" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="200" y="125" font-size="10" fill="#1e40af" text-anchor="middle">ครู</text>
<circle cx="130" cy="110" r="60" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" fill-opacity="0.4" />
<text x="100" y="70" font-size="12" fill="#92400e" text-anchor="middle">ชอบขนม</text>
<circle cx="90" cy="110" r="4" fill="#ef4444" />
<text x="80" y="125" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">สมศรี</text>
</svg>
</div>

- เมื่อสมศรีอยู่นอกวงคนใจดี และครูทุกคนต้องอยู่ในวงนั้น
- สมศรีจึงไม่มีทางเป็นครูได้เลย
- **ดังนั้น ข้อ ข. ถูกต้อง**
`;
