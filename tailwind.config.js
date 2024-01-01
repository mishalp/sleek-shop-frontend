/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f6f6f6',
        'secondary': '#1A1B23',
        'tertiory': '#1C2541'
      },
      fontFamily: {
        'sans': ['"Inter"', ...defaultTheme.fontFamily.sans],
        'popins': 'Poppins, Arial, sans-serif',
      },
      transitionProperty: {
        'max-height': 'max-height',
      }
    },
  },
  plugins: [],
}
