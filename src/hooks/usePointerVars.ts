import { useEffect } from 'react'

/**
 * Writes the pointer position to CSS variables --px / --py (0…1) on :root.
 * All foil and holographic surfaces read them, so the material shifts with
 * the "viewing angle" — which is literally what iridescence is.
 */
export function usePointerVars() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let frame = 0
    let x = 0.5
    let y = 0.5
    const root = document.documentElement
    const onMove = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth
      y = e.clientY / window.innerHeight
      if (!frame)
        frame = requestAnimationFrame(() => {
          root.style.setProperty('--px', x.toFixed(3))
          root.style.setProperty('--py', y.toFixed(3))
          frame = 0
        })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
}
