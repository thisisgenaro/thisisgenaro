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

const organizations = defineCollection({
  loader: glob({
    base: "./src/content/organizations",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    id: z.string(),
    language: z.string(),
    acronym: z.string(),
    name: z.string(),
    industry: z.string(),
    type: z.string(),
    descriptor: z.string(),
    headquarters: z.string(),
    branches: z.number(),
    employees: z.number(),
    logo: z.string(),
    summary: z.string(),
    businessDescription: z.string(),
    technologySupports: z.array(z.string()),
    failureConsequences: z.array(z.string()),
    infrastructureDomains: z.array(z.object({
      id: z.string(),
      label: z.string(),
      systems: z.array(z.string()),
    })),
    topology: z.object({
      nodes: z.array(z.object({
        id: z.string(),
        label: z.string(),
        subtitle: z.string().optional(),
        q: z.number(),
        r: z.number(),
        status: z.string().optional(),
        variant: z.enum(["root", "anchor", "cluster", "entity", "reference", "primary", "secondary", "data"]).optional(),
        size: z.enum(["xs", "sm", "md", "lg", "xl", "root"]).optional(),
        selected: z.boolean().optional(),
      })),
      relationships: z.array(z.object({
        from: z.string(),
        to: z.string(),
        label: z.string(),
        active: z.boolean().default(false),
      })),
    }),
    weakPoints: z.array(z.object({
      label: z.string(),
      detail: z.string(),
    })),
    people: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      operationalImportance: z.string(),
      characteristic: z.string(),
      question: z.string().optional(),
    })),
    incidentIds: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  entries,
  organizations,
};
