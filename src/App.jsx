import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ArrowUpRight, CalendarDays, Droplets, Flame, Heart, Leaf, Menu, Moon, Search, Sparkles, Sun, Waves, X } from 'lucide-react';
import './App.css';

const heroImages = {
  hero: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=85',
  lounge: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
  suite: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=85',
  pool: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1800&q=85',
  massage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=85',
  exterior: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85',
};

const treatments = [
  { id: '01', title: 'Finnish Sauna', category: 'Heat', time: '25 min', intensity: 'High heat', icon: '/assets/sauna-finnish.svg', image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1400&q=85', desc: 'Classic dry heat, cedar texture, stone steam bursts and deep contrast recovery.' },
  { id: '02', title: 'Wood Sauna', category: 'Heat', time: '30 min', intensity: 'Deep timber heat', icon: '/assets/wood-sauna.svg', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85', desc: 'A darker, warmer sauna route with heavier atmosphere and slower breathing.' },
  { id: '03', title: 'Infrared Room', category: 'Heat', time: '35 min', intensity: 'Soft heat', icon: '/assets/infrared.svg', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85', desc: 'Lower temperature radiant heat for calm sweat, fatigue reset and quiet recovery.' },
  { id: '04', title: 'Salt Sauna', category: 'Heat', time: '20 min', intensity: 'Mineral air', icon: '/assets/salt-sauna.svg', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85', desc: 'Salt wall ambience, dry warmth and a cleaner respiratory ritual.' },
  { id: '05', title: 'Herbal Sauna', category: 'Heat', time: '25 min', intensity: 'Botanical steam', icon: '/assets/herbal.svg', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=85', desc: 'Aromatics, botanical bowls and softer thermal rhythm for a less intense session.' },
  { id: '06', title: 'Steam Room', category: 'Steam', time: '18 min', intensity: 'Humidity', icon: '/assets/steam-room.svg', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=85', desc: 'Dense mist, eucalyptus air and low light after sauna or massage.' },
  { id: '07', title: 'Thermal Pool', category: 'Water', time: 'Open', intensity: 'Warm float', icon: '/assets/pool.svg', image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85', desc: 'Slow movement, warm water and post-heat decompression.' },
  { id: '08', title: 'Hydro Jacuzzi', category: 'Water', time: '20 min', intensity: 'Jet pressure', icon: '/assets/jacuzzi.svg', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=85', desc: 'Pressure jets for lower back, shoulders and legs after thermal stages.' },
  { id: '09', title: 'Panoramic Rest', category: 'Lounge', time: 'Open', intensity: 'Quiet', icon: '/assets/panoramic.svg', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85', desc: 'A low-noise recovery zone with tea service and mountain-style framing.' },
  { id: '10', title: 'Body Massage', category: 'Treatment', time: '50 min', intensity: 'Hands-on', icon: '/assets/massage.svg', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=85', desc: 'Tension release, circulation focus and deeper body reset.' },
  { id: '11', title: 'Botanical Facial', category: 'Treatment', time: '40 min', intensity: 'Calming', icon: '/assets/facial.svg', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85', desc: 'Cleanse, sculpting massage and hydration in a slower treatment room.' },
  { id: '12', title: 'Private Suite', category: 'Private', time: '90 min', intensity: 'Exclusive', icon: '/assets/private-suite.svg', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85', desc: 'Couples booking, private jacuzzi, robe service and extended recovery time.' },
];

const ritualRoutes = [
  { tag: 'R01', title: 'The Clean Heat Route', text: 'Finnish sauna → thermal pool → steam room → quiet tea lounge.', icon: Flame },
  { tag: 'R02', title: 'Deep Recovery Route', text: 'Wood sauna → hydro jacuzzi → body massage → panoramic rest.', icon: Waves },
  { tag: 'R03', title: 'Skin + Calm Route', text: 'Herbal sauna → steam room → botanical facial → lounge cooldown.', icon: Leaf },
  { tag: 'R04', title: 'Private Evening Route', text: 'Private suite → jacuzzi → massage → slow suite recovery.', icon: Moon },
];

const navItems = [
  { label: 'Concept', id: 'concept' },
  { label: 'Treatments', id: 'treatments' },
  { label: 'Routes', id: 'routes' },
  { label: 'Private', id: 'private' },
  { label: 'Book', id: 'book' },
];

const categories = ['All', 'Heat', 'Steam', 'Water', 'Treatment', 'Private', 'Lounge'];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set());
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const filteredTreatments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return treatments.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const text = `${item.title} ${item.category} ${item.intensity} ${item.desc}`.toLowerCase();
      const searchMatch = !normalizedQuery || text.includes(normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    setMenuOpen(false);
    const headerHeight = document.querySelector('.site-nav')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { duration: 1.15 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const jump = (event, id) => {
    event.preventDefault();
    window.history.pushState(null, '', `#${id}`);
    scrollTo(id);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`aura-site ${theme}`}>
      <div className="scroll-progress" />

      <header className="site-nav">
        <a className="brand" href="#home" onClick={(event) => jump(event, 'home')}>
          <span className="brand-mark">A</span>
          <span>
            <strong>AURA</strong>
            <small>Wellness Spa</small>
          </span>
        </a>

        <nav className={menuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => jump(event, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="theme-button" type="button" onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button className="book-button" type="button" onClick={() => scrollTo('book')}>
            Book now <ArrowUpRight size={16} />
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero-grid" data-reveal>
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Thermal house / Sofia</div>
            <h1>Heat, water, silence — rebuilt like a luxury ritual.</h1>
            <p>
              Aura is redesigned as a sharper wellness destination with editorial layouts, inertia scrolling, treatment filters,
              hover motion, private-suite upsells and a stronger premium identity.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary" onClick={() => scrollTo('treatments')}>Explore treatments</button>
              <button type="button" className="secondary" onClick={() => scrollTo('routes')}>Build a route</button>
            </div>
          </div>

          <div className="hero-media parallax-card">
            <img src={heroImages.hero} alt="Dark luxury spa pool" />
            <div className="floating-panel panel-one"><span>01</span><strong>SAUNA</strong></div>
            <div className="floating-panel panel-two"><span>02</span><strong>STEAM</strong></div>
            <div className="floating-panel panel-three"><span>03</span><strong>RECOVER</strong></div>
          </div>
        </section>

        <section className="metrics" data-reveal>
          <article><strong>12</strong><span>Signature spaces</span></article>
          <article><strong>04</strong><span>Guided routes</span></article>
          <article><strong>90m</strong><span>Private suite ritual</span></article>
          <article><strong>Lenis</strong><span>Momentum scrolling</span></article>
        </section>

        <section className="concept-section" id="concept" data-reveal>
          <div className="section-kicker">Concept</div>
          <div className="concept-copy">
            <h2>Less template. More atmosphere.</h2>
            <p>
              The old soft spa look is replaced by harder lines, glassy surfaces, huge type, image-led cards and a darker thermal-house mood.
              It feels more like a high-end destination than a random service list.
            </p>
          </div>
          <div className="concept-media"><img src={heroImages.lounge} alt="Aura quiet lounge" /></div>
          <div className="concept-note">
            <span>Design language</span>
            <p>Architectural blocks, editorial spacing, tactile hover effects and cleaner conversion points.</p>
          </div>
        </section>

        <section className="treatments-head" id="treatments" data-reveal>
          <div>
            <div className="section-kicker">Treatments</div>
            <h2>Choose your thermal layer.</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sauna, pool, facial..." />
          </label>
        </section>

        <section className="filter-row" data-reveal>
          {categories.map((category) => (
            <button key={category} type="button" className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </section>

        <section className="treatment-grid">
          {filteredTreatments.map((item, index) => (
            <article className={`treatment-card ${index === 0 ? 'feature' : ''}`} key={item.id} data-reveal>
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <button type="button" className={favorites.has(item.id) ? 'favorite saved' : 'favorite'} onClick={() => toggleFavorite(item.id)} aria-label={`Favorite ${item.title}`}>
                  <Heart size={17} fill="currentColor" />
                </button>
              </div>
              <div className="card-content">
                <div className="card-topline">
                  <span>{item.id}</span>
                  <img src={item.icon} alt="" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="card-meta">
                  <span>{item.category}</span>
                  <span>{item.time}</span>
                  <span>{item.intensity}</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="routes-section" id="routes" data-reveal>
          <div className="routes-intro">
            <div className="section-kicker">Routes</div>
            <h2>Don’t just list services. Sell sequences.</h2>
            <p>
              These route cards make the site feel smarter. Visitors can instantly understand what kind of visit they should book.
            </p>
          </div>
          <div className="route-cards">
            {ritualRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <article key={route.tag}>
                  <Icon size={22} />
                  <span>{route.tag}</span>
                  <h3>{route.title}</h3>
                  <p>{route.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="private-section" id="private" data-reveal>
          <div className="private-image"><img src={heroImages.suite} alt="Private suite" /></div>
          <div className="private-copy">
            <div className="section-kicker">Private Suite</div>
            <h2>Higher-ticket booking, finally given its own stage.</h2>
            <p>
              The private suite is framed as a premium escape instead of a tiny extra service. Better for couples, birthdays,
              quiet evenings and gift bookings.
            </p>
            <div className="private-stats">
              <article><strong>90</strong><span>minutes</span></article>
              <article><strong>2</strong><span>guests</span></article>
              <article><strong>€210</strong><span>from</span></article>
            </div>
            <button type="button" className="primary" onClick={() => scrollTo('book')}>Reserve suite</button>
          </div>
        </section>

        <section className="marquee" aria-hidden="true" data-reveal>
          <p>SAUNA · STEAM · THERMAL POOL · HYDRO JACUZZI · MASSAGE · FACIAL · PRIVATE SUITE · QUIET LOUNGE · </p>
        </section>

        <section className="booking-section" id="book" data-reveal>
          <div>
            <div className="section-kicker">Booking</div>
            <h2>Make the page convert instead of only looking pretty.</h2>
            <p>
              Clear CTA buttons, visible contact routes, service framing, search/filtering and premium private-suite placement are all built in.
            </p>
          </div>
          <div className="booking-card">
            <div><CalendarDays size={22} /><span>Open daily by appointment</span></div>
            <div><Droplets size={22} /><span>Heat, water and recovery rituals</span></div>
            <a className="primary" href="mailto:hello@aurawellnessspa.com">Book by email</a>
            <a className="secondary" href="tel:+359880000000">Call now</a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home" onClick={(event) => jump(event, 'home')}>
          <span className="brand-mark">A</span>
          <span><strong>AURA</strong><small>Wellness Spa</small></span>
        </a>
        <div>
          <a href="#concept" onClick={(event) => jump(event, 'concept')}>Concept</a>
          <a href="#treatments" onClick={(event) => jump(event, 'treatments')}>Treatments</a>
          <a href="#routes" onClick={(event) => jump(event, 'routes')}>Routes</a>
          <a href="#book" onClick={(event) => jump(event, 'book')}>Booking</a>
        </div>
        <p>42 Willow Lane · Sofia Wellness District · hello@aurawellnessspa.com</p>
      </footer>
    </div>
  );
}
