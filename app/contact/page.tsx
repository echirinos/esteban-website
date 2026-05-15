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
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-48 flex-col justify-between rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2] p-5 text-white shadow-[0_18px_48px_rgba(10,102,194,0.24)] transition hover:-translate-y-1 hover:bg-base-content hover:text-base-100"
            aria-label="Reach out to Esteban on LinkedIn"
          >
            <FaLinkedin className="h-12 w-12 shrink-0" aria-hidden="true" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.16em] opacity-75">
                LinkedIn
              </span>
              <span className="mt-2 block text-xl font-black leading-tight">
                Reach out on LinkedIn
              </span>
            </span>
          </a>
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
