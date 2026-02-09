import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

export default function WorkPage() {
  return (
    <section>
      <h1 className="text-2xl font-medium tracking-tighter mb-8">my work</h1>
      <div className="space-y-8">
        <p className="mb-6 text-base-content">
          I've spent my career at the intersection of engineering and developer
          experience — helping teams ship better products, faster. Here's the
          full timeline.
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
              Deep technical support for the Coinbase Developer Platform (CDP),
              working directly with developers and enterprise customers building
              onchain.
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Lead technical onboarding for developers integrating CDP APIs
                and SDKs.
              </li>
              <li>
                Design integration architectures and provide best-practice
                guidance for scalable onchain applications.
              </li>
              <li>
                Debug complex issues through log analysis, code review (
                <span className="badge badge-primary font-mono text-xs">
                  TypeScript
                </span>
                ,{" "}
                <span className="badge badge-primary font-mono text-xs">
                  Python
                </span>
                ), and internal reproduction.
              </li>
              <li>
                Write and maintain technical docs, runbooks, and multi-language
                code samples (
                <span className="badge badge-primary font-mono text-xs">
                  TS/JS
                </span>
                ,{" "}
                <span className="badge badge-primary font-mono text-xs">
                  Python
                </span>
                ,{" "}
                <span className="badge badge-primary font-mono text-xs">
                  Java
                </span>
                ,{" "}
                <span className="badge badge-primary font-mono text-xs">
                  C#
                </span>
                ).
              </li>
              <li>
                Feed developer pain points back to{" "}
                <span className="badge badge-ghost text-xs">Product</span>,{" "}
                <span className="badge badge-ghost text-xs">Engineering</span>,
                and{" "}
                <span className="badge badge-ghost text-xs">Sales</span> to
                improve the platform.
              </li>
              <li>
                On-call rotation, Discord support, and hackathon mentorship.
              </li>
            </ul>
          </div>
        </div>

        <div className="card card-compact bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <img
                alt="TRM Labs logomark"
                src="/images/Trm-Labs.svg"
                className="mr-2 h-5 w-5"
              />
              TRM Labs
            </h2>
            <p className="text-sm text-base-content/80 mb-2">
              Staff Solutions Architect, June 2023 - February 2024
            </p>
            <p className="text-base-content mb-4">
              Designed and rolled out TRM's API integrations for financial
              institutions and government agencies fighting crypto-based
              financial crime.
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Delivered 40+ custom API integration solutions, translating
                client requirements into platform configurations — 30% lift in
                client satisfaction.
              </li>
              <li>
                Ran 60+ technical discovery sessions to drive product adoption
                (25% increase) and align platform capabilities with client
                needs.
              </li>
              <li>
                Built 10+ dashboard tools and improved API docs, raising
                integration quality and CSAT scores by 35%.
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
                Built and shipped web3 solutions for Entertainment, DeFi, and
                NFT clients, driving adoption and retention.
              </li>
              <li>
                Standardized operations for the 12-person solutions engineering
                team, improving how we worked with external partners.
              </li>
              <li>
                Built proof-of-concept integrations in{" "}
                <span className="badge badge-primary font-mono text-xs">
                  Next.js
                </span>{" "}
                and{" "}
                <span className="badge badge-primary font-mono text-xs">
                  JavaScript
                </span>{" "}
                to show prospects how easy it was to build on Polygon.
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
              Developer Relations Engineer, January 2022 - July 2022
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Owned developer-facing docs, sample code (
                <span className="badge badge-primary font-mono text-xs">
                  Python
                </span>
                ,{" "}
                <span className="badge badge-primary font-mono text-xs">
                  JS
                </span>
                ), and best practices. Funneled developer feedback back to
                product engineering.
              </li>
              <li>
                Managed partner engineering relationships with Consensys, Snap,
                Instagram, Coinbase, Yuga Labs, Rarible, MoonPay, and Cool
                Cats.
              </li>
              <li>
                Handled L2 developer support — complex partner and developer
                queries.
              </li>
            </ul>
            <p className="text-sm text-base-content/80 mb-2">
              Product Manager (Trial), March 2022 - July 2022
            </p>
            <ul className="text-base-content list-disc pl-5 space-y-2 mb-4">
              <li>
                Prioritized 100+ developer feature requests for the{" "}
                <span className="badge badge-secondary text-xs">
                  OpenSea API
                </span>{" "}
                and{" "}
                <span className="badge badge-secondary text-xs">SDK</span>,
                improving NPS and cutting support tickets.
              </li>
              <li>
                Set up{" "}
                <span className="badge badge-info text-xs">Zendesk</span>{" "}
                automation handling 400+ cases/week.
              </li>
              <li>
                Built and shipped an API key distribution tool — 30-point NPS
                increase.
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
                Selected for Google's internal Software Engineering Bootcamp
                (40 of 500 accepted). Shipped production code across multiple
                team rotations.
              </li>
              <li>
                Helped enterprise customers architect and deploy cloud
                solutions. Managed accounts totaling $217M in customer revenue.
              </li>
              <li>
                Led an AWS → GCP BigQuery/Dataproc migration for a new
                customer, driving $300K+ in revenue growth with 10%+ monthly
                GCP spend increases.
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
                Built a telemetry monitoring app for Azure Cloud Supply Chain
                using C#, .NET, KQL, PowerBI, and Azure Data Factory.
              </li>
              <li>
                Created dashboards to track supply chain performance, spot
                bottlenecks, and optimize resource allocation.
              </li>
              <li>
                Improved Azure ML Supply Chain efficiency by 30% through
                optimized telemetry.
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
                Built a React + Spring Boot + PostgreSQL web app for investment
                bankers to manage and track deals.
              </li>
              <li>
                Worked with PMs and senior engineers on requirements, design,
                and implementation.
              </li>
              <li>
                Built RESTful APIs and database schemas with a focus on
                scalability and security.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
