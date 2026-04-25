import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const md = `
<span className="material-symbols-outlined text-red-500">group_add</span>
<div className="test">Hello</div>
`;

const html = renderToString(React.createElement(ReactMarkdown, {
  rehypePlugins: [rehypeRaw],
  children: md
}));

console.log(html);
