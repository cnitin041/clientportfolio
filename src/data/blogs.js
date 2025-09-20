// Centralized demo blog data used by Blogs and BlogDetail pages
export const blogs = [
  {
    slug: 'building-houdini-tools',
    title: 'Building Efficient Houdini Tools',
    date: 'Sep 2025',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'Design principles and workflows I use to craft reliable nodes and utilities for Houdini.'
  },
  {
    slug: 'design-systems-for-small-teams',
    title: 'Design Systems for Small Teams',
    date: 'Aug 2025',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'How a lean component library keeps products consistent and quick to ship.'
  },
  {
    slug: 'perf-first-react',
    title: 'Performance-first React Apps',
    date: 'Jul 2025',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'From code-splitting to caching: practical steps that keep UI snappy.'
  },
  {
    slug: 'procedural-art',
    title: 'Procedural Art & Creative Coding',
    date: 'Jun 2025',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'Notes from experiments blending Houdini, GLSL, and Web tech.'
  },
  {
    slug: 'pipelines-that-scale',
    title: 'Pipelines that Scale',
    date: 'May 2025',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'Automation, conventions, and tooling that grow with the team.'
  },
  {
    slug: 'portfolio-tips',
    title: 'Portfolio Tips for Makers',
    date: 'Apr 2025',
    read: '3 min read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'Show your process, document outcomes, and keep it delightful.'
  }
];

export const getBlogBySlug = (slug) => blogs.find(b => b.slug === slug);
