import type { Metadata } from "next";
import Image from "next/image";
import {
  PageIntro,
  PageShell,
  SectionHeading,
  SurfaceCard,
  TagList,
} from "../components/portfolio-ui";
import { projectEntries } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Demo apps, reference implementations, developer tutorials, technical product work, and operator systems by Esteban Chirinos.",
};

const featuredProjects = projectEntries.filter((item) => item.highlighted);
const supportingProjects = projectEntries.filter((item) => !item.highlighted);

export default function ProjectsPage() {
  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          code="Projects"
          title="Projects with real users, operators, and outcomes."
          description="The first projects here are the clearest proof for applied AI, developer experience, technical product, solutions, and platform roles: reference apps, integration tools, tutorials, and products that made a platform easier to adopt."
        />
      </SurfaceCard>

      <section className="py-8">
        <SectionHeading
          title="Featured proof"
          description="The strongest portfolio signal is the shipped work that combines product clarity, technical implementation, and audience adoption."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <SurfaceCard
              key={project.name}
              className="flex h-full flex-col overflow-hidden p-0"
            >
              {/* Numbered plate header: five cards shared the same logo art,
                  so the drafting device carries the variety instead */}
              <div className="sheet-grid flex h-40 items-end justify-between border-b p-6 hairline">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl font-semibold uppercase leading-none text-base-content/15"
                >
                  P-0{index + 1}
                </span>
                <span className="annotation text-primary">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-2xl font-semibold uppercase leading-[1.02] tracking-[0.02em]">
                  {project.name}
                </h2>
                <p className="mt-3 leading-relaxed text-base-content/70">
                  {project.description}
                </p>
                <TagList items={project.tags} className="mt-5" />
                {project.href ? (
                  <div className="mt-auto pt-6">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="annotation text-primary underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                    >
                      Open project
                    </a>
                  </div>
                ) : null}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading
          title="Additional systems"
          description="Founder work, local-business automation, and community systems that show the same operator mindset in a different environment."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project) => (
            <SurfaceCard key={project.name} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-[1.05] tracking-[0.02em]">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                {project.description}
              </p>
              <TagList items={project.tags} className="mt-4" />
              {project.href ? (
                <div className="mt-5">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="annotation text-primary underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                  >
                    Visit project
                  </a>
                </div>
              ) : null}
            </SurfaceCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
