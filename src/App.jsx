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
  Mail,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Search,
  Send,
  ShieldCheck,
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

const sectorLandingPages = {
  'centri-diagnostici-privati': {
    metaTitle: 'Centri diagnostici privati - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per centri diagnostici privati: intercettiamo domanda locale già interessata a esami, visite, screening e check-up.',
    question: 'Gestisci un centro diagnostico privato?',
    headline: 'Richieste più chiare per esami, visite e check-up privati',
    subhead:
      'Costruiamo un sistema che intercetta persone già orientate alla sanità privata, mette in evidenza tempi, percorso e specializzazioni, e le accompagna verso una richiesta ordinata.',
    qualifierTitle: 'Lavoriamo su domanda reale, non su traffico indistinto',
    qualifierText:
      'Prima di aprire budget, definiamo quali prestazioni meritano una landing dedicata, quali intenzioni di ricerca hanno valore e quali richieste devono arrivare già leggibili al front office.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'La pagina collega il bisogno del paziente a esami, controlli e check-up concreti, senza comunicare la diagnostica come una lista fredda di prestazioni.',
      },
      {
        title: 'Più fiducia',
        text: 'Percorso, tempi indicativi, specializzazioni e modalità di contatto sono spiegati con precisione, così la scelta non si riduce al prezzo.',
      },
      {
        title: 'Meno tempo',
        text: 'Chi arriva sulla pagina capisce rapidamente se il centro è adatto alla sua esigenza e quale passo fare per chiedere informazioni.',
      },
      {
        title: 'Meno sforzo',
        text: 'Campagne, pagina e follow-up raccolgono informazioni utili, riducendo richieste vaghe e conversazioni da ricostruire da zero.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing diagnostico',
        text: 'Definiamo messaggi per esami, prevenzione e pacchetti privati con un linguaggio chiaro per persone già in fase di scelta.',
      },
      {
        letter: 'A',
        title: 'Advertising locale',
        text: 'Intercettiamo ricerche e bisogni per città, prestazione e priorità, evitando campagne generiche su tutto il listino.',
      },
      {
        letter: 'G',
        title: 'Growth delle richieste',
        text: 'Orientiamo la crescita verso prenotazioni e contatti lavorabili, non verso volumi che appesantiscono il centralino.',
      },
      {
        letter: 'O',
        title: 'Optimization continua',
        text: 'Leggiamo qualità delle richieste, servizi richiesti e frizioni del percorso per migliorare pagina, annunci e follow-up.',
      },
    ],
    services: [
      'Diagnostica per immagini privata',
      'Ecografie e visite specialistiche',
      'Analisi e percorsi di prevenzione',
      'Screening e controlli periodici',
      'Check-up aziendali e privati',
      'Prestazioni con tempi rapidi',
    ],
    comparison: [
      {
        title: 'Campagne generiche',
        text: 'Traffico su pagine troppo ampie, poca chiarezza sulla prestazione richiesta e richieste difficili da qualificare.',
      },
      {
        title: 'Sistema Mago',
        text: 'Percorsi per prestazione, zona e intenzione, con messaggi che aiutano il paziente a capire e il centro a rispondere meglio.',
      },
    ],
    workflowTitle: 'Dalla ricerca specifica alla richiesta gestibile dal front office',
    workflowText:
      'Il sistema collega intenti di ricerca, landing e contatto. La persona trova informazioni essenziali, lascia una richiesta più completa e il team puo valutare priorità, servizio e disponibilità con meno attrito.',
    dashboard: [
      ['Domanda locale', 'Esame specifico'],
      ['Percorso chiaro', 'Meno attrito'],
      ['Front office', 'Richieste leggibili'],
    ],
    ctaTitle: 'Verifica quali prestazioni diagnostiche meritano un funnel dedicato',
    ctaDescription:
      'In videochiamata analizziamo servizi prioritari, area geografica e percorso attuale. Se c’è spazio per lavorare bene, definiamo quali richieste ha senso intercettare per prime.',
  },
  'fisioterapia-specializzata': {
    metaTitle: 'Fisioterapia specializzata - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per centri fisioterapici: percorsi per riabilitazione, sport, post-operatorio e dolore, con richieste più coerenti.',
    question: 'Hai uno studio o centro fisioterapico specializzato?',
    headline: 'Portiamo persone già motivate verso percorsi fisioterapici strutturati',
    subhead:
      'Non vendiamo la singola seduta. Costruiamo un percorso che fa capire metodo, specializzazione e continuità, così chi contatta arriva con un bisogno più chiaro.',
    qualifierTitle: 'Il valore non e nella seduta isolata, ma nel percorso',
    qualifierText:
      'Quando la comunicazione spiega problema, metodo e progressione, il paziente smette di confrontare solo il prezzo orario e valuta se il centro è adatto alla sua situazione.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il messaggio parte dal problema reale: recupero, dolore, ritorno allo sport o continuità post-operatoria.',
      },
      {
        title: 'Più fiducia',
        text: 'Metodo, specializzazione e modalità di presa in carico vengono spiegati prima del contatto, senza promesse terapeutiche.',
      },
      {
        title: 'Meno tempo',
        text: 'La persona trova rapidamente il percorso più vicino al suo bisogno e capisce quale informazione lasciare.',
      },
      {
        title: 'Meno sforzo',
        text: 'La segreteria riceve richieste più ordinate, con contesto sul problema e sul tipo di percorso cercato.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing del percorso',
        text: 'Posizioniamo la fisioterapia come presa in carico specialistica, non come commodity da calendario.',
      },
      {
        letter: 'A',
        title: 'Advertising per bisogno',
        text: 'Separiamo ricerche e creativita per sport, post-operatorio, dolore persistente e programmi specialistici.',
      },
      {
        letter: 'G',
        title: 'Growth sostenibile',
        text: 'Puntiamo a richieste coerenti con competenze, agenda e valore del centro, non a contatti indiscriminati.',
      },
      {
        letter: 'O',
        title: 'Optimization sul dato',
        text: 'Ottimizziamo in base alla qualità delle richieste e alla capacità del team di trasformarle in prime valutazioni.',
      },
    ],
    services: [
      'Riabilitazione sportiva',
      'Percorsi post-operatori',
      'Dolore persistente e ricorrente',
      'Valutazioni funzionali',
      'Fisioterapia specialistica',
      'Programmi di continuità',
    ],
    comparison: [
      {
        title: 'Pagina da listino',
        text: 'Servizi elencati senza contesto, richiesta generica e paziente che chiede solo il costo della seduta.',
      },
      {
        title: 'Sistema Mago',
        text: 'Landing per bisogno, metodo spiegato e CTA che porta verso una prima valutazione più coerente.',
      },
    ],
    workflowTitle: 'Dal bisogno fisico alla richiesta per un percorso adatto',
    workflowText:
      'Campagne e pagina chiariscono a chi si rivolge il centro, quali percorsi sono prioritari e quali informazioni servono per iniziare una conversazione utile.',
    dashboard: [
      ['Bisogno specifico', 'Percorso adatto'],
      ['Metodo visibile', 'Fiducia prima'],
      ['Agenda', 'Richieste coerenti'],
    ],
    ctaTitle: 'Capisci quali percorsi fisioterapici possono generare richieste più coerenti',
    ctaDescription:
      'Analizziamo specializzazioni, zona, agenda e comunicazione attuale per capire dove costruire un funnel utile senza banalizzare il valore clinico.',
  },
  dermatologi: {
    metaTitle: 'Dermatologi - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per dermatologi e centri dermatologici: richieste locali per visite, controlli, acne, tricologia e trattamenti specialistici.',
    question: 'Sei un dermatologo o gestisci un centro dermatologico?',
    headline: 'Richieste più qualificate per visite, controlli e percorsi dermatologici',
    subhead:
      'Intercettiamo persone già interessate a una visita o a un problema specifico, con pagine che spiegano autorevolezza, percorso e modalità di contatto senza usare toni allarmistici.',
    qualifierTitle: 'La fiducia si costruisce prima della prenotazione',
    qualifierText:
      'In dermatologia il paziente cerca competenza, chiarezza e tempi ragionevoli. La landing deve trasformare una ricerca confusa in una richiesta comprensibile e rispettosa.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il bisogno viene nominato con precisione: controllo, visita, problema ricorrente o trattamento specialistico.',
      },
      {
        title: 'Più fiducia',
        text: 'La pagina mette in ordine competenze, aree di intervento e percorso, evitando affermazioni cliniche improprie.',
      },
      {
        title: 'Meno tempo',
        text: 'Chi legge capisce subito se il servizio è pertinente e come chiedere informazioni alla struttura.',
      },
      {
        title: 'Meno sforzo',
        text: 'CTA e follow-up riducono l’indecisione e raccolgono contesto utile per qualificare la richiesta.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing dermatologico',
        text: 'Strutturiamo messaggi per visite, controlli e aree specifiche con tono autorevole e comprensibile.',
      },
      {
        letter: 'A',
        title: 'Advertising per intento',
        text: 'Attiviamo campagne su ricerche locali e bisogni concreti, non su comunicazione generica da ambulatorio.',
      },
      {
        letter: 'G',
        title: 'Growth delle consulenze',
        text: 'Portiamo l’attenzione sui percorsi prioritari e sulle richieste che la struttura vuole davvero ricevere.',
      },
      {
        letter: 'O',
        title: 'Optimization prudente',
        text: 'Miglioriamo messaggi e pagina leggendo qualità, domande frequenti e frizioni prima del contatto.',
      },
    ],
    services: [
      'Visite dermatologiche private',
      'Mappatura nei e controlli',
      'Acne e problemi ricorrenti',
      'Tricologia',
      'Dermatologia pediatrica',
      'Trattamenti specialistici',
    ],
    comparison: [
      {
        title: 'Visibilita indistinta',
        text: 'Annunci ampi, pagina generica e paziente che non capisce se il professionista è adatto al suo problema.',
      },
      {
        title: 'Sistema Mago',
        text: 'Percorsi per esigenza, messaggi sobri e richiesta guidata verso il contatto più utile.',
      },
    ],
    workflowTitle: 'Dalla ricerca del problema a una richiesta dermatologica più chiara',
    workflowText:
      'Il funnel collega intenzione, specializzazione e passo successivo. La persona non riceve promesse, riceve chiarezza per capire se contattare lo studio.',
    dashboard: [
      ['Intento locale', 'Problema chiaro'],
      ['Tono sanitario', 'Autorevolezza'],
      ['Contatto', 'Richiesta utile'],
    ],
    ctaTitle: 'Valuta quali aree dermatologiche meritano una landing dedicata',
    ctaDescription:
      'In call leggiamo servizi, zona, concorrenza e percorso attuale per capire dove intercettare persone già orientate a una visita privata.',
  },
  oculisti: {
    metaTitle: 'Oculisti - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per oculisti e centri oculistici: percorsi per visite private, prevenzione, diagnostica e controlli specialistici.',
    question: 'Sei un oculista o gestisci un centro oculistico?',
    headline: 'Richieste più coerenti per visite, controlli e percorsi oculistici privati',
    subhead:
      'Costruiamo pagine e campagne per persone che stanno già cercando una risposta professionale, con messaggi chiari su servizio, percorso e modalità di prenotazione.',
    qualifierTitle: 'La pagina deve chiarire, non semplificare troppo',
    qualifierText:
      'Chi cerca un oculista valuta tempi, competenza, strumenti e fiducia. Il funnel deve aiutare la persona a scegliere il passo giusto senza trasformare la sanità in pubblicita superficiale.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il messaggio parte dalla necessità: visita, controllo, prevenzione, diagnostica o percorso specialistico.',
      },
      {
        title: 'Più fiducia',
        text: 'Spieghiamo cosa aspettarsi dal contatto e per quali bisogni la struttura è posizionata.',
      },
      {
        title: 'Meno tempo',
        text: 'La persona trova rapidamente il servizio pertinente e non deve navigare pagine dispersive.',
      },
      {
        title: 'Meno sforzo',
        text: 'CTA, tracciamento e follow-up rendono la richiesta più semplice da inviare e da gestire.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing oculistico',
        text: 'Organizziamo messaggi per prevenzione, visite e diagnostica con linguaggio professionale e leggibile.',
      },
      {
        letter: 'A',
        title: 'Advertising locale',
        text: 'Separiamo intenzioni e campagne per città, servizio e priorità di prenotazione.',
      },
      {
        letter: 'G',
        title: 'Growth controllata',
        text: 'Facciamo crescere richieste coerenti con agenda, prestazioni e struttura, non traffico casuale.',
      },
      {
        letter: 'O',
        title: 'Optimization del percorso',
        text: 'Ottimizziamo messaggi e CTA leggendo quali ricerche portano richieste realmente lavorabili.',
      },
    ],
    services: [
      'Visite oculistiche private',
      'Controlli periodici',
      'Diagnostica strumentale',
      'Prevenzione e screening',
      'Percorsi pediatrici',
      'Servizi specialistici avanzati',
    ],
    comparison: [
      {
        title: 'Approccio generico',
        text: 'Una pagina uguale per tutti, poche informazioni sul percorso e contatti non sempre in target.',
      },
      {
        title: 'Sistema Mago',
        text: 'Messaggi per bisogno, landing verticale e richiesta guidata verso una conversazione più utile.',
      },
    ],
    workflowTitle: 'Dal dubbio visivo alla richiesta per il servizio corretto',
    workflowText:
      'Il sistema mette in ordine annuncio, pagina e follow-up per far capire quando contattare lo studio e quali informazioni lasciare.',
    dashboard: [
      ['Visita privata', 'Intento alto'],
      ['Diagnostica', 'Percorso chiaro'],
      ['Richiesta', 'Meno attrito'],
    ],
    ctaTitle: 'Scopri quali percorsi oculistici possono essere comunicati meglio',
    ctaDescription:
      'Analizziamo servizi, zona e pagine attuali per individuare le aree dove una landing verticale puo aumentare chiarezza e qualità delle richieste.',
  },
  ginecologi: {
    metaTitle: 'Ginecologi - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per ginecologi e studi privati: comunicazione rispettosa per visite, prevenzione, gravidanza, menopausa e percorsi specialistici.',
    question: 'Sei una ginecologa, un ginecologo o gestisci uno studio specialistico?',
    headline: 'Richieste più adatte per visite ginecologiche e percorsi privati',
    subhead:
      'Costruiamo un percorso digitale discreto e chiaro, pensato per pazienti che cercano competenza, ascolto e semplicita di contatto in un ambito sensibile.',
    qualifierTitle: 'In un ambito sensibile, il tono e parte del sistema',
    qualifierText:
      'La pagina deve informare, rassicurare e facilitare il primo passo senza pressione e senza linguaggio invasivo. La fiducia viene prima della conversione.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'La comunicazione collega visita, prevenzione o percorso specialistico a un bisogno già percepito dalla paziente.',
      },
      {
        title: 'Più fiducia',
        text: 'Tono, chiarezza e modalità di contatto rendono il percorso leggibile e rispettoso prima della richiesta.',
      },
      {
        title: 'Meno tempo',
        text: 'Le informazioni essenziali sono ordinate per aiutare la persona a capire se lo studio è pertinente.',
      },
      {
        title: 'Meno sforzo',
        text: 'CTA discrete e follow-up riducono l’attrito del primo contatto e raccolgono richieste più complete.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing rispettoso',
        text: 'Definiamo messaggi per visite, prevenzione e percorsi specialistici con cura del tono e della sensibilita.',
      },
      {
        letter: 'A',
        title: 'Advertising selettivo',
        text: 'Segmentiamo per bisogno, zona e intenzione senza usare leve aggressive o improprie.',
      },
      {
        letter: 'G',
        title: 'Growth della fiducia',
        text: 'Portiamo richieste coerenti con servizi e modalità dello studio, non contatti forzati.',
      },
      {
        letter: 'O',
        title: 'Optimization continua',
        text: 'Miglioriamo percorso, messaggi e CTA leggendo qualità della richiesta e domande ricorrenti.',
      },
    ],
    services: [
      'Visite ginecologiche private',
      'Prevenzione e controlli',
      'Percorsi gravidanza',
      'Menopausa',
      'Consulenze specialistiche',
      'Visite adolescenti e giovani adulte',
    ],
    comparison: [
      {
        title: 'Comunicazione fredda',
        text: 'Pagina tecnica, poca attenzione al primo passo e paziente lasciata sola nel capire se contattare.',
      },
      {
        title: 'Sistema Mago',
        text: 'Percorso chiaro, tono rispettoso e richiesta guidata senza pressione commerciale fuori luogo.',
      },
    ],
    workflowTitle: 'Dal bisogno privato a un primo contatto più semplice',
    workflowText:
      'La landing mette ordine tra servizio, contesto e passo successivo. La paziente trova informazioni essenziali e sceglie come entrare in contatto con meno frizione.',
    dashboard: [
      ['Tono', 'Discreto'],
      ['Percorso', 'Chiaro'],
      ['Contatto', 'Rispettoso'],
    ],
    ctaTitle: 'Valuta come rendere più chiaro il percorso di richiesta per il tuo studio',
    ctaDescription:
      'In videochiamata analizziamo servizi, target, zona e comunicazione attuale per capire dove migliorare qualità e pertinenza delle richieste.',
  },
  'urologi-andrologi': {
    metaTitle: 'Urologi e Andrologi - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione discreto per urologi e andrologi: visite private, prevenzione e percorsi specialistici con richieste più qualificate.',
    question: 'Sei un urologo, un andrologo o gestisci uno studio specialistico?',
    headline: 'Facilitiamo il primo contatto per visite urologiche e andrologiche private',
    subhead:
      'Intercettiamo persone già interessate a una visita o a un problema specifico, con una comunicazione discreta che riduce attrito, imbarazzo e confusione.',
    qualifierTitle: 'La discrezione non e un dettaglio, e una leva di conversione corretta',
    qualifierText:
      'In questi percorsi il paziente puo rimandare. La landing deve rendere normale e semplice chiedere informazioni, senza sensazionalismo e senza forzature.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il messaggio parla al bisogno concreto: visita, prevenzione, controllo o problema ricorrente.',
      },
      {
        title: 'Più fiducia',
        text: 'Tono riservato, percorso chiaro e competenze leggibili abbassano la barriera del primo contatto.',
      },
      {
        title: 'Meno tempo',
        text: 'La persona capisce subito quale servizio è pertinente e come inviare una richiesta senza esporsi inutilmente.',
      },
      {
        title: 'Meno sforzo',
        text: 'Campagne e pagina guidano verso una richiesta essenziale, più semplice da gestire per lo studio.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing discreto',
        text: 'Costruiamo messaggi chiari per aree sensibili, con rispetto e precisione.',
      },
      {
        letter: 'A',
        title: 'Advertising per intento',
        text: 'Intercettiamo ricerche e bisogni locali senza creativita aggressive o imbarazzanti.',
      },
      {
        letter: 'G',
        title: 'Growth qualificata',
        text: 'Orientiamo richieste verso visite e percorsi compatibili con specializzazione e agenda.',
      },
      {
        letter: 'O',
        title: 'Optimization riservata',
        text: 'Ottimizziamo frizioni e messaggi osservando qualità delle richieste, non solo volume.',
      },
    ],
    services: [
      'Visite urologiche private',
      'Visite andrologiche',
      'Prevenzione maschile',
      'Problemi ricorrenti',
      'Controlli specialistici',
      'Percorsi diagnostici privati',
    ],
    comparison: [
      {
        title: 'Percorso che fa rimandare',
        text: 'Pagina generica, tono poco calibrato e richiesta percepita come difficile o imbarazzante.',
      },
      {
        title: 'Sistema Mago',
        text: 'Comunicazione riservata, bisogno nominato con cura e CTA che rende più semplice il primo passo.',
      },
    ],
    workflowTitle: 'Dal problema rimandato a una richiesta discreta e gestibile',
    workflowText:
      'Il funnel riduce attrito e confusione, aiutando il paziente a capire se contattare lo studio e quali informazioni lasciare.',
    dashboard: [
      ['Privacy', 'Tono corretto'],
      ['Bisogno', 'Nominato bene'],
      ['Contatto', 'Primo passo'],
    ],
    ctaTitle: 'Verifica come rendere più semplice il primo contatto per visite urologiche e andrologiche',
    ctaDescription:
      'Analizziamo zona, servizi prioritari e percorso attuale per capire dove migliorare qualità, discrezione e chiarezza delle richieste.',
  },
  'medicina-estetica-chirurgia-estetica': {
    metaTitle: 'Medicina estetica e chirurgia estetica - Acquisizione pazienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per medicina estetica e chirurgia estetica: consulenze più consapevoli per trattamenti viso, corpo e percorsi premium.',
    question: 'Gestisci una clinica o uno studio di medicina estetica?',
    headline: 'Consulenze più consapevoli per trattamenti estetici e chirurgia privata',
    subhead:
      'Costruiamo percorsi che spostano l’attenzione dal prezzo al valore percepito, alla fiducia e alla coerenza tra aspettativa, consulenza e servizio offerto.',
    qualifierTitle: 'Nel mercato estetico vince chi filtra, non chi grida più forte',
    qualifierText:
      'La pagina deve attrarre persone realmente interessate, ma anche qualificare aspettative e servizio. Il tono resta premium, concreto e responsabile.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il trattamento viene inserito in un percorso di consulenza, non presentato come offerta isolata.',
      },
      {
        title: 'Più fiducia',
        text: 'Messaggi, prova e processo aiutano la persona a capire perché fissare una consulenza con professionisti qualificati.',
      },
      {
        title: 'Meno tempo',
        text: 'La landing rende più rapido capire trattamento, approccio e passo successivo.',
      },
      {
        title: 'Meno sforzo',
        text: 'Domande e CTA filtrano richieste poco coerenti e preparano una conversazione più ordinata.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing premium',
        text: 'Posizioniamo trattamenti e consulenze con messaggi orientati a valore, qualità e aspettative corrette.',
      },
      {
        letter: 'A',
        title: 'Advertising selettivo',
        text: 'Segmentiamo per trattamento, intenzione e area, evitando creativita da sconto che abbassano percezione.',
      },
      {
        letter: 'G',
        title: 'Growth delle consulenze',
        text: 'Puntiamo a richieste più consapevoli, compatibili con servizi, agenda e posizionamento della clinica.',
      },
      {
        letter: 'O',
        title: 'Optimization della qualità',
        text: 'Miglioriamo funnel e follow-up leggendo qualità delle consulenze, non solo costo del contatto.',
      },
    ],
    services: [
      'Trattamenti viso',
      'Trattamenti corpo',
      'Consulenze estetiche',
      'Percorsi premium',
      'Chirurgia estetica privata',
      'Follow-up consulenziale',
    ],
    comparison: [
      {
        title: 'Domanda da prezzo',
        text: 'Annunci aggressivi, aspettative poco filtrate e consulenze con persone non realmente adatte.',
      },
      {
        title: 'Sistema Mago',
        text: 'Posizionamento premium, pagina orientata alla consulenza e filtri per richieste più consapevoli.',
      },
    ],
    workflowTitle: 'Dal trattamento desiderato a una consulenza più qualificata',
    workflowText:
      'Campagna, pagina e follow-up preparano la persona alla consulenza, chiarendo contesto, aspettative e modalità di contatto.',
    dashboard: [
      ['Posizionamento', 'Premium'],
      ['Consulenza', 'Consapevole'],
      ['Qualifica', 'Prima della call'],
    ],
    ctaTitle: 'Capisci quali trattamenti meritano un funnel premium dedicato',
    ctaDescription:
      'In videochiamata analizziamo servizi, posizionamento e qualità delle richieste attuali per costruire un percorso più selettivo.',
  },
  'psicologi-psicoterapeuti': {
    metaTitle: 'Psicologi e Psicoterapeuti - Acquisizione richieste | Mago System',
    metaDescription:
      'Sistema di acquisizione sobrio per psicologi, psicoterapeuti e centri: comunicazione per specializzazioni, approccio e modalità di contatto.',
    question: 'Sei psicologo, psicoterapeuta o gestisci un centro?',
    headline: 'Richieste più adatte al tuo approccio, alla tua specializzazione e al tuo setting',
    subhead:
      'Costruiamo percorsi digitali sobri, umani e chiari per aiutare chi sta già cercando supporto a capire se si sente nel posto giusto.',
    qualifierTitle: 'Qui la persuasione deve essere al servizio della chiarezza',
    qualifierText:
      'La pagina non deve forzare. Deve far emergere approccio, aree di intervento, modalità e confini, così la richiesta arriva più coerente.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il bisogno viene riconosciuto con rispetto, collegandolo a specializzazioni e modalità di percorso.',
      },
      {
        title: 'Più fiducia',
        text: 'Approccio, setting e aree di intervento sono comprensibili prima del contatto.',
      },
      {
        title: 'Meno tempo',
        text: 'La persona trova rapidamente informazioni essenziali e capisce come chiedere un primo confronto.',
      },
      {
        title: 'Meno sforzo',
        text: 'CTA e follow-up sono delicati, riducono confusione e aiutano a inviare una richiesta più chiara.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing sobrio',
        text: 'Organizziamo messaggi per specializzazioni e approcci senza usare linguaggio manipolativo.',
      },
      {
        letter: 'A',
        title: 'Advertising rispettoso',
        text: 'Intercettiamo bisogni e ricerche con tono misurato, evitando urgenze artificiali.',
      },
      {
        letter: 'G',
        title: 'Growth compatibile',
        text: 'Portiamo richieste coerenti con setting, disponibilità e tipo di percorso offerto.',
      },
      {
        letter: 'O',
        title: 'Optimization della coerenza',
        text: 'Miglioriamo pagina e messaggi leggendo pertinenza delle richieste e frizioni del primo contatto.',
      },
    ],
    services: [
      'Terapia individuale',
      'Terapia di coppia',
      'Adolescenti e famiglie',
      'Ansia e stress',
      'Percorsi online',
      'Centri psicologici',
    ],
    comparison: [
      {
        title: 'Presenza poco leggibile',
        text: 'Pagina generica, approccio poco chiaro e richieste non sempre compatibili con specializzazione e setting.',
      },
      {
        title: 'Sistema Mago',
        text: 'Messaggi sobri, specializzazioni ordinate e contatto guidato in modo umano e professionale.',
      },
    ],
    workflowTitle: 'Dal bisogno di supporto a una richiesta più coerente',
    workflowText:
      'La landing aiuta la persona a orientarsi senza pressione: capisce approccio, modalità e passo successivo, poi sceglie se contattare.',
    dashboard: [
      ['Approccio', 'Leggibile'],
      ['Setting', 'Coerente'],
      ['Contatto', 'Delicato'],
    ],
    ctaTitle: 'Valuta come rendere più chiaro il tuo posizionamento psicologico online',
    ctaDescription:
      'Analizziamo specializzazioni, target, setting e comunicazione attuale per capire come ricevere richieste più adatte.',
  },
  'nutrizionisti-specializzati': {
    metaTitle: 'Nutrizionisti specializzati - Acquisizione clienti | Mago System',
    metaDescription:
      'Sistema di acquisizione per nutrizionisti specializzati: percorsi per nutrizione sportiva, clinica, metabolica e programmi continuativi.',
    question: 'Sei un nutrizionista specializzato?',
    headline: 'Richieste più coerenti per percorsi nutrizionali specialistici e continuativi',
    subhead:
      'Costruiamo un sistema che spiega metodo, specializzazione e valore del percorso, così chi contatta non cerca solo una dieta rapida.',
    qualifierTitle: 'Il mercato promette scorciatoie. Tu devi far capire metodo e serietà',
    qualifierText:
      'Una landing efficace seleziona persone interessate a un percorso professionale, non a soluzioni improvvisate o consigli generici.',
    valueCards: [
      {
        title: 'Più desiderio',
        text: 'Il messaggio collega obiettivo e contesto: sport, metabolismo, clinica, salute femminile o continuità del percorso.',
      },
      {
        title: 'Più fiducia',
        text: 'Metodo, specializzazione e modalità di lavoro sono chiari prima del contatto.',
      },
      {
        title: 'Meno tempo',
        text: 'La persona capisce subito se il percorso è adatto alle sue esigenze e cosa aspettarsi dal primo passo.',
      },
      {
        title: 'Meno sforzo',
        text: 'CTA e follow-up raccolgono obiettivo e contesto, evitando richieste vaghe o non in linea.',
      },
    ],
    magoPillars: [
      {
        letter: 'M',
        title: 'Marketing del metodo',
        text: 'Posizioniamo il percorso nutrizionale come lavoro specialistico e continuativo, non come dieta standard.',
      },
      {
        letter: 'A',
        title: 'Advertising per obiettivo',
        text: 'Segmentiamo campagne per obiettivi, bisogni e specializzazioni, evitando messaggi generici.',
      },
      {
        letter: 'G',
        title: 'Growth del percorso',
        text: 'Orientiamo la crescita verso richieste coerenti con programmi, agenda e valore professionale.',
      },
      {
        letter: 'O',
        title: 'Optimization della qualifica',
        text: 'Miglioriamo funnel e follow-up leggendo qualità delle richieste e aderenza al servizio.',
      },
    ],
    services: [
      'Nutrizione sportiva',
      'Nutrizione clinica',
      'Percorsi metabolici',
      'Salute femminile',
      'Educazione alimentare',
      'Programmi continuativi',
    ],
    comparison: [
      {
        title: 'Richieste da dieta veloce',
        text: 'Comunicazione generica, aspettative poco realistiche e contatti interessati solo al prezzo.',
      },
      {
        title: 'Sistema Mago',
        text: 'Percorso specialistico spiegato, filtri di qualifica e richiesta orientata a metodo e continuità.',
      },
    ],
    workflowTitle: 'Dall’obiettivo personale alla richiesta per un percorso serio',
    workflowText:
      'Campagne, pagina e follow-up aiutano la persona a riconoscere il valore del metodo e a lasciare informazioni utili per una prima valutazione.',
    dashboard: [
      ['Obiettivo', 'Specifico'],
      ['Metodo', 'Visibile'],
      ['Percorso', 'Continuativo'],
    ],
    ctaTitle: 'Scopri quali percorsi nutrizionali possono attirare richieste più coerenti',
    ctaDescription:
      'Analizziamo specializzazione, target e comunicazione attuale per costruire un funnel che selezioni persone interessate a un percorso professionale.',
  },
};

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
  title: 'Mago System - Performance marketing chiaro ed efficace',
  description:
    'Strategie di marketing, siti web, advertising, email e SEO progettati per aumentare visibilità, coinvolgimento e crescita.',
  path: '/',
};

