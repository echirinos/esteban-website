"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { DimensionRule, DraftReveal, draftEase } from "./blueprint-motion";

const HERO_FIELD = "bg-[#101f58]";

const riseIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: draftEase },
  }),
};

const lineRise: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: "0%",
    transition: { duration: 0.85, delay, ease: draftEase },
  }),
};

const titleBlockCells = [
  { label: "Current", value: "Coinbase", detail: "Sr. Technical Solutions Engineer" },
  { label: "Location", value: "Miami, FL", detail: "Open to SF Bay + remote" },
  { label: "Education", value: "Berkeley Haas", detail: "MBA, expected 2028" },
  { label: "Focus", value: "Applied AI", detail: "DevEx / technical product" },
  { label: "Rev", value: "2026.07", detail: "Portfolio revision" },
  { label: "Sheet", value: "A-01 / 06", detail: "Title sheet" },
];

const heroQuantities = [
  "$20M revenue supported",
  "30+ partner integrations",
  "2,000+ monthly demo users",
];

function CornerMark({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute ${className}`}>
      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/45" />
      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-white/45" />
    </span>
  );
}

export function BlueprintHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${HERO_FIELD} text-white`}
    >
      <motion.div
        aria-hidden="true"
        className="sheet-grid-field absolute -bottom-32 -top-32 left-0 right-0"
        style={reduceMotion ? undefined : { y: gridY }}
      />

      {/* Sheet frame with registration marks */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-white/25 sm:inset-5"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <CornerMark className="left-0 top-0" />
        <CornerMark className="right-0 top-0" />
        <CornerMark className="bottom-0 left-0" />
        <CornerMark className="bottom-0 right-0" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-7 pb-14 pt-16 sm:px-12 sm:pt-20 lg:px-14 lg:pb-20 lg:pt-24"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p
          className="annotation text-white/60"
          variants={riseIn}
          custom={0.05}
        >
          <span className="whitespace-nowrap">Applied AI &middot;</span>{" "}
          <span className="whitespace-nowrap">Developer experience &middot;</span>{" "}
          <span className="whitespace-nowrap">Technical product</span>
        </motion.p>

        <h1 className="mt-6 font-display font-bold uppercase leading-[0.88] tracking-[0.015em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(4.5rem,19vw,12.5rem)]"
              variants={lineRise}
              custom={0.12}
            >
              Esteban
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(4.5rem,19vw,12.5rem)]"
              variants={lineRise}
              custom={0.22}
            >
              Chirinos
            </motion.span>
          </span>
        </h1>

        <div className="mt-5 max-w-3xl">
          <DimensionRule label="Est. 2019 — present" delay={0.55} />
        </div>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/80"
          variants={riseIn}
          custom={0.5}
        >
          I help AI and developer-platform teams turn customer friction into
          shipped demos, reference implementations, onboarding systems, and
          product feedback loops.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          variants={riseIn}
          custom={0.62}
        >
          <Link href="/contact" className="draft-btn draft-btn-fill">
            Contact
          </Link>
          <Link href="/work" className="draft-btn draft-btn-line text-white">
            View proof
          </Link>
          <Link
            href="#ask-esteban"
            className="annotation px-2 py-3 text-white/60 transition hover:text-white"
          >
            Ask the portfolio ↓
          </Link>
        </motion.div>

        {/* Title block */}
        <motion.div className="mt-14 lg:mt-20" variants={riseIn} custom={0.74}>
          <div className="grid grid-cols-2 gap-px border border-white/25 bg-white/25 sm:grid-cols-3 lg:grid-cols-6">
            <div className={`${HERO_FIELD} col-span-2 flex items-center gap-4 p-4 sm:col-span-3 lg:col-span-2`}>
              <Image
                alt="Esteban Chirinos profile photo"
                src="/images/esteban.png"
                width={250}
                height={245}
                priority
                className="h-12 w-12 rounded-[2px] border border-white/30 object-cover"
              />
              <div>
                <p className="annotation text-white/50">Drawn by</p>
                <p className="mt-1 font-display text-xl font-semibold uppercase tracking-wide">
                  E. Chirinos
                </p>
              </div>
            </div>
            {titleBlockCells.map((cell) => (
              <div key={cell.label} className={`${HERO_FIELD} p-4`}>
                <p className="annotation text-white/50">{cell.label}</p>
                <p className="mt-1.5 text-sm font-semibold text-white">
                  {cell.value}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-white/55">
                  {cell.detail}
                </p>
              </div>
            ))}
            <div className={`${HERO_FIELD} col-span-2 p-4 sm:col-span-3 lg:col-span-4`}>
              <p className="annotation text-white/50">Proof</p>
              <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8125rem] font-medium text-white/85">
                {heroQuantities.map((quantity) => (
                  <span key={quantity}>{quantity}</span>
                ))}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const contactSocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/esteban-chirinos/",
    icon: FaLinkedin,
  },
  { label: "GitHub", href: "https://github.com/echirinos", icon: FaGithub },
  { label: "Twitter", href: "https://x.com/estebano_c", icon: FaXTwitter },
];

const contactRoutes = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/esteban-chirinos/",
    detail: "Recruiting and role conversations",
  },
  {
    label: "GitHub",
    href: "https://github.com/echirinos",
    detail: "Code samples and reference work",
  },
  {
    label: "Writing",
    href: "https://world.hey.com/echi/",
    detail: "Notes on work, systems, and product",
  },
];

export function BlueprintContact() {
  return (
    <section
      className={`relative mt-16 overflow-hidden ${HERO_FIELD} text-white lg:mt-24`}
    >
      <div
        aria-hidden="true"
        className="sheet-grid-field absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-white/25 sm:inset-5"
      >
        <CornerMark className="left-0 top-0" />
        <CornerMark className="right-0 top-0" />
        <CornerMark className="bottom-0 left-0" />
        <CornerMark className="bottom-0 right-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-7 pb-16 pt-16 sm:px-12 lg:px-14 lg:pt-20">
        <DraftReveal>
          <p className="annotation text-white/60">Sht A-06 &middot; Contact</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,9vw,5.5rem)] font-bold uppercase leading-[0.92]">
            Building something technical?
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/75">
            I am open to applied AI, developer experience, technical product
            management, demo engineering, AI deployment, partner solutions, and
            customer-facing platform roles.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="draft-btn draft-btn-fill">
              Contact
            </Link>
            <Link href="/resume" className="draft-btn draft-btn-line text-white">
              Resume
            </Link>
          </div>
        </DraftReveal>

        <div className="mt-14 grid gap-px border border-white/25 bg-white/25 sm:grid-cols-3">
          {contactRoutes.map((route) => (
            <a
              key={route.label}
              href={route.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${HERO_FIELD} group p-4 transition-colors hover:bg-[#16276b]`}
            >
              <p className="annotation flex items-center justify-between text-white/85">
                {route.label}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </p>
              <p className="mt-1.5 text-xs leading-snug text-white/55">
                {route.detail}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-6">
          <p className="annotation text-white/45">
            &copy; {new Date().getFullYear()}
            {" · Esteban Chirinos · Miami, FL"}
          </p>
          <div className="flex items-center gap-5">
            {contactSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/50 transition-colors hover:text-white"
              >
                <social.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="annotation text-white/45">Sheet A-06 / 06 &middot; End of set</p>
        </div>
      </div>
    </section>
  );
}
