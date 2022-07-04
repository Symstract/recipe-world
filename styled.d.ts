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

    pageWidths: {
      mobile: {
        padding: string;
      };
      tablet: {
        padding: string;
      };
      desktop: {
        maxWidth: string;
      };
    };

    hoverBrightnessPercentages: {
      textPrimary: string;
    };
  }
}
