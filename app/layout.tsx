import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { FooterWrapper } from "./components/footer-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SandpackCSS } from "./blog/[slug]/sandpack";

export const metadata: Metadata = {
  metadataBase: new URL("https://estebanchirinos.xyz"),
  title: {
    default:
      "Esteban Chirinos - Applied AI, Developer Experience, Solutions Engineering",
    template: "%s | Esteban Chirinos",
  },
  description:
    "Technical Services Engineer at Coinbase focused on AI-ready demos, reference implementations, developer experience, API architecture, and customer deployments.",
  openGraph: {
    title: "Esteban Chirinos",
    description:
      "Applied AI, Developer Experience, Technical Success, and Solutions Engineering work by Esteban Chirinos.",
    url: "https://estebanchirinos.xyz",
    siteName: "Esteban Chirinos",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Esteban Chirinos - Applied AI and Developer Experience",
    description:
      "Demo apps, reference implementations, API architecture, and customer-facing technical work.",
    card: "summary_large_image",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={cx(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <SandpackCSS />
      </head>
      <body className="antialiased relative">
        <main className="flex-auto min-w-0 flex flex-col px-4 md:px-8 lg:px-12 relative z-10">
          <NavbarWrapper />

          {children}
          <Analytics />
          <SpeedInsights />
        </main>

        <FooterWrapper />
      </body>
    </html>
  );
}
