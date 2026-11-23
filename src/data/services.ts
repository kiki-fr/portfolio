import type { Art } from './art'
import type { ProjectType } from './site'

/**
 * Language-independent structure for the service sections.
 * All text (titles, descriptions, lists) lives in /src/i18n.
 */

/** Where each Think / Direct / Create pillar links to. */
export const pillarLinks = ['#intelligence', '#direction', '#studio'] as const

/** Contact-form project type pre-selected by each offer's "Enquire" (same order as i18n `offers.items`). */
export const offerTypes: ProjectType[] = ['strategy', 'strategy', 'strategy', 'direction', 'direction', 'ai', 'direction']

export interface GalleryItem extends Art {
  ratio: 'portrait' | 'landscape' | 'square' | 'tall'
}

/** AI Studio gallery. Captions come from i18n `studio.captions` (same order). Replace `src` to use real images. */
export const studioGallery: GalleryItem[] = [
  { variant: 'chrome', alt: 'Liquid chrome garment study', ratio: 'tall' },
  { variant: 'holo', alt: 'Iridescent product surface', ratio: 'square' },
  { variant: 'shard', alt: 'Fragmented reflection portrait', ratio: 'portrait' },
  { variant: 'eye', alt: 'Optical close-up', ratio: 'landscape' },
  { variant: 'mono', glyph: 'Ø', alt: 'Monochrome object still life', ratio: 'portrait' },
  { variant: 'tiles', alt: 'Holographic mosaic', ratio: 'square' },
  { variant: 'ink', alt: 'Dark editorial texture', ratio: 'tall' },
]
