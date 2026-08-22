export const organizations = [
  {
    id: "glc",
    acronym: "GLC",
    name: "Grupo Logístico del Caribe",
    industry: "Logistics & distribution",
    dossierHref: "/journal/organizations/glc",
  },
  {
    id: "conasa",
    acronym: "CONASA",
    name: "Cooperativa Nacional de Ahorros",
    industry: "Financial cooperative",
    dossierHref: "/journal/organizations/conasa",
  },
  {
    id: "rmh",
    acronym: "RMH",
    name: "Red Médica Horizonte",
    industry: "Healthcare network",
    dossierHref: "/journal/organizations/rmh",
  },
  {
    id: "iq",
    acronym: "IQ",
    name: "Industrias Quisqueya",
    industry: "Industrial manufacturing",
    dossierHref: "/journal/organizations/iq",
  },
  {
    id: "cad",
    acronym: "CAD",
    name: "Comercial Aurora Dominicana",
    industry: "Retail & commerce",
    dossierHref: "/journal/organizations/cad",
  },
  {
    id: "sta",
    acronym: "STA",
    name: "Servicios Tecnológicos Atlas",
    industry: "Technology services",
    dossierHref: "/journal/organizations/sta",
  },
] as const;

export type OrganizationRecord = (typeof organizations)[number];
