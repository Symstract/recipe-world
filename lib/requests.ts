import axios from "axios";

import { RecipeCardInfo, RecipeInfo } from "lib/recipeTypes";
import {
  SpoonacularAnalyzedInstructionsResponse,
  SpoonacularComplexSearchResponse,
  SpoonacularComplexSearchSortingOptions,
  SpoonacularExtendedIngredient,
  SpoonacularRecipeInformationBulkResponse,
  SpoonacularRecipeInformationResponse,
} from "./spoonacularTypes";

const axiosSpoonacular = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  headers: {
    "Cache-Control": "max-age=3600",
  },
  params: {
    apiKey: process.env.SPOONACULAR_API_KEY,
  },
});

axiosSpoonacular.interceptors.response.use((response) => {
  console.log(
    "Spoonacular points used today:",
    response.headers["x-api-quota-used"],
    "Left:",
    response.headers["x-api-quota-left"]
  );
  return response;
});

function roundToNearestQuarter(amount: number) {
  if (amount < 0.25) return 0.25;
  return Math.round(amount / 0.25) * 0.25;
}

function roundToNearestHalf(amount: number) {
  if (amount < 0.5) return 0.5;
  return Math.round(amount / 0.5) * 0.5;
}

function correctAmountAndUnit(
  amount: number,
  unit: string
): [number | null, string] {
  // Amount is rounded to the nearest quarter so it looks nicer.

  const unitLower = unit.toLowerCase();

  switch (unitLower) {
    case "ml":
      return [roundToNearestQuarter(amount / 1000), "dl"];
    case "g":
      return [Math.round(amount / 25) * 25, "g"];
    case "kg":
    case "kgs":
      return [roundToNearestQuarter(amount), "kg"];
    case "tsp":
    case "tsps":
      return [roundToNearestHalf(amount), "tsp"];
    case "tbsp":
    case "tbsps":
      return [roundToNearestHalf(amount), "tbsp"];
    case "serving":
    case "servings":
      return [null, ""];
  }

  return [roundToNearestQuarter(amount / 1000), unitLower];
}

function adaptSpoonacularIngredients(
  spoonacularIngredients: SpoonacularExtendedIngredient[]
) {
  return spoonacularIngredients.map((ing) => {
    const metricMeasures = ing.measures.metric;
    const [amount, unit] = correctAmountAndUnit(
      metricMeasures.amount,
      metricMeasures.unitShort
    );

    return {
      name: ing.name,
      amount: amount,
      unit: unit,
    };
  });
}

export async function getRecipeInfo(recipeId: number): Promise<{
  data: RecipeInfo | null;
  error: any | null;
}> {
  try {
    const resInfo = await axiosSpoonacular.get(`${recipeId}/information?`);

    const resInfoData: SpoonacularRecipeInformationResponse =
      await resInfo.data;

    const resInstructions = await axiosSpoonacular.get(
      `${recipeId}/analyzedInstructions`,
      { params: { stepBreakdown: true } }
    );

    const resInstructionsData: SpoonacularAnalyzedInstructionsResponse =
      resInstructions.data;

    const resInfoWithInstructions: RecipeInfo = {
      credits: {
        name: resInfoData.sourceName,
        url: resInfoData.sourceUrl,
      },
      description: resInfoData.summary,
      imageUrl: `https://spoonacular.com/recipeImages/${resInfoData.id}-556x370.${resInfoData.imageType}`,
      ingredients: adaptSpoonacularIngredients(resInfoData.extendedIngredients),
      instructions: resInstructionsData.map((part) => {
        return { steps: part.steps.map((s) => s.step), title: part.name };
      }),
      isFavorite: false, // for now
      portions: resInfoData.servings,
      rating: resInfoData.spoonacularScore ? resInfoData.spoonacularScore : 0,
      timeInMinutes: resInfoData.readyInMinutes,
      title: resInfoData.title,
    };

    console.log(resInfoWithInstructions);

    return { data: resInfoWithInstructions, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

interface GetRecipeCardInfosData {
  cardsInfo: RecipeCardInfo[];
  totalRecipesFoundCount: number;
}

export async function getRecipeCardInfos(params: {
  /**Default: "" */
  query?: string;
  /**Default: "" */
  sort?: SpoonacularComplexSearchSortingOptions;
  number: number;
  /**Default: 0 */
  offset?: number;
}): Promise<{
  data: GetRecipeCardInfosData | null;
  error: any | null;
}> {
  const { query = "", sort = "", number, offset = 0 } = params;

  try {
    const res = await axiosSpoonacular.get("/complexSearch?", {
      params: {
        query,
        sort,
        number,
        offset,
      },
    });

    const resData: SpoonacularComplexSearchResponse = await res.data;

    const resInfo = await axiosSpoonacular.get("/informationBulk?", {
      params: {
        ids: resData.results.map((re) => re.id).join(","),
      },
    });

    const resesInfoData: SpoonacularRecipeInformationBulkResponse =
      await resInfo.data;

    const cardsInfo: RecipeCardInfo[] = resesInfoData.map((re) => {
      return {
        id: re.id,
        href: `/recipes/${re.id}`,
        imageURL: `https://spoonacular.com/recipeImages/${re.id}-556x370.${re.imageType}`,
        isFavorite: false, // for now
        // spoonacularScore is missing from the responses for some reason
        // (15.8.2022).
        rating: re.spoonacularScore ? re.spoonacularScore : 0,
        timeInMinutes: re.readyInMinutes,
        title: re.title,
      };
    });

    return {
      data: { cardsInfo, totalRecipesFoundCount: resData.totalResults },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}
