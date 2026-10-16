/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mp: {
          bg: '#f4f6fa',
          card: '#ffffff',
          cardHover: '#f8fafc',
          cardBorder: '#e2e8f0',
          primary: '#0052cc',
          primaryHover: '#003d99',
          primaryLight: '#0066FF',
          blueHeader: '#0B3B95',
          blueSubheader: '#082c71',
          glow: 'rgba(0, 102, 255, 0.25)',
          accent: '#0066FF',
          dark: '#07245b',
          muted: '#64748b',
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B'
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 102, 255, 0.25)',
        'glow-md': '0 0 25px rgba(0, 102, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 102, 255, 0.55)',
        'glow-cyan': '0 0 20px rgba(0, 194, 255, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
