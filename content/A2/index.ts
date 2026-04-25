export const A2_GRAMMAR_CHAPTERS = [
  {
    id: 'a2_grammar_intro',
    title: '1. บทนำ Grammar',
    content: `
# Grammar: โครงสร้างภาษาอังกฤษที่ต้องแม่น

<div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-l-4 border-blue-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-blue-900 text-4xl font-black leading-tight mb-3">Grammar คือฐานของการอ่าน แปล และทำข้อสอบภาษาอังกฤษให้ไม่หลุดโครงประโยค</div>
  <div class="bg-white rounded-2xl border border-blue-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ให้เริ่มจากการมองประโยคเป็นชิ้นส่วน: ประธาน กริยา กรรม ส่วนขยาย เวลา และความสัมพันธ์ระหว่างคำ เมื่อเห็นโครงสร้างแล้ว ข้อสอบจะไม่ดูมั่วอีกต่อไป
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">แผนที่ Grammar ที่ควรจำ</span>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
    <div class="text-sm font-bold text-blue-600 mb-2">แกนที่ 1</div>
    <div class="text-2xl font-black text-slate-900 mb-2">Parts of Speech</div>
    <div class="text-slate-600 leading-relaxed">ชนิดของคำ เช่น noun, verb, adjective, adverb, preposition, conjunction</div>
  </div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
    <div class="text-sm font-bold text-indigo-600 mb-2">แกนที่ 2</div>
    <div class="text-2xl font-black text-slate-900 mb-2">Sentence Structure</div>
    <div class="text-slate-600 leading-relaxed">โครงประโยค S + V, S + V + O และส่วนขยาย</div>
  </div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
    <div class="text-sm font-bold text-emerald-600 mb-2">แกนที่ 3</div>
    <div class="text-2xl font-black text-slate-900 mb-2">Tenses</div>
    <div class="text-slate-600 leading-relaxed">เวลาและรูปกริยา เช่น present, past, future และ continuous/perfect</div>
  </div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
    <div class="text-sm font-bold text-rose-600 mb-2">แกนที่ 4</div>
    <div class="text-2xl font-black text-slate-900 mb-2">Agreement & Voice</div>
    <div class="text-slate-600 leading-relaxed">ประธาน-กริยา, active voice, passive voice และคำเชื่อม</div>
  </div>
</div>

<blockquote>
สูตรตั้งต้น: <strong>หา Subject ให้เจอ -> ดู Verb ให้ถูก -> เช็กเวลา -> เช็กความหมาย</strong>
</blockquote>
`
  },
  {
    id: 'a2_grammar_structure',
    title: '2. โครงสร้างประโยคและ Parts of Speech',
    content: `
# โครงสร้างประโยคและ Parts of Speech

## <span class="text-4xl font-black text-slate-900">ชนิดของคำที่ออกสอบบ่อย</span>

<div class="overflow-x-auto my-6 rounded-2xl border-2 border-slate-200 shadow-md">
  <table class="w-full text-left border-collapse bg-white m-0">
    <thead>
      <tr class="bg-blue-700 text-white">
        <th class="px-4 py-3 font-bold">ชนิดของคำ</th>
        <th class="px-4 py-3 font-bold">หน้าที่</th>
        <th class="px-4 py-3 font-bold">ตัวอย่าง</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-bold text-blue-700">Noun</td><td class="px-4 py-3">คน สัตว์ สิ่งของ สถานที่ ความคิด</td><td class="px-4 py-3">teacher, school, happiness</td></tr>
      <tr><td class="px-4 py-3 font-bold text-indigo-700">Verb</td><td class="px-4 py-3">การกระทำหรือสภาพ</td><td class="px-4 py-3">teach, learn, is, have</td></tr>
      <tr><td class="px-4 py-3 font-bold text-emerald-700">Adjective</td><td class="px-4 py-3">ขยายคำนาม</td><td class="px-4 py-3">good, difficult, important</td></tr>
      <tr><td class="px-4 py-3 font-bold text-rose-700">Adverb</td><td class="px-4 py-3">ขยายกริยา คุณศัพท์ หรือทั้งประโยค</td><td class="px-4 py-3">quickly, very, usually</td></tr>
      <tr><td class="px-4 py-3 font-bold text-amber-700">Preposition</td><td class="px-4 py-3">บอกความสัมพันธ์</td><td class="px-4 py-3">in, on, at, for, with</td></tr>
    </tbody>
  </table>
</div>

## <span class="text-4xl font-black text-slate-900">โครงสร้างประโยคพื้นฐาน</span>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div class="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
    <div class="text-3xl font-black text-blue-900 mb-2">S + V</div>
    <div class="text-slate-700">The students study.</div>
  </div>
  <div class="rounded-3xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm">
    <div class="text-3xl font-black text-indigo-900 mb-2">S + V + O</div>
    <div class="text-slate-700">The teacher explains the lesson.</div>
  </div>
  <div class="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
    <div class="text-3xl font-black text-emerald-900 mb-2">S + V + Adj.</div>
    <div class="text-slate-700">The classroom is clean.</div>
  </div>
</div>

<blockquote>
ข้อสอบ Grammar จำนวนมากเริ่มแก้ได้จากการแยก <strong>ประธาน</strong> และ <strong>กริยาแท้</strong> ให้ถูกก่อน
</blockquote>
`
  },
  {
    id: 'a2_grammar_tenses',
    title: '3. Tenses และ Subject-Verb Agreement',
    content: `
# Tenses และ Subject-Verb Agreement

## <span class="text-4xl font-black text-slate-900">Tenses ที่ควรแม่นก่อน</span>

<div class="overflow-x-auto my-6 rounded-2xl border-2 border-slate-200 shadow-md">
  <table class="w-full text-left border-collapse bg-white m-0">
    <thead>
      <tr class="bg-indigo-700 text-white">
        <th class="px-4 py-3 font-bold">Tense</th>
        <th class="px-4 py-3 font-bold">โครงสร้าง</th>
        <th class="px-4 py-3 font-bold">ใช้เมื่อ</th>
        <th class="px-4 py-3 font-bold">คำใบ้</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-bold">Present Simple</td><td class="px-4 py-3">S + V1</td><td class="px-4 py-3">ความจริง กิจวัตร ตารางเวลา</td><td class="px-4 py-3">always, usually, every day</td></tr>
      <tr><td class="px-4 py-3 font-bold">Past Simple</td><td class="px-4 py-3">S + V2</td><td class="px-4 py-3">เหตุการณ์จบแล้วในอดีต</td><td class="px-4 py-3">yesterday, last year, ago</td></tr>
      <tr><td class="px-4 py-3 font-bold">Present Continuous</td><td class="px-4 py-3">S + is/am/are + V-ing</td><td class="px-4 py-3">กำลังทำอยู่หรือแผนใกล้ ๆ</td><td class="px-4 py-3">now, right now, at the moment</td></tr>
      <tr><td class="px-4 py-3 font-bold">Present Perfect</td><td class="px-4 py-3">S + has/have + V3</td><td class="px-4 py-3">เกิดแล้วและโยงถึงปัจจุบัน</td><td class="px-4 py-3">since, for, already, yet</td></tr>
    </tbody>
  </table>
</div>

## <span class="text-4xl font-black text-slate-900">Subject-Verb Agreement</span>

<div class="bg-white rounded-3xl border border-slate-200 p-6 my-6 shadow-sm">
  <ul class="list-disc pl-5 space-y-3 text-slate-700 text-lg leading-relaxed m-0">
    <li>ประธานเอกพจน์ เช่น <strong>he, she, it, a teacher</strong> ใช้กริยาเติม <strong>s/es</strong> ใน Present Simple</li>
    <li>ประธานพหูพจน์ เช่น <strong>they, we, students</strong> ใช้กริยาไม่เติม s/es</li>
    <li>ประธานที่มีคำขยายยาว ๆ ให้ตัดส่วนขยายออกก่อน แล้วหา subject จริง</li>
    <li>คำอย่าง <strong>everyone, someone, each, every</strong> มักนับเป็นเอกพจน์</li>
  </ul>
</div>

<blockquote>
ถ้าข้อสอบให้ประโยคยาว ให้หาแกน <strong>Subject + Verb</strong> ก่อน อย่าเพิ่งแปลทั้งประโยค
</blockquote>
`
  },
  {
    id: 'a2_grammar_voice',
    title: '4. Active Voice, Passive Voice และจุดหลอก',
    content: `
# Active Voice, Passive Voice และจุดหลอก

## <span class="text-4xl font-black text-slate-900">Active vs Passive</span>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-emerald-900 mb-3">Active Voice</div>
    <div class="text-slate-700 text-lg leading-relaxed">ประธานเป็นผู้กระทำ เช่น <strong>The teacher teaches English.</strong></div>
  </div>
  <div class="rounded-3xl border border-rose-100 bg-rose-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-rose-900 mb-3">Passive Voice</div>
    <div class="text-slate-700 text-lg leading-relaxed">ประธานเป็นผู้ถูกกระทำ เช่น <strong>English is taught by the teacher.</strong></div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">สูตร Passive ที่ต้องจำ</span>

<div align="center" class="my-6">
  <div class="inline-block bg-white border-2 border-indigo-200 rounded-3xl px-6 py-5 shadow-sm">
    <div class="text-slate-500 text-sm mb-2">Passive Formula</div>
    <div class="text-3xl md:text-5xl font-black text-indigo-800">S + be + V3</div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">จุดหลอกที่ออกบ่อย</span>

<div class="bg-white rounded-3xl border border-slate-200 p-6 my-6 shadow-sm">
  <ul class="list-disc pl-5 space-y-3 text-slate-700 text-lg leading-relaxed m-0">
    <li>เห็นคำว่า <strong>by</strong> ไม่ได้แปลว่าต้องเป็น passive เสมอ ต้องดูว่า subject ถูกกระทำหรือไม่</li>
    <li>Passive ต้องมี <strong>be</strong> และ <strong>V3</strong> ครบ</li>
    <li>บางข้อหลอกด้วย tense เช่น <strong>was built</strong>, <strong>is being used</strong>, <strong>has been done</strong></li>
    <li>กริยาบางคำไม่ใช้ passive ง่าย ๆ โดยเฉพาะ intransitive verbs เช่น happen, occur, arrive</li>
  </ul>
</div>
`
  }
];

