import React from "react";
import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "Get in touch with Esteban Chirinos.",
};

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">Contact Me</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <p className="mb-6 text-base-content">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out
            using the form below.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
