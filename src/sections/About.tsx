import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Folio } from '../components/Folio'
import { Fragments } from '../components/Fragments'
import { Reveal } from '../components/Reveal'
import { aboutArt } from '../data/art'
import { site } from '../data/site'
import { useT } from '../i18n'
import './About.css'

export function About() {
  const t = useT()
  const a = t.about
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const nameX = useTransform(scrollYProgress, [0, 1], ['6%', '-14%'])
  const linkedin = site.socials.find((s) => s.label === 'LinkedIn')?.href

  return (
    <section id="about" ref={ref} className="about" aria-labelledby="about-title">
      <div className="wrap">
        <Folio id="about" aside={t.common.roles.join(' · ')} />
      </div>

      <motion.p className="about__name" style={{ x: nameX }} aria-hidden="true">
        Karen <span className="serif">Iredy</span> — Karen <span className="serif">Iredy</span>
      </motion.p>

      <div className="wrap about__grid">
        <div className="about__portrait">
          <motion.div className="about__portrait-inner marks" style={{ y: imgY }}>
            <Fragments art={aboutArt} slices={9} offsets={[0, 2, -3, 5, -1, 4, -4, 1, 3]} drift={8} treatment="scan" />
          </motion.div>
          <div className="about__caption">
            <span className="fig">{a.caption[0]}</span>
            <span className="fig">{a.caption[1]}</span>
          </div>
          <span className="about__tag tag" aria-hidden="true">
            <b>{a.tag[0]}</b>
            {a.tag[1]}
          </span>
        </div>

        <div className="about__text">
          <h2 id="about-title" className="about__lead serif">
            {a.leadA} <em>{a.leadIs}</em> {a.leadB} <em className="foil-text">{a.leadBecome}</em>
          </h2>

          <Reveal className="about__body">
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p className="about__pull serif">{a.pull}</p>
            <p>{a.p3}</p>
          </Reveal>

          <ul className="about__tags" aria-label={t.sections.about}>
            {a.tags.map((tag, i) => (
              <li key={tag} className={i % 3 === 1 ? 'serif' : ''}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PERSON — closer: beliefs and how it feels to work together */}
      <div className="wrap about__closer">
        <div className="about__closer-head">
          <h3 className="about__closer-title serif">{a.closer.title}</h3>
          <p className="about__closer-intro">{a.closer.intro}</p>
        </div>

        <div className="about__beliefs">
          <p className="mono">{a.closer.beliefsLabel}</p>
          <ol>
            {a.closer.beliefs.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                style={{ paddingLeft: `${i * 6}%` }}
              >
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <span className={i % 2 ? 'serif' : ''}>{b}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="about__working">
          <p className="mono">{a.closer.workingLabel}</p>
          <dl>
            {a.closer.working.map((w) => (
              <div key={w.k}>
                <dt className="serif">{w.k}</dt>
                <dd>{w.v}</dd>
              </div>
            ))}
          </dl>
          {linkedin && (
            <a className="btn btn--line" href={linkedin} target="_blank" rel="noreferrer">
              {a.closer.linkedin} <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
