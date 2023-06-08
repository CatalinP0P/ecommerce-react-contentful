/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cb3b84",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
