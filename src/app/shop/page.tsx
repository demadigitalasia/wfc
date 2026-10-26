import { Shop } from "@/components/storefront";
export const metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop handmade jewelry",
  description:
    "Explore rings, necklaces, earrings, and bracelets. Ready-to-ship favorites and pieces made for you.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <Shop initialCategory={params.category} />;
}
