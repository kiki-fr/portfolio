import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'
import type { Art } from '../data/art'
import { useFinePointer } from '../hooks/useMediaQuery'
import { ArtSlot, type Treatment } from './ArtSlot'
import './Fragments.css'

interface Props {
  art: Art
  /** Number of vertical strips. */
  slices?: number
  /** Vertical offset of each strip, in % of the height. Repeats if shorter than `slices`. */
  offsets?: number[]
  /** How strongly strips drift with the pointer (px). 0 disables. */
  drift?: number
  treatment?: Treatment
  className?: string
  priority?: boolean
}

const defaultOffsets = [0, -6, 4, -10, 7, -3, 9, -5, 2]

/**
 * Slices one image into vertical strips and misaligns them — the "fragmented
 * photograph" treatment. Works identically for placeholders and real images.
 */
export function Fragments({
  art,
  slices = 7,
  offsets = defaultOffsets,
  drift = 18,
  treatment,
  className = '',
  priority,
}: Props) {
  const fine = useFinePointer()
  const mx = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (!fine || !drift) return
    const onMove = (e: PointerEvent) => mx.set(e.clientY / window.innerHeight - 0.5)
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, drift, mx])

  return (
    <div className={`frags ${className}`} role="img" aria-label={art.alt}>
      {Array.from({ length: slices }).map((_, i) => (
        <Strip
          key={i}
          i={i}
          n={slices}
          base={offsets[i % offsets.length]}
          sx={sx}
          drift={drift * (i % 2 ? 1 : -1) * (0.4 + (i % 3) * 0.3)}
          art={art}
          treatment={treatment}
          priority={priority}
        />
      ))}
    </div>
  )
}

function Strip({
  i,
  n,
  base,
  sx,
  drift,
  art,
  treatment,
  priority,
}: {
  i: number
  n: number
  base: number
  sx: MotionValue<number>
  drift: number
  art: Art
  treatment?: Treatment
  priority?: boolean
}) {
  const y = useTransform(sx, (v) => `calc(${base}% + ${v * drift}px)`)
  return (
    <motion.div className="frags__strip" style={{ y, ['--i' as string]: i, ['--n' as string]: n }} aria-hidden="true">
      <div className="frags__inner">
        <ArtSlot art={art} label={false} treatment={treatment} priority={priority} decorative />
      </div>
    </motion.div>
  )
}
