import fs from 'fs';

let code = fs.readFileSync('components/Auth.tsx', 'utf-8');

code = code.replace(/https:\/\/drive\.google\.com\/uc\?export=view&id=/g, 'https://lh3.googleusercontent.com/d/');

fs.writeFileSync('components/Auth.tsx', code);
console.log('Fixed image URLs');
