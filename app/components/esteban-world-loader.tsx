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
      <section className="relative left-1/2 grid min-h-svh w-screen -translate-x-1/2 place-items-center bg-[#050608] px-6 text-center text-white">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase text-cyan-200/70">
            Loading world
          </p>
          <h1 className="text-4xl font-black md:text-6xl">
            Esteban Chirinos
          </h1>
        </div>
      </section>
    ),
  }
);

export function EstebanWorldLoader() {
  return <EstebanWorld />;
}
