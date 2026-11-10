"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import RecipeCard from "@/components/recipe-card";
import { useFavorites } from "@/components/favorites-provider";
import { recipes } from "@/data/recipes";

export default function FavoriteCollection() {
  const { favoriteSlugs, isReady } = useFavorites();

  if (!isReady) {
    return (
      <p className="py-16 text-center text-sm text-[#697264]" role="status">
        Chargement de vos favoris…
      </p>
    );
  }

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteSlugs.includes(recipe.slug),
  );

  if (favoriteRecipes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d2ccbf] px-6 py-16 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e7ebdf] text-[#596f4e]">
          <Heart size={22} aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-serif text-2xl text-[#354536]">
          Votre carnet est encore vide
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#697264]">
          Touchez le cœur d&apos;une recette pour la garder ici et la retrouver
          facilement.
        </p>
        <Link
          href="/recettes"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#354536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#596f4e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#87977a]"
        >
          Parcourir les recettes
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
