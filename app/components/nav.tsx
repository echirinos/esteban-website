"use client"; // Required for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
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
  "/contact": {
    name: "contact",
  },
};

// Helper function to render menu items, now accepts pathname
function renderMenuItems(pathname: string) {
  return Object.entries(navItems).map(([path, { name }]) => {
    const isExternal = path.startsWith("http");
    const isActive = !isExternal && pathname === path; // Check if the current path matches the item path
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <li key={path} className={isActive ? "bordered" : ""}>
        <Link
          href={path}
          {...linkProps}
          className={`capitalize ${isActive ? "text-primary font-medium" : ""}`}
        >
          {name}
        </Link>
      </li>
    );
  });
}

export function Navbar() {
  const pathname = usePathname(); // Get current pathname

  return (
    // Reduce bottom margin, add vertical padding
    <div className="navbar bg-base-100 mb-8 rounded-lg shadow-sm py-2 border border-base-200">
      <div className="navbar-start">
        {/* Dropdown for mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* Hamburger icon SVG */}
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
            // Use bg-base-200 for slight contrast if desired, or keep bg-base-100
            className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderMenuItems(pathname)} {/* Pass pathname to helper */}
          </ul>
        </div>
        {/* Site Title Removed */}
        {/* <Link href="/" className="btn btn-ghost normal-case text-xl">
          Esteban Chirinos
        </Link> */}
      </div>

      {/* Centered menu for large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          {renderMenuItems(pathname)} {/* Pass pathname to helper */}
        </ul>
      </div>
      {/* Add Theme Controller to navbar-end */}
      <div className="navbar-end">
        <label className="swap swap-rotate btn btn-ghost">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="dark" />

          {/* sun icon */}
          <svg
            className="swap-off fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0l-.71.71A1,1,0,0,0,5.64,7.05ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM17,5.64a1,1,0,0,0-.71-.29,1,1,0,0,0-.7.29l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,17,5.64ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.55,9.55A8.14,8.14,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
}
