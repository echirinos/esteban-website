export type Metric = {
  value: string;
  label: string;
};

export type WorkExperience = {
  name: string;
  logo: string;
  role: string;
  period: string;
  url: string;
  summary: string;
  tags: string[];
  impact: string[];
  featured?: boolean;
};

export type ProjectEntry = {
  name: string;
  image: string | null;
  description: string;
  href?: string;
  tags: string[];
  category: string;
  highlighted?: boolean;
};

export type LabTrack = {
  title: string;
  description: string;
  outputs: string[];
};

export const portfolioMetrics: Metric[] = [
  { value: "7+", label: "Companies shipped at" },
  { value: "2,000+", label: "Monthly demo users" },
  { value: "40+", label: "Integration solutions delivered" },
  { value: "1", label: "Founder project acquired" },
];

export const roleFit = [
  "Applied AI Architect",
  "Developer Experience",
  "Demo Engineering",
  "AI Deployment",
  "Partner Solutions",
];

export const workExperiences: WorkExperience[] = [
  {
    name: "Coinbase",
    logo: "/images/coinbase.svg",
    role: "Technical Services Engineer",
    period: "March 2024 - Present",
    url: "https://www.coinbase.com/developer-platform",
    summary:
      "Technical onboarding and implementation support for Coinbase Developer Platform customers building with APIs, SDKs, wallets, payments, and onchain workflows.",
    tags: ["CDP APIs", "SDKs", "Onchain apps"],
    impact: [
      "Lead technical onboarding for developers and enterprise teams integrating CDP APIs and SDKs.",
      "Design integration architectures, demo paths, and best-practice guidance for scalable onchain applications.",
      "Write docs, runbooks, and reference implementations across TypeScript, Python, Java, and C#.",
    ],
    featured: true,
  },
  {
    name: "TRM Labs",
    logo: "/images/Trm-Labs.svg",
    role: "Staff Solutions Architect",
    period: "June 2023 - February 2024",
    url: "https://www.trmlabs.com/",
    summary:
      "Designed and rolled out API integrations for financial institutions and government agencies, including custom solutions, discovery sessions, and dashboard tooling.",
    tags: ["API integrations", "Discovery", "Dashboards"],
    impact: [
      "Delivered 40+ custom API integration solutions for regulated customers.",
      "Ran 60+ technical discovery sessions to align platform capabilities with client needs.",
      "Built 10+ dashboard tools and improved reference patterns for stronger CSAT.",
    ],
    featured: true,
  },
  {
    name: "Polygon Labs",
    logo: "/images/plabs.png",
    role: "Solutions Engineer",
    period: "August 2022 - February 2023",
    url: "https://polygon.technology/",
    summary:
      "Built web3 proof-of-concepts, reference implementations, and partner solution designs across entertainment, DeFi, and NFT use cases.",
    tags: ["POCs", "Web3", "Partner engineering"],
    impact: [
      "Built and shipped web3 solutions for entertainment, DeFi, and NFT clients.",
      "Standardized operations for a 12-person solutions engineering team.",
      "Created prospect and partner demos in Next.js and JavaScript.",
    ],
    featured: true,
  },
  {
    name: "OpenSea",
    logo: "/images/opensea.svg",
    role: "Developer Relations Engineer / Product",
    period: "January 2022 - July 2022",
    url: "https://opensea.io/",
    summary:
      "Owned developer docs, sample code, partner engineering, API feedback loops, and support automation for marketplace developers.",
    tags: ["Docs", "DevRel", "API feedback"],
    impact: [
      "Owned developer-facing docs, code samples, and partner engineering support.",
      "Prioritized 100+ developer feature requests for the OpenSea API and SDK.",
      "Built API key distribution and support automation systems that improved NPS.",
    ],
    featured: true,
  },
  {
    name: "Google",
    logo: "/images/google-icon.svg",
    role: "Technical Account Manager",
    period: "October 2020 - January 2022",
    url: "https://about.google/",
    summary:
      "Supported cloud architecture and customer success for strategic accounts, including migration planning, technical enablement, and account health.",
    tags: ["Cloud", "GCP", "Customer success"],
    impact: [
      "Supported enterprise customers across cloud architecture and migration planning.",
      "Led an AWS to GCP BigQuery and Dataproc migration for a new customer.",
    ],
  },
  {
    name: "Microsoft",
    logo: "/images/Microsoft_logo.svg",
    role: "Software Engineering Intern",
    period: "May 2020 - August 2020",
    url: "https://www.microsoft.com/",
    summary:
      "Built an Azure Cloud Supply Chain telemetry application to help internal teams monitor and reason about operational data.",
    tags: ["Azure", "Telemetry", "Software engineering"],
    impact: [
      "Built telemetry dashboards to surface bottlenecks and improve supply chain visibility.",
    ],
  },
  {
    name: "JPMorgan Chase",
    logo: "/images/J_P_Morgan_Logo_2008.svg",
    role: "Software Engineering Intern",
    period: "May 2019 - August 2019",
    url: "https://www.jpmorganchase.com/",
    summary:
      "Built a React, Spring Boot, and PostgreSQL application for investment banking workflows and internal productivity.",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    impact: [
      "Built a deal-tracking app with React, Spring Boot, and PostgreSQL.",
    ],
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    name: "Coinbase Onramp Demo App",
    image: "/images/coinbase.svg",
    description:
      "A developer-facing reference app for fiat-to-crypto conversion flows, now serving 2,000+ users each month.",
    href: "https://onramp-demo-application.vercel.app/",
    tags: ["Reference app", "DevEx", "2,000+ users/month"],
    category: "Developer tooling",
    highlighted: true,
  },
  {
    name: "Coinbase Onramp Asset Checker",
    image: "/images/coinbase.svg",
    description:
      "A visual country and state eligibility checker built to reduce integration uncertainty for developers implementing Onramp.",
    href: "https://onramp-asset-availability.vercel.app/",
    tags: ["API workflows", "Customer enablement", "Developer tool"],
    category: "Developer tooling",
    highlighted: true,
  },
  {
    name: "NFT Deployment Application",
    image: "/images/Coinbase-icon-symbol-1.svg",
    description:
      "A CDP SDK and Pinata workflow for deploying NFTs across networks, packaged as practical technical documentation.",
    href: "https://docs.cdp.coinbase.com/learn/docs/nft-deployment",
    tags: ["Reference implementation", "Docs", "SDK"],
    category: "Developer education",
    highlighted: true,
  },
  {
    name: "Creator Tip Application",
    image: "/images/Coinbase-icon-symbol-1.svg",
    description:
      "A decentralized tipping app built with Next.js and OnchainKit that lets users support creators with crypto payments on Base.",
    href: "https://creator-tip-onchainkit.vercel.app/",
    tags: ["Next.js", "OnchainKit", "Payments"],
    category: "Applied AI / web3",
    highlighted: true,
  },
  {
    name: "Coinbase Developer Tutorials",
    image: "/images/Coinbase-icon-symbol-1.svg",
    description:
      "Live technical tutorials covering crypto payments, OnchainKit, and builder workflows for Coinbase's developer audience.",
    href: "https://www.youtube.com/watch?v=pszxxuq7aLo",
    tags: ["Workshops", "Technical content", "DevRel"],
    category: "Developer education",
  },
  {
    name: "True Rank Pickleball",
    image: "/images/TrueRankLogo.png",
    description:
      "A rating product built from zero to acquisition, including ranking logic and operator workflows.",
    href: "https://www.truerankpickleball.com/",
    tags: ["Acquired", "Consumer product", "Founder project"],
    category: "Founder product",
    highlighted: true,
  },
  {
    name: "QuikBuild Innovations",
    image: "/images/quikbuild_logo.png",
    description:
      "Automation and software systems for construction companies modernizing GTM, sales, and internal operations.",
    href: "https://www.quikbuildinnovations.com/",
    tags: ["Automation", "GTM systems", "Operator tools"],
    category: "Operator systems",
  },
  {
    name: "Klear Sky Roofing",
    image: "/images/KlearSky_pic.png",
    description:
      "A Florida roofing company operated alongside software work, combining local business operations with modern systems.",
    href: "https://klearskyroofing.com",
    tags: ["Operations", "Local business", "Founder project"],
    category: "Operator systems",
  },
  {
    name: "A&E Roofing Brothers",
    image: "/images/ae.png",
    description:
      "Business modernization work using better tooling and process improvements to increase leads and sales velocity.",
    href: "https://www.aebrothersroofing.com/",
    tags: ["Lead generation", "Sales ops", "Automation"],
    category: "Operator systems",
  },
  {
    name: "Z Roofing and Waterproofing",
    image: "/images/z_roofing.png",
    description:
      "Internal tooling and AI-assisted roofing workflow improvements that reduced project completion time.",
    href: "https://zroofing.com/",
    tags: ["AI workflow", "Scheduling", "Operations"],
    category: "Operator systems",
  },
  {
    name: "South Florida Pickleball Community League",
    image: null,
    description:
      "Community league operations using DUPR ratings, event coordination, and member systems for local players.",
    tags: ["Community", "Operations", "Ratings"],
    category: "Community systems",
  },
];

