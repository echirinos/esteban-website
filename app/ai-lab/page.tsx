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
  title: "AI Lab",
  description:
    "Applied AI product experiments, demo systems, and prototype patterns by Esteban Chirinos.",
};

const operatingPrinciples = [
  "Show the product clearly before adding spectacle.",
  "Keep failure states useful, not hidden.",
  "Build demos that teach and convert at the same time.",
  "Prefer workflows a customer team could actually use next week.",
];

const chatSignals = [
  {
    title: "Recruiter-ready answers",
    description: "Role fit, proof points, education, and experience without hunting through every route.",
  },
  {
    title: "Product signal first",
    description: "Ask about judgment, systems thinking, AI workflows, and how the work translates into teams.",
  },
  {
    title: "Grounded portfolio context",
    description: "Responses pull from the same proof points, resume material, and project context used on the site.",
  },
];

export default function AILabPage() {
  return (
    <PageShell className="space-y-10">
      <section className="py-4">
        <div className="mb-5 max-w-4xl">
          <h1 className="text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
            Ask Esteban OS
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-base-content/68 md:mt-5 md:text-lg">
            Ask about Coinbase work, AI product fit, technical depth, product
            judgment, or what a hiring team should know first.
          </p>
        </div>

        <div className="grid gap-5 lg:min-h-[calc(100svh-16rem)] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch">
          <AskEstebanChat
            variant="lab"
            className="lg:min-h-full"
          />

          <div className="flex flex-col justify-between rounded-[28px] border border-base-content/10 bg-base-100/86 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
            <div className="space-y-3">
              {chatSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="border-t border-base-content/10 pt-3 first:border-t-0 first:pt-0"
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
          </div>
        </div>
      </section>

      <section className="py-8">
        <SectionHeading
          title="Current tracks"
          description="The lab is biased toward practical systems that help a technical user understand, adopt, or operate a platform faster."
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
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
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
