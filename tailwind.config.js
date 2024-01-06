/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#2D2D2D',
        tertiary: '#3C3C3C',
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 70%)',
        brightRedSupLight: 'hsl(12, 88%, 80%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkBlueLight: 'hsl(228, 39%, 30%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)'
    }
  }
},
  plugins: [],
}

