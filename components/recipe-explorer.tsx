"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import RecipeCard from "@/components/recipe-card";
import { recipes } from "@/data/recipes";
import { recipeCategories, type RecipeCategory } from "@/types/recipe";

type CategoryFilter = RecipeCategory | "Toutes";

export default function RecipeExplorer() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Toutes");

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    return recipes.filter((recipe) => {
      const matchesName = recipe.name
        .toLocaleLowerCase("fr")
        .includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === "Toutes" ||
        recipe.category === selectedCategory;
      return matchesName && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#354536]">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <h3>Explorer par catégorie</h3>
        </div>
        <div
          className="flex flex-wrap gap-2.5"
          aria-label="Filtrer par catégorie"
        >
          {(["Toutes", ...recipeCategories] as CategoryFilter[]).map(
            (category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a] ${
                    isSelected
                      ? "border-[#354536] bg-[#354536] text-white"
                      : "border-[#dcd7cc] bg-transparent text-[#596354] hover:border-[#87977a] hover:text-[#354536]"
                  }`}
                >
                  {category}
                </button>
              );
            },
          )}
        </div>
      </div>

      <div
        id="recettes"
        className="mb-8 flex flex-col gap-5 border-t border-[#e8e2d7] pt-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#87977a]">
            À cuisiner bientôt
          </p>
          <h3 className="mt-2 font-serif text-3xl text-[#354536]">
            Toutes mes recettes
          </h3>
          <p className="mt-2 text-sm text-[#697264]" aria-live="polite">
            {filteredRecipes.length}{" "}
            {filteredRecipes.length > 1 ? "recettes" : "recette"}
          </p>
        </div>
        <label className="flex w-full items-center gap-3 rounded-full border border-[#dcd7cc] bg-white px-4 py-3 text-[#697264] transition focus-within:border-[#87977a] focus-within:ring-2 focus-within:ring-[#87977a]/20 sm:max-w-sm">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Rechercher une recette par son nom</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher une recette..."
            className="w-full bg-transparent text-sm text-[#354536] outline-none placeholder:text-[#9a9c92]"
          />
        </label>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#d2ccbf] px-6 py-14 text-center">
          <p className="font-serif text-2xl text-[#354536]">
            Aucune recette trouvée
          </p>
          <p className="mt-2 text-sm text-[#697264]">
            Essayez un autre nom ou choisissez une autre catégorie.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("Toutes");
            }}
            className="mt-5 text-sm font-semibold text-[#596f4e] underline decoration-[#bcc8b3] underline-offset-4 hover:text-[#354536] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a]"
          >
            Effacer les filtres
          </button>
        </div>
      )}
    </>
  );
}
