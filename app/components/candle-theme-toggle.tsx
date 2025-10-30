"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CandleThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-20 right-6 z-50 p-3 rounded-full glass-card hover:glow-effect transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? <RedCandle /> : <GreenCandle />}
      </motion.div>
    </motion.button>
  );
}

// Red Candlestick for Light Mode (Bearish)
function RedCandle() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300"
    >
      {/* Upper wick (high) */}
      <motion.line
        x1="20"
        y1="6"
        x2="20"
        y2="14"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Candle Body - Red (close < open, bearish) */}
      <motion.rect
        x="13"
        y="14"
        width="14"
        height="12"
        fill="#EF4444"
        stroke="#DC2626"
        strokeWidth="1.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Highlight on body */}
      <rect
        x="14"
        y="15"
        width="3"
        height="10"
        fill="#FCA5A5"
        opacity="0.3"
      />
      
      {/* Lower wick (low) */}
      <motion.line
        x1="20"
        y1="26"
        x2="20"
        y2="34"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

// Green Candlestick for Dark Mode (Bullish)
function GreenCandle() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300"
    >
      {/* Upper wick (high) */}
      <motion.line
        x1="20"
        y1="6"
        x2="20"
        y2="14"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Candle Body - Green (close > open, bullish) */}
      <motion.rect
        x="13"
        y="14"
        width="14"
        height="12"
        fill="#22C55E"
        stroke="#16A34A"
        strokeWidth="1.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Highlight on body */}
      <rect
        x="14"
        y="15"
        width="3"
        height="10"
        fill="#86EFAC"
        opacity="0.4"
      />
      
      {/* Lower wick (low) */}
      <motion.line
        x1="20"
        y1="26"
        x2="20"
        y2="34"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

