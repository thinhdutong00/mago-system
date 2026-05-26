import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Video,
  X,
} from 'lucide-react';

const ASSETS = '/assets/';
const SITE_URL = 'https://magosystem.it';

function OptimizedImage({ src, webp, alt, ...props }) {
  return (
    <picture>
      {webp && <source srcSet={`${ASSETS}${webp}`} type="image/webp" />}
      <img src={`${ASSETS}${src}`} alt={alt} decoding="async" {...props} />
    </picture>
  );
}

const sectors = [
  {
    slug: 'cliniche-dentali',
    label: 'Cliniche dentali',
    eyebrow: 'Acquisizione pazienti per odontoiatria',
    headline: 'Appuntamenti già fissati da pazienti locali per servizi dentali ad alto valore',
    subhead:
      'Un percorso di acquisizione pensato per studi e cliniche dentali che vogliono più richieste locali, più valore percepito e meno dipendenza da sconti o passaparola.',
    cardText: 'Funnel locali per prime visite, urgenze e trattamenti ad alto valore.',
    pain: 'Troppe campagne parlano a tutti e portano preventivi al ribasso.',
    system:
      'Costruiamo funnel locali per urgenze, implantologia, ortodonzia invisibile e trattamenti ad alto valore, collegando annuncio, pagina e follow-up.',
    benefits: ['Lead locali con intento chiaro', 'Copy orientato a bisogno e fiducia', 'Filtri per evitare richieste fuori target'],
  },
  {
    slug: 'centri-diagnostici-privati',
    label: 'Centri diagnostici privati',
    eyebrow: 'Domanda privata e prenotazioni rapide',
    headline: 'Prenotazioni private più prevedibili per esami, visite e check-up',
    subhead:
      'Rendiamo visibili disponibilità, tempi e specializzazioni del centro a chi sta già cercando una soluzione privata nella propria zona.',
    cardText: 'Campagne e landing per esami, visite, screening e check-up privati.',
    pain: 'Il paziente confronta tempi, chiarezza e fiducia prima ancora del prezzo.',
    system:
      'Creiamo campagne e landing per radiologia, ecografie, analisi, screening e pacchetti diagnostici, con messaggi distinti per urgenza e prevenzione.',
    benefits: ['Domanda intercettata per esame specifico', 'Messaggi chiari su tempi e percorso', 'Tracciamento delle richieste utili'],
  },
  {
    slug: 'fisioterapia-specializzata',
    label: 'Fisioterapia specializzata',
    eyebrow: 'Percorsi terapeutici ad alto valore',
    headline: 'Portiamo pazienti motivati verso percorsi fisioterapici specialistici',
    subhead:
      'Aiutiamo studi e centri fisioterapici a comunicare specializzazione, metodo e continuità del percorso, non semplici sedute isolate.',
    cardText: 'Percorsi digitali per riabilitazione, sport, post-operatorio e dolore.',
    pain: 'Se il valore clinico non è spiegato, il confronto diventa solo sul prezzo della seduta.',
    system:
      'Segmentiamo per problema, zona e percorso: riabilitazione sportiva, post-operatoria, dolore persistente, postura e programmi specialistici.',
    benefits: ['Messaggi per bisogno specifico', 'Educazione alla continuità del percorso', 'Follow-up per recuperare richieste non concluse'],
  },
  {
    slug: 'dermatologi',
    label: 'Dermatologi',
    eyebrow: 'Visite private e dermatologia avanzata',
    headline: 'Aumentiamo richieste qualificate per visite, controlli e trattamenti dermatologici',
    subhead:
      'Costruiamo percorsi di acquisizione che fanno percepire autorevolezza, sicurezza e chiarezza prima del primo contatto.',
    cardText: 'Posizionamento e richieste per visite, controlli e trattamenti specialistici.',
    pain: 'Molte persone rimandano o cercano online senza capire a chi affidarsi.',
    system:
      'Allineiamo intenti di ricerca, campagne e landing per visite dermatologiche, mappatura nei, acne, tricologia e trattamenti specialistici.',
    benefits: ['Pagine per bisogno e urgenza', 'Prova e autorevolezza in evidenza', 'CTA chiare per prenotare o richiedere informazioni'],
  },
  {
    slug: 'oculisti',
    label: 'Oculisti',
    eyebrow: 'Acquisizione pazienti per oculistica',
    headline: 'Più richieste per visite, controlli e percorsi oculistici privati',
    subhead:
      'Aiutiamo studi e centri oculistici a intercettare chi cerca una risposta rapida e professionale nella propria area.',
    cardText: 'Percorsi per visite private, prevenzione, diagnostica e servizi avanzati.',
    pain: 'La ricerca online è piena di informazioni, ma poche pagine trasformano il bisogno in prenotazione.',
    system:
      'Creiamo percorsi per visite, prevenzione, diagnostica e servizi specialistici, con messaggi costruiti sul bisogno reale del paziente.',
    benefits: ['Intenti locali ad alta priorità', 'Landing semplici da leggere', 'Misurazione di chiamate e richieste'],
  },
  {
    slug: 'ginecologi',
    label: 'Ginecologi',
    eyebrow: 'Fiducia, discrezione e continuità',
    headline: 'Richieste più qualificate per visite ginecologiche e percorsi privati',
    subhead:
      'Comunichiamo attenzione, competenza e semplicità di prenotazione per aiutare la paziente a scegliere con più sicurezza.',
    cardText: 'Messaggi chiari e rispettosi per visite, prevenzione e percorsi specialistici.',
    pain: 'In ambiti sensibili, la fiducia pesa quanto la visibilità.',
    system:
      'Disegniamo campagne e pagine per visite, prevenzione, gravidanza, menopausa e percorsi specialistici con tono chiaro e rispettoso.',
    benefits: ['Copy attento e professionale', 'Segmentazione per bisogno', 'CTA discrete e immediate'],
  },
  {
    slug: 'urologi-andrologi',
    label: 'Urologi / Andrologi',
    eyebrow: 'Acquisizione pazienti in aree sensibili',
    headline: 'Facilitiamo il primo contatto per visite urologiche e andrologiche private',
    subhead:
      'Riduciamo attrito, imbarazzo e confusione con messaggi chiari, discreti e orientati alla prenotazione.',
    cardText: 'Acquisizione discreta per visite, prevenzione e problemi ricorrenti.',
    pain: 'Il paziente spesso rimanda: la pagina deve rendere semplice e rassicurante chiedere informazioni.',
    system:
      'Attiviamo funnel per visite, prevenzione, problemi ricorrenti e percorsi specialistici, con privacy e chiarezza al centro.',
    benefits: ['Tono discreto e autorevole', 'Messaggi per intenzione specifica', 'Percorso breve verso richiesta o chiamata'],
  },
  {
    slug: 'medicina-estetica-chirurgia-estetica',
    label: 'Medicina estetica / Chirurgia estetica',
    eyebrow: 'Domanda estetica ad alto valore',
    headline: 'Più consulenze qualificate per trattamenti estetici e chirurgia privata',
    subhead:
      'Aiutiamo cliniche e medici estetici a generare richieste più consapevoli, spostando la conversazione da prezzo a valore, fiducia e risultato atteso.',
    cardText: 'Funnel premium per trattamenti viso/corpo, consulenze e percorsi estetici.',
    pain: 'Il settore è competitivo: se il posizionamento è debole, il paziente sceglie per prezzo.',
    system:
      'Costruiamo campagne, landing e follow-up per trattamenti viso/corpo, consulenze e percorsi premium con prova sociale e filtri di qualità.',
    benefits: ['Posizionamento premium', 'Creatività orientate al valore', 'Qualifica prima della consulenza'],
  },
  {
    slug: 'psicologi-psicoterapeuti',
    label: 'Psicologi / Psicoterapeuti',
    eyebrow: 'Fiducia prima del contatto',
    headline: 'Aiutiamo professionisti e centri psicologici a ricevere richieste più adatte',
    subhead:
      'Creiamo percorsi digitali sobri e rispettosi, pensati per far capire approccio, specializzazione e modalità di contatto.',
    cardText: 'Comunicazione sobria per specializzazioni, approccio e modalità di contatto.',
    pain: 'Chi cerca supporto ha bisogno di capire rapidamente se si sente nel posto giusto.',
    system:
      'Organizziamo messaggi e pagine per aree di intervento, terapia individuale, coppia, adolescenti e percorsi online o in studio.',
    benefits: ['Tono umano e professionale', 'Specializzazioni leggibili', 'Richieste più coerenti con il servizio'],
  },
  {
    slug: 'nutrizionisti-specializzati',
    label: 'Nutrizionisti specializzati',
    eyebrow: 'Percorsi nutrizionali ad alto valore',
    headline: 'Più richieste per percorsi nutrizionali specialistici e continuativi',
    subhead:
      'Aiutiamo nutrizionisti e studi specializzati a comunicare metodo, differenza e valore del percorso oltre la semplice dieta.',
    cardText: 'Percorsi per nutrizione sportiva, clinica, metabolica e specialistica.',
    pain: 'Il mercato è saturo di soluzioni rapide: serve rendere evidente perché scegliere un percorso professionale.',
    system:
      'Creiamo funnel per nutrizione sportiva, clinica, metabolica, femminile e percorsi specialistici, con contenuti che qualificano la domanda.',
    benefits: ['Segmentazione per obiettivo', 'Valore del percorso spiegato meglio', 'Follow-up per richieste non ancora pronte'],
  },
];

