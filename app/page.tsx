"use client";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Page() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <motion.section
        id="hero"
        className="min-h-[90vh] flex flex-col items-center justify-center relative py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8 w-32 h-32 md:w-40 md:h-40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-2xl" />
            <img
              src="/images/esteba-pfp.png"
              alt="Esteban Chirinos"
              className="relative w-full h-full rounded-full shadow-xl border-2 border-base-content/10 object-cover"
            />
          </div>
        </motion.div>

        {/* Name + Tagline */}
        <AnimatedHero />

        {/* One-liner bio */}
        <motion.p
          className="text-lg md:text-xl text-center max-w-2xl mt-8 mb-10 text-base-content/70 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Technical Services Engineer at{" "}
          <span className="text-primary font-semibold">Coinbase</span>,
          helping developers build onchain. On nights and weekends, I build
          my own products — one got{" "}
          <span className="text-primary font-semibold">acquired</span>.
          Previously at Google, Microsoft, OpenSea, and JPMorgan.
        </motion.p>

        {/* Social proof - company logos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[
            { name: "Coinbase", logo: "/images/coinbase.svg" },
            { name: "Google", logo: "/images/google-icon.svg" },
            { name: "Microsoft", logo: "/images/Microsoft_logo.svg" },
            { name: "JPMorgan Chase", logo: "/images/J_P_Morgan_Logo_2008.svg" },
            { name: "Polygon", logo: "/images/polygon-matic-icon.svg" },
            { name: "OpenSea", logo: "/images/opensea.svg" },
          ].map((company) => (
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              className="h-6 md:h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <a
            href="#built"
            className="btn btn-primary btn-md gap-2 hover:scale-105 transition-transform"
          >
            See What I've Built
            <ArrowIcon />
          </a>
          <a
            href="#contact"
            className="btn btn-outline btn-md gap-2 hover:scale-105 transition-transform"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, delay: 1.5 },
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-base-content/40"
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

      {/* ===== METRICS BAR ===== */}
      <motion.section
        className="py-12 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { metric: "7+", label: "Companies Shipped At" },
              { metric: "2K+", label: "Monthly Users" },
              { metric: "10+", label: "Products Built" },
              { metric: "1", label: "Side Project Acquired" },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {item.metric}
                </div>
                <div className="text-sm text-base-content/50 font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== WHAT I'VE BUILT ===== */}
      <motion.section
        id="built"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center"
            variants={fadeInUp}
          >
            What I've Built
          </motion.h2>
          <motion.p
            className="text-center text-base-content/60 mb-14 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            Side projects and products I've built on nights and weekends.
          </motion.p>

          {/* ACQUIRED - Featured */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <motion.a
              href="https://www.truerankpickleball.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline group"
            >
              <div className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      alt="True Rank Pickleball"
                      src="/images/TrueRankLogo.png"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                      <h3 className="text-2xl font-bold">
                        True Rank Pickleball
                      </h3>
                      <span className="badge badge-primary badge-sm font-semibold">
                        ACQUIRED
                      </span>
                    </div>
                    <p className="text-base-content/70 mb-2">
                      A rating system providing accurate, category-specific
                      ratings for Men's, Women's, and Mixed pickleball play.
                      Built from zero to acquisition.
                    </p>
                    <span className="text-sm text-primary font-medium group-hover:underline">
                      Visit project &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Other Projects */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={staggerContainer}
          >
            {[
              {
                name: "Creator Tip App",
                description:
                  "Decentralized tipping with crypto payments on Base network",
                url: "https://creator-tip-onchainkit.vercel.app/",
              },
              {
                name: "Coinbase Onramp Demo",
                description:
                  "Demo app serving 2,000+ users/month for fiat-to-crypto conversion",
                url: "https://onramp-demo-application.vercel.app/",
              },
              {
                name: "QuikBuild Innovations",
                description:
                  "Automation and software solutions for construction companies",
                url: "https://www.quikbuildinnovations.com/",
              },
              {
                name: "Klear Sky Roofing",
                description:
                  "My roofing company - tech meets the trades",
                url: "https://klearskyroofing.com",
              },
            ].map((project) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline group"
                variants={fadeInUp}
              >
                <div className="glass-card h-full p-6 rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="text-center mt-10" variants={fadeInUp}>
            <Link
              href="/projects"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all projects &rarr;
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== EXPERIENCE ===== */}
      <motion.section
        id="work"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center"
            variants={fadeInUp}
          >
            Where I've Worked
          </motion.h2>
          <motion.p
            className="text-center text-base-content/60 mb-14 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            From Wall Street to Web3, shipping at every scale.
          </motion.p>

          {/* Current Role - Featured */}
          <motion.div className="mb-10" variants={fadeInUp}>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-4">
                <img
                  alt="Coinbase"
                  src="/images/coinbase.svg"
                  className="w-10 h-10"
                />
                <div>
                  <h3 className="text-xl font-bold">Coinbase</h3>
                  <p className="text-sm text-base-content/50">
                    Technical Services Engineer &middot; Current
                  </p>
                </div>
              </div>
              <p className="text-base-content/70">
                Empowering developers building on the Coinbase Developer
                Platform. Providing architectural guidance, troubleshooting
                complex integrations, and creating technical documentation
                and sample code to help teams build the future onchain.
              </p>
            </div>
          </motion.div>

          {/* Past roles */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
          >
            {[
              {
                name: "TRM Labs",
                role: "Blockchain Intelligence",
                logo: "/images/trm.jpeg",
                url: "https://www.trmlabs.com",
              },
              {
                name: "Polygon",
                role: "Ethereum Scaling",
                logo: "/images/polygon-matic-icon.svg",
                url: "https://polygon.technology",
              },
              {
                name: "OpenSea",
                role: "NFT Marketplace",
                logo: "/images/opensea.svg",
                url: "https://opensea.io",
              },
              {
                name: "Google",
                role: "Technology & Cloud",
                logo: "/images/google-icon.svg",
                url: "https://about.google",
              },
              {
                name: "Microsoft",
                role: "Software & Computing",
                logo: "/images/Microsoft_logo.svg",
                url: "https://www.microsoft.com",
              },
              {
                name: "JPMorgan Chase",
                role: "Financial Services",
                logo: "/images/J_P_Morgan_Logo_2008.svg",
                url: "https://www.jpmorganchase.com",
              },
            ].map((company) => (
              <motion.a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline group"
                variants={fadeInUp}
              >
                <div className="glass-card h-full p-5 rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <img
                      alt={company.name}
                      src={company.logo}
                      className="w-9 h-9 rounded-lg object-contain"
                    />
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-base-content/50">
                        {company.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="text-center mt-10" variants={fadeInUp}>
            <Link
              href="/work"
              className="text-sm font-medium text-primary hover:underline"
            >
              Full work history &rarr;
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SKILLS ===== */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center"
            variants={fadeInUp}
          >
            Tech Stack
          </motion.h2>
          <motion.p
            className="text-center text-base-content/60 mb-12 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            The tools I reach for every day.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                category: "Languages",
                items: ["TypeScript", "Python", "JavaScript", "C#", "Java", "SQL"],
              },
              {
                category: "Frameworks & Tools",
                items: ["React", "Next.js", "Node.js", "Spring Boot", "Docker", "Git"],
              },
              {
                category: "Platforms",
                items: ["AWS", "GCP", "Vercel", "Coinbase CDP", "PostgreSQL", "Azure"],
              },
            ].map((group) => (
              <motion.div
                key={group.category}
                variants={fadeInUp}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="badge badge-outline badge-sm font-mono text-base-content/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CONTACT ===== */}
      <motion.section
        id="contact"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center"
            variants={fadeInUp}
          >
            Let's Talk
          </motion.h2>

          <motion.p
            className="text-center text-base-content/60 mb-12"
            variants={fadeInUp}
          >
            Building something interesting? I'm always open to hearing about
            new projects and opportunities.
          </motion.p>

          <motion.div
            className="glass-card p-8 rounded-2xl"
            variants={fadeInUp}
          >
            <ContactForm />
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mt-10"
            variants={staggerContainer}
          >
            {[
              {
                name: "GitHub",
                url: "https://github.com/echirinos",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                name: "Twitter",
                url: "https://x.com/estebano_c",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/esteban-chirinos/",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                name: "Blog",
                url: "https://world.hey.com/echi/",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary"
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
