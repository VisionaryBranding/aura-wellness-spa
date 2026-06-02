import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Flame,
  Flower2,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  SunMedium,
  Waves,
  X
} from "lucide-react";

const FALLBACK = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85";

const saunaImage = (query) => `https://source.unsplash.com/1400x1000/?${query}`;

const SAUNA_TYPES = [
  { id: "finnish", name: "Traditional Finnish Sauna", category: "Classic", temp: "80–100°C · dry heat", vibe: "Classic cedar heat, hot stones, löyly steam and deep sweating.", image: saunaImage("finnish-sauna,wood-sauna") },
  { id: "wood", name: "Wood-Burning Sauna", category: "Classic", temp: "75–95°C · fire-heated", vibe: "Rustic heat from a real stove with cabin energy and soft smoke notes.", image: saunaImage("wood-burning-sauna,cabin-sauna") },
  { id: "electric", name: "Electric Sauna", category: "Modern", temp: "70–95°C · controlled dry heat", vibe: "Clean, reliable and easy to control for a premium city spa setup.", image: saunaImage("modern-sauna,electric-sauna") },
  { id: "infrared", name: "Infrared Sauna", category: "Recovery", temp: "45–60°C · radiant warmth", vibe: "Lower air temperature with a gentler recovery-focused warmth.", image: saunaImage("infrared-sauna,wellness") },
  { id: "smoke", name: "Smoke Sauna", category: "Traditional", temp: "70–90°C · old-world ritual", vibe: "Traditional chimneyless heat, aired before use for a deep smoky atmosphere.", image: saunaImage("smoke-sauna,traditional-sauna") },
  { id: "steam", name: "Steam Room", category: "Steam", temp: "40–50°C · high humidity", vibe: "Soft misty heat for breathing, skin softness and slow decompression.", image: saunaImage("steam-room,spa") },
  { id: "bio", name: "Bio Sauna", category: "Gentle", temp: "50–65°C · gentle humidity", vibe: "A softer sauna for guests who want warmth without maximum intensity.", image: saunaImage("bio-sauna,relaxation-room") },
  { id: "aroma", name: "Aromatherapy Sauna", category: "Botanical", temp: "60–80°C · essential oils", vibe: "Dry heat paired with eucalyptus, lavender, cedar or citrus aromatics.", image: saunaImage("aromatherapy-sauna,eucalyptus-spa") },
  { id: "herbal", name: "Herbal Sauna", category: "Botanical", temp: "50–75°C · herbal vapor", vibe: "Botanical steam and warm air create a calmer ritual-style heat room.", image: saunaImage("herbal-sauna,botanical-spa") },
  { id: "salt", name: "Salt Sauna", category: "Mineral", temp: "45–70°C · mineral atmosphere", vibe: "Salt walls or salt air create a clean mineral spa atmosphere.", image: saunaImage("salt-sauna,salt-room") },
  { id: "barrel", name: "Barrel Sauna", category: "Outdoor", temp: "70–95°C · outdoor heat", vibe: "A compact outdoor sauna with a curved wooden shape and cozy heat.", image: saunaImage("barrel-sauna,outdoor-sauna") },
  { id: "panoramic", name: "Panoramic Sauna", category: "Luxury", temp: "70–90°C · scenic view", vibe: "Large glass views, quiet heat and a more premium visual experience.", image: saunaImage("panoramic-sauna,glass-sauna") },
  { id: "banya", name: "Russian Banya", category: "Cultural", temp: "70–100°C · steam ritual", vibe: "Hot humid sessions often paired with venik branch rituals and cool resets.", image: saunaImage("russian-banya,steam-bath") },
  { id: "hammam", name: "Turkish Hammam", category: "Cultural", temp: "40–50°C · bathing ritual", vibe: "Steam, warm stone, washing and body polish inside a tiled chamber.", image: saunaImage("turkish-hammam,spa") },
  { id: "jjimjilbang", name: "Korean Jjimjilbang", category: "Cultural", temp: "45–90°C · themed rooms", vibe: "Korean bathhouse culture with kiln rooms, heated floors and social recovery.", image: saunaImage("korean-sauna,jjimjilbang") }
];

