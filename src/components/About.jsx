import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  useEffect(() => {
    const stats = document.querySelectorAll('.stat-card')
    stats.forEach(card => {
      const numEl = card.querySelector('.stat-num')
      const target = parseFloat(card.dataset.val)
      const suf = card.dataset.suf
      ScrollTrigger.create({
        trigger: card, 
        start: 'top 90%', 
        onEnter: () => {
          let current = 0
          const dur = 1500
          const start = performance.now()
          function count(now) {
            const progress = Math.min((now - start) / dur, 1)
            current = (1 - Math.pow(1 - progress, 3)) * target
            numEl.innerText = (target % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + suf
            if (progress < 1) requestAnimationFrame(count)
            else numEl.innerText = target + suf
          }
          requestAnimationFrame(count)
        }
      })
    })

    gsap.fromTo('#about-text p', { y: 30, opacity: 0 }, {
      y: 0, 
      opacity: 1, 
      stagger: 0.12, 
      duration: 0.8, 
      ease: 'power3.out',
      scrollTrigger: { trigger: '#about-text', start: 'top 85%' }
    })
  }, [])

  return (
    <section id="about" className="bg-white py-20 md:py-[120px] border-t-[1.5px] border-[#dbd6ce]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] text-[#9a9590] tracking-[0.15em]">02 — ABOUT ME</span>
          <div className="flex-1 h-[1.5px] bg-[#dbd6ce]"></div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-16 items-start">
          <div className="md:sticky top-[100px]">
            <h2 id="about-heading" className="section-heading mb-9 opacity-0">Hey, I'm<br /><span className="marker-yellow">Philip.</span></h2>
            <div id="about-text" className="flex flex-col gap-6">
              <p className="text-[15px] text-[#5a5753] leading-relaxed opacity-0">I didn't start with a perfect plan. I started with a belief that students could build real businesses — not just participate in case studies. In March 2024, I helped establish Ausdauer Groups, a digital agency run entirely by students, out of Chennai. Within months, we had real clients, real revenue, and a real team of 20.</p>
              <p className="text-[15px] text-[#5a5753] leading-relaxed opacity-0">I wear multiple hats — Director, PR lead, content team leader, and sometimes the guy writing website copy at midnight. I've worked on brand strategy, cold outreach systems, website builds, Instagram content calendars, script writing for reels, and the legal backbone of a bootstrapped startup. All while sitting in engineering lectures.</p>
              <p className="text-[15px] text-[#5a5753] leading-relaxed opacity-0">I believe branding is clarity, content creates long-term trust, and consistency beats motivation every single time. I'm not here to look impressive. I'm here to grow, build in public, and help brands show up the way they deserve to.</p>
              <p className="text-[15px] text-[#5a5753] leading-relaxed opacity-0">When I'm not running the agency, I'm pitching at startup competitions (won a couple), networking at BNI, or figuring out how AI tools can make our work 10x faster. Big fan of learning by doing — always have been.</p>
            </div>
            <div className="mt-10 inline-flex flex-wrap items-center gap-2.5 px-5 py-2.5 bg-[#f0ede8] border-[1.5px] border-[#dbd6ce] rounded-full">
              <span className="text-[13px] text-[#2a2926] font-medium">B.E. Engineering Student</span>
              <span className="hidden md:block w-px h-3.5 bg-[#dbd6ce]"></span>
              <span className="text-[13px] text-[#5a5753]">Graduating 2027</span>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="w-full md:w-[85%] aspect-[1.3/1] rounded-3xl overflow-hidden bg-[#0a0a09] relative shadow-2xl mx-auto">
              <img src="/about.jpeg" alt="About Philip" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="stat-card" data-val="10" data-suf="+">
                <div className="stat-num font-display font-black text-4xl text-[#ff5a1f] mb-1.5">0+</div>
                <div className="text-sm text-[#5a5753] font-medium">Clients Served</div>
              </div>
              <div className="stat-card" data-val="20" data-suf="">
                <div className="stat-num font-display font-black text-4xl text-[#0f9b8e] mb-1.5">0</div>
                <div className="text-sm text-[#5a5753] font-medium">Member Team</div>
              </div>
              <div className="stat-card" data-val="1.5" data-suf="+">
                <div className="stat-num font-display font-black text-4xl text-[#6b4de6] mb-1.5">0+</div>
                <div className="text-sm text-[#5a5753] font-medium">Years Running Agency</div>
              </div>
              <div className="stat-card" data-val="2" data-suf="×">
                <div className="stat-num font-display font-black text-4xl text-[#e8d800] mb-1.5">0×</div>
                <div className="text-sm text-[#5a5753] font-medium">Shark Tank Wins</div>
              </div>
            </div>
            <div className="p-8 bg-[#111110] rounded-[24px]">
              <p className="font-display font-bold text-xl text-[#f0ede8] leading-normal tracking-tight">"Consistency beats motivation every single time."</p>
              <div className="mt-4 text-xs text-[#f0ede8]/40 font-mono">— Philip Joel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
