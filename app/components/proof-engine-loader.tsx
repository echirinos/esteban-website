"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ProofEngineCanvas = dynamic(
  () =>
    import("./proof-engine-canvas").then((mod) => ({
      default: mod.ProofEngineCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 opacity-60">
        <div className="absolute right-[12%] top-[22%] h-52 w-80 rounded-[50%] border border-white/18" />
        <div className="absolute right-[8%] top-[30%] h-44 w-96 rotate-[-8deg] rounded-[50%] border border-primary/18" />
        <div className="absolute right-[28%] top-[48%] h-2 w-2 rounded-full bg-primary/70" />
      </div>
    ),
  }
);

export function ProofEngineLoader({ className }: { className?: string }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setShouldRender(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div aria-hidden="true" className={className}>
      <ProofEngineCanvas />
    </div>
  );
}
