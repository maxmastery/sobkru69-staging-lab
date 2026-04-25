import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(filePath));
        } else if (filePath.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results;
}

const allTsFiles = walkDir('content');
allTsFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('class="')) {
      content = content.replace(/class="/g, 'className="');
      fs.writeFileSync(f, content, 'utf8');
      console.log('Fixed', f);
  }
});
console.log('Done replacing class= with className= in all /content/');
