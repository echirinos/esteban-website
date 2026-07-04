"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type ViewportOptions,
} from "framer-motion";
import type { ReactNode } from "react";

export const draftEase = [0.16, 1, 0.3, 1] as const;
const draftViewport: ViewportOptions = { once: true, amount: 0.08 };

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: draftEase },
  },
};

export function DraftReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={draftViewport}
      transition={{ duration: 0.65, delay, ease: draftEase }}
    >
      {children}
    </motion.div>
  );
}

export function DraftStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={draftViewport}
    >
      {children}
    </motion.div>
  );
}

export function DraftItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* Hairline that drafts itself in from the left when scrolled into view. */
export function RuleDraw({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={className ?? "block h-px w-full bg-[var(--hairline)]"}
      style={{ originX: 0 }}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={reduceMotion ? undefined : { scaleX: 1 }}
      viewport={draftViewport}
      transition={{ duration: 0.9, ease: draftEase }}
    />
  );
}

/* Dimension rule: |———— label ————| drawn like a measurement on a drawing. */
export function DimensionRule({
  label,
  className,
  tone = "field",
  delay = 0,
}: {
  label: string;
  className?: string;
  tone?: "field" | "paper";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const lineColor =
    tone === "field" ? "bg-white/55" : "bg-[var(--hairline)]";
  const textColor =
    tone === "field" ? "text-white/70" : "text-[var(--base-content)]/60";

  return (
    <div className={`relative flex items-center gap-3 ${className ?? ""}`}>
      <motion.span
        aria-hidden="true"
        className={`h-3 w-px shrink-0 ${lineColor}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay }}
      />
      <motion.span
        aria-hidden="true"
        className={`h-px flex-1 ${lineColor}`}
        style={{ originX: 0 }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay, ease: draftEase }}
      />
      <motion.span
        className={`annotation shrink-0 ${textColor}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.45 }}
      >
        {label}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className={`h-px flex-1 ${lineColor}`}
        style={{ originX: 1 }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay, ease: draftEase }}
      />
      <motion.span
        aria-hidden="true"
        className={`h-3 w-px shrink-0 ${lineColor}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay }}
      />
    </div>
  );
}
