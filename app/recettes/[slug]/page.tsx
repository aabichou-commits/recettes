import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Clock3, CookingPot, UsersRound } from "lucide-react";
import FavoriteButton from "@/components/favorite-button";
import { recipes } from "@/data/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);

  return recipe
    ? {
        title: recipe.name,
        description: recipe.description,
      }
    : { title: "Recette introuvable" };
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-sm text-[#697264]" role="status">
          Chargement de la recette…
        </p>
      }
    >
      <RecipeDetailContent params={params} />
    </Suspense>
  );
}

async function RecipeDetailContent({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);

  if (!recipe) {
    return (
      <section className="px-6 py-20 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
          Oups, cette recette manque à l&apos;appel
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#354536]">
          Recette introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[#697264]">
          Cette recette n&apos;existe pas ou a changé de nom.
        </p>
        <Link
          href="/recettes"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#596f4e] hover:text-[#354536]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Retour aux recettes
        </Link>
      </section>
    );
  }

  return (
    <article className="bg-[#f8f6f0]">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 sm:px-10 lg:px-16">
        <Link
          href="/recettes"
          className="inline-flex items-center gap-2 py-2 text-sm font-medium text-[#697264] transition hover:text-[#354536] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Toutes les recettes
        </Link>

        <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#ede7db]">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-[#e7ebdf] px-3 py-1.5 text-xs font-semibold text-[#596f4e]">
              {recipe.category}
            </span>
            <div className="mt-4 flex items-start justify-between gap-4">
              <h1 className="font-serif text-4xl leading-tight text-[#354536] sm:text-5xl">
                {recipe.name}
              </h1>
              <FavoriteButton slug={recipe.slug} recipeName={recipe.name} />
            </div>
            <p className="mt-5 text-base leading-7 text-[#697264]">
              {recipe.description}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-[#e1dbcf] py-5">
              <div className="flex flex-col gap-2">
                <Clock3 size={18} className="text-[#87977a]" aria-hidden="true" />
                <span className="text-xs text-[#81857a]">Préparation</span>
                <span className="text-sm font-semibold text-[#354536]">
                  {recipe.prepTime} min
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <CookingPot
                  size={18}
                  className="text-[#87977a]"
                  aria-hidden="true"
                />
                <span className="text-xs text-[#81857a]">Cuisson</span>
                <span className="text-sm font-semibold text-[#354536]">
                  {recipe.cookTime === 0 ? "Aucune" : `${recipe.cookTime} min`}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <UsersRound
                  size={18}
                  className="text-[#87977a]"
                  aria-hidden="true"
                />
                <span className="text-xs text-[#81857a]">Personnes</span>
                <span className="text-sm font-semibold text-[#354536]">
                  {recipe.servings}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <section aria-labelledby="ingredients-title">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
              À préparer
            </p>
            <h2
              id="ingredients-title"
              className="mt-2 font-serif text-3xl text-[#354536]"
            >
              Les ingrédients
            </h2>
            <ul className="mt-6 divide-y divide-[#e5dfd3]">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex gap-3 py-3.5 text-sm leading-6 text-[#596354]"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[#87977a]"
                    aria-hidden="true"
                  />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="instructions-title">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
              La recette pas à pas
            </p>
            <h2
              id="instructions-title"
              className="mt-2 font-serif text-3xl text-[#354536]"
            >
              Préparation
            </h2>
            <ol className="mt-6 space-y-5">
              {recipe.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e7ebdf] font-serif text-sm font-semibold text-[#596f4e]">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-[#596354]">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </article>
  );
}