export const A2_VOCABULARY_CHAPTERS = [
  {
    id: 'a2_vocab_intro',
    title: '1. บทนำ Vocabulary',
    content: `
# Vocabulary: ศัพท์ที่ต้องเดาเป็นและจำเป็นระบบ

<div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-l-4 border-emerald-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-emerald-900 text-4xl font-black leading-tight mb-3">Vocabulary ไม่ใช่การท่องศัพท์เยอะอย่างเดียว แต่คือการเดาความหมายจากรูปคำและบริบทให้เป็น</div>
  <div class="bg-white rounded-2xl border border-emerald-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    ข้อสอบมักวัด prefix, suffix, root, synonym, antonym และ context clues จึงควรจำเป็นกลุ่ม ไม่ใช่จำแยกคำแบบลอย ๆ
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">แผนที่ Vocabulary</span>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-emerald-900">Prefix</div><div class="text-slate-600 mt-2">คำนำหน้า เปลี่ยนความหมายของคำ</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-teal-900">Suffix</div><div class="text-slate-600 mt-2">คำลงท้าย บอกชนิดคำหรือความหมายเพิ่ม</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-sky-900">Context Clues</div><div class="text-slate-600 mt-2">เดาศัพท์จากประโยครอบข้าง</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-amber-900">Word Relation</div><div class="text-slate-600 mt-2">synonym, antonym, collocation</div></div>
</div>
`
  },
  {
    id: 'a2_vocab_affixes',
    title: '2. Prefix, Suffix และ Word Form ฉบับรวม',
    content: `
# Prefix, Suffix และ Word Form ฉบับรวม

## แกนจำบทนี้

Prefix และ Suffix เป็นเครื่องมือเดาศัพท์ที่คุ้มที่สุด เพราะข้อสอบมักให้คำที่ไม่คุ้น แต่ถ้าเห็นรากคำและรูปคำได้ จะเดาทิศทางความหมายได้ทันที

> สูตรจำเร็ว: **หน้าเปลี่ยนความหมาย หลังบอกชนิดคำ**  
> Prefix บอกทิศทางความหมาย ส่วน Suffix บอกหน้าที่ของคำ เช่น noun, adjective, verb, adverb

## Prefix กลุ่มปฏิเสธและตรงข้าม

| Prefix | ความหมาย | ตัวอย่าง | เทคนิคจำ |
|---|---|---|---|
| un- | ไม่ / ตรงข้าม | unhappy, unsafe, unable | ใช้กว้างมาก โดยเฉพาะ adjective |
| in- | ไม่ | incorrect, incomplete, inactive | มักเจอคำทางการ |
| im- | ไม่ | impossible, impatient, imperfect | มักอยู่หน้า p, b, m |
| il- | ไม่ | illegal, illogical, illiterate | มักอยู่หน้า l |
| ir- | ไม่ | irregular, irresponsible, irrelevant | มักอยู่หน้า r |
| dis- | ไม่ / ตรงข้าม / แยกออก | disagree, disappear, disconnect | เจอบ่อยในข้อสอบ antonym |
| non- | ไม่ใช่ / ไม่มี | nonverbal, nonprofit, nonsense | ใช้บอกว่าไม่อยู่ในกลุ่มนั้น |

## Prefix กลุ่มเวลา จำนวน ระดับ และการกระทำ

| กลุ่ม | Prefix | ความหมาย | ตัวอย่าง |
|---|---|---|---|
| ทำซ้ำ | re- | อีกครั้ง | rewrite, reread, review, rebuild |
| ก่อน | pre- | ก่อน | preview, preschool, pretest, prehistoric |
| หลัง | post- | หลัง | postwar, postgraduate, postpone |
| ร่วมกัน | co- | ร่วม | cooperate, coworker, coauthor |
| ผิดพลาด | mis- | ผิด | misunderstand, mislead, misuse |
| เกิน | over- | มากเกิน | overwork, overuse, overweight |
| น้อย/ต่ำกว่า | under- | ต่ำกว่า/ไม่พอ | underestimate, underpaid, underdeveloped |
| หนึ่ง | mono- | หนึ่ง | monologue, monolingual |
| สอง | bi- | สอง | bilingual, bicycle |
| สาม | tri- | สาม | triangle, tricycle |
| เหนือกว่า | super- | เหนือ/มาก | supermarket, superior, supernatural |
| ต่อต้าน | anti- | ต่อต้าน | antibiotic, antiwar, antisocial |

## Suffix บอก Noun: เห็นแล้วรู้ว่าเป็นคำนาม

| Suffix | ใช้บอก | ตัวอย่าง | จุดออกสอบ |
|---|---|---|---|
| -er / -or | ผู้ทำ | teacher, writer, actor, director | หลัง article มักใช้ noun |
| -ist | ผู้เชี่ยวชาญ/ผู้ยึดแนวคิด | artist, scientist, specialist | เจอบ่อยในอาชีพ |
| -ee | ผู้รับ/ผู้ถูกกระทำ | employee, trainee, interviewee | คู่กับ -er ได้ |
| -tion / -sion | การกระทำ/กระบวนการ | education, decision, discussion | ออกบ่อยมาก |
| -ment | ผลหรือกระบวนการ | development, agreement, government | คำราชการเจอบ่อย |
| -ness | ความเป็น | kindness, happiness, darkness | adjective เปลี่ยนเป็น noun |
| -ity | ภาวะ/คุณสมบัติ | ability, activity, responsibility | คำสอบถี่ |
| -ship | สถานะ/ความสัมพันธ์ | friendship, leadership, membership | ใช้กับสถานะ |
| -hood | ช่วงชีวิต/สถานะ | childhood, brotherhood | บอกช่วงหรือสภาพ |
| -ism | ลัทธิ/แนวคิด | realism, tourism, Buddhism | บอกระบบความคิด |
| -logy | วิชา | biology, psychology, sociology | กลุ่มวิชา |

## Suffix บอก Adjective, Verb, Adverb

| ชนิดคำ | Suffix | ตัวอย่าง | เทคนิค |
|---|---|---|---|
| Adjective | -able / -ible | readable, possible, responsible | สามารถ...ได้ |
| Adjective | -ful | useful, careful, harmful | เต็มไปด้วย |
| Adjective | -less | careless, hopeless, harmless | ปราศจาก |
| Adjective | -ive | active, creative, effective | มีลักษณะ |
| Adjective | -ous | dangerous, famous, obvious | มีคุณสมบัติ |
| Adjective | -al | national, personal, educational | เกี่ยวกับ |
| Adjective | -ic / -ical | basic, logical, historical | เกี่ยวกับ/มีลักษณะ |
| Verb | -ize | modernize, organize, realize | ทำให้เป็น |
| Verb | -en | strengthen, widen, lengthen | ทำให้...ขึ้น |
| Verb | -ify | simplify, classify, identify | ทำให้/จัดเป็น |
| Adverb | -ly | quickly, carefully, usually | อย่าง... |
| Adverb | -ward | forward, backward, upward | ทิศทาง |

## Word Family ที่ควรจำเป็นชุด

| Verb | Noun | Adjective | Adverb |
|---|---|---|---|
| educate | education | educational | educationally |
| develop | development | developed/developing | developmentally |
| decide | decision | decisive | decisively |
| approve | approval | approved | approvingly |
| arrange | arrangement | arranged | - |
| attend | attendance | attentive | attentively |
| attract | attraction | attractive | attractively |
| behave | behavior | behavioral | behaviorally |
| create | creation/creativity | creative | creatively |
| regulate | regulation | regulatory | regularly |

## Word Choice: เลือกคำให้ถูกช่องว่าง

| ตำแหน่งว่าง | มักต้องการ | ตัวอย่าง |
|---|---|---|
| หลัง article a/an/the | noun หรือ adjective + noun | a useful method |
| หน้า noun | adjective | an important lesson |
| หลัง be/linking verb | adjective หรือ noun complement | The lesson is useful. |
| หลัง very/too/so | adjective หรือ adverb | very important |
| หลัง verb ทั่วไป | adverb หรือ object | works carefully / reads books |
| หลัง preposition | noun / gerund | interested in teaching |
| หลัง modal เช่น can, should, must | verb infinitive | should improve |
| หลัง make/let/help | verb infinitive | make students understand |

## ตัวอย่างแนวสอบ Word Form

| โจทย์ | คำตอบ | เหตุผล |
|---|---|---|
| The teacher gave a clear _____. (explain/explanation) | explanation | หลัง article ต้องการ noun |
| Students should learn _____. (active/actively) | actively | ขยาย verb learn ต้องใช้ adverb |
| This activity is _____. (create/creative) | creative | หลัง be ต้องการ adjective |
| The answer is _____. (correct/incorrect) because it disagrees with the passage. | incorrect | because ชี้ว่าคำตอบไม่ตรง |
| The school will _____ the old system. (modern/modernize) | modernize | หลัง will ต้องตามด้วย verb แท้ |
| He is a good _____. (lead/leader) | leader | หลัง article + adjective ต้องการ noun |
| The report was written _____. (careful/carefully) | carefully | ขยาย was written ต้องใช้ adverb |
| We need more _____ in class. (active/activity) | activity | หลัง more ต้องการ noun |
| The policy is very _____. (benefit/beneficial) | beneficial | หลัง very ต้องการ adjective |
| The students showed great _____. (able/ability) | ability | หลัง adjective great ต้องการ noun |

> วิธีทำข้อ Word Form: มองซ้าย-ขวาของช่องว่างก่อนแปล ถ้ารู้ตำแหน่งทางไวยากรณ์ จะตัดช้อยส์ได้เร็วมาก
`
  },
  {
    id: 'a2_vocab_context',
    title: '3. Context Clues, Synonym และ Antonym',
    content: `
# Context Clues, Synonym และ Antonym

## ทำไมบทนี้สำคัญมาก

ข้อสอบ Vocabulary ไม่ได้ถามว่าเราท่องศัพท์ได้กี่คำอย่างเดียว แต่ถามว่า “เดาศัพท์จากบริบทได้ไหม” และ “รู้ความสัมพันธ์ของคำไหม” เช่น คำเหมือน คำตรงข้าม เหตุ-ผล ตัวอย่าง หรือคำอธิบายซ้ำ

> สูตรจับบริบท: **ดูคำเชื่อมก่อน ดูอารมณ์ประโยคต่อ แล้วค่อยเลือกความหมาย**

## ชนิดของ Context Clues

| ชนิด | สัญญาณ | วิธีเดา | ตัวอย่าง |
|---|---|---|---|
| Definition | means, is called, refers to | คำนิยามอยู่ใกล้คำยาก | A mentor is a person who guides learners. |
| Restatement | or, that is, in other words | ประโยคพูดซ้ำด้วยคำง่าย | The rule is mandatory, or required. |
| Example | for example, such as, including | คำยากเป็นกลุ่มเดียวกับตัวอย่าง | Appliances such as fridges and ovens use electricity. |
| Contrast | but, however, although, unlike | คำหลังอาจกลับทิศ | The task is simple, but the instruction is ambiguous. |
| Cause | because, since, due to | เหตุช่วยเดาความหมาย | He was absent because he was ill. |
| Effect | therefore, thus, as a result | ผลช่วยย้อนหาเหตุ | It rained heavily; therefore, the match was postponed. |
| Comparison | like, similarly, as...as | ความหมายใกล้กัน | This method is similar to the old approach. |
| Apposition | comma, dash, parentheses | คำอธิบายอยู่คั่นกลาง | A novice, a beginner, needs clear guidance. |

## Synonym / Antonym ที่ใช้บ่อย

| คำหลัก | Synonym | Antonym |
|---|---|---|
| important | essential, significant, crucial, vital | minor, trivial, insignificant |
| increase | rise, grow, expand, escalate | decrease, reduce, diminish |
| difficult | hard, tough, arduous, challenging | easy, simple, effortless |
| benefit | advantage, merit, asset | drawback, disadvantage, weakness |
| accurate | correct, exact, precise | wrong, inaccurate, faulty |
| ambiguous | unclear, vague, obscure | clear, explicit, obvious |
| brave | bold, courageous, fearless | timid, fearful, cowardly |
| harmful | dangerous, hazardous, injurious | harmless, safe, innocent |
| scarce | sparse, scant, insufficient | abundant, plentiful, ample |
| modern | up-to-date, contemporary, current | ancient, old-fashioned, outdated |
| accept | admit, approve, consent | reject, deny, refuse |
| protect | defend, guard, preserve | expose, endanger, harm |

## คำสัญญาณ Synonym ที่ควรรู้

| สัญญาณ | ใช้บอก | ตัวอย่าง |
|---|---|---|
| or | อธิบายซ้ำ | concise, or brief |
| in other words | พูดอีกแบบ | The plan is feasible, in other words, it can be done. |
| that is | อธิบายเพิ่มเติม | The policy is compulsory, that is, everyone must follow it. |
| also known as | เรียกอีกอย่าง | A physician is also known as a doctor. |
| similarly | ความหมาย/ทิศทางใกล้กัน | Similarly, both methods save time. |

## คำสัญญาณ Antonym ที่ควรรู้

| สัญญาณ | ใช้บอก | ตัวอย่าง |
|---|---|---|
| but | หักมุม | The room was tiny but comfortable. |
| however | ขัดแย้ง | The idea was popular; however, it was impractical. |
| although | แม้ว่า | Although he is young, he is mature. |
| unlike | แตกต่างจาก | Unlike temporary workers, permanent staff receive benefits. |
| instead of | แทนที่จะ | He accepted the offer instead of rejecting it. |
| rather than | มากกว่าจะ | Choose evidence rather than guesses. |

## คู่คำที่ชอบหลอก

| คู่คำ | ต่างกันอย่างไร |
|---|---|
| effect / affect | effect เป็นคำนาม “ผลกระทบ” ส่วน affect เป็นกริยา “ส่งผลต่อ” |
| source / resource | source คือแหล่งต้นทาง ส่วน resource คือทรัพยากร |
| temporary / contemporary | temporary คือชั่วคราว contemporary คือร่วมสมัย |
| evolution / revolution | evolution คือวิวัฒนาการ revolution คือการปฏิวัติ |
| include / exclude | include รวมเข้า exclude แยกออก |
| quality / quantity | quality คุณภาพ quantity ปริมาณ |
| so that / so...that | so that เพื่อที่จะ so...that มากจน |
| thank for / thanks to | thank for ขอบคุณสำหรับ thanks to เนื่องจาก/เพราะ |

## แบบฝึกหัดเดาศัพท์จากบริบท

| ข้อ | ประโยค | คำตอบ | เหตุผล |
|---|---|---|---|
| 1 | The instruction was ambiguous; many students could not understand it. | unclear | ผลคือไม่เข้าใจ |
| 2 | The rule is mandatory, or required by everyone. | required | or อธิบายซ้ำ |
| 3 | The village was remote, far from hospitals and schools. | distant | คำหลัง comma ขยายความ |
| 4 | The task was arduous, but the students completed it. | difficult | but แยกความยากกับความสำเร็จ |
| 5 | The committee rejected the plan because it was too costly. | refused | because ให้เหตุผลการไม่รับ |
| 6 | The new method is practical; teachers can use it in real classrooms. | usable | ประโยคหลังอธิบายว่าใช้จริงได้ |
| 7 | There was a scarcity of water, so people had to save every drop. | shortage | ผลคือประหยัดน้ำทุกหยด |
| 8 | The policy aims to protect children from harm. | defend | from harm บอกทิศทางป้องกัน |
| 9 | The answer is not exact; it is only approximate. | precise | not exact เทียบกับ approximate |
| 10 | He tried to conceal the truth, but the report revealed it. | hide | but ชี้ reveal เป็นตรงข้าม |

## เทคนิคทำข้อสอบแบบเร็ว

1. อ่านประโยคก่อนและหลังคำศัพท์เสมอ
2. มองหาคำเชื่อม เช่น but, because, therefore, such as
3. ถ้ามีคำอธิบายหลัง comma ให้ใช้คำนั้นช่วยเดา
4. ถ้าคำตอบมีหลายคำใกล้กัน ให้เลือกคำที่เข้ากับ tone ของประโยค
5. ถ้าเจอ NOT หรือ EXCEPT ให้ขีดเส้นไว้ทันที
6. คำที่แรงเกินไป เช่น always, never, only มักเป็นช้อยส์ลวงถ้าบทอ่านไม่ได้ยืนยัน
`
  },
  {
    id: 'a2_vocab_phrases_collocations',
    title: '4. ประโยคและ Collocation ที่ควรรู้',
    content: `
# ประโยคและ Collocation ที่ควรรู้

## บทนี้ใช้กับข้อสอบแบบไหน

บทนี้รวม phrase, collocation และประโยคพื้นฐานที่เอาไปช่วยทั้ง Vocabulary, Conversation และ Reading เพราะหลายข้อไม่ได้ถามศัพท์เดี่ยว แต่ถามว่าวลีไหน “ใช้คู่กันถูก”

## Preposition Collocations ที่ต้องจำ

| วลี | ความหมาย | ตัวอย่าง |
|---|---|---|
| similar to | คล้ายกับ | This method is similar to the old one. |
| different from | แตกต่างจาก | The result is different from our expectation. |
| responsible for | รับผิดชอบต่อ | Teachers are responsible for student safety. |
| decide to | ตัดสินใจที่จะ | She decided to apply for the exam. |
| between...and... | ระหว่าง...กับ... | The test is between 9 and 11 a.m. |
| from...to... | จาก...ถึง... | The course runs from May to July. |
| based on | มีพื้นฐานจาก | The decision is based on evidence. |
| derived from | มีรากจาก | The word is derived from Latin. |
| depend on | ขึ้นอยู่กับ | Success depends on regular practice. |
| rely on | พึ่งพา | Students rely on clear instructions. |
| protect...from | ปกป้องจาก | Rules protect children from harm. |
| prevent...from | ป้องกันไม่ให้ | Planning prevents mistakes from happening. |
| focus on | เน้น/จดจ่อ | Focus on the main idea. |
| comply with | ปฏิบัติตาม | Staff must comply with the rule. |
| consist of | ประกอบด้วย | The test consists of four parts. |

## ประโยคแนะนำตัวและข้อมูลส่วนตัว

| สถานการณ์ | ประโยค |
|---|---|
| แนะนำตัว | Hello, my name is Sam. |
| แนะนำตัวแบบเป็นกันเอง | Hi, I’m Jane. |
| ยินดีที่รู้จัก | Nice to meet you. |
| ตอบกลับ | Nice to meet you, too. |
| ถามว่ามาจากไหน | Where are you from? |
| ตอบประเทศ | I’m from Thailand. |
| ถามอาชีพ | What do you do? |
| ตอบสถานะ | I’m a student. |
| ถามที่ทำงาน | Where do you work? |
| ตอบที่ทำงาน | I work in a school. |

## ประโยคถามความชอบ ความสามารถ และครอบครัว

| สถานการณ์ | ประโยค |
|---|---|
| ถามวิชาที่ชอบ | What subjects do you like? |
| ตอบวิชาที่ชอบ | I like math and English. |
| ถามสิ่งที่ชอบ | What kind of music do you like? |
| ถามอาหารโปรด | What’s your favorite food? |
| ถามกีฬาโปรด | What’s your favorite sport? |
| ถามความสามารถ | Can you speak English? |
| ตอบว่าสามารถ | Yes, I can. |
| ตอบว่าไม่สามารถ | No, I can’t. |
| ถามจำนวนภาษา | How many languages can you speak? |
| ถามจำนวนสมาชิกครอบครัว | How many people are there in your family? |

## วลีที่มักเป็นช้อยส์คำศัพท์

| วลี | ความหมาย | จุดจำ |
|---|---|---|
| at last / in the end / finally / eventually | ในที่สุด | ใช้สรุปตอนจบ |
| so that | เพื่อที่จะ | ตามด้วยผลลัพธ์ที่ต้องการ |
| so...that | มากจน | บอกระดับมากและผลตามมา |
| thanks to | เนื่องจาก/เพราะ | ใช้บอกสาเหตุเชิงบวกหรือกลาง |
| thank you for | ขอบคุณสำหรับ | ใช้ใน conversation |
| take place | เกิดขึ้น | เหมือน happen/occur |
| bring about | ก่อให้เกิด | ใช้กับ cause-effect |
| be likely to | มีแนวโน้มที่จะ | ตามด้วย verb |
| be prone to | มีแนวโน้ม/เสี่ยงต่อ | ตามด้วย noun/gerund |
| be full of | เต็มไปด้วย | เหมือน be filled with |

> จำแบบใช้งานจริง: ถ้าเป็น phrase ให้ท่องทั้งวลี อย่าแยกคำ เพราะข้อสอบชอบถาม preposition ที่ใช้คู่กับคำนั้น
`
  },
  {
    id: 'a2_vocab_context_exam_bank',
    title: '5. ชุดศัพท์และบริบทที่ออกสอบบ่อย',
    content: `
# ชุดศัพท์และบริบทที่ออกสอบบ่อย

## กลุ่มคำที่ควรจำเป็นแพ็ก

การจำคำศัพท์สำหรับสอบควรจำเป็น “เครือข่ายความหมาย” เพราะโจทย์มักถาม synonym, antonym หรือให้เดาคำจากบริบท ไม่ได้ถามคำเดี่ยวแบบโดด ๆ บทนี้จึงจัดเป็นกลุ่มคำ เพื่อให้ท่องง่ายและหยิบไปใช้ตัดช้อยส์ได้เร็ว

## กลุ่ม Education และ Classroom

| คำหลัก | ความหมาย | คำใกล้เคียง | คำตรงข้าม/ระวัง |
|---|---|---|---|
| educate | ให้การศึกษา | teach, instruct, train | mislead |
| learner | ผู้เรียน | student, pupil | instructor |
| assessment | การประเมิน | evaluation, measurement | guesswork |
| curriculum | หลักสูตร | course plan, syllabus | lesson เดี่ยว ๆ |
| participation | การมีส่วนร่วม | involvement, engagement | absence |
| achievement | ผลสัมฤทธิ์ | success, attainment | failure |

## กลุ่ม Society และ Technology

| คำหลัก | ความหมาย | คำใกล้เคียง | ใช้ในบริบท |
|---|---|---|---|
| develop | พัฒนา | improve, advance | develop skills |
| innovation | นวัตกรรม | new method, invention | educational innovation |
| communicate | สื่อสาร | exchange, convey | communicate clearly |
| information | ข้อมูล | data, knowledge | uncountable noun |
| digital | ดิจิทัล | electronic, online | digital learning |
| reliable | เชื่อถือได้ | dependable, trustworthy | reliable source |

## กลุ่ม Positive / Negative ที่ชอบหลอก

| Positive | Negative | หมายเหตุ |
|---|---|---|
| benefit | drawback | benefit เป็นข้อดี drawback เป็นข้อเสีย |
| advantage | disadvantage | คู่ตรงข้ามออกสอบบ่อย |
| increase | decrease | เพิ่มขึ้น/ลดลง |
| improve | worsen | ดีขึ้น/แย่ลง |
| include | exclude | รวมเข้า/ไม่รวม |
| accept | reject | ยอมรับ/ปฏิเสธ |
| success | failure | ความสำเร็จ/ความล้มเหลว |
| support | oppose | สนับสนุน/คัดค้าน |

## Context Clues ที่ต้องจับให้ไว

| สัญญาณ | ความหมายของสัญญาณ | วิธีอ่าน |
|---|---|---|
| for example, such as, including | ตัวอย่าง | คำยากมักเป็นหมวดเดียวกับตัวอย่าง |
| but, however, although, unlike | ตรงข้าม | คำหลังสัญญาณอาจกลับทิศ |
| because, since, as | เหตุ | อ่านเหตุเพื่อเดาคำผล |
| therefore, thus, as a result | ผล | อ่านผลเพื่อย้อนเดาเหตุ |
| or, that is, in other words | อธิบายซ้ำ | ความหมายมักอยู่หลังสัญญาณ |

## แบบฝึกหัดเดาศัพท์จากบริบท

| ข้อ | ประโยค | คำตอบ | เหตุผล |
|---|---|---|---|
| 1 | The task was simple, but the instructions were **ambiguous**. | unclear | but ชี้ว่าตรงข้ามกับ simple/ชัดเจน |
| 2 | Students need reliable information, not rumors or guesses. | trustworthy | ตรงข้ามกับ rumors/guesses |
| 3 | The school introduced an innovation, such as online quizzes and digital portfolios. | new method | such as ให้ตัวอย่าง |
| 4 | He was absent; therefore, he missed the lesson. | not present | ผลคือ missed the lesson |
| 5 | The teacher tried to simplify the rule, or make it easier to understand. | make easier | or อธิบายซ้ำ |
| 6 | The policy may benefit students, but it can create extra work for teachers. | help | แต่มีข้อเสียตามหลัง |
| 7 | The committee rejected the proposal because it was too expensive. | refused | because ให้เหตุที่ไม่รับ |
| 8 | Her explanation was concise; it was short but complete. | brief | หลัง semicolon อธิบายซ้ำ |

> เทคนิคจำศัพท์ให้เร็ว: อย่าท่องคำไทยคำเดียว ให้จำ “ทิศทาง” ของคำด้วยว่าเป็นบวก ลบ เพิ่ม ลด เหตุ หรือผล

## คลังศัพท์ 500+ คำ แบ่งเป็นกลุ่มความหมาย

| กลุ่ม | คำที่ควรจำ |
|---|---|
| ความสามารถ | ability, talent, skill, competence, proficiency |
| ความสำเร็จ | achieve, attain, accomplish, fulfill, succeed |
| ข้อดี | advantage, benefit, merit, strength, asset |
| ข้อเสีย | disadvantage, drawback, weakness, defect, flaw |
| ถูกต้อง | accurate, correct, exact, precise, definite |
| คลุมเครือ | ambiguous, obscure, unclear, vague, doubtful |
| ชัดเจน | apparent, obvious, evident, manifest, explicit |
| เร่งด่วน | urgent, pressing, immediate, instant, prompt |
| ลดลง | reduce, decrease, decline, diminish, lessen |
| เพิ่มขึ้น | increase, rise, grow, expand, escalate |
| อนุรักษ์ | conserve, preserve, protect, reserve, maintain |
| รักษา/บรรเทา | cure, heal, treat, remedy, alleviate |
| วิธีการ | method, means, way, approach, tactic |
| จัดการ | manage, handle, deal, cope, control |
| ควบคุม | regulate, govern, rule, supervise, monitor |
| ให้/จัดสรร | provide, supply, grant, allocate, distribute |
| โจมตี | assault, attack, strike, raid, charge |
| รวดเร็ว | rapid, quick, speedy, fast, swift |
| เกิดขึ้น | happen, occur, emerge, arise, appear |
| เป้าหมาย | target, objective, purpose, aim, goal |
| ทั้งหมด | whole, all, entire, total, complete |
| เปลี่ยน | alter, modify, change, shift, switch |
| เรียกร้อง | demand, request, require, desire, claim |
| ส่วนใหญ่ | mainly, largely, mostly, chiefly, principally |
| เป็นไปได้ | likely, possible, probable, potential, prospective |
| เดิน | stroll, walk, wander, march, pace |
| เฉพาะ | specific, special, particular, peculiar, unique |
| ชั่วคราว | temporary, provisional, transitional, short-term, interim |
| ผลลัพธ์ | effect, result, outcome, consequence, aftermath |
| หยุด | cease, stop, halt, quit, pause |
| จับ/ยึด | capture, catch, grab, grasp, seize |
| ได้รับ | acquire, gain, obtain, receive, get |
| โอกาส | chance, opportunity, occasion, possibility, opening |
| ตัวอย่าง | instance, example, sample, specimen, case |
| พึ่งพา | depend, rely, trust, count, hinge |
| ทั่วไป | common, normal, general, ordinary, usual |
| แหล่ง/ฐาน | resource, source, origin, root, basis |
| แสดง | show, perform, demonstrate, exhibit, display |
| อธิบาย | explain, describe, emphasize, compare, refer |
| ความวุ่นวาย | turmoil, chaos, disorder, disarray, turbulence |
| เน้น | highlight, concentrate, focus, stress, accentuate |
| เชื่อมโยง | link, relate, associate, connect, interrelate |
| หลากหลาย | mixed, assorted, varied, diverse, heterogeneous |
| ไล่ออก | dismiss, fire, sack, discharge, layoff |
| อุดมสมบูรณ์ | fertile, abundant, lush, plentiful, bountiful |
| ปล่อย | release, emit, free, liberate, unlock |
| สันนิษฐาน | assume, presume, surmise, guess, speculate |
| พิจารณา | consider, ponder, regard, realize, perceive |
| อันตราย | harmful, dangerous, hazardous, perilous, injurious |
| ซับซ้อน | complex, complicated, intricate, elaborate, sophisticated |
| บ่มเพาะ/สนับสนุน | nourish, nurture, foster, support, cultivate |
| ระบุ | indicate, identify, specify, pinpoint, mark |
| ภัยพิบัติ | disaster, catastrophe, calamity, adversity, crisis |
| สุดท้าย | final, ultimate, eventual, terminal, last |
| ไพเราะ | sweet, melodic, tuneful, harmonious, pleasant |
| บรรเทา | soothe, relieve, mitigate, palliate, subdue |
| มัว/ไม่ชัด | dim, blurred, hazy, cloudy, fuzzy |
| ไม่สิ้นสุด | endless, everlasting, immortal, ceaseless, permanent |
| บรรพบุรุษ | ancestor, predecessor, forefather, precursor, progenitor |
| ช่วยเหลือ | help, aid, assist, favor, sponsor |
| ผอม | skinny, slim, bony, lanky, emaciated |
| ห่างไกล | remote, distant, faraway, inaccessible, unreachable |
| อ้วน | obese, overweight, stout, plump, chubby |
| น่าอัศจรรย์ | amazing, astounding, astonishing, fabulous, miraculous |
| โง่/บ้า | foolish, silly, stupid, crazy, insane |
| บังคับ | force, oblige, compel, constrain, coerce |
| มีชื่อเสียง | famous, notable, eminent, prominent, distinguished |
| ฉลาด | clever, gifted, talented, wise, smart |
| ซาก | ruins, remains, debris, wreckage, residue |
| สบาย ๆ | relaxed, carefree, lenient, relieved, easygoing |
| ความเครียด | stress, strain, pressure, tension, duress |
| ขาดแคลน | scarce, sparse, scant, deficient, insufficient |
| จริงใจ | sincere, frank, candid, honest, genuine |
| รบกวน | irritate, annoy, bother, disturb, harass |
| โหดร้าย | brutal, cruel, vicious, ruthless, barbaric |
| ธรรมดา | moderate, modest, mediocre, passable, average |
| ครอบคลุม | thorough, comprehensive, exhaustive, complete, total |
| มากเกิน | excess, surplus, overflow, abundance, superfluity |
| สำนึกผิด | remorseful, regretful, sorry, contrite, repentant |
| บรรยาย | define, depict, portray, represent, characterize |
| เลื่อน | delay, defer, postpone, suspend, stall |
| ผิดกฎหมาย | illicit, illegal, unlawful, unauthorized, forbidden |
| อารมณ์ | emotion, feeling, passion, sentiment, sensitivity |
| ประหยัด/รอบคอบ | careful, frugal, economical, thrifty, prudent |
| ช่วงพัก | pause, break, recess, interval, interlude |
| ยกโทษ | forgive, excuse, condone, acquit, exonerate |
| ปฏิเสธ | refute, reject, deny, decline, contradict |
| ทันสมัย | modern, contemporary, up-to-date, stylish, trendy |
| ยอมรับ | accept, admit, approve, consent, acknowledge |
| แปลก | odd, bizarre, strange, eccentric, peculiar |
| โบราณ | ancient, antique, old, prehistoric, antiquated |
| แข็งแรง | strong, robust, firm, healthy, mighty |
| กระชับ | concise, compact, succinct, abridged, brief |
| เปราะบาง | fragile, brittle, delicate, frail, breakable |
| ตำหนิ | blame, condemn, censure, criticize, complain |
| ชื่นชม | praise, applaud, commend, admire, acclaim |
| เจริญ | prosper, thrive, flourish, bloom, grow |
| ห้าม | prohibit, forbid, ban, obstruct, hinder |
| พังทลาย | collapse, crumble, disintegrate, breakdown, fall |
| กระตุ้น | excite, thrill, stimulate, arouse, motivate |
| อุปสรรค | obstacle, barrier, hindrance, impediment, difficulty |
| ดิบ/ไม่ผ่านกระบวนการ | raw, crude, unprocessed, unrefined, natural |
| ยากจน | poor, needy, penniless, impoverished, destitute |
| ศัตรู | enemy, foe, opponent, rival, adversary |
| มีศีลธรรม | moral, ethical, righteous, upright, conscientious |
| เครื่องมือ | device, gadget, appliance, instrument, implement |
| ทำตาม | follow, comply, obey, conform, abide |
| ความขัดแย้ง | conflict, dispute, argument, clash, disagreement |
| เหมาะสม | suitable, appropriate, fitting, proper, relevant |
| คาดการณ์ | predict, forecast, foresee, foretell, anticipate |
| เปิดเผย | reveal, disclose, declare, confess, divulge |
| ละเลย | neglect, ignore, overlook, disregard, forsake |
| กล้าหาญ | brave, bold, fearless, courageous, heroic |
| ขี้ขลาด | scared, fearful, timid, cowardly, fainthearted |
| บังคับใช้/จำเป็น | mandatory, compulsory, obligatory, required, binding |
| สินค้า | goods, wares, products, merchandise, commodities |
| ละเมิด | violate, infringe, offend, breach, transgress |
| จำได้ | recall, remember, recollect, recapture, reminisce |
| เลียนแบบ | imitate, copy, duplicate, replicate, reproduce |
| ปรับปรุง | renew, restore, renovate, reform, reconstruct |
| มีเหตุผล | sensible, rational, logical, reasonable, justified |
| มากมาย | countless, numerous, infinite, unlimited, abundant |
| ความคิดเห็น | view, opinion, attitude, perspective, standpoint |

## ชุดทบทวนคำพื้นฐาน 100 คำ

ability, about, above, abroad, absence, account, ache, acid, across, actual, add, addition, address, adult, advanced, advantage, adventure, adverb, afford, afraid, after, afternoon, afterwards, agreement, ahead, aim, air, aircraft, all, allow, almost, alone, along, altogether, always, among, amount, amuse, angle, angry, animal, ankle, annoy, anxious, any, anyhow, anyone, anything, appoint, approval, approve, arch, arms, army, around, arrange, arrangement, as, ash, ashamed, aside, ask, attempt, attend, attendance, attention, attract, awake, away, awkward, baby, beam, back, begin, beginning, behave, behavior, behind, blade, blame, bleed, bless, blind, brave, bread, breadth, break, breakfast, breath, breathe, breed, brick, burial, burn, burst, bury, bush
`
  }
];

