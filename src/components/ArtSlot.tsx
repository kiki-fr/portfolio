import { useId } from 'react'
import type { Art } from '../data/art'
import './ArtSlot.css'

/** Optional print/screen treatments layered over any image. */
export type Treatment = 'none' | 'scan' | 'halftone' | 'foil' | 'duotone' | 'shatter'

/** Cracked-glass overlay: fracture lines radiating from an impact point + glitch bars. */
function Shatter() {
  const id = useId().replace(/:/g, '')
  const cx = 230
  const cy = 210
  const rays = [-170, -128, -95, -60, -22, 15, 48, 85, 118, 152]
  return (
    <span className="art__shatter" aria-hidden="true">
      <svg viewBox="0 0 400 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}e`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4b8e4" />
            <stop offset=".5" stopColor="#a9d7f5" />
            <stop offset="1" stopColor="#c9f2df" />
          </linearGradient>
        </defs>
        {rays.map((a, i) => {
          const r = (a * Math.PI) / 180
          const len = 380
          const mid = 0.35 + (i % 3) * 0.12
          const bend = i % 2 ? 14 : -14
          const x1 = cx + Math.cos(r) * len * mid + bend
          const y1 = cy + Math.sin(r) * len * mid
          const x2 = cx + Math.cos(r) * len
          const y2 = cy + Math.sin(r) * len
          return (
            <g key={i}>
              <polyline points={`${cx},${cy} ${x1},${y1} ${x2},${y2}`} fill="none" stroke="#fff" strokeWidth="1.4" opacity=".85" />
              <polyline points={`${cx + 1.5},${cy + 1} ${x1 + 1.5},${y1 + 1} ${x2 + 1.5},${y2 + 1}`} fill="none" stroke={`url(#${id}e)`} strokeWidth="1" opacity=".9" />
            </g>
          )
        })}
        {[40, 78, 120].map((rad, i) => (
          <circle key={rad} cx={cx} cy={cy} r={rad} fill="none" stroke="#fff" strokeWidth=".8" strokeDasharray={`${18 + i * 6} ${10 + i * 8}`} opacity=".7" />
        ))}
        <polygon points={`${cx},${cy} ${cx + 52},${cy - 30} ${cx + 70},${cy + 18}`} fill={`url(#${id}e)`} opacity=".35" />
        <polygon points={`${cx},${cy} ${cx - 40},${cy + 58} ${cx - 76},${cy + 12}`} fill="#fff" opacity=".18" />
      </svg>
      <span className="art__glitchbar art__glitchbar--1" />
      <span className="art__glitchbar art__glitchbar--2" />
      <span className="art__glitchbar art__glitchbar--3" />
    </span>
  )
}

interface Props {
  art: Art
  className?: string
  /** Show the small "image slot" caption on placeholders. */
  label?: boolean
  /** Load eagerly (use for above-the-fold images only). */
  priority?: boolean
  sizes?: string
  treatment?: Treatment
  /** Hide from assistive tech (when a parent already describes the image). */
  decorative?: boolean
}

/**
 * One component for every image on the site.
 * - With `art.src`: a lazy-loaded, responsive <img>.
 * - Without: an art-directed generative placeholder in `art.variant`.
 * Treatments apply to both, so real photography inherits the art direction.
 */
