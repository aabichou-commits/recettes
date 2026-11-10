"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";

export default function FavoriteButton({
  slug,
  recipeName,
}: {
  slug: string;
  recipeName: string;
}) {
  const { isFavorite, isReady, toggleFavorite } = useFavorites();
  const favorite = isFavorite(slug);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      disabled={!isReady}
      aria-pressed={favorite}
      aria-label={
        favorite
          ? `Retirer ${recipeName} des favoris`
          : `Ajouter ${recipeName} aux favoris`
      }
      title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="grid size-10 place-items-center rounded-full bg-white/95 text-[#354536] shadow-sm transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a] disabled:cursor-wait"
    >
      <Heart
        size={19}
        strokeWidth={1.8}
        fill={favorite ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
