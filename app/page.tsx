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
        music, and DIY projects. I currently
        <Link href="/work"> work </Link>
        as a Technical Services Engineer at
        <Badge href="https://www.coinbase.com">
          <img
            alt="Coinbase logomark"
            src="/coinbase.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Coinbase
        </Badge>
        , where I leverage my expertise in Python and TypeScript to build
        innovative solutions for developers, maintain comprehensive
        documentation on
        <Badge href="https://docs.cdp.coinbase.com/">
          <img
            alt="Coinbase logomark"
            src="/coinbase.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          CDP (Coinbase Developer Platform)
        </Badge>
        , and drive solution-oriented strategies to meet client needs
        effectively. I love working with people and thrive on building
        meaningful connections and collaborations.
      </p>
      <p className="prose prose-neutral dark:text-neutral-400">
        Previously, I have made significant contributions at
        <Badge href="https://www.trmlabs.com">
          <img
            alt="TRM Labs logomark"
            src="/Trm-labs.svg"
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
            src="/polygon-matic-icon.svg"
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
            src="/opensea.svg"
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
            src="/google-icon.svg"
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
            src="/Microsoft_logo.svg"
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
            src="/J_P_Morgan_Logo_2008.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          JPMorgan Chase
        </Badge>
        .
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          My career is built on a foundation of strategic thinking, continuous
          learning, and impactful contributions. I excel at creating innovative
          solutions that drive success and growth for both my team and our
          clients. My ability to build strong alliances and a robust personal
          brand has been key to my professional achievements.
        </p>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Beyond my professional endeavors, I am passionate about sales and
          business development. I love exploring new market opportunities,
          crafting compelling value propositions, and building lasting
          relationships with clients. These interests complement my technical
          skills, enabling me to deliver holistic and impactful solutions.
        </p>
        <p>
          Additionally, I am an avid reader and enjoy diving into DIY projects,
          exploring new music genres, and staying active with various sports.
          These interests fuel my creativity and provide a well-rounded
          perspective, essential for innovative problem-solving.
        </p>
        <p>
          In my free time, you can find me working on my real estate projects, playing basketball, offering guidance, drinking espresso, or reading a book.
          But my laptop will be open and I will be working on by next project too!
        </p>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Skills & Technologies
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-4">
        <div className="flex justify-center items-center">
          <img src="/python-logo.png" alt="Python" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/typescript-logo.png" alt="TypeScript" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/javascript-logo.png" alt="JavaScript" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/react-logo.png" alt="React" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/nodejs-logo.png" alt="Node.js" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/aws-logo.png" alt="AWS" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/gcp-logo.png" alt="GCP" className="h-12" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/docker-logo.png" alt="Docker" className="h-12" />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">
        Blog & Articles
      </h2>
      <div className="my-8 flex w-full flex-col space-y-4">
        <a
          href="https://world.hey.com/echi/"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="flex items-center space-x-3">
            <img
              src="/esteban.png"
              alt="Esteban"
              className="h-16 w-16 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                My Blog Posts on HEY
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Read my latest thoughts and insights on my blog.
              </p>
            </div>
          </div>
        </a>
      </div>

      <h2 className="mt-8 text-xl font-medium tracking-tighter">Contact</h2>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out
          through any of the platforms below.
        </p>
        <ul className="list-disc pl-5 mt-8 text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/estebano_c"
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
              href="https://www.linkedin.com/in/esteban-chirinos/"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">connect with me</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/echirinos"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">see my work</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
