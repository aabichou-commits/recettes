"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { recipes } from "@/data/recipes";

const STORAGE_KEY = "mes-recettes-favorites";
const recipeSlugs = new Set(recipes.map((recipe) => recipe.slug));
type FavoritesSnapshot = {
  favoriteSlugs: string[];
  isReady: boolean;
};

const serverSnapshot: FavoritesSnapshot = {
  favoriteSlugs: [],
  isReady: false,
};
let snapshot = serverSnapshot;
let hasLoaded = false;
const listeners = new Set<() => void>();

type FavoritesContextValue = {
  favoriteSlugs: string[];
  isReady: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function parseFavorites(value: string | null) {
  if (!value) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      throw new Error("Le contenu des favoris doit être une liste.");
    }
    return parsed.filter(
      (slug): slug is string =>
        typeof slug === "string" && recipeSlugs.has(slug),
    );
  } catch (error) {
    console.warn(
      "Les favoris enregistrés sont illisibles et vont être réinitialisés.",
      error,
    );
    return [];
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function loadFavorites() {
  if (hasLoaded) {
    return;
  }
  let savedFavorites: string | null = null;
  try {
    savedFavorites = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Impossible de lire les favoris enregistrés.", error);
  }
  snapshot = { favoriteSlugs: parseFavorites(savedFavorites), isReady: true };
  hasLoaded = true;
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) {
    return;
  }
  snapshot = {
    favoriteSlugs: parseFavorites(event.key === null ? null : event.newValue),
    isReady: true,
  };
  hasLoaded = true;
  notifyListeners();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!hasLoaded) {
    loadFavorites();
    listener();
  }
  window.addEventListener("storage", handleStorageChange);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

export default function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { favoriteSlugs, isReady } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isFavorite = useCallback(
    (slug: string) => favoriteSlugs.includes(slug),
    [favoriteSlugs],
  );
  const toggleFavorite = useCallback((slug: string) => {
    if (!recipeSlugs.has(slug)) {
      return;
    }
    loadFavorites();
    const updatedFavorites = snapshot.favoriteSlugs.includes(slug)
      ? snapshot.favoriteSlugs.filter((favorite) => favorite !== slug)
      : [...snapshot.favoriteSlugs, slug];
    snapshot = { favoriteSlugs: updatedFavorites, isReady: true };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Impossible d'enregistrer les favoris.", error);
    }
    notifyListeners();
  }, []);
  const value = useMemo(
    () => ({ favoriteSlugs, isReady, isFavorite, toggleFavorite }),
    [favoriteSlugs, isReady, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé dans FavoritesProvider.");
  }
  return context;
}
