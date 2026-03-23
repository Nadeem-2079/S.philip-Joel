import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id:1, title:'SV Little Leapsters Therapy Center', type:'Instagram Content Strategy · Personal Brand Strategy', desc:'Built a full Instagram content calendar for a pediatric therapy clinic in Chennai. Conducted competitive analysis of therapy clinics and developed a personal brand strategy for the founder.', tags:['Content Strategy','Branding','Healthcare'], color:'var(--teal)', year:'2024', image: '/leapsters.png' },
  { id:2, title:'Lofty Learn (ECE Academy)', type:'Website Content · Branding', desc:'Content intake and information architecture for the website. Tagline development, brand messaging, logo direction and full website copy for an electronics engineering academy.', tags:['Web Content','Branding','Ed-Tech'], color:'var(--purple)', year:'2024', image: '/lofty.png' },
  { id:3, title:'Ausdauer Groups', type:'Full Agency Brand Build', desc:'Built the agency brand from scratch — name, identity, tone of voice. Developed Instagram and LinkedIn presence. Created internal systems: service agreements, MoUs, onboarding templates. Led content team producing Tanglish reels using AIDA framework.', tags:['Branding','Content','Startup Ops'], color:'var(--orange)', year:'2024', image: '/ausdauer.png' },
  { id:4, title:'Coming Soon', type:'New Project', desc:'Next case study dropping soon. Currently in progress — exciting work in branding and digital strategy.', tags:['TBA'], color:'var(--ink-faint)', year:'2025', placeholder:true, image: '/coming.png' },
]

// Duplicate projects for infinite loop
const doubleProjects = [...projects, ...projects]

function ProjectCard({ p }) {
  return (
    <div className="project-card" style={{ width: 380, flexShrink: 0, height: '100%', border: '1.5px solid var(--parchment)', borderRadius: 20, overflow: 'hidden', background: 'var(--white)' }}>
      {/* Thumb */}
      <div style={{ height:200, background: p.placeholder ? 'var(--warm)' : `linear-gradient(135deg, ${p.color}22, ${p.color}08)`, borderBottom:'1.5px solid var(--parchment)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow: 'hidden' }}>
         <img src={p.image} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
         <div style={{ position:'absolute', top:16, right:16, padding:'4px 12px', background:p.placeholder?'var(--parchment)':'var(--ink)', borderRadius:100, fontSize:11, color:p.placeholder?'var(--ink-muted)':'var(--cream)', fontFamily:'JetBrains Mono,monospace', zIndex: 2 }}>{p.year}</div>
      </div>
      {/* Body */}
      <div style={{ padding:28, background: 'var(--white)' }}>
        <div style={{ fontSize:11, color:p.color === 'var(--ink-faint)' ? 'var(--ink-faint)' : p.color, fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.08em', marginBottom:12, fontWeight:700 }}>{p.type}</div>
        <h3 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:800, fontSize:20, color:'var(--ink)', marginBottom:12, lineHeight:1.25, letterSpacing:'-0.01em' }}>{p.title}</h3>
        {!p.placeholder && <p style={{ fontSize:14, color:'var(--ink-muted)', lineHeight:1.7, marginBottom:20 }}>{p.desc}</p>}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {p.tags.map(t => (
            <span key={t} className="tag-pill" style={{ color:p.placeholder?'var(--ink-faint)':p.color, borderColor: p.placeholder?'var(--parchment)':p.color+'55', fontSize:11, padding: '4px 10px' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useRef(null)
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    gsap.fromTo(headRef.current, { y:50, opacity:0 }, { y:0, opacity:1, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:headRef.current, start:'top 82%' }})
    
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2)
    }
  }, [])

  useAnimationFrame((t, delta) => {
    if (isHovered) return
    
    let moveBy = -0.8 // Speed of the marquee
    let currentX = x.get()
    
    if (currentX <= -containerWidth) {
      x.set(0)
    } else {
      x.set(currentX + moveBy)
    }
  })

  return (
    <section id="projects" style={{ background:'var(--white)', padding:'140px 0', borderTop:'1.5px solid var(--parchment)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 48px', marginBottom: 64 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'var(--ink-faint)', letterSpacing:'0.15em' }}>04 — PROJECTS</span>
          <div style={{ flex:1, height:'1.5px', background:'var(--parchment)' }} />
        </div>
        <h2 ref={headRef} className="section-heading" style={{ opacity:0 }}>
          Work that<br/><span className="marker-yellow">speaks.</span>
        </h2>
      </div>

      <div 
        style={{ position: 'relative', width: '100vw', cursor: 'grab' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Masks */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, var(--white) 0%, transparent 15%, transparent 85%, var(--white) 100%)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div 
          ref={containerRef}
          style={{ x, display: 'flex', gap: 32, padding: '0 48px' }}
          drag="x"
          dragConstraints={{ left: -containerWidth * 1.5, right: 100 }}
          onDragStart={() => setIsHovered(true)}
          onDragEnd={() => {
            setIsHovered(false)
            // Loop adjustment if dragged too far
            if (x.get() > 0) x.set(-containerWidth)
            if (x.get() < -containerWidth) x.set(0)
          }}
        >
          {doubleProjects.map((p, i) => (
            <ProjectCard key={`${p.id}-${i}`} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
