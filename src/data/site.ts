/**
 * Global, language-independent configuration.
 * All visible text lives in /src/i18n (one file per language).
 */

export const site = {
  name: 'Karen Iredy',
  wordmark: 'KAREN IREDY',

  /**
   * TODO: add the public contact email. While empty, the site hides the
   * email link instead of showing a fake address.
   */
  email: '',

  /** Leave href empty to hide a link. */
  socials: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
  ],

  /** Contact form endpoint, read from the VITE_FORM_ENDPOINT env variable (see README). */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
} as const

/** Project types used by the contact form; labels come from i18n `contact.projectTypes`. */
export const projectTypeKeys = ['strategy', 'direction', 'ai', 'campaign', 'product', 'other'] as const
export type ProjectType = (typeof projectTypeKeys)[number]

/** Top navigation: `id` is the anchor, `key` the label in i18n `nav`. */
export const nav = [
  { id: 'index', key: 'index' },
  { id: 'pillars', key: 'studio' },
  { id: 'work', key: 'work' },
  { id: 'lab', key: 'lab' },
  { id: 'journal', key: 'journal' },
  { id: 'about', key: 'about' },
] as const
