import type { Metadata } from "next";
import RecipeExplorer from "@/components/recipe-explorer";

export const metadata: Metadata = {
  title: "Toutes les recettes",
  description:
    "Parcourez toutes les recettes de cuisine de votre carnet Mes Recettes.",
};

export default function RecipesPage() {
  return (
    <section className="bg-[#f8f6f0] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
          Le carnet complet
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#354536] sm:text-5xl">
          Toutes les recettes
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#697264]">
          Un plat réconfortant, une petite douceur ou une idée pour le
          petit-déjeuner : trouvez l&apos;inspiration pour votre prochain repas.
        </p>
        <div className="mt-12">
          <RecipeExplorer />
        </div>
      </div>
    </section>
  );
}
