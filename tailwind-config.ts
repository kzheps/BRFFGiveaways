/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        monkey: {
          bg: '#0f0f0f',
          text: '#e7e7e7',
          sub: '#3a3a3c',
          hover: '#1c1c1f',
          selection: '#e7e7e7',
          selectionText: '#1a1a1a',
        },
      },
    },
    fontFamily: {
      mono: ["Roboto Mono", "monospace"],
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
}
