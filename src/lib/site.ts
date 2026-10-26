export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
export const indexingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true" &&
  process.env.VERCEL_ENV !== "preview";
