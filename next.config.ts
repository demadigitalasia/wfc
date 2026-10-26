import type { NextConfig } from "next";
const indexing =
  process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true" &&
  process.env.VERCEL_ENV !== "preview";
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  headers() {
    return indexing
      ? [
          {
            source: "/admin/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
          {
            source: "/checkout/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
          {
            source: "/cart",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ]
      : [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ];
  },
};
export default nextConfig;
