import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useState, type PointerEvent } from 'react'
import { ArtSlot } from '../components/ArtSlot'
import { Folio } from '../components/Folio'
import { MaskLines } from '../components/Reveal'
import { categoryKeys, projects as rawProjects, type Category } from '../data/projects'
import { useT } from '../i18n'
import type { Content } from '../i18n/en'
import { useFinePointer } from '../hooks/useMediaQuery'
import { ProjectDrawer } from './ProjectDrawer'
import './Work.css'

type Filter = Category | 'all'

/** A project with its text in the current language. */
export function localize(t: Content) {
  return rawProjects.map((p) => {
    const txt = t.work.projects[p.slug] ?? { title: p.slug, description: '' }
    return {
      ...p,
      title: txt.title,
      description: txt.description,
      context: txt.context ?? t.work.guide.context,
      challenge: txt.challenge ?? t.work.guide.challenge,
      solution: txt.solution ?? t.work.guide.solution,
      result: txt.result,
    }
  })
}
export type LocalProject = ReturnType<typeof localize>[number]

export function Work() {
  const t = useT()
  const projects = useMemo(() => localize(t), [t])
  const [filter, setFilter] = useState<Filter>('all')
  const [hovered, setHovered] = useState<LocalProject | null>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const fine = useFinePointer()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 220, damping: 26 })
  const py = useSpring(y, { stiffness: 220, damping: 26 })

  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)), [filter, projects])
  const open = projects.find((p) => p.slug === openSlug) ?? null

  // Deep links: #work/<slug> opens a project directly.
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#work\/(.+)$/)
      if (m && rawProjects.some((p) => p.slug === m[1])) setOpenSlug(m[1])
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const openProject = (slug: string) => {
    setOpenSlug(slug)
    history.replaceState(null, '', `#work/${slug}`)
  }
  const close = () => {
    setOpenSlug(null)
    history.replaceState(null, '', '#work')
  }

  const onMove = (e: PointerEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="wrap">
        <Folio id="work" aside={`${projects.length} ${t.work.entries}`} />

        <div className="work__head">
          <h2 id="work-title" className="work__title">
            <MaskLines lines={[t.work.titleA, <span className="serif">{t.work.titleB}</span>]} />
          </h2>
          <p className="work__note">{t.work.note}</p>
        </div>

        <div className="work__filters" role="group" aria-label={t.work.filterLabel}>
          {(['all', ...categoryKeys] as Filter[]).map((c) => (
            <button key={c} className={`work__chip ${filter === c ? 'is-active' : ''}`} aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c === 'all' ? t.work.all : t.work.categories[c]}
              {c !== 'all' && <sup>{projects.filter((p) => p.category === c).length}</sup>}
            </button>
          ))}
        </div>

        <ul className="work__list" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setHovered(null)}>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="work__row"
              >
                <button
                  className="work__btn"
                  onClick={() => openProject(p.slug)}
                  onPointerEnter={() => setHovered(p)}
                  onFocus={() => setHovered(p)}
                  data-cursor={t.cursor.open}
                >
                  <span className="work__idx mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="work__thumb">
                    <ArtSlot art={p.hero} label={false} />
                  </span>
                  <span className="work__name">{p.title}</span>
                  <span className="work__cat mono">{t.work.categories[p.category]}</span>
                  <span className={`work__status mono work__status--${p.status}`}>{t.work.status[p.status]}</span>
                  <span className="work__year mono">{p.year}</span>
                  <ArrowUpRight className="work__arrow" aria-hidden="true" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {/* Cursor-following preview (desktop only) */}
      {fine && (
        <motion.div className="work__preview" style={{ x: px, y: py }} aria-hidden="true">
          <AnimatePresence mode="wait">
            {hovered && (
              <motion.div
                key={hovered.slug}
                className="work__preview-inner"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArtSlot art={hovered.hero} label={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>{open && <ProjectDrawer project={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
