import { ContactPage } from "@/components/storefront";
export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact the studio",
  description:
    "Product questions, sizing advice, or something you have in mind. Get in touch with Wild Feather Creations.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return <ContactPage key={product || "general"} productSlug={product} />;
}