const healthcareMeta = {
  ...homeMeta,
  title: 'Sanitario - Performance marketing per strutture sanitarie | Mago System',
  description:
    'Strategie digitali e sistemi di acquisizione per cliniche, studi e professionisti sanitari che vogliono una crescita misurabile.',
  path: '/sanitario',
};

const navItems = [
  { label: 'Chi siamo', href: '/#chi-siamo' },
  { label: 'Contatti', href: '/#contatti' },
  { label: 'Blog', href: '/#blog' },
];

const marketingServices = [
  {
    slug: 'realizzazione-siti-web-professionali',
    title: 'Realizzazione siti web professionali',
    text: 'Come agenzia per la realizzazione di siti web, creiamo siti aziendali, landing page e pagine veloci pensate per generare richieste.',
    icon: MonitorSmartphone,
    featured: true,
  },
  {
    slug: 'realizzazione-ecommerce',
    title: 'Realizzazione eCommerce',
    text: 'Progettiamo esperienze eCommerce chiare, veloci e orientate alla conversione, dalla struttura del catalogo fino al percorso di acquisto.',
    icon: BarChart3,
  },
  {
    slug: 'gestione-campagne-google-ads',
    title: 'Gestione campagne Google Ads',
    text: 'Come agenzia Google Ads, gestiamo campagne Search, Performance Max e PPC con tracking, budget sotto controllo e focus su lead e vendite.',
    icon: MousePointerClick,
    featured: true,
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    text: 'Costruiamo funnel e campagne progettati per trasformare attenzione e domanda in contatti realmente utili al business.',
    icon: Target,
  },
  {
    slug: 'consulenza-email-marketing',
    title: 'Consulenza Email Marketing',
    text: 'Come agenzia email marketing, progettiamo newsletter, automazioni, segmentazione CRM e campagne orientate a vendite e retention.',
    icon: Mail,
    featured: true,
  },
  {
    slug: 'servizi-seo',
    title: 'Servizi SEO',
    text: 'Come agenzia SEO, uniamo consulenza, audit tecnico, SEO locale, contenuti e ottimizzazione on-page per traffico qualificato.',
    icon: Search,
    featured: true,
  },
];

