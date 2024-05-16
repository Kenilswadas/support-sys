/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' for system preferences
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        Calibri: ["Calibri Light"],
      },
    },
  },
  plugins: [],
};
