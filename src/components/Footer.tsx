import { ArrowUp } from 'lucide-react'
import { nav, site } from '../data/site'
import { useT } from '../i18n'
import './Footer.css'

export function Footer() {
  const t = useT()
  const socials = site.socials.filter((s) => s.href)
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="mono footer__k">{t.footer.index}</p>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{t.nav[n.key]}</a>
              </li>
            ))}
            <li>
              <a href="#contact">{t.nav.contact}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mono footer__k">{t.footer.practice}</p>
          <ul>
            {t.footer.practiceItems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono footer__k">{t.footer.elsewhere}</p>
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
            {!site.email && socials.length === 0 && <li className="footer__muted">{t.footer.soon}</li>}
          </ul>
        </div>
        <div className="footer__top">
          <a href="#index" className="btn btn--line">
            {t.footer.back} <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="footer__word" aria-hidden="true">
        <span>Karen</span> <span className="serif">Iredy</span>
      </p>

      <div className="wrap footer__legal mono">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{t.common.positioning}</span>
        <span>{t.common.location}</span>
      </div>
    </footer>
  )
}
