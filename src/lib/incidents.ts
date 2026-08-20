import { createPresentationDeck, createPresentationSlides, type PresentationDeck, type PresentationSlide } from "operational-topology";
import { createTopologyScenePreset } from "operational-topology/presets";
import { incidents as incidentRecords } from "../data/incidents";

export type IncidentRecord = (typeof incidentRecords)[number];
export type IncidentScene = IncidentRecord["scenes"][number];

function parseIncidentDate(value: string) {
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = new Date(normalized.endsWith("Z") ? normalized : `${normalized}Z`);
  return Number.isNaN(parsed.getTime()) ? new Date(`${value}Z`) : parsed;
}

export function getPublishedIncidents() {
  return [...incidentRecords].sort((left, right) => parseIncidentDate(right.created).getTime() - parseIncidentDate(left.created).getTime());
}

export function getIncidentById(id: string) {
  const normalized = id.trim().toLowerCase();
  return incidentRecords.find((incident) => incident.id.toLowerCase() === normalized || incident.incidentId.toLowerCase() === normalized) ?? null;
}

export function formatIncidentDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parseIncidentDate(value));
}

export function formatIncidentDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parseIncidentDate(value));
}

export function getIncidentStatusTone(status: string) {
  const normalized = status.trim().toLowerCase();
  if (["closed", "resolved"].includes(normalized)) return "resolved";
  if (["investigating", "monitoring"].includes(normalized)) return "watching";
  if (["open", "new"].includes(normalized)) return "open";
  return "identified";
}

export function getIncidentSceneNodes(scene: IncidentScene) {
  const count = scene.nodes.length;

  if (scene.topologyLayout === "linear") {
    return scene.nodes.map((node, index) => ({
      ...node,
      q: -6 + index * 4,
      r: 0,
    }));
  }

  if (scene.topologyLayout === "swimlanes") {
    const positions = [
      { q: -6, r: -3 },
      { q: -2, r: -3 },
      { q: 2, r: 3 },
      { q: 6, r: 3 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  if (scene.topologyLayout === "matrix") {
    const positions = [
      { q: -4, r: -3 },
      { q: 4, r: -3 },
      { q: -4, r: 3 },
      { q: 4, r: 3 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  if (scene.topologyLayout === "basin") {
    const positions = [
      { q: 0, r: 0 },
      { q: -4, r: -3 },
      { q: 4, r: -3 },
      { q: 0, r: 4 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  if (scene.topologyLayout === "fan") {
    const positions = [
      { q: -4, r: 0 },
      { q: 3, r: -4 },
      { q: 5, r: 0 },
      { q: 3, r: 4 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  if (scene.topologyLayout === "territories") {
    const positions = [
      { q: -5, r: -3 },
      { q: 5, r: -3 },
      { q: -5, r: 3 },
      { q: 5, r: 3 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  if (scene.topologyLayout === "ring") {
    const positions = [
      { q: 0, r: 0 },
      { q: 0, r: -5 },
      { q: 5, r: 0 },
      { q: 0, r: 5 },
      { q: -5, r: 0 },
      { q: 4, r: -3 },
      { q: 4, r: 3 },
      { q: -4, r: 3 },
      { q: -4, r: -3 },
    ];
    return scene.nodes.map((node, index) => ({
      ...node,
      ...positions[index % positions.length],
    }));
  }

  const radius = Math.max(2, Math.min(5, Math.ceil(count / 2)));
  return scene.nodes.map((node, index) => ({
    ...node,
    q: index - Math.floor(count / 2),
    r: index % 2 === 0 ? radius : -radius,
  }));
}

export function getIncidentSceneEdges(scene: IncidentScene) {
  return scene.connectors.map((connector) => ({
    from: connector.from,
    to: connector.to,
    label: connector.label,
    active: true,
  }));
}

export function createIncidentScenePreset(scene: IncidentScene) {
  return createTopologyScenePreset({
    layout: "world-grid",
    topologyLayout: scene.topologyLayout,
    radius:
      scene.topologyLayout === "matrix"
        ? 28
        : scene.topologyLayout === "linear"
          ? 30
          : 32,
    showGridNodes: false,
    gridActivity: false,
    ambientSignals: true,
  });
}

export function createIncidentPresentationDeck(incident: IncidentRecord): PresentationDeck {
  return createPresentationDeck({
    id: incident.id,
    title: incident.title,
    subtitle: incident.incidentId,
    summary: incident.executiveSummary,
    defaultSlideId: incident.scenes[0]?.sceneId ?? "overview",
    sceneLayout: "world-grid",
    topologyLayout: incident.scenes[0]?.topologyLayout ?? "ring",
    slides: incident.scenes.map((scene) => ({
      id: scene.sceneId,
      title: scene.title,
      subtitle: scene.label,
      summary: scene.summary,
      status: incident.status,
      route: `/incidents/${incident.id}#${scene.sceneId}`,
      role: "incident",
      sceneLayout: "world-grid",
      topologyLayout: scene.topologyLayout,
      topology: {
        nodes: getIncidentSceneNodes(scene),
        relationships: getIncidentSceneEdges(scene),
        connectorRouting: "obstacle-aware",
      },
      anchors: scene.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        subtitle: node.role,
        children: [{ id: `${node.id}-detail`, label: scene.label }],
      })),
      records: [
        {
          id: `${scene.sceneId}-inspector`,
          presetId: scene.sceneId,
          eyebrow: incident.incidentId,
          title: scene.inspector.title,
          subtitle: scene.label,
          summary: scene.inspector.body,
          status: incident.status,
          route: `/incidents/${incident.id}#${scene.sceneId}`,
          role: "inspector",
          content: scene.inspector.body,
        },
      ],
      content: scene.inspector.body,
      transition: {
        mode: scene.topologyLayout === "linear" ? "crossfade" : "hierarchical-reveal",
      },
    })),
  });
}

export function createIncidentPresentationSlides(incident: IncidentRecord): PresentationSlide[] {
  return createPresentationSlides(createIncidentPresentationDeck(incident));
}

