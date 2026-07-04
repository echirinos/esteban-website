import type { Metadata } from "next";
import {
  PageShell,
  SectionHeading,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import { AskEstebanChat } from "../components/ask-esteban-chat";
import { labTracks } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Ask AI",
  description:
    "Portfolio AI assistant for Esteban Chirinos, grounded in work history, proof points, projects, and role fit.",
};

const operatingPrinciples = [
  "Show the product clearly before adding spectacle.",
  "Keep failure states useful, not hidden.",
  "Build demos that teach and convert at the same time.",
  "Prefer workflows a customer team could actually use next week.",
];

const chatSignals = [
  {
    title: "Ask what a recruiter would ask",
    description: "Role fit, proof points, education, and experience without hunting through every route.",
  },
  {
    title: "Get product signal fast",
    description: "Ask about judgment, systems thinking, AI workflows, and how the work translates into teams.",
  },
  {
    title: "Stay grounded in the portfolio",
    description: "Responses pull from the same proof points, resume material, and project context used on the site.",
  },
];

const knowledgeSources = [
  "Coinbase and platform work",
  "Role-fit and recruiter proof",
  "Projects, demos, and build logs",
  "Education and certifications",
];

export default function AILabPage() {
  return (
    <PageShell className="max-w-7xl space-y-8">
      <section className="grid gap-6 py-2 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div className="max-w-4xl">
          <p className="annotation mb-4 text-primary">
            Sht Q-01 &middot; Portfolio AI assistant
          </p>
          <h1 className="font-display text-5xl font-semibold uppercase leading-[0.92] tracking-[0.02em] md:text-7xl">
            Ask the portfolio.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-base-content/68 md:text-lg">
            This page turns the portfolio into a focused AI assistant. Ask about
            Coinbase work, AI product fit, technical depth, product judgment,
            or what a hiring team should know first.
          </p>
        </div>

        <SurfaceCard className="hidden p-5 lg:block">
          <p className="annotation text-base-content/45">What this page is</p>
          <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-[0.02em]">
            A working demo, not a generic chatbot.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-base-content/64">
            The assistant is scoped to Esteban's public portfolio. It should
            help someone understand fit, evidence, and next questions quickly.
          </p>
        </SurfaceCard>
      </section>

      <section className="grid gap-5 lg:min-h-[calc(100svh-14rem)] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-stretch">
        <AskEstebanChat
          variant="lab"
          className="lg:min-h-[720px]"
        />

        <aside className="space-y-4">
          <SurfaceCard className="p-5">
            <p className="annotation text-base-content/45">
              Knowledge the assistant can use
            </p>
            <div className="mt-4 space-y-3">
              {knowledgeSources.map((source) => (
                <div key={source} className="flex gap-3 text-sm text-base-content/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-5">
            <p className="annotation text-base-content/45">Best use</p>
            <div className="mt-4 space-y-4">
              {chatSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="border-t border-base-content/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-sm font-bold text-base-content">
                    {signal.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/62">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </aside>
      </section>

      <section className="py-8">
        <SectionHeading
          title="What this AI lab proves"
          description="The assistant is the working demo. The supporting tracks show the product judgment behind it: useful answers, clear context, source labels, and practical workflows."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {labTracks.map((track) => (
            <SurfaceCard key={track.title}>
              <h2 className="text-xl font-semibold leading-tight">{track.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-base-content/68">
                {track.description}
              </p>
              <TagList items={track.outputs} className="mt-5" />
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          title="Operating principles"
          description="The constraint is not novelty. The constraint is whether the system can hold up in front of customers, recruiters, or internal teams."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {operatingPrinciples.map((principle) => (
            <SurfaceCard key={principle} className="p-5">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-primary" />
                <p className="text-sm leading-relaxed text-base-content/72">
                  {principle}
                </p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
