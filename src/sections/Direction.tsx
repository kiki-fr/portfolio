import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { Fragments } from '../components/Fragments'
import { MaskLines, Reveal } from '../components/Reveal'
import { directionArt } from '../data/art'
import { coherence, directionServices } from '../data/services'
import { prefillContact } from '../lib/events'
import './Direction.css'

export function Direction() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['8%', '-16%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['40%', '-50%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['-10%', '24%'])
  const r = useTransform(scrollYProgress, [0, 1], [-9, 5])

  return (
    <section id="direction" className="dir" aria-labelledby="dir-title">
      <div className="wrap dir__top">
        <Folio num="03" label="Creative direction" aside="The bridge" />
        <h2 id="dir-title" className="dir__title">
          <MaskLines
            lines={[
              <>
                Turn <span className="serif">the</span> idea
              </>,
              <>
                <span className="serif">into a</span> world.
              </>,
            ]}
          />
        </h2>
      </div>

      <div ref={ref} className="wrap dir__stage">
        <motion.div className="dir__img dir__img--1 marks" style={{ y: y1 }}>
          <Fragments art={directionArt[0]} slices={4} offsets={[0, 7, -3, 4]} drift={12} treatment="halftone" />
          <span className="dir__fig fig">Fig. 03 — Editorial crop</span>
        </motion.div>
        <motion.div className="dir__img dir__img--2" style={{ y: y2, rotate: r }}>
          <ArtSlot art={directionArt[1]} label={false} />
        </motion.div>
        <motion.div className="dir__img dir__img--3 marks" style={{ y: y3 }}>
          <ArtSlot art={directionArt[2]} treatment="scan" />
          <span className="dir__fig fig">Fig. 04 — Reflection, broken on purpose</span>
        </motion.div>
        <div className="dir__img dir__img--4">
          <ArtSlot art={directionArt[3]} label={false} treatment="duotone" />
        </div>

        <Reveal className="dir__manifesto">
          <span className="dir__quote serif" aria-hidden="true">
            “
          </span>
          <p className="dir__manifesto-text">
            Creative direction is the bridge between what a brand <em className="serif">means</em> and what people
            actually <em className="serif">see</em>. One idea, held with precision, so that every image, product and
            sentence belongs to the same world.
          </p>
          <p className="mono">Strategy → Direction → Expression</p>
        </Reveal>
      </div>

      <div className="wrap dir__bottom">
        <div className="dir__coherence" aria-label="Creative direction brings coherence to">
          <p className="dir__core">
            <span className="serif">One idea,</span>
            <span className="mono">coherent across —</span>
          </p>
          <ul>
            {coherence.map((c, i) => (
              <li key={c} style={{ ['--i' as string]: i }}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="dir__services">
          <p className="mono dir__services-k">What I direct</p>
          <ul>
            {directionServices.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button className="btn btn--ink" onClick={() => prefillContact({ type: 'Creative direction' })}>
            Direct something with me <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
