import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    background: ${({ theme }) => theme.colors.surface};
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.8rem;
    line-height: ${({ theme }) => theme.bodyLineHeight};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  img {
    display: block;
  }

  li {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }

  h1 {
    font-size: 3.3rem;
  }

  h2 {
    font-size: 2.6rem;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}){
    h1 {
      font-size: 4.2rem;
    }

    h2 {
      font-size: 2.8rem;
    }

    * {
      font-size: 1.8rem;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}){
    h1 {
      font-size: 5rem;
    }

    h2 {
      font-size: 3.2rem;
    }

    * {
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

    * {
      font-size: 1.2rem;
    }
  }
`;

export default GlobalStyles;
