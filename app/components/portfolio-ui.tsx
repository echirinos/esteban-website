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
  return <section className={cx("mx-auto max-w-6xl pb-16", className)}>{children}</section>;
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
        "rounded-lg border border-base-content/10 bg-base-100/86 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8",
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
        <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <SurfaceCard key={item.label} className="p-5">
          <p className="text-3xl font-bold text-primary">{item.value}</p>
          <p className="mt-1 text-sm font-medium text-base-content/52">
            {item.label}
          </p>
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
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-base-content/62">
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
          className="rounded-full border border-base-content/12 bg-base-100/72 px-3 py-1 text-xs font-medium text-base-content/72"
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
  const className = "text-sm font-semibold text-primary transition hover:text-base-content";

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
