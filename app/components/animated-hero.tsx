"use client";

import { motion } from "framer-motion";

export function AnimatedHero() {
  return (
    <motion.div
      className="relative text-center"
      initial="hidden"
      animate="visible"
    >
      {/* Name */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Esteban Chirinos
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-base-content/60 font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        Engineer &middot; Builder &middot; Maker
      </motion.p>
    </motion.div>
  );
}
