export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#151515]">
      {/* HERO */}
      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            SEO · Google Ads · Meta Ads · Local Growth
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Trasformiamo Google in un canale stabile di richieste per la tua attività.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-8 text-[#555047]">
            Mago System aiuta attività locali e aziende di servizi a farsi trovare
            dalle persone giuste, nel momento in cui stanno cercando una soluzione:
            una prenotazione, un preventivo, una visita, una chiamata.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/quiz"
              className="rounded-full bg-[#151515] px-8 py-4 text-center text-base font-bold text-white transition hover:scale-[1.02]"
            >
              Fai il quiz strategico
            </a>
            <a
              href="/call"
              className="rounded-full border border-[#151515]/20 px-8 py-4 text-center text-base font-bold transition hover:bg-white"
            >
              Fissa una videocall
            </a>
          </div>

          <p className="mt-5 text-sm text-[#6f6a60]">
            In pochi minuti capiamo che tipo di visibilità ti serve: SEO, campagne Ads
            o una strategia completa.
          </p>
        </div>
      </section>

      {/* POSIZIONAMENTO */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Posizionamento
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Non vendiamo “marketing”. Costruiamo percorsi per ricevere più contatti qualificati.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Farti trovare",
                text: "Ottimizziamo la tua presenza online per intercettare chi cerca davvero i tuoi servizi nella tua zona.",
              },
              {
                title: "Farti scegliere",
                text: "Rendiamo più chiaro il tuo valore, i tuoi servizi e i motivi per cui un cliente dovrebbe contattarti.",
              },
              {
                title: "Farti contattare",
                text: "Costruiamo pagine e percorsi pensati per generare chiamate, richieste, prenotazioni e preventivi.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-[#f7f4ee] p-8">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5d574f]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISULTATO */}
      <section className="px-6 py-24 bg-[#151515] text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8b0a3]">
            Obiettivo
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Il sito deve lavorare come un commerciale silenzioso, non come una brochure.
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-8 text-white/70">
            Un sito professionale non deve solo “presentarti bene”. Deve guidare
            l’utente verso un’azione: chiamare, compilare un modulo, prenotare,
            richiedere un preventivo o fissare una consulenza.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-3xl font-black">SEO come fondamenta</h3>
              <p className="mt-4 leading-7 text-white/70">
                Creiamo pagine e contenuti pensati per posizionarsi su Google,
                soprattutto nelle ricerche locali e nei servizi ad alta intenzione.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-3xl font-black">Ads come acceleratore</h3>
              <p className="mt-4 leading-7 text-white/70">
                Quando la struttura è pronta, Google Ads e Meta Ads possono
                aumentare il volume delle richieste senza partire alla cieca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METODO MAGO */}
      <section id="metodo" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Metodo Mago
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Un metodo semplice da capire, serio da eseguire.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                letter: "M",
                title: "Marketing",
                text: "Analizziamo mercato, servizi, concorrenti e domanda reale per capire dove conviene posizionarti.",
              },
              {
                letter: "A",
                title: "Advertising",
                text: "Attiviamo campagne solo quando esiste una base solida e un obiettivo misurabile.",
              },
              {
                letter: "G",
                title: "Growth",
                text: "Lavoriamo per aumentare richieste, prenotazioni e opportunità commerciali nel tempo.",
              },
              {
                letter: "O",
                title: "Optimization",
                text: "Miglioriamo continuamente pagine, messaggi, SEO, campagne e conversioni.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
                <p className="text-6xl font-black">{item.letter}</p>
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5d574f]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNNEL */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Percorso di lavoro
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Dal primo clic alla richiesta di contatto.
          </h2>

          <div className="mt-14 space-y-5">
            {[
              {
                step: "01",
                title: "Analisi iniziale",
                text: "Capiremo cosa vendi, dove vuoi crescere, quali servizi hanno più valore e come ti trovano oggi i clienti.",
              },
              {
                step: "02",
                title: "Mappa delle opportunità",
                text: "Individuiamo parole chiave, ricerche locali, concorrenti, zone strategiche e pagine da creare o migliorare.",
              },
              {
                step: "03",
                title: "Architettura del sito",
                text: "Organizziamo le sezioni in modo che ogni pagina abbia un ruolo preciso nel percorso dell’utente.",
              },
              {
                step: "04",
                title: "SEO e contenuti",
                text: "Scriviamo contenuti utili, chiari e ottimizzati per intercettare chi sta cercando il tuo servizio.",
              },
              {
                step: "05",
                title: "Conversione",
                text: "Inseriamo CTA, moduli, chiamate, WhatsApp o prenotazioni nel punto giusto. Pochi fronzoli, più azioni.",
              },
              {
                step: "06",
                title: "Ottimizzazione continua",
                text: "Monitoriamo cosa funziona, cosa va migliorato e dove conviene investire più energia o budget.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-[#151515]/10 bg-[#f7f4ee] p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <span className="text-3xl font-black text-[#9b907f]">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 leading-7 text-[#5d574f]">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Servizi
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Le leve giuste, nel giusto ordine.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "SEO locale",
                text: "Per essere visibile nelle ricerche della tua zona e intercettare clienti con intenzione reale.",
              },
              {
                title: "Siti e landing page",
                text: "Per presentare i tuoi servizi con chiarezza e trasformare le visite in richieste concrete.",
              },
              {
                title: "Google Business Profile",
                text: "Per migliorare la tua presenza su Maps e nelle ricerche locali, dove spesso si decide tutto.",
              },
              {
                title: "Google Ads",
                text: "Per raggiungere subito chi cerca servizi specifici e misurare telefonate, moduli e conversioni.",
              },
              {
                title: "Meta Ads",
                text: "Per creare domanda, promuovere offerte e lavorare su pubblico locale con messaggi mirati.",
              },
              {
                title: "Tracking e report",
                text: "Per sapere da dove arrivano i contatti e quali attività stanno producendo risultati.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5d574f]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET */}
      <section className="px-6 py-24 bg-[#151515] text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8b0a3]">
            Ideale per
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Attività che vogliono diventare più facili da trovare e più semplici da contattare.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              "Pizzerie e ristoranti",
              "Studi medici e dentistici",
              "Imprese edili",
              "Manutentori e artigiani",
              "Centri estetici",
              "Professionisti locali",
              "Palestre e centri sportivi",
              "Negozi specializzati",
              "Servizi B2B territoriali",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-5 font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA DOPPIA */}
      <section id="contatti" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
              Prossimo passo
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Scegli il modo più comodo per iniziare.
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] bg-[#f7f4ee] p-8">
                <h3 className="text-3xl font-black">Fai il quiz strategico</h3>
                <p className="mt-4 leading-7 text-[#5d574f]">
                  Rispondi a poche domande su attività, obiettivi e zona.
                  Ti aiuta a capire se ti serve più SEO, più Ads o una strategia completa.
                </p>

                <a
                  href="/quiz"
                  className="mt-8 inline-block rounded-full bg-[#151515] px-8 py-4 font-black text-white"
                >
                  Inizia il quiz
                </a>
              </div>

              <div className="rounded-[2rem] bg-[#151515] p-8 text-white">
                <h3 className="text-3xl font-black">Fissa una videocall</h3>
                <p className="mt-4 leading-7 text-white/70">
                  Parla direttamente con un operatore. Valutiamo insieme la tua
                  situazione, il potenziale su Google e il percorso più sensato.
                </p>

                <a
                  href="/call"
                  className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-black text-[#151515]"
                >
                  Prenota una videocall
                </a>
              </div>
            </div>

            <p className="mt-8 text-sm leading-6 text-[#6f6a60]">
              Consiglio pratico: se non sai da dove partire, fai prima il quiz.
              Se hai già un obiettivo preciso, prenota direttamente la call.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}