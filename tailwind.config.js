/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#22C55E",
        "negative": "#EF4444",
        "background-light": "#F8FAFC",
        "background-dark": "#0B1120",
        "neutral-light": "#E2E8F0",
        "neutral-dark": "#334155",
        "text-light": "#0F172A",
        "text-dark": "#F8FAFC",
        "text-muted-light": "#64748B",
        "text-muted-dark": "#94A3B8"
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}