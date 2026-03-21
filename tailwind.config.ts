import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        main: "var(--bg-main)",
        nav: "var(--bg-nav)",
        card: "var(--bg-card)",
        "card-glass": "var(--bg-card-glass)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        "btn-text": "var(--btn-text)",
        body: "var(--text-body)",
        label: "var(--text-label)",
        faint: "var(--text-faint)",
      },
    },
  },
  plugins: [],
};
export default config;
