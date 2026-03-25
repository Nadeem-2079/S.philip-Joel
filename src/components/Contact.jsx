import { gsap } from 'gsap'

const contactLinks = [
  { label:'Email', value:'philipjoel1969@gmail.com', href:'mailto:philipjoel1969@gmail.com', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label:'WhatsApp', value:'+91 75980 22972', href:'https://wa.me/917598022972', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg> },
  { label:'LinkedIn', value:'s-philipjoel-73b0a5290', href:'https://linkedin.com/in/s-philipjoel-73b0a5290', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label:'Location', value:'Chennai, India', href:'#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
];

export default function Contact() {
  const copyToClipboard = (text, e) => {
    e.preventDefault()
    const btn = e.currentTarget
    navigator.clipboard.writeText(text)
    const original = btn.innerHTML
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
    gsap.to(btn, { color: '#ff5a1f', duration: 0.2 })
    setTimeout(() => {
      btn.innerHTML = original
      gsap.to(btn, { color: 'rgba(255,255,255,0.2)', duration: 0.2 })
    }, 2000)
  }

  return (
    <section id="contact" className="bg-[#111110] py-24 md:py-[140px] relative overflow-hidden">
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--orange)_0%,transparent_70%)] opacity-10 blur-[80px] pointer-events-none"></div>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-3 mb-20">
          <span className="font-mono text-white/30 text-[11px] tracking-[0.2em]">06 — CONTACT</span>
          <div className="flex-1 h-[1.5px] bg-white/[0.08]"></div>
        </div>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] grid-cols-1 gap-20 lg:gap-32 items-center">
          <div>
            <h2 id="contact-heading" className="font-display font-black text-[clamp(2.8rem,8vw,5.5rem)] text-[#f0ede8] leading-[0.9] tracking-tighter mb-10 opacity-0">Let's build<br/>something<br/><span className="text-[#ff5a1f]">remarkable.</span></h2>
            <p className="text-xl text-white/50 leading-relaxed max-w-[520px]">I'm always open to new opportunities, collaborations, or just a friendly chat about branding and strategy.</p>
          </div>
          <div id="contact-list" className="flex flex-col gap-4">
            {contactLinks.map((c, i) => (
              <a key={i} href={c.href} target="_blank" className="contact-card-enhanced" rel="noreferrer">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ff5a1f]">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase mb-1">{c.label}</div>
                  <div className="text-base text-[#f0ede8] font-semibold tracking-tight truncate">{c.value}</div>
                </div>
                {(c.label === 'Email' || c.label === 'WhatsApp') && (
                  <button onClick={(e) => copyToClipboard(c.value, e)} className="text-white/20 hover:text-[#ff5a1f] p-2 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                  </button>
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-40 pt-16 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[13px] text-white/20 font-mono tracking-wider">© 2026 S. Philip Joel</div>
          <div className="flex gap-12">
            <a href="#" className="text-[13px] text-[#f0ede8] opacity-40 hover:opacity-100 hover:text-[#ff5a1f] transition-all tracking-[0.1em] uppercase font-medium">Instagram</a>
            <a href="https://linkedin.com/in/s-philipjoel-73b0a5290" target="_blank" className="text-[13px] text-[#f0ede8] opacity-40 hover:opacity-100 hover:text-[#ff5a1f] transition-all tracking-[0.1em] uppercase font-medium" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}
