/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#343541",
          secundary: "#202123",
        }
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}

