/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#f00",
        },
        black: {
          DEFAULT: "#1D1D1D",
        },
        gray: {
          DEFAULT: "#F5F5F5",
          dark: "#808080",
        },
      },
    },
  },
  plugins: [],
}

