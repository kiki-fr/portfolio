import { sectionNumber, type SectionId } from '../data/sections'
import { useT } from '../i18n'

/** Magazine-style section label: "Nº 04 —— INTELLIGENCE ——— aside". Number and name come from the page architecture. */
export function Folio({ id, aside }: { id: SectionId; aside?: string }) {
  const t = useT()
  return (
    <div className="folio" aria-hidden="true">
      <span className="folio__num">{sectionNumber(id)}</span>
      <span>{t.sections[id]}</span>
      <span className="folio__rule" />
      {aside && <span>{aside}</span>}
    </div>
  )
}
