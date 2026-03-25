/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },

      colors: {
        background: {
          light: "#f8fafc",
          dark: "#0a0a0f"
        },

        dark: {
          bg: "#0a0a0f",
          card: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          text: "#E5E7EB"
        },

        primary: {
          DEFAULT: "#7c3aed",
          accent: "#7c3aed",
          glow: "#00f5ff",
          neon: "#bc13fe"
        },
        secondary: {
          DEFAULT: "#00f5ff"
        },
        darkBg: {
          DEFAULT: "#0a0a0f"
        }
      }
    },
  },
  plugins: [],
}
