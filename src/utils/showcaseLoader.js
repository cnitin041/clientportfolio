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

const context = require.context('../showcase', false, /\.json$/);

export const loadAllShowcase = () => {
  const items = context.keys().map((key) => {
    const data = context(key);
    const raw = data.default ?? data;
    return raw;
  });
  return items;
};

export const byCategory = (category) => loadAllShowcase().filter(i => i.category === category);

export const getShowcaseBySlug = (slug) => loadAllShowcase().find(i => i.slug === slug);
