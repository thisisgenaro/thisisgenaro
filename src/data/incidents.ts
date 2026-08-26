export const incidents = [
  {
    id: "inc-2026-0001",
    incidentId: "INC-2026-0001",
    opened: "2026-03-16 07:05",
    restored: "2026-03-16 08:37",
    created: "2026-03-16 07:05",
    closed: "2026-03-16 08:37",
    severity: "High",
    status: "Closed",
    service: "Authentication",
    title: "Authentication Service Disruption",
    organizationId: "glc",
    organization: "Grupo Logístico del Caribe",
    requester: "Warehouse Operations",
    category: "Dependency failure",
    duration: "92 minutes",
    primarySystems: ["Authentication Platform", "Operational Portal", "DNS"],
    affectedServices: [
      "Warehouse Operations",
      "Customer Service Portal",
      "Dispatch Processing",
    ],
    peopleIds: ["miguel-pena", "laura-santana", "yessenia", "rafael-cabrera"],
    tags: ["authentication", "dns", "dependency-failure"],
    technicalDomains: ["Identity", "DNS"],
    operationalThemes: ["Hidden Dependency", "Monitoring Gap", "Technical Debt"],
    symptom:
      "Operational users could not authenticate to critical logistics applications even though the main systems appeared healthy.",
    rootCause:
      "A legacy DNS resolution path continued sending some clients to an obsolete identity service after a previous migration.",
    learning:
      "Service availability must include dependency and user-path validation, not only component health.",
    owner: "Infrastructure",
    summary:
      "GLC experienced a partial authentication disruption caused by an undocumented DNS dependency. The correct authentication service was healthy, but some users were routed to a legacy identity endpoint.",
    executiveSummary:
      "The incident affected warehouse operations, dispatch processing, and customer service visibility. It did not represent a total outage, but the operational impact required formal incident management and post-incident corrective actions.",
    scenes: [
      {
        sceneId: "overview",
        rootNodeId: "affected-service",
        label: "Overview",
        title: "Operational Dashboard",
        topologyLayout: "fan",
        summary:
          "The failed authentication service fans out into the operational state, impact, and incident metadata needed to understand the disruption at a glance.",
        camera: {
          mode: "fit-scene",
          focus: "affected-service",
          zoom: 1.04,
        },
        nodes: [
          { id: "affected-service", label: "Authentication Service", subtitle: "FAILED", role: "affected-service", selected: true },
          { id: "incident-status", label: "Closed", role: "status" },
          { id: "incident-severity", label: "High Severity", role: "severity" },
          { id: "incident-duration", label: "92 Minutes", role: "duration" },
          { id: "incident-organization", label: "Grupo Logístico del Caribe", role: "organization" },
          { id: "incident-requester", label: "Warehouse Operations", role: "requester" },
          { id: "incident-service", label: "Authentication", role: "service" },
          { id: "incident-affected", label: "Warehouse, Portal, Dispatch", role: "affected-services" },
          { id: "incident-category", label: "Dependency Failure", role: "category" },
        ],
        connectors: [
          { from: "affected-service", to: "incident-status", label: "state" },
          { from: "affected-service", to: "incident-severity", label: "severity" },
          { from: "affected-service", to: "incident-duration", label: "duration" },
          { from: "affected-service", to: "incident-organization", label: "organization" },
          { from: "affected-service", to: "incident-requester", label: "requester" },
          { from: "affected-service", to: "incident-service", label: "service" },
          { from: "affected-service", to: "incident-affected", label: "impact" },
          { from: "affected-service", to: "incident-category", label: "cause" },
        ],
        highlights: [
          "The authentication service is the failed operational origin.",
          "Warehouse users were blocked from key logistics applications.",
        ],
        inspector: {
          title: "Operational dashboard",
          body:
            "Authentication failed for warehouse users even though the primary service appeared healthy. The incident closed after the legacy route was corrected and restoration was validated.",
          facts: [
            "Affected service: Authentication — Failed",
            "Duration: 92 minutes",
            "Severity: High",
          ],
        },
        actions: [{ label: "Open executive report", target: "executive-report" }],
        nextScene: "executive-report",
      },
      {
        sceneId: "executive-report",
        rootNodeId: "incident-status",
        label: "Executive Report",
        title: "Business Impact",
        topologyLayout: "orbital-clusters",
        summary:
          "Business, operational, and status lanes separate what the incident meant for the organization from how the technical work progressed.",
        camera: {
          mode: "fit-scene",
          focus: "impact-lanes",
          zoom: 1.0,
        },
        nodes: [
          { id: "warehouse", label: "Warehouse Operations", role: "impact" },
          { id: "customer-portal", label: "Customer Service Portal", role: "impact" },
          { id: "dispatch", label: "Dispatch Processing", role: "impact" },
          { id: "incident-status", label: "Incident Status", role: "status" },
        ],
        connectors: [
          { from: "incident-status", to: "warehouse", label: "delay" },
          { from: "incident-status", to: "customer-portal", label: "visibility" },
          { from: "incident-status", to: "dispatch", label: "manual work" },
        ],
        highlights: [
          "Operational delay was the primary impact.",
          "The incident remained partial, not total.",
        ],
        inspector: {
          title: "Executive summary",
          body:
            "The disruption delayed warehouse work, dispatch processing, and customer-service visibility. Email, internet, file services, and communications remained stable, so the outage was partial rather than total.",
          facts: [
            "Impacted: warehouse, customer service, dispatch",
            "Stable: email, internet, file services, communications",
            "Final state: closed and restored",
          ],
        },
        actions: [{ label: "Inspect technical analysis", target: "technical-analysis" }],
        nextScene: "technical-analysis",
      },
      {
        sceneId: "technical-analysis",
        rootNodeId: "client-a",
        label: "Technical Analysis",
        title: "Comparing the Evidence",
        topologyLayout: "matrix",
        summary:
          "The technical scene compares healthy and failed paths, including affected versus unaffected clients, to isolate the hidden dependency.",
        camera: {
          mode: "fit-selection",
          focus: "evidence-grid",
          zoom: 1.08,
        },
        nodes: [
          { id: "client-a", label: "Client A", role: "affected-client" },
          { id: "client-b", label: "Client B", role: "unaffected-client" },
          { id: "dns-a", label: "identity.glc.local -> 10.10.10.15", role: "path" },
          { id: "dns-b", label: "identity.glc.local -> 10.10.10.99", role: "path" },
        ],
        connectors: [
          { from: "client-a", to: "dns-a", label: "resolved" },
          { from: "client-b", to: "dns-b", label: "resolved" },
        ],
        highlights: [
          "Two clients resolved the same host name differently.",
          "The visible service was not the failure point.",
        ],
        inspector: {
          title: "Technical comparison",
          body:
            "Two clients requested the same identity name but reached different destinations. The comparison shows the DNS resolution divergence while the current authentication service remained healthy.",
          facts: [
            "Client A: legacy endpoint",
            "Client B: current production service",
            "Divergence: DNS resolution path",
          ],
        },
        actions: [{ label: "Converge on root cause", target: "root-cause" }],
        nextScene: "root-cause",
      },
      {
        sceneId: "root-cause",
        rootNodeId: "legacy-dns",
        label: "Root Cause",
        title: "Root Cause Analysis",
        topologyLayout: "basin",
        summary:
          "Evidence funnels toward one cause: a legacy DNS record continued to send some clients to an obsolete identity endpoint.",
        camera: {
          mode: "fit-scene",
          focus: "cause-basin",
          zoom: 1.02,
        },
        nodes: [
          { id: "legacy-dns", label: "Legacy DNS Record", role: "cause" },
          { id: "migration", label: "Previous Migration", role: "context" },
          { id: "obsolete-endpoint", label: "Obsolete Identity Endpoint", role: "failure-point" },
        ],
        connectors: [
          { from: "migration", to: "legacy-dns", label: "left behind" },
          { from: "legacy-dns", to: "obsolete-endpoint", label: "routes clients" },
        ],
        highlights: [
          "The immediate cause was incorrect service destination.",
          "The systemic cause was incomplete dependency inventory.",
        ],
        inspector: {
          title: "Root cause",
          body:
            "The failure chain began with an incomplete migration, left a legacy DNS record in place, and routed clients to an obsolete identity endpoint. The systemic condition was an incomplete dependency inventory.",
          facts: [
            "Immediate cause: incorrect service destination",
            "Technical cause: legacy DNS path",
            "Organizational cause: incomplete dependency inventory",
          ],
        },
        actions: [{ label: "See dependency map", target: "dependency-map" }],
        nextScene: "dependency-map",
      },
      {
        sceneId: "dependency-map",
        rootNodeId: "identity-service",
        label: "Dependency Map",
        title: "Dependency Landscape",
        topologyLayout: "fan",
        summary:
          "A single identity service fans out into multiple operational touchpoints, showing how one dependency reaches warehouse and customer work.",
        camera: {
          mode: "fit-scene",
          focus: "dependency-fan",
          zoom: 1.0,
        },
        nodes: [
          { id: "identity-service", label: "Authentication Service", role: "center" },
          { id: "warehouse-dp", label: "Warehouse Operations", role: "downstream" },
          { id: "customer-vis", label: "Customer Service Visibility", role: "downstream" },
          { id: "dispatch-flow", label: "Dispatch Processing", role: "downstream" },
        ],
        connectors: [
          { from: "identity-service", to: "warehouse-dp", label: "affects" },
          { from: "identity-service", to: "customer-vis", label: "affects" },
          { from: "identity-service", to: "dispatch-flow", label: "affects" },
        ],
        highlights: [
          "One service affected three business flows.",
          "The user path mattered as much as the service path.",
        ],
        inspector: {
          title: "Dependency view",
          body:
            "The authentication service sat on the path to warehouse operations, customer-service visibility, and dispatch processing. One undocumented dependency therefore propagated into three business flows.",
          facts: [
            "Center: authentication service",
            "Downstream: warehouse, customer visibility, dispatch",
            "Key lesson: validate full user paths",
          ],
        },
        actions: [{ label: "Walk the timeline", target: "timeline" }],
        nextScene: "timeline",
      },
      {
        sceneId: "timeline",
        rootNodeId: "INC-2026-0001",
        label: "Timeline",
        title: "Operational Timeline",
        topologyLayout: "linear",
        summary:
          "The incident moves step by step from first report through diagnosis, correction, and restoration.",
        camera: {
          mode: "fit-scene",
          focus: "incident-timeline",
          zoom: 1.0,
        },
        nodes: [
          { id: "first-report", label: "07:05 First Report", role: "event" },
          { id: "formal-activation", label: "07:18 Incident Activated", role: "event" },
          { id: "legacy-found", label: "07:55 Legacy Route Found", role: "event" },
          { id: "restored", label: "08:37 Restored", role: "event" },
        ],
        connectors: [
          { from: "first-report", to: "formal-activation", label: "escalates" },
          { from: "formal-activation", to: "legacy-found", label: "investigation" },
          { from: "legacy-found", to: "restored", label: "correction" },
        ],
        highlights: [
          "Diagnosis took longer than the correction.",
          "The first reliable signal came from operations users.",
        ],
        inspector: {
          title: "Operational timeline",
          body:
            "The incident moved from the first operations signal through formal response, DNS diagnosis, correction, and restoration. Diagnosis took longer than the correction.",
          facts: [
            "Total duration: 92 minutes",
            "First reliable signal: warehouse operations",
            "Longest phase: identifying the hidden dependency",
          ],
          timeline: [
            { time: "07:05", event: "Warehouse Operations reports authentication failures" },
            { time: "07:18", event: "Incident response begins" },
            { time: "07:55", event: "DNS resolution divergence identified" },
            { time: "08:12", event: "Legacy DNS path corrected" },
            { time: "08:37", event: "Service restoration validated" },
          ],
          nodeDetails: {
            "first-report": {
              title: "First report",
              body: "Warehouse Operations reported authentication failures before service-oriented monitoring identified a decisive fault.",
              facts: ["Time: 07:05", "Source: Warehouse Operations", "Decision: begin incident triage"],
              highlights: ["The first reliable signal came from an operational user."],
            },
            "formal-activation": {
              title: "Incident activated",
              body: "The response moved from an operational symptom into formal incident coordination and evidence collection.",
              facts: ["Time: 07:18", "Actor: Incident response", "Decision: coordinate investigation"],
              highlights: ["The incident remained partial, not total."],
            },
            "legacy-found": {
              title: "Legacy route found",
              body: "The investigation identified different DNS destinations for the same identity name, exposing the hidden dependency.",
              facts: ["Time: 07:55", "Evidence: divergent DNS resolution", "Decision: validate the legacy path"],
              highlights: ["Diagnosis took longer than the correction."],
            },
            "restored": {
              title: "Restoration validated",
              body: "The legacy DNS path was corrected and warehouse authentication was tested through the affected user path.",
              facts: ["Time: 08:37", "Actor: Infrastructure", "Decision: close after validation"],
              highlights: ["Restoration included user-path validation."],
            },
          },
        },
        actions: [{ label: "Review lessons", target: "lessons" }],
        nextScene: "lessons",
      },
      {
        sceneId: "lessons",
        rootNodeId: "validation",
        label: "Lessons",
        title: "Lessons Learned",
        topologyLayout: "territories",
        summary:
          "The closing scene partitions the learning into clear operational territories the team can revisit and improve.",
        camera: {
          mode: "fit-scene",
          focus: "lesson-territories",
          zoom: 1.0,
        },
        nodes: [
          { id: "validation", label: "Validation", role: "lesson" },
          { id: "observability", label: "Observability", role: "lesson" },
          { id: "dependency-mgmt", label: "Dependency Management", role: "lesson" },
          { id: "change-control", label: "Change Control", role: "lesson" },
        ],
        connectors: [
          { from: "validation", to: "observability", label: "supports" },
          { from: "observability", to: "dependency-mgmt", label: "supports" },
          { from: "dependency-mgmt", to: "change-control", label: "supports" },
        ],
        highlights: [
          "Availability must include dependency validation.",
          "Operations users are part of the observability system.",
        ],
        inspector: {
          title: "Lessons learned",
          body:
            "The response points toward stronger dependency validation, service-oriented observability, controlled change, and shared operational knowledge. The corrective work should improve both detection and recovery.",
          facts: [
            "Short term: remove legacy routes",
            "Medium term: distributed functional validation",
            "Long term: service maps and dependency observability",
          ],
        },
        actions: [{ label: "Return to overview", target: "overview" }],
        nextScene: "overview",
      },
    ],
  },
] as const;