const partnerLogos = [
  { src: 'partner-sorriso-salute.png', alt: 'Studio Dentistico Sorriso & Salute' },
  { src: 'partner-fisioterapia-malavasi.png', alt: 'Studio Fisioterapico Malavasi' },
  { src: 'partner-tulipano-black.png', alt: 'Il Tulipano Risto-Pizza' },
  { src: 'partner-illume.webp', alt: 'Illume Pizzeria Emiliana', className: 'partner-logo-illume' },
  { src: 'zeta-partner-toolblueprints.webp', alt: 'toolblueprints.com' },
];

const differentiators = [
  {
    title: 'Focalizzati su ciò che conta davvero',
    text: 'Diamo priorità ai risultati che fanno davvero la differenza, come prestazioni, crescita e valore a lungo termine, garantendo che ogni sforzo contribuisca a risultati aziendali significativi.',
  },
  {
    title: 'Guidato da intuizioni, non da supposizioni',
    text: 'Ogni decisione che prendiamo è supportata da dati, ricerche e comprensione reale del cliente, quindi la tua strategia è fondata su ciò che funziona.',
  },
  {
    title: 'Impegnati per il successo a lungo termine',
    text: 'Non inseguiamo vittorie veloci. Costruiamo strategie pensate per crescere insieme al tuo business e fornire risultati sostenibili nel tempo.',
  },
];

