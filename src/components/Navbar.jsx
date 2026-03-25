import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navbarWrapperRef = useRef(null)
  const navInnerRef = useRef(null)
  const logoRef = useRef(null)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      const navbar = navbarWrapperRef.current
      const navInner = navInnerRef.current

      if (currentScroll < 100) {
        gsap.to(navbar, { y: -100, opacity: 0, duration: 0.4 })
        if (navInner) navInner.classList.remove('nav-scrolled')
      } else {
        if (navInner) navInner.classList.add('nav-scrolled')
        if (currentScroll > lastScroll.current && currentScroll > 500) {
          gsap.to(navbar, { y: -100, opacity: 0, duration: 0.4 })
        } else {
          gsap.to(navbar, { y: 0, opacity: 1, duration: 0.4 })
        }
      }
      lastScroll.current = currentScroll
    }

    const handleLogoMagnetic = (e) => {
      const logo = logoRef.current
      if (!logo) return
      const { clientX, clientY } = e
      const { left, top, width, height } = logo.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      gsap.to(logo, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" })
    }

    const handleLogoReset = () => {
      gsap.to(logoRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" })
    }

    window.addEventListener('scroll', handleScroll)
    const logo = logoRef.current
    if (logo) {
      logo.addEventListener('mousemove', handleLogoMagnetic)
      logo.addEventListener('mouseleave', handleLogoReset)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (logo) {
        logo.removeEventListener('mousemove', handleLogoMagnetic)
        logo.removeEventListener('mouseleave', handleLogoReset)
      }
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = window.innerWidth < 768 ? 100 : 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <div id="navbar-wrapper" ref={navbarWrapperRef} className="fixed top-0 left-0 right-0 z-[2000] flex justify-center pointer-events-none p-6 opacity-0 -translate-y-[100px]">
        <nav id="navbar" ref={navInnerRef} className="nav-container rounded-full px-9 py-3 pointer-events-auto flex items-center md:gap-10 gap-4 max-w-[92vw]">
          <div className="flex items-center gap-3">
            <div 
              id="logo" 
              ref={logoRef}
              className="font-display font-black text-xl cursor-pointer tracking-tighter text-[#111110] relative flex items-center" 
              onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
            >
              S. Philip<span className="text-[#ff5a1f]">.</span>
            </div>
          </div>

          <div className="nav-desktop-links flex gap-3 items-center">
            <button className="nav-link group" onClick={() => scrollToSection('about')}><div className="nav-link-active-bg group-hover:opacity-100"></div>About</button>
            <button className="nav-link group" onClick={() => scrollToSection('services')}><div className="nav-link-active-bg group-hover:opacity-100"></div>Services</button>
            <button className="nav-link group" onClick={() => scrollToSection('projects')}><div className="nav-link-active-bg group-hover:opacity-100"></div>Projects</button>
            <button className="nav-link group" onClick={() => scrollToSection('blog')}><div className="nav-link-active-bg group-hover:opacity-100"></div>Blog</button>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={() => scrollToSection('contact')} className="btn-primary text-sm px-6 py-2.5">Let's Talk →</button>
            <button 
              id="mobile-toggle" 
              className="nav-mobile-btn bg-[#111110] w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 border-none cursor-pointer md:hidden"
              onClick={toggleMenu}
            >
              <span className={`h-[2.2px] bg-white w-[22px] rounded-sm transition-all ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></span>
              <span className={`h-[2.2px] bg-white rounded-sm transition-all ${menuOpen ? '-rotate-45 -translate-y-[4px] w-[22px]' : 'w-[14px]'}`}></span>
            </button>
          </div>
        </nav>
      </div>

      <div id="mobile-menu" className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-4">
          <span className="text-[12px] uppercase tracking-[0.2em] opacity-50 font-semibold">Navigation</span>
          <button className="mobile-link" onClick={() => scrollToSection('about')}>About</button>
          <button className="mobile-link" onClick={() => scrollToSection('services')}>Services</button>
          <button className="mobile-link" onClick={() => scrollToSection('projects')}>Projects</button>
          <button className="mobile-link" onClick={() => scrollToSection('blog')}>Blog</button>
        </div>
        <div className="mt-auto flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <span className="text-xs opacity-50">Socials</span>
            <div className="flex gap-3">
              <a href="#" className="text-[#111110] font-semibold text-sm">In</a>
              <a href="#" className="text-[#111110] font-semibold text-sm">Tw</a>
              <a href="#" className="text-[#111110] font-semibold text-sm">Be</a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60">© 2026 Philip</p>
          </div>
        </div>
      </div>
    </>
  )
}
