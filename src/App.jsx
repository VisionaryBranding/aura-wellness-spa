import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Droplets,
  Flame,
  Heart,
  Menu,
  Moon,
  Search,
  Snowflake,
  Sparkles,
  Waves,
  X,
} from 'lucide-react';
import './App.css';

const heroImages = {
  main: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=85',
  pool: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=85',
  suite: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
  ritual: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=85',
  lounge: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=85',
};

const navItems = [
  { label: 'Index', id: 'index' },
  { label: 'Thermal', id: 'thermal' },
  { label: 'Rituals', id: 'rituals' },
  { label: 'Suites', id: 'suites' },
  { label: 'Reserve', id: 'reserve' },
];

const treatments = [
  {
    no: 'A01',
    title: 'Finnish Dry Sauna',
    type: 'Heat',
    icon: '/assets/sauna-finnish.svg',
    temp: '90°C',
    length: '18 min',
    copy: 'High heat, cedar air, stone steam hits and a clean Nordic reset.',
    tags: ['dry heat', 'classic', 'contrast'],
    image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A02',
    title: 'Wood-Fired Cabin',
    type: 'Heat',
    icon: '/assets/wood-sauna.svg',
    temp: '85°C',
    length: '22 min',
    copy: 'Softer, smoky heat with a slower cabin atmosphere and heavier timber mood.',
    tags: ['wood fire', 'slow', 'deep heat'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A03',
    title: 'Infrared Recovery',
    type: 'Recovery',
    icon: '/assets/infrared.svg',
    temp: '55°C',
    length: '30 min',
    copy: 'A lower-temperature session for people who want warmth without the aggressive hit.',
    tags: ['infrared', 'recovery', 'low heat'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A04',
    title: 'Salt Heat Room',
    type: 'Breath',
    icon: '/assets/salt-sauna.svg',
    temp: '62°C',
    length: '25 min',
    copy: 'Warm salt air, softer light and a calmer breathing-led ritual.',
    tags: ['salt', 'breath', 'calm'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A05',
    title: 'Eucalyptus Steam',
    type: 'Breath',
    icon: '/assets/steam-room.svg',
    temp: '45°C',
    length: '15 min',
    copy: 'Humidity, eucalyptus, low light and a smooth transition out of heavy heat.',
    tags: ['steam', 'humid', 'eucalyptus'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A06',
    title: 'Hydro Jet Bath',
    type: 'Water',
    icon: '/assets/jacuzzi.svg',
    temp: '38°C',
    length: '20 min',
    copy: 'Pressure jets for legs, lower back and shoulders after the heat circuit.',
    tags: ['jacuzzi', 'jets', 'water'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A07',
    title: 'Panoramic Pool',
    type: 'Water',
    icon: '/assets/panoramic.svg',
    temp: '32°C',
    length: 'open',
    copy: 'A quieter pool zone framed like a hotel editorial spread, not a stock spa block.',
    tags: ['pool', 'float', 'panorama'],
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A08',
    title: 'Private Suite',
    type: 'Suite',
    icon: '/assets/private-suite.svg',
    temp: 'custom',
    length: '90 min',
    copy: 'A closed-door escape with private soak, low-noise lounge and treatment add-ons.',
    tags: ['private', 'couples', 'premium'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A09',
    title: 'Botanical Facial',
    type: 'Ritual',
    icon: '/assets/facial.svg',
    temp: 'room',
    length: '45 min',
    copy: 'Cleansing, massage, hydration and a slower skin-care ritual after the circuit.',
    tags: ['facial', 'skin', 'botanical'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A10',
    title: 'Herbal Compress',
    type: 'Ritual',
    icon: '/assets/herbal.svg',
    temp: 'warm',
    length: '40 min',
    copy: 'Herbal pressure work for shoulders, neck and the post-screen body.',
    tags: ['herbal', 'massage', 'pressure'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A11',
    title: 'Signature Massage',
    type: 'Ritual',
    icon: '/assets/massage.svg',
    temp: 'room',
    length: '60 min',
    copy: 'A performance-minded treatment focused on tension, posture and fatigue.',
    tags: ['massage', 'tissue', 'reset'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1500&q=85',
  },
  {
    no: 'A12',
    title: 'Cold Water Reset',
    type: 'Contrast',
    icon: '/assets/pool.svg',
    temp: '8°C',
    length: '2 min',
    copy: 'A sharp plunge between heat rounds for clarity, contrast and a clean finish.',
    tags: ['cold', 'contrast', 'clarity'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85',
  },
];

const circuits = [
  { step: '01', title: 'Arrival decompression', text: 'Tea, locker, phone-down transition and a calm 8-minute breathing start.' },
  { step: '02', title: 'Heat block', text: 'Choose Finnish, wood-fired, infrared or salt depending on intensity.' },
  { step: '03', title: 'Water contrast', text: 'Steam, pool, hydro bath or cold reset based on your recovery route.' },
  { step: '04', title: 'Treatment finish', text: 'Massage, facial or private suite extension when the body is already softened.' },
];

const filters = ['All', 'Heat', 'Water', 'Breath', 'Recovery', 'Ritual', 'Suite', 'Contrast'];

function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.84,
      touchMultiplier: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;
    let rafId = null;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(['A08']);
  const lenisRef = useLenis();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    setMenuOpen(false);

    const header = document.querySelector('.nav-shell');
    const offset = header ? header.offsetHeight + 18 : 20;
    const target = element.getBoundingClientRect().top + window.scrollY - offset;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.05 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const progress = document.querySelector('.scroll-progress');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (progress) progress.style.transform = `scaleX(${pct})`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => items.forEach((item) => observer.unobserve(item));
  }, []);

  const visibleTreatments = useMemo(() => {
    const text = query.trim().toLowerCase();

    return treatments.filter((item) => {
      const filterMatch = activeFilter === 'All' || item.type === activeFilter;
      const searchMatch = !text || `${item.title} ${item.copy} ${item.type} ${item.tags.join(' ')}`.toLowerCase().includes(text);
      return filterMatch && searchMatch;
    });
  }, [activeFilter, query]);

  const toggleSave = (no) => {
    setSaved((current) => (current.includes(no) ? current.filter((item) => item !== no) : [...current, no]));
  };

  return (
    <div className="site-shell">
      <div className="grain" />
      <div className="scroll-progress" />

      <header className="nav-shell">
        <button className="brand" type="button" onClick={() => scrollTo('top')} aria-label="Go to top">
          <span className="brand-mark">A</span>
          <span>
            <b>AURA</b>
            <small>THERMAL HOUSE</small>
          </span>
        </button>

        <nav className={menuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="ghost-btn hide-sm" type="button" onClick={() => scrollTo('rituals')}>
            Catalogue <ArrowUpRight size={15} />
          </button>
          <button className="solid-btn hide-sm" type="button" onClick={() => scrollTo('reserve')}>
            Book
          </button>
          <button className="menu-btn" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="kicker"><Moon size={14} /> A private city spa concept</div>
            <h1>
              Stop selling “spa”.
              <span> Sell the ritual.</span>
            </h1>
            <p>
              AURA is redesigned like a luxury thermal house: sharper layout, heavier atmosphere, real service structure,
              asymmetric sections, smooth Lenis scrolling and less of that default template look.
            </p>
            <div className="hero-controls">
              <button className="solid-btn big" type="button" onClick={() => scrollTo('thermal')}>
                Explore the circuit <ChevronRight size={17} />
              </button>
              <button className="ghost-btn big" type="button" onClick={() => scrollTo('reserve')}>
                Reserve visit
              </button>
            </div>
          </div>

          <div className="hero-media" data-reveal>
            <img src={heroImages.main} alt="Dim luxury spa treatment room" />
            <div className="media-cut top-cut">SAUNA / STEAM / WATER</div>
            <div className="media-cut bottom-cut">LENIS MOMENTUM SCROLL</div>
          </div>

          <aside className="hero-index" id="index" data-reveal>
            <div>
              <span>01</span>
              <b>Thermal circuit</b>
              <p>Heat, steam, water, cold and recovery ordered like a real spa route.</p>
            </div>
            <div>
              <span>02</span>
              <b>Editorial catalogue</b>
              <p>Every treatment feels like a branded product instead of a boring card.</p>
            </div>
            <div>
              <span>03</span>
              <b>Vercel-ready</b>
              <p>Lenis comes from npm, so GitHub → Vercel installs it automatically.</p>
            </div>
          </aside>
        </section>

        <section className="ticker" aria-label="AURA services">
          <div>
            <span>FINNISH SAUNA</span><span>WOOD FIRE</span><span>INFRARED</span><span>STEAM</span><span>HYDRO JETS</span><span>PRIVATE SUITE</span><span>COLD RESET</span>
          </div>
        </section>

        <section className="thermal-section" id="thermal">
          <div className="section-heading" data-reveal>
            <span>THERMAL MAP</span>
            <h2>A spa site should guide people, not just throw boxes at them.</h2>
          </div>

          <div className="circuit-board" data-reveal>
            <div className="circuit-image">
              <img src={heroImages.pool} alt="Luxury spa pool" />
            </div>
            <div className="circuit-list">
              {circuits.map((item) => (
                <article key={item.step}>
                  <span>{item.step}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="split-manifesto" data-reveal>
          <div className="manifesto-card dark-card">
            <Flame size={22} />
            <h2>Harder edges. Better rhythm. Less soft template nonsense.</h2>
          </div>
          <div className="manifesto-card image-card">
            <img src={heroImages.ritual} alt="Steam room ritual" />
          </div>
          <div className="manifesto-card light-card">
            <Droplets size={22} />
            <p>
              The page now uses contrast: giant type beside quiet details, image cuts, numbered systems,
              hover depth and a treatment catalogue that actually feels clickable.
            </p>
          </div>
        </section>

        <section className="rituals-section" id="rituals">
          <div className="section-heading compact" data-reveal>
            <span>RITUAL CATALOGUE</span>
            <h2>Pick the body state.</h2>
          </div>

          <div className="tool-row" data-reveal>
            <div className="filter-row">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={activeFilter === filter ? 'active' : ''}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sauna, pool, facial..."
              />
            </label>
          </div>

          <div className="treatment-grid">
            {visibleTreatments.map((item, index) => (
              <article className={`treatment-card ${index % 5 === 0 ? 'wide' : ''}`} key={item.no} data-reveal>
                <div className="treatment-image">
                  <img src={item.image} alt={item.title} />
                  <button
                    type="button"
                    className={saved.includes(item.no) ? 'save-btn saved' : 'save-btn'}
                    onClick={() => toggleSave(item.no)}
                    aria-label={`Save ${item.title}`}
                  >
                    <Heart size={17} fill={saved.includes(item.no) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="treatment-body">
                  <div className="treatment-topline">
                    <span>{item.no}</span>
                    <b>{item.type}</b>
                  </div>
                  <img className="treatment-icon" src={item.icon} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <div className="mini-specs">
                    <span>{item.temp}</span>
                    <span>{item.length}</span>
                  </div>
                  <div className="tag-row">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="suite-section" id="suites">
          <div className="suite-media" data-reveal>
            <img src={heroImages.suite} alt="Private spa suite" />
          </div>
          <div className="suite-copy" data-reveal>
            <span>PRIVATE ESCAPE</span>
            <h2>Make the expensive option feel expensive.</h2>
            <p>
              The suite block is now treated like the premium product: private hydro bath, controlled lighting,
              optional massage, botanical facial and a slower checkout path.
            </p>
            <div className="suite-stats">
              <div><b>90</b><span>minutes</span></div>
              <div><b>2</b><span>guests</span></div>
              <div><b>4</b><span>add-ons</span></div>
            </div>
          </div>
        </section>

        <section className="reserve-section" id="reserve" data-reveal>
          <div>
            <span>BOOKING</span>
            <h2>Reserve the circuit, not just a time slot.</h2>
            <p>
              This is where you can connect a real booking form later. For now the buttons are clean contact CTAs
              that work on Vercel without backend setup.
            </p>
          </div>
          <div className="reserve-actions">
            <a className="solid-btn big" href="mailto:hello@aurawellnessspa.com">
              <CalendarDays size={17} /> Book by email
            </a>
            <a className="ghost-btn big" href="tel:+359880000000">
              Call reception
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-mark">A</span>
          <span>
            <b>AURA</b>
            <small>THERMAL HOUSE</small>
          </span>
        </div>
        <div>
          <b>Zones</b>
          <button type="button" onClick={() => scrollTo('thermal')}>Thermal</button>
          <button type="button" onClick={() => scrollTo('rituals')}>Rituals</button>
          <button type="button" onClick={() => scrollTo('suites')}>Suites</button>
        </div>
        <div>
          <b>Atmosphere</b>
          <p><Sparkles size={14} /> Editorial spa system</p>
          <p><Waves size={14} /> Water + heat routing</p>
          <p><Snowflake size={14} /> Contrast therapy</p>
        </div>
      </footer>
    </div>
  );
}
