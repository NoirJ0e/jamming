/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Protest-Riot": ["Protest Riot", "sans-serif"],
      },
      backgroundImage: {
        "jammming-bg": "url('/src/assets/jammming-bg.jpg')",
      },
    },
  },
  plugins: [],
};
