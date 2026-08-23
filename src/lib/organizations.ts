import type { CollectionEntry } from "astro:content";
import { createPresentationTopology } from "operational-topology";

type OrganizationData = CollectionEntry<"organizations">["data"];

export function createOrganizationDossierTopology(organization: OrganizationData) {
  const layoutId = `organization-${organization.id}`;
  const root = organization.topology.nodes.find((node) => node.selected) ?? organization.topology.nodes[0];
  if (!root) {
    return { nodes: [], relationships: [], connectorRouting: "straight" as const };
  }

  const generated = createPresentationTopology({
    id: layoutId,
    title: root.label,
    subtitle: root.subtitle ?? organization.industry,
    sceneLayout: "viewport-fit",
    topologyLayout: "fan",
    fanDirection: "E",
    anchors: organization.topology.nodes.filter((node) => node.id !== root.id).map((node) => ({
      id: node.id,
      label: node.label,
      subtitle: node.subtitle,
      children: [],
    })),
  });

  return {
    nodes: organization.topology.nodes.map((node) => {
      const generatedId = node.id === root.id
        ? `presentation-${layoutId}-root`
        : `presentation-${layoutId}-anchor-${node.id}`;
      const generatedNode = generated.nodes.find((candidate) => candidate.id === generatedId);
      if (!generatedNode) throw new Error(`OTF fan did not position organization node ${node.id}`);

      return {
        ...generatedNode,
        ...node,
        q: Math.round(generatedNode.q / 2),
        r: Math.round(generatedNode.r / 2),
        variant: node.variant ?? generatedNode.variant,
        size: node.size ?? generatedNode.size,
        active: true,
        selected: node.selected ?? false,
      };
    }),
    relationships: organization.topology.relationships,
    connectorRouting: generated.connectorRouting,
  };
}
