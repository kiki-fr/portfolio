import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { Marquee } from '../components/Marquee'
import { labItems, labKinds } from '../data/lab'
import { useFinePointer } from '../hooks/useMediaQuery'
import './Lab.css'

/**
 * The playground. Looser, more chaotic than the rest of the site.
 * On desktop, specimens can be dragged around the table.
 */
export function Lab() {
  const table = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  return (
    <section id="lab" className="lab" aria-labelledby="lab-title">
      <Marquee className="lab__marquee" items={labKinds} reverse />

      <div className="wrap">
        <Folio num="06" label="Creative lab" aside="Evolving archive" />

        <div className="lab__head">
          <h2 id="lab-title" className="lab__title">
            <span>Creative</span>
            <span className="lab__title-lab serif">lab</span>
            <span className="lab__stamp mono">Open archive · always unfinished</span>
          </h2>
          <p className="lab__note">
            Experiments, impossible objects, type under stress, material studies, AI explorations. Ideas that don't
            need a client yet. {fine && <em className="serif">Drag things around — it's a work table.</em>}
          </p>
        </div>

        <div ref={table} className="lab__table">
          {labItems.map((item, i) => (
            <motion.figure
              key={item.title}
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
              data-cursor={fine ? 'Drag' : undefined}
            >
              <ArtSlot art={item} label={false} />
              <figcaption>
                <span className="mono">
                  N°{String(i + 1).padStart(3, '0')} — {item.kind}
                </span>
                <span className="lab__item-title serif">{item.title}</span>
              </figcaption>
            </motion.figure>
          ))}
          <p className="lab__scribble serif" aria-hidden="true">
            what if…?
          </p>
        </div>
      </div>
    </section>
  )
}
