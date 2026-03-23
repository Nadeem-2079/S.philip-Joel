import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const links = ['About', 'Services', 'Projects', 'Blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  
  const { scrollY } = useScroll()
  const logoRef = useRef(null)
  const navRef = useRef(null)

  // Strictly hide on scroll 0 and show only after 100px
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    
    if (latest < 100) {
      setVisible(false)
    } else {
      if (latest > previous) {
        // Scrolling down
        if (latest > 500) setVisible(false) 
        else setVisible(true) // Show during hero scroll
      } else {
        // Scrolling up
        setVisible(true)
      }
    }
    setScrolled(latest > 100)
  })

  // Ensure hidden on mount if at top
  useEffect(() => {
    if (window.scrollY < 100) setVisible(false)
  }, [])

  // Magnetic logo effect
  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = logo.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      gsap.to(logo, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(logo, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
    }

    logo.addEventListener('mousemove', handleMouseMove)
    logo.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      logo.removeEventListener('mousemove', handleMouseMove)
      logo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const go = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setOpen(false)
  }

  return (
    <>
      <motion.div 
        initial={false}
        animate={{ 
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 2000, 
          display: 'flex', 
          justifyContent: 'center', 
          pointerEvents: 'none',
          padding: '24px'
        }}
      >
        <nav 
          ref={navRef}
          className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`} 
          style={{ 
            borderRadius: 100, 
            padding: '12px 36px', 
            pointerEvents: 'auto',
            width: 'auto',
            maxWidth: '92vw',
            gap: 40 // Increased gap for a more open feel
          }}
        >
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div 
              ref={logoRef}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              style={{ 
                fontFamily: 'Cabinet Grotesk, sans-serif', 
                fontWeight: 900, 
                fontSize: 20, 
                cursor: 'pointer', 
                letterSpacing: '-0.04em', 
                color: 'var(--ink)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              S. Philip<span style={{ color: 'var(--orange)' }}>.</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="nav-desktop-links" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {links.map(l => (
              <button 
                key={l} 
                onClick={() => go(l)} 
                className="nav-link"
                onMouseEnter={() => setHovered(l)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 24px', fontSize: 13.5 }}
              >
                {hovered === l && (
                  <motion.div 
                    layoutId="nav-bg"
                    className="nav-link-active-bg"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                {l}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {/* Contact Pill - Constant and Unified */}
            <button 
              onClick={() => go('Contact')} 
              className="btn-primary" 
              style={{ 
                padding: '10px 24px', 
                fontSize: 14, 
                display: 'flex', // Always visible
                background: 'var(--ink)',
                color: 'var(--white)',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Let's Talk →
            </button>
            
            <button 
              onClick={() => setOpen(!open)} 
              className="nav-mobile-btn"
              style={{ 
                background: 'var(--ink)', 
                width: 44, 
                height: 44, 
                borderRadius: '50%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 5,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {[0, 1].map(i => (
                <motion.span 
                  key={i} 
                  animate={{ 
                    rotate: open ? (i === 0 ? 45 : -45) : 0,
                    y: open ? (i === 0 ? 4 : -4) : 0,
                    width: open ? 22 : (i === 0 ? 22 : 14)
                  }}
                  style={{
                    height: 2.2, 
                    background: 'var(--white)', 
                    display: 'block', 
                    borderRadius: 2
                  }} 
                />
              ))}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-overlay"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5, fontWeight: 600 }}>Navigation</span>
              {links.map((l, i) => (
                <motion.button 
                  key={l} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => go(l)} 
                  className="mobile-link"
                  style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer' }}
                >
                  {l}
                </motion.button>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                 <span style={{ fontSize: 12, opacity: 0.5 }}>Socials</span>
                 <div style={{ display: 'flex', gap: 12 }}>
                   {['In', 'Tw', 'Be'].map(s => <a key={s} href="#" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>{s}</a>)}
                 </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <p style={{ fontSize: 13, opacity: 0.6 }}>© 2026 Philip</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
