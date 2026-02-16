import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: ["nord"],
  },
} satisfies Config;
