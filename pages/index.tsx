import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

import heroImage from "../images/anto-meneghini-YiaDJAjD1S0-unsplash.jpg";
import PageHeadingBlock from "../components/PageHeadingBlock";
import { RecipeCardProps } from "../components/RecipeCard";
import RecipeCardList from "../components/RecipeCardList";
import Search from "../components/Search";
import SectionContainer from "../components/SectionContainer";
import NavigateNext from "../icons/navigate-next.svg";

// Hero image and text
// =============================================================================

const HeroImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  background-image: url(${heroImage.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 265px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 300px;
  }
`;

// Search
// =============================================================================

const StyledSearchSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 145px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 220px;
  }
`;

function SearchSection() {
  return (
    <SectionContainer>
      <StyledSearchSection>
        <Search />
      </StyledSearchSection>
    </SectionContainer>
  );
}

// Recipe sections
// =============================================================================

interface RecipeGroupProps {
  recipeCardPropList: Array<RecipeCardProps>;
  heading: string;
  linkToMore: string;
  linkToMoreLabel: string;
}

const RecipeGroupHeadingLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 0.3em;
  }

  svg *:not([fill="none"]) {
    fill: ${({ theme }) => theme.colors.primary};
  }

  &:hover h2 {
    text-decoration: underline;
  }
`;

const RecipeGroupLinkToMore = styled.a`
  align-self: flex-end;
  font-size: 1.7rem;
  line-height: 1em;
`;

const StyledRecipeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 32px;
  }
`;

function RecipeGroup({
  recipeCardPropList,
  heading,
  linkToMore,
  linkToMoreLabel,
}: RecipeGroupProps) {
  return (
    <StyledRecipeGroup>
      <Link href={linkToMore} passHref>
        <RecipeGroupHeadingLink>
          <h2>{heading}</h2>
          <NavigateNext />
        </RecipeGroupHeadingLink>
      </Link>

      <RecipeCardList recipeCardPropList={recipeCardPropList} />
      <Link href={linkToMore} passHref>
        <RecipeGroupLinkToMore>{linkToMoreLabel}</RecipeGroupLinkToMore>
      </Link>
    </StyledRecipeGroup>
  );
}

function PopularRecipesSection() {
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
    <section>
      <SectionContainer>
        <RecipeGroup
          heading="Popular"
          recipeCardPropList={recipeCardPropList}
          linkToMore="#"
          linkToMoreLabel="More Popular Recipes"
        />
      </SectionContainer>
    </section>
  );
}

// Page
// =============================================================================

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recipe World</title>
        <meta name="description" content="Find delicious recipes" />
      </Head>
      <main>
        <HeroImage>
          <PageHeadingBlock>
            <h1>Let&apos;s cook!</h1>
          </PageHeadingBlock>
        </HeroImage>
        <SearchSection />
        <PopularRecipesSection />
      </main>
    </>
  );
};

export default Home;
