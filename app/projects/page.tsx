import Image from "next/image";
import React from "react";

export const metadata = {
  title: "My Projects",
  description: "Explore the tools and SaaS products I've developed.",
};

export default function ProjectsPage() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 tracking-tighter">
        Useful tools and SaaS I've made scratching my own itch.
      </h1>
      <p className="mb-12">
        I've worked on tons of little projects over the years but these are the
        ones that I'm most proud of. Many of them are entirely free to use.
        These days, I'm focused on building modern tools for GTM, Sales, and
        Construction teams.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* True Rank Pickleball */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="True Rank Pickleball"
                src="/images/TrueRankLogo.png"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              True Rank Pickleball
            </h3>
            <p className="mb-4">
              A pickleball rating system that provides accurate,
              category-specific ratings for Men's, Women's, and Mixed play
              without advertisements. Built by me!
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://www.truerankpickleball.com/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit True Rank
              </a>
            </div>
          </div>
        </div>

        {/* Creator Tip Application */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Creator Tip"
                src="/images/Coinbase-icon-symbol-1.svg"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Creator Tip Application
            </h3>
            <p className="mb-4">
              A decentralized tipping application built with Next.js and
              OnchainKit that allows users to support creators with
              cryptocurrency payments on Base network.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://creator-tip-onchainkit.vercel.app/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try Creator Tip
              </a>
            </div>
          </div>
        </div>

        {/* Coinbase Onramp Demo App */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Coinbase Onramp"
                src="/images/coinbase.svg"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Coinbase Onramp Demo App
            </h3>
            <p className="mb-4">
              Developed an innovative onramp sample app for Coinbase that now
              serves over 2,000 users each month. This app demonstrates how to
              convert fiat to crypto and bring users onchain with Coinbase
              Onramp.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://onramp-demo-application.vercel.app/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Demo App
              </a>
            </div>
          </div>
        </div>

        {/* Coinbase Onramp Asset Availability Checker */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Coinbase Onramp Asset Checker"
                src="/images/coinbase.svg"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Coinbase Onramp Asset Checker
            </h3>
            <p className="mb-4">
              Built a visual UI for users to track which assets are supported by
              country and state for Coinbase Onramp. This tool helps developers
              determine which cryptocurrencies are available in their region.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://onramp-asset-availability.vercel.app/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Asset Checker
              </a>
            </div>
          </div>
        </div>

        {/* NFT Deployment App */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="NFT Deployment App"
                src="/images/Coinbase-icon-symbol-1.svg"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              NFT Deployment Application
            </h3>
            <p className="mb-4">
              Built an NFT deployment application that leverages the Coinbase
              Developer Platform SDK and Pinata for efficient NFT deployment on
              various blockchain networks.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://docs.cdp.coinbase.com/learn/docs/nft-deployment"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Coinbase Developer Tutorials */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Coinbase Developer Tutorials"
                src="/images/Coinbase-icon-symbol-1.svg"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Coinbase Developer Tutorials
            </h3>
            <p className="mb-4">
              Led live tutorials on Coinbase's official YouTube channel for over
              100 developers covering blockchain integration topics like
              e-commerce crypto payments and OnchainKit development.
            </p>
            <div className="card-actions justify-start flex flex-wrap gap-2 mt-auto">
              <a
                href="https://www.youtube.com/watch?v=pszxxuq7aLo"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accept Crypto on E-commerce Sites
              </a>
              <a
                href="https://www.youtube.com/watch?v=oQxWBEMYfzc"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Build a Payments App
              </a>
              <a
                href="https://www.youtube.com/watch?v=OJnYgZyo7cs"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Build an OnchainKit App
              </a>
            </div>
          </div>
        </div>

        {/* QuikBuild Innovations */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="QuikBuild Innovations"
                src="/images/quikbuild_logo.png"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              QuikBuild Innovations
            </h3>
            <p className="mb-4">
              An agency that unleashes the potential of automation and modern
              software solutions to transform your construction company.
            </p>
            <div className="mt-auto card-actions justify-start">
              <a
                href="https://www.quikbuildinnovations.com/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit QuikBuild Innovations
              </a>
            </div>
          </div>
        </div>

        {/* South Florida Pickleball League */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-base-200 p-2 rounded-md"
              >
                <path
                  d="M40 10C23.4315 10 10 23.4315 10 40C10 56.5685 23.4315 70 40 70C56.5685 70 70 56.5685 70 40C70 23.4315 56.5685 10 40 10Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M40 15V65" stroke="currentColor" strokeWidth="4" />
                <path d="M15 40H65" stroke="currentColor" strokeWidth="4" />
              </svg>
            </figure>
            <h3 className="card-title text-xl font-semibold">
              South Florida Pickleball Community League
            </h3>
            <p className="mb-4">
              Co-founded and manage a community pickleball league in South
              Florida, organizing events and fostering connections for members
              using the official DUPR rating system.
            </p>
          </div>
        </div>

        {/* Klear Sky Roofing */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Klear Sky Roofing"
                src="/images/KlearSky_pic.png"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Klear Sky Roofing LLC
            </h3>
            <p className="mb-4">
              Aside from tech, I love working on DIY projects. So much in fact,
              that I became a Certified Roofing Contractor. Klear Sky Roofing is
              my roofing company.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://klearskyroofing.com"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Klear Sky Roofing
              </a>
            </div>
          </div>
        </div>

        {/* A&E Roofing Brothers */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="AE Roofing"
                src="/images/ae.png"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              A&E Roofing Brothers
            </h3>
            <p className="mb-4">
              Successfully modernized the business, implementing cutting-edge
              tools and technologies. Achieved a 100% increase in lead
              generation and boosted sales by 20% within three months.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://www.aebrothersroofing.com/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit A&E Roofing Brothers
              </a>
            </div>
          </div>
        </div>

        {/* Z Roofing and Waterproofing */}
        <div className="card card-bordered bg-base-100 shadow-sm h-full">
          <div className="card-body">
            <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
              <Image
                alt="Z Roofing"
                src="/images/z_roofing.png"
                width={80}
                height={80}
              />
            </figure>
            <h3 className="card-title text-xl font-semibold">
              Z Roofing and Waterproofing
            </h3>
            <p className="mb-4">
              Fully transformed the business by developing internal tools that
              enhanced scheduling efficiency and integrated AI for roofing
              enhancements, resulting in a 30% reduction in project completion
              time.
            </p>
            <div className="card-actions justify-start mt-auto">
              <a
                href="https://zroofing.com/"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Z Roofing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
