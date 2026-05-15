"use client";

import { animate, stagger } from "animejs";
import {
  motion,
  useReducedMotion,
  type Variants,
  type ViewportOptions,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const cinematicEase = [0.16, 1, 0.3, 1] as const;
const revealViewport: ViewportOptions = { once: true, amount: 0.22 };

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: cinematicEase },
  },
};

const signalNodes = [
  { left: 10, top: 18, size: 7 },
  { left: 22, top: 38, size: 5 },
  { left: 30, top: 12, size: 6 },
  { left: 42, top: 30, size: 8 },
  { left: 52, top: 18, size: 5 },
  { left: 62, top: 42, size: 7 },
  { left: 72, top: 16, size: 6 },
  { left: 84, top: 34, size: 8 },
  { left: 16, top: 72, size: 6 },
  { left: 34, top: 64, size: 8 },
  { left: 48, top: 82, size: 5 },
  { left: 68, top: 72, size: 6 },
  { left: 88, top: 82, size: 7 },
];

export function MotionReveal({
  children,
  className,
  delay = 0,
  initialVisible = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialVisible?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion || initialVisible ? false : { opacity: 0, y: 28 }}
      whileInView={
        reduceMotion || initialVisible ? undefined : { opacity: 1, y: 0 }
      }
      viewport={revealViewport}
      transition={{ duration: 0.7, delay, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
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
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
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

export function MotionSurface({
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
      variants={staggerItem}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.28, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}

export function AnimeSignalField({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return undefined;

    const nodes = rootRef.current.querySelectorAll("[data-signal-node]");
    const lines = rootRef.current.querySelectorAll("[data-signal-line]");

    const nodeAnimation = animate(nodes, {
      opacity: [0.34, 1],
      scale: [0.74, 1.7],
      y: [-5, 8],
      duration: 2200,
      delay: stagger(90, { from: "center" }),
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    const lineAnimation = animate(lines, {
      opacity: [0.14, 0.44],
      scaleX: [0.72, 1],
      duration: 3200,
      delay: stagger(180),
      ease: "inOutQuad",
      loop: true,
      alternate: true,
    });

    return () => {
      nodeAnimation.revert();
      lineAnimation.revert();
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} aria-hidden="true" className={className}>
      <span
        data-signal-line
        className="absolute left-[8%] top-[28%] h-px w-[78%] origin-left bg-gradient-to-r from-transparent via-primary/55 to-transparent"
      />
      <span
        data-signal-line
        className="absolute left-[14%] top-[64%] h-px w-[70%] origin-left bg-gradient-to-r from-transparent via-secondary/45 to-transparent"
      />
      <span
        data-signal-line
        className="absolute left-[52%] top-[8%] h-[82%] w-px origin-top bg-gradient-to-b from-transparent via-accent/40 to-transparent"
      />
      {signalNodes.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          data-signal-node
          className="absolute rounded-full bg-primary shadow-[0_0_30px_rgba(94,234,212,0.68)]"
          style={{
            left: `${node.left}%`,
            top: `${node.top}%`,
            height: node.size,
            width: node.size,
          }}
        />
      ))}
    </div>
  );
}
