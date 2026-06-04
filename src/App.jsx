import { useEffect, useMemo, useState } from 'react';
import './App.css';

const images = {
  hero: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80',
  saunaInterior: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1600&q=80',
  stoneSauna: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80',
  steam: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80',
  pool: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=80',
  plungePool: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
  jacuzzi: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
  massage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
  facial: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80',
  lounge: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
  suite: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  outdoor: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
};

const announcements = [
  'AURA THERMAL HOUSE · SOFIA',
  'SAUNA · STEAM · POOL · BODY RITUALS',
  'PRIVATE SUITES · BY APPOINTMENT',
  'SHARP EDITORIAL REDESIGN',
];

const categories = ['All', 'Thermal', 'Sauna', 'Steam', 'Pool', 'Jacuzzi', 'Massage', 'Facials'];

const saunaItems = [
  {
    id: 1,
    title: 'Finnish Heat Room',
    category: 'Sauna',
    tag: 'Classic dry heat',
    temp: '80–100°C',
    description: 'A cedar-lined room built around hot stones, low light and a slower, cleaner heat ritual.',
    image: images.saunaInterior,
  },
  {
    id: 2,
    title: 'Stone Heater Sauna',
    category: 'Sauna',
    tag: 'Nordic ritual',
    temp: '75–95°C',
    description: 'A sharper, more architectural sauna focused on stones, timber lines and controlled steam bursts.',
    image: images.stoneSauna,
  },
  {
    id: 3,
    title: 'Steam Chamber',
    category: 'Steam',
    tag: 'Soft humidity',
    temp: '40–50°C',
    description: 'Warm humidity, eucalyptus atmosphere and a gentler reset after intense heat.',
    image: images.steam,
  },
  {
    id: 4,
    title: 'Indoor Recovery Pool',
    category: 'Pool',
    tag: 'Warm water',
    temp: '34°C',
    description: 'A calm interior pool for contrast therapy, slow floating and post-sauna recovery.',
    image: images.pool,
  },
  {
    id: 5,
    title: 'Cold Plunge Basin',
    category: 'Pool',
    tag: 'Contrast dip',
    temp: '8–14°C',
    description: 'A colder, sharper recovery tool used between heat rounds for thermal contrast.',
    image: images.plungePool,
  },
  {
    id: 6,
    title: 'Hydrotherapy Jacuzzi',
    category: 'Jacuzzi',
    tag: 'Pressure jets',
    temp: '36–38°C',
    description: 'Private or shared bubbling recovery with body pressure relief and warm water calm.',
    image: images.jacuzzi,
  },
  {
    id: 7,
    title: 'Deep Tissue Massage',
    category: 'Massage',
    tag: 'Hands-on reset',
    temp: '50 min',
    description: 'A performance-focused massage ritual targeting shoulders, legs and lower back tension.',
    image: images.massage,
  },
  {
    id: 8,
    title: 'Botanical Facial',
    category: 'Facials',
    tag: 'Skin ritual',
    temp: '45 min',
    description: 'A calming facial built around cleansing, massage and hydration.',
    image: images.facial,
  },
];

const treatments = [
  {
    title: 'Thermal Day Pass',
    label: 'Access',
    price: '$95',
    image: images.pool,
    description: 'Indoor pool, sauna, steam room, jacuzzi access and a quiet recovery lounge.',
  },
  {
    title: 'Sauna Circuit',
    label: 'Heat',
    price: '$120',
    image: images.stoneSauna,
    description: 'Three heat stages with cold contrast, hydration and guided pacing.',
  },
  {
    title: 'Private Suite Escape',
    label: 'Suite',
    price: '$210',
    image: images.suite,
    description: 'A private room with jacuzzi, seating lounge, towels and recovery tea service.',
  },
];

const packages = [
  {
    index: '01',
    title: 'FULL CIRCUIT',
    price: '$120',
    description: 'Pool, sauna, steam room, jacuzzi and lounge recovery in one flow.',
  },
  {
    index: '02',
    title: 'STEAM + MASSAGE',
    price: '$165',
    description: 'Steam chamber, bodywork session and slower recovery with tea service.',
  },
  {
    index: '03',
    title: 'PRIVATE FOR TWO',
    price: '$260',
    description: 'Private suite, jacuzzi session and a quieter couples spa experience.',
  },
];

