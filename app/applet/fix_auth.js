const fs = require('fs');

let code = fs.readFileSync('components/Auth.tsx', 'utf-8');

// 1. Change outer background to solid light gray and remove absolute image
code = code.replace(
  '<div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 sm:p-8 font-sans relative overflow-hidden">',
  '<div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 sm:p-8 font-sans relative overflow-hidden">'
);
code = code.replace(/\{\/\* Background Image for Outer Container \*\/\}[\s\S]*?\/>\s*<div className="relative w-full/g, '<div className="relative w-full');

// 2. Replace SOBKRU 69 Logo image with text in both Login and Register forms
const textLogo = `<div className="text-3xl font-black text-slate-800 tracking-tight mb-4 flex items-center justify-center gap-2">SOBKRU <span className="text-amber-500">69</span></div>`;
code = code.replace(/<img[^>]*alt="SOBKRU 69 Logo"[^>]*\/>/g, textLogo);

// 3. Fix the background image URLs in Image Section
code = code.replace(/https:\/\/lh3\.googleusercontent\.com\/d\/11nvtDdTQBI1SykhEU1uE0YjXcABRJ_ze/g, "https://drive.google.com/uc?export=view&id=11nvtDdTQBI1SykhEU1uE0YjXcABRJ_ze");

// Fix the CoolCom Logo URL to be consistent and have slightly more opacity
code = code.replace(/https:\/\/lh3\.googleusercontent\.com\/d\/1bqWEpExI8Dzxp8PE1XaRhVqme_tpTEYA/g, "https://drive.google.com/uc?export=view&id=1bqWEpExI8Dzxp8PE1XaRhVqme_tpTEYA");
code = code.replace(/className="h-8 object-contain opacity-90"/g, 'className="h-10 object-contain opacity-100"');

// 4. In Register Form, make the "เอกที่เลือกสอบ" (major) full width to match image 3
// Currently it is not inside the grid, so it's ALREADY full width!

// Let me ensure the quote text is correct format
code = code.replace(/"ความสำเร็จ ไม่ได้ตกมาจากฟ้า แต่เกิดจากการแสวงหาและลงมือทำ"/g, '"ความสำเร็จ ไม่ได้ตกมาจากฟ้า แต่เกิดจากการแสวงหาและลงมือทำ"');

fs.writeFileSync('components/Auth.tsx', code);
console.log('Fixed Auth.tsx logic');
