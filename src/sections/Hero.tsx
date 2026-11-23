import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Fragments } from '../components/Fragments'
import { heroArt } from '../data/art'
import { useT } from '../i18n'
import './Hero.css'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const bigX = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const lensY = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  const line = (content: ReactNode, cls: string, i: number) => (
    <span className={`hero__mask ${cls}`}>
      <motion.span
        className="hero__line"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.3, ease, delay: 0.35 + i * 0.09 }}
      >
        {content}
      </motion.span>
    </span>
  )

  const letters = t.hero.l3.split('')

  return (
    <section id="index" ref={ref} className="hero" aria-labelledby="hero-title">
      {/* Corner furniture, like a magazine cover */}
      <motion.div className="hero__corners mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
        <span className="hero__c hero__c--tl">
          Nº 001 <i>/</i> {t.common.issue}
        </span>
        <span className="hero__c hero__c--tr">{t.common.roles.join(' · ')}</span>
        <span className="hero__c hero__c--br">
          {t.hero.index} <i>01—13</i>
        </span>
      </motion.div>

      {/* The image: one photograph, cut into strips */}
      <motion.div
        className="hero__image marks"
        style={{ y: imgY, scale: imgScale }}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      >
        <Fragments art={heroArt.chrome} slices={6} offsets={[0, 5, -4, 8, -7, 2]} treatment="foil" priority />
        <span className="hero__fig fig">{t.hero.fig}</span>
      </motion.div>

      <motion.span
        className="hero__tag tag"
        initial={{ opacity: 0, rotate: -18, y: 30 }}
        animate={{ opacity: 1, rotate: -7, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 1.3 }}
        aria-hidden="true"
      >
        <b>Karen Iredy</b>
        {t.hero.tag[0]}
        <br />
        {t.hero.tag[1]}
      </motion.span>

      <motion.div className="hero__lens marks" style={{ y: lensY }} aria-hidden="true">
        <ArtSlot art={heroArt.eye} label={false} treatment="halftone" decorative />
      </motion.div>

      <motion.h1 id="hero-title" className="hero__title" style={{ y: titleY }}>
        <span className="sr-only">{t.hero.srTitle}</span>
        <span aria-hidden="true">
          {line(
            <>
              {t.hero.l1} <span className="hero__l1-rule" />
            </>,
            'hero__l1',
            0,
          )}
          {line(<span className="serif">{t.hero.l2}</span>, 'hero__l2', 1)}
          <motion.span className="hero__l3-wrap" style={{ x: bigX }}>
            {line(
              <span className="glitch" data-text={t.hero.l3}>
                {letters.map((l, i) => (
                  <span key={i} className={i >= letters.length - 4 ? 'hero__hollow' : undefined}>
                    {l}
                  </span>
                ))}
              </span>,
              'hero__l3',
              2,
            )}
          </motion.span>
          {line(
            <>
              <span className="serif">{t.hero.l4serif}</span> {t.hero.l4}
            </>,
            'hero__l4',
            3,
          )}
        </span>
      </motion.h1>

      <motion.div
        className="hero__foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <p className="hero__statement">
          <span className="mono">{t.hero.statement[0]}</span>
          <span className="serif">{t.hero.statement[1]}</span>
          <span className="mono">{t.hero.statement[2]}</span>
        </p>
        <div className="hero__ctas">
          <a href="#contact" className="btn btn--ink" data-cursor={t.cursor.talk}>
            {t.hero.cta} <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="#intelligence" className="hero__link">
            {t.hero.link}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
