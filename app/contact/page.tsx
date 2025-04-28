import React from "react";
import type { Metadata } from "next";

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
          {/* Form using DaisyUI components */}
          <form
          // action="/api/contact" // Example: Add your form submission endpoint here
          // method="POST"
          >
            <div className="form-control mb-4">
              <label className="label" htmlFor="name">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane Doe"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label" htmlFor="email">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jane.doe@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label" htmlFor="message">
                <span className="label-text">Message</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
