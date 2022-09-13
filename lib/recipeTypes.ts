export interface RecipeCardInfo {
  id: number;
  href: string;
  imageURL: string;
  title: string;
  isFavorite: boolean;
  rating: number;
  timeInMinutes: number;
}

export interface IngredientInfo {
  name: string;
  amount: number | null;
  unit: string;
}

export interface RecipeInstructionPartInfo {
  title: string;
  steps: string[];
}

export interface RecipeInfo {
  credits: {
    name: string;
    url: string;
  };
  description: string;
  imageUrl: string;
  ingredients: IngredientInfo[];
  instructions: RecipeInstructionPartInfo[];
  isFavorite: boolean;
  portions: number;
  rating: number;
  timeInMinutes: number;
  title: string;
}

export interface RecipeSearchSuggestion {
  suggestionId: number;
  suggestionName: string;
}
