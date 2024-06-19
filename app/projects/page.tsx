import Image from "next/image";
import React from "react";

export const metadata = {
  title: "My Projects",
  description: "Explore the tools and SaaS products I’ve developed.",
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

      {/* Project 1 */}
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

      {/* Project 2 */}
      <div className="mb-10">
        <Image
          alt="QuikBuild Innovations"
          src="/images/KlearSky.png" // Make sure this is the correct path starting from the "public" directory
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold mt-4">Klear Sky Roofing LLC</h3>
        <p className="mb-4">
          Aside from tech, I love working on DIY projects. So much in fact, that
          I became a Certified Roofing Contractor. Klear Sky Roofing is my
          roofing company.
        </p>
        <a
          href="https://klearskyroofing.com"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://klearskyroofing.com
        </a>
      </div>

      <div className="mb-10">
        <Image
          alt="AE Roofing"
          src="/ae.png" // Make sure this is the correct path starting from the "public" directory
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold mt-4">A&E Roofing Brothers</h3>
        <p className="mb-4">
          A roofing company where I completely modernizing their business and
          building new tools to help them manage their business. Doubled leads
          and increased sales by 20%
        </p>
        <a
          href="https://www.aebrothersroofing.com/"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.aebrothersroofing.com/
        </a>
      </div>

      <div className="mb-10">
        <Image
          alt="Z Roofing"
          src="/z_roofing.png" // Make sure this is the correct path starting from the "public" directory
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold mt-4">
          Z Roofing and Waterproofing
        </h3>
        <p className="mb-4">
          Completelety modernized their busioness and built intenral tools that
          improved scheduling and incorporated AI for roofing improvements.
        </p>
        <a
          href="https://zroofing.com/"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zroofing.com/
        </a>
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
