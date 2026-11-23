import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Folio } from '../components/Folio'
import { MaskLines, Reveal } from '../components/Reveal'
import { useT } from '../i18n'
import { prefillContact } from '../lib/events'
import './Intelligence.css'

export function Intelligence() {
  const t = useT()
  const [open, setOpen] = useState<string | null>('01')
  const intelligence = t.intelligence.services.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }))

  return (
    <section id="intelligence" className="intel" aria-labelledby="intel-title">
      <div className="wrap">
        <Folio id="intelligence" aside={t.intelligence.aside} />

        <div className="intel__head">
          <h2 id="intel-title" className="intel__title">
            <MaskLines
              lines={[
                t.intelligence.titleA,
                <>
                  {t.intelligence.titleB} <em className="serif">{t.intelligence.titleBSerif}</em>
                </>,
              ]}
            />
          </h2>
          <Reveal className="intel__lede" delay={0.2}>
            <p>{t.intelligence.lede}</p>
            <p className="intel__lede-small">{t.intelligence.ledeSmall}</p>
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
                          <p className="mono intel__k">{t.intelligence.labels.what}</p>
                          <p className="intel__what">{s.what}</p>
                        </div>
                        <div>
                          <p className="mono intel__k">{t.intelligence.labels.problem}</p>
                          <p>{s.problem}</p>
                        </div>
                        <div>
                          <p className="mono intel__k">{t.intelligence.labels.receive}</p>
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
            {t.intelligence.ctaLine} <em className="serif">{t.intelligence.ctaLineSerif}</em>
          </p>
          <button
            className="btn btn--ink"
            data-cursor={t.cursor.begin}
            onClick={() => prefillContact({ type: 'strategy' })}
          >
            {t.intelligence.cta} <ArrowUpRight aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
