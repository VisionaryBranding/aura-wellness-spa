import { useEffect, useMemo, useState } from 'react';
import './App.css';

const announcements = [
  'OPEN DAILY BY APPOINTMENT',
  'SAUNA · STEAM · POOL · JACUZZI · MASSAGE',
  'PRIVATE SPA SUITES AVAILABLE',
];

const heroLabels = [
  { id: '01', title: 'Sauna', className: 'top-left' },
  { id: '02', title: 'Steam', className: 'mid-right' },
  { id: '03', title: 'Jacuzzi', className: 'bottom-left' },
];

const saunaItems = [
  {
    id: 1,
    title: 'Traditional Finnish Sauna',
    category: 'Sauna',
    tag: 'Classic heat',
    temperature: '80–100°C · dry heat',
    description: 'Classic cedar heat for deep thermal contrast and full-body reset.',
    image:
      'https://images.unsplash.com/photo-1519834022362-c88f8b4ff8f2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Wood-Burning Sauna',
    category: 'Sauna',
    tag: 'Heritage heat',
    temperature: '75–95°C · fire-heated',
    description: 'A slower, more atmospheric heat ritual with a natural timber aroma.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Steam Room',
    category: 'Steam',
    tag: 'Eucalyptus mist',
    temperature: '40–50°C · high humidity',
    description: 'Warm fog, softened breathing and a gentler approach to heat recovery.',
    image:
      'https://images.unsplash.com/photo-1519822473476-5a8d4ec9f0d9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    title: 'Infrared Sauna',
    category: 'Sauna',
    tag: 'Radiant warmth',
    temperature: '45–60°C · infrared',
    description: 'Targeted warming that feels lighter while still supporting recovery.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    title: 'Salt Sauna',
    category: 'Thermal',
    tag: 'Mineral air',
    temperature: '45–70°C · mineral atmosphere',
    description: 'Salt-rich air adds a clean, restorative feeling to the sauna experience.',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    title: 'Herbal Steam Chamber',
    category: 'Steam',
    tag: 'Botanical steam',
    temperature: '42–48°C · infused herbs',
    description: 'Aromatic steam therapy layered with herbal notes and softer humidity.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    title: 'Indoor Recovery Pool',
    category: 'Pool',
    tag: 'Warm water',
    temperature: '34°C · hydro-relaxation',
    description: 'Gentle warm water designed for floating, unwinding and quiet recovery.',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    title: 'Cold Contrast Plunge',
    category: 'Pool',
    tag: 'Recovery shock',
    temperature: '8–12°C · contrast',
    description: 'A sharp refresh between heat sessions to increase contrast and clarity.',
    image:
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 9,
    title: 'Hydrotherapy Jacuzzi',
    category: 'Jacuzzi',
    tag: 'Private soak',
    temperature: '36–38°C · bubbling massage',
    description: 'Effervescent water pressure helps relax sore muscles after the heat circuit.',
    image:
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 10,
    title: 'Panoramic Sauna',
    category: 'Sauna',
    tag: 'Scenic view',
    temperature: '70–90°C · elevated view',
    description: 'A wide-view room that combines slow heat with a more immersive environment.',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 11,
    title: 'Massage Therapy',
    category: 'Massage',
    tag: 'Hands-on reset',
    temperature: '50 min · custom pressure',
    description: 'Swedish and deep-tissue techniques tailored to stress, tension and posture.',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 12,
    title: 'Aromatherapy Facial',
    category: 'Facials',
    tag: 'Glow ritual',
    temperature: '45 min · botanical care',
    description: 'A restoring skin ritual with cleansing, massage and a calming finish.',
    image:
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80',
  },
];

const treatmentHighlights = [
  {
    title: 'Thermal Spa Day Pass',
    eyebrow: 'Spa access',
    price: '$95',
    description: 'Access to the indoor pool, steam room, dry sauna, jacuzzi and quiet lounge.',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Nordic Sauna Circuit',
    eyebrow: 'Heat therapy',
    price: '$90',
    description: 'A guided heat ritual with dry sauna, cool towel reset and mineral hydration.',
    image:
      'https://images.unsplash.com/photo-1519834022362-c88f8b4ff8f2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Private Jacuzzi Escape',
    eyebrow: 'Private soak',
    price: '$145',
    description: 'A quieter private soak with herbal tea, mood lighting and recovery time.',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
  },
];

