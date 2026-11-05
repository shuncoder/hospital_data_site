import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a2540",
        brand: "#0f766e",
        "brand-light": "#ccfbf1",
        surface: "#f4f6fb"
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      boxShadow: {
        soft: "0 2px 6px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
        "soft-md": "0 4px 12px rgba(15,23,42,0.06), 0 18px 40px rgba(15,23,42,0.07)",
        "soft-lg": "0 10px 24px rgba(15,23,42,0.08), 0 30px 60px rgba(15,23,42,0.09)"
      }
    }
  },
  plugins: []
};

export default config;
