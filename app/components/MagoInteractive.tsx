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
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300 md:text-sm md:tracking-[0.32em]">
            Metodo Mago
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Quattro leve, un solo sistema.
          </h2>

          <p className="mt-6 text-base leading-7 text-white/65 md:text-lg md:leading-8">
            Ogni lettera rappresenta una fase del lavoro. Non sono parole messe lì
            per fare scena: sono il modo in cui trasformiamo una presenza online
            confusa in un percorso che porta contatti.
          </p>
        </div>

        <div className="relative min-h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl md:min-h-[560px] md:rounded-[3rem] md:p-10">
          {/* effetto sfondo */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/10 blur-[100px] md:h-[520px] md:w-[520px] md:blur-[110px]" />
          <div className="absolute right-4 top-10 h-44 w-44 rounded-full bg-orange-400/10 blur-[70px] md:right-10 md:h-56 md:w-56 md:blur-[80px]" />
          <div className="absolute bottom-10 left-4 h-44 w-44 rounded-full bg-blue-400/10 blur-[70px] md:left-10 md:h-56 md:w-56 md:blur-[80px]" />

          {/* linee orbitali */}
          <div className="absolute left-1/2 top-[38%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:top-1/2 md:h-[420px] md:w-[420px]" />
          <div className="absolute left-1/2 top-[38%] h-[220px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:top-1/2 md:h-[300px] md:w-[620px]" />
          <div className="absolute left-1/2 top-[38%] h-[390px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:top-1/2 md:h-[620px] md:w-[300px]" />

          {/* lettere */}
          <div className="relative z-10 grid min-h-[690px] place-items-center md:min-h-[480px]">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const isOtherActive = activeIndex !== null && !isActive;

              const positions = [
                "left-[8%] top-[10%] md:left-[12%] md:top-[18%]",
                "right-[8%] top-[10%] md:right-[14%] md:top-[20%]",
                "left-[8%] top-[35%] md:left-[16%] md:top-auto md:bottom-[16%]",
                "right-[8%] top-[35%] md:right-[18%] md:top-auto md:bottom-[18%]",
              ];

              const activePosition =
                "left-1/2 top-[27%] -translate-x-1/2 -translate-y-1/2 md:top-1/2";

              return (
                <button
                  key={item.letter}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={[
                    "group absolute flex h-24 w-24 animate-[float_5s_ease-in-out_infinite] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.08] text-5xl font-black text-white shadow-2xl backdrop-blur-2xl transition-all duration-500 md:h-40 md:w-40 md:rounded-[2rem] md:text-7xl",
                    activeIndex === null ? positions[index] : "",
                    isActive
                      ? activePosition +
                        " scale-110 border-emerald-300/40 bg-emerald-300/15 text-emerald-300"
                      : "",
                    isOtherActive ? "scale-75 opacity-20 blur-[1px]" : "",
                    activeIndex !== null && !isActive ? positions[index] : "",
                    "hover:-translate-y-3 hover:border-emerald-300/40 hover:bg-white/[0.12] hover:shadow-emerald-300/20",
                  ].join(" ")}
                  style={{ animationDelay: `${index * 0.45}s` }}
                  aria-label={`Apri ${item.title}`}
                >
                  {item.letter}
                </button>
              );
            })}

            {/* popup centrale */}
            {activeItem && (
              <div className="absolute bottom-4 left-1/2 z-20 w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 rounded-[1.7rem] border border-white/10 bg-black/60 p-5 shadow-2xl backdrop-blur-2xl md:bottom-10 md:w-full md:rounded-[2rem] md:p-9">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300 md:text-sm md:tracking-[0.28em]">
                      {activeItem.letter} / {activeItem.title}
                    </p>

                    <h3 className="mt-4 text-3xl font-black md:text-4xl">
                      {activeItem.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-white/70 md:text-lg md:leading-8">
                      {activeItem.text}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveIndex(null)}
                    className="w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/20"
                    aria-label="Chiudi"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            )}

            {/* testo iniziale */}
            {activeIndex === null && (
              <div className="absolute left-1/2 top-[60%] z-10 w-[85%] max-w-md -translate-x-1/2 -translate-y-1/2 text-center md:top-1/2">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/35 md:text-sm md:tracking-[0.3em]">
                  Clicca una lettera
                </p>
                <h3 className="mt-4 text-3xl font-black md:text-5xl">
                  M · A · G · O
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/55 md:text-base">
                  Ogni leva ha un ruolo preciso nel percorso: strategia,
                  acquisizione, crescita e ottimizzazione.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}