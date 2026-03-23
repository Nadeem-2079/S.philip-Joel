export default function Footer() {
  const socials = [
    { label:'LinkedIn', href:'https://linkedin.com/in/s-philipjoel-73b0a5290', icon:'in' },
    { label:'Instagram', href:'#', icon:'ig' },
    { label:'Ausdauer', href:'https://ausdauergroups.in', icon:'au' },
  ]
  return (
    <footer style={{ background:'var(--ink)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'48px 0 32px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:32, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:28, color:'var(--cream)', letterSpacing:'-0.02em', marginBottom:8 }}>
              Philip<span style={{ color:'var(--orange)' }}>.</span>
            </div>
            <p style={{ fontSize:13, color:'rgba(240,237,232,0.4)', fontWeight:400, maxWidth:280, lineHeight:1.6 }}>Built with purpose.<br/>Growing in public.</p>
          </div>

          <div style={{ display:'flex', gap:48, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontSize:10, color:'rgba(240,237,232,0.3)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.15em', marginBottom:16 }}>NAVIGATE</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {['About','Services','Projects','Blog','Contact'].map(l => (
                  <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:'smooth'})}
                    style={{ background:'none', border:'none', fontSize:14, color:'rgba(240,237,232,0.55)', cursor:'pointer', textAlign:'left', fontFamily:'DM Sans,sans-serif', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--cream)'}
                    onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.55)'}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'rgba(240,237,232,0.3)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.15em', marginBottom:16 }}>CONNECT</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:14, color:'rgba(240,237,232,0.55)', textDecoration:'none', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--yellow)'}
                    onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.55)'}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize:10, color:'rgba(240,237,232,0.3)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.15em', marginBottom:16 }}>GET IN TOUCH</div>
            <a href="mailto:philipjoel1969@gmail.com" style={{ display:'block', fontSize:14, color:'rgba(240,237,232,0.55)', textDecoration:'none', marginBottom:8, transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='var(--cream)'}
              onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.55)'}>
              philipjoel1969@gmail.com
            </a>
            <a href="https://wa.me/917598022972" style={{ display:'block', fontSize:14, color:'rgba(240,237,232,0.55)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='var(--cream)'}
              onMouseLeave={e => e.target.style.color='rgba(240,237,232,0.55)'}>
              +91 75980 22972
            </a>
            <div style={{ marginTop:8, fontSize:12, color:'rgba(240,237,232,0.3)' }}>Chennai, Tamil Nadu</div>
          </div>
        </div>

        <div style={{ height:'1px', background:'rgba(255,255,255,0.06)', marginBottom:24 }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:12, color:'rgba(240,237,232,0.3)', fontFamily:'JetBrains Mono,monospace' }}>© 2025 S. Philip Joel. All rights reserved.</span>
          <span style={{ fontSize:12, color:'rgba(240,237,232,0.2)', fontFamily:'JetBrains Mono,monospace' }}>Student · Entrepreneur · Builder</span>
        </div>
      </div>
    </footer>
  )
}
