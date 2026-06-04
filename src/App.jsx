import { useEffect, useMemo, useState } from 'react';
import './App.css';

const img = {
  hero: 'https://unsplash.com/photos/p8VTUqQLLjM/download?force=true&w=1800',
  saunaHeater: 'https://unsplash.com/photos/hyL_9mPquhc/download?force=true&w=1600',
  hotTubRoom: 'https://unsplash.com/photos/xa2Q7-KkRjY/download?force=true&w=1600',
  poolIndoor: 'https://unsplash.com/photos/i1wR9DiCABc/download?force=true&w=1600',
  poolLarge: 'https://unsplash.com/photos/Dt5oTgvVNjM/download?force=true&w=1600',
  steamRoom: 'https://unsplash.com/photos/9qYFu1NzpS8/download?force=true&w=1600',
  saunaPeople: 'https://unsplash.com/photos/S3DQDLWe_Ps/download?force=true&w=1600',
  saunaGroup: 'https://unsplash.com/photos/kNEYWuBM3C4/download?force=true&w=1600',
  hotTubOutside: 'https://unsplash.com/photos/qcaGGizzoow/download?force=true&w=1600',
  saunaBucket: 'https://unsplash.com/photos/NRZ1bc4h9ME/download?force=true&w=1600',
  jacuzziTub: 'https://unsplash.com/photos/qWcK3pZpwmE/download?force=true&w=1600',
  saunaNew: 'https://unsplash.com/photos/hgOUf_hY4ok/download?force=true&w=1600',
};

const announcements = [
  'OPEN DAILY BY APPOINTMENT',
  'SAUNA · STEAM · POOL · JACUZZI · MASSAGE',
  'PRIVATE SPA SUITES AVAILABLE',
];

const saunaItems = [
  {
    id: 1,
    title: 'Modern Finnish Sauna',
    category: 'Sauna',
    tag: 'Classic heat',
    temperature: '80–100°C · dry heat',
    description: 'Cedar warmth, hot stones and a calm room made for deep thermal contrast.',
    image: img.hero,
  },
  {
    id: 2,
    title: 'Stone Heater Sauna',
    category: 'Sauna',
    tag: 'Heat therapy',
    temperature: '75–95°C · stone heat',
    description: 'A premium wooden sauna with a stone heater and soft architectural lighting.',
    image: img.saunaHeater,
  },
  {
    id: 3,
    title: 'Private Hot Tub Room',
    category: 'Jacuzzi',
    tag: 'Private soak',
    temperature: '36–38°C · warm soak',
    description: 'A quiet wooden spa room with a tiled hot tub, natural light and slow recovery.',
    image: img.hotTubRoom,
  },
  {
    id: 4,
    title: 'Indoor Spa Pool',
    category: 'Pool',
    tag: 'Spa access',
    temperature: '34°C · hydro recovery',
    description: 'Warm water, calm lighting and poolside recovery after sauna or steam.',
    image: img.poolIndoor,
  },
  {
    id: 5,
    title: 'Modern Steam Room',
    category: 'Steam',
    tag: 'Steam ritual',
    temperature: '40–50°C · high humidity',
    description: 'Ambient stone, soft steam and a slower reset for breathing and recovery.',
    image: img.steamRoom,
  },
  {
    id: 6,
    title: 'Sauna Social Ritual',
    category: 'Sauna',
    tag: 'Group heat',
    temperature: '70–90°C · shared sauna',
    description: 'A social sauna ritual with a relaxed, steamy wellness-room atmosphere.',
    image: img.saunaPeople,
  },
  {
    id: 7,
    title: 'Nordic Group Sauna',
    category: 'Sauna',
    tag: 'Nordic ritual',
    temperature: '70–95°C · timber room',
    description: 'A warm wooden room built around stones, steam and slow conversation.',
    image: img.saunaGroup,
  },
  {
    id: 8,
    title: 'Outdoor Hot Tub',
    category: 'Jacuzzi',
    tag: 'Outdoor soak',
    temperature: '38°C · open air',
    description: 'A secluded wooden hot tub made for outdoor recovery and quiet weekends.',
    image: img.hotTubOutside,
  },
  {
    id: 9,
    title: 'Bucket & Ladle Sauna',
    category: 'Sauna',
    tag: 'Traditional',
    temperature: '75–90°C · water on stones',
    description: 'Classic sauna accessories, hot stones and a darker Nordic heat mood.',
    image: img.saunaBucket,
  },
  {
    id: 10,
    title: 'Luxury Jacuzzi Tub',
    category: 'Jacuzzi',
    tag: 'Spa suite',
    temperature: 'Private room · warm water',
    description: 'A refined hotel-style jacuzzi corner with wood, curtains and warm light.',
    image: img.jacuzziTub,
  },
  {
    id: 11,
    title: 'Indoor Recovery Pool',
    category: 'Pool',
    tag: 'Pool lounge',
    temperature: '34°C · quiet swim',
    description: 'A clean indoor pool experience for floating, cooling down and relaxing.',
    image: img.poolLarge,
  },
  {
    id: 12,
    title: 'New Sauna Studio',
    category: 'Sauna',
    tag: 'Modern room',
    temperature: '80°C · soft glow',
    description: 'A minimal wood sauna with clean benches, heater and modern finish.',
    image: img.saunaNew,
  },
];

