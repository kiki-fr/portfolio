import type { ProjectType } from '../data/site'

/**
 * Tiny event bridge so any "Enquire" button on the page can pre-fill the
 * contact form without prop-drilling or a global store.
 */
export const PREFILL_EVENT = 'ki:prefill-contact'

export interface PrefillDetail {
  type?: ProjectType
  note?: string
}

export function prefillContact(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }))
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
