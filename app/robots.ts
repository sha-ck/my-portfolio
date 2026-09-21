import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://shanidcherukattil.com/sitemap.xml",
  };
}