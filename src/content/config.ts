import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Gary Tate'),
    excerpt: z.string().max(200).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
