import styled from "styled-components";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";

interface RecipeCardListProps {
  recipeCardPropList: Array<RecipeCardProps>;
  gap: string;
}

const StyledRecipeCardList = styled.ul<RecipeCardListProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${(props) => props.gap};
`;

export default function RecipeCardList(props: RecipeCardListProps) {
  return (
    <StyledRecipeCardList {...props}>
      {props.recipeCardPropList.map((props) => (
        <li key={props.id}>
          <RecipeCard {...props} />
        </li>
      ))}
    </StyledRecipeCardList>
  );
}
