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

const spanishSceneText: Record<string, string> = {
  "Overview": "Resumen", "Operational Dashboard": "Panel operativo", "Authentication Service": "Servicio de autenticación", "FAILED": "FALLIDO", "Closed": "Cerrado", "High Severity": "Alta severidad", "92 Minutes": "92 minutos", "Warehouse Operations": "Operaciones de almacén", "Authentication": "Autenticación", "Warehouse, Portal, Dispatch": "Almacén, portal, despachos", "Dependency Failure": "Fallo de dependencia", state: "estado", severity: "severidad", duration: "duración", organization: "organización", requester: "solicitante", service: "servicio", impact: "impacto", cause: "causa",
  "Executive Report": "Informe ejecutivo", "Business Impact": "Impacto empresarial", "Customer Service Portal": "Portal de atención al cliente", "Dispatch Processing": "Procesamiento de despachos", "Incident Status": "Estado del incidente", delay: "retraso", visibility: "visibilidad", "manual work": "trabajo manual", "Executive summary": "Resumen ejecutivo",
  "Technical Analysis": "Análisis técnico", "Comparing the Evidence": "Comparación de la evidencia", "Client A": "Cliente A", "Client B": "Cliente B", resolved: "resuelto", "Technical comparison": "Comparación técnica", "Converge on root cause": "Converger en la causa raíz",
  "Root Cause": "Causa raíz", "Root Cause Analysis": "Análisis de causa raíz", "Legacy DNS Record": "Registro DNS heredado", "Previous Migration": "Migración anterior", "Obsolete Identity Endpoint": "Endpoint de identidad obsoleto", "left behind": "quedó atrás", "routes clients": "dirige clientes", "Root cause": "Causa raíz",
  "Dependency Map": "Mapa de dependencias", "Dependency Landscape": "Panorama de dependencias", "Customer Service Visibility": "Visibilidad del servicio al cliente", affects: "afecta", "Dependency view": "Vista de dependencias",
  "Timeline": "Línea de tiempo", "Operational Timeline": "Línea de tiempo operativa", "07:05 First Report": "07:05 Primer reporte", "07:18 Incident Activated": "07:18 Incidente activado", "07:55 Legacy Route Found": "07:55 Ruta heredada encontrada", "08:37 Restored": "08:37 Restaurado", escalates: "escala", investigation: "investigación", correction: "corrección", "Operational timeline": "Línea de tiempo operativa",
  "Lessons": "Lecciones", "Lessons Learned": "Lecciones aprendidas", Validation: "Validación", Observability: "Observabilidad", "Dependency Management": "Gestión de dependencias", "Change Control": "Control de cambios", supports: "refuerza", "Lessons learned": "Lecciones aprendidas", "Return to overview": "Volver al resumen", "Open executive report": "Abrir informe ejecutivo", "Inspect technical analysis": "Inspeccionar análisis técnico", "See dependency map": "Ver mapa de dependencias", "Walk the timeline": "Recorrer la línea de tiempo", "Review lessons": "Revisar lecciones"
};

