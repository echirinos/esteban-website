import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MetricStrip,
  PageIntro,
  PageShell,
  SectionHeading,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import { portfolioMetrics, roleFit, workExperiences } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Applied AI, developer experience, technical product, platform, and customer-facing solutions work by Esteban Chirinos.",
};

const featuredWork = workExperiences.filter((item) => item.featured);
const supportingWork = workExperiences.filter((item) => !item.featured);

export default function WorkPage() {
  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          title="Applied AI, DevEx, product, and solutions work."
          description="I’ve spent my career where technical products meet customers: developer platforms, API integrations, cloud architecture, discovery calls, product feedback loops, documentation, workshops, and demos that make complex systems easier to adopt."
          aside={
            <div className="rounded-2xl border border-base-content/10 bg-base-100/70 p-4">
              <p className="text-sm font-semibold text-base-content/75">Best aligned with</p>
              <TagList items={roleFit} className="mt-3 max-w-xs" />
            </div>
          }
        />
      </SurfaceCard>

      <section className="py-4">
        <MetricStrip items={portfolioMetrics} />
      </section>

      <section className="py-14">
        <SectionHeading
          title="Recent customer-facing work"
          description="The strongest fit is work where a platform, customer problem, product decision, and developer workflow all need to become clearer at the same time."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredWork.map((company) => (
            <SurfaceCard key={company.name}>
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-base-content/10 bg-base-200/70 p-3">
                  <Image
                    alt={`${company.name} logo`}
                    src={company.logo}
                    width={72}
                    height={72}
                    className="max-h-11 w-auto object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{company.name}</h2>
                  <p className="mt-1 text-sm text-base-content/58">
                    {company.role} • {company.period}
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-base-content/68">
                {company.summary}
              </p>
              <TagList items={company.tags} className="mt-5" />
              <div className="mt-5 space-y-3">
                {company.impact.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-base-content/72">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary transition hover:text-base-content"
                >
                  Visit {company.name}
                </a>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="py-4">
        <SectionHeading
          title="Earlier foundations"
          description="Cloud, enterprise, and software engineering work that built the operating base for customer-facing platform and product roles."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {supportingWork.map((company) => (
            <SurfaceCard key={company.name} className="p-5">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-base-content/10 bg-base-200/70 p-3">
                <Image
                  alt={`${company.name} logo`}
                  src={company.logo}
                  width={72}
                  height={72}
                  className="max-h-9 w-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="mt-1 text-sm text-base-content/58">
                {company.role} • {company.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                {company.summary}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <SurfaceCard className="mt-12 bg-[linear-gradient(135deg,rgba(15,118,110,0.08),rgba(191,219,254,0.38),rgba(255,255,255,0.92))]">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Want the recruiter scan?
            </h2>
            <p className="mt-3 max-w-2xl text-base-content/68">
              The modern portfolio condenses the same work into applied AI,
              DevEx, product, platform, education, and shipping signals, while
              the resume page keeps the role-fit summary short.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/modern" className="btn btn-primary">
              Modern portfolio
            </Link>
            <Link href="/resume" className="btn btn-outline">
              Resume
            </Link>
          </div>
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
