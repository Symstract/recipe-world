import styled from "styled-components";

import RecipeCard, { RecipeCardProps } from "components/RecipeCard";

interface RecipeCardListProps {
  recipeCardPropList: RecipeCardProps[] | null;
}

const StyledRecipeCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, max-content);
  gap: ${({ theme }) => theme.pageWidths.mobile.padding};

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.pageWidths.tablet.padding};
  }
`;

export default function RecipeCardList({
  recipeCardPropList,
}: RecipeCardListProps) {
  if (!recipeCardPropList) {
    return <span>Something went wrong, recipes could not be loaded.</span>;
  }

  return (
    <StyledRecipeCardList>
      {recipeCardPropList.map((props) => (
        <li key={props.id}>
          <RecipeCard {...props} />
        </li>
      ))}
    </StyledRecipeCardList>
  );
}
