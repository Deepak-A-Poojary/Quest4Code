import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("qcTheme") || "grey",
  ThemeColors: {
    grey: {
      MainThemeColor: "#374151", //used
      background:
        "linear-gradient(162deg, rgba(80, 109, 138, 1) 0%, rgba(56, 75, 94, 1) 35%, rgba(46, 62, 78, 1) 61%, rgba(46, 62, 78, 1) 77%)", //used
      backgroundColor: "rgba(80, 109, 138, 1)",
      secondryBg: "#1f2937",
      text: "rgba(255, 255, 255, 0.87)", //used
      secondryText: "#d1d5db",
      borderColor: "#bccad6",
      colorPaletteBg: "rgba(255, 255, 255, 0.05)",
      colorPaletteBorder: "rgba(31, 38, 135, 0.37)",
      buttonColor: "#2a333f",
      buttonRemoveColorBg: "rgba(255, 0, 0, 0.8)",
      buttonRemoveColorText: "rgba(255, 255, 255, 1)",
      accentColor: "rgba(0, 122, 255, 1)",
      linkColor: "rgba(0, 122, 255, 1)",
      linkHoverColor: "rgba(0, 100, 200, 1)",
      borderColorLight: "rgba(255, 255, 255, 0.3)",
      shadowColor: "rgba(0, 0, 0, 0.3)",
      successColor: "rgba(76, 175, 80, 1)",
      errorColor: "rgba(239, 83, 80, 1)",
      warningColor: "rgba(255, 193, 7, 1)",
      disabledBgColor: "rgba(200, 200, 200, 0.5)",
      disabledTextColor: "rgba(150, 150, 150, 0.6)",
      overlayColor: "rgba(0, 0, 0, 0.5)",

      // Navbar styles
      navbarBgColor: "#2B3A47",
      navbarTextColor: "rgba(255, 255, 255, 0.87)",
      navbarLinkColor: "#FFA726",
      navbarLinkHoverColor: "rgba(0, 100, 200, 1)",
      navbarHeight: "60px",
      navbarShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      navbarBorderBottom: "1px solid rgba(0, 0, 0, 0.3)",

      // Card styles
      cardBgColor: "rgba(100, 120, 140, 0.8)",
      cardTextColor: "rgba(255, 255, 255, 0.87)",
      cardSecondryText: "#d5ebf4",
      cardBorderColor: "rgba(70, 90, 110, 1)",

      // Drawer styles
      drawerBgColor: "rgba(60, 70, 80, 0.95)",
      drawerTextColor: "rgba(220, 220, 220, 0.87)",
      drawerBorderColor: "rgba(70, 80, 90, 0.8)",
      drawerShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
      drawerHandleColor: "rgba(255, 255, 255, 0.7)",
      drawerHandleHoverColor: "rgba(255, 255, 255, 1)",
      drawerSecondaryBgColor: "rgba(70, 80, 90, 0.95)",
      drawerActiveTabBgColor: "rgba(0, 122, 255, 1)",
      drawerInactiveTabBgColor: "rgba(60, 70, 80, 0.75)",
      drawerInactiveTabTextColor: "rgba(200, 200, 200, 0.7)",
      drawerTabBorderColor: "rgba(80, 90, 100, 0.6)",
      drawerButtonBgColor: "#d54c06",
      drawerButtonHoverColor: "rgba(80, 90, 100, 1)",
      drawerCloseButtonColor: "rgba(150, 160, 170, 0.8)",
      drawerCard: "#2a333f",
      drawerPannelBg: "#3d4b5e",

      // upload button styles
      uploadBgColor: "red",
      uploadBorderColor: "#6B7280",
      uploadTextColor: "#E5E7EB",
      uploadHoverBgColor: "#2D3748",
      uploadHoverBorderColor: "#D1D5DB",

      //input styles
      inputBgColor: "rgba(255, 255, 255, 0.1)",
      inputBorderColor: "rgba(255, 255, 255, 0.3)",
      inputTextColor: "rgba(255, 255, 255, 0.9)",
      inputHoverBgColor: "rgba(255, 255, 255, 0.2)",
      inputHoverBorderColor: "rgba(255, 255, 255, 0.4)",
      inputHoverTextColor: "rgba(255, 255, 255, 1)",
    },
    dark: {
      MainThemeColor: "rgba(40, 40, 40, 1)",
      background:
        "linear-gradient(162deg, rgba(40, 40, 40, 1) 0%, rgba(30, 30, 30, 1) 35%, rgba(20, 20, 20, 1) 61%, rgba(20, 20, 20, 1) 77%)",
      backgroundColor: "rgba(40, 40, 40, 1)",
      secondryBg: "rgba(40, 40, 40, 1)",
      text: "#dcdcdc",
      secondryText: "#d1d5db",
      borderColor: "#5a6268",
      colorPaletteBg: "rgba(255, 255, 255, 0.1)",
      colorPaletteBorder: "rgba(40, 40, 40, 0.5)",
      buttonColor: "#0b0916",
      buttonRemoveColorBg: "rgba(200, 0, 0, 0.9)",
      buttonRemoveColorText: "rgba(255, 255, 255, 1)",
      accentColor: "rgba(0, 150, 255, 1)",
      linkColor: "rgba(0, 150, 255, 1)",
      linkHoverColor: "rgba(0, 120, 220, 1)",
      borderColorLight: "rgba(255, 255, 255, 0.4)",
      shadowColor: "rgba(0, 0, 0, 0.4)",
      successColor: "rgba(67, 160, 71, 1)",
      errorColor: "rgba(244, 67, 54, 1)",
      warningColor: "rgba(255, 202, 40, 1)",
      disabledBgColor: "rgba(180, 180, 180, 0.5)",
      disabledTextColor: "rgba(120, 120, 120, 0.6)",
      overlayColor: "rgba(0, 0, 0, 0.6)",

      // Navbar styles
      navbarBgColor: "rgba(20, 20, 20, 0.95)",
      navbarTextColor: "rgba(220, 220, 220, 0.87)",
      navbarLinkColor: "#FFA726",
      navbarLinkHoverColor: "rgba(0, 120, 220, 1)",
      navbarHeight: "60px",
      navbarShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      navbarBorderBottom: "1px solid rgba(0, 0, 0, 0.3)",

      // Card styles
      cardBgColor: "rgba(60, 60, 60, 0.9)",
      cardTextColor: "rgba(220, 220, 220, 0.87)",
      cardSecondryText: "#d5ebf4",
      cardBorderColor: "rgba(80, 80, 80, 0.8)",

      // Drawer styles
      drawerBgColor: "#1e1e1e",
      drawerTextColor: "#dcdcdc",
      drawerBorderColor: "#323232",
      drawerShadow: "#000000",
      drawerHandleColor: "#ffffff",
      drawerHandleHoverColor: "#ffffff",
      drawerSecondaryBgColor: "#444547",
      drawerActiveTabBgColor: "#0091ff",
      drawerInactiveTabBgColor: "#f0f8ff",
      drawerInactiveTabTextColor: "#646464",
      drawerTabBorderColor: "#b4b4b4",
      drawerButtonBgColor: "#d54c06",
      drawerButtonHoverColor: "#e1e1e1",
      drawerCloseButtonColor: "#969696",
      drawerCard: "#0b0916",
      drawerPannelBg: "#18181e",

      // upload button styles
      uploadBgColor: "#2D3748",
      uploadBorderColor: "#4A5568",
      uploadTextColor: "#E2E8F0",
      uploadHoverBgColor: "#4A5568",
      uploadHoverBorderColor: "#CBD5E0",

      // input styles
      inputBgColor: "#0e0e0e",
      inputBorderColor: "#2a2e34",
      inputTextColor: "#E2E8F0",
      inputHoverBgColor: "#4A5568",
      inputHoverBorderColor: "#CBD5E0",
      inputPlaceholderColor: "#94A3B8",
    },
    light: {
      MainThemeColor: "rgba(255, 255, 255, 0.95)", // Keeps the soft, complementary tone
      background:
        "linear-gradient(162deg, rgba(230, 230, 250, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      secondryBg: "#eceef1", // Complementary to the background
      text: "#1c1e21", // Darker for better readability
      secondryText: "#3a3f44", // Darker secondary text for contrast
      borderColor: "#99b3e6", // Adjusted for subtlety
      colorPaletteBg: "rgba(255, 255, 255, 0.9)",
      colorPaletteBorder: "rgba(170, 170, 180, 0.4)", // Softer tone
      buttonColor: "#f8faf7", // Darker to improve contrast
      buttonRemoveColorBg: "rgba(255, 100, 100, 0.8)",
      buttonRemoveColorText: "rgba(30, 30, 30, 1)", // Darker for readability
      accentColor: "rgba(0, 120, 230, 1)", // Slightly softer
      linkColor: "rgba(0, 120, 230, 1)", // Harmonized with accent color
      linkHoverColor: "rgba(0, 100, 200, 1)", // Slightly deeper hover effect
      borderColorLight: "rgba(255, 255, 255, 0.5)",
      shadowColor: "rgba(0, 0, 0, 0.08)", // Softer shadow
      successColor: "rgba(70, 165, 75, 1)", // Slightly muted green
      errorColor: "rgba(229, 73, 70, 1)", // Slightly softer red
      warningColor: "rgba(255, 185, 5, 1)", // Slightly softer yellow
      disabledBgColor: "rgba(245, 245, 245, 0.6)",
      disabledTextColor: "rgba(150, 150, 150, 0.7)",
      overlayColor: "rgba(0, 0, 0, 0.04)", // Slightly lighter overlay

      // Navbar styles
      navbarBgColor: "rgba(255, 255, 255, 0.95)",
      navbarTextColor: "rgba(30, 30, 30, 0.87)", // Darker navbar text for readability
      navbarLinkColor: "#FFA726",
      navbarLinkHoverColor: "rgba(0, 100, 200, 1)",

      // Card styles
      cardBgColor: "rgba(250, 250, 250, 0.95)",
      cardTextColor: "rgba(30, 30, 30, 0.87)", // Darker card text for readability
      cardSecondryText: "#37374c",
      cardBorderColor: "rgba(190, 190, 200, 0.6)", // Slightly cooler tone

      // Drawer styles
      drawerBgColor: "#eceeeb",
      drawerTextColor: "rgba(40, 40, 40, 0.87)",
      drawerBorderColor: "rgba(180, 180, 180, 0.8)",
      drawerShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      drawerHandleColor: "rgba(100, 100, 100, 0.7)",
      drawerHandleHoverColor: "rgba(40, 40, 40, 1)",
      drawerSecondaryBgColor: "rgba(245, 250, 255, 0.95)",
      drawerActiveTabBgColor: "rgba(0, 145, 255, 1)",
      drawerInactiveTabBgColor: "rgba(240, 248, 255, 0.75)",
      drawerInactiveTabTextColor: "rgba(100, 100, 100, 0.7)",
      drawerTabBorderColor: "rgba(180, 180, 180, 0.6)",
      drawerButtonBgColor: "#d54c06",
      drawerButtonHoverColor: "rgba(225, 225, 225, 1)",
      drawerCloseButtonColor: "rgba(150, 150, 150, 0.8)",
      drawerCard: "#f8faf7",
      drawerPannelBg: "#e2e4e1",

      // upload button styles
      uploadBgColor: "#F3F4F6",
      uploadBorderColor: "#E5E7EB",
      uploadTextColor: "#1F2937",
      uploadHoverBgColor: "#E5E7EB",
      uploadHoverBorderColor: "#D1D5DB",

      //input styles
      inputBgColor: "#e7def8",
      inputBorderColor: "#E5E7EB",
      inputTextColor: "#1F2937",
      inputHoverBgColor: "#E5E7EB",
      inputHoverBorderColor: "#D1D5DB",
    },
  },

  setTheme: (theme) =>
    set(() => {
      localStorage.setItem("qcTheme", theme);
      return { theme };
    }),

  getCurrentColors: (state) => state.ThemeColors[state.theme],

  getCurrentThemeColors: (state) => state.ThemeColors[state.theme],
}));
