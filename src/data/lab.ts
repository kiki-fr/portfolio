import type { Art } from './art'

/**
 * CREATIVE LAB — an evolving archive of experiments.
 * Placeholders for now: swap `src` for real images and rename freely.
 * `size` controls the footprint in the grid, `tilt` the rotation in degrees.
 */

export interface LabItem extends Art {
  title: string
  kind: string
  size: 's' | 'm' | 'l' | 'w'
  tilt: number
}

export const labKinds = [
  'AI experiments',
  'Visual explorations',
  'Creative research',
  'Digital objects',
  'Typography',
  'Material studies',
  'Surreal concepts',
  'Prototypes',
  'Future ideas',
]

export const labItems: LabItem[] = [
  { title: 'Chrome Flora', kind: 'Material study', variant: 'chrome', alt: 'Chrome flower study', size: 'l', tilt: -3 },
  { title: 'Iridescent Skin', kind: 'AI experiment', variant: 'holo', alt: 'Iridescent skin texture', size: 'm', tilt: 4 },
  { title: 'Type Under Pressure', kind: 'Typography', variant: 'mono', glyph: 'A', alt: 'Distorted letterform', size: 's', tilt: -6 },
  { title: 'Reflection Error', kind: 'Surreal concept', variant: 'shard', alt: 'Broken reflection', size: 'w', tilt: 2 },
  { title: 'Optic Nº 2', kind: 'Visual exploration', variant: 'eye', alt: 'Optical illusion study', size: 'm', tilt: -2 },
  { title: 'Future Relic', kind: 'Digital object', variant: 'tiles', alt: 'Holographic relic', size: 's', tilt: 7 },
  { title: 'Soft Architecture', kind: 'Future idea', variant: 'ink', alt: 'Dark architectural texture', size: 'm', tilt: -4 },
  { title: 'Glass Garment', kind: 'Prototype', variant: 'chrome', alt: 'Transparent garment prototype', size: 's', tilt: 3 },
]
