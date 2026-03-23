import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  { label:'Email', value:'philipjoel1969@gmail.com', href:'mailto:philipjoel1969@gmail.com', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label:'WhatsApp', value:'+91 75980 22972', href:'https://wa.me/917598022972', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg> },
  { label:'LinkedIn', value:'s-philipjoel-73b0a5290', href:'https://linkedin.com/in/s-philipjoel-73b0a5290', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label:'Location', value:'Chennai, India', href:'#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
]

export default function Contact() {
  const headRef = useRef(null)
  const detailsRef = useRef(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { y:50, opacity:0 }, { y:0, opacity:1, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:headRef.current, start:'top 82%' }})
    gsap.fromTo(detailsRef.current.children, { y:30, opacity:0 }, { y:0, opacity:1, duration:0.8, stagger:0.1, ease:'power3.out',
      scrollTrigger: { trigger:detailsRef.current, start:'top 85%' }})
  }, [])

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="contact" style={{ background:'var(--ink)', padding:'140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Blur */}
      <div style={{ position:'absolute', bottom:'-10%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, var(--orange) 0%, transparent 70%)', opacity:0.1, filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:64 }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'rgba(240,237,232,0.3)', letterSpacing:'0.15em' }}>06 — CONTACT</span>
          <div style={{ flex:1, height:'1.5px', background:'rgba(255,255,255,0.06)' }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:100, alignItems:'center' }}>
          {/* Left: Heading & Intro */}
          <div>
            <h2 ref={headRef} style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:'clamp(3rem, 7vw, 5.5rem)', lineHeight:0.9, letterSpacing:'-0.04em', color:'var(--cream)', marginBottom:32, opacity:0 }}>
              Let's build<br/>something<br/><span style={{ color:'var(--orange)' }}>remarkable.</span>
            </h2>
            <p style={{ fontSize:18, color:'rgba(240,237,232,0.5)', lineHeight:1.6, maxWidth:480, marginBottom:0 }}>
              I'm always open to new opportunities, collaborations, or just a friendly chat about branding and strategy.
            </p>
          </div>

          {/* Right: Detailed Contact List */}
          <div ref={detailsRef} style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {contactLinks.map(c => (
              <div key={c.label} style={{ position: 'relative', opacity: 0 }}>
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  className="contact-card-enhanced"
                  style={{ 
                    display:'flex', 
                    alignItems:'center', 
                    gap:18, 
                    padding:'24px 28px', 
                    background:'rgba(255,255,255,0.03)', 
                    border:'1.5px solid rgba(255,255,255,0.06)', 
                    borderRadius:20, 
                    textDecoration:'none', 
                    transition:'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.background='rgba(255,255,255,0.06)'; 
                    e.currentTarget.style.borderColor='var(--orange)';
                    e.currentTarget.style.transform='translateX(8px)';
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.background='rgba(255,255,255,0.03)'; 
                    e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform='translateX(0)';
                  }}>
                  
                  <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--orange)' }}>
                    {c.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize:11, color:'rgba(240,237,232,0.3)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.1em', textTransform: 'uppercase', marginBottom:4 }}>{c.label}</div>
                    <div style={{ fontSize:17, color:'var(--cream)', fontWeight:600, letterSpacing: '-0.01em' }}>{c.value}</div>
                  </div>

                  {/* Copy Button */}
                  {(c.label === 'Email' || c.label === 'WhatsApp') && (
                    <button 
                      onClick={(e) => { e.preventDefault(); copyToClipboard(c.value, c.label); }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: copied === c.label ? 'var(--orange)' : 'rgba(255,255,255,0.2)', 
                        cursor: 'pointer',
                        padding: 8,
                        transition: 'all 0.3s ease'
                      }}
                      title="Copy to clipboard"
                    >
                      {copied === c.label ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                      )}
                    </button>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Footer Area */}
        <div style={{ marginTop: 140, paddingTop: 48, borderTop: '1.5px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.3)', fontFamily: 'JetBrains Mono,monospace' }}>
            © 2026 S. Philip Joel
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/s-philipjoel-73b0a5290' }
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" 
                style={{ fontSize: 13, color: 'var(--cream)', textDecoration: 'none', opacity: 0.5, transition: 'all 0.3s ease', letterSpacing: '0.05em' }} 
                onMouseEnter={e => { e.currentTarget.style.opacity=1; e.currentTarget.style.color='var(--orange)'; }} 
                onMouseLeave={e => { e.currentTarget.style.opacity=0.5; e.currentTarget.style.color='var(--cream)'; }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
