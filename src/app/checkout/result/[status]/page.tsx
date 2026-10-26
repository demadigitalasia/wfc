import { CheckoutResult } from "@/components/checkout";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Your order summary",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  if (
    !["review", "pending", "failed", "cancelled", "confirmed"].includes(status)
  )
    notFound();
  return <CheckoutResult status={status} />;
}
