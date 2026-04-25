import fs from 'fs';

let content = fs.readFileSync('./content/A1-2/chapter0_2.ts', 'utf-8');
content = content.replace(/(?<!\\)\\frac/g, '\\\\frac')
  .replace(/(?<!\\)\\text/g, '\\\\text')
  .replace(/(?<!\\)\\times/g, '\\\\times')
  .replace(/\n\*\*วิธีทำ:\*\*\n/g, '\n\n**วิธีทำ:**\n');

const parts = content.split(/(<div className="flex justify-center my-6">[\s\S]*?<\/div>)/g);
for (let i = 1; i < parts.length; i += 2) {
  parts[i] = parts[i].replace(/\r?\n\s*\r?\n/g, '\n');
}
content = parts.join('');

fs.writeFileSync('./content/A1-2/chapter0_2.ts', content);

let content2 = fs.readFileSync('./content/A1-2/chapter_summary_quiz.ts', 'utf-8');
content2 = content2.replace(/(?<!\\)\\frac/g, '\\\\frac')
  .replace(/(?<!\\)\\times/g, '\\\\times')
  .replace(/(?<!\\)\\text/g, '\\\\text');
fs.writeFileSync('./content/A1-2/chapter_summary_quiz.ts', content2);

console.log('MY_CUSTOM_FIXED');
