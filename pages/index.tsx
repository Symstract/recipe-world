import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import heroImage from "images/anto-meneghini-YiaDJAjD1S0-unsplash.jpg";
import PageHeadingBlock from "components/PageHeadingBlock";
import { RecipeCardProps } from "components/RecipeCard";
import RecipeCardList from "components/RecipeCardList";
import SearchField from "components/SearchField";
import SectionContainer from "components/SectionContainer";
import NavigateNext from "icons/navigate-next.svg";
import { getRecipeCardInfos } from "lib/requests";

// Hero image and text
// =============================================================================

const HeroImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

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
  height: 14.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 22rem;
  }
`;

function SearchSection() {
  return (
    <SectionContainer>
      <StyledSearchSection>
        <SearchField />
      </StyledSearchSection>
    </SectionContainer>
  );
}

// Recipe sections
// =============================================================================

interface RecipeGroupProps {
  recipeCardPropList: RecipeCardProps[] | null;
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
  color: ${({ theme }) => theme.colors.textSecondary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 2rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondaryHover};
  }
`;

const StyledRecipeGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  padding-bottom: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 3.2rem;
    padding-bottom: 3.2rem;
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

function PopularRecipesSection({
  recipeCardPropList,
}: {
  recipeCardPropList: RecipeCardProps[] | null;
}) {
  return (
    <section>
      <SectionContainer>
        <RecipeGroup
          heading="Popular"
          recipeCardPropList={recipeCardPropList}
          linkToMore="https://spoonacular.com/recipeImages/579247-556x370.jpg"
          linkToMoreLabel="More Popular Recipes"
        />
      </SectionContainer>
    </section>
  );
}

function HealthyRecipesSection({
  recipeCardPropList,
}: {
  recipeCardPropList: RecipeCardProps[] | null;
}) {
  return (
    <section>
      <SectionContainer>
        <RecipeGroup
          heading="Healthy"
          recipeCardPropList={recipeCardPropList}
          linkToMore="https://spoonacular.com/recipeImages/579247-556x370.jpg"
          linkToMoreLabel="More Healthy Recipes"
        />
      </SectionContainer>
    </section>
  );
}

// Page
// =============================================================================

interface PageProps {
  popularRecipes: RecipeCardProps[] | null;
  healthyRecipes: RecipeCardProps[] | null;
}

const Home: NextPage<PageProps> = ({ healthyRecipes, popularRecipes }) => {
  return (
    <>
      <Head>
        <title>Recipe World</title>
        <meta name="description" content="Find delicious recipes" />
      </Head>
      <main>
        <HeroImage>
          <Image src={heroImage} alt="" layout="fill" objectFit="cover" />
          <PageHeadingBlock>
            <h1>Let&apos;s cook!</h1>
          </PageHeadingBlock>
        </HeroImage>
        <SearchSection />
        <PopularRecipesSection recipeCardPropList={popularRecipes} />
        <HealthyRecipesSection recipeCardPropList={healthyRecipes} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const popularRes = await getRecipeCardInfos({
    sort: "popularity",
    number: 6,
  });

  if (popularRes.error) console.log(popularRes.error);

  const healthyRes = await getRecipeCardInfos({
    sort: "healthiness",
    number: 6,
  });

  if (healthyRes.error) console.log(healthyRes.error);

  const pageProps: PageProps = {
    healthyRecipes: healthyRes.data?.cardsInfo || null,
    popularRecipes: popularRes.data?.cardsInfo || null,
  };

  return {
    props: { ...pageProps },
  };
};

export default Home;
