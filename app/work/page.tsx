import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

async function Stars() {
  let res = await fetch("https://api.github.com/repos/vercel/next.js");
  let json = await res.json();
  let count = Math.round(json.stargazers_count / 1000);
  return `${count}k stars`;
}

export default function WorkPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I thrive on building innovative solutions and tackling diverse
          projects. From leading the design and rollout of blockchain
          intelligence tools to spearheading web3 solutions and managing cloud
          migrations, my journey has been all about creating impactful
          technology. Here's a summary of my work so far.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="Coinbase logomark"
            src="/images/coinbase.svg"
            className="!mr-2 h-5 w-5"
          />
          Coinbase
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Technical Services Engineer, March 2024 - Present
        </p>
        <p className="prose prose-neutral dark:prose-invert">
          As a Technical Services Engineer at Coinbase, I provide deep technical
          support for the Coinbase Developer Platform (CDP), collaborating
          closely with developers and enterprise customers. My responsibilities
          include:
        </p>
        <ul className="prose prose-neutral dark:prose-invert list-disc pl-5">
          <li>
            Leading the technical integration and onboarding of developers onto
            CDP APIs and SDKs.
          </li>
          <li>
            Designing optimal, scalable integration architectures and providing
            best practice guidance.
          </li>
          <li>
            Troubleshooting complex technical issues through log analysis, code
            reviews (TypeScript/Javascript, Python primarily), and internal
            reproduction.
          </li>
          <li>
            Authoring and maintaining comprehensive technical documentation,
            including runbooks, troubleshooting guides, and multi-language code
            samples (TS/JS, Python, Java, C#).
          </li>
          <li>
            Contributing to product improvements by analyzing developer feedback
            and collaborating with Product, Engineering, and Sales teams.
          </li>
          <li>
            Participating in on-call rotations and supporting developers via
            Discord and during hackathons.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="TRM Labs logomark"
            src="/images/Trm-labs.svg"
            className="!mr-2 h-5 w-5"
          />
          TRM Labs
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Staff Solutions Architect, June 2023 - Present
        </p>
        <p>
          Leading the tailored design and rollout of TRM Labs API, a leading
          blockchain intelligence tool that provides financial institutions and
          governments with the tools and data to fight crypto-based financial
          crime.
        </p>
        <ul>
          <li>
            Steering the design and delivery of TRM API integration solutions
            for 40+ projects, transforming client requirements into tailored
            platform customizations, leading to a 30% uptick in client success
            and satisfaction rates.
          </li>
          <li>
            Championing 60+ high-impact technical client discovery sessions to
            increase TRM's technology suite adoption by 25% and ensure a high
            level of alignment rate between client visions and platform
            capabilities.
          </li>
          <li>
            Standardizing integration resources, launching 10+ advanced
            dashboard tools and refining API documentation, raising the bar for
            integration quality and leading to a 35% CSAT improvement in client
            and internal feedback.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="Polygon logomark"
            src="/images/polygon-matic-icon.svg"
            className="!mr-2 h-5 w-5"
          />
          Polygon Labs
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Solutions Engineer, August 2022 - February 2023
        </p>
        <ul>
          <li>
            Spearheaded cutting-edge web3 solutions for the Entertainment, DeFi,
            and NFT sectors, significantly boosting client satisfaction and
            retention rates. Delivered tailored solutions that drove increased
            adoption and customer engagement.
          </li>
          <li>
            Standardized the operational strategy for the solutions engineering
            and support teams, comprising 12 members, enhancing team efficiency
            and effectiveness in meeting customer needs and interfacing with
            external teams.
          </li>
          <li>
            Developed and showcased Proof-of-Concept (POC) integrations using
            Next.js and JavaScript, demonstrating to potential customers the
            ease and effectiveness of integrating with Polygon's platform. This
            initiative played a critical role in driving further adoption and
            engagement with the platform.
          </li>
          <li>
            Successfully recommended, architected, and delivered innovative web3
            solutions, resulting in a measurable increase in customer
            satisfaction and retention within the Entertainment, DeFi, and NFT
            industries.
          </li>
          <li>
            Played a pivotal role in driving Polygon integration by developing
            comprehensive integration solutions, further solidifying Polygon's
            position as a leading web3 platform.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="OpenSea logomark"
            src="/images/opensea.svg"
            className="!mr-2 h-5 w-5"
          />
          OpenSea
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Developer Relations Engineer and Product Manager Rotation, January
          2022 - July 2022
        </p>
        <ul>
          <li>
            Spearheaded product management for the developer community, owning
            comprehensive documentation, robust sample code (Python and JS), and
            best practices. Effectively distilled actionable feedback for
            product engineering and cross-functional teams, enhancing overall
            product quality and user satisfaction.
          </li>
          <li>
            Directed the architecture of partner engineering strategy, adeptly
            engaging and resolving technical issues with key partners such as
            Consensys, Snap, Instagram, Coinbase, Yuga Labs, Rarible, MoonPay,
            and Cool Cats. This initiative culminated in a streamlined redesign
            of the partner relationship management tracker, significantly
            improving team efficiency.
          </li>
          <li>
            Oversaw level 2 developer support, expertly addressing complex
            partner and developer queries, ensuring swift and accurate
            solutions.
          </li>
        </ul>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Product Manager (Trial), March 2022 - July 2022
        </p>
        <ul>
          <li>
            Orchestrated the strategic development of the OpenSea API and SDK,
            prioritizing over 100 developer feature requests. This effort led to
            a substantial increase in NPS scores, a notable reduction in support
            tickets, and higher adoption rates for the SDK/API.
          </li>
          <li>
            Implemented a highly efficient Zendesk automation system, processing
            over 400 cases per week and significantly boosting developer NPS
            scores.
          </li>
          <li>
            Drove the development and deployment of an API key distribution
            tool, resulting in a remarkable 30-point NPS score increase and
            establishing a consistent Service Level Agreement (SLA) for API
            performance.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="Google logomark"
            src="/images/google-icon.svg"
            className="!mr-2 h-5 w-5"
          />
          Google
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Technical Account Manager, October 2020 - January 2022
        </p>
        <ul>
          <li>
            Selected for Google's prestigious internal rotational Software
            Engineering Bootcamp, an exclusive program with only 40 out of 500
            candidates accepted. Shipped code that met Google's rigorous
            engineering standards and completed rotations across various teams.
          </li>
          <li>
            Coached enterprise customers to architect and deploy critical cloud
            solutions, ensuring optimal performance and alignment with business
            objectives. Successfully managed multiple accounts, contributing to
            a total of $217M in managed customer revenue.
          </li>
          <li>
            Led an AWS to GCP BigQuery/Dataproc migration for a new customer,
            providing comprehensive support, technical guidance, and project
            management. This initiative resulted in over $300K revenue growth,
            with GCP spend increasing by more than 10% each month.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="Microsoft logomark"
            src="/images/Microsoft_logo.svg"
            className="!mr-2 h-5 w-5"
          />
          Microsoft
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Technical Account Manager, July 2019 – October 2020
        </p>
        <ul>
          <li>
            Managed 20+ enterprise accounts utilizing Microsoft's full suite of
            products, including Azure and Office 365, maintaining direct
            communication with executives. Achieved a 50% annual increase in
            revenue for Azure and Office, and improved customer uptime by 30%.
          </li>
          <li>
            Orchestrated on-premises to cloud migrations for over 10 accounts,
            completing 100% of the migrations ahead of schedule, demonstrating
            exceptional project management and technical expertise.
          </li>
          <li>
            Headed the Modern Workplace team, providing innovative internal
            tools and training programs to over 40 account managers, enhancing
            overall team performance and customer satisfaction.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="flex items-center font-medium text-xl mb-1 tracking-tighter">
          <img
            alt="JPMorgan Chase logomark"
            src="/images/J_P_Morgan_Logo_2008.svg"
            className="!mr-2 h-5 w-5"
          />
          JPMorgan Chase
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Software Engineering Intern, New York, New York, June 2018 - August
          2018
        </p>
        <ul>
          <li>
            Designed and implemented a centralized rule engine, reducing rule
            modification time by 40%, allowing Wealth Management users to easily
            modify business function rules and manage operations.
          </li>
          <li>
            Created a Business Rule Management System, cutting the cost and risk
            of modifying rules by 35%.
          </li>
          <li>
            Enhanced user experience by implementing a user interface that
            simplified rule functionality, resulting in a 25% increase in user
            satisfaction.
          </li>
        </ul>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Software Engineering Intern, Houston, Texas, June 2017 - August 2017
        </p>
        <ul>
          <li>
            Implemented a quality assurance dashboard that improved tech team
            productivity metrics visibility by 50%.
          </li>
          <li>
            Analyzed level of productivity by running SQL queries in HP ALM tool
            database, leading to a 20% increase in process efficiency.
          </li>
          <li>
            Streamlined efficiencies by designing features such as project
            tracking, defect report, and requirement mappings, which enhanced
            overall project delivery time by 30%.
          </li>
          <li>
            Collaborated with the cloud migration team to test data on the
            internal cloud platform, improving data migration accuracy by 15%.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">Education</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Hack Reactor, Advanced Software Engineering Certificate, Graduated
          2022
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Florida International University, Bachelors in Computer Science,
          Graduated 2019
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Skills & Interests
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Expertise: Cloud Infrastructure, Process Automation, NFT's, Web3,
          Strategy, Partner Development
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Technologies & Languages: JavaScript, Next.js, Vercel, Python, React,
          SQL, Solidity, Django, Flask, WordPress, NodeJS
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Certificates: GCP Professional Cloud Architect, Azure Fundamentals,
          HVAC Technician
        </p>
      </div>
    </section>
  );
}
