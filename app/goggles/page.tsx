import type { Metadata } from "next";
import { EstebanWorldLoader } from "../components/esteban-world-loader";

export const metadata: Metadata = {
  title: "Portfolio Lens",
  description:
    "An immersive Esteban OS lens with interactive worlds, proof points, projects, and Ask Esteban.",
  alternates: {
    canonical: "/goggles",
  },
};

export default function GogglesPage() {
  return <EstebanWorldLoader />;
}
