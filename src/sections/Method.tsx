import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Folio } from '../components/Folio'
import { method } from '../data/services'
import { useSheet } from '../hooks/useSheet'
import './Method.css'

function Step({ step, index, onActive }: { step: (typeof method)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <li ref={ref} className={`method__step ${inView ? 'is-active' : ''}`}>
      <span className="method__step-num mono">{step.num}</span>
      <h3 className="method__step-title">{step.title}</h3>
      <p className="method__step-line">{step.line}</p>
      <p className="method__step-detail">{step.detail}</p>
    </li>
  )
}

export function Method() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const clipPath = useSheet(ref)

  return (
    <motion.section ref={ref} style={{ clipPath }} id="method" className="method" aria-labelledby="method-title">
      <div className="wrap">
        <Folio num="08" label="Method" aside="Five movements" />
        <h2 id="method-title" className="method__title">
          How an idea <span className="serif">becomes</span> a world.
        </h2>
      </div>

      <div className="wrap method__grid">
        <div className="method__sticky" aria-hidden="true">
          <div className="method__counter">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={active}
                className="method__big"
                initial={{ y: '60%', opacity: 0, filter: 'blur(12px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-60%', opacity: 0, filter: 'blur(12px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {method[active].num}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="method__rail">
            {method.map((m, i) => (
              <span key={m.num} className={i <= active ? 'is-on' : ''}>
                {m.title}
              </span>
            ))}
          </div>
        </div>

        <ol className="method__steps">
          {method.map((m, i) => (
            <Step key={m.num} step={m} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </motion.section>
  )
}
