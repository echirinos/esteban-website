"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const EstebanWorld = dynamic(
  () => import("./esteban-world").then((mod) => mod.EstebanWorld),
  {
    ssr: false,
    loading: () => (
      <section className="lens-experience" data-phase="outside">
        <div
          className="lens-photo-fallback"
          style={{
            backgroundImage: "url(/images/world-yosemite-immersive.webp)",
          }}
        />
        <div className="lens-vignette" />
        <div className="lens-intro">
          <p role="status">Preparing your goggles…</p>
          <h1>Your next world is waiting.</h1>
          <p>Ten worlds. One small step away.</p>
          <Link
            href="/"
            className="draft-btn lens-enter-button"
            style={{ pointerEvents: "auto", marginTop: 30 }}
          >
            View portfolio
          </Link>
        </div>
      </section>
    ),
  },
);

export function EstebanWorldLoader() {
  return <EstebanWorld />;
}
