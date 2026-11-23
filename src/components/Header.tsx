import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nav, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { sectionIds, sectionToNav } from '../data/sections'
import './Header.css'

/**
 * Editorial masthead: no container, no pill. The whole bar uses
 * `mix-blend-mode: difference`, so it reads on ivory, black and imagery alike.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const active = sectionToNav[useActiveSection(sectionIds)]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="menu"
            aria-label="Mobile"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul>
              {[...nav, { id: 'contact', label: 'Contact' }].map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingLeft: `${(i % 4) * 6}vw` }}
                >
                  <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                    <span className="mono">{String(i).padStart(2, '0')}</span>
                    <span className={i % 2 ? 'serif' : ''}>{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="menu__foot">
              <span className="tag">
                <b>{site.wordmark}</b>
                {site.positioning}
              </span>
              <p className="mono">{site.location}</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <header className={`header ${open ? 'is-open' : ''}`}>
        <a href="#index" className="header__mark" aria-label={`${site.name} — back to top`} onClick={() => setOpen(false)}>
          <span className="header__mark-name">Karen</span>
          <span className="header__mark-name serif">Iredy</span>
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <sup>{String(i).padStart(2, '0')}</sup>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className={`header__contact ${active === 'contact' ? 'is-active' : ''}`}>
          Contact <span aria-hidden="true">↗</span>
        </a>

        <button
          className="header__burger mono"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden="true" className="header__burger-icon" />
        </button>
      </header>
    </>
  )
}
