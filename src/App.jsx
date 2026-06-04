import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const images = {
  hero: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
  sauna: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1600&q=80',
  stoneSauna: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80',
  steam: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80',
  pool: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=80',
  plunge: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
  jacuzzi: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
  massage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
  facial: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80',
  suite: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
  lounge: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  outdoor: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
};

const experiences = [
  {
    id: '01',
    title: 'Finnish Sauna',
    sub: 'Dry heat / cedar room',
    desc: 'Deep timber heat, hot stones and a clean Nordic ritual focused on contrast and breathing.',
    image: images.sauna,
  },
  {
    id: '02',
    title: 'Stone Heater Room',
    sub: 'Heritage heat / steam bursts',
    desc: 'A more dramatic sauna experience with darker materials and stronger thermal contrast.',
    image: images.stoneSauna,
  },
  {
    id: '03',
    title: 'Steam Chamber',
    sub: 'Humidity / eucalyptus air',
    desc: 'Warm mist, low light and a softer heat route for recovery after high-temperature sessions.',
    image: images.steam,
  },
  {
    id: '04',
    title: 'Thermal Pool',
    sub: 'Warm water / floating recovery',
    desc: 'A quiet recovery pool built for slower movement, decompression and post-heat reset.',
    image: images.pool,
  },
  {
    id: '05',
    title: 'Cold Plunge',
    sub: 'Contrast / shock recovery',
    desc: 'A sharper cold-water intervention used between heat stages for clarity and contrast.',
    image: images.plunge,
  },
  {
    id: '06',
    title: 'Hydro Jacuzzi',
    sub: 'Pressure jets / soak',
    desc: 'Warm, bubbling hydrotherapy designed to relax legs, lower back and shoulders.',
    image: images.jacuzzi,
  },
  {
    id: '07',
    title: 'Body Massage',
    sub: 'Hands-on / tissue release',
    desc: 'A performance-oriented massage ritual aimed at tension, posture and fatigue.',
    image: images.massage,
  },
  {
    id: '08',
    title: 'Botanical Facial',
    sub: 'Skin ritual / calming care',
    desc: 'Cleansing, massage and hydration in a slower, quieter treatment room.',
    image: images.facial,
  },
];

const routes = [
  {
    code: 'R1',
    title: 'HEAT + WATER',
    text: 'Pool → Finnish sauna → steam room → hydro jacuzzi → lounge cooldown.',
  },
  {
    code: 'R2',
    title: 'DEEP RECOVERY',
    text: 'Stone heater sauna → cold plunge → massage → herbal tea → low-noise lounge.',
  },
  {
    code: 'R3',
    title: 'PRIVATE ESCAPE',
    text: 'Private suite → jacuzzi → body treatment → facial → extended recovery seating.',
  },
];

const journal = [
  {
    number: '001',
    title: 'NOT A BASIC SPA TEMPLATE',
    text: 'This redesign ditches the soft, rounded, generic spa look and turns the site into something more cinematic, architectural and editorial.',
  },
  {
    number: '002',
    title: 'LESS “WEBFLOW TEMPLATE”, MORE BRAND',
    text: 'The layout now works with bigger type, sharper blocks, framed media, offset sections and a stronger sense of identity.',
  },
  {
    number: '003',
    title: 'SCROLL SHOULD FEEL PART OF THE EXPERIENCE',
    text: 'This version keeps the momentum scroll setup with Lenis from CDN, so the site glides instead of stopping abruptly.',
  },
];

