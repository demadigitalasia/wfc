import type { Metadata } from "next";
import { StoneStudiesPage } from "@/components/stone-studies";

export const metadata: Metadata = {
  alternates: { canonical: "/collections/indonesian-stones" },
  title: "Indonesian Stone Studies",
  description:
    "Explore handmade silver jewelry designs inspired by purple chalcedony, Maligano jasper, carnelian agate, and blue opalized wood.",
};

export default function Page() {
  return <StoneStudiesPage />;
}
