import { useEffect, useMemo, useState } from 'react';
import './App.css';

import saunaFinnish from './assets/sauna-finnish.svg';
import woodSauna from './assets/wood-sauna.svg';
import steamRoom from './assets/steam-room.svg';
import infraredSauna from './assets/infrared.svg';
import saltSauna from './assets/salt-sauna.svg';
import poolImage from './assets/pool.svg';
import jacuzziImage from './assets/jacuzzi.svg';
import panoramicSauna from './assets/panoramic.svg';
import massageImage from './assets/massage.svg';
import facialImage from './assets/facial.svg';
import privateSuite from './assets/private-suite.svg';
import herbalSauna from './assets/herbal.svg';

const announcements = [
  'OPEN DAILY BY APPOINTMENT',
  'SAUNA · STEAM · POOL · JACUZZI · MASSAGE',
  'PRIVATE SPA SUITES AVAILABLE',
];

const saunaItems = [
  { id: 1, title: 'Traditional Finnish Sauna', category: 'Sauna', tag: 'Classic heat', temperature: '80–100°C · dry heat', description: 'Classic cedar heat for deep thermal contrast and full-body reset.', image: saunaFinnish },
  { id: 2, title: 'Wood-Burning Sauna', category: 'Sauna', tag: 'Heritage heat', temperature: '75–95°C · fire-heated', description: 'A slower, more atmospheric heat ritual with a natural timber aroma.', image: woodSauna },
  { id: 3, title: 'Steam Room', category: 'Steam', tag: 'Eucalyptus mist', temperature: '40–50°C · high humidity', description: 'Warm fog, softened breathing and a gentler approach to heat recovery.', image: steamRoom },
  { id: 4, title: 'Infrared Sauna', category: 'Sauna', tag: 'Radiant warmth', temperature: '45–60°C · infrared', description: 'Targeted warming that feels lighter while still supporting recovery.', image: infraredSauna },
  { id: 5, title: 'Salt Sauna', category: 'Thermal', tag: 'Mineral air', temperature: '45–70°C · mineral atmosphere', description: 'Salt-rich air adds a clean, restorative feeling to the sauna experience.', image: saltSauna },
  { id: 6, title: 'Herbal Steam Chamber', category: 'Steam', tag: 'Botanical steam', temperature: '42–48°C · infused herbs', description: 'Aromatic steam therapy layered with herbal notes and softer humidity.', image: herbalSauna },
  { id: 7, title: 'Indoor Recovery Pool', category: 'Pool', tag: 'Warm water', temperature: '34°C · hydro-relaxation', description: 'Gentle warm water designed for floating, unwinding and quiet recovery.', image: poolImage },
  { id: 8, title: 'Hydrotherapy Jacuzzi', category: 'Jacuzzi', tag: 'Private soak', temperature: '36–38°C · bubbling massage', description: 'Effervescent water pressure helps relax sore muscles after the heat circuit.', image: jacuzziImage },
  { id: 9, title: 'Panoramic Sauna', category: 'Sauna', tag: 'Scenic view', temperature: '70–90°C · elevated view', description: 'A wide-view room that combines slow heat with a more immersive environment.', image: panoramicSauna },
  { id: 10, title: 'Massage Therapy', category: 'Massage', tag: 'Hands-on reset', temperature: '50 min · custom pressure', description: 'Swedish and deep-tissue techniques tailored to stress, tension and posture.', image: massageImage },
  { id: 11, title: 'Aromatherapy Facial', category: 'Facials', tag: 'Glow ritual', temperature: '45 min · botanical care', description: 'A restoring skin ritual with cleansing, massage and a calming finish.', image: facialImage },
  { id: 12, title: 'Private Spa Suite', category: 'Jacuzzi', tag: 'Private room', temperature: '90 min · quiet escape', description: 'A secluded spa suite with jacuzzi, soft lighting and a calm lounge mood.', image: privateSuite },
];

const treatments = [
  { title: 'Thermal Spa Day Pass', eyebrow: 'Spa access', price: '$95', description: 'Indoor pool, steam room, dry sauna, jacuzzi and recovery lounge.', image: poolImage },
  { title: 'Nordic Sauna Circuit', eyebrow: 'Heat therapy', price: '$90', description: 'Guided heat ritual with dry sauna, cool towel reset and mineral hydration.', image: saunaFinnish },
  { title: 'Private Jacuzzi Escape', eyebrow: 'Private soak', price: '$145', description: 'Private warm soak with herbal tea, mood lighting and recovery time.', image: jacuzziImage },
];

