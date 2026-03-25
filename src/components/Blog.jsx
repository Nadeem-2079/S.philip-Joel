const blogPosts = [
  { num: '01', title: 'What running an agency in college actually taught me about business', tag: 'Startup', time: '5 min read', color: '#ff5a1f' },
  { num: '02', title: 'Why your brand\'s tone of voice matters more than your logo', tag: 'Branding', time: '4 min read', color: '#6b4de6' },
  { num: '03', title: 'How I use AI tools to do the work of a 5-person content team', tag: 'AI & Tools', time: '6 min read', color: '#0f9b8e' },
  { num: '04', title: 'Cold outreach that doesn\'t feel cold — what worked for us', tag: 'Growth', time: '4 min read', color: '#e8d800' },
  { num: '05', title: 'Winning a Shark Tank competition as a student: what nobody tells you', tag: 'Story', time: '7 min read', color: '#ff5a1f' },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-[#f0ede8] py-24 md:py-[120px] border-t-[1.5px] border-[#dbd6ce]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] text-[#9a9590] tracking-[0.15em]">05 — BLOG</span>
          <div className="flex-1 h-[1.5px] bg-[#dbd6ce]"></div>
        </div>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] grid-cols-1 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky top-[100px]">
            <h2 id="blog-heading" className="section-heading mb-6 opacity-0">Things I'm thinking<br /><span className="marker-yellow">about.</span></h2>
            <p className="text-[17px] text-[#5a5753] leading-relaxed max-w-[420px] mb-8">Student startup realities, branding lessons, AI tools, and the occasional life update — written honestly.</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              <span className="text-[11px] font-mono text-[#5a5753] tracking-widest uppercase">New post every 2 weeks</span>
            </div>
          </div>
          <div className="flex flex-col gap-0 blog-list">
            {blogPosts.map((p, i) => (
              <div key={p.num} className={`group py-6 ${i === 0 ? '' : 'border-t border-[#dbd6ce]'}`}>
                <div className="flex gap-5 items-start">
                  <div className="font-mono text-xs text-black/30 font-semibold pt-1">{p.num}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag-pill" style={{ color: p.color, borderColor: `${p.color}22`, fontSize: '10px' }}>{p.tag}</span>
                      <span className="text-[11px] text-black/30 font-mono tracking-wider">{p.time}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#111110] leading-snug mb-3 group-hover:text-[#ff5a1f] transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#5a5753] font-medium">Read more →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
