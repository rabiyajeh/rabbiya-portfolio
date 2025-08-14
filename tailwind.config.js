/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f6ff",
          100: "#dae7ff",
          200: "#b0c7ff",
          300: "#86a7ff",
          400: "#5c86ff",
          500: "#3266ff",
          600: "#1b4fe6",
          700: "#143db3",
          800: "#0d2b80",
          900: "#07194d"
        }
      },
      boxShadow: {
        'glow': '0 0 30px rgba(50,102,255,0.35)'
      }
    },
  },
  plugins: [],
}
