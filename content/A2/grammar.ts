const A2_GRAMMAR_BASE_CHAPTERS = [
  {
    id: 'a2_g01_parts_of_speech',
    title: '1. Unit 1 Part of Speech ประเภทของคำ',
    content: `
# Unit 1 Part of Speech ประเภทของคำ

<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-l-4 border-blue-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-blue-950 text-4xl font-black leading-tight mb-3">Grammar เริ่มจากรู้ว่า “คำนี้ทำหน้าที่อะไร” ไม่ใช่แปลคำต่อคำ</div>
  <div class="bg-white rounded-2xl border border-blue-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    คำภาษาอังกฤษแบ่งหน้าที่หลักได้ 8 กลุ่ม เรียกว่า <strong>Parts of Speech</strong> ข้อสอบมักไม่ได้ถามชื่อชนิดคำตรง ๆ แต่ให้เลือกคำที่ทำหน้าที่ถูกต้องในตำแหน่งนั้นของประโยค
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">แผนที่ 8 ชนิดคำ</span>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
  <div class="rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm"><div class="text-3xl font-black text-blue-800">Noun</div><div class="text-slate-700 mt-2">คำนาม: คน สัตว์ สิ่งของ สถานที่ ความคิด คุณสมบัติ เช่น teacher, school, honesty</div></div>
  <div class="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm"><div class="text-3xl font-black text-indigo-800">Pronoun</div><div class="text-slate-700 mt-2">คำสรรพนาม: ใช้แทนนาม เช่น I, you, he, it, they, someone</div></div>
  <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm"><div class="text-3xl font-black text-emerald-800">Verb</div><div class="text-slate-700 mt-2">คำกริยา: บอกการกระทำ สภาพ หรือความเป็นอยู่ เช่น teach, learn, is, have</div></div>
  <div class="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm"><div class="text-3xl font-black text-amber-800">Adjective</div><div class="text-slate-700 mt-2">คำคุณศัพท์: ขยายนามหรือสรรพนาม เช่น good, difficult, important</div></div>
  <div class="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm"><div class="text-3xl font-black text-rose-800">Adverb</div><div class="text-slate-700 mt-2">คำกริยาวิเศษณ์: ขยายกริยา คุณศัพท์ กริยาวิเศษณ์ หรือทั้งประโยค เช่น quickly, very, usually</div></div>
  <div class="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm"><div class="text-3xl font-black text-cyan-800">Preposition</div><div class="text-slate-700 mt-2">คำบุพบท: เชื่อมนาม/สรรพนามกับคำอื่น เช่น in, on, at, for, with</div></div>
  <div class="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm"><div class="text-3xl font-black text-violet-800">Conjunction</div><div class="text-slate-700 mt-2">คำสันธาน: เชื่อมคำ วลี หรือประโยค เช่น and, but, because, although</div></div>
  <div class="rounded-3xl border border-pink-200 bg-pink-50 p-5 shadow-sm"><div class="text-3xl font-black text-pink-800">Interjection</div><div class="text-slate-700 mt-2">คำอุทาน: แสดงอารมณ์ เช่น Oh!, Wow!, Ouch!</div></div>
</div>

## <span class="text-4xl font-black text-slate-900">จำแบบเร็ว: นาม แทน ทำ ขยาย เชื่อม อุทาน</span>

<div align="center" class="my-6">
  <div class="inline-block rounded-3xl bg-white border-2 border-indigo-200 px-6 py-5 shadow-sm">
    <div class="text-sm font-bold text-indigo-500 mb-2">Memory Hook</div>
    <div class="text-3xl md:text-5xl font-black text-indigo-800">นาม -> แทน -> ทำ -> ขยาย -> เชื่อม -> อุทาน</div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">คำเดียวกัน อาจเป็นคนละชนิดได้</span>

| คำ | ประโยค | หน้าที่ |
|---|---|---|
| fast | The train goes fast. | adverb เพราะขยาย goes |
| fast | It is a fast train. | adjective เพราะขยาย train |
| work | I work at a school. | verb เพราะเป็นการกระทำ |
| work | My work is difficult. | noun เพราะเป็นสิ่ง/งาน |
| light | Please light the candle. | verb แปลว่าจุดไฟ |
| light | The bag is light. | adjective แปลว่าเบา |

## <span class="text-4xl font-black text-slate-900">วิธีทำข้อสอบ Part of Speech</span>

1. ดูคำก่อนช่องว่างและหลังช่องว่างว่าต้องการคำชนิดใด
2. ถ้าหน้าช่องว่างเป็น article หรือ possessive adjective เช่น a, an, the, my มักตามด้วย noun หรือ adjective + noun
3. ถ้าช่องว่างอยู่หลัง be, look, seem, become อาจต้องการ adjective
4. ถ้าช่องว่างขยาย verb/adjective/adverb มักต้องการ adverb
5. อย่าตัดสินจากคำแปลอย่างเดียว ให้ดูหน้าที่ในประโยค

<blockquote>
สูตรจับชนิดคำ: ดูตำแหน่งก่อนแปล ถ้าคำอยู่ต่างตำแหน่ง หน้าที่อาจเปลี่ยนทันที
</blockquote>
`
  },
  {
    id: 'a2_g02_noun',
    title: '2. Unit 2 Noun คำนาม',
    content: `
# Unit 2 Noun คำนาม

<div class="bg-gradient-to-r from-sky-50 via-blue-50 to-white border-l-4 border-sky-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-sky-950 text-4xl font-black leading-tight mb-3">คำนามคือแกนของประธาน กรรม และเจ้าของ</div>
  <div class="bg-white rounded-2xl border border-sky-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    เรื่อง noun ออกสอบกับ article, quantifier, pronoun และ subject-verb agreement เสมอ จุดที่ต้องแม่นคือ <strong>นับได้/นับไม่ได้</strong>, <strong>เอกพจน์/พหูพจน์</strong> และ <strong>การแสดงความเป็นเจ้าของ</strong>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ประเภทของคำนาม</span>

| ประเภท | ความหมาย | ตัวอย่าง | จุดจำ |
|---|---|---|---|
| Common Noun | นามทั่วไป | teacher, city, book | ไม่ต้องขึ้นต้นตัวใหญ่ถ้าไม่อยู่ต้นประโยค |
| Proper Noun | ชื่อเฉพาะ | Bangkok, Thailand, Monday | ขึ้นต้นตัวใหญ่ |
| Collective Noun | นามหมวดหมู่ | team, family, class, group | ดูว่าหมายถึงหนึ่งหน่วยหรือหลายคนแยกกัน |
| Material Noun | วัตถุ/สสาร | water, gold, rice, wood | มักนับไม่ได้ |
| Abstract Noun | นามธรรม | love, freedom, honesty | จับต้องไม่ได้ |
| Concrete Noun | สิ่งที่จับต้องได้ | desk, classroom, student | นับได้หรือไม่ได้ขึ้นกับคำ |

## <span class="text-4xl font-black text-slate-900">Countable vs Uncountable</span>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-emerald-900 mb-3">Countable Noun</div>
    <ul>
      <li>นับจำนวนได้ มีเอกพจน์และพหูพจน์</li>
      <li>เอกพจน์ใช้ a/an ได้ เช่น a book, an apple</li>
      <li>ใช้ many, a few, several, number of ได้</li>
      <li>ตัวอย่าง: teacher, student, school, idea</li>
    </ul>
  </div>
  <div class="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-amber-900 mb-3">Uncountable Noun</div>
    <ul>
      <li>นับเป็นชิ้นไม่ได้โดยตรง มักใช้รูปเอกพจน์</li>
      <li>ไม่ใช้ a/an ตรง ๆ หน้า noun</li>
      <li>ใช้ much, little, amount of ได้</li>
      <li>ตัวอย่าง: water, information, advice, furniture, equipment, homework</li>
    </ul>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">การเปลี่ยนเอกพจน์เป็นพหูพจน์</span>

| กฎ | ตัวอย่าง | ข้อควรระวัง |
|---|---|---|
| เติม -s | book -> books, teacher -> teachers | ใช้กับคำทั่วไป |
| ลงท้าย s, ss, sh, ch, x, z เติม -es | box -> boxes, class -> classes | ออกเสียงเพิ่มเป็นพยางค์ |
| พยัญชนะ + y เปลี่ยน y เป็น ies | city -> cities, baby -> babies | แต่ vowel + y เติม s เช่น boy -> boys |
| ลงท้าย f/fe บางคำเปลี่ยนเป็น ves | leaf -> leaves, wife -> wives | ไม่ใช่ทุกคำ เช่น roof -> roofs |
| ลงท้าย o บางคำเติม es | tomato -> tomatoes, hero -> heroes | บางคำเติม s เช่น photo -> photos |
| เปลี่ยนรูป | man -> men, woman -> women, foot -> feet, tooth -> teeth, mouse -> mice | ต้องท่องเป็นชุด |
| รูปเดิมทั้งเอกพจน์/พหูพจน์ | fish, deer, sheep, series, species | ดู verb ช่วยบอกจำนวน |

## <span class="text-4xl font-black text-slate-900">หน้าที่ของคำนามในประโยค</span>

1. เป็นประธาน: The teacher explains the rule.
2. เป็นกรรมตรง: Students read books.
3. เป็นกรรมรอง: The school gave students certificates.
4. เป็นส่วนเติมเต็มหลัง linking verb: She is a principal.
5. เป็นกรรมของ preposition: They study in the library.
6. ใช้ซ้อนเป็น noun phrase: classroom management, teacher development

## <span class="text-4xl font-black text-slate-900">Possessive: การแสดงความเป็นเจ้าของ</span>

| รูป | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| 's | เจ้าของมีชีวิตเอกพจน์ หรือพหูพจน์ที่ไม่ลงท้าย s | the teacher's desk, children's books |
| s' | เจ้าของพหูพจน์ลงท้าย s | students' uniforms |
| of | สิ่งไม่มีชีวิต หรือวลีซับซ้อน | the door of the room, the title of the lesson |
| 's กับเวลา/ระยะ/ปริมาณ | ใช้กับหน่วยบางอย่าง | today's class, two hours' work |

<blockquote>
จุดหลอก: information, advice, furniture, equipment, homework มักเป็นนามนับไม่ได้ อย่าเติม s และอย่าใช้ many
</blockquote>
`
  },
  {
    id: 'a2_g03_article',
    title: '3. Unit 3 Article คำนำหน้านาม',
    content: `
# Unit 3 Article คำนำหน้านาม

<div class="bg-gradient-to-r from-indigo-50 via-violet-50 to-white border-l-4 border-indigo-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-indigo-950 text-4xl font-black leading-tight mb-3">Article คือไฟส่องว่านามนั้น “ทั่วไป” หรือ “เฉพาะเจาะจง”</div>
  <div class="bg-white rounded-2xl border border-indigo-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    Article มี 3 รูปหลักคือ <strong>a</strong>, <strong>an</strong>, <strong>the</strong> และบางกรณีต้องไม่ใส่ article เลย จุดออกสอบคือเสียงขึ้นต้น ความเฉพาะเจาะจง และสำนวนที่ละ article
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">a / an / the ใช้ต่างกันอย่างไร</span>

| Article | ใช้กับ | ความหมาย | ตัวอย่าง |
|---|---|---|---|
| a | นามนับได้เอกพจน์ เสียงพยัญชนะ | หนึ่งสิ่งแบบไม่ชี้เฉพาะ | a teacher, a university |
| an | นามนับได้เอกพจน์ เสียงสระ | หนึ่งสิ่งแบบไม่ชี้เฉพาะ | an hour, an honest student |
| the | นามนับได้/นับไม่ได้ เอกพจน์/พหูพจน์ | ชี้เฉพาะ รู้กันแล้วว่าอันไหน | the school, the sun, the students |

## <span class="text-4xl font-black text-slate-900">กฎสำคัญของ a/an</span>

1. ใช้กับนามนับได้เอกพจน์เท่านั้น
2. เลือก a/an จาก <strong>เสียง</strong> ไม่ใช่ตัวอักษร
3. ใช้เมื่อกล่าวถึงสิ่งนั้นครั้งแรก
4. ใช้กับอาชีพ ศาสนา สัญชาติในความหมาย “เป็นคนหนึ่งในกลุ่มนั้น” เช่น She is a teacher.
5. ใช้ในความหมายต่อหนึ่งหน่วย เช่น twice a week, 80 kilometers an hour

## <span class="text-4xl font-black text-slate-900">กฎสำคัญของ the</span>

1. ใช้เมื่อกล่าวซ้ำจากครั้งก่อน
2. ใช้เมื่อผู้พูดและผู้ฟังรู้กันว่าเป็นสิ่งไหน
3. ใช้กับสิ่งที่มีหนึ่งเดียวในบริบท เช่น the sun, the moon, the sky
4. ใช้กับลำดับที่และขั้นสูงสุด เช่น the first, the best, the most important
5. ใช้กับชื่อแม่น้ำ ทะเล มหาสมุทร เทือกเขา หมู่เกาะ และประเทศบางรูป เช่น the Chao Phraya River, the Philippines
6. ใช้กับ adjective ที่แทนคนทั้งกลุ่ม เช่น the poor, the elderly
7. ใช้กับเครื่องดนตรีบางกรณี เช่น play the piano

## <span class="text-4xl font-black text-slate-900">กรณีไม่ใช้ Article</span>

| ไม่ใช้กับ | ตัวอย่าง | เหตุผล |
|---|---|---|
| นามนับไม่ได้ทั่วไป | Water is important. | พูดทั่วไป ไม่ชี้เฉพาะ |
| นามพหูพจน์ทั่วไป | Teachers help students. | พูดรวม ๆ |
| ชื่อวิชา ภาษา กีฬา | English, mathematics, football | เป็นชื่อทั่วไป |
| มื้ออาหารทั่วไป | have breakfast, eat lunch | ไม่ชี้เฉพาะ |
| สถานที่ตามหน้าที่ปกติ | go to school, go to bed, be in prison | ไปเพื่อหน้าที่ของสถานที่นั้น |
| ชื่อประเทศ เมือง ถนน ส่วนใหญ่ | Thailand, Bangkok, Sukhumvit Road | เป็นชื่อเฉพาะที่ไม่ใช้ the |

## <span class="text-4xl font-black text-slate-900">ทริกเลือก Article</span>

<div align="center" class="my-6">
  <div class="inline-block rounded-3xl bg-white border-2 border-violet-200 px-6 py-5 shadow-sm">
    <div class="text-sm font-bold text-violet-500 mb-2">Article Flow</div>
    <div class="text-3xl md:text-4xl font-black text-violet-800">นับได้เอกพจน์? -> เสียง a/an -> รู้กันไหม? ถ้ารู้ใช้ the</div>
  </div>
</div>

<blockquote>
จำให้แม่น: a/an = หนึ่งสิ่งแบบทั่วไป, the = สิ่งนั้นที่รู้กันแล้ว, ไม่ใส่ = พูดกว้าง ๆ หรือเป็นชื่อเฉพาะบางกลุ่ม
</blockquote>
`
  },
  {
    id: 'a2_g04_quantifier',
    title: '4. Unit 4 Quantifier คำบอกปริมาณ',
    content: `
# Unit 4 Quantifier คำบอกปริมาณ

<div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-l-4 border-emerald-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-emerald-950 text-4xl font-black leading-tight mb-3">Quantifier คือคำหน้าคำนามที่บอก “มาก น้อย บางส่วน ทั้งหมด”</div>
  <div class="bg-white rounded-2xl border border-emerald-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบชอบหลอกด้วยชนิดของ noun ดังนั้นก่อนเลือก quantifier ต้องถามก่อนว่า noun นั้น <strong>นับได้พหูพจน์</strong>, <strong>นับไม่ได้</strong> หรือใช้ได้ทั้งสองแบบ
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตารางหลักที่ต้องจำ</span>

| ใช้กับนามนับได้พหูพจน์ | ใช้กับนามนับไม่ได้ | ใช้ได้ทั้งสอง |
|---|---|---|
| many, a few, few, several, both, a number of | much, a little, little, a great deal of, an amount of | some, any, no, a lot of, lots of, plenty of, most, all |

## <span class="text-4xl font-black text-slate-900">คู่ที่ออกสอบบ่อย</span>

| คู่คำ | ความต่าง | ตัวอย่าง |
|---|---|---|
| many / much | many + นับได้พหูพจน์, much + นับไม่ได้ | many books, much water |
| a few / few | a few = มีบ้างพอใช้, few = แทบไม่มี | I have a few friends. / Few students understood it. |
| a little / little | a little = มีบ้างพอใช้, little = แทบไม่มี | We have a little time. / There is little hope. |
| some / any | some มักใช้บอกเล่า, any มักใช้คำถาม/ปฏิเสธ | I have some questions. / Do you have any questions? |
| every / each | every เน้นรวมทั้งกลุ่ม, each เน้นรายตัว | Every student passed. / Each student has a file. |
| no / none | no วางหน้า noun, none ใช้แทน noun | No students came. / None came. |

## <span class="text-4xl font-black text-slate-900">Some และ Any แบบละเอียด</span>

1. some ใช้ในประโยคบอกเล่า: I need some information.
2. some ใช้ในคำถามเมื่อเป็นการเสนอหรือขอร้อง และคาดหวังคำตอบ yes: Would you like some tea?
3. any ใช้ในคำถามทั่วไป: Do you have any books?
4. any ใช้ในปฏิเสธ: I do not have any money.
5. any ในบอกเล่าแปลว่า “อะไรก็ได้/คนใดก็ได้”: You can choose any topic.

## <span class="text-4xl font-black text-slate-900">A number of vs The number of</span>

| รูป | ความหมาย | Verb |
|---|---|---|
| a number of + plural noun | จำนวนหนึ่งของ... | ใช้กริยาพหูพจน์ |
| the number of + plural noun | จำนวนของ... | ใช้กริยาเอกพจน์ |

ตัวอย่าง: A number of teachers <strong>are</strong> attending the meeting. แต่ The number of teachers <strong>is</strong> increasing.

<blockquote>
จำเร็ว: many-few-several ไปกับนามนับได้, much-little ไปกับนามนับไม่ได้, some/any/a lot of ใช้ได้กว้างแต่ต้องดูความหมาย
</blockquote>
`
  },
  {
    id: 'a2_g05_pronoun',
    title: '5. Unit 5 Pronoun คำสรรพนาม',
    content: `
# Unit 5 Pronoun คำสรรพนาม

<div class="bg-gradient-to-r from-violet-50 via-purple-50 to-white border-l-4 border-violet-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-violet-950 text-4xl font-black leading-tight mb-3">Pronoun ช่วยแทนคำนาม แต่ต้องตรงหน้าที่ เพศ จำนวน และความเป็นเจ้าของ</div>
  <div class="bg-white rounded-2xl border border-violet-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบ pronoun มักวัดว่าผู้เรียนแยก <strong>subject</strong>, <strong>object</strong>, <strong>possessive adjective</strong>, <strong>possessive pronoun</strong> และ <strong>reflexive pronoun</strong> ได้หรือไม่
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตาราง Pronoun ที่ต้องจำ</span>

| Subject | Object | Possessive Adjective | Possessive Pronoun | Reflexive |
|---|---|---|---|---|
| I | me | my | mine | myself |
| you | you | your | yours | yourself / yourselves |
| he | him | his | his | himself |
| she | her | her | hers | herself |
| it | it | its | - | itself |
| we | us | our | ours | ourselves |
| they | them | their | theirs | themselves |

## <span class="text-4xl font-black text-slate-900">Pronoun 7 ประเภท</span>

1. Personal Pronoun: I, you, he, she, it, we, they ใช้เป็นประธานหรือกรรม
2. Possessive Pronoun: mine, yours, his, hers, ours, theirs ใช้แทน “ของ...” โดยไม่มี noun ตามหลัง
3. Reflexive Pronoun: myself, yourself, himself ใช้สะท้อนกลับหรือเน้นว่า “ด้วยตนเอง”
4. Demonstrative Pronoun: this, that, these, those ใช้ชี้สิ่งนี้/สิ่งนั้น
5. Indefinite Pronoun: someone, anyone, everyone, each, both, many, none ใช้แบบไม่ชี้เฉพาะ
6. Interrogative Pronoun: who, whom, whose, what, which ใช้ถาม
7. Relative Pronoun: who, whom, whose, which, that ใช้เชื่อมอนุประโยคขยาย noun

## <span class="text-4xl font-black text-slate-900">Relative Pronoun ออกสอบบ่อย</span>

| คำ | ใช้แทน | หน้าที่ |
|---|---|---|
| who | คน | เป็นประธานของ clause |
| whom | คน | เป็นกรรมของ clause |
| whose | คน/สัตว์/สิ่งของ | แสดงความเป็นเจ้าของ |
| which | สัตว์/สิ่งของ | ประธานหรือกรรม |
| that | คน/สัตว์/สิ่งของ | ใช้แทน who/which ในหลายกรณี |

ตัวอย่าง: The teacher <strong>who</strong> helped me is kind. / The book <strong>which</strong> I bought is useful.

## <span class="text-4xl font-black text-slate-900">จุดหลอกที่ควรระวัง</span>

1. my, your, her, our, their ต้องมี noun ตามหลัง เช่น my book
2. mine, yours, hers, ours, theirs ใช้เดี่ยวได้ เช่น This book is mine.
3. everybody, someone, each มักเป็นเอกพจน์ แต่เมื่อต้องใช้ pronoun แทนในภาษาอังกฤษปัจจุบันมักใช้ they
4. who ใช้เป็นประธาน, whom ใช้เป็นกรรม แต่ในข้อสอบยังควรรู้โครงสร้างทางการ
5. one / ones ใช้แทนนามเพื่อไม่ให้กล่าวซ้ำ เช่น I prefer the blue one.

<blockquote>
สูตรจำ possessive: มี noun ตามหลังใช้ my/your/his/her/its/our/their, ไม่มี noun ตามหลังใช้ mine/yours/his/hers/ours/theirs
</blockquote>
`
  },
  {
    id: 'a2_g06_sva',
    title: '6. Unit 6 Subject-Verb Agreement',
    content: `
# Unit 6 Subject-Verb Agreement

<div class="bg-gradient-to-r from-rose-50 via-orange-50 to-white border-l-4 border-rose-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-rose-950 text-4xl font-black leading-tight mb-3">SVA คือการทำให้ประธานกับกริยา “จำนวนตรงกัน”</div>
  <div class="bg-white rounded-2xl border border-rose-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบชอบใส่คำขยายยาว ๆ ระหว่างประธานกับกริยาเพื่อหลอกตา อย่าดูคำนามที่อยู่ใกล้ verb ที่สุด ให้หา <strong>ประธานจริง</strong> ก่อนเสมอ
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">กฎแกนกลาง</span>

| ประธาน | Verb ใน Present Simple | ตัวอย่าง |
|---|---|---|
| เอกพจน์ | เติม s/es หรือใช้ is/has | The student studies. / She is ready. |
| พหูพจน์ | ไม่เติม s/es หรือใช้ are/have | The students study. / They are ready. |
| I | ใช้ am, have, V1 ไม่เติม s | I am a teacher. / I have a plan. |
| You | ใช้ are, have, V1 ไม่เติม s | You are correct. |

## <span class="text-4xl font-black text-slate-900">ประธานเชื่อมด้วยคำต่าง ๆ</span>

| โครงสร้าง | Verb | ตัวอย่าง |
|---|---|---|
| A and B | พหูพจน์ | A teacher and a student are talking. |
| A or B / either A or B / neither A nor B | ตามประธานที่อยู่ใกล้ verb | Either the teachers or the principal is responsible. |
| A with B / along with / together with / as well as | ตาม A | The principal with the teachers is here. |
| each / every + singular noun | เอกพจน์ | Every student has a book. |
| everybody, everyone, someone, nobody | เอกพจน์ | Everyone is ready. |
| a number of + plural noun | พหูพจน์ | A number of students are absent. |
| the number of + plural noun | เอกพจน์ | The number of students is high. |

## <span class="text-4xl font-black text-slate-900">คำนามพิเศษที่ต้องจำ</span>

1. news, mathematics, physics, economics ถ้าหมายถึงวิชา มักใช้เอกพจน์
2. scissors, trousers, glasses ใช้พหูพจน์เมื่อพูดเป็นชิ้น แต่ a pair of ใช้เอกพจน์ตาม pair
3. family, team, class อาจเอกพจน์เมื่อมองเป็นหนึ่งหน่วย และพหูพจน์เมื่อมองสมาชิกแยกกัน
4. money, time, distance, weight เมื่อมองเป็นจำนวนรวม มักใช้เอกพจน์
5. none อาจใช้เอกพจน์หรือพหูพจน์ตามความหมาย แต่ข้อสอบพื้นฐานมักดู noun ที่แทน

## <span class="text-4xl font-black text-slate-900">กลยุทธ์ทำข้อสอบ SVA</span>

1. ขีดเส้นใต้ประธานจริง
2. ตัดวลีแทรก เช่น with..., of..., in..., who... ออกชั่วคราว
3. ดูว่า subject เป็นเอกพจน์หรือพหูพจน์
4. ถ้ามี or/nor ให้ดูประธานที่อยู่ใกล้กริยา
5. เช็ก tense ก่อนเลือก verb สุดท้าย

<blockquote>
สูตรจำ: verb ต้องตามหัวประธาน ไม่ตามคำใกล้ ๆ ที่คอยหลอก
</blockquote>
`
  },
  {
    id: 'a2_g07_present_tenses',
    title: '7. Unit 7 Present Tenses เหตุการณ์ปัจจุบัน',
    content: `
# Unit 7 Present Tenses เหตุการณ์ปัจจุบัน

<div class="bg-gradient-to-r from-cyan-50 via-sky-50 to-white border-l-4 border-cyan-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-cyan-950 text-4xl font-black leading-tight mb-3">Present ไม่ได้แปลว่า “ตอนนี้” อย่างเดียว แต่หมายถึงสิ่งที่โยงกับปัจจุบัน</div>
  <div class="bg-white rounded-2xl border border-cyan-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    Present Tenses แบ่งเป็น 4 รูป: Simple, Continuous, Perfect, Perfect Continuous ให้จำทั้ง <strong>โครงสร้าง</strong>, <strong>การใช้</strong> และ <strong>คำบอกเวลา</strong>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตาราง Present Tenses</span>

| Tense | โครงสร้าง | ใช้เมื่อ | คำใบ้ |
|---|---|---|---|
| Present Simple | S + V1 หรือ V1+s/es | กิจวัตร ความจริง ตารางเวลา | always, usually, every day, often |
| Present Continuous | S + is/am/are + V-ing | กำลังเกิดตอนพูด ช่วงนี้ แผนใกล้ ๆ | now, right now, at the moment, these days |
| Present Perfect | S + has/have + V3 | เกิดแล้วโยงถึงปัจจุบัน ไม่ระบุเวลาชัด | since, for, already, yet, ever, never, just |
| Present Perfect Continuous | S + has/have been + V-ing | ทำต่อเนื่องจากอดีตถึงปัจจุบัน เน้นระยะเวลา | since, for, all day, recently |

## <span class="text-4xl font-black text-slate-900">Present Simple</span>

1. ใช้กับนิสัยหรือกิจวัตร: Teachers prepare lessons every week.
2. ใช้กับความจริงทั่วไป: Water boils at 100 degrees Celsius.
3. ใช้กับตารางเวลา: The class starts at 8 a.m.
4. รูปปฏิเสธใช้ do/does not + V1
5. คำถามใช้ Do/Does + S + V1?

## <span class="text-4xl font-black text-slate-900">Present Continuous</span>

1. ใช้กับสิ่งที่กำลังเกิดตอนพูด: The students are reading now.
2. ใช้กับสิ่งที่เกิดในช่วงนี้: She is studying for the exam this month.
3. ใช้กับแผนอนาคตใกล้ ๆ: We are meeting the director tomorrow.
4. กริยาบางกลุ่มไม่ค่อยใช้ continuous เช่น know, believe, understand, like, love, hate, want, need, seem

## <span class="text-4xl font-black text-slate-900">Present Perfect</span>

1. just: เพิ่งเกิดขึ้น เช่น I have just finished the report.
2. already: เกิดแล้ว เช่น They have already submitted the form.
3. yet: ยัง/หรือยัง ใช้คำถามและปฏิเสธ เช่น Have you finished yet?
4. since: ตั้งแต่จุดเวลา เช่น since 2022
5. for: เป็นระยะเวลา เช่น for three years
6. ever/never: ประสบการณ์ เช่น Have you ever taught online?

## <span class="text-4xl font-black text-slate-900">Present Perfect Continuous</span>

ใช้เมื่อกิจกรรมเริ่มในอดีตและยังต่อเนื่องหรือเพิ่งหยุด โดยเน้นระยะเวลาหรือความต่อเนื่อง เช่น She has been teaching for ten years.

<blockquote>
จำภาพเวลา: Simple = ทำประจำ, Continuous = กำลังเกิด, Perfect = เกิดแล้วมีผลถึงตอนนี้, Perfect Continuous = ทำต่อเนื่องมาถึงตอนนี้
</blockquote>
`
  },
  {
    id: 'a2_g08_past_tenses',
    title: '8. Unit 8 Past Tenses เหตุการณ์อดีต',
    content: `
# Unit 8 Past Tenses เหตุการณ์อดีต

<div class="bg-gradient-to-r from-orange-50 via-amber-50 to-white border-l-4 border-orange-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-orange-950 text-4xl font-black leading-tight mb-3">Past Tenses ใช้เล่าเหตุการณ์ที่อยู่หลังเส้นเวลาปัจจุบัน</div>
  <div class="bg-white rounded-2xl border border-orange-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    อดีตไม่ได้มีแค่ V2 เพราะข้อสอบมักเทียบเหตุการณ์ในอดีตหลายเหตุการณ์พร้อมกัน ต้องรู้ว่าอะไร <strong>เกิดก่อน</strong>, <strong>กำลังเกิด</strong>, หรือ <strong>ทำต่อเนื่อง</strong>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตาราง Past Tenses</span>

| Tense | โครงสร้าง | ใช้เมื่อ | คำใบ้ |
|---|---|---|---|
| Past Simple | S + V2 | เหตุการณ์จบแล้วในอดีต | yesterday, last..., ago, in 2020 |
| Past Continuous | S + was/were + V-ing | กำลังเกิดในอดีต หรือฉากหลัง | while, at that time |
| Past Perfect | S + had + V3 | เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต | before, after, by the time |
| Past Perfect Continuous | S + had been + V-ing | ทำต่อเนื่องมาก่อนอีกเหตุการณ์ในอดีต | for, since, before |

## <span class="text-4xl font-black text-slate-900">Past Simple</span>

1. ใช้กับเหตุการณ์ที่เกิดและจบแล้ว: The teacher explained the rule yesterday.
2. ใช้กับนิสัยในอดีต: He walked to school when he was young.
3. ใช้ used to + V1 เพื่อบอกสิ่งที่เคยทำแต่ปัจจุบันไม่ทำแล้ว: I used to study late at night.
4. ปฏิเสธใช้ did not + V1
5. คำถามใช้ Did + S + V1?

## <span class="text-4xl font-black text-slate-900">Past Continuous</span>

1. ใช้กับเหตุการณ์ที่กำลังเกิด ณ เวลาในอดีต: At 8 p.m., I was reading.
2. ใช้กับเหตุการณ์สองอย่างที่กำลังเกิดพร้อมกัน: While she was teaching, the students were taking notes.
3. ใช้เป็นฉากหลัง แล้วมี Past Simple แทรกเข้ามา: I was walking home when it started to rain.

## <span class="text-4xl font-black text-slate-900">Past Perfect</span>

Past Perfect ใช้กับเหตุการณ์ที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต เช่น When I arrived, the meeting had started. หมายความว่า meeting started ก่อน I arrived

## <span class="text-4xl font-black text-slate-900">Past Perfect Continuous</span>

ใช้เมื่อต้องการเน้นว่ากิจกรรมดำเนินต่อเนื่องมาก่อนเหตุการณ์ในอดีต เช่น She had been working for three hours before the power went out.

## <span class="text-4xl font-black text-slate-900">การเติม -ed แบบต้องระวัง</span>

| กฎ | ตัวอย่าง |
|---|---|
| เติม -ed ทั่วไป | work -> worked |
| ลงท้าย e เติม d | live -> lived |
| พยัญชนะ + y เปลี่ยน y เป็น ied | study -> studied |
| สระเสียงสั้น + พยัญชนะตัวเดียว ซ้ำพยัญชนะ | stop -> stopped |

<blockquote>
Past Perfect = อดีตก่อนอดีต ถ้าเห็น before/after/by the time ให้ถามว่าเหตุการณ์ไหนเกิดก่อน
</blockquote>
`
  },
  {
    id: 'a2_g09_future_tenses',
    title: '9. Unit 9 Future Tenses เหตุการณ์อนาคต',
    content: `
# Unit 9 Future Tenses เหตุการณ์อนาคต

<div class="bg-gradient-to-r from-blue-50 via-cyan-50 to-white border-l-4 border-blue-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-blue-950 text-4xl font-black leading-tight mb-3">Future ไม่ได้มีแค่ will ต้องดูแผน ความตั้งใจ และเหตุการณ์ที่จะเสร็จในอนาคต</div>
  <div class="bg-white rounded-2xl border border-blue-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    อนาคตมีหลายรูป: will, be going to, present continuous สำหรับแผน และ future perfect สำหรับสิ่งที่จะเสร็จก่อนเวลาหนึ่งในอนาคต
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตาราง Future Tenses</span>

| Tense | โครงสร้าง | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|---|
| Future Simple | S + will + V1 | ตัดสินใจทันที คาดการณ์ สัญญา | I will call you later. |
| Be going to | S + is/am/are going to + V1 | ตั้งใจไว้แล้ว หรือมีหลักฐาน | It is going to rain. |
| Future Continuous | S + will be + V-ing | กำลังเกิด ณ ช่วงเวลาอนาคต | This time tomorrow, I will be teaching. |
| Future Perfect | S + will have + V3 | จะเสร็จก่อนเวลาหนึ่งในอนาคต | By next week, she will have finished the course. |
| Future Perfect Continuous | S + will have been + V-ing | จะทำต่อเนื่องมาถึงเวลาหนึ่งในอนาคต | By May, he will have been working here for five years. |

## <span class="text-4xl font-black text-slate-900">Will vs Be going to</span>

| will | be going to |
|---|---|
| ตัดสินใจทันที | วางแผนไว้ก่อนแล้ว |
| คาดเดา/เชื่อ/หวัง | มีหลักฐานในปัจจุบัน |
| ใช้กับ promise, offer, request | ใช้กับ intention หรือ prediction มีสัญญาณ |

ตัวอย่าง: I will help you. = เพิ่งตัดสินใจช่วย / I am going to study tonight. = ตั้งใจไว้แล้ว

## <span class="text-4xl font-black text-slate-900">รูปอนาคตอื่นที่ออกสอบ</span>

1. Present Continuous ใช้กับแผนแน่นอนในอนาคต: We are visiting the school tomorrow.
2. Present Simple ใช้กับตารางเวลา: The train leaves at 7 a.m.
3. be about to + V1 ใช้กับสิ่งที่กำลังจะเกิดทันที: The class is about to start.
4. be to + V1 ใช้กับกำหนดการทางการหรือคำสั่ง: Students are to submit the form by Friday.

## <span class="text-4xl font-black text-slate-900">คำใบ้ที่ต้องจำ</span>

tomorrow, next week, soon, in the future, later, by next month, by the time, this time tomorrow

<blockquote>
สูตรเลือกอนาคต: will = คิดเดี๋ยวนั้นหรือคาดการณ์, going to = มีแผน/มีหลักฐาน, will have V3 = จะเสร็จก่อนเวลาอนาคต
</blockquote>
`
  },
  {
    id: 'a2_g10_tense_memory_summary',
    title: '10. สรุปเทคนิคจำ Tenses 12 ช่อง',
    content: `
# สรุปเทคนิคจำ Tenses 12 ช่อง

## <span class="text-4xl font-black text-blue-900">แก่นสำคัญ: ช่วงเวลาเปลี่ยน กริยาเปลี่ยน</span>

ภาษาไทยใช้คำบอกเวลา เช่น เมื่อวาน ตอนนี้ พรุ่งนี้ แต่ภาษาอังกฤษใช้การเปลี่ยนรูปกริยาเข้ามาช่วยบอกเวลาและลักษณะของเหตุการณ์ เช่น I ate yesterday, I am eating now, I will eat this evening

<blockquote>
Tense = เวลา + ลักษณะเหตุการณ์ ไม่ใช่แค่แปลว่าอดีต ปัจจุบัน อนาคต
</blockquote>

## <span class="text-4xl font-black text-slate-900">แผนที่จำเร็ว: กริยารูปไหนบอกอะไร</span>

| รูปกริยา | ภาพจำ | ใช้กับช่วงเวลา/ลักษณะ |
|---|---|---|
| V1 | ปัจจุบัน/เรื่องทั่วไป | Present หรือกริยาหลัง will/modal |
| V2 | อดีตจบแล้ว | Past Simple |
| V3 | ยาวนาน/เสร็จแล้ว/ถูกกระทำ | Perfect และ Passive |
| V-ing | กำลังทำ/ต่อเนื่อง | Continuous |
| will + V1 | อนาคต | Future |
| be going to + V1 | อนาคตที่มีแผนหรือมีหลักฐาน | Future แบบค่อนข้างแน่นอน |

## <span class="text-4xl font-black text-slate-900">สูตรใหญ่ 3 x 4 = 12 Tenses</span>

| เวลาใหญ่ | Simple | Continuous | Perfect | Perfect Continuous |
|---|---|---|---|---|
| Present | S + V1/s/es | S + is/am/are + V-ing | S + has/have + V3 | S + has/have been + V-ing |
| Past | S + V2 | S + was/were + V-ing | S + had + V3 | S + had been + V-ing |
| Future | S + will + V1 | S + will be + V-ing | S + will have + V3 | S + will have been + V-ing |

## <span class="text-4xl font-black text-slate-900">จำความหมายของ 4 ช่องแนวนอน</span>

| ช่อง | ชื่อจำง่าย | ใช้คิดแบบเร็ว |
|---|---|---|
| Simple | ธรรมดา/ข้อเท็จจริง/จบเป็นจุด | เกิดเป็นประจำ เกิดจบแล้ว หรือจะเกิดในอนาคต |
| Continuous | กำลังทำ/ต่อเนื่อง | เหตุการณ์กำลังดำเนินอยู่ ณ ช่วงเวลาหนึ่ง |
| Perfect | เสร็จแล้ว/โยงช่วงเวลา | เกิดก่อนจุดหนึ่ง หรือมีผลเชื่อมกับอีกเวลา |
| Perfect Continuous | ยาวนานต่อเนื่อง | ทำมาต่อเนื่องและเน้นระยะเวลาของการทำ |

## <span class="text-4xl font-black text-slate-900">Simple Tense: เรื่องธรรมดา จบเป็นจุด ตารางเวลา</span>

| Tense | ใช้เมื่อ | คำใบ้ | ตัวอย่าง |
|---|---|---|---|
| Present Simple | นิสัย ความจริง สิ่งถาวร สุภาษิต ตารางเวลา | always, usually, often, every, timetable | The earth moves around the sun. |
| Past Simple | เกิดและจบแล้วในอดีต หรือเคยทำเป็นประจำในอดีต | yesterday, last..., ago, in 2020 | She visited the school last week. |
| Future Simple | จะทำในอนาคต ตัดสินใจทันที สัญญา คาดการณ์ | tomorrow, soon, next..., later | I will call you later. |

## <span class="text-4xl font-black text-slate-900">Continuous Tense: กำลังทำ ณ ช่วงเวลานั้น</span>

| Tense | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| Present Continuous | กำลังทำตอนพูด, เกิดช่วงนี้, แผนอนาคตใกล้ | They are watching TV now. |
| Past Continuous | กำลังทำในอดีต, เป็นฉากหลังแล้วมีอีกเหตุการณ์แทรก | I was reading when she called. |
| Future Continuous | จะกำลังทำอยู่ ณ เวลาหนึ่งในอนาคต | This time tomorrow, I will be studying. |

คำกระตุ้นที่เจอบ่อย: now, right now, at the moment, at present, Look!, Listen!, while, when, this time tomorrow

## <span class="text-4xl font-black text-slate-900">Perfect Tense: เกิดก่อนอีกเวลา และมีความหมายเชื่อมโยง</span>

| Tense | ใช้เมื่อ | คำใบ้ | ตัวอย่าง |
|---|---|---|---|
| Present Perfect | เพิ่งจบ, ยังไม่จบ, ประสบการณ์, ทำมานานถึงปัจจุบัน, ทำซ้ำหลายครั้ง | just, already, yet, ever, never, since, for, so far | I have studied English for five years. |
| Past Perfect | เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต | before, after, by the time | The class had started before I arrived. |
| Future Perfect | จะเสร็จก่อนเวลาใดเวลาหนึ่งในอนาคต | by next..., by the time | She will have finished the report by Friday. |

## <span class="text-4xl font-black text-slate-900">Perfect Continuous: ยาวนาน + ต่อเนื่อง + เน้นระยะเวลา</span>

| Tense | โครงสร้าง | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|---|
| Present Perfect Continuous | has/have been + V-ing | ทำมาตั้งแต่อดีตถึงปัจจุบัน และมีแนวโน้มต่อ | Jim has been waiting for two hours. |
| Past Perfect Continuous | had been + V-ing | ทำต่อเนื่องมาก่อนอีกเหตุการณ์ในอดีต | She had been working before the power went out. |
| Future Perfect Continuous | will have been + V-ing | จะทำต่อเนื่องครบระยะเวลาหนึ่งในอนาคต | By May, he will have been teaching for ten years. |

## <span class="text-4xl font-black text-slate-900">Will, Shall, Be Going To ใช้อย่างไร</span>

| รูป | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| will + V1 | อนาคตทั่วไป คาดการณ์ สัญญา ตัดสินใจตอนพูด | I will help you. |
| be going to + V1 | มีแผนล่วงหน้า หรือมีหลักฐานว่าจะเกิด | It is going to rain. |
| shall + V1 | ใช้กับ I/we ในการชวน เสนอ ขอความเห็น แบบสุภาพ | Shall we leave now? |

## <span class="text-4xl font-black text-slate-900">Stative Verbs: กริยาที่มักไม่ใช้ Continuous</span>

| กลุ่ม | ตัวอย่าง |
|---|---|
| ความรู้สึก/ประสาทสัมผัส | smell, taste, feel, sound, hear, seem, appear, look |
| อารมณ์/ความชอบ | love, like, prefer, wish, hate |
| ความคิด/ความเข้าใจ | think, know, understand, believe, remember, mean, agree, want |
| ความเป็นเจ้าของ | own, have, belong to |

จำง่าย: ถ้ากริยานั้นเป็น “สภาพในใจ/ความรู้/การเป็นเจ้าของ” มากกว่าการกระทำที่เห็นเป็นภาพเคลื่อนไหว มักไม่ใช้ -ing ในข้อสอบพื้นฐาน

## <span class="text-4xl font-black text-slate-900">แผนเลือก Tense ในข้อสอบ</span>

1. หาเวลาใหญ่ก่อน: Present, Past หรือ Future
2. ดูว่าการกระทำนั้นเป็นจุดเดียว ธรรมดา ต่อเนื่อง เสร็จก่อน หรือยาวนานต่อเนื่อง
3. วงคำบอกเวลา เช่น yesterday, now, since, for, by the time, tomorrow
4. เช็กโครงสร้างกริยาให้ตรง: V2, be + V-ing, has/have + V3, will + V1
5. ถ้ามีสองเหตุการณ์ ให้ถามว่าเหตุการณ์ไหนเกิดก่อน เหตุการณ์ไหนแทรก เหตุการณ์ไหนเป็นฉากหลัง

## <span class="text-4xl font-black text-slate-900">แบบฝึกหัดจำ Tense พร้อมเฉลย</span>

| ข้อ | โจทย์ | เฉลย | เหตุผล |
|---|---|---|---|
| 1 | She _____ to school every day. (go/goes/is going) | goes | every day เป็นกิจวัตร ใช้ Present Simple และ she เติม s |
| 2 | Look! The boys _____ football. (play/are playing/have played) | are playing | Look! บอกเหตุการณ์กำลังเกิด |
| 3 | I _____ my homework yesterday. (finish/finished/have finished) | finished | yesterday เป็นอดีตจบแล้ว ใช้ Past Simple |
| 4 | While I _____, the phone rang. (slept/was sleeping/had slept) | was sleeping | เป็นฉากหลังในอดีตที่ถูกขัดจังหวะ |
| 5 | She _____ here since 2020. (works/has worked/worked) | has worked | since + จุดเริ่มต้น ใช้ Present Perfect |
| 6 | By the time we arrived, the meeting _____. (started/had started/has started) | had started | meeting เกิดก่อน arrived ในอดีต |
| 7 | I think it _____ soon. (rains/will rain/is raining) | will rain | เป็นการคาดการณ์อนาคต |
| 8 | This time tomorrow, I _____ for the exam. (will study/will be studying/will have studied) | will be studying | ณ เวลาหนึ่งในอนาคตจะกำลังทำ |
| 9 | By next week, she _____ the course. (will finish/will have finished/finishes) | will have finished | by next week ชี้ว่าจะเสร็จก่อนเวลานั้น |
| 10 | He _____ for two hours and still looks tired. (has worked/has been working/worked) | has been working | เน้นทำต่อเนื่องถึงปัจจุบันและเห็นผล |

<blockquote>
สูตรสุดท้ายก่อนสอบ: Simple = ธรรมดา, Continuous = กำลัง, Perfect = เกิดก่อน/มีผลถึง, Perfect Continuous = ทำมาต่อเนื่อง
</blockquote>
`
  },
  {
    id: 'a2_g10_passive_voice',
    title: '11. Unit 10 Passive Voice ประธานถูกกระทำ',
    content: `
# Unit 10 Passive Voice ประธานถูกกระทำ

<div class="bg-gradient-to-r from-slate-50 via-indigo-50 to-white border-l-4 border-slate-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-slate-950 text-4xl font-black leading-tight mb-3">Passive Voice ใช้เมื่อประธาน “ถูกกระทำ” หรือผู้กระทำไม่สำคัญ</div>
  <div class="bg-white rounded-2xl border border-slate-200 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    แกนของ Passive คือ <strong>be + V3</strong> โดย tense จะไปเปลี่ยนที่ be ส่วน V3 ต้องคงรูป
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Active vs Passive</span>

| Active Voice | Passive Voice |
|---|---|
| The teacher explains the lesson. | The lesson is explained by the teacher. |
| Someone stole my bag. | My bag was stolen. |
| The school will announce the result. | The result will be announced by the school. |

## <span class="text-4xl font-black text-slate-900">สูตรใหญ่</span>

<div align="center" class="my-6">
  <div class="inline-block rounded-3xl bg-white border-2 border-indigo-200 px-8 py-6 shadow-sm">
    <div class="text-sm font-bold text-indigo-500 mb-2">Passive Formula</div>
    <div class="text-4xl md:text-6xl font-black text-indigo-800">S + be + V3</div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Passive ในแต่ละ Tense</span>

| Tense | โครงสร้าง Passive | ตัวอย่าง |
|---|---|---|
| Present Simple | is/am/are + V3 | The room is cleaned every day. |
| Past Simple | was/were + V3 | The report was submitted yesterday. |
| Future Simple | will be + V3 | The result will be announced soon. |
| Present Continuous | is/am/are being + V3 | The classroom is being painted. |
| Past Continuous | was/were being + V3 | The lesson was being recorded. |
| Present Perfect | has/have been + V3 | The documents have been checked. |
| Past Perfect | had been + V3 | The work had been completed before noon. |
| Modal | modal + be + V3 | The form must be signed. |

## <span class="text-4xl font-black text-slate-900">ขั้นตอนเปลี่ยน Active เป็น Passive</span>

1. นำกรรมของ active มาเป็นประธานใหม่
2. เลือก be ให้ตรง tense และจำนวนของประธานใหม่
3. เปลี่ยนกริยาหลักเป็น V3
4. เติม by + ผู้กระทำ เมื่อจำเป็นหรือสำคัญ
5. ถ้าผู้กระทำเป็น someone, people, they, we ในความหมายทั่วไป มักละได้

## <span class="text-4xl font-black text-slate-900">จุดหลอก</span>

1. Intransitive verb เช่น happen, occur, arrive, die, sleep ไม่มีกรรมตรง จึงไม่ทำ passive ทั่วไป
2. ต้องมี be และ V3 ครบ ถ้าขาดอย่างใดอย่างหนึ่งมักผิด
3. by ไม่ใช่สัญญาณเดียวของ passive ต้องดูว่า subject ถูกกระทำหรือไม่
4. กริยาบางคำมี object สองตัว เช่น give, send, teach อาจทำ passive ได้สองแบบ

<blockquote>
จำให้แน่น: Passive ไม่ได้แปลว่ามี by เสมอ แต่ต้องมี be + V3 เสมอ
</blockquote>
`
  },
  {
    id: 'a2_g11_conditional',
    title: '12. Unit 11 Conditional Sentence ประโยคเงื่อนไข',
    content: `
# Unit 11 Conditional Sentence ประโยคเงื่อนไข

<div class="bg-gradient-to-r from-emerald-50 via-lime-50 to-white border-l-4 border-emerald-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-emerald-950 text-4xl font-black leading-tight mb-3">Conditional คือประโยค “ถ้า...ก็...” ที่ต้องจับคู่ tense ให้ถูก</div>
  <div class="bg-white rounded-2xl border border-emerald-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ประโยคเงื่อนไขมี 2 ส่วน: <strong>if-clause</strong> และ <strong>main clause</strong> จุดสอบคือเลือกชนิดเงื่อนไขว่าเป็นจริงทั่วไป เป็นไปได้ จินตนาการ หรือเสียดายในอดีต
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ตาราง Conditional หลัก</span>

| Type | If-clause | Main clause | ใช้เมื่อ |
|---|---|---|---|
| Zero | If + Present Simple | Present Simple | ความจริงทั่วไป กฎธรรมชาติ |
| First | If + Present Simple | will/can/may + V1 | มีโอกาสเกิดจริงในอนาคต |
| Second | If + Past Simple | would/could/might + V1 | สมมติปัจจุบัน/อนาคตที่เป็นไปได้น้อย |
| Third | If + Past Perfect | would/could/might have + V3 | สมมติย้อนหลังในอดีต |
| Mixed | If + Past Perfect | would + V1 | อดีตส่งผลถึงปัจจุบัน |

## <span class="text-4xl font-black text-slate-900">ตัวอย่างแต่ละแบบ</span>

1. Zero: If water reaches 100 degrees, it boils.
2. First: If I have time, I will review grammar tonight.
3. Second: If I were you, I would read the question carefully.
4. Third: If she had studied harder, she would have passed the exam.
5. Mixed: If he had saved money, he would be comfortable now.

## <span class="text-4xl font-black text-slate-900">Unless, Provided that, As long as</span>

| คำ | ความหมาย | ตัวอย่าง |
|---|---|---|
| unless | ถ้าไม่ / เว้นแต่ | Unless you hurry, you will miss the bus. |
| provided that | โดยมีเงื่อนไขว่า | You can join provided that you register first. |
| as long as | ตราบใดที่ | You may leave as long as you finish the task. |
| in case | เผื่อว่า | Take an umbrella in case it rains. |

## <span class="text-4xl font-black text-slate-900">จุดหลอกในข้อสอบ</span>

1. ใน First Conditional ส่วน if ไม่ใช้ will แม้แปลว่าอนาคต
2. If I were you เป็นรูปมาตรฐานสำหรับการสมมติ
3. If-clause จะอยู่หน้าหรือหลังก็ได้ ถ้าอยู่หน้ามักมี comma
4. Third Conditional ต้องจำ had + V3 คู่กับ would have + V3
5. Unless มีความหมายปฏิเสธอยู่แล้ว อย่าเติม not ซ้ำโดยไม่จำเป็น

<blockquote>
สูตรจำ: ถ้าเป็นจริงทั่วไปใช้ Present-Present, ถ้าอนาคตเป็นไปได้ใช้ Present-Will, ถ้าสมมติใช้ Past-Would, ถ้าเสียดายอดีตใช้ Had V3-Would have V3
</blockquote>
`
  },
  {
    id: 'a2_g12_non_finite',
    title: '13. Unit 12 Non-finite Verb กริยาไม่แท้',
    content: `
# Unit 12 Non-finite Verb กริยาไม่แท้

<div class="bg-gradient-to-r from-fuchsia-50 via-pink-50 to-white border-l-4 border-fuchsia-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-fuchsia-950 text-4xl font-black leading-tight mb-3">Non-finite Verb มีรูปเป็นกริยา แต่ไม่ได้ทำหน้าที่เป็นกริยาแท้ของประโยค</div>
  <div class="bg-white rounded-2xl border border-fuchsia-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    กริยาไม่แท้แบ่งหลัก ๆ เป็น <strong>Infinitive</strong>, <strong>Gerund</strong> และ <strong>Participle</strong> ใช้ทำหน้าที่เป็น noun, adjective หรือ adverb
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Finite vs Non-finite</span>

| แบบ | ลักษณะ | ตัวอย่าง |
|---|---|---|
| Finite Verb | กริยาแท้ เปลี่ยนตามประธานและเวลา | She teaches English. |
| Non-finite Verb | กริยาไม่แท้ ไม่เป็น verb หลัก | Teaching English is meaningful. |

## <span class="text-4xl font-black text-slate-900">Infinitive</span>

| รูป | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| to + V1 | ตามหลัง verb บางกลุ่ม บอกจุดประสงค์ | I want to improve my English. |
| bare infinitive | ตามหลัง modal หรือ verb รับรู้บางคำ | You must study. / I saw him leave. |

กริยาที่ตามด้วย to + V1 บ่อย: want, hope, plan, decide, agree, refuse, promise, learn, need, expect, try, choose

โครงสร้าง object + to + V1: ask, tell, order, advise, allow, invite, encourage, expect, want เช่น The teacher advised students to review grammar.

## <span class="text-4xl font-black text-slate-900">Gerund</span>

Gerund คือ V-ing ที่ทำหน้าที่เหมือนคำนาม ใช้เป็นประธาน กรรม หรือกรรมหลัง preposition

| หน้าที่ | ตัวอย่าง |
|---|---|
| ประธาน | Reading improves vocabulary. |
| กรรม | She enjoys teaching. |
| หลัง preposition | He is interested in learning English. |

กริยาที่ตามด้วย gerund บ่อย: enjoy, avoid, finish, mind, consider, suggest, practice, keep, miss, admit, deny, risk

## <span class="text-4xl font-black text-slate-900">Participle</span>

| รูป | ใช้ขยายนามแบบ | ตัวอย่าง |
|---|---|---|
| Present Participle V-ing | นามเป็นผู้กระทำ | a sleeping baby, an interesting lesson |
| Past Participle V3 | นามถูกกระทำ | a broken chair, a bored student |

## <span class="text-4xl font-black text-slate-900">คำที่ตามได้ทั้ง Gerund และ Infinitive แต่ความหมายเปลี่ยน</span>

| Verb | + Gerund | + To Infinitive |
|---|---|---|
| stop | หยุดสิ่งที่กำลังทำ | หยุดเพื่อไปทำอีกสิ่ง |
| remember | จำได้ว่าเคยทำแล้ว | จำไว้ว่าต้องทำ |
| forget | ลืมว่าเคยทำแล้ว | ลืมที่จะทำ |
| try | ลองทำดู | พยายามทำ |

<blockquote>
จำสั้น: to V1 มักมองไปข้างหน้าเป็นจุดประสงค์, V-ing มักเป็นกิจกรรมหรือประสบการณ์, V3 ขยายนามที่ถูกกระทำ
</blockquote>
`
  },
  {
    id: 'a2_g13_modal',
    title: '14. Unit 13 Modal Verb กริยาช่วย',
    content: `
# Unit 13 Modal Verb กริยาช่วย

<div class="bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-l-4 border-purple-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-purple-950 text-4xl font-black leading-tight mb-3">Modal Verb คือกริยาช่วยที่บอกน้ำเสียงของประโยค</div>
  <div class="bg-white rounded-2xl border border-purple-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    Modal ใช้บอกความสามารถ ความจำเป็น ความเป็นไปได้ การอนุญาต การเสนอแนะ หรือความมั่นใจ กฎสำคัญคือ <strong>modal + V1</strong> เสมอ
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">กฎ Modal ที่ห้ามลืม</span>

1. ใช้กับประธานทุกตัวโดยไม่เติม s
2. ตามด้วยกริยาช่อง 1 ไม่เติม to ยกเว้น ought to, have to, used to
3. ทำปฏิเสธโดยเติม not หลัง modal เช่น cannot, should not
4. ทำคำถามโดยวาง modal หน้าประธาน เช่น Can you help me?
5. modal ส่วนใหญ่ไม่มีรูปอดีต/อนาคตเต็ม ต้องใช้รูปอื่นช่วย เช่น be able to, have to

## <span class="text-4xl font-black text-slate-900">ตารางความหมาย Modal</span>

| Modal | ความหมายหลัก | ตัวอย่าง |
|---|---|---|
| can | สามารถ / ขออนุญาตแบบทั่วไป | She can speak English. |
| could | สามารถในอดีต / ขอร้องสุภาพ / ความเป็นไปได้ | Could you explain it again? |
| may | อาจจะ / ขออนุญาตสุภาพ | May I leave now? |
| might | อาจจะ แต่โอกาสน้อยกว่า may | It might rain tonight. |
| must | ต้อง / มั่นใจมาก | Students must wear uniforms. |
| have to | ต้อง เพราะกฎหรือสถานการณ์ | I have to submit the report. |
| should | ควร | You should review the lesson. |
| ought to | ควร | Teachers ought to be patient. |
| will | จะ / ยินดี / สัญญา | I will help you. |
| would | จะในอดีต / ขอร้องสุภาพ / สมมติ | Would you open the window? |
| shall | เสนอแนะกับ I/we | Shall we begin? |
| used to | เคยทำในอดีต | I used to study at night. |

## <span class="text-4xl font-black text-slate-900">Must vs Have to vs Should</span>

| คำ | น้ำหนัก | ความหมาย |
|---|---|---|
| must | หนักที่สุด | ต้องทำ / ผู้พูดเห็นว่าจำเป็น |
| have to | กฎหรือสถานการณ์บังคับ | ต้องทำเพราะเงื่อนไขภายนอก |
| should | เบากว่า | ควรทำ เป็นคำแนะนำ |

## <span class="text-4xl font-black text-slate-900">Need และ Need not</span>

1. need to + V1 = จำเป็นต้องทำ
2. do not need to + V1 = ไม่จำเป็นต้องทำ
3. need not + V1 = ไม่จำเป็นต้องทำ แบบ modal

<blockquote>
สูตรจำ Modal: หลัง modal เป็น V1 ดิบเสมอ ไม่เติม s ไม่เติม ed ไม่เติม to ยกเว้น modal กึ่งพิเศษบางตัว
</blockquote>
`
  },
  {
    id: 'a2_g14_reported_speech',
    title: '15. Unit 14 Reported Speech ประโยคเล่า',
    content: `
# Unit 14 Reported Speech ประโยคเล่า

<div class="bg-gradient-to-r from-amber-50 via-yellow-50 to-white border-l-4 border-amber-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-amber-950 text-4xl font-black leading-tight mb-3">Reported Speech คือการเอาคำพูดคนอื่นมาเล่า โดยต้องปรับ tense, pronoun และเวลา</div>
  <div class="bg-white rounded-2xl border border-amber-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ถ้า reporting verb เป็นอดีต เช่น said, told, asked มักต้องเลื่อน tense ย้อนกลับหนึ่งขั้น และเปลี่ยนคำบอกเวลา/สถานที่ให้เข้ากับมุมผู้เล่า
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Direct vs Reported</span>

| Direct Speech | Reported Speech |
|---|---|
| She said, "I am tired." | She said that she was tired. |
| He said, "I will help you." | He said that he would help me. |
| The teacher asked, "Do you understand?" | The teacher asked if I understood. |

## <span class="text-4xl font-black text-slate-900">Backshift ตารางเลื่อน Tense</span>

| Direct | Reported |
|---|---|
| Present Simple | Past Simple |
| Present Continuous | Past Continuous |
| Present Perfect | Past Perfect |
| Past Simple | Past Perfect |
| will | would |
| can | could |
| may | might |
| must | had to หรือ must ถ้าเป็นกฎทั่วไป |

## <span class="text-4xl font-black text-slate-900">เปลี่ยนคำบอกเวลาและสถานที่</span>

| Direct | Reported |
|---|---|
| now | then |
| today | that day |
| yesterday | the day before |
| tomorrow | the next day / the following day |
| last week | the week before |
| next month | the following month |
| here | there |
| this | that |
| these | those |

## <span class="text-4xl font-black text-slate-900">ประโยคบอกเล่า คำถาม และคำสั่ง</span>

| แบบ | รูปใช้บ่อย | ตัวอย่าง |
|---|---|---|
| บอกเล่า | say/tell + that + clause | She told me that she was busy. |
| Yes/No Question | ask + if/whether + S + V | He asked if I was ready. |
| Wh-question | ask + wh-word + S + V | She asked where I lived. |
| คำสั่ง/ขอร้อง | tell/ask/order + object + to V1 | The teacher asked us to be quiet. |
| ห้าม | tell/ask + object + not to V1 | He told me not to be late. |

## <span class="text-4xl font-black text-slate-900">กรณีไม่ต้องเลื่อน Tense</span>

1. reporting verb เป็นปัจจุบัน เช่น says, tells
2. ข้อความเป็นความจริงทั่วไป เช่น The teacher said that water boils at 100 degrees.
3. เหตุการณ์ยังเป็นจริงอยู่ในปัจจุบันและผู้พูดต้องการเน้นว่ายังจริง

<blockquote>
สูตรทำ Reported Speech: ดูกริยานำ -> เปลี่ยนสรรพนาม -> เลื่อน tense -> เปลี่ยนเวลา/สถานที่ -> จัดลำดับคำถามเป็นประโยคบอกเล่า
</blockquote>
`
  },
  {
    id: 'a2_g15_adjective',
    title: '16. Unit 15 Adjective คำคุณศัพท์',
    content: `
# Unit 15 Adjective คำคุณศัพท์

<div class="bg-gradient-to-r from-pink-50 via-rose-50 to-white border-l-4 border-pink-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-pink-950 text-4xl font-black leading-tight mb-3">Adjective คือคำขยายนาม ทำให้รู้ว่านามนั้นเป็นแบบไหน ของใคร อันไหน จำนวนเท่าไร</div>
  <div class="bg-white rounded-2xl border border-pink-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    จุดสอบหลักคือประเภทของ adjective ตำแหน่ง adjective และการเรียงลำดับ adjective หลายคำก่อน noun
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ประเภทของ Adjective</span>

| ประเภท | หน้าที่ | ตัวอย่าง |
|---|---|---|
| Proper Adjective | บอกชาติ ภาษา หรือชื่อเฉพาะ | Thai food, English grammar |
| Possessive Adjective | บอกความเป็นเจ้าของ ต้องมี noun ตามหลัง | my book, their school |
| Interrogative Adjective | ใช้ถามและวางหน้า noun | which class, what subject |
| Descriptive Adjective | บอกลักษณะ คุณภาพ | beautiful, old, useful |
| Demonstrative/Definite Adjective | ชี้เฉพาะ | this lesson, those students |
| Indefinite Adjective | ไม่ชี้เฉพาะ | some books, many students, several problems |

## <span class="text-4xl font-black text-slate-900">ตำแหน่งของ Adjective</span>

1. วางหน้า noun: an important lesson
2. วางหลัง linking verb: The lesson is important.
3. วางหลัง noun ในบางโครงสร้าง เช่น something interesting, the people present
4. ใช้กับ too/enough: too difficult, easy enough

## <span class="text-4xl font-black text-slate-900">Participle เป็น Adjective</span>

| รูป | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| V-ing | นามเป็นสาเหตุของความรู้สึก/เป็นผู้กระทำ | an interesting book, a boring class |
| V3 | นามเป็นผู้รู้สึก/ถูกกระทำ | an interested student, a broken window |

จำคู่ความรู้สึก: interested/interesting, bored/boring, excited/exciting, surprised/surprising, confused/confusing

## <span class="text-4xl font-black text-slate-900">ลำดับ Adjective ก่อน Noun</span>

<div align="center" class="my-6">
  <div class="inline-block rounded-3xl bg-white border-2 border-pink-200 px-6 py-5 shadow-sm">
    <div class="text-sm font-bold text-pink-500 mb-2">Order Memory</div>
    <div class="text-3xl md:text-5xl font-black text-pink-800">Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose</div>
  </div>
</div>

ตัวอย่าง: a beautiful small old round brown Thai wooden dining table

## <span class="text-4xl font-black text-slate-900">จุดหลอก</span>

1. adjective ไม่เติม s แม้ noun เป็นพหูพจน์ เช่น good students ไม่ใช่ goods students
2. enough วางหลัง adjective แต่ก่อน noun เช่น old enough, enough time
3. too + adjective + to V1 = เกินกว่าจะทำ เช่น too tired to study
4. so + adjective + that clause = มากจนกระทั่ง เช่น so difficult that many students failed

<blockquote>
จำง่าย: adjective ขยายนาม ส่วน adverb ขยายกริยา/คุณศัพท์/กริยาวิเศษณ์ ถ้าข้อสอบให้เลือกระหว่าง quick และ quickly ให้ถามว่าขยายอะไร
</blockquote>
`
  },
  {
    id: 'a2_g16_adverb',
    title: '17. Unit 16 Adverb คำกริยาวิเศษณ์',
    content: `
# Unit 16 Adverb คำกริยาวิเศษณ์

<div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-white border-l-4 border-teal-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-teal-950 text-4xl font-black leading-tight mb-3">Adverb ขยายได้กว้างกว่า Adjective: ขยายกริยา คุณศัพท์ กริยาวิเศษณ์ หรือทั้งประโยค</div>
  <div class="bg-white rounded-2xl border border-teal-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบมักวัดคำลงท้าย -ly ตำแหน่ง adverb และคำที่เป็นได้ทั้ง adjective/adverb โดยต้องดูหน้าที่ในประโยค
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ประเภทของ Adverb</span>

| ประเภท | ถามว่า | ตัวอย่าง |
|---|---|---|
| Adverb of Manner | อย่างไร | carefully, quickly, well |
| Adverb of Place | ที่ไหน | here, there, upstairs, outside |
| Adverb of Time | เมื่อไร | today, yesterday, soon, already |
| Adverb of Frequency | บ่อยแค่ไหน | always, usually, often, sometimes, never |
| Adverb of Degree | ระดับเท่าไร | very, too, quite, almost, enough |
| Sentence Adverb | ทัศนะต่อทั้งประโยค | fortunately, clearly, probably |

## <span class="text-4xl font-black text-slate-900">หน้าที่ของ Adverb</span>

1. ขยาย verb: She speaks clearly.
2. ขยาย adjective: The lesson is very useful.
3. ขยาย adverb: He answered extremely quickly.
4. ขยาย phrase: The students worked right after class.
5. ขยายทั้งประโยค: Fortunately, everyone arrived safely.

## <span class="text-4xl font-black text-slate-900">ตำแหน่งที่เจอบ่อย</span>

| Adverb | ตำแหน่ง |
|---|---|
| Manner | หลัง verb หรือ object: She wrote the answer carefully. |
| Frequency | หน้า verb แท้ แต่หลัง verb to be: She often reads. / She is often late. |
| Time | ต้นหรือท้ายประโยค: Yesterday, we studied grammar. |
| Degree | หน้า adjective/adverb: very important, quite slowly |
| enough | หลัง adjective/adverb แต่ก่อน noun: old enough, enough time |

## <span class="text-4xl font-black text-slate-900">Adjective กับ Adverb รูปเดียวกัน</span>

| คำ | ตัวอย่างเป็น Adjective | ตัวอย่างเป็น Adverb |
|---|---|---|
| fast | a fast car | The car runs fast. |
| hard | a hard test | She works hard. |
| late | a late train | He arrived late. |
| early | an early class | They came early. |
| high | a high wall | The bird flew high. |

## <span class="text-4xl font-black text-slate-900">คำที่หลอกด้วย -ly</span>

friendly, lovely, lonely, lively เป็น adjective ไม่ใช่ adverb ทั่วไป เช่น a friendly teacher

<blockquote>
สูตรจำตำแหน่ง frequency: อยู่หน้า verb แท้ แต่อยู่หลัง verb to be
</blockquote>
`
  },
  {
    id: 'a2_g17_comparison',
    title: '18. Unit 17 Comparison การเปรียบเทียบ',
    content: `
# Unit 17 Comparison การเปรียบเทียบ

<div class="bg-gradient-to-r from-lime-50 via-green-50 to-white border-l-4 border-lime-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-lime-950 text-4xl font-black leading-tight mb-3">Comparison ใช้เปรียบเทียบ adjective และ adverb เป็น 3 ระดับ</div>
  <div class="bg-white rounded-2xl border border-lime-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    จุดสำคัญคือเลือกระหว่าง <strong>-er/-est</strong> กับ <strong>more/most</strong> และจำรูปพิเศษ เช่น good-better-best, bad-worse-worst
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">3 ระดับของการเปรียบเทียบ</span>

| ระดับ | รูป | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|---|
| Positive | as + adj/adv + as | เท่ากัน | She is as tall as her sister. |
| Comparative | adj/adv + er + than หรือ more + adj/adv + than | เปรียบ 2 สิ่ง | This book is easier than that one. |
| Superlative | the + adj/adv + est หรือ the most + adj/adv | มากที่สุดในกลุ่ม | He is the most careful student. |

## <span class="text-4xl font-black text-slate-900">การเติม -er / -est</span>

| กฎ | Comparative | Superlative |
|---|---|---|
| คำพยางค์เดียวทั่วไป | tall -> taller | tallest |
| ลงท้าย e เติม r/st | large -> larger | largest |
| พยัญชนะ + y เปลี่ยน y เป็น i | happy -> happier | happiest |
| สระเสียงสั้น + พยัญชนะตัวเดียว ซ้ำพยัญชนะ | big -> bigger | biggest |
| คำยาวใช้ more/most | more important | most important |

## <span class="text-4xl font-black text-slate-900">รูปพิเศษ</span>

| Positive | Comparative | Superlative |
|---|---|---|
| good / well | better | best |
| bad / badly | worse | worst |
| many / much | more | most |
| little | less | least |
| far | farther/further | farthest/furthest |

## <span class="text-4xl font-black text-slate-900">โครงสร้างที่ออกสอบ</span>

1. as + adj/adv + as = เท่า ๆ กัน
2. not as/so + adj/adv + as = ไม่เท่า
3. less + adj/adv + than = น้อยกว่า
4. the same + noun + as = เหมือนกัน
5. different from = แตกต่างจาก
6. the + comparative, the + comparative = ยิ่ง...ยิ่ง...
7. comparative + and + comparative = มากขึ้นเรื่อย ๆ

<blockquote>
จำเร็ว: เปรียบ 2 สิ่งใช้ than, ที่สุดในกลุ่มใช้ the, เท่ากันใช้ as...as
</blockquote>
`
  },
  {
    id: 'a2_g18_preposition',
    title: '19. Unit 18 Preposition คำบุพบท',
    content: `
# Unit 18 Preposition คำบุพบท

<div class="bg-gradient-to-r from-cyan-50 via-blue-50 to-white border-l-4 border-cyan-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-cyan-950 text-4xl font-black leading-tight mb-3">Preposition คือคำเชื่อมความสัมพันธ์ ต้องตามด้วย noun หรือ pronoun</div>
  <div class="bg-white rounded-2xl border border-cyan-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบ preposition ต้องจำเป็นภาพ: เวลา สถานที่ ทิศทาง วิธีการ เหตุผล และสำนวนคงที่
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Preposition of Time</span>

| คำ | ใช้กับ | ตัวอย่าง |
|---|---|---|
| at | เวลาแน่นอน จุดเวลา | at 8 o'clock, at noon, at night |
| on | วัน วันที่ | on Monday, on 21 April, on New Year's Day |
| in | เดือน ปี ฤดู ช่วงเวลา | in April, in 2026, in the morning |
| for | ระยะเวลา | for two hours |
| since | จุดเริ่มต้น | since 2020 |
| by | ไม่เกินเวลา | by Friday |
| during | ระหว่างช่วง | during the lesson |
| until/till | จนกระทั่ง | until noon |

## <span class="text-4xl font-black text-slate-900">Preposition of Place</span>

| คำ | ภาพจำ | ตัวอย่าง |
|---|---|---|
| at | จุด | at school, at the bus stop |
| in | อยู่ภายในพื้นที่ | in the classroom, in Thailand |
| on | อยู่บนพื้นผิว | on the desk, on the wall |
| under | ใต้ | under the table |
| between | ระหว่างสองสิ่ง | between the library and the office |
| among | ท่ามกลางหลายสิ่ง | among students |
| next to / beside | ข้าง ๆ | next to the door |
| in front of / behind | หน้า / หลัง | in front of the school |

## <span class="text-4xl font-black text-slate-900">Direction และ Movement</span>

to = ไปยัง, into = เข้าไปข้างใน, out of = ออกจาก, across = ข้าม, through = ผ่านทะลุ, along = ไปตาม, toward = มุ่งไปทาง, from = จาก

## <span class="text-4xl font-black text-slate-900">Preposition ในสำนวน</span>

| สำนวน | ความหมาย |
|---|---|
| interested in | สนใจใน |
| good at | เก่งด้าน |
| afraid of | กลัว |
| responsible for | รับผิดชอบต่อ |
| depend on | ขึ้นอยู่กับ |
| different from | แตกต่างจาก |
| similar to | คล้ายกับ |
| look after | ดูแล |
| look for | มองหา |
| apply for | สมัคร |

<blockquote>
จำภาพ: at = จุด, on = ผิว, in = ภายใน, by = ไม่เกิน, for = ระยะเวลา, since = จุดเริ่มต้น
</blockquote>
`
  },
  {
    id: 'a2_g19_conjunction',
    title: '20. Unit 19 Conjunction คำสันธาน',
    content: `
# Unit 19 Conjunction คำสันธาน

<div class="bg-gradient-to-r from-indigo-50 via-blue-50 to-white border-l-4 border-indigo-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-indigo-950 text-4xl font-black leading-tight mb-3">Conjunction เชื่อมความคิดให้ประโยคไหลต่อกันอย่างมีเหตุผล</div>
  <div class="bg-white rounded-2xl border border-indigo-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    คำเชื่อมแบ่งเป็น coordinate, correlative และ subordinate จุดสอบคือความหมายและโครงสร้างคู่ขนาน
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Coordinate Conjunction: FANBOYS</span>

| ตัว | คำ | ความหมาย |
|---|---|---|
| F | for | เพราะว่า ใช้นำเหตุ |
| A | and | และ |
| N | nor | และไม่ |
| B | but | แต่ |
| O | or | หรือ |
| Y | yet | แต่/อย่างไรก็ตาม |
| S | so | ดังนั้น ใช้นำผล |

ตัวอย่าง: The test was difficult, but many students passed.

## <span class="text-4xl font-black text-slate-900">Correlative Conjunction</span>

| คู่คำ | ความหมาย | ตัวอย่าง |
|---|---|---|
| both...and | ทั้ง...และ... | Both teachers and students attended. |
| either...or | ไม่...ก็... | Either you or I must answer. |
| neither...nor | ไม่ทั้ง...และ... | Neither the teacher nor the students were late. |
| not only...but also | ไม่เพียงแต่...แต่ยัง... | She is not only kind but also patient. |
| whether...or | ไม่ว่า...หรือ... | I do not know whether he will come or stay home. |

## <span class="text-4xl font-black text-slate-900">Subordinate Conjunction</span>

| กลุ่มความหมาย | คำเชื่อม |
|---|---|
| เวลา | when, while, before, after, until, as soon as |
| เหตุผล | because, since, as |
| เงื่อนไข | if, unless, provided that, as long as |
| ขัดแย้ง | although, though, even though, while |
| ผลลัพธ์ | so that, so...that, such...that |
| จุดประสงค์ | so that, in order that |

## <span class="text-4xl font-black text-slate-900">Parallel Structure</span>

เมื่อใช้คำเชื่อมคู่ ต้องให้ส่วนที่ถูกเชื่อมมีรูปแบบเดียวกัน เช่น noun กับ noun, verb กับ verb, phrase กับ phrase

ถูก: She likes <strong>reading</strong> and <strong>writing</strong>.  
ผิด: She likes <strong>reading</strong> and <strong>to write</strong>.

## <span class="text-4xl font-black text-slate-900">Because vs Because of</span>

| รูป | ตามด้วย | ตัวอย่าง |
|---|---|---|
| because | clause มี S + V | Because it rained, we stayed home. |
| because of | noun / noun phrase / V-ing | Because of the rain, we stayed home. |

<blockquote>
จำ FANBOYS ให้ขึ้นใจ แล้วดูว่าเชื่อมคำระดับเดียวกันหรือเชื่อมประโยคหลักกับประโยคย่อย
</blockquote>
`
  },
  {
    id: 'a2_g20_question_tag',
    title: '21. Unit 20 Question Tag คำถามท้ายประโยค',
    content: `
# Unit 20 Question Tag คำถามท้ายประโยค

<div class="bg-gradient-to-r from-rose-50 via-pink-50 to-white border-l-4 border-rose-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-rose-950 text-4xl font-black leading-tight mb-3">Question Tag คือคำถามสั้นท้ายประโยคเพื่อขอการยืนยัน</div>
  <div class="bg-white rounded-2xl border border-rose-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    หลักใหญ่คือ “หน้าบวก ท้ายลบ” และ “หน้าลบ ท้ายบวก” โดย tag ต้องใช้ auxiliary ให้ตรงกับประโยคหน้า
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">หลักทั่วไป</span>

| ประโยคหน้า | Question Tag | ตัวอย่าง |
|---|---|---|
| บอกเล่า | ปฏิเสธ | You are a teacher, aren't you? |
| ปฏิเสธ | บอกเล่า | She isn't ready, is she? |
| มี be | ใช้ be ตัวเดิม | They were late, weren't they? |
| มี auxiliary/modal | ใช้ตัวนั้น | He can swim, can't he? |
| มี verb แท้ | ใช้ do/does/did | She likes English, doesn't she? |

## <span class="text-4xl font-black text-slate-900">รูปย่อที่ควรจำ</span>

| เต็ม | ย่อ |
|---|---|
| is not | isn't |
| are not | aren't |
| was not | wasn't |
| were not | weren't |
| do not | don't |
| does not | doesn't |
| did not | didn't |
| will not | won't |
| can not | can't |
| should not | shouldn't |
| would not | wouldn't |
| must not | mustn't |

## <span class="text-4xl font-black text-slate-900">กรณีพิเศษ</span>

| ประโยคหน้า | Tag |
|---|---|
| I am... | aren't I? |
| Let's... | shall we? |
| คำสั่ง/ขอร้อง | will you? หรือ won't you? |
| There is/are... | ใช้ there ใน tag |
| This/That is... | ใช้ it ใน tag |
| These/Those are... | ใช้ they ใน tag |
| Everyone/Someone/No one... | ใช้ they ใน tag |
| used to | ใช้ did ใน tag |
| had better | ใช้ hadn't ใน tag |

## <span class="text-4xl font-black text-slate-900">คำที่มีความหมายปฏิเสธ</span>

ถ้าประโยคหน้ามี never, hardly, scarcely, rarely, seldom, few, little, no, nobody, nothing ให้ถือว่าเป็นลบ แล้ว tag เป็นบวก

ตัวอย่าง: She never comes late, <strong>does she?</strong>

## <span class="text-4xl font-black text-slate-900">วิธีตอบ Yes/No</span>

ตอบตามความจริง ไม่ตอบตามรูปประโยคไทย เช่น You aren't tired, are you? ถ้าเหนื่อยจริงตอบ Yes, I am.

<blockquote>
สูตรจำ Question Tag: สลับขั้ว + ใช้ auxiliary เดิม + เปลี่ยนประธานเป็น pronoun
</blockquote>
`
  },
  {
    id: 'a2_g21_irregular_verbs',
    title: '22. กริยา 3 ช่อง + สูตรทบทวนก่อนสอบ',
    content: `
# กริยา 3 ช่อง + สูตรทบทวนก่อนสอบ

<div class="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 p-6 my-6 rounded-3xl shadow-lg text-white">
  <div class="text-4xl font-black leading-tight mb-3">กริยา 3 ช่องคือฐานของ Past, Perfect และ Passive</div>
  <div class="bg-white/10 rounded-2xl border border-white/20 p-5 text-blue-50 text-xl leading-relaxed">
    ถ้าจำ V2/V3 ไม่ได้ จะพลาด Past Simple, Present Perfect, Past Perfect และ Passive Voice ทันที จึงควรจำเป็น “รูปแบบการเปลี่ยน” ไม่ใช่ท่องสะเปะสะปะ
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">จำเป็นกลุ่ม: AAA / ABA / ABB / ABC</span>

| กลุ่ม | รูปแบบ | ตัวอย่าง |
|---|---|---|
| AAA | ทั้ง 3 ช่องเหมือนกัน | cut-cut-cut, put-put-put |
| ABA | ช่อง 1 และ 3 เหมือนกัน | come-came-come, run-ran-run |
| ABB | ช่อง 2 และ 3 เหมือนกัน | buy-bought-bought, teach-taught-taught |
| ABC | ทั้ง 3 ช่องต่างกัน | go-went-gone, write-wrote-written |

## <span class="text-4xl font-black text-slate-900">ตารางกริยา 3 ช่องที่ใช้บ่อย</span>

| V1 | V2 | V3 | ความหมาย |
|---|---|---|---|
| be | was/were | been | เป็น/อยู่/คือ |
| become | became | become | กลายเป็น |
| begin | began | begun | เริ่ม |
| break | broke | broken | แตก/ทำลาย |
| bring | brought | brought | นำมา |
| build | built | built | สร้าง |
| buy | bought | bought | ซื้อ |
| catch | caught | caught | จับ/ขึ้นรถทัน |
| choose | chose | chosen | เลือก |
| come | came | come | มา |
| cost | cost | cost | มีราคา |
| cut | cut | cut | ตัด |
| do | did | done | ทำ |
| draw | drew | drawn | วาด |
| drink | drank | drunk | ดื่ม |
| drive | drove | driven | ขับ |
| eat | ate | eaten | กิน |
| fall | fell | fallen | ตก/ล้ม |
| feel | felt | felt | รู้สึก |
| find | found | found | พบ |
| fly | flew | flown | บิน |
| forget | forgot | forgotten | ลืม |
| get | got | got/gotten | ได้รับ/กลายเป็น |
| give | gave | given | ให้ |
| go | went | gone | ไป |
| grow | grew | grown | เติบโต |
| have | had | had | มี |
| hear | heard | heard | ได้ยิน |
| hit | hit | hit | ตี/ชน |
| hold | held | held | ถือ/จัด |
| keep | kept | kept | เก็บ/รักษา |
| know | knew | known | รู้ |
| leave | left | left | ออกจาก/ทิ้งไว้ |
| lend | lent | lent | ให้ยืม |
| let | let | let | อนุญาต |
| lose | lost | lost | สูญเสีย/แพ้ |
| make | made | made | ทำ/สร้าง |
| meet | met | met | พบ |
| pay | paid | paid | จ่าย |
| put | put | put | วาง |
| read | read | read | อ่าน |
| ride | rode | ridden | ขี่ |
| ring | rang | rung | สั่น/โทร |
| rise | rose | risen | เพิ่มขึ้น/ขึ้น |
| run | ran | run | วิ่ง |
| say | said | said | พูด |
| see | saw | seen | เห็น |
| sell | sold | sold | ขาย |
| send | sent | sent | ส่ง |
| set | set | set | ตั้งค่า/วาง |
| shake | shook | shaken | เขย่า |
| shut | shut | shut | ปิด |
| sing | sang | sung | ร้องเพลง |
| sit | sat | sat | นั่ง |
| sleep | slept | slept | นอน |
| speak | spoke | spoken | พูด |
| spend | spent | spent | ใช้เวลา/ใช้เงิน |
| stand | stood | stood | ยืน |
| steal | stole | stolen | ขโมย |
| swim | swam | swum | ว่ายน้ำ |
| take | took | taken | เอา/ใช้เวลา |
| teach | taught | taught | สอน |
| tell | told | told | บอก |
| think | thought | thought | คิด |
| understand | understood | understood | เข้าใจ |
| wear | wore | worn | สวมใส่ |
| win | won | won | ชนะ |
| write | wrote | written | เขียน |

## <span class="text-4xl font-black text-slate-900">เชื่อมกับบทอื่นอย่างไร</span>

| บท | ใช้ช่องไหน | ตัวอย่าง |
|---|---|---|
| Past Simple | V2 | She wrote a report yesterday. |
| Present Perfect | has/have + V3 | She has written three reports. |
| Past Perfect | had + V3 | She had written it before class. |
| Passive Voice | be + V3 | The report was written by her. |
| Adjective จาก Participle | V3 | a written report, a broken chair |

## <span class="text-4xl font-black text-slate-900">สรุปจำก่อนสอบ Grammar</span>

1. หา subject และ finite verb ก่อนแปลทั้งประโยค
2. noun ต้องรู้ว่านับได้หรือนับไม่ได้
3. article ใช้จากความเฉพาะเจาะจงและเสียง a/an
4. tense ให้ดูเวลา + ลักษณะเหตุการณ์
5. passive ต้องมี be + V3
6. conditional ต้องจับคู่ if-clause กับ main clause
7. pronoun ต้องตรงหน้าที่และสิ่งที่แทน
8. adjective ขยายนาม แต่ adverb ขยายกริยา/คุณศัพท์/กริยาวิเศษณ์
9. preposition และ conjunction ต้องจำเป็นกลุ่มความหมาย
10. question tag สลับขั้วและใช้ auxiliary ให้ตรง

<blockquote>
เทคนิคท่องกริยา 3 ช่อง: ท่องเป็นแพตเทิร์นเสียง เช่น sing-sang-sung, ring-rang-rung และจับกลุ่ม taught-bought-thought-caught เพราะช่อง 2 และ 3 เหมือนกัน
</blockquote>
`
  },
  {
    id: 'a2_g22_exam_grammar_integration',
    title: '23. เสริมแนวสอบ Grammar: โครงสร้างประโยค Determiners และ Passive ขั้นสูง',
    content: `
# เสริมแนวสอบ Grammar: โครงสร้างประโยค Determiners และ Passive ขั้นสูง

## <span class="text-4xl font-black text-blue-900">บทนี้คือสะพานรวม Grammar ที่ข้อสอบชอบเอามาผสมกัน</span>

หลายข้อไม่ได้ถาม Grammar เรื่องเดียว แต่ผสมโครงสร้างประโยค ชนิดคำ determiner adjective/adverb และ passive เข้าด้วยกัน บทนี้จึงใช้เป็นบททวนรวมหลังเรียนทุก unit

<blockquote>
ถ้าจะทำข้อสอบ Grammar ให้เร็ว ให้เริ่มจากโครงประโยคก่อน แล้วค่อยดูคำย่อย เช่น article, quantifier, adjective, adverb
</blockquote>

## <span class="text-4xl font-black text-slate-900">5 โครงสร้างประโยคพื้นฐานที่ต้องเห็นให้ไว</span>

| โครงสร้าง | แกนประโยค | ตัวอย่าง | จุดสังเกต |
|---|---|---|---|
| S + V | ประธาน + อกรรมกริยา | She works hard. | verb ไม่ต้องมีกรรมก็จบประโยคได้ |
| S + V + O | ประธาน + สกรรมกริยา + กรรม | Mark kicks the ball. | verb ต้องการกรรมมารับการกระทำ |
| S + V + IO + DO | ประธาน + กริยา + กรรมรอง + กรรมตรง | My mother bought me a toy. | IO คือผู้ได้รับผลประโยชน์ DO คือสิ่งที่ถูกกระทำ |
| S + V + SC | ประธาน + linking verb + ส่วนเติมเต็มประธาน | James became an engineer. | หลัง be/seem/become/look/feel มักเป็น noun หรือ adjective |
| S + V + O + OC | ประธาน + กริยา + กรรม + ส่วนเติมเต็มกรรม | The news made him happy. | OC อธิบายสภาพของกรรม |

## <span class="text-4xl font-black text-slate-900">กรรมตรง กรรมรอง และกรรมของบุพบท</span>

| ชนิดกรรม | ตอบคำถาม | ตัวอย่าง |
|---|---|---|
| Direct Object | ทำอะไร/กระทำต่ออะไร | She teaches English. |
| Indirect Object | ให้ใคร/เพื่อใคร | She teaches us English. |
| Prepositional Object | ตามหลัง preposition | She teaches English to us. |

โครงสร้าง IO + DO มักแปลงเป็น DO + to/for + IO ได้ เช่น He gave his friend flowers. = He gave flowers to his friend.

## <span class="text-4xl font-black text-slate-900">Determiners: คำหน้าคำนามที่ทำให้ noun ชัดขึ้น</span>

| กลุ่ม | ตัวอย่าง | ใช้บอกอะไร |
|---|---|---|
| Articles | a, an, the | ทั่วไปหรือเฉพาะเจาะจง |
| Demonstratives | this, that, these, those | ชี้ใกล้/ไกล เอกพจน์/พหูพจน์ |
| Possessives | my, your, his, her, its, our, their, Tom's | ความเป็นเจ้าของ |
| Quantity | every, each, many, much, some, any, no, enough, a lot of | จำนวนหรือปริมาณ |

## <span class="text-4xl font-black text-slate-900">แผนจำ Quantifier แบบ 4 ช่อง</span>

| ใช้กับ | คำที่ควรจำ |
|---|---|
| นามนับได้เอกพจน์ | every, each, either, neither, one |
| นามนับได้พหูพจน์ | many, a few, few, several, both, a number of |
| นามนับไม่ได้ | much, little, a little, less, a large amount of, a great deal of |
| นับไม่ได้หรือพหูพจน์ | some, any, no, enough, more, most, all, a lot of, plenty of |

## <span class="text-4xl font-black text-slate-900">Adjective / Adverb ในข้อสอบโครงสร้าง</span>

1. หลัง linking verb เช่น be, seem, appear, become, get, look, feel, taste, smell, stay มักใช้ adjective เช่น The soup tastes good.
2. คำอย่าง chief, main, only, former, elder มักวางหน้า noun เช่น my elder brother
3. คำแสดงสภาพหลายคำที่ขึ้นต้นด้วย a- เช่น afraid, asleep, awake, alike, alive มักใช้หลัง linking verb
4. adverb ขยาย verb/adjective/adverb เช่น She answered carefully. / The test was extremely difficult.
5. คำที่เป็นได้ทั้ง adjective และ adverb ต้องดูหน้าที่ เช่น fast, hard, early, late

## <span class="text-4xl font-black text-slate-900">ลำดับ Adjective แบบแนวสอบ</span>

| ลำดับ | ประเภท | ตัวอย่าง |
|---|---|---|
| 1 | Determiner | this, my, two |
| 2 | Opinion | beautiful, useful, interesting |
| 3 | Size | big, small, tall |
| 4 | Age | old, new, young |
| 5 | Shape | round, square, long |
| 6 | Color | blue, white, red |
| 7 | Origin/Place | Thai, Japanese, Spanish |
| 8 | Material/Purpose | wooden, leather, cooking |
| 9 | Noun | table, song, bag |

ตัวอย่าง: this beautiful small old round blue Thai wooden table

## <span class="text-4xl font-black text-slate-900">Passive ขั้นสูงที่ควรเพิ่มจากบท Passive</span>

| รูป | โครงสร้าง | ตัวอย่าง |
|---|---|---|
| Modal Passive | modal + be + V3 | The window should be opened. |
| Passive มีกรรม 2 ตัว | IO เป็นประธาน หรือ DO เป็นประธาน | He was taught English. / English was taught to him. |
| Reporting Passive | It + be + V3 + that-clause | It is believed that the plan will work. |
| Reporting Passive แบบ to V | Subject + be + V3 + to V | She is said to work very hard. |
| Causative Passive | have/get + object + V3 | Jane had her bag stolen. |

## <span class="text-4xl font-black text-slate-900">แบบฝึกหัดรวม Grammar</span>

| ข้อ | โจทย์ | เฉลย | เหตุผล |
|---|---|---|---|
| 1 | She appears _____. (happy/happily) | happy | appear เป็น linking verb ตามด้วย adjective |
| 2 | My mother bought _____ a new bag. (me/to me) | me | โครงสร้าง V + IO + DO ใช้ me เป็นกรรมรองได้เลย |
| 3 | My mother bought a new bag _____ me. (to/for) | for | buy ใช้ for เมื่อเปลี่ยน IO เป็น prepositional object |
| 4 | There is _____ information in the report. (many/much) | much | information เป็นนามนับไม่ได้ |
| 5 | The blue Japanese car is mine. คำว่า Japanese เป็น adjective ประเภทใด | Origin | บอกแหล่งกำเนิด/สัญชาติ |
| 6 | The teacher should obey the rule. เปลี่ยนเป็น passive | The rule should be obeyed by the teacher. | modal passive = should be + V3 |
| 7 | They say that he is honest. เปลี่ยนเป็น reporting passive | It is said that he is honest. | ใช้ It + be + V3 + that-clause |
| 8 | Jane had her handbag _____. (snatch/snatched) | snatched | causative passive ใช้ object + V3 |

<blockquote>
จำแบบนักสอบ: หาโครงสร้าง S-V-O ก่อน แล้วค่อยถามว่า noun ต้องการ determiner ไหน คำขยายเป็น adjective หรือ adverb และประธานถูกกระทำหรือไม่
</blockquote>
`
  }
];

