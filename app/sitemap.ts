import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://www.commety.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/mappa`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date("2026-07-22T09:00:00+02:00"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/news/commety-su-gofundme`,
      lastModified: new Date("2026-07-22T09:00:00+02:00"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${siteUrl}/og-institutional-map.png`, `${siteUrl}/landing-maria-rossi.png`],
    },
  ];
}
