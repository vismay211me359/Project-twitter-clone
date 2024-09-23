import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'app-background': '#000000',
        'app-text-primary': '#FFFFFF',
        'app-text-secondary': '#B0B0B0',
        'app-border': '#333333',
        'app-primary-btn': '#1D9BF0',
        'app-btn-disabled': '#3B3B3B',
        'app-btn-hover': '#1A8CD8',
        'app-hashtag': '#1DA1F2',
        'app-icon-default': '#FFFFFF',
        'app-icon-hover': '#1DA1F2',
        'app-card-bg': '#1A1A1A',
        'app-error': '#E0245E',
        'app-success': '#17BF63',
        'app-warning': '#F45D22',
        'app-link-hover': '#1DA1F2',
        'app-shadow': 'rgba(0, 0, 0, 0.75)',
      },
    },
  },
  plugins: [],
};
export default config;