const nav = [
  { label: 'Concept', id: 'concept' },
  { label: 'Experiences', id: 'experiences' },
  { label: 'Routes', id: 'routes' },
  { label: 'Private', id: 'private' },
  { label: 'Book', id: 'book' },
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [query, setQuery] = useState('');
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let lenis = null;
    let rafId = null;
    let destroyed = false;

    const init = async () => {
      try {
        const mod = await import('https://cdn.jsdelivr.net/npm/lenis@1.3.1/dist/lenis.mjs');
        if (destroyed) return;
        const Lenis = mod.default;

        lenis = new Lenis({
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.25,
          infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      } catch (error) {
        console.warn('Lenis failed to load from CDN.', error);
      }
    };

    init();

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((item) => observer.observe(item));

    return () => {
      targets.forEach((item) => observer.unobserve(item));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      const bar = document.querySelector('.progress-line span');
      if (bar) bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((item) => {
      const haystack = `${item.title} ${item.sub} ${item.desc}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector('.top-nav');
    const offset = header ? header.offsetHeight + 16 : 16;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(y, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const jump = (event, id) => {
    event.preventDefault();
    goTo(id);
  };

  return (
    <div className={`aura-shell ${theme}`}>
      <div className="progress-line"><span /></div>

      <header className="top-nav reveal visible">
        <a href="#home" className="brand-lockup" onClick={(e) => jump(e, 'home')}>
          <div className="brand-box">A</div>
          <div>
            <strong>AURA</strong>
            <small>THERMAL HOUSE</small>
          </div>
        </a>

        <nav>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => jump(e, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="nav-chip" onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
          </button>
          <button type="button" className="nav-cta" onClick={() => goTo('book')}>
            BOOK NOW
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero-stage reveal">
          <div className="hero-left">
            <div className="eyebrow">EDITORIAL REDESIGN / AURA SPA</div>
            <h1>
              Fully rebuilt.
              <br />
              Sharper.
              <br />
              More cinematic.
            </h1>
            <p>
              This version is a complete redesign, not just a tweak. It drops the standard template vibe and pushes
              the site toward a more architectural, editorial and luxury-feeling experience.
            </p>
            <div className="hero-buttons">
              <button type="button" className="primary-square" onClick={() => goTo('experiences')}>
                VIEW EXPERIENCES
              </button>
              <button type="button" className="secondary-square" onClick={() => goTo('concept')}>
                SEE CONCEPT
              </button>
            </div>
          </div>

          <div className="hero-right">
            <img src={images.hero} alt="Aura spa pool exterior" />
            <div className="hero-card card-a">
              <span>01</span>
              <strong>SAUNA</strong>
            </div>
            <div className="hero-card card-b">
              <span>02</span>
              <strong>POOL</strong>
            </div>
            <div className="hero-card card-c">
              <span>03</span>
              <strong>RITUALS</strong>
            </div>
          </div>
        </section>

        <section className="status-strip reveal">
          <div>
            <strong>15+</strong>
            <span>SPA EXPERIENCES</span>
          </div>
          <div>
            <strong>04</strong>
            <span>CORE ZONES</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>RATED ESCAPE</span>
          </div>
          <div>
            <strong>DAILY</strong>
            <span>BY APPOINTMENT</span>
          </div>
        </section>

        <section className="concept-grid reveal" id="concept">
          <div className="section-marker">CONCEPT</div>
          <div className="concept-copy">
            <h2>Luxury wellness, but with more identity.</h2>
            <p>
              Instead of soft pills, bubbly cards and generic spa blocks, the whole site is treated more like a brand
              magazine: strong typography, harder lines, split screens, framed image systems and layouts that feel built,
              not auto-generated.
            </p>
          </div>
          <div className="concept-image large-image">
            <img src={images.lounge} alt="Aura lounge" />
          </div>
          <div className="concept-note">
            <span>Design direction</span>
            <p>
              Editorial / architectural / premium. Less “template”, more atmosphere. Less safe, more memorable.
            </p>
          </div>
        </section>

        <section className="journal-section" id="journal">
          {journal.map((item) => (
            <article key={item.number} className="journal-card reveal">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="experience-header reveal" id="experiences">
          <div>
            <div className="section-marker">EXPERIENCES</div>
            <h2>The thermal library.</h2>
          </div>
          <div className="search-frame">
            <input
              type="text"
              placeholder="Search sauna, steam, pool..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        <section className="experience-grid">
          {filteredExperiences.map((item, index) => (
            <article className={`experience-card reveal ${index === 0 ? 'feature' : ''}`} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="experience-overlay" />
              <div className="experience-copy">
                <span>{item.id}</span>
                <h3>{item.title}</h3>
                <strong>{item.sub}</strong>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="route-layout reveal" id="routes">
          <div className="route-intro">
            <div className="section-marker">ROUTES</div>
            <h2>Build the visit like a sequence.</h2>
            <p>
              Instead of listing random services, the experience is framed as a route through heat, water and recovery.
            </p>
          </div>
          <div className="route-list">
            {routes.map((route) => (
              <article key={route.code}>
                <span>{route.code}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="private-stage reveal" id="private">
          <div className="private-media">
            <img src={images.suite} alt="Private suite" />
          </div>
          <div className="private-copy">
            <div className="section-marker">PRIVATE SUITE</div>
            <h2>A quieter side of the spa.</h2>
            <p>
              Private suite booking gets its own section and mood instead of feeling like a tiny afterthought. Use this
              area to sell couples bookings, quiet escapes and higher-value experiences.
            </p>
            <div className="private-meta">
              <div>
                <strong>$210</strong>
                <span>PRIVATE ESCAPE</span>
              </div>
              <div>
                <strong>90 MIN</strong>
                <span>EXTENDED TIME</span>
              </div>
              <div>
                <strong>2 PPL</strong>
                <span>COUPLES OPTION</span>
              </div>
            </div>
            <button type="button" className="primary-square" onClick={() => goTo('book')}>
              RESERVE SUITE
            </button>
          </div>
        </section>

        <section className="editorial-banner reveal">
          <div className="scroll-line" />
          <p>
            SAUNA · STEAM · THERMAL POOL · PLUNGE · HYDRO JACUZZI · MASSAGE · FACIALS · PRIVATE SUITE · QUIET LOUNGE
          </p>
        </section>

        <section className="book-section reveal" id="book">
          <div className="book-left">
            <div className="section-marker">BOOKING</div>
            <h2>Ready to turn this into the final direction?</h2>
            <p>
              This package is a complete redesign pass: new structure, new sections, new visual language and a much less
              template-looking feel.
            </p>
          </div>

          <div className="book-right">
            <a href="mailto:hello@aurawellnessspa.com" className="primary-square link-square">
              BOOK BY EMAIL
            </a>
            <a href="tel:+359880000000" className="secondary-square link-square">
              CALL NOW
            </a>
          </div>
        </section>
      </main>

      <footer className="footer-grid reveal visible">
        <div className="footer-brand">
          <div className="brand-box">A</div>
          <div>
            <strong>AURA</strong>
            <small>THERMAL HOUSE</small>
          </div>
        </div>

        <div>
          <h4>EXPLORE</h4>
          <a href="#concept" onClick={(e) => jump(e, 'concept')}>Concept</a>
          <a href="#experiences" onClick={(e) => jump(e, 'experiences')}>Experiences</a>
          <a href="#routes" onClick={(e) => jump(e, 'routes')}>Routes</a>
        </div>

        <div>
          <h4>CONTACT</h4>
          <p>42 Willow Lane</p>
          <p>Sofia Wellness District</p>
          <p>hello@aurawellnessspa.com</p>
        </div>
      </footer>
    </div>
  );
}
