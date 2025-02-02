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
          DEFAULT: '#gray', // Default primary color
          background: 'gray', // Background color
          text: '#ffffff', // Text color
        },
        secondary: {
          
        }
      },
    },
  },
  plugins: [],
}