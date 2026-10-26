import { CartPage } from "@/components/checkout";
export const metadata = {
  title: "Your bag",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <CartPage />;
}
