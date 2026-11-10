import type { Metadata } from "next";
import FavoriteCollection from "@/components/favorite-collection";

export const metadata: Metadata = {
  title: "Mes favoris",
  description: "Retrouvez ici les recettes que vous avez mises de côté.",
};

export default function FavoritesPage() {
  return (
    <section className="min-h-[65vh] bg-[#f8f6f0] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
          Votre sélection
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#354536] sm:text-5xl">
          Mes recettes favorites
        </h1>
        <p className="mb-10 mt-4 max-w-2xl text-base leading-7 text-[#697264]">
          Vos recettes préférées, toujours à portée de main.
        </p>
        <FavoriteCollection />
      </div>
    </section>
  );
}
