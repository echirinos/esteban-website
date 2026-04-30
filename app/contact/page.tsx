import type { Metadata } from "next";
import ContactForm from "./contact-form";
import {
  PageIntro,
  PageShell,
  SurfaceCard,
} from "../components/portfolio-ui";
import { contactChannels, roleFit } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Esteban Chirinos about applied AI, developer experience, technical success, and solutions engineering roles.",
};

export default function ContactPage() {
  const deliveryMode = process.env.RESEND_SECRET ? "server" : "mailto";

  return (
    <PageShell>
      <SurfaceCard className="mb-8">
        <PageIntro
          title="Contact Esteban"
          description="Best for applied AI, developer experience, demo systems, customer-facing technical work, and partner solutions conversations."
        />
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-5">
          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Role alignment</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {roleFit.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-base-content/12 bg-base-100/72 px-3 py-1 text-xs font-medium text-base-content/72"
                >
                  {role}
                </span>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-2xl font-semibold">Direct channels</h2>
            <div className="mt-5 space-y-4">
              {contactChannels.map((channel) => (
                <a
                  key={channel.href}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-base-content/10 bg-base-100/70 p-4 transition hover:border-primary/20 hover:bg-base-100"
                >
                  <p className="font-medium">{channel.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/62">
                    {channel.detail}
                  </p>
                </a>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <SurfaceCard className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,242,248,0.92))]">
          <h2 className="text-2xl font-semibold">Send a note</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-base-content/64">
            Use the form for recruiting, consulting, demos, partnerships, or
            technical collaboration. Short context is enough.
          </p>
          {deliveryMode === "mailto" ? (
            <p className="mt-2 text-sm leading-relaxed text-base-content/52">
              This deployment opens a prefilled email draft instead of sending
              directly.
            </p>
          ) : null}
          <div className="mt-6">
            <ContactForm deliveryMode={deliveryMode} />
          </div>
        </SurfaceCard>
      </div>
    </PageShell>
  );
}
