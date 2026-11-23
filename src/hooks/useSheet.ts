import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { RefObject } from 'react'

/**
 * Section transition: a section arrives like a sheet being laid on the table —
 * inset and notched at first, opening to full bleed as it reaches the top.
 * Returns a clip-path MotionValue (or undefined for reduced motion).
 */
export function useSheet(ref: RefObject<HTMLElement>): MotionValue<string> | undefined {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0])
  const notch = useTransform(scrollYProgress, [0, 1], [90, 0])
  const clip = useTransform([inset, notch], ([i, n]: number[]) =>
    `polygon(${i}vw 0, calc(100% - ${i}vw - ${n}px) 0, calc(100% - ${i}vw) ${n}px, calc(100% - ${i}vw) 100%, ${i}vw 100%)`,
  )
  return reduced ? undefined : clip
}