export function ArtSlot({
  art,
  className = '',
  label = true,
  priority = false,
  sizes,
  treatment = 'none',
  decorative = false,
}: Props) {
  const cls = `art art--${art.variant} art--t-${treatment} ${className}`
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : art.src
      ? {}
      : { role: 'img', 'aria-label': `${art.alt} (placeholder image)` }

  return (
    <figure className={`${cls} ${art.src ? 'art--image' : ''}`} {...a11y}>
      {art.src ? (
        <img
          src={art.src}
          alt={decorative ? '' : art.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      ) : (
        <Placeholder art={art} />
      )}
      {treatment === 'shatter' ? <Shatter /> : treatment !== 'none' && <span className="art__fx" aria-hidden="true" />}
      {!art.src && label && (
        <figcaption className="art__label" aria-hidden="true">
          <span className="art__dot" /> img slot — {art.variant}
        </figcaption>
      )}
    </figure>
  )
}

function Placeholder({ art }: { art: Art }) {
  const id = useId().replace(/:/g, '')

  switch (art.variant) {
    case 'chrome':
      return (
        <svg className="art__svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ecebe8" />
              <stop offset="1" stopColor="#c9c8c4" />
            </linearGradient>
            <linearGradient id={`${id}c1`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".18" stopColor="#8d929b" />
              <stop offset=".32" stopColor="#f7f8fa" />
              <stop offset=".46" stopColor="#3f434a" />
              <stop offset=".6" stopColor="#e9ebef" />
              <stop offset=".78" stopColor="#6c717a" />
              <stop offset="1" stopColor="#f2f3f5" />
            </linearGradient>
            <linearGradient id={`${id}c2`} x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4b8e4" stopOpacity=".85" />
              <stop offset=".45" stopColor="#b9a6ff" stopOpacity=".55" />
              <stop offset="1" stopColor="#a9d7f5" stopOpacity="0" />
            </linearGradient>
            <filter id={`${id}w`}>
              <feTurbulence type="fractalNoise" baseFrequency=".009 .016" numOctaves="2" seed="11" />
              <feDisplacementMap in="SourceGraphic" scale="70" />
            </filter>
            <filter id={`${id}b`}>
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <rect width="400" height="500" fill={`url(#${id}bg)`} />
          <g filter={`url(#${id}w)`}>
            <path d="M150 -20 C 260 40, 330 120, 300 230 S 190 330, 250 520 L 120 520 C 70 400, 160 330, 120 240 S 40 60, 150 -20Z" fill={`url(#${id}c1)`} />
            <path d="M180 80 C 240 110, 260 170, 230 220 S 160 280, 170 330 C 120 280, 130 220, 150 180 S 150 110, 180 80Z" fill={`url(#${id}c2)`} />
          </g>
          <path d="M175 60 C 190 120, 160 200, 210 260" stroke="#fff" strokeWidth="5" fill="none" opacity=".9" filter={`url(#${id}b)`} />
          <ellipse cx="240" cy="380" rx="18" ry="6" fill="#fff" opacity=".8" filter={`url(#${id}b)`} />
        </svg>
      )

    case 'shard':
      return (
        <div className="art__shards" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={`art__shard art__shard--${i + 1}`} />
          ))}
        </div>
      )

    case 'mono':
      return (
        <div className="art__mono" aria-hidden="true">
          <span className="art__glyph">{art.glyph ?? 'K'}</span>
        </div>
      )

    case 'eye':
      return (
        <div className="art__eye" aria-hidden="true">
          <span className="art__iris" />
        </div>
      )

    case 'tiles':
      return (
        <div className="art__tiles" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} style={{ ['--i' as string]: i }} />
          ))}
        </div>
      )

    case 'portrait':
      // An editorial crop, not a silhouette: chrome profile, a foil band across the eyes.
      return (
        <div className="art__portrait" aria-hidden="true">
          <svg className="art__svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`${id}p`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fbfbfc" />
                <stop offset=".3" stopColor="#9a9ea7" />
                <stop offset=".5" stopColor="#f0f1f4" />
                <stop offset=".75" stopColor="#5e636c" />
                <stop offset="1" stopColor="#d8dade" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="#1a1b1e" />
            <path
              d="M150 -10 C 270 0, 330 90, 320 190 C 316 236, 340 262, 356 300 C 362 316, 344 324, 330 326 C 336 350, 326 362, 316 368 C 322 392, 306 410, 276 410 C 250 410, 236 430, 240 520 L 60 520 C 80 430, 70 360, 60 300 C 40 190, 60 30, 150 -10Z"
              fill={`url(#${id}p)`}
            />
          </svg>
          <span className="art__portrait-band" />
        </div>
      )

    case 'ink':
      return <div className="art__ink" aria-hidden="true" />

    case 'holo':
    default:
      return <div className="art__holo" aria-hidden="true" />
  }
}
