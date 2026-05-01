import type { Metadata } from "next";
import { ModernPortfolioPage } from "./components/modern-portfolio-page";

export const metadata: Metadata = {
  title: "Esteban Chirinos - Applied AI, Developer Experience, Technical Product",
  description:
    "Applied AI, developer experience, technical product, demo engineering, and customer-facing platform work by Esteban Chirinos.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <ModernPortfolioPage />;
}
