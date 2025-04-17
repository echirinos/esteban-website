"use client"; // Required for potential future use of usePathname

import Link from "next/link";
// Import SVG for dropdown icon if needed, or use text/emoji
// import { Bars3Icon } from '@heroicons/react/24/solid'; // Example using heroicons

const navItems = {
  "/": {
    name: "home",
  },
  "/work": {
    name: "work",
  },
  "https://world.hey.com/echi/": {
    name: "blog",
  },
  "/projects": {
    name: "projects",
  },
};

// Helper function to render menu items (to avoid duplication)
function renderMenuItems() {
  return Object.entries(navItems).map(([path, { name }]) => {
    const isExternal = path.startsWith("http");
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <li key={path}>
        <Link href={path} {...linkProps}>
          {name}
        </Link>
      </li>
    );
  });
}

export function Navbar() {
  return (
    <div className="navbar bg-base-100 mb-16">
      <div className="navbar-start">
        {/* Dropdown for mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* You can use an SVG icon here */}
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
            {/* Or just text/emoji: <Bars3Icon className="h-5 w-5" /> */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderMenuItems()} {/* Render items in dropdown */}
          </ul>
        </div>
        {/* Site Title Removed */}
        {/* <Link href="/" className="btn btn-ghost normal-case text-xl">
          Esteban Chirinos
        </Link> */}
      </div>

      {/* Horizontal menu for large screens */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {renderMenuItems()} {/* Render items in horizontal menu */}
        </ul>
      </div>
      {/* navbar-end can be used if you need items on the far right even on desktop */}
      {/* <div className="navbar-end">
         <a className="btn">Button</a>
      </div> */}
    </div>
  );
}
