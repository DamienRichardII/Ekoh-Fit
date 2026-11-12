import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1B28", 900: "#0A131D", 800: "#142333", 700: "#1B2E42", 600: "#2A4059" },
        gold: { DEFAULT: "#D7B756", light: "#E6CD84", dark: "#B8993A" },
        offwhite: "#F5F5F5",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Impact", "Arial Narrow", "sans-serif"],
        sans: ['"Inter Variable"', "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: { card: "14px", pill: "999px" },
      boxShadow: {
        soft: "0 6px 24px -12px rgba(15,27,40,.28)",
        lift: "0 16px 40px -16px rgba(15,27,40,.4)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.22,1,.36,1)" },
    },
  },
  plugins: [],
};
export default config;
