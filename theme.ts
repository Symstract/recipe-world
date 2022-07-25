import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2F5607",
    accent: "#64336C",
    surface: "#FCFFF5",
    textPrimary: "#1B1B1B",
    textSecondary: "rgba(0, 0, 0, 0.8)",
  },

  fonts: {
    heading: "'Tienne', sans-serif",
    body: "'Carlito', sans-serif",
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

  footerHeights: {
    mobile: "6rem",
    tablet: "7rem",
  },

  hoverBrightnessPercentages: {
    textPrimary: "400%",
  },

  inputInactiveOpacity: 0.6,
  inputDisabledOpacity: 0.6,
};

export default theme;
