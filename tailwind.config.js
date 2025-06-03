/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['Roboto-Mono', 'system-ui', 'mono'],
      },
      colors: {
        brff: {
          bg: '#0f0f0f',
          text: '#e7e7e7',
          sub: '#3a3a3c',
          hover: '#1c1c1f',
          selection: '#e7e7e7',
          selectionText: '#1a1a1a',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
