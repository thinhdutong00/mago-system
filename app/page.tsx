export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Google Ads · SEO · Digital Marketing
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight">
          Mago System
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-neutral-600">
          Aiutiamo aziende e professionisti a trovare clienti con Google,
          posizionamento SEO e campagne pubblicitarie pensate per vendere.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#contatti"
            className="rounded-full bg-black px-6 py-3 text-white font-semibold"
          >
            Richiedi consulenza
          </a>

          <a
            href="#servizi"
            className="rounded-full border border-neutral-300 px-6 py-3 font-semibold"
          >
            Vedi i servizi
          </a>
        </div>
      </section>

      <section id="servizi" className="px-6 py-20 bg-neutral-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "Google Ads",
            "SEO",
            "Strategia Marketing",
          ].map((service) => (
            <div key={service} className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">{service}</h2>
              <p className="mt-4 text-neutral-600">
                Sistema chiaro, misurabile e orientato alla crescita.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contatti" className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black">Vuoi più clienti da Google?</h2>
        <p className="mt-4 text-neutral-600">
          Scrivici e analizziamo il tuo sito, le tue campagne o la tua presenza online.
        </p>
      </section>
    </main>
  );
}