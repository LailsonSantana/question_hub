import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundHeaderAndFooter: "#180E4B",
        backgroundColor: "#F5F3FF",
        titlleColor: "#362975",
        containerColor: "#ECEAF6",
        buttonColor: "#5F53A0"
      },
    },
  },
  plugins: [],
};
//#958ACA 
export default config;
