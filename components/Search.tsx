import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

import SortIcon from "icons/sort.svg";
import RecipeCardList from "components/RecipeCardList";
import SearchField from "components/SearchField";
import { useState, useEffect, useCallback } from "react";
import { RecipeCardProps } from "./RecipeCard";

const SearchFieldContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 14rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 20rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 23rem;
  }
`;

const StyledSorting = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  height: 4rem;

  span {
    font-size: 1.7rem;
    line-height: 1em;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    span {
      font-size: 1.8rem;
    }
  }
`;

function Sorting() {
  return (
    <StyledSorting>
      <SortIcon />
      <span>Popular</span>
    </StyledSorting>
  );
}

const ResultsTitleAndSettings = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.8rem;
  margin-bottom: 1.8rem;

  & > span {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.2rem;
    line-height: 1em;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 3.2rem;
    margin-bottom: 3.2rem;
  }
`;

export default function Search() {
  const [totalResultCount, setTotalResultCount] = useState<number | null>(null);
  const [results, setResults] = useState<RecipeCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchRecipes = useCallback(async () => {
    if (
      !router.isReady ||
      (totalResultCount !== null && results.length === totalResultCount)
    ) {
      return;
    }

    try {
      const { query, sort } = router.query;

      setIsLoading(true);

      const res = await axios("/api/recipes", {
        params: { query, sort, offset: results.length },
      });
      const resData = await res.data;

      if (resData.error) {
        // TODO: show something to the user?
        return;
      }

      setIsLoading(false);

      setResults(results.concat(resData.data.cardsInfo));
      setTotalResultCount(resData.data.totalRecipesFoundCount);
    } catch (error) {
      // TODO: show something
    }
  }, [results, router.isReady, router.query, totalResultCount]);

  useEffect(() => {
    setIsLoading(false);
    setResults([]);
    setTotalResultCount(null);
  }, [router]);

  let resultsText;

  if (router.query.query) {
    resultsText = `Showing ${totalResultCount} results for "${router.query.query}"`;
  } else {
    resultsText = `Showing All ${totalResultCount} recipes`;
  }

  return (
    <>
      <SearchFieldContainer>
        <SearchField />
      </SearchFieldContainer>
      <ResultsTitleAndSettings>
        <span>{resultsText}</span>
        <Sorting />
      </ResultsTitleAndSettings>
      <RecipeCardList
        recipeCardPropList={results}
        isLoading={isLoading}
        onListEndIntersection={fetchRecipes}
      />
    </>
  );
}
