import type { Art } from './art'

/**
 * PORTFOLIO
 *
 * Every entry below is a PLACEHOLDER (status: 'placeholder'). They exist so
 * the layout can be seen and tested — they are not real projects, clients or
 * results. Replace them one by one with real work (see README → "Adding a
 * project"). Set status to:
 *   - 'client'  → real client project
 *   - 'concept' → self-initiated / experimental concept (labelled as such)
 * Only fill `result` with outcomes that are real and verified.
 */

export const categories = [
  'Brand Strategy',
  'Creative Direction',
  'Product',
  'Campaign',
  'AI Experiment',
  'Visual Storytelling',
] as const

export type Category = (typeof categories)[number]
export type ProjectStatus = 'client' | 'concept' | 'placeholder'

export interface Project {
  slug: string
  title: string
  category: Category
  year: string
  status: ProjectStatus
  description: string
  hero: Art
  gallery: Art[]
  context: string
  challenge: string
  solution: string
  /** Only real, verified outcomes. Leave undefined otherwise. */
  result?: string
}

const guide = {
  context: 'Context — who the brand is, the moment it was in, and the ambition behind the project.',
  challenge: 'Challenge — the real problem or tension. What made this hard or interesting?',
  solution: 'Solution — the idea, the direction and the key decisions. Why this, and not something else?',
}

export const projects: Project[] = [
  {
    slug: 'silver-hour',
    title: 'Silver Hour',
    category: 'Brand Strategy',
    year: '—',
    status: 'placeholder',
    description: 'Slot for a brand strategy case: the question, the position you found, and why it matters.',
    hero: { variant: 'chrome', alt: 'Placeholder — brand strategy project hero' },
    gallery: [
      { variant: 'mono', glyph: 'S', alt: 'Placeholder gallery image' },
      { variant: 'holo', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
  {
    slug: 'the-quiet-signal',
    title: 'The Quiet Signal',
    category: 'Creative Direction',
    year: '—',
    status: 'placeholder',
    description: 'Slot for a creative direction case: one vision held across images, product and words.',
    hero: { variant: 'mono', glyph: 'Q', alt: 'Placeholder — creative direction project hero' },
    gallery: [
      { variant: 'shard', alt: 'Placeholder gallery image' },
      { variant: 'eye', alt: 'Placeholder gallery image' },
      { variant: 'ink', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
  {
    slug: 'object-no-7',
    title: 'Object Nº 7',
    category: 'Product',
    year: '—',
    status: 'placeholder',
    description: 'Slot for a product case — handbag, accessory or jewellery — from concept to market.',
    hero: { variant: 'tiles', alt: 'Placeholder — product project hero' },
    gallery: [
      { variant: 'chrome', alt: 'Placeholder gallery image' },
      { variant: 'mono', glyph: '7', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
  {
    slug: 'mirror-protocol',
    title: 'Mirror Protocol',
    category: 'Campaign',
    year: '—',
    status: 'placeholder',
    description: 'Slot for a campaign: the concept, the visual world and how it was rolled out.',
    hero: { variant: 'shard', alt: 'Placeholder — campaign project hero' },
    gallery: [
      { variant: 'holo', alt: 'Placeholder gallery image' },
      { variant: 'eye', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
  {
    slug: 'liquid-archive',
    title: 'Liquid Archive',
    category: 'AI Experiment',
    year: '—',
    status: 'placeholder',
    description: 'Slot for an AI-assisted experiment — clearly labelled as a concept, not a client commission.',
    hero: { variant: 'holo', alt: 'Placeholder — AI experiment hero' },
    gallery: [
      { variant: 'chrome', alt: 'Placeholder gallery image' },
      { variant: 'tiles', alt: 'Placeholder gallery image' },
      { variant: 'shard', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
  {
    slug: 'soft-machine',
    title: 'Soft Machine',
    category: 'Visual Storytelling',
    year: '—',
    status: 'placeholder',
    description: 'Slot for a visual story: an editorial sequence, a lookbook or a narrative series.',
    hero: { variant: 'eye', alt: 'Placeholder — visual storytelling hero' },
    gallery: [
      { variant: 'ink', alt: 'Placeholder gallery image' },
      { variant: 'mono', glyph: 'M', alt: 'Placeholder gallery image' },
    ],
    ...guide,
  },
]

export const statusLabel: Record<ProjectStatus, string> = {
  client: 'Client project',
  concept: 'Concept · self-initiated',
  placeholder: 'Placeholder · to be replaced',
}
