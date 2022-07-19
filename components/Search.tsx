import styled from "styled-components";

import SortIcon from "icons/sort.svg";
import RecipeCardList from "components/RecipeCardList";
import SearchField from "components/SearchField";

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
    font-size: 2rem;
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
  // Initial test content
  const recipeCardPropList = [
    {
      id: "sdgfjknergg",
      href: "/",
      imageURL: "#",
      title: "Pasta Bolognese",
      isFavorite: true,
      rating: 7.4,
      timeInMinutes: 145,
    },
    {
      id: "235dfsd",
      href: "/",
      imageURL: "#",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 6.7,
      timeInMinutes: 45,
    },
    {
      id: "23523df5",
      href: "/",
      imageURL: "#",
      title: "deodklgmoiergg asdfsdfsdfswef sdfwsedsf ewsfwseswf sfesdf",
      isFavorite: false,
      rating: 8.9,
      timeInMinutes: 70,
    },
    {
      id: "346fgg233",
      href: "/",
      imageURL: "#",
      title: "deodklgmoiergg",
      isFavorite: true,
      rating: 3,
      timeInMinutes: 25,
    },
    {
      id: "sdg346fgdf",
      href: "/",
      imageURL: "#",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 6.7,
      timeInMinutes: 110,
    },
    {
      id: "75l7ifgn",
      href: "/",
      imageURL: "#",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 9.79,
      timeInMinutes: 35,
    },
  ];

  return (
    <>
      <SearchFieldContainer>
        <SearchField />
      </SearchFieldContainer>
      <ResultsTitleAndSettings>
        <span>Showing All Recipes</span>
        <Sorting />
      </ResultsTitleAndSettings>
      <RecipeCardList recipeCardPropList={recipeCardPropList} />
    </>
  );
}
