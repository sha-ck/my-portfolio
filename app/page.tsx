import type { Metadata } from "next";
import { PortfolioExperience } from "./immersive/PortfolioExperience";
import { portfolio } from "./immersive/content";

export const metadata: Metadata = {
  title: {
    absolute: "Shanid Cherukattil | Software Engineer",
  },
  description:
    "Shanid Cherukattil is a software engineer focused on frontend development, modern web applications, performance, and user experience.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shanid Cherukattil | Software Engineer",
    description:
      "Explore Shanid Cherukattil's portfolio, selected projects, technical skills, and software engineering experience.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shanid Cherukattil | Software Engineer",
      },
    ],
  },
};

export default function HomePage() {
  return <PortfolioExperience content={portfolio} />;
}
