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
      "Esteban Chirinos - Applied AI, Developer Experience, Technical Product",
    template: "%s | Esteban Chirinos",
  },
  description:
    "Senior Technical Solutions Engineer at Coinbase focused on AI-ready demos, developer experience, API architecture, product feedback loops, customer deployments, and platform adoption.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64" },
      { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Esteban Chirinos",
    description:
      "Applied AI, Developer Experience, Technical Product, and customer-facing platform work by Esteban Chirinos.",
    url: "https://estebanchirinos.xyz",
    siteName: "Esteban Chirinos",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Esteban Chirinos E logo",
      },
    ],
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
      "AI-ready demos, reference implementations, API architecture, product feedback loops, and customer-facing technical work.",
    card: "summary_large_image",
    images: ["/twitter-image.jpg"],
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
