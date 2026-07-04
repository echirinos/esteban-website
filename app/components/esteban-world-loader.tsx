"use client";

import dynamic from "next/dynamic";

const EstebanWorld = dynamic(
  () =>
    import("./esteban-world").then((mod) => ({
      default: mod.EstebanWorld,
    })),
  {
    ssr: false,
    loading: () => (
      <section className="sheet-grid-field relative left-1/2 grid min-h-svh w-screen -translate-x-1/2 place-items-center overflow-hidden bg-[#101f58] px-6 text-center text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-white/25 sm:inset-5"
        />
        <div className="relative w-full max-w-sm">
          <p className="annotation mb-5 text-white/60">
            Loading Esteban OS &middot; Sht L-01
          </p>
          <h1 className="font-display text-6xl font-bold uppercase leading-[0.9] md:text-7xl">
            Esteban Chirinos
          </h1>
          <div className="mx-auto mt-8 h-1 max-w-52 overflow-hidden border border-white/25 bg-white/10">
            <div className="h-full w-2/3 animate-[pulse_1.1s_ease-in-out_infinite] bg-[#ff7e4b]" />
          </div>
        </div>
      </section>
    ),
  }
);

export function EstebanWorldLoader() {
  return <EstebanWorld />;
}
