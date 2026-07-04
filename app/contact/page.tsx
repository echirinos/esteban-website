import type { Metadata } from "next";
import { FaLinkedin } from "react-icons/fa";
import {
  PageIntro,
  PageShell,
  SurfaceCard,
} from "../components/portfolio-ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Esteban Chirinos on LinkedIn for recruiting, applied AI, developer experience, platform, and partner solutions conversations.",
};

const linkedinUrl = "https://www.linkedin.com/in/esteban-chirinos/";

const outreachNotes = [
  "Role or team you have in mind",
  "Why the work connects to applied AI, platform, or product",
  "Useful timing, location, or next-step context",
];

export default function ContactPage() {
  return (
    <PageShell className="max-w-4xl">
      <SurfaceCard className="mb-5">
        <PageIntro
          title="Reach out on LinkedIn."
          description="LinkedIn is the best place to start a recruiting, applied AI, developer experience, platform, or partner solutions conversation."
        />
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(236,242,248,0.92))]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Preferred contact
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Send a LinkedIn message with the role, team, and context.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-base-content/64">
              No contact form or extra channels here. LinkedIn keeps the
              conversation clear and easy to follow up on.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-base-content/68">
              {outreachNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 rounded-[2px] border border-primary bg-primary p-5 text-primary-content transition hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-content"
            aria-label="Reach out to Esteban on LinkedIn"
          >
            <FaLinkedin className="h-9 w-9 shrink-0" aria-hidden="true" />
            <span>
              <span className="annotation block opacity-75">
                LinkedIn
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold uppercase leading-tight tracking-[0.02em]">
                Reach out on LinkedIn
              </span>
            </span>
          </a>
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
