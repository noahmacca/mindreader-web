import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        betterhover: { raw: "(hover: hover)" },
      },
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "14": "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
