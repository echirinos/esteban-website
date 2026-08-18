"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <p className="annotation text-primary">Sht E-01 &middot; Revision required</p>
      <h1 className="mt-6 font-display text-5xl font-semibold uppercase leading-none tracking-[0.02em] sm:text-6xl">
        Drawing error
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-base-content/70">
        This sheet failed to render. The fault is in the drawing, not your
        browser &mdash; redrawing usually fixes it.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="draft-btn draft-btn-fill">
          Redraw sheet
        </button>
        <Link href="/" className="draft-btn draft-btn-line">
          Back to title sheet
        </Link>
      </div>
    </section>
  );
}
