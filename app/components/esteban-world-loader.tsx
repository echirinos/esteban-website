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
      <section className="relative left-1/2 grid min-h-svh w-screen -translate-x-1/2 place-items-center overflow-hidden bg-[#050608] px-6 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.14),transparent_18rem),radial-gradient(circle_at_50%_100%,rgba(255,214,165,0.12),transparent_20rem)]" />
        <div className="relative w-full max-w-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">
            Loading Esteban OS
          </p>
          <h1 className="text-4xl font-black leading-none md:text-6xl">
            Esteban Chirinos
          </h1>
          <div className="mx-auto mt-7 h-1.5 max-w-52 overflow-hidden rounded-full border border-white/15 bg-white/10">
            <div className="h-full w-2/3 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full bg-cyan-100/80" />
          </div>
        </div>
      </section>
    ),
  }
);

export function EstebanWorldLoader() {
  return <EstebanWorld />;
}
