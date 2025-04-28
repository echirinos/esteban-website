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

      {/* Project 1 - Wrap in Card */}
      <div className="card card-bordered bg-base-100 shadow-sm mb-10">
        <div className="card-body">
          <figure className="mb-4" style={{ width: "80px", height: "80px" }}>
            {" "}
            {/* Use figure for semantics, control size */}
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
          <div className="card-actions justify-start">
            {" "}
            {/* Use card-actions for link */}
            <a
              href="https://www.quikbuildinnovations.com/"
              className="link link-primary" // Use DaisyUI link style
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit QuikBuild Innovations
            </a>
          </div>
        </div>
      </div>

      {/* Project 2 - Wrap in Card */}
      <div className="card card-bordered bg-base-100 shadow-sm mb-10">
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
          <div className="card-actions justify-start">
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

      {/* Project 3 - Wrap in Card */}
      <div className="card card-bordered bg-base-100 shadow-sm mb-10">
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
            tools and technologies. Achieved a 100% increase in lead generation
            and boosted sales by 20% within three months.
          </p>
          <div className="card-actions justify-start">
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

      {/* Project 4 - Wrap in Card */}
      <div className="card card-bordered bg-base-100 shadow-sm mb-10">
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
            time and a 15% increase in customer satisfaction.
          </p>
          <div className="card-actions justify-start">
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
      {/*
      <div className="mb-10">
        <Image
          alt="QuikBuild Innovations"
          src="/images/Quikbuild.png" // Make sure this is the correct path starting from the "public" directory
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold mt-4">QuikBuild Innovations</h3>
        <p className="mb-4">
          An agency that unleashes the potential of automation and modern
          software solutions to transform your construction company.
        </p>
        <a
          href="https://www.quikbuildinnovations.com/"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.quikbuildinnovations.com/
        </a>
      </div>

      <div className="mb-10">
        <Image
          alt="QuikBuild Innovations"
          src="/images/Quikbuild.png" // Make sure this is the correct path starting from the "public" directory
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold mt-4">QuikBuild Innovations</h3>
        <p className="mb-4">
          An agency that unleashes the potential of automation and modern
          software solutions to transform your construction company.
        </p>
        <a
          href="https://www.quikbuildinnovations.com/"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.quikbuildinnovations.com/
        </a>
      </div>

      {/* More projects... */}
    </section>
  );
}
