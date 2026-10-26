import { FAQPage } from "@/components/storefront";
export const metadata = {
  alternates: { canonical: "/faq" },
  title: "Frequently asked",
  description:
    "A little guidance on orders, made-to-order jewelry, shipping, sizing, and care.",
};
export default function Page() {
  return <FAQPage />;
}
