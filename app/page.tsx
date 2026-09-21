import type { Metadata } from "next";
import { PortfolioExperience } from "./immersive/PortfolioExperience";
import { portfolio } from "./immersive/content";

export const metadata: Metadata = {
  title: "Shanid Cherukattil | AI Product Engineer",
  description:
    "Shanid Cherukattil builds thoughtful interfaces, product systems, and AI-enabled workflows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shanid Cherukattil | AI Product Engineer",
    description:
      "Thoughtful interfaces, connected product systems, and AI-enabled workflows.",
    type: "website",
    url: "/",
  },
};

export default function HomePage() {
  return <PortfolioExperience content={portfolio} />;
}
