/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      width: {
        'custom-xl': '90%', 
        'custom-xxl': '100%'
      }
    },
  },
  plugins: [],
}

