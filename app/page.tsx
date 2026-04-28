export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#151515]">
      {/* HERO */}
      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            SEO · Google Ads · Facebook Ads · Local Marketing
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Più visibilità su Google.
            <br />
            Più richieste.
            <br />
            Più clienti locali.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-8 text-[#555047]">
            Mago System aiuta attività locali, professionisti e aziende di
            servizi a farsi trovare online da persone che stanno già cercando
            quello che offrono: pizzerie, studi medici, imprese edili,
            manutentori, centri estetici, consulenti e attività sul territorio.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contatti"
              className="rounded-full bg-[#151515] px-8 py-4 text-center text-base font-bold text-white transition hover:scale-[1.02]"
            >
              Richiedi analisi gratuita
            </a>
            <a
              href="#metodo"
              className="rounded-full border border-[#151515]/20 px-8 py-4 text-center text-base font-bold transition hover:bg-white"
            >
              Scopri il metodo
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black">SEO</p>
              <p className="mt-2 text-[#605b52]">
                Per costruire visibilità stabile su Google.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black">ADS</p>
              <p className="mt-2 text-[#605b52]">
                Per accelerare quando hai budget da investire.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black">LEAD</p>
              <p className="mt-2 text-[#605b52]">
                Per trasformare ricerche e clic in contatti veri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="px-6 py-24 bg-[#151515] text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8b0a3]">
            Il problema
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Non basta avere un sito. Devi essere trovato quando il cliente ti sta cercando.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Il tuo sito non porta richieste",
                text: "Magari è bello, magari no. Ma se non genera contatti, è solo un biglietto da visita parcheggiato online.",
              },
              {
                title: "I concorrenti sono sopra di te",
                text: "Quando qualcuno cerca su Google, trova altri prima di te. E spesso il cliente chiama il primo che gli ispira fiducia.",
              },
              {
                title: "Le campagne bruciano budget",
                text: "Senza strategia, Google Ads e Facebook Ads diventano una slot machine. E la slot, di solito, vince lei.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUZIONE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            La soluzione
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Un sistema di acquisizione clienti costruito intorno a Google.
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-8 text-[#555047]">
            Prima si costruiscono le fondamenta: posizionamento, pagine chiare,
            SEO locale, contenuti utili e tracciamento. Poi, se ha senso,
            si accende la pubblicità per aumentare il volume delle richieste.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-[#8a8173]">
                Prima
              </span>
              <h3 className="mt-4 text-3xl font-black">SEO e visibilità organica</h3>
              <p className="mt-4 leading-7 text-[#5d574f]">
                Lavoriamo per farti apparire quando le persone cercano servizi
                nella tua zona: “pizzeria vicino a me”, “dentista a Modena”,
                “idraulico urgente”, “impresa ristrutturazioni”, e ricerche simili.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-[#8a8173]">
                Poi
              </span>
              <h3 className="mt-4 text-3xl font-black">Advertising mirato</h3>
              <p className="mt-4 leading-7 text-[#5d574f]">
                Se vuoi accelerare, costruiamo campagne Google Ads e Meta Ads
                con obiettivi chiari: telefonate, richieste preventivo,
                prenotazioni, messaggi e visite alla tua attività.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACRONIMO MAGO */}
      <section id="metodo" className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Il metodo Mago
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Marketing, Advertising, Growth, Optimization.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                letter: "M",
                title: "Marketing",
                text: "Capire cosa vendi, a chi lo vendi e perché dovrebbero scegliere te invece di un concorrente.",
              },
              {
                letter: "A",
                title: "Advertising",
                text: "Campagne pubblicitarie solo quando servono, con messaggi diretti e tracciamento dei risultati.",
              },
              {
                letter: "G",
                title: "Growth",
                text: "Azioni pensate per aumentare richieste, prenotazioni e opportunità commerciali.",
              },
              {
                letter: "O",
                title: "Optimization",
                text: "Miglioramento continuo di sito, SEO, campagne, conversioni e pagine strategiche.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-[#f7f4ee] p-8">
                <p className="text-6xl font-black">{item.letter}</p>
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#5d574f]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNNEL */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
            Funnel operativo
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Ogni blocco ha un compito preciso.
          </h2>

          <div className="mt-14 space-y-5">
            {[
              {
                step: "01",
                title: "Analisi della presenza online",
                text: "Studiamo sito, Google Business Profile, posizionamento SEO, concorrenza locale e punti deboli.",
              },
              {
                step: "02",
                title: "Strategia di acquisizione",
                text: "Definiamo quali servizi spingere, quali parole chiave usare e quali pagine servono per convertire.",
              },
              {
                step: "03",
                title: "SEO locale e contenuti",
                text: "Ottimizziamo le pagine per intercettare ricerche reali legate alla tua città, zona e servizio.",
              },
              {
                step: "04",
                title: "Landing page e conversioni",
                text: "Costruiamo pagine semplici, persuasive e orientate all’azione: chiamata, modulo, WhatsApp o prenotazione.",
              },
              {
                step: "05",
                title: "Campagne Ads opzionali",
                text: "Quando la base è pronta, possiamo attivare Google Ads e Facebook Ads per aumentare velocità e volume.",
              },
              {
                step: "06",
                title: "Misurazione e ottimizzazione",
                text: "Monitoriamo traffico, richieste, conversioni e comportamento degli utenti. I numeri comandano, non le sensazioni.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-[#151515]/10 bg-white p-8 shadow-sm"
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

      {/* TARGET */}
      <section className="px-6 py-24 bg-[#151515] text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8b0a3]">
            Per chi lavoriamo
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Per attività locali che vogliono clienti, non vanity metrics.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              "Ristoranti e pizzerie",
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

      {/* OFFERTA */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6f6a60]">
                Cosa puoi ottenere
              </p>

              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                Una presenza online pensata per generare richieste.
              </h2>
            </div>

            <div className="space-y-5">
              {[
                "Più visibilità nelle ricerche locali su Google",
                "Pagine ottimizzate per trasformare visite in contatti",
                "Google Business Profile più curato e competitivo",
                "Strategia SEO per servizi, città e zone specifiche",
                "Campagne Ads tracciate e collegate a obiettivi concreti",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-[#f7f4ee] p-5 font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section id="contatti" className="px-6 py-28">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#151515] p-10 text-white md:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8b0a3]">
            Partiamo dai numeri
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Vuoi capire se la tua attività può ricevere più richieste da Google?
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Richiedi un’analisi iniziale. Guardiamo insieme la tua situazione
            attuale, i competitor locali e le opportunità concrete. Niente fumo,
            niente promesse da televendita anni ’90: solo una strategia chiara.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:info@magosystem.it"
              className="rounded-full bg-white px-8 py-4 text-center font-black text-[#151515]"
            >
              Scrivimi ora
            </a>

            <a
              href="tel:+390000000000"
              className="rounded-full border border-white/20 px-8 py-4 text-center font-black text-white"
            >
              Chiama per una consulenza
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}