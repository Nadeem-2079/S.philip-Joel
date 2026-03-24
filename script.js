// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// ─── LENIS ───
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ─── LOADER ───
let pct = 0;
const loaderProgress = document.getElementById('loader-progress');
const loadingScreen = document.getElementById('loading-screen');
const appContent = document.getElementById('app-content');

const loadStart = performance.now();
const loadDur = 1800;

function tick(now) {
    const t = Math.min((now - loadStart) / loadDur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    pct = Math.round(eased * 100);
    if (loaderProgress) loaderProgress.style.width = pct + '%';
    
    if (t < 1) {
        requestAnimationFrame(tick);
    } else {
        if (loaderProgress) loaderProgress.style.width = '100%';
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
            }
            if (appContent) appContent.style.opacity = '1';
            initAnimations();
        }, 400);
    }
}
requestAnimationFrame(tick);

// ─── NAVBAR ───
let lastScroll = 0;
const navbar = document.getElementById('navbar-wrapper');
const navInner = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll < 100) {
        gsap.to(navbar, { y: -100, opacity: 0, duration: 0.4 });
        if (navInner) navInner.classList.remove('nav-scrolled');
    } else {
        if (navInner) navInner.classList.add('nav-scrolled');
        if (currentScroll > lastScroll && currentScroll > 500) {
            gsap.to(navbar, { y: -100, opacity: 0, duration: 0.4 });
        } else {
            gsap.to(navbar, { y: 0, opacity: 1, duration: 0.4 });
        }
    }
    lastScroll = currentScroll;
    
    // Scroll to Top visibility
    const stt = document.getElementById('scroll-to-top');
    if (stt) {
        if (currentScroll > 400) {
            gsap.to(stt, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, pointerEvents: 'auto', ease: 'back.out(1.7)' });
        } else {
            gsap.to(stt, { autoAlpha: 0, y: 30, scale: 0.8, duration: 0.3, pointerEvents: 'none' });
        }
    }
});

// Magnetic Logo
const logo = document.getElementById('logo');
if (logo) {
    logo.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = logo.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(logo, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
    });
    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    });
}

// ─── MOBILE MENU ───
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        const spans = mobileToggle.querySelectorAll('span');
        if (menuOpen) {
            gsap.to(spans[0], { rotate: 45, y: 4, duration: 0.3 });
            gsap.to(spans[1], { rotate: -45, y: -4, width: 22, duration: 0.3 });
            // Don't lock scroll for half-menu if we want user to see content below
            // document.body.style.overflow = 'hidden'; 
        } else {
            gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { rotate: 0, y: 0, width: 14, duration: 0.3 });
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking outside or on link
    mobileMenu.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
             menuOpen = false;
             mobileMenu.classList.remove('open');
             document.body.style.overflow = 'auto';
             const spans = mobileToggle.querySelectorAll('span');
             gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
             gsap.to(spans[1], { rotate: 0, y: 0, width: 14, duration: 0.3 });
        });
    });
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const offset = window.innerWidth < 768 ? 100 : 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    menuOpen = false;
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileToggle) {
        const spans = mobileToggle.querySelectorAll('span');
        gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { rotate: 0, y: 0, width: 14, duration: 0.3 });
    }
}

// ─── DATA & INJECTION ───
const projects = [
  { title:'SV Little Leapsters Therapy Center', type:'Instagram Content Strategy · Personal Brand Strategy', desc:'Built a full Instagram content calendar for a pediatric therapy clinic in Chennai.', tags:['Content Strategy','Branding','Healthcare'], color:'#0f9b8e', year:'2024', image: '/leapsters.png' },
  { title:'Lofty Learn (ECE Academy)', type:'Website Content · Branding', desc:'Content intake and architecture. Tagline, brand messaging, and full website copy.', tags:['Web Content','Branding','Ed-Tech'], color:'#6b4de6', year:'2024', image: '/lofty.png' },
  { title:'Ausdauer Groups', type:'Full Agency Brand Build', desc:'Built the agency brand from scratch — name, identity, tone of voice, systems.', tags:['Branding','Content','Startup Ops'], color:'#ff5a1f', year:'2024', image: '/ausdauer.png' },
  { title:'Coming Soon', type:'New Project', desc:'Next case study dropping soon. Currently in progress — exciting work in branding.', tags:['TBA'], color:'#9a9590', year:'2025', image: '/coming.png' },
];

const blogPosts = [
  { num: '01', title: 'What running an agency in college actually taught me about business', tag: 'Startup', time: '5 min read', color: '#ff5a1f' },
  { num: '02', title: 'Why your brand\'s tone of voice matters more than your logo', tag: 'Branding', time: '4 min read', color: '#6b4de6' },
  { num: '03', title: 'How I use AI tools to do the work of a 5-person content team', tag: 'AI & Tools', time: '6 min read', color: '#0f9b8e' },
  { num: '04', title: 'Cold outreach that doesn\'t feel cold — what worked for us', tag: 'Growth', time: '4 min read', color: '#e8d800' },
  { num: '05', title: 'Winning a Shark Tank competition as a student: what nobody tells you', tag: 'Story', time: '7 min read', color: '#ff5a1f' },
];

