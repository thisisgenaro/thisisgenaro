import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entries = defineCollection({
  loader: glob({
    base: "./src/content/entries",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    id: z.string(),
    language: z.string(),
    title: z.string(),
    date: z.date(),
    publishedDate: z.date().optional(),
    summary: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    topics: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    organizationIds: z.array(z.string()).default([]),
    incidentIds: z.array(z.string()).default([]),
    personIds: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    readTime: z.number().optional(),
    readingTime: z.number().optional(),
    relatedEntries: z.array(z.string()).default([]),
  }),
});

export const collections = {
  entries,
};
