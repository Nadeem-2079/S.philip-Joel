import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const posts = [
  { num: '01', title: 'What running an agency in college actually taught me about business', tag: 'Startup', time: '5 min read', color: 'var(--orange)' },
  { num: '02', title: 'Why your brand\'s tone of voice matters more than your logo', tag: 'Branding', time: '4 min read', color: 'var(--purple)' },
  { num: '03', title: 'How I use AI tools to do the work of a 5-person content team', tag: 'AI & Tools', time: '6 min read', color: 'var(--teal)' },
  { num: '04', title: 'Cold outreach that doesn\'t feel cold — what worked for us', tag: 'Growth', time: '4 min read', color: 'var(--yellow-dark)' },
  { num: '05', title: 'Winning a Shark Tank competition as a student: what nobody tells you', tag: 'Story', time: '7 min read', color: 'var(--orange)' },
]

function BlogCard({ p, index }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: index * 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 90%' }
    })
  }, [index])
  return (
    <div ref={ref} className="blog-card" style={{ opacity: 0, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: 'var(--ink-faint)', fontWeight: 600, paddingTop: 3, flexShrink: 0 }}>{p.num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span className="tag-pill" style={{ color: p.color, borderColor: p.color + '44', fontSize: 10 }}>{p.tag}</span>
          <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'JetBrains Mono,monospace' }}>{p.time}</span>
        </div>
        <h3 style={{ fontFamily: 'Cabinet Grotesk,sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--ink)', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: 12, transition: 'color 0.2s' }}>{p.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-muted)', fontWeight: 500 }}>
          Read more <span style={{ transition: 'transform 0.2s' }}>→</span>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const headRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(headRef.current, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 82%' }
    })
  }, [])

  return (
    <section id="blog" style={{ background: 'var(--cream)', padding: '120px 0', borderTop: '1.5px solid var(--parchment)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.15em' }}>05 — BLOG</span>
          <div style={{ flex: 1, height: '1.5px', background: 'var(--parchment)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h2 ref={headRef} className="section-heading" style={{ marginBottom: 16, opacity: 0 }}>Things I'm thinking<br /><span className="marker-yellow">about.</span></h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: 380 }}>
              Student startup realities, branding lessons, AI tools, and the occasional life update — written honestly, not perfectly.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'JetBrains Mono,monospace' }}>New post every 2 weeks</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {posts.map((p, i) => (
              <div key={p.num}>
                <BlogCard p={p} index={i} />
                {i < posts.length - 1 && <div style={{ height: '1.5px', background: 'var(--parchment)', margin: '20px 0' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
