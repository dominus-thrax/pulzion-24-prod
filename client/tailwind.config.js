module.exports = {
  mode : 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaries: {
          100: '#e0e0e6', // Swatch 7
          200: '#999cac', // Swatch 2
          300: '#73859d', // Swatch 5
          400: '#5a7291', // Swatch 6
          500: '#46526d', // Swatch 3
          600: '#1b3357', // Swatch 4
          700: '#01030c', // Swatch 1
          800: '#0E0B16'
        },
      },
    },
    screen: {
      'nav': '1420px'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}