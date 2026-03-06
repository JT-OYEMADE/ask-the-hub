import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06060a",
        surface: "#0d0d14",
        card: "#111119",
        accent: "#d4ff5c",
        accent2: "#5cffcd",
        accent3: "#ff6b35",
        text: "#f0f0f5",
        muted: "#6b6b80",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
