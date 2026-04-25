import React from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const md = `
<div className="test text-red-500">Hello</div>
`;

const html = renderToString(React.createElement(ReactMarkdown, {
  rehypePlugins: [rehypeRaw],
  children: md
}));

console.log(html);