const blogPosts = [
  {
    title: 'Consigli pratici per rendere il tuo sito mobile friendly',
    category: 'Approfondimenti · Strategia',
    date: '24 mar 2026',
    image: 'zeta-blog-mobile.webp',
    href: 'https://zetadigital.it/blog/sito-mobile-friendly/',
  },
  {
    title: 'Ottimizzazione per motori generativi: il prossimo passo nella SEO',
    category: 'Settori',
    date: '22 mar 2026',
    image: 'zeta-blog-generative-seo.webp',
    href: 'https://zetadigital.it/blog/generative-engine-optimization-seo-ai/',
  },
  {
    title: '5 caratteristiche chiave delle agenzie di marketing ad alte performance',
    category: 'Strategia',
    date: '27 gen 2026',
    image: 'zeta-blog-agency-performance.webp',
    href: 'https://zetadigital.it/blog/agenzia-marketing-alte-performance/',
  },
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
    text: 'Messaggio, prova, obiezioni e CTA lavorano insieme per far percepire valore prima del contatto.',
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
    if (!menuOpen) return undefined;

    document.body.classList.add('site-menu-open');
    const desktopQuery = window.matchMedia('(min-width: 1041px)');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onBreakpointChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onBreakpointChange);
    return () => {
      document.body.classList.remove('site-menu-open');
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onBreakpointChange);
    };
  }, [menuOpen]);

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
    <header className={`site-header ${headerHidden ? 'is-hidden' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
        <div className="header-inner">
          <Logo navigate={navigate} />
          <nav className="desktop-nav" aria-label="Navigazione principale">
            <SmartLink href={navItems[0].href} navigate={navigate}>
              {navItems[0].label}
            </SmartLink>
            <div className="sector-menu service-menu">
              <button type="button" aria-haspopup="true">
                Servizi <ChevronDown size={16} />
              </button>
              <div className="sector-menu-panel service-menu-panel">
                {marketingServices.map((service) => (
                  <SmartLink
                    key={service.slug}
                    href={service.featured ? `/#${service.slug}` : '/#servizi'}
                    navigate={navigate}
                  >
                    {service.title}
                  </SmartLink>
                ))}
              </div>
            </div>
            <SmartLink href={navItems[1].href} navigate={navigate}>
              {navItems[1].label}
            </SmartLink>
            <div className="sector-menu">
              <button type="button" aria-haspopup="true">
                Settori <ChevronDown size={16} />
              </button>
              <div className="sector-menu-panel">
                <SmartLink href="/sanitario" navigate={navigate}>
                  Sanitario
                </SmartLink>
              </div>
            </div>
            <SmartLink href={navItems[2].href} navigate={navigate}>
              {navItems[2].label}
            </SmartLink>
          </nav>
          <button className="button primary header-cta" type="button" onClick={openModal}>
            Richiedi preventivo <ArrowUpRight size={18} />
          </button>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className="menu-button-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>Menu</span>
          </button>
        </div>
        <nav
          id="mobile-nav"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navigazione mobile"
          aria-hidden={!menuOpen}
        >
          <div className="mobile-nav-header">
            <SmartLink className="mobile-nav-logo" href="/" navigate={navigate} onClick={closeMenu}>
              <img src={`${ASSETS}mago-system-logo-header.webp`} alt="Mago System" width="499" height="166" />
            </SmartLink>
            <button className="mobile-nav-close" type="button" onClick={closeMenu}>
              <X size={28} aria-hidden="true" />
              <span>Chiudi</span>
            </button>
          </div>
          <div className="mobile-nav-scroll">
            <SmartLink className="mobile-nav-primary-link" href="/" navigate={navigate} onClick={closeMenu}>
              Home
            </SmartLink>
            <SmartLink className="mobile-nav-primary-link" href={navItems[0].href} navigate={navigate} onClick={closeMenu}>
              {navItems[0].label}
            </SmartLink>
            <details className="mobile-nav-accordion">
              <summary>
                <span>Servizi</span>
                <ChevronDown size={26} aria-hidden="true" />
              </summary>
              <div className="mobile-sector-list">
                {marketingServices.map((service) => (
                  <SmartLink
                    key={service.slug}
                    href={service.featured ? `/#${service.slug}` : '/#servizi'}
                    navigate={navigate}
                    onClick={closeMenu}
                  >
                    {service.title}
                  </SmartLink>
                ))}
              </div>
            </details>
            <SmartLink className="mobile-nav-primary-link" href={navItems[1].href} navigate={navigate} onClick={closeMenu}>
              {navItems[1].label}
            </SmartLink>
            <details className="mobile-nav-accordion">
              <summary>
                <span>Settori</span>
                <ChevronDown size={26} aria-hidden="true" />
              </summary>
              <div className="mobile-sector-list">
                <SmartLink href="/sanitario" navigate={navigate} onClick={closeMenu}>
                  Sanitario
                </SmartLink>
              </div>
            </details>
            <SmartLink className="mobile-nav-primary-link" href={navItems[2].href} navigate={navigate} onClick={closeMenu}>
              {navItems[2].label}
            </SmartLink>
          </div>
          <div className="mobile-nav-actions" aria-label="Azioni rapide">
            <button
              className="mobile-nav-action mobile-nav-action-secondary"
              type="button"
              aria-label="Richiedi consulenza"
              onClick={() => {
                closeMenu();
                openModal();
              }}
            >
              Richiedi preventivo <ArrowUpRight size={18} />
            </button>
            <button
              className="mobile-nav-action mobile-nav-action-primary"
              type="button"
              aria-label="Prenota videochiamata"
              onClick={() => {
                closeMenu();
                openBooking();
              }}
            >
              Prenota call <CalendarCheck size={18} />
            </button>
          </div>
        </nav>
      </header>
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

