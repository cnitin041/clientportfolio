// Standalone tools catalog
export const standaloneTools = [
  {
    slug: 'wazirx-tracker',
    title: 'WazirX Tracker',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Track live assets, averages, and P&L from WazirX using a simple desktop utility.',
    blurb: 'A simple tracker utility with export features. Visualize trends, export CSVs, and keep an eye on key metrics.',
    buttons: [
      { label: 'Download - Windows 10/11', href: '#', variant: 'primary' },
      { label: 'Download for Linux (Coming Soon)', href: '#', variant: 'secondary', disabled: true }
    ],
    content: [
      { type: 'p', text: 'WazirX Tracker pulls live market data and aggregates your entries to compute averages, current value, and P&L.' },
      { type: 'p', text: 'Keep it running in the background to monitor portfolios and export snapshots as CSV for reporting.' }
    ]
  },
  {
    slug: 'batch-renamer',
    title: 'Batch Renamer',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Rename files and assets with powerful patterns, tokens, and previews.',
    blurb: 'Rename files and assets with powerful patterns. Save presets, preview renames, and roll back changes safely.',
    buttons: [
      { label: 'Download - Windows 10/11', href: '#', variant: 'primary' }
    ],
    content: [
      { type: 'p', text: 'Use tokens, counters, and case transforms to rename large batches safely.' },
      { type: 'p', text: 'Preview changes before applying and keep an automatic rollback history.' }
    ]
  }
];

export const getStandaloneToolBySlug = (slug) => standaloneTools.find(t => t.slug === slug);
