import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { de } from './de'
import { en, type Content } from './en'
import { es } from './es'
import { fr } from './fr'
import { nl } from './nl'

export type Lang = 'en' | 'es' | 'nl' | 'de' | 'fr'

/** Order shown in the language portal. `name` is always in its own language. */
export const languages: { code: Lang; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
]

const dictionaries: Record<Lang, Content> = { en, es, nl, de, fr }
const STORAGE_KEY = 'ki-lang'

const isLang = (v: unknown): v is Lang => typeof v === 'string' && v in dictionaries

function readInitial(): Lang | null {
  // ?lang=es in the URL wins (handy for sharing a specific language)
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (isLang(q)) return q
  } catch {
    /* ignore */
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    /* storage may be blocked — the portal simply shows again */
  }
  return null
}

/** Best guess from the browser, used only to highlight a suggestion in the portal. */
export function browserLang(): Lang {
  const nav = (navigator.languages?.[0] ?? navigator.language ?? 'en').slice(0, 2).toLowerCase()
  return isLang(nav) ? nav : 'en'
}

interface LangState {
  lang: Lang
  t: Content
  /** True until the visitor has chosen a language. */
  portalOpen: boolean
  choose: (l: Lang) => void
  openPortal: () => void
}

const LangContext = createContext<LangState | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const initial = readInitial()
  const [lang, setLang] = useState<Lang>(initial ?? browserLang())
  const [portalOpen, setPortalOpen] = useState(initial === null)
  const t = dictionaries[lang]

  const choose = useCallback((l: Lang) => {
    setLang(l)
    setPortalOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])
  const openPortal = useCallback(() => setPortalOpen(true), [])

  // Keep <html lang>, the title and the description in sync with the language.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo(() => ({ lang, t, portalOpen, choose, openPortal }), [lang, t, portalOpen, choose, openPortal])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

/** Shorthand for the current dictionary. */
export const useT = () => useLang().t
