import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Folio } from '../components/Folio'
import { Fragments } from '../components/Fragments'
import { Reveal } from '../components/Reveal'
import { aboutArt } from '../data/art'
import { site } from '../data/site'
import './About.css'

const territories = ['Fashion', 'Product', 'Strategy', 'Direction', 'Commerce', 'Experiment', 'Technology', 'Curiosity']

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const nameX = useTransform(scrollYProgress, [0, 1], ['6%', '-14%'])

  return (
    <section id="about" ref={ref} className="about" aria-labelledby="about-title">
      <div className="wrap">
        <Folio num="07" label="About" aside={site.roles.join(' · ')} />
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
            <span className="fig">Portrait — placeholder</span>
            <span className="fig">Replace in src/data/art.ts</span>
          </div>
          <span className="about__tag tag" aria-hidden="true">
            <b>K. Iredy</b>
            10+ yrs · concept → market
          </span>
        </div>

        <div className="about__text">
          <h2 id="about-title" className="about__lead serif">
            I have always been interested in the space between what something <em>is</em> and what it could{' '}
            <em className="foil-text">become.</em>
          </h2>

          <Reveal className="about__body">
            <p>
              For more than ten years I have taken brands and products from first idea to market — across fashion,
              accessories, handbags, jewellery and premium consumer goods, very often side by side with founders,
              while the brand itself was still being invented.
            </p>
            <p>
              That taught me that a product is never just a product. It is an idea, a perception, a story and a world
              waiting to be built. And that beauty without a business reason rarely survives its first season.
            </p>
            <p className="about__pull serif">The tools keep changing. The point of view is the job.</p>
            <p>
              Today I work across brand intelligence, creative direction and visual experimentation. I use new tools —
              AI among them — the way I once used fabric swatches and sample rooms: to test, to provoke, to see further
              before anything is made.
            </p>
          </Reveal>

          <ul className="about__tags" aria-label="Territories">
            {territories.map((t, i) => (
              <li key={t} className={i % 3 === 1 ? 'serif' : ''}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