const facilities = [
  {
    id: 'A',
    title: 'HEAT ROOMS',
    text: 'Timber interiors, sharp detailing and controlled thermal zones.',
    image: images.saunaInterior,
  },
  {
    id: 'B',
    title: 'WATER SPACES',
    text: 'Warm pools, plunge contrast and hydro recovery built into the circuit.',
    image: images.jacuzzi,
  },
  {
    id: 'C',
    title: 'QUIET LOUNGES',
    text: 'Low-noise recovery spaces for cooling down, tea service and soft decompression.',
    image: images.lounge,
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const scrollContainer = document.querySelector('.smooth-scroll-content');
    if (!scrollContainer) return;

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let animationFrame = null;
    let isRunning = false;

    const setBodyHeight = () => {
      document.body.style.height = `${scrollContainer.getBoundingClientRect().height}px`;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const render = () => {
      currentScroll += (targetScroll - currentScroll) * 0.085;

      if (Math.abs(targetScroll - currentScroll) < 0.08) {
        currentScroll = targetScroll;
      }

      scrollContainer.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;

      if (Math.abs(targetScroll - currentScroll) > 0.08) {
        animationFrame = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startRender = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = clamp(targetScroll + event.deltaY * 1.05, 0, maxScroll);

      window.scrollTo(0, targetScroll);
      startRender();
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      startRender();
    };

    const handleResize = () => {
      setBodyHeight();
      targetScroll = clamp(targetScroll, 0, document.body.scrollHeight - window.innerHeight);
      currentScroll = clamp(currentScroll, 0, document.body.scrollHeight - window.innerHeight);
      startRender();
    };

    const handleKeydown = (event) => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      if (event.key === 'ArrowDown') {
        targetScroll = clamp(targetScroll + 90, 0, maxScroll);
        window.scrollTo(0, targetScroll);
        startRender();
      }

      if (event.key === 'ArrowUp') {
        targetScroll = clamp(targetScroll - 90, 0, maxScroll);
        window.scrollTo(0, targetScroll);
        startRender();
      }

      if (event.key === 'PageDown') {
        targetScroll = clamp(targetScroll + window.innerHeight * 0.85, 0, maxScroll);
        window.scrollTo(0, targetScroll);
        startRender();
      }

      if (event.key === 'PageUp') {
        targetScroll = clamp(targetScroll - window.innerHeight * 0.85, 0, maxScroll);
        window.scrollTo(0, targetScroll);
        startRender();
      }

      if (event.key === 'Home') {
        targetScroll = 0;
        window.scrollTo(0, targetScroll);
        startRender();
      }

      if (event.key === 'End') {
        targetScroll = maxScroll;
        window.scrollTo(0, targetScroll);
        startRender();
      }
    };

    window.__auraSmoothScrollTo = (top) => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = clamp(top, 0, maxScroll);
      window.scrollTo(0, targetScroll);
      startRender();
    };

    setBodyHeight();
    scrollContainer.classList.add('smooth-ready');
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      document.body.style.height = '';
      scrollContainer.style.transform = '';
      scrollContainer.classList.remove('smooth-ready');
      delete window.__auraSmoothScrollTo;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);


  useEffect(() => {
    const revealTargets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.14 }
    );

    revealTargets.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const doc = document.documentElement;
      const height = doc.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      revealTargets.forEach((element) => observer.unobserve(element));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredItems = useMemo(() => {
    return saunaItems.filter((item) => {
      const categoryMatch =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Thermal' && ['Sauna', 'Steam', 'Pool', 'Jacuzzi'].includes(item.category));

      const searchMatch = `${item.title} ${item.description} ${item.tag} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight + 24 : 24;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    if (window.__auraSmoothScrollTo) {
      window.__auraSmoothScrollTo(y);
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setActiveMenu(null);
  };

  const handleNavLink = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className={`app-shell theme-${theme}`}>
      <div className="progress-track">
        <div className="progress-bar" />
      </div>

      <div className="top-strip">
        <div className="marquee">
          {announcements.concat(announcements).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" onClick={(event) => handleNavLink(event, 'home')}>
          <span className="brand-mark">A</span>
          <span>
            <strong>AURA</strong>
            <small>WELLNESS SPA</small>
          </span>
        </a>

        <nav className="nav-frame" onMouseLeave={() => setActiveMenu(null)}>
          <button
            type="button"
            className={activeMenu === 'treatments' ? 'nav-active' : ''}
            onMouseEnter={() => setActiveMenu('treatments')}
            onClick={() => setActiveMenu(activeMenu === 'treatments' ? null : 'treatments')}
          >
            Treatments
          </button>
          <button
            type="button"
            className={activeMenu === 'booking' ? 'nav-active' : ''}
            onMouseEnter={() => setActiveMenu('booking')}
            onClick={() => setActiveMenu(activeMenu === 'booking' ? null : 'booking')}
          >
            Booking
          </button>
          <a href="#about" onClick={(event) => handleNavLink(event, 'about')}>About</a>
          <a href="#library" onClick={(event) => handleNavLink(event, 'library')}>Library</a>
          <a href="#footer" onClick={(event) => handleNavLink(event, 'footer')}>Contact</a>

          <div className={`mega-panel ${activeMenu === 'treatments' ? 'show' : ''}`}>
            <div>
              <h4>THERMAL</h4>
              <a href="#library" onClick={(event) => handleNavLink(event, 'library')}>Sauna library</a>
              <a href="#facilities" onClick={(event) => handleNavLink(event, 'facilities')}>Heat and water spaces</a>
              <a href="#packages" onClick={(event) => handleNavLink(event, 'packages')}>Packages</a>
            </div>
            <div>
              <h4>BODYWORK</h4>
              <a href="#treatments" onClick={(event) => handleNavLink(event, 'treatments')}>Massage rituals</a>
              <a href="#treatments" onClick={(event) => handleNavLink(event, 'treatments')}>Facials</a>
              <a href="#about" onClick={(event) => handleNavLink(event, 'about')}>Philosophy</a>
            </div>
            <aside>
              <span>Signature route</span>
              <p>Pool → sauna → steam → jacuzzi → quiet lounge.</p>
              <button type="button" onClick={() => scrollToSection('booking')}>Plan a visit</button>
            </aside>
          </div>

          <div className={`small-panel ${activeMenu === 'booking' ? 'show' : ''}`}>
            <a href="#booking" onClick={(event) => handleNavLink(event, 'booking')}>Book spa day</a>
            <a href="#booking" onClick={(event) => handleNavLink(event, 'booking')}>Reserve private suite</a>
          </div>
        </nav>

        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? 'DARK' : 'LIGHT'}
          </button>
          <button type="button" className="utility-button" onClick={() => scrollToSection('packages')}>PLAN</button>
          <button type="button" className="cta-button" onClick={() => scrollToSection('booking')}>BOOK NOW</button>
        </div>
      </header>

      <div className="smooth-scroll-content">
      <main>
        <section className="hero-grid" id="home">
          <div className="hero-copy reveal">
            <p className="section-kicker">THERMAL HOUSE / SOFIA</p>
            <h1>Sharper spaces, cleaner heat and a less-template spa feel.</h1>
            <p className="hero-text">
              AURA is redesigned as a more editorial wellness brand: stronger layout, harder edges, smoother scrolling
              and a premium circuit of sauna, steam, pool, jacuzzi and body rituals.
            </p>
            <div className="hero-actions">
              <button type="button" className="cta-button" onClick={() => scrollToSection('booking')}>
                BOOK A SPA DAY
              </button>
              <button type="button" className="ghost-button" onClick={() => scrollToSection('treatments')}>
                EXPLORE TREATMENTS
              </button>
            </div>
          </div>

          <div className="hero-visual reveal">
            <img src={images.hero} alt="Premium spa exterior with water" />
            <div className="hero-badge hero-badge-top">
              <span>01</span>
              <strong>Sauna</strong>
            </div>
            <div className="hero-badge hero-badge-mid">
              <span>02</span>
              <strong>Steam</strong>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <span>03</span>
              <strong>Jacuzzi</strong>
            </div>
          </div>
        </section>

        <section className="metric-band reveal">
          <article>
            <strong>15</strong>
            <span>heat experiences</span>
          </article>
          <article>
            <strong>04</strong>
            <span>facility zones</span>
          </article>
          <article>
            <strong>4.9</strong>
            <span>guest rating</span>
          </article>
          <article>
            <strong>DAILY</strong>
            <span>appointment only</span>
          </article>
        </section>

        <section className="section editorial-intro reveal" id="treatments">
          <div className="intro-copy">
            <p className="section-kicker">TREATMENTS</p>
            <h2>Heat, water and recovery rituals.</h2>
            <p>
              Filter the spa library by sauna, steam, water and recovery treatments. The layout is sharper and more
              editorial, with less rounded UI and stronger image-led sections.
            </p>
          </div>
          <div className="intro-aside">
            <span>New direction</span>
            <p>Harder corners · more asymmetry · smoother scroll · less template energy.</p>
          </div>
        </section>

        <section className="filter-bar reveal" id="library">
          <div className="chip-row">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={selectedCategory === category ? 'chip active' : 'chip'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search rituals..."
            />
          </div>
        </section>

        <section className="library-grid">
          {filteredItems.map((item, index) => (
            <article key={item.id} className={`library-card reveal ${index === 0 ? 'feature' : ''}`}>
              <img src={item.image} alt={item.title} />
              <div className="card-overlay" />
              <div className="card-copy">
                <span className="card-tag">{item.tag}</span>
                <div className="card-index">{String(index + 1).padStart(2, '0')}</div>
                <h3>{item.title}</h3>
                <strong>{item.temp}</strong>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="treatment-grid section">
          {treatments.map((item) => (
            <article key={item.title} className="treatment-card reveal">
              <div className="treatment-media">
                <img src={item.image} alt={item.title} />
                <span>{item.label}</span>
              </div>
              <div className="treatment-copy">
                <div className="treatment-head">
                  <h3>{item.title}</h3>
                  <strong>{item.price}</strong>
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="about-block reveal" id="about">
          <div className="about-media">
            <img src={images.massage} alt="Massage therapy room" />
          </div>
          <div className="about-copy">
            <p className="section-kicker">AURA APPROACH</p>
            <h2>A spa that feels designed, not dropped from a template.</h2>
            <p>
              The new concept leans more luxury-editorial than generic spa template. Layouts are cleaner, corners are
              sharper, imagery is bolder and every section feels more intentional.
            </p>
            <ul>
              <li>Dry sauna, steam room and hydrotherapy flow</li>
              <li>Pool recovery, quiet lounges and private suite booking</li>
              <li>Massage and facial rituals layered into the circuit</li>
            </ul>
            <button type="button" className="cta-button" onClick={() => scrollToSection('footer')}>
              LEARN THE PHILOSOPHY
            </button>
          </div>
        </section>

        <section className="section" id="packages">
          <div className="editorial-intro reveal compact-gap">
            <div className="intro-copy compact-width">
              <p className="section-kicker">PACKAGES</p>
              <h2>Build your spa day.</h2>
            </div>
          </div>

          <div className="package-grid">
            {packages.map((item) => (
              <article key={item.index} className="package-card reveal">
                <span className="package-index">{item.index}</span>
                <strong>{item.price}</strong>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="facilities">
          <div className="editorial-intro reveal compact-gap">
            <div className="intro-copy compact-width">
              <p className="section-kicker">FACILITIES</p>
              <h2>Pools, heat rooms and quiet recovery spaces.</h2>
            </div>
          </div>

          <div className="facility-grid">
            {facilities.map((item) => (
              <article key={item.id} className="facility-card reveal">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay" />
                <div className="facility-copy">
                  <span>{item.id}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-block reveal" id="booking">
          <div>
            <p className="section-kicker">BOOKING</p>
            <h2>Ready to book your escape?</h2>
            <p>
              Reserve a full spa day, build a custom thermal route or book a private suite experience.
            </p>
          </div>
          <div className="booking-actions">
            <a className="cta-button link-button" href="mailto:hello@aurawellnessspa.com">BOOK BY EMAIL</a>
            <a className="utility-button link-button" href="tel:+359880000000">CALL NOW</a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-brand">
          <a className="brand" href="#home" onClick={(event) => handleNavLink(event, 'home')}>
            <span className="brand-mark">A</span>
            <span>
              <strong>AURA</strong>
              <small>WELLNESS SPA</small>
            </span>
          </a>
          <p>
            Sauna, steam, pool, jacuzzi, massage therapy and quiet recovery, reworked with a sharper editorial layout.
          </p>
        </div>

        <div>
          <h4>EXPLORE</h4>
          <a href="#treatments" onClick={(event) => handleNavLink(event, 'treatments')}>Treatments</a>
          <a href="#packages" onClick={(event) => handleNavLink(event, 'packages')}>Packages</a>
          <a href="#booking" onClick={(event) => handleNavLink(event, 'booking')}>Booking</a>
        </div>

        <div>
          <h4>VISIT</h4>
          <p>42 Willow Lane</p>
          <p>Sofia Wellness District</p>
          <p>Daily / 9 AM — 9 PM</p>
        </div>

        <div>
          <h4>CONTACT</h4>
          <a href="tel:+359880000000">+359 88 000 0000</a>
          <a href="mailto:hello@aurawellnessspa.com">hello@aurawellnessspa.com</a>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
