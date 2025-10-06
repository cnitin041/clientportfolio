# Project Manual

This manual explains how to edit the site, post blogs, and update Filmography, Showcase, and Tools. It also outlines the project structure, with concrete examples from the codebase.

## Project Structure

- **Routing**: `src/App.js`
  - Pages and detail routes
  - Examples:
    - Blogs: `/blogs`, `/blogs/:slug`
    - Standalone tools: `/tools/standalone`, `/tools/standalone/:slug`
    - Houdini tools: `/tools/houdini`, `/tools/houdini/:slug`
    - Showcase: `/showcase`, `/showcase/:slug`
    - Filmography: `/filmography`

- **Global styles**: `src/styles/index.css`
- **Layout**:
  - `components/layout/Header.js`
  - `components/layout/Footer.js`
  - `components/layout/PageHero.js`

- **Blogs**
  - Content JSON: `src/features/blogs/content/*.json`
  - Loader: `src/features/blogs/lib/blogLoader.js`
  - Pages:
    - List: `src/features/blogs/pages/Blogs.js`
    - Detail: `src/features/blogs/pages/BlogDetail.js`

- **Filmography**
  - Data: `src/data/filmography.js`
  - Page: `src/features/filmography/pages/Filmography.js`

- **Showcase**
  - Content JSON: `src/features/showcase/content/*.json`
  - Loader: `src/features/showcase/lib/showcaseLoader.js`
  - List page: `src/features/showcase/pages/Showcase.js`
  - Detail page: `src/features/showcase/pages/ShowcaseDetail.js`

- **Tools**
  - Standalone
    - Data: `src/features/tools/data/standalone.js`
    - List page: `src/features/tools/pages/StandaloneTools.js`
    - Detail page: `src/features/tools/pages/StandaloneToolDetail.js`
  - Houdini
    - Data: `src/features/tools/data/houdini.js`
    - List page: `src/features/tools/pages/HoudiniTools.js`
    - Detail page: `src/features/tools/pages/HoudiniToolDetail.js`

- **Assets**
  - Blog images: `src/assets/images/Blogs/`
  - Filmography images: `src/assets/images/Filmography/`
  - Public videos (served directly): `public/videos/`

---

## Blogs: Add / Edit Posts

Blogs are JSON files under `src/features/blogs/content/`. They are loaded by `loadAllBlogs()` in `src/features/blogs/lib/blogLoader.js`.

- Loader features (`blogLoader.js`):
  - Resolves blog lead `image` and inline `img` block `src` from `src/assets/images/Blogs/` by filename.
  - Unescapes HTML entities for `content[].text`.
  - Deduplicates posts by `slug`.
  - Supports inline media blocks:
    - `img`: `{"type":"img","src":"filename.avif","alt":"...","caption":"..."}`
    - `video`: `{"type":"video","src":"/videos/demo.mp4","poster":"filename.avif"}` (place files in `public/videos/`)
    - `embed` (YouTube): `{"type":"embed","url":"https://www.youtube.com/watch?v=ID","title":"..."}`
    - `buttons`: `{"type":"buttons","items":[{"label":"...","href":"#","variant":"primary","disabled":false}]}`

- Detail renderer (`BlogDetail.js`) supports:
  - Paragraphs: `type: "p"`
  - Code blocks with syntax highlighting: `type: "code"` and `language`
  - Inline images: `type: "img"`
  - Inline videos (from `/public/videos`): `type: "video"`
  - YouTube embeds: `type: "embed"`
  - Button rows: `type: "buttons"`

- List page (`Blogs.js`):
  - Shows dynamic category chips (ChipsBar) based on categories present in JSON.
  - Tabs were removed to avoid duplication; only chips remain.

### Add a new blog

1. Place images in `src/assets/images/Blogs/` (e.g., `wazirx.avif`).
2. Create a JSON file, e.g. `src/features/blogs/content/my-post.json`:

```json
{
  "slug": "my-post",
  "title": "My Blog Title",
  "author": "Mehul Joshi",
  "date": "2025-09-30",
  "read": "3 min read",
  "category": "Standalone",
  "tags": ["python", "tools"],
  "image": "wazirx.avif",
  "excerpt": "Short teaser here",
  "content": [
    { "type": "p", "text": "Intro paragraph..." },
    { "type": "img", "src": "wazirx.avif", "alt": "Screenshot", "caption": "The tool UI" },
    { "type": "buttons", "items": [
      { "label": "Download - Windows 10/11", "href": "#", "variant": "primary" },
      { "label": "Download for Linux (Coming Soon)", "href": "#", "variant": "secondary", "disabled": true }
    ]},
    { "type": "embed", "url": "https://www.youtube.com/watch?v=YOUR_ID", "title": "Demo" }
  ]
}
```

