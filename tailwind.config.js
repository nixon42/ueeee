/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canva: {
          purple: '#7d2ae8',
          blue: '#00c4cc',
          pink: '#ff4b82',
          orange: '#ff6c37',
          yellow: '#ffc83b',
          green: '#00a368',
          indigo: '#5e3bee',
          bgSoft: '#f8fafc',
          cardBorder: '#e2e8f0',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'canva': '0 4px 20px -2px rgba(125, 42, 232, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'canva-hover': '0 12px 28px -4px rgba(125, 42, 232, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
