module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      scale: {
        300: '3',
        200: '2'
      },
    },
  },
  height: ['responsive', 'hover', 'focus'],
  plugins: [require('daisyui'), require('@tailwindcss/forms'),],
}
