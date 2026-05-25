import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    tagline:      z.string(),
    status:       z.enum(['active', 'WIP', 'archived']),
    github:       z.string().url().optional(),
    pipeline:     z.array(z.string()).optional(),
    explorations: z.array(z.string()).optional(),
    description:  z.string(),
  }),
})

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
    lede:  z.string(),
  }),
})

export const collections = { projects, notes }
