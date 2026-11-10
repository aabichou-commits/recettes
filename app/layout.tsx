import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import FavoritesProvider from "@/components/favorites-provider";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Mes Recettes — Le plaisir du fait maison",
    template: "%s | Mes Recettes",
  },
  description:
    "Un carnet de recettes simples et gourmandes à cuisiner, partager et retrouver facilement.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <FavoritesProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[#e8e2d7] bg-[#f8f6f0] px-6 py-8 text-center text-sm text-[#697264]">
            Fait avec amour, et un peu de farine. © Mes Recettes
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