export const A2_READING_CHAPTERS = [
  {
    id: 'a2_reading_intro',
    title: '1. บทนำ Reading',
    content: `
# Reading: อ่านจับใจความให้ทันเวลา

<div class="bg-gradient-to-r from-amber-50 via-orange-50 to-white border-l-4 border-amber-700 p-6 my-6 rounded-r-3xl shadow-sm">
  <div class="text-amber-900 text-4xl font-black leading-tight mb-3">Reading ไม่ได้วัดว่าแปลได้ทุกคำ แต่วัดว่าอ่านแล้วจับประเด็นและหาคำตอบได้ทันเวลา</div>
  <div class="bg-white rounded-2xl border border-amber-100 p-5 text-slate-700 shadow-sm text-xl leading-relaxed">
    เทคนิคสำคัญคืออ่านคำถามก่อน เลือกวิธีอ่านให้ตรงงาน และรู้ว่าคำถามถาม main idea, detail, inference, reference หรือ vocabulary in context
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">4 งานหลักของ Reading</span>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-amber-900">Main Idea</div><div class="text-slate-600 mt-2">หาใจความสำคัญหรือชื่อเรื่อง</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-orange-900">Detail</div><div class="text-slate-600 mt-2">หาข้อมูลเฉพาะจาก passage</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-rose-900">Inference</div><div class="text-slate-600 mt-2">ตีความสิ่งที่ไม่ได้บอกตรง ๆ</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-sky-900">Reference</div><div class="text-slate-600 mt-2">ดู pronoun หรือคำอ้างอิง</div></div>
</div>
`
  },
  {
    id: 'a2_reading_strategy',
    title: '2. Skimming, Scanning และเทคนิคอ่านข้อสอบ',
    content: `
# Skimming, Scanning และเทคนิคอ่านข้อสอบ

## <span class="text-4xl font-black text-slate-900">Skimming vs Scanning</span>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-amber-900 mb-3">Skimming</div>
    <div class="text-slate-700 text-lg leading-relaxed">อ่านเร็วเพื่อหาใจความหลัก ดูชื่อเรื่อง ประโยคแรก ประโยคท้าย และคำซ้ำ</div>
  </div>
  <div class="rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm">
    <div class="text-3xl font-black text-sky-900 mb-3">Scanning</div>
    <div class="text-slate-700 text-lg leading-relaxed">กวาดหาคำเฉพาะ เช่น ชื่อคน วันที่ ตัวเลข สถานที่ หรือ keyword จากคำถาม</div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">ลำดับทำข้อสอบ Reading</span>

<div class="bg-white rounded-3xl border border-slate-200 p-6 my-6 shadow-sm">
  <ol class="list-decimal pl-5 space-y-3 text-slate-700 text-lg leading-relaxed m-0">
    <li>อ่านคำถามก่อนเพื่อรู้ว่าต้องหาอะไร</li>
    <li>วง keyword ในคำถาม</li>
    <li>ใช้ scanning หา paragraph ที่เกี่ยวข้อง</li>
    <li>อ่านประโยคก่อนหน้าและหลัง keyword เพื่อกันตอบผิดบริบท</li>
    <li>ตัดช้อยส์ที่แรงเกินไปหรือไม่ตรง passage</li>
  </ol>
</div>
`
  },
  {
    id: 'a2_reading_questions',
    title: '3. รูปแบบคำถาม Reading ที่ออกบ่อย',
    content: `
# รูปแบบคำถาม Reading ที่ออกบ่อย

<div class="overflow-x-auto my-6 rounded-2xl border-2 border-slate-200 shadow-md">
  <table class="w-full text-left border-collapse bg-white m-0">
    <thead><tr class="bg-amber-700 text-white"><th class="px-4 py-3">คำถาม</th><th class="px-4 py-3">ต้องทำอะไร</th><th class="px-4 py-3">เทคนิค</th></tr></thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-bold">What is the main idea?</td><td class="px-4 py-3">หาใจความหลัก</td><td class="px-4 py-3">ดูทั้ง paragraph ไม่ตอบจากประโยคย่อยเพียงจุดเดียว</td></tr>
      <tr><td class="px-4 py-3 font-bold">What is the best title?</td><td class="px-4 py-3">เลือกชื่อเรื่อง</td><td class="px-4 py-3">ต้องครอบคลุม passage ทั้งหมด</td></tr>
      <tr><td class="px-4 py-3 font-bold">It refers to...</td><td class="px-4 py-3">หา reference</td><td class="px-4 py-3">ย้อนดูคำนามก่อนหน้า</td></tr>
      <tr><td class="px-4 py-3 font-bold">Which is NOT true?</td><td class="px-4 py-3">หาข้อที่ไม่ตรงเรื่อง</td><td class="px-4 py-3">เช็กทุกช้อยส์กับ passage</td></tr>
      <tr><td class="px-4 py-3 font-bold">The word ... means</td><td class="px-4 py-3">เดาศัพท์จากบริบท</td><td class="px-4 py-3">อ่านประโยคก่อนและหลังคำนั้น</td></tr>
    </tbody>
  </table>
</div>

<blockquote>
Reading ที่ดีไม่ใช่อ่านช้าที่สุด แต่คือ <strong>อ่านตรงจุดที่สุด</strong>
</blockquote>
`
  },
  {
    id: 'a2_reading_main_idea_reference_deep',
    title: '4. เทคนิค Main Idea, Reference และคำถาม Reading',
    content: `
# เทคนิค Main Idea, Reference และคำถาม Reading

## ภาพรวม Reading ที่ออกสอบ

Reading มักมี 2 ลักษณะใหญ่: ข้อความจากชีวิตจริง เช่น ประกาศ ตาราง ฉลาก ข่าวสั้น หรือบทอ่านหลายย่อหน้า และ passage ที่มีคำถามต่อเนื่องหลายข้อ

> อ่านให้เหมือนนักสืบ: **ดูคำถามก่อน หา keyword แล้วกลับไปอ่านเฉพาะพื้นที่ที่เกี่ยวข้อง**

## Main Idea: หัวใจของบทอ่าน

Main Idea คือ “ความคิดหลัก” ที่ครอบคลุมทั้งย่อหน้า ไม่กว้างเกินไปและไม่แคบเกินไป

| สิ่งที่โจทย์ถาม | หน้าที่ | วิธีหา |
|---|---|---|
| main idea | ใจความหลัก | ดูประโยคต้น/ท้าย + คำซ้ำ |
| topic | เรื่องที่พูดถึง | มักเป็นคำนามหรือวลีสั้น |
| title | ชื่อเรื่อง | ต้องครอบคลุม passage ทั้งหมด |
| purpose | จุดประสงค์ | ดูว่าผู้เขียนต้องการ inform, persuade, explain, warn หรือ entertain |

## สูตร Topic + Controlling Idea

| ส่วน | คืออะไร | ตัวอย่าง |
|---|---|---|
| Topic | เรื่องหลัก | online learning |
| Controlling idea | ประเด็นที่ผู้เขียนพูดเกี่ยวกับเรื่องนั้น | helps students learn anywhere |
| Main idea | รวมสองส่วน | Online learning helps students learn anywhere. |

## ตำแหน่ง Main Idea ที่เจอบ่อย

| ตำแหน่ง | ลักษณะ |
|---|---|
| ต้นย่อหน้า | ประโยคแรกบอกประเด็น แล้วประโยคต่อไปขยาย |
| ท้ายย่อหน้า | เริ่มด้วยรายละเอียด แล้วสรุปท้าย |
| กลางย่อหน้า | มีประโยคเปลี่ยนประเด็นก่อนสรุป |
| ไม่บอกตรง ๆ | ต้องอนุมานจากรายละเอียดทั้งหมด |

## Reference: it, they, this, those อ้างถึงอะไร

| คำอ้างอิง | วิธีหา | ตัวอย่างแนวคิด |
|---|---|---|
| he, she, they, it | ย้อนกลับ 1-2 ประโยค | ต้องตรงเพศ/จำนวน/ความหมาย |
| this, that, these, those | ดูคำนามหรือแนวคิดก่อนหน้า | อาจแทนทั้งประโยค ไม่ใช่คำเดียว |
| one, ones | ย้อนหาคำนามชนิดเดียวกัน | ใช้แทน noun เพื่อไม่พูดซ้ำ |
| such | ย้อนหาลักษณะหรือเรื่องที่พูดก่อนหน้า | มักแทน “สิ่งแบบนั้น” |
| the following, below, as follows | มองไปข้างหน้า | คำตอบมักอยู่ถัดไป |

## คำถาม Reading ที่ต้องรู้ทัน

| ประเภทคำถาม | ตัวอย่างโจทย์ | วิธีตัดช้อยส์ |
|---|---|---|
| Detail | According to the passage, ... | หาคำใกล้เคียงในบทอ่าน |
| NOT true | Which statement is NOT true? | เช็กทุกช้อยส์ อย่ารีบตอบ |
| Inference | It can be inferred that... | ตอบจากสิ่งที่บทอ่าน “สื่อ” ไม่ใช่เดานอกเรื่อง |
| Vocabulary | The word ... means... | อ่านประโยคก่อนและหลัง |
| Tone | The tone of the passage is... | ดูคำที่ผู้เขียนเลือกใช้ |
| Purpose | The writer wants to... | ดูภาพรวมว่าอธิบาย ชักชวน เตือน หรือเล่า |

## Mini Practice

Passage: Many schools now use online platforms to support learning. These platforms allow students to review lessons, submit assignments, and communicate with teachers after class. However, teachers must guide students to use technology responsibly.

| คำถาม | เฉลย | เหตุผล |
|---|---|---|
| What is the main idea? | Online platforms support learning but need responsible use. | ครอบคลุมทั้งประโยชน์และข้อควรระวัง |
| These platforms refers to... | online platforms | ย้อนกลับไปคำนามก่อนหน้า |
| What can students do on the platforms? | review lessons, submit assignments, communicate | เป็น detail ในประโยคที่สอง |
| The word responsibly means... | in a careful and proper way | ดูบริบทว่าครูต้อง guide การใช้เทคโนโลยี |
| The writer's purpose is to... | explain the use of online platforms | น้ำเสียงให้ข้อมูล ไม่ได้ขายหรือโจมตี |
`
  },
  {
    id: 'a2_reading_practice_real_life',
    title: '5. ฝึกอ่าน Passage และข้อความจริงแบบจับคำตอบ',
    content: `
# ฝึกอ่าน Passage และข้อความจริงแบบจับคำตอบ

## ข้อความจริงที่ออกสอบได้

| ประเภทข้อความ | สิ่งที่ควรอ่านก่อน | คำถามที่ชอบถาม |
|---|---|---|
| Announcement | วัน เวลา สถานที่ ผู้เกี่ยวข้อง | ใครต้องทำอะไร เมื่อไร |
| Advertisement | สินค้า/บริการ ราคา เงื่อนไข | จุดประสงค์และรายละเอียด |
| Notice | ข้อห้าม/คำแนะนำ | ทำได้หรือทำไม่ได้ |
| Schedule | เวลา ลำดับกิจกรรม | กิจกรรมใดเกิดก่อน/หลัง |
| Label | วิธีใช้ คำเตือน ปริมาณ | ใช้อย่างไร ใครไม่ควรใช้ |
| Chart/Table | หัวตาราง หน่วย ตัวเลขสูงสุดต่ำสุด | เปรียบเทียบข้อมูล |

## วิธีอ่าน Passage 10-20 บรรทัด

1. อ่านคำถามก่อนเพื่อรู้เป้าหมาย
2. ขีด keyword ในคำถาม เช่น ชื่อคน ปี ตัวเลข คำเฉพาะ
3. อ่านประโยคแรกและประโยคท้ายเพื่อจับ main idea
4. กลับไปอ่านจุดที่มี keyword อย่างละเอียด
5. ถ้าเป็น inference ให้อ่านบริบทรอบ ๆ อย่าตอบจากความรู้ส่วนตัว

## Practice Passage

Learning a new language takes time and regular practice. Some learners try to memorize long word lists, but they forget many words after a few days. A better method is to use new words in sentences, listen to them in real situations, and review them often. In this way, vocabulary becomes part of communication, not just memory.

| ข้อ | คำถาม | เฉลย | เหตุผล |
|---|---|---|---|
| 1 | What is the best title? | Effective Ways to Learn Vocabulary | ครอบคลุมเนื้อหาทั้งหมด |
| 2 | What is the problem with long word lists? | Learners forget many words quickly. | ระบุในประโยคที่สอง |
| 3 | The word method means... | way | บริบทพูดถึงวิธีที่ดีกว่า |
| 4 | What does them refer to? | new words | ย้อนกลับไปคำนามก่อนหน้า |
| 5 | Which is NOT suggested? | Memorizing only long lists | passage บอกว่าวิธีนี้ไม่ดีพอ |
| 6 | The writer thinks vocabulary should be used for... | communication | ประโยคสุดท้ายชัดเจน |

## เทคนิคตัดช้อยส์ Reading

| ช้อยส์ที่ควรระวัง | เหตุผล |
|---|---|
| มีคำเหมือนใน passage แต่ความหมายคนละทิศ | เป็นช้อยส์ลวงแบบ keyword trap |
| กว้างเกิน | ครอบคลุมเกินเรื่องที่ passage พูด |
| แคบเกิน | เป็นแค่รายละเอียด ไม่ใช่ main idea |
| ใช้คำแรง เช่น always, never, only | ถ้า passage ไม่ได้พูดชัด มักผิด |
| เอาความรู้ภายนอกมาตอบ | Reading ต้องตอบตามบทอ่าน |

> จำประโยคนี้ไว้: **ตอบจาก passage ไม่ตอบจากใจเรา**
`
  },
  {
    id: 'a2_reading_test_5_passages',
    title: '6. แบบทดสอบ Reading: 5 บทความแนวครูผู้ช่วย',
    content: `
# แบบทดสอบ Reading: 5 บทความแนวครูผู้ช่วย

## วิธีใช้บทนี้

อ่านบทความก่อน 1 รอบแบบ skimming แล้วค่อยตอบคำถาม 10 ข้อต่อบทความ ชุดนี้ครอบคลุมแนวที่ออกบ่อย ได้แก่ main idea, best title, detail, inference, reference, vocabulary in context, tone และ purpose

> เทคนิคก่อนเริ่ม: อ่านคำถามก่อน แล้วกลับไปจับคำในบทความ อย่าตอบจากความรู้ส่วนตัว ให้ตอบจาก passage เท่านั้น

## Passage 1: A Community Library After School

**Paragraph 1**

**EN:** In a small district, the public library used to be quiet after school, but it became lively when teachers invited students to use it as a safe learning space.  
TH: ในอำเภอเล็ก ๆ ห้องสมุดประชาชนเคยเงียบหลังเลิกเรียน แต่กลับมีชีวิตชีวาเมื่อครูชวนนักเรียนมาใช้เป็นพื้นที่เรียนรู้อย่างปลอดภัย

**EN:** The project was <mark class="rounded-lg bg-amber-100 px-1.5 py-0.5 font-bold text-amber-900">voluntary</mark>, so students joined because they wanted to learn, not because they were forced.  
TH: โครงการนี้เป็นแบบสมัครใจ ดังนั้นนักเรียนเข้าร่วมเพราะอยากเรียนรู้ ไม่ใช่เพราะถูกบังคับ

**Paragraph 2**

**EN:** At first, some parents worried that the library would take time away from homework.  
TH: ตอนแรกผู้ปกครองบางคนกังวลว่าห้องสมุดจะดึงเวลาไปจากการทำการบ้าน

**EN:** However, teachers explained that the library helped students become more <mark class="rounded-lg bg-sky-100 px-1.5 py-0.5 font-bold text-sky-900">independent</mark> learners.  
TH: อย่างไรก็ตาม ครูอธิบายว่าห้องสมุดช่วยให้นักเรียนเป็นผู้เรียนที่พึ่งพาตนเองได้มากขึ้น

**Paragraph 3**

**EN:** After three months, teachers noticed that students asked better questions in class and used more <mark class="rounded-lg bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-900">evidence</mark> when giving opinions.  
TH: หลังจากสามเดือน ครูสังเกตว่านักเรียนถามคำถามในชั้นเรียนได้ดีขึ้น และใช้หลักฐานมากขึ้นเมื่อแสดงความคิดเห็น

**EN:** The library did not solve every learning problem, but it created a habit of reading beyond textbooks.  
TH: ห้องสมุดไม่ได้แก้ปัญหาการเรียนรู้ได้ทุกเรื่อง แต่สร้างนิสัยการอ่านที่ไปไกลกว่าหนังสือเรียน

### คำศัพท์น่าสนใจ

| คำ | ความหมาย | จำในบริบท |
|---|---|---|
| voluntary | สมัครใจ | ทำเพราะอยากทำ ไม่ได้ถูกบังคับ |
| independent | พึ่งพาตนเองได้ | learner ที่เรียนรู้ด้วยตัวเอง |
| evidence | หลักฐาน | ใช้สนับสนุนความคิดเห็น |
| habit | นิสัย | สิ่งที่ทำสม่ำเสมอ |

### Questions 1-10

<div class="space-y-4 my-6">
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">1</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the best title for this passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. How to Build a New Library</div><div>B. A Library That Supports Student Learning</div><div>C. The Problem of Homework</div><div>D. Local History in Small Districts</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">2</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What was the library like after school before the project?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Crowded</div><div>B. Noisy</div><div>C. Quiet</div><div>D. Dangerous</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">3</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "voluntary" is closest in meaning to _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. required</div><div>B. free to choose</div><div>C. expensive</div><div>D. official</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">4</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Why did some parents worry at first?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. They thought students would spend less time on homework.</div><div>B. They wanted students to stop reading.</div><div>C. They believed the library was unsafe.</div><div>D. They did not like local history.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">5</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What does "it" in paragraph 2 refer to?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. homework</div><div>B. the library</div><div>C. local history</div><div>D. a suitable book</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">6</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which statement is TRUE?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Students were forced to join the project.</div><div>B. The library replaced homework.</div><div>C. Students used more evidence after joining the project.</div><div>D. Parents immediately stopped the project.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">7</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What can be inferred from the passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Reading activities can improve classroom participation.</div><div>B. Homework is not useful for students.</div><div>C. Libraries should be open only to older students.</div><div>D. Students dislike reading textbooks.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">8</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "habit" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. a regular practice</div><div>B. a school rule</div><div>C. a punishment</div><div>D. a short test</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">9</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The writer's tone is _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. angry</div><div>B. supportive</div><div>C. humorous</div><div>D. doubtful</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-black">10</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the main purpose of the passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. To explain how a library program helped students learn</div><div>B. To compare two libraries</div><div>C. To advertise books for sale</div><div>D. To criticize parents</div></div></div></div></div>
</div>

<details class="rounded-3xl border border-amber-200 bg-amber-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-amber-900">เปิด/ปิดเฉลย Passage 1 แบบละเอียด</summary><div class="mt-5 space-y-4">
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">1</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย B</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> ชื่อเรื่องที่ดีที่สุดของบทความนี้คืออะไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามภาพรวมทั้งเรื่องแบบ best title ต้องเลือกชื่อที่ครอบคลุมทุกย่อหน้า</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> บทความเล่าว่าห้องสมุดหลังเลิกเรียนช่วยให้นักเรียนอ่าน คิด ถาม และใช้หลักฐานดีขึ้น จึงตรงกับ "A Library That Supports Student Learning" มากที่สุด</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">2</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย C</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> ก่อนเริ่มโครงการ ห้องสมุดหลังเลิกเรียนเป็นอย่างไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามรายละเอียดตรงจากย่อหน้าแรก</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ประโยคแรกบอกชัดว่า "the public library used to be quiet after school" จึงตอบ Quiet</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">3</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย B</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> คำว่า "voluntary" มีความหมายใกล้เคียงกับคำใดมากที่สุด</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามศัพท์จากบริบท vocabulary in context</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ประโยคถัดไปอธิบายว่า students joined because they wanted to learn, not because they were forced จึงหมายถึงสมัครใจหรือเลือกได้เอง</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">4</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย A</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> ทำไมผู้ปกครองบางคนจึงกังวลในตอนแรก</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามเหตุผลจากข้อความในย่อหน้า 2</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ย่อหน้า 2 ระบุว่า parents worried that the library would take time away from homework จึงตอบว่ากลัวนักเรียนใช้เวลาทำการบ้านน้อยลง</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">5</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย B</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> คำว่า "it" ในย่อหน้า 2 หมายถึงอะไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถาม reference ให้ย้อนดูคำนามก่อนหน้า</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ในประโยค "the library helped students..." คำว่า it ในบริบทนี้ชี้กลับไปที่ the library ไม่ใช่ homework หรือ local history</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">6</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย C</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> ข้อใดเป็นจริงตามบทความ</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามข้อมูลถูกผิดแบบ TRUE statement</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ย่อหน้า 3 บอกว่า students used more evidence when giving opinions จึงตรงกับตัวเลือก C</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">7</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย A</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> จากบทความ สามารถสรุปโดยนัยได้ว่าอะไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถาม inference คือไม่ได้พูดตรง ๆ แต่สรุปได้จากผลที่เกิดขึ้น</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> เมื่อนักเรียนถามคำถามดีขึ้นและใช้หลักฐานมากขึ้น แปลว่ากิจกรรมอ่านช่วยให้มีส่วนร่วมในห้องเรียนดีขึ้น</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">8</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย A</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> คำว่า "habit" หมายถึงอะไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถามความหมายศัพท์พื้นฐานในบริบท</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> habit คือสิ่งที่ทำเป็นประจำหรือพฤติกรรมที่เกิดซ้ำ จึงตรงกับ a regular practice</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">9</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย B</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> น้ำเสียงของผู้เขียนเป็นอย่างไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถาม tone หรือท่าทีของผู้เขียนต่อโครงการ</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ผู้เขียนเล่าผลดีของโครงการ เช่น ถามดีขึ้น ใช้หลักฐานมากขึ้น และสร้างนิสัยอ่าน จึงเป็นน้ำเสียงสนับสนุน</p></div></div>
  <div class="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-white font-black">10</span><span class="rounded-full bg-green-100 px-3 py-1 font-black text-green-800">เฉลย A</span></div><div class="mt-3 text-slate-700 leading-relaxed"><p class="m-0"><strong>แปลคำถาม:</strong> จุดประสงค์หลักของบทความคืออะไร</p><p class="m-0 mt-2"><strong>ถามอะไร:</strong> ถาม purpose ว่าผู้เขียนเขียนเพื่ออะไร</p><p class="m-0 mt-2"><strong>ทำไมตอบข้อนี้:</strong> ทั้งบทความอธิบายลำดับว่าโครงการห้องสมุดเกิดขึ้นอย่างไร ผู้ปกครองกังวลอะไร และสุดท้ายช่วยการเรียนรู้ของนักเรียนอย่างไร จึงตอบ A</p></div></div>
</div></details>

---

## Passage 2: Technology for Inclusive Learning

**Paragraph 1**

**EN:** A Grade 5 teacher noticed that some students rarely answered questions, not because they were lazy, but because they needed more time to organize their ideas.  
TH: ครูชั้นประถมศึกษาปีที่ 5 สังเกตว่านักเรียนบางคนแทบไม่ตอบคำถาม ไม่ใช่เพราะเกียจคร้าน แต่เพราะต้องใช้เวลามากขึ้นในการจัดความคิด

**EN:** She began using a simple digital board where students could type short responses before speaking.  
TH: ครูจึงเริ่มใช้กระดานดิจิทัลแบบง่ายให้นักเรียนพิมพ์คำตอบสั้น ๆ ก่อนพูด

**Paragraph 2**

**EN:** This tool made the classroom more <mark class="rounded-lg bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-900">inclusive</mark> because quiet students could participate without feeling rushed.  
TH: เครื่องมือนี้ทำให้ชั้นเรียนเปิดกว้างต่อผู้เรียนมากขึ้น เพราะนักเรียนที่เงียบสามารถมีส่วนร่วมโดยไม่รู้สึกเร่งรีบ

**EN:** The teacher used technology to <mark class="rounded-lg bg-violet-100 px-1.5 py-0.5 font-bold text-violet-900">remove barriers</mark> that prevented students from showing what they understood.  
TH: ครูใช้เทคโนโลยีเพื่อลดอุปสรรคที่ขัดขวางนักเรียนไม่ให้แสดงสิ่งที่ตนเข้าใจ

**Paragraph 3**

**EN:** After several weeks, more students joined discussions, and the teacher collected their written responses to see common <mark class="rounded-lg bg-rose-100 px-1.5 py-0.5 font-bold text-rose-900">misunderstandings</mark>.  
TH: หลังจากหลายสัปดาห์ นักเรียนมีส่วนร่วมในการอภิปรายมากขึ้น และครูเก็บคำตอบที่เขียนไว้เพื่อดูความเข้าใจผิดที่พบบ่อย

**EN:** The digital board was not the lesson itself; it was a bridge between thinking and speaking.  
TH: กระดานดิจิทัลไม่ใช่บทเรียนในตัวมันเอง แต่เป็นสะพานเชื่อมระหว่างการคิดกับการพูด

### คำศัพท์น่าสนใจ

| คำ | ความหมาย | จำในบริบท |
|---|---|---|
| inclusive | เปิดโอกาสให้ทุกคนมีส่วนร่วม | classroom for all learners |
| remove barriers | ลดอุปสรรค | ทำให้เข้าถึงการเรียนได้มากขึ้น |
| rushed | เร่งรีบ | ไม่มีเวลาคิด |
| misunderstanding | ความเข้าใจผิด | สิ่งที่ครูต้องตรวจพบและแก้ไข |

### Questions 11-20

<div class="space-y-4 my-6">
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">11</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Why did some students rarely answer questions?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. They were lazy.</div><div>B. They needed more time to organize ideas.</div><div>C. They disliked technology.</div><div>D. They did not understand any lesson.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">12</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What tool did the teacher use?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. A digital board</div><div>B. A school newspaper</div><div>C. A science kit</div><div>D. A printed dictionary</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">13</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "inclusive" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. expensive</div><div>B. open to different learners</div><div>C. difficult to use</div><div>D. unrelated to class</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">14</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">How did the digital board help quiet students?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. It let them prepare responses before speaking.</div><div>B. It gave them higher scores automatically.</div><div>C. It replaced all classroom discussion.</div><div>D. It allowed them to skip lessons.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">15</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What does "This tool" refer to?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. the digital board</div><div>B. the textbook</div><div>C. the school bell</div><div>D. the homework</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">16</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which statement is NOT true?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. The teacher used technology to remove barriers.</div><div>B. The teacher collected written responses.</div><div>C. The digital board was described as a bridge.</div><div>D. Technology was used only as decoration.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">17</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The phrase "remove barriers" is closest in meaning to _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. create problems</div><div>B. reduce obstacles</div><div>C. hide answers</div><div>D. punish students</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">18</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What can be inferred about the teacher?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. She used technology with a clear purpose.</div><div>B. She wanted students to stop speaking.</div><div>C. She believed quiet students had no ideas.</div><div>D. She avoided checking misunderstandings.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">19</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the main idea of the passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Digital tools are always better than teachers.</div><div>B. Technology can support participation when used to solve learning problems.</div><div>C. Students should type instead of read.</div><div>D. Speaking skills are not important.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-black">20</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The writer's purpose is to _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. warn schools to ban technology</div><div>B. show how technology can support inclusive learning</div><div>C. advertise a digital board brand</div><div>D. compare Grade 5 and Grade 6 students</div></div></div></div></div>
</div>

<details class="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-emerald-900">เปิด/ปิดเฉลย Passage 2</summary><div class="mt-4 overflow-x-auto"><table class="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden"><thead><tr class="bg-emerald-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">อธิบาย</th></tr></thead><tbody class="divide-y divide-emerald-100 text-slate-800"><tr><td class="px-4 py-3">11</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ย่อหน้าแรกระบุว่าพวกเขาต้องใช้เวลาจัดความคิด</td></tr><tr><td class="px-4 py-3">12</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ครูใช้ simple digital board</td></tr><tr><td class="px-4 py-3">13</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">inclusive คือเปิดโอกาสให้ผู้เรียนหลายแบบมีส่วนร่วม</td></tr><tr><td class="px-4 py-3">14</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">นักเรียนพิมพ์คำตอบก่อนพูดได้</td></tr><tr><td class="px-4 py-3">15</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">This tool หมายถึง digital board</td></tr><tr><td class="px-4 py-3">16</td><td class="px-4 py-3 font-bold">D</td><td class="px-4 py-3">บทความไม่ได้บอกว่าใช้เพื่อ decoration แต่ใช้เพื่อแก้ปัญหา</td></tr><tr><td class="px-4 py-3">17</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">remove barriers คือกำจัด/ลดอุปสรรค</td></tr><tr><td class="px-4 py-3">18</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ครูใช้เทคโนโลยีเพื่อแก้ปัญหาการมีส่วนร่วม</td></tr><tr><td class="px-4 py-3">19</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ใจความหลักคือเทคโนโลยีช่วยการมีส่วนร่วมเมื่อใช้แก้ปัญหาจริง</td></tr><tr><td class="px-4 py-3">20</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ผู้เขียนต้องการแสดงตัวอย่าง inclusive learning</td></tr></tbody></table></div></details>

---

## Passage 3: The School Garden Project

**Paragraph 1**

**EN:** A rural school started a garden project to connect science lessons with students' daily lives.  
TH: โรงเรียนชนบทแห่งหนึ่งเริ่มโครงการสวนผักเพื่อเชื่อมบทเรียนวิทยาศาสตร์กับชีวิตประจำวันของนักเรียน

**EN:** Each group planned what to grow, measured the soil, and recorded how much water each plant needed.  
TH: นักเรียนแต่ละกลุ่มวางแผนว่าจะปลูกอะไร วัดสภาพดิน และบันทึกว่าพืชแต่ละชนิดต้องการน้ำเท่าไร

**Paragraph 2**

**EN:** The teacher wanted students to see that science was not only a subject in a textbook but also a way to solve <mark class="rounded-lg bg-lime-100 px-1.5 py-0.5 font-bold text-lime-900">practical</mark> problems.  
TH: ครูต้องการให้นักเรียนเห็นว่าวิทยาศาสตร์ไม่ใช่แค่วิชาในหนังสือ แต่เป็นวิธีแก้ปัญหาที่ใช้ได้จริง

**EN:** When some plants died, the teacher did not blame the students; instead, she asked them to <mark class="rounded-lg bg-orange-100 px-1.5 py-0.5 font-bold text-orange-900">investigate</mark> possible causes.  
TH: เมื่อพืชบางต้นตาย ครูไม่ได้ตำหนินักเรียน แต่ให้พวกเขาสืบหาสาเหตุที่เป็นไปได้

**Paragraph 3**

**EN:** By the end of the term, students harvested vegetables and shared them with the school kitchen.  
TH: เมื่อสิ้นภาคเรียน นักเรียนเก็บเกี่ยวผักและแบ่งให้ครัวของโรงเรียน

**EN:** The garden became a <mark class="rounded-lg bg-green-100 px-1.5 py-0.5 font-bold text-green-900">living classroom</mark> where mistakes were treated as part of learning.  
TH: สวนผักกลายเป็นห้องเรียนมีชีวิตที่มองความผิดพลาดเป็นส่วนหนึ่งของการเรียนรู้

### คำศัพท์น่าสนใจ

| คำ | ความหมาย | จำในบริบท |
|---|---|---|
| practical | ใช้ได้จริง | ไม่ใช่แค่ทฤษฎี |
| investigate | สืบหา/ตรวจสอบ | หาสาเหตุของปัญหา |
| harvest | เก็บเกี่ยว | เก็บผลผลิต |
| living classroom | ห้องเรียนมีชีวิต | พื้นที่จริงที่เรียนรู้ผ่านการลงมือทำ |

### Questions 21-30

<div class="space-y-4 my-6">
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">21</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Why did the school start the garden project?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. To sell vegetables to other schools</div><div>B. To connect science lessons with daily life</div><div>C. To replace all science textbooks</div><div>D. To train students to become farmers only</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">22</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What did students record?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. The price of vegetables</div><div>B. The amount of water each plant needed</div><div>C. The number of teachers in school</div><div>D. The names of insects only</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">23</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "practical" is closest in meaning to _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. useful in real situations</div><div>B. imaginary</div><div>C. very expensive</div><div>D. unrelated</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">24</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What did the teacher do when some plants died?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. She blamed the students.</div><div>B. She ended the project.</div><div>C. She asked students to investigate causes.</div><div>D. She bought new plants without discussion.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">25</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What does "them" in paragraph 2 refer to?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. teachers</div><div>B. students</div><div>C. insects</div><div>D. vegetables</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">26</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which statement is TRUE?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. The project taught responsibility.</div><div>B. Students never made mistakes.</div><div>C. The teacher ignored evidence.</div><div>D. The garden had no connection to science.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">27</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What can be inferred from the passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Mistakes can become learning opportunities.</div><div>B. Hot weather makes learning impossible.</div><div>C. Students should avoid group work.</div><div>D. Science is useful only in laboratories.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">28</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The phrase "living classroom" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. a classroom with no teacher</div><div>B. a real environment where students learn by doing</div><div>C. a room used only for reading</div><div>D. a garden that replaces the school</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">29</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the writer's attitude toward the project?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. positive</div><div>B. angry</div><div>C. confused</div><div>D. negative</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-700 text-white text-lg font-black">30</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the main idea?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Gardening is easier than science.</div><div>B. A garden project can teach science, responsibility, and evidence-based thinking.</div><div>C. Rural schools should stop using textbooks.</div><div>D. Students should eat more vegetables.</div></div></div></div></div>
</div>

<details class="rounded-3xl border border-lime-200 bg-lime-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-lime-900">เปิด/ปิดเฉลย Passage 3</summary><div class="mt-4 overflow-x-auto"><table class="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden"><thead><tr class="bg-lime-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">อธิบาย</th></tr></thead><tbody class="divide-y divide-lime-100 text-slate-800"><tr><td class="px-4 py-3">21</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ประโยคแรกบอกว่า connect science lessons with daily lives</td></tr><tr><td class="px-4 py-3">22</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">นักเรียน recorded how much water each plant needed</td></tr><tr><td class="px-4 py-3">23</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">practical คือใช้ได้จริงในสถานการณ์จริง</td></tr><tr><td class="px-4 py-3">24</td><td class="px-4 py-3 font-bold">C</td><td class="px-4 py-3">ครูให้ investigate possible causes</td></tr><tr><td class="px-4 py-3">25</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">them อ้างถึง students</td></tr><tr><td class="px-4 py-3">26</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">โครงการสอน responsibility จากการดูแลสวน</td></tr><tr><td class="px-4 py-3">27</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ตอนท้ายบอกว่า mistakes were treated as part of learning</td></tr><tr><td class="px-4 py-3">28</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">living classroom คือพื้นที่จริงที่เรียนรู้ผ่านการลงมือทำ</td></tr><tr><td class="px-4 py-3">29</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">น้ำเสียงเชิงบวกต่อผลของโครงการ</td></tr><tr><td class="px-4 py-3">30</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ครอบคลุมวิทยาศาสตร์ ความรับผิดชอบ และการใช้หลักฐาน</td></tr></tbody></table></div></details>

---

## Passage 4: Feedback That Helps Students Grow

**Paragraph 1**

**EN:** In one classroom, a teacher changed the way she gave feedback on writing assignments.  
TH: ในห้องเรียนหนึ่ง ครูเปลี่ยนวิธีให้ข้อเสนอแนะในงานเขียน

**EN:** Instead of writing only a score at the top of the paper, she wrote two strengths and one clear suggestion for improvement.  
TH: แทนที่จะเขียนเพียงคะแนนด้านบนของกระดาษ ครูเขียนจุดแข็งสองข้อและข้อเสนอแนะที่ชัดเจนหนึ่งข้อเพื่อการพัฒนา

**Paragraph 2**

**EN:** Her goal was to make feedback <mark class="rounded-lg bg-rose-100 px-1.5 py-0.5 font-bold text-rose-900">constructive</mark>, not discouraging.  
TH: เป้าหมายของครูคือทำให้ข้อเสนอแนะเป็นไปเพื่อสร้างสรรค์ ไม่ใช่ทำให้นักเรียนท้อใจ

**EN:** To change the habit of looking only at scores, she asked students to <mark class="rounded-lg bg-indigo-100 px-1.5 py-0.5 font-bold text-indigo-900">revise</mark> one paragraph before receiving the final mark.  
TH: เพื่อเปลี่ยนนิสัยการมองแต่คะแนน ครูให้นักเรียนแก้ไขหนึ่งย่อหน้าก่อนรับคะแนนสุดท้าย

**Paragraph 3**

**EN:** Over time, students began to ask specific questions such as, "How can I make this sentence clearer?"  
TH: เมื่อเวลาผ่านไป นักเรียนเริ่มถามคำถามเฉพาะ เช่น “ฉันจะทำให้ประโยคนี้ชัดเจนขึ้นได้อย่างไร”

**EN:** Feedback became part of the learning cycle, not the end of learning.  
TH: ข้อเสนอแนะกลายเป็นส่วนหนึ่งของวงจรการเรียนรู้ ไม่ใช่จุดจบของการเรียนรู้

### คำศัพท์น่าสนใจ

| คำ | ความหมาย | จำในบริบท |
|---|---|---|
| constructive | เชิงสร้างสรรค์ | feedback ที่ช่วยให้ดีขึ้น |
| discouraging | ทำให้ท้อใจ | ตรงข้ามกับ constructive |
| revise | แก้ไข/ปรับปรุง | ทำงานเดิมให้ดีขึ้น |
| learning cycle | วงจรการเรียนรู้ | เรียน-รับ feedback-แก้ไข-พัฒนา |

### Questions 31-40

<div class="space-y-4 my-6">
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">31</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What did the teacher change?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. The school schedule</div><div>B. The way she gave feedback</div><div>C. The classroom size</div><div>D. The textbook</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">32</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What did she write on students' papers?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Only a final score</div><div>B. Two strengths and one suggestion</div><div>C. A list of punishments</div><div>D. The same comment for everyone</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">33</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "constructive" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. helping improvement</div><div>B. making students afraid</div><div>C. unrelated to learning</div><div>D. impossible to understand</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">34</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Why did the teacher ask students to revise one paragraph?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. To make them ignore comments</div><div>B. To help them use feedback before final marks</div><div>C. To reduce the number of assignments</div><div>D. To stop writing practice</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">35</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What does "she" in paragraph 2 refer to?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. a student</div><div>B. a parent</div><div>C. the teacher</div><div>D. a writer</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">36</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which question shows students became more active learners?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. "What is my score?"</div><div>B. "How can I make this sentence clearer?"</div><div>C. "Can I skip the assignment?"</div><div>D. "Why do we write?"</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">37</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which statement is NOT true?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Students' writing improved.</div><div>B. Feedback became part of the learning cycle.</div><div>C. The teacher wanted feedback to discourage students.</div><div>D. Students revised work before final marks.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">38</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What can be inferred?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Feedback is more useful when students act on it.</div><div>B. Scores alone always improve writing.</div><div>C. Students should never receive suggestions.</div><div>D. Teachers should avoid comments.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">39</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "specific" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. clear and particular</div><div>B. very general</div><div>C. impossible</div><div>D. careless</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white text-lg font-black">40</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the best main idea?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Writing assignments should have no scores.</div><div>B. Constructive feedback helps students improve when they revise their work.</div><div>C. Students should write only one paragraph.</div><div>D. Teachers should not read assignments.</div></div></div></div></div>
</div>

<details class="rounded-3xl border border-rose-200 bg-rose-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-rose-900">เปิด/ปิดเฉลย Passage 4</summary><div class="mt-4 overflow-x-auto"><table class="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden"><thead><tr class="bg-rose-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">อธิบาย</th></tr></thead><tbody class="divide-y divide-rose-100 text-slate-800"><tr><td class="px-4 py-3">31</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ประโยคแรกระบุว่า changed the way she gave feedback</td></tr><tr><td class="px-4 py-3">32</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">เขียน two strengths and one suggestion</td></tr><tr><td class="px-4 py-3">33</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">constructive คือช่วยพัฒนา/ปรับปรุง</td></tr><tr><td class="px-4 py-3">34</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ให้นักเรียนใช้ feedback ก่อนรับ final mark</td></tr><tr><td class="px-4 py-3">35</td><td class="px-4 py-3 font-bold">C</td><td class="px-4 py-3">she หมายถึง teacher</td></tr><tr><td class="px-4 py-3">36</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">คำถามนี้แสดงว่านักเรียนอยากปรับงานให้ดีขึ้นอย่างเฉพาะเจาะจง</td></tr><tr><td class="px-4 py-3">37</td><td class="px-4 py-3 font-bold">C</td><td class="px-4 py-3">ครูต้องการ constructive ไม่ใช่ discouraging</td></tr><tr><td class="px-4 py-3">38</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">นักเรียนดีขึ้นเพราะลงมือ revise ตาม feedback</td></tr><tr><td class="px-4 py-3">39</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">specific คือเฉพาะเจาะจง ชัดเจน</td></tr><tr><td class="px-4 py-3">40</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ใจความหลักคือ constructive feedback + revision ช่วยพัฒนางานเขียน</td></tr></tbody></table></div></details>

---

## Passage 5: Teacher Learning Circles

**Paragraph 1**

**EN:** New teachers often face problems that are not written in training books, such as managing mixed-ability classes or communicating with worried parents.  
TH: ครูใหม่มักเจอปัญหาที่ไม่ได้เขียนไว้ในหนังสือฝึกอบรม เช่น การจัดการชั้นเรียนที่มีความสามารถหลากหลาย หรือการสื่อสารกับผู้ปกครองที่กังวล

**EN:** For this reason, one school created a teacher learning circle that met every Friday afternoon.  
TH: ด้วยเหตุนี้ โรงเรียนแห่งหนึ่งจึงสร้างวงเรียนรู้ของครูที่พบกันทุกบ่ายวันศุกร์

**Paragraph 2**

**EN:** The meetings were <mark class="rounded-lg bg-blue-100 px-1.5 py-0.5 font-bold text-blue-900">collaborative</mark>, not competitive.  
TH: การประชุมเป็นแบบร่วมมือกัน ไม่ใช่แข่งขันกัน

**EN:** Teachers were encouraged to talk about mistakes because mistakes showed where support was needed.  
TH: ครูได้รับการสนับสนุนให้พูดถึงความผิดพลาด เพราะความผิดพลาดแสดงให้เห็นว่าจุดใดต้องการการสนับสนุน

**Paragraph 3**

**EN:** After one semester, new teachers reported that they felt less <mark class="rounded-lg bg-cyan-100 px-1.5 py-0.5 font-bold text-cyan-900">isolated</mark> and more confident.  
TH: หลังหนึ่งภาคเรียน ครูใหม่รายงานว่ารู้สึกโดดเดี่ยวน้อยลงและมั่นใจมากขึ้น

**EN:** The learning circle reminded teachers that professional growth is a <mark class="rounded-lg bg-purple-100 px-1.5 py-0.5 font-bold text-purple-900">continuous</mark> process.  
TH: วงเรียนรู้นี้เตือนครูว่าการเติบโตทางวิชาชีพเป็นกระบวนการต่อเนื่อง

### คำศัพท์น่าสนใจ

| คำ | ความหมาย | จำในบริบท |
|---|---|---|
| mixed-ability | ความสามารถหลากหลาย | ห้องเรียนที่เด็กเก่งไม่เท่ากัน |
| collaborative | แบบร่วมมือกัน | ทำงานร่วม ไม่แข่งขัน |
| isolated | โดดเดี่ยว | รู้สึกอยู่ลำพัง |
| continuous | ต่อเนื่อง | ไม่จบในครั้งเดียว |

### Questions 41-50

<div class="space-y-4 my-6">
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">41</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What problem do new teachers often face?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Problems not written in training books</div><div>B. Too many empty classrooms</div><div>C. No students in school</div><div>D. Too much free time</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">42</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">When did the teacher learning circle meet?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Every Monday morning</div><div>B. Every Friday afternoon</div><div>C. Once a year</div><div>D. Every night</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">43</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What did teachers discuss in each meeting?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. One classroom problem and a useful strategy</div><div>B. Personal shopping lists</div><div>C. Student grades only</div><div>D. School lunch menus</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">44</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "collaborative" means _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. done together</div><div>B. done secretly</div><div>C. done for competition</div><div>D. done without purpose</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">45</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Why were teachers encouraged to talk about mistakes?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. To blame new teachers</div><div>B. To show where support was needed</div><div>C. To make meetings longer</div><div>D. To avoid teaching</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">46</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What does "they" in paragraph 3 refer to?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. worried parents</div><div>B. training books</div><div>C. new teachers</div><div>D. guiding questions</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">47</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">Which statement is TRUE?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. New teachers felt more isolated after one semester.</div><div>B. Teachers tried more varied teaching methods.</div><div>C. The meetings were competitive.</div><div>D. Mistakes were not discussed.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">48</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">The word "continuous" is closest in meaning to _____.</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. ongoing</div><div>B. finished</div><div>C. sudden</div><div>D. optional</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">49</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What can be inferred from the passage?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Peer support can improve teacher confidence.</div><div>B. Teachers should solve all problems alone.</div><div>C. Professional growth ends after training.</div><div>D. Friday meetings are always unnecessary.</div></div></div></div></div>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="flex gap-4 items-start"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-black">50</div><div class="flex-1"><div class="text-xl font-bold text-slate-900">What is the main idea?</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-lg text-slate-700"><div>A. Teacher learning circles support professional growth through shared reflection.</div><div>B. New teachers should avoid parents.</div><div>C. Training books solve every classroom problem.</div><div>D. Competition is the best way to develop teachers.</div></div></div></div></div>
</div>

<details class="rounded-3xl border border-blue-200 bg-blue-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-blue-900">เปิด/ปิดเฉลย Passage 5</summary><div class="mt-4 overflow-x-auto"><table class="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden"><thead><tr class="bg-blue-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">อธิบาย</th></tr></thead><tbody class="divide-y divide-blue-100 text-slate-800"><tr><td class="px-4 py-3">41</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ประโยคแรกบอกว่า problems not written in training books</td></tr><tr><td class="px-4 py-3">42</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">met every Friday afternoon</td></tr><tr><td class="px-4 py-3">43</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ครูอภิปราย classroom problem และ shared strategy</td></tr><tr><td class="px-4 py-3">44</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">collaborative คือทำร่วมกันแบบร่วมมือ</td></tr><tr><td class="px-4 py-3">45</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">mistakes showed where support was needed</td></tr><tr><td class="px-4 py-3">46</td><td class="px-4 py-3 font-bold">C</td><td class="px-4 py-3">they อ้างถึง new teachers</td></tr><tr><td class="px-4 py-3">47</td><td class="px-4 py-3 font-bold">B</td><td class="px-4 py-3">ครูลองวิธีสอนที่หลากหลายขึ้น</td></tr><tr><td class="px-4 py-3">48</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">continuous คือ ongoing หรือต่อเนื่อง</td></tr><tr><td class="px-4 py-3">49</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">สรุปได้จากการที่ครูรู้สึกโดดเดี่ยวน้อยลงและมั่นใจมากขึ้น</td></tr><tr><td class="px-4 py-3">50</td><td class="px-4 py-3 font-bold">A</td><td class="px-4 py-3">ครอบคลุม learning circle, shared reflection และ professional growth</td></tr></tbody></table></div></details>
`
  }
];

