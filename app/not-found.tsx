import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <p className="annotation text-primary">Sht 404 &middot; Not in set</p>
      <h1 className="mt-6 font-display text-5xl font-semibold uppercase leading-none tracking-[0.02em] sm:text-6xl">
        Sheet not found
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-base-content/70">
        This drawing is not in the current set. The index below lists every
        issued sheet.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="draft-btn draft-btn-fill">
          Title sheet
        </Link>
        <Link href="/work" className="draft-btn draft-btn-line">
          Work history
        </Link>
        <Link href="/projects" className="draft-btn draft-btn-line">
          Drawing index
        </Link>
      </div>
    </section>
  );
}
