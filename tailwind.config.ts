import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#6E1423", dark: "#4A0D18", light: "#8C2B3D" },
        gold: { DEFAULT: "#D9A821", light: "#EAC65A", pale: "#FBF3D9" },
        ivory: "#FBF8F1",
        ink: "#2B2118",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(-100%)" } },
      },
      animation: { marquee: "marquee 30s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
