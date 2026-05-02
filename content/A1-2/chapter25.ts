export const CHAPTER_25_REASONING_PRACTICE = `
# 4. แนวข้อสอบ: เรื่องการสรุปเหตุผล

ถึงเวลาทดสอบความเข้าใจในเรื่องการให้เหตุผลและการสรุปความ ทั้งแบบประโยคเงื่อนไข ("ถ้า...แล้ว...", "หรือ") และเทคนิคการวาดรูปหาความสัมพันธ์ (แผนภาพแบบวงกลม) ด้านล่างเป็นแนวข้อสอบจริงที่พบบ่อยในข้อสอบภาค ก. ลองฝึกทำก่อนดูเฉลยนะครับ

---

## 📝 ส่วนที่ 1: ตะลุยโจทย์ประโยคตรรกศาสตร์ขั้นพื้นฐาน

### ข้อที่ 1
**เหตุ:**
1. ดอกกุหลาบทุกดอกมีสีขาว
2. ดอกไม้ในแจกันนี้เป็นดอกกุหลาบ

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล**
ก. ดอกไม้ในแจกันนี้มีสีขาว
ข. ดอกไม้ในแจกันนี้สวย
ค. ดอกไม้ในแจกันนี้มีราคาแพง
ง. ดอกไม้ในแจกันนี้มีกลิ่นหอม

**✅ เฉลย: ก. ดอกไม้ในแจกันนี้มีสีขาว**
**วิธีคิด (วาดรูป Venn):** 
<div class="flex justify-center my-6">
<svg viewBox="0 0 400 200" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="100" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="200" y="45" font-size="12" fill="#64748b" text-anchor="middle">มีสีขาว</text>
<circle cx="180" cy="110" r="40" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="180" y="115" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">กุหลาบ</text>
<circle cx="170" cy="110" r="3" fill="#ef4444" />
<text x="155" y="105" font-size="10" fill="#b91c1c" font-weight="bold">ดอกไม้ในแจกัน</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-3 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เหตุ 1</span>กุหลาบทุกดอกอยู่ในกลุ่ม “สีขาว”</div>
      <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><span class="block text-xs font-bold text-emerald-600 mb-1">เหตุ 2</span>ดอกไม้ในแจกันนี้เป็น “กุหลาบ”</div>
      <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4"><span class="block text-xs font-bold text-amber-600 mb-1">สรุป</span>จุดของดอกไม้ในแจกันจึงอยู่ในกลุ่ม “สีขาว” แน่นอน</div>
    </div>
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      <strong>ตอบ ก.</strong> ดอกไม้ในแจกันนี้มีสีขาว เพราะเป็นผลที่ตามจากเหตุโดยตรง ส่วนความสวย ราคา และกลิ่น ไม่ได้มีข้อมูลรองรับในโจทย์
    </div>
  </div>
</div>

---

### ข้อที่ 2
**เหตุ:**
1. ชาวสวนทุกคนเป็นคนขยัน
2. คนขยันทุกคนร่ำรวย
3. คนร่ำรวยทุกคนกินดีอยู่ดี
4. สมศรีเป็นชาวสวน

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล**
ก. สมศรีเป็นคนขยัน
ข. สมศรีเป็นคนร่ำรวย
ค. สมศรีกินดีอยู่ดี
ง. เป็นข้อสรุปที่สมเหตุสมผลทั้งข้อ ก, ข และ ค

**✅ เฉลย: ง. เป็นข้อสรุปที่สมเหตุสมผลทั้งข้อ ก, ข และ ค**
**วิธีคิด (วาดรูป Venn ซ้อนกัน):** 
<div class="flex justify-center my-6">
<svg viewBox="0 0 500 240" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Outside to inside -->
<circle cx="250" cy="120" r="100" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
<text x="250" y="35" font-size="12" fill="#64748b" text-anchor="middle">กินดีอยู่ดี</text>
<circle cx="250" cy="130" r="75" fill="#fdf2f8" stroke="#db2777" stroke-width="1" />
<text x="250" y="70" font-size="11" fill="#9d174d" text-anchor="middle">ร่ำรวย</text>
<circle cx="250" cy="140" r="50" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
<text x="250" y="105" font-size="11" fill="#166534" text-anchor="middle">คนขยัน</text>
<circle cx="250" cy="155" r="30" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="250" y="160" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">ชาวสวน</text>
<circle cx="250" cy="170" r="3" fill="#ef4444" />
<text x="250" y="185" font-size="10" fill="#b91c1c" text-anchor="middle" font-weight="bold">สมศรี</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      โครงสร้างเป็นวงซ้อนกัน: <strong>ชาวสวน → คนขยัน → ร่ำรวย → กินดีอยู่ดี</strong>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">ตำแหน่งของสมศรี</span>สมศรีเป็นชาวสวน จึงอยู่ในวงเล็กสุด</div>
      <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><span class="block text-xs font-bold text-emerald-600 mb-1">ผลที่ตามมา</span>เมื่ออยู่ในวงเล็กสุด ก็อยู่ในวงที่ครอบทั้งหมดด้วย</div>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      <strong>ตอบ ง.</strong> สมศรีเป็นคนขยัน เป็นคนร่ำรวย และกินดีอยู่ดี ทั้งสามข้อจึงสมเหตุสมผล
    </div>
  </div>
</div>

---

### ข้อที่ 3
**เหตุ:**
1. ดาราบางคนเป็นคนเจ้าชู้
2. คนเจ้าชู้ทุกคนเป็นคนมีเสน่ห์
3. ทิดแสงเป็นคนมีเสน่ห์

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล**
ก. ทิดแสงเป็นดารา
ข. ทิดแสงเป็นคนเจ้าชู้
ค. ดาราบางคนเป็นคนมีเสน่ห์
ง. สรุปอย่างแน่นอนไม่ได้

**✅ เฉลย: ค. ดาราบางคนเป็นคนมีเสน่ห์**
**วิธีคิด:**
<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<!-- Charming circle -->
<circle cx="220" cy="110" r="90" fill="#f8fafc" stroke="#94a3b8" />
<text x="220" y="40" font-size="12" fill="#64748b" text-anchor="middle">คนมีเสน่ห์</text>
<!-- Flirtatious circle inside Charming -->
<circle cx="200" cy="120" r="45" fill="#fdf2f8" stroke="#db2777" stroke-width="2" />
<text x="200" y="125" font-size="11" fill="#9d174d" text-anchor="middle" font-weight="bold">คนเจ้าชู้</text>
<!-- Star circle intersecting Flirtatious -->
<circle cx="130" cy="110" r="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="100" y="65" font-size="12" fill="#1e40af" text-anchor="middle">ดารา</text>
<!-- X marks the intersection inside Charming -->
<text x="155" y="125" font-size="14" fill="#1e293b" text-anchor="middle" font-weight="bold">X</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-3 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เหตุ 1</span>ดาราบางคนทับซ้อนกับกลุ่มคนเจ้าชู้</div>
      <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><span class="block text-xs font-bold text-emerald-600 mb-1">เหตุ 2</span>คนเจ้าชู้ทุกคนอยู่ในกลุ่มคนมีเสน่ห์</div>
      <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4"><span class="block text-xs font-bold text-amber-600 mb-1">จุดสำคัญ</span>พื้นที่ที่ดาราทับกับคนเจ้าชู้จึงทับกับคนมีเสน่ห์ด้วย</div>
    </div>
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      <strong>ตอบ ค.</strong> สรุปได้แน่นอนว่า “ดาราบางคนเป็นคนมีเสน่ห์” แต่ยังสรุปไม่ได้ว่าทิดแสงเป็นดาราหรือเป็นคนเจ้าชู้ เพราะโจทย์บอกเพียงว่าทิดแสงเป็นคนมีเสน่ห์
    </div>
  </div>
</div>

---

### ข้อที่ 4
**เหตุ:**
1. ไม่มีหมอคนไหนที่ยากจน
2. คนยากจนทุกคนชอบกินมาม่า
3. สมปองเป็นหมอ

**ข้อสรุปใดถูกต้อง**
ก. สมปองไม่ยากจน
ข. สมปองไม่ชอบกินมาม่า
ค. คนชอบกินมาม่าทุกคนยากจน
ง. สรุปไม่ได้

**✅ เฉลย: ก. สมปองไม่ยากจน**
**วิธีคิด:**
<div class="flex justify-center my-6">
<svg viewBox="0 0 500 220" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- Instant Noodle circle -->
<circle cx="330" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" />
<text x="330" y="45" font-size="12" fill="#64748b" text-anchor="middle">ชอบกินมาม่า</text>
<!-- Poor circle inside -->
<circle cx="310" cy="120" r="40" fill="#fef2f2" stroke="#ef4444" stroke-width="1" />
<text x="310" y="125" font-size="10" fill="#b91c1c" text-anchor="middle">ยากจน</text>
<!-- Doctor circle separate from Poor, potentially intersecting Noodles -->
<circle cx="120" cy="110" r="50" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
<text x="120" y="115" font-size="12" fill="#1e40af" text-anchor="middle" font-weight="bold">หมอ</text>
<circle cx="120" cy="130" r="3" fill="#3b82f6" />
<text x="120" y="145" font-size="10" fill="#1e40af" text-anchor="middle" font-weight="bold">สมปอง</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-3 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เหตุ 1</span>หมอทุกคนแยกออกจากกลุ่มยากจน</div>
      <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><span class="block text-xs font-bold text-emerald-600 mb-1">เหตุ 2</span>คนยากจนอยู่ในกลุ่มคนชอบกินมาม่า</div>
      <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4"><span class="block text-xs font-bold text-amber-600 mb-1">เหตุ 3</span>สมปองเป็นหมอ จึงไม่อยู่ในกลุ่มยากจนแน่นอน</div>
    </div>
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      <strong>ตอบ ก.</strong> สมปองไม่ยากจน ส่วนสมปองชอบกินมาม่าหรือไม่ ยังสรุปไม่ได้ เพราะโจทย์ไม่ได้ห้ามหมอชอบกินมาม่า
    </div>
  </div>
</div>

---

## 📝 ส่วนที่ 2: ตะลุยโจทย์ประโยคเงื่อนไข (แบบตัดช้อยส์, ถ่ายทอด)

### ข้อที่ 5
**เหตุ:**
1. ถ้าฝนตกหนักแล้วน้ำจะท่วม
2. ถ้าน้ำท่วมแล้วจะเกิดโรคระบาด
3. ถ้าเกิดโรคระบาดแล้วประชาชนจะยากจน
4. ประชาชนไม่ยากจน

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล**
ก. เกิดโรคระบาดที่ควบคุมได้
ข. น้ำท่วมไม่มาก
ค. ฝนไม่ตกหนัก
ง. ไม่ข้อสรุปใดสมเหตุสมผล

**✅ เฉลย: ค. ฝนไม่ตกหนัก**
**วิธีคิด (กฎการถ่ายทอดและการแย้งสลับที่):**
<div class="flex justify-center my-6">
<svg viewBox="0 0 500 120" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" marker-width="10" marker-height="10" refX="9" refY="3" orientation="auto" marker-units="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
</marker>
</defs>
<text x="40" y="55" font-size="12" fill="#3b82f6" text-anchor="middle" font-weight="bold">ฝนตกหนัก</text>
<line x1="80" y1="50" x2="130" y2="50" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)" />
<text x="165" y="55" font-size="12" fill="#3b82f6" text-anchor="middle">น้ำท่วม</text>
<line x1="200" y1="50" x2="250" y2="50" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)" />
<text x="295" y="55" font-size="12" fill="#3b82f6" text-anchor="middle">โรคระบาด</text>
<line x1="330" y1="50" x2="380" y2="50" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)" />
<text x="440" y="55" font-size="12" fill="#3b82f6" text-anchor="middle">ยากจน</text>
<text x="440" y="85" font-size="14" fill="#ef4444" text-anchor="middle" font-weight="bold">X (ไม่ยากจน)</text>
<path d="M 440 90 L 40 90" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)" />
<text x="40" y="110" font-size="12" fill="#ef4444" text-anchor="middle">ฝนไม่ตก</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      โครงสร้างถ่ายทอด: <strong>P → Q → R → S</strong><br />
      แปลว่า <strong>ฝนตกหนัก → น้ำท่วม → โรคระบาด → ประชาชนยากจน</strong>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">รวมเงื่อนไข</span>ถ้าฝนตกหนัก จะทำให้ประชาชนยากจน หรือ <strong>P → S</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">ข้อเท็จจริง</span>ประชาชนไม่ยากจน คือ <strong>¬S</strong></div>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      ใช้กฎแย้งสลับที่: เมื่อ <strong>P → S</strong> และเกิด <strong>¬S</strong> จึงย้อนกลับได้ว่า <strong>¬P</strong>
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      <strong>ตอบ ค.</strong> ฝนไม่ตกหนัก
    </div>
  </div>
</div>

---

### ข้อที่ 6
**เหตุ:**
1. ถ้าคนขับรถดื่มสุราจะขับรถด้วยความประมาท
2. ถ้าขับรถด้วยความประมาทจะเกิดอุบัติเหตุ
3. ถ้าเกิดอุบัติเหตุจะทำให้คนขับรถพิการ
4. ถ้าคนขับรถพิการจะทำให้คนในครอบครัวลำบาก
5. คนขับรถไม่ดื่มสุรา

**ข้อสรุปในข้อใดทำให้การอ้างเหตุผลสมเหตุสมผล**
ก. คนขับรถขับรถไม่ประมาท
ข. คนขับรถจะพิการ
ค. ขับรถไม่เกิดอุบัติเหตุ
ง. ไม่มีข้อสรุปใดสมเหตุสมผล

**✅ เฉลย: ง. ไม่มีข้อสรุปใดสมเหตุสมผล**
**วิธีคิด:** (โจทย์ข้อนี้ระวังโดนหลอก!)
<div class="flex justify-center my-6">
<svg viewBox="0 0 500 150" class="w-full max-w-lg border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow-blue" marker-width="10" marker-height="10" refX="9" refY="3" orientation="auto" marker-units="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
</marker>
</defs>
<text x="50" y="40" font-size="12" fill="#3b82f6" text-anchor="middle" font-weight="bold">ดื่มสุรา</text>
<line x1="85" y1="35" x2="135" y2="35" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)" />
<text x="175" y="40" font-size="12" fill="#3b82f6" text-anchor="middle">ประมาท</text>
<line x1="210" y1="35" x2="260" y2="35" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)" />
<text x="300" y="40" font-size="12" fill="#3b82f6" text-anchor="middle">อุบัติเหตุ</text>
<line x1="340" y1="35" x2="390" y2="35" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)" />
<text x="440" y="40" font-size="12" fill="#3b82f6" text-anchor="middle">พิการ</text>
<text x="50" y="80" font-size="18" fill="#ef4444" text-anchor="middle" font-weight="bold">¬P (ไม่ดื่มสุรา)</text>
<text x="250" y="110" font-size="14" fill="#94a3b8" text-anchor="middle" font-style="italic">เมื่อต้นทางไม่เกิด ผลลัพธ์อาจจะเกิดจากสาเหตุอื่นก็ได้</text>
<text x="250" y="130" font-size="14" fill="#94a3b8" text-anchor="middle" font-style="italic">(จึงสรุปแน่นอนไม่ได้)</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      โครงสร้างถ่ายทอด: <strong>P → Q → R → S → T</strong><br />
      แปลว่า <strong>ดื่มสุรา → ประมาท → อุบัติเหตุ → พิการ → ครอบครัวลำบาก</strong>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">สรุปจากสายเหตุ</span>ถ้าดื่มสุรา ครอบครัวจะลำบาก หรือ <strong>P → T</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">ข้อเท็จจริง</span>คนขับรถไม่ดื่มสุรา คือ <strong>¬P</strong></div>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      จุดหลอกของข้อนี้คือ <strong>¬P ไม่ได้แปลว่า ¬T</strong><br />
      เมื่อเหตุต้นทางไม่เกิด เราฟันธงไม่ได้ว่าผลปลายทางจะเกิดหรือไม่ เพราะอาจมีสาเหตุอื่น เช่น คนอื่นขับมาชน หรือขับประมาทเพราะเล่นมือถือ
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      <strong>ตอบ ง.</strong> ไม่มีข้อสรุปใดสมเหตุสมผล
    </div>
  </div>
</div>

---

### ข้อที่ 7
**เหตุ:**
1. ถ้าฉันมีเงิน ฉันจะซื้อมือถือใหม่
2. สิ่งที่ฉันจะทำต่อไป คือ ซื้อมือถือใหม่ หรือ ไปเที่ยว
3. ฉันไม่มีเงิน

**สรุปว่าอย่างไร:**
ก. ฉันซื้อมือถือใหม่และไปเที่ยว
ข. ฉันไม่ซื้อมือถือใหม่
ค. ฉันไปเที่ยวอย่างแน่นอน
ง. สรุปไม่ได้

**✅ เฉลย: ง. สรุปไม่ได้ (ทริกหลอกซ้อนทริก)** 
**วิธีคิด:** (ระวังสุดๆ ข้อนี้)
<div class="flex justify-center my-6 text-center">
<div class="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full max-w-sm">
<div class="flex justify-around items-center mb-4">
<div class="p-2 bg-blue-100 rounded text-blue-700 text-xs font-bold">มีเงิน</div>
<div class="text-blue-400">→</div>
<div class="p-2 bg-green-100 rounded text-green-700 text-xs font-bold">ซื้อมือถือ</div>
</div>
<div class="text-red-500 font-bold text-sm mb-2">ความเป็นจริง: ไม่มีเงิน</div>
<div class="text-slate-500 text-xs italic">ต้นทางไม่เกิด = สรุปปลายทางไม่ได้</div>
</div>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เหตุ 1</span>มีเงิน → ซื้อมือถือใหม่ หรือ <strong>A → B</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">เหตุ 3</span>ไม่มีเงิน คือ <strong>¬A</strong></div>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      <strong>ระวัง!</strong> จาก <strong>A → B</strong> แล้วรู้ว่า <strong>¬A</strong> ยังสรุปไม่ได้ว่า <strong>¬B</strong><br />
      แปลว่า “ไม่มีเงิน” ไม่ได้บังคับว่า “ไม่ซื้อมือถือ” เพราะอาจซื้อด้วยวิธีอื่น หรืออาจไม่ซื้อก็ได้
    </div>
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      เหตุ 2 บอกว่า “ซื้อมือถือใหม่ หรือ ไปเที่ยว” แต่เราไม่รู้แน่นอนว่าฝั่ง “ซื้อมือถือใหม่” จริงหรือเท็จ จึงตัดเหลือ “ไปเที่ยว” ไม่ได้
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      <strong>ตอบ ง.</strong> สรุปไม่ได้
    </div>
  </div>
</div>

---

### ข้อที่ 8
**เหตุ:**
1. ถ้าฝนตกแล้วเมฆจะมีมาก
2. ถ้าเมฆมีมากแล้วลมจะสงบ
3. วันนี้ลมไม่สงบ

**ข้อสรุปใดสมเหตุสมผล:**
ก. วันนี้ฝนตกแต่ลมไม่สงบ
ข. วันนี้ฝนไม่ตก
ค. วันนี้เมฆมีน้อย
ง. สรุปไม่ได้

**✅ เฉลย: ข. วันนี้ฝนไม่ตก**
**วิธีคิด:**
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      โครงสร้างถ่ายทอด: <strong>ฝนตก → เมฆมาก → ลมสงบ</strong> หรือ <strong>P → Q → R</strong>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">รวมเงื่อนไข</span>ถ้าฝนตก ลมจะสงบ หรือ <strong>P → R</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">ข้อเท็จจริง</span>วันนี้ลมไม่สงบ คือ <strong>¬R</strong></div>
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      ใช้กฎแย้งสลับที่: <strong>P → R</strong> และ <strong>¬R</strong> จึงได้ <strong>¬P</strong><br />
      <strong>ตอบ ข.</strong> วันนี้ฝนไม่ตก
    </div>
  </div>
</div>

---

### ข้อที่ 9
**เหตุ:**
1. ตำรวจทุกคนเป็นคนกล้าหาญ
2. สมัครเป็นคนไม่กล้าหาญ

**ข้อสรุปใดถูกต้อง:**
ก. สมัครไม่ได้เป็นตำรวจ
ข. สมัครเป็นโจร
ค. สมัครเป็นผู้ช่วยตำรวจ
ง. สรุปไม่ได้

**✅ เฉลย: ก. สมัครไม่ได้เป็นตำรวจ**
**วิธีคิด:**
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เงื่อนไข</span>ตำรวจ → กล้าหาญ หรือ <strong>P → Q</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">ข้อเท็จจริง</span>สมัครไม่กล้าหาญ คือ <strong>¬Q</strong></div>
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      ใช้กฎแย้งสลับที่: <strong>P → Q</strong> และ <strong>¬Q</strong> จึงได้ <strong>¬P</strong><br />
      <strong>ตอบ ก.</strong> สมัครไม่ได้เป็นตำรวจ
    </div>
  </div>
</div>

---

### ข้อที่ 10
**เหตุ:**
1. ถ้าเศรษฐกิจดี หุ้นคนจะขึ้น
2. วันนี้หุ้นขึ้น

**ข้อสรุปใดถูกต้อง:**
ก. เศรษฐกิจดีแน่นอน
ข. ตรรกะผิดพลาด
ค. หุ้นขึ้นเพราะต่างชาติซื้อ
ง. สรุปไม่ได้

**✅ เฉลย: ง. สรุปไม่ได้**
**วิธีคิด:**
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เงื่อนไข</span>เศรษฐกิจดี → หุ้นขึ้น หรือ <strong>P → Q</strong></div>
      <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4"><span class="block text-xs font-bold text-amber-600 mb-1">ข้อเท็จจริง</span>วันนี้หุ้นขึ้น คือ <strong>Q</strong></div>
    </div>
    <div class="rounded-2xl bg-red-50 border border-red-100 p-4">
      จุดหลอกของข้อนี้คือ <strong>Q ไม่ได้แปลว่า P</strong><br />
      ผลเกิดแล้ว อาจเกิดจากหลายสาเหตุ เช่น ต่างชาติซื้อ ข่าวดีเฉพาะหุ้น หรือแรงเก็งกำไร ไม่จำเป็นต้องแปลว่าเศรษฐกิจดีแน่นอน
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      <strong>ตอบ ง.</strong> สรุปไม่ได้
    </div>
  </div>
</div>

---

### ข้อที่ 11
**เหตุ:**
1. สมาชิกสโมสรนี้จะเป็นนักกอล์ฟ หรือ นักเทนนิส
2. ประสิทธิ์เป็นสมาชิกสโมสรนี้และเขาไม่ได้เป็นนักกอล์ฟ

**ข้อสรุปใดถูกต้อง:**
ก. ประสิทธิ์เป็นนักเทนนิส
ข. ประสิทธิ์ไม่ชอบตีกอล์ฟ
ค. ประสิทธิ์เป็นทั้งสองอย่าง
ง. สรุปไม่ได้

**✅ เฉลย: ก. ประสิทธิ์เป็นนักเทนนิส**
**วิธีคิด:**
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      ทางเลือกของสมาชิกสโมสรมี 2 ทาง: <strong>นักกอล์ฟ ∨ นักเทนนิส</strong>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">กำหนดสัญลักษณ์</span>นักกอล์ฟ = <strong>A</strong>, นักเทนนิส = <strong>B</strong></div>
      <div class="rounded-2xl bg-red-50 border border-red-100 p-4"><span class="block text-xs font-bold text-red-600 mb-1">ข้อเท็จจริง</span>ประสิทธิ์ไม่ใช่นักกอล์ฟ คือ <strong>¬A</strong></div>
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      เมื่อโจทย์บอกว่า <strong>A ∨ B</strong> และรู้ว่า <strong>¬A</strong> จึงเหลือ <strong>B</strong><br />
      <strong>ตอบ ก.</strong> ประสิทธิ์เป็นนักเทนนิส
    </div>
  </div>
</div>

---

### ข้อที่ 12
**เหตุ:**
1. ถ้าปลูกมะม่วงแล้วจะได้กินผล
2. ถ้าได้กินผลแล้วจะมีความสุข
3. ถ้ามีความสุขแล้วสุขภาพจะดี
4. นายสมชายสุขภาพไม่ดี

**ข้อใดสรุปถูกต้อง:**
ก. สมชายไม่ได้ปลูกมะม่วง
ข. สมชายไม่ได้กินผล
ค. สมชายไม่มีความสุข
ง. ถูกทุกข้อ

**✅ เฉลย: ง. ถูกทุกข้อ**
**วิธีคิด:**
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
      โครงสร้างถ่ายทอด: <strong>ปลูกมะม่วง → ได้กินผล → มีความสุข → สุขภาพดี</strong><br />
      หรือเขียนเป็นสัญลักษณ์ได้ว่า <strong>P → Q → R → S</strong>
    </div>
    <div class="rounded-2xl bg-red-50 border border-red-100 p-4">
      ข้อเท็จจริง: นายสมชายสุขภาพไม่ดี คือ <strong>¬S</strong>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      ใช้กฎแย้งสลับที่ย้อนกลับทีละชั้น: <strong>¬S → ¬R → ¬Q → ¬P</strong>
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      จึงสรุปได้ครบว่า สมชายไม่มีความสุข, ไม่ได้กินผล และไม่ได้ปลูกมะม่วง<br />
      <strong>ตอบ ง.</strong> ถูกทุกข้อ
    </div>
  </div>
</div>

---

### ข้อที่ 13
**เหตุ:**
1. ชาวนาบางคนไม่มีหนี้สิน
2. คนจะสบายต้องไม่มีหนี้สิน

**ข้อใดสมเหตุสมผล:**
ก. ชาวนาบางคนสบาย
ข. คนไม่มีหนี้สินเป็นชาวนา
ค. ตรรกะเชื่อมโยงไม่ได้
ง. สรุปไม่ได้

**✅ เฉลย: ง. สรุปไม่ได้**
**วิธีคิด:**
<div class="flex justify-center my-6">
<svg viewBox="0 0 400 220" class="w-full max-w-sm border border-slate-100 rounded-xl bg-white p-4" xmlns="http://www.w3.org/2000/svg">
<!-- No Debt circle -->
<circle cx="200" cy="110" r="80" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
<text x="200" y="45" font-size="12" fill="#64748b" text-anchor="middle">ไม่มีหนี้สิน</text>
<!-- Comfortable circle inside -->
<circle cx="200" cy="120" r="40" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
<text x="200" y="125" font-size="10" fill="#166534" text-anchor="middle">คนสบาย</text>
<!-- Farmer circle intersecting No Debt -->
<circle cx="120" cy="110" r="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" fill-opacity="0.4" />
<text x="90" y="70" font-size="12" fill="#1e40af" text-anchor="middle">ชาวนา</text>
</svg>
</div>
<div class="my-6 rounded-3xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
  <div class="bg-indigo-50/80 px-5 py-3 border-b border-indigo-100 font-bold text-indigo-800">อ่านเหตุผลแบบเป็นขั้น</div>
  <div class="p-5 space-y-4 text-slate-700 leading-8">
    <div class="grid md:grid-cols-2 gap-3">
      <div class="rounded-2xl bg-blue-50 border border-blue-100 p-4"><span class="block text-xs font-bold text-blue-600 mb-1">เหตุ 1</span>ชาวนาบางคนอยู่ในกลุ่ม “ไม่มีหนี้สิน”</div>
      <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><span class="block text-xs font-bold text-emerald-600 mb-1">เหตุ 2</span>คนสบายอยู่ในกลุ่ม “ไม่มีหนี้สิน”</div>
    </div>
    <div class="rounded-2xl bg-amber-50 border border-amber-100 p-4">
      ทั้ง “ชาวนาบางคน” และ “คนสบาย” มีจุดเชื่อมคือ “ไม่มีหนี้สิน” แต่โจทย์ไม่ได้บอกว่าพื้นที่ของสองกลุ่มนี้ต้องทับกัน
    </div>
    <div class="rounded-2xl bg-red-50 border border-red-100 p-4">
      ดังนั้นยังฟันธงไม่ได้ว่า “ชาวนาบางคนสบาย” หรือ “คนไม่มีหนี้สินเป็นชาวนา”
    </div>
    <div class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
      <strong>ตอบ ง.</strong> สรุปไม่ได้
    </div>
  </div>
</div>
`;
