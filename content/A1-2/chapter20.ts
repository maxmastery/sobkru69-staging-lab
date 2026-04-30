export const CHAPTER_20_LANGUAGE_CONDITION = `
# 6. เงื่อนไขภาษา (Language Conditions)

โจทย์เงื่อนไขภาษาคือการที่โจทย์ให้ข้อความ เงื่อนไข หรือข้อกำหนดที่ซับซ้อนมาเป็นร่ายยาว แล้วให้เราหาข้อสรุปว่าข้อมูลเหล่านั้นนำมาสู่ผลลัพธ์อะไร ซึ่งหัวข้อนี้อาศัย **"การวิเคราะห์และการจัดระเบียบข้อมูล"** เป็นหลัก

## 6.1 เทคนิคการแก้ปัญหา: การสร้างตาราง (Matrix Method)

สิ่งที่จะช่วยชีวิตคุณในห้องสอบได้มากที่สุดสำหรับโจทย์แนวนี้คือ **"การวาดตาราง"** เพื่อนำตัวหนังสือที่ยุบยับมาเรียงลงในช่องว่างให้เห็นภาพรวม

### ขั้นตอนการพิชิตเงื่อนไขภาษา

*   **ขั้นตอนที่ 1:** กำหนดลำดับก่อนหลัง ให้เงื่อนไขทั้งหมด (อ่านผ่านๆ 1 รอบเพื่อประเมินสถานการณ์)
*   **ขั้นตอนที่ 2:** หา **"ตัวแปรประธาน"** (เช่น ชื่อคน, ชื่อเมือง) นำมาเป็นหัวตารางด้านซ้ายหรือด้านบน
*   **ขั้นตอนที่ 3:** ใส่ข้อมูลตามเงื่อนไขที่ **"ให้มาอย่างชัดเจนที่สุด"** ลงไปก่อน (เช่น "A ชอบสีแดงอย่างแน่นอน")
*   **ขั้นตอนที่ 4:** กลับไปพิจารณา **เงื่อนไขส่วนที่เหลือ** นำข้อมูลที่เชื่อมโยงกับสิ่งที่เราใส่ไปแล้วมาลงตารางต่อ
*   **ขั้นตอนที่ 5:** พิจารณา **ช่องว่างที่เหลือ** โดยใช้ตรรกะแบบคัดออก (Process of Elimination) 

---

## 6.2 การสังเกตและตีความ

โจทย์ลักษณะนี้มักมี "คำลวง" หรือ "เงื่อนไขซ่อนเร้น" 
1.  **ต้องใช้ข้อมูลทั้งหมดเสมอ:** ถ้ามีช่องไหนเหลือ แสดงว่าคุณอาจมองข้ามเงื่อนไขบางอย่างไป หรือโจทย์บอกว่าข้อมูลไม่จำเพาะเจาะจง
2.  **ระวังคำว่า "ไม่":** "B ไม่ใช่คนขับรถ" แปลว่าถ้าตำแหน่งไหนคือคนขับรถ ให้กากบาทช่องนั้นของ B ทิ้ง
3.  **ความสัมพันธ์แบบจับคู่:** บ่อยครั้ง ถ้ายืนยันได้ว่า A คือวิศวกร ก็สามารถกากบาทอาชีพวิศวกรในช่องของ B, C, D ทิ้งได้เลย (ถ้าทุกคนทำอาชีพไม่ซ้ำกัน)

---

## 6.3 หลักการตอบข้อสอบ (แบบเดียวกับเงื่อนไขสัญลักษณ์)

*   **ตอบ 1:** ข้อสรุปทั้งสอง เป็นจริงตามเงื่อนไข
*   **ตอบ 2:** ข้อสรุปทั้งสอง ผิด/ไม่เป็นจริงตามเงื่อนไข
*   **ตอบ 3:** ข้อสรุปทั้งสอง ไม่สามารถสรุปได้แน่ชัด
*   **ตอบ 4:** ข้อสรุปทั้งสอง มีคำตอบที่ไม่เหมือนกัน (อันหนึ่งจริง อีกอันไม่แน่ชัด ฯลฯ)

---

## ตัวอย่างโจทย์ (ระดับง่าย - กลาง - ยาก)

### ข้อมูลสำหรับตัวอย่างที่ 1-2 (ระดับง่าย - ปานกลาง)
พนักงานบริษัท 4 คน ได้แก่ สมปอง, สมศรี, สมชาย, และสมนาม ชอบดื่มเครื่องดื่มไม่ซ้ำกัน (กาแฟ, ชาเขียว, น้ำส้ม, นมสด) และชอบสัตว์เลี้ยงไม่ซ้ำกัน (สุนัข, แมว, ปลา, นก) โดยมีเงื่อนไขดังนี้:
1. สมชายแพ้คาเฟอีนและไม่ชอบสัตว์มีขน
2. สมปองชอบดื่มกาแฟ
3. คนที่ชอบกินชาเขียวจะเลี้ยงแมว
4. สมนามเลี้ยงสุนัข

**วิธีทำตารางวิเคราะห์เบื้องต้น:**
*   สมปอง = ดื่มกาแฟ (เลี้ยงแมวไม่ได้ เพราะดื่มกาแฟ เลี้ยงสุนัขไม่ได้เพราะสมนามเลี้ยง)
*   สมนาม = เลี้ยงสุนัข (ดื่มกาแฟไม่ได้ เพราะสมปองดื่ม ดื่มชาเขียวไม่ได้เพราะคนดื่มชาเขียวต้องเลี้ยงแมว)
*   เงื่อนไขที่ 3 "คนชอบชาเขียวจะเลี้ยงแมว" ต้องเป็นคู่กัน คนที่จะเหมาคู่นี้ได้ต้องเป็นคนที่ช่องเครื่องดื่มและสัตว์เลี้ยงว่างทั้งคู่ คือ สมศรี! ดังนั้น สมศรี ดื่มชาเขียว เลี้ยงแมว
*   สมชายแพ้คาเฟอีนและขนสัตว์ -> สัตว์ไม่มีขนที่เหลือคือ ปลา ดังนั้น สมชายเลี้ยงปลา เครื่องดื่มที่เหลือคือ น้ำส้ม (สมชายดื่มน้ำส้ม)
*   กลับไปที่สมนาม เครื่องดื่มที่เหลือให้สมนามคือนมสด และสมปองสัตว์เลี้ยงที่เหลือคือนก

<div class="flex justify-center my-6">
<svg viewBox="0 0 500 200" class="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
<rect width="500" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1"/>
<rect x="20" y="20" width="100" height="30" fill="#3b82f6" rx="4"/><text x="70" y="40" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">ชื่อ</text>
<rect x="130" y="20" width="150" height="30" fill="#10b981" rx="4"/><text x="205" y="40" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">เครื่องดื่ม</text>
<rect x="290" y="20" width="150" height="30" fill="#f59e0b" rx="4"/><text x="365" y="40" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">สัตว์เลี้ยง</text>
<text x="70" y="75" font-size="14" fill="#334155" text-anchor="middle">สมปอง</text>
<text x="205" y="75" font-size="14" fill="#059669" text-anchor="middle" font-weight="bold">กาแฟ (เงื่อนไข 2)</text>
<text x="365" y="75" font-size="14" fill="#d97706" text-anchor="middle">นก (เหลือ 1)</text>
<text x="70" y="110" font-size="14" fill="#334155" text-anchor="middle">สมนาม</text>
<text x="205" y="110" font-size="14" fill="#059669" text-anchor="middle">นมสด (เหลือ 1)</text>
<text x="365" y="110" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">สุนัข (เงื่อนไข 4)</text>
<text x="70" y="145" font-size="14" fill="#334155" text-anchor="middle">สมศรี</text>
<text x="205" y="145" font-size="14" fill="#059669" text-anchor="middle" font-weight="bold">ชาเขียว (คู่แมว)</text>
<text x="365" y="145" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">แมว (เงื่อนไข 3)</text>
<text x="70" y="180" font-size="14" fill="#334155" text-anchor="middle">สมชาย</text>
<text x="205" y="180" font-size="14" fill="#059669" text-anchor="middle" font-weight="bold">น้ำส้ม (ไม่คาเฟอีน)</text>
<text x="365" y="180" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">ปลา (ไม่มีขน)</text>
<line x1="20" y1="55" x2="480" y2="55" stroke="#cbd5e1" stroke-width="1"/>
<line x1="20" y1="90" x2="480" y2="90" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
<line x1="20" y1="125" x2="480" y2="125" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
<line x1="20" y1="160" x2="480" y2="160" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
</svg>
</div>

สรุปจากตาราง:
- สมปอง : กาแฟ, นก
- สมศรี : ชาเขียว, แมว
- สมชาย : น้ำส้ม, ปลา
- สมนาม : นมสด, สุนัข

---

### ตัวอย่างที่ 1: ระดับง่าย

**ข้อสรุปที่ 1:** สมปองเลี้ยงนก
**ข้อสรุปที่ 2:** สมนามดื่มนมสด

**การวิเคราะห์ข้อสรุป:**
ข้อสรุป 1: จากการแทนค่าในตาราง สมปองเลี้ยงนกจริง $\\rightarrow$ **จริง**
ข้อสรุป 2: สมนามได้เครื่องดื่มที่เหลือคือนมสด $\\rightarrow$ **จริง**

**ตอบ ช้อยส์ 1** (จริงทั้งสองข้อ)

---

### ตัวอย่างที่ 2: ระดับกลาง

**ข้อสรุปที่ 1:** สมชายเลี้ยงปลาแต่ดื่มชาเขียว
**ข้อสรุปที่ 2:** คนที่ดื่มน้ำส้มคือสมปอง

**การวิเคราะห์ข้อสรุป:**
ข้อสรุป 1: สมชายเลี้ยงปลา (จริง) แต่ดื่มน้ำส้ม ไม่ใช่ชาเขียว $\\rightarrow$ ข้อสรุปนี้เป็น **เท็จ**
ข้อสรุป 2: สมปองดื่มกาแฟ ไม่ใช่น้ำส้ม (คนที่ดื่มน้ำส้มคือสมชาย) $\\rightarrow$ ข้อสรุปนี้เป็น **เท็จ**

**ตอบ ช้อยส์ 2** (เท็จทั้งสองข้อ)

---

### ตัวอย่างที่ 3: ระดับยาก (ต้องตีความความสัมพันธ์ด้านเวลา)

**เงื่อนไขตารางเวรทำความสะอาด:**
มีนักเรียน 5 คน (A, B, C, D, E) ต้องจัดเวรทำความสะอาดในวัน จันทร์ ถึง ศุกร์ (1 คนต่อ 1 วัน)
1. C ทำความสะอาดก่อน D แต่หลังจาก A
2. B ทำความสะอาดในวันรุ่งขึ้นหลังจาก E ทันที
3. A ไม่ได้ทำความสะอาดในวันจันทร์

**ข้อสรุปที่ 1:** C ทำความสะอาดในวันพุธ
**ข้อสรุปที่ 2:** E ทำความสะอาดในวันจันทร์หรืออังคาร

<div class="my-6 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
  <div class="bg-indigo-50 px-5 py-4">
    <div class="text-xl font-black text-indigo-950">วิธีทำตารางวิเคราะห์</div>
    <div class="mt-1 text-sm font-semibold text-indigo-700">เริ่มจากล็อกเงื่อนไขที่ “ติดกัน” ก่อน แล้วค่อยวางลำดับ A → C → D</div>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[680px] border-collapse text-sm">
      <thead>
        <tr class="bg-slate-900 text-white">
          <th class="px-4 py-3 text-left">ขั้น</th>
          <th class="px-4 py-3 text-left">เงื่อนไขที่ใช้</th>
          <th class="px-4 py-3 text-left">สรุปที่ได้</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-700">
        <tr>
          <td class="px-4 py-3 font-black text-indigo-700">1</td>
          <td class="px-4 py-3">B ต้องอยู่วันรุ่งขึ้นหลัง E ทันที</td>
          <td class="px-4 py-3">E และ B ต้องเป็นคู่วันติดกันแบบ E → B</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-black text-indigo-700">2</td>
          <td class="px-4 py-3">A ไม่ใช่วันจันทร์ และต้องมาก่อน C กับ D</td>
          <td class="px-4 py-3">ถ้าให้ A อยู่เร็วเกินไป จะชนพื้นที่ของคู่ E → B</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-black text-indigo-700">3</td>
          <td class="px-4 py-3">ต้องเหลือพื้นที่ให้ A → C → D เรียงต่อกัน</td>
          <td class="px-4 py-3">จึงวาง E = จันทร์, B = อังคาร และ A, C, D อยู่ พุธ-พฤหัส-ศุกร์</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="my-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  <div class="grid grid-cols-5 bg-slate-50 text-center text-sm font-black text-slate-500">
    <div class="px-3 py-3">จันทร์</div>
    <div class="px-3 py-3">อังคาร</div>
    <div class="px-3 py-3">พุธ</div>
    <div class="px-3 py-3">พฤหัส</div>
    <div class="px-3 py-3">ศุกร์</div>
  </div>
  <div class="grid grid-cols-5 text-center">
    <div class="border-r border-slate-100 px-3 py-5"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-black text-orange-700">E</div></div>
    <div class="border-r border-slate-100 px-3 py-5"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-black text-orange-700">B</div></div>
    <div class="border-r border-slate-100 px-3 py-5"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-700">A</div></div>
    <div class="border-r border-slate-100 px-3 py-5"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-700">C</div></div>
    <div class="px-3 py-5"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-700">D</div></div>
  </div>
</div>

<div class="my-6 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[620px] border-collapse text-sm">
      <thead>
        <tr class="bg-emerald-50 text-emerald-900">
          <th class="px-4 py-3 text-left">ข้อสรุป</th>
          <th class="px-4 py-3 text-left">ตรวจจากตาราง</th>
          <th class="px-4 py-3 text-center">ผล</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-700">
        <tr>
          <td class="px-4 py-3 font-bold">ข้อสรุป 1: C ทำความสะอาดวันพุธ</td>
          <td class="px-4 py-3">ตารางจริง C อยู่วันพฤหัส</td>
          <td class="px-4 py-3 text-center"><span class="rounded-full bg-red-100 px-3 py-1 font-black text-red-700">เท็จ</span></td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-bold">ข้อสรุป 2: E ทำความสะอาดวันจันทร์หรืออังคาร</td>
          <td class="px-4 py-3">ตารางจริง E อยู่วันจันทร์ จึงเข้าเงื่อนไข “หรือ”</td>
          <td class="px-4 py-3 text-center"><span class="rounded-full bg-emerald-100 px-3 py-1 font-black text-emerald-700">จริง</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

ข้อสรุปทั้งสองให้คำตอบไม่เหมือนกัน! (อันหนึ่งเท็จ อันหนึ่งจริง)
**ตอบ ช้อยส์ 4**
`;
