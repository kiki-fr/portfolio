import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { sectionIds, sections } from '../data/sections'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useT } from '../i18n'
import './Rails.css'

/**
 * Magazine margins: a running title on the left, the current "page"
 * on the right, and a hairline foil progress bar across the top.
 */
export function Rails() {
  const t = useT()
  const activeId = useActiveSection(sectionIds)
  const index = Math.max(0, sections.findIndex((s) => s.id === activeId))
  const current = sections[index]
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <motion.div className="progress foil" style={{ scaleX }} aria-hidden="true" />
      <div className="rail rail--left" aria-hidden="true">
        <span>{site.wordmark}</span>
        <span className="rail__line" />
        <span>{t.common.positioning}</span>
        <span className="rail__line" />
        <span>{t.common.issue}</span>
      </div>
      <div className="rail rail--right" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
          >
            {String(index + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')} — {t.sections[current.id]}
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  )
}
