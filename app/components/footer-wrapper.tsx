"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function FooterWrapper() {
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, "") ?? "";
  const isHome = normalizedPathname === "";
  const isImmersiveRoute = normalizedPathname === "/goggles";

  if (isHome || isImmersiveRoute) {
    return null;
  }

  const footerLinks = [
    { name: "Lens", href: "/goggles" },
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Writing", href: "https://world.hey.com/echi/" },
    { name: "Ask AI", href: "/ai-lab" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative z-10 mt-16 border-t hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="annotation text-base-content/40">
          &copy; {new Date().getFullYear()} Esteban Chirinos
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => {
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.name}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="annotation text-base-content/40 transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            );
          })}
        </nav>
        <div className="flex gap-4">
          <a
            href="https://x.com/estebano_c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-base-content/30 transition-colors hover:text-primary"
          >
            <FaXTwitter className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/echirinos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-base-content/30 transition-colors hover:text-primary"
          >
            <FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/esteban-chirinos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-base-content/30 transition-colors hover:text-primary"
          >
            <FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
