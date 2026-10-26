import { CollectionsPage } from "@/components/storefront";
export const metadata = {
  alternates: { canonical: "/collections" },
  title: "The collections",
  description:
    "Different expressions. One point of view. Discover the collections of Wild Feather Creations.",
};
export default function Page() {
  return <CollectionsPage />;
}
