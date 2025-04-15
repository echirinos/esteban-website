import { Suspense } from "react";
import Link from "next/link";
import ViewCounter from "app/blog/view-counter";
import { PreloadResources } from "app/preload";
import { getViewsCount } from "app/db/queries";

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

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
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
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
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        hey, I'm esteban 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        I'm a versatile engineer, optimist, community builder, educator, sales
        enthusiast, and real estate aficionado with a passion for technology,
        music, and DIY projects.
      </p>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Current Role
      </h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          As a Technical Services Engineer at{" "}
          <Badge href="https://www.coinbase.com">
            <img
              alt="Coinbase logomark"
              src="/images/coinbase.svg"
              className="!mr-1 h-4 w-4"
            />
            Coinbase
          </Badge>
          , I empower developers building on the Coinbase Developer Platform
          (CDP).
        </p>
        <p>
          My role involves providing architectural guidance, troubleshooting
          complex integration challenges, creating technical documentation and
          sample code (primarily using Python and TypeScript), and advocating
          for developer needs to enhance our products. I thrive on collaborating
          with development teams to ensure they successfully leverage CDP's APIs
          and SDKs to build the future of the onchain economy.
        </p>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Past Experiences
      </h2>
      <p className="prose prose-neutral dark:text-neutral-400">
        I have made significant contributions at innovative companies including:
        <Badge href="https://www.trmlabs.com">
          <img
            alt="TRM Labs logomark"
            src="/images/Trm-labs.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          TRM Labs
        </Badge>
        ,
        <Badge href="https://polygon.technology">
          <img
            alt="Polygon logomark"
            src="/images/polygon-matic-icon.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Polygon
        </Badge>
        ,
        <Badge href="https://opensea.io">
          <img
            alt="OpenSea logomark"
            src="/images/opensea.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          OpenSea
        </Badge>
        ,
        <Badge href="https://about.google">
          <img
            alt="Google logomark"
            src="/images/google-icon.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Google
        </Badge>
        ,
        <Badge href="https://www.microsoft.com">
          <img
            alt="Microsoft logomark"
            src="/images/Microsoft_logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Microsoft
        </Badge>
        , and
        <Badge href="https://www.jpmorganchase.com">
          <img
            alt="JPMorgan Chase logomark"
            src="/images/J_P_Morgan_Logo_2008.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          JPMorgan Chase
        </Badge>
        .
      </p>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Professional Strengths
      </h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>Reflecting back, my career has been built on:</p>
        <ul className="list-disc pl-5">
          <li>Strategic thinking</li>
          <li>Continuous learning</li>
          <li>Impactful contributions</li>
        </ul>
        <p>
          I excel at creating innovative solutions that drive success and growth
          for both my team and our clients. Building strong alliances and a
          robust personal brand has been key to my achievements.
        </p>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Beyond My Technical Expertise
      </h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>I am passionate about:</p>
        <ul className="list-disc pl-5">
          <li>Exploring new market opportunities</li>
          <li>Crafting compelling value propositions</li>
          <li>Building lasting relationships with clients</li>
        </ul>
        <p>
          These interests enhance my ability to deliver holistic and impactful
          solutions.
        </p>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Personal Interests
      </h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Outside of work, I am an avid reader, DIY enthusiast, music lover, and
          sports enthusiast (basketball and more!)
        </p>
        <p>
          These activities fuel my creativity and provide a well-rounded
          perspective essential for innovative problem-solving. In my free time,
          you can find me working on real estate projects, playing basketball,
          offering guidance, drinking espresso, or reading a book ...all while
          likely brainstorming my next big project with my laptop open!
        </p>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Core Skills & Technologies
      </h2>
      <div className="grid grid-cols-2 gap-4 my-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex items-center justify-center">
          <img src="/images/python-logo.png" alt="Python" className="h-12" />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/images/typescript-logo.png"
            alt="TypeScript"
            className="h-12"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/images/javascript-logo.png"
            alt="JavaScript"
            className="h-12"
          />
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/react-logo.png" alt="React" className="h-12" />
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/nodejs-logo.png" alt="Node.js" className="h-12" />
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/aws-logo.png" alt="AWS" className="h-12" />
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/gcp-logo.png" alt="GCP" className="h-12" />
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/docker-logo.png" alt="Docker" className="h-12" />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Thoughts & Ideas
      </h2>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/blog"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">read my latest thoughts and insights</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/estebanmakes"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/contact"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">connect with me</p>
          </a>
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">Contact</h2>
      <p className="prose prose-neutral dark:prose-invert">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Feel free to reach out through
        any of the platforms below.
      </p>
      <div className="mt-8 flex justify-start">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Let's Chat
        </Link>
      </div>
    </section>
  );
}
