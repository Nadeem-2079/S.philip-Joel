import { useState } from 'react'

const services = [
  { num: '01', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Website Design & Development', desc: 'Clean, fast, mobile-friendly websites built to convert. From portfolio sites to business landing pages.', color: '#ff5a1f', includes: ['UI/UX planning & wireframe', 'Content writing for all pages', 'SEO-ready structure'] },
  { num: '02', icon: '✦', title: 'Brand Strategy & Identity', desc: 'Your brand is more than a logo. I help you find your voice, define your positioning, and show up consistently.', color: '#6b4de6', includes: ['Brand audit & messaging', 'Logo direction & visual identity'] },
  { num: '03', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: 'Content Strategy & Writing', desc: 'From Instagram captions to full website copy — content that sounds like you but better.', color: '#0f9b8e', includes: ['Website copywriting', 'Social media planning'] },
  { num: '04', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: 'Social Media Management', desc: 'Consistent, on-brand social presence that builds trust and attracts the right audience.', color: '#e8d800', includes: ['Content calendar creation', 'Hashtag research'] },
  { num: '05', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title: 'Personal Branding', desc: 'For founders, professionals, and students who want to build a credible online presence.', color: '#ff5a1f', includes: ['LinkedIn overhaul', 'Content pillars'] },
];

function ServiceCard({ s }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="service-card opacity-0">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: `${s.color}15`, border: `1.5px solid ${s.color}30`, color: s.color }}>
            {s.icon}
          </div>
          <span className="font-mono text-[11px] text-[#9a9590] tracking-wider">{s.num}</span>
        </div>
        <button 
          className="service-toggle w-8 h-8 rounded-full border-[1.5px] border-[#dbd6ce] bg-[#f0ede8] flex items-center justify-center text-lg transition-all"
          onClick={() => setIsOpen(!isOpen)}
          style={isOpen ? { background: '#111110', color: '#f0ede8' } : {}}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>
      <h3 className="font-display font-black text-xl mb-3 tracking-tight leading-tight">{s.title}</h3>
      <p className="text-sm text-[#5a5753] leading-relaxed desc">{s.desc}</p>
      
      <div className={`service-detail pt-5 border-t border-[#dbd6ce] mt-5 ${isOpen ? '' : 'hidden'}`}>
        <div className="text-[11px] font-mono text-[#9a9590] tracking-wider mb-3 uppercase">What's Included</div>
        <ul className="list-none flex flex-col gap-3">
          {s.includes.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[13px] text-[#2a2926]">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }}></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-[#f0ede8] py-24 md:py-[120px] border-t-[1.5px] border-[#dbd6ce]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] text-[#9a9590] tracking-[0.15em]">03 — SERVICES</span>
          <div className="flex-1 h-[1.5px] bg-[#dbd6ce]"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 id="services-heading" className="section-heading opacity-0">What I<br /><span className="marker-yellow">do best.</span></h2>
          <div className="max-w-[340px]">
            <p className="text-[15px] text-[#5a5753] leading-relaxed mb-6">Starting from ₹5,000 — customised based on scope.</p>
            <a href="mailto:philipjoel1969@gmail.com" className="btn-primary text-[13px] px-6 py-3">Get a Quote →</a>
          </div>
        </div>
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => <ServiceCard key={s.num} s={s} />)}
        </div>
      </div>
    </section>
  )
}
