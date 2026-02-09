"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./nav";

export function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar />;
}
