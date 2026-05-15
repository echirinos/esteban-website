import Image from "next/image";
import Link from "next/link";
import { AskEstebanChat } from "./ask-esteban-chat";
import {
  AnimeSignalField,
  MotionItem,
  MotionReveal,
  MotionStagger,
  MotionSurface,
} from "./portfolio-motion";
import { ProofEngineLoader } from "./proof-engine-loader";
import {
  InlineLink,
  PageShell,
  SectionHeading,
  SurfaceCard,
  TagList,
} from "./portfolio-ui";
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

const featuredWork = workExperiences.filter((item) => item.featured);
const supportingWork = workExperiences.filter((item) => !item.featured);
const featuredProjects = projectEntries.filter((item) => item.highlighted).slice(0, 6);
const heroMetrics = portfolioMetrics.slice(0, 3);

const proofConsoleItems = [
  {
    label: "Partner integrations",
    value: "30+",
    detail: "Coinbase Onramp, Embedded Wallets, Advanced Trade, x402, AgentKit.",
  },
  {
    label: "AI workflow lift",
    value: "30%",
    detail: "Reduced escalations through Salesforce, Slack, docs, and support systems.",
  },
  {
    label: "Developer signal",
    value: "100+",
    detail: "Weekly insights translated into product recommendations and docs updates.",
  },
];

const bestFitConversations = [
  {
    title: "AI platform and product teams",
    detail:
      "Turn model capability, user workflow, and launch risk into demos, eval criteria, and product decisions.",
  },
  {
    title: "Developer experience teams",
    detail:
      "Build reference apps, docs, onboarding paths, and support loops that make a platform easier to adopt.",
  },
  {
    title: "Partner and solutions teams",
    detail:
      "Translate customer ambiguity into architecture, rollout plans, and proof that helps revenue teams move.",
  },
];

const proofPrompts = [
  "Why is Esteban a fit for AI product roles?",
  "Summarize his Coinbase work.",
  "What proof points should a recruiter know?",
];

const proofBandMetrics = [
  { value: "$20M", label: "Revenue impact supported" },
  { value: "30+", label: "Strategic partner integrations" },
  { value: "100+", label: "Developer insights translated" },
];

