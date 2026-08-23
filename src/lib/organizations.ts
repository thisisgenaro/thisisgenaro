import type { CollectionEntry } from "astro:content";
import { createPresentationTopology } from "operational-topology";

type OrganizationData = CollectionEntry<"organizations">["data"];

export function createOrganizationDossierTopology(organization: OrganizationData) {
  const layoutId = `organization-${organization.id}`;
  const knownDomainIds = new Set(organization.infrastructureDomains.map((domain) => domain.id));

  for (const node of organization.topology.nodes) {
    if (!knownDomainIds.has(node.domainId)) {
      throw new Error(`Unknown organization domain ${node.domainId} for node ${node.id}`);
    }
  }

  const territories = organization.infrastructureDomains.map((domain) => ({
    id: domain.id,
    label: domain.label,
    subtitle: `${organization.topology.nodes.filter((node) => node.domainId === domain.id).length} SYSTEMS`,
    topologyLayout: "ring" as const,
    anchors: organization.topology.nodes
      .filter((node) => node.domainId === domain.id)
      .map((node) => ({
        id: node.id,
        label: node.label,
        subtitle: node.subtitle,
        children: [],
      })),
  }));
  const boundary = {
    kind: "multi" as const,
    domains: organization.infrastructureDomains.map((domain) => ({
      id: domain.id,
      label: domain.label,
      kind: "territory" as const,
    })),
  };
  const generated = createPresentationTopology({
    id: layoutId,
    title: organization.acronym,
    subtitle: organization.industry,
    sceneLayout: "viewport-fit",
    topologyLayout: "territories",
    anchors: [],
    territories,
    boundary,
  });

  return {
    nodes: organization.topology.nodes.map((node) => {
      const generatedId = `presentation-${layoutId}-${node.domainId}-anchor-${node.id}`;
      const territoryRootId = `presentation-${layoutId}-${node.domainId}-root`;
      const generatedNode = generated.nodes.find((candidate) => candidate.id === generatedId);
      const territoryRoot = generated.nodes.find((candidate) => candidate.id === territoryRootId);
      if (!generatedNode || !territoryRoot) {
        throw new Error(`OTF territories did not position organization node ${node.id}`);
      }

      return {
        ...generatedNode,
        ...node,
        q: Math.round(territoryRoot.q * 0.6 + (generatedNode.q - territoryRoot.q) * 2),
        r: Math.round(territoryRoot.r * 0.6 + (generatedNode.r - territoryRoot.r) * 2),
        boundaryId: node.domainId,
        variant: node.variant ?? generatedNode.variant,
        size: node.size ?? generatedNode.size,
        active: true,
        selected: node.selected ?? false,
      };
    }),
    relationships: organization.topology.relationships,
    connectorRouting: generated.connectorRouting,
    boundary: generated.boundary,
  };
}
