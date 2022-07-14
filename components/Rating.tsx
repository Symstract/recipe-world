import styled from "styled-components";

import StarEmpty from "../icons/grade.svg";
import StarHalf from "../icons/star-half.svg";
import StarFull from "../icons/star.svg";

const StyledRating = styled.div`
  display: flex;
  gap: 0.2rem;

  * {
    width: 1.4rem;
    height: 1.4rem;
  }

  svg * {
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

export function Rating({ rating }: { rating: number }) {
  const ratingScaled = Math.round(rating) / 2;
  const fullStarCount = Math.floor(ratingScaled);
  const halfStarCount = fullStarCount - Math.ceil(ratingScaled);

  const stars = new Array(5).fill(<StarEmpty />);
  stars.fill(<StarFull />, 0, fullStarCount);

  if (halfStarCount) {
    stars[fullStarCount] = <StarHalf />;
  }

  return (
    <StyledRating>
      {stars[0]}
      {stars[1]}
      {stars[2]}
      {stars[3]}
      {stars[4]}
    </StyledRating>
  );
}
