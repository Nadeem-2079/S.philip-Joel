import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'

import Marquee from './components/Marquee'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loaded])

  return (
    <>
      {!loaded && <LoadingScreen />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Marquee />
          <Services />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <ScrollToTop />
      </div>
    </>
  )
}
export default App
