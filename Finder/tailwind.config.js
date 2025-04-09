// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          /* Add more shades as needed */
          600: '#0284c7',
          700: '#0369a1',
        },
      },
    },
  },
  plugins: [],
}