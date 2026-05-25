/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        border:   'var(--border)',
        text1:    'var(--text-1)',
        text2:    'var(--text-2)',
        text3:    'var(--text-3)',
        accent:   'var(--accent)',
        codeBg:   'var(--code-bg)',
      },
      fontFamily: {
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
