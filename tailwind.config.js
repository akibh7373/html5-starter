module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js",
    "node_modules/preline/dist/*.js",
    "!./node_modules/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
};
