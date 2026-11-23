import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { Marquee } from '../components/Marquee'
import { labItems } from '../data/lab'
import { useT } from '../i18n'
import { useFinePointer } from '../hooks/useMediaQuery'
import './Lab.css'

/**
 * The playground. Looser, more chaotic than the rest of the site.
 * On desktop, specimens can be dragged around the table.
 */
export function Lab() {
  const t = useT()
  const table = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  return (
    <section id="lab" className="lab" aria-labelledby="lab-title">
      <Marquee className="lab__marquee" items={t.lab.kinds} reverse />

      <div className="wrap">
        <Folio id="lab" aside={t.lab.aside} />

        <div className="lab__head">
          <h2 id="lab-title" className="lab__title">
            <span>{t.lab.titleA}</span>
            <span className="lab__title-lab serif">{t.lab.titleB}</span>
            <span className="lab__stamp mono">{t.lab.stamp}</span>
          </h2>
          <p className="lab__note">
            {t.lab.note} {fine && <em className="serif">{t.lab.drag}</em>}
          </p>
        </div>

        <div ref={table} className="lab__table">
          {labItems.map((item, i) => (
            <motion.figure
              key={i}
              className={`lab__item lab__item--${item.size}`}
              style={{ rotate: item.tilt }}
              drag={fine}
              dragConstraints={table}
              dragElastic={0.15}
              dragMomentum={false}
              whileHover={fine ? { scale: 1.03, rotate: 0, zIndex: 10 } : undefined}
              whileDrag={{ scale: 1.06, zIndex: 20, cursor: 'grabbing' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
              data-cursor={fine ? t.cursor.drag : undefined}
            >
              <ArtSlot art={item} label={false} />
              <figcaption>
                <span className="mono">
                  N°{String(i + 1).padStart(3, '0')} — {t.lab.items[i].kind}
                </span>
                <span className="lab__item-title serif">{t.lab.items[i].title}</span>
              </figcaption>
            </motion.figure>
          ))}
          <p className="lab__scribble serif" aria-hidden="true">
            {t.lab.scribble}
          </p>
        </div>
      </div>
    </section>
  )
}
