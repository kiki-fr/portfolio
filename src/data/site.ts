/**
 * Global site configuration.
 * Everything a non-developer is likely to change lives here or in the
 * other files in /src/data. Components never hard-code this content.
 */

export const site = {
  name: 'Karen Iredy',
  wordmark: 'KAREN IREDY',
  positioning: 'Creative Direction for Brands',
  roles: ['Creative Director', 'Brand Strategist', 'Fashion Designer', 'AI Creative'],
  location: 'Based in Europe · Working internationally',
  issue: 'Vol. 01',

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

  /** Budget ranges shown in the contact form. Edit freely; no prices are shown elsewhere. */
  budgets: ['Under €3k', '€3k – €8k', '€8k – €20k', '€20k +', 'Not sure yet'],

  projectTypes: [
    'Brand strategy',
    'Creative direction',
    'AI creative production',
    'Campaign',
    'Product',
    'Other',
  ],
} as const

export type ProjectType = (typeof site.projectTypes)[number]

export const nav = [
  { id: 'index', label: 'Index' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'about', label: 'About' },
] as const
