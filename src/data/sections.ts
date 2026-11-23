/**
 * Page architecture, in order. `nav` = which top-menu item is active
 * while this section is on screen. Names come from i18n `sections`.
 *
 * ENTRY (portal) → LOBBY (index) → CORE (the studio) → EVIDENCE (work)
 * → EXPLORATION (lab) → INTELLECT (journal) → PERSON (about) → CONVERSION (contact)
 */
export const sections = [
  { id: 'index', nav: 'index' },
  { id: 'intro', nav: 'index' },
  { id: 'pillars', nav: 'pillars' },
  { id: 'intelligence', nav: 'pillars' },
  { id: 'direction', nav: 'pillars' },
  { id: 'studio', nav: 'pillars' },
  { id: 'services', nav: 'pillars' },
  { id: 'method', nav: 'pillars' },
  { id: 'work', nav: 'work' },
  { id: 'lab', nav: 'lab' },
  { id: 'journal', nav: 'journal' },
  { id: 'about', nav: 'about' },
  { id: 'contact', nav: 'contact' },
] as const

export type SectionId = (typeof sections)[number]['id']
export const sectionIds = sections.map((s) => s.id)
export const sectionToNav: Record<string, string> = Object.fromEntries(sections.map((s) => [s.id, s.nav]))
export const sectionNumber = (id: SectionId) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')
