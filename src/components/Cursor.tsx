import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotionPref } from '../hooks/useMediaQuery'
import './Cursor.css'

/**
 * Custom cursor: a small dot + a lagging ring. Any element with
 * `data-cursor="Label"` makes the ring grow and show that label.
 * Disabled on touch devices and for reduced-motion users.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotionPref()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })
  const [label, setLabel] = useState<string | null>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')

    const inspect = (t: Element | null) => {
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor ?? null)
      setHover(Boolean(t?.closest('a, button, select, input, textarea, label, [role="button"]')))
    }
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      inspect(e.target as Element | null)
    }
    // Content moves under a still pointer while scrolling: re-check what is below it.
    const onScroll = () => inspect(document.elementFromPoint(x.get(), y.get()))
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className={`cursor-ring ${hover ? 'is-hover' : ''} ${label ? 'is-label' : ''}`}
        style={{ x: rx, y: ry }}
        aria-hidden="true"
      >
        {label && <span>{label}</span>}
      </motion.div>
    </>
  )
}
