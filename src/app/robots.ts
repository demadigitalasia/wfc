import { siteUrl, indexingEnabled } from "@/lib/site";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const live = indexingEnabled;
  const url = siteUrl;
  return {
    rules: live
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/cart", "/checkout"],
        }
      : { userAgent: "*", disallow: "/" },
    ...(live && url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
