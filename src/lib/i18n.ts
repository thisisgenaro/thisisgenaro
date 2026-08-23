export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const defaultLocale: Locale = "en";
export const localeStorageKey = "siteLocale";

export const ui = {
  en: {
    language: { label: "Language", current: "EN", other: "ES" },
    nav: { home: "Home", journal: "Journal", incidents: "Incident Library", world: "The World", about: "About", contact: "Contact" },
    actions: { exploreJournal: "Explore the Journal", exploreIncidents: "Explore the Incident Library", exploreWorld: "Explore The World", readEntry: "Read Entry", viewIncident: "View Incident", viewDossier: "View Dossier", back: "Back" },
    labels: { latestIncident: "Latest Incident", featuredIncident: "Featured Incident", latestJournal: "Latest Journal", browseIncidents: "Browse Incidents", dossierPreview: "Dossier Preview", exploreWorld: "Explore the World", unavailable: "Spanish version not available yet.", noEntries: "No published Journal entries yet." },
    pages: { homeEyebrow: "INFRASTRUCTURE ENGINEER · SYSTEMS THINKER", homeStatement: "Every incident leaves evidence. Every system reveals patterns. Here, we turn both into better engineering.", journalDescription: "Field notes on systems, incidents, and the decisions that shape how we operate them.", incidentsDescription: "Operational records of failures, dependencies, investigations, and lessons.", worldDescription: "A connected world of organizations, systems, pressures, and dependencies behind the incidents.", aboutDescription: "Genaro Hernández shares practical thinking about infrastructure, operations, and the philosophy behind the work.", contactDescription: "Contact Genaro Hernández about infrastructure, observability, reliability, and the engineering knowledge shared here." },
  },
  es: {
    language: { label: "Idioma", current: "ES", other: "EN" },
    nav: { home: "Inicio", journal: "La Bitácora", incidents: "Registro de Incidentes", world: "El Mundo", about: "Sobre mí", contact: "Contacto" },
    actions: { exploreJournal: "Explorar La Bitácora", exploreIncidents: "Explorar el Registro de Incidentes", exploreWorld: "Explorar El Mundo", readEntry: "Leer entrada", viewIncident: "Ver incidente", viewDossier: "Ver dossier", back: "Volver" },
    labels: { latestIncident: "Incidente más reciente", featuredIncident: "Incidente destacado", latestJournal: "Entrada más reciente", browseIncidents: "Explorar incidentes", dossierPreview: "Vista previa del dossier", exploreWorld: "Explorar El Mundo", unavailable: "Versión en español no disponible todavía.", noEntries: "Todavía no hay entradas publicadas en La Bitácora." },
    pages: { homeEyebrow: "INGENIERO DE INFRAESTRUCTURA · PENSADOR DE SISTEMAS", homeStatement: "Cada incidente deja evidencia. Cada sistema revela patrones. Aquí convertimos ambos en mejor ingeniería.", journalDescription: "Notas sobre sistemas, incidentes y las decisiones que dan forma a cómo los operamos.", incidentsDescription: "Registros operativos de fallos, dependencias, investigaciones y aprendizajes.", worldDescription: "Un mundo conectado de organizaciones, sistemas, presiones y dependencias detrás de los incidentes.", aboutDescription: "Genaro Hernández comparte pensamiento práctico sobre infraestructura, operaciones y la filosofía detrás del trabajo.", contactDescription: "Contacta a Genaro Hernández sobre infraestructura, observabilidad, confiabilidad y el conocimiento de ingeniería compartido aquí." },
  },
} as const;

export function normalizeLocale(value: string | undefined | null): Locale | null {
  const normalized = value?.trim().toLowerCase().split(/[-_]/)[0];
  return normalized && SUPPORTED_LOCALES.includes(normalized as Locale) ? normalized as Locale : null;
}

export function getLocaleFromPath(pathname: string): Locale | null {
  return normalizeLocale(pathname.split("/").filter(Boolean)[0]);
}

export function stripLocale(pathname: string) {
  const locale = getLocaleFromPath(pathname);
  if (!locale) return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function localePath(locale: Locale, pathname = "/") {
  const clean = stripLocale(pathname).replace(/^\/+/, "");
  return `/${locale}${clean ? `/${clean}` : "/"}`;
}

export function formatLocalizedDate(value: Date | string, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", options ?? { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function translationKey(data: { translationKey?: string; id?: string }) {
  return data.translationKey ?? data.id ?? "";
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function findTranslation<T extends { data: { language?: string; translationKey?: string; id?: string } }>(items: T[], item: T, locale: Locale) {
  const key = translationKey(item.data);
  return items.find((candidate) => candidate.data.language === locale && translationKey(candidate.data) === key) ?? null;
}
