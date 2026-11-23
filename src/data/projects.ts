import type { Art } from './art'

/**
 * PORTFOLIO — structure only. Titles and texts live in i18n `work.projects[slug]`
 * (one entry per language). Missing context/challenge/solution fall back to the
 * writing guide in i18n `work.guide`.
 *
 * Every entry below is a PLACEHOLDER (status: 'placeholder'): not a real project,
 * client or result. Set status to 'client' (real client work) or 'concept'
 * (self-initiated, labelled as such). Only add `result` text when it is real and verified.
 */

export const categoryKeys = ['strategy', 'direction', 'product', 'campaign', 'ai', 'story'] as const
export type Category = (typeof categoryKeys)[number]
export type ProjectStatus = 'client' | 'concept' | 'placeholder'

export interface Project {
  slug: string
  category: Category
  year: string
  status: ProjectStatus
  hero: Art
  gallery: Art[]
}

export const projects: Project[] = [
  {
    slug: 'silver-hour',
    category: 'strategy',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'chrome', alt: 'Placeholder — brand strategy project hero' },
    gallery: [
      { variant: 'mono', glyph: 'S', alt: 'Placeholder gallery image' },
      { variant: 'holo', alt: 'Placeholder gallery image' },
    ],
  },
  {
    slug: 'the-quiet-signal',
    category: 'direction',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'mono', glyph: 'Q', alt: 'Placeholder — creative direction project hero' },
    gallery: [
      { variant: 'shard', alt: 'Placeholder gallery image' },
      { variant: 'eye', alt: 'Placeholder gallery image' },
      { variant: 'ink', alt: 'Placeholder gallery image' },
    ],
  },
  {
    slug: 'object-no-7',
    category: 'product',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'tiles', alt: 'Placeholder — product project hero' },
    gallery: [
      { variant: 'chrome', alt: 'Placeholder gallery image' },
      { variant: 'mono', glyph: '7', alt: 'Placeholder gallery image' },
    ],
  },
  {
    slug: 'mirror-protocol',
    category: 'campaign',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'shard', alt: 'Placeholder — campaign project hero' },
    gallery: [
      { variant: 'holo', alt: 'Placeholder gallery image' },
      { variant: 'eye', alt: 'Placeholder gallery image' },
    ],
  },
  {
    slug: 'liquid-archive',
    category: 'ai',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'holo', alt: 'Placeholder — AI experiment hero' },
    gallery: [
      { variant: 'chrome', alt: 'Placeholder gallery image' },
      { variant: 'tiles', alt: 'Placeholder gallery image' },
      { variant: 'shard', alt: 'Placeholder gallery image' },
    ],
  },
  {
    slug: 'soft-machine',
    category: 'story',
    year: '—',
    status: 'placeholder',
    hero: { variant: 'eye', alt: 'Placeholder — visual storytelling hero' },
    gallery: [
      { variant: 'ink', alt: 'Placeholder gallery image' },
      { variant: 'mono', glyph: 'M', alt: 'Placeholder gallery image' },
    ],
  },
]
