import { ProductDetail } from "@/components/storefront";
import { initialProducts } from "@/lib/data";
import type { Metadata } from "next";
export function generateStaticParams() {
  return initialProducts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = initialProducts.find((p) => p.slug === slug);
  return {
    title: p?.name ?? "A piece of your own",
    description: p?.description,
    alternates: { canonical: `/products/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetail key={slug} slug={slug} />;
}
