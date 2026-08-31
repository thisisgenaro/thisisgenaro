import type { CollectionEntry } from "astro:content";

export type JournalEntry = CollectionEntry<"entries">;

export interface JournalTopicDefinition {
  name: string;
  slug: string;
  description: string;
}

export interface JournalTopicSummary extends JournalTopicDefinition {
  count: number;
  latestEntry: JournalEntry | null;
}

export interface JournalEntryRecord {
  entry: JournalEntry;
  href: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  publishedLabel: string;
  readTime: number | null;
  topicDefinitions: JournalTopicDefinition[];
  topicLabels: string[];
  topicSlugs: string[];
  searchText: string;
}

export interface JournalArchiveSummary {
  total: number;
  totalLabel: string;
  fromLabel: string;
  toLabel: string;
}

export const JOURNAL_TOPICS: JournalTopicDefinition[] = [
  {
    name: "Infrastructure",
    slug: "infrastructure",
    description: "Systems, dependencies, and the structure that keeps services legible.",
  },
  {
    name: "Observability",
    slug: "observability",
    description: "Signals, diagnostics, and the practice of seeing the system clearly.",
  },
  {
    name: "Operations",
    slug: "operations",
    description: "The lived work of keeping change coordinated, safe, and accountable.",
  },
  {
    name: "Reliability",
    slug: "reliability",
    description: "How resilience is earned through design, review, and follow-through.",
  },
  {
    name: "Automation",
    slug: "automation",
    description: "Repeatable work, reduced drift, and the systems that keep effort consistent.",
  },
  {
    name: "Security",
    slug: "security",
    description: "Access, risk, and the conditions that keep the operating model trustworthy.",
  },
];

const journalTopicBySlug = new Map(JOURNAL_TOPICS.map((topic) => [topic.slug, topic]));

function stripExtension(value: string) {
  return value.replace(/\.mdx?$/i, "");
}

function titleCaseSlug(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeJournalTopicSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveJournalTopic(value: string): JournalTopicDefinition {
  const slug = normalizeJournalTopicSlug(value);
  return journalTopicBySlug.get(slug) ?? {
    name: titleCaseSlug(slug),
    slug,
    description: "",
  };
}

export function getJournalPublishedDate(entry: JournalEntry) {
  return entry.data.publishedDate ?? entry.data.date;
}

export function getJournalExcerpt(entry: JournalEntry) {
  return entry.data.excerpt ?? entry.data.description ?? entry.data.summary;
}

export function getJournalReadTime(entry: JournalEntry) {
  return entry.data.readTime ?? entry.data.readingTime ?? null;
}

export function getJournalEntryTopics(entry: JournalEntry) {
  const source = entry.data.topics?.length ? entry.data.topics : entry.data.tags;
  const seen = new Set<string>();
  const topics: JournalTopicDefinition[] = [];

  for (const raw of source) {
    const topic = resolveJournalTopic(raw);
    if (!topic.slug || seen.has(topic.slug)) continue;
    seen.add(topic.slug);
    topics.push(topic);
  }

  return topics;
}

export function getJournalEntryHref(entry: JournalEntry) {
  const [language, ...slugParts] = entry.id.split("/");
  const slug = stripExtension(slugParts.join("/"));
  return `/${language}/journal/entries/${slug}`;
}

export function getJournalEntrySlug(entry: JournalEntry) {
  const [, ...slugParts] = entry.id.split("/");
  return stripExtension(slugParts.join("/"));
}

export function findJournalEntryBySlug(entries: JournalEntry[], language: string, slug: string) {
  const candidates = entries.filter((entry) =>
    getJournalEntrySlug(entry) === slug
    || entry.data.slug === slug
    || entry.data.id === slug
    || entry.data.translationKey === slug,
  );
  return candidates.find((entry) => entry.data.language === language && !entry.data.draft)
    ?? candidates.find((entry) => entry.data.language === "en" && !entry.data.draft)
    ?? candidates.find((entry) => !entry.data.draft)
    ?? null;
}

export function formatJournalDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function formatJournalLongDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date).replace(/,/, "");
}

export function formatJournalMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getPublishedJournalEntries(entries: JournalEntry[]) {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((left, right) => getJournalPublishedDate(right).getTime() - getJournalPublishedDate(left).getTime());
}

