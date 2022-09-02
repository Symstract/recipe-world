import styled from "styled-components";

import RecipeCard, { RecipeCardProps } from "components/RecipeCard";
import Spinner from "components/Spinner";
import { useEffect, useRef } from "react";

const tabletBreakpoint = "900px";

const RecipeCardListAndSpinner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.pageWidths.mobile.padding};
  width: 100%;

  @media screen and (min-width: ${tabletBreakpoint}) {
    gap: ${({ theme }) => theme.pageWidths.tablet.padding};
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface RecipeCardListProps {
  recipeCardPropList: RecipeCardProps[] | null;
  isLoading?: boolean;
  onListEndIntersection?: () => void;
}

const StyledRecipeCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, max-content);
  gap: ${({ theme }) => theme.pageWidths.mobile.padding};

  @media screen and (min-width: ${tabletBreakpoint}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.pageWidths.tablet.padding};
  }
`;

export default function RecipeCardList({
  recipeCardPropList,
  isLoading = false,
  onListEndIntersection,
}: RecipeCardListProps) {
  const intersectionElemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onListEndIntersection || !intersectionElemRef.current || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onListEndIntersection();
        }
      },
      {
        rootMargin: "0px 0px 400px 0px",
      }
    );
    observer.observe(intersectionElemRef.current);

    return () => observer.disconnect();
  });

  if (!recipeCardPropList) {
    return <span>Something went wrong, recipes could not be loaded.</span>;
  }

  return (
    <RecipeCardListAndSpinner>
      <StyledRecipeCardList>
        {recipeCardPropList.length > 0 &&
          recipeCardPropList.map((props) => (
            <li key={props.id}>
              <RecipeCard {...props} />
            </li>
          ))}
      </StyledRecipeCardList>
      <div ref={intersectionElemRef}></div>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </RecipeCardListAndSpinner>
  );
}
