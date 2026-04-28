import type { Metadata } from "next";
import MagoInteractive from "./components/MagoInteractive";

export const metadata: Metadata = {
  title: "Mago System | SEO e Digital Marketing per Attività Locali",
  description:
    "Mago System aiuta attività locali, professionisti e aziende di servizi a ottenere più richieste da Google con SEO, Google Ads, Meta Ads e landing page orientate alla conversione.",
};

const steps = [
  {
    number: "01",
    title: "Prima capiamo dove si perde valore",
    text: "Non partiamo da slogan o pacchetti preconfezionati. Analizziamo come ti trovano oggi, quali servizi vuoi spingere, quali ricerche fanno i clienti e dove il percorso si interrompe.",
  },
  {
    number: "02",
    title: "Poi costruiamo una presenza che risponde alle ricerche reali",
    text: "Una persona non cerca “marketing”. Cerca un dentista, una pizzeria, un idraulico, un’impresa edile, una soluzione vicina, affidabile e chiara. Il sito deve intercettare quella domanda.",
  },
  {
    number: "03",
    title: "Dopo trasformiamo visite in contatti",
    text: "Il traffico da solo non paga le fatture. Servono pagine chiare, CTA visibili, messaggi credibili, prove di fiducia e un percorso semplice per chiamare, prenotare o chiedere un preventivo.",
  },
  {
    number: "04",
    title: "Infine ottimizziamo con i dati",
    text: "SEO, Ads e conversioni migliorano nel tempo. Guardiamo cosa porta richieste vere, cosa disperde budget e cosa può diventare un canale stabile di acquisizione clienti.",
  },
];

const services = [
  "SEO locale",
  "Ottimizzazione Google Business Profile",
  "Landing page per servizi specifici",
  "Google Ads",
  "Meta Ads",
  "Tracking conversioni",
  "Copywriting strategico",
  "Analisi competitor locali",
];