export function getJournalEntriesForLanguage(entries: JournalEntry[], language: string) {
  const languagePrefix = `${language}/`;
  const localized = entries.filter((entry) => entry.data.language === language || entry.id.startsWith(languagePrefix));
  if (localized.length || language === "en") return localized;
  return entries.filter((entry) => entry.data.language === "en" || entry.id.startsWith("en/"));
}

export function createJournalEntryRecord(entry: JournalEntry): JournalEntryRecord {
  const topicDefinitions = getJournalEntryTopics(entry);
  const publishedAt = getJournalPublishedDate(entry);
  const readTime = getJournalReadTime(entry);
  const title = entry.data.title;
  const excerpt = getJournalExcerpt(entry);

  return {
    entry,
    href: getJournalEntryHref(entry),
    title,
    excerpt,
    publishedAt,
    publishedLabel: formatJournalDate(publishedAt),
    readTime,
    topicDefinitions,
    topicLabels: topicDefinitions.map((topic) => topic.name),
    topicSlugs: topicDefinitions.map((topic) => topic.slug),
    searchText: [title, excerpt, ...topicDefinitions.map((topic) => topic.name), entry.data.summary]
      .join(" ")
      .toLowerCase(),
  };
}

export function createJournalEntryRecords(entries: JournalEntry[]) {
  return getPublishedJournalEntries(entries).map(createJournalEntryRecord);
}

export function getJournalTopicSummaries(entries: JournalEntry[]) {
  const publishedEntries = getPublishedJournalEntries(entries);
  const topics = new Map<string, JournalTopicSummary>(
    JOURNAL_TOPICS.map((topic) => [topic.slug, { ...topic, count: 0, latestEntry: null }]),
  );

  for (const entry of publishedEntries) {
    const seen = new Set<string>();
    for (const topic of getJournalEntryTopics(entry)) {
      if (seen.has(topic.slug)) continue;
      seen.add(topic.slug);
      const current = topics.get(topic.slug) ?? { ...topic, count: 0, latestEntry: null };
      if (!topics.has(topic.slug)) {
        topics.set(topic.slug, current);
      }
      current.count += 1;
      if (!current.latestEntry) {
        current.latestEntry = entry;
      }
    }
  }

  const discovered = Array.from(topics.values()).filter((topic) => !journalTopicBySlug.has(topic.slug));
  const canonical = JOURNAL_TOPICS.map((topic) => topics.get(topic.slug) ?? { ...topic, count: 0, latestEntry: null });
  return [...canonical, ...discovered];
}

export function getJournalArchiveSummary(entries: JournalEntry[]) {
  const publishedEntries = getPublishedJournalEntries(entries);
  if (!publishedEntries.length) {
    return {
      total: 0,
      totalLabel: "0 entries",
      fromLabel: "No entries yet",
      toLabel: "",
    } satisfies JournalArchiveSummary;
  }

  const dates = publishedEntries.map((entry) => getJournalPublishedDate(entry));
  const earliest = dates[dates.length - 1];
  const latest = dates[0];
  const total = publishedEntries.length;

  return {
    total,
    totalLabel: `${total} ${total === 1 ? "entry" : "entries"}`,
    fromLabel: `From ${formatJournalMonthYear(earliest)}`,
    toLabel: `to ${formatJournalMonthYear(latest)}`,
  } satisfies JournalArchiveSummary;
}

export function filterJournalEntries(records: JournalEntryRecord[], query: string, topicSlug: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTopic = normalizeJournalTopicSlug(topicSlug);

  return records.filter((record) => {
    const topicMatch = !normalizedTopic || normalizedTopic === "all" || record.topicSlugs.includes(normalizedTopic);
    const searchMatch = !normalizedQuery || record.searchText.includes(normalizedQuery);
    return topicMatch && searchMatch;
  });
}

export function sortJournalEntries(records: JournalEntryRecord[], sort: "newest" | "oldest" = "newest") {
  const direction = sort === "oldest" ? 1 : -1;
  return [...records].sort((left, right) => direction * (left.publishedAt.getTime() - right.publishedAt.getTime()));
}

export function paginateJournalEntries(records: JournalEntryRecord[], page = 1, perPage = 10) {
  const total = records.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const items = records.slice(start, start + perPage);

  return {
    page: currentPage,
    perPage,
    total,
    totalPages,
    items,
  };
}

export function buildPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 1) return [1];

  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  return Array.from(pages).filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
}

export function getTopicBySlug(slug: string) {
  return journalTopicBySlug.get(normalizeJournalTopicSlug(slug)) ?? null;
}
