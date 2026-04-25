import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const md1 = `<div>
<span class="test1">class-test</span>
</div>`;

const md2 = `<div>
<span className="test2">classname-test</span>
</div>`;

const r1 = renderToStaticMarkup(React.createElement(ReactMarkdown, { rehypePlugins: [rehypeRaw], children: md1 }));
const r2 = renderToStaticMarkup(React.createElement(ReactMarkdown, { rehypePlugins: [rehypeRaw], children: md2 }));

console.log('Class:', r1);
console.log('ClassName:', r2);
