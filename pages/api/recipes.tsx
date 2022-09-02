import type { NextApiRequest, NextApiResponse } from "next";

import { getRecipeCardInfos } from "lib/requests";
import { SpoonacularComplexSearchSortingOptions } from "lib/spoonacularTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, sort, offset } = req.query;
  const recipes = await getRecipeCardInfos({
    number: 12,
    query: query as string,
    sort: sort as SpoonacularComplexSearchSortingOptions,
    offset: +offset,
  });
  res.status(200).json(recipes);

  if (recipes.error) console.log(recipes.error);
}
