import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Folio } from '../components/Folio'
import { Marquee } from '../components/Marquee'
import './Intro.css'

const statement =
  'I work at the intersection of strategy, creative direction and visual experimentation — to transform ideas into distinctive brand worlds.'

/** Words that carry an editorial footnote marker. */
const notesFor: Record<string, number> = { 'strategy,': 1, direction: 2, experimentation: 3 }

const footnotes = [
  { k: 'Strategy', v: 'Ten years of brands and products, taken from first idea to market.' },
  { k: 'Direction', v: 'Fashion, accessories, handbags, jewellery and premium consumer goods.' },
  { k: 'Experimentation', v: 'Aesthetics without a reason don’t last. Experiments without taste don’t either.' },
]

/** Each word brightens as the paragraph scrolls through the viewport. */
function Word({ children, progress, range, note }: { children: string; progress: MotionValue<number>; range: [number, number]; note?: number }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span className="intro__word">
      <motion.span style={{ opacity }}>
        {children}
        {note && <sup className="intro__sup">{note}</sup>}
      </motion.span>{' '}
    </span>
  )
}

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = statement.split(' ')

  return (
    <section id="intro" className="intro" aria-labelledby="intro-title">
      <Marquee
        variant="display"
        className="intro__marquee"
        items={['Creative direction for brands', 'Brand intelligence', 'Visual experimentation', 'AI as an instrument, not the idea']}
      />

      <div className="wrap intro__grid">
        <aside className="intro__side">
          <Folio num="01" label="Point of view" />
          <h2 id="intro-title" className="intro__title serif">
            Some brands need more than a logo. <em>They need a point of view.</em>
          </h2>
          <ol className="intro__notes">
            {footnotes.map((n, i) => (
              <li key={n.k}>
                <span className="intro__note-num">{i + 1}</span>
                <span>
                  <b className="mono">{n.k}</b> {n.v}
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <p ref={ref} className="intro__statement">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} note={notesFor[w]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
