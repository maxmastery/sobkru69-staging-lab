const fs = require('fs');
const files = [
  './content/A1-2/chapter0_2.ts',
  './content/A1-2/chapter_summary_quiz.ts'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix single backslash \frac, \text, \times, \div, \sqrt
  content = content.replace(/(?<!\\)\\frac/g, '\\\\frac');
  content = content.replace(/(?<!\\)\\text/g, '\\\\text');
  content = content.replace(/(?<!\\)\\times/g, '\\\\times');
  content = content.replace(/(?<!\\)\\div/g, '\\\\div');
  content = content.replace(/(?<!\\)\\sqrt/g, '\\\\sqrt');
  
  // Fix **วิธีทำ:** to have a blank line before it
  // Sometimes there's carriage returns, so handle \r\n as well
  content = content.replace(/\r?\n\*\*วิธีทำ:\*\*\r?\n/g, '\n\n**วิธีทำ:**\n');

  // Fix SVG / HTML blocks by removing blank lines inside them
  const parts = content.split(/(<div className="flex justify-center my-6">[\s\S]*?<\/div>)/g);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = parts[i].replace(/\r?\n\s*\r?\n/g, '\n');
  }
  content = parts.join('');

  fs.writeFileSync(file, content);
}
console.log('Fixed files');
