"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LenisProvider() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/goggles") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.09,
    });

    return () => lenis.destroy();
  }, [pathname]);

  return null;
}
