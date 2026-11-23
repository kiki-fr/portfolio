import type { Art } from './art'

/**
 * CREATIVE LAB — layout of the evolving archive.
 * Titles/kinds come from i18n `lab.items` (same order).
 * `size` controls the footprint in the grid, `tilt` the rotation in degrees.
 */

export interface LabItem extends Art {
  size: 's' | 'm' | 'l' | 'w'
  tilt: number
}

export const labItems: LabItem[] = [
  { variant: 'chrome', alt: 'Chrome flower study', size: 'l', tilt: -3 },
  { variant: 'holo', alt: 'Iridescent skin texture', size: 'm', tilt: 4 },
  { variant: 'mono', glyph: 'A', alt: 'Distorted letterform', size: 's', tilt: -6 },
  { variant: 'shard', alt: 'Broken reflection', size: 'w', tilt: 2 },
  { variant: 'eye', alt: 'Optical illusion study', size: 'm', tilt: -2 },
  { variant: 'tiles', alt: 'Holographic relic', size: 's', tilt: 7 },
  { variant: 'ink', alt: 'Dark architectural texture', size: 'm', tilt: -4 },
  { variant: 'chrome', alt: 'Transparent garment prototype', size: 's', tilt: 3 },
]

/** Journal cover images (same order as i18n `journal.entries`). */
export const journalArt: Art[] = [
  { variant: 'mono', glyph: 'P', alt: 'Object study' },
  { variant: 'holo', alt: 'Foil surface' },
  { variant: 'chrome', alt: 'Liquid metal form' },
  { variant: 'ink', alt: 'Dark texture with a silver line' },
]
