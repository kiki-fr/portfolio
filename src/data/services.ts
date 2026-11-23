import type { Art } from './art'
import type { ProjectType } from './site'

/* ── THINK / DIRECT / CREATE ─────────────────────────────── */

export const pillars = [
  {
    key: 'think',
    verb: 'Think',
    line: 'Understand the business. Find the DNA. Name the territory nobody else has claimed.',
    items: ['Brand intelligence', 'Strategy', 'Positioning', 'Brand DNA'],
    href: '#intelligence',
    cta: 'Enter Intelligence',
  },
  {
    key: 'direct',
    verb: 'Direct',
    line: 'Build the vision. Set the visual and narrative direction. Make the decisions that keep everything coherent.',
    items: ['Creative concepts', 'Visual direction', 'Campaigns', 'Storytelling'],
    href: '#direction',
    cta: 'Enter Direction',
  },
  {
    key: 'create',
    verb: 'Create',
    line: 'Turn strategy into things people can see, hold and remember — faster, stranger and more precisely than before.',
    items: ['AI-assisted visuals', 'Creative experiments', 'Digital imagery', 'Prototypes'],
    href: '#studio',
    cta: 'Enter the Studio',
  },
] as const

/* ── INTELLIGENCE ────────────────────────────────────────── */

export interface IntelligenceService {
  num: string
  title: string
  short: string
  what: string
  problem: string
  receive: string[]
}

export const intelligence: IntelligenceService[] = [
  {
    num: '01',
    title: 'Brand DNA',
    short: 'Essence, ambition, personality, territory.',
    what: 'A deep excavation of what your brand is — and what it is quietly trying to become.',
    problem:
      'The brand works, but nobody can say exactly why. Decisions are made by taste or habit, and the identity drifts with every new hire, agency or season.',
    receive: [
      'Brand essence and core idea',
      'Personality and behaviour principles',
      'Conceptual territory map',
      'A DNA document your team will actually use',
    ],
  },
  {
    num: '02',
    title: 'Brand Strategy',
    short: 'Positioning, difference, audience, direction.',
    what: 'The strategic foundation: where you stand, who you are for, why you are different and where you are going next.',
    problem:
      'You are competing on product details or on price, because the brand has not yet claimed a position worth defending.',
    receive: [
      'Positioning and differentiation',
      'Audience and desire mapping',
      'Competitive landscape reading',
      'Strategic direction and priorities',
    ],
  },
  {
    num: '03',
    title: 'Brand Audit',
    short: 'Inconsistencies, blind spots, potential.',
    what: 'An honest, outside reading of the brand as it exists today — across product, image, language and experience.',
    problem:
      'Something feels off. Growth has slowed, or the image no longer matches the ambition — and the cause is hard to see from the inside.',
    receive: [
      'Coherence review across touchpoints',
      'Inconsistencies and weak signals',
      'Opportunities ranked by impact',
      'A clear-eyed audit report',
    ],
  },
  {
    num: '04',
    title: 'Brand Story',
    short: 'Narrative, language, meaning.',
    what: 'The narrative architecture: the meaning, language and ideas that make a brand worth talking about.',
    problem:
      'The product is good but the story is generic — and generic stories are forgotten the moment the tab closes.',
    receive: [
      'Core narrative and manifesto',
      'Language and tone principles',
      'Story pillars for product and campaigns',
      'Messaging direction for launches',
    ],
  },
  {
    num: '05',
    title: 'Creative Roadmap',
    short: 'From thinking to concrete action.',
    what: 'Strategy translated into what to create, in what order, and why.',
    problem:
      'There is a strategy deck somewhere. Nobody knows what to do with it on Monday morning.',
    receive: [
      'Prioritised creative actions',
      'Launch and campaign sequencing',
      'Creative briefs, ready to brief',
      'Direction for your team or partners',
    ],
  },
]

/* ── CREATIVE DIRECTION ──────────────────────────────────── */

export const directionServices = [
  'Creative concept development',
  'Brand visual direction',
  'Campaign direction',
  'Product storytelling',
  'Launch concepts',
  'Editorial direction',
  'Visual identity direction',
  'Creative experiences',
  'Art direction',
  'Creative narratives',
  'Product & brand presentation',
]

export const coherence = [
  'Images',
  'Products',
  'Campaigns',
  'Visual identity',
  'Content',
  'Experiences',
  'Communication',
]

/* ── AI CREATIVE STUDIO ──────────────────────────────────── */

