import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Website Design & Development', desc: 'Clean, fast, mobile-friendly websites built to convert. From portfolio sites to business landing pages.', color: 'var(--orange)', includes: ['UI/UX planning & wireframe', 'Content writing for all pages', 'SEO-ready structure', 'Domain & hosting guidance', 'Post-launch support'] },
  { num: '02', icon: '✦', title: 'Brand Strategy & Identity', desc: 'Your brand is more than a logo. I help you find your voice, define your positioning, and show up consistently.', color: 'var(--purple)', includes: ['Brand audit & competitor analysis', 'Tagline & messaging framework', 'Logo direction & visual identity guidance', 'Brand guidelines document'] },
  { num: '03', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: 'Content Strategy & Writing', desc: 'From Instagram captions to full website copy — content that sounds like you but better.', color: 'var(--teal)', includes: ['Website copywriting', 'Instagram content calendars', 'Reel & video script writing', 'LinkedIn content planning', 'Blog writing'] },
  { num: '04', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: 'Social Media Management', desc: 'Consistent, on-brand social presence that builds trust and attracts the right audience.', color: 'var(--yellow-dark)', includes: ['Platform strategy (Instagram / LinkedIn)', 'Content calendar creation', 'Caption writing & hashtag research', 'Performance tracking & monthly report'] },
  { num: '05', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title: 'Personal Branding', desc: 'For founders, professionals, and students who want to build a credible online presence.', color: 'var(--orange)', includes: ['LinkedIn profile overhaul', 'Personal brand strategy document', 'Content pillars & posting plan', 'Bio & headline writing'] },
]

function ServiceCard({ s, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: index * 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 88%' }
    })
  }, [index])
  return (
    <div ref={ref} className="service-card" style={{ opacity: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1.5px solid ${s.color}30` }}>{s.icon}</div>
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>{s.num}</span>
        </div>
        <button onClick={() => setOpen(!open)} style={{ width: 32, height: 32, borderRadius: '50%', background: open ? 'var(--ink)' : 'var(--cream)', border: '1.5px solid var(--parchment)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.25s', color: open ? 'var(--cream)' : 'var(--ink)' }}>
          {open ? '−' : '+'}
        </button>
      </div>
      <h3 style={{ fontFamily: 'Cabinet Grotesk,sans-serif', fontWeight: 800, fontSize: 20, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.title}</h3>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: open ? 20 : 0 }}>{s.desc}</p>
      {open && (
        <div style={{ borderTop: '1.5px solid var(--parchment)', paddingTop: 16 }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--ink-faint)', letterSpacing: '0.1em', marginBottom: 10 }}>WHAT'S INCLUDED</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.includes.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-soft)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />{item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(headRef.current, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 82%' }
    })
  }, [])

  return (
    <section id="services" style={{ background: 'var(--cream)', padding: '120px 0', borderTop: '1.5px solid var(--parchment)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.15em' }}>03 — SERVICES</span>
          <div style={{ flex: 1, height: '1.5px', background: 'var(--parchment)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <h2 ref={headRef} className="section-heading" style={{ opacity: 0 }}>
            What I<br />
            <span className="marker-yellow">do best.</span>
          </h2>
          <div style={{ maxWidth: 340 }}>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 16 }}>Starting from ₹5,000 — customised based on scope.</p>
            <a href="mailto:philipjoel1969@gmail.com" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none', fontSize: 13, padding: '10px 22px' }}>Get a Quote →</a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {services.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
