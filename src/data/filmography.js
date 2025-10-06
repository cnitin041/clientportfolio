// Demo filmography data. Add more items or fields as needed.
// Resolve image paths so local files in src/assets/images/Filmography can be referenced by filename or path.
const imagesContext = require.context(
  '../assets/images/Filmography',
  false,
  /\.(png|jpe?g|gif|webp|svg|avif)$/
);

const resolveImage = (img) => {
  if (typeof img !== 'string' || !img) return img;
  if (/^(https?:)?\/\//i.test(img) || img.startsWith('/') || /^data:/i.test(img)) return img; // external/absolute/data
  // normalize slashes and strip leading src/
  let p = img.replace(/\\/g, '/');
  if (p.startsWith('src/')) p = p.slice(4);
  // take only the filename; context is non-recursive
  const parts = p.split('/');
  const filename = parts[parts.length - 1];
  try {
    const mod = imagesContext(`./${filename}`);
    return mod.default ?? mod;
  } catch (e) {
    return img; // fallback to original string if not found
  }
};

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%23f2f2f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="42">No Image</text></svg>';

const rawFilms = [
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
  },
  {
    id: 'obi-wan-kenobi',
    title: 'OBI WAN KENOBI',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'Obiwan-kenobi.jpg'
  },
  {
    id: 'ambulance',
    title: 'AMBULANCE',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'ambulance.avif'
  },
  {
    id: 'sweet-girl',
    title: 'SWEET GIRL',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'sweetgirl.webp'
  },
  {
    id: 'mimi',
    title: 'MIMI',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'mimi.jpg'
  },
  {
    id: 'bell-bottom',
    title: 'BELL BOTTOM',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'bell-bottom.avif'
  },
  {
    id: 'rock-dog-2',
    title: 'ROCK DOG 2',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Supporting team in FX Setups.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: 'rock-dogs2.jpg'
  },
  {
    id: 'legend-of-hanuman',
    title: 'LEGEND OF HANUMAN',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for exitsting Pipeline tools.'
    ],
    image: 'legend-of-hanuman.jpg'
  },
  {
    id: 'wolf-100',
    title: 'WOLF 100% ',
    role: 'FX Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Character Dispersion & FX.',
      'Various Type of Character Dispersion Effects.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'monster-zone',
    title: 'MONSTER ZONE',
    role: 'FX Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Worked on different type of Character FX.',
      'Automation of shots using the setup for fast production flow.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'lego-city',
    title: 'LEGO CITY',
    role: 'FX Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Building Collapse Dynamics.',
      'Destruction & Smoke Simulation.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'norm-of-the-north',
    title: 'NORM OF THE NORTH',
    role: 'FX Artist',
    studio: 'Assemblage Entertainment Studio',
    responsibilities: [
      'Ocean Simulation.',
      'Cloud Simulation.',
      'Birds Feather Simulation.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'arctic-justice',
    title: 'ARCTIC JUSTICE',
    role: 'FX Artist',
    studio: 'Assemblage Entertainment Studio',
    responsibilities: [
      'Water Droplet Simulation.',
      'Water Puddle Simulation.',
      'Snow Foot Print.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'idgah',
    title: 'IDGAH',
    role: 'FX Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Birds Flocking FX'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'om-namo-venkatesaya',
    title: 'OM NAMO VENKATESAYA',
    role: 'FX Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Character FX',
      'Creative Dispersion FX'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'sarbha',
    title: 'SARBHA',
    role: 'FX Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Character Interactive FX',
      'Sand Character Interactive FX'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'kashmora',
    title: 'KASHMORA',
    role: 'FX Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Ground Dust for War Grounds.',
      'Character Interactive Dust.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'vanamagan',
    title: 'VANAMAGAN',
    role: 'FX Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Character Interactive Leaf & Dust Simulation.',
      'Tiger Belly Simulation.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'pulimurugan',
    title: 'PULIMURGAN',
    role: 'FX Trainee Artist',
    studio: 'Firefly Creative Studio Ltd.',
    responsibilities: [
      'Character Interactive Leaf & Dust Simulation.'
    ],
    image: PLACEHOLDER
  },
  {
    id: 'the-essex-serpent',
    title: 'THE ESSEX SERPENT',
    role: 'Pipeline Technical Director',
    studio: 'ReDefine ( DNeg )',
    responsibilities: [
      'Integrating tools with existing pipeline and code base.',
      'Customizing existing scripted tools to suit the needs of the studio, projects, and artists.',
      'Providing support for existing Pipeline tools.'
    ],
    image: PLACEHOLDER
  }
];

export const films = rawFilms.map(f => ({ ...f, image: resolveImage(f.image) }));
