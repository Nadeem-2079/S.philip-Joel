import { useEffect, useState, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const initAnimations = () => {
    gsap.fromTo('#navbar-wrapper', { y: -100, opacity: 0 }, { y: -100, opacity: 0, duration: 0 })
    
    const tl = gsap.timeline()
    tl.fromTo('#hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.2 })
      .fromTo('#hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .fromTo('#hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('#hero-img-area', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power4.out' }, '-=1')

    document.querySelectorAll('.section-heading').forEach(h => {
      gsap.fromTo(h, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 85%' }
      })
    })

    document.querySelectorAll('.service-card').forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%' }
      })
    })

    gsap.fromTo('#contact-heading', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#contact-heading', start: 'top 85%' }
    })
  }

  return (
    <>
      <LoadingScreen onComplete={() => {
        setLoading(false)
        initAnimations()
      }} />
      
      <div id="app-content" className={loading ? 'opacity-0' : 'opacity-1 transition-opacity duration-500'}>
        <Navbar />
        <main>
          <Hero />
          
          <div className="bg-[#111110] border-t-[1.5px] border-white/10 py-4 overflow-hidden relative z-10">
            <div className="marquee-track">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="flex items-center gap-8 px-8 font-display font-bold text-[13px] text-[#f0ede8] uppercase tracking-widest">
                  <span>Web Design</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                  <span>Brand Strategy</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                  <span>Content Writing</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                  <span>Social Media</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                  <span>Personal Branding</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                </span>
              ))}
            </div>
          </div>

          <About />
          <Services />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <ScrollToTop lenis={lenisRef.current} />
      </div>
    </>
  )
}
