import "./globals.css";
import type { Metadata } from "next";
import { Unbounded, Manrope, IBM_Plex_Mono } from "next/font/google";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  metadataBase: new URL(
    "https://shanid-portfolio.shanid0cherukattil.workers.dev/",
  ),
  title: {
    default: "Shanid Cherukattil | Software Engineer",
    template: "%s | Shanid Cherukattil",
  },
  description:
    "Shanid Cherukattil is a software engineer focused on frontend development, modern web applications, performance, and user experience.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shanid Cherukattil",
    title: "Shanid Cherukattil | Software Engineer",
    description:
      "Explore Shanid Cherukattil's portfolio, selected projects, technical skills, and software engineering experience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shanid Cherukattil | Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shanid Cherukattil | Software Engineer",
    description:
      "Explore selected projects, technical skills, and software engineering experience.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
