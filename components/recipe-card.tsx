import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import type { Recipe } from "@/types/recipe";
import FavoriteButton from "@/components/favorite-button";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#ede7db]">
        <Link
          href={`/recettes/${recipe.slug}`}
          className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#87977a]"
          aria-label={`Voir la recette : ${recipe.name}`}
        >
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-[#f8f6f0]/95 px-3 py-1 text-xs font-medium text-[#354536]">
          {recipe.category}
        </span>
        <div className="absolute right-3 top-3">
          <FavoriteButton slug={recipe.slug} recipeName={recipe.name} />
        </div>
      </div>
      <div className="pt-4">
        <Link
          href={`/recettes/${recipe.slug}`}
          className="font-serif text-xl leading-snug text-[#354536] transition hover:text-[#718267] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a]"
        >
          {recipe.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6b7167]">
          {recipe.description}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#697264]">
          <Clock3 size={15} aria-hidden="true" />
          Préparation : {recipe.prepTime} min
        </p>
      </div>
    </article>
  );
}
