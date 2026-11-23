/** Every section on the page, in order — used by the header and the margin rails. */
export const sections = [
  { id: 'index', name: 'Cover', nav: 'index' },
  { id: 'intro', name: 'Point of view', nav: 'index' },
  { id: 'pillars', name: 'Think / Direct / Create', nav: 'index' },
  { id: 'intelligence', name: 'Intelligence', nav: 'intelligence' },
  { id: 'direction', name: 'Creative direction', nav: 'intelligence' },
  { id: 'studio', name: 'AI creative studio', nav: 'intelligence' },
  { id: 'work', name: 'Selected work', nav: 'work' },
  { id: 'lab', name: 'Creative lab', nav: 'lab' },
  { id: 'about', name: 'About', nav: 'about' },
  { id: 'method', name: 'Method', nav: 'about' },
  { id: 'services', name: 'Services', nav: 'services' },
  { id: 'contact', name: 'Contact', nav: 'contact' },
] as const

export const sectionIds = sections.map((s) => s.id)
export const sectionToNav: Record<string, string> = Object.fromEntries(sections.map((s) => [s.id, s.nav]))
