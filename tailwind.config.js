/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F4F0E8',
          200: '#EAE3D5',
          300: '#E0D6C2',
          400: '#D2C3A8',
        },
        sand: {
          100: '#ECE5DA',
          200: '#E6DED0',
          300: '#DDD3C2',
          400: '#CFC2AC',
        },
        charcoal: {
          700: '#3D3A36',
          800: '#2C2A26',
          900: '#24221F',
          950: '#181715',
        },
        stoneMuted: {
          DEFAULT: '#777168',
          light: '#948D82',
          dark: '#5C574F',
        },
        antiqueGold: {
          DEFAULT: '#B29A6A',
          light: '#C9B58D',
          dark: '#967F52',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
    },
  },
  plugins: [],
}
