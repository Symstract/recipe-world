import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    background: ${({ theme }) => theme.colors.surface};
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
    font-size: 1.6rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  img {
    display: block;
  }

  li {
    list-style: none;
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primary};
  }

  h1 {
    font-size: 2.8rem;
  }

  h2 {
    font-size: 2.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}){
    h1 {
      font-size: 5.8rem;
    }

    h2 {
      font-size: 3.6rem;
    }

    body {
      font-size: 1.9rem;
    }
  }

  @media print {
    h1 {
      font-size: 2.4rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    body {
      font-size: 1.2rem;
    }
  }
`;

export default GlobalStyles;
