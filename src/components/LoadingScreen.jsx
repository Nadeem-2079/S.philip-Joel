import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const loadStart = performance.now()
    const loadDur = 1800

    const tick = (now) => {
      const t = Math.min((now - loadStart) / loadDur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const currentPct = Math.round(eased * 100)
      setPct(currentPct)

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setPct(100)
        setTimeout(() => {
          gsap.to('#loading-screen', {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
              document.getElementById('loading-screen').style.pointerEvents = 'none'
              onComplete()
            }
          })
        }, 400)
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <div id="loading-screen" class="loader-bg">
      <div class="text-center">
        <div class="font-display font-black text-[14px] text-[rgba(240,237,232,0.8)] tracking-[0.4em] uppercase">
          Philip Joel S
        </div>
        <div class="mt-6 w-[220px] h-[1px] bg-white/5 mx-auto rounded overflow-hidden">
          <div 
            id="loader-progress" 
            class="h-full bg-gradient-to-r from-transparent via-[#f5e642] to-transparent transition-all duration-100"
            style={{ width: `${pct}%` }}
          ></div>
        </div>
        <div class="mt-4 font-mono text-[10px] text-[rgba(240,237,232,0.3)] tracking-[0.2em]">
          Loading Portfolio
        </div>
      </div>
    </div>
  )
}
