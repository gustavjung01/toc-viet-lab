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
        black: "#050505",
        card: "#0E0D0B",
        softblack: "#171410",
        gold: "#D6A84F",
        lightgold: "#F0C76A",
        cream: "#F8F1E7",
        softcream: "#FFF8EE",
        muted: "#B9AEA1",
        olive: "#637A4D",
        clay: "#C56A3A",
        charcoal: "#111111",
        ink: "#1E1E1E",
        champagne: "#C9A45C",
        warmgray: "#6F665C"
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(17,17,17,0.12)",
        gold: "0 18px 60px rgba(201,164,92,0.25)",
        'gold-sm': "0 8px 30px rgba(214,168,79,0.20)",
        'gold-lg': "0 24px 80px rgba(214,168,79,0.30)"
      }
    }
  },
  plugins: []
};
export default config;
