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
          brand: '#ffffff',
          deep: '#e2e8f0',
        },
        purple: {
          brand: '#ffffff',
          deep: '#e2e8f0',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.05)',
        'glow-cyan': '0 0 25px rgba(255,255,255,0.15)',
        'glow-purple': '0 0 25px rgba(255,255,255,0.15)',
      },
    },
  },
  plugins: [],
};
