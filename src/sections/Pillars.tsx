import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Fragments } from '../components/Fragments'
import { Reveal } from '../components/Reveal'
import { pillarArt } from '../data/art'
import { pillars } from '../data/services'
import './Pillars.css'

const [think, direct, create] = pillars

function PillarList({ items }: { items: readonly string[] }) {
  return (
    <ul className="pillar__list">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  )
}

export function Pillars() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])
  const tilt = useTransform(scrollYProgress, [0, 1], [-8, 8])

  return (
    <section id="pillars" className="pillars" aria-label="Think, Direct, Create">
      <div className="wrap pillars__head">
        <p className="mono">Three verbs · one practice</p>
        <p className="pillars__formula">
          Brand intelligence <span>+</span> Creative direction <span>+</span> AI-assisted creation
        </p>
      </div>

      {/* THINK — brutalist black */}
      <article className="pillar pillar--think" aria-labelledby="p-think">
        <div className="pillar__bg">
          <ArtSlot art={pillarArt.think} label={false} />
        </div>
        <div className="wrap pillar__grid">
          <span className="pillar__index mono">I.</span>
          <Reveal className="pillar__copy">
            <p className="pillar__line">{think.line}</p>
            <PillarList items={think.items} />
            <a href={think.href} className="btn btn--light">
              {think.cta} <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
        <h3 id="p-think" className="pillar__verb pillar__verb--think">
          {think.verb}
        </h3>
      </article>

      {/* DIRECT — editorial ivory collage */}
      <article ref={ref} className="pillar pillar--direct" aria-labelledby="p-direct">
        <div className="wrap pillar__grid pillar__grid--direct">
          <div className="pillar__collage">
            <div className="pillar__img pillar__img--a marks">
              <Fragments art={pillarArt.directA} slices={5} offsets={[0, -4, 6, -2, 3]} drift={10} treatment="scan" />
              <span className="pillar__fig fig">Fig. 02 — Direction is a cut, not a filter</span>
            </div>
            <motion.div className="pillar__img pillar__img--b" style={{ y: drift, rotate: tilt }}>
              <ArtSlot art={pillarArt.directB} label={false} />
            </motion.div>
            <h3 id="p-direct" className="pillar__verb pillar__verb--direct serif">
              {direct.verb}
            </h3>
          </div>
          <Reveal className="pillar__copy">
            <span className="pillar__index mono">II.</span>
            <p className="pillar__line">{direct.line}</p>
            <PillarList items={direct.items} />
            <a href={direct.href} className="btn btn--ink">
              {direct.cta} <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </article>

      {/* CREATE — silver / holographic */}
      <article className="pillar pillar--create" aria-labelledby="p-create">
        <div className="wrap pillar__grid pillar__grid--create">
          <Reveal className="pillar__copy">
            <span className="pillar__index mono">III.</span>
            <p className="pillar__line">{create.line}</p>
            <PillarList items={create.items} />
            <a href={create.href} className="btn btn--ink">
              {create.cta} <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
          <div className="pillar__arch">
            <ArtSlot art={pillarArt.create} treatment="foil" label={false} />
            <span className="pillar__arch-tag tag" aria-hidden="true">
              <b>Studio output</b>
              AI-assisted · art-directed
            </span>
          </div>
        </div>
        <h3 id="p-create" className="pillar__verb pillar__verb--create">
          {create.verb}
        </h3>
      </article>
    </section>
  )
}
