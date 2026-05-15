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
    <footer className="relative z-10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-lg border border-base-content/8 bg-base-100/78 px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-base-content/40">
          &copy; {new Date().getFullYear()} Esteban Chirinos
        </p>
        <nav className="flex flex-wrap gap-5">
          {footerLinks.map((link) => {
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.name}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-sm text-base-content/40 hover:text-primary transition-colors"
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
            className="text-base-content/30 hover:text-primary transition-colors"
          >
            <FaXTwitter className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/echirinos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-base-content/30 hover:text-primary transition-colors"
          >
            <FaGithub className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/esteban-chirinos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-base-content/30 hover:text-primary transition-colors"
          >
            <FaLinkedin className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
