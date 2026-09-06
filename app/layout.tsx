import "./global.css";
import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { FooterWrapper } from "./components/footer-wrapper";
import { LenisProvider } from "./components/lenis-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SandpackCSS } from "./blog/[slug]/sandpack";

const displayFont = localFont({
  src: "../public/fonts/kaisei-tokumin-bold.ttf",
  variable: "--font-display",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estebanchirinos.xyz"),
  title: {
    default:
      "Esteban Chirinos - Applied AI, Developer Experience, Technical Product",
    template: "%s | Esteban Chirinos",
  },
  description:
    "Founding Solutions Engineer at Privy (a Stripe company), previously Coinbase — focused on AI-ready demos, developer experience, API architecture, product feedback loops, customer deployments, and platform adoption.",
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
      suppressHydrationWarning
      className={cx(
        GeistSans.variable,
        displayFont.variable,
        GeistMono.variable,
      )}
    >
      <head>
        <SandpackCSS />
        {/* Apply saved or OS-preferred theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`,
          }}
        />
        {/* Draft-reveal elements ship opacity:0 in SSR HTML; without JS they must render visible */}
        <noscript>
          <style>{`[data-draft]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="antialiased relative">
        <LenisProvider />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavbarWrapper />
        <main
          id="main-content"
          className="flex-auto min-w-0 flex flex-col relative z-10"
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </main>

        <FooterWrapper />
      </body>
    </html>
  );
}
