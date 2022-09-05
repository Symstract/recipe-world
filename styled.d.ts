import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      surface: string;
      surfaceHighlight: string;
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

    navbar: {
      mobileHeight: string;
      tabletHeight: string;
      borderWidth: string;
    };

    footerHeights: {
      mobile: string;
      tablet: string;
    };

    bodyLineHeight: string;
    inputInactiveOpacity: number;
    inputDisabledOpacity: nummber;
  }
}
