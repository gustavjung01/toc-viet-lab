import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#111111",
        ink: "#1E1E1E",
        champagne: "#C9A45C",
        cream: "#F7F1E8",
        warmgray: "#6F665C",
        olive: "#637A4D",
        clay: "#C56A3A"
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(17,17,17,0.12)",
        gold: "0 18px 60px rgba(201,164,92,0.25)"
      }
    }
  },
  plugins: []
};
export default config;
