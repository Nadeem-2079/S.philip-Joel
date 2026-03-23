import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const stats = [
  { n: 10, suf: '+', label: 'Clients Served', color: 'var(--orange)' },
  { n: 20, suf: '', label: 'Member Team', color: 'var(--teal)' },
  { n: 1.5, suf: '+', label: 'Years Running Agency', color: 'var(--purple)' },
  { n: 2, suf: '×', label: 'Shark Tank Wins', color: 'var(--yellow-dark)' },
]

function StatCard({ n, suf, label, color }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current, start: 'top 88%', onEnter: () => {
        if (done.current) return; done.current = true
        const start = performance.now(), dur = 1600
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1)
          const e = 1 - Math.pow(1 - t, 3)
          setVal(parseFloat((e * n).toFixed(1)))
          if (t < 1) requestAnimationFrame(tick)
          else setVal(n)
        }
        requestAnimationFrame(tick)
      }
    })
    return () => st.kill()
  }, [n])
  return (
    <div ref={ref} className="stat-card">
      <div style={{ fontFamily: 'Cabinet Grotesk,sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3rem)', lineHeight: 1, color, marginBottom: 6 }}>
        {n % 1 !== 0 ? val.toFixed(1) : Math.round(val)}{suf}
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-muted)', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function About() {
  const secRef = useRef(null)
  const headRef = useRef(null)
  const psRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 82%' }
    })
    gsap.fromTo(psRef.current?.querySelectorAll('p') ?? [], { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: psRef.current, start: 'top 80%' }
    })
  }, [])

  return (
    <section id="about" ref={secRef} style={{ background: 'var(--white)', padding: '120px 0', borderTop: '1.5px solid var(--parchment)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.15em' }}>02 — ABOUT ME</span>
          <div style={{ flex: 1, height: '1.5px', background: 'var(--parchment)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left: text */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <h2 ref={headRef} className="section-heading" style={{ marginBottom: 36, opacity: 0 }}>
              Hey, I'm<br />
              <span className="marker-yellow">Philip.</span>
            </h2>
            <div ref={psRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                "I didn't start with a perfect plan. I started with a belief that students could build real businesses — not just participate in case studies. In March 2024, I helped establish Ausdauer Groups, a digital agency run entirely by students, out of Chennai. Within months, we had real clients, real revenue, and a real team of 20.",
                "I wear multiple hats — Director, PR lead, content team leader, and sometimes the guy writing website copy at midnight. I've worked on brand strategy, cold outreach systems, website builds, Instagram content calendars, script writing for reels, and the legal backbone of a bootstrapped startup. All while sitting in engineering lectures.",
                "I believe branding is clarity, content creates long-term trust, and consistency beats motivation every single time. I'm not here to look impressive. I'm here to grow, build in public, and help brands show up the way they deserve to.",
                "When I'm not running the agency, I'm pitching at startup competitions (won a couple), networking at BNI, or figuring out how AI tools can make our work 10x faster. Big fan of learning by doing — always have been.",
              ].map((p, i) => <p key={i} style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, opacity: 0 }}>{p}</p>)}
            </div>

            <div style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'var(--cream)', border: '1.5px solid var(--parchment)', borderRadius: 100 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 500 }}>B.E. Engineering Student</span>
              <span style={{ width: '1px', height: 14, background: 'var(--parchment)' }} />
              <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Graduating 2027</span>
            </div>
          </div>

          {/* Right: image, stats and quote */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* New About Image - Professional Mockup */}
            <div style={{ width: '85%', aspectRatio: '1.3/1', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a09', position: 'relative', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.4), 0 18px 36px -18px rgba(0,0,0,0.5)', margin: '0 auto 16px' }}>
              <img src="/about.jpeg" alt="About Philip" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {stats.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Big quote card */}
            <div style={{ padding: 28, background: 'var(--ink)', borderRadius: 20 }}>
              <p style={{ fontFamily: 'Cabinet Grotesk,sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--cream)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                "Consistency beats motivation every single time."
              </p>
              <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(240,237,232,0.45)', fontFamily: 'JetBrains Mono,monospace' }}>— Philip Joel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
