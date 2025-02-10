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
          DEFAULT: '#07162b', // A cool shade of blue for primary elements
          background: '#F0F4F8', // A soft light background for a clean look
          text: '#ffffff', 
        },
        secondary: {
          DEFAULT: '#E94E77', // A vibrant pink for secondary elements
          background: '#FDE2E4', // A light pink background for secondary sections
          text: '#FFFFFF', // White text color for contrast on secondary elements
        },
      },
    },
  },
  plugins: [],
}