export const studioServices = [
  'AI-assisted campaign visuals',
  'Creative image production',
  'Experimental product imagery',
  'Concept visualisation',
  'Creative prototypes',
  'AI-assisted video',
  'Visual storytelling',
  'Digital editorial imagery',
  'Creative exploration',
  'Visual world-building',
]

export interface GalleryItem extends Art {
  caption: string
  ratio: 'portrait' | 'landscape' | 'square' | 'tall'
}

/** Replace `src` to swap any placeholder for a real image. */
export const studioGallery: GalleryItem[] = [
  { variant: 'chrome', alt: 'Liquid chrome garment study', caption: 'Liquid garment — study', ratio: 'tall' },
  { variant: 'holo', alt: 'Iridescent product surface', caption: 'Surface / foil', ratio: 'square' },
  { variant: 'shard', alt: 'Fragmented reflection portrait', caption: 'Reflection error', ratio: 'portrait' },
  { variant: 'eye', alt: 'Optical close-up', caption: 'Optic', ratio: 'landscape' },
  { variant: 'mono', glyph: 'Ø', alt: 'Monochrome object still life', caption: 'Object without function', ratio: 'portrait' },
  { variant: 'tiles', alt: 'Holographic mosaic', caption: 'Mosaic memory', ratio: 'square' },
  { variant: 'ink', alt: 'Dark editorial texture', caption: 'Nocturne', ratio: 'tall' },
]

/* ── METHOD ──────────────────────────────────────────────── */

export const method = [
  {
    num: '01',
    title: 'Discover',
    line: 'Understand the business, the ambition, the audience and the context.',
    detail: 'Conversations, immersion, product and market reading. Asking the questions that usually go unasked.',
  },
  {
    num: '02',
    title: 'Define',
    line: 'Identify the strategic direction, the position and the creative opportunity.',
    detail: 'Choices, not options. A clear point of view on where the brand should stand — and what it should refuse.',
  },
  {
    num: '03',
    title: 'Imagine',
    line: 'Develop the concept, the creative territory and the visual language.',
    detail: 'Mood, references, words, early images. This is where the brand starts to have a world.',
  },
  {
    num: '04',
    title: 'Direct',
    line: 'Make the creative decisions and establish coherence.',
    detail: 'Every image, product and sentence pointing the same way. Direction is mostly saying no, precisely.',
  },
  {
    num: '05',
    title: 'Create',
    line: 'Bring it to life through visuals, prototypes, campaigns and assets.',
    detail: 'Produced with photographers, makers, teams — and new tools when they genuinely expand the idea.',
  },
]

/* ── OFFERS ──────────────────────────────────────────────── */

export interface Offer {
  name: string
  for: string
  line: string
  type: ProjectType
}

/** No prices are shown. Each "Enquire" pre-selects the project type in the form. */
export const offers: Offer[] = [
  {
    name: 'Brand Clarity Session',
    for: 'Founders and teams at a crossroads',
    line: 'A focused working session to untangle the brand question you keep circling. You leave with direction, not homework.',
    type: 'Brand strategy',
  },
  {
    name: 'Brand Audit',
    for: 'Brands that have outgrown their image',
    line: 'A strategic assessment of where the brand stands today, what is holding it back and where its potential is hiding.',
    type: 'Brand strategy',
  },
  {
    name: 'Brand Strategy',
    for: 'Brands that need a foundation, not a facelift',
    line: 'DNA, positioning, story and direction — a complete strategic base every creative decision can stand on.',
    type: 'Brand strategy',
  },
  {
    name: 'Creative Concept',
    for: 'A launch, a product, a campaign',
    line: 'One strong idea and the creative territory around it — ready to be produced, presented or pitched.',
    type: 'Creative direction',
  },
  {
    name: 'Creative Direction',
    for: 'Campaigns, collections, brand expression',
    line: 'A single creative vision held from first reference to final image, across every team and touchpoint.',
    type: 'Creative direction',
  },
  {
    name: 'AI Visual Project',
    for: 'Imagery that would be impossible — or impossibly expensive — to shoot',
    line: 'An art-directed visual project using AI-assisted production. Directed like a shoot, not generated like a stock library.',
    type: 'AI creative production',
  },
  {
    name: 'Creative Partnership',
    for: 'Brands that want a creative director in the room',
    line: 'Ongoing strategic and creative direction — part thinking partner, part keeper of the vision.',
    type: 'Creative direction',
  },
]