const contactLinks = [
  { label:'Email', value:'philipjoel1969@gmail.com', href:'mailto:philipjoel1969@gmail.com', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' },
  { label:'WhatsApp', value:'+91 75980 22972', href:'https://wa.me/917598022972', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>' },
  { label:'LinkedIn', value:'s-philipjoel-73b0a5290', href:'https://linkedin.com/in/s-philipjoel-73b0a5290', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' },
  { label:'Location', value:'Chennai, India', href:'#', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
];

const services = [
    { num: '02', icon: '✦', title: 'Brand Strategy & Identity', desc: 'Your brand is more than a logo. I help you find your voice, define your positioning, and show up consistently.', color: '#6b4de6', includes: ['Brand audit & messaging', 'Logo direction & visual identity'] },
    { num: '03', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', title: 'Content Strategy & Writing', desc: 'From Instagram captions to full website copy — content that sounds like you but better.', color: '#0f9b8e', includes: ['Website copywriting', 'Social media planning'] },
    { num: '04', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>', title: 'Social Media Management', desc: 'Consistent, on-brand social presence that builds trust and attracts the right audience.', color: '#e8d800', includes: ['Content calendar creation', 'Hashtag research'] },
    { num: '05', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', title: 'Personal Branding', desc: 'For founders, professionals, and students who want to build a credible online presence.', color: '#ff5a1f', includes: ['LinkedIn overhaul', 'Content pillars'] },
];

function injectContent() {
    // Projects
    const track = document.getElementById('projects-track');
    if (track) track.innerHTML = [...projects, ...projects].map(p => `
    <div class="project-card">
      <div class="h-[200px] relative overflow-hidden flex items-center justify-center" style="background: ${p.color}15">
         <img src="${p.image}" alt="${p.title}" class="absolute inset-0 w-full h-full object-cover">
         <div class="absolute top-4 right-4 px-3 py-1 bg-[#111110] rounded-full text-[11px] text-[#f0ede8] font-mono">${p.year}</div>
      </div>
      <div class="p-7 bg-white">
        <div class="text-[11px] font-mono tracking-widest mb-3 font-bold" style="color: ${p.color}">${p.type}</div>
        <h3 class="font-display font-black text-xl text-[#111110] mb-3 leading-tight tracking-tight">${p.title}</h3>
        <p class="text-sm text-[#5a5753] leading-relaxed mb-5">${p.desc}</p>
        <div class="flex flex-wrap gap-2">
          ${p.tags.map(t => `<span class="tag-pill" style="color:${p.color}; border-color: ${p.color}44; font-size:10px">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');

    // Blog
    const blogList = document.querySelector('.blog-list');
    if (blogList) blogList.innerHTML = blogPosts.map((p, i) => `
        <div class="group py-6 ${i === 0 ? '' : 'border-t border-[#dbd6ce]'}">
            <div class="flex gap-5 items-start">
                <div class="font-mono text-xs text-black/30 font-semibold pt-1">${p.num}</div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="tag-pill" style="color: ${p.color}; border-color: ${p.color}22; font-size: 10px;">${p.tag}</span>
                        <span class="text-[11px] text-black/30 font-mono tracking-wider">${p.time}</span>
                    </div>
                    <h3 class="font-display font-bold text-lg text-[#111110] leading-snug mb-3 group-hover:text-[#ff5a1f] transition-colors">${p.title}</h3>
                    <div class="flex items-center gap-2 text-sm text-[#5a5753] font-medium">Read more →</div>
                </div>
            </div>
        </div>`).join('');

    // Contact
    const contactList = document.getElementById('contact-list');
    if (contactList) contactList.innerHTML = contactLinks.map(c => `
        <a href="${c.href}" target="_blank" class="contact-card-enhanced">
            <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ff5a1f]">
                ${c.icon}
            </div>
            <div class="flex-1">
                <div class="text-[10px] text-white/30 font-mono tracking-widest uppercase mb-1">${c.label}</div>
                <div class="text-base text-[#f0ede8] font-semibold tracking-tight truncate">${c.value}</div>
            </div>
            ${(c.label === 'Email' || c.label === 'WhatsApp') ? `<button onclick="event.preventDefault(); copyToClipboard('${c.value}', this)" class="text-white/20 hover:text-[#ff5a1f] p-2 transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg></button>` : ''}
        </a>`).join('');

    // Services
    const sGrid = document.getElementById('services-grid');
    if (sGrid) {
        services.forEach(s => {
            const card = document.createElement('div');
            card.className = 'service-card opacity-0';
            card.innerHTML = `
                <div class="flex items-start justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style="background: ${s.color}15; border: 1.5px solid ${s.color}30; color: ${s.color}">${s.icon}</div>
                        <span class="font-mono text-[11px] text-[#9a9590] tracking-wider">${s.num}</span>
                    </div>
                    <button class="service-toggle w-8 h-8 rounded-full border border-[#dbd6ce] bg-[#f0ede8] flex items-center justify-center text-lg">+</button>
                </div>
                <h3 class="font-display font-black text-xl mb-3 tracking-tight leading-tight">${s.title}</h3>
                <p class="text-sm text-[#5a5753] leading-relaxed">${s.desc}</p>
                <div class="service-detail hidden pt-5 border-t border-[#dbd6ce] mt-5">
                    <ul class="list-none flex flex-col gap-3">
                        ${s.includes.map(item => `<li class="flex items-center gap-3 text-[13px] text-[#2a2926]"><span class="w-1.5 h-1.5 rounded-full shrink-0" style="background: ${s.color}"></span>${item}</li>`).join('')}
                    </ul>
                </div>`;
            sGrid.appendChild(card);
        });
    }

    // Main Marquee
    const mainM = document.getElementById('main-marquee');
    if (mainM) {
        const item = `
            <span class="flex items-center gap-8 px-8 font-display font-bold text-[13px] text-[#f0ede8] uppercase tracking-widest">
                <span>Web Design</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                <span>Brand Strategy</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                <span>Content Writing</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                <span>Social Media</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
                <span>Personal Branding</span> <svg width="10" height="10" viewBox="0 0 32 32"><path d="M16 0 L17.5 14 L32 16 L17.5 18 L16 32 L14.5 18 L0 16 L14.5 14 Z" fill="#f5e642"/></svg>
            </span>`;
        mainM.innerHTML = item.repeat(8);
    }
}

// ─── INIT ───
injectContent();

// Re-bind service toggles after injection
document.querySelectorAll('.service-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const detail = card.querySelector('.service-detail');
        const isOpen = !detail.classList.contains('hidden');
        if (isOpen) {
            detail.classList.add('hidden');
            btn.innerText = '+';
            btn.style.background = '#f0ede8';
            btn.style.color = '#111110';
        } else {
            detail.classList.remove('hidden');
            btn.innerText = '−';
            btn.style.background = '#111110';
            btn.style.color = '#f0ede8';
        }
    });
});

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    gsap.to(btn, { color: '#ff5a1f', duration: 0.2 });
    setTimeout(() => {
        btn.innerHTML = original;
        gsap.to(btn, { color: 'rgba(255,255,255,0.2)', duration: 0.2 });
    }, 2000);
}

// Infinite Marquee
let xP = 0;
let isHovered = false;
const projectsTrack = document.getElementById('projects-track');

if (projectsTrack) {
    projectsTrack.addEventListener('mouseenter', () => isHovered = true);
    projectsTrack.addEventListener('mouseleave', () => isHovered = false);
}

function marqueeLoop() {
    const t = document.getElementById('projects-track');
    if (t && !isHovered) {
        xP -= 0.8;
        const limit = t.scrollWidth / 2;
        if (limit > 0 && Math.abs(xP) >= limit) {
            xP = 0;
        }
        t.style.transform = `translateX(${xP}px)`;
    }
    requestAnimationFrame(marqueeLoop);
}
requestAnimationFrame(marqueeLoop);

function initAnimations() {
    gsap.fromTo('#navbar-wrapper', { y: -100, opacity: 0 }, { y: -100, opacity: 0, duration: 0 }); // reset
    
    const tl = gsap.timeline();
    tl.fromTo('#hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.2 })
      .fromTo('#hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .fromTo('#hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('#hero-img-area', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power4.out' }, '-=1');

    document.querySelectorAll('.section-heading').forEach(h => {
        gsap.fromTo(h, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: h, start: 'top 85%' }
        });
    });

    gsap.fromTo('#about-text p', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#about-text', start: 'top 85%' }
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        const numEl = card.querySelector('.stat-num');
        const target = parseFloat(card.dataset.val);
        const suf = card.dataset.suf;
        ScrollTrigger.create({
            trigger: card, start: 'top 90%', onEnter: () => {
                let current = 0;
                const dur = 1500;
                const start = performance.now();
                function count(now) {
                    const progress = Math.min((now - start) / dur, 1);
                    current = (1 - Math.pow(1 - progress, 3)) * target;
                    numEl.innerText = (target % 1 !== 0 ? current.toFixed(1) : Math.round(current)) + suf;
                    if (progress < 1) requestAnimationFrame(count);
                    else numEl.innerText = target + suf;
                }
                requestAnimationFrame(count);
            }
        });
    });

    document.querySelectorAll('.service-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%' }
        });
    });
}
