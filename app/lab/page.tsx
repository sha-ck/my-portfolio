import type { Metadata } from "next";
import { Unbounded, Manrope, IBM_Plex_Mono } from "next/font/google";
import { PortfolioExperience } from "../immersive/PortfolioExperience";
import { portfolio } from "../immersive/content";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shanid Cherukattil — Portfolio Lab",
  description:
    "Frontend architecture, performance and connected applications. An experimental portfolio by Shanid Cherukattil.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function LabPage() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <PortfolioExperience content={portfolio} />
    </div>
  );
}