Object.assign(spanishSceneText, {
  "The failed authentication service fans out into the operational state, impact, and incident metadata needed to understand the disruption at a glance.": "El servicio de autenticación fallido se despliega hacia el estado operativo, el impacto y los metadatos necesarios para entender la interrupción de un vistazo.",
  "The authentication service is the failed operational origin.": "El servicio de autenticación es el origen operativo fallido.",
  "Warehouse users were blocked from key logistics applications.": "Los usuarios del almacén quedaron bloqueados de las aplicaciones logísticas clave.",
  "The fan layout starts with the affected authentication service in a failed state, then expands into the incident status, severity, duration, ownership, and operational impact.": "El diseño de abanico comienza con el servicio de autenticación afectado en estado fallido y se expande hacia el estado, la severidad, la duración, la propiedad y el impacto operativo del incidente.",
  "Affected service: Authentication — Failed": "Servicio afectado: Autenticación — Fallido", "Severity: High": "Severidad: Alta", "Duration: 92 minutes": "Duración: 92 minutos",
  "Business Impact": "Impacto empresarial", "Business, operational, and status lanes separate what the incident meant for the organization from how the technical work progressed.": "Las líneas empresariales, operativas y de estado separan lo que el incidente significó para la organización de cómo avanzó el trabajo técnico.",
  "Operational delay was the primary impact.": "La demora operativa fue el impacto principal.", "The incident remained partial, not total.": "El incidente fue parcial, no total.", "This view separates the business effect from the operational record so the viewer can read impact without losing the underlying technical state.": "Esta vista separa el efecto empresarial del registro operativo para que se pueda leer el impacto sin perder el estado técnico subyacente.", "Impacted: warehouse, customer service, dispatch": "Afectados: almacén, atención al cliente, despachos", "Stable: email, internet, file services, communications": "Estables: correo, internet, archivos y comunicaciones", "Final state: closed and restored": "Estado final: cerrado y restaurado",
  "Comparing the Evidence": "Comparación de la evidencia", "The technical scene compares healthy and failed paths, including affected versus unaffected clients, to isolate the hidden dependency.": "La escena técnica compara rutas saludables y fallidas, incluidos clientes afectados y no afectados, para aislar la dependencia oculta.", "Two clients resolved the same host name differently.": "Dos clientes resolvieron el mismo nombre de host de forma diferente.", "The visible service was not the failure point.": "El servicio visible no era el punto de falla.", "Technical comparison": "Comparación técnica", "Matrix layout works here because the investigation depends on comparing equivalent paths and identifying the divergence point.": "El diseño matricial funciona porque la investigación depende de comparar rutas equivalentes e identificar el punto de divergencia.", "Client A: legacy endpoint": "Cliente A: endpoint heredado", "Client B: current production service": "Cliente B: servicio actual de producción", "Divergence: DNS resolution path": "Divergencia: ruta de resolución DNS",
  "Root Cause Analysis": "Análisis de causa raíz", "Evidence funnels toward one cause: a legacy DNS record continued to send some clients to an obsolete identity endpoint.": "La evidencia converge en una causa: un registro DNS heredado siguió enviando algunos clientes a un endpoint de identidad obsoleto.", "The immediate cause was incorrect service destination.": "La causa inmediata fue un destino de servicio incorrecto.", "The systemic cause was incomplete dependency inventory.": "La causa sistémica fue un inventario incompleto de dependencias.", "The basin layout makes the flow of evidence feel like a funnel, which matches how the investigation narrows from many hypotheses to one cause.": "El diseño de cuenca hace que el flujo de evidencia parezca un embudo, acorde con una investigación que se estrecha desde muchas hipótesis hasta una causa.", "Immediate cause: incorrect service destination": "Causa inmediata: destino de servicio incorrecto", "Technical cause: legacy DNS path": "Causa técnica: ruta DNS heredada", "Organizational cause: incomplete dependency inventory": "Causa organizativa: inventario incompleto de dependencias",
  "Dependency Landscape": "Panorama de dependencias", "A single identity service fans out into multiple operational touchpoints, showing how one dependency reaches warehouse and customer work.": "Un único servicio de identidad se despliega hacia varios puntos operativos y muestra cómo una dependencia alcanza el trabajo del almacén y de atención al cliente.", "One service affected three business flows.": "Un servicio afectó tres flujos de negocio.", "The user path mattered as much as the service path.": "La ruta del usuario importó tanto como la ruta del servicio.", "Fan layout makes the downstream effect visible at a glance while keeping the central dependency anchored in the middle.": "El diseño de abanico hace visible el efecto descendente de un vistazo y mantiene la dependencia central anclada en el medio.", "Center: authentication service": "Centro: servicio de autenticación", "Downstream: warehouse, customer visibility, dispatch": "Descendientes: almacén, visibilidad del cliente, despachos", "Key lesson: validate full user paths": "Lección clave: validar las rutas completas del usuario",
  "The incident moves step by step from first report through diagnosis, correction, and restoration.": "El incidente avanza paso a paso desde el primer reporte hasta el diagnóstico, la corrección y la restauración.", "Diagnosis took longer than the correction.": "El diagnóstico tomó más tiempo que la corrección.", "The first reliable signal came from operations users.": "La primera señal confiable provino de los usuarios de operaciones.", "Linear layout keeps the response sequence explicit so the viewer can follow the incident without losing the order of events.": "El diseño lineal mantiene explícita la secuencia de respuesta para seguir el incidente sin perder el orden de los eventos.", "Longest phase: identifying the hidden dependency": "Fase más larga: identificar la dependencia oculta", "Correction was faster than diagnosis": "La corrección fue más rápida que el diagnóstico", "Source of signal: warehouse operations": "Origen de la señal: operaciones de almacén",
  "The closing scene partitions the learning into clear operational territories the team can revisit and improve.": "La escena final divide el aprendizaje en territorios operativos claros que el equipo puede revisar y mejorar.", "Availability must include dependency validation.": "La disponibilidad debe incluir la validación de dependencias.", "Operations users are part of the observability system.": "Los usuarios de operaciones forman parte del sistema de observabilidad.", "Territories give the final scene room to separate lessons into practical domains instead of collapsing them into a single generic takeaway.": "Los territorios permiten separar las lecciones en dominios prácticos en lugar de reducirlas a una conclusión genérica.", "Short term: remove legacy routes": "Corto plazo: eliminar rutas heredadas", "Medium term: distributed functional validation": "Mediano plazo: validación funcional distribuida", "Long term: service maps and dependency observability": "Largo plazo: mapas de servicio y observabilidad de dependencias"
});

function translateIncidentStrings<T>(value: T): T {
  if (typeof value === "string") return (spanishSceneText[value] ?? value) as T;
  if (Array.isArray(value)) return value.map((item) => translateIncidentStrings(item)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateIncidentStrings(item)])) as T;
  return value;
}

