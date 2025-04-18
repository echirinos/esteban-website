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
      <h1 className="text-2xl font-medium tracking-tighter mb-8">my work</h1>
      <div className="space-y-8">
        <p className="mb-6 text-base-content">
          I thrive on building innovative solutions and tackling diverse
          projects. From leading the design and rollout of blockchain
          intelligence tools to spearheading web3 solutions and managing cloud
          migrations, my journey has been all about creating impactful
          technology. Here's a summary of my work so far.
        </p>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="Coinbase logomark"
                src="/images/coinbase.svg"
                className="mr-2 h-5 w-5"
              />
              Coinbase
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Technical Services Engineer, March 2024 - Present
            </p>
            <p className="text-base-content mb-4">
              As a Technical Services Engineer at Coinbase, I provide deep
              technical support for the Coinbase Developer Platform (CDP),
              collaborating closely with developers and enterprise customers. My
              responsibilities include:
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Leading the technical integration and onboarding of developers
                onto CDP APIs and SDKs.
              </li>
              <li>
                Designing optimal, scalable integration architectures and
                providing best practice guidance.
              </li>
              <li>
                Troubleshooting complex technical issues through log analysis,
                code reviews (TypeScript/Javascript, Python primarily), and
                internal reproduction.
              </li>
              <li>
                Authoring and maintaining comprehensive technical documentation,
                including runbooks, troubleshooting guides, and multi-language
                code samples (TS/JS, Python, Java, C#).
              </li>
              <li>
                Contributing to product improvements by analyzing developer
                feedback and collaborating with Product, Engineering, and Sales
                teams.
              </li>
              <li>
                Participating in on-call rotations and supporting developers via
                Discord and during hackathons.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="TRM Labs logomark"
                src="/images/Trm-labs.svg"
                className="mr-2 h-5 w-5"
              />
              TRM Labs
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Staff Solutions Architect, June 2023 - Present
            </p>
            <p className="text-base-content mb-4">
              Leading the tailored design and rollout of TRM Labs API, a leading
              blockchain intelligence tool that provides financial institutions
              and governments with the tools and data to fight crypto-based
              financial crime.
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Steering the design and delivery of TRM API integration
                solutions for 40+ projects, transforming client requirements
                into tailored platform customizations, leading to a 30% uptick
                in client success and satisfaction rates.
              </li>
              <li>
                Championing 60+ high-impact technical client discovery sessions
                to increase TRM's technology suite adoption by 25% and ensure a
                high level of alignment rate between client visions and platform
                capabilities.
              </li>
              <li>
                Standardizing integration resources, launching 10+ advanced
                dashboard tools and refining API documentation, raising the bar
                for integration quality and leading to a 35% CSAT improvement in
                client and internal feedback.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="Polygon logomark"
                src="/images/polygon-matic-icon.svg"
                className="mr-2 h-5 w-5"
              />
              Polygon Labs
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Solutions Engineer, August 2022 - February 2023
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Spearheaded cutting-edge web3 solutions for the Entertainment,
                DeFi, and NFT sectors, significantly boosting client
                satisfaction and retention rates. Delivered tailored solutions
                that drove increased adoption and customer engagement.
              </li>
              <li>
                Standardized the operational strategy for the solutions
                engineering and support teams, comprising 12 members, enhancing
                team efficiency and effectiveness in meeting customer needs and
                interfacing with external teams.
              </li>
              <li>
                Developed and showcased Proof-of-Concept (POC) integrations
                using Next.js and JavaScript, demonstrating to potential
                customers the ease and effectiveness of integrating with
                Polygon's platform. This initiative played a critical role in
                driving further adoption and engagement with the platform.
              </li>
              <li>
                Successfully recommended, architected, and delivered innovative
                web3 solutions, resulting in a measurable increase in customer
                satisfaction and retention within the Entertainment, DeFi, and
                NFT industries.
              </li>
              <li>
                Played a pivotal role in driving Polygon integration by
                developing comprehensive integration solutions, further
                solidifying Polygon's position as a leading web3 platform.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="OpenSea logomark"
                src="/images/opensea.svg"
                className="mr-2 h-5 w-5"
              />
              OpenSea
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Developer Relations Engineer and Product Manager Rotation, January
              2022 - July 2022
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Spearheaded product management for the developer community,
                owning comprehensive documentation, robust sample code (Python
                and JS), and best practices. Effectively distilled actionable
                feedback for product engineering and cross-functional teams,
                enhancing overall product quality and user satisfaction.
              </li>
              <li>
                Directed the architecture of partner engineering strategy,
                adeptly engaging and resolving technical issues with key
                partners such as Consensys, Snap, Instagram, Coinbase, Yuga
                Labs, Rarible, MoonPay, and Cool Cats. This initiative
                culminated in a streamlined redesign of the partner relationship
                management tracker, significantly improving team efficiency.
              </li>
              <li>
                Oversaw level 2 developer support, expertly addressing complex
                partner and developer queries, ensuring swift and accurate
                solutions.
              </li>
            </ul>
            <p className="text-sm text-base-content/80 mb-2">
              Product Manager (Trial), March 2022 - July 2022
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Orchestrated the strategic development of the OpenSea API and
                SDK, prioritizing over 100 developer feature requests. This
                effort led to a substantial increase in NPS scores, a notable
                reduction in support tickets, and higher adoption rates for the
                SDK/API.
              </li>
              <li>
                Implemented a highly efficient Zendesk automation system,
                processing over 400 cases per week and significantly boosting
                developer NPS scores.
              </li>
              <li>
                Drove the development and deployment of an API key distribution
                tool, resulting in a remarkable 30-point NPS score increase and
                establishing a consistent Service Level Agreement (SLA) for API
                performance.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="Google logomark"
                src="/images/google-icon.svg"
                className="mr-2 h-5 w-5"
              />
              Google
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Technical Account Manager, October 2020 - January 2022
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Selected for Google's prestigious internal rotational Software
                Engineering Bootcamp, an exclusive program with only 40 out of
                500 candidates accepted. Shipped code that met Google's rigorous
                engineering standards and completed rotations across various
                teams.
              </li>
              <li>
                Coached enterprise customers to architect and deploy critical
                cloud solutions, ensuring optimal performance and alignment with
                business objectives. Successfully managed multiple accounts,
                contributing to a total of $217M in managed customer revenue.
              </li>
              <li>
                Led an AWS to GCP BigQuery/Dataproc migration for a new
                customer, providing comprehensive support, technical guidance,
                and project management. This initiative resulted in over $300K
                revenue growth, with GCP spend increasing by more than 10% each
                month.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="Microsoft logomark"
                src="/images/Microsoft_logo.svg"
                className="mr-2 h-5 w-5"
              />
              Microsoft
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Software Engineer Intern, May 2020 - August 2020
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Developed a telemetry monitoring application for the Microsoft
                Azure Cloud Supply Chain using C#, .NET, Kusto Query Language
                (KQL), PowerBI, Azure Data Factory, and other Azure services.
              </li>
              <li>
                Created dashboards and analytics tools enabling the team to
                monitor supply chain performance, identify bottlenecks, and
                optimize resource allocation, enhancing overall efficiency.
              </li>
              <li>
                Achieved a 30% improvement in the efficiency of the Azure
                Machine Learning Supply Chain by developing and implementing
                optimized telemetry solutions.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="JPMorgan Chase logomark"
                src="/images/J_P_Morgan_Logo_2008.svg"
                className="mr-2 h-5 w-5"
              />
              JPMorgan Chase & Co.
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Software Engineer Intern, May 2019 - August 2019
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Engineered and deployed a web application using React, Spring
                Boot, and PostgreSQL, streamlining the process for investment
                bankers to manage and monitor deals, enhancing operational
                efficiency.
              </li>
              <li>
                Collaborated closely with product managers and senior engineers
                to gather requirements, design features, and implement
                solutions, ensuring alignment with business goals and user
                needs.
              </li>
              <li>
                Contributed to the development of RESTful APIs and database
                schemas, focusing on scalability, reliability, and security best
                practices, improving system robustness.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