export const labTracks: LabTrack[] = [
  {
    title: "Demo systems that teach quickly",
    description:
      "AI-assisted product surfaces that help technical users understand a platform in minutes instead of after a long onboarding cycle.",
    outputs: ["guided demo flows", "failure-state handling", "explainable UI"],
  },
  {
    title: "Developer experience agents",
    description:
      "Assistants that shorten onboarding, explain APIs, debug integrations, and move builders from docs to working code.",
    outputs: ["docs copilots", "integration debugging", "reference generation"],
  },
  {
    title: "Operator workflow automation",
    description:
      "Applied AI systems for sales, support, and construction operations where the output has to be usable by non-technical teams.",
    outputs: ["lead routing", "ops copilots", "internal tooling"],
  },
];

export const strengthAreas = [
  "Applied AI demos",
  "API architecture",
  "Reference apps",
  "Developer docs",
  "Technical discovery",
  "Customer enablement",
  "Solutions engineering",
  "Product feedback loops",
];

export const techStack = [
  { name: "TypeScript", logo: "/images/typescript-logo.png" },
  { name: "React", logo: "/images/react-logo.png" },
  { name: "Next.js", logo: "/images/next-logo.svg" },
  { name: "Node.js", logo: "/images/nodejs-logo.png" },
  { name: "Python", logo: "/images/python-logo.png" },
  { name: "AWS", logo: "/images/aws-logo.png" },
  { name: "GCP", logo: "/images/gcp-logo.png" },
  { name: "Docker", logo: "/images/docker-logo.png" },
];

export const contactChannels = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/esteban-chirinos/",
    detail: "Best for recruiting and role conversations.",
  },
  {
    label: "GitHub",
    href: "https://github.com/echirinos",
    detail: "Code samples, experiments, and reference work.",
  },
  {
    label: "Blog",
    href: "https://world.hey.com/echi/",
    detail: "Writing on work, systems, and product thinking.",
  },
];
