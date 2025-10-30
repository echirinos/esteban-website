"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function AnimatedHero() {
  const text = "hey, I'm esteban";
  const [isWritingComplete, setIsWritingComplete] = useState(false);

  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => setIsWritingComplete(true)}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cursive text-center mb-8 relative z-10">
        <motion.span className="inline-block">
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { delay: index * 0.08, duration: 0.1 },
              }}
              onAnimationComplete={() => {
                if (index === text.length - 1) {
                  setIsWritingComplete(true);
                }
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </h1>
    </motion.div>
  );
}

