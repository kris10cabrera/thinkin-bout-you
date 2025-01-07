import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "#FF1C00",
        fairy_tale: "#dab6c4",
        eerie_black: "#1c1e1d",
        scarlet: "#ff1c00",
        reseda_green: "#7b886f",
        pistachio: "#b4dc7f"
      },
      fontFamily: {
        times: ["Times New Roman", "serif"],
        tram: ["var(--font-tram)"],
        geist: ["var(--font-geist)"],
        "geist-mono": ["var(--font-geist-mono)"],
        scorpius: ["var(--font-scorpius)"],
        "kosugi-maru": ["var(--font-kosugi-maru)"]
      }
    }
  },
  plugins: []
}
export default config
