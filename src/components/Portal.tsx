import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { browserLang, languages, useLang } from '../i18n'
import './Portal.css'

/** "Choose your language" in every language, cycling. */
const prompts = [
  { lang: 'en', text: 'Choose your language' },
  { lang: 'es', text: 'Elige tu idioma' },
  { lang: 'nl', text: 'Kies je taal' },
  { lang: 'de', text: 'Wähle deine Sprache' },
  { lang: 'fr', text: 'Choisissez votre langue' },
]

/**
 * ENTRY — the language portal. A short, elegant threshold before the site:
 * black page, one cycling question, five editorial doors.
 */
export function Portal() {
  const { portalOpen, choose, lang } = useLang()
  const [i, setI] = useState(0)
  const first = useRef<HTMLButtonElement>(null)
  const suggested = browserLang()

  useEffect(() => {
    if (!portalOpen) return
    document.body.style.overflow = 'hidden'
    first.current?.focus({ preventScroll: true })
    const id = window.setInterval(() => setI((n) => (n + 1) % prompts.length), 1800)
    return () => {
      window.clearInterval(id)
      document.body.style.overflow = ''
    }
  }, [portalOpen])

  return (
    <AnimatePresence>
      {portalOpen && (
        <motion.div
          className="portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portal-q"
          initial={{ clipPath: 'inset(0 0 0 0)', opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="portal__top mono">
            <span>Karen Iredy</span>
            <span>Nº 001 — Vol. 01</span>
          </div>

          <div className="portal__mark" aria-hidden="true">
            <span>K</span>
            <span className="serif">I</span>
          </div>

          <div className="portal__q-wrap">
            <p className="portal__q-label mono">Language / Idioma / Taal / Sprache / Langue</p>
            <h1 id="portal-q" className="portal__q serif">
              <span className="sr-only">Choose your language</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={i}
                  aria-hidden="true"
                  lang={prompts[i].lang}
                  initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {prompts[i].text}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          <ul className="portal__list">
            {languages.map((l, n) => (
              <motion.li
                key={l.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + n * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  ref={n === 0 ? first : undefined}
                  className={`portal__btn ${l.code === lang ? 'is-current' : ''}`}
                  lang={l.code}
                  onClick={() => choose(l.code)}
                >
                  <span className="portal__num mono">{String(n + 1).padStart(2, '0')}</span>
                  <span className="portal__name">{l.name}</span>
                  <span className="portal__code mono">
                    {l.code.toUpperCase()}
                    {l.code === suggested && <i> ●</i>}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          <p className="portal__foot mono">Creative Direction for Brands — Europe / International</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
