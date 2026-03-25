export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = window.innerWidth < 768 ? 100 : 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="min-h-screen bg-[#f0ede8] flex items-center relative overflow-hidden py-24 md:py-0">
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--parchment)_0%,transparent_70%)] opacity-30 z-0"></div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-10 items-center relative z-10">
        <div>
          <h1 id="hero-title" className="hero-headline mb-5 opacity-0">
            I Build <span className="marker-yellow">Brands</span>,<br className="hidden md:block"/>
            Tell Stories & Help<br className="hidden md:block"/>
            <span className="text-[#ff5a1f]">Businesses</span> Grow.
          </h1>
          <p id="hero-sub" className="text-base text-[#5a5753] leading-relaxed max-w-[420px] mb-8 opacity-0">
            Student entrepreneur from Chennai — turning ideas into brands, content into clients, and ambition into action.
          </p>
          <div id="hero-btns" className="flex flex-wrap gap-4 opacity-0">
            <button onClick={() => scrollToSection('contact')} className="btn-primary">Let's Work Together →</button>
            <button onClick={() => scrollToSection('projects')} className="btn-outline">See My Work ↓</button>
          </div>
        </div>
        <div id="hero-img-area" className="relative flex justify-center items-center opacity-0 mt-10 md:mt-0">
          <div className="absolute inset-0">
            <div className="float-anim absolute top-[5%] left-[5%]"><svg width="28" height="28" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#e8d800" /></svg></div>
            <div className="float-anim2 absolute top-[10%] right-[5%]"><svg width="18" height="18" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#111110" /></svg></div>
            <div className="float-anim absolute bottom-[15%] left-[0%]">
              <svg width="80" height="30" viewBox="0 0 80 30" fill="none"><path d="M4 15 Q14 4 24 15 Q34 26 44 15 Q54 4 64 15 Q74 26 84 15" stroke="#9a9590" stroke-width="2.5" fill="none" stroke-linecap="round" /></svg>
            </div>
            <div className="float-anim2 absolute bottom-[8%] right-[12%]"><svg width="22" height="22" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#ff5a1f" /></svg></div>
          </div>
          <div className="w-[280px] md:w-[320px] h-[380px] md:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-white to-[#e8e4dd] border-2 border-[#111110] shadow-[14px_14px_0_#111110] relative z-[50]">
            <img src="/hero.png" alt="S. Philip Joel" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-[20px] md:bottom-[30px] -left-5 md:-left-[25px] px-4 md:px-[18px] py-2 md:py-[10px] bg-white border-[1.5px] border-[#111110] rounded-xl shadow-[4px_4px_0_#111110] z-[60]">
            <div className="font-display font-black text-xl md:text-2xl text-[#ff5a1f] leading-none">10+</div>
            <div className="text-[9px] md:text-[10px] text-[#5a5753] mt-0.5">Happy Clients</div>
          </div>
          <div className="absolute top-[20px] md:top-[30px] -right-5 md:-right-[25px] px-4 md:px-[18px] py-2 md:py-[10px] bg-[#f5e642] border-[1.5px] border-[#111110] rounded-xl shadow-[4px_4px_0_#111110] z-[60]">
            <div className="font-display font-black text-xl md:text-2xl text-[#111110] leading-none">2×</div>
            <div className="text-[9px] md:text-[10px] text-[#2a2926] mt-0.5">Shark Tank Win</div>
          </div>
        </div>
      </div>
    </section>
  )
}
