// Houdini tools catalog
export const houdiniTools = [
  {
    slug: 'material-switcher',
    title: 'Material Switcher',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Quickly toggle material setups for heavy vegetation scenes.',
    blurb: 'Quickly toggle material setups for heavy vegetation scenes. Promote common settings, batch-apply variants, and preview changes non-destructively.',
    buttons: [
      { label: 'Download HDA', href: '#', variant: 'primary' }
    ],
    content: [
      { type: 'p', text: 'Material Switcher simplifies lookdev by allowing quick toggling between material variants and shared parameters.' },
      { type: 'p', text: 'Use it to experiment rapidly and keep scene setups clean and reversible.' }
    ]
  },
  {
    slug: 'resource-monitor',
    title: 'Resource Monitor Tool',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Track and visualize performance during simulations.',
    blurb: 'Track and visualize performance during simulations. Lightweight profiling with CSV export and timeline overlays for quick diagnosis.',
    buttons: [
      { label: 'Download HDA', href: '#', variant: 'primary' }
    ],
    content: [
      { type: 'p', text: 'Profile key stages and identify bottlenecks to optimize your networks.' }
    ]
  }
];

export const getHoudiniToolBySlug = (slug) => houdiniTools.find(t => t.slug === slug);
