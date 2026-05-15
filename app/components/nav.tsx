"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", name: "Home" },
  { href: "/goggles", name: "Lens" },
  { href: "/work", name: "Work" },
  { href: "/projects", name: "Projects" },
  { href: "/ai-lab", name: "Ask AI" },
  { href: "/resume", name: "Resume" },
  { href: "/contact", name: "Contact" },
];

function renderMenuItems(pathname: string) {
  return navItems.map(({ href, name }) => {
    const isExternal = href.startsWith("http");
    const isActive = !isExternal && pathname === href;
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
        <li key={href}>
          <Link
            href={href}
            {...linkProps}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-base-content text-base-100"
                : "text-base-content/60 hover:bg-base-200/80 hover:text-base-content"
            }`}
          >
            {name}
          </Link>
        </li>
    );
  });
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 mb-8 rounded-lg border border-base-content/10 bg-base-100/85 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex min-h-14 items-center justify-between gap-4 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm rounded-lg"
              aria-label="Open navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[50] mt-3 w-56 rounded-lg border border-base-content/10 bg-base-100 p-2 shadow-lg"
            >
              {renderMenuItems(pathname)}
            </ul>
          </div>
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-bold tracking-tight text-base-content hover:bg-base-200/80"
          >
            Esteban Chirinos
          </Link>
        </div>

        <nav className="hidden md:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-1">{renderMenuItems(pathname)}</ul>
        </nav>

        <label className="swap swap-rotate btn btn-ghost rounded-lg">
          <input type="checkbox" className="theme-controller" value="dark" />

          <svg
            className="swap-off fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0l-.71.71A1,1,0,0,0,5.64,7.05ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM17,5.64a1,1,0,0,0-.71-.29,1,1,0,0,0-.7.29l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,17,5.64ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
          </svg>

          <svg
            className="swap-on fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.55,9.55A8.14,8.14,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </header>
  );
}
