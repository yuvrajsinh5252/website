import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wave: {
          "0%": {
            opacity: "0",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 0%)",
          },
          "10%": {
            opacity: "0.2",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 10%, transparent 20%)",
          },
          "20%": {
            opacity: "0.4",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 20%, transparent 35%)",
          },
          "30%": {
            opacity: "0.6",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 30%, transparent 45%)",
          },
          "40%": {
            opacity: "0.8",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 40%, transparent 55%)",
          },
          "50%": {
            opacity: "1",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 50%, transparent 65%)",
          },
          "60%": {
            opacity: "0.8",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 60%, transparent 75%)",
          },
          "70%": {
            opacity: "0.6",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 70%, transparent 85%)",
          },
          "80%": {
            opacity: "0.4",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 80%, transparent 90%)",
          },
          "100%": {
            opacity: "0",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 100%, transparent 100%)",
          },
        },
        popout: {
          "0%": { transform: "scale(0.9) " },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
      },
      animation: {
        popout: "popout 0.1s ease-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
        gradient: "gradient 15s ease infinite",
        wave: "wave 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
