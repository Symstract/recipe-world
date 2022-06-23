import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
    };

    fonts: {
      heading: string;
      body: string;
    };

    breakpoints: {
      tablet: string;
      desktop: string;
    };

    pageWidth: string;
    pageMaxWidth: string;
  }
}
