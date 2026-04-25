import * as fs from 'fs';
const files_a31 = fs.readdirSync('content/A3-1').filter(f => f.endsWith('.ts'));
files_a31.forEach(f => {
  const path = 'content/A3-1/' + f;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/class="/g, 'className="');
  fs.writeFileSync(path, content, 'utf8');
});
console.log('Done replacing class= with className= in A3-1');
