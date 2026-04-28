"use client";

import { useState } from "react";

const items = [
  {
    letter: "M",
    title: "Marketing",
    text: "Prima di parlare di SEO, Ads o sito, serve capire cosa vendi, a chi lo vendi e perché una persona dovrebbe scegliere proprio te. Qui si costruisce la direzione.",
  },
  {
    letter: "A",
    title: "Advertising",
    text: "Le campagne pubblicitarie non servono a “fare traffico”. Servono a portare persone giuste su un percorso già pensato per convertire.",
  },
  {
    letter: "G",
    title: "Growth",
    text: "La crescita non è solo aumentare visite. È aumentare richieste, prenotazioni, preventivi e opportunità reali per la tua attività.",
  },
  {
    letter: "O",
    title: "Optimization",
    text: "Ogni parte del sistema va migliorata nel tempo: pagine, messaggi, SEO, campagne, tracciamento e conversioni.",
  },
];

export default function MagoInteractive() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-emerald-300">
            Metodo Mago
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Quattro leve, un solo sistema.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Ogni lettera rappresenta una fase del lavoro. Non sono parole messe lì
            per fare scena: sono il modo in cui trasformiamo una presenza online
            confusa in un percorso che porta contatti.
          </p>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-10">
          {/* effetto sfondo */}
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/10 blur-[110px]" />
          <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-orange-400/10 blur-[80px]" />
          <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-blue-400/10 blur-[80px]" />

          {/* linee orbitali */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          {/* lettere */}
          <div className="relative z-10 grid min-h-[480px] place-items-center">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const isOtherActive = activeIndex !== null && !isActive;

              const positions = [
                "left-[12%] top-[18%]",
                "right-[14%] top-[20%]",
                "left-[16%] bottom-[16%]",
                "right-[18%] bottom-[18%]",
              ];

              const activePosition =
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";

              return (
                <button
                  key={item.letter}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={[
                    "absolute flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.08] text-6xl font-black text-white shadow-2xl backdrop-blur-2xl transition-all duration-500 md:h-40 md:w-40 md:text-7xl",
                    activeIndex === null ? positions[index] : "",
                    isActive ? activePosition + " scale-110 border-emerald-300/40 bg-emerald-300/15 text-emerald-300" : "",
                    isOtherActive ? "scale-75 opacity-20 blur-[1px]" : "",
                    activeIndex !== null && !isActive ? positions[index] : "",
                    "hover:border-emerald-300/40 hover:bg-white/[0.12]",
                  ].join(" ")}
                  aria-label={`Apri ${item.title}`}
                >
                  {item.letter}
                </button>
              );
            })}

            {/* popup centrale */}
            {activeItem && (
              <div className="absolute bottom-6 left-1/2 z-20 w-full max-w-2xl -translate-x-1/2 rounded-[2rem] border border-white/10 bg-black/60 p-7 shadow-2xl backdrop-blur-2xl md:bottom-10 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                      {activeItem.letter} / {activeItem.title}
                    </p>

                    <h3 className="mt-4 text-3xl font-black md:text-4xl">
                      {activeItem.title}
                    </h3>

                    <p className="mt-4 text-lg leading-8 text-white/70">
                      {activeItem.text}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveIndex(null)}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/20"
                    aria-label="Chiudi"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            )}

            {/* testo iniziale */}
            {activeIndex === null && (
              <div className="absolute left-1/2 top-1/2 z-10 max-w-md -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/35">
                  Clicca una lettera
                </p>
                <h3 className="mt-4 text-3xl font-black md:text-5xl">
                  M · A · G · O
                </h3>
                <p className="mt-5 text-base leading-7 text-white/55">
                  Ogni leva ha un ruolo preciso nel percorso: strategia,
                  acquisizione, crescita e ottimizzazione.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}