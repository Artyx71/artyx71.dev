import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: '#a3e635',
        cyan: '#22d3ee',
        violet: '#a78bfa',
        amber: '#fbbf24',
        magenta: '#f472b6',
        slate: '#475569',
      },
    },
  },
  plugins: [],
} satisfies Config
