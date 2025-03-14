import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
        buttonColor: "#5F53A0",
        dark: {
          background: "#1E1E1E", // Cor de fundo escura
          text: "#D1D5DB", // Cor do texto no modo escuro
          backgroundHeaderAndFooter: "#0D072E", // Cor escura para o cabeçalho e rodapé
          backgroundColor: "#121212", // Cor de fundo escura para containers
          titlleColor: "#B3A7E0", // Cor do título no modo escuro
          containerColor: "#1E1B38", // Cor de fundo escura para containers
          buttonColor: "#8A7CCF", // Cor do botão no modo escuro
        },
      },
    },
  },
  plugins: [],
};
//#958ACA 

export default config;
