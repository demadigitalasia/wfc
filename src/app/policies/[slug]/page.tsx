import { PolicyPage } from "@/components/storefront";
import { policies } from "@/lib/data";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    alternates: { canonical: `/policies/${slug}` },
    title: policies[slug]?.title ?? "The details",
    description: policies[slug]?.intro,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!policies[slug]) notFound();
  return <PolicyPage slug={slug} />;
}