const treatments = [
  {
    title: 'Thermal Spa Day Pass',
    eyebrow: 'Spa access',
    price: '$95',
    description: 'Access to indoor pool, steam room, dry sauna, jacuzzi and recovery lounge.',
    image: img.poolIndoor,
  },
  {
    title: 'Nordic Sauna Circuit',
    eyebrow: 'Heat therapy',
    price: '$90',
    description: 'Guided dry sauna, stone heater session, cool towel reset and mineral hydration.',
    image: img.hero,
  },
  {
    title: 'Private Jacuzzi Escape',
    eyebrow: 'Private soak',
    price: '$145',
    description: 'A private warm soak with quiet lighting, soft towels and recovery time.',
    image: img.hotTubRoom,
  },
];

const packages = [
  { icon: '≈', price: '$120', title: 'Full Thermal Circuit', description: 'Pool access, dry sauna, steam room, jacuzzi and quiet lounge recovery.' },
  { icon: '♧', price: '$150', title: 'Steam & Sauna Ritual', description: 'Steam chamber, dry heat, warm rinse, botanical oil and herbal tea.' },
  { icon: '♡', price: '$260', title: 'Jacuzzi Escape for Two', description: 'Private jacuzzi time, synchronized bodywork and a calm recovery lounge.' },
];

const facilities = [
  { id: '01', title: 'Indoor Pool', description: 'Warm water, soft lighting and slow poolside recovery.', image: img.poolLarge },
  { id: '02', title: 'Dry Sauna', description: 'Cedar heat, deep breathing and thermal contrast.', image: img.hero },
  { id: '03', title: 'Steam Room', description: 'Ambient steam, warm air and a softer reset.', image: img.steamRoom },
];

