import { MotionConfig } from 'framer-motion'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Rails } from './components/Rails'
import { usePointerVars } from './hooks/usePointerVars'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Direction } from './sections/Direction'
import { Hero } from './sections/Hero'
import { Intelligence } from './sections/Intelligence'
import { Intro } from './sections/Intro'
import { Lab } from './sections/Lab'
import { Method } from './sections/Method'
import { Offers } from './sections/Offers'
import { Pillars } from './sections/Pillars'
import { Studio } from './sections/Studio'
import { Work } from './sections/Work'

export default function App() {
  usePointerVars()

  return (
    // reducedMotion="user" makes every framer-motion animation honour the OS setting.
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Header />
      <Rails />
      <main id="main">
        <Hero />
        <Intro />
        <Pillars />
        <Intelligence />
        <Direction />
        <Studio />
        <Work />
        <Lab />
        <About />
        <Method />
        <Offers />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
