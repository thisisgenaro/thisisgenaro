import { createPresentationDeck, createPresentationSlides, createPresentationTopology, type PresentationDeck, type PresentationSlide } from "operational-topology";
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

interface IncidentTopologyNode {
  id: string;
  label: string;
  subtitle?: string;
  role: string;
  selected?: boolean;
}

interface IncidentTopologyConnector {
  from: string;
  to: string;
  label: string;
}

function getSceneNodes(scene: IncidentScene) {
  return scene.nodes as readonly IncidentTopologyNode[];
}

function getSceneConnectors(scene: IncidentScene) {
  return scene.connectors as readonly IncidentTopologyConnector[];
}

function getIncidentLayoutRoot(scene: IncidentScene) {
  const nodes = getSceneNodes(scene);
  if (scene.topologyLayout === "linear") return nodes[0];

  const selected = nodes.find((node) => node.selected);
  if (selected) return selected;

  const connectors = getSceneConnectors(scene);
  return nodes.reduce((best, node) => {
    const nodeDegree = connectors.filter((connector) => connector.from === node.id || connector.to === node.id).length;
    const bestDegree = connectors.filter((connector) => connector.from === best.id || connector.to === best.id).length;
    return nodeDegree > bestDegree ? node : best;
  }, nodes[0]);
}

function mergeGeneratedNode(
  source: IncidentTopologyNode,
  generated: { q: number; r: number; variant?: string; size?: string; active?: boolean },
) {
  return {
    ...source,
    q: generated.q,
    r: generated.r,
    variant: generated.variant,
    size: generated.size,
    active: generated.active ?? true,
    selected: source.selected ?? false,
  };
}

function createMatrixIncidentTopology(scene: IncidentScene) {
  const nodes = getSceneNodes(scene);
  const connectors = getSceneConnectors(scene);
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const sourceIds = [...new Set(connectors.map((connector) => connector.from))];
  const mappedIds = new Set<string>();

  const anchors = sourceIds.flatMap((sourceId) => {
    const source = nodeById.get(sourceId);
    if (!source) return [];

    mappedIds.add(source.id);
    const children = connectors
      .filter((connector) => connector.from === source.id)
      .flatMap((connector) => {
        const target = nodeById.get(connector.to);
        if (!target) return [];
        mappedIds.add(target.id);
        return [{ id: target.id, label: target.label, subtitle: target.role }];
      });

    return [{ id: source.id, label: source.label, subtitle: source.role, children }];
  });

  for (const node of nodes) {
    if (mappedIds.has(node.id)) continue;
    anchors.push({ id: node.id, label: node.label, subtitle: node.role, children: [] });
    mappedIds.add(node.id);
  }

  const layoutId = `incident-${scene.sceneId}`;
  const generated = createPresentationTopology({
    id: layoutId,
    title: scene.title,
    subtitle: scene.label,
    sceneLayout: "world-grid",
    topologyLayout: "matrix",
    anchors,
  });
  const generatedBySourceId = new Map<string, (typeof generated.nodes)[number]>();

  for (const anchor of anchors) {
    const generatedAnchor = generated.nodes.find((node) => node.id === `presentation-${layoutId}-anchor-${anchor.id}`);
    if (generatedAnchor) generatedBySourceId.set(anchor.id, generatedAnchor);

    for (const child of anchor.children) {
      const generatedCell = generated.nodes.find(
        (node) => node.id === `presentation-${layoutId}-node-${anchor.id}-${child.id}`,
      );
      if (generatedCell && !generatedBySourceId.has(child.id)) {
        generatedBySourceId.set(child.id, generatedCell);
      }
    }
  }

  return {
    nodes: nodes.map((node) => {
      const generatedNode = generatedBySourceId.get(node.id);
      if (!generatedNode) throw new Error(`OTF matrix did not position incident node ${node.id}`);
      return mergeGeneratedNode(node, generatedNode);
    }),
    relationships: getIncidentSceneEdges(scene),
    connectorRouting: generated.connectorRouting,
  };
}

