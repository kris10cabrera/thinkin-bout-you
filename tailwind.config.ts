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
        pink: "#FAA6FF",
        light_pink: "#EFC3F5"
      },
      fontFamily: {
        times: ["Times New Roman", "serif"],
        tram: ["var(--font-tram)"],
        scorpius: ["var(--font-scorpius)"],
        "kosugi-maru": ["var(--font-kosugi-maru)"]
      }
    }
  },
  plugins: []
}
export default config
