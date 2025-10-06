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
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'");
};

// Load all JSON files in feature content directory
const context = require.context('../content', false, /\.json$/);
// Create a context for blog images folder so JSON can reference local images by path or filename
const imagesContext = require.context(
  '../../../assets/images/Blogs',
  false,
  /\.(png|jpe?g|gif|webp|svg|avif)$/
);

const resolveImage = (img) => {
  if (typeof img !== 'string' || !img) return img;
  // external or absolute URLs are returned as-is
  if (/^https?:\/\//i.test(img) || img.startsWith('/')) return img;
  // normalize slashes and strip leading src/ if present
  let p = img.replace(/\\/g, '/');
  if (p.startsWith('src/')) p = p.slice(4);
  // If a full path under assets/images/Blogs, take the basename
  const parts = p.split('/');
  const filename = parts[parts.length - 1];
  try {
    const mod = imagesContext(`./${filename}`);
    return mod.default ?? mod;
  } catch (e) {
    // Not found in context; return original string
    return img;
  }
};

export const loadAllBlogs = () => {
  const items = context.keys().map((key) => {
    const data = context(key);
    // CRA/Webpack may put JSON under default
    const raw = data.default ?? data;
    return {
      ...raw,
      image: resolveImage(raw.image),
      content: Array.isArray(raw.content)
        ? raw.content.map((b) => {
            const blk = { ...b };
            if (typeof blk.text === 'string') blk.text = unescapeHtml(blk.text);
            // Resolve inline media assets from Blogs images folder
            if (blk.type === 'img' && blk.src) blk.src = resolveImage(blk.src);
            if (blk.type === 'video' && blk.poster) blk.poster = resolveImage(blk.poster);
            return blk;
          })
        : [],
    };
  });
  // sort newest first by date string if possible
  const sorted = items.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Ensure unique slugs to avoid React key collisions if duplicate files exist
  const seen = new Set();
  const unique = [];
  for (const it of sorted) {
    if (seen.has(it.slug)) {
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[blogLoader] Duplicate slug encountered and skipped: ${it.slug}`);
      }
      continue;
    }
    seen.add(it.slug);
    unique.push(it);
  }
  return unique;
};

export const getBlogBySlug = (slug) => {
  const list = loadAllBlogs();
  return list.find((b) => b.slug === slug);
};
