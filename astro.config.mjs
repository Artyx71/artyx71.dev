import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://artyx71.github.io',
  base: '/artyx71.dev',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
})
