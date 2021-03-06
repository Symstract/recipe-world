import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      surface: string;
      textPrimary: string;
      textPrimaryHover: string;
      textSecondary: string;
      textSecondaryHover: string;
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

    footerHeights: {
      mobile: string;
      tablet: string;
    };

    inputInactiveOpacity: number;
    inputDisabledOpacity: nummber;
  }
}