const sectorOptions = sectors.map((sector) => sector.label);

const bookingWindows = [
  'Mattina 09:00 - 12:00',
  'Pausa pranzo 12:00 - 14:00',
  'Pomeriggio 14:00 - 18:00',
  'Fine giornata 18:00 - 20:00',
];

const CONSENT_STORAGE_KEY = 'mago-cookie-consent-v2';
const CONSENT_MAX_AGE_DAYS = 180;
const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: 2,
};

const homeMeta = {
  title: 'Mago System Sanitario - Acquisizione pazienti per strutture sanitarie',
  description:
    'Sistema di acquisizione pazienti per cliniche, studi e professionisti sanitari: più appuntamenti qualificati da pazienti locali, senza dipendere da sconti o passaparola.',
  path: '/',
};

const navItems = [
  { label: 'Metodo', href: '/#metodo' },
  { label: 'MAGO', href: '/#mago' },
  { label: 'Settori sanitari', href: '/#settori' },
];

const methodSteps = [
  {
    icon: Search,
    title: 'Intercettiamo domanda reale',
    text: 'Partiamo da ricerche, urgenze, territorio e servizi ad alto valore. Il paziente deve arrivare con un bisogno concreto, non per curiosità.',
  },
  {
    icon: Target,
    title: 'Costruiamo messaggi che filtrano',
    text: 'Promessa, prova, obiezioni e CTA lavorano insieme per far percepire valore prima del contatto.',
  },
  {
    icon: CalendarCheck,
    title: 'Portiamo verso la prenotazione',
    text: 'Landing, tracking e follow-up riducono attrito e rendono più leggibile cosa succede dopo ogni campagna.',
  },
];

const magoPillars = [
  {
    letter: 'M',
    title: 'Marketing',
    text: 'Definiamo posizionamento, promessa e messaggi sanitari per far percepire valore prima ancora del contatto.',
  },
  {
    letter: 'A',
    title: 'Advertising',
    text: 'Attiviamo campagne Google e Meta orientate a pazienti locali, servizi prioritari e intenzioni realmente prenotabili.',
  },
  {
    letter: 'G',
    title: 'Growth',
    text: 'Costruiamo crescita sostenibile: più richieste qualificate, più continuità e meno dipendenza da sconti o passaparola.',
  },
  {
    letter: 'O',
    title: 'Optimization',
    text: 'Ottimizziamo landing, tracking, follow-up e creatività per migliorare qualità del lead e controllo del budget.',
  },
];

const dentalValueCards = [
  {
    title: 'Più desiderio',
    text: 'La promessa mette al centro appuntamenti per implantologia, ortodonzia, estetica dentale e urgenze realmente prenotabili.',
  },
  {
    title: 'Più fiducia',
    text: 'Landing e messaggi spiegano perché scegliere lo studio prima del contatto, con tono professionale e chiaro.',
  },
  {
    title: 'Meno tempo',
    text: 'Il percorso porta il paziente verso una richiesta concreta già dai primi giorni di attivazione operativa.',
  },
  {
    title: 'Meno sforzo',
    text: 'Annuncio, pagina e follow-up riducono attrito: il team riceve richieste più ordinate e facili da lavorare.',
  },
];