const targets = [
  "Ristoranti e pizzerie",
  "Studi medici e dentistici",
  "Imprese edili",
  "Artigiani e manutentori",
  "Centri estetici",
  "Professionisti locali",
  "Palestre e centri sportivi",
  "Servizi B2B territoriali",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      {/* HERO */}
<section className="px-4 pb-24 pt-24 md:px-6 md:pt-36">
  <div className="mx-auto max-w-7xl">
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl md:p-14">
      {/* glow */}
      <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[380px] w-[380px] rounded-full bg-orange-400/10 blur-[120px]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* LEFT */}
        <div>
          <div className="mb-7 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
            SEO · Google Ads · Local Growth
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tight md:text-7xl xl:text-8xl">
            Più visibilità.
            <br />
            Più fiducia.
            <br />
            Più richieste.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72 md:text-xl md:leading-9">
            Aiuto attività locali e aziende di servizi a trasformare Google in
            un canale reale di acquisizione clienti: ti fai trovare meglio,
            comunichi in modo più credibile e porti più persone verso chiamate,
            prenotazioni e preventivi.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "SEO pensata per ricerche locali",
              "Pagine costruite per convertire",
              "Ads solo quando servono davvero",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold leading-6 text-white/75"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/quiz"
              className="rounded-full bg-white px-8 py-4 text-center font-black text-black transition hover:scale-[1.02]"
            >
              Fai il quiz strategico
            </a>

            <a
              href="/call"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              Fissa una videocall
            </a>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/50">
            Prima capiamo dove sei oggi. Poi decidiamo se ha più senso lavorare
            su SEO, sito, landing page, Google Business Profile, Ads o tracking.
            Niente pacchetti buttati lì.
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-5 backdrop-blur-2xl md:p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-black uppercase tracking-[0.26em] text-emerald-300">
                Obiettivo
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                Essere tra le scelte più credibili quando il cliente cerca.
              </h2>

              <div className="mt-7 space-y-4">
                {[
                  {
                    label: "Google",
                    value: "Visibilità su ricerche ad alta intenzione",
                  },
                  {
                    label: "Fiducia",
                    value: "Recensioni, messaggi chiari e presenza curata",
                  },
                  {
                    label: "Conversione",
                    value: "Percorso semplice verso contatto o prenotazione",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <p className="text-sm font-black text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                <p className="text-3xl font-black text-emerald-300">SEO</p>
                <p className="mt-2 text-xs leading-5 text-white/55">
                  Per costruire domanda stabile nel tempo.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-3xl font-black text-white">ADS</p>
                <p className="mt-2 text-xs leading-5 text-white/55">
                  Per accelerare quando la base è pronta.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white shadow-2xl backdrop-blur-xl md:block">
            Local visibility system
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* TRUST */}
      <MagoInteractive />

      {/* POSITIONING */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-orange-300">
                Il punto è semplice
              </p>

              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                Se una persona ti cerca, deve capire subito perché scegliere te.
              </h2>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-10">
              <p className="text-xl leading-9 text-white/75">
                Il tuo potenziale cliente non ha tempo da perdere. Confronta,
                valuta, apre due o tre risultati, guarda se sei credibile e decide
                se contattarti. Il lavoro serio è qui: posizionarti bene, parlare
                chiaro, eliminare attriti e rendere naturale il passo successivo.
              </p>

              <p className="mt-6 text-xl leading-9 text-white/75">
                Non serve sembrare “grandi”. Serve sembrare affidabili, specifici
                e facili da contattare. La differenza tra un sito che esiste e un
                sito che lavora spesso è tutta lì.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNNEL */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-emerald-300">
            Percorso
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Ogni fase risolve il problema successivo.
          </h2>

          <div className="mt-14 space-y-5">
            {steps.map((item) => (
              <div
                key={item.number}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl transition hover:bg-white/[0.09]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                  <span className="text-4xl font-black text-white/30">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-8 backdrop-blur-2xl">
            <p className="text-lg leading-8 text-white/75">
              Questo è il motivo per cui non partiamo dicendo “ti facciamo le
              Ads” o “ti facciamo SEO”. Prima capiamo cosa blocca la crescita.
              Poi scegliamo gli strumenti. Il contrario è il modo più elegante
              per spendere soldi male.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-orange-300">
                Cosa possiamo costruire
              </p>

              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                Un sistema su misura per ricevere richieste migliori.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/65">
                Non tutte le attività hanno bisogno delle stesse cose. Una
                pizzeria, uno studio medico e un’impresa edile hanno percorsi
                decisionali diversi. Il sistema deve rispettare il modo in cui il
                cliente sceglie.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6 font-bold backdrop-blur-2xl"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-emerald-300">
            Obiezioni legittime
          </p>

          <h2 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Hai ragione a essere prudente. Il marketing è pieno di parole grosse.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "“Ho già provato con le Ads.”",
                text: "Spesso il problema non è la piattaforma. È l’offerta, la pagina, il tracciamento o il fatto che si manda traffico su un percorso poco convincente.",
              },
              {
                title: "“La SEO è troppo lenta.”",
                text: "La SEO richiede tempo, sì. Ma è anche ciò che può renderti meno dipendente dal budget pubblicitario. Tradizione vecchia scuola: fondamenta prima del tetto.",
              },
              {
                title: "“Non voglio pagare per cose inutili.”",
                text: "Giusto. Per questo ogni attività deve avere priorità diverse. Prima si individuano le leve con più impatto, poi si decide dove investire.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-black/25 p-7">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-orange-300">
            Per chi è pensato
          </p>

          <h2 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Per attività locali che vogliono essere scelte, non solo viste.
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {targets.map((target) => (
              <div
                key={target}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6 font-bold backdrop-blur-2xl"
              >
                {target}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-8 shadow-2xl backdrop-blur-2xl md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-emerald-300">
            Prezzi e collaborazione
          </p>

          <h2 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Nessun pacchetto standard buttato sul tavolo.
          </h2>

          <p className="mt-8 max-w-4xl text-xl leading-9 text-white/75">
            Ogni proposta viene costruita sulla tua situazione reale: settore,
            zona, concorrenza, margini, obiettivi, urgenza e budget disponibile.
            Il punto non è venderti “più servizi possibile”. Il punto è creare
            una collaborazione sostenibile e vantaggiosa per entrambe le parti.
          </p>

          <p className="mt-6 max-w-4xl text-xl leading-9 text-white/75">
            A volte ha senso partire dalla SEO. A volte serve prima sistemare il
            sito. A volte conviene usare Google Ads per validare velocemente la
            domanda. A volte, molto semplicemente, non è il momento giusto. Meglio
            dirlo subito che costruire castelli sulla sabbia.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Analisi iniziale chiara",
              "Priorità in base all’impatto",
              "Proposta personalizzata",
            ].map((item) => (
              <div key={item} className="rounded-[1.7rem] bg-black/25 p-6 font-bold">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="/quiz"
              className="inline-block rounded-full bg-white px-9 py-5 text-center text-lg font-black text-black transition hover:scale-[1.02]"
            >
              Fai il quiz strategico
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28 pt-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-12">
            <h2 className="text-4xl font-black leading-tight">
              Vuoi capire da dove partire?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Rispondi al quiz: ci aiuta a capire obiettivi, situazione attuale
              e priorità. È il modo più ordinato per evitare chiacchiere inutili.
            </p>
            <a
              href="/quiz"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-black text-black"
            >
              Inizia il quiz
            </a>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-12">
            <h2 className="text-4xl font-black leading-tight">
              Preferisci parlare direttamente?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Prenota una videocall con un operatore. Guardiamo insieme il tuo
              caso e capiamo se c’è spazio per lavorare seriamente.
            </p>
            <a
              href="/call"
              className="mt-8 inline-block rounded-full border border-white/20 bg-white/10 px-8 py-4 font-black text-white"
            >
              Fissa una videocall
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}