import Image from "next/image";
import Link from "next/link";
import styled, { useTheme } from "styled-components";

import { Button, ButtonStyle } from "components/Buttons";
import Rating from "components/Rating";
import FavoriteIcon from "icons/favorite-filled.svg";
import NotFavoriteIcon from "icons/favorite-border.svg";
import Clock from "icons/schedule.svg";

// Image
// =============================================================================

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 20 / 13;
`;

// Title and favorite toggle
// =============================================================================

const Title = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.8rem;
  }
`;

interface FavoriteToggleProps {
  mode: "add" | "remove";
}

const StyledFavoriteToggle = styled.div<FavoriteToggleProps>`
  flex-grow: 0;
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  opacity: ${(props) => (props.mode === "add" ? 0.75 : "initial")};

  &:hover {
    opacity: 1;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function FavoriteToggle(props: FavoriteToggleProps) {
  const { mode } = props;

  const theme = useTheme();

  const compactStyle: ButtonStyle = {
    color: theme.colors.accent,
    iconSize: "100%",
    width: "100%",
    height: "100%",
  };

  const regularStyle: ButtonStyle = {
    color: theme.colors.accent,
    iconSize: "100%",
    width: "100%",
    height: "100%",
  };

  const minWidthToShowRegularLayout = theme.breakpoints.desktop;

  let button;

  if (mode === "add") {
    button = (
      <Button
        icon={<NotFavoriteIcon />}
        hoverIcon={<FavoriteIcon />}
        compactStyle={compactStyle}
        regularStyle={regularStyle}
        minWidthToShowRegularLayout={minWidthToShowRegularLayout}
      />
    );
  } else {
    button = (
      <Button
        icon={<FavoriteIcon />}
        hoverIcon={<NotFavoriteIcon />}
        compactStyle={compactStyle}
        regularStyle={regularStyle}
        minWidthToShowRegularLayout={minWidthToShowRegularLayout}
      />
    );
  }

  return <StyledFavoriteToggle {...props}>{button}</StyledFavoriteToggle>;
}

const TitleAndFavoriteButton = styled.div`
  display: flex;
  gap: 1.5em;
  width: 100%;
`;

// Rating and time
// =============================================================================

const StyledTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  span {
    font-size: 1.5rem;
    line-height: 1em;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      width: 1.6rem;
      height: 1.6rem;
    }

    span {
      font-size: 1.6rem;
    }
  }
`;

function Time({ timeInMinutes }: { timeInMinutes: number }) {
  const hours = Math.floor(timeInMinutes / 60);
  const mins = timeInMinutes - hours * 60;
  const timeString = hours ? `${hours} h ${mins} min` : `${mins} min`;

  return (
    <StyledTime>
      <Clock />
      <span>{timeString}</span>
    </StyledTime>
  );
}

const RatingAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// Link
// =============================================================================

const StyledRecipeLink = styled.a`
  text-decoration: none;

  &:hover ${Title} {
    text-decoration: underline;
    filter: brightness(
      ${({ theme }) => theme.hoverBrightnessPercentages.textPrimary}
    );
  }
`;

// Recipe card
// =============================================================================

export interface RecipeCardProps {
  id: string;
  href: string;
  imageURL: string;
  title: string;
  isFavorite: boolean;
  rating: number;
  timeInMinutes: number;
}

const StyledRecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1.2rem;
  }
`;

export default function RecipeCard({
  href,
  imageURL,
  title,
  isFavorite,
  rating,
  timeInMinutes,
}: RecipeCardProps) {
  return (
    <Link href={href} passHref>
      <StyledRecipeLink>
        <StyledRecipeCard>
          <ImageContainer>
            <Image
              src="https://spoonacular.com/recipeImages/579247-556x370.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <TitleAndFavoriteButton>
            <Title>{title}</Title>
            <FavoriteToggle mode={isFavorite ? "remove" : "add"} />
          </TitleAndFavoriteButton>
          <RatingAndTime>
            <Rating rating={rating} />
            <Time timeInMinutes={timeInMinutes} />
          </RatingAndTime>
        </StyledRecipeCard>
      </StyledRecipeLink>
    </Link>
  );
}
