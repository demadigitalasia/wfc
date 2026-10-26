import { siteUrl, indexingEnabled } from "@/lib/site";
import type { MetadataRoute } from "next";
import { initialProducts, collections } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl;
  if (!indexingEnabled) return [];
  return [
    "",
    "/shop",
    "/collections",
    "/collections/indonesian-stones",
    "/about",
    "/contact",
    "/faq",
    "/guides/sizing",
    "/guides/care",
    ...initialProducts
      .filter((p) => p.published)
      .map((p) => `/products/${p.slug}`),
    ...collections.map((c) => `/collections/${c.slug}`),
  ].map((path) => ({
    url: `${url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
