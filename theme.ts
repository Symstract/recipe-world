import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2F5607",
    accent: "#64336C",
    surface: "#FCFFF5",
    surfaceHighlight: "#E3D9E7",
    textPrimary: "#1B1B1B",
    textPrimaryHover: "#505050",
    textSecondary: "rgba(0, 0, 0, 0.8)",
    textSecondaryHover: "black",
  },

  fonts: {
    heading: "'Volkhov', serif",
    body: "'Mukta', sans-serif",
  },

  breakpoints: {
    tablet: "768px",
    desktop: "1100px",
  },

  pageWidths: {
    mobile: {
      padding: "18px",
    },
    tablet: {
      padding: "24px",
    },
    desktop: {
      maxWidth: "1250px",
    },
  },

  navbar: {
    mobileHeight: "calc(5.4rem + 1px)",
    tabletHeight: "calc(6.6rem + 1px)",
    borderWidth: "1px",
  },

  footerHeights: {
    mobile: "6rem",
    tablet: "7rem",
  },

  bodyLineHeight: "1.5em",
  inputInactiveOpacity: 0.6,
  inputDisabledOpacity: 0.6,
};

export default theme;
