import fs from 'fs';
const files = [
  'content/A3-2/chap1.ts',
  'content/A3-2/chap2.ts',
  'content/A3-2/chap3.ts',
  'content/A3-2/chap4.ts'
];
files.forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  txt = txt.split('\n').map(l => l.replace(/^[ \t]+/, '')).join('\n');
  fs.writeFileSync(f, txt);
});
