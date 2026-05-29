/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        ink: '#050505',
        'ink-2': '#0a0a12',
        cyan: {
          brand: '#00D9FF',
          deep: '#0095D4',
        },
        purple: {
          brand: '#7A5CFF',
          deep: '#5B3FE0',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(0,217,255,0.35), 0 0 60px rgba(122,92,255,0.25)',
        'glow-cyan': '0 0 25px rgba(0,217,255,0.55)',
        'glow-purple': '0 0 25px rgba(122,92,255,0.55)',
      },
    },
  },
  plugins: [],
};
