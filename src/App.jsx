import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  Send,
  UserRound,
  X,
} from 'lucide-react';

const ASSETS = '/assets/';

function OptimizedImage({ src, webp, alt, ...props }) {
  return (
    <picture>
      {webp && <source srcSet={`${ASSETS}${webp}`} type="image/webp" />}
      <img src={`${ASSETS}${src}`} alt={alt} decoding="async" {...props} />
    </picture>
  );
}

const services = [
  {
    icon: 'icon-seo-content.svg',
    title: 'Google Ads e Meta Ads',
    text: 'Creiamo campagne per intercettare persone pronte a chiedere informazioni, prenotare o acquistare.',
  },
  {
    icon: 'icon-seo-research.svg',
    title: 'Siti e landing page',
    text: 'Costruiamo pagine veloci, chiare e orientate alla conversione per trasformare il traffico in contatti.',
  },
  {
    icon: 'icon-automated-seo.svg',
    title: 'SEO e automazioni AI',
    text: 'Miglioriamo la visibilità organica e automatizziamo i passaggi che rendono più semplice gestire i lead.',
  },
];

const logos = [
  'brand-one.svg',
  'brand-two.svg',
  'brand-three.svg',
  'brand-four.svg',
  'brand-five.svg',
  'brand-six.svg',
];

const caseStudies = [
  {
    image: 'case-study-1.jpg',
    category: 'Lead Generation',
    title: 'Richieste qualificate per PMI',
  },
  {
    image: 'case-study-2.jpg',
    category: 'Campagne Locali',
    title: 'Appuntamenti da Google e Meta',
  },
  {
    image: 'case-study-3.jpg',
    category: 'Siti e Landing',
    title: 'Pagine progettate per convertire',
  },
];

const blogPosts = [
  {
    image: 'blog-1.jpg',
    month: 'Set',
    day: '25',
    category: 'SEO',
    title: 'Come farsi trovare da chi cerca i tuoi servizi',
    author: 'Team Mago',
  },
  {
    image: 'blog-2.jpg',
    month: 'Ott',
    day: '28',
    category: 'Advertising',
    title: 'Campagne Google e Meta per generare richieste',
    author: 'Mago System',
  },
  {
    image: 'blog-3.jpg',
    month: 'Dic',
    day: '30',
    category: 'Automazioni AI',
    title: 'Automazioni semplici per gestire meglio i contatti',
    author: 'Growth Team',
  },
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Risorse', href: '#blog' },
];

