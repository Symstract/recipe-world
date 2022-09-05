import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import { addOpacityToHexColor } from "lib/colorUtils";
import Clock from "icons/schedule.svg";
import Group from "icons/group.svg";
import Favorite from "icons/favorite-filled.svg";
import NotFavorite from "icons/favorite-border.svg";
import Print from "icons/print.svg";
import Rating from "components/Rating";
import SectionContainer from "components/SectionContainer";
import {
  IngredientInfo,
  RecipeInfo,
  RecipeInstructionPartInfo,
} from "lib/recipeTypes";
import { getRecipeInfo } from "lib/requests";

// Image
// =============================================================================

const ImageContainer = styled.div`
  position: relative;
  height: 260px;
  width: 100%;
  max-width: ${({ theme }) => theme.pageWidths.desktop.maxWidth};
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: calc(100% - ${({ theme }) => theme.pageWidths.tablet.padding} * 2);
    height: 600px;
  }
`;

// Recipe info
// =============================================================================

const RecipeInfoSection = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    background: #f4f8ec;
  }
`;

const RecipeInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.4rem;
  width: 100%;
  max-width: 750px;
  margin-top: 3.4rem;

  h1 {
    text-align: center;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

// === Time and portions ===

interface TimeAndPortionsProps {
  timeInMinutes: number;
  portions: number;
}

const StyledTimeAndPortions = styled.div`
  display: flex;
  gap: 2.4rem;

  div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1em;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  svg *:not([fill="none"]) {
    fill: ${({ theme }) => theme.colors.textSecondary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

function TimeAndPortions({ timeInMinutes, portions }: TimeAndPortionsProps) {
  const hours = Math.floor(timeInMinutes / 60);
  const mins = timeInMinutes - hours * 60;
  const timeString = hours ? `${hours} h ${mins} min` : `${mins} min`;

  return (
    <StyledTimeAndPortions>
      <div>
        <Clock />
        <span>{timeString}</span>
      </div>
      <div>
        <Group />
        <span>{`${portions} portions`}</span>
      </div>
    </StyledTimeAndPortions>
  );
}

// === Rating and credits ===

interface CreditsProps {
  name: string;
  url: string;
}

const StyledCredits = styled.div`
  * {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

function Credits({ name, url }: CreditsProps) {
  let content;

  if (!name && !url) {
    content = <span>By unknown</span>;
  } else if (name && !url) {
    content = <span>By {name}</span>;
  } else if (!name && url) {
    content = (
      <span>
        By <a href={url}>{url}</a>
      </span>
    );
  } else {
    content = (
      <span>
        By <a href={url}>{name}</a>
      </span>
    );
  }

  return <StyledCredits>{content}</StyledCredits>;
}

const RatingAndCredits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

// === Description ===

const Description = styled.span`
  align-self: flex-start;
`;

// === Buttons ===

const RecipeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  svg *:not([fill="none"]) {
    fill: ${({ theme }) => theme.colors.textSecondary};
  }

  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:hover {
    svg *:not([fill="none"]) {
      fill: ${({ theme }) => theme.colors.textSecondaryHover};
    }

    span {
      color: ${({ theme }) => theme.colors.textSecondaryHover};
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      width: 2.8rem;
      height: 2.8rem;
    }
  }
`;

interface FavoriteToggleProps {
  isFavorite: boolean;
}

const FavoriteToggle = styled(RecipeButton)<FavoriteToggleProps>`
  svg *:not([fill="none"]) {
    fill: ${({ theme }) => theme.colors.accent};
  }

  svg:first-of-type {
    display: ${(props) => (props.isFavorite ? "initial" : "none")};
  }

  svg:last-of-type {
    display: ${(props) => (props.isFavorite ? "none" : "initial")};
    opacity: ${(props) => (props.isFavorite ? "initial" : 0.75)};
  }

  &:hover {
    svg *:not([fill="none"]) {
      fill: ${({ theme }) => theme.colors.accent};
    }

    svg:first-of-type {
      display: ${(props) => (props.isFavorite ? "none" : "initial")};
    }
    svg:last-of-type {
      display: ${(props) => (props.isFavorite ? "initial" : "none")};
      opacity: 1;
    }
  }
`;

const StyledButtonsSection = styled.div`
  width: 100%;
  padding: 0.8rem 0;
  border-top: 1px solid ${addOpacityToHexColor("#7D4F60", 0.2)};
  border-bottom: 1px solid ${addOpacityToHexColor("#7D4F60", 0.2)};

  div {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    border: none;

    div {
      gap: 3.2rem;
    }
  }
`;

function ButtonSection({ isFavorite }: { isFavorite: boolean }) {
  const label = isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES";

  return (
    <StyledButtonsSection>
      <div>
        <FavoriteToggle isFavorite={isFavorite}>
          <Favorite />
          <NotFavorite />
          <span>{label}</span>
        </FavoriteToggle>
        <RecipeButton>
          <Print />
          <span>PRINT</span>
        </RecipeButton>
      </div>
    </StyledButtonsSection>
  );
}

// Ingredients and instructions
// =============================================================================

const IngredientsAndInsctructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding: 3.4rem 0;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    width: 100%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 3.4rem;

    & > div {
      gap: 2.8rem;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    gap: 0;
    padding: 4rem 0;

    & > :first-child {
      flex-shrink: 0;
      width: 500px;
      padding-right: 45px;
    }

    & > div {
      gap: 3.6rem;
    }
  }
`;

// === Ingredients ===

interface AmountAndUnitProps {
  amount: number | null;
  unit: string;
}

const StyledAmountAndUnit = styled.span`
  display: inline-block;
  width: 11rem;
`;

function AmountAndUnit({ amount, unit }: AmountAndUnitProps) {
  // It's assumed that the amount is divisible by 0.25.

  let wholeNumber;
  let fractionCode = null;

  if (!amount || Number.isInteger(amount)) {
    wholeNumber = amount;
  } else {
    wholeNumber = Math.trunc(amount) !== 0 ? Math.trunc(amount) : null;
    const numerator = Math.round((amount % 1) * 100) / 100 / 0.25;

    if (numerator === 1) {
      fractionCode = <>&frac14;</>;
    } else if (numerator === 2) {
      fractionCode = <>&frac12;</>;
    } else if (numerator === 3) {
      fractionCode = <>&frac34;</>;
    }
  }

  return (
    <StyledAmountAndUnit>
      {wholeNumber} {fractionCode} {unit}
    </StyledAmountAndUnit>
  );
}

const StyledIngredientList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function IngredientList({ ingredients }: { ingredients: IngredientInfo[] }) {
  return (
    <StyledIngredientList>
      {ingredients.map((ing, index) => (
        <li key={index}>
          <AmountAndUnit amount={ing.amount} unit={ing.unit} />

          <span>{ing.name}</span>
        </li>
      ))}
    </StyledIngredientList>
  );
}

// === Instructions ===

const InstructionStep = styled.li`
  display: flex;
  gap: 1.6rem;

  & > :first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.2rem;
    height: 2.2rem;
    background: ${({ theme }) => theme.colors.accent};
    font-size: 1.4rem;
    text-align: center;
    color: white;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    & > :first-child {
      width: 2.4rem;
      height: 2.4rem;
      font-size: 1.6rem;
    }
  }
`;

const StyledInstructionList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 3rem;
  }
`;

function InstructionList({ steps }: { steps: string[] }) {
  return (
    <StyledInstructionList>
      {steps.map((step, index) => (
        <InstructionStep key={index}>
          <span>{`${index + 1}.`}</span>
          <span>{step}</span>
        </InstructionStep>
      ))}
    </StyledInstructionList>
  );
}

const StyledInstructionPart = styled.li`
  h3 {
    margin-bottom: 2.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    h3 {
      margin-bottom: 3rem;
    }
  }
`;

interface InstructionPartProps {
  heading: string;
  steps: string[];
}

function InstructionPart({ heading, steps }: InstructionPartProps) {
  return (
    <StyledInstructionPart>
      {heading && <h3>{heading}</h3>}
      <InstructionList steps={steps} />
    </StyledInstructionPart>
  );
}

const StyledInstructions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 2.8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 3.6rem;
  }
