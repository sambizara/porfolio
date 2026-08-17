/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f5f5f7',
          100: '#e5e5e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          900: '#18181b',
          950: '#0a0912',
        },
      },
    },
  },
  plugins: [],
}
