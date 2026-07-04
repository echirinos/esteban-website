import Link from "next/link";
import type { ReactNode } from "react";
import { AskEstebanChat } from "./ask-esteban-chat";
import { BlueprintContact, BlueprintHero } from "./blueprint-hero";
import { DraftItem, DraftReveal, DraftStagger, RuleDraw } from "./blueprint-motion";
import {
  educationCredentials,
  projectEntries,
  strengthAreas,
  techStack,
  workExperiences,
} from "../lib/portfolio-data";

const featuredProjects = projectEntries
  .filter((item) => item.highlighted)
  .slice(0, 6);

function SheetSection({
  code,
  title,
  description,
  action,
  id,
  children,
}: {
  code: string;
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
      <div className="flex items-center gap-4">
        <span className="annotation shrink-0 text-primary">{code}</span>
        <RuleDraw className="block h-px min-w-0 flex-1 bg-[var(--hairline)]" />
        {action ? <span className="shrink-0">{action}</span> : null}
      </div>
      <DraftReveal>
        <h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-none tracking-[0.02em] sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl leading-relaxed text-base-content/65">
            {description}
          </p>
        ) : null}
      </DraftReveal>
      {children}
    </section>
  );
}

function SheetLink({
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

export function ModernPortfolioPage() {
  return (
    <div className="pb-0">
      <BlueprintHero />

      <SheetSection
        code="Sht A-02 · Work"
        title="Selected work"
        description="Developer platforms, cloud, fintech, and marketplaces — and the customer signal that shaped better products at each stop."
        action={<SheetLink href="/work">Full history</SheetLink>}
      >
        <DraftStagger className="mt-10">
          {workExperiences.map((company, index) => (
            <DraftItem key={company.name}>
              <div
                className={`group grid gap-x-6 gap-y-2 border-t py-6 hairline transition-colors hover:bg-base-200/50 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:py-7 ${
                  index === workExperiences.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="annotation pt-1.5 text-base-content/50">
                  {company.period.replace(" - ", " — ")}
                </p>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-3xl font-semibold uppercase leading-none tracking-[0.02em]">
                      {company.name}
                    </h3>
                    <p className="text-sm text-base-content/55">{company.role}</p>
                  </div>
                  {company.featured ? (
                    <>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-base-content/70">
                        {company.summary}
                      </p>
                      <p className="mt-3 font-mono text-xs leading-relaxed text-primary">
                        {company.impact[0]}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-base-content/60">
                      {company.summary}
                    </p>
                  )}
                </div>
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${company.name}`}
                  className="annotation hidden pt-1.5 text-base-content/35 transition group-hover:text-primary sm:block"
                >
                  ↗
                </a>
              </div>
            </DraftItem>
          ))}
        </DraftStagger>
      </SheetSection>

      <SheetSection
        code="Sht A-03 · Builds"
        title="What I have built"
        description="Reference apps, tutorials, founder products, and operator systems where product judgment and shipping speed both mattered."
        action={<SheetLink href="/projects">All projects</SheetLink>}
      >
        <DraftStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const plate = (
              <>
                <div className="flex items-center justify-between">
                  <span className="annotation text-base-content/40">
                    P-0{index + 1}
                  </span>
                  <span className="annotation text-primary">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-[1.02] tracking-[0.02em]">
                  {project.name}
                </h3>
                <p className="mb-5 mt-3 flex-1 text-sm leading-relaxed text-base-content/65">
                  {project.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4 hairline">
                  <span className="min-w-0 truncate pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-base-content/45">
                    {project.tags.slice(0, 2).join(" · ")}
                  </span>
                  {project.href ? (
                    <span className="annotation shrink-0 text-base-content/40 transition group-hover:text-primary">
                      Open ↗
                    </span>
                  ) : null}
                </div>
              </>
            );

            const plateClass =
              "group flex h-full flex-col border p-5 hairline bg-base-100 transition duration-200 hover:-translate-y-1 hover:border-primary";

            return (
              <DraftItem key={project.name} className="h-full">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={plateClass}
                  >
                    {plate}
                  </a>
                ) : (
                  <div className={plateClass}>{plate}</div>
                )}
              </DraftItem>
            );
          })}
          <DraftItem className="h-full">
            <Link
              href="/projects"
              className="group flex h-full flex-col justify-between border border-dashed p-5 hairline transition duration-200 hover:-translate-y-1 hover:border-solid hover:border-primary"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="annotation text-base-content/40">
                    P-0{featuredProjects.length + 1}
                  </span>
                  <span className="annotation text-primary">Index</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-[1.02] tracking-[0.02em]">
                  Full drawing index
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                  Every project sheet: reference apps, tutorials, founder
                  products, and operator systems.
                </p>
              </div>
              <div className="mt-5 border-t pt-4 hairline">
                <span className="annotation text-base-content/40 transition group-hover:text-primary">
                  All projects →
                </span>
              </div>
            </Link>
          </DraftItem>
        </DraftStagger>
      </SheetSection>

      <SheetSection
        code="Sht A-04 · Q&A"
        title="Ask the portfolio"
        description="The strongest portfolios behave like tools. Ask for the exact proof you need instead of hunting through every route."
        id="ask-esteban"
        action={<SheetLink href="/ai-lab">Ask AI</SheetLink>}
      >
        <DraftReveal className="mt-10">
          <AskEstebanChat variant="home" />
        </DraftReveal>
      </SheetSection>

      <SheetSection
        code="Sht A-05 · Spec"
        title="How I work"
        description="I sit between product, engineering, customers, and go-to-market teams. The output is a clearer product decision, a sharper roadmap signal, a stronger demo, or a faster path from customer need to shipped workflow."
      >
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <DraftReveal>
            <p className="annotation text-base-content/50">Capabilities</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {strengthAreas.map((item) => (
                <span
                  key={item}
                  className="border px-3 py-1.5 hairline font-mono text-[11px] uppercase tracking-[0.1em] text-base-content/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="annotation mt-8 text-base-content/50">Stack</p>
            <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-base-content/65">
              {techStack.map((tech) => tech.name).join(" · ")}
            </p>
          </DraftReveal>

          <DraftReveal delay={0.06}>
            <p className="annotation text-base-content/50">Training</p>
            <div className="mt-4 grid gap-px border hairline bg-[var(--hairline)]">
              {educationCredentials.map((item) => (
                <div key={item.school} className="bg-base-100 p-4">
                  <p className="annotation text-base-content/45">{item.school}</p>
                  <p className="mt-1.5 font-display text-xl font-semibold uppercase tracking-[0.02em]">
                    {item.credential}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-base-content/60">
                    {item.emphasis}
                  </p>
                </div>
              ))}
            </div>
          </DraftReveal>
        </div>
      </SheetSection>

      <BlueprintContact />
    </div>
  );
}
