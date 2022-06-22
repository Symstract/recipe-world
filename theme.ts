import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2F5607",
    accent: "#64336C",
    surface: "#FCFFF5",
    textPrimary: "#000000",
    textSecondary: "rgba(0, 0, 0, 0.7)",
  },

  fonts: {
    heading: "'Tienne', sans-serif",
    body: "'Carlito', sans-serif",
  },

  breakpoints: {
    tablet: "768px",
    desktop: "1440px",
  },

  pageWidth: "90%",
};

export default theme;
