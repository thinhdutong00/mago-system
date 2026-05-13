import React, { useEffect, useState } from 'react';
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

const services = [
  {
    icon: 'icon-seo-content.svg',
    title: 'Contenuti SEO con AI',
    text: 'Creiamo contenuti ottimizzati per parole chiave, intenti di ricerca e conversioni reali.',
  },
  {
    icon: 'icon-seo-research.svg',
    title: 'Ricerca SEO',
    text: 'Analizziamo SERP, competitor e dati per individuare opportunità di crescita ad alto impatto.',
  },
  {
    icon: 'icon-automated-seo.svg',
    title: 'Audit automatici',
    text: 'Trasformiamo dati tecnici e contenuti in roadmap operative per migliorare ranking e lead.',
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
    category: 'Business',
    title: 'Ecommerce SEO Score',
  },
  {
    image: 'case-study-2.jpg',
    category: 'SEO Analysis',
    title: 'Growth Marketing B2B',
  },
  {
    image: 'case-study-3.jpg',
    category: 'Planning',
    title: 'Strategia Lead Gen',
  },
];

const blogPosts = [
  {
    image: 'blog-1.jpg',
    month: 'Set',
    day: '25',
    category: 'SEO',
    title: 'Come costruire una strategia SEO che porta lead',
    author: 'Team Mago',
  },
  {
    image: 'blog-2.jpg',
    month: 'Ott',
    day: '28',
    category: 'Marketing',
    title: 'Linee guida pratiche per campagne più redditizie',
    author: 'Mago System',
  },
  {
    image: 'blog-3.jpg',
    month: 'Dic',
    day: '30',
    category: 'SEO Analysis',
    title: 'Dati, contenuti e automazioni per scalare meglio',
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
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>Mago System</span>
    </a>
  );
}

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'SEO e contenuti',
    message: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add('modal-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
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
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Chiudi form">
          <X size={22} />
        </button>
        <p className="eyebrow">Parliamo del progetto</p>
        <h2 id="contact-modal-title">Richiedi una consulenza</h2>
        <p>
          Raccontaci obiettivi e canali attivi. Ti risponderemo con una prima analisi e le prossime azioni
          consigliate.
        </p>
        <form className="modal-form" onSubmit={submitForm} noValidate>
          <label>
            Nome
            <input name="name" value={form.name} onChange={updateField} placeholder="Mario Rossi" />
            {errors.name && <span>{errors.name}</span>}
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder="mario@azienda.it" />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            Telefono
            <input name="phone" value={form.phone} onChange={updateField} placeholder="+39 333 000 0000" />
          </label>
          <label>
            Servizio
            <select name="service" value={form.service} onChange={updateField}>
              <option>SEO e contenuti</option>
              <option>Performance marketing</option>
              <option>Automazioni AI</option>
              <option>Strategia digitale completa</option>
            </select>
          </label>
          <label className="full-field">
            Messaggio
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows="4"
              placeholder="Obiettivi, mercato, sito attuale e canali da migliorare."
            />
            {errors.message && <span>{errors.message}</span>}
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
            Inizia ora <ArrowUpRight size={18} />
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <nav
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
            Richiedi audit <ArrowUpRight size={18} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-soft" id="home">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">👋 Ciao, siamo Mago System</p>
              <h1>Strategie SEO ad alto impatto per far crescere il tuo business</h1>
              <p>
                Aiutiamo aziende e brand a trasformare ricerca, contenuti, advertising e automazioni AI in
                acquisizione clienti misurabile.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={openModal}>
                  I nostri servizi <ArrowUpRight size={18} />
                </button>
                <button className="button secondary" type="button" onClick={openModal}>
                  Parla con noi <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
            <div className="hero-visual reveal delay-1" aria-label="Consulente Mago System">
              <img className="hero-pattern" src={`${ASSETS}hero-pattern.svg`} alt="" />
              <img className="hero-glow" src={`${ASSETS}hero-glow.png`} alt="" />
              <img className="hero-person" src={`${ASSETS}hero-person.png`} alt="Consulente digital agency" />
              <div className="user-badge">
                <strong>1M+ utenti raggiunti</strong>
                <span>
                  <img src={`${ASSETS}avatar-1.png`} alt="" />
                  <img src={`${ASSETS}avatar-2.png`} alt="" />
                  <img src={`${ASSETS}avatar-3.png`} alt="" />
                </span>
              </div>
              <div className="review-badge">
                <img src={`${ASSETS}google-logo.svg`} alt="" />
                <span className="stars">★★★★★</span>
                <span>(4.8) Review</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="servizi">
          <div className="container">
            <div className="service-panel reveal">
              <h2>SEO potenziata dall'AI: ottimizza, analizza e domina</h2>
              <div className="service-grid">
                {services.map((service) => (
                  <article className="service-card" key={service.title}>
                    <img src={`${ASSETS}${service.icon}`} alt="" />
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
            <h2>Scelti da aziende ambiziose</h2>
            <div className="logo-marquee">
              <div>
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <img key={`${logo}-${index}`} src={`${ASSETS}${logo}`} alt="" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-grid">
            <div className="feature-media reveal">
              <img className="feature-main" src={`${ASSETS}feature-main.jpg`} alt="Consulente al telefono" />
              <img className="feature-overlay" src={`${ASSETS}feature-overlay.png`} alt="Dashboard marketing" />
            </div>
            <div className="feature-copy reveal delay-1">
              <p className="eyebrow">🤩 Funzionalità esclusive</p>
              <h2>Fai crescere il business con strumenti AI e strategia digitale</h2>
              <p>
                Uniamo analisi, creatività e automazioni per costruire funnel, contenuti e campagne che generano
                opportunità concrete.
              </p>
              <div className="feature-items">
                <article>
                  <img src={`${ASSETS}icon-ai-seo.svg`} alt="" />
                  <h3>Soluzioni AI SEO</h3>
                  <p>Tecnologie e processi per aumentare visibilità, posizionamenti e qualità del traffico.</p>
                </article>
                <article>
                  <img src={`${ASSETS}icon-digital-strategy.svg`} alt="" />
                  <h3>Strategia digitale</h3>
                  <p>Piani data-driven per migliorare conversioni, tracciamento e performance dei canali.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section section-soft" id="case-study">
          <div className="container">
            <h2 className="center-title">Abbiamo completato 100+ progetti digitali</h2>
            <div className="filter-tabs" aria-label="Filtri case study">
              {['Tutti', 'SEO', 'Marketing', 'Keyword', 'Planning', 'Business'].map((item, index) => (
                <button className={index === 0 ? 'active' : ''} type="button" key={item}>
                  {item}
                </button>
              ))}
            </div>
            <div className="case-grid">
              {caseStudies.map((study) => (
                <article className="case-card reveal" key={study.title}>
                  <img src={`${ASSETS}${study.image}`} alt={study.title} />
                  <div>
                    <span>{study.category}</span>
                    <h3>{study.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            <button className="button primary compact" type="button" onClick={openModal}>
              Vedi altri
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
                  Mago System ha trasformato il nostro modo di acquisire lead: strategia chiara, contenuti solidi e
                  campagne tracciate con precisione.
                </p>
                <div className="trust-row">
                  <span>★★★★★</span>
                  <strong>4.7/5 su Trustpilot</strong>
                </div>
              </div>
              <img src={`${ASSETS}testimonial-person.png`} alt="Cliente soddisfatto" />
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
                    <img src={`${ASSETS}${post.image}`} alt={post.title} />
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
                <h2>Cerchi una digital agency orientata ai risultati?</h2>
                <p>Partiamo da audit, priorità e roadmap. Poi costruiamo il sistema per generare crescita.</p>
                <button className="button primary" type="button" onClick={openModal}>
                  Richiedi audit gratuito <ArrowUpRight size={18} />
                </button>
              </div>
              <img src={`${ASSETS}footer-pattern.svg`} alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contatti">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Digital agency per SEO, advertising, contenuti e automazioni AI orientate alla crescita.</p>
            <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="Email Address" aria-label="Email newsletter" />
              <button type="button" onClick={openModal} aria-label="Apri form contatti">
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>
          <div>
            <h3>Risorse</h3>
            <a href="#case-study">Case Study</a>
            <a href="#blog">Blog</a>
            <a href="#servizi">Servizi</a>
            <button type="button" onClick={openModal}>Audit SEO</button>
          </div>
          <div>
            <h3>Quick Link</h3>
            <a href="#home">Home</a>
            <a href="#servizi">Servizi</a>
            <a href="#blog">Blog & Articoli</a>
            <button type="button" onClick={openModal}>Consulenza</button>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#home">Chi siamo</a>
            <a href="#case-study">Portfolio</a>
            <a href="#servizi">Metodo</a>
            <a href="#contatti">Contatti</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Via Roma 55, Milano, Italia</p>
            <a href="mailto:hello@magosystem.it">
              <Mail size={18} /> hello@magosystem.it
            </a>
            <a href="tel:+390000000000">
              <Phone size={18} /> +39 000 000 000
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
