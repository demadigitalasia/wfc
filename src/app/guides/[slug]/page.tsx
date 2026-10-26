import { GuidePage } from "@/components/storefront";
import { guides } from "@/lib/data";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    alternates: { canonical: `/guides/${slug}` },
    title: guides[slug]?.title ?? "A little guidance",
    description: guides[slug]?.intro,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!guides[slug]) notFound();
  return <GuidePage slug={slug} />;
}
