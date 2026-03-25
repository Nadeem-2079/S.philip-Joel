import { useEffect, useRef, useState } from 'react'

const projects = [
  { title:'SV Little Leapsters Therapy Center', type:'Instagram Content Strategy · Personal Brand Strategy', desc:'Built a full Instagram content calendar for a pediatric therapy clinic in Chennai.', tags:['Content Strategy','Branding','Healthcare'], color:'#0f9b8e', year:'2024', image: '/leapsters.png' },
  { title:'Lofty Learn (ECE Academy)', type:'Website Content · Branding', desc:'Content intake and architecture. Tagline, brand messaging, and full website copy.', tags:['Web Content','Branding','Ed-Tech'], color:'#6b4de6', year:'2024', image: '/lofty.png' },
  { title:'Ausdauer Groups', type:'Full Agency Brand Build', desc:'Built the agency brand from scratch — name, identity, tone of voice, systems.', tags:['Branding','Content','Startup Ops'], color:'#ff5a1f', year:'2024', image: '/ausdauer.png' },
  { title:'Coming Soon', type:'New Project', desc:'Next case study dropping soon. Currently in progress — exciting work in branding.', tags:['TBA'], color:'#9a9590', year:'2025', image: '/coming.png' },
];

export default function Projects() {
  const trackRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const xP = useRef(0)

  useEffect(() => {
    let animationFrameId
    const marqueeLoop = () => {
      const t = trackRef.current
      if (t && !isHovered) {
        xP.current -= 0.8
        const limit = t.scrollWidth / 2
        if (limit > 0 && Math.abs(xP.current) >= limit) {
          xP.current = 0
        }
        t.style.transform = `translateX(${xP.current}px)`
      }
      animationFrameId = requestAnimationFrame(marqueeLoop)
    }
    animationFrameId = requestAnimationFrame(marqueeLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered])

  return (
    <section id="projects" className="bg-white py-24 md:py-[140px] border-t-[1.5px] border-[#dbd6ce] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] text-[#9a9590] tracking-[0.15em]">04 — PROJECTS</span>
          <div className="flex-1 h-[1.5px] bg-[#dbd6ce]"></div>
        </div>
        <h2 id="projects-heading" className="section-heading opacity-0">Work that<br/><span className="marker-yellow">speaks.</span></h2>
      </div>
      <div 
        id="projects-marquee-container" 
        className="relative w-screen cursor-grab overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>
        <div id="projects-track" ref={trackRef} className="flex gap-8 px-12 w-max items-stretch">
          {[...projects, ...projects].map((p, i) => (
            <div key={i} className="project-card">
              <div className="h-[200px] relative overflow-hidden flex items-center justify-center" style={{ background: `${p.color}15` }}>
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#111110] rounded-full text-[11px] text-[#f0ede8] font-mono">{p.year}</div>
              </div>
              <div className="p-7 bg-white">
                <div className="text-[11px] font-mono tracking-widest mb-3 font-bold" style={{ color: p.color }}>{p.type}</div>
                <h3 className="font-display font-black text-xl text-[#111110] mb-3 leading-tight tracking-tight">{p.title}</h3>
                <p className="text-sm text-[#5a5753] leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="tag-pill" style={{ color: p.color, borderColor: `${p.color}44`, fontSize: '10px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
