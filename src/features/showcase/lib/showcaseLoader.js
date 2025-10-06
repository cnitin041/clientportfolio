// Utility to load showcase JSON files from src/showcase/ at build time
// Schema per file:
// {
//   "slug": "dev-houdini-local-sim",
//   "title": "DEV#1 - Houdini Local Simulation",
//   "category": "Development", // Development | Showreel | Houdini RND's
//   "image": "https://.../thumb.jpg",
//   "url": "https://youtu.be/...", // optional external link to open
//   "subtitle": "Product Developments & Tools Development for Houdini" // optional per-item subtitle
// }

const context = require.context('../content', false, /\.json$/);

export const loadAllShowcase = () => {
  const items = context.keys().map((key) => {
    const data = context(key);
    const raw = data.default ?? data;
    return raw;
  });
  // Ensure unique slugs to avoid React key collisions
  const seen = new Set();
  const unique = [];
  for (const it of items) {
    if (seen.has(it.slug)) {
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[showcaseLoader] Duplicate slug encountered and skipped: ${it.slug}`);
      }
      continue;
    }
    seen.add(it.slug);
    unique.push(it);
  }
  // Stable ordering (optional): by title asc within category
  unique.sort((a, b) => (a.category || '').localeCompare(b.category || '') || (a.title || '').localeCompare(b.title || ''));
  return unique;
};

export const byCategory = (category) => loadAllShowcase().filter(i => i.category === category);

export const getShowcaseBySlug = (slug) => loadAllShowcase().find(i => i.slug === slug);
