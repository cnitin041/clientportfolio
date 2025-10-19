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

---

## Using Layout Components

- **Header**: `src/components/layout/Header.js`
  - Top navigation. To add a new top-level link, add a `NavLink` in the `NavLinks` block.
  - For a section with subpages (like Tools), use the existing dropdown pattern: wrap with `Dropdown` and add `DropdownItem` links.
  - Tools subnav chips appear when the URL starts with `/tools`. Update those links if you add new tools sections.

- **PageHero**: `src/components/layout/PageHero.js`
  - Standard page banner with title and subtitle.
  - Many pages pass `topOffset` to account for fixed header + subnav heights. Use `topOffset={176}` on tools pages.

- **Footer**: `src/components/layout/Footer.js`
  - Global footer rendered in `App.js`. Minimal and safe to extend.

- **Page gutters and containers**
  - Most pages use `Page` styled components with horizontal padding: `padding: 0 clamp(12px, 1.5vw, 24px) 4rem;` for consistent gutters on large screens.
  - Use a `Container` inside pages with `max-width` (commonly `1320px` or `1000px`) and `margin: 0 auto` to center content.

---

## Create a New Page

1. Create a file under a feature (or a new folder) e.g. `src/features/awesome/pages/Awesome.js`:

```js
import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/layout/PageHero';

const Page = styled.main`
  padding: 0 clamp(12px, 1.5vw, 24px) 4rem;
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

export default function Awesome() {
  return (
    <Page>
      <PageHero title="Awesome" subtitle="My new page" />
      <Container>
        {/* content here */}
      </Container>
    </Page>
  );
}
```

2. Register the route in `src/App.js`:

```jsx
import Awesome from 'features/awesome/pages/Awesome';
// ...
<Route path="/awesome" element={<Awesome />} />
```

3. Add a menu item (optional) in `src/components/layout/Header.js`:

```jsx
<NavLink whileHover={{ scale: 1.05 }} to="/awesome" onClick={closeMenu}>
  Awesome
</NavLink>
```

---

## Create a New Feature Module (List + Detail)

- Directory structure suggestion:

```
src/features/myfeature/
  content/           # JSON or data for list/detail
  data/              # JS exports if not using JSON
  lib/               # loaders/resolvers
  pages/
    MyFeature.js     # list page
    MyFeatureDetail.js
```

- Loader pattern (see `blogs/lib/blogLoader.js` and `showcase/lib/showcaseLoader.js`):
  - Read all JSON files from a folder.
  - Normalize fields (resolve images, dedupe by `slug`).
  - Export `loadAllX()` and `getXBySlug(slug)` helpers.

- Routing (in `src/App.js`):

```jsx
<Route path="/myfeature" element={<MyFeature />} />
<Route path="/myfeature/:slug" element={<MyFeatureDetail />} />
```

- Menu (in `Header.js`):
  - Add a top-level `NavLink` for the list page.
  - If you need a submenu, reuse the `Dropdown` + `DropdownItem` pattern from Tools.

---

## Add a New Tools Subsection (Example)

1. Create a list page under `src/features/tools/pages/NewSectionTools.js` and (optionally) a detail page.
2. Add data to `src/features/tools/data/newsection.js`.
3. Register routes in `src/App.js`:

```jsx
<Route path="/tools/newsection" element={<NewSectionTools />} />
<Route path="/tools/newsection/:slug" element={<NewSectionToolDetail />} />
```

4. Update the Tools dropdown and subnav in `Header.js`:

```jsx
<DropdownItem to="/tools/newsection">New Section</DropdownItem>
// and in the SubNav (visible on /tools/*):
<Link to="/tools/newsection">New Section</Link>
```

5. On tools pages where `PageHero` is used with the subnav, pass `topOffset={176}` if needed.

---

## Reuse Patterns and Components

- **Cards and grids**: Copy grid/card patterns from `Blogs.js`, `Showcase.js`, or tools pages.
- **Detail pages**: See `ShowcaseDetail.js`, `StandaloneToolDetail.js`, and `HoudiniToolDetail.js` for structure and styling.
- **Share buttons**: Keep share `<a>` elements outside primary navigation links to avoid nested anchors.
- **Accessibility**: Provide `aria-label` on icon-only links and use `aria-current="page"` for active nav items.

---

## Adding Assets

- Images for features should go under `src/assets/images/<Feature>/` whenever loaders resolve by filename.
- Public videos should go in `public/videos/` and be referenced by absolute path like `/videos/name.mp4`.

---

## Deployment notes

- The app uses `BrowserRouter` with `basename={process.env.PUBLIC_URL}`; make sure deployment serves the app under the correct base path.
- Use `npm run build` and deploy the `build/` folder to static hosting.
