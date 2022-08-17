export interface SpoonacularComplexSearchResponse {
  offset: number;
  number: number;
  results: Array<{
    id: number;
    title: string;
    image: string;
    imageType: string;
  }>;
  totalResults: number;
}

export interface SpoonacularRecipeInformationResponse {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: 45;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[];
  cheap: boolean;
  creditsText: string;
  cuisines: any[];
  dairyFree: boolean;
  diets: any[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: any[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: Array<{
    aisle: string;
    amount: number;
    consitency: string;
    id: number;
    image: string;
    measures: {
      metric: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
      us: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
    };
    meta: any[];
    name: string;
    original: string;
    originalName: string;
    unit: string;
  }>;
  summary: string;
  winePairing: {
    pairedWines: string[];
    pairingText: string;
    productMatches: Array<{
      id: number;
      title: string;
      description: string;
      price: string;
      imageUrl: string;
      averageRating: number;
      ratingCount: number;
      score: number;
      link: string;
    }>;
  };
}

export type SpoonacularRecipeInformationBulkResponse =
  SpoonacularRecipeInformationResponse[];

export type SpoonacularComplexSearchSortingOptions =
  | ""
  | "meta-score"
  | "popularity"
  | "healthiness"
  | "price"
  | "time"
  | "random"
  | "max-used-ingredients"
  | "min-missing-ingredients"
  | "alcohol"
  | "caffeine"
  | "copper"
  | "energy"
  | "calories"
  | "calcium"
  | "carbohydrates"
  | "carbs"
  | "choline"
  | "cholesterol"
  | "total-fat"
  | "fluoride"
  | "trans-fat"
  | "saturated-fat"
  | "mono-unsaturated-fat"
  | "poly-unsaturated-fat"
  | "fiber"
  | "folate"
  | "folic-acid"
  | "iodine"
  | "iron"
  | "magnesium"
  | "manganese"
  | "vitamin-b3"
  | "niacin"
  | "vitamin-b5"
  | "pantothenic-acid"
  | "phosphorus"
  | "potassium"
  | "protein"
  | "vitamin-b2"
  | "riboflavin"
  | "selenium"
  | "sodium"
  | "vitamin-b1"
  | "thiamin"
  | "vitamin-a"
  | "vitamin-b6"
  | "vitamin-b12"
  | "vitamin-c"
  | "vitamin-d"
  | "vitamin-e"
  | "vitamin-k"
  | "sugar"
  | "zinc";
