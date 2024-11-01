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
        'violet': '#3a2e60',
        'blue': '#426bb2',
        'blue-gray': {
          900: '#1f2937',
        },
      }
    },
  },
  plugins: [],
}