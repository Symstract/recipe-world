import type { NextApiRequest, NextApiResponse } from "next";

import { getRecipeSearchSuggestions } from "lib/requests";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.query;
  const suggestions = await getRecipeSearchSuggestions(query as string);
  res.status(200).json(suggestions);

  if (suggestions.error) console.log(suggestions.error);
}
