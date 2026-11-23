import { MotionConfig } from 'framer-motion'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Portal } from './components/Portal'
import { Rails } from './components/Rails'
import { usePointerVars } from './hooks/usePointerVars'
import { LangProvider } from './i18n'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Direction } from './sections/Direction'
import { Hero } from './sections/Hero'
import { Intelligence } from './sections/Intelligence'
import { Intro } from './sections/Intro'
import { Journal } from './sections/Journal'
import { Lab } from './sections/Lab'
import { Method } from './sections/Method'
import { Offers } from './sections/Offers'
import { Pillars } from './sections/Pillars'
import { Studio } from './sections/Studio'
import { Work } from './sections/Work'

/**
 * Architecture: ENTRY (language portal) → LOBBY (cover) → CORE (the studio)
 * → EVIDENCE (work) → EXPLORATION (lab) → INTELLECT (journal) → PERSON (about) → CONVERSION (contact)
 */
export default function App() {
  usePointerVars()

  return (
    <LangProvider>
      {/* reducedMotion="user" makes every framer-motion animation honour the OS setting. */}
      <MotionConfig reducedMotion="user">
        <Portal />
        <Cursor />
        <Header />
        <Rails />
        <main id="main">
          {/* LOBBY */}
          <Hero />
          <Intro />
          {/* CORE — the studio */}
          <Pillars />
          <Intelligence />
          <Direction />
          <Studio />
          <Offers />
          <Method />
          {/* EVIDENCE */}
          <Work />
          {/* EXPLORATION */}
          <Lab />
          {/* INTELLECT */}
          <Journal />
          {/* PERSON */}
          <About />
          {/* CONVERSION */}
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LangProvider>
  )
}
