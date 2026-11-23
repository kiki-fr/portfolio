/** Magazine-style section label: "02 —— INTELLIGENCE ——— KAREN IREDY". */
export function Folio({ num, label, aside }: { num: string; label: string; aside?: string }) {
  return (
    <div className="folio" aria-hidden="true">
      <span className="folio__num">{num}</span>
      <span>{label}</span>
      <span className="folio__rule" />
      {aside && <span>{aside}</span>}
    </div>
  )
}
