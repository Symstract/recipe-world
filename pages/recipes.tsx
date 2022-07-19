import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import backgroundImageLarge from "images/recipes-background-large.jpg";
import backgroundImageSmall from "images/recipes-background-small.jpg";
import PageHeadingBlock from "components/PageHeadingBlock";
import PageHeadingSectionContainer from "components/PageHeadingSectionContainer";
import Search from "components/Search";
import SectionContainer from "components/SectionContainer";

const HeadingSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .recipes-bg-image-large {
    display: none !important;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    .recipes-bg-image-small {
      display: none !important;
    }

    .recipes-bg-image-large {
      display: block !important;
    }
  }
`;

const StyledSearchSection = styled.div`
  padding-bottom: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: 3.2rem;
  }
`;

function SearchSection() {
  return (
    <StyledSearchSection>
      <SectionContainer>
        <Search />
      </SectionContainer>
    </StyledSearchSection>
  );
}

const Recipes: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recipes | Recipe World</title>
        <meta name="description" content="Find delicious recipes" />
      </Head>
      <main>
        <PageHeadingSectionContainer>
          <HeadingSection>
            <Image
              src={backgroundImageSmall}
              alt=""
              layout="fill"
              objectFit="cover"
              className="recipes-bg-image-small"
            />
            <Image
              src={backgroundImageLarge}
              alt=""
              layout="fill"
              objectFit="cover"
              className="recipes-bg-image-large"
            />
            <PageHeadingBlock>
              <h1>Recipes</h1>
            </PageHeadingBlock>
          </HeadingSection>
        </PageHeadingSectionContainer>
      </main>
      <SearchSection />
    </>
  );
};

export default Recipes;
