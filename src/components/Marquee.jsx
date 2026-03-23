import { useRef } from 'react'

const DecoStar = ({ size = 24, color = 'var(--yellow)' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill={color} />
  </svg>
)

export default function Marquee() {
  return (
    <div style={{ background:'var(--ink)', borderTop:'1.5px solid rgba(255,255,255,0.1)', padding:'14px 0', overflow:'hidden', position:'relative', zIndex:10 }}>
      <div className="marquee-track">
        {[...Array(6)].map((_,i) => (
          <span key={i} style={{ display:'flex', alignItems:'center', gap:24, paddingRight:48, fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:700, fontSize:13, color:'var(--cream)', textTransform:'uppercase', letterSpacing:'0.05em' }}>
            <span>Web Design</span> <DecoStar size={10} />
            <span>Brand Strategy</span> <DecoStar size={10} />
            <span>Content Writing</span> <DecoStar size={10} />
            <span>Social Media</span> <DecoStar size={10} />
            <span>Personal Branding</span> <DecoStar size={10} />
          </span>
        ))}
      </div>
    </div>
  )
}
