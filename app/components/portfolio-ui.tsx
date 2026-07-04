import Link from "next/link";
import type { ReactNode } from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "mx-auto w-full max-w-6xl px-5 pb-16 pt-8 sm:px-8",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-[2px] border p-6 hairline bg-base-100 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageIntro({
  title,
  description,
  aside,
}: {
  title: string;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-5 py-4 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
      <div>
        <h1 className="max-w-4xl font-display text-5xl font-semibold uppercase leading-[0.92] tracking-[0.02em] md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-base-content/68">
          {description}
        </p>
      </div>
      {aside ? <div className="md:justify-self-end">{aside}</div> : null}
    </div>
  );
}

export function MetricStrip({
  items,
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <SurfaceCard key={item.label} className="p-5">
          <p className="font-display text-4xl font-semibold text-primary">
            {item.value}
          </p>
          <p className="annotation mt-2 text-base-content/50">{item.label}</p>
        </SurfaceCard>
      ))}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-4xl font-semibold uppercase leading-none tracking-[0.02em]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-base-content/62">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function TagList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <span
          key={item}
          className="border px-2.5 py-1 hairline font-mono text-[10px] uppercase tracking-[0.1em] text-base-content/65"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function InlineLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "annotation text-primary underline decoration-transparent underline-offset-4 transition hover:decoration-current";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
