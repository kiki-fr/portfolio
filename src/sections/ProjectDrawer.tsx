import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { useT } from '../i18n'
import type { LocalProject } from './Work'
import { prefillContact } from '../lib/events'
import './ProjectDrawer.css'

/** Full-screen project view. Escape or the close button dismisses it. */
export function ProjectDrawer({ project, onClose }: { project: LocalProject; onClose: () => void }) {
  const t = useT()
  const dr = t.work.drawer
  const cat = t.work.categories[project.category]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])

  const blocks = [
    { k: dr.context, v: project.context },
    { k: dr.challenge, v: project.challenge },
    { k: dr.solution, v: project.solution },
  ]

  return (
    <motion.div
      className="drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="drawer__bar">
        <span className="mono">
          {cat} — {project.year}
        </span>
        <button ref={closeRef} className="drawer__close" onClick={onClose} aria-label={dr.close}>
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="drawer__scroll">
        <header className="drawer__head wrap">
          <p className={`mono drawer__status drawer__status--${project.status}`}>{t.work.status[project.status]}</p>
          <h2 id="drawer-title" className="drawer__title">
            {project.title}
          </h2>
          <p className="drawer__desc serif">{project.description}</p>
        </header>

        <div className="drawer__hero">
          <ArtSlot art={project.hero} priority />
        </div>

        <div className="wrap drawer__body">
          {blocks.map((b) => (
            <section key={b.k} className="drawer__block">
              <h3 className="mono">{b.k}</h3>
              <p>{b.v}</p>
            </section>
          ))}
          <section className="drawer__block">
            <h3 className="mono">{dr.result}</h3>
            <p>{project.result ?? dr.noResult}</p>
          </section>
        </div>

        <div className="wrap drawer__gallery">
          {project.gallery.map((g, i) => (
            <div key={i} className={`drawer__g drawer__g--${(i % 3) + 1}`}>
              <ArtSlot art={g} />
            </div>
          ))}
        </div>

        <div className="wrap drawer__foot">
          <p>{dr.foot}</p>
          <button
            className="btn btn--ink"
            onClick={() => {
              onClose()
              prefillContact({ note: `Re: ${project.title} (${cat})\n\n` })
            }}
          >
            {dr.cta}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
