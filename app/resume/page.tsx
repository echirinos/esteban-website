import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  PageShell,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import {
  certificationHighlights,
  educationCredentials,
  roleFit,
  strengthAreas,
  workExperiences,
} from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume summary for Esteban Chirinos, focused on applied AI, developer experience, technical product, demo engineering, and customer-facing platform work.",
};

const snapshot = [
  "Senior Technical Solutions Engineer at Coinbase Developer Platform",
  "30+ strategic partner integrations and $20M revenue impact supported",
  "AI-enabled support workflows that helped reduce escalations by 30%",
  "Staff Solutions Architect experience at TRM Labs",
  "Developer Relations and Product experience at OpenSea",
  "Partner product and solutions experience at Polygon Labs",
  "Enterprise cloud and account experience at Google and Microsoft",
  "Berkeley Haas MBA and FIU Computer Science undergrad",
  "Founder and operator of software, automation, and local-business systems",
];

export default function ResumePage() {
  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          title="The short recruiter version."
          description="Best aligned with applied AI, developer experience, technical product management, demo engineering, AI deployment, partner solutions, and customer-facing platform roles."
        />
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.02em]">Career snapshot</h2>
          <div className="mt-5 space-y-4">
            {snapshot.map((item) => (
              <div key={item} className="flex gap-3 text-base-content/74">
                <span className="mt-2 h-2 w-2 shrink-0 bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[2px] border p-4 hairline bg-base-200/45">
            <p className="text-sm font-semibold text-base-content/78">
              Experience timeline
            </p>
            <div className="mt-4 space-y-3">
              {workExperiences.map((company) => (
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
            <h2 className="text-2xl font-semibold">Education</h2>
            <div className="mt-5 space-y-4">
              {educationCredentials.map((item) => (
                <div key={item.school}>
                  <p className="text-sm font-semibold text-base-content/52">
                    {item.school}
                  </p>
                  <p className="mt-1 font-medium">{item.credential}</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/62">
                    {item.emphasis}
                  </p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Certifications</h2>
            <TagList items={certificationHighlights} className="mt-5" />
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Strengths</h2>
            <TagList items={strengthAreas} className="mt-5" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/work" className="draft-btn draft-btn-fill">
                View work
              </Link>
              <Link href="/contact" className="draft-btn draft-btn-line">
                Contact
              </Link>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </PageShell>
  );
}