function Logo() {
  return (
    <a href="#home" className="logo" aria-label="Mago System home">
      <img src={`${ASSETS}mago-system-logo-2026-05-17.png`} alt="Mago System" width="865" height="288" />
    </a>
  );
}

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Google Ads e Meta Ads',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add('modal-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Inserisci il nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Inserisci una email valida.';
    if (!form.message.trim()) nextErrors.message = 'Descrivi brevemente il progetto.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Nuovo lead da ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nTelefono: ${form.phone || 'Non indicato'}\nServizio: ${form.service}\n\nMessaggio:\n${form.message}`,
    );
    window.location.href = `mailto:hello@magosystem.it?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Chiudi form">
          <X size={22} />
        </button>
        <p className="eyebrow">Parliamo del progetto</p>
        <h2 id="contact-modal-title">Richiedi una consulenza</h2>
        <p id="contact-modal-description">
          Raccontaci che attività hai, quale zona o mercato servi e quali canali usi oggi. Ti risponderemo con una
          prima lettura e le prossime azioni consigliate.
        </p>
        <form className="modal-form" onSubmit={submitForm} noValidate>
          <label>
            Nome
            <input
              ref={firstFieldRef}
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Mario Rossi"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" role="alert">
                {errors.name}
              </span>
            )}
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="mario@azienda.it"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </label>
          <label>
            Telefono
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              placeholder="+39 333 000 0000"
              autoComplete="tel"
            />
          </label>
          <label>
            Servizio
            <select name="service" value={form.service} onChange={updateField}>
              <option>Google Ads e Meta Ads</option>
              <option>Siti e landing page</option>
              <option>SEO e automazioni AI</option>
              <option>Sistema acquisizione clienti</option>
            </select>
          </label>
          <label className="full-field">
            Messaggio
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows="4"
              placeholder="Tipo di attività, obiettivi, zona servita, sito attuale e canali da migliorare."
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" role="alert">
                {errors.message}
              </span>
            )}
          </label>
          <button className="button primary full-field" type="submit">
            Invia richiesta <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigazione principale">
            <a href="#servizi">
              Tutte le sezioni <ChevronDown size={15} />
            </a>
            {navItems.slice(1).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <button className="button primary header-cta" type="button" onClick={openModal}>
            Richiedi consulenza <ArrowUpRight size={18} />
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <nav
          id="mobile-nav"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navigazione mobile"
          aria-hidden={!menuOpen}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <button className="button primary" type="button" onClick={openModal}>
            Richiedi consulenza <ArrowUpRight size={18} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-soft" id="home">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Agenzia italiana di acquisizione clienti</p>
              <h1>Acquisisci clienti online con un sistema costruito per la tua attività</h1>
              <p>
                Aiutiamo PMI, liberi professionisti e attività locali a generare richieste, appuntamenti e vendite
                attraverso Google Ads, Meta Ads, SEO, siti web, landing page e automazioni AI.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={openModal}>
                  Richiedi una consulenza <ArrowUpRight size={18} />
                </button>
                <a className="button secondary" href="#servizi">
                  Scopri i servizi <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="hero-visual reveal delay-1" aria-label="Consulente Mago System">
              <img className="hero-pattern" src={`${ASSETS}hero-pattern.svg`} alt="" width="534" height="702" />
              <img
                className="hero-glow"
                src={`${ASSETS}hero-glow.png`}
                alt=""
                width="780"
                height="1024"
                decoding="async"
              />
              <OptimizedImage
                className="hero-person"
                src="hero-person.png"
                webp="hero-person.webp"
                alt="Consulente acquisizione clienti"
                width="780"
                height="1024"
                fetchPriority="high"
              />
              <div className="user-badge">
                <strong>1M+ persone raggiunte</strong>
                <span>
                  <img src={`${ASSETS}avatar-1.png`} alt="" width="34" height="34" decoding="async" />
                  <img src={`${ASSETS}avatar-2.png`} alt="" width="34" height="34" decoding="async" />
                  <img src={`${ASSETS}avatar-3.png`} alt="" width="34" height="34" decoding="async" />
                </span>
              </div>
              <div className="review-badge">
                <img src={`${ASSETS}google-logo.svg`} alt="" width="30" height="30" />
                <span className="stars" aria-hidden="true">★★★★★</span>
                <span className="sr-only">Valutazione media 4.8 su 5.</span>
                <span>(4.8) recensioni</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="servizi">
          <div className="container">
            <div className="service-panel reveal">
              <h2>Canali, pagine e automazioni per acquisire clienti online</h2>
              <div className="service-grid">
                {services.map((service) => (
                  <article className="service-card" key={service.title}>
                    <img src={`${ASSETS}${service.icon}`} alt="" width="50" height="50" loading="lazy" />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <button type="button" onClick={openModal}>
                      Scopri di più <ArrowUpRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="brand-strip" aria-label="Aziende che si affidano a Mago System">
          <div className="container">
            <h2>Scelti da attività che vogliono crescere online</h2>
            <div className="logo-marquee">
              <div>
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <img key={`${logo}-${index}`} src={`${ASSETS}${logo}`} alt="" width="120" height="40" loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-grid">
            <div className="feature-media reveal">
              <OptimizedImage
                className="feature-main"
                src="feature-main.jpg"
                webp="feature-main.webp"
                alt="Consulente al telefono"
                width="512"
                height="341"
                loading="lazy"
              />
              <img
                className="feature-overlay"
                src={`${ASSETS}feature-overlay.png`}
                alt="Dashboard marketing"
                width="512"
                height="438"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="feature-copy reveal delay-1">
              <p className="eyebrow">Sistema di acquisizione clienti</p>
              <h2>Trasforma i canali online in richieste, appuntamenti e vendite</h2>
              <p>
                Uniamo strategia, creatività, advertising, SEO e automazioni per costruire percorsi semplici da
                misurare e ottimizzare.
              </p>
              <div className="feature-items">
                <article>
                  <img src={`${ASSETS}icon-ai-seo.svg`} alt="" width="43" height="40" loading="lazy" />
                  <h3>Automazioni AI</h3>
                  <p>Processi più rapidi per raccogliere, qualificare e seguire i contatti generati online.</p>
                </article>
                <article>
                  <img src={`${ASSETS}icon-digital-strategy.svg`} alt="" width="43" height="40" loading="lazy" />
                  <h3>Strategia digitale</h3>
                  <p>Piani chiari per migliorare campagne, conversioni, tracciamento e risultati dei canali.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section section-soft" id="case-study">
          <div className="container">
            <h2 className="center-title">Abbiamo costruito sistemi di acquisizione per attività diverse</h2>
            <div className="filter-tabs" aria-label="Filtri case study">
              {['Tutti', 'Google Ads', 'Meta Ads', 'SEO', 'Landing', 'AI'].map((item, index) => (
                <button className={index === 0 ? 'active' : ''} type="button" key={item} aria-pressed={index === 0}>
                  {item}
                </button>
              ))}
            </div>
            <div className="case-grid">
              {caseStudies.map((study) => (
                <article className="case-card reveal" key={study.title}>
                  <OptimizedImage
                    src={study.image}
                    webp={study.image.replace('.jpg', '.webp')}
                    alt={study.title}
                    width="720"
                    height="480"
                    loading="lazy"
                    sizes="(max-width: 760px) calc(100vw - 16px), 350px"
                  />
                  <div>
                    <span>{study.category}</span>
                    <h3>{study.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            <button className="button primary compact" type="button" onClick={openModal}>
              Parla con noi
            </button>
          </div>
        </section>

        <section className="testimonial-section section-soft">
          <div className="container">
            <div className="testimonial-panel reveal">
              <div>
                <h2>Cosa dicono i clienti di noi</h2>
                <div className="testimonial-person">
                  <span />
                  <strong>Marco Ferri</strong>
                  <small>CEO</small>
                </div>
                <p>
                  Mago System ha trasformato il nostro modo di acquisire clienti: campagne più chiare, landing più
                  efficaci e contatti gestiti con più precisione.
                </p>
                <div className="trust-row">
                  <span aria-hidden="true">★★★★★</span>
                  <span className="sr-only">Valutazione 4.7 su 5 su Trustpilot.</span>
                  <strong>4.7/5 su Trustpilot</strong>
                </div>
              </div>
              <OptimizedImage
                src="testimonial-person.png"
                webp="testimonial-person.webp"
                alt="Cliente soddisfatto"
                width="888"
                height="1024"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="blog-section" id="blog">
          <div className="container">
            <h2 className="center-title">Blog & Articoli</h2>
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <article className="blog-card reveal" key={post.title}>
                  <div className="blog-image">
                    <OptimizedImage
                      src={post.image}
                      webp={post.image.replace('.jpg', '.webp')}
                      alt={post.title}
                      width="600"
                      height={post.image === 'blog-2.jpg' ? '800' : '400'}
                      loading="lazy"
                      sizes="(max-width: 760px) calc(100vw - 16px), 350px"
                    />
                    <time>
                      <strong>{post.day}</strong>
                      <span>{post.month}</span>
                    </time>
                  </div>
                  <div className="blog-content">
                    <span>{post.category}</span>
                    <h3>{post.title}</h3>
                  </div>
                  <div className="blog-author">
                    <UserRound size={16} /> {post.author}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="footer-cta section-soft">
          <div className="container">
            <div className="cta-card reveal">
              <div>
                <h2>Vuoi generare più clienti dai canali online?</h2>
                <p>
                  Partiamo dalla tua attività, dai canali attivi e dagli obiettivi. Poi costruiamo un sistema concreto.
                </p>
                <button className="button primary" type="button" onClick={openModal}>
                  Richiedi una consulenza <ArrowUpRight size={18} />
                </button>
              </div>
              <img src={`${ASSETS}footer-pattern.svg`} alt="" width="534" height="290" loading="lazy" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contatti">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Agenzia italiana di acquisizione clienti per PMI, liberi professionisti e attività locali.</p>
          </div>
          <div>
            <h3>Servizi</h3>
            <a href="#servizi">Servizi</a>
            <a href="#case-study">Case Study</a>
            <a href="#contatti">Contatti</a>
            <button type="button" onClick={openModal}>Parla con noi</button>
          </div>
          <div>
            <h3>Contatti</h3>
            <p>Via Roma 55, Milano, Italia</p>
            <a href="mailto:hello@magosystem.it">
              <Mail size={18} /> hello@magosystem.it
            </a>
            
          </div>
        </div>
        <div className="container footer-bottom">
          <a className="scroll-top" href="#home" aria-label="Torna su">
            <ArrowUp size={21} />
          </a>
          <p>Copyright @2026, Mago System. Tutti i diritti riservati</p>
        </div>
      </footer>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
