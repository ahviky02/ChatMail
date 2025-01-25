/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a148c', // Default primary color
          background: '#4a148c', // Background color
          text: '#ffffff', // Text color
        },
      },
    },
  },
  plugins: [],
}