const FUNNEL_DEPTHS = [0, 0.04, 0.11, 0.2, 0.3, 0.41, 0.52, 0.63, 0.73, 0.82, 0.89, 0.95, 0.98];

function projectFunnelPoint(depth, angle) {
  const radius = Math.pow(1 - depth * 0.1, 0.94);

  return [
    800 + 920 * radius * Math.cos(angle),
    198 + 930 * Math.pow(depth, 0.88) + 86 * Math.pow(1 - depth, 1.08) * Math.sin(angle),
  ];
}

function funnelPath(points, close = false) {
  const path = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');

  return close ? `${path} Z` : path;
}

const FUNNEL_RINGS = FUNNEL_DEPTHS.map((depth) => ({
  back: funnelPath(
    Array.from({ length: 49 }, (_, index) => projectFunnelPoint(depth, Math.PI + (Math.PI * index) / 48)),
  ),
  front: funnelPath(
    Array.from({ length: 49 }, (_, index) => projectFunnelPoint(depth, (Math.PI * index) / 48)),
  ),
}));

const FUNNEL_SPOKES = Array.from({ length: 18 }, (_, spokeIndex) =>
  funnelPath(
    Array.from({ length: 49 }, (_, step) => {
      const depth = step / 48;
      const angle = (Math.PI * 2 * (spokeIndex + 0.5)) / 18;
      return projectFunnelPoint(depth, angle);
    }),
  ),
);

function HeroFunnelBackdrop() {
  return (
    <div className="zd-hero-vortex" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient
            id="mago-funnel-stroke"
            gradientUnits="userSpaceOnUse"
            x1="800"
            y1="35"
            x2="800"
            y2="980"
          >
            <stop offset="0%" stopColor="#c9ced5" stopOpacity="0.45" />
            <stop offset="34%" stopColor="#d7dce2" stopOpacity="0.68" />
            <stop offset="68%" stopColor="#eceff2" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#e6e9ed" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient
            id="mago-funnel-mask-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="1000"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="4.5%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="9%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="82%" stopColor="#ffffff" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
          </linearGradient>
          <mask id="mago-funnel-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
            <rect width="1600" height="1000" fill="url(#mago-funnel-mask-gradient)" />
          </mask>
        </defs>

        <g mask="url(#mago-funnel-mask)">
          <g className="zd-funnel-mesh">
            {FUNNEL_RINGS.map((ring, index) => (
              <g key={`ring-${index}`}>
                <path
                  className={`zd-funnel-ring zd-funnel-ring-back ${index === 0 ? 'is-mouth' : ''} ${index % 3 === 0 ? 'is-major' : ''}`}
                  d={ring.back}
                />
                <path
                  className={`zd-funnel-ring zd-funnel-ring-front ${index === 0 ? 'is-mouth' : ''} ${index % 3 === 0 ? 'is-major' : ''}`}
                  d={ring.front}
                />
              </g>
            ))}
            {FUNNEL_SPOKES.map((path, index) => (
              <path className="zd-funnel-spoke" d={path} key={`spoke-${index}`} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

function HomePage({ navigate, openModal }) {
  const featuredServices = marketingServices.filter((service) => service.featured);

  return (
    <main className="zd-home">
      <div className="zd-intro-stage">
        <section className="zd-hero" id="home">
          <div className="container zd-hero-inner reveal">
            <p className="zd-kicker">Strategia. Creatività. Risultati.</p>
            <h1>Il performance marketing reso chiaro ed efficace</h1>
            <p className="zd-hero-text">
              Dal posizionamento del marchio alle campagne digitali, forniamo soluzioni di marketing pratiche
              progettate per aumentare la visibilità, il coinvolgimento e la crescita a lungo termine.
            </p>
            <div className="zd-hero-actions">
              <SmartLink className="zd-button zd-button-outline" href="/#settori" navigate={navigate}>
                Vedi settori <ArrowUpRight size={18} />
              </SmartLink>
              <button className="zd-button zd-button-primary" type="button" onClick={openModal}>
                Richiedi Preventivo <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="zd-about" id="chi-siamo">
          <HeroFunnelBackdrop />
          <div className="container zd-about-grid">
            <div className="zd-about-copy reveal">
              <p className="zd-kicker">Chi siamo</p>
              <p className="zd-about-lead">
                Siamo un team di strateghi, creativi ed esperti di marketing che lavorano insieme per produrre
                contenuti straordinari e garantire che raggiungano il pubblico giusto.
              </p>
              <SmartLink className="zd-text-link zd-text-link-dark" href="/#servizi" navigate={navigate}>
                Scopri cosa facciamo <ArrowUpRight size={19} />
              </SmartLink>
            </div>
            <figure className="zd-about-media reveal delay-1">
              <img
                src={`${ASSETS}zeta-team.webp`}
                alt="Team di strateghi e creativi durante una sessione di lavoro"
                width="1024"
                height="577"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <h2>Guidato dalla strategia. Concentrato sui risultati.</h2>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>

      <section className="zd-services" id="servizi">
        <div className="container">
          <header className="zd-section-heading reveal">
            <p className="zd-kicker">Cosa facciamo</p>
            <h2>Facciamo marketing che attrae, coinvolge, converte</h2>
          </header>
          <div className="zd-service-grid">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="zd-service-card reveal" id={service.slug} key={service.slug}>
                  <div className="zd-service-icon" aria-hidden="true">
                    <Icon size={29} />
                  </div>
                  <span className="zd-card-index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button className="zd-card-link" type="button" onClick={openModal}>
                    Scopri il servizio <ArrowUpRight size={18} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="zd-partners" aria-labelledby="partner-title">
        <div className="container">
          <h2 id="partner-title">Marchi con cui siamo orgogliosi di lavorare</h2>
          <div className="zd-partner-grid">
            {partnerLogos.map((partner) => (
              <img
                className={partner.className}
                src={`${ASSETS}${partner.src}`}
                alt={partner.alt}
                width="220"
                height="80"
                loading="lazy"
                decoding="async"
                key={partner.src}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="zd-sectors" id="settori">
        <div className="container">
          <header className="zd-section-heading zd-section-heading-split reveal">
            <div>
              <p className="zd-kicker">Settori</p>
              <h2>Strategie verticali, crescita misurabile</h2>
            </div>
            <SmartLink className="zd-text-link zd-text-link-dark" href="/sanitario" navigate={navigate}>
              Esplora il settore <ArrowUpRight size={19} />
            </SmartLink>
          </header>
          <SmartLink className="zd-sector-feature reveal" href="/sanitario" navigate={navigate}>
            <div className="zd-sector-number">01</div>
            <div className="zd-sector-copy">
              <p>Sanità privata e professionisti</p>
              <h3>Sanitario</h3>
              <span>
                Sistemi di acquisizione e performance marketing per cliniche, studi e professionisti che vogliono
                trasformare visibilità locale in richieste più qualificate.
              </span>
            </div>
            <div className="zd-sector-tags" aria-label="Specializzazioni sanitarie">
              {sectors.slice(0, 6).map((sector) => (
                <span key={sector.slug}>{sector.label}</span>
              ))}
            </div>
            <ArrowUpRight className="zd-sector-arrow" size={32} aria-hidden="true" />
          </SmartLink>
        </div>
      </section>

      <section className="zd-why">
        <div className="container">
          <header className="zd-section-heading reveal">
            <p className="zd-kicker">Perché lavorare con noi</p>
            <h2>Cosa ci distingue</h2>
          </header>
          <div className="zd-why-grid">
            {differentiators.map((item, index) => (
              <article className="zd-why-card reveal" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="zd-blog" id="blog">
        <div className="container">
          <header className="zd-section-heading zd-section-heading-split reveal">
            <div>
              <p className="zd-kicker">Dal nostro blog</p>
              <h2>Ultimi approfondimenti dal nostro blog</h2>
            </div>
            <a className="zd-text-link zd-text-link-dark" href="https://zetadigital.it/blog/" target="_blank" rel="noreferrer">
              Leggi il blog <ArrowUpRight size={19} />
            </a>
          </header>
          <div className="zd-blog-grid">
            {blogPosts.map((post) => (
              <a className="zd-blog-card reveal" href={post.href} target="_blank" rel="noreferrer" key={post.title}>
                <div className="zd-blog-media">
                  <img
                    src={`${ASSETS}${post.image}`}
                    alt=""
                    width="760"
                    height="500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="zd-blog-meta">
                  <span>{post.category}</span>
                  <time>{post.date}</time>
                </div>
                <h3>{post.title}</h3>
                <span className="zd-card-link">
                  Leggi l’articolo <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="zd-final-cta" id="preventivo">
        <div className="container zd-final-cta-inner reveal">
          <p className="zd-kicker zd-kicker-light">Pronto a far crescere il tuo brand?</p>
          <h2>Fai il primo passo verso il successo del tuo marketing</h2>
          <button className="zd-button zd-button-light" type="button" onClick={openModal}>
            Richiedi Preventivo <ArrowUpRight size={18} />
          </button>
          <p className="zd-final-note">Risponderemo entro 24 ore. Nessuna pressione, solo consigli esperti.</p>
        </div>
      </section>
    </main>
  );
}

function HealthcareHomePage({ navigate, openModal, openBooking }) {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Mago System per il settore sanitario</p>
            <h1>Portiamo alla tua struttura appuntamenti qualificati da pazienti locali</h1>
            <p>
              Costruiamo sistemi di acquisizione per cliniche e professionisti sanitari: posizionamento chiaro,
              campagne locali, crescita misurabile e percorsi che intercettano persone già interessate ai servizi.
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

      <section className="sectors-section" id="settori-sanitari">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Settori sanitari</p>
            <h2>Pagine e funnel verticali per ogni specializzazione</h2>
            <p>
              Ogni verticale ha bisogno di messaggi, filtri e percorsi diversi. Qui sotto trovi le aree per cui
              costruiamo sistemi di acquisizione pazienti su misura.
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
              <p>
                Annunci generici, traffico freddo, richieste da prezzo basso, follow-up manuale e poca chiarezza sui
                servizi che generano valore.
              </p>
            </article>
            <article className="comparison-card active reveal delay-1">
              <h3>Sistema Mago</h3>
              <p>
                Messaggi verticali, pagine rapide, prova sociale, CTA semplici e dati per capire quali pazienti
                arrivano dai canali giusti.
              </p>
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
            <h2>Quando il valore è chiaro prima della visita, la conversazione cambia.</h2>
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
  const landing = sectorLandingPages[sector.slug];

  if (!landing) {
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
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="sector-landing-page">
      <section className="sector-landing-hero">
        <div className="wide-container sector-landing-hero-grid">
          <div className="sector-landing-copy reveal">
            <p className="sector-question-pill">
              <Stethoscope size={24} /> {landing.question}
            </p>
            <p className="eyebrow">{sector.eyebrow}</p>
            <h1>{landing.headline}</h1>
            <p>{landing.subhead}</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={openBooking}>
                Prenota videochiamata <CalendarCheck size={18} />
              </button>
              <button className="button secondary" type="button" onClick={openModal}>
                Richiedi consulenza <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="sector-landing-visual reveal delay-1" aria-label={`Sistema Mago System per ${sector.label}`}>
            <span>{sector.label}</span>
            <div className="sector-visual-stack">
              <article>
                <Search size={24} />
                <strong>Domanda già interessata</strong>
                <small>ricerche, bisogni e zona corretta</small>
              </article>
              <article>
                <Target size={24} />
                <strong>Messaggio che qualifica</strong>
                <small>servizio, contesto e passo successivo</small>
              </article>
              <article>
                <CalendarCheck size={24} />
                <strong>Richiesta più lavorabile</strong>
                <small>meno traffico casuale, più coerenza</small>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="sector-qualifier-section">
        <div className="container sector-qualifier-card reveal">
          <ShieldCheck size={30} />
          <p>{landing.qualifierTitle}</p>
          <h2>Prima si seleziona, poi si scala</h2>
          <span>{landing.qualifierText}</span>
        </div>
      </section>

      <section className="sector-value-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Equazione del valore</p>
            <h2>Più desiderio e fiducia, meno tempo e meno attrito nel primo contatto</h2>
            <p>
              Ogni sezione porta la persona già interessata a capire meglio il servizio, ridurre dubbi inutili e
              lasciare una richiesta più coerente con il percorso che offri.
            </p>
          </div>
          <div className="sector-value-grid">
            {landing.valueCards.map((card) => (
              <article className="sector-value-card reveal" key={card.title}>
                <CheckCircle2 size={24} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mago-section sector-mago-section" id={`mago-${sector.slug}`}>
        <div className="wide-container mago-panel reveal">
          <div className="mago-intro">
            <p className="eyebrow">Metodo MAGO per {sector.label.toLowerCase()}</p>
            <h2>Quattro leve per trasformare attenzione locale in richieste più coerenti</h2>
            <p>
              Strategia, campagne, crescita e ottimizzazione lavorano insieme: il sistema intercetta persone già
              interessate e le accompagna verso il contatto con un percorso leggibile.
            </p>
          </div>
          <div className="mago-grid" aria-label={`Metodo MAGO applicato a ${sector.label}`}>
            {landing.magoPillars.map((pillar, index) => (
              <article className="mago-card reveal" style={{ transitionDelay: `${index * 0.06}s` }} key={pillar.letter}>
                <span>{pillar.letter}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sector-services-section">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Servizi e percorsi prioritari</p>
            <h2>Landing e campagne verticali sulle aree dove la domanda ha già un’intenzione</h2>
          </div>
          <div className="sector-service-grid">
            {landing.services.map((service) => (
              <article className="sector-service-card reveal" key={service}>
                <span>{service}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sector-comparison-section">
        <div className="container sector-comparison-grid">
          <div className="comparison-copy reveal">
            <p className="eyebrow">Prima / dopo</p>
            <h2>Quando il percorso è chiaro prima del contatto, cambia la qualità della richiesta.</h2>
          </div>
          <div className="comparison-panels">
            {landing.comparison.map((item, index) => (
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
            <p className="eyebrow">Campagne, landing e follow-up</p>
            <h2>{landing.workflowTitle}</h2>
            <p>{landing.workflowText}</p>
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
            {landing.dashboard.map(([label, value], index) => {
              const Icon = index === 0 ? BarChart3 : index === 1 ? Activity : MapPin;
              return (
                <div key={label}>
                  <Icon size={26} />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta
        openModal={openModal}
        openBooking={openBooking}
        title={landing.ctaTitle}
        description={landing.ctaDescription}
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
      <div className="container footer-grid zd-footer-grid">
        <div className="footer-brand">
          <Logo navigate={navigate} />
          <p>Marketing che genera crescita, costruisce brand solidi e produce risultati concreti.</p>
        </div>
        <div className="zd-footer-links">
          <h3>Link rapidi</h3>
          <SmartLink href="/" navigate={navigate}>Home</SmartLink>
          <SmartLink href="/#chi-siamo" navigate={navigate}>Chi siamo</SmartLink>
          <SmartLink href="/#servizi" navigate={navigate}>Servizi</SmartLink>
          <SmartLink href="/#settori" navigate={navigate}>Settori</SmartLink>
          <SmartLink href="/#blog" navigate={navigate}>Blog</SmartLink>
        </div>
        <div className="zd-footer-links">
          <h3>Servizi</h3>
          {marketingServices.map((service) => (
            <SmartLink
              key={service.slug}
              href={service.featured ? `/#${service.slug}` : '/#servizi'}
              navigate={navigate}
            >
              {service.title}
            </SmartLink>
          ))}
        </div>
        <div className="zd-footer-links">
          <h3>Contatti</h3>
          <p>Via L. Ariosto, 4/c, 41012 Carpi MO, Italia</p>
          <a href="mailto:info@magodigital.it">
            <Mail size={18} /> info@magodigital.it
          </a>
          <button type="button" onClick={openBooking}>Prenota una videochiamata</button>
          <button type="button" onClick={openModal}>Richiedi un preventivo</button>
        </div>
      </div>
      <div className="container footer-bottom">
        <a className="scroll-top" href="#home" aria-label="Torna su">
          <ArrowUp size={21} />
        </a>
        <div className="zd-footer-legal">
          <p>Copyright © 2026, Mago System. Tutti i diritti riservati.</p>
          <div>
            <SmartLink href="/privacy-policy" navigate={navigate}>Privacy Policy</SmartLink>
            <button type="button" onClick={openCookieSettings}>Preferenze cookie</button>
          </div>
        </div>
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
  const activeLanding = activeSector ? sectorLandingPages[activeSector.slug] : null;
  const isHealthcarePath = path === '/sanitario';
  const isPrivacyPath = path === '/privacy-policy';
  const isKnownPath = path === '/' || isHealthcarePath || Boolean(activeSector) || isPrivacyPath;

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
            activeLanding?.metaTitle ||
            (activeSector.slug === 'cliniche-dentali'
              ? 'Cliniche dentali - Appuntamenti da pazienti locali | Mago System'
              : `${activeSector.label} - Acquisizione pazienti | Mago System`),
          description: activeLanding?.metaDescription || activeSector.subhead,
          path: `/${activeSector.slug}`,
        }
      : isPrivacyPath
        ? privacyMeta
        : isHealthcarePath
          ? healthcareMeta
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

    let schema = document.getElementById('mago-page-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'mago-page-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': activeSector ? 'Service' : isPrivacyPath ? 'WebPage' : 'ProfessionalService',
      name: activeSector ? `Mago System per ${activeSector.label}` : pageMeta.title,
      url: `${SITE_URL}${pageMeta.path}`,
      description: pageMeta.description,
      inLanguage: 'it-IT',
      provider: {
        '@type': 'ProfessionalService',
        name: 'Mago System',
        url: SITE_URL,
        email: 'info@magodigital.it',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via L. Ariosto, 4/c',
          postalCode: '41012',
          addressLocality: 'Carpi',
          addressRegion: 'MO',
          addressCountry: 'IT',
        },
      },
      areaServed: 'IT',
      serviceType: activeSector
        ? `Sistema di acquisizione per ${activeSector.label.toLowerCase()}`
        : isHealthcarePath
          ? 'Performance marketing per strutture sanitarie private'
          : 'Strategia digitale, siti web, advertising, email marketing e SEO',
    });
  }, [activeSector, activeLanding, isHealthcarePath, isPrivacyPath]);

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
      {isHealthcarePath && (
        <HealthcareHomePage
          navigate={navigate}
          openModal={() => setModalOpen(true)}
          openBooking={() => setBookingOpen(true)}
        />
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
