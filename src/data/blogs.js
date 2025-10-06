// Centralized blog data used by previews (Blogs page uses JSON loader for full content)
export const blogs = [
  {
    slug: 'wazirx-live-asset-tracking',
    title: 'Standalone Tool: Live Asset Tracking of WazirX',
    date: 'Sep 25, 2022',
    read: '2 min read',
    image: 'wazirx.avif',
    excerpt: 'A PyQt/Python tool using WazirX public API to track live asset performance, average buy price, and P&L across holdings.'
  },
  {
    slug: 'resource-monitor-tool',
    title: 'Standalone Tool: Resource Monitor Tool',
    date: 'Mar 26, 2023',
    read: '2 min read',
    image: 'resource-monitor.avif',
    excerpt: 'An overview of the Resource Monitor tool, its features, and how it helps track CPU, memory, and network usage in real time.'
  }
];

export const getBlogBySlug = (slug) => blogs.find(b => b.slug === slug);
