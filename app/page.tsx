"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedHero } from "./components/animated-hero";
import ContactForm from "./contact/contact-form";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

export default function Page() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative py-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }}
      >
        <div className="relative flex flex-col items-center">
          {/* Animated Text with Paint Splashes */}
          <AnimatedHero />
          
          {/* Profile image - centered, fades in after text completes */}
          <motion.div
            className="mt-6 w-40 h-40 md:w-48 md:h-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.6,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-crypto-red via-crypto-purple to-crypto-green rounded-full opacity-30 blur-2xl" />
              <img
                src="/images/esteba-pfp.png"
                alt="Esteban Chirinos"
                className="relative w-full h-full rounded-full shadow-2xl border-4 border-primary/30 object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-xl md:text-2xl text-center max-w-2xl mb-8 mt-8 text-base-content/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          A versatile engineer, optimist, community builder, educator, sales enthusiast,
          and real estate aficionado with a passion for technology, music, and DIY projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.5 }}
        >
          <a
            href="#work"
            className="btn btn-primary btn-lg gap-2 glow-effect hover:scale-105 transition-transform"
          >
            Explore My Work
            <ArrowIcon />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2.5, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, delay: 2.5 }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M12 5v14m0 0l-7-7m7 7l7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center"
            variants={fadeInUp}
          >
            Current Role
          </motion.h2>

          <motion.div
            className="glass-card p-8 rounded-2xl border-l-4 border-primary shadow-2xl"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-6">
              <div className="relative w-12 h-12 mr-4">
                <img
                  alt="Coinbase logomark"
                  src="/images/coinbase.svg"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-crypto-blue/20 rounded-full blur-xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Technical Services Engineer at Coinbase
              </h3>
            </div>
            
            <p className="text-lg mb-4 text-base-content/80">
              I empower developers building on the Coinbase Developer Platform (CDP).
            </p>
            
            <p className="text-base-content/80">
              My role involves providing architectural guidance, troubleshooting complex
              integration challenges, creating technical documentation and sample code
              (primarily using Python and TypeScript), and advocating for developer needs
              to enhance our products. I thrive on collaborating with development teams to
              ensure they successfully leverage CDP's APIs and SDKs to build the future of
              the onchain economy.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects Section - MOVED HERE */}
      <motion.section
        id="projects"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center"
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p className="text-center text-lg mb-12 text-base-content/80" variants={fadeInUp}>
            Tools and SaaS products built from scratching my own itch
          </motion.p>

          {/* TRUE RANK PICKLEBALL - Acquired, Featured First */}
          <motion.div
            className="mb-12"
            variants={fadeInUp}
          >
            <motion.a
              href="https://www.truerankpickleball.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <div className="glass-card p-8 rounded-2xl border-2 border-primary shadow-2xl neon-border">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      alt="True Rank Pickleball"
                      src="/images/TrueRankLogo.png"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                      <h3 className="text-3xl font-bold">True Rank Pickleball</h3>
                      <span className="badge badge-primary badge-lg">ACQUIRED</span>
                    </div>
                    <p className="text-lg text-base-content/80 mb-3">
                      A pickleball rating system providing accurate, category-specific ratings 
                      for Men's, Women's, and Mixed play without advertisements.
                    </p>
                    <p className="text-sm text-base-content/60">
                      Built by me and successfully acquired! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Other Projects */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {[
              {
                name: "Creator Tip Application",
                logo: "/images/Coinbase-icon-symbol-1.svg",
                description: "Decentralized tipping app with crypto payments on Base network",
                url: "https://creator-tip-onchainkit.vercel.app/",
              },
              {
                name: "Coinbase Onramp Demo",
                logo: "/images/coinbase.svg",
                description: "Demo app serving 2,000+ users monthly for fiat to crypto conversion",
                url: "https://onramp-demo-application.vercel.app/",
              },
              {
                name: "QuikBuild Innovations",
                logo: "/images/quikbuild_logo.png",
                description: "Automation and software solutions for construction companies",
                url: "https://www.quikbuildinnovations.com/",
              },
              {
                name: "Klear Sky Roofing",
                logo: "/images/KlearSky_pic.png",
                description: "My roofing company - combining tech with DIY passion",
                url: "https://klearskyroofing.com",
              },
              {
                name: "A&E Roofing Brothers",
                logo: "/images/ae.png",
                description: "100% increase in leads and 20% sales boost in 3 months",
                url: "https://www.aebrothersroofing.com/",
              },
            ].map((project) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                variants={fadeInUp}
              >
                <div className="glass-card h-full p-6 rounded-xl shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <Image
                      alt={project.name}
                      src={project.logo}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
                  <p className="text-sm text-base-content/70">{project.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Link
              href="/projects"
              className="btn btn-outline btn-lg hover:btn-primary gap-2"
            >
              View All Projects
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        id="work"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center"
            variants={fadeInUp}
          >
            Past Experiences
          </motion.h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {[
              {
                name: "TRM Labs",
                logo: "/images/trm.jpeg",
                description: "Blockchain intelligence solutions",
                url: "https://www.trmlabs.com",
              },
              {
                name: "Polygon",
                logo: "/images/polygon-matic-icon.svg",
                description: "Ethereum scaling platform",
                url: "https://polygon.technology",
              },
              {
                name: "OpenSea",
                logo: "/images/opensea.svg",
                description: "NFT marketplace",
                url: "https://opensea.io",
              },
              {
                name: "Google",
                logo: "/images/google-icon.svg",
                description: "Technology and services",
                url: "https://about.google",
              },
              {
                name: "Microsoft",
                logo: "/images/Microsoft_logo.svg",
                description: "Software and computing",
                url: "https://www.microsoft.com",
              },
              {
                name: "JPMorgan Chase",
                logo: "/images/J_P_Morgan_Logo_2008.svg",
                description: "Financial services",
                url: "https://www.jpmorganchase.com",
              },
            ].map((company, index) => (
              <motion.a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline cursor-pointer group"
                variants={fadeInUp}
              >
                <div className="glass-card h-full p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      alt={`${company.name} logomark`}
                      src={company.logo}
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="text-xl font-bold">{company.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70">{company.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center"
            variants={fadeInUp}
          >
            Core Skills & Technologies
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4"
            variants={staggerContainer}
          >
            {[
              { name: "Python", logo: "/images/python-logo.png" },
              { name: "TypeScript", logo: "/images/typescript-logo.png" },
              { name: "JavaScript", logo: "/images/javascript-logo.png" },
              { name: "React", logo: "/images/react-logo.png" },
              { name: "Node.js", logo: "/images/nodejs-logo.png" },
              { name: "AWS", logo: "/images/aws-logo.png" },
              { name: "GCP", logo: "/images/gcp-logo.png" },
              { name: "Docker", logo: "/images/docker-logo.png" },
            ].map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="glass-card p-6 rounded-xl shadow-lg flex items-center justify-center"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="h-16 w-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center"
            variants={fadeInUp}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p
            className="text-center text-lg mb-12 text-base-content/80"
            variants={fadeInUp}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions. Feel free to reach out!
          </motion.p>

          <motion.div
            className="glass-card p-8 rounded-2xl shadow-2xl"
            variants={fadeInUp}
          >
            <ContactForm />
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mt-12"
            variants={staggerContainer}
          >
            {[
              {
                name: "Blog",
                url: "https://world.hey.com/echi/",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3z" />
                  </svg>
                ),
              },
              {
                name: "Twitter",
                url: "https://x.com/estebano_c",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                ),
              },
              {
                name: "GitHub",
                url: "https://github.com/echirinos",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/esteban-chirinos/",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2"
                variants={fadeInUp}
              >
                {social.icon}
                {social.name}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
