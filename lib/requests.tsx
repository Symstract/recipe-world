import axios from "axios";

import { RecipeCardInfo } from "lib/recipeTypes";
import {
  SpoonacularComplexSearchResponse,
  SpoonacularComplexSearchSortingOptions,
  SpoonacularRecipeInformationBulkResponse,
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

export async function getRecipeCardInfos(params: {
  /**Default: "" */
  query?: string;
  /**Default: "" */
  sort?: SpoonacularComplexSearchSortingOptions;
  number: number;
}): Promise<{
  data: RecipeCardInfo[] | null;
  error: any | null;
}> {
  const { query = "", sort = "", number } = params;

  try {
    const res = await axiosSpoonacular.get("/complexSearch?", {
      params: {
        query,
        sort,
        number,
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
    return { data: cardsInfo, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
