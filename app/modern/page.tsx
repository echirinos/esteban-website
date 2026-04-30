import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  InlineLink,
  MetricStrip,
  PageShell,
  SectionHeading,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import {
  contactChannels,
  educationCredentials,
  portfolioMetrics,
  projectEntries,
  roleFit,
  strengthAreas,
  techStack,
  workExperiences,
} from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description:
    "A polished portfolio homepage for Esteban Chirinos across applied AI, developer experience, technical product work, shipped projects, and customer-facing platform work.",
};

const featuredWork = workExperiences.filter((item) => item.featured);
const supportingWork = workExperiences.filter((item) => !item.featured);
const featuredProjects = projectEntries.filter((item) => item.highlighted).slice(0, 6);

export default function ModernPortfolioPage() {
  return (
    <PageShell>
      <section className="grid gap-8 py-6 md:min-h-[calc(100svh-8rem)] md:grid-cols-[minmax(0,1fr)_360px] md:items-center md:py-10 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[0.94] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Esteban Chirinos
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-base-content/74">
            Senior Technical Solutions Engineer at Coinbase building the demos,
            reference implementations, docs, onboarding systems, and product
            feedback loops that help developers ship faster.
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-base-content/64">
            Previously at TRM Labs, Polygon Labs, OpenSea, Google, Microsoft,
            and JPMorgan Chase across developer platforms, cloud, fintech,
            product feedback loops, partner solutions, and operator systems.
            Backed by a Berkeley Haas MBA and FIU Computer Science undergrad.
          </p>

          <TagList items={roleFit} className="mt-7 max-w-2xl" />

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="btn btn-primary">
              View work
            </Link>
            <Link href="/projects" className="btn btn-outline">
              Projects
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>

        <SurfaceCard className="relative overflow-hidden border-white/14 bg-[#081018] p-0 text-white shadow-[0_28px_90px_rgba(15,23,42,0.34)]">
          <Image
            alt=""
            src="/images/world-yosemite-immersive.png"
            fill
            priority
            sizes="(min-width: 1024px) 520px, 360px"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.12),transparent_12rem),linear-gradient(180deg,rgba(4,10,16,0.46),rgba(4,10,16,0.92))]" />
          <div className="relative flex min-h-[520px] flex-col gap-6 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">
                  Modern portfolio
                </p>
                <p className="mt-3 max-w-64 text-3xl font-bold leading-[1.05] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.42)]">
                  Applied AI, DevEx, product, and demo engineering.
                </p>
              </div>
              <Image
                alt="Esteban Chirinos profile photo"
                src="/images/esteban.png"
                width={250}
                height={245}
                priority
                className="h-24 w-24 rounded-2xl border border-white/24 object-cover shadow-2xl sm:h-28 sm:w-28"
              />
            </div>

            <div className="rounded-[22px] border border-white/18 bg-slate-950/62 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-md">
              <p className="text-sm font-semibold text-white/92">Best fit</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {roleFit.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-white/22 bg-white/12 px-3 py-1 text-xs font-medium text-white/92 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {workExperiences.map((company) => (
                  <div
                    key={company.name}
                    className="flex h-[4.75rem] flex-col items-center justify-center gap-1 rounded-2xl border border-white/80 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                  >
                    <Image
                      alt={`${company.name} logo`}
                      src={company.logo}
                      width={96}
                      height={56}
                      className="max-h-9 w-auto max-w-full object-contain"
                    />
                    <span className="text-center text-[10px] font-semibold leading-tight text-slate-700">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {portfolioMetrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/16 bg-slate-950/58 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur"
                  >
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                    <p className="mt-1 text-xs font-semibold leading-snug text-white/76">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="py-4">
        <MetricStrip items={portfolioMetrics} />
      </section>

      <section className="py-14">
        <SectionHeading
          title="Places I have worked"
          description="Developer platforms, cloud, fintech, marketplaces, financial services, and the customer signals that shape better products."
          action={<InlineLink href="/work">Full work history</InlineLink>}
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
                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold">{company.name}</h3>
                  <p className="mt-1 text-sm text-base-content/58">
                    {company.role} • {company.period}
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-base-content/68">
                {company.summary}
              </p>
              <TagList items={company.tags} className="mt-5" />
              <div className="mt-5 space-y-2">
                {company.impact.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-base-content/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="py-2">
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
              <p className="mt-1 text-sm text-base-content/58">{company.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                {company.summary}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="py-14">
        <SectionHeading
          title="What I have built"
          description="Reference apps, tutorials, founder products, and operator systems where product judgment, user clarity, and shipping speed all mattered."
          action={<InlineLink href="/projects">View all projects</InlineLink>}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <SurfaceCard key={project.name} className="overflow-hidden p-0">
              <div className="grid h-36 place-items-center border-b border-base-content/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(224,233,242,0.65))] p-6">
                {project.image ? (
                  <Image
                    alt={`${project.name} image`}
                    src={project.image}
                    width={360}
                    height={160}
                    className="max-h-24 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold text-base-content/50">
                    {project.category}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/42">
                  {project.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                  {project.description}
                </p>
                <TagList items={project.tags} className="mt-4" />
                {project.href ? (
                  <div className="mt-5">
                    <InlineLink href={project.href} external>
                      Open project
                    </InlineLink>
                  </div>
                ) : null}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <SurfaceCard className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,242,248,0.92))]">
          <h2 className="text-3xl font-bold tracking-tight">How I work</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-base-content/66">
            I sit between product, engineering, customers, and go-to-market
            teams. The output is usually a clearer product decision, a sharper
            roadmap signal, a better integration path, a stronger demo, or a
            faster path from customer need to shipped workflow.
          </p>
          <TagList items={strengthAreas} className="mt-6" />
        </SurfaceCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <SurfaceCard className="p-5 sm:col-span-2">
            <p className="text-sm font-semibold">Product + technical training</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {educationCredentials.map((item) => (
                <div
                  key={item.school}
                  className="rounded-2xl border border-base-content/10 bg-base-100/72 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/42">
                    {item.school}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{item.credential}</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/62">
                    {item.emphasis}
                  </p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          {contactChannels.map((channel) => (
            <SurfaceCard key={channel.label} className="p-5">
              <p className="text-sm font-semibold">{channel.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-base-content/64">
                {channel.detail}
              </p>
              <div className="mt-4">
                <InlineLink href={channel.href} external>
                  Open {channel.label}
                </InlineLink>
              </div>
            </SurfaceCard>
          ))}
          <SurfaceCard className="p-5 sm:col-span-2">
            <p className="text-sm font-semibold">Tech stack</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="grid min-h-24 place-items-center rounded-2xl border border-base-content/10 bg-base-100/70 p-4 text-center"
                >
                  <Image
                    alt={`${tech.name} logo`}
                    src={tech.logo}
                    width={72}
                    height={72}
                    className="max-h-10 w-auto object-contain"
                  />
                  <span className="mt-3 text-xs font-medium text-base-content/55">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </section>

      <SurfaceCard className="bg-[linear-gradient(135deg,rgba(15,118,110,0.08),rgba(191,219,254,0.42),rgba(255,255,255,0.9))]">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Building something technical?
            </h2>
            <p className="mt-3 max-w-2xl text-base-content/70">
              I am open to applied AI, developer experience, technical product
              management, demo engineering, AI deployment, partner solutions,
              and customer-facing platform roles.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="btn btn-primary">
              Contact
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
