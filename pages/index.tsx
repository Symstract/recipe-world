import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import heroImage from "../images/anto-meneghini-YiaDJAjD1S0-unsplash.jpg";
import PageHeadingBlock from "../components/PageHeadingBlock";
import Search from "../components/Search";
import SectionContainer from "../components/SectionContainer";

const HeroImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  background-image: url(${heroImage.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 265px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 300x;
  }
`;

const StyledSearchSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;

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
      </main>
    </>
  );
};

export default Home;
