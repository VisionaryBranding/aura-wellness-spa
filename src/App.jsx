import React, { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Clock,
  Grid3X3,
  Heart,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  ShoppingBag,
  SunMedium,
  ThermometerSun,
  Waves,
  X
} from "lucide-react";

const HERO_IMAGE = "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=2400&q=86";
const SAUNA_IMAGE = "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=86";
const STEAM_IMAGE = "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1800&q=86";
const MASSAGE_IMAGE = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=86";
const FACIAL_IMAGE = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=86";
const LOUNGE_IMAGE = "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1800&q=86";
const POOL_IMAGE = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1800&q=86";
const RESORT_IMAGE = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=86";
const HOT_STONE_IMAGE = "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=86";
const JACUZZI_IMAGE = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1800&q=86";

const TREATMENTS = [
  { id: 1, name: "Thermal Spa Day Pass", category: "Thermal", price: 95, duration: "3 hours", tag: "Facility access", heat: "Warm circuit", image: HERO_IMAGE, description: "Pool access, steam room, dry sauna, jacuzzi and recovery lounge.", includes: ["Pool", "Sauna", "Steam", "Jacuzzi"] },
  { id: 2, name: "Finnish Dry Sauna", category: "Sauna", price: 55, duration: "35 min", tag: "Dry heat", heat: "80–95°C", image: SAUNA_IMAGE, description: "Cedar-lined dry heat with hot stones, cold towels and mineral water.", includes: ["Hot stones", "Cold towel", "Mineral water", "Quiet bench"] },
  { id: 3, name: "Wood-Burning Sauna", category: "Sauna", price: 85, duration: "50 min", tag: "Traditional", heat: "Firewood stove", image: "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1800&q=86", description: "A slower, ritual-style sauna heated by a real wood stove for softer atmosphere.", includes: ["Wood stove", "Stone heat", "Rest round", "Tea"] },
  { id: 4, name: "Electric Sauna Studio", category: "Sauna", price: 70, duration: "45 min", tag: "Controlled heat", heat: "Precise temperature", image: "https://images.unsplash.com/photo-1610212866980-60ba29b7c629?auto=format&fit=crop&w=1800&q=86", description: "A clean modern sauna with stable heat, soft lighting and easy temperature control.", includes: ["Electric heater", "Soft light", "Towels", "Hydration"] },
  { id: 5, name: "Infrared Recovery Sauna", category: "Sauna", price: 80, duration: "40 min", tag: "Radiant heat", heat: "Lower air temp", image: HOT_STONE_IMAGE, description: "Gentler radiant heat designed for longer recovery sessions and muscle reset.", includes: ["Infrared panels", "Recovery towel", "Water", "Quiet room"] },
  { id: 6, name: "Smoke Sauna Ritual", category: "Sauna", price: 140, duration: "75 min", tag: "Soft steam", heat: "Old-world ritual", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1800&q=86", description: "A darker, atmospheric sauna concept inspired by smoke-sauna tradition.", includes: ["Dark room", "Soft steam", "Slow rounds", "Lounge tea"] },
  { id: 7, name: "Barrel Sauna Session", category: "Sauna", price: 90, duration: "55 min", tag: "Outdoor style", heat: "Compact heat", image: RESORT_IMAGE, description: "A curved timber sauna experience with fast heat-up and a private outdoor mood.", includes: ["Private cabin", "Timber room", "Cool reset", "Robe"] },
  { id: 8, name: "Salt Sauna Chamber", category: "Sauna", price: 95, duration: "45 min", tag: "Mineral air", heat: "Dry mineral heat", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1800&q=86", description: "Dry heat paired with mineral-salt atmosphere for a quieter breathing ritual.", includes: ["Salt wall", "Dry heat", "Stillness", "Mineral water"] },
  { id: 9, name: "Herbal Aroma Sauna", category: "Sauna", price: 75, duration: "45 min", tag: "Botanical", heat: "Cedar + herbs", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1800&q=86", description: "A dry sauna layered with eucalyptus, rosemary and cedar aromatics.", includes: ["Herbal aroma", "Dry sauna", "Cool towel", "Tea"] },
  { id: 10, name: "Panoramic Sauna Suite", category: "Sauna", price: 125, duration: "60 min", tag: "Private view", heat: "Private heat", image: POOL_IMAGE, description: "Private sauna room with a brighter resort feel, robe service and calm seating.", includes: ["Private suite", "Robe", "View", "Hydration"] },
  { id: 11, name: "Eucalyptus Steam Room", category: "Steam", price: 60, duration: "30 min", tag: "Mist", heat: "45–50°C", image: STEAM_IMAGE, description: "Warm eucalyptus mist for breathing, skin softness and decompression.", includes: ["Eucalyptus mist", "Steam", "Cold towels", "Hydration"] },
  { id: 12, name: "Hammam Body Polish", category: "Steam", price: 135, duration: "75 min", tag: "Body ritual", heat: "Steam cleanse", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1800&q=86", description: "Steam, cleanse, full-body polish and warm rinse in a hammam-style ritual.", includes: ["Steam", "Body polish", "Warm rinse", "Body oil"] },
  { id: 13, name: "Salt Steam Chamber", category: "Steam", price: 70, duration: "35 min", tag: "Mineral mist", heat: "Warm humidity", image: LOUNGE_IMAGE, description: "Soft mineral steam with low light, stillness and slow nasal breathing.", includes: ["Mineral mist", "Warm steam", "Tea", "Quiet room"] },
  { id: 14, name: "Private Steam Suite", category: "Steam", price: 125, duration: "50 min", tag: "Private room", heat: "For two", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=86", description: "A private steam room for two with towels, robe service and herbal tea.", includes: ["Private steam", "For two", "Robe service", "Tea"] },
  { id: 15, name: "Private Jacuzzi Suite", category: "Jacuzzi", price: 160, duration: "75 min", tag: "Private soak", heat: "Hydrotherapy", image: JACUZZI_IMAGE, description: "Low-light hydrotherapy with robe service, calm seating and quiet music.", includes: ["Private jacuzzi", "Jets", "Robe", "Mineral water"] },
  { id: 16, name: "Couples Jacuzzi Escape", category: "Jacuzzi", price: 260, duration: "90 min", tag: "For two", heat: "Warm water", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=86", description: "Private jacuzzi time, synchronized bodywork and recovery lounge for two.", includes: ["Private soak", "Two therapists", "Tea", "Lounge"] },
  { id: 17, name: "Hydrotherapy Jet Pool", category: "Jacuzzi", price: 105, duration: "50 min", tag: "Jet pressure", heat: "Targeted jets", image: POOL_IMAGE, description: "Warm-water jets for back, legs and shoulder recovery.", includes: ["Hydro jets", "Warm pool", "Towels", "Recovery seating"] },
  { id: 18, name: "Deep Calm Massage", category: "Massage", price: 115, duration: "60 min", tag: "Tension relief", heat: "Warm oil", image: MASSAGE_IMAGE, description: "Slow pressure and warm oil for back, neck and nervous-system reset.", includes: ["Deep pressure", "Warm oil", "Neck focus", "Quiet room"] },
  { id: 19, name: "Hot Stone Massage", category: "Massage", price: 145, duration: "75 min", tag: "Warm stones", heat: "Stone therapy", image: HOT_STONE_IMAGE, description: "Warm stone therapy paired with slow massage for deeper muscular release.", includes: ["Hot stones", "Warm oil", "Back focus", "Tea"] },
  { id: 20, name: "Botanical Glow Facial", category: "Facials", price: 130, duration: "70 min", tag: "Glow", heat: "Hydrating", image: FACIAL_IMAGE, description: "Hydrating facial, sculpting massage and botanical mask for a calm glow.", includes: ["Cleanse", "Sculpt", "Mask", "SPF finish"] },
  { id: 21, name: "Full Wellness Escape", category: "Thermal", price: 310, duration: "Half day", tag: "Complete day", heat: "Full circuit", image: LOUNGE_IMAGE, description: "Pool, sauna, jacuzzi, steam, massage and facial in one spa day.", includes: ["Pool", "Sauna", "Massage", "Facial"] }
];

const CATEGORIES = ["All", "Thermal", "Sauna", "Steam", "Jacuzzi", "Massage", "Facials"];

const MEGA = {
  Treatments: [
    { label: "All rituals", page: "treatments", category: "All" },
    { label: "Finnish sauna", page: "treatments", category: "Sauna", query: "Finnish" },
    { label: "Infrared sauna", page: "treatments", category: "Sauna", query: "Infrared" },
    { label: "Steam rooms", page: "treatments", category: "Steam" },
    { label: "Jacuzzi suites", page: "treatments", category: "Jacuzzi" },
    { label: "Massage", page: "treatments", category: "Massage" }
  ],
  Booking: [
    { label: "Review plan", page: "bag" },
    { label: "Add sauna", page: "treatments", category: "Sauna" },
    { label: "Private suite", page: "treatments", query: "Private" },
    { label: "Couples ritual", page: "treatments", query: "Couples" }
  ],
  About: [
    { label: "Philosophy", page: "about", anchor: "philosophy" },
    { label: "Thermal etiquette", page: "about", anchor: "etiquette" },
    { label: "Products & rituals", page: "about", anchor: "rituals" }
  ]
};

const ROUTE_TO_PAGE = {
  home: "home",
  treatments: "treatments",
  booking: "bag",
  bag: "bag",
  about: "about",
  gallery: "gallery",
  contact: "contact"
};

const PAGE_TO_ROUTE = {
  home: "",
  treatments: "treatments",
  bag: "booking",
  about: "about",
  gallery: "gallery",
  contact: "contact"
};

function pageFromUrl() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase();
  const [route] = raw.split("/");
  return ROUTE_TO_PAGE[route] || "home";
}

function anchorFromUrl() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase();
  const [, anchor] = raw.split("/");
  return anchor || "";
}

function urlForPage(page, anchor = "") {
  const route = PAGE_TO_ROUTE[page] ?? "";
  const base = `${window.location.pathname}${window.location.search}`;
  if (!route) return base;
  return anchor ? `${base}#/${route}/${anchor}` : `${base}#/${route}`;
}

function scrollToAnchor(anchor) {
  if (!anchor) return;
  window.setTimeout(() => {
    const target = document.getElementById(anchor);
    if (!target) return;
    const headerOffset = 108;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, 80);
}

function money(value) {
  return `$${value}`;
}

export default function App() {
  const [page, setPage] = useState(() => pageFromUrl());
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [bag, setBag] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TREATMENTS.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const text = `${item.name} ${item.category} ${item.tag} ${item.heat} ${item.description} ${item.includes.join(" ")}`.toLowerCase();
      return categoryMatch && (!q || text.includes(q));
    });
  }, [category, query]);

  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = bag.reduce((sum, item) => sum + item.qty * item.price, 0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal, .productCard, .motionBlock");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page, category, query]);

  useEffect(() => {
    const handleNavigation = () => {
      const nextPage = pageFromUrl();
      const nextAnchor = anchorFromUrl();
      setPage(nextPage);
      setMenuOpen(false);
      if (nextAnchor) scrollToAnchor(nextAnchor);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("hashchange", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("hashchange", handleNavigation);
    };
  }, []);

  function goTo(next, options = {}) {
    if (options.category) setCategory(options.category);
    if (typeof options.query === "string") setQuery(options.query);
    if (options.clearSearch) setQuery("");

    setPage(next);
    setMenuOpen(false);

    const nextUrl = urlForPage(next, options.anchor || "");
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) window.history.pushState({ page: next, anchor: options.anchor || "" }, "", nextUrl);

    if (options.anchor) scrollToAnchor(options.anchor);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToBag(item) {
    setBag((current) => {
      const exists = current.find((entry) => entry.id === item.id);
      if (exists) return current.map((entry) => entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry);
      return [...current, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, amount) {
    setBag((current) => current.map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + amount) } : item).filter((item) => item.qty > 0));
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className={`ssenseSite ${theme === "dark" ? "dark" : ""}`}>
      <Header
        page={page}
        goTo={goTo}
        theme={theme}
        setTheme={setTheme}
        bagCount={bagCount}
        bagTotal={bagTotal}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" && <Home goTo={goTo} addToBag={addToBag} setCategory={setCategory} />}
        {page === "treatments" && (
          <Treatments
            filtered={filtered}
            category={category}
            setCategory={setCategory}
            query={query}
            setQuery={setQuery}
            addToBag={addToBag}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            goTo={goTo}
          />
        )}
        {page === "bag" && <Bag bag={bag} updateQty={updateQty} total={bagTotal} goTo={goTo} />}
        {page === "about" && <About />}
        {page === "gallery" && <Gallery />}
        {page === "contact" && <Contact />}
      </main>
      <Footer goTo={goTo} />
    </div>
  );
}

function Header({ page, goTo, theme, setTheme, bagCount, bagTotal, menuOpen, setMenuOpen }) {
  const nav = ["Treatments", "Booking", "About", "Gallery", "Contact"];
  return (
    <>
      <header className="header">
        <button className="brand" onClick={() => goTo("home")} aria-label="AURA home">
          <span>AURA</span>
          <small>Wellness Spa</small>
        </button>

        <nav className="desktopNav" aria-label="Main navigation">
          <button className={page === "home" ? "active" : ""} onClick={() => goTo("home")}>Home</button>
          {nav.map((item) => (
            <div className="navItem" key={item}>
              <button
                className={page === item.toLowerCase() || (item === "Booking" && page === "bag") ? "active" : ""}
                onClick={() => goTo(item === "Booking" ? "bag" : item.toLowerCase(), { clearSearch: item === "Treatments" })}
              >
                {item}
                {MEGA[item] && <ChevronDown size={14} />}
              </button>
              {MEGA[item] && <MegaMenu title={item} items={MEGA[item]} goTo={goTo} />}
            </div>
          ))}
        </nav>

        <div className="headerRight">
          <button className="iconBtn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
          <div className="planDropWrap">
            <button className="bagBtn" onClick={() => goTo("bag")} aria-haspopup="true">
              <ShoppingBag size={18} />
              <span>Plan</span>
              <b>{bagCount}</b>
            </button>
            <PlanDropdown goTo={goTo} bagCount={bagCount} bagTotal={bagTotal} />
          </div>
          <button className="menuBtn" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        </div>
      </header>
      {menuOpen && <MobileMenu goTo={goTo} close={() => setMenuOpen(false)} />}
    </>
  );
}

function PlanDropdown({ goTo, bagCount, bagTotal }) {
  return (
    <aside className="planDropdown" aria-label="Plan quick menu">
      <span className="miniLabel">Quick plan</span>
      <div className="planSummaryLine">
        <strong>{bagCount ? `${bagCount} ritual${bagCount > 1 ? "s" : ""}` : "No rituals selected"}</strong>
        <span>{bagTotal ? money(bagTotal) : "Build your visit"}</span>
      </div>
      <button onClick={() => goTo("treatments", { clearSearch: true, category: "All" })}>Browse treatments <ArrowRight size={14} /></button>
      <button onClick={() => goTo("treatments", { category: "Sauna", query: "" })}>Sauna collection <ArrowRight size={14} /></button>
      <button onClick={() => goTo("bag")}>Review spa plan <ArrowRight size={14} /></button>
      <p>Hover menu stays subtle; buttons now route to actual pages and filters.</p>
    </aside>
  );
}

function MegaMenu({ title, items, goTo }) {
  function handleItem(item) {
    goTo(item.page, {
      category: item.category,
      query: item.query ?? "",
      clearSearch: item.page === "treatments" && !item.query,
      anchor: item.anchor
    });
  }

  return (
    <div className="megaMenu">
      <div>
        <span className="miniLabel">{title}</span>
        {items.map((item) => <button key={item.label} onClick={() => handleItem(item)}>{item.label}</button>)}
      </div>
      <aside>
        <ThermometerSun size={19} />
        <strong>Signature circuit</strong>
        <p>Pool → Finnish sauna → cold reset → steam → jacuzzi → recovery lounge.</p>
        <button onClick={() => goTo("bag")}>Plan a visit</button>
      </aside>
    </div>
  );
}

function MobileMenu({ goTo, close }) {
  return (
    <div className="mobileOverlay">
      <section className="mobilePanel">
        <button className="closeBtn" onClick={close}><X /></button>
        {[["home", "Home"], ["treatments", "Treatments"], ["bag", "Booking"], ["about", "About"], ["gallery", "Gallery"], ["contact", "Contact"]].map(([page, label]) => (
          <button key={page} onClick={() => goTo(page)}>{label}</button>
        ))}
      </section>
    </div>
  );
}

function Home({ goTo, addToBag, setCategory }) {
  const featured = TREATMENTS.slice(0, 6);
  return (
    <>
      <section className="editorialHero">
        <div className="heroText reveal">
          <p className="miniLabel">Thermal wellness / private rituals</p>
          <h1>Quiet luxury for recovery.</h1>
          <p className="heroLead">AURA is a spa retreat built around pools, Finnish dry saunas, steam rooms, infrared recovery, jacuzzis, massage and slow recovery.</p>
          <div className="heroActions">
            <button className="primary" onClick={() => goTo("treatments", { clearSearch: true, category: "All" })}>Shop treatments <ArrowRight size={16} /></button>
            <button className="secondary" onClick={() => goTo("bag")}>Build a spa day</button>
          </div>
        </div>
        <div className="heroImage reveal motionBlock">
          <img src={HERO_IMAGE} alt="AURA pool" />
          <div className="imageCaption"><span>01</span><strong>Thermal circuit</strong><p>Pool / sauna / steam / jacuzzi</p></div>
        </div>
      </section>

      <section className="ssenseStrip reveal">
        {[
          ["8", "Sauna styles"],
          ["21", "Curated rituals"],
          ["4.9", "Guest rating"],
          ["Daily", "09:00—21:00"]
        ].map(([big, small]) => <article key={small}><strong>{big}</strong><span>{small}</span></article>)}
      </section>

      <SectionHeader kicker="Treatments" title="Saunas, pools, steam rooms and massage" text="A more complete spa catalogue with actual sauna styles, cleaner filters, working buttons and calmer interaction." />
      <ProductGrid items={featured} addToBag={addToBag} favorites={[]} toggleFavorite={() => {}} goTo={goTo} />

      <section className="saunaTypes reveal">
        <div>
          <span className="miniLabel">Sauna index</span>
          <h2>Different heat rooms, different moods.</h2>
        </div>
        {["Finnish dry", "Wood-burning", "Electric", "Infrared", "Smoke", "Barrel", "Salt", "Herbal aroma"].map((item, index) => (
          <button key={item} onClick={() => { setCategory("Sauna"); goTo("treatments", { category: "Sauna", query: item.split(" ")[0] }); }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
            <ArrowRight size={15} />
          </button>
        ))}
      </section>

      <section className="splitEditorial reveal">
        <img src={SAUNA_IMAGE} alt="Dry sauna" />
        <div>
          <span className="miniLabel">AURA approach</span>
          <h2>A spa menu that feels curated, not cluttered.</h2>
          <p>Instead of looking like a normal service website, the experience is presented like a premium catalogue: high contrast, restrained typography, sharp filters and editorial cards.</p>
          <button className="underlined" onClick={() => goTo("about")}>Read philosophy</button>
        </div>
      </section>

      <section className="categoryRail reveal">
        {CATEGORIES.filter((c) => c !== "All").map((item) => (
          <button key={item} onClick={() => { setCategory(item); goTo("treatments", { category: item, query: "" }); }}>
            <span>{item}</span>
            <ArrowRight size={16} />
          </button>
        ))}
      </section>
    </>
  );
}

function Treatments({ filtered, category, setCategory, query, setQuery, addToBag, favorites, toggleFavorite, goTo }) {
  return (
    <section className="catalogPage">
      <aside className="filters reveal">
        <span className="miniLabel">Catalogue</span>
        <h1>Treatments</h1>
        <label className="searchBox"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rituals" /></label>
        <div className="filterList">
          {CATEGORIES.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => { setCategory(item); setQuery(""); }}>{item}</button>)}
        </div>
      </aside>
      <div className="catalogMain">
        <div className="catalogTop reveal"><span>{filtered.length} results</span><span><Grid3X3 size={16} /> 3-column editorial grid</span></div>
        <ProductGrid items={filtered} addToBag={addToBag} favorites={favorites} toggleFavorite={toggleFavorite} goTo={goTo} />
      </div>
    </section>
  );
}

function ProductGrid({ items, addToBag, favorites = [], toggleFavorite, goTo }) {
  if (!items.length) {
    return <div className="emptyGrid reveal"><h3>No rituals found.</h3><p>Try another category or clear the search.</p></div>;
  }

  return (
    <div className="productGrid">
      {items.map((item, index) => (
        <article className="productCard" key={item.id} style={{ transitionDelay: `${Math.min(index, 10) * 35}ms` }}>
          <div className="productImage">
            <img src={item.image} alt={item.name} />
            <button className={`wish ${favorites.includes(item.id) ? "active" : ""}`} onClick={() => toggleFavorite?.(item.id)} aria-label={`Favorite ${item.name}`}><Heart size={17} /></button>
            <span>{item.tag}</span>
          </div>
          <div className="productInfo">
            <div>
              <small>{item.heat}</small>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="includePills">
              {item.includes.slice(0, 4).map((include) => <span key={include}>{include}</span>)}
            </div>
            <div className="productMeta">
              <span>{item.duration}</span>
              <strong>{money(item.price)}</strong>
            </div>
            <div className="cardActions">
              <button className="addBtn" onClick={() => addToBag(item)}>Add to plan</button>
              <button className="detailsBtn" onClick={() => goTo("contact")}>Ask</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Bag({ bag, updateQty, total, goTo }) {
  return (
    <section className="bagPage">
      <div className="bagList reveal">
        <span className="miniLabel">Booking plan</span>
        <h1>Your spa day</h1>
        {!bag.length && <p className="empty">No rituals added yet. Explore treatments to build a spa day.</p>}
        {bag.map((item) => (
          <article className="bagItem" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div><h3>{item.name}</h3><p>{item.duration} / {item.category}</p></div>
            <strong>{money(item.price * item.qty)}</strong>
            <div className="qty"><button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button></div>
          </article>
        ))}
      </div>
      <aside className="summary reveal">
        <span className="miniLabel">Summary</span>
        <div><span>Subtotal</span><strong>{money(total)}</strong></div>
        <div><span>Tea ritual</span><strong>Included</strong></div>
        <p>Demo checkout: use this as a booking-plan concept, not real payment processing.</p>
        <button className="primary" onClick={() => goTo("contact")}>Request booking</button>
      </aside>
    </section>
  );
}

function About() {
  return (
    <section id="philosophy" className="contentPage reveal">
      <span className="miniLabel">About AURA</span>
      <h1>Minimal, quiet and built around recovery.</h1>
      <p>AURA combines heat, steam, water and bodywork into a calm wellness circuit. The design direction uses editorial spacing, high-contrast typography and product-like treatment cards to feel closer to a luxury retail experience.</p>
      <div className="textGrid">
        {[
          ["Thermal etiquette", "Clear guidance for timed rounds, hydration and recovery pauses."],
          ["Private treatment rooms", "Quiet rooms for solo visits, couples rituals and slow recovery."],
          ["Products & rituals", "Botanical oils, towels, teas and small details that make the brand feel real."],
          ["Recovery lounge", "A final low-light room after the thermal sequence."]
        ].map(([title, text], i) => <article id={i === 0 ? "etiquette" : i === 2 ? "rituals" : undefined} key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="galleryPage reveal">
      <SectionHeader kicker="Gallery" title="Spaces with a quiet editorial mood" text="Large image blocks, less decoration, stronger cropping." />
      {[HERO_IMAGE, SAUNA_IMAGE, STEAM_IMAGE, MASSAGE_IMAGE, FACIAL_IMAGE, LOUNGE_IMAGE, POOL_IMAGE, RESORT_IMAGE].map((img, i) => <img key={img} src={img} alt={`AURA gallery ${i + 1}`} />)}
    </section>
  );
}

function Contact() {
  return (
    <section className="contentPage contactPage reveal">
      <span className="miniLabel">Contact</span>
      <h1>Request a private treatment.</h1>
      <p>42 Willow Lane, Sofia Wellness District / +359 88 000 0000 / hello@aurawellness.example</p>
      <form className="contactForm">
        <input placeholder="Name" />
        <input placeholder="Email" />
        <textarea placeholder="What would you like to book?" rows="5" />
        <button type="button" className="primary">Send request</button>
      </form>
    </section>
  );
}

function SectionHeader({ kicker, title, text }) {
  return <div className="sectionHead reveal"><span className="miniLabel">{kicker}</span><h2>{title}</h2><p>{text}</p></div>;
}

function Footer({ goTo }) {
  return (
    <footer className="footer">
      <div><strong>AURA</strong><p>Thermal pools, saunas, steam rooms, jacuzzis and massage therapy.</p></div>
      <div><span>Explore</span><button onClick={() => goTo("treatments")}>Treatments</button><button onClick={() => goTo("bag")}>Booking</button><button onClick={() => goTo("gallery")}>Gallery</button></div>
      <div><span>Visit</span><p>42 Willow Lane<br />Sofia Wellness District<br />Daily / 09:00—21:00</p></div>
      <div><span>Contact</span><p>+359 88 000 0000<br />hello@aurawellness.example<br />@aurawellness.spa</p></div>
    </footer>
  );
}
