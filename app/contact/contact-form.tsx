"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill out all fields",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      // Using Formspree to handle form submission - replace YOUR_FORM_ID with the actual ID after creating a form
      const response = await fetch("https://formspree.io/f/echi@hey.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Success
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      {status.type === "success" ? (
        <div className="alert alert-success mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{status.message}</span>
        </div>
      ) : null}

      {status.type === "error" ? (
        <div className="alert alert-error mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{status.message}</span>
        </div>
      ) : null}

      <form
        action="https://formspree.io/f/echi@hey.com"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="form-control mb-4">
          <label className="label" htmlFor="name">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="input input-bordered w-full"
            required
            disabled={status.type === "loading"}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="jane.doe@example.com"
            className="input input-bordered w-full"
            required
            disabled={status.type === "loading"}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label" htmlFor="message">
            <span className="label-text">Message</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Your message here..."
            required
            disabled={status.type === "loading"}
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${
              status.type === "loading" ? "loading" : ""
            }`}
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
}
