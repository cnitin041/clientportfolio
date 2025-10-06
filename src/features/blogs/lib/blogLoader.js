// Utility to load blog JSON files from src/blogs/ at build time (Webpack require.context)
// Each JSON should follow the schema:
// {
//   "slug": "my-post",
//   "title": "My Post",
//   "date": "Sep 2025",
//   "read": "5 min read",
//   "category": "Houdini",
//   "image": "/path/or/url.jpg",
//   "excerpt": "Short teaser...",
//   "content": [
//     { "type": "p", "text": "Paragraph text... supports basic markdown like **bold**." },
//     { "type": "code", "language": "js", "text": "const x = 1;\nconsole.log(x);" }
//   ]
// }

export const unescapeHtml = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'");
};

// Load all JSON files in feature content directory
const context = require.context('../content', false, /\.json$/);

export const loadAllBlogs = () => {
  const items = context.keys().map((key) => {
    const data = context(key);
    // CRA/Webpack may put JSON under default
    const raw = data.default ?? data;
    return {
      ...raw,
      content: Array.isArray(raw.content)
        ? raw.content.map((b) => ({ ...b, text: unescapeHtml(b.text) }))
        : [],
    };
  });
  // sort newest first by date string if possible
  return items.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBlogBySlug = (slug) => {
  const list = loadAllBlogs();
  return list.find((b) => b.slug === slug);
};
