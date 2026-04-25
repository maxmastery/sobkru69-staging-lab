import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const allTsFiles = walkDir(path.join(__dirname, 'content'));
allTsFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('className="')) {
      content = content.replace(/className="/g, 'class="');
      fs.writeFileSync(f, content, 'utf8');
      console.log('Reverted to class=', f);
  }
});
console.log('Done reverting className= to class= in all /content/');
