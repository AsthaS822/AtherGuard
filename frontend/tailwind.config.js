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
        bg: "var(--bg-main)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",

        primary: "var(--primary)",
        glow: "var(--primary-glow)",

        text: "var(--text-primary)",
        muted: "var(--text-secondary)",

        border: "var(--border-dim)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
      },

      backdropBlur: {
        xl: "20px"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