export const A2_CONVERSATION_CHAPTERS = [
  {
    id: 'a2_conversation_intro',
    title: '1. บทนำ Conversation',
    content: `
# บทนำ Conversation: อ่านสถานการณ์ให้ขาด เลือกคำตอบให้ลื่น

<div class="rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-sky-50 p-7 my-6 shadow-sm">
  <div class="text-rose-900 text-4xl md:text-5xl font-black leading-tight mb-4">Conversation ไม่ได้วัดแค่แปลออก แต่วัดว่า “ตอบให้เหมาะกับสถานการณ์” ได้ไหม</div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <div class="rounded-3xl bg-white border border-rose-100 p-5 shadow-sm"><div class="text-sm font-black tracking-widest text-rose-600 uppercase">STEP 1</div><div class="text-2xl font-black text-slate-900 mt-2">ดูสถานการณ์</div><div class="text-slate-700 mt-2">ใครพูดกับใคร อยู่ที่ไหน และเกิดอะไรขึ้น</div></div>
    <div class="rounded-3xl bg-white border border-violet-100 p-5 shadow-sm"><div class="text-sm font-black tracking-widest text-violet-600 uppercase">STEP 2</div><div class="text-2xl font-black text-slate-900 mt-2">ดูหน้าที่ภาษา</div><div class="text-slate-700 mt-2">กำลังทักทาย ขอร้อง ขอโทษ ขอบคุณ เสนอช่วย หรือให้คำแนะนำ</div></div>
    <div class="rounded-3xl bg-white border border-sky-100 p-5 shadow-sm"><div class="text-sm font-black tracking-widest text-sky-600 uppercase">STEP 3</div><div class="text-2xl font-black text-slate-900 mt-2">ดูความลื่น</div><div class="text-slate-700 mt-2">คำตอบต้องต่อบทสนทนาได้พอดี สุภาพ และไม่เปลี่ยนเรื่อง</div></div>
  </div>
</div>

## <span class="text-4xl font-black text-slate-900">Function ที่ออกบ่อยในข้อสอบ</span>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-rose-900">Greeting</div><div class="text-slate-600 mt-2">ทักทาย ถามสารทุกข์สุขดิบ</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-pink-900">Request</div><div class="text-slate-600 mt-2">ขอร้องหรือขออนุญาต</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-violet-900">Offering Help</div><div class="text-slate-600 mt-2">เสนอความช่วยเหลือ</div></div>
  <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm"><div class="text-2xl font-black text-sky-900">Opinion</div><div class="text-slate-600 mt-2">เห็นด้วย ไม่เห็นด้วย เสนอความเห็น</div></div>
</div>

## <span class="text-4xl font-black text-slate-900">สำนวนสนทนาที่ต้องจำ</span>

<div class="overflow-x-auto my-6 rounded-2xl border-2 border-slate-200 shadow-md">
  <table class="w-full text-left border-collapse bg-white m-0">
    <thead><tr class="bg-rose-700 text-white"><th class="px-4 py-3">สถานการณ์</th><th class="px-4 py-3">ประโยคที่ใช้ได้</th><th class="px-4 py-3">ความหมาย</th></tr></thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-bold">Greeting</td><td class="px-4 py-3">How have you been?</td><td class="px-4 py-3">เป็นอย่างไรบ้าง</td></tr>
      <tr><td class="px-4 py-3 font-bold">Offering help</td><td class="px-4 py-3">Can I give you a hand?</td><td class="px-4 py-3">ให้ฉันช่วยไหม</td></tr>
      <tr><td class="px-4 py-3 font-bold">Request</td><td class="px-4 py-3">Could you please explain it again?</td><td class="px-4 py-3">ช่วยอธิบายอีกครั้งได้ไหม</td></tr>
      <tr><td class="px-4 py-3 font-bold">Agreement</td><td class="px-4 py-3">I couldn't agree more.</td><td class="px-4 py-3">เห็นด้วยอย่างยิ่ง</td></tr>
      <tr><td class="px-4 py-3 font-bold">Apology</td><td class="px-4 py-3">I'm sorry for being late.</td><td class="px-4 py-3">ขอโทษเพราะมาสาย</td></tr>
    </tbody>
  </table>
</div>

## <span class="text-4xl font-black text-slate-900">Classroom English สำหรับครู</span>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Please open your books to page ten.</div><div class="text-slate-600 mt-1">เปิดหนังสือหน้า 10</div></div>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Work in pairs.</div><div class="text-slate-600 mt-1">ทำงานเป็นคู่</div></div>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Raise your hand before answering.</div><div class="text-slate-600 mt-1">ยกมือก่อนตอบ</div></div>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Could you repeat that, please?</div><div class="text-slate-600 mt-1">ช่วยพูดซ้ำอีกครั้งได้ไหม</div></div>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Let's review what we learned today.</div><div class="text-slate-600 mt-1">มาทบทวนสิ่งที่เรียนวันนี้กัน</div></div>
  <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div class="font-black text-slate-900 text-xl">Please submit your work by Friday.</div><div class="text-slate-600 mt-1">ส่งงานภายในวันศุกร์</div></div>
</div>

## <span class="text-4xl font-black text-slate-900">เทคนิคเข้าสอบ Conversation</span>

<div class="overflow-x-auto my-6 rounded-2xl border-2 border-indigo-100 shadow-md">
  <table class="w-full text-left border-collapse bg-white m-0">
    <thead><tr class="bg-indigo-700 text-white"><th class="px-4 py-3">เทคนิค</th><th class="px-4 py-3">ใช้ตัดสินอย่างไร</th><th class="px-4 py-3">ตัวลวงที่ต้องระวัง</th></tr></thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-bold text-indigo-900">Function ก่อน Grammar</td><td class="px-4 py-3">ดูว่าคนพูดต้องการอะไร เช่น ขอร้อง ขอโทษ ขอบคุณ แนะนำ</td><td class="px-4 py-3">ช้อยส์แกรมมาร์ถูกแต่ไม่ตอบสถานการณ์</td></tr>
      <tr><td class="px-4 py-3 font-bold text-indigo-900">Politeness wins</td><td class="px-4 py-3">ถ้าพูดกับครู ผู้ปกครอง ผอ. หรือคนไม่สนิท ให้เลือกคำสุภาพ</td><td class="px-4 py-3">คำตอบห้วนเกินไป เช่น No. / Do it yourself.</td></tr>
      <tr><td class="px-4 py-3 font-bold text-indigo-900">ตอบประโยคก่อนหน้า</td><td class="px-4 py-3">คำตอบต้องรับกับประโยคล่าสุด ไม่ใช่รับกับหัวข้อกว้าง ๆ</td><td class="px-4 py-3">ช้อยส์ที่พูดเรื่องเดียวกันแต่ไม่ต่อบทสนทนา</td></tr>
      <tr><td class="px-4 py-3 font-bold text-indigo-900">ดู tone</td><td class="px-4 py-3">สถานการณ์จริงจังใช้คำสุภาพ / เพื่อนใช้คำเป็นกันเองได้</td><td class="px-4 py-3">คำตอบแรง ประชด หรือไม่ให้เกียรติ</td></tr>
      <tr><td class="px-4 py-3 font-bold text-indigo-900">อย่าแปลตรงตัวเกิน</td><td class="px-4 py-3">Conversation เน้นสำนวนที่เจ้าของภาษาใช้จริง</td><td class="px-4 py-3">คำแปลไทยดูถูก แต่ภาษาอังกฤษไม่เป็นธรรมชาติ</td></tr>
    </tbody>
  </table>
</div>

<blockquote>
จำสั้น ๆ ก่อนเข้าห้องสอบ: <strong>สถานการณ์ → หน้าที่ภาษา → น้ำเสียง → ความต่อเนื่อง</strong> ถ้าครบ 4 อย่าง โอกาสตอบถูกจะสูงมาก
</blockquote>
`
  },
  {
    id: 'a2_conversation_social_functions_deep',
    title: '2. Greetings, Leave Taking และ Introducing',
    content: `
# Greetings, Leave Taking และ Introducing

## หลักเลือกคำตอบ Conversation

Conversation ไม่ได้วัดแปลคำต่อคำ แต่วัดความเหมาะสมของสถานการณ์ น้ำเสียง และความต่อเนื่องของบทสนทนา

> สูตรเลือกช้อยส์: **ดูว่าใครพูดกับใคร + พูดเพื่ออะไร + คำตอบต่อบทสนทนาลื่นไหม**

## Greetings: การทักทายและถามสารทุกข์สุขดิบ

| สถานการณ์ | ประโยคที่ใช้ได้ | คำตอบที่เหมาะ |
|---|---|---|
| ทักทายทั่วไป | Good morning. / Good afternoon. / Good evening. | Good morning. / Good afternoon. / Good evening. |
| ไม่เป็นทางการ | Hello. / Hi. | Hello. / Hi. |
| ถามว่าเป็นอย่างไร | How are you? | I’m fine, thanks. And you? |
| ไม่เจอกันนาน | How have you been? | I’ve been good. |
| ถามแบบเป็นกันเอง | How’s it going? | Not bad. / Great. |
| ถามภาพรวมชีวิต | How’s everything? | Everything is fine. |

## Leave Taking: การกล่าวลา

| สถานการณ์ | ประโยคที่เหมาะ | หมายเหตุ |
|---|---|---|
| ลาทั่วไป | Goodbye. / Bye. | ใช้ได้กว้าง |
| เจอกันภายหลัง | See you later. / See you soon. / See you then. | ใช้เมื่อคาดว่าจะพบอีก |
| อวยพรวัน | Have a nice day. | ใช้กลางวัน |
| อวยพรทริป | Have a good trip. | ใช้ก่อนเดินทาง |
| ก่อนนอน | Good night. / Sleep well. | Good night ไม่ใช่คำทักทายตอนเจอกัน |
| ห่วงใย | Take care. | สุภาพและเป็นกันเอง |
| อวยพรสอบ/งาน | Good luck. | ใช้ก่อนเหตุการณ์สำคัญ |

## Introducing Oneself: แนะนำตัวเอง

| ระดับ | ประโยค |
|---|---|
| สุภาพ | May I introduce myself? |
| เป็นธรรมชาติ | Let me introduce myself. |
| บอกชื่อ | My name is Mali. / I’m Mali. |
| บอกประเทศ/สถานที่ | I’m from Thailand. |
| บอกสถานะ | I’m a teacher. / I’m a student at this school. |
| บอกงาน | I work at a primary school. |

## Introducing Others: แนะนำผู้อื่น

| ประโยค | ใช้เมื่อ |
|---|---|
| This is Mr. Somchai. | แนะนำคนหนึ่งให้รู้จัก |
| I’d like you to meet Ms. Anong. | สุภาพกว่าปกติ |
| I’d like to introduce you to our principal. | เป็นทางการ |
| Do you know my friend, Nida? | ถามก่อนแนะนำ |

## Responses: ตอบรับการแนะนำ

| ประโยคเริ่ม | คำตอบ |
|---|---|
| Nice to meet you. | Nice to meet you, too. |
| Pleased to meet you. | Pleased to meet you, too. |
| Glad to see you. | Glad to see you, too. |

## Practice Conversation

| สถานการณ์ | คำตอบที่ดีที่สุด | เหตุผล |
|---|---|---|
| A: How have you been? B: _____ | I’ve been good. | ตอบเรื่องสภาพช่วงที่ผ่านมา |
| A: I’m leaving for Chiang Mai tomorrow. B: _____ | Have a good trip. | อวยพรการเดินทาง |
| A: This is my colleague, Narin. B: _____ | Nice to meet you. | ตอบรับการแนะนำ |
| A: See you tomorrow. B: _____ | See you then. | รับคำลาที่มีเวลาชัด |
| A: Good night. B: _____ | Good night. Sleep well. | ใช้ก่อนนอน/แยกย้ายตอนกลางคืน |
`
  },
  {
    id: 'a2_conversation_requests_time_questions',
    title: '3. Requests, Thanking, Apologizing, Time และ Question Words',
    content: `
# Requests, Thanking, Apologizing, Time และ Question Words

## Requests: การขอร้องและขออนุญาต

| ระดับความสุภาพ | โครงสร้าง | ตัวอย่าง |
|---|---|---|
| เป็นกันเอง | Can you...? | Can you help me? |
| สุภาพ | Could you please...? | Could you please explain it again? |
| ขออนุญาต | May I...? | May I leave the room? |
| เสนอช่วย | Can I...? / May I...? | Can I give you a hand? |
| ชวนทำ | Shall we...? / Let’s... | Shall we start? / Let’s review. |

## Thanking: การขอบคุณและตอบรับ

| ขอบคุณ | ตอบรับ |
|---|---|
| Thank you. | You’re welcome. |
| Thank you very much. | My pleasure. |
| Thanks a lot. | No problem. |
| Thank you for your help. | Don’t mention it. |
| I really appreciate it. | That’s all right. |

## Apologizing: การขอโทษและตอบรับ

| ขอโทษ | ตอบรับ |
|---|---|
| I’m sorry. | That’s all right. |
| I’m sorry I’m late. | Don’t worry. |
| Excuse me. | Yes? / Certainly. |
| Excuse me for interrupting. | That’s OK. |
| I apologize for the mistake. | No problem. |

## Asking Time: การถามเวลา

| คำถาม | คำตอบ |
|---|---|
| What time is it? | It’s seven o’clock. |
| Could you tell me the time? | It’s twenty past six. |
| Do you have the time? | It’s five to four. |
| What time does the class start? | It starts at eight thirty. |

## วิธีอ่านเวลา

| เวลา | อ่านว่า |
|---|---|
| 8:15 | a quarter past eight |
| 10:30 | half past ten |
| 9:45 | a quarter to ten |
| 12:00 p.m. | noon |
| 12:00 a.m. | midnight |

## Question Words ที่ต้องแม่น

| Question Word | ถามอะไร | ตัวอย่าง |
|---|---|---|
| What | อะไร/อาชีพ/เวลา | What do you do? |
| Where | ที่ไหน | Where do you live? |
| When | เมื่อไร | When is the meeting? |
| Why | ทำไม | Why are you late? |
| Who | ใคร เป็นประธาน | Who teaches English? |
| Whom | ใคร เป็นกรรม | Whom did you call? |
| Whose | ของใคร | Whose bag is this? |
| Which | อันไหน | Which subject do you like? |
| How | อย่างไร/เท่าไร | How do you go to school? |

## Practice Conversation

| ข้อ | บทสนทนา | คำตอบ | เหตุผล |
|---|---|---|---|
| 1 | A: Could you please open the window? B: _____ | Certainly. | ตอบรับคำขออย่างสุภาพ |
| 2 | A: Thank you for your help. B: _____ | You’re welcome. | คู่สนทนาขอบคุณ |
| 3 | A: I’m sorry I broke your pen. B: _____ | That’s all right. | ตอบรับคำขอโทษ |
| 4 | A: Do you have the time? B: _____ | It’s half past ten. | คำถามขอเวลา |
| 5 | A: _____ do you go to school? B: By bus. | How | ถามวิธีเดินทาง |
| 6 | A: _____ bag is on the desk? B: It’s Nida’s. | Whose | ถามเจ้าของ |
| 7 | A: May I come in? B: _____ | Yes, please come in. | ขออนุญาตเข้าห้อง |
| 8 | A: I passed the exam. B: _____ | Congratulations! | สถานการณ์แสดงความยินดี |

> ข้อสอบ Conversation ที่ดูยากมักแพ้ทาง “ความสุภาพ + ความต่อเนื่อง” ถ้าคำตอบแปลได้แต่ไม่เข้าบทสนทนา ให้ตัดทิ้งก่อน
`
  },
  {
    id: 'a2_conversation_exam_10_dialogues',
    title: '4. แบบทดสอบ Conversation: 10 สถานการณ์แนวครูผู้ช่วย',
    content: `
# แบบทดสอบ Conversation: 10 สถานการณ์แนวครูผู้ช่วย

<div class="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-rose-50 p-7 my-6 shadow-sm">
  <div class="text-4xl md:text-5xl font-black text-indigo-950 leading-tight">ฝึกเลือกคำตอบจากสถานการณ์จริง</div>
  <div class="mt-4 text-xl leading-relaxed text-slate-700">ชุดนี้มี 10 บทสนทนา บทสนทนาละ 10 ข้อ รวม 100 ข้อ ครอบคลุมการขอร้อง ขอโทษ ขอบคุณ ให้คำแนะนำ ถามข้อมูล โทรศัพท์ในงานราชการ classroom English และการสื่อสารกับผู้ปกครอง</div>
  <div class="mt-5 rounded-2xl bg-white border border-indigo-100 p-5 text-slate-700 shadow-sm"><strong class="text-indigo-900">วิธีทำ:</strong> อ่านสถานการณ์ก่อน แล้วตอบจากบทสนทนาเท่านั้น อย่าใช้ความรู้ส่วนตัวเกินข้อความ และให้ดูความสุภาพของคำตอบเสมอ</div>
</div>

## Conversation 1: Parent-Teacher Meeting

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-amber-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-amber-800">Teacher</div><div>Good afternoon, Mr. Somchai. Thank you for coming. I would like to talk about Mina's <mark class="rounded-lg bg-amber-200 px-1.5 py-0.5 font-bold text-amber-950">attendance</mark> and homework routine.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-rose-800">Parent</div><div>Thank you for letting me know. I have been <mark class="rounded-lg bg-rose-100 px-1.5 py-0.5 font-bold text-rose-900">concerned</mark> too, but I work at night and sometimes miss school messages.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-amber-800">Teacher</div><div>I understand. Could we agree on a simple plan? I will send a weekly note, and Mina can bring it home every Friday.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-rose-800">Parent</div><div>That would be helpful. I can sign it and write a short reply if there is a problem.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-amber-800">Teacher</div><div>Great. I will also <mark class="rounded-lg bg-sky-100 px-1.5 py-0.5 font-bold text-sky-900">follow up</mark> next month to see whether the plan works.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-amber-200 bg-amber-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-amber-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 1</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Teacher:</strong> สวัสดีตอนบ่ายค่ะคุณสมชาย ขอบคุณที่มานะคะ ดิฉันอยากคุยเรื่องการมาเรียนและกิจวัตรการทำการบ้านของมีนา</div>
  <div><strong>Parent:</strong> ขอบคุณที่แจ้งครับ ผมก็กังวลเหมือนกัน แต่ผมทำงานกลางคืนและบางครั้งพลาดข้อความจากโรงเรียน</div>
  <div><strong>Teacher:</strong> เข้าใจค่ะ เราตกลงแผนง่าย ๆ กันได้ไหมคะ ดิฉันจะส่งบันทึกรายสัปดาห์ และมีนาจะนำกลับบ้านทุกวันศุกร์</div>
  <div><strong>Parent:</strong> แบบนั้นช่วยได้มากครับ ผมจะเซ็นและเขียนตอบสั้น ๆ หากมีปัญหา</div>
  <div><strong>Teacher:</strong> ดีมากค่ะ ดิฉันจะติดตามผลเดือนหน้าเพื่อดูว่าแผนนี้ได้ผลหรือไม่</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-amber-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-amber-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-amber-100"><tr><td class="px-4 py-3 font-bold">attendance</td><td class="px-4 py-3">การมาเรียน</td><td class="px-4 py-3">พูดถึงการขาด/มาเรียน</td></tr><tr><td class="px-4 py-3 font-bold">concerned</td><td class="px-4 py-3">กังวล</td><td class="px-4 py-3">เป็นห่วงปัญหา</td></tr><tr><td class="px-4 py-3 font-bold">follow up</td><td class="px-4 py-3">ติดตามผล</td><td class="px-4 py-3">ตรวจความคืบหน้า</td></tr></tbody></table></div>
</div></details>

### Questions 1-10

<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm">
  <table class="w-full min-w-[900px] bg-white text-left border-collapse">
    <thead><tr class="bg-indigo-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead>
    <tbody class="divide-y divide-slate-200 text-slate-800">
      <tr><td class="px-4 py-3 font-black text-indigo-700">1</td><td class="px-4 py-3">What is the conversation mainly about?</td><td class="px-4 py-3">A. Buying school uniforms<br/>B. Planning a field trip<br/>C. Improving a student's attendance and homework routine<br/>D. Changing the school timetable</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">2</td><td class="px-4 py-3">The word "concerned" is closest in meaning to _____.</td><td class="px-4 py-3">A. worried<br/>B. excited<br/>C. careless<br/>D. absent</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">3</td><td class="px-4 py-3">Why does the parent sometimes miss school messages?</td><td class="px-4 py-3">A. He dislikes reading.<br/>B. He works at night.<br/>C. He lives far away.<br/>D. He changed his phone number.</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">4</td><td class="px-4 py-3">Which response best shows cooperation?</td><td class="px-4 py-3">A. That would be helpful.<br/>B. I do not care.<br/>C. It is your problem.<br/>D. Stop sending notes.</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">5</td><td class="px-4 py-3">What will the teacher send every week?</td><td class="px-4 py-3">A. A report card<br/>B. A weekly note<br/>C. A new textbook<br/>D. A lunch menu</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">6</td><td class="px-4 py-3">What does "it" in "I can sign it" refer to?</td><td class="px-4 py-3">A. Mina's book<br/>B. The weekly note<br/>C. The classroom<br/>D. The school message</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">7</td><td class="px-4 py-3">The teacher's tone is _____.</td><td class="px-4 py-3">A. rude<br/>B. respectful and helpful<br/>C. angry<br/>D. humorous</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">8</td><td class="px-4 py-3">The phrase "follow up" means _____.</td><td class="px-4 py-3">A. forget the plan<br/>B. check progress later<br/>C. punish immediately<br/>D. cancel the meeting</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">9</td><td class="px-4 py-3">What can be inferred about the parent?</td><td class="px-4 py-3">A. He wants to cooperate with the teacher.<br/>B. He refuses to help Mina.<br/>C. He does not know Mina.<br/>D. He wants Mina to stop studying.</td></tr>
      <tr><td class="px-4 py-3 font-black text-indigo-700">10</td><td class="px-4 py-3">If the parent says, "Thank you for your help," the best reply is _____.</td><td class="px-4 py-3">A. Never mind, it is your fault.<br/>B. You're welcome. Let's work together.<br/>C. I cannot help you.<br/>D. Why are you late?</td></tr>
    </tbody>
  </table>
</div>

<details class="rounded-3xl border border-amber-200 bg-amber-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-amber-900">เปิด/ปิดเฉลย Conversation 1</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-amber-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-amber-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">C</td><td class="px-4 py-3">บทสนทนานี้เกี่ยวกับอะไรเป็นหลัก / ถาม main idea</td><td class="px-4 py-3">ทั้งบทคุยเรื่อง attendance และ homework routine ของ Mina</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">concerned แปลใกล้เคียงคำใด / ถามศัพท์ในบริบท</td><td class="px-4 py-3">ผู้ปกครองบอกว่ากังวลเรื่องปัญหา จึงเท่ากับ worried</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ทำไมพ่อแม่พลาดข้อความโรงเรียน / ถาม detail</td><td class="px-4 py-3">Parent พูดตรง ๆ ว่า I work at night</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">คำตอบใดแสดงความร่วมมือ / ถาม appropriate response</td><td class="px-4 py-3">That would be helpful เป็นการยอมรับแผนอย่างสุภาพ</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ครูจะส่งอะไรทุกสัปดาห์ / ถาม detail</td><td class="px-4 py-3">Teacher บอกว่าจะ send a weekly note</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">it หมายถึงอะไร / ถาม reference</td><td class="px-4 py-3">it ย้อนกลับไปที่ weekly note ที่ Mina นำกลับบ้าน</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">น้ำเสียงของครูเป็นอย่างไร / ถาม tone</td><td class="px-4 py-3">ครูใช้ I understand, Could we agree และ Great จึงสุภาพและช่วยเหลือ</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">follow up หมายถึงอะไร / ถามศัพท์สำนวน</td><td class="px-4 py-3">ในบริบทคือครูจะตรวจดูภายหลังว่าแผนได้ผลไหม</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">สรุปได้อย่างไรเกี่ยวกับผู้ปกครอง / ถาม inference</td><td class="px-4 py-3">ผู้ปกครองรับแผนและเสนอเซ็นตอบกลับ แสดงความร่วมมือ</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ถ้าผู้ปกครองขอบคุณ ควรตอบอย่างไร / ถาม social response</td><td class="px-4 py-3">You're welcome เป็นการตอบรับคำขอบคุณที่สุภาพ และต่อด้วยการร่วมมือ</td></tr>
</tbody></table></div></details>

## Conversation 2: Asking for an Extension

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-sky-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-sky-800">Student</div><div>Excuse me, teacher. May I talk to you about my science report?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Of course. What seems to be the problem?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-sky-800">Student</div><div>I could not finish it because I had to take care of my younger brother. Could I have a short <mark class="rounded-lg bg-sky-200 px-1.5 py-0.5 font-bold text-sky-950">extension</mark>?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>I appreciate your honesty. Please submit your outline today and the final report by Friday.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-sky-800">Student</div><div>Thank you. I will <mark class="rounded-lg bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-900">make sure</mark> it is complete by then.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-sky-200 bg-sky-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-sky-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 2</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Student:</strong> ขอโทษครับครู ผมขอคุยเรื่องรายงานวิทยาศาสตร์ได้ไหมครับ</div>
  <div><strong>Teacher:</strong> ได้สิ มีปัญหาอะไรหรือ</div>
  <div><strong>Student:</strong> ผมทำไม่เสร็จเพราะต้องดูแลน้องชาย ขอขยายเวลาสั้น ๆ ได้ไหมครับ</div>
  <div><strong>Teacher:</strong> ครูชื่นชมความซื่อสัตย์ของเธอ ส่งโครงร่างวันนี้ และส่งรายงานฉบับสมบูรณ์ภายในวันศุกร์นะ</div>
  <div><strong>Student:</strong> ขอบคุณครับ ผมจะทำให้แน่ใจว่างานเสร็จสมบูรณ์ภายในเวลานั้น</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-sky-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-sky-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-sky-100"><tr><td class="px-4 py-3 font-bold">extension</td><td class="px-4 py-3">การขยายเวลา</td><td class="px-4 py-3">ขอเวลาส่งงานเพิ่ม</td></tr><tr><td class="px-4 py-3 font-bold">outline</td><td class="px-4 py-3">โครงร่าง</td><td class="px-4 py-3">แผนก่อนเขียนฉบับเต็ม</td></tr><tr><td class="px-4 py-3 font-bold">make sure</td><td class="px-4 py-3">ทำให้แน่ใจ</td><td class="px-4 py-3">รับปากอย่างชัดเจน</td></tr></tbody></table></div>
</div></details>

### Questions 1-10

<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-sky-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-sky-700">1</td><td class="px-4 py-3">What is the student asking for?</td><td class="px-4 py-3">A. A new textbook<br/>B. A short extension<br/>C. A different subject<br/>D. A school uniform</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">2</td><td class="px-4 py-3">Which phrase is used to politely start the conversation?</td><td class="px-4 py-3">A. Excuse me<br/>B. Listen now<br/>C. You must help me<br/>D. I don't care</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">3</td><td class="px-4 py-3">Why did the student not finish the report?</td><td class="px-4 py-3">A. He lost the book.<br/>B. He had to take care of his brother.<br/>C. He forgot the subject.<br/>D. He disliked science.</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">4</td><td class="px-4 py-3">What must the student submit today?</td><td class="px-4 py-3">A. The final report<br/>B. His outline<br/>C. A permission form<br/>D. A test paper</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">5</td><td class="px-4 py-3">When is the final report due?</td><td class="px-4 py-3">A. Today<br/>B. Tomorrow morning<br/>C. By Friday<br/>D. Next month</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">6</td><td class="px-4 py-3">The word "extension" means _____.</td><td class="px-4 py-3">A. extra time<br/>B. a punishment<br/>C. a mistake<br/>D. a question</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">7</td><td class="px-4 py-3">The teacher's response shows that she is _____.</td><td class="px-4 py-3">A. unreasonable<br/>B. understanding but still sets a deadline<br/>C. careless<br/>D. angry</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">8</td><td class="px-4 py-3">What does "by then" refer to?</td><td class="px-4 py-3">A. By Friday<br/>B. Today<br/>C. Last week<br/>D. During lunch</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">9</td><td class="px-4 py-3">Which is the best reply if the teacher says, "Please do not be late again"?</td><td class="px-4 py-3">A. I promise I will submit it on time.<br/>B. That is not my problem.<br/>C. You should do it.<br/>D. I will stop studying.</td></tr>
<tr><td class="px-4 py-3 font-black text-sky-700">10</td><td class="px-4 py-3">What is the main function of the student's request?</td><td class="px-4 py-3">A. Complaining<br/>B. Asking permission / requesting<br/>C. Inviting<br/>D. Greeting</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-sky-200 bg-sky-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-sky-900">เปิด/ปิดเฉลย Conversation 2</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-sky-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-sky-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">นักเรียนขออะไร / ถาม main request</td><td class="px-4 py-3">Student พูดว่า Could I have a short extension?</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">วลีใดใช้เริ่มสนทนาอย่างสุภาพ / ถาม expression</td><td class="px-4 py-3">Excuse me ใช้เรียกความสนใจอย่างสุภาพ</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ทำไมทำรายงานไม่เสร็จ / ถาม detail</td><td class="px-4 py-3">นักเรียนบอกว่าต้องดูแลน้องชาย</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ต้องส่งอะไรวันนี้ / ถาม detail</td><td class="px-4 py-3">Teacher บอก submit your outline today</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">C</td><td class="px-4 py-3">รายงานฉบับเต็มครบกำหนดเมื่อไร / ถาม time</td><td class="px-4 py-3">final report by Friday</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">extension หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">ในบริบทการส่งงานหมายถึงเวลาที่เพิ่มขึ้น</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ท่าทีของครูเป็นอย่างไร / ถาม tone</td><td class="px-4 py-3">ครูเข้าใจ แต่กำหนด outline วันนี้และ final report วันศุกร์</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">by then หมายถึงเมื่อไร / ถาม reference</td><td class="px-4 py-3">then อ้างถึง by Friday ที่พูดก่อนหน้า</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ถ้าครูเตือน ควรตอบอย่างไร / ถาม appropriate response</td><td class="px-4 py-3">เป็นคำตอบรับผิดชอบและสุภาพที่สุด</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">หน้าที่ภาษาของคำพูดนักเรียนคืออะไร / ถาม function</td><td class="px-4 py-3">นักเรียนกำลังขออนุญาต/ขอผ่อนผันกำหนดส่ง</td></tr>
</tbody></table></div></details>

## Conversation 3: New Teacher Orientation

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-violet-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-violet-800">Mentor</div><div>Welcome to Ban Nong School. Before your first class, let me show you the staff room and explain our <mark class="rounded-lg bg-violet-200 px-1.5 py-0.5 font-bold text-violet-950">routine</mark>.</div></div>
    <div class="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">New Teacher</div><div>Thank you. I am a little nervous because this is my first week.</div></div>
    <div class="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-violet-800">Mentor</div><div>That is perfectly normal. If you need teaching materials, please fill out this request form one day in advance.</div></div>
    <div class="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">New Teacher</div><div>I see. Who should I contact if the projector does not work?</div></div>
    <div class="grid grid-cols-[120px_1fr] gap-4 py-3"><div class="font-black text-violet-800">Mentor</div><div>Please contact the ICT teacher first. If it is <mark class="rounded-lg bg-orange-100 px-1.5 py-0.5 font-bold text-orange-900">urgent</mark>, call the office directly.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-violet-200 bg-violet-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-violet-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 3</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Mentor:</strong> ยินดีต้อนรับสู่โรงเรียนบ้านหนอง ก่อนเข้าสอนคาบแรก ครูจะพาไปดูห้องพักครูและอธิบายกิจวัตรของเรา</div>
  <div><strong>New Teacher:</strong> ขอบคุณครับ ผมกังวลนิดหน่อยเพราะนี่เป็นสัปดาห์แรกของผม</div>
  <div><strong>Mentor:</strong> เป็นเรื่องปกติมาก ถ้าต้องการสื่อการสอน ให้กรอกแบบฟอร์มขอล่วงหน้าหนึ่งวัน</div>
  <div><strong>New Teacher:</strong> เข้าใจแล้วครับ ถ้าโปรเจกเตอร์ใช้ไม่ได้ ผมควรติดต่อใคร</div>
  <div><strong>Mentor:</strong> ติดต่อครูไอซีทีก่อน ถ้าเร่งด่วนให้โทรหาสำนักงานโดยตรง</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-violet-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-violet-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-violet-100"><tr><td class="px-4 py-3 font-bold">routine</td><td class="px-4 py-3">กิจวัตร/ขั้นตอนประจำ</td><td class="px-4 py-3">สิ่งที่ทำตามระบบ</td></tr><tr><td class="px-4 py-3 font-bold">one day in advance</td><td class="px-4 py-3">ล่วงหน้าหนึ่งวัน</td><td class="px-4 py-3">ก่อนวันใช้จริง</td></tr><tr><td class="px-4 py-3 font-bold">urgent</td><td class="px-4 py-3">เร่งด่วน</td><td class="px-4 py-3">ต้องรีบจัดการ</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-violet-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-violet-700">1</td><td class="px-4 py-3">Who is probably speaking with the new teacher?</td><td class="px-4 py-3">A. A student<br/>B. A mentor teacher<br/>C. A parent<br/>D. A shopkeeper</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">2</td><td class="px-4 py-3">How does the new teacher feel?</td><td class="px-4 py-3">A. A little nervous<br/>B. Very angry<br/>C. Completely bored<br/>D. Uninterested</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">3</td><td class="px-4 py-3">What should the new teacher do to request teaching materials?</td><td class="px-4 py-3">A. Call parents<br/>B. Fill out a form one day in advance<br/>C. Buy them himself<br/>D. Ask students to bring them</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">4</td><td class="px-4 py-3">The word "routine" means _____.</td><td class="px-4 py-3">A. regular procedure<br/>B. surprise event<br/>C. punishment<br/>D. lunch time</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">5</td><td class="px-4 py-3">Who should be contacted first if the projector does not work?</td><td class="px-4 py-3">A. The ICT teacher<br/>B. The cafeteria staff<br/>C. The students<br/>D. The bus driver</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">6</td><td class="px-4 py-3">What should he do if the problem is urgent?</td><td class="px-4 py-3">A. Wait until next week<br/>B. Call the office directly<br/>C. Cancel the school day<br/>D. Close the classroom</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">7</td><td class="px-4 py-3">Which response best fits after "Thank you"?</td><td class="px-4 py-3">A. You're welcome.<br/>B. Go away.<br/>C. I cannot hear you.<br/>D. Never come here.</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">8</td><td class="px-4 py-3">The mentor's tone is _____.</td><td class="px-4 py-3">A. helpful<br/>B. rude<br/>C. sarcastic<br/>D. frightened</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">9</td><td class="px-4 py-3">What is the purpose of the conversation?</td><td class="px-4 py-3">A. To introduce school procedures to a new teacher<br/>B. To complain about students<br/>C. To sell projectors<br/>D. To cancel classes</td></tr>
<tr><td class="px-4 py-3 font-black text-violet-700">10</td><td class="px-4 py-3">Which sentence is a polite question?</td><td class="px-4 py-3">A. Who should I contact if the projector does not work?<br/>B. Give me the projector now.<br/>C. You must fix it.<br/>D. I hate this school.</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-violet-200 bg-violet-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-violet-900">เปิด/ปิดเฉลย Conversation 3</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-violet-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-violet-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ใครน่าจะคุยกับครูใหม่ / ถาม speaker</td><td class="px-4 py-3">ชื่อบทและคำพูด Mentor แสดงว่าเป็นครูพี่เลี้ยง</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูใหม่รู้สึกอย่างไร / ถาม feeling</td><td class="px-4 py-3">New Teacher บอก I am a little nervous</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ต้องทำอย่างไรเพื่อขอสื่อ / ถาม procedure</td><td class="px-4 py-3">Mentor บอก fill out this request form one day in advance</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">routine หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">ในบริบทคือขั้นตอนปกติของโรงเรียน</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ถ้าโปรเจกเตอร์เสีย ติดต่อใครก่อน / ถาม detail</td><td class="px-4 py-3">Please contact the ICT teacher first</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ถ้าเร่งด่วนต้องทำอะไร / ถาม condition</td><td class="px-4 py-3">If it is urgent, call the office directly</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ตอบ Thank you อย่างไร / ถาม social response</td><td class="px-4 py-3">You're welcome เป็นคู่ตอบรับการขอบคุณ</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">น้ำเสียง mentor เป็นอย่างไร / ถาม tone</td><td class="px-4 py-3">Mentor อธิบายและช่วยแนะนำขั้นตอน</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">จุดประสงค์บทสนทนา / ถาม purpose</td><td class="px-4 py-3">เนื้อหาเป็นการ orientation ขั้นตอนโรงเรียน</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ประโยคใดเป็นคำถามสุภาพ / ถาม politeness</td><td class="px-4 py-3">เป็นคำถามขอข้อมูลตรงไปตรงมา ไม่สั่งหรือหยาบ</td></tr>
</tbody></table></div></details>

## Conversation 4: A Student Feels Sick

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-rose-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-rose-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-rose-800">Student</div><div>Teacher, I feel dizzy and my stomach hurts.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Please sit down. I will take you to the nurse's room. Did you eat breakfast this morning?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-rose-800">Student</div><div>No, I did not. I was in a hurry and forgot to bring my water bottle.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-emerald-800">Nurse</div><div>His <mark class="rounded-lg bg-rose-200 px-1.5 py-0.5 font-bold text-rose-950">temperature</mark> is normal, but he should rest and drink water slowly.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-slate-800">Teacher</div><div>I will inform his parents and let him rest here until he feels better.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-rose-200 bg-rose-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-rose-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 4</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Student:</strong> ครูครับ ผมเวียนหัวและปวดท้อง</div>
  <div><strong>Teacher:</strong> นั่งก่อนนะ ครูจะพาไปห้องพยาบาล เมื่อเช้ากินข้าวเช้าหรือยัง</div>
  <div><strong>Student:</strong> ยังไม่ได้กินครับ ผมรีบและลืมนำขวดน้ำมา</div>
  <div><strong>Nurse:</strong> อุณหภูมิของเขาปกติ แต่ควรพักและค่อย ๆ ดื่มน้ำ</div>
  <div><strong>Teacher:</strong> ครูจะแจ้งผู้ปกครองและให้เขาพักที่นี่จนกว่าจะรู้สึกดีขึ้น</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-rose-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-rose-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-rose-100"><tr><td class="px-4 py-3 font-bold">dizzy</td><td class="px-4 py-3">เวียนหัว</td><td class="px-4 py-3">อาการไม่สบาย</td></tr><tr><td class="px-4 py-3 font-bold">temperature</td><td class="px-4 py-3">อุณหภูมิร่างกาย</td><td class="px-4 py-3">ใช้ตรวจไข้</td></tr><tr><td class="px-4 py-3 font-bold">inform</td><td class="px-4 py-3">แจ้งให้ทราบ</td><td class="px-4 py-3">บอกข้อมูลสำคัญ</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-rose-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-rose-700">1</td><td class="px-4 py-3">What is the student's problem?</td><td class="px-4 py-3">A. He lost his book.<br/>B. He feels dizzy and has a stomachache.<br/>C. He missed the bus.<br/>D. He wants to go shopping.</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">2</td><td class="px-4 py-3">Where will the teacher take the student?</td><td class="px-4 py-3">A. The nurse's room<br/>B. The library<br/>C. The playground<br/>D. The canteen only</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">3</td><td class="px-4 py-3">Why did the student not eat breakfast?</td><td class="px-4 py-3">A. He was in a hurry.<br/>B. He had no homework.<br/>C. He disliked school.<br/>D. He was reading a book.</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">4</td><td class="px-4 py-3">What does the nurse say about his temperature?</td><td class="px-4 py-3">A. It is normal.<br/>B. It is very high.<br/>C. It is unknown.<br/>D. It is dangerous.</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">5</td><td class="px-4 py-3">What should the student do?</td><td class="px-4 py-3">A. Run around the field<br/>B. Rest and drink water slowly<br/>C. Take an exam immediately<br/>D. Go home alone</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">6</td><td class="px-4 py-3">The word "inform" means _____.</td><td class="px-4 py-3">A. tell<br/>B. forget<br/>C. hide<br/>D. refuse</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">7</td><td class="px-4 py-3">Which response is most appropriate if the student says, "May I call my mother?"</td><td class="px-4 py-3">A. Of course, I will help you call her.<br/>B. No, never.<br/>C. Stop talking.<br/>D. Do your homework now.</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">8</td><td class="px-4 py-3">The teacher is mainly _____.</td><td class="px-4 py-3">A. caring and responsible<br/>B. careless<br/>C. angry<br/>D. confused</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">9</td><td class="px-4 py-3">What can be inferred?</td><td class="px-4 py-3">A. The school has a basic health-care procedure.<br/>B. The student is punished.<br/>C. The nurse ignores him.<br/>D. The teacher cancels the class.</td></tr>
<tr><td class="px-4 py-3 font-black text-rose-700">10</td><td class="px-4 py-3">What is the main purpose of the conversation?</td><td class="px-4 py-3">A. To buy medicine<br/>B. To respond to a student's health problem<br/>C. To discuss homework<br/>D. To plan a trip</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-rose-200 bg-rose-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-rose-900">เปิด/ปิดเฉลย Conversation 4</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-rose-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-rose-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">นักเรียนมีปัญหาอะไร / ถาม detail</td><td class="px-4 py-3">Student พูดว่า feel dizzy and stomach hurts</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูจะพาไปที่ไหน / ถาม detail</td><td class="px-4 py-3">Teacher พูดว่าจะพาไป nurse's room</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ทำไมไม่ได้กินข้าวเช้า / ถาม cause</td><td class="px-4 py-3">นักเรียนตอบว่า I was in a hurry</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">พยาบาลบอกอุณหภูมิว่าอย่างไร / ถาม detail</td><td class="px-4 py-3">His temperature is normal</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">นักเรียนควรทำอะไร / ถาม advice</td><td class="px-4 py-3">Nurse แนะนำให้ rest and drink water slowly</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">inform หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">inform his parents คือแจ้งผู้ปกครอง</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ถ้านักเรียนขอโทรหาแม่ ควรตอบอะไร / ถาม appropriate response</td><td class="px-4 py-3">เป็นคำตอบที่ดูแลและช่วยเหลืออย่างเหมาะสม</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูเป็นอย่างไร / ถาม character/tone</td><td class="px-4 py-3">ครูพาไปห้องพยาบาลและแจ้งผู้ปกครอง</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">สรุปโดยนัยได้ว่าอะไร / ถาม inference</td><td class="px-4 py-3">มีการพาไปพยาบาล ตรวจอุณหภูมิ แจ้งผู้ปกครอง แสดงระบบดูแล</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">จุดประสงค์หลักคืออะไร / ถาม purpose</td><td class="px-4 py-3">บทสนทนาทั้งหมดคือการตอบสนองอาการไม่สบายของนักเรียน</td></tr>
</tbody></table></div></details>

## Conversation 5: Field Trip Instructions

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-lime-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-lime-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-lime-800">Teacher</div><div>Tomorrow we will visit the science museum. Please arrive at the school gate by 7:30 a.m. <mark class="rounded-lg bg-lime-200 px-1.5 py-0.5 font-bold text-lime-950">sharp</mark>.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Student A</div><div>Should we bring lunch or buy food there?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-lime-800">Teacher</div><div>Bring a light lunch and a water bottle. Also, do not forget your signed <mark class="rounded-lg bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-900">permission slip</mark>.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Student B</div><div>What should we do if we get separated from the group?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-lime-800">Teacher</div><div>Stay where you are and call the teacher's number printed on your badge. Do not leave the museum alone.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-lime-200 bg-lime-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-lime-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 5</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Teacher:</strong> พรุ่งนี้เราจะไปพิพิธภัณฑ์วิทยาศาสตร์ กรุณามาถึงประตูโรงเรียนตรงเวลา 7.30 น.</div>
  <div><strong>Student A:</strong> เราควรนำอาหารกลางวันไปหรือซื้อที่นั่นครับ</div>
  <div><strong>Teacher:</strong> นำอาหารกลางวันเบา ๆ และขวดน้ำไปด้วย และอย่าลืมใบอนุญาตที่ผู้ปกครองเซ็นแล้ว</div>
  <div><strong>Student B:</strong> ถ้าพวกเราพลัดหลงจากกลุ่มควรทำอย่างไรครับ</div>
  <div><strong>Teacher:</strong> อยู่ที่เดิมและโทรเบอร์ครูที่พิมพ์อยู่บนป้ายชื่อ ห้ามออกจากพิพิธภัณฑ์คนเดียว</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-lime-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-lime-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-lime-100"><tr><td class="px-4 py-3 font-bold">sharp</td><td class="px-4 py-3">ตรงเวลาเป๊ะ</td><td class="px-4 py-3">ใช้กับเวลา</td></tr><tr><td class="px-4 py-3 font-bold">permission slip</td><td class="px-4 py-3">ใบอนุญาตจากผู้ปกครอง</td><td class="px-4 py-3">เอกสารก่อนทัศนศึกษา</td></tr><tr><td class="px-4 py-3 font-bold">get separated</td><td class="px-4 py-3">พลัดหลง</td><td class="px-4 py-3">แยกจากกลุ่ม</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-lime-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-lime-700">1</td><td class="px-4 py-3">Where will the class go tomorrow?</td><td class="px-4 py-3">A. The science museum<br/>B. The library<br/>C. The market<br/>D. The hospital</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">2</td><td class="px-4 py-3">What time should students arrive?</td><td class="px-4 py-3">A. 6:30 a.m.<br/>B. 7:30 a.m.<br/>C. 8:30 a.m.<br/>D. 9:30 a.m.</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">3</td><td class="px-4 py-3">The word "sharp" means _____.</td><td class="px-4 py-3">A. exactly on time<br/>B. dangerous<br/>C. late<br/>D. slowly</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">4</td><td class="px-4 py-3">What should students bring?</td><td class="px-4 py-3">A. A heavy bag only<br/>B. A light lunch and water bottle<br/>C. A bicycle<br/>D. A television</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">5</td><td class="px-4 py-3">What document must be signed?</td><td class="px-4 py-3">A. A report card<br/>B. A permission slip<br/>C. A notebook<br/>D. A seating chart</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">6</td><td class="px-4 py-3">If students get separated, what should they do first?</td><td class="px-4 py-3">A. Leave the museum<br/>B. Stay where they are<br/>C. Run to the bus<br/>D. Buy food</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">7</td><td class="px-4 py-3">Where is the teacher's phone number printed?</td><td class="px-4 py-3">A. On the badge<br/>B. On the bus window<br/>C. On a lunch box<br/>D. On the museum wall</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">8</td><td class="px-4 py-3">Which instruction is about safety?</td><td class="px-4 py-3">A. Bring a light lunch.<br/>B. Do not leave the museum alone.<br/>C. Visit the gift shop.<br/>D. Buy food there.</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">9</td><td class="px-4 py-3">The teacher's purpose is to _____.</td><td class="px-4 py-3">A. give field trip instructions<br/>B. cancel the trip<br/>C. ask for homework<br/>D. teach grammar</td></tr>
<tr><td class="px-4 py-3 font-black text-lime-700">10</td><td class="px-4 py-3">Which response is best after the teacher explains the rules?</td><td class="px-4 py-3">A. Understood. We will follow the instructions.<br/>B. We will ignore them.<br/>C. I will leave alone.<br/>D. That is boring, teacher.</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-lime-200 bg-lime-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-lime-900">เปิด/ปิดเฉลย Conversation 5</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-lime-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-lime-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">จะไปที่ไหน / ถาม place</td><td class="px-4 py-3">Teacher บอก visit the science museum</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ต้องมาถึงกี่โมง / ถาม time</td><td class="px-4 py-3">arrive at the school gate by 7:30 a.m.</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">sharp หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">เวลา + sharp แปลว่าตรงเวลาเป๊ะ</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ต้องนำอะไรไป / ถาม detail</td><td class="px-4 py-3">Bring a light lunch and a water bottle</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">เอกสารใดต้องเซ็น / ถาม document</td><td class="px-4 py-3">signed permission slip</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ถ้าพลัดหลงต้องทำอะไรก่อน / ถาม instruction</td><td class="px-4 py-3">Stay where you are</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">เบอร์ครูอยู่ที่ไหน / ถาม detail</td><td class="px-4 py-3">printed on your badge</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ข้อใดเป็นคำสั่งด้านความปลอดภัย / ถาม safety rule</td><td class="px-4 py-3">ห้ามออกจากพิพิธภัณฑ์คนเดียวเป็นกฎความปลอดภัย</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูมีจุดประสงค์อะไร / ถาม purpose</td><td class="px-4 py-3">ครูให้เวลา สิ่งของ เอกสาร และกฎความปลอดภัย</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ควรตอบหลังฟังกฎอย่างไร / ถาม appropriate response</td><td class="px-4 py-3">เป็นคำตอบรับทราบและแสดงว่าจะปฏิบัติตาม</td></tr>
</tbody></table></div></details>

## Conversation 6: Online Class Problem

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-cyan-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-cyan-800">Student</div><div>Teacher, I could not join the online class this morning because my internet connection was <mark class="rounded-lg bg-cyan-200 px-1.5 py-0.5 font-bold text-cyan-950">unstable</mark>.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Thanks for telling me. Did you try restarting the router or using mobile data?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-cyan-800">Student</div><div>I tried both, but the connection kept dropping. May I watch the recording and submit the worksheet later today?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Yes. Please send me a screenshot of the error, then complete the worksheet by 6 p.m.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-cyan-800">Student</div><div>Thank you. I will also <mark class="rounded-lg bg-blue-100 px-1.5 py-0.5 font-bold text-blue-900">troubleshoot</mark> my connection before the next class.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-cyan-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 6</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Student:</strong> ครูครับ เมื่อเช้าผมเข้าเรียนออนไลน์ไม่ได้เพราะอินเทอร์เน็ตไม่เสถียร</div>
  <div><strong>Teacher:</strong> ขอบคุณที่บอกนะ เธอลองรีสตาร์ตเราเตอร์หรือใช้อินเทอร์เน็ตมือถือหรือยัง</div>
  <div><strong>Student:</strong> ลองทั้งสองอย่างแล้วครับ แต่สัญญาณหลุดตลอด ผมขอดูบันทึกย้อนหลังและส่งใบงานภายในวันนี้ได้ไหมครับ</div>
  <div><strong>Teacher:</strong> ได้ ส่งภาพหน้าจอข้อผิดพลาดให้ครูก่อน แล้วทำใบงานให้เสร็จภายใน 18.00 น.</div>
  <div><strong>Student:</strong> ขอบคุณครับ ผมจะตรวจแก้ปัญหาอินเทอร์เน็ตก่อนคาบหน้า</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-cyan-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-cyan-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-cyan-100"><tr><td class="px-4 py-3 font-bold">unstable</td><td class="px-4 py-3">ไม่เสถียร</td><td class="px-4 py-3">สัญญาณหลุดง่าย</td></tr><tr><td class="px-4 py-3 font-bold">connection kept dropping</td><td class="px-4 py-3">สัญญาณหลุดต่อเนื่อง</td><td class="px-4 py-3">ปัญหาออนไลน์</td></tr><tr><td class="px-4 py-3 font-bold">troubleshoot</td><td class="px-4 py-3">ตรวจและแก้ปัญหา</td><td class="px-4 py-3">หาสาเหตุทางเทคนิค</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-cyan-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-cyan-700">1</td><td class="px-4 py-3">Why could the student not join the class?</td><td class="px-4 py-3">A. He was sick.<br/>B. His internet connection was unstable.<br/>C. He forgot the password.<br/>D. He had no worksheet.</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">2</td><td class="px-4 py-3">What did the teacher ask first?</td><td class="px-4 py-3">A. Whether he tried restarting the router or using mobile data<br/>B. Whether he bought a new computer<br/>C. Whether he wanted lunch<br/>D. Whether he moved school</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">3</td><td class="px-4 py-3">What does "unstable" mean?</td><td class="px-4 py-3">A. not steady<br/>B. very expensive<br/>C. very clear<br/>D. offline forever</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">4</td><td class="px-4 py-3">What does the student ask to do?</td><td class="px-4 py-3">A. Watch the recording and submit the worksheet later<br/>B. Stop studying online<br/>C. Change the subject<br/>D. Skip all homework</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">5</td><td class="px-4 py-3">What evidence should the student send?</td><td class="px-4 py-3">A. A screenshot of the error<br/>B. A photo of his lunch<br/>C. A school map<br/>D. A printed book</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">6</td><td class="px-4 py-3">When must he complete the worksheet?</td><td class="px-4 py-3">A. By 6 p.m.<br/>B. Next week<br/>C. Before breakfast<br/>D. At midnight</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">7</td><td class="px-4 py-3">The word "troubleshoot" means _____.</td><td class="px-4 py-3">A. find and fix a problem<br/>B. create a problem<br/>C. delete homework<br/>D. avoid class</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">8</td><td class="px-4 py-3">Which sentence is a polite request?</td><td class="px-4 py-3">A. May I watch the recording and submit the worksheet later today?<br/>B. Give me the answer now.<br/>C. I will not do it.<br/>D. Your class is bad.</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">9</td><td class="px-4 py-3">The teacher's decision is _____.</td><td class="px-4 py-3">A. flexible but still responsible<br/>B. careless and unfair<br/>C. unrelated to learning<br/>D. only about punishment</td></tr>
<tr><td class="px-4 py-3 font-black text-cyan-700">10</td><td class="px-4 py-3">What is the conversation mainly about?</td><td class="px-4 py-3">A. Solving an online class access problem<br/>B. Choosing school lunch<br/>C. Planning a sports day<br/>D. Returning a library book</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-cyan-900">เปิด/ปิดเฉลย Conversation 6</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-cyan-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-cyan-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">B</td><td class="px-4 py-3">ทำไมเข้าเรียนไม่ได้ / ถาม cause</td><td class="px-4 py-3">นักเรียนระบุ internet connection was unstable</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูถามอะไรก่อน / ถาม detail</td><td class="px-4 py-3">ครูถามเรื่อง router และ mobile data</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">unstable หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">สัญญาณที่ไม่เสถียรคือ not steady</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">นักเรียนขอทำอะไร / ถาม request</td><td class="px-4 py-3">เขาขอดู recording และส่ง worksheet ภายหลัง</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ต้องส่งหลักฐานอะไร / ถาม evidence</td><td class="px-4 py-3">Teacher ขอ screenshot of the error</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ต้องทำใบงานเสร็จเมื่อไร / ถาม time</td><td class="px-4 py-3">complete the worksheet by 6 p.m.</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">troubleshoot หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">คือหาปัญหาและแก้ไขทางเทคนิค</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ประโยคใดเป็นคำขอสุภาพ / ถาม politeness</td><td class="px-4 py-3">May I...? เป็นโครงสร้างขออนุญาตสุภาพ</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">การตัดสินใจของครูเป็นอย่างไร / ถาม inference</td><td class="px-4 py-3">ครูยืดหยุ่นให้ แต่ยังขอหลักฐานและกำหนดเวลา</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">บทสนทนาเกี่ยวกับอะไร / ถาม main idea</td><td class="px-4 py-3">ทุกประโยคเกี่ยวกับปัญหาเข้าเรียนออนไลน์และวิธีแก้</td></tr>
</tbody></table></div></details>

## Conversation 7: Solving a Group Work Conflict

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-fuchsia-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-fuchsia-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-fuchsia-800">Student A</div><div>Teacher, I don't want to work with my group anymore. Nobody listens to my ideas.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-purple-800">Student B</div><div>That's not true. He keeps changing the plan without asking us.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Let's calm down. I want each of you to explain the problem without <mark class="rounded-lg bg-fuchsia-200 px-1.5 py-0.5 font-bold text-fuchsia-950">interrupting</mark>.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-fuchsia-800">Student A</div><div>I feel ignored when my role is not clear.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-slate-800">Teacher</div><div>Then let's assign clear roles: leader, recorder, presenter, and timekeeper. Can everyone agree to that?</div></div>
  </div>
</div>

<details class="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-fuchsia-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 7</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Student A:</strong> ครูครับ ผมไม่อยากทำงานกับกลุ่มแล้ว ไม่มีใครฟังความคิดของผมเลย</div>
  <div><strong>Student B:</strong> ไม่จริงครับ เขาเปลี่ยนแผนตลอดโดยไม่ถามพวกเรา</div>
  <div><strong>Teacher:</strong> ใจเย็นก่อน ครูอยากให้แต่ละคนอธิบายปัญหาโดยไม่พูดแทรกกัน</div>
  <div><strong>Student A:</strong> ผมรู้สึกถูกมองข้ามเมื่อบทบาทของผมไม่ชัดเจน</div>
  <div><strong>Teacher:</strong> งั้นเรากำหนดบทบาทให้ชัด ได้แก่ หัวหน้า ผู้บันทึก ผู้นำเสนอ และผู้ดูเวลา ทุกคนตกลงไหม</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-fuchsia-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-fuchsia-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-fuchsia-100"><tr><td class="px-4 py-3 font-bold">interrupt</td><td class="px-4 py-3">พูดแทรก</td><td class="px-4 py-3">ขัดจังหวะคนพูด</td></tr><tr><td class="px-4 py-3 font-bold">ignored</td><td class="px-4 py-3">ถูกมองข้าม</td><td class="px-4 py-3">ไม่มีใครรับฟัง</td></tr><tr><td class="px-4 py-3 font-bold">assign roles</td><td class="px-4 py-3">แบ่งบทบาท</td><td class="px-4 py-3">แก้ปัญหางานกลุ่ม</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-fuchsia-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-fuchsia-700">1</td><td class="px-4 py-3">What is the problem?</td><td class="px-4 py-3">A. A group work conflict<br/>B. A lost textbook<br/>C. A late bus<br/>D. A broken window</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">2</td><td class="px-4 py-3">What does Student A complain about?</td><td class="px-4 py-3">A. Nobody listens to his ideas.<br/>B. He forgot lunch.<br/>C. He cannot read.<br/>D. He wants a new class.</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">3</td><td class="px-4 py-3">What does Student B say Student A does?</td><td class="px-4 py-3">A. Changes the plan without asking<br/>B. Helps everyone<br/>C. Writes slowly<br/>D. Arrives early</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">4</td><td class="px-4 py-3">The word "interrupting" means _____.</td><td class="px-4 py-3">A. speaking while another person is speaking<br/>B. helping quietly<br/>C. writing notes<br/>D. finishing work</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">5</td><td class="px-4 py-3">How does the teacher begin solving the conflict?</td><td class="px-4 py-3">A. By asking them to calm down<br/>B. By blaming one student<br/>C. By ending the project<br/>D. By calling the police</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">6</td><td class="px-4 py-3">Why does Student A feel ignored?</td><td class="px-4 py-3">A. His role is not clear.<br/>B. He lost his pen.<br/>C. He dislikes timekeepers.<br/>D. He forgot the assignment.</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">7</td><td class="px-4 py-3">What solution does the teacher suggest?</td><td class="px-4 py-3">A. Assigning clear roles<br/>B. Cancelling the group<br/>C. Giving extra homework<br/>D. Ignoring the argument</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">8</td><td class="px-4 py-3">Which role is NOT mentioned?</td><td class="px-4 py-3">A. Leader<br/>B. Recorder<br/>C. Presenter<br/>D. Photographer</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">9</td><td class="px-4 py-3">The teacher's approach is _____.</td><td class="px-4 py-3">A. mediation<br/>B. punishment only<br/>C. silence<br/>D. competition</td></tr>
<tr><td class="px-4 py-3 font-black text-fuchsia-700">10</td><td class="px-4 py-3">Which reply best fits "Can everyone agree to that?"</td><td class="px-4 py-3">A. Yes, that sounds fair.<br/>B. I refuse to listen.<br/>C. Stop teaching us.<br/>D. I will leave now.</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-fuchsia-900">เปิด/ปิดเฉลย Conversation 7</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-fuchsia-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-fuchsia-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ปัญหาคืออะไร / ถาม main problem</td><td class="px-4 py-3">นักเรียนสองคนโต้แย้งเรื่องงานกลุ่ม</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">Student A บ่นเรื่องอะไร / ถาม detail</td><td class="px-4 py-3">Nobody listens to my ideas</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">Student B กล่าวหาอะไร / ถาม detail</td><td class="px-4 py-3">He keeps changing the plan without asking us</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">interrupting หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">คือพูดแทรกระหว่างคนอื่นพูด</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูเริ่มแก้ปัญหาอย่างไร / ถาม action</td><td class="px-4 py-3">Let's calm down</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ทำไม Student A รู้สึกถูกมองข้าม / ถาม cause</td><td class="px-4 py-3">my role is not clear</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูเสนอวิธีแก้ใด / ถาม solution</td><td class="px-4 py-3">assign clear roles</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">D</td><td class="px-4 py-3">บทบาทใดไม่ได้กล่าวถึง / ถาม NOT mentioned</td><td class="px-4 py-3">มี leader, recorder, presenter, timekeeper ไม่มี photographer</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">แนวทางของครูคืออะไร / ถาม approach</td><td class="px-4 py-3">ครูให้ฟังกันและแบ่งบทบาท เป็นการไกล่เกลี่ย</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ควรตอบคำถาม Can everyone agree? อย่างไร / ถาม response</td><td class="px-4 py-3">Yes, that sounds fair ตอบรับอย่างเหมาะสม</td></tr>
</tbody></table></div></details>

## Conversation 8: Planning a Reading Corner

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-blue-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-blue-800">Librarian</div><div>I heard your class is starting a reading project. How can the library support you?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>We would like to create a small reading corner with books at different <mark class="rounded-lg bg-blue-200 px-1.5 py-0.5 font-bold text-blue-950">levels</mark> so every student can choose comfortably.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-blue-800">Librarian</div><div>That's a good idea. I can prepare storybooks, short articles, and picture books by Monday.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Could you also recommend books for reluctant readers?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-blue-800">Librarian</div><div>Certainly. Humorous stories and books with short chapters usually <mark class="rounded-lg bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-900">encourage</mark> them to start reading.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-blue-200 bg-blue-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-blue-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 8</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Librarian:</strong> ได้ยินว่าห้องของครูกำลังเริ่มโครงการอ่าน ห้องสมุดจะช่วยได้อย่างไรบ้างคะ</div>
  <div><strong>Teacher:</strong> เราอยากจัดมุมอ่านเล็ก ๆ ที่มีหนังสือหลายระดับ เพื่อให้นักเรียนทุกคนเลือกได้อย่างสบายใจ</div>
  <div><strong>Librarian:</strong> เป็นความคิดที่ดีค่ะ ฉันเตรียมนิทาน บทความสั้น และหนังสือภาพให้ได้ภายในวันจันทร์</div>
  <div><strong>Teacher:</strong> ช่วยแนะนำหนังสือสำหรับนักเรียนที่ไม่ค่อยอยากอ่านได้ไหมคะ</div>
  <div><strong>Librarian:</strong> ได้ค่ะ เรื่องตลกและหนังสือที่มีบทสั้น ๆ มักช่วยกระตุ้นให้พวกเขาเริ่มอ่าน</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-blue-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-blue-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-blue-100"><tr><td class="px-4 py-3 font-bold">levels</td><td class="px-4 py-3">ระดับ</td><td class="px-4 py-3">ความยากง่ายของหนังสือ</td></tr><tr><td class="px-4 py-3 font-bold">reluctant readers</td><td class="px-4 py-3">ผู้เรียนที่ไม่ค่อยอยากอ่าน</td><td class="px-4 py-3">ต้องใช้หนังสือดึงดูด</td></tr><tr><td class="px-4 py-3 font-bold">encourage</td><td class="px-4 py-3">กระตุ้น/ส่งเสริม</td><td class="px-4 py-3">ทำให้อยากเริ่ม</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-blue-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-blue-700">1</td><td class="px-4 py-3">What project is the class starting?</td><td class="px-4 py-3">A. A reading project<br/>B. A sports project<br/>C. A cooking project<br/>D. A music contest</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">2</td><td class="px-4 py-3">What does the teacher want to create?</td><td class="px-4 py-3">A. A reading corner<br/>B. A new office<br/>C. A science lab<br/>D. A bus stop</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">3</td><td class="px-4 py-3">Why should books be at different levels?</td><td class="px-4 py-3">A. So every student can choose comfortably<br/>B. So students cannot read them<br/>C. So books look expensive<br/>D. So teachers do not read</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">4</td><td class="px-4 py-3">When can the librarian prepare the books?</td><td class="px-4 py-3">A. By Monday<br/>B. By Friday night<br/>C. Next year<br/>D. Immediately after lunch only</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">5</td><td class="px-4 py-3">Which type of book is NOT mentioned?</td><td class="px-4 py-3">A. Storybooks<br/>B. Short articles<br/>C. Picture books<br/>D. Cookbooks</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">6</td><td class="px-4 py-3">The phrase "reluctant readers" means students who _____.</td><td class="px-4 py-3">A. are not eager to read<br/>B. read every day happily<br/>C. write novels<br/>D. sell books</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">7</td><td class="px-4 py-3">Which books may encourage reluctant readers?</td><td class="px-4 py-3">A. Humorous stories and books with short chapters<br/>B. Long dictionaries only<br/>C. Blank notebooks<br/>D. Exam reports</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">8</td><td class="px-4 py-3">What does "Certainly" show?</td><td class="px-4 py-3">A. Agreement to help<br/>B. Refusal<br/>C. Anger<br/>D. Confusion</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">9</td><td class="px-4 py-3">The conversation shows cooperation between _____.</td><td class="px-4 py-3">A. a teacher and a librarian<br/>B. two students only<br/>C. a parent and a doctor<br/>D. a shopkeeper and a customer</td></tr>
<tr><td class="px-4 py-3 font-black text-blue-700">10</td><td class="px-4 py-3">What is the best title?</td><td class="px-4 py-3">A. Choosing Books for a Reading Corner<br/>B. Repairing the Library Door<br/>C. Buying Lunch at School<br/>D. Cancelling a Reading Project</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-blue-200 bg-blue-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-blue-900">เปิด/ปิดเฉลย Conversation 8</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-blue-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-blue-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">เริ่มโครงการอะไร / ถาม detail</td><td class="px-4 py-3">librarian พูดว่า reading project</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ครูต้องการสร้างอะไร / ถาม detail</td><td class="px-4 py-3">create a small reading corner</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ทำไมต้องหลายระดับ / ถาม purpose</td><td class="px-4 py-3">so every student can choose comfortably</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">เตรียมหนังสือได้เมื่อไร / ถาม time</td><td class="px-4 py-3">by Monday</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">D</td><td class="px-4 py-3">หนังสือประเภทใดไม่ได้กล่าวถึง / ถาม NOT mentioned</td><td class="px-4 py-3">กล่าวถึง storybooks, short articles, picture books ไม่มี cookbooks</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">reluctant readers หมายถึงใคร / ถามศัพท์</td><td class="px-4 py-3">คือผู้ที่ไม่ค่อยอยากอ่าน</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">หนังสือใดช่วยกระตุ้นผู้อ่านกลุ่มนี้ / ถาม detail</td><td class="px-4 py-3">Humorous stories and books with short chapters</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">Certainly แสดงอะไร / ถาม function</td><td class="px-4 py-3">เป็นการตอบรับว่าจะช่วย</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ใครร่วมมือกัน / ถาม speakers</td><td class="px-4 py-3">บทสนทนาเป็น librarian กับ teacher</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ชื่อเรื่องที่ดีที่สุดคืออะไร / ถาม title</td><td class="px-4 py-3">ครอบคลุมการเลือกหนังสือสำหรับมุมอ่าน</td></tr>
</tbody></table></div></details>

## Conversation 9: Calling the School Office

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-slate-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Officer</div><div>Good morning, Ban Mai School. How may I help you?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-blue-800">Applicant</div><div>Good morning. I would like to ask about the documents required for teacher application.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Officer</div><div>Certainly. Please prepare your ID card copy, degree certificate, transcript, and recent photo.</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-blue-800">Applicant</div><div>Do I need to <mark class="rounded-lg bg-slate-200 px-1.5 py-0.5 font-bold text-slate-950">certify</mark> the copies?</div></div>
    <div class="grid grid-cols-[110px_1fr] gap-4 py-3"><div class="font-black text-slate-800">Officer</div><div>Yes, please sign every copy. Applications must be submitted in person before 4:30 p.m. this Friday.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-slate-200 bg-slate-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-slate-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 9</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Officer:</strong> สวัสดีตอนเช้าค่ะ โรงเรียนบ้านใหม่ มีอะไรให้ช่วยไหมคะ</div>
  <div><strong>Applicant:</strong> สวัสดีตอนเช้าครับ ผมอยากสอบถามเอกสารที่ต้องใช้สมัครครู</div>
  <div><strong>Officer:</strong> ได้ค่ะ กรุณาเตรียมสำเนาบัตรประชาชน ใบปริญญา ใบแสดงผลการเรียน และรูปถ่ายปัจจุบัน</div>
  <div><strong>Applicant:</strong> ผมต้องรับรองสำเนาเอกสารไหมครับ</div>
  <div><strong>Officer:</strong> ใช่ค่ะ กรุณาเซ็นสำเนาทุกฉบับ ต้องยื่นใบสมัครด้วยตนเองก่อน 16.30 น. วันศุกร์นี้</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-slate-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-slate-200"><tr><td class="px-4 py-3 font-bold">required</td><td class="px-4 py-3">ที่จำเป็นต้องใช้</td><td class="px-4 py-3">เอกสารบังคับ</td></tr><tr><td class="px-4 py-3 font-bold">certify</td><td class="px-4 py-3">รับรองสำเนา</td><td class="px-4 py-3">เซ็นรับรองสำเนาถูกต้อง</td></tr><tr><td class="px-4 py-3 font-bold">in person</td><td class="px-4 py-3">ด้วยตนเอง</td><td class="px-4 py-3">ไม่ฝากหรือส่งออนไลน์</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-slate-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-slate-700">1</td><td class="px-4 py-3">Who is the applicant calling?</td><td class="px-4 py-3">A. The school office<br/>B. A hospital<br/>C. A museum<br/>D. A bank</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">2</td><td class="px-4 py-3">What does the applicant ask about?</td><td class="px-4 py-3">A. Required documents<br/>B. Lunch prices<br/>C. Bus schedules<br/>D. School uniforms only</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">3</td><td class="px-4 py-3">Which document is NOT mentioned?</td><td class="px-4 py-3">A. ID card copy<br/>B. Degree certificate<br/>C. Transcript<br/>D. Driving license</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">4</td><td class="px-4 py-3">What does "certify the copies" mean?</td><td class="px-4 py-3">A. Sign to confirm the copies<br/>B. Throw away the copies<br/>C. Translate the copies<br/>D. Buy new copies</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">5</td><td class="px-4 py-3">How many copies should be signed?</td><td class="px-4 py-3">A. Every copy<br/>B. Only one copy<br/>C. No copy<br/>D. Only the photo</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">6</td><td class="px-4 py-3">How must the application be submitted?</td><td class="px-4 py-3">A. In person<br/>B. By social media only<br/>C. By a student<br/>D. By phone call only</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">7</td><td class="px-4 py-3">What is the deadline?</td><td class="px-4 py-3">A. Before 4:30 p.m. this Friday<br/>B. Before noon tomorrow<br/>C. Next Monday morning<br/>D. Tonight at midnight</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">8</td><td class="px-4 py-3">Which phrase is a polite opening on the phone?</td><td class="px-4 py-3">A. How may I help you?<br/>B. What do you want?<br/>C. Hurry up.<br/>D. I am busy.</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">9</td><td class="px-4 py-3">The conversation is mainly for _____.</td><td class="px-4 py-3">A. requesting information<br/>B. refusing help<br/>C. telling a joke<br/>D. ordering food</td></tr>
<tr><td class="px-4 py-3 font-black text-slate-700">10</td><td class="px-4 py-3">Which response best ends the call?</td><td class="px-4 py-3">A. Thank you for your information.<br/>B. I don't need you.<br/>C. Stop talking.<br/>D. That is impossible.</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-slate-200 bg-slate-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-slate-900">เปิด/ปิดเฉลย Conversation 9</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-slate-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">โทรหาใคร / ถาม place/speaker</td><td class="px-4 py-3">Officer รับสายว่า Ban Mai School</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ถามเรื่องอะไร / ถาม topic</td><td class="px-4 py-3">documents required for teacher application</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">D</td><td class="px-4 py-3">เอกสารใดไม่ได้กล่าวถึง / ถาม NOT mentioned</td><td class="px-4 py-3">ไม่มี driving license ในรายการ</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">certify copies หมายถึงอะไร / ถามศัพท์ราชการ</td><td class="px-4 py-3">Officer บอก please sign every copy</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ต้องเซ็นกี่ฉบับ / ถาม detail</td><td class="px-4 py-3">every copy</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ต้องยื่นอย่างไร / ถาม method</td><td class="px-4 py-3">submitted in person</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">กำหนดส่งเมื่อไร / ถาม deadline</td><td class="px-4 py-3">before 4:30 p.m. this Friday</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">วลีเปิดสายสุภาพคืออะไร / ถาม phone expression</td><td class="px-4 py-3">How may I help you? สุภาพที่สุด</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">บทสนทนานี้มีไว้เพื่ออะไร / ถาม purpose</td><td class="px-4 py-3">ผู้สมัครโทรถามข้อมูลเอกสารและกำหนดเวลา</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ควรปิดท้ายสายอย่างไร / ถาม polite closing</td><td class="px-4 py-3">ขอบคุณข้อมูลเป็นการจบบทสนทนาอย่างเหมาะสม</td></tr>
</tbody></table></div></details>

## Conversation 10: Environment Club Announcement

<div class="rounded-3xl border border-slate-200 bg-white p-6 my-6 shadow-sm">
  <div class="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
    <span class="rounded-full bg-green-100 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-green-800">Dialogue</span>
    <span class="text-sm font-bold text-slate-500">Read the conversation and answer questions 1-10.</span>
  </div>
  <div class="space-y-0 text-[1.08rem] leading-relaxed text-slate-900">
    <div class="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-green-800">Student Leader</div><div>Teacher, our environment club wants to organize a Reduce Plastic Day next month.</div></div>
    <div class="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>That sounds meaningful. What activities do you have in mind?</div></div>
    <div class="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-green-800">Student Leader</div><div>We plan to set up a booth, make posters, and invite students to bring <mark class="rounded-lg bg-green-200 px-1.5 py-0.5 font-bold text-green-950">reusable</mark> bottles.</div></div>
    <div class="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-slate-800">Teacher</div><div>Good. Before making an announcement, please prepare a proposal and ask the principal for <mark class="rounded-lg bg-amber-100 px-1.5 py-0.5 font-bold text-amber-900">approval</mark>.</div></div>
    <div class="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 py-3"><div class="font-black text-green-800">Student Leader</div><div>Understood. Could you check our proposal before we submit it?</div></div>
    <div class="grid grid-cols-[130px_1fr] gap-4 py-3"><div class="font-black text-slate-800">Teacher</div><div>Certainly. Send it to me by Wednesday, and I will give you feedback.</div></div>
  </div>
</div>

<details class="rounded-2xl border border-green-200 bg-green-50 p-5 my-4 shadow-sm"><summary class="cursor-pointer list-none text-lg font-black text-green-900">เปิด/ปิดคำแปลไทยและคำศัพท์ Conversation 10</summary><div class="mt-4 space-y-3 text-lg leading-relaxed text-slate-700">
  <div><strong>Student Leader:</strong> ครูครับ ชุมนุมสิ่งแวดล้อมของเราอยากจัดวันลดพลาสติกเดือนหน้า</div>
  <div><strong>Teacher:</strong> ฟังดูมีความหมายมาก พวกเธอคิดกิจกรรมอะไรไว้บ้าง</div>
  <div><strong>Student Leader:</strong> เราวางแผนตั้งบูธ ทำโปสเตอร์ และเชิญชวนนักเรียนให้นำขวดน้ำที่ใช้ซ้ำได้มา</div>
  <div><strong>Teacher:</strong> ดีมาก ก่อนประกาศ ให้เตรียมข้อเสนอโครงการและขออนุมัติจากผู้อำนวยการก่อน</div>
  <div><strong>Student Leader:</strong> เข้าใจครับ ครูช่วยตรวจข้อเสนอก่อนที่เราจะส่งได้ไหมครับ</div>
  <div><strong>Teacher:</strong> ได้สิ ส่งให้ครูภายในวันพุธ แล้วครูจะให้ข้อเสนอแนะ</div>
  <div class="mt-4 overflow-x-auto rounded-xl border border-green-100 bg-white"><table class="w-full min-w-[680px] text-left"><thead><tr class="bg-green-700 text-white"><th class="px-4 py-3">Word / Phrase</th><th class="px-4 py-3">Meaning</th><th class="px-4 py-3">Context</th></tr></thead><tbody class="divide-y divide-green-100"><tr><td class="px-4 py-3 font-bold">reusable</td><td class="px-4 py-3">ใช้ซ้ำได้</td><td class="px-4 py-3">ลดขยะพลาสติก</td></tr><tr><td class="px-4 py-3 font-bold">proposal</td><td class="px-4 py-3">ข้อเสนอโครงการ</td><td class="px-4 py-3">เอกสารเสนอแผน</td></tr><tr><td class="px-4 py-3 font-bold">approval</td><td class="px-4 py-3">การอนุมัติ</td><td class="px-4 py-3">ขออนุญาตอย่างเป็นทางการ</td></tr></tbody></table></div>
</div></details>

### Questions 1-10
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full min-w-[900px] bg-white text-left border-collapse"><thead><tr class="bg-green-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">Question</th><th class="px-4 py-3">Choices</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-800">
<tr><td class="px-4 py-3 font-black text-green-700">1</td><td class="px-4 py-3">What event does the club want to organize?</td><td class="px-4 py-3">A. Reduce Plastic Day<br/>B. Sports Day<br/>C. Music Day<br/>D. Book Sale Day</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">2</td><td class="px-4 py-3">When do they want to organize it?</td><td class="px-4 py-3">A. Next month<br/>B. Tomorrow morning<br/>C. Last week<br/>D. This afternoon</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">3</td><td class="px-4 py-3">Which activity is NOT planned?</td><td class="px-4 py-3">A. Setting up a booth<br/>B. Making posters<br/>C. Inviting reusable bottles<br/>D. Selling plastic bags</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">4</td><td class="px-4 py-3">The word "reusable" means _____.</td><td class="px-4 py-3">A. able to be used again<br/>B. used only once<br/>C. broken<br/>D. expensive</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">5</td><td class="px-4 py-3">What must students prepare before making an announcement?</td><td class="px-4 py-3">A. A proposal<br/>B. A final exam<br/>C. A bus ticket<br/>D. A lunch box</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">6</td><td class="px-4 py-3">Who should approve the activity?</td><td class="px-4 py-3">A. The principal<br/>B. A shopkeeper<br/>C. A bus driver<br/>D. A librarian only</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">7</td><td class="px-4 py-3">What does the student ask the teacher to do?</td><td class="px-4 py-3">A. Check the proposal<br/>B. Cancel the club<br/>C. Buy plastic cups<br/>D. Write every poster alone</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">8</td><td class="px-4 py-3">When should the proposal be sent to the teacher?</td><td class="px-4 py-3">A. By Wednesday<br/>B. By Sunday night<br/>C. Next year<br/>D. Immediately after the event</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">9</td><td class="px-4 py-3">The teacher's role is mainly to _____.</td><td class="px-4 py-3">A. guide students through the proper process<br/>B. reject all student activities<br/>C. sell bottles<br/>D. design the whole event alone</td></tr>
<tr><td class="px-4 py-3 font-black text-green-700">10</td><td class="px-4 py-3">Which sentence is the best polite request?</td><td class="px-4 py-3">A. Could you check our proposal before we submit it?<br/>B. Check it now.<br/>C. You must do it.<br/>D. Give me approval.</td></tr>
</tbody></table></div>

<details class="rounded-3xl border border-green-200 bg-green-50 p-5 my-6 shadow-sm"><summary class="cursor-pointer list-none text-xl font-black text-green-900">เปิด/ปิดเฉลย Conversation 10</summary><div class="mt-4 overflow-x-auto"><table class="w-full min-w-[920px] bg-white text-left border-collapse rounded-2xl overflow-hidden"><thead><tr class="bg-green-700 text-white"><th class="px-4 py-3">ข้อ</th><th class="px-4 py-3">เฉลย</th><th class="px-4 py-3">แปลคำถาม / ถามอะไร</th><th class="px-4 py-3">เหตุผล</th></tr></thead><tbody class="divide-y divide-green-100 text-slate-800">
<tr><td class="px-4 py-3">1</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ชุมนุมอยากจัดงานอะไร / ถาม event</td><td class="px-4 py-3">Student Leader พูดว่า Reduce Plastic Day</td></tr>
<tr><td class="px-4 py-3">2</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">อยากจัดเมื่อไร / ถาม time</td><td class="px-4 py-3">next month</td></tr>
<tr><td class="px-4 py-3">3</td><td class="px-4 py-3 font-black">D</td><td class="px-4 py-3">กิจกรรมใดไม่ได้วางแผน / ถาม NOT mentioned</td><td class="px-4 py-3">มี booth, posters, reusable bottles ไม่มี selling plastic bags</td></tr>
<tr><td class="px-4 py-3">4</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">reusable หมายถึงอะไร / ถามศัพท์</td><td class="px-4 py-3">reusable bottles คือขวดที่ใช้ซ้ำได้</td></tr>
<tr><td class="px-4 py-3">5</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ก่อนประกาศต้องเตรียมอะไร / ถาม procedure</td><td class="px-4 py-3">prepare a proposal</td></tr>
<tr><td class="px-4 py-3">6</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ใครควรอนุมัติกิจกรรม / ถาม person</td><td class="px-4 py-3">ask the principal for approval</td></tr>
<tr><td class="px-4 py-3">7</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">นักเรียนขอให้ครูทำอะไร / ถาม request</td><td class="px-4 py-3">Could you check our proposal?</td></tr>
<tr><td class="px-4 py-3">8</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ต้องส่ง proposal เมื่อไร / ถาม deadline</td><td class="px-4 py-3">Send it to me by Wednesday</td></tr>
<tr><td class="px-4 py-3">9</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">บทบาทของครูคืออะไร / ถาม inference</td><td class="px-4 py-3">ครูแนะนำขั้นตอน proposal, approval และ feedback</td></tr>
<tr><td class="px-4 py-3">10</td><td class="px-4 py-3 font-black">A</td><td class="px-4 py-3">ประโยคขอร้องสุภาพที่สุดคือข้อใด / ถาม politeness</td><td class="px-4 py-3">Could you...? เป็นรูปสุภาพกว่าคำสั่งตรง ๆ</td></tr>
</tbody></table></div></details>
`
  }
];
