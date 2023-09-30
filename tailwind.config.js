/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cream: '#dedbd2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