function createTerritoriesIncidentTopology(scene: IncidentScene) {
  const nodes = getSceneNodes(scene);
  const layoutId = `incident-${scene.sceneId}`;
  const generated = createPresentationTopology({
    id: layoutId,
    title: scene.title,
    subtitle: scene.label,
    sceneLayout: "world-grid",
    topologyLayout: "territories",
    anchors: [],
    territories: nodes.map((node) => ({
      id: node.id,
      label: node.label,
      subtitle: node.role,
      anchors: [{ id: `${node.id}-context`, label: node.role, children: [] }],
    })),
  });

  return {
    nodes: nodes.map((node) => {
      const generatedNode = generated.nodes.find(
        (candidate) => candidate.id === `presentation-${layoutId}-${node.id}-root`,
      );
      if (!generatedNode) throw new Error(`OTF territories did not position incident node ${node.id}`);
      return mergeGeneratedNode(node, generatedNode);
    }),
    relationships: getIncidentSceneEdges(scene),
    connectorRouting: generated.connectorRouting,
  };
}

export function createIncidentSceneTopology(scene: IncidentScene) {
  if (scene.topologyLayout === "matrix") {
    return createMatrixIncidentTopology(scene);
  }

  if (scene.topologyLayout === "territories") {
    return createTerritoriesIncidentTopology(scene);
  }

  const nodes = getSceneNodes(scene);
  const root = getIncidentLayoutRoot(scene);
  if (!root) {
    return { nodes: [], relationships: [], connectorRouting: "obstacle-aware" as const };
  }

  const anchors = nodes
    .filter((node) => node.id !== root.id)
    .map((node) => ({
      id: node.id,
      label: node.label,
      subtitle: node.role,
      children: [],
    }));
  const layoutId = `incident-${scene.sceneId}`;
  const generated = createPresentationTopology({
    id: layoutId,
    title: root.label,
    subtitle: root.role,
    sceneLayout: "world-grid",
    topologyLayout: scene.topologyLayout,
    fanDirection: "E",
    anchors,
  });
  const generatedRootId = `presentation-${layoutId}-root`;

  return {
    nodes: nodes.map((node) => {
      const generatedId = node.id === root.id
        ? generatedRootId
        : `presentation-${layoutId}-anchor-${node.id}`;
      const generatedNode = generated.nodes.find((candidate) => candidate.id === generatedId);
      if (!generatedNode) throw new Error(`OTF ${scene.topologyLayout} did not position incident node ${node.id}`);
      return mergeGeneratedNode(node, generatedNode);
    }),
    relationships: getIncidentSceneEdges(scene),
    connectorRouting: generated.connectorRouting,
  };
}

export function createIncidentPreviewTopology(incident: IncidentRecord) {
  const scene = incident.scenes.find((candidate) => candidate.sceneId === "overview") ?? incident.scenes[0];
  if (!scene) {
    return {
      nodes: [],
      relationships: [],
      connectorRouting: "obstacle-aware" as const,
      topologyLayout: "fan" as const,
    };
  }

  const topology = createIncidentSceneTopology(scene);
  const previewScale = 0.4;

  return {
    ...topology,
    topologyLayout: scene.topologyLayout,
    nodes: topology.nodes.map((node) => ({
      ...node,
      q: Math.round(node.q * previewScale),
      r: Math.round(node.r * previewScale),
      status:
        node.role === "affected-service"
          ? "failed"
          : ["affected-services", "requester", "severity", "category"].includes(node.role)
            ? "degraded"
            : "healthy",
    })),
  };
}

export function getIncidentSceneNodes(scene: IncidentScene) {
  return createIncidentSceneTopology(scene).nodes;
}

export function getIncidentSceneEdges(scene: IncidentScene) {
  return getSceneConnectors(scene).map((connector) => ({
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
      topology: createIncidentSceneTopology(scene),
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

