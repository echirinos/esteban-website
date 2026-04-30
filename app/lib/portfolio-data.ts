export type Metric = {
  value: string;
  label: string;
};

export type EducationCredential = {
  school: string;
  credential: string;
  emphasis: string;
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
  { value: "$20M", label: "Revenue impact supported" },
  { value: "30+", label: "Strategic partner integrations" },
  { value: "2,000+", label: "Monthly demo users" },
  { value: "100+", label: "Developer insights translated" },
  { value: "40+", label: "Customer solutions delivered" },
];

export const roleFit = [
  "Applied AI Architect",
  "Technical Product Manager",
  "Developer Experience",
  "Demo Engineering",
  "AI Deployment",
  "Partner Solutions",
];

export const educationCredentials: EducationCredential[] = [
  {
    school: "Berkeley Haas",
    credential: "MBA, expected 2028",
    emphasis: "Product strategy, leadership, and go-to-market judgment.",
  },
  {
    school: "Florida International University",
    credential: "B.S. Computer Science, 2019",
    emphasis: "Engineering foundation for platform, API, and AI product work.",
  },
];

export const certificationHighlights = [
  "GCP Professional Cloud Architect",
  "AWS Solutions Architect",
  "Azure Fundamentals",
  "Hack Reactor Software Engineering Certificate",
  "Certified Roofing Contractor",
];

export const workExperiences: WorkExperience[] = [
  {
    name: "Coinbase",
    logo: "/images/coinbase.svg",
    role: "Senior Technical Solutions Engineer",
    period: "April 2024 - Present",
    url: "https://www.coinbase.com/developer-platform",
    summary:
      "Customer-facing platform work for Coinbase Developer Platform across Onramp, Embedded Wallets, Advanced Trade, x402, AgentKit, and CDP products, turning developer pain points into demos, onboarding systems, technical guidance, AI workflows, and product feedback.",
    tags: ["Developer platform", "AI workflows", "Partner integrations"],
    impact: [
      "Led 30+ strategic partner integrations across Onramp, Embedded Wallets, and Advanced Trade, supporting $20M in revenue impact.",
      "Built AI-enabled workflows across Salesforce, Slack, developer docs, and support operations, helping reduce escalations by 30%.",
      "Developed production-grade demos, reference implementations, and integration tooling across Onramp, x402, Embedded Wallets, AgentKit, and CDP Wallets, totaling 58,000+ lines of code.",
      "Delivered 100+ developer documentation updates across API tutorials, SDK migrations, onboarding guides, and sample apps.",
      "Translated 100+ weekly developer insights into product recommendations, including Apple Pay checkout optimization that reduced Onramp checkout time by 35%.",
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
      "Owned discovery-heavy solution design for regulated customers, connecting financial crime workflows, API capabilities, and product requirements through custom integrations and dashboard tooling.",
    tags: ["Discovery", "API products", "Regulated customers"],
    impact: [
      "Delivered 40+ custom API integration solutions for regulated customers, increasing client satisfaction by 30%.",
      "Ran 60+ technical discovery sessions, lifting TRM technology-suite adoption by 25%.",
      "Built 10+ dashboard tools and converted field learnings into clearer reference patterns, improving client feedback by 35%.",
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
      "Built partner proof-of-concepts and solution narratives that helped teams evaluate web3 product opportunities across entertainment, DeFi, and NFT use cases.",
    tags: ["POCs", "Partner strategy", "Web3 products"],
    impact: [
      "Built and shipped web3 solutions across entertainment, DeFi, and NFT clients, impacting 15+ customers.",
      "Streamlined team operations, reducing workflow delays by 40%.",
      "Developed and showcased proof-of-concept integrations, increasing adoption by 20% and engagement by 35%.",
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
      "Worked across developer relations and product feedback for marketplace developers, owning docs, sample code, API request triage, partner engineering, and support automation.",
    tags: ["API feedback", "Developer products", "Prioritization"],
    impact: [
      "Owned developer-facing docs, code samples, and partner engineering support.",
      "Co-led API and SDK product strategy during a Product Manager rotation, prioritizing 100+ developer requests.",
      "Improved support operations across 400 weekly cases through API key distribution and support automation systems.",
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
      "Supported cloud architecture and customer success for strategic accounts, connecting migration goals, technical enablement, and account health for enterprise users.",
    tags: ["Cloud", "Enterprise revenue", "Customer success"],
    impact: [
      "Managed $217M in enterprise revenue while coaching customers to architect and deploy critical cloud solutions.",
      "Led an AWS-to-GCP BigQuery and Dataproc migration that contributed $300K+ in revenue growth and 10%+ monthly GCP spend expansion.",
    ],
  },
  {
    name: "Microsoft",
    logo: "/images/Microsoft_logo.svg",
    role: "Technical Account Manager",
    period: "July 2019 - October 2020",
    url: "https://www.microsoft.com/",
    summary:
      "Managed enterprise accounts across Azure, Office, and Microsoft's enterprise suite while building internal tools and training for account teams.",
    tags: ["Azure", "Enterprise accounts", "Internal tools"],
    impact: [
      "Managed 40+ enterprise accounts, contributing to 50% annual Azure and Office revenue growth.",
      "Led Modern Workplace internal tooling and training for 40+ account managers and helped improve customer uptime by 30%.",
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
  "Developer experience",
  "Agentic workflows",
  "LLM evaluation",
  "Technical product strategy",
  "API architecture",
  "Technical discovery",
  "Voice of customer",
  "Customer enablement",
  "Partner solutions",
  "Reference apps",
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
