import { AboutPage } from "@/components/storefront";
export const metadata = {
  alternates: { canonical: "/about" },
  title: "Our story",
  description:
    "A feather found. A story begun. Meet the independent spirit of Wild Feather Creations.",
};
export default function Page() {
  return <AboutPage />;
}
