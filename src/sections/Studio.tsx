import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { MaskLines, Reveal } from '../components/Reveal'
import { studioGallery, studioServices } from '../data/services'
import { useDesktop, useReducedMotionPref } from '../hooks/useMediaQuery'
import { useSheet } from '../hooks/useSheet'
import { prefillContact } from '../lib/events'
import './Studio.css'

const treatments = ['scan', 'foil', 'none', 'duotone', 'scan', 'none', 'foil'] as const

function Gallery() {
  return (
    <>
      {studioGallery.map((g, i) => (
        <figure key={i} className={`studio__item studio__item--${g.ratio}`} data-cursor="Study">
          <ArtSlot art={g} label={false} treatment={treatments[i % treatments.length]} />
          <figcaption className="mono">
            <span>{String(i + 1).padStart(2, '0')}</span> {g.caption}
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
          Studio <span className="serif">studio</span> Studio
        </motion.p>
        <motion.div ref={track} className="studio__track" style={{ x }}>
          <div className="studio__intro-card">
            <p className="serif">Technology is not the idea.</p>
            <p className="holo-text serif">Technology expands the idea.</p>
          </div>
          <Gallery />
        </motion.div>
      </div>
    </div>
  )
}

export function Studio() {
  const desktop = useDesktop()
  const reduced = useReducedMotionPref()
  const ref = useRef<HTMLElement>(null)
  const clipPath = useSheet(ref)

  return (
    <motion.section ref={ref} style={{ clipPath }} id="studio" className="studio" aria-labelledby="studio-title">
      <div className="wrap">
        <Folio num="04" label="AI Creative Studio" aside="Visual production" />
        <div className="studio__head">
          <h2 id="studio-title" className="studio__title">
            <MaskLines
              lineClassName="studio__line"
              lines={['Imagination,', <span className="serif">without the</span>, 'old limits.']}
            />
          </h2>
          <Reveal className="studio__lede" delay={0.15}>
            <p>
              A creative studio using emerging tools to expand what can be imagined — and produced. Campaign visuals,
              product imagery and whole visual worlds, art-directed with the same rigour as a photoshoot.
            </p>
            <p className="studio__note">
              AI is an instrument here, never the point. The point is still the idea, the taste and the decisions.
            </p>
          </Reveal>
        </div>
      </div>

      {desktop && !reduced ? (
        <HorizontalGallery />
      ) : (
        <div className="studio__strip" tabIndex={0} aria-label="Studio gallery, scroll horizontally">
          <div className="studio__intro-card">
            <p className="serif">Technology is not the idea.</p>
            <p className="holo-text serif">Technology expands the idea.</p>
          </div>
          <Gallery />
        </div>
      )}

      <div className="wrap studio__services">
        <p className="mono">Studio services</p>
        <ul>
          {studioServices.map((s, i) => (
            <li key={s}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ul>
        <button className="btn btn--light" onClick={() => prefillContact({ type: 'AI creative production' })}>
          Commission a visual project <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  )
}