type GrammarExercise = {
  q: string;
  a: string;
  why: string;
};

type GrammarExtension = {
  tone: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'slate';
  title: string;
  thesis: string;
  note: string;
  checklist: string[];
  examples: Array<[string, string, string]>;
  traps: string[];
  exercises: GrammarExercise[];
};

const grammarTone = {
  blue: { wrap: 'border-blue-200', head: 'from-blue-50 via-indigo-50 to-white', text: 'text-blue-900', chip: 'bg-blue-700 text-white', soft: 'bg-blue-50 text-blue-900 border-blue-100' },
  emerald: { wrap: 'border-emerald-200', head: 'from-emerald-50 via-teal-50 to-white', text: 'text-emerald-900', chip: 'bg-emerald-700 text-white', soft: 'bg-emerald-50 text-emerald-900 border-emerald-100' },
  violet: { wrap: 'border-violet-200', head: 'from-violet-50 via-indigo-50 to-white', text: 'text-violet-900', chip: 'bg-violet-700 text-white', soft: 'bg-violet-50 text-violet-900 border-violet-100' },
  amber: { wrap: 'border-amber-200', head: 'from-amber-50 via-orange-50 to-white', text: 'text-amber-900', chip: 'bg-amber-600 text-white', soft: 'bg-amber-50 text-amber-900 border-amber-100' },
  rose: { wrap: 'border-rose-200', head: 'from-rose-50 via-pink-50 to-white', text: 'text-rose-900', chip: 'bg-rose-700 text-white', soft: 'bg-rose-50 text-rose-900 border-rose-100' },
  cyan: { wrap: 'border-cyan-200', head: 'from-cyan-50 via-sky-50 to-white', text: 'text-cyan-900', chip: 'bg-cyan-700 text-white', soft: 'bg-cyan-50 text-cyan-900 border-cyan-100' },
  slate: { wrap: 'border-slate-200', head: 'from-slate-50 via-blue-50 to-white', text: 'text-slate-900', chip: 'bg-slate-800 text-white', soft: 'bg-slate-50 text-slate-900 border-slate-200' }
};

