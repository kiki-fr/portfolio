import './Marquee.css'

/**
 * Infinite ticker. Pauses on hover and for reduced-motion users.
 * `variant="display"` = large italic serif ticker; default = small mono band.
 */
export function Marquee({
  items,
  className = '',
  reverse = false,
  variant = 'band',
}: {
  items: string[]
  className?: string
  reverse?: boolean
  variant?: 'band' | 'display'
}) {
  const row = items.map((t, i) => (
    <span key={i} className="marquee__item">
      {t}
      <span className="marquee__sep">{variant === 'display' ? '◇' : '✦'}</span>
    </span>
  ))
  return (
    <div className={`marquee marquee--${variant} ${reverse ? 'marquee--rev' : ''} ${className}`} aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__row">{row}</div>
        <div className="marquee__row">{row}</div>
      </div>
    </div>
  )
}
