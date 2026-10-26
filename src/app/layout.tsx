import type { Metadata } from "next";
import { siteUrl, indexingEnabled } from "@/lib/site";
import { StoreProvider } from "@/components/store-provider";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";
const indexing = indexingEnabled;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wild Feather Creations — Jewelry with a point of view",
    template: "%s | Wild Feather Creations",
  },
  description:
    "Considered forms. An individual spirit. Explore handmade jewelry, ready-to-ship pieces, and made-to-order creations from Wild Feather Creations.",
  robots: { index: indexing, follow: indexing },
  icons: { icon: "/brand/wfc-logo-primary.png" },
  openGraph: {
    title: "Wild Feather Creations",
    description: "Objects to wear. Stories to keep.",
    type: "website",
    locale: "en_US",
    siteName: "Wild Feather Creations",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
