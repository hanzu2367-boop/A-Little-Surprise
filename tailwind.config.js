/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'y2k-pink': '#ffb7d5',
        'y2k-purple': '#e0b0ff',
        'y2k-bg': '#fff0f5',
        'y2k-accent': '#cc99ff',
        'y2k-dark': '#6a4c93',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      backgroundImage: {
        'y2k-pattern': "url('https://images.unsplash.com/photo-1642861001064-e7f0c4371718?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGluayUyMGNsb3VkcyUyMGFlc3RoZXRpYyUyMHkya3xlbnwwfHx8fDE3NjY1Nzg4ODd8MA&ixlib=rb-4.1.0&q=85')",
      },
    },
  },
  plugins: [],
}
