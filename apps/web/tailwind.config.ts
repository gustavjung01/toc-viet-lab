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
        /* Tóc Việt Lab Design System */
        black: "#030303",
        blackLab: "#030303",
        blackSoft: "#080706",
        charcoal: "#11100E",
        card: "#171410",
        cardDark: "#171410",
        cardDark2: "#201A13",
        gold: "#D6A84F",
        champagne: "#D6A84F",
        goldBright: "#F0C76A",
        goldDeep: "#A87928",
        cream: "#F8F1E7",
        creamCard: "#FFF8EE",
        surfaceLight: "#FFF8EE",
        lineLight: "#E6D9C8",
        muted: "#B9AEA1",
        mutedLight: "#5E564E",
        goldText: "#7A551F",
        olive: "#637A4D",
        clay: "#C56A3A",
        softblack: "#080706",
        softcream: "#FFF8EE",
        lightgold: "#F0C76A",
        warmgray: "#B9AEA1",
        ink: "#1E1E1E"
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(3,3,3,0.12)",
        gold: "0 18px 60px rgba(214,168,79,0.25)",
        'gold-sm': "0 8px 30px rgba(214,168,79,0.20)",
        'gold-lg': "0 24px 80px rgba(214,168,79,0.30)"
      }
    }
  },
  plugins: []
};
export default config;
