import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf7e8", 100: "#f6ecc8", 200: "#eed88f", 300: "#e6c25c",
          400: "#e0af3a", 500: "#d4a017", 600: "#b28012", 700: "#8d6112",
          800: "#754f16", 900: "#644216", 950: "#3a240a",
        },
        night: {
          700: "#1e293b", 800: "#16203a", 900: "#0f1729", 950: "#080d1a",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
