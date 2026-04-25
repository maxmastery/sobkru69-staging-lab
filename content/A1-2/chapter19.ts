export const CHAPTER_19_SYMBOLIC_CONDITION = `
# 5. เงื่อนไขสัญลักษณ์ (Symbolic Conditions)

เงื่อนไขสัญลักษณ์เป็นหนึ่งในหัวข้อยอดฮิตที่ออกสอบภาค ก. แทบทุกปี เป็นการทดสอบตรรกะและการเปรียบเทียบค่าของตัวแปรต่างๆ โดยไม่ต้องคำนวณเป็นตัวเลขจริง หลักการสำคัญคือการ **ยุบเครื่องหมาย** และ **เดินตามลูกศร (ทิศทางของเครื่องหมาย)**

## 5.1 เครื่องหมายที่ควรรู้และการแปลงเครื่องหมาย

ก่อนทำโจทย์ ต้องจำการแปลงเครื่องหมายปฏิเสธให้เป็นเครื่องหมายปกติให้ได้แม่นยำ:

| เครื่องหมายเดิม | ความหมาย | แปลงเป็นเครื่องหมายปกติ |
| :---: | :---: | :--- |
| $=$ | เท่ากับ | $-$ |
| $\\neq$ | ไม่เท่ากับ | $-$ |
| $\\ngtr$ | ไม่มากกว่า | $\\leq$ (น้อยกว่าหรือเท่ากับ) |
| $\\nless$ | ไม่น้อยกว่า | $\\geq$ (มากกว่าหรือเท่ากับ) |
| $\\not\\geq$ | ไม่มากกว่าหรือเท่ากับ | $<$ (น้อยกว่า) |
| $\\not\\leq$ | ไม่น้อยกว่าหรือเท่ากับ | $>$ (มากกว่า) |


---

## 5.2 TRICK!!! เทคนิคการสรุปผล (สำคัญมาก)

### กรณีที่ 1: เครื่องหมายหันไปทางเดียวกัน (เครื่องหมายผสม)

ถ้าเครื่องหมายทุกตัวในเส้นทางจากตัวแปรแรกไปตัวแปรที่สอง **หันไปในทิศทางเดียวกันทั้งหมด** (เช่น $>$ และ $\\geq$ และ $=$) เราสามารถ **สรุปผลได้แน่นอน**

**กฎการยุบเครื่องหมาย:**
ให้ยึดเครื่องหมายที่ "แคบกว่า" (ไม่มี "หรือเท่ากับ") เป็นหลัก!
1.  มี $>$ รวมกับ $\\geq$ หรือ $=$  $\\rightarrow$  **สรุปเป็น $>$**
2.  มี $<$ รวมกับ $\\leq$ หรือ $=$  $\\rightarrow$  **สรุปเป็น $<$**
3.  มีแค่ $\\geq$ ขวางด้วย $=$  $\\rightarrow$  **สรุปเป็น $\\geq$**

> **ตัวอย่าง:**
> กำหนดให้ $A > B \\geq C$
> ถาม: $A > C$ (จริงหรือไม่?)
> **ตอบ:** **เป็นจริง** (ยุบ $A > B \\geq C$ ให้อยู่ตระกูลเดียวกัน ยึดตาม $>$ ได้ $A > C$)

---

### กรณีที่ 2: เครื่องหมายหันสวนทางกัน (ชนกัน)

ถ้าในเส้นทางมีเครื่องหมายที่ **หันหน้าชนกัน** (เช่น $>$ กับ $<$) หรือ **หันหลังชนกัน** (เช่น $<$ กับ $>$) กั้นอยู่ระหว่างตัวแปรสองตัวที่เรากำลังเปรียบเทียบ

**สรุปทันทีว่า: "ไม่แน่ชัด" (N)**

> **ตัวอย่าง:**
> กำหนดให้ $A < B > C$ หรือ $A \\geq B < D$
> ไม่ว่าโจทย์จะถามเปรียบเทียบ $A$ กับ $C$ ว่าอย่างไร ($A > C$, $A < C$, $A = C$)
> **ตอบ:** **ไม่แน่ชัด** ทั้งหมด! เพราะมันเดินชนขัดแย้งกัน

---

## 5.3 หลักการตอบข้อสอบ

ข้อสอบเงื่อนไขสัญลักษณ์มักจะให้หาข้อสรุป 2 ข้อ แล้วเลือกตอบตามเงื่อนไขนี้ (99% ของข้อสอบจริงจะเป็นช้อยส์แบบนี้):

*   **ตอบ 1:** ถ้าข้อสรุปทั้งสอง ถูกต้องหรือเป็นจริงตามเงื่อนไข (จริง + จริง)
*   **ตอบ 2:** ถ้าข้อสรุปทั้งสอง ผิดหรือไม่เป็นจริงตามเงื่อนไข (เท็จ + เท็จ)
*   **ตอบ 3:** ถ้าข้อสรุปทั้งสอง ไม่สามารถสรุปได้แน่ชัด (ไม่แน่ชัด + ไม่แน่ชัด)
*   **ตอบ 4:** ถ้าข้อสรุปทั้งสอง มีข้อสรุปใดข้อสรุปหนึ่งที่เป็นจริง หรือไม่เป็นจริง หรือไม่แน่ชัด **ซึ่งไม่เท่ากันอีกข้อหนึ่ง** (เช่น ข้อนึงจริง อีกข้อเท็จ หรือ ข้อนึงจริง อีกข้อไม่แน่ชัด)

---

## ตัวอย่างโจทย์ (ระดับง่าย - กลาง - ยาก)

### ตัวอย่างที่ 1: ระดับง่าย
**เงื่อนไข:** $A > B > C + D = E$ และ $F > D > G < A$

<div class="flex justify-center my-6">
<svg viewBox="0 0 350 100" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="100" fill="#f8fafc" rx="8" stroke="#cbd5e1"/>
<text x="175" y="30" font-size="16" fill="#1e293b" text-anchor="middle" font-weight="bold">การเดินเส้นทาง (A ไป C+D)</text>
<path d="M 50 60 L 120 60 L 210 60 L 300 60" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-1)" />
<circle cx="50" cy="60" r="15" fill="#3b82f6" /><text x="50" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">A</text>
<rect x="70" y="50" width="30" height="20" fill="#fff" /><text x="85" y="65" font-size="14" text-anchor="middle" fill="#ef4444" font-weight="bold">&gt;</text>
<circle cx="120" cy="60" r="15" fill="#3b82f6" /><text x="120" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">B</text>
<rect x="150" y="50" width="30" height="20" fill="#fff" /><text x="165" y="65" font-size="14" text-anchor="middle" fill="#ef4444" font-weight="bold">&gt;</text>
<rect x="190" y="45" width="45" height="30" rx="4" fill="#3b82f6" /><text x="212" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">C+D</text>
<rect x="250" y="50" width="30" height="20" fill="#fff" /><text x="265" y="64" font-size="14" text-anchor="middle" fill="#ef4444" font-weight="bold">=</text>
<circle cx="300" cy="60" r="15" fill="#3b82f6" /><text x="300" y="65" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">E</text>
<defs>
<marker id="arr-1" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
</marker>
</defs>
</svg>
</div>

**ข้อสรุปที่ 1:** $A > C + D$
**ข้อสรุปที่ 2:** $B > D$

**วิธีทำ:**
**พิจารณาข้อสรุปที่ 1:** $A > C + D$
จากเงื่อนไข $A > B > C + D$
เครื่องหมายหันไปทางเดียวกัน ยุบรวมกันยึดอันที่เสถียรที่สุดคือ $>$
ดังนั้น $A > C + D$ เป็น **จริง**

**พิจารณาข้อสรุปที่ 2:** $B > D$
จากเงื่อนไข $B > C + D$
หาก $B$ มากกว่าผลรวมของ $C$ และ $D$ ดังนั้น $B$ ย่อมมีค่ามากกว่า $D$ ตัวเดียวอย่างแน่นอน ($B > D$)
ดังนั้น $B > D$ เป็น **จริง**

**ข้อสรุป:** จริง และ จริง
**ตอบ ช้อยส์ 1**

---

### ตัวอย่างที่ 2: ระดับกลาง
**เงื่อนไข:** $A \\nless B > C \\ngtr D = E$ และ $E = F < G > H$

<div class="flex justify-center my-6">
<svg viewBox="0 0 450 150" class="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
<rect width="450" height="150" fill="#fef2f2" rx="8" stroke="#fecaca"/>
<text x="225" y="30" font-size="14" fill="#991b1b" text-anchor="middle" font-weight="bold">การแปลงเครื่องหมายก่อนทำโจทย์</text>
<rect x="20" y="50" width="410" height="30" rx="4" fill="#fff" />
<text x="225" y="70" font-size="14" text-anchor="middle" fill="#475569">
      A <tspan fill="#ef4444" font-weight="bold">\u226E</tspan> B &gt; C <tspan fill="#ef4444" font-weight="bold">\u226F</tspan> D = E
</text>
<path d="M 225 85 L 225 105" stroke="#ef4444" stroke-width="2" marker-end="url(#arr-down)"/>
<rect x="20" y="110" width="410" height="30" rx="4" fill="#fff" stroke="#10b981"/>
<text x="225" y="130" font-size="14" text-anchor="middle" fill="#475569">
      A <tspan fill="#10b981" font-weight="bold">\u2265</tspan> B &gt; C <tspan fill="#10b981" font-weight="bold">\u2264</tspan> D = E
</text>
<defs>
<marker id="arr-down" viewBox="0 0 10 10" refX="5" refY="5" marker-width="4" marker-height="4" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
</marker>
</defs>
</svg>
</div>

**ข้อสรุปที่ 1:** $A \\geq B$
**ข้อสรุปที่ 2:** $F = D$

**วิธีทำ:**
**แปลงเงื่อนไขก่อน:**
$A \\nless B$ แปลงเป็น $A \\geq B$
$C \\ngtr D$ แปลงเป็น $C \\leq D$
ดังนั้นเงื่อนไขหลักคือ: **$A \\geq B > C \\leq D = E = F < G > H$**

**พิจารณาข้อสรุปที่ 1:** $A \\geq B$
เมื่อเทียบกับเงื่อนไขที่แปลงแล้ว จะเห็นว่า $A \\geq B$ ตรงกับเงื่อนไขพอดี
ดังนั้น ข้อสรุปที่ 1 เป็น **จริง**

**พิจารณาข้อสรุปที่ 2:** $F = D$
จากเงื่อนไข $D = E$ และ $E = F$
เมื่อเชื่อมต่อกัน จะได้ $D = E = F$ ยุบสมการได้ $D = F$ 
ดังนั้น ข้อสรุปที่ 2 เป็น **จริง**

**ข้อสรุป:** จริง และ จริง
**ตอบ ช้อยส์ 1**

---

### ตัวอย่างที่ 3: ระดับยาก (ต้องระวังเครื่องหมายสวนทาง)
**เงื่อนไข:** $M \\leq N < P = Q \\ngtr R$ และ $S > P \\geq T$

<div class="flex justify-center my-6">
<svg viewBox="0 0 400 120" class="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="120" fill="#fffbeb" rx="8" stroke="#fde68a"/>
<text x="200" y="30" font-size="14" fill="#92400e" text-anchor="middle" font-weight="bold">ระวังเครื่องหมายสวนทางกัน = ไม่แน่ชัด (N)</text>
<path d="M 120 70 L 280 70" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" />
<circle cx="120" cy="70" r="15" fill="#f59e0b" /><text x="120" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">N</text>
<rect x="150" y="60" width="30" height="20" fill="#fff" rx="4" /><text x="165" y="75" font-size="14" text-anchor="middle" fill="#ef4444" font-weight="bold">&lt;</text>
<circle cx="200" cy="70" r="15" fill="#f59e0b" /><text x="200" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">P</text>
<rect x="230" y="60" width="30" height="20" fill="#fff" rx="4" /><text x="245" y="75" font-size="14" text-anchor="middle" fill="#ef4444" font-weight="bold">\u2265</text>
<circle cx="280" cy="70" r="15" fill="#f59e0b" /><text x="280" y="75" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">T</text>
<path d="M 165 90 L 180 105 M 180 90 L 165 105" stroke="#ef4444" stroke-width="3" />
<path d="M 235 90 L 250 105 M 250 90 L 235 105" stroke="#ef4444" stroke-width="3" />
<text x="200" y="105" font-size="12" fill="#ef4444" text-anchor="middle" font-weight="bold">สวนทางกัน! = N</text>
</svg>
</div>

**ข้อสรุปที่ 1:** $M < Q$ 
**ข้อสรุปที่ 2:** $N > T$

**วิธีทำ:**
**แปลงเงื่อนไขก่อน:**
$Q \\ngtr R$ แปลงเป็น $Q \\leq R$
เงื่อนไขที่ 1: **$M \\leq N < P = Q \\leq R$**
เงื่อนไขที่ 2: **$S > P \\geq T$**

**พิจารณาข้อสรุปที่ 1:** $M < Q$
เดินจาก $M$ ไปหา $Q$ ในเงื่อนไขที่ 1: $M \\leq N < P = Q$
เครื่องหมายหันทางเดียวกันทั้งหมดคือ $\\leq, <, =$
ยุบรวมกัน ยึดเครื่องหมายที่แคบเด็ดขาดที่สุดคือ $<$
จะได้ $M < Q$
ดังนั้น ข้อสรุปที่ 1 เป็น **จริง**

**พิจารณาข้อสรุปที่ 2:** $N > T$
ต้องหาตัวเชื่อมระหว่างบรรทัด 1 กับ 2 ซึ่งก็คือ $P$
บรรทัด 1 เดินจาก $N$ ไป $P$: $N < P$
บรรทัด 2 เดินจาก $P$ ไป $T$: $P \\geq T$
นำมาต่อกันโดยให้ $P$ อยู่ตรงกลาง: **$N < P \\geq T$**
จะสังเกตเห็นว่า เครื่องหมาย $<$ และ $\\geq$ **หันหน้าสวนทางกัน**!
กฎเหล็กคือเมื่อเครื่องหมายสวนทางกัน จะไม่สามารถสรุปความสัมพันธ์ของตัวแปรหัวท้ายได้
ดังนั้น ข้อสรุปที่ 2 **ไม่แน่ชัด**

**ข้อสรุป:** ข้อสรุปแรก "จริง" แต่ข้อสรุปสอง "ไม่แน่ชัด" (ผลไม่เหมือนกัน)
**ตอบ ช้อยส์ 4**
`;