3. Navigate to `/blogs` and `/blogs/my-post` to verify.

- Optional: update previews in `src/data/blogs.js` (not required for the Blogs page itself, which reads JSONs directly).

---

## Filmography: Add / Remove Entries

- Data file: `src/data/filmography.js`
  - Uses a local `imagesContext` and `resolveImage()` to allow `image` as a filename (resolved from `src/assets/images/Filmography/`).
  - Exports `films` derived from `rawFilms.map(...)` with resolved images.

- Page: `src/features/filmography/pages/Filmography.js`
  - Renders all films in a grid.
  - Clicking a card opens a modal with larger info and the image.

### Add or update an entry

1. Copy your image to `src/assets/images/Filmography/` (e.g., `rrr.jpeg`).
2. In `src/data/filmography.js`, append an object to `rawFilms`:

```js
{
  id: 'rrr',
  title: 'RRR',
  role: 'Pipeline Technical Director',
  studio: 'ReDefine ( DNeg )',
  responsibilities: [
    'Integrating tools with existing pipeline and code base.',
    'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
    'Providing support for existing Pipeline tools.'
  ],
  image: 'rrr.jpeg'
}
```

3. Refresh the Filmography page.

---

## Showcase: Add / Remove Items

- Content directory: `src/features/showcase/content/`
- Loader: `src/features/showcase/lib/showcaseLoader.js`
  - Loads and deduplicates items by `slug`.
  - Sorts stably by category/title.
- List page: `src/features/showcase/pages/Showcase.js` groups by sections defined in the file.
- Detail page: `src/features/showcase/pages/ShowcaseDetail.js` (already wired in `App.js`).

### Add a showcase item

Create `src/features/showcase/content/my-item.json`:

```json
{
  "slug": "dev-houdini-local-sim",
  "title": "DEV#1 - Houdini Local Simulation",
  "category": "Development",
  "image": "https://.../thumb.jpg",
  "url": "https://youtu.be/..."
}
```

Navigate to `/showcase` and click the card.

---

## Tools: Add / Remove Tools

### Standalone Tools

- Data: `src/features/tools/data/standalone.js`
- List page: `src/features/tools/pages/StandaloneTools.js`
  - Renders cards from `standaloneTools` and links to `/tools/standalone/:slug`.
- Detail page: `src/features/tools/pages/StandaloneToolDetail.js`

Example entry:

```js
{
  slug: 'wazirx-tracker',
  title: 'WazirX Tracker',
  image: 'wazirx.avif',
  excerpt: 'Track live assets...',
  blurb: 'A simple tracker utility with export features...',
  buttons: [
    { label: 'Download - Windows 10/11', href: '#', variant: 'primary' },
    { label: 'Download for Linux (Coming Soon)', href: '#', variant: 'secondary', disabled: true }
  ],
  content: [
    { type: 'p', text: 'WazirX Tracker pulls live market data...' }
  ]
}
```

### Houdini Tools

- Data: `src/features/tools/data/houdini.js`
- List page: `src/features/tools/pages/HoudiniTools.js`
  - Renders cards from `houdiniTools` and links to `/tools/houdini/:slug`.
- Detail page: `src/features/tools/pages/HoudiniToolDetail.js`

Example entry:

```js
{
  slug: 'material-switcher',
  title: 'Material Switcher',
  image: 'material-switcher.avif',
  excerpt: 'Quickly toggle material setups...',
  blurb: 'Promote shared parameters... batch-apply variants...',
  buttons: [{ label: 'Download HDA', href: '#', variant: 'primary' }],
  content: [{ type: 'p', text: 'Material Switcher simplifies lookdev...' }]
}
```

---

## Local Assets and Paths

- **Blog images**: place files in `src/assets/images/Blogs/` and use just the filename in blog JSON (`"image": "wazirx.avif"` or inline `"src": "wazirx.avif"`). Resolution is handled by `blogLoader.js`.
- **Filmography images**: place files in `src/assets/images/Filmography/` and set `image: 'filename.ext'` in `src/data/filmography.js`.
- **Videos**: place files in `public/videos/` and reference via absolute `"/videos/name.mp4"` in blog `video` blocks.

---

## Running and Building

- **Development**: `npm start` (URL: `http://localhost:3000/clientportfolio`)
- **Production build**: `npm run build`
