import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import backgroundImage from "images/favorites-background.jpg";
import PageHeadingBlock from "components/PageHeadingBlock";
import PageHeadingSectionContainer from "components/PageHeadingSectionContainer";
import SectionContainer from "components/SectionContainer";
import RecipeCardList from "components/RecipeCardList";

const HeadingSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledFavoriteRecipes = styled.div`
  margin-top: 2.6rem;
  margin-bottom: 2.6rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 3.2rem;
    margin-bottom: 3.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
  }
`;

function FavoriteRecipes() {
  // Initial test content
  const recipeCardPropList = [
    {
      id: 5682345,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "Pasta Bolognese",
      isFavorite: true,
      rating: 7.4,
      timeInMinutes: 145,
    },
    {
      id: 123435466,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 6.7,
      timeInMinutes: 45,
    },
    {
      id: 45712334566,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "deodklgmoiergg asdfsdfsdfswef sdfwsedsf ewsfwseswf sfesdf",
      isFavorite: false,
      rating: 8.9,
      timeInMinutes: 70,
    },
    {
      id: 2353463,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "deodklgmoiergg",
      isFavorite: true,
      rating: 3,
      timeInMinutes: 25,
    },
    {
      id: 45672345,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 6.7,
      timeInMinutes: 110,
    },
    {
      id: 672353456,
      href: "/",
      imageURL: "https://spoonacular.com/recipeImages/579247-556x370.jpg",
      title: "deodklgmoiergg",
      isFavorite: false,
      rating: 9.79,
      timeInMinutes: 35,
    },
  ];

  return (
    <SectionContainer>
      <StyledFavoriteRecipes>
        <RecipeCardList recipeCardPropList={recipeCardPropList} />
      </StyledFavoriteRecipes>
    </SectionContainer>
  );
}

const Favorites: NextPage = () => {
  return (
    <>
      <Head>
        <title>Favorites | Recipe World</title>
        <meta name="description" content="Favorite recipes" />
      </Head>
      <main>
        <PageHeadingSectionContainer>
          <HeadingSection>
            <Image
              src={backgroundImage}
              alt=""
              layout="fill"
              objectFit="cover"
            />
            <PageHeadingBlock>
              <h1>Favorites</h1>
            </PageHeadingBlock>
          </HeadingSection>
        </PageHeadingSectionContainer>
        <FavoriteRecipes />
      </main>
    </>
  );
};

export default Favorites;
