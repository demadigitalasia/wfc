import { AdminApp } from "@/components/admin";
export const metadata = {
  title: "Studio management",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  return <AdminApp section={section} />;
}
