import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ScrollToTop({ lenis }) {
  const sttRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      const stt = sttRef.current
      if (stt) {
        if (currentScroll > 400) {
          gsap.to(stt, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, pointerEvents: 'auto', ease: 'back.out(1.7)' })
        } else {
          gsap.to(stt, { autoAlpha: 0, y: 30, scale: 0.8, duration: 0.3, pointerEvents: 'none' })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button 
      id="scroll-to-top" 
      ref={sttRef}
      onClick={() => lenis?.scrollTo(0)} 
      className="fixed bottom-10 right-10 z-[3000] w-14 h-14 rounded-full bg-[#111110] text-[#f0ede8] border border-white/5 shadow-3xl flex items-center justify-center opacity-0 translate-y-8 scale-75 cursor-pointer"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  )
}
