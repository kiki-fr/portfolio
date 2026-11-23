/**
 * Image system.
 *
 * Every image on the site is an `Art` object. While `src` is empty, the
 * <ArtSlot> component renders an art-directed generative placeholder in the
 * chosen `variant`. To use a real image, drop the file in /public/images and
 * set `src: 'images/your-file.jpg'` — nothing else needs to change.
 */

export type ArtVariant =
  | 'holo' // iridescent foil
  | 'chrome' // liquid silver object
  | 'shard' // fragmented mirror
  | 'mono' // black & white editorial with a cropped glyph
  | 'eye' // abstract optical form
  | 'tiles' // holographic mosaic
  | 'ink' // near-black, grain and a silver line
  | 'portrait' // abstract silhouette — for the About portrait

export interface Art {
  /** Path relative to /public, e.g. 'images/hero.jpg'. Empty = placeholder. */
  src?: string
  alt: string
  variant: ArtVariant
  /** Optional large letter used by the 'mono' variant. */
  glyph?: string
}

export const heroArt = {
  chrome: { variant: 'chrome', alt: 'Liquid silver object, editorial still life' },
  shard: { variant: 'shard', alt: 'Face reflected in fragmented mirror shards' },
  holo: { variant: 'holo', alt: 'Holographic foil texture' },
  eye: { variant: 'eye', alt: 'Close-up of an eye with iridescent reflection' },
} satisfies Record<string, Art>

export const pillarArt = {
  think: { variant: 'ink', alt: 'Dark textured surface with a single silver line' },
  directA: { variant: 'mono', glyph: 'D', alt: 'Black and white fashion editorial crop' },
  directB: { variant: 'tiles', alt: 'Holographic mosaic tiles' },
  create: { variant: 'chrome', alt: 'Chrome sculpture, AI-assisted' },
} satisfies Record<string, Art>

export const directionArt: Art[] = [
  { variant: 'mono', glyph: 'W', alt: 'Editorial portrait, cropped' },
  { variant: 'holo', alt: 'Iridescent fabric fold' },
  { variant: 'shard', alt: 'Product reflected in broken mirror' },
  { variant: 'eye', alt: 'Optical close-up' },
]

export const aboutArt: Art = { variant: 'portrait', alt: 'Portrait of Karen Iredy' }

export const contactArt: Art = { variant: 'holo', alt: 'Holographic surface' }
