/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './**/*.js', '!./node_modules/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