const packages = [
  { icon: '≈', price: '$120', title: 'Full Thermal Circuit', description: 'Pool access, dry sauna, steam room, jacuzzi and quiet lounge recovery.' },
  { icon: '♧', price: '$150', title: 'Steam & Hammam Ritual', description: 'Steam chamber, body polish, warm rinse, botanical oil and herbal tea.' },
  { icon: '♡', price: '$260', title: 'Jacuzzi Escape for Two', description: 'Private jacuzzi time, synchronized bodywork and a calm recovery lounge.' },
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
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    reveals.forEach(el => observer.observe(el));

    const onScroll = () => {
      const bar = document.querySelector('.progress-bar');
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      reveals.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const filteredItems = useMemo(() => {
    return saunaItems.filter(item => {
      const categoryMatch =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Thermal' && ['Sauna', 'Steam', 'Pool', 'Jacuzzi', 'Thermal'].includes(item.category));

      const text = `${item.title} ${item.description} ${item.category} ${item.tag}`.toLowerCase();
      return categoryMatch && text.includes(search.toLowerCase());
    });
  }, [selectedCategory, search]);

  return (
    <div className={`app ${themeDark ? 'dark' : ''}`}>
      <div className="progress"><div className="progress-bar" /></div>

      <div className="top-strip">
        <div className="marquee">
          {announcements.concat(announcements).map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </div>

      <header className="header">
        <a href="#home" className="brand">
          <span className="brand-icon">✺</span>
          <span><strong>AURA</strong><small>WELLNESS SPA</small></span>
        </a>

        <nav className="nav" onMouseLeave={() => setActiveMenu(null)}>
          <button onMouseEnter={() => setActiveMenu('treatments')} className={activeMenu === 'treatments' ? 'active' : ''}>Treatments</button>
          <button onMouseEnter={() => setActiveMenu('booking')} className={activeMenu === 'booking' ? 'active' : ''}>Booking</button>
          <a href="#about">About</a>
          <a href="#sauna-library">Gallery</a>
          <a href="#footer">Contact</a>

          <div className={`mega-menu ${activeMenu === 'treatments' ? 'show' : ''}`}>
            <div><h4>Thermal circuit</h4><a href="#sauna-library">Sauna menu</a><a href="#facilities">Steam rooms</a><a href="#packages">Jacuzzi recovery</a></div>
            <div><h4>Body rituals</h4><a href="#treatments">Massage</a><a href="#treatments">Facials</a><a href="#about">Private suite</a></div>
            <aside><h4>Signature circuit</h4><p>Pool → sauna → steam → jacuzzi → recovery lounge.</p><a href="#booking">Plan a visit</a></aside>
          </div>

          <div className={`small-menu ${activeMenu === 'booking' ? 'show' : ''}`}>
            <a href="#booking">Book spa day</a>
            <a href="#booking">Reserve private suite</a>
          </div>
        </nav>

        <div className="actions">
          <button className="circle" onClick={() => setThemeDark(v => !v)}>☾</button>
          <a className="outline" href="#packages">Plan</a>
          <a className="book" href="#booking">Book now</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <p className="kicker">THERMAL RESORT CONCEPT</p>
            <h1>Quiet heat rooms, soft water and full-body recovery.</h1>
            <p>AURA is a premium wellness spa built around sauna rituals, steam rooms, indoor pools, private jacuzzis, massage therapy and slow recovery lounges.</p>
            <div className="hero-buttons">
              <a className="gold-btn" href="#booking">Book a spa day →</a>
              <a className="glass-btn" href="#treatments">Explore treatments</a>
            </div>
          </div>

          <div className="hero-image reveal">
            <img src={saunaFinnish} alt="Sauna room" />
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
          <p className="section-text">Filter the full menu by sauna, steam, jacuzzi, pool, massage or facial treatments.</p>

          <div className="filters">
            <div className="chips">
              {categories.map(category => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? 'active' : ''}>{category}</button>
              ))}
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rituals..." />
          </div>

          <div className="sauna-grid">
            {filteredItems.map((item, i) => (
              <article className={`sauna-card reveal ${i === 0 ? 'big' : ''}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="shade" />
                <div className="card-content">
                  <span className="tag">{item.tag}</span>
                  <b className="num">{String(i + 1).padStart(2, '0')}</b>
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
          <p className="section-text">A complete spa experience focused on water, heat, steam and hands-on recovery.</p>

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
          <img src={massageImage} alt="Massage therapy" />
          <div>
            <p className="kicker">THE AURA APPROACH</p>
            <h2>A complete spa escape, not just a treatment.</h2>
            <p>The experience is built as a full wellness circuit: warm pool, dry sauna, steam room, jacuzzi, treatment rooms and a quiet recovery lounge after every ritual.</p>
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
          <p className="section-text">AURA now feels like a full spa resort, not just a simple treatment page.</p>

          <div className="facilities">
            {[poolImage, saunaFinnish, steamRoom].map((img, i) => (
              <article className="facility reveal" key={i}>
                <img src={img} alt="" />
                <div className="shade" />
                <div>
                  <b className="num">0{i + 1}</b>
                  <h3>{['Indoor Pool', 'Dry Sauna', 'Steam Room'][i]}</h3>
                  <p>{['Warm water, soft lighting and slow poolside recovery.', 'Cedar heat, deep breathing and thermal contrast.', 'Eucalyptus mist, warm air and a softer reset.'][i]}</p>
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
            <span><strong>AURA</strong><small>WELLNESS SPA</small></span>
          </a>
          <p>Thermal pools, saunas, steam rooms, jacuzzis, massage therapy and calm recovery in a premium wellness space.</p>
        </div>
        <div><h4>Explore</h4><a href="#treatments">Treatments</a><a href="#booking">Booking</a><a href="#sauna-library">Gallery</a></div>
        <div><h4>Visit</h4><p>42 Willow Lane</p><p>Sofia Wellness District</p><p>Daily · 9 AM - 9 PM</p></div>
        <div><h4>Contact</h4><a href="tel:+359880000000">+359 88 000 0000</a><a href="mailto:hello@aurawellnessspa.com">hello@aurawellnessspa.com</a></div>
      </footer>
    </div>
  );
}