`;

function Instructions({
  instructions,
}: {
  instructions: RecipeInstructionPartInfo[];
}) {
  return (
    <StyledInstructions>
      {instructions.map((part, index) => (
        <InstructionPart key={index} heading={part.title} steps={part.steps} />
      ))}
    </StyledInstructions>
  );
}

// Recipe not found
// =============================================================================

const RecipeNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 60px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 90px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 120px;
  }
`;

// Page
// =============================================================================

interface PageProps {
  recipeInfo: RecipeInfo | null;
}

const Recipe: NextPage<PageProps> = ({ recipeInfo }) => {
  if (!recipeInfo) {
    return (
      <SectionContainer>
        <RecipeNotFound>
          <h1>Recipe not found</h1>
        </RecipeNotFound>
      </SectionContainer>
    );
  }

  const {
    credits,
    description,
    imageUrl,
    ingredients,
    instructions,
    isFavorite,
    portions,
    rating,
    timeInMinutes,
    title,
  } = recipeInfo;

  return (
    <>
      <Head>
        <title>{`${title} | Recipe World`}</title>
        <meta name="description" content="Recipe" />
      </Head>
      <main>
        <ImageContainer>
          <Image
            src={imageUrl}
            alt=""
            layout="fill"
            objectFit="cover"
            className="recipes-bg-image-small"
          />
        </ImageContainer>
        <SectionContainer>
          <RecipeInfoSection>
            <RecipeInfoContent>
              <h1>{title}</h1>
              <TimeAndPortions
                timeInMinutes={timeInMinutes}
                portions={portions}
              />
              <RatingAndCredits>
                <Rating rating={rating} size="large" />
                <Credits name={credits.name} url={credits.url} />
              </RatingAndCredits>
              <Description
                dangerouslySetInnerHTML={{ __html: description }}
              ></Description>
              <ButtonSection isFavorite={isFavorite} />
            </RecipeInfoContent>
          </RecipeInfoSection>
          <IngredientsAndInsctructions>
            <div>
              <h2>Ingredients</h2>
              <IngredientList ingredients={ingredients} />
            </div>
            <div>
              <h2>Instructions</h2>
              <Instructions instructions={instructions} />
            </div>
          </IngredientsAndInsctructions>
        </SectionContainer>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const resInfo = await getRecipeInfo(+context.params!.id!);

  if (resInfo.error) console.log(resInfo.error);

  const resInfoData = resInfo.data;

  if (!resInfoData) {
    const pageProps: PageProps = { recipeInfo: null };
    return { props: { ...pageProps } };
  }

  const pageProps: PageProps = { recipeInfo: resInfoData };
  return { props: { ...pageProps } };
};

export default Recipe;