const categories = ['All', 'Thermal', 'Sauna', 'Steam', 'Jacuzzi', 'Pool', 'Massage', 'Facials'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [themeDark, setThemeDark] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(element => observer.observe(element));

    const handleScroll = () => {
      const bar = document.querySelector('.progress-bar');
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      if (bar) bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      reveals.forEach(element => observer.unobserve(element));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredItems = useMemo(() => {
    return saunaItems.filter(item => {
      const categoryMatch =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Thermal' && ['Sauna', 'Steam', 'Pool', 'Jacuzzi'].includes(item.category));

      const textMatch = `${item.title} ${item.description} ${item.category} ${item.tag}`.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && textMatch;
    });
  }, [selectedCategory, search]);

  return (
    <div className={`app ${themeDark ? 'dark' : ''}`}>
      <div className="progress"><div className="progress-bar" /></div>

      <div className="top-strip">
        <div className="marquee">
          {announcements.concat(announcements).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-icon">✺</span>
          <span>
            <strong>AURA</strong>
            <small>WELLNESS SPA</small>
          </span>
        </a>

        <nav className="nav" onMouseLeave={() => setActiveMenu(null)}>
          <button
            type="button"
            onMouseEnter={() => setActiveMenu('treatments')}
            onClick={() => setActiveMenu(activeMenu === 'treatments' ? null : 'treatments')}
            className={activeMenu === 'treatments' ? 'active' : ''}
          >
            Treatments
          </button>

          <button
            type="button"
            onMouseEnter={() => setActiveMenu('booking')}
            onClick={() => setActiveMenu(activeMenu === 'booking' ? null : 'booking')}
            className={activeMenu === 'booking' ? 'active' : ''}
          >
            Booking
          </button>

          <a href="#about">About</a>
          <a href="#sauna-library">Gallery</a>
          <a href="#footer">Contact</a>

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
              <a href="#booking">Plan a visit</a>
            </aside>
          </div>

          <div className={`small-menu ${activeMenu === 'booking' ? 'show' : ''}`}>
            <a href="#booking">Book spa day</a>
            <a href="#booking">Reserve private suite</a>
          </div>
        </nav>

        <div className="actions">
          <button className="circle" type="button" onClick={() => setThemeDark(value => !value)}>☾</button>
          <a className="outline" href="#packages">Plan</a>
          <a className="book" href="#booking">Book now</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <p className="kicker">THERMAL RESORT CONCEPT</p>
            <h1>Quiet heat rooms, soft water and full-body recovery.</h1>
            <p>
              AURA is a premium wellness spa built around sauna rituals, steam rooms, indoor pools, private jacuzzis,
              massage therapy and slow recovery lounges.
            </p>
            <div className="hero-buttons">
              <a className="gold-btn" href="#booking">Book a spa day →</a>
              <a className="glass-btn" href="#treatments">Explore treatments</a>
            </div>
          </div>

          <div className="hero-image reveal">
            <img src={img.hero} alt="Modern wooden sauna interior" />
            <span className="floating-card one"><b>01</b> Sauna</span>
            <span className="floating-card two"><b>02</b> Steam</span>
            <span className="floating-card three"><b>03</b> Jacuzzi</span>
          </div>
        </section>

        <section className="stats reveal">
          <article><strong>15</strong><span>sauna types</span></article>
          <article><strong>4</strong><span>spa facility zones</span></article>
          <article><strong>4.9</strong><span>guest rating</span></article>
          <article><strong>Daily</strong><span>open by appointment</span></article>
        </section>

        <section className="section reveal" id="sauna-library">
          <p className="kicker">SAUNA WORLD</p>
          <h2>Heat, water and recovery rituals.</h2>
          <p className="section-text">
            Filter the full menu by sauna, steam, jacuzzi, pool, massage or facial treatments.
          </p>

          <div className="filters">
            <div className="chips">
              {categories.map(category => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'active' : ''}
                >
                  {category}
                </button>
              ))}
            </div>
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search rituals..."
            />
          </div>

          <div className="sauna-grid">
            {filteredItems.map((item, index) => (
              <article className={`sauna-card reveal ${index === 0 ? 'big' : ''}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="shade" />
                <div className="card-content">
                  <span className="tag">{item.tag}</span>
                  <b className="num">{String(index + 1).padStart(2, '0')}</b>
                  <h3>{item.title}</h3>
                  <strong>{item.temperature}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="treatments">
          <p className="kicker">TREATMENTS</p>
          <h2>Saunas, pools, jacuzzis and massage.</h2>
          <p className="section-text">
            A complete spa experience focused on water, heat, steam and hands-on recovery.
          </p>

          <div className="treatments">
            {treatments.map(item => (
              <article className="treatment-card reveal" key={item.title}>
                <div className="treatment-image">
                  <img src={item.image} alt={item.title} />
                  <span className="tag light">{item.eyebrow}</span>
                </div>
                <div className="treatment-info">
                  <h3>{item.title}</h3>
                  <strong>{item.price}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about reveal" id="about">
          <img src={img.jacuzziTub} alt="Luxury jacuzzi spa suite" />
          <div>
            <p className="kicker">THE AURA APPROACH</p>
            <h2>A complete spa escape, not just a treatment.</h2>
            <p>
              The experience is built as a full wellness circuit: warm pool, dry sauna, steam room, jacuzzi,
              treatment rooms and a quiet recovery lounge after every ritual.
            </p>
            <ul>
              <li>✓ Dry sauna and eucalyptus steam</li>
              <li>✓ Indoor pool and hydrotherapy jacuzzi</li>
              <li>✓ Massage, facials and body rituals</li>
            </ul>
            <a className="gold-btn" href="#footer">Learn our philosophy</a>
          </div>
        </section>

        <section className="section reveal" id="packages">
          <p className="kicker">PACKAGES</p>
          <h2>Build your spa day.</h2>

          <div className="packages">
            {packages.map(item => (
              <article className="package reveal" key={item.title}>
                <span>{item.icon}</span>
                <strong>{item.price}</strong>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="facilities">
          <p className="kicker">SPA FACILITIES</p>
          <h2>Pools, heat rooms and quiet recovery spaces.</h2>
          <p className="section-text">
            AURA now feels like a full spa resort, not just a simple treatment page.
          </p>

          <div className="facilities">
            {facilities.map(item => (
              <article className="facility reveal" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="shade" />
                <div>
                  <b className="num">{item.id}</b>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking reveal" id="booking">
          <div>
            <p className="kicker">PRIVATE SUITES · SPA DAYS · RITUAL PACKAGES</p>
            <h2>Ready to book your escape?</h2>
            <p>Reserve a full spa day, plan a couple’s visit or build your own custom heat and water circuit.</p>
          </div>
          <div className="booking-actions">
            <a className="book" href="mailto:hello@aurawellnessspa.com">Book by email</a>
            <a className="outline" href="tel:+359880000000">Call now</a>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div>
          <a href="#home" className="brand">
            <span className="brand-icon gold">✺</span>
            <span>
              <strong>AURA</strong>
              <small>WELLNESS SPA</small>
            </span>
          </a>
          <p>
            Thermal pools, saunas, steam rooms, jacuzzis, massage therapy and calm recovery in a premium wellness space.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#treatments">Treatments</a>
          <a href="#booking">Booking</a>
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
        </div>
      </footer>
    </div>
  );
}