const TREATMENTS = [
  { id: 1, name: "Thermal Spa Day Pass", category: "Thermal", price: 95, duration: "3 hours", badge: "Spa access", image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85", description: "Access to the indoor pool, steam room, dry sauna, jacuzzi and recovery lounge.", includes: ["Indoor pool", "Steam room", "Dry sauna", "Jacuzzi"] },
  { id: 2, name: "Finnish Dry Sauna", category: "Sauna", price: 55, duration: "35 min", badge: "Classic heat", image: saunaImage("finnish-sauna,wood-sauna"), description: "A classic dry heat room designed for deep warmth, sweating and quiet decompression.", includes: ["Dry heat", "Cedar room", "Cold towels", "Mineral water"] },
  { id: 3, name: "Nordic Sauna Circuit", category: "Sauna", price: 90, duration: "55 min", badge: "Heat therapy", image: saunaImage("nordic-sauna,sauna") , description: "A guided heat ritual with dry sauna, cool towel reset and mineral hydration.", includes: ["Dry sauna", "Cold towels", "Recovery lounge", "Mineral water"] },
  { id: 4, name: "Panoramic Sauna Suite", category: "Sauna", price: 115, duration: "60 min", badge: "Private view", image: saunaImage("panoramic-sauna,glass-sauna"), description: "A private sauna room with soft lighting, towels, water service and quiet seating.", includes: ["Private sauna", "Robe service", "Quiet seating", "Hydration"] },
  { id: 5, name: "Herbal Aroma Sauna", category: "Sauna", price: 75, duration: "45 min", badge: "Botanical heat", image: saunaImage("aromatherapy-sauna,eucalyptus-spa"), description: "Warm dry heat paired with rosemary, eucalyptus and cedar aromatics.", includes: ["Herbal aroma", "Dry sauna", "Cool towel", "Tea"] },
  { id: 6, name: "Infrared Recovery Sauna", category: "Sauna", price: 80, duration: "40 min", badge: "Recovery", image: saunaImage("infrared-sauna,recovery"), description: "Lower-temperature heat designed for muscle relaxation and post-workout recovery.", includes: ["Infrared heat", "Recovery towels", "Mineral water", "Quiet room"] },
  { id: 7, name: "Eucalyptus Steam Room", category: "Steam", price: 60, duration: "30 min", badge: "Breathing ritual", image: saunaImage("steam-room,eucalyptus-spa"), description: "Warm eucalyptus mist for breathing, skin softness and slow decompression.", includes: ["Eucalyptus mist", "Steam room", "Cold towels", "Hydration"] },
  { id: 8, name: "Hammam Body Polish", category: "Steam", price: 135, duration: "75 min", badge: "Steam ritual", image: saunaImage("turkish-hammam,spa"), description: "Steam, black soap cleanse, full-body polish and warm rinse for a clean spa reset.", includes: ["Steam room", "Body polish", "Warm rinse", "Body oil"] },
  { id: 9, name: "Salt Steam Chamber", category: "Steam", price: 70, duration: "35 min", badge: "Mineral mist", image: saunaImage("salt-room,spa"), description: "A mineral steam experience with soft salt air and gentle heat.", includes: ["Salt steam", "Warm mist", "Quiet room", "Mineral water"] },
  { id: 10, name: "Private Jacuzzi Suite", category: "Jacuzzi", price: 160, duration: "75 min", badge: "Private soak", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85", description: "Private warm-water hydrotherapy with low light, robe service and calm seating.", includes: ["Private jacuzzi", "Robe service", "Low lighting", "Mineral water"] },
  { id: 11, name: "Indoor Thermal Pool", category: "Pool", price: 70, duration: "90 min", badge: "Pool access", image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85", description: "Warm indoor pool access with soft lighting, towels and poolside loungers.", includes: ["Indoor pool", "Loungers", "Towels", "Water service"] },
  { id: 12, name: "Deep Calm Massage", category: "Massage", price: 115, duration: "60 min", badge: "Tension relief", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=85", description: "Slow pressure, breath-led pacing and warm oil to release shoulders, back and nervous system tension.", includes: ["Deep pressure", "Warm oil", "Neck focus", "Quiet room"] },
  { id: 13, name: "Botanical Glow Facial", category: "Facials", price: 130, duration: "70 min", badge: "Glow", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85", description: "A hydrating facial with sculpting massage, botanical masks and a luminous calming finish.", includes: ["Cleanse", "Sculpting massage", "Hydration mask", "SPF finish"] },
  { id: 14, name: "Full Wellness Escape", category: "Thermal", price: 310, duration: "Half day", badge: "Complete day", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85", description: "Pool, sauna, jacuzzi, steam room, massage and facial combined into one premium spa escape.", includes: ["Pool access", "Sauna circuit", "Massage", "Facial"] }
];

const CATEGORIES = ["All", "Thermal", "Sauna", "Steam", "Jacuzzi", "Pool", "Massage", "Facials"];

const GALLERY = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
  saunaImage("luxury-sauna,spa"),
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  saunaImage("steam-room,hammam"),
  saunaImage("outdoor-barrel-sauna")
];

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(TREATMENTS[0]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [booking, setBooking] = useState([]);
  const [theme, setTheme] = useState("light");

  const filtered = useMemo(() => {
    return TREATMENTS.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch = `${item.name} ${item.category} ${item.description} ${item.includes.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const bookingCount = booking.reduce((sum, item) => sum + item.qty, 0);
  const bookingTotal = booking.reduce((sum, item) => sum + item.qty * item.price, 0);

  function goTo(next) {
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openTreatment(item) {
    setSelected(item);
    goTo("detail");
  }

  function addToBooking(item) {
    setBooking((items) => {
      const existing = items.find((bookingItem) => bookingItem.id === item.id);
      if (existing) return items.map((bookingItem) => bookingItem.id === item.id ? { ...bookingItem, qty: bookingItem.qty + 1 } : bookingItem);
      return [...items, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, change) {
    setBooking((items) => items.map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item).filter((item) => item.qty > 0));
  }

  return (
    <div className={`site ${theme === "dark" ? "darkMode" : ""}`}>
      <TopNotice />
      <Header page={page} goTo={goTo} bookingCount={bookingCount} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} theme={theme} setTheme={setTheme} />
      <main>
        {page === "home" && <HomePage goTo={goTo} setCategory={setCategory} openTreatment={openTreatment} addToBooking={addToBooking} />}
        {page === "treatments" && <TreatmentsPage category={category} setCategory={setCategory} query={query} setQuery={setQuery} items={filtered} openTreatment={openTreatment} addToBooking={addToBooking} />}
        {page === "detail" && <DetailPage item={selected} goTo={goTo} addToBooking={addToBooking} />}
        {page === "booking" && <BookingPage booking={booking} total={bookingTotal} updateQty={updateQty} goTo={goTo} />}
        {page === "about" && <AboutPage />}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer goTo={goTo} />
    </div>
  );
}

function TopNotice() {
  return <div className="topNotice"><span>Open daily by appointment</span><span>Sauna · Steam · Pool · Jacuzzi · Massage</span><span>Private spa suites available</span></div>;
}

function Header({ page, goTo, bookingCount, mobileOpen, setMobileOpen, theme, setTheme }) {
  const nav = [["home", "Home"], ["treatments", "Treatments"], ["booking", "Booking"], ["about", "About"], ["gallery", "Gallery"], ["contact", "Contact"]];
  return (
    <header className="header">
      <div className="container headerInner">
        <button className="brand" onClick={() => goTo("home")}>
          <span className="brandMark"><Flower2 size={24} /></span>
          <span><strong>AURA</strong><small>Wellness Spa</small></span>
        </button>
        <nav className="desktopNav">
          <div className={`navItem ${page === "treatments" ? "activeItem" : ""}`}>
            <span className="navTrigger" tabIndex="0">Treatments</span>
            <div className="megaMenu">
              <div><strong>Thermal circuit</strong><button onClick={() => { goTo("treatments"); }}>Sauna menu</button><button onClick={() => { goTo("treatments"); }}>Steam rooms</button><button onClick={() => { goTo("treatments"); }}>Jacuzzi recovery</button></div>
              <div><strong>Body rituals</strong><button onClick={() => goTo("treatments")}>Massage</button><button onClick={() => goTo("treatments")}>Facials</button><button onClick={() => goTo("booking")}>Private suite</button></div>
              <div className="megaFeature"><strong>Signature circuit</strong><p>Pool → sauna → steam → jacuzzi → recovery lounge.</p><button onClick={() => goTo("booking")}>Plan a visit</button></div>
            </div>
          </div>
          <div className={`navItem ${page === "booking" ? "activeItem" : ""}`}><span className="navTrigger" tabIndex="0">Booking</span><div className="miniMenu"><button onClick={() => goTo("booking")}>Book spa day</button><button onClick={() => goTo("booking")}>Reserve private suite</button></div></div>
          <div className={`navItem ${page === "about" ? "activeItem" : ""}`}><span className="navTrigger" tabIndex="0">About</span><div className="miniMenu"><button onClick={() => goTo("about")}>Our philosophy</button><button onClick={() => goTo("about")}>Thermal etiquette</button></div></div>
          <button className={page === "gallery" ? "active" : ""} onClick={() => goTo("gallery")}>Gallery</button>
          <button className={page === "contact" ? "active" : ""} onClick={() => goTo("contact")}>Contact</button>
        </nav>
        <div className="headerActions">
          <button className="iconButton" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle theme">{theme === "light" ? <Moon size={19} /> : <SunMedium size={19} />}</button>
          <button className="bookingChip" onClick={() => goTo("booking")}><ShoppingBag size={18} /><span>Plan</span>{bookingCount > 0 && <b>{bookingCount}</b>}</button>
          <button className="bookNow" onClick={() => goTo("booking")}>Book now</button>
          <button className="mobileButton" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
        </div>
      </div>
      {mobileOpen && <div className="mobileLayer"><div className="mobilePanel"><div className="mobilePanelTop"><strong>AURA Wellness</strong><button onClick={() => setMobileOpen(false)}><X size={22} /></button></div>{nav.map(([id, label]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}</div></div>}
    </header>
  );
}

function HomePage({ goTo, setCategory, openTreatment, addToBooking }) {
  const featured = [TREATMENTS[0], TREATMENTS[2], TREATMENTS[9]];
  return (
    <>
      <section className="hero">
        <div className="heroOrbs" />
        <div className="container heroGrid">
          <div className="heroCopy reveal">
            <div className="eyebrow">Thermal resort concept</div>
            <h1>Quiet heat rooms, soft water and full-body recovery.</h1>
            <p>AURA is a premium wellness spa built around sauna rituals, steam rooms, indoor pools, private jacuzzis, massage therapy and slow recovery lounges.</p>
            <div className="heroActions"><button className="primaryBtn" onClick={() => goTo("booking")}>Book a spa day <ArrowRight size={18} /></button><button className="secondaryBtn" onClick={() => goTo("treatments")}>Explore treatments</button></div>
          </div>
          <div className="cleanHeroVisual">
            <div className="cleanHeroStage">
              <img src="https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1600&q=85" alt="Luxury sauna" onError={(e) => { e.currentTarget.src = FALLBACK; }} />
              <div className="glassPanel panelSauna"><span>01</span><strong>Sauna</strong></div>
              <div className="glassPanel panelSteam"><span>02</span><strong>Steam</strong></div>
              <div className="glassPanel panelJacuzzi"><span>03</span><strong>Jacuzzi</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="container statsPanel reveal"><article><strong>15</strong><span>sauna types</span></article><article><strong>4</strong><span>spa facility zones</span></article><article><strong>4.9</strong><span>guest rating</span></article><article><strong>Daily</strong><span>open by appointment</span></article></section>
      <SaunaTypesShowcase goTo={goTo} setCategory={setCategory} />
      <section className="container"><SectionHead eyebrow="Treatments" title="Saunas, pools, jacuzzis and massage" text="A complete spa experience focused on water, heat, steam and hands-on recovery." /><div className="treatmentGrid stagger">{featured.map((item) => <TreatmentCard key={item.id} item={item} openTreatment={openTreatment} addToBooking={addToBooking} />)}</div></section>
      <section className="container splitFeature reveal"><div className="splitImage"><img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=85" alt="Massage room" onError={(e) => { e.currentTarget.src = FALLBACK; }} /></div><div className="splitCopy stagger"><div className="eyebrow">The AURA approach</div><h2>A complete spa escape, not just a treatment.</h2><p>The experience is built as a full wellness circuit: warm pool, dry sauna, steam room, jacuzzi, treatment rooms and a quiet recovery lounge after every ritual.</p><ul><li><Check size={18} /> Dry sauna and eucalyptus steam</li><li><Check size={18} /> Indoor pool and hydrotherapy jacuzzi</li><li><Check size={18} /> Massage, facials and body rituals</li></ul><button className="primaryBtn" onClick={() => goTo("about")}>Learn our philosophy</button></div></section>
      <section className="container packages reveal"><SectionHead eyebrow="Packages" title="Build your spa day" /><div className="packageGrid stagger"><PackageCard icon={Waves} title="Full Thermal Circuit" price="$120" text="Pool access, dry sauna, steam room, jacuzzi and quiet lounge recovery." /><PackageCard icon={Leaf} title="Steam & Hammam Ritual" price="$150" text="Steam chamber, body polish, warm rinse, botanical oil and herbal tea." /><PackageCard icon={Heart} title="Jacuzzi Escape for Two" price="$260" text="Private jacuzzi time, synchronized bodywork and a calm recovery lounge." /></div></section>
      <section className="container spaZones reveal"><SectionHead eyebrow="Spa facilities" title="Pools, heat rooms and quiet recovery spaces" text="AURA now feels like a full spa resort, not just a simple treatment page." /><div className="zoneGrid stagger"><article className="zoneCard pool"><span>01</span><h3>Indoor Pool</h3><p>Warm water, soft lighting and slow poolside recovery.</p></article><article className="zoneCard sauna"><span>02</span><h3>Dry Sauna</h3><p>Cedar heat, deep breathing and thermal contrast.</p></article><article className="zoneCard steam"><span>03</span><h3>Steam Room</h3><p>Eucalyptus mist, warm air and a softer reset.</p></article></div></section>
    </>
  );
}

function SaunaTypesShowcase({ goTo, setCategory }) {
  const [activeSauna, setActiveSauna] = useState(SAUNA_TYPES[0]);
  function openSaunas() { setCategory("Sauna"); goTo("treatments"); }
  return (
    <section className="container saunaShowcase reveal" id="sauna-types">
      <SectionHead eyebrow="Sauna world" title="15 sauna experiences, from Nordic dry heat to steam rituals." text="AURA turns the sauna menu into a full thermal library — classic, modern, mineral, botanical and global bathing rituals." />
      <div className="saunaFeaturePanel">
        <div className="saunaFeatureImage"><img src={activeSauna.image} alt={activeSauna.name} onError={(e) => { e.currentTarget.src = FALLBACK; }} /><div className="saunaFeatureOverlay"><span>{activeSauna.temp}</span><h3>{activeSauna.name}</h3><p>{activeSauna.vibe}</p><button className="primaryBtn" onClick={openSaunas}>Explore sauna menu <ArrowRight size={18} /></button></div></div>
        <div className="saunaTypeGrid stagger">{SAUNA_TYPES.map((sauna, index) => <button key={sauna.id} className={`saunaTypeCard ${activeSauna.id === sauna.id ? "active" : ""}`} onMouseEnter={() => setActiveSauna(sauna)} onFocus={() => setActiveSauna(sauna)} onClick={() => setActiveSauna(sauna)}><img src={sauna.image} alt="" onError={(e) => { e.currentTarget.src = FALLBACK; }} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{sauna.name}</strong><small>{sauna.temp}</small></button>)}</div>
      </div>
    </section>
  );
}

function TreatmentsPage({ category, setCategory, query, setQuery, items, openTreatment, addToBooking }) {
  return <div className="container pagePad"><PageHero eyebrow="Treatments" title="Heat, water and recovery rituals." text="Filter the full menu by sauna, steam, jacuzzi, pool, massage or facial treatments." /><div className="toolbar"><div className="tabs">{CATEGORIES.map((cat) => <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</button>)}</div><label className="searchBox"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rituals..." /></label></div>{items.length === 0 ? <div className="emptyState"><Search size={42} /><h2>No matching treatments.</h2><p>Try another category or search term.</p></div> : <div className="treatmentGrid full stagger">{items.map((item) => <TreatmentCard key={item.id} item={item} openTreatment={openTreatment} addToBooking={addToBooking} />)}</div>}</div>;
}

function TreatmentCard({ item, openTreatment, addToBooking }) {
  return <article className="treatmentCard"><div className="treatmentImage"><img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.src = FALLBACK; }} /><span>{item.badge}</span></div><div className="treatmentBody"><div className="titleRow"><h3>{item.name}</h3><strong>${item.price}</strong></div><p>{item.description}</p><div className="metaRow"><span><Clock size={14} /> {item.duration}</span><span><Star size={14} /> {item.category}</span></div><div className="cardActions"><button className="smallPrimary" onClick={() => openTreatment(item)}>View details</button><button className="ghostBtn" onClick={() => addToBooking(item)}>Add to plan</button></div></div></article>;
}

function DetailPage({ item, goTo, addToBooking }) {
  return <div className="container pagePad"><button className="backBtn" onClick={() => goTo("treatments")}>Back to treatments</button><section className="detailLayout reveal"><div className="detailImage"><img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.src = FALLBACK; }} /></div><div className="detailPanel"><div className="eyebrow">{item.category}</div><h1>{item.name}</h1><p>{item.description}</p><div className="detailStats"><InfoBox label="Duration" value={item.duration} /><InfoBox label="Price" value={`$${item.price}`} /></div><div className="includeList">{item.includes.map((inc) => <span key={inc}><Check size={15} /> {inc}</span>)}</div><button className="primaryBtn" onClick={() => addToBooking(item)}>Add to booking plan</button></div></section></div>;
}

function BookingPage({ booking, total, updateQty, goTo }) {
  return <div className="container pagePad"><PageHero eyebrow="Booking" title="Plan your visit." text="This is a portfolio demo booking flow. Select services and review your estimated appointment plan." />{booking.length === 0 ? <div className="emptyState"><CalendarDays size={48} /><h2>No treatments selected yet.</h2><p>Browse treatments and add a service to your plan.</p><button className="primaryBtn" onClick={() => goTo("treatments")}>Explore treatments</button></div> : <section className="bookingLayout reveal"><div className="bookingList">{booking.map((item) => <article className="bookingItem" key={item.id}><img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.src = FALLBACK; }} /><div><h3>{item.name}</h3><p>{item.duration} · ${item.price}</p></div><div className="qty"><button onClick={() => updateQty(item.id, -1)}><Minus size={15} /></button><strong>{item.qty}</strong><button onClick={() => updateQty(item.id, 1)}><Plus size={15} /></button></div></article>)}</div><aside className="bookingSummary"><h3>Appointment summary</h3><div><span>Services</span><strong>${total}</strong></div><div><span>Guest tea ritual</span><strong>Included</strong></div><div><span>Deposit due today</span><strong>${Math.round(total * 0.25)}</strong></div><div className="summaryTotal"><span>Estimated total</span><strong>${total}</strong></div><button className="primaryBtn">Reserve demo</button><p>No payment is processed. This is a portfolio booking demo.</p></aside></section>}<section className="bookingForm reveal"><h2>Preferred appointment details</h2><div className="formGrid"><Field label="Name" placeholder="Your name" /><Field label="Email" placeholder="you@example.com" /><Field label="Preferred date" placeholder="Friday, June 14" /><Field label="Preferred time" placeholder="6:30 PM" /></div><label className="field"><span>Notes</span><textarea rows="6" placeholder="Tell us about pressure preference, allergies, pregnancy, injuries, or anything we should know." /></label></section></div>;
}

function AboutPage() { return <div className="container pagePad"><PageHero eyebrow="About" title="A sanctuary made for slower days." /><section className="aboutLayout reveal"><div><h2>Wellness without the noise.</h2><p>AURA was created as a calm escape from fast schedules, loud spaces and rushed self-care.</p><p>Every room is quiet, every treatment adapts to the guest, and every visit ends with space to rest before returning outside.</p></div><img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=85" alt="Spa treatment" onError={(e) => { e.currentTarget.src = FALLBACK; }} /></section><div className="values stagger"><Value icon={Leaf} title="Natural materials" text="Soft textiles, warm stone, botanical oils and calming aromas." /><Value icon={Sparkles} title="Personalized rituals" text="Treatments adapt to pressure preference, mood and recovery needs." /><Value icon={Waves} title="Recovery first" text="Heat, breath, touch and rest are combined for nervous system reset." /></div></div>; }
function GalleryPage() { return <div className="container pagePad"><PageHero eyebrow="Gallery" title="Quiet rooms, warm textures, softer light." /><div className="galleryGrid stagger">{GALLERY.map((image, index) => <img key={image} src={image} alt={`AURA gallery ${index + 1}`} onError={(e) => { e.currentTarget.src = FALLBACK; }} />)}</div></div>; }
function ContactPage() { return <div className="container pagePad"><PageHero eyebrow="Contact" title="Visit, call, or plan a private spa day." /><section className="contactLayout reveal"><div className="contactCards stagger"><ContactCard icon={MapPin} title="Address" text="42 Willow Lane, Sofia Wellness District" /><ContactCard icon={Phone} title="Phone" text="+359 88 000 0000" /><ContactCard icon={Mail} title="Email" text="hello@aurawellness.example" /><ContactCard icon={Clock} title="Hours" text="Daily · 9 AM - 9 PM" /></div><form className="contactForm"><Field label="Name" placeholder="Your name" /><Field label="Email" placeholder="you@example.com" /><Field label="Subject" placeholder="Booking, group visit, private event." /><label className="field"><span>Message</span><textarea rows="7" placeholder="How can we help?" /></label><button type="button" className="primaryBtn">Send message</button></form></section></div>; }
function SectionHead({ eyebrow, title, text }) { return <div className="sectionHead reveal"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>; }
function PageHero({ eyebrow, title, text }) { return <section className="pageHero reveal"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{text && <p>{text}</p>}</section>; }
function InfoBox({ label, value }) { return <article className="infoBox"><span>{label}</span><strong>{value}</strong></article>; }
function PackageCard({ icon: Icon, title, price, text }) { return <article className="packageCard"><Icon size={30} /><span>{price}</span><h3>{title}</h3><p>{text}</p></article>; }
function Value({ icon: Icon, title, text }) { return <article className="valueCard"><Icon size={30} /><h3>{title}</h3><p>{text}</p></article>; }
function ContactCard({ icon: Icon, title, text }) { return <article className="contactCard"><Icon size={26} /><div><h3>{title}</h3><p>{text}</p></div></article>; }
function Field({ label, placeholder }) { return <label className="field"><span>{label}</span><input placeholder={placeholder} /></label>; }
function Footer({ goTo }) { return <footer className="footer"><div className="container footerGrid"><div><button className="brand footerBrand" onClick={() => goTo("home")}><span className="brandMark"><Flower2 size={24} /></span><span><strong>AURA</strong><small>Wellness Spa</small></span></button><p>Thermal pools, saunas, steam rooms, jacuzzis, massage therapy and calm recovery in a premium wellness space.</p></div><div><h3>Explore</h3><button onClick={() => goTo("treatments")}>Treatments</button><button onClick={() => goTo("booking")}>Booking</button><button onClick={() => goTo("gallery")}>Gallery</button></div><div><h3>Visit</h3><p>42 Willow Lane</p><p>Sofia Wellness District</p><p>Daily · 9 AM - 9 PM</p></div><div><h3>Contact</h3><p>+359 88 000 0000</p><p>hello@aurawellness.example</p><p>@aurawellness.spa</p></div></div></footer>; }
