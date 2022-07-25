import type { AppProps } from "next/app";
import styled, { ThemeProvider } from "styled-components";

import "@fontsource/carlito";
import "@fontsource/tienne";

import GlobalStyles from "components/GlobalStyles";
import Footer from "components/Footer";
import Header from "components/Header";
import theme from "theme";

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const PageContent = styled.div`
  padding-bottom: ${({ theme }) => theme.footerHeights.mobile};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: ${({ theme }) => theme.footerHeights.tablet};
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageContainer>
        <Header />
        <PageContent>
          <Component {...pageProps} />
        </PageContent>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  );
}

export default MyApp;
