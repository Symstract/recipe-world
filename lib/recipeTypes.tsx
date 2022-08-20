export interface RecipeCardInfo {
  id: number;
  href: string;
  imageURL: string;
  title: string;
  isFavorite: boolean;
  rating: number;
  timeInMinutes: number;
}

export interface RecipeInstructionPartInfo {
  title: string;
  steps: string[];
}
