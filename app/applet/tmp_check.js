import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const c22 = fs.readFileSync(path.join(__dirname, 'content/A1-2/chapter22.ts'), 'utf8');
console.log(c22.substring(0, 500));
