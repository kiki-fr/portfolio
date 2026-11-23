import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Folio } from '../components/Folio'
import { MaskLines, Reveal } from '../components/Reveal'
import { intelligence } from '../data/services'
import { prefillContact } from '../lib/events'
import './Intelligence.css'

export function Intelligence() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <section id="intelligence" className="intel" aria-labelledby="intel-title">
      <div className="wrap">
        <Folio num="02" label="Intelligence" aside="Brand strategy" />

        <div className="intel__head">
          <h2 id="intel-title" className="intel__title">
            <MaskLines lines={['Before the image,', <>there is <em className="serif">the idea.</em></>]} />
          </h2>
          <Reveal className="intel__lede" delay={0.2}>
            <p>
              Every strong image starts long before the camera, the prompt or the moodboard. It starts with
              understanding: what the business is, what it wants to become, and the space it could own that
              nobody else is standing in.
            </p>
            <p className="intel__lede-small">
              This is the quiet, rigorous part of the work — and the part that makes everything after it sharper.
            </p>
          </Reveal>
        </div>

        <ol className="intel__list">
          {intelligence.map((s) => {
            const isOpen = open === s.num
            const panelId = `intel-panel-${s.num}`
            return (
              <li key={s.num} className={`intel__row ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    className="intel__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : s.num)}
                  >
                    <span className="intel__num mono">{s.num}</span>
                    <span className="intel__name">{s.title}</span>
                    <span className="intel__short">{s.short}</span>
                    <Plus className="intel__icon" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className="intel__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="intel__cols">
                        <div>
                          <p className="mono intel__k">What it is</p>
                          <p className="intel__what">{s.what}</p>
                        </div>
                        <div>
                          <p className="mono intel__k">The problem it solves</p>
                          <p>{s.problem}</p>
                        </div>
                        <div>
                          <p className="mono intel__k">You receive</p>
                          <ul className="intel__receive">
                            {s.receive.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ol>

        <Reveal className="intel__cta">
          <p className="intel__cta-line">
            Let's find your brand's <em className="serif">next chapter.</em>
          </p>
          <button
            className="btn btn--ink"
            data-cursor="Begin"
            onClick={() => prefillContact({ type: 'Brand strategy' })}
          >
            Start with strategy <ArrowUpRight aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