const dentalServices = [
  'Implantologia e riabilitazioni',
  'Ortodonzia invisibile',
  'Urgenze odontoiatriche',
  'Estetica dentale',
  'Prime visite qualificate',
  'Igiene e prevenzione privata',
];

const dentalMagoPillars = [
  {
    letter: 'M',
    title: 'Marketing dentale',
    text: 'Posizioniamo i trattamenti ad alto valore con messaggi che fanno percepire risultato, fiducia e percorso.',
  },
  {
    letter: 'A',
    title: 'Advertising locale',
    text: 'Attiviamo campagne Google e Meta su città, urgenza, servizio e intenzione di prenotazione.',
  },
  {
    letter: 'G',
    title: 'Growth dell’agenda',
    text: 'Orientiamo le richieste verso prime visite e consulenze utili, non semplici curiosità da prezzo.',
  },
  {
    letter: 'O',
    title: 'Optimization continua',
    text: 'Miglioriamo creatività, landing e follow-up leggendo qualità delle richieste, chiamate e conversioni.',
  },
];

const dentalComparison = [
  {
    title: 'Percorso dispersivo',
    text: 'Richieste non sempre pronte, messaggi centrati sul prezzo e segreteria costretta a ricostruire bisogno, urgenza e servizio.',
  },
  {
    title: 'Percorso Mago System',
    text: 'Il paziente arriva da una pagina specifica, capisce il valore del trattamento e lascia una richiesta più completa.',
  },
];

const privacyMeta = {
  title: 'Privacy Policy - Mago System',
  description:
    'Informativa privacy di Mago System per il sito, le richieste di contatto e la gestione dei soli cookie tecnici essenziali.',
  path: '/privacy-policy',
};

const testimonials = [
  {
    quote:
      'La differenza è stata nella qualità delle richieste: meno persone interessate solo allo sconto e più pazienti con un bisogno già chiaro.',
    name: 'Direzione clinica odontoiatrica',
    role: 'Clinica privata',
  },
  {
    quote:
      'Abbiamo capito quali servizi meritavano campagne dedicate e quali messaggi portavano richieste davvero prenotabili.',
    name: 'Responsabile marketing sanitario',
    role: 'Centro diagnostico',
  },
  {
    quote:
      'Il percorso è diventato più ordinato: annuncio, pagina e contatto parlano la stessa lingua.',
    name: 'Founder studio specialistico',
    role: 'Sanità privata',
  },
];

function getPath() {
  const normalized = window.location.pathname.replace(/\/+$/, '');
  return normalized || '/';
}

function getTodayInputValue() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function normalizeConsent(value = {}) {
  return {
    ...defaultConsent,
    analytics: Boolean(value.analytics),
    marketing: Boolean(value.marketing),
    necessary: true,
  };
}

function getStoredConsent() {
  try {
    const rawConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawConsent) return null;
    const parsedConsent = JSON.parse(rawConsent);
    const savedAt = Number(parsedConsent.savedAt || 0);
    const isExpired = Date.now() - savedAt > CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    if (parsedConsent.version !== defaultConsent.version || isExpired) return null;
    return normalizeConsent(parsedConsent);
  } catch {
    return null;
  }
}

function updateConsentMode(consent) {
  if (typeof window === 'undefined') return;

  const normalizedConsent = normalizeConsent(consent);
  window.magoConsent = normalizedConsent;

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: normalizedConsent.marketing ? 'granted' : 'denied',
      analytics_storage: normalizedConsent.analytics ? 'granted' : 'denied',
      ad_user_data: normalizedConsent.marketing ? 'granted' : 'denied',
      ad_personalization: normalizedConsent.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('consent', normalizedConsent.marketing ? 'grant' : 'revoke');
  }

  window.dispatchEvent(new CustomEvent('mago-consent-change', { detail: normalizedConsent }));
}

function saveConsent(consent) {
  const normalizedConsent = normalizeConsent(consent);
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({
      ...normalizedConsent,
      savedAt: Date.now(),
    }),
  );
  updateConsentMode(normalizedConsent);
  return normalizedConsent;
}

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function Logo({ navigate }) {
  return (
    <a
      href="/"
      className="logo"
      aria-label="Mago System home"
      onClick={(event) => {
        event.preventDefault();
        navigate('/');
      }}
    >
      <img src={`${ASSETS}mago-system-logo-header.webp`} alt="Mago System" width="499" height="166" />
    </a>
  );
}

function SmartLink({ href, navigate, children, className, onClick, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (href.startsWith('/')) {
          event.preventDefault();
          navigate(href);
        }
        onClick?.();
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: sectorOptions[0],
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
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
    setSubmitState('idle');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Inserisci il nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Inserisci una email valida.';
    if (!form.message.trim()) nextErrors.message = 'Descrivi brevemente il progetto.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Invio non riuscito.');
      }

      setForm({
        name: '',
        email: '',
        phone: '',
        service: sectorOptions[0],
        message: '',
      });
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
      setErrors({ submit: error.message || 'Invio non riuscito. Riprova tra poco.' });
    }
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
        <p className="eyebrow">Parliamo del tuo settore sanitario</p>
        <h2 id="contact-modal-title">Richiedi una consulenza</h2>
        <p id="contact-modal-description">
          Raccontaci struttura, zona, servizi prioritari e canali attivi. Ti risponderemo con una prima lettura del
          potenziale di acquisizione pazienti.
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
              {sectorOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Messaggio
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows="4"
              placeholder="Tipo di struttura, servizi da spingere, città, sito attuale e canali da migliorare."
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
          <button className="button primary full-field" type="submit" disabled={submitState === 'loading'}>
            {submitState === 'loading' ? 'Invio in corso...' : 'Invia richiesta'} <Send size={18} />
          </button>
          <p className={`form-status full-field ${submitState === 'success' ? 'is-success' : ''}`} role="status">
            {submitState === 'success'
              ? 'Richiesta inviata correttamente. Ti risponderemo a breve.'
              : errors.submit || ''}
          </p>
        </form>
      </div>
    </div>
  );
}

