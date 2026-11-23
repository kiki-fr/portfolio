import { motion } from 'framer-motion'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { MaskLines, Reveal } from '../components/Reveal'
import { journalArt } from '../data/lab'
import { useT } from '../i18n'
import './Journal.css'

/**
 * INTELLECT — the journal. Builds authority through point of view.
 * Entries are topics "in writing" until real essays are published.
 */
export function Journal() {
  const t = useT()
  const j = t.journal
  const [lead, ...rest] = j.entries

  return (
    <section id="journal" className="journal" aria-labelledby="journal-title">
      <div className="wrap">
        <Folio id="journal" aside={j.aside} />

        <div className="journal__head">
          <div>
            <h2 id="journal-title" className="journal__title">
              <MaskLines lines={[j.titleA]} />
            </h2>
            <MaskLines className="journal__kicker serif" lines={[j.titleB]} delay={0.15} />
          </div>
          <Reveal className="journal__note" delay={0.15}>
            <p>{j.note}</p>
          </Reveal>
        </div>

        <div className="journal__grid">
          {/* Featured essay */}
          <motion.article
            className="journal__lead"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="journal__lead-img marks">
              <ArtSlot art={journalArt[0]} label={false} treatment="scan" />
              <span className="journal__status tag">
                <b>{j.status}</b>
                Nº 01
              </span>
            </div>
            <div className="journal__lead-text">
              <p className="journal__meta mono">
                {lead.tag} — {lead.mins} {j.minutes}
              </p>
              <h3 className="journal__lead-title">{lead.title}</h3>
              <p className="journal__excerpt serif">{lead.excerpt}</p>
            </div>
          </motion.article>

          {/* Index of other essays */}
          <ol className="journal__list">
            {rest.map((e, i) => (
              <motion.li
                key={e.title}
                className="journal__item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <span className="journal__num serif">{String(i + 2).padStart(2, '0')}</span>
                <div className="journal__thumb">
                  <ArtSlot art={journalArt[i + 1]} label={false} />
                </div>
                <div>
                  <p className="journal__meta mono">
                    {e.tag} — {e.mins} {j.minutes} · <i>{j.status}</i>
                  </p>
                  <h3 className="journal__item-title">{e.title}</h3>
                  <p className="journal__item-excerpt">{e.excerpt}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
