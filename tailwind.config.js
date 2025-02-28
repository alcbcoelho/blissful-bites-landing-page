import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      "xl+16px": "1312px"
    },
    extend: {},
  },
  plugins: [],
};