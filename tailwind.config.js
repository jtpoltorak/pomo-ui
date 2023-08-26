/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'roboto condensed', 'sofia sans'],
        mono: [
          'roboto mono',
          'JetBrains Mono',
          'Victor Mono',
        ],
      },
    },
  },
  plugins: [],
};
