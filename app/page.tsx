import { Suspense } from "react";
import Link from "next/link";
import ViewCounter from "app/blog/view-counter";
import { PreloadResources } from "app/preload";
import { getViewsCount } from "app/db/queries";

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

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="link link-hover flex w-full items-center justify-between py-2"
      >
        <div className="flex flex-col">
          <p className="font-medium">{name}</p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <div className="card w-full bg-base-100 shadow-sm border border-primary/20 mb-8">
        <div className="card-body text-center">
          <h1 className="card-title text-4xl font-bold tracking-tighter mb-4 mx-auto">
            hey, I'm esteban 👋
          </h1>
          <p className="text-base-content/80">
            I'm a versatile engineer, optimist, community builder, educator,
            sales enthusiast, and real estate aficionado with a passion for
            technology, music, and DIY projects.
          </p>
          <div className="card-actions justify-center mt-4">
            <Link href="/work" className="btn btn-primary btn-md">
              See My Work
            </Link>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Current Role
      </h2>
      <div className="card bg-base-100 border-l-4 border-accent shadow-sm p-4 mt-4">
        <div className="card-body p-2">
          <div className="flex items-center mb-3">
            <img
              alt="Coinbase logomark"
              src="/images/coinbase.svg"
              className="h-6 w-6 mr-2"
            />
            <h3 className="card-title text-lg">
              Technical Services Engineer at Coinbase
            </h3>
          </div>
          <p className="text-base-content/80 mb-3">
            I empower developers building on the Coinbase Developer Platform
            (CDP).
          </p>
          <p className="text-base-content/80">
            My role involves providing architectural guidance, troubleshooting
            complex integration challenges, creating technical documentation and
            sample code (primarily using Python and TypeScript), and advocating
            for developer needs to enhance our products. I thrive on
            collaborating with development teams to ensure they successfully
            leverage CDP's APIs and SDKs to build the future of the onchain
            economy.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Past Experiences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <a
          href="https://www.trmlabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="TRM Labs logomark"
                  src="/images/trm.jpeg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">TRM Labs</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Blockchain intelligence solutions
              </p>
            </div>
          </div>
        </a>

        <a
          href="https://polygon.technology"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="Polygon logomark"
                  src="/images/polygon-matic-icon.svg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">Polygon</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Ethereum scaling platform
              </p>
            </div>
          </div>
        </a>

        <a
          href="https://opensea.io"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="OpenSea logomark"
                  src="/images/opensea.svg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">OpenSea</h3>
              </div>
              <p className="text-sm text-base-content/70">NFT marketplace</p>
            </div>
          </div>
        </a>

        <a
          href="https://about.google"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="Google logomark"
                  src="/images/google-icon.svg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">Google</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Technology and services
              </p>
            </div>
          </div>
        </a>

        <a
          href="https://www.microsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="Microsoft logomark"
                  src="/images/Microsoft_logo.svg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">Microsoft</h3>
              </div>
              <p className="text-sm text-base-content/70">
                Software and computing
              </p>
            </div>
          </div>
        </a>

        <a
          href="https://www.jpmorganchase.com"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline cursor-pointer group"
        >
          <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
            <div className="card-body p-4">
              <div className="flex items-center gap-2">
                <img
                  alt="JPMorgan Chase logomark"
                  src="/images/J_P_Morgan_Logo_2008.svg"
                  className="w-6 h-6 rounded-full"
                />
                <h3 className="card-title text-lg">JPMorgan Chase</h3>
              </div>
              <p className="text-sm text-base-content/70">Financial services</p>
            </div>
          </div>
        </a>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Professional Strengths
      </h2>
      <div className="card card-bordered bg-base-100 shadow-sm my-4">
        <div className="card-body text-base-content">
          <p className="mb-4">Reflecting back, my career has been built on:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Strategic thinking</li>
            <li>Continuous learning</li>
            <li>Impactful contributions</li>
          </ul>
          <p className="mb-4">
            I excel at creating innovative solutions that drive success and
            growth for both my team and our clients. Building strong alliances
            and a robust personal brand has been key to my achievements.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Beyond My Technical Expertise
      </h2>
      <div className="card card-bordered bg-base-100 shadow-sm my-4">
        <div className="card-body text-base-content">
          <p className="mb-4">I am passionate about:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Exploring new market opportunities</li>
            <li>Crafting compelling value propositions</li>
            <li>Building lasting relationships with clients</li>
          </ul>
          <p className="mb-4">
            These interests enhance my ability to deliver holistic and impactful
            solutions.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Personal Interests
      </h2>
      <div className="card card-bordered bg-base-100 shadow-sm my-4">
        <div className="card-body text-base-content">
          <p className="mb-4">
            Outside of work, I am an avid reader, DIY enthusiast, music lover,
            and sports enthusiast (basketball and more!)
          </p>
          <p className="mb-4">
            These activities fuel my creativity and provide a well-rounded
            perspective essential for innovative problem-solving. In my free
            time, you can find me working on real estate projects, playing
            basketball, offering guidance, drinking espresso, or reading a book
            ...all while likely brainstorming my next big project with my laptop
            open!
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Core Skills & Technologies
      </h2>
      <div className="grid grid-cols-2 gap-4 my-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/python-logo.png" alt="Python" className="h-12" />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img
              src="/images/typescript-logo.png"
              alt="TypeScript"
              className="h-12"
            />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img
              src="/images/javascript-logo.png"
              alt="JavaScript"
              className="h-12"
            />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/react-logo.png" alt="React" className="h-12" />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/nodejs-logo.png" alt="Node.js" className="h-12" />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/aws-logo.png" alt="AWS" className="h-12" />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/gcp-logo.png" alt="GCP" className="h-12" />
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="card-body flex items-center justify-center p-4">
            <img src="/images/docker-logo.png" alt="Docker" className="h-12" />
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Thoughts & Ideas
      </h2>
      <div className="card bg-base-100 border border-base-200 shadow-sm p-6 mt-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/blog"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-outline hover:bg-primary hover:border-primary gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-journal-text"
              viewBox="0 0 16 16"
            >
              <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3z" />
            </svg>
            Blog
          </a>

          <a
            href="https://x.com/estebano_c"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-outline hover:bg-accent hover:border-accent text-neutral hover:text-neutral gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
            Twitter
          </a>

          <a
            href="https://github.com/echirinos"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-outline hover:bg-base-300 hover:border-base-300 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/esteban-chirinos/"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-outline hover:bg-primary hover:border-primary gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
            LinkedIn
          </a>

          <a
            href="/contact"
            className="btn btn-outline hover:bg-accent hover:border-accent text-neutral hover:text-neutral gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-envelope"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            Contact
          </a>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">Contact</h2>
      <p className="mb-4 text-base-content">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Feel free to reach out through
        any of the platforms below.
      </p>
      <div className="mt-8 flex justify-start">
        <Link href="/contact" className="btn btn-primary">
          Let's Chat
        </Link>
      </div>
    </section>
  );
}
