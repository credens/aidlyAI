/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#020712",
          900: "#06111f",
          850: "#081827",
          800: "#0b2135",
        },
        electric: {
          500: "#18a8ff",
          400: "#38bdf8",
          300: "#7dd3fc",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(24, 168, 255, 0.22)",
        panel: "0 30px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
