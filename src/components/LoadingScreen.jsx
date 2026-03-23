import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1800
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setPct(Math.round(eased * 100))
      if (t < 1) requestAnimationFrame(tick)
      else { setPct(100); setTimeout(() => setDone(true), 200) }
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <div className="loader-bg" style={{ opacity: done ? 0 : 1, transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: done ? 'none' : 'all', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, fontSize: '14px', color: 'rgba(240,237,232,0.8)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          Philip Joel S
        </div>
        <div style={{ marginTop: 24, width: 220, height: 1, background: 'rgba(255,255,255,0.05)', margin: '24px auto 0', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, transparent, #f5e642, transparent)', width: `${pct}%`, transition: 'width 0.1s linear' }} />
        </div>
        <div style={{ marginTop: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(240,237,232,0.3)', letterSpacing: '0.2em' }}>
          Loading Portfolio
        </div>
      </div>
    </div>
  )
}
