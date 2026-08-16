import { defineCollection, z } from "astro:content";

const entries = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    language: z.string(),
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    organizationIds: z.array(z.string()).default([]),
    incidentIds: z.array(z.string()).default([]),
    personIds: z.array(z.string()).default([]),
    image: z.string().optional(),
    readingTime: z.number().optional(),
    relatedEntries: z.array(z.string()).default([]),
  }),
});

export const collections = {
  entries,
};
