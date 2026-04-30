"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "../db/actions";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

type ContactFormProps = {
  deliveryMode: "server" | "mailto";
};

function SubmitButton({ deliveryMode }: ContactFormProps) {
  const { pending } = useFormStatus();
  const label =
    deliveryMode === "mailto"
      ? "Open email draft"
      : pending
        ? "Sending..."
        : "Send message";

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {label}
    </button>
  );
}

export default function ContactForm({ deliveryMode }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [serverState, formAction] = useActionState(sendContactMessage, initialState);
  const [clientState, setClientState] = useState(initialState);
  const state = deliveryMode === "server" ? serverState : clientState;

  useEffect(() => {
    if (deliveryMode === "server" && serverState.status === "success") {
      formRef.current?.reset();
    }
  }, [deliveryMode, serverState.status]);

  const handleMailtoSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (deliveryMode !== "mailto") return;

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !email || !message) {
      setClientState({
        status: "error",
        message: "Please complete all fields before opening the draft.",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setClientState({
        status: "error",
        message: "Please use a valid email address.",
      });
      return;
    }

    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:echi@hey.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setClientState({
      status: "success",
      message: "Your email app opened with a draft message to Esteban.",
    });
  };

  return (
    <form
      ref={formRef}
      action={deliveryMode === "server" ? formAction : undefined}
      onSubmit={handleMailtoSubmit}
      className="space-y-5"
    >
      {state.status !== "idle" ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-base-content/72">Name</span>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            className="input input-bordered h-12 rounded-2xl border-base-content/12 bg-base-100/85"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-base-content/72">Email</span>
          <input
            type="email"
            name="email"
            placeholder="jane@company.com"
            className="input input-bordered h-12 rounded-2xl border-base-content/12 bg-base-100/85"
            required
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-base-content/72">Message</span>
        <textarea
          name="message"
          rows={7}
          placeholder="What are you hiring for, building, or exploring?"
          className="textarea textarea-bordered rounded-2xl border-base-content/12 bg-base-100/85"
          required
        />
      </label>

      <div className="flex items-center justify-between gap-4">
        <p className="max-w-md text-sm leading-relaxed text-base-content/55">
          {deliveryMode === "mailto"
            ? "For recruiting, consulting, technical demos, or platform work."
            : "For recruiting, consulting, technical demos, or platform work."}
        </p>
        <SubmitButton deliveryMode={deliveryMode} />
      </div>
    </form>
  );
}
