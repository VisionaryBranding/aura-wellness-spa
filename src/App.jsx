import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import './App.css';

const heroImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85';
const moodImage = 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=85';
const suiteImage = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85';

const treatments = [
  ['Finnish Sauna', 'High dry heat, timber walls, clean Nordic recovery.', '/assets/sauna-finnish.svg', 'Heat'],
  ['Wood Sauna', 'A heavier fire-led ritual with deeper atmosphere.', '/assets/wood-sauna.svg', 'Heat'],
  ['Infrared Room', 'Lower-air heat for slower recovery sessions.', '/assets/infrared.svg', 'Heat'],
  ['Salt Sauna', 'Mineral air, softer temperature, calmer breathing.', '/assets/salt-sauna.svg', 'Heat'],
  ['Herbal Steam', 'Botanical mist with eucalyptus and low light.', '/assets/herbal.svg', 'Steam'],
  ['Steam Room', 'Humidity, warmth and complete decompression.', '/assets/steam-room.svg', 'Steam'],
  ['Thermal Pool', 'Warm floating recovery between heat stages.', '/assets/pool.svg', 'Water'],
  ['Hydro Jacuzzi', 'Jet pressure for legs, back and shoulders.', '/assets/jacuzzi.svg', 'Water'],
  ['Body Massage', 'Hands-on tension release after the thermal circuit.', '/assets/massage.svg', 'Care'],
  ['Botanical Facial', 'Cleanse, massage and hydration in a quiet room.', '/assets/facial.svg', 'Care'],
  ['Panoramic Lounge', 'Post-treatment tea lounge with open views.', '/assets/panoramic.svg', 'Lounge'],
  ['Private Suite', 'Private jacuzzi, heat, care and extended rest.', '/assets/private-suite.svg', 'Suites'],
];

const routes = [
  { code: '01', title: 'Heat Reset', steps: 'Finnish sauna → steam → cold rinse → lounge tea', time: '75 min' },
  { code: '02', title: 'Deep Recovery', steps: 'Infrared → massage → salt room → thermal pool', time: '110 min' },
  { code: '03', title: 'Private Escape', steps: 'Private suite → jacuzzi → facial → quiet lounge', time: '140 min' },
];

const nav = [
  ['Index', 'home'],
  ['Thermal', 'thermal'],
  ['Rituals', 'rituals'],
  ['Suites', 'suites'],
  ['Reserve', 'reserve'],
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.8,
      syncTouch: false,
      normalizeWheel: true,
    });

    lenisRef.current = lenis;
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add('lenis-ready');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis-ready');
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const filters = useMemo(() => ['All', ...new Set(treatments.map((item) => item[3]))], []);
  const visibleTreatments = activeFilter === 'All'
    ? treatments
    : treatments.filter((item) => item[3] === activeFilter);

  const goTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    lenisRef.current?.scrollTo(target, {
      offset: -76,
      duration: 1.65,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  };

  return (
    <div className="site-shell">
      <div className="progress-bar" />

      <header className="nav-wrap">
        <button className="brand" type="button" onClick={() => goTo('home')}>
          <span>A</span>
          <strong>AURA <em>Thermal House</em></strong>
        </button>
        <nav aria-label="Main navigation">
          {nav.map(([label, id]) => (
            <button key={id} type="button" onClick={() => goTo(id)}>{label}</button>
          ))}
        </nav>
      </header>

      <main id="home">
        <section className="hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="kicker">Wellness architecture / Sofia</p>
            <h1>
              <span>No more basic</span>
              <span>spa template.</span>
            </h1>
            <p className="hero-text">
              AURA is rebuilt as a darker, sharper thermal house: huge typography, framed spaces,
              real ritual routes and proper Lenis inertia scrolling.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => goTo('thermal')}>Explore thermal rooms</button>
              <button type="button" onClick={() => goTo('reserve')}>Reserve visit</button>
            </div>
          </div>
          <figure className="hero-media" data-reveal>
            <img src={heroImage} alt="Minimal spa treatment room" />
            <figcaption>
              <span>Open daily</span>
              <strong>09:00 — 22:30</strong>
            </figcaption>
          </figure>
        </section>

        <section className="metrics" data-reveal>
          <article><strong>12</strong><span>Thermal zones</span></article>
          <article><strong>03</strong><span>Curated routes</span></article>
          <article><strong>140</strong><span>Max private minutes</span></article>
          <article><strong>Lenis</strong><span>Inertia scroll active</span></article>
        </section>

        <section className="manifesto" data-reveal>
          <div>
            <p className="kicker">Design concept</p>
            <h2>Sharp, calm, premium — not another rounded-card spa site.</h2>
          </div>
          <p>
            The layout uses hard edges, editorial type, darker contrast and asymmetry so the site feels
            like a designed brand system instead of a generic wellness landing page.
          </p>
        </section>

        <section className="thermal-section" id="thermal">
          <div className="section-head" data-reveal>
            <p className="kicker">Thermal library</p>
            <h2>Pick the zone, then build the ritual.</h2>
            <div className="filter-row">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="treatment-grid">
            {visibleTreatments.map(([title, desc, icon, type], index) => (
              <article className="treatment-card" key={title} data-reveal style={{ '--delay': `${index * 35}ms` }}>
                <div className="card-index">{String(index + 1).padStart(2, '0')}</div>
                <img src={icon} alt="" />
                <span>{type}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <button type="button">View ritual</button>
              </article>
            ))}
          </div>
        </section>

        <section className="split-story" id="rituals" data-reveal>
          <figure>
            <img src={moodImage} alt="Steam and calm spa interior" />
          </figure>
          <div>
            <p className="kicker">Ritual routes</p>
            <h2>Not services thrown in a grid. Actual paths through heat, water and care.</h2>
            <div className="route-list">
              {routes.map((route) => (
                <article key={route.code}>
                  <span>{route.code}</span>
                  <div>
                    <h3>{route.title}</h3>
                    <p>{route.steps}</p>
                  </div>
                  <strong>{route.time}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="suite-panel" id="suites" data-reveal>
          <div>
            <p className="kicker">Private suite</p>
            <h2>For couples, solo resets and higher-value bookings.</h2>
            <p>
              A private path with jacuzzi, treatment room, quiet seating and optional facial/massage add-ons.
            </p>
            <button type="button" onClick={() => goTo('reserve')}>Reserve private suite</button>
          </div>
          <figure>
            <img src={suiteImage} alt="Private spa suite" />
          </figure>
        </section>

        <section className="ticker" aria-hidden="true" data-reveal>
          <p>SAUNA · STEAM · JACUZZI · MASSAGE · FACIAL · POOL · PRIVATE SUITE · RECOVERY LOUNGE · </p>
        </section>

        <section className="reserve" id="reserve" data-reveal>
          <p className="kicker">Reserve</p>
          <h2>Make the CTA feel like part of the brand.</h2>
          <div className="reserve-actions">
            <a href="mailto:hello@aurawellnessspa.com">Book by email</a>
            <a href="tel:+359880000000">Call now</a>
          </div>
        </section>
      </main>

      <footer>
        <strong>AURA Thermal House</strong>
        <span>Sofia wellness district · hello@aurawellnessspa.com</span>
      </footer>
    </div>
  );
}