const spanishIncidentCopy: Record<string, Partial<IncidentRecord>> = {
  "inc-2026-0001": {
    organization: "Grupo Logístico del Caribe",
    service: "Autenticación",
    title: "Interrupción del servicio de autenticación",
    requester: "Operaciones de almacén",
    category: "Fallo de dependencia",
    symptom: "Los usuarios operativos no podían autenticarse en aplicaciones logísticas críticas aunque los sistemas principales parecían saludables.",
    rootCause: "Una ruta DNS heredada continuó enviando algunos clientes a un servicio de identidad obsoleto después de una migración anterior.",
    learning: "La disponibilidad del servicio debe incluir la validación de dependencias y del recorrido del usuario, no solo la salud de cada componente.",
    summary: "GLC sufrió una interrupción parcial de autenticación causada por una dependencia DNS no documentada. El servicio correcto estaba saludable, pero algunos usuarios fueron dirigidos a un endpoint de identidad heredado.",
    executiveSummary: "El incidente afectó las operaciones de almacén, el procesamiento de despachos y la visibilidad del servicio al cliente. No fue una caída total, pero el impacto operativo requirió gestión formal y acciones correctivas posteriores.",
    status: "Cerrado",
    severity: "Alto",
    duration: "92 minutos",
    technicalDomains: ["Identidad", "DNS"],
    operationalThemes: ["Dependencia oculta", "Brecha de monitoreo", "Deuda técnica"],
    tags: ["autenticación", "dns", "fallo-de-dependencia"],
  },
};

export function getLocalizedIncidentById(id: string, locale: "en" | "es" = "en") {
  const incident = getIncidentById(id);
  if (!incident || locale === "en") return incident;
  return incident ? translateIncidentStrings({ ...incident, ...spanishIncidentCopy[incident.id] }) : null;
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

function getTimelineAnchorLabel(label: string, index: number) {
  return label.match(/^\S+/)?.[0] ?? "T+" + (index + 1);
}

function getTimelineEventLabel(label: string) {
  return label.replace(/^\S+\s*/, "");
}

function createTimelineIncidentTopology(scene: IncidentScene, incidentId: string) {
  const nodes = getSceneNodes(scene);
  const layoutId = "incident-" + scene.sceneId;
  const anchors = nodes.map((node, index) => ({
    id: node.id + "-time",
    label: getTimelineAnchorLabel(node.label, index),
    subtitle: "TIME",
    children: [{ id: node.id, label: node.label, subtitle: node.role }],
  }));
  const generated = createPresentationTopology({
    id: layoutId,
    title: incidentId,
    subtitle: scene.title,
    sceneLayout: "world-grid",
    topologyLayout: "linear",
    anchors,
  });
  const generatedRoot = generated.nodes.find((node) => node.id === "presentation-" + layoutId + "-root");
  if (!generatedRoot) throw new Error("OTF linear did not position incident root " + incidentId);

  const rootId = incidentId;
  const root = {
    id: rootId,
    label: incidentId,
    subtitle: scene.title,
    q: generatedRoot.q,
    r: generatedRoot.r,
    variant: generatedRoot.variant,
    size: generatedRoot.size,
    active: true,
    selected: true,
    role: "incident",
  };
  const anchorNodes = anchors.map((anchor) => {
    const generatedAnchor = generated.nodes.find(
      (node) => node.id === "presentation-" + layoutId + "-anchor-" + anchor.id,
    );
    if (!generatedAnchor) throw new Error("OTF linear did not position timeline " + anchor.label);
    return {
      id: anchor.id,
      label: anchor.label,
      subtitle: anchor.subtitle,
      q: generatedAnchor.q,
      r: generatedAnchor.r,
      variant: generatedAnchor.variant,
      size: generatedAnchor.size,
      active: true,
      role: "time",
    };
  });
  const eventNodes = nodes.map((node, index) => {
    const generatedEvent = generated.nodes.find(
      (candidate) => candidate.id === "presentation-" + layoutId + "-node-" + anchors[index].id + "-" + node.id,
    );
    if (!generatedEvent) throw new Error("OTF linear did not position timeline event " + node.id);
    return mergeGeneratedNode({ ...node, label: getTimelineEventLabel(node.label) }, generatedEvent);
  });
  const generatedIdToSourceId = new Map<string, string>([
    [generatedRoot.id, rootId],
    ...anchors.flatMap((anchor) => [
      ["presentation-" + layoutId + "-anchor-" + anchor.id, anchor.id],
      ["presentation-" + layoutId + "-node-" + anchor.id + "-" + anchor.children[0].id, anchor.children[0].id],
    ] as [string, string][]),
  ]);
  const generatedRelationships = generated.relationships.map((relationship) => ({
    from: generatedIdToSourceId.get(relationship.from) ?? relationship.from,
    to: generatedIdToSourceId.get(relationship.to) ?? relationship.to,
    active: relationship.active,
  }));

  return {
    nodes: [root, ...anchorNodes, ...eventNodes],
    relationships: generatedRelationships,
    connectorRouting: generated.connectorRouting,
  };
}

export function createIncidentSceneTopology(scene: IncidentScene, incidentId = scene.sceneId) {
  if (scene.sceneId === "timeline") {
    return createTimelineIncidentTopology(scene, incidentId);
  }

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
      topology: createIncidentSceneTopology(scene, incident.incidentId),
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

