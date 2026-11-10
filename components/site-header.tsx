import Link from "next/link";
import { BookHeart, CookingPot } from "lucide-react";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/recettes", label: "Toutes les recettes" },
  { href: "/favoris", label: "Favoris" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e8e2d7] bg-[#f8f6f0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[#354536] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#87977a]"
          aria-label="Mes Recettes, accueil"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[#e7ebdf]">
            <CookingPot size={19} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
            Mes Recettes
          </span>
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-4 text-sm text-[#596354] sm:gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 py-2 transition hover:text-[#87977a] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87977a]"
                >
                  {item.label === "Favoris" && (
                    <BookHeart
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
