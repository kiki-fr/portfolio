import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { Fragments } from '../components/Fragments'
import { MaskLines, Reveal } from '../components/Reveal'
import { directionArt } from '../data/art'
import { useT } from '../i18n'
import { gap } from '../lib/text'
import { prefillContact } from '../lib/events'
import './Direction.css'

export function Direction() {
  const t = useT()
  const d = t.direction
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['8%', '-16%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['40%', '-50%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['-10%', '24%'])
  const r = useTransform(scrollYProgress, [0, 1], [-9, 5])

  return (
    <section id="direction" className="dir" aria-labelledby="dir-title">
      <div className="wrap dir__top">
        <Folio id="direction" aside={d.aside} />
        <h2 id="dir-title" className="dir__title">
          <MaskLines
            lines={[
              <>
                {d.titleA} <span className="serif">{d.titleASerif}</span>
                {gap(d.titleASerif)}
                {d.titleAEnd}
              </>,
              <>
                <span className="serif">{d.titleBSerif}</span> {d.titleB}
              </>,
            ]}
          />
        </h2>
      </div>

      <div ref={ref} className="wrap dir__stage">
        <motion.div className="dir__img dir__img--1 marks" style={{ y: y1 }}>
          <Fragments art={directionArt[0]} slices={4} offsets={[0, 7, -3, 4]} drift={12} treatment="halftone" />
          <span className="dir__fig fig">{d.figA}</span>
        </motion.div>
        <motion.div className="dir__img dir__img--2" style={{ y: y2, rotate: r }}>
          <ArtSlot art={directionArt[1]} label={false} />
        </motion.div>
        <motion.div className="dir__img dir__img--3 marks" style={{ y: y3 }}>
          <ArtSlot art={directionArt[2]} treatment="scan" />
          <span className="dir__fig fig">{d.figB}</span>
        </motion.div>
        <div className="dir__img dir__img--4">
          <ArtSlot art={directionArt[3]} label={false} treatment="duotone" />
        </div>

        <Reveal className="dir__manifesto">
          <span className="dir__quote serif" aria-hidden="true">
            “
          </span>
          <p className="dir__manifesto-text">
            {d.manifesto.a} <em className="serif">{d.manifesto.em1}</em> {d.manifesto.b}{' '}
            <em className="serif">{d.manifesto.em2}</em>
            {d.manifesto.c}
          </p>
          <p className="mono">{d.flow}</p>
        </Reveal>
      </div>

      <div className="wrap dir__bottom">
        <div className="dir__coherence" aria-label={`${d.coreSerif} ${d.coreMono}`}>
          <p className="dir__core">
            <span className="serif">{d.coreSerif}</span>
            <span className="mono">{d.coreMono}</span>
          </p>
          <ul>
            {d.coherence.map((c, i) => (
              <li key={c} style={{ ['--i' as string]: i }}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="dir__services">
          <p className="mono dir__services-k">{d.servicesLabel}</p>
          <ul>
            {d.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button className="btn btn--ink" onClick={() => prefillContact({ type: 'direction' })}>
            {d.cta} <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
