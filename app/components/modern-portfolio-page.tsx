import Image from "next/image";
import Link from "next/link";
import { AskEstebanChat } from "./ask-esteban-chat";
import {
  contactChannels,
  educationCredentials,
  portfolioMetrics,
  projectEntries,
  workExperiences,
} from "../lib/portfolio-data";

const featuredProjects = projectEntries.filter(
  (project) => project.highlighted,
);

export function ModernPortfolioPage() {
  return (
    <div className="personal-site">
      <section className="hello-section" aria-labelledby="hello-title">
        <div className="hello-copy">
          <p className="hello-byline">
            A little corner of the internet by Esteban Chirinos
          </p>
          <h1 id="hello-title">
            Good software.
            <br />
            Real people.
            <br />A little curiosity.
          </h1>
          <p className="hello-intro">
            Hey, I’m Esteban. I turn complicated technology into things people
            can actually use.
          </p>
          <p className="hello-detail">
            Founding Solutions Engineer at{" "}
            <a
              href="https://privy.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privy, a Stripe company
            </a>
            . Builder of demos, developer tools, and the occasional pickleball
            business. Based in Miami.
          </p>
          <div className="hello-actions">
            <Link className="draft-btn draft-btn-fill" href="/work">
              View proof
            </Link>
            <Link className="text-link" href="/contact">
              Say hello <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="hello-keepsakes">
          <figure className="portrait-note">
            <div className="portrait-frame">
              <Image
                src="/images/esteban.png"
                alt="Esteban Chirinos smiling on a hike"
                width={250}
                height={245}
                priority
              />
            </div>
            <figcaption>Usually building. Sometimes outside.</figcaption>
          </figure>
          <div className="currently-note">
            <span className="note-pin" aria-hidden="true" />
            <p>A few things about me</p>
            <ul>
              <li>Building at Privy / Stripe</li>
              <li>Berkeley Haas MBA, ’28</li>
              <li>Big on developer experience</li>
              <li>Always up for pickleball</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="proof-ribbon" aria-label="Career highlights">
        {portfolioMetrics.slice(0, 3).map((metric) => (
          <p key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </p>
        ))}
      </div>

      <section
        className="home-section work-section"
        aria-labelledby="work-title"
      >
        <div className="home-section-heading">
          <div>
            <p className="section-note">The work, so far</p>
            <h2 id="work-title">
              Good company.
              <br />
              Interesting problems.
            </h2>
          </div>
          <Link className="text-link" href="/work">
            The full story <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="career-list">
          {workExperiences.map((company) => (
            <a
              className="career-row"
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="career-logo">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={64}
                  height={64}
                />
              </span>
              <div className="career-role">
                <h3>{company.name}</h3>
                <p>{company.role}</p>
              </div>
              <p className="career-impact">{company.impact[0]}</p>
              <span className="career-date">
                {company.period.replace(" - ", " – ")}{" "}
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="builds-title">
        <div className="home-section-heading">
          <div>
            <p className="section-note">Made to be used</p>
            <h2 id="builds-title">
              Less slide deck.
              <br />
              More shipped product.
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="build-list">
          {featuredProjects.map((project) => (
            <a
              className="build-row"
              key={project.name}
              href={project.href || "/projects"}
              target={project.href ? "_blank" : undefined}
              rel={project.href ? "noopener noreferrer" : undefined}
            >
              <div>
                <span className="project-category">{project.category}</span>
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>
              <span className="project-open" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="lens-invitation" aria-labelledby="lens-title">
        <Image
          src="/images/world-yosemite-immersive.webp"
          alt="Golden light across a mountain valley"
          fill
          sizes="(max-width: 768px) 100vw, 1120px"
          className="lens-landscape"
        />
        <div className="lens-invitation-shade" />
        <div className="lens-invitation-copy">
          <p className="section-note">Take the scenic route</p>
          <h2 id="lens-title">
            Same person.
            <br />A different perspective.
          </h2>
          <p>
            Put on the goggles. Wander through ten worlds, open the files, and
            get to know the work.
          </p>
          <Link href="/goggles" className="draft-btn lens-invitation-button">
            Try goggle mode <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="lens-postcard-caption">
          El Capitan Valley / one of ten places to explore
        </span>
      </section>

      <section
        className="home-section ask-section"
        id="ask-esteban"
        aria-labelledby="ask-title"
      >
        <div className="ask-intro">
          <p className="section-note">The conversational version</p>
          <h2 id="ask-title">
            Go ahead.
            <br />
            Ask a question.
          </h2>
          <p>
            Curious about a project, my background, or how I work? This
            assistant answers from my portfolio and shows its sources.
          </p>
          <Link className="text-link" href="/ai-lab">
            Open the full conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <AskEstebanChat variant="home" />
      </section>

      <section
        className="home-section about-section"
        aria-labelledby="about-title"
      >
        <div>
          <p className="section-note">How I work</p>
          <h2 id="about-title">
            Make it useful.
            <br />
            Make it human.
          </h2>
          <p>
            I like working where engineering, product, and customers meet.
            Listen closely. Build something concrete. Put it in someone’s hands.
            Make it better.
          </p>
          <p>
            That’s taken me from cloud platforms to crypto infrastructure to
            applied AI. The tools change. The care stays.
          </p>
        </div>
        <div className="education-note">
          <h3>Always a student.</h3>
          {educationCredentials.map((item) => (
            <div key={item.school}>
              <strong>{item.school}</strong>
              <p>{item.credential}</p>
            </div>
          ))}
          <Link className="text-link" href="/resume">
            Read my résumé <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <footer className="personal-footer">
        <p className="section-note">Thanks for stopping by.</p>
        <h2>Have something in mind?</h2>
        <Link className="draft-btn draft-btn-fill" href="/contact">
          Let’s talk
        </Link>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Esteban Chirinos · Miami, FL</span>
          <div>
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {channel.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
