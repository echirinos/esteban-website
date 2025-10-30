"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6">
      {/* Section Navigation Dots */}
      <div className="flex flex-col gap-4 glass-card rounded-full p-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 group ${
              activeSection === section.id
                ? "scale-125"
                : "bg-base-content/30 hover:bg-base-content/50"
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Active dot with gradient */}
            {activeSection === section.id && (
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-crypto-red via-crypto-purple to-crypto-green" />
            )}

            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 glass-card text-base-content text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg pointer-events-none border border-primary/20">
              {section.label}
            </span>

            {/* Smooth pulsing glow for active section - Red to Green gradient */}
            {activeSection === section.id && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(34, 197, 94, 0.6) 100%)",
                  filter: "blur(8px)",
                }}
                animate={{
                  scale: [1, 2, 2.5, 2, 1],
                  opacity: [0.8, 0.6, 0.3, 0.5, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:glow-effect transition-all border border-primary/20"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </div>
  );
}

