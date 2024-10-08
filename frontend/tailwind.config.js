/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          text: '#000000',
          txtOpacity: "#818181",
          bg: '#F6F0F0',
          primary: '#0067FF',
          secondary: '#E4ECF9',
          accent: '#0B1628',
        },
        dark: {
          text: '#F6F0F0',
          bg: '#030607',
          primary: '#4693a4',
          secondary: '#225763',
          accent: '#288195',
        },
      },
    },
  },
  plugins: [],
}
