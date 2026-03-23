import { useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const DecoStar = ({ size = 32, color = '#111110', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill={color} />
  </svg>
)
const DecoSquiggle = ({ color = '#111110', style = {} }) => (
  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" style={style}>
    <path d="M4 15 Q14 4 24 15 Q34 26 44 15 Q54 4 64 15 Q74 26 84 15" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
)
const DecoDots = ({ color = 'rgba(17,17,16,0.25)', style = {} }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" style={style}>
    {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3, 4].map(col => (
      <circle key={`${row}-${col}`} cx={col * 12 + 6} cy={row * 12 + 6} r="2" fill={color} />
    )))}
  </svg>
)

export default function Hero() {
  const h1Ref = useRef(null)
  const subRef = useRef(null)
  const tagsRef = useRef(null)
  const btnsRef = useRef(null)
  const imgRef = useRef(null)
  const decoRef = useRef(null)

  useEffect(() => {
    // Initial Entrance
    const tl = gsap.timeline({ delay: 2.35 })
    tl.fromTo(h1Ref.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .fromTo(btnsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(imgRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out' }, '-=1')
      .fromTo(decoRef.current.children, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '-=0.8')
  }, [])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ height:'100vh', background:'var(--cream)', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
      
      {/* Background Decorative Element */}
      <div style={{ position:'absolute', top:'-10%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, var(--parchment) 0%, transparent 70%)', opacity:0.3, zIndex:1 }} />
      
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', position:'relative', zIndex:5 }}>
        
        {/* LEFT Content Area */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <h1 ref={h1Ref} className="hero-headline" style={{ marginBottom:20, opacity:0 }}>
            I Build <span className="marker-yellow">Brands</span>,<br/>
            Tell Stories &amp; Help<br/>
            <span style={{ color:'var(--orange)' }}>Businesses</span> Grow.
          </h1>

          <p ref={subRef} style={{ fontSize:16, color:'var(--ink-muted)', lineHeight:1.6, maxWidth:420, marginBottom:32, opacity:0 }}>
            Student entrepreneur from Chennai — turning ideas into brands, content into clients, and ambition into action.
          </p>

          <div ref={btnsRef} style={{ display:'flex', gap:16, opacity:0 }}>
            <button onClick={() => go('contact')} className="btn-primary" style={{ padding:'14px 32px' }}>Let's Work Together →</button>
            <button onClick={() => go('projects')} className="btn-outline" style={{ padding:'13px 32px' }}>See My Work ↓</button>
          </div>
        </div>

        {/* RIGHT Image Area - Positioned for center-right fit */}
        <div ref={imgRef} style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center', opacity:0, transform:'translateY(-15px)' }}>
          <div ref={decoRef} style={{ position:'absolute', inset:0 }}>
            <div className="float-anim" style={{ position:'absolute', top:'5%', left:'5%' }}><DecoStar size={28} color="var(--yellow-dark)" /></div>
            <div className="float-anim2" style={{ position:'absolute', top:'10%', right:'5%' }}><DecoStar size={18} color="var(--ink)" /></div>
            <div className="float-anim" style={{ position:'absolute', bottom:'15%', left:'0%' }}><DecoSquiggle color="var(--ink-faint)" /></div>
            <div className="float-anim2" style={{ position:'absolute', bottom:'8%', right:'12%' }}><DecoStar size={22} color="var(--orange)" /></div>
          </div>

          <div id="hero-image-v2" style={{ width:320, height:420, borderRadius:24, overflow:'hidden', background:'linear-gradient(145deg, var(--white), var(--warm))', border:'2px solid var(--ink)', boxShadow:'14px 14px 0 var(--ink)', position:'relative', zIndex:50 }}>
            <img src="/hero.png" alt="S. Philip Joel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ position:'absolute', bottom:30, left:-25, padding:'10px 18px', background:'var(--white)', border:'1.5px solid var(--ink)', borderRadius:12, boxShadow:'4px 4px 0 var(--ink)', zIndex:10 }}>
            <div style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:22, color:'var(--orange)', lineHeight:1 }}>10+</div>
            <div style={{ fontSize:10, color:'var(--ink-muted)', marginTop:2 }}>Happy Clients</div>
          </div>
          <div style={{ position:'absolute', top:30, right:-25, padding:'10px 18px', background:'var(--yellow)', border:'1.5px solid var(--ink)', borderRadius:12, boxShadow:'4px 4px 0 var(--ink)', zIndex:10 }}>
            <div style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:22, color:'var(--ink)', lineHeight:1 }}>2×</div>
            <div style={{ fontSize:10, color:'var(--ink-soft)', marginTop:2 }}>Shark Tank Win</div>
          </div>
        </div>
      </div>

    </section>
  )
}
