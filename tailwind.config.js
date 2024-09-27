/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Popping', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
        '2-auto': 'repeat(2, auto)',
        '2-fixed': 'repeat(2, 1fr)'
      },
    },
  },
  plugins: [],
};