const packages = [
  {
    icon: 'waves',
    price: '$120',
    title: 'Full Thermal Circuit',
    description: 'Pool access, dry sauna, steam room, jacuzzi and quiet lounge recovery.',
  },
  {
    icon: 'leaf',
    price: '$150',
    title: 'Steam & Hammam Ritual',
    description: 'Steam chamber, body polish, warm rinse, botanical oil and herbal tea.',
  },
  {
    icon: 'heart',
    price: '$260',
    title: 'Jacuzzi Escape for Two',
    description: 'Private jacuzzi time, synchronized bodywork and a calm recovery lounge.',
  },
];

const facilities = [
  {
    id: '01',
    title: 'Indoor Pool',
    description: 'Warm water, soft lighting and slow poolside recovery.',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '02',
    title: 'Dry Sauna',
    description: 'Cedar heat, deep breathing and thermal contrast.',
    image:
      'https://images.unsplash.com/photo-1519834022362-c88f8b4ff8f2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '03',
    title: 'Steam Room',
    description: 'Eucalyptus mist, warm air and a softer reset.',
    image:
      'https://images.unsplash.com/photo-1519822473476-5a8d4ec9f0d9?auto=format&fit=crop&w=1000&q=80',
  },
];

const categories = ['All', 'Thermal', 'Sauna', 'Steam', 'Jacuzzi', 'Pool', 'Massage', 'Facials'];

