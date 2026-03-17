/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0F",      // Change back to hardcoded
        secondary: "#13131F",
        accent: "#C77DFF",
        "accent-dark": "#9D4EDD",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0AEC0",
        border: "#262636",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};