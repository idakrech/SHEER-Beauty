/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FCF8FB",
        secondary: "#D1D0EF",
        accent: "#EEC1DD",
        dark: "#969BE7"
      }
    },
    fontFamily: {
      sans: ["Outfit", 'sans-serif'],
      serif: ["Fraunces", 'serif']
    }
  },
  plugins: [],
}
