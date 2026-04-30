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
          {featuredProjects.map((project) => (
            <SurfaceCard key={project.name} className="overflow-hidden p-0">
              <div className="grid h-40 place-items-center border-b border-base-content/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(224,233,242,0.7))] p-6">
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
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/42">
                  {project.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight">
                  {project.name}
                </h2>
                <p className="mt-3 leading-relaxed text-base-content/68">
                  {project.description}
                </p>
                <TagList items={project.tags} className="mt-5" />
                {project.href ? (
                  <div className="mt-6">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary transition hover:text-base-content"
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/42">
                {project.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-tight">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/66">
                {project.description}
              </p>
              <TagList items={project.tags} className="mt-4" />
              {project.href ? (
                <div className="mt-5">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary transition hover:text-base-content"
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
