import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import "@fontsource/carlito";
import "@fontsource/tienne";

import GlobalStyles from "../components/GlobalStyles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
