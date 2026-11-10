import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center px-6 py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#87977a]">
          Page introuvable
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#354536]">404</h1>
        <p className="mt-4 text-[#697264]">
          Cette page n&apos;existe pas. Retournons chercher une bonne recette.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#354536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#596f4e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#87977a]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
