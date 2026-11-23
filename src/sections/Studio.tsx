import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { MaskLines, Reveal } from '../components/Reveal'
import { studioGallery } from '../data/services'
import { useT } from '../i18n'
import { useDesktop, useReducedMotionPref } from '../hooks/useMediaQuery'
import { useSheet } from '../hooks/useSheet'
import { prefillContact } from '../lib/events'
import './Studio.css'

const treatments = ['scan', 'foil', 'none', 'duotone', 'scan', 'none', 'foil'] as const

function Gallery() {
  const t = useT()
  return (
    <>
      {studioGallery.map((g, i) => (
        <figure key={i} className={`studio__item studio__item--${g.ratio}`} data-cursor={t.cursor.study}>
          <ArtSlot art={g} label={false} treatment={treatments[i % treatments.length]} />
          <figcaption className="mono">
            <span>{String(i + 1).padStart(2, '0')}</span> {t.studio.captions[i]}
          </figcaption>
        </figure>
      ))}
    </>
  )
}

/**
 * Desktop: vertical scroll drives a horizontal editorial sequence (sticky).
 * Mobile / reduced motion: a native horizontal scroll-snap strip.
 */
function HorizontalGallery() {
  const t = useT()
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  // The background word travels the other way: parallax in the horizontal axis.
  const bgX = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div ref={outer} className="studio__h" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="studio__sticky">
        <motion.p className="studio__bgword" style={{ x: bgX }} aria-hidden="true">
          {t.studio.bgWord} <span className="serif">{t.studio.bgWord}</span> {t.studio.bgWord}
        </motion.p>
        <motion.div ref={track} className="studio__track" style={{ x }}>
          <div className="studio__intro-card">
            <p className="serif">{t.studio.cardA}</p>
            <p className="holo-text serif">{t.studio.cardB}</p>
          </div>
          <Gallery />
        </motion.div>
      </div>
    </div>
  )
}

export function Studio() {
  const t = useT()
  const desktop = useDesktop()
  const reduced = useReducedMotionPref()
  const ref = useRef<HTMLElement>(null)
  const clipPath = useSheet(ref)

  return (
    <motion.section ref={ref} style={{ clipPath }} id="studio" className="studio" aria-labelledby="studio-title">
      <div className="wrap">
        <Folio id="studio" aside={t.studio.aside} />
        <div className="studio__head">
          <h2 id="studio-title" className="studio__title">
            <MaskLines
              lineClassName="studio__line"
              lines={[t.studio.title[0], <span className="serif">{t.studio.title[1]}</span>, t.studio.title[2]]}
            />
          </h2>
          <Reveal className="studio__lede" delay={0.15}>
            <p>{t.studio.lede}</p>
            <p className="studio__note">{t.studio.note}</p>
          </Reveal>
        </div>
      </div>

      {desktop && !reduced ? (
        <HorizontalGallery />
      ) : (
        <div className="studio__strip" tabIndex={0} aria-label={t.studio.stripLabel}>
          <div className="studio__intro-card">
            <p className="serif">{t.studio.cardA}</p>
            <p className="holo-text serif">{t.studio.cardB}</p>
          </div>
          <Gallery />
        </div>
      )}

      <div className="wrap studio__services">
        <p className="mono">{t.studio.servicesLabel}</p>
        <ul>
          {t.studio.services.map((s, i) => (
            <li key={s}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ul>
        <button className="btn btn--light" onClick={() => prefillContact({ type: 'ai' })}>
          {t.studio.cta} <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  )
}
