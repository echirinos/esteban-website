import type { Metadata } from "next";
import {
  PageIntro,
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

export default function AILabPage() {
  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          title="AI work that turns into usable product surfaces."
          description="This is the applied layer behind the portfolio: prototype systems, agent workflows, demo architecture, and operator tooling where the output has to be persuasive, testable, deployable, and useful for product decisions."
        />
      </SurfaceCard>

      <section className="py-8">
        <SectionHeading
          title="Ask Esteban OS"
          description="A Kimi-powered assistant grounded on the same portfolio, resume, proof points, and role-fit material that appears across the site."
        />
        <AskEstebanChat variant="lab" />
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
