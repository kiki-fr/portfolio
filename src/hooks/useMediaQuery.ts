import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Desktop with a fine pointer — where cursor effects make sense. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
export const useDesktop = () => useMediaQuery('(min-width: 960px)')
export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)')
