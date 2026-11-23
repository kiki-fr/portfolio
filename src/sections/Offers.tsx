import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Folio } from '../components/Folio'
import { MaskLines } from '../components/Reveal'
import { offers } from '../data/services'
import { prefillContact } from '../lib/events'
import './Offers.css'

/**
 * "Pick a door": seven tall, narrow panels. The active one opens wide.
 * Desktop: opens on hover/focus. Mobile: a vertical stack, tap to open.
 */
export function Offers() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="offers" aria-labelledby="offers-title">
      <div className="wrap">
        <Folio num="09" label="Services" aside="Ways to work together" />

        <div className="offers__head">
          <h2 id="offers-title" className="offers__title">
            <MaskLines lines={['Ways in.', <span className="serif">Pick a door.</span>]} />
          </h2>
          <p className="offers__note">
            Seven entry points, from one focused session to an ongoing creative partnership. Every project is scoped to
            the brand. No price lists — tell me where you are and we'll find the right shape.
          </p>
        </div>

        <ol className="doors">
          {offers.map((o, i) => {
            const open = active === i
            const id = `door-${i}`
            return (
              <li
                key={o.name}
                className={`door ${open ? 'is-open' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <button className="door__face" aria-expanded={open} aria-controls={id} onClick={() => setActive(i)}>
                  <span className="door__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="door__name">{o.name}</span>
                </button>
                <div id={id} className="door__room" hidden={!open}>
                  <p className="door__for serif">{o.for}</p>
                  <p className="door__line">{o.line}</p>
                  <button
                    className="btn btn--ink"
                    onClick={() => prefillContact({ type: o.type, note: `Interested in: ${o.name}\n\n` })}
                  >
                    Enquire <ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
