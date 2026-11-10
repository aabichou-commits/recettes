import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Leaf } from "lucide-react";
import RecipeExplorer from "@/components/recipe-explorer";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#354536] text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2200&q=85"
            alt="Table garnie de légumes frais et de plats colorés"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18241c]/90 via-[#18241c]/65 to-[#18241c]/15" />
        </div>

        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:min-h-[650px] lg:px-16">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#e4d7bd]">
              <Leaf size={16} aria-hidden="true" />
              Le plaisir du fait maison
            </p>
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Qu&apos;est-ce qu&apos;on mange aujourd&apos;hui&nbsp;?
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              Des recettes simples, généreuses et de saison, à cuisiner et à
              partager avec ceux qu&apos;on aime.
            </p>
            <Link
              href="#recettes"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#f8f6f0] px-6 py-3.5 text-sm font-semibold text-[#354536] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Trouver une recette
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="absolute bottom-8 right-8 hidden items-center gap-2 text-xs text-white/65 sm:flex">
            <span className="h-px w-8 bg-white/50" />
            Des idées à savourer
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6f0] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
                Le carnet de cuisine
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#354536] sm:text-5xl">
                À table, à votre façon
              </h2>
            </div>
            <Link
              href="/recettes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#354536] transition hover:text-[#87977a]"
            >
              Voir toutes les recettes
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <RecipeExplorer />
        </div>
      </section>
    </>
  );
}