const compactLessonHtml = (html: string) =>
  html
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');

const renderGrammarExtension = (lesson: GrammarExtension) => {
  const tone = grammarTone[lesson.tone];
  return compactLessonHtml(`

<div class="my-12 rounded-3xl border-2 ${tone.wrap} bg-white shadow-sm overflow-hidden">
  <div class="bg-gradient-to-r ${tone.head} p-6 md:p-8 border-b ${tone.wrap}">
    <div class="inline-flex items-center rounded-full ${tone.chip} px-4 py-2 text-sm font-black tracking-wide mb-4">DEEP NOTE</div>
    <div class="text-4xl md:text-5xl font-black ${tone.text} leading-tight mb-4">${lesson.title}</div>
    <div class="text-xl leading-relaxed text-slate-700">${lesson.thesis}</div>
  </div>
  <div class="p-6 md:p-8">
    <div class="rounded-3xl border ${tone.soft} p-5 mb-8">
      <div class="text-sm font-black uppercase tracking-widest opacity-70 mb-2">Concept แบบจำง่าย</div>
      <div class="text-2xl font-black leading-snug">${lesson.note}</div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="text-3xl font-black text-slate-900 mb-4">เช็กลิสต์หลักการใช้</div>
        <div class="space-y-3">
          ${lesson.checklist.map((item) => `<div class="flex gap-3 text-lg leading-relaxed text-slate-700"><span class="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${tone.chip} text-sm font-black">✓</span><span>${item}</span></div>`).join('')}
        </div>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div class="text-3xl font-black text-slate-900 mb-4">จุดหลอกที่ต้องกันพลาด</div>
        <div class="space-y-3">
          ${lesson.traps.map((item) => `<div class="rounded-2xl bg-white border border-slate-200 p-4 text-lg leading-relaxed text-slate-700"><strong>ระวัง:</strong> ${item}</div>`).join('')}
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="text-3xl font-black text-slate-900 mb-4">ตัวอย่างแบบเห็นโครงสร้าง</div>
      <div class="overflow-x-auto rounded-2xl border-2 ${tone.wrap} shadow-sm">
        <table class="w-full min-w-[760px] text-left bg-white">
          <thead class="${tone.chip}">
            <tr>
              <th class="px-5 py-4 text-center">สถานการณ์</th>
              <th class="px-5 py-4 text-center">ตัวอย่าง</th>
              <th class="px-5 py-4 text-center">วิธีคิด</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            ${lesson.examples.map(([situation, example, thinking]) => `<tr class="even:bg-slate-50"><td class="px-5 py-4 text-lg font-bold ${tone.text}">${situation}</td><td class="px-5 py-4 text-lg text-slate-800">${example}</td><td class="px-5 py-4 text-lg text-slate-700">${thinking}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="rounded-3xl border-2 border-dashed ${tone.wrap} bg-white p-5 md:p-6">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
        <div>
          <div class="text-sm font-black ${tone.text} tracking-widest uppercase">Practice in Lesson</div>
          <div class="text-3xl font-black text-slate-900">แบบฝึกหัดตัวอย่างพร้อมเฉลย</div>
        </div>
        <div class="rounded-full ${tone.soft} border px-4 py-2 text-sm font-bold">ทำเองก่อนกดดูเฉลย</div>
      </div>
      <div class="space-y-3">
        ${lesson.exercises.map((ex, index) => `<details class="group rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <summary class="cursor-pointer list-none text-lg font-bold text-slate-900 flex items-start gap-3"><span class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${tone.chip} text-sm">${index + 1}</span><span>${ex.q}</span></summary>
          <div class="mt-4 ml-11 rounded-2xl bg-white border border-slate-200 p-4 text-lg leading-relaxed text-slate-700">
            <div><strong>เฉลย:</strong> ${ex.a}</div>
            <div class="mt-2"><strong>เหตุผล:</strong> ${ex.why}</div>
          </div>
        </details>`).join('')}
      </div>
    </div>
  </div>
</div>
`);
};

const A2_GRAMMAR_EXTENSIONS: Record<string, GrammarExtension> = {
  a2_g01_parts_of_speech: {
    tone: 'blue',
    title: 'จับหน้าที่คำให้ได้ก่อน แล้ว Grammar จะง่ายขึ้นมาก',
    thesis: 'บทนี้ต้องฝึกมองประโยคเป็นตำแหน่ง ไม่ใช่มองเป็นคำเดี่ยว เพราะคำเดียวกันอาจเปลี่ยนหน้าที่ได้ตามตำแหน่งที่วางอยู่',
    note: 'ถามตัวเอง 4 คำถาม: ใครทำ? ทำอะไร? ขยายใคร? เชื่อมอะไร? ถ้าตอบได้จะรู้ชนิดคำเกือบทันที',
    checklist: [
      'Noun มักอยู่หลัง article, possessive adjective, quantifier หรือเป็น subject/object ของประโยค',
      'Verb แท้คือหัวใจของ clause หนึ่ง clause ต้องมี finite verb อย่างน้อยหนึ่งตัว',
      'Adjective ขยายนามและมักอยู่หน้า noun หรือหลัง linking verb เช่น be, seem, become, look',
      'Adverb ขยาย verb, adjective, adverb หรือทั้งประโยค และมักตอบคำถาม how, when, where, how often',
      'Preposition ต้องมี object ตามหลัง ส่วน conjunction เชื่อมคำ วลี หรือ clause'
    ],
    examples: [
      ['คำเดียวหลายหน้าที่', 'The students work hard. / The work is hard.', 'work ประโยคแรกเป็น verb แต่ประโยคหลังเป็น noun'],
      ['ตำแหน่งหลัง article', 'She gave me an interesting answer.', 'an บอกว่าต้องมี noun ข้างหลัง ส่วน interesting เป็น adjective ขยาย answer'],
      ['ขยายทั้งประโยค', 'Fortunately, the class finished early.', 'Fortunately เป็น adverb ที่ให้ความเห็นต่อทั้งประโยค']
    ],
    traps: [
      'อย่าคิดว่าคำลงท้าย -ly เป็น adverb เสมอ เพราะ friendly, lovely, lonely เป็น adjective',
      'อย่าเลือกคำจากคำแปลอย่างเดียว ต้องดูตำแหน่ง เช่น fast เป็นได้ทั้ง adjective และ adverb',
      'ถ้าประโยคยาว ให้หา subject และ finite verb ก่อน ส่วนที่เหลือมักเป็นคำขยาย'
    ],
    exercises: [
      { q: 'The students answered the question <u>quickly</u>. คำที่ขีดเส้นใต้เป็นคำชนิดใด?', a: 'Adverb', why: 'quickly ขยายกริยา answered และตอบคำถามว่า answered อย่างไร' },
      { q: 'She is a <u>careful</u> teacher. คำที่ขีดเส้นใต้เป็นคำชนิดใด?', a: 'Adjective', why: 'careful ขยายคำนาม teacher' },
      { q: 'The word <u>before</u> ในประโยค “Read the instruction before you answer.” ทำหน้าที่ใด?', a: 'Conjunction', why: 'before เชื่อม clause สองส่วนคือ read... และ you answer' },
      { q: 'เลือกคำเติมช่องว่าง: The lesson was very _____. (interest / interesting / interestingly)', a: 'interesting', why: 'หลัง linking verb was ต้องการ adjective เพื่อบอกลักษณะของ lesson' },
      { q: 'เลือกคำเติมช่องว่าง: The teacher explained the rule _____. (clear / clearly / clarity)', a: 'clearly', why: 'ช่องว่างขยายกริยา explained จึงต้องใช้ adverb' },
      { q: 'คำว่า “school” ใน “The school announced the result.” ทำหน้าที่อะไร?', a: 'Noun เป็นประธาน', why: 'school อยู่หน้ากริยา announced และเป็นผู้ทำกริยาในประโยค' }
    ]
  },
  a2_g02_noun: {
    tone: 'cyan',
    title: 'Noun ต้องรู้ 3 เรื่อง: นับได้ไหม เป็นเอกพจน์ไหม และเป็นเจ้าของของใคร',
    thesis: 'ถ้าแยก noun ไม่แม่น จะพลาด article, quantifier, pronoun และ subject-verb agreement ต่อเนื่องกันทั้งชุด',
    note: 'จำเป็นภาพ: Countable = ใส่ตัวเลขได้, Uncountable = ต้องใช้หน่วยวัดหรือปริมาณ, Possessive = บอกเจ้าของด้วย apostrophe หรือ of',
    checklist: [
      'นามนับได้เอกพจน์ต้องมีตัวช่วย เช่น a, an, the, my, this หรือ one',
      'นามนับไม่ได้ไม่เติม s และไม่ใช้ a/an โดยตรง เช่น advice, information, furniture',
      'พหูพจน์ทั่วไปเติม s/es แต่มี irregular plural ที่ต้องจำ เช่น men, women, feet, teeth',
      'Collective noun เช่น class, team, family อาจใช้เอกพจน์เมื่อมองเป็นหนึ่งหน่วย',
      'ความเป็นเจ้าของใช้ apostrophe กับคน/สัตว์ และใช้ of กับสิ่งไม่มีชีวิตหรือวลียาว'
    ],
    examples: [
      ['นับไม่ได้', 'She gave me useful advice.', 'advice เป็น uncountable จึงไม่ใช้ advices และไม่ใช้ an advice'],
      ['พหูพจน์ผิดรูป', 'The children are playing in the yard.', 'child เปลี่ยนเป็น children ไม่ใช่ childs'],
      ['แสดงเจ้าของ', 'The students’ projects are creative.', 'students เป็นพหูพจน์ลงท้าย s จึงเติม apostrophe หลัง s']
    ],
    traps: [
      'คำว่า news ลงท้าย s แต่ใช้เป็นเอกพจน์ เช่น The news is surprising',
      'equipment, luggage, homework, research มักเป็น uncountable ในข้อสอบ',
      'คำบางคำเปลี่ยนความหมายเมื่อเป็นนับได้/นับไม่ได้ เช่น paper = กระดาษ หรือบทความ/ข้อสอบ'
    ],
    exercises: [
      { q: 'เลือกคำถูกต้อง: I need some _____. (information / informations)', a: 'information', why: 'information เป็นนามนับไม่ได้ ไม่เติม s' },
      { q: 'เลือกคำถูกต้อง: There are five _____ in the room. (child / children)', a: 'children', why: 'five ต้องตามด้วยคำนามพหูพจน์ และ child มีรูปพิเศษคือ children' },
      { q: 'เติมรูปเจ้าของ: the bag of the teacher = the _____ bag', a: 'teacher’s', why: 'เจ้าของเป็นเอกพจน์มีชีวิต ใช้ ’s' },
      { q: 'เลือก verb: The news _____ important. (is / are)', a: 'is', why: 'news เป็นเอกพจน์แม้ลงท้าย s' },
      { q: 'เลือก quantifier: There is _____ furniture in this room. (many / much)', a: 'much', why: 'furniture เป็น uncountable จึงใช้ much' },
      { q: 'เลือกคำถูกต้อง: I bought two _____. (dictionary / dictionaries)', a: 'dictionaries', why: 'พยัญชนะ + y เปลี่ยน y เป็น ies เมื่อเป็นพหูพจน์' }
    ]
  },
  a2_g03_article: {
    tone: 'violet',
    title: 'Article คือป้ายกำกับความเฉพาะเจาะจงของคำนาม',
    thesis: 'บทนี้สำคัญมากเพราะข้อสอบมักหลอกด้วย a/an จากเสียง ไม่ใช่ตัวอักษร และ the จากการกล่าวซ้ำหรือความเฉพาะเจาะจง',
    note: 'a/an = หนึ่งสิ่งที่ยังไม่ชี้เฉพาะ, the = สิ่งที่รู้กันแล้ว, ไม่ใส่ article = พูดทั่วไปหรือเป็นชื่อเฉพาะบางประเภท',
    checklist: [
      'ใช้ a/an กับนามนับได้เอกพจน์ที่ยังไม่ชี้เฉพาะเท่านั้น',
      'เลือก a หรือ an จากเสียงแรก เช่น an hour แต่ a university',
      'ใช้ the เมื่อกล่าวซ้ำ สิ่งเดียวในโลก สิ่งที่ผู้พูดผู้ฟังรู้กัน หรือขั้นสูงสุด',
      'ไม่ใช้ article กับนามพหูพจน์ทั่วไปและนามนับไม่ได้ทั่วไป',
      'สถานที่บางคำไม่ใช้ the เมื่อไปตามหน้าที่ เช่น go to school, go to bed'
    ],
    examples: [
      ['กล่าวครั้งแรกและกล่าวซ้ำ', 'I saw a dog. The dog was sleeping.', 'ครั้งแรกยังไม่ชี้เฉพาะใช้ a ครั้งต่อไปรู้แล้วใช้ the'],
      ['เสียงสำคัญกว่าตัวอักษร', 'an honest man / a useful book', 'honest ขึ้นต้นเสียงสระ ส่วน useful ขึ้นต้นเสียง y'],
      ['ขั้นสูงสุด', 'She is the most diligent student in class.', 'superlative ต้องมี the']
    ],
    traps: [
      'university ใช้ a เพราะออกเสียงขึ้นต้นเหมือน y',
      'hour ใช้ an เพราะ h ไม่ออกเสียงและขึ้นต้นด้วยเสียงสระ',
      'อย่าใส่ the กับชื่อวิชา ภาษา หรือกีฬาเมื่อพูดทั่วไป เช่น English is useful'
    ],
    exercises: [
      { q: 'เติม article: She is _____ honest teacher.', a: 'an', why: 'honest ออกเสียงขึ้นต้นด้วยเสียงสระ' },
      { q: 'เติม article: I bought _____ book. _____ book is about education.', a: 'a / The', why: 'ครั้งแรกใช้ a ครั้งที่สองกล่าวซ้ำใช้ the' },
      { q: 'เติม article: He studies _____ English every day.', a: 'ไม่ต้องใส่ article', why: 'ชื่อภาษาเมื่อพูดทั่วไปไม่ใช้ article' },
      { q: 'เติม article: This is _____ university near my house.', a: 'a', why: 'university ออกเสียงขึ้นต้นด้วยเสียงพยัญชนะ y' },
      { q: 'เติม article: _____ sun rises in the east.', a: 'The', why: 'sun เป็นสิ่งที่มีหนึ่งเดียวในบริบทโลก' },
      { q: 'เลือกถูก: She goes to _____ school by bus. (school / the school)', a: 'school', why: 'ไปโรงเรียนตามหน้าที่ปกติ ไม่ใช้ the' }
    ]
  },
  a2_g04_quantifier: {
    tone: 'emerald',
    title: 'Quantifier ต้องผูกกับชนิด noun เสมอ',
    thesis: 'บทนี้ไม่ควรท่องแยกคำ แต่ต้องจัดคำบอกปริมาณเป็น 3 ตู้: ใช้กับนับได้ ใช้กับนับไม่ได้ และใช้ได้ทั้งคู่',
    note: 'many-few-several ไปกับ plural countable, much-little ไปกับ uncountable, some-any-a lot of ใช้กว้างแต่ความหมายต่างกัน',
    checklist: [
      'many ใช้กับนามนับได้พหูพจน์ ส่วน much ใช้กับนามนับไม่ได้',
      'a few และ a little แปลว่ามีบ้างพอใช้ แต่ few และ little แปลว่าแทบไม่มี',
      'some ใช้บอกเล่า หรือคำถามเชิญ/เสนอ ส่วน any ใช้คำถามทั่วไป ปฏิเสธ หรือแปลว่าอะไรก็ได้',
      'a number of ตามด้วยนามพหูพจน์และใช้ verb พหูพจน์',
      'the number of ตามด้วยนามพหูพจน์แต่ใช้ verb เอกพจน์'
    ],
    examples: [
      ['นับได้', 'Many applicants joined the exam.', 'applicants เป็นนามนับได้พหูพจน์'],
      ['นับไม่ได้', 'There is little time left.', 'time เป็นนามนับไม่ได้ในความหมายเวลา'],
      ['ความหมายต่างกัน', 'A few students passed. / Few students passed.', 'a few เป็นบวกว่ามีบางคน แต่ few เน้นว่าน้อยจนน่ากังวล']
    ],
    traps: [
      'อย่าใช้ many กับ information/advice/equipment',
      'no + noun แต่ none ใช้แทน noun เช่น No students came. None came.',
      'each/every ตามด้วย singular noun และใช้ singular verb'
    ],
    exercises: [
      { q: 'เลือกคำ: We do not have _____ time. (many / much)', a: 'much', why: 'time ในที่นี้เป็น uncountable' },
      { q: 'เลือกคำ: _____ students were absent today. (A few / A little)', a: 'A few', why: 'students เป็นนามนับได้พหูพจน์' },
      { q: 'เลือกคำ: Would you like _____ coffee? (some / any)', a: 'some', why: 'คำถามเสนอสิ่งของ ใช้ some ได้' },
      { q: 'เลือก verb: A number of teachers _____ in the meeting. (is / are)', a: 'are', why: 'a number of + plural noun ใช้ verb พหูพจน์' },
      { q: 'เลือก verb: The number of applicants _____ increasing. (is / are)', a: 'is', why: 'the number of หมายถึงจำนวน จึงเป็นเอกพจน์' },
      { q: 'เลือกคำ: There is _____ hope, so we should try again. (a little / few)', a: 'a little', why: 'hope เป็นนามนับไม่ได้และ a little ให้ความหมายเชิงบวกว่ามีอยู่บ้าง' }
    ]
  },
  a2_g05_pronoun: {
    tone: 'violet',
    title: 'Pronoun ต้องแทน noun ให้ถูกหน้าที่และถูกคน',
    thesis: 'คำสรรพนามไม่ใช่แค่ I/me/my/mine แต่ต้องรู้ว่าอยู่ตำแหน่งประธาน กรรม เจ้าของ หรือสะท้อนกลับ',
    note: 'ถ้ามี noun ตามหลังใช้ possessive adjective เช่น my book ถ้าไม่มี noun ตามหลังใช้ possessive pronoun เช่น mine',
    checklist: [
      'Subject pronoun อยู่หน้ากริยา เช่น I, he, they',
      'Object pronoun อยู่หลัง verb หรือ preposition เช่น me, him, them',
      'Possessive adjective ต้องมี noun ตามหลัง เช่น her bag',
      'Possessive pronoun ใช้เดี่ยวได้ เช่น The bag is hers',
      'Relative pronoun ต้องเลือกตาม noun ที่ถูกขยายและหน้าที่ใน clause'
    ],
    examples: [
      ['Subject vs Object', 'She called him after class.', 'She เป็น subject ส่วน him เป็น object'],
      ['เจ้าของแบบมี noun', 'This is my notebook.', 'my ต้องมี notebook ตามหลัง'],
      ['Relative clause', 'The student who won the prize is in my class.', 'who แทน student และเป็นประธานของ clause']
    ],
    traps: [
      'its ไม่มี apostrophe เมื่อแสดงความเป็นเจ้าของ ส่วน it’s = it is หรือ it has',
      'who เป็นประธานใน clause แต่ whom เป็นกรรม',
      'everyone ดูเหมือนหลายคน แต่ grammar พื้นฐานถือเป็นเอกพจน์'
    ],
    exercises: [
      { q: 'เลือกคำ: The principal asked _____ to join the meeting. (we / us)', a: 'us', why: 'อยู่หลัง asked เป็นกรรม จึงใช้ object pronoun' },
      { q: 'เลือกคำ: This pen is _____. (my / mine)', a: 'mine', why: 'ไม่มี noun ตามหลัง ต้องใช้ possessive pronoun' },
      { q: 'เลือกคำ: _____ book is on the desk. (Her / Hers)', a: 'Her', why: 'มี noun book ตามหลัง ต้องใช้ possessive adjective' },
      { q: 'เลือกคำ: The teacher _____ helped me is kind. (who / whom)', a: 'who', why: 'who เป็นประธานของกริยา helped ใน relative clause' },
      { q: 'เลือกคำ: The students did the project by _____. (themselves / them)', a: 'themselves', why: 'by themselves แปลว่าด้วยตนเอง ใช้ reflexive pronoun' },
      { q: 'เลือกคำ: The school changed _____ policy. (it’s / its)', a: 'its', why: 'ต้องการแสดงความเป็นเจ้าของของ school ใช้ its' }
    ]
  },
  a2_g06_sva: {
    tone: 'rose',
    title: 'Subject-Verb Agreement คือการมองหา “หัวประธานจริง”',
    thesis: 'ข้อสอบ SVA มักแทรกวลี of, with, along with, who, that เพื่อให้เราหลงไปดู noun ใกล้กริยาแทนประธานจริง',
    note: 'ตัดคำขยายออกก่อน แล้วให้ verb ตามหัวประธาน ไม่ตามคำที่อยู่ใกล้ที่สุด',
    checklist: [
      'เอกพจน์บุรุษที่สามใน Present Simple กริยาเติม s/es',
      'ประธานเชื่อมด้วย and โดยทั่วไปใช้ verb พหูพจน์',
      'with, together with, as well as ไม่ทำให้ประธานกลายเป็นพหูพจน์',
      'either...or และ neither...nor ให้ verb ตามประธานที่อยู่ใกล้',
      'every, each, everyone, somebody, no one ใช้ verb เอกพจน์'
    ],
    examples: [
      ['วลี of หลอกตา', 'The quality of the lessons is high.', 'subject จริงคือ quality ไม่ใช่ lessons'],
      ['with ไม่เปลี่ยนจำนวน', 'The teacher with her students is here.', 'subject คือ teacher จึงใช้ is'],
      ['or/nor ดูตัวใกล้', 'Neither the principal nor the teachers are absent.', 'teachers อยู่ใกล้ verb จึงใช้ are']
    ],
    traps: [
      'The number of ใช้เอกพจน์ แต่ A number of ใช้พหูพจน์',
      'each of/every one of ตามด้วย plural noun ได้ แต่ verb ยังเป็นเอกพจน์',
      'news, physics, mathematics แม้ลงท้าย s แต่ใช้เอกพจน์เมื่อหมายถึงวิชา/เรื่อง'
    ],
    exercises: [
      { q: 'เลือก verb: The list of names _____ on the desk. (is / are)', a: 'is', why: 'subject จริงคือ list เป็นเอกพจน์' },
      { q: 'เลือก verb: Each of the students _____ a textbook. (has / have)', a: 'has', why: 'Each เป็นเอกพจน์' },
      { q: 'เลือก verb: The teacher as well as the students _____ ready. (is / are)', a: 'is', why: 'as well as ไม่เปลี่ยน subject หลักคือ teacher' },
      { q: 'เลือก verb: Either the students or the principal _____ responsible. (is / are)', a: 'is', why: 'principal อยู่ใกล้ verb และเป็นเอกพจน์' },
      { q: 'เลือก verb: Mathematics _____ difficult for many learners. (is / are)', a: 'is', why: 'Mathematics เป็นชื่อวิชา ใช้เอกพจน์' },
      { q: 'เลือก verb: A number of applicants _____ waiting outside. (is / are)', a: 'are', why: 'a number of + plural noun ใช้ verb พหูพจน์' }
    ]
  },
  a2_g07_present_tenses: {
    tone: 'cyan',
    title: 'Present Tenses ต้องจำทั้งเวลาและลักษณะของเหตุการณ์',
    thesis: 'Present ไม่ได้แปลว่าเกิดตอนนี้เท่านั้น แต่รวมกิจวัตร ความจริง ประสบการณ์ และการกระทำที่ต่อเนื่องถึงปัจจุบัน',
    note: 'Simple = ประจำ/จริง, Continuous = กำลังเกิด, Perfect = เกิดแล้วเกี่ยวกับตอนนี้, Perfect Continuous = ทำต่อเนื่องมาถึงตอนนี้',
    checklist: [
      'Present Simple ใช้กับกิจวัตร ความจริง และตารางเวลา',
      'Present Continuous ใช้กับตอนนี้ ช่วงนี้ หรือแผนใกล้ ๆ',
      'Present Perfect ใช้กับประสบการณ์ ผลลัพธ์ถึงปัจจุบัน และ since/for',
      'Present Perfect Continuous เน้นความต่อเนื่องหรือระยะเวลาของการกระทำ',
      'Stative verbs เช่น know, believe, like, want โดยทั่วไปไม่ใช้ continuous'
    ],
    examples: [
      ['กิจวัตร', 'She teaches English every Monday.', 'every Monday บอกความสม่ำเสมอ'],
      ['กำลังเกิด', 'The students are taking notes now.', 'now บอกเหตุการณ์กำลังเกิด'],
      ['โยงถึงปัจจุบัน', 'I have studied grammar for two hours.', 'for two hours บอกระยะเวลาถึงตอนนี้']
    ],
    traps: [
      'อย่าใช้ is knowing, is wanting ในข้อสอบพื้นฐาน เพราะ know/want เป็น stative verbs',
      'since ตามด้วยจุดเวลา ส่วน for ตามด้วยระยะเวลา',
      'Present Simple ใช้อนาคตได้เมื่อเป็นตารางเวลา เช่น The train leaves tomorrow'
    ],
    exercises: [
      { q: 'เลือกคำ: She _____ English every day. (studies / is studying)', a: 'studies', why: 'every day เป็นกิจวัตร ใช้ Present Simple' },
      { q: 'เลือกคำ: Look! The students _____ outside. (play / are playing)', a: 'are playing', why: 'Look บอกเหตุการณ์กำลังเกิด' },
      { q: 'เลือกคำ: I _____ this book since Monday. (have read / have been reading)', a: 'have been reading', why: 'เน้นการอ่านต่อเนื่องตั้งแต่ Monday ถึงปัจจุบัน' },
      { q: 'เลือกคำ: She _____ the answer. (knows / is knowing)', a: 'knows', why: 'know เป็น stative verb ไม่ใช้ continuous ทั่วไป' },
      { q: 'เลือกคำ: They _____ already _____ the form. (have/submitted / are/submitting)', a: 'have submitted', why: 'already เป็นคำใบ้ Present Perfect' },
      { q: 'เลือกคำ: The class _____ at 9 a.m. tomorrow. (starts / is starting)', a: 'starts', why: 'ตารางเวลาใช้ Present Simple ได้แม้พูดถึงอนาคต' }
    ]
  },
  a2_g08_past_tenses: {
    tone: 'amber',
    title: 'Past Tenses ใช้จัดลำดับเหตุการณ์ในอดีต',
    thesis: 'ถ้าโจทย์มีเหตุการณ์ในอดีตมากกว่าหนึ่งเหตุการณ์ ต้องถามว่าเหตุการณ์ไหนเป็นฉากหลัง เหตุการณ์ไหนแทรก และเหตุการณ์ไหนเกิดก่อน',
    note: 'Past Simple = จบแล้ว, Past Continuous = กำลังเกิดในอดีต, Past Perfect = เกิดก่อนอดีตอีกเหตุการณ์, Past Perfect Continuous = ต่อเนื่องมาก่อนอดีต',
    checklist: [
      'Past Simple ใช้กับเหตุการณ์จบแล้วและมักมี yesterday, last..., ago',
      'Past Continuous ใช้กับเหตุการณ์ที่กำลังดำเนินอยู่ในอดีต',
      'Past Perfect ใช้กับเหตุการณ์ที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต',
      'Past Perfect Continuous ใช้เมื่อเน้นความต่อเนื่องก่อนอดีตอีกเหตุการณ์',
      'used to + V1 ใช้กับนิสัยหรือสภาพในอดีตที่ปัจจุบันไม่เป็นแล้ว'
    ],
    examples: [
      ['อดีตจบแล้ว', 'They visited the museum last week.', 'last week บอกอดีตที่จบแล้ว'],
      ['ฉากหลังและเหตุการณ์แทรก', 'I was reading when the phone rang.', 'was reading เป็นฉากหลัง phone rang แทรกเข้ามา'],
      ['อดีตก่อนอดีต', 'The meeting had started before I arrived.', 'meeting started ก่อน I arrived']
    ],
    traps: [
      'did แล้วกริยาหลักต้องกลับเป็น V1 เช่น did not go ไม่ใช่ did not went',
      'after มักตามด้วยเหตุการณ์ที่เกิดก่อน ส่วน before มักตามด้วยเหตุการณ์ที่เกิดหลังเมื่อเทียบกับอีกประโยค',
      'used to ต้องตามด้วย V1 และต่างจาก be used to ที่ตามด้วย noun หรือ V-ing'
    ],
    exercises: [
      { q: 'เลือกคำ: She _____ to school yesterday. (go / went)', a: 'went', why: 'yesterday เป็น Past Simple ใช้ V2' },
      { q: 'เลือกคำ: I _____ TV when my mother called. (watched / was watching)', a: 'was watching', why: 'เป็นเหตุการณ์กำลังดำเนินอยู่เมื่ออีกเหตุการณ์แทรก' },
      { q: 'เลือกคำ: By the time we arrived, the class _____. (started / had started)', a: 'had started', why: 'class started เกิดก่อน we arrived ในอดีต' },
      { q: 'เลือกคำ: He did not _____ the answer. (knew / know)', a: 'know', why: 'หลัง did not ใช้ V1' },
      { q: 'เลือกคำ: She used to _____ in Bangkok. (live / living)', a: 'live', why: 'used to + V1' },
      { q: 'เลือกคำ: They _____ for two hours before the teacher came. (had studied / had been studying)', a: 'had been studying', why: 'เน้นการกระทำต่อเนื่องมาก่อนเหตุการณ์ teacher came' }
    ]
  },
  a2_g09_future_tenses: {
    tone: 'blue',
    title: 'Future Tenses ต้องแยกระหว่างแผน การคาดการณ์ และสิ่งที่จะเสร็จ',
    thesis: 'ข้อสอบอนาคตชอบให้ will, going to, present continuous และ future perfect มาแข่งกัน ต้องดูเจตนาและหลักฐาน',
    note: 'will = ตัดสินใจทันที/คาดการณ์, going to = วางแผนหรือมีหลักฐาน, will have V3 = จะเสร็จก่อนเวลาในอนาคต',
    checklist: [
      'ใช้ will กับคำสัญญา การเสนอช่วย หรือการตัดสินใจทันที',
      'ใช้ be going to กับแผนที่ตั้งใจไว้แล้วหรือสิ่งที่มีหลักฐานว่าจะเกิด',
      'ใช้ Present Continuous กับนัดหมายหรือแผนแน่นอนในอนาคต',
      'ใช้ Future Continuous กับเหตุการณ์ที่จะกำลังเกิด ณ เวลาอนาคต',
      'ใช้ Future Perfect กับเหตุการณ์ที่จะเสร็จก่อนเวลาใดเวลาหนึ่งในอนาคต'
    ],
    examples: [
      ['ตัดสินใจทันที', 'I will answer the phone.', 'พูดเมื่อตัดสินใจตอนนั้น'],
      ['มีหลักฐาน', 'Look at the clouds. It is going to rain.', 'มีหลักฐานจากเมฆ'],
      ['จะเสร็จก่อนอนาคต', 'By Friday, I will have finished the report.', 'เสร็จก่อน Friday']
    ],
    traps: [
      'will ไม่ต้องเติม s ตามประธาน เช่น She will go ไม่ใช่ She wills go',
      'หลัง be going to ใช้ V1 เช่น is going to study',
      'by + เวลาอนาคต มักชี้ไปที่ Future Perfect'
    ],
    exercises: [
      { q: 'เลือกคำ: I promise I _____ help you. (will / am going to)', a: 'will', why: 'promise มักใช้ will' },
      { q: 'เลือกคำ: Look! The glass is falling. It _____ break. (will / is going to)', a: 'is going to', why: 'มีหลักฐานชัดว่ากำลังจะเกิด' },
      { q: 'เลือกคำ: We _____ the director tomorrow. (meet / are meeting)', a: 'are meeting', why: 'เป็นนัดหมายแน่นอนในอนาคต ใช้ Present Continuous ได้' },
      { q: 'เลือกคำ: This time tomorrow, I _____ on the train. (will travel / will be traveling)', a: 'will be traveling', why: 'ระบุช่วงเวลาในอนาคตที่เหตุการณ์กำลังดำเนินอยู่' },
      { q: 'เลือกคำ: By next month, she _____ the course. (will finish / will have finished)', a: 'will have finished', why: 'by next month บอกว่าจะเสร็จก่อนเวลานั้น' },
      { q: 'เลือกคำ: The bus _____ at 6 p.m. (leaves / will leaves)', a: 'leaves', why: 'ตารางเวลาใช้ Present Simple และ will ไม่เติม s' }
    ]
  },
  a2_g10_passive_voice: {
    tone: 'slate',
    title: 'Passive Voice ให้ดูว่าประธานถูกกระทำหรือไม่',
    thesis: 'Passive ไม่ได้แปลว่าประโยคมี by เสมอ แต่ต้องมี be + V3 เสมอ และ be ต้องผันตาม tense',
    note: 'กรรมเดิมขึ้นหน้า -> เลือก be ให้ตรง tense -> เปลี่ยนกริยาเป็น V3 -> ใส่ by เมื่อผู้กระทำสำคัญ',
    checklist: [
      'Passive ใช้กับ transitive verb หรือกริยาที่มีกรรมตรง',
      'โครงสร้างหลักคือ S + be + V3',
      'Tense อยู่ที่ be เช่น is done, was done, will be done, has been done',
      'ผู้กระทำทั่วไปเช่น someone, people, they มักละ by ได้',
      'Modal passive ใช้ modal + be + V3 เช่น must be submitted'
    ],
    examples: [
      ['Present Passive', 'The classroom is cleaned every day.', 'is cleaned = be + V3 ใน Present Simple'],
      ['Past Passive', 'The report was checked yesterday.', 'was checked = be อดีต + V3'],
      ['Modal Passive', 'The form must be signed by the applicant.', 'หลัง modal ใช้ be + V3']
    ],
    traps: [
      'happen, occur, arrive, die เป็น intransitive verb จึงไม่ใช้ passive ปกติ',
      'อย่าลืม be เช่น The work finished by noon ไม่ใช่ passive แต่ The work was finished ถูก',
      'ถ้า active มีกรรมสองตัว อาจทำ passive ได้สองแบบ เช่น A prize was given to her / She was given a prize'
    ],
    exercises: [
      { q: 'เปลี่ยนเป็น passive: People speak English here.', a: 'English is spoken here.', why: 'English เป็นกรรมเดิมขึ้นเป็นประธาน และใช้ is + spoken' },
      { q: 'เลือกคำ: The room _____ every morning. (cleans / is cleaned)', a: 'is cleaned', why: 'room ถูกทำความสะอาด จึงใช้ passive' },
      { q: 'เลือกคำ: The documents must _____ today. (submit / be submitted)', a: 'be submitted', why: 'modal passive = must be + V3' },
      { q: 'เลือกคำ: The accident _____ yesterday. (happened / was happened)', a: 'happened', why: 'happen เป็น intransitive verb ไม่ใช้ passive ปกติ' },
      { q: 'เลือกคำ: The report has _____ checked. (been / being)', a: 'been', why: 'Present Perfect Passive = has/have been + V3' },
      { q: 'เปลี่ยนเป็น passive: The teacher gave students homework.', a: 'Students were given homework. หรือ Homework was given to students.', why: 'give มีกรรมสองตัว จึงทำ passive ได้สองแนว' }
    ]
  },
  a2_g11_conditional: {
    tone: 'emerald',
    title: 'Conditional คือการจับคู่เวลาและความเป็นไปได้',
    thesis: 'ประโยค if ไม่ได้เลือก tense ตามคำแปลไทย แต่เลือกตามชนิดของเงื่อนไขว่าเป็นจริงทั่วไป เป็นไปได้ สมมติ หรือย้อนอดีต',
    note: '0 = จริงเสมอ, 1 = อนาคตมีโอกาส, 2 = สมมติปัจจุบัน, 3 = เสียดายอดีต',
    checklist: [
      'Zero Conditional ใช้ Present + Present กับความจริงทั่วไป',
      'First Conditional ใช้ If + Present, will + V1 กับอนาคตที่เป็นไปได้',
      'Second Conditional ใช้ If + Past, would + V1 กับสมมติปัจจุบันหรืออนาคต',
      'Third Conditional ใช้ If + Past Perfect, would have + V3 กับอดีตที่แก้ไม่ได้',
      'unless มีความหมายว่า if not อย่าใส่ not ซ้ำโดยไม่จำเป็น'
    ],
    examples: [
      ['Type 0', 'If students practice, they improve.', 'เป็นความจริงทั่วไป'],
      ['Type 1', 'If she studies tonight, she will pass.', 'อนาคตยังมีโอกาสเกิด'],
      ['Type 3', 'If he had read the question, he would have answered correctly.', 'เสียดายอดีตที่ไม่ได้ทำ']
    ],
    traps: [
      'ใน First Conditional ส่วน if ไม่ใช้ will เช่น If it rains, I will stay home',
      'If I were you เป็นรูปมาตรฐานในการให้คำแนะนำแบบสมมติ',
      'ประโยค if อยู่หลัง main clause ได้ และไม่ต้องมี comma'
    ],
    exercises: [
      { q: 'เลือกคำ: If it _____ tomorrow, we will stay home. (rains / will rain)', a: 'rains', why: 'First Conditional ส่วน if ใช้ Present Simple' },
      { q: 'เลือกคำ: If I _____ you, I would apologize. (am / were)', a: 'were', why: 'Second Conditional ใช้ were กับ I ในรูปสมมติ' },
      { q: 'เลือกคำ: If she had studied, she _____ passed. (would / would have)', a: 'would have', why: 'Third Conditional = would have + V3' },
      { q: 'แปลโครงสร้าง: Unless you hurry, you will miss the bus.', a: 'ถ้าคุณไม่รีบ คุณจะพลาดรถ', why: 'unless = if not' },
      { q: 'เลือกคำ: If water reaches 100 degrees, it _____. (boils / will boil)', a: 'boils', why: 'ความจริงทั่วไปใช้ Zero Conditional' },
      { q: 'เลือกคำ: If I had more time, I _____ more books. (read / would read)', a: 'would read', why: 'Second Conditional ใช้ would + V1 ใน main clause' }
    ]
  },
  a2_g12_non_finite: {
    tone: 'rose',
    title: 'Non-finite Verb คือกริยาที่ไปทำงานอื่นในประโยค',
    thesis: 'ถ้าเจอ V-ing, to V1 หรือ V3 อย่าเพิ่งคิดว่าเป็นกริยาแท้ ให้ดูว่ามันทำหน้าที่เป็น noun, adjective หรือ adverb หรือไม่',
    note: 'to V1 มักชี้เป้าหมาย, V-ing มักเป็นกิจกรรม, V3 มักบอกสิ่งที่ถูกกระทำ',
    checklist: [
      'Infinitive มีทั้ง to + V1 และ bare infinitive',
      'Gerund คือ V-ing ที่ทำหน้าที่เหมือน noun',
      'Participle คือ V-ing หรือ V3 ที่ทำหน้าที่เหมือน adjective',
      'หลัง preposition ถ้าต้องใช้ verb ให้ใช้ V-ing',
      'กริยาบางคำตามด้วย gerund บางคำตามด้วย infinitive และบางคำใช้ได้ทั้งคู่แต่ความหมายเปลี่ยน'
    ],
    examples: [
      ['Gerund เป็นประธาน', 'Reading every day improves vocabulary.', 'Reading ทำหน้าที่เป็น noun ที่เป็นประธาน'],
      ['Infinitive แสดงจุดประสงค์', 'She studies hard to pass the exam.', 'to pass บอกเป้าหมายของการเรียน'],
      ['Participle ขยายนาม', 'The broken window was repaired.', 'broken เป็น V3 ขยายนาม window ที่ถูกทำ']
    ],
    traps: [
      'หลัง enjoy, avoid, finish, mind ใช้ V-ing ไม่ใช้ to V1',
      'หลัง decide, hope, plan, want ใช้ to V1',
      'stop to rest = หยุดเพื่อพัก แต่ stop resting = หยุดพัก'
    ],
    exercises: [
      { q: 'เลือกคำ: She enjoys _____. (read / reading)', a: 'reading', why: 'enjoy ตามด้วย gerund' },
      { q: 'เลือกคำ: I decided _____ early. (leave / to leave)', a: 'to leave', why: 'decide ตามด้วย to infinitive' },
      { q: 'เลือกคำ: He is interested in _____. (teach / teaching)', a: 'teaching', why: 'หลัง preposition in ใช้ V-ing' },
      { q: 'เลือกคำ: The _____ chair was replaced. (breaking / broken)', a: 'broken', why: 'chair ถูกทำให้แตก จึงใช้ V3 เป็น adjective' },
      { q: 'เลือกคำ: I saw him _____. (leave / to leave)', a: 'leave', why: 'หลัง verb รับรู้ see + object ใช้ bare infinitive เมื่อเห็นเหตุการณ์ครบ' },
      { q: 'อธิบายความต่าง: remember to lock กับ remember locking', a: 'remember to lock = จำไว้ว่าต้องล็อก, remember locking = จำได้ว่าเคยล็อกแล้ว', why: 'to V1 มองไปข้างหน้า ส่วน V-ing มองกิจกรรมที่เกิดขึ้นแล้วหรือเป็นประสบการณ์' }
    ]
  },
  a2_g13_modal: {
    tone: 'violet',
    title: 'Modal Verb คือคำกำหนดน้ำเสียงของกริยา',
    thesis: 'Modal ทำให้ประโยคเปลี่ยนจากการบอกเหตุการณ์ธรรมดาเป็นความสามารถ ความจำเป็น ความเป็นไปได้ การขออนุญาต หรือคำแนะนำ',
    note: 'Modal + V1 ดิบเสมอ: ไม่มี s, ไม่มี ed, ไม่มี to ยกเว้นกลุ่มกึ่ง modal เช่น ought to, have to, used to',
    checklist: [
      'can/could ใช้กับความสามารถ การขอร้อง หรือความเป็นไปได้',
      'may/might ใช้กับการขออนุญาตหรือความเป็นไปได้ โดย might โอกาสน้อยกว่า',
      'must/have to ใช้กับความจำเป็น แต่ must มักมาจากผู้พูด ส่วน have to มาจากกฎหรือสถานการณ์',
      'should/ought to ใช้ให้คำแนะนำ',
      'would ใช้สุภาพกว่า will และใช้ในประโยคสมมติ'
    ],
    examples: [
      ['ความสามารถ', 'She can explain difficult grammar clearly.', 'can + V1'],
      ['ความจำเป็น', 'Applicants must bring their ID cards.', 'must บอกข้อบังคับ'],
      ['คำแนะนำ', 'You should read the choices carefully.', 'should น้ำหนักเบากว่า must']
    ],
    traps: [
      'อย่าเติม s หลัง modal เช่น He can speaks ผิด ต้องเป็น He can speak',
      'must not = ห้ามทำ แต่ do not have to = ไม่จำเป็นต้องทำ',
      'be able to ใช้แทน can ในบาง tense ได้ เช่น will be able to'
    ],
    exercises: [
      { q: 'เลือกคำ: She can _____ English well. (speaks / speak)', a: 'speak', why: 'หลัง can ใช้ V1 ไม่เติม s' },
      { q: 'เลือกคำ: You _____ smoke here. It is prohibited. (must not / do not have to)', a: 'must not', why: 'prohibited แปลว่าถูกห้าม' },
      { q: 'เลือกคำ: We _____ wear uniforms at school. (have to / might)', a: 'have to', why: 'เป็นข้อบังคับหรือกฎของสถานการณ์' },
      { q: 'เลือกคำ: _____ I borrow your pen? (May / Must)', a: 'May', why: 'May ใช้ขออนุญาตอย่างสุภาพ' },
      { q: 'เลือกคำ: You _____ review the lesson before the test. (should / can)', a: 'should', why: 'เป็นคำแนะนำ' },
      { q: 'เลือกคำ: He _____ be at home. The lights are on. (must / should)', a: 'must', why: 'must ใช้แสดงความมั่นใจจากหลักฐาน' }
    ]
  },
  a2_g14_reported_speech: {
    tone: 'amber',
    title: 'Reported Speech คือการเล่าคำพูดโดยเปลี่ยนมุมมอง',
    thesis: 'เมื่อเอาคำพูดตรงมาเล่า ต้องเปลี่ยนสรรพนาม เวลา สถานที่ และมักเลื่อน tense ถ้ากริยานำเป็นอดีต',
    note: 'said/told/asked เป็นอดีตเมื่อไร ให้เตรียม backshift: present -> past, will -> would, can -> could, this -> that',
    checklist: [
      'บอกเล่าใช้ said that หรือ told + object + that',
      'คำถาม yes/no ใช้ asked if/whether แล้วเรียงเป็นประโยคบอกเล่า',
      'คำถาม wh- ใช้ asked + wh-word + S + V',
      'คำสั่งใช้ told/asked/ordered + object + to V1',
      'คำสั่งห้ามใช้ told/asked + object + not to V1'
    ],
    examples: [
      ['บอกเล่า', 'Direct: “I am busy.” -> She said that she was busy.', 'เลื่อน am เป็น was และเปลี่ยน I เป็น she'],
      ['คำถาม', '“Do you understand?” -> He asked if I understood.', 'ใช้ if และเรียงเป็น I understood'],
      ['คำสั่ง', '“Be quiet.” -> The teacher told us to be quiet.', 'คำสั่งใช้ object + to V1']
    ],
    traps: [
      'Reported question ไม่ใช้รูปคำถาม เช่น asked where did I live ผิด ต้อง asked where I lived',
      'ถ้าข้อความเป็นความจริงทั่วไป อาจไม่ต้อง backshift',
      'say ไม่ต้องมี object ตรง ๆ แต่ tell ต้องมี object เช่น told me'
    ],
    exercises: [
      { q: 'เปลี่ยน: She said, “I am tired.”', a: 'She said that she was tired.', why: 'said เป็นอดีต จึงเลื่อน am เป็น was และ I เป็น she' },
      { q: 'เปลี่ยน: He said, “I will call you.”', a: 'He said that he would call me.', why: 'will เลื่อนเป็น would และ you เปลี่ยนตามมุมผู้เล่า' },
      { q: 'เปลี่ยน: The teacher asked, “Do you understand?”', a: 'The teacher asked if I understood.', why: 'yes/no question ใช้ if/whether และเรียงเป็นบอกเล่า' },
      { q: 'เปลี่ยน: She asked, “Where do you live?”', a: 'She asked where I lived.', why: 'wh-question ใน reported speech เรียง subject ก่อน verb' },
      { q: 'เปลี่ยน: “Please open the window,” he said.', a: 'He asked me to open the window.', why: 'คำขอร้องใช้ asked + object + to V1' },
      { q: 'เลือกคำ: He _____ me that he was busy. (said / told)', a: 'told', why: 'told ต้องมี object me และใช้กับ that-clause ได้' }
    ]
  },
  a2_g15_adjective: {
    tone: 'rose',
    title: 'Adjective คือสีและรายละเอียดของคำนาม',
    thesis: 'บทนี้ต้องรู้ทั้งประเภท ตำแหน่ง และลำดับ เพราะข้อสอบมักถามการวาง adjective หลายคำหรือเลือก -ed/-ing adjective',
    note: 'Adjective ขยายนาม: อยู่หน้า noun หรือหลัง linking verb และไม่เติม s แม้นามเป็นพหูพจน์',
    checklist: [
      'Descriptive adjective บอกลักษณะ เช่น useful, beautiful, difficult',
      'Possessive adjective ต้องมี noun ตามหลัง เช่น my plan, their school',
      'Demonstrative adjective ชี้เฉพาะ เช่น this book, those students',
      'V-ing adjective ใช้กับสิ่งที่ทำให้รู้สึก ส่วน V3 adjective ใช้กับผู้รู้สึกหรือสิ่งที่ถูกกระทำ',
      'ลำดับ adjective คือ Opinion, Size, Age, Shape, Color, Origin, Material, Purpose'
    ],
    examples: [
      ['หลัง linking verb', 'The lesson is useful.', 'useful เป็น adjective เติมเต็มหลัง is'],
      ['-ing/-ed', 'The movie was boring. I was bored.', 'movie ทำให้เบื่อจึง boring ส่วน I รู้สึกเบื่อจึง bored'],
      ['ลำดับ adjective', 'a beautiful small Thai silk scarf', 'เรียง opinion -> size -> origin -> material -> noun']
    ],
    traps: [
      'ห้ามเติม s ที่ adjective เช่น importants lessons ผิด ต้อง important lessons',
      'enough อยู่หลัง adjective แต่ก่อน noun เช่น old enough, enough time',
      'interested in ไม่ใช่ interesting in เมื่อต้องการบอกว่าคนรู้สึกสนใจ'
    ],
    exercises: [
      { q: 'เลือกคำ: The students are _____. (happily / happy)', a: 'happy', why: 'หลัง linking verb are ใช้ adjective' },
      { q: 'เลือกคำ: This is an _____ lesson. (interest / interesting)', a: 'interesting', why: 'lesson ทำให้ผู้เรียนสนใจ ใช้ V-ing adjective' },
      { q: 'เลือกคำ: I am _____ in English. (interesting / interested)', a: 'interested', why: 'คนรู้สึกสนใจ ใช้ V3 adjective' },
      { q: 'เลือกคำ: She has two _____ bags. (beautiful / beautifuls)', a: 'beautiful', why: 'adjective ไม่เติม s' },
      { q: 'เรียงคำ: wooden / old / small / table', a: 'small old wooden table', why: 'size -> age -> material -> noun' },
      { q: 'เลือกคำ: He is old _____ to drive. (enough / too)', a: 'enough', why: 'old enough to V1 แปลว่าแก่พอที่จะทำได้' }
    ]
  },
  a2_g16_adverb: {
    tone: 'cyan',
    title: 'Adverb คือเลนส์ขยายการกระทำ ระดับ เวลา และความถี่',
    thesis: 'Adverb ไม่ได้มีแค่คำลงท้าย -ly แต่รวมคำบอกเวลา สถานที่ ความถี่ ระดับ และคำที่ขยายทั้งประโยค',
    note: 'ถามว่า “ขยายอะไร” ถ้าขยายนามคือ adjective ถ้าขยาย verb/adjective/adverb/ประโยคคือ adverb',
    checklist: [
      'Adverb of manner บอกว่าทำอย่างไร เช่น carefully, clearly',
      'Frequency adverb อยู่หน้า verb แท้ แต่หลัง verb to be',
      'Degree adverb อยู่หน้า adjective/adverb เช่น very important, too late',
      'บางคำเป็นได้ทั้ง adjective และ adverb เช่น fast, hard, late, early',
      'friendly, lovely, lonely เป็น adjective แม้ลงท้าย -ly'
    ],
    examples: [
      ['ขยายกริยา', 'She answered correctly.', 'correctly ขยาย answered'],
      ['ขยาย adjective', 'The test was extremely difficult.', 'extremely ขยาย difficult'],
      ['ตำแหน่ง frequency', 'She usually arrives early. / She is usually punctual.', 'หน้า verb แท้ แต่หลัง is']
    ],
    traps: [
      'hard = อย่างหนัก แต่ hardly = แทบจะไม่ ความหมายต่างกันมาก',
      'good เป็น adjective แต่ well เป็น adverb ในความหมายทำได้ดี',
      'late เป็นได้ทั้ง adjective/adverb ส่วน lately แปลว่าเมื่อเร็ว ๆ นี้'
    ],
    exercises: [
      { q: 'เลือกคำ: She speaks English _____. (fluent / fluently)', a: 'fluently', why: 'ขยายกริยา speaks ใช้ adverb' },
      { q: 'เลือกคำ: He is a _____ driver. (careful / carefully)', a: 'careful', why: 'ขยายนาม driver ใช้ adjective' },
      { q: 'เลือกคำ: The test was _____ difficult. (extreme / extremely)', a: 'extremely', why: 'ขยาย adjective difficult ใช้ adverb' },
      { q: 'วางตำแหน่ง: She arrives late. เติม usually', a: 'She usually arrives late.', why: 'frequency adverb อยู่หน้า verb แท้ arrives' },
      { q: 'เลือกคำ: He works _____. (hard / hardly)', a: 'hard', why: 'hard เป็น adverb แปลว่าขยัน/อย่างหนัก ส่วน hardly แปลว่าแทบไม่' },
      { q: 'เลือกคำ: She is a _____ teacher. (friendly / friendlily)', a: 'friendly', why: 'friendly เป็น adjective แม้ลงท้าย -ly' }
    ]
  },
  a2_g17_comparison: {
    tone: 'emerald',
    title: 'Comparison คือการเลือกองศาให้ตรงจำนวนสิ่งที่เปรียบเทียบ',
    thesis: 'ถ้าเปรียบ 2 สิ่งใช้ comparative ถ้าเปรียบมากกว่า 2 สิ่งใช้ superlative และถ้าเท่ากันใช้ as...as',
    note: '2 สิ่ง = than, ที่สุด = the, เท่ากัน = as...as, ยิ่ง...ยิ่ง = the comparative, the comparative',
    checklist: [
      'คำสั้นมักเติม -er/-est ส่วนคำยาวมักใช้ more/most',
      'Comparative ใช้ than ตามหลังเมื่อเทียบกับอีกสิ่ง',
      'Superlative มักมี the และบอกกลุ่มที่เปรียบเทียบ',
      'รูปพิเศษต้องจำ เช่น good-better-best, bad-worse-worst',
      'as + adj/adv + as ใช้กับความเท่ากัน'
    ],
    examples: [
      ['ขั้นกว่า', 'This lesson is easier than the previous one.', 'เปรียบ 2 บท ใช้ easier than'],
      ['ขั้นสูงสุด', 'She is the most careful student in class.', 'มากที่สุดในกลุ่ม ใช้ the most'],
      ['เท่ากัน', 'This test is as difficult as that test.', 'as...as ใช้เทียบเท่ากัน']
    ],
    traps: [
      'อย่าใช้ more กับคำที่เติม -er แล้ว เช่น more easier ผิด',
      'superlative ต้องมี the ในข้อสอบทั่วไป เช่น the best',
      'fewer ใช้กับนามนับได้พหูพจน์ ส่วน less ใช้กับนามนับไม่ได้'
    ],
    exercises: [
      { q: 'เลือกคำ: This book is _____ than that one. (easy / easier)', a: 'easier', why: 'มี than จึงใช้ comparative' },
      { q: 'เลือกคำ: She is _____ student in the class. (the best / better)', a: 'the best', why: 'in the class บอกกลุ่ม ใช้ superlative' },
      { q: 'เลือกคำ: This room is as _____ as that room. (large / larger)', a: 'large', why: 'as...as ใช้ adjective รูปปกติ' },
      { q: 'เลือกคำ: He has _____ money than I do. (less / fewer)', a: 'less', why: 'money เป็น uncountable' },
      { q: 'เลือกคำ: There are _____ students today than yesterday. (less / fewer)', a: 'fewer', why: 'students เป็นนามนับได้พหูพจน์' },
      { q: 'แก้ผิด: This question is more easier.', a: 'This question is easier.', why: 'ห้ามใช้ more ซ้อนกับ -er' }
    ]
  },
  a2_g18_preposition: {
    tone: 'blue',
    title: 'Preposition ต้องจำเป็นภาพ ไม่ใช่แปลทีละคำ',
    thesis: 'คำบุพบทหนึ่งคำมีหลายความหมาย แต่ถ้าจำเป็นภาพ เช่น จุด พื้นผิว ภายใน ทิศทาง ระยะเวลา จะเลือกได้แม่นขึ้น',
    note: 'at = จุด, on = ผิวหรือวัน, in = ภายในหรือช่วงใหญ่, for = ระยะเวลา, since = จุดเริ่มต้น, by = ไม่เกิน',
    checklist: [
      'Preposition ต้องตามด้วย noun, pronoun หรือ gerund',
      'in/on/at ใช้ทั้งเวลาและสถานที่ แต่ภาพจำต่างกัน',
      'to ใช้ทิศทางไปยัง ส่วน at ใช้ตำแหน่งที่อยู่',
      'between ใช้ระหว่างสิ่งที่แยกชัดเจน ส่วน among ใช้ท่ามกลางกลุ่ม',
      'หลายคำเป็น collocation ต้องจำเป็นวลี เช่น interested in, responsible for'
    ],
    examples: [
      ['เวลา', 'The meeting starts at 9 a.m. on Monday in April.', 'at เวลาเฉพาะ, on วัน, in เดือน'],
      ['สถานที่', 'She is at school, in the classroom, on the second floor.', 'จุด/บริเวณ, ภายใน, บนพื้นผิวหรือชั้น'],
      ['Collocation', 'Teachers are responsible for students’ safety.', 'responsible ต้องใช้ for']
    ],
    traps: [
      'arrive at ใช้กับสถานที่เล็ก arrive in ใช้กับเมือง/ประเทศ',
      'married to ไม่ใช่ married with',
      'discuss ไม่ต้องมี about ตามหลังในรูป discuss the issue'
    ],
    exercises: [
      { q: 'เลือกคำ: The exam is _____ Monday. (in / on)', a: 'on', why: 'ใช้ on กับวัน' },
      { q: 'เลือกคำ: The class starts _____ 8 a.m. (at / in)', a: 'at', why: 'ใช้ at กับเวลาเฉพาะ' },
      { q: 'เลือกคำ: She has lived here _____ 2020. (for / since)', a: 'since', why: '2020 เป็นจุดเริ่มต้น' },
      { q: 'เลือกคำ: We waited _____ two hours. (for / since)', a: 'for', why: 'two hours เป็นระยะเวลา' },
      { q: 'เลือกคำ: He is good _____ mathematics. (at / in)', a: 'at', why: 'good at เป็น collocation' },
      { q: 'เลือกคำ: The teacher walked _____ the classroom. (into / at)', a: 'into', why: 'into แสดงการเคลื่อนเข้าไปข้างใน' }
    ]
  },
  a2_g19_conjunction: {
    tone: 'violet',
    title: 'Conjunction ทำให้ประโยคมีตรรกะ ไม่ใช่แค่ยาวขึ้น',
    thesis: 'การเลือก conjunction ต้องดูความสัมพันธ์ของความคิดว่าเพิ่มเติม ขัดแย้ง เหตุผล ผลลัพธ์ เงื่อนไข เวลา หรือจุดประสงค์',
    note: 'and = เพิ่ม, but/yet = ขัดแย้ง, so = ผล, for/because = เหตุ, although = แม้ว่า, if/unless = เงื่อนไข',
    checklist: [
      'Coordinate conjunction เชื่อมคำ วลี หรือประโยคที่มีระดับเท่ากัน',
      'Correlative conjunction มาเป็นคู่และต้องคง parallel structure',
      'Subordinate conjunction ทำให้ clause หนึ่งกลายเป็น dependent clause',
      'because ตามด้วย clause แต่ because of ตามด้วย noun phrase หรือ V-ing',
      'although กับ but ไม่ควรใช้ซ้อนกันในประโยคเดียวแบบ although..., but...'
    ],
    examples: [
      ['เพิ่มข้อมูล', 'She is kind and patient.', 'and เชื่อม adjective สองคำ'],
      ['เหตุผลและผล', 'He studied hard, so he passed.', 'so นำผลลัพธ์'],
      ['แม้ว่า', 'Although the test was difficult, she passed.', 'although ทำให้ประโยคแรกเป็น dependent clause']
    ],
    traps: [
      'not only...but also ต้องให้ส่วนที่ตามหลังสองฝั่งเป็นรูปคู่ขนาน',
      'because of ตามด้วย clause ไม่ได้ ต้องใช้ because ถ้ามี S + V',
      'for ใน FANBOYS แปลว่าเพราะว่าและมักใช้เชิงทางการ ไม่เหมือน for ที่เป็น preposition'
    ],
    exercises: [
      { q: 'เลือกคำ: She was tired, _____ she kept studying. (but / so)', a: 'but', why: 'สองความคิดขัดแย้งกัน' },
      { q: 'เลือกคำ: He was sick, _____ he stayed home. (so / although)', a: 'so', why: 'ส่วนหลังเป็นผลจากส่วนหน้า' },
      { q: 'เลือกคำ: _____ it rained, the class continued. (Although / Because)', a: 'Although', why: 'มีความขัดแย้ง ฝนตกแต่เรียนต่อ' },
      { q: 'เลือกคำ: We canceled the trip _____ the heavy rain. (because / because of)', a: 'because of', why: 'ตามด้วย noun phrase the heavy rain' },
      { q: 'แก้ให้ขนาน: She likes reading and to write.', a: 'She likes reading and writing.', why: 'and ควรเชื่อมรูปที่ขนานกัน' },
      { q: 'เลือกคำ: Either you _____ I must answer. (or / nor)', a: 'or', why: 'either คู่กับ or' }
    ]
  },
  a2_g20_question_tag: {
    tone: 'rose',
    title: 'Question Tag คือเกมสลับขั้วและจับ auxiliary',
    thesis: 'ถ้าประโยคหน้าบวก tag ต้องลบ ถ้าประโยคหน้าลบ tag ต้องบวก แล้วเลือก auxiliary จาก tense หรือ modal ของประโยคหน้า',
    note: 'สลับขั้ว -> หา auxiliary -> เปลี่ยน subject เป็น pronoun -> ตรวจกรณีพิเศษ',
    checklist: [
      'มี verb to be ใช้ be ตัวเดิมใน tag',
      'มี modal/auxiliary ใช้ตัวนั้นใน tag',
      'มี verb แท้ ใช้ do/does/did ตาม tense และประธาน',
      'ประธานใน tag ต้องเป็น pronoun เช่น the teacher -> he/she, the books -> they',
      'คำลบแฝง เช่น never, hardly, seldom ทำให้ tag เป็นบวก'
    ],
    examples: [
      ['หน้าบวกท้ายลบ', 'She is a teacher, isn’t she?', 'is เป็นบวก จึงใช้ isn’t'],
      ['หน้าลบท้ายบวก', 'They don’t understand, do they?', 'don’t เป็นลบ จึงใช้ do'],
      ['verb แท้', 'He plays football, doesn’t he?', 'plays เป็น Present Simple บุรุษที่สาม ใช้ doesn’t']
    ],
    traps: [
      'I am ใช้ aren’t I ไม่ใช้ amn’t I',
      'Let’s ใช้ shall we',
      'Everyone/someone/no one ใช้ they ใน tag'
    ],
    exercises: [
      { q: 'เติม tag: She is ready, _____?', a: 'isn’t she', why: 'ประโยคหน้าบวกและใช้ is' },
      { q: 'เติม tag: They didn’t come, _____?', a: 'did they', why: 'ประโยคหน้าลบ ใช้ did บวก' },
      { q: 'เติม tag: He can swim, _____?', a: 'can’t he', why: 'มี modal can ใช้ can ใน tag และสลับเป็นลบ' },
      { q: 'เติม tag: I am late, _____?', a: 'aren’t I', why: 'I am เป็นกรณีพิเศษ ใช้ aren’t I' },
      { q: 'เติม tag: Let’s start, _____?', a: 'shall we', why: 'Let’s ใช้ shall we' },
      { q: 'เติม tag: Nobody called, _____?', a: 'did they', why: 'nobody เป็นลบแฝงและใช้ they ใน tag' }
    ]
  },
  a2_g21_irregular_verbs: {
    tone: 'slate',
    title: 'กริยา 3 ช่องต้องใช้แบบมีระบบ ไม่ใช่ท่องโดด ๆ',
    thesis: 'กริยา 3 ช่องเป็นฐานของ tense และ passive ถ้าจำเป็นกลุ่มเสียงจะเรียกใช้ในข้อสอบได้เร็วขึ้น',
    note: 'แบ่งเป็น AAA, ABA, ABB, ABC แล้วฝึกแต่งประโยค Past Simple, Perfect และ Passive จากคำเดียวกัน',
    checklist: [
      'Past Simple ใช้ V2 โดยไม่ต้องมี has/have/had',
      'Perfect ใช้ has/have/had + V3',
      'Passive ใช้ be + V3',
      'กริยาปกติเติม -ed แต่ irregular verb ต้องจำรูปพิเศษ',
      'อ่านออกเสียงเป็นชุดช่วยจำ เช่น sing-sang-sung, ring-rang-rung'
    ],
    examples: [
      ['คำเดียวใช้หลายบท', 'write -> wrote -> written', 'V2 ใช้ Past Simple, V3 ใช้ Perfect และ Passive'],
      ['Perfect', 'She has written a report.', 'has + V3'],
      ['Passive', 'The report was written yesterday.', 'was + V3']
    ],
    traps: [
      'หลัง did ต้องใช้ V1 เช่น did go ไม่ใช่ did went',
      'หลัง has/have/had ต้องใช้ V3 ไม่ใช่ V2',
      'read-read-read สะกดเหมือนกันแต่เสียง V2/V3 เปลี่ยน ต้องดูบริบท'
    ],
    exercises: [
      { q: 'เติม V2: She _____ a letter yesterday. (write)', a: 'wrote', why: 'yesterday ใช้ Past Simple จึงใช้ V2' },
      { q: 'เติม V3: He has _____ the answer. (know)', a: 'known', why: 'has + V3' },
      { q: 'เติม V3: The window was _____. (break)', a: 'broken', why: 'Passive = was + V3' },
      { q: 'เลือกคำ: Did you _____ the book? (read / readed)', a: 'read', why: 'หลัง did ใช้ V1 และ read เป็น irregular verb' },
      { q: 'เติม 3 ช่อง: teach - _____ - _____', a: 'taught - taught', why: 'teach อยู่กลุ่ม ABB ช่อง 2 และ 3 เหมือนกัน' },
      { q: 'เติม 3 ช่อง: go - _____ - _____', a: 'went - gone', why: 'go เป็นรูปพิเศษที่ V2 และ V3 ต่างกัน' },
      { q: 'เปลี่ยนเป็น perfect: I saw that movie.', a: 'I have seen that movie.', why: 'see ช่อง 3 คือ seen และ Present Perfect ใช้ have + V3' },
      { q: 'เปลี่ยนเป็น passive: Someone stole my bag.', a: 'My bag was stolen.', why: 'stole เป็น V2 แต่ passive ต้องใช้ was + V3 คือ stolen' }
    ]
  }
};

export const A2_GRAMMAR_CHAPTERS = A2_GRAMMAR_BASE_CHAPTERS.map((chapter) => {
  const extension = A2_GRAMMAR_EXTENSIONS[chapter.id];
  if (!extension) return chapter;
  return {
    ...chapter,
    content: `${chapter.content}${renderGrammarExtension(extension)}`
  };
});
