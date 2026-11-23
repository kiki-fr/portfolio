import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Folio } from '../components/Folio'
import { Marquee } from '../components/Marquee'
import { useT } from '../i18n'
import './Intro.css'

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
  const t = useT()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })

  // Flatten the segments into words; the footnote marker goes on a segment's last word.
  const words = t.intro.statement.flatMap((seg) => {
    const parts = seg.text.split(' ')
    return parts.map((w, i) => ({ w, note: i === parts.length - 1 && 'note' in seg ? seg.note : undefined }))
  })

  return (
    <section id="intro" className="intro" aria-labelledby="intro-title">
      <Marquee variant="display" className="intro__marquee" items={t.intro.marquee} />

      <div className="wrap intro__grid">
        <aside className="intro__side">
          <Folio id="intro" />
          <h2 id="intro-title" className="intro__title serif">
            {t.intro.titleA} <em>{t.intro.titleB}</em>
          </h2>
          <ol className="intro__notes">
            {t.intro.footnotes.map((n, i) => (
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
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} note={w.note}>
              {w.w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
