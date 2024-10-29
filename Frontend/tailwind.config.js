/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Purple': '#8b5cf6',
        'violet': '#4f46e5',
      }
    },
  },
  plugins: [],
}