import styled, { css } from "styled-components";

import StarEmpty from "icons/grade.svg";
import StarHalf from "icons/star-half.svg";
import StarFull from "icons/star.svg";

interface RatingProps {
  rating: number;
  size?: "small" | "large";
}

const smallStyle = css`
  display: flex;
  gap: 0.2rem;

  * {
    width: 1.4rem;
    height: 1.4rem;
  }

  svg * {
    fill: ${({ theme }) => theme.colors.accent};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    * {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const largeStyle = css`
  display: flex;
  gap: 0.2rem;

  * {
    width: 2.2rem;
    height: 2.2rem;
  }

  svg * {
    fill: ${({ theme }) => theme.colors.accent};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    * {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const StyledRating = styled.div<RatingProps>`
  ${(props) => (props.size === "large" ? largeStyle : smallStyle)}
`;

export default function Rating(props: RatingProps) {
  const ratingScaled = Math.round(props.rating) / 2;
  const fullStarCount = Math.floor(ratingScaled);
  const halfStarCount = fullStarCount - Math.ceil(ratingScaled);

  const stars = new Array(5).fill(<StarEmpty />);
  stars.fill(<StarFull />, 0, fullStarCount);

  if (halfStarCount) {
    stars[fullStarCount] = <StarHalf />;
  }

  return (
    <StyledRating {...props}>
      {stars[0]}
      {stars[1]}
      {stars[2]}
      {stars[3]}
      {stars[4]}
    </StyledRating>
  );
}