function Icon({ name }) {
  switch (name) {
    case 'moon':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 3v4M16 3v4M4 10h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'waves':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8c2 2 4 2 6 0s4-2 6 0 4 2 4 2M4 14c2 2 4 2 6 0s4-2 6 0 4 2 4 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 4c-6.5 0-11 4.7-11 10.5A5.5 5.5 0 0 0 12.5 20C18.3 20 23 15.5 23 9c0-1.7-.3-3.4-1-5-.9.5-2.4 0-4 0Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 13c2.5-.2 5-1.6 7-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.6 4.8 13.8a4.8 4.8 0 0 1 6.8-6.8L12 7.4l.4-.4a4.8 4.8 0 0 1 6.8 6.8L12 20.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'logo':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 6v12M8.5 8.5c0 1.7 1.6 3 3.5 3s3.5-1.3 3.5-3M8.5 15.5c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3M8.2 12h7.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [themeDark, setThemeDark] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const progressBar = document.querySelector('.progress-bar');
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      reveals.forEach((element) => observer.unobserve(element));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('scroll', closeMenu, { passive: true });
    return () => window.removeEventListener('scroll', closeMenu);
  }, []);

  const filteredItems = useMemo(() => {
    return saunaItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory || (selectedCategory === 'Thermal' && ['Sauna', 'Steam', 'Pool', 'Jacuzzi'].includes(item.category));
      const haystack = `${item.title} ${item.description} ${item.category} ${item.tag}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className={`app-shell ${themeDark ? 'theme-dark' : ''}`}>
      <div className="progress-track">
        <div className="progress-bar" />
      </div>

      <header className="top-strip">
        <div className="marquee">
          {announcements.concat(announcements).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </header>

      <header className="main-header">
        <a href="#home" className="brand">
          <span className="brand-mark">
            <Icon name="logo" />
          </span>
          <span>
            <strong>AURA</strong>
            <small>WELLNESS SPA</small>
          </span>
        </a>

        <button className="mobile-toggle" onClick={() => setMobileNavOpen((value) => !value)} aria-label="Toggle navigation">
          <span />
          <span />
          <span />
        </button>

        <div className={`header-center ${mobileNavOpen ? 'open' : ''}`}>
          <nav className="nav-pill" onMouseLeave={() => setActiveMenu(null)}>
            <div
              className={`nav-item has-menu ${activeMenu === 'treatments' ? 'active' : ''}`}
              onMouseEnter={() => setActiveMenu('treatments')}
            >
              <button type="button" onClick={() => setActiveMenu(activeMenu === 'treatments' ? null : 'treatments')}>
                Treatments
              </button>
              <div className={`mega-menu ${activeMenu === 'treatments' ? 'show' : ''}`}>
                <div>
                  <h4>Thermal circuit</h4>
                  <a href="#sauna-library">Sauna menu</a>
                  <a href="#facilities">Steam rooms</a>
                  <a href="#packages">Jacuzzi recovery</a>
                </div>
                <div>
                  <h4>Body rituals</h4>
                  <a href="#treatments">Massage</a>
                  <a href="#treatments">Facials</a>
                  <a href="#about">Private suite</a>
                </div>
                <aside>
                  <h4>Signature circuit</h4>
                  <p>Pool → sauna → steam → jacuzzi → recovery lounge.</p>
                  <a href="#booking-cta">Plan a visit</a>
                </aside>
              </div>
            </div>

            <div
              className={`nav-item has-menu ${activeMenu === 'booking' ? 'active' : ''}`}
              onMouseEnter={() => setActiveMenu('booking')}
            >
              <button type="button" onClick={() => setActiveMenu(activeMenu === 'booking' ? null : 'booking')}>
                Booking
              </button>
              <div className={`small-menu ${activeMenu === 'booking' ? 'show' : ''}`}>
                <a href="#booking-cta">Book spa day</a>
                <a href="#booking-cta">Reserve private suite</a>
              </div>
            </div>

            <a className="nav-item" href="#about">About</a>
            <a className="nav-item" href="#sauna-library">Gallery</a>
            <a className="nav-item" href="#footer">Contact</a>
          </nav>
        </div>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setThemeDark((value) => !value)} aria-label="Toggle theme">
            <Icon name="moon" />
          </button>
          <a className="ghost-button" href="#packages">
            <Icon name="calendar" />
            <span>Plan</span>
          </a>
          <a className="solid-button" href="#booking-cta">Book now</a>
        </div>
      </header>

      <main>
        <section className="hero section-edge" id="home">
          <div className="hero-copy reveal">
            <p className="section-kicker">THERMAL RESORT CONCEPT</p>
            <h1>Quiet heat rooms, soft water and full-body recovery.</h1>
            <p className="hero-description">
              AURA is a premium wellness spa built around sauna rituals, steam rooms, indoor pools, private jacuzzis, massage therapy and slow recovery lounges.
            </p>
            <div className="hero-actions reveal">
              <a className="solid-button large" href="#booking-cta">
                <span>Book a spa day</span>
                <Icon name="arrow" />
              </a>
              <a className="ghost-outline" href="#treatments">Explore treatments</a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <img
              src="https://images.unsplash.com/photo-1519834022362-c88f8b4ff8f2?auto=format&fit=crop&w=1400&q=80"
              alt="Premium spa sauna room"
            />
            {heroLabels.map((label) => (
              <div className={`hero-label ${label.className}`} key={label.id}>
                <span>{label.id}</span>
                <strong>{label.title}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-band reveal">
          <article>
            <strong>15</strong>
            <span>sauna types</span>
          </article>
          <article>
            <strong>4</strong>
            <span>spa facility zones</span>
          </article>
          <article>
            <strong>4.9</strong>
            <span>guest rating</span>
          </article>
          <article>
            <strong>Daily</strong>
            <span>open by appointment</span>
          </article>
        </section>

        <section className="section reveal" id="sauna-library">
          <div className="section-heading">
            <div>
              <p className="section-kicker">SAUNA WORLD</p>
              <h2>Heat, water and recovery rituals.</h2>
              <p>Filter the full menu by sauna, steam, jacuzzi, pool, massage or facial treatments.</p>
            </div>
          </div>

          <div className="filter-bar reveal">
            <div className="chip-row">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`chip ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Icon name="search" />
              <input
                type="text"
                placeholder="Search rituals..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="sauna-grid">
            {filteredItems.map((item, index) => (
              <article className={`sauna-card reveal ${index === 0 ? 'featured' : ''}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="sauna-card-overlay" />
                <div className="sauna-card-content">
                  <span className="pill-tag">{item.tag}</span>
                  <div className="sauna-card-meta">
                    <span className="index-badge">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title}</h3>
                    <strong>{item.temperature}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="treatments">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">TREATMENTS</p>
              <h2>Saunas, pools, jacuzzis and massage.</h2>
              <p>A complete spa experience focused on water, heat, steam and hands-on recovery.</p>
            </div>
          </div>

          <div className="treatment-grid">
            {treatmentHighlights.map((item) => (
              <article className="treatment-card reveal" key={item.title}>
                <div className="treatment-image-wrap">
                  <img src={item.image} alt={item.title} />
                  <span className="pill-tag bright">{item.eyebrow}</span>
                </div>
                <div className="treatment-content">
                  <div className="title-row">
                    <h3>{item.title}</h3>
                    <strong>{item.price}</strong>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel reveal" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80"
              alt="Spa oil treatment"
            />
          </div>
          <div className="about-copy">
            <p className="section-kicker">THE AURA APPROACH</p>
            <h2>A complete spa escape, not just a treatment.</h2>
            <p>
              The experience is built as a full wellness circuit: warm pool, dry sauna, steam room, jacuzzi, treatment rooms and a quiet recovery lounge after every ritual.
            </p>
            <ul>
              <li>Dry sauna and eucalyptus steam</li>
              <li>Indoor pool and hydrotherapy jacuzzi</li>
              <li>Massage, facials and body rituals</li>
            </ul>
            <a className="soft-button" href="#footer">Learn our philosophy</a>
          </div>
        </section>

        <section className="section reveal" id="packages">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">PACKAGES</p>
              <h2>Build your spa day.</h2>
            </div>
          </div>

          <div className="package-grid">
            {packages.map((item) => (
              <article className="package-card reveal" key={item.title}>
                <span className="package-icon">
                  <Icon name={item.icon} />
                </span>
                <strong className="package-price">{item.price}</strong>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="facilities">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">SPA FACILITIES</p>
              <h2>Pools, heat rooms and quiet recovery spaces.</h2>
              <p>AURA now feels like a full spa resort, not just a simple treatment page.</p>
            </div>
          </div>

          <div className="facility-grid">
            {facilities.map((item) => (
              <article className="facility-card reveal" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="facility-overlay" />
                <div className="facility-copy">
                  <span className="index-badge">{item.id}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-cta reveal" id="booking-cta">
          <div>
            <p className="section-kicker">PRIVATE SUITES · SPA DAYS · RITUAL PACKAGES</p>
            <h2>Ready to book your escape?</h2>
            <p>
              Reserve a full spa day, plan a couple’s visit or build your own custom heat and water circuit.
            </p>
          </div>
          <div className="booking-actions">
            <a className="solid-button large" href="mailto:hello@aurawellnessspa.com">Book by email</a>
            <a className="ghost-outline dark" href="tel:+359880000000">Call now</a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-brand">
          <a href="#home" className="brand footer-logo">
            <span className="brand-mark">
              <Icon name="logo" />
            </span>
            <span>
              <strong>AURA</strong>
              <small>WELLNESS SPA</small>
            </span>
          </a>
          <p>Thermal pools, saunas, steam rooms, jacuzzis, massage therapy and calm recovery in a premium wellness space.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <a href="#treatments">Treatments</a>
          <a href="#booking-cta">Booking</a>
          <a href="#sauna-library">Gallery</a>
        </div>

        <div>
          <h4>Visit</h4>
          <p>42 Willow Lane</p>
          <p>Sofia Wellness District</p>
          <p>Daily · 9 AM - 9 PM</p>
        </div>

        <div>
          <h4>Contact</h4>
          <a href="tel:+359880000000">+359 88 000 0000</a>
          <a href="mailto:hello@aurawellnessspa.com">hello@aurawellnessspa.com</a>
          <a href="#booking-cta">Reserve appointment</a>
        </div>
      </footer>
    </div>
  );
}
