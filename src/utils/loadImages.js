// Utility to dynamically import images from an assets subfolder (CRA / Webpack)
// Usage:
//   const src = getFirstImage('assets/profile', fallbackUrl)
//   const all = getImages('assets/projects')

// Static contexts per known directory to satisfy Webpack static analysis
function getStaticContext(dir) {
  const pattern = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
  switch (dir) {
    case 'assets/profile':
      return require.context('../assets/profile', false, pattern);
    case 'assets/projects':
      return require.context('../assets/projects', false, pattern);
    case 'assets/gallery':
      return require.context('../assets/gallery', false, pattern);
    default:
      return null;
  }
}

// Import all images in a directory using a static context
function importAll(r) {
  try {
    return r.keys().map(r);
  } catch (e) {
    return [];
  }
}

// dir should be one of the known keys above, e.g., 'assets/profile'
export function getImages(dir) {
  const ctx = getStaticContext(dir);
  if (!ctx) return [];
  return importAll(ctx);
}

export function getFirstImage(dir, fallback = '') {
  const images = getImages(dir);
  return images.length > 0 ? images[0] : fallback;
}

// Get image by exact filename (e.g., 'mehul.avif') from a directory
export function getImageByFilename(dir, filename) {
  const ctx = getStaticContext(dir);
  if (!ctx) return '';
  try {
    const keys = ctx.keys();
    const matchKey = keys.find(k => k.endsWith(`/${filename}`));
    return matchKey ? ctx(matchKey) : '';
  } catch (e) {
    return '';
  }
}
