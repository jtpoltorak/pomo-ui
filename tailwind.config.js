/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['sofia sans', 'Poppins'],
        mono: ['JetBrains Mono', 'Victor Mono'],
      },
    },
  },
  plugins: [],
};
