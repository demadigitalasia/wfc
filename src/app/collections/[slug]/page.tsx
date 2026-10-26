import { Shop } from "@/components/storefront";
import { collections } from "@/lib/data";
export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = collections.find((c) => c.slug === slug);
  return {
    alternates: { canonical: `/collections/${slug}` },
    title: c?.name ?? "Collection",
    description: c?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Shop key={slug} collection={slug} />;
}
