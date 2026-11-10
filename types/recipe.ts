export const recipeCategories = [
  "Entrées",
  "Plats",
  "Desserts",
  "Petit-déjeuner",
] as const;

export type RecipeCategory = (typeof recipeCategories)[number];

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: RecipeCategory;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
};
