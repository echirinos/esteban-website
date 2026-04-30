import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  PageShell,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import { roleFit, strengthAreas, workExperiences } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume summary for Esteban Chirinos, focused on applied AI, developer experience, and solutions engineering.",
};

const snapshot = [
  "Technical Services Engineer at Coinbase Developer Platform",
  "Staff Solutions Architect experience at TRM Labs",
  "Developer Relations and Product experience at OpenSea",
  "Solutions Engineering experience at Polygon Labs",
  "Founder and operator of software, automation, and local-business systems",
];

export default function ResumePage() {
  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          title="The short recruiter version."
          description="Best aligned with applied AI, developer experience, demo engineering, AI deployment, partner solutions, and customer-facing technical roles."
        />
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard>
          <h2 className="text-2xl font-semibold">Career snapshot</h2>
          <div className="mt-5 space-y-4">
            {snapshot.map((item) => (
              <div key={item} className="flex gap-3 text-base-content/74">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-base-content/10 bg-base-200/45 p-4">
            <p className="text-sm font-semibold text-base-content/78">Recent seats</p>
            <div className="mt-4 space-y-3">
              {workExperiences.slice(0, 4).map((company) => (
                <div key={company.name} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-base-content/58">{company.role}</p>
                  </div>
                  <p className="text-xs text-base-content/48">{company.period}</p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Role fit</h2>
            <TagList items={roleFit} className="mt-5" />
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Strengths</h2>
            <TagList items={strengthAreas} className="mt-5" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/work" className="btn btn-primary btn-sm">
                View work
              </Link>
              <Link href="/contact" className="btn btn-outline btn-sm">
                Contact
              </Link>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </PageShell>
  );
}
