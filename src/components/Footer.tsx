import { ArrowUp } from 'lucide-react'
import { nav, site } from '../data/site'
import './Footer.css'

export function Footer() {
  const socials = site.socials.filter((s) => s.href)
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="mono footer__k">Index</p>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mono footer__k">Practice</p>
          <ul>
            <li>Brand intelligence</li>
            <li>Creative direction</li>
            <li>AI-assisted creation</li>
          </ul>
        </div>
        <div>
          <p className="mono footer__k">Elsewhere</p>
          <ul>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            {!site.email && socials.length === 0 && <li className="footer__muted">Links coming soon</li>}
          </ul>
        </div>
        <div className="footer__top">
          <a href="#index" className="btn btn--line">
            Back to index <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="footer__word" aria-hidden="true">
        <span>Karen</span> <span className="serif">Iredy</span>
      </p>

      <div className="wrap footer__legal mono">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.positioning}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  )
}