function BookingModal({ isOpen, onClose }) {
  const minBookingDate = useMemo(getTodayInputValue, []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: sectorOptions[0],
    preferredDate: '',
    preferredTime: bookingWindows[0],
    website: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
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
    setSubmitState('idle');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Inserisci il nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Inserisci una email valida.';
    if (!form.preferredDate) nextErrors.preferredDate = 'Scegli un giorno indicativo.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitState('loading');

    const message = [
      'Richiesta booking videochiamata strategica.',
      '',
      `Giorno preferito: ${form.preferredDate}`,
      `Fascia preferita: ${form.preferredTime}`,
      `Sito attuale: ${form.website || 'Non indicato'}`,
      '',
      'Note:',
      form.notes || 'Nessuna nota aggiuntiva.',
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'booking',
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          website: form.website,
          message,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Prenotazione non riuscita.');
      }

      setForm({
        name: '',
        email: '',
        phone: '',
        service: sectorOptions[0],
        preferredDate: '',
        preferredTime: bookingWindows[0],
        website: '',
        notes: '',
      });
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
      setErrors({ submit: error.message || 'Prenotazione non riuscita. Riprova tra poco.' });
    }
  };

  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-modal booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Chiudi booking">
          <X size={22} />
        </button>
        <p className="eyebrow">Videochiamata strategica</p>
        <h2 id="booking-modal-title">Prenota una videochiamata</h2>
        <p id="booking-modal-description">
          Scegli una preferenza indicativa: ti ricontatteremo per confermare lo slot migliore e preparare una lettura
          mirata su settore, zona e canali attivi.
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
              aria-describedby={errors.name ? 'booking-name-error' : undefined}
            />
            {errors.name && (
              <span id="booking-name-error" role="alert">
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
              aria-describedby={errors.email ? 'booking-email-error' : undefined}
            />
            {errors.email && (
              <span id="booking-email-error" role="alert">
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
            Settore
            <select name="service" value={form.service} onChange={updateField}>
              {sectorOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Giorno preferito
            <input
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={updateField}
              min={minBookingDate}
              required
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={errors.preferredDate ? 'booking-date-error' : undefined}
            />
            {errors.preferredDate && (
              <span id="booking-date-error" role="alert">
                {errors.preferredDate}
              </span>
            )}
          </label>
          <label>
            Fascia oraria
            <select name="preferredTime" value={form.preferredTime} onChange={updateField}>
              {bookingWindows.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Sito attuale
            <input
              name="website"
              type="url"
              value={form.website}
              onChange={updateField}
              placeholder="https://www.tuosito.it"
              autoComplete="url"
            />
          </label>
          <label className="full-field">
            Note utili
            <textarea
              name="notes"
              value={form.notes}
              onChange={updateField}
              rows="3"
              placeholder="Servizi da spingere, città, urgenze commerciali o campagne già attive."
            />
          </label>
          <button className="button primary full-field" type="submit" disabled={submitState === 'loading'}>
            {submitState === 'loading' ? 'Invio in corso...' : 'Prenota videochiamata'} <CalendarCheck size={18} />
          </button>
          <p className={`form-status full-field ${submitState === 'success' ? 'is-success' : ''}`} role="status">
            {submitState === 'success'
              ? 'Richiesta booking inviata. Ti ricontatteremo per confermare lo slot.'
              : errors.submit || ''}
          </p>
        </form>
      </div>
    </div>
  );
}

function Header({ navigate, openModal, openBooking, modalOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > 100;

      if (menuOpen || modalOpen || currentScrollY <= 8) {
        setHeaderHidden(false);
      } else {
        setHeaderHidden(scrollingDown && pastThreshold);
      }

      lastScrollY = Math.max(currentScrollY, 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen, modalOpen]);

  return (
    <>
      <div className="announcement">
        <span>Acquisizione pazienti per strutture sanitarie private</span>
        <button type="button" onClick={openBooking}>
          Prenota videochiamata <CalendarCheck size={15} />
        </button>
      </div>
      <header className={`site-header ${headerHidden ? 'is-hidden' : ''}`}>
        <div className="header-inner">
          <Logo navigate={navigate} />
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {navItems.map((item) => (
              <SmartLink key={item.href} href={item.href} navigate={navigate}>
                {item.label}
              </SmartLink>
            ))}
            <div className="sector-menu">
              <button type="button" aria-haspopup="true">
                Settori <ChevronDown size={16} />
              </button>
              <div className="sector-menu-panel">
                {sectors.map((sector) => (
                  <SmartLink key={sector.slug} href={`/${sector.slug}`} navigate={navigate}>
                    {sector.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          </nav>
          <button className="button primary header-cta" type="button" onClick={openBooking}>
            Prenota videochiamata <CalendarCheck size={18} />
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
          <div className="mobile-nav-scroll">
            <div className="mobile-nav-section mobile-nav-primary">
              {navItems.map((item) => (
                <SmartLink key={item.href} href={item.href} navigate={navigate} onClick={closeMenu}>
                  {item.label}
                </SmartLink>
              ))}
            </div>
            <div className="mobile-nav-section">
              <span className="mobile-nav-label">Settori sanitari</span>
              <div className="mobile-sector-list">
                {sectors.map((sector) => (
                  <SmartLink key={sector.slug} href={`/${sector.slug}`} navigate={navigate} onClick={closeMenu}>
                    {sector.label}
                  </SmartLink>
                ))}
              </div>
            </div>
            <button
              className="button primary"
              type="button"
              onClick={() => {
                closeMenu();
                openBooking();
              }}
            >
              Prenota videochiamata <CalendarCheck size={18} />
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => {
                closeMenu();
                openModal();
              }}
            >
              Richiedi consulenza <ArrowUpRight size={18} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual reveal delay-1" aria-label="Sistema di acquisizione pazienti Mago System">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="medical-card main">
        <span>
          <Stethoscope size={28} />
        </span>
        <strong>Pazienti locali</strong>
        <small>interesse reale, zona corretta, servizio prioritario</small>
      </div>
      <div className="medical-card metric">
        <CalendarCheck size={25} />
        <strong>Agenda</strong>
        <small>richieste verso prenotazioni</small>
      </div>
      <div className="medical-card search">
        <Search size={25} />
        <strong>Intento</strong>
        <small>campagne per bisogno specifico</small>
      </div>
      <div className="medical-card trust">
        <ShieldCheck size={25} />
        <strong>Fiducia</strong>
        <small>prova, chiarezza e percorso</small>
      </div>
      <div className="hero-switchers" aria-hidden="true">
        <span className="active">Pazienti locali</span>
        <span>Servizi premium</span>
        <span>Follow-up</span>
      </div>
    </div>
  );
}

function HomePage({ navigate, openModal, openBooking }) {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Mago System per il settore sanitario</p>
            <h1>Portiamo alla tua struttura appuntamenti qualificati da pazienti locali</h1>
            <p>
              Costruiamo sistemi di acquisizione per cliniche e professionisti sanitari: posizionamento chiaro,
              campagne locali, crescita misurabile e ottimizzazione continua dei percorsi di richiesta.
            </p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Richiedi consulenza <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="hero-proof" aria-label="Leve del sistema MAGO">
              <span>Marketing sanitario</span>
              <span>Advertising locale</span>
              <span>Growth misurata</span>
              <span>Optimization continua</span>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <MagoSection />

      <BookingBand openBooking={openBooking} />

      <section className="split-section">
        <div className="container split-grid">
          <div className="split-media reveal">
            <OptimizedImage
              src="feature-main.jpg"
              webp="feature-main.webp"
              alt="Consulenza per acquisizione pazienti sanitari"
              width="512"
              height="341"
              loading="lazy"
            />
          </div>
          <div className="split-copy reveal delay-1">
            <p className="eyebrow">Perché il sanitario è diverso</p>
            <h2>Non basta portare lead. Serve far arrivare pazienti pronti al passo giusto.</h2>
            <p>
              Nel sanitario privato il paziente valuta fiducia, urgenza, specializzazione, distanza e chiarezza del
              percorso. Per questo ogni campagna deve filtrare, rassicurare e accompagnare verso la richiesta.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={20} /> Messaggi per bisogni reali e servizi prioritari
              </li>
              <li>
                <CheckCircle2 size={20} /> Landing veloci, professionali e orientate alla prenotazione
              </li>
              <li>
                <CheckCircle2 size={20} /> Tracking per capire quali richieste generano valore
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sectors-section" id="settori">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Settori sanitari</p>
            <h2>Pagine e funnel verticali per ogni specializzazione</h2>
            <p>
              Ogni verticale ha bisogno di una promessa diversa. Qui sotto trovi le aree per cui costruiamo percorsi di
              acquisizione pazienti su misura.
            </p>
          </div>
          <div className="sector-grid">
            {sectors.map((sector) => (
              <SmartLink className="sector-card reveal" key={sector.slug} href={`/${sector.slug}`} navigate={navigate}>
                <span>{sector.eyebrow}</span>
                <h3>{sector.label}</h3>
                <p>{sector.cardText}</p>
                <ArrowUpRight size={20} aria-hidden="true" />
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Metodo Mago System</p>
            <h2>Dal bisogno del paziente alla richiesta qualificata</h2>
          </div>
          <div className="method-grid">
            {methodSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className="method-card reveal" key={step.title}>
                  <small>0{index + 1}</small>
                  <Icon size={30} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="container comparison-grid">
          <div className="comparison-copy reveal">
            <p className="eyebrow">Prima / dopo</p>
            <h2>Meno campagne generiche. Più percorsi costruiti sul valore sanitario.</h2>
          </div>
          <div className="comparison-panels">
            <article className="comparison-card muted reveal">
              <h3>Approccio tradizionale</h3>
              <p>Annunci generici, traffico freddo, richieste da prezzo basso, follow-up manuale e poca chiarezza sui servizi che generano valore.</p>
            </article>
            <article className="comparison-card active reveal delay-1">
              <h3>Sistema Mago</h3>
              <p>Messaggi verticali, pagine rapide, prova sociale, CTA semplici e dati per capire quali pazienti arrivano dai canali giusti.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-track reveal" aria-label="Testimonianze sanitarie">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <div className="stars" aria-hidden="true">★★★★★</div>
                <p>“{item.quote}”</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta openModal={openModal} openBooking={openBooking} />
    </main>
  );
}

function MagoSection() {
  return (
    <section className="mago-section" id="mago">
      <div className="wide-container mago-panel reveal">
        <div className="mago-intro">
          <p className="eyebrow">Metodo proprietario</p>
          <h2>MAGO: quattro leve per trasformare visibilità sanitaria in richieste qualificate</h2>
          <p>
            Non lavoriamo su un singolo canale isolato. Colleghiamo strategia, campagne, crescita e ottimizzazione in
            un sistema leggibile per il paziente e misurabile per la struttura.
          </p>
        </div>
        <div className="mago-grid" aria-label="Significato dell'acronimo MAGO">
          {magoPillars.map((pillar, index) => (
            <article className="mago-card reveal" style={{ transitionDelay: `${index * 0.06}s` }} key={pillar.letter}>
              <span>{pillar.letter}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingBand({ openBooking }) {
  return (
    <section className="booking-band" aria-labelledby="booking-band-title">
      <div className="container booking-band-card reveal">
        <div className="booking-band-icon" aria-hidden="true">
          <Video size={30} />
        </div>
        <div>
          <p className="eyebrow">Slot strategico</p>
          <h2 id="booking-band-title">Blocca una videochiamata prima di investire altro budget</h2>
          <p>
            In 30 minuti analizziamo settore, città, servizi prioritari e frizioni del funnel. Così capisci dove può
            nascere crescita prima di aggiungere nuove campagne.
          </p>
        </div>
        <button className="button primary" type="button" onClick={openBooking}>
          Prenota videochiamata <CalendarDays size={18} />
        </button>
      </div>
    </section>
  );
}

function DentalHeroVisual() {
  return (
    <div className="dental-hero-visual reveal delay-1" aria-label="Visual clinica dentale Mago System">
      <picture>
        <source
          srcSet={`${ASSETS}dental-hero-dentist-640.webp 640w, ${ASSETS}dental-hero-dentist-900.webp 900w`}
          sizes="(max-width: 720px) 92vw, min(48vw, 760px)"
          type="image/webp"
        />
        <img
          src={`${ASSETS}dental-hero-dentist-900.webp`}
          alt="Dentista sorridente in una clinica moderna con interfacce digitali per appuntamenti e crescita"
          width="900"
          height="675"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="dental-hero-badge dental-hero-badge--top">
        <CalendarCheck size={20} />
        <span>Prime visite qualificate</span>
      </div>
      <div className="dental-hero-badge dental-hero-badge--bottom">
        <ShieldCheck size={20} />
        <span>Servizi ad alto valore</span>
      </div>
    </div>
  );
}

function DentalMagoSection() {
  return (
    <section className="mago-section dental-mago-section" id="mago-dentale">
      <div className="wide-container mago-panel reveal">
        <div className="mago-intro">
          <p className="eyebrow">Metodo MAGO per cliniche dentali</p>
          <h2>Quattro leve per trasformare attenzione locale in appuntamenti più pronti</h2>
          <p>
            Ogni leva aumenta valore percepito e semplicità del percorso: il paziente capisce cosa chiedere, perché
            farlo ora e quale passo compiere per entrare in contatto con lo studio.
          </p>
        </div>
        <div className="mago-grid" aria-label="Metodo MAGO applicato alle cliniche dentali">
          {dentalMagoPillars.map((pillar, index) => (
            <article className="mago-card reveal" style={{ transitionDelay: `${index * 0.06}s` }} key={pillar.letter}>
              <span>{pillar.letter}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DentalPage({ openModal, openBooking }) {
  return (
    <main className="dental-page">
      <section className="dental-landing-hero">
        <div className="wide-container dental-hero-grid">
          <div className="dental-hero-copy reveal">
            <p className="dental-question-pill">
              <Stethoscope size={24} /> Sei un dentista?
            </p>
            <h1>
              <span>Appuntamenti già fissati</span> per servizi dentali <strong>ad alto valore</strong>
            </h1>
            <p>
              Da pazienti locali con necessità urgente, già dalla 1° settimana operativa, senza basarti su sconti o
              passaparola.
            </p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Richiedi consulenza <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <DentalHeroVisual />
        </div>
      </section>

      <section className="dental-city-section">
        <div className="container dental-city-card reveal">
          <ShieldCheck size={30} />
          <p>Collaboriamo solo con</p>
          <h2>una clinica per città</h2>
          <span>
            Per mantenere posizionamento, messaggi e campagne realmente distintivi nella stessa area locale.
          </span>
        </div>
      </section>

      <section className="dental-value-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Equazione del valore</p>
            <h2>Più desiderio e fiducia, meno tempo e meno attrito nel percorso di prenotazione</h2>
            <p>
              La pagina non cerca “contatti qualsiasi”: costruisce un percorso che rende chiara la prestazione, aumenta
              fiducia e accompagna il paziente verso una richiesta più completa.
            </p>
          </div>
          <div className="dental-value-grid">
            {dentalValueCards.map((card) => (
              <article className="dental-value-card reveal" key={card.title}>
                <CheckCircle2 size={24} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DentalMagoSection />

      <section className="dental-services-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Servizi prioritari</p>
            <h2>Campagne verticali sui trattamenti che alzano valore medio e intenzione</h2>
          </div>
          <div className="dental-service-grid">
            {dentalServices.map((service) => (
              <article className="dental-service-card reveal" key={service}>
                <span>{service}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dental-comparison-section">
        <div className="container dental-comparison-grid">
          <div className="comparison-copy reveal">
            <p className="eyebrow">Prima / dopo</p>
            <h2>Quando il valore è chiaro prima del contatto, la conversazione cambia.</h2>
          </div>
          <div className="comparison-panels">
            {dentalComparison.map((item, index) => (
              <article className={`comparison-card reveal ${index === 1 ? 'active delay-1' : 'muted'}`} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="container split-grid reverse">
          <div className="split-copy reveal">
            <p className="eyebrow">Dalla richiesta alla prenotazione</p>
            <h2>Annuncio, pagina e follow-up lavorano come un unico percorso.</h2>
            <p>
              Ogni passaggio riduce incertezza: il paziente vede un messaggio coerente, sceglie il servizio più adatto e
              lascia informazioni più utili al team dello studio.
            </p>
            <div className="split-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Analizza la tua città <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="dashboard-card reveal delay-1">
            <div>
              <BarChart3 size={26} />
              <span>Richieste locali</span>
              <strong>Intenzione chiara</strong>
            </div>
            <div>
              <Activity size={26} />
              <span>Servizi prioritari</span>
              <strong>Valore percepito</strong>
            </div>
            <div>
              <MapPin size={26} />
              <span>Area esclusiva</span>
              <strong>Una città</strong>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        openModal={openModal}
        openBooking={openBooking}
        title="Prenota una videochiamata e verifica se possiamo lavorare nella tua città"
        description="In call controlliamo città, servizi dentali prioritari e situazione attuale. Se l’area è libera, ti mostriamo come potremmo costruire un percorso per portare più richieste qualificate al tuo studio."
      />
    </main>
  );
}

function SectorPage({ sector, openModal, openBooking }) {

  return (
    <main>
      <section className="sector-hero">
        <div className="container sector-hero-grid">
          <div className="sector-hero-copy reveal">
            <p className="eyebrow">{sector.eyebrow}</p>
            <h1>{sector.headline}</h1>
            <p>{sector.subhead}</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Richiedi consulenza <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="sector-score reveal delay-1" aria-label={`Sistema MAGO per ${sector.label}`}>
            <span>{sector.label}</span>
            <div>
              <strong>M Marketing sanitario</strong>
              <strong>A Advertising locale</strong>
              <strong>G Growth misurata</strong>
              <strong>O Optimization continua</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="sector-detail">
        <div className="container sector-detail-grid">
          <article className="detail-panel reveal">
            <Clock3 size={30} />
            <h2>Il problema</h2>
            <p>{sector.pain}</p>
          </article>
          <article className="detail-panel featured reveal delay-1">
            <Sparkles size={30} />
            <h2>Il sistema</h2>
            <p>{sector.system}</p>
          </article>
        </div>
      </section>

      <section className="benefit-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Cosa costruiamo</p>
            <h2>Un percorso pensato per far percepire valore prima del contatto</h2>
          </div>
          <div className="benefit-grid">
            {sector.benefits.map((benefit) => (
              <article className="benefit-card reveal" key={benefit}>
                <CheckCircle2 size={24} />
                <h3>{benefit}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="container split-grid reverse">
          <div className="split-copy reveal">
            <p className="eyebrow">Campagne, landing e follow-up</p>
            <h2>Dal primo clic a una richiesta più pronta, leggibile e coerente.</h2>
            <p>
              Non promettiamo risultati clinici o scorciatoie. Costruiamo un sistema di comunicazione e acquisizione
              che aiuta la persona giusta a capire perché contattarti e quale passo fare dopo.
            </p>
            <div className="split-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Analizza questo settore <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="dashboard-card reveal delay-1">
            <div>
              <BarChart3 size={26} />
              <span>Richieste qualificate</span>
              <strong>Intento alto</strong>
            </div>
            <div>
              <Activity size={26} />
              <span>Servizi prioritari</span>
              <strong>Budget protetto</strong>
            </div>
            <div>
              <MapPin size={26} />
              <span>Area locale</span>
              <strong>Domanda vicina</strong>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        openModal={openModal}
        openBooking={openBooking}
        title={`Vuoi capire il potenziale per ${sector.label.toLowerCase()}?`}
      />
    </main>
  );
}

function NotFoundPage({ navigate }) {
  return (
    <main className="not-found">
      <div className="container">
        <p className="eyebrow">Pagina non trovata</p>
        <h1>Questo percorso non esiste ancora.</h1>
        <SmartLink className="button primary" href="/" navigate={navigate}>
          Torna alla home <ArrowUpRight size={18} />
        </SmartLink>
      </div>
    </main>
  );
}

function PrivacyPolicyPage({ navigate }) {
  return (
    <main className="privacy-page">
      <section className="privacy-hero">
        <div className="container">
          <p className="eyebrow">Privacy Policy</p>
          <h1>Informativa sul trattamento dei dati personali</h1>
          <p>
            Questa informativa descrive come Mago System tratta i dati inviati tramite il sito e come gestisce i soli
            cookie tecnici essenziali necessari al funzionamento dell’esperienza.
          </p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container privacy-grid">
          <aside className="privacy-summary">
            <h2>In breve</h2>
            <p>Usiamo i dati solo per rispondere alle richieste e gestire il rapporto commerciale avviato dall’utente.</p>
            <SmartLink href="/" navigate={navigate}>
              Torna alla home <ArrowUpRight size={16} />
            </SmartLink>
          </aside>
          <div className="privacy-copy">
            <article>
              <h2>Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento è Mago System. Per richieste relative alla privacy puoi scrivere a
                <a href="mailto:info@magodigital.it"> info@magodigital.it</a>.
              </p>
            </article>
            <article>
              <h2>Dati trattati</h2>
              <p>
                Trattiamo i dati che invii volontariamente tramite il modulo di contatto, come nome, email, telefono,
                settore, messaggio e informazioni sulla struttura sanitaria.
              </p>
            </article>
            <article>
              <h2>Finalità e base giuridica</h2>
              <p>
                I dati vengono usati per rispondere alla richiesta, valutare il progetto, inviare informazioni collegate
                alla consulenza e gestire eventuali rapporti precontrattuali o contrattuali.
              </p>
            </article>
            <article>
              <h2>Cookie</h2>
              <p>
                Il sito usa cookie e strumenti tecnici essenziali, inclusa la preferenza salvata nel browser. Eventuali
                strumenti di analytics, Google Ads, Meta Ads, remarketing o misurazione conversioni vengono attivati
                solo dopo consenso esplicito nelle rispettive categorie. Puoi modificare o revocare le preferenze in
                qualsiasi momento dal link “Preferenze cookie” nel footer.
              </p>
              <p>
                Per Google viene predisposto Consent Mode con impostazione predefinita negata per analytics, annunci,
                dati utente pubblicitari e personalizzazione annunci. I segnali vengono aggiornati solo dopo la tua
                scelta.
              </p>
            </article>
            <article>
              <h2>Conservazione</h2>
              <p>
                I dati sono conservati per il tempo necessario a rispondere alla richiesta e, se nasce un rapporto,
                secondo gli obblighi amministrativi e fiscali applicabili.
              </p>
            </article>
            <article>
              <h2>Diritti dell’utente</h2>
              <p>
                Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione o portabilità dei dati nei
                limiti previsti dalla normativa applicabile.
              </p>
            </article>
            <article>
              <h2>Nota</h2>
              <p>
                Questa informativa è pensata per un sito vetrina e lead generation. Per usi più complessi, integrazioni
                analytics o campagne con tracciamenti, sarà necessario aggiornarla.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function FinalCta({
  openModal,
  openBooking,
  title = 'Vuoi portare più pazienti qualificati alla tua struttura?',
  description = 'Partiamo da settore, città, servizi prioritari e canali attivi. Poi identifichiamo quali percorsi possono generare richieste più utili.',
}) {
  return (
    <section className="footer-cta">
      <div className="container">
        <div className="cta-card reveal">
          <div>
            <p className="eyebrow">Prima lettura gratuita</p>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="cta-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Richiedi consulenza <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate, openModal, openBooking, openCookieSettings }) {
  return (
    <footer className="site-footer" id="contatti">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo navigate={navigate} />
          <p>Acquisizione pazienti per cliniche, studi e professionisti sanitari privati.</p>
        </div>
        <div>
          <h3>Settori</h3>
          {sectors.slice(0, 5).map((sector) => (
            <SmartLink key={sector.slug} href={`/${sector.slug}`} navigate={navigate}>
              {sector.label}
            </SmartLink>
          ))}
        </div>
        <div>
          <h3>Contatti</h3>
          <p>Via L. Ariosto, 4/c, 41012 Carpi MO, Italia</p>
          <a href="mailto:info@magodigital.it">
            <Mail size={18} /> info@magodigital.it
          </a>
          <button type="button" onClick={openBooking}>Prenota videochiamata</button>
          <button type="button" onClick={openModal}>Parla con noi</button>
          <button type="button" onClick={openCookieSettings}>Preferenze cookie</button>
          <SmartLink href="/privacy-policy" navigate={navigate}>
            Privacy Policy
          </SmartLink>
        </div>
      </div>
      <div className="container footer-bottom">
        <a className="scroll-top" href="#home" aria-label="Torna su">
          <ArrowUp size={21} />
        </a>
        <p>Copyright @2026, Mago System. Tutti i diritti riservati</p>
      </div>
    </footer>
  );
}

function CookieToggle({ id, title, text, checked, disabled = false, onChange }) {
  return (
    <label className={`cookie-toggle ${disabled ? 'is-disabled' : ''}`} htmlFor={id}>
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className="cookie-switch" aria-hidden="true" />
    </label>
  );
}

function CookieBanner({ navigate, settingsOpen, onSettingsClose }) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultConsent);

  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setPreferences(storedConsent);
      updateConsentMode(storedConsent);
      setBannerVisible(false);
    } else {
      updateConsentMode(defaultConsent);
      setPreferences(defaultConsent);
      setBannerVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const storedConsent = getStoredConsent();
    setPreferences(storedConsent || defaultConsent);
    setPanelOpen(true);
    setBannerVisible(false);
  }, [settingsOpen]);

  useEffect(() => {
    if (!panelOpen) return undefined;
    document.body.classList.add('modal-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [panelOpen]);

  const closePanel = () => {
    setPanelOpen(false);
    onSettingsClose();
  };

  const confirmConsent = (nextConsent) => {
    const savedConsent = saveConsent(nextConsent);
    setPreferences(savedConsent);
    setBannerVisible(false);
    closePanel();
  };

  const rejectOptional = () => confirmConsent(defaultConsent);
  const acceptAll = () => confirmConsent({ ...defaultConsent, analytics: true, marketing: true });

  return (
    <>
      {bannerVisible && (
        <aside className="cookie-banner" aria-label="Informativa cookie">
          <div>
            <strong>Gestione cookie e annunci</strong>
            <p>
              Usiamo cookie tecnici necessari. Analytics, Google/Meta Ads, remarketing e misurazione conversioni restano
              disattivati finché non dai consenso. Puoi accettare, rifiutare o scegliere per categoria.
            </p>
            <SmartLink href="/privacy-policy" navigate={navigate}>
              Leggi Privacy e Cookie Policy
            </SmartLink>
          </div>
          <div className="cookie-actions" aria-label="Azioni consenso cookie">
            <button className="button ghost" type="button" onClick={rejectOptional}>
              Rifiuta
            </button>
            <button className="button secondary" type="button" onClick={() => setPanelOpen(true)}>
              Personalizza
            </button>
            <button className="button primary" type="button" onClick={acceptAll}>
              Accetta tutto
            </button>
          </div>
        </aside>
      )}

      {panelOpen && (
        <div className="modal-layer cookie-modal-layer" role="presentation" onMouseDown={closePanel}>
          <section
            className="cookie-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-panel-title"
            aria-describedby="cookie-panel-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="icon-button modal-close" type="button" onClick={closePanel} aria-label="Chiudi preferenze">
              <X size={22} />
            </button>
            <p className="eyebrow">Centro preferenze</p>
            <h2 id="cookie-panel-title">Scegli come possiamo usare cookie e pixel</h2>
            <p id="cookie-panel-description">
              Le categorie non essenziali sono disattivate di default. Le scelte vengono salvate per 6 mesi e puoi
              modificarle dal footer.
            </p>
            <div className="cookie-toggle-list">
              <CookieToggle
                id="cookie-necessary"
                title="Necessari"
                text="Servono per sicurezza, funzionamento del sito, moduli e memorizzazione della preferenza."
                checked
                disabled
              />
              <CookieToggle
                id="cookie-analytics"
                title="Analytics"
                text="Misurazione aggregata delle visite e delle conversioni, per esempio Google Analytics."
                checked={preferences.analytics}
                onChange={(analytics) => setPreferences((current) => ({ ...current, analytics }))}
              />
              <CookieToggle
                id="cookie-marketing"
                title="Marketing e remarketing"
                text="Google Ads, Meta Pixel, conversioni pubblicitarie, pubblici personalizzati e remarketing."
                checked={preferences.marketing}
                onChange={(marketing) => setPreferences((current) => ({ ...current, marketing }))}
              />
            </div>
            <div className="cookie-panel-actions">
              <button className="button ghost" type="button" onClick={rejectOptional}>
                Rifiuta non essenziali
              </button>
              <button className="button secondary" type="button" onClick={() => confirmConsent(preferences)}>
                Salva preferenze
              </button>
              <button className="button primary" type="button" onClick={acceptAll}>
                Accetta tutto
              </button>
            </div>
            <SmartLink className="cookie-policy-link" href="/privacy-policy" navigate={navigate}>
              Privacy Policy completa <ArrowUpRight size={16} />
            </SmartLink>
          </section>
        </div>
      )}
    </>
  );
}

function App() {
  const [path, setPath] = useState(getPath);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const activeSector = useMemo(() => sectors.find((sector) => `/${sector.slug}` === path), [path]);
  const isPrivacyPath = path === '/privacy-policy';
  const isKnownPath = path === '/' || Boolean(activeSector) || isPrivacyPath;

  const navigate = (to) => {
    const [nextPath, hash] = to.split('#');
    const targetPath = nextPath || '/';
    window.history.pushState({}, '', to);
    setPath(targetPath.replace(/\/+$/, '') || '/');
    window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const pageMeta = activeSector
      ? {
          title:
            activeSector.slug === 'cliniche-dentali'
              ? 'Cliniche dentali - Appuntamenti da pazienti locali | Mago System'
              : `${activeSector.label} - Acquisizione pazienti | Mago System`,
          description: activeSector.subhead,
          path: `/${activeSector.slug}`,
        }
      : isPrivacyPath
        ? privacyMeta
        : homeMeta;

    document.title = pageMeta.title;
    setMeta('description', pageMeta.description);
    setMeta('og:title', pageMeta.title, 'property');
    setMeta('og:description', pageMeta.description, 'property');
    setMeta('og:url', `${SITE_URL}${pageMeta.path}`, 'property');
    setMeta('twitter:title', pageMeta.title);
    setMeta('twitter:description', pageMeta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${pageMeta.path}`);
  }, [activeSector, isPrivacyPath]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (reduced) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  return (
    <>
      <Header
        navigate={navigate}
        openModal={() => setModalOpen(true)}
        openBooking={() => setBookingOpen(true)}
        modalOpen={modalOpen || bookingOpen}
      />
      {path === '/' && (
        <HomePage navigate={navigate} openModal={() => setModalOpen(true)} openBooking={() => setBookingOpen(true)} />
      )}
      {activeSector?.slug === 'cliniche-dentali' && (
        <DentalPage openModal={() => setModalOpen(true)} openBooking={() => setBookingOpen(true)} />
      )}
      {activeSector && activeSector.slug !== 'cliniche-dentali' && (
        <SectorPage
          sector={activeSector}
          openModal={() => setModalOpen(true)}
          openBooking={() => setBookingOpen(true)}
        />
      )}
      {isPrivacyPath && <PrivacyPolicyPage navigate={navigate} />}
      {!isKnownPath && <NotFoundPage navigate={navigate} />}
      <Footer
        navigate={navigate}
        openModal={() => setModalOpen(true)}
        openBooking={() => setBookingOpen(true)}
        openCookieSettings={() => setCookieSettingsOpen(true)}
      />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <CookieBanner
        navigate={navigate}
        settingsOpen={cookieSettingsOpen}
        onSettingsClose={() => setCookieSettingsOpen(false)}
      />
    </>
  );
}

export default App;