export function ModernPortfolioPage() {
  return (
    <PageShell className="max-w-7xl">
      <section className="grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_420px] md:items-center lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <MotionReveal initialVisible>
          <div className="relative overflow-hidden">
            <AnimeSignalField className="pointer-events-none absolute inset-x-[-18%] top-[-16%] h-72 opacity-35 lg:hidden" />
            <div className="relative z-10">
              <p className="mb-4 inline-flex rounded-full border border-base-content/12 bg-base-100/72 px-3 py-1 text-xs font-semibold text-base-content/62">
                Applied AI / DevEx / technical product
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-[0.94] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                Esteban Chirinos
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-base-content/76">
                I help AI and developer-platform teams turn customer friction
                into shipped demos, reference implementations, onboarding
                systems, and product feedback loops.
              </p>
              <p className="mt-5 hidden max-w-2xl leading-relaxed text-base-content/64 sm:block">
                Senior Technical Solutions Engineer at Coinbase. Previously at
                TRM Labs, Polygon Labs, OpenSea, Google, Microsoft, and
                JPMorgan Chase across developer platforms, cloud, fintech,
                product feedback loops, partner solutions, and operator
                systems.
              </p>

              <TagList items={roleFit} className="mt-7 max-w-2xl" />

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Contact Esteban
                </Link>
                <Link href="/work" className="btn btn-outline">
                  View proof
                </Link>
                <Link href="#ask-esteban" className="btn btn-ghost">
                  Ask the portfolio
                </Link>
                <Link href="/goggles" className="btn btn-ghost">
                  Open lens
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2 sm:max-w-2xl sm:gap-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-h-24 rounded-lg border border-base-content/10 bg-base-100/70 px-3 py-3 sm:px-4"
                  >
                    <p className="text-2xl font-bold text-primary sm:text-3xl">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold leading-snug text-base-content/60 sm:text-xs">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08} initialVisible>
          <SurfaceCard className="relative overflow-hidden border-white/14 bg-[#081018] p-0 text-white shadow-[0_28px_90px_rgba(15,23,42,0.34)]">
            <Image
              alt=""
              src="/images/world-yosemite-immersive.webp"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 360px"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,16,0.58),rgba(4,10,16,0.96))]" />
            <ProofEngineLoader className="pointer-events-none absolute bottom-7 right-[-24%] z-[1] hidden h-[58%] w-[76%] opacity-70 lg:block" />
            <AnimeSignalField className="absolute inset-0 z-[2] opacity-60" />

            <div className="relative z-10 grid min-h-[420px] gap-5 p-5 sm:p-6 lg:min-h-[560px]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/64">
                    Portfolio proof console
                  </p>
                  <h2 className="mt-3 max-w-sm text-3xl font-bold leading-[1.04] text-white sm:text-4xl">
                    Product signal from shipped technical work.
                  </h2>
                </div>
                <Image
                  alt="Esteban Chirinos profile photo"
                  src="/images/esteban.png"
                  width={250}
                  height={245}
                  priority
                  className="h-20 w-20 rounded-lg border border-white/24 object-cover shadow-2xl sm:h-28 sm:w-28"
                />
              </div>

              <div className="grid gap-2">
                {proofConsoleItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-3 rounded-lg border border-white/14 bg-slate-950/56 p-4 backdrop-blur sm:grid-cols-[86px_1fr]"
                  >
                    <div>
                      <p className="text-3xl font-bold">{item.value}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/72">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Proof logos
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {workExperiences.slice(0, 6).map((company) => (
                    <div
                      key={company.name}
                      className="flex h-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/80 bg-white px-2 py-2.5"
                    >
                      <Image
                        alt={`${company.name} logo`}
                        src={company.logo}
                        width={96}
                        height={56}
                        className="max-h-8 w-auto max-w-full object-contain"
                      />
                      <p className="max-w-full text-center text-[10px] font-semibold leading-tight text-slate-600">
                        {company.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SurfaceCard>
        </MotionReveal>
      </section>

      <MotionReveal>
        <section
          id="ask-esteban"
          className="grid gap-5 py-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"
        >
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Recruiter-ready context
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Ask the site for the role-fit signal.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-base-content/66">
              The strongest product portfolios behave like tools. This chat
              preview lets visitors ask for the exact proof they need instead of
              hunting through every route.
            </p>
            <div className="mt-6 grid gap-2">
              {proofPrompts.map((prompt) => (
                <Link
                  key={prompt}
                  href="/ai-lab"
                  className="rounded-lg border border-base-content/10 bg-base-100/72 px-4 py-3 text-sm font-semibold text-base-content/72 transition hover:border-primary/35 hover:bg-primary/10 hover:text-base-content"
                >
                  {prompt}
                </Link>
              ))}
            </div>
          </div>

          <AskEstebanChat variant="home" />
        </section>
      </MotionReveal>

      <section className="py-8">
        <MotionStagger className="grid gap-4 lg:grid-cols-3">
          {bestFitConversations.map((item) => (
            <MotionSurface key={item.title}>
              <SurfaceCard className="h-full p-5">
                <p className="text-sm font-semibold text-primary">Best fit</p>
                <h2 className="mt-2 text-xl font-semibold leading-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                  {item.detail}
                </p>
              </SurfaceCard>
            </MotionSurface>
          ))}
        </MotionStagger>
      </section>

      <MotionReveal>
        <section className="py-8" aria-label="Proof across recognized teams">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#081018] px-5 py-7 text-white shadow-[0_26px_80px_rgba(15,23,42,0.22)] sm:px-7 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
                  Recognizable proof
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                  Shipped in the kinds of environments hiring teams recognize.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/62">
                  The signal is not only the logos. It is the pattern across
                  developer platforms, regulated customers, cloud accounts,
                  partner launches, and product feedback loops.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {proofBandMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-white/12 bg-white/[0.06] p-4"
                  >
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                    <p className="mt-2 text-xs font-semibold leading-snug text-white/52">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {workExperiences.slice(0, 6).map((company) => (
                <div
                  key={company.name}
                  className="grid min-h-24 place-items-center rounded-lg border border-white/12 bg-white px-3 py-3 text-center"
                >
                  <Image
                    alt={`${company.name} logo`}
                    src={company.logo}
                    width={96}
                    height={56}
                    className="max-h-9 w-auto max-w-full object-contain"
                  />
                  <span className="mt-3 text-[11px] font-semibold leading-tight text-slate-600">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MotionReveal>

      <section className="py-12">
        <SectionHeading
          title="Places I have worked"
          description="Developer platforms, cloud, fintech, marketplaces, financial services, and the customer signals that shape better products."
          action={<InlineLink href="/work">Full work history</InlineLink>}
        />

        <MotionStagger className="grid gap-5 lg:grid-cols-2">
          {featuredWork.map((company) => (
            <MotionSurface key={company.name}>
              <SurfaceCard className="h-full">
                <div className="flex items-start gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-base-content/10 bg-base-200/70 p-3">
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
                      {company.role} / {company.period}
                    </p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-base-content/68">
                  {company.summary}
                </p>
                <TagList items={company.tags} className="mt-5" />
                <div className="mt-5 space-y-2">
                  {company.impact.slice(0, 3).map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-base-content/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </MotionSurface>
          ))}
        </MotionStagger>
      </section>

      <section className="py-2">
        <MotionStagger className="grid gap-4 md:grid-cols-3">
          {supportingWork.map((company) => (
            <MotionItem key={company.name}>
              <SurfaceCard className="h-full p-5">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-lg border border-base-content/10 bg-base-200/70 p-3">
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
                  {company.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                  {company.summary}
                </p>
              </SurfaceCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      <section className="py-14">
        <SectionHeading
          title="What I have built"
          description="Reference apps, tutorials, founder products, and operator systems where product judgment, user clarity, and shipping speed all mattered."
          action={<InlineLink href="/projects">View all projects</InlineLink>}
        />

        <MotionStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <MotionSurface key={project.name}>
              <SurfaceCard className="group h-full overflow-hidden p-0">
                <div className="relative grid h-44 place-items-center overflow-hidden border-b border-base-content/8 bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(29,78,216,0.14),rgba(197,106,20,0.1))] p-6">
                  <span className="absolute right-4 top-4 rounded-full border border-base-content/10 bg-base-100/76 px-3 py-1 text-xs font-bold text-base-content/58">
                    0{index + 1}
                  </span>
                  {project.image ? (
                    <Image
                      alt={`${project.name} image`}
                      src={project.image}
                      width={360}
                      height={160}
                      className="max-h-24 w-auto object-contain transition duration-300 group-hover:scale-105"
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
            </MotionSurface>
          ))}
        </MotionStagger>
      </section>

      <section className="grid gap-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <MotionReveal>
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
        </MotionReveal>

        <MotionStagger className="grid gap-4 sm:grid-cols-2">
          <MotionItem className="sm:col-span-2">
            <SurfaceCard className="h-full p-5">
              <p className="text-sm font-semibold">Product + technical training</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {educationCredentials.map((item) => (
                  <div
                    key={item.school}
                    className="rounded-lg border border-base-content/10 bg-base-100/72 p-4"
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
          </MotionItem>

          {contactChannels.map((channel) => (
            <MotionItem key={channel.label}>
              <SurfaceCard className="h-full p-5">
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
            </MotionItem>
          ))}

          <MotionItem className="sm:col-span-2">
            <SurfaceCard className="h-full p-5">
              <p className="text-sm font-semibold">Tech stack</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="grid min-h-24 place-items-center rounded-lg border border-base-content/10 bg-base-100/70 p-4 text-center"
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
          </MotionItem>
        </MotionStagger>
      </section>

      <MotionReveal>
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
      </MotionReveal>
    </PageShell>
  );
}
