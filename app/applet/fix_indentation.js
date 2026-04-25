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

const allTsFiles = walkDir(path.join(__dirname, 'content/A3-2'));
allTsFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let lines = content.split('\n');
  let inTemplateLiteral = false;
  
  lines = lines.map(line => {
    // Trim leading whitespace for lines inside the template literal
    // to avoid markdown 4-space code block issues.
    if (line.includes('\`') && !inTemplateLiteral) {
      inTemplateLiteral = true;
      return line.trimStart();
    } else if (line.includes('\`') && inTemplateLiteral) {
      inTemplateLiteral = false;
      return line.trimStart();
    } else if (inTemplateLiteral) {
      return line.trimStart();
    }
    return line;
  });
  
  fs.writeFileSync(f, lines.join('\n'), 'utf8');
  console.log('Fixed indentation in', f);
});

const allTsFilesA31 = walkDir(path.join(__dirname, 'content/A3-1'));
allTsFilesA31.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let lines = content.split('\n');
  let inTemplateLiteral = false;
  
  lines = lines.map(line => {
    if (line.includes('\`') && !inTemplateLiteral) {
      inTemplateLiteral = true;
      return line.trimStart();
    } else if (line.includes('\`') && inTemplateLiteral) {
      inTemplateLiteral = false;
      return line.trimStart();
    } else if (inTemplateLiteral) {
      return line.trimStart();
    }
    return line;
  });
  
  fs.writeFileSync(f, lines.join('\n'), 'utf8');
  console.log('Fixed indentation in', f);
});
