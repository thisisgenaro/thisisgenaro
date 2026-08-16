export const incidents = [
  {
    id: "inc-2026-0001",
    incidentId: "INC-2026-0001",
    opened: "2026-03-16 07:05",
    restored: "2026-03-16 08:37",
    severity: "High",
    status: "Closed",
    service: "Authentication",
    title: "Authentication Service Disruption",
    organizationId: "glc",
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
        label: "Overview",
        title: "Incident Overview",
        topologyLayout: "ring",
        summary:
          "A partial authentication disruption prevented multiple operational users from accessing the applications required for daily logistics work.",
        camera: {
          mode: "fit-scene",
          focus: "incident-core",
          zoom: 1.04,
        },
        nodes: [
          { id: "ops-user", label: "Operational User", role: "affected-user" },
          { id: "auth-portal", label: "Operational Portal", role: "entry-point" },
          { id: "auth-service", label: "Authentication Service", role: "service" },
          { id: "dns", label: "DNS", role: "dependency" },
        ],
        connectors: [
          { from: "ops-user", to: "auth-portal", label: "login" },
          { from: "auth-portal", to: "auth-service", label: "authenticate" },
          { from: "auth-service", to: "dns", label: "resolve" },
        ],
        highlights: [
          "Warehouse users were blocked from key logistics applications.",
          "Primary service health looked normal at first glance.",
        ],
        inspector: {
          title: "Incident overview",
          body:
            "The first scene orients the viewer around the affected login path and the fact that the visible service remained healthy while the user path failed.",
          facts: [
            "Duration: 92 minutes",
            "Severity: High",
            "Organization: Grupo Logístico del Caribe",
          ],
        },
        actions: [{ label: "Open executive report", target: "executive-report" }],
        nextScene: "executive-report",
      },
      {
        sceneId: "executive-report",
        label: "Executive Report",
        title: "Business Impact",
        topologyLayout: "swimlanes",
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
            "This view separates the business effect from the operational record so the viewer can read impact without losing the underlying technical state.",
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
            "Matrix layout works here because the investigation depends on comparing equivalent paths and identifying the divergence point.",
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
            "The basin layout makes the flow of evidence feel like a funnel, which matches how the investigation narrows from many hypotheses to one cause.",
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
            "Fan layout makes the downstream effect visible at a glance while keeping the central dependency anchored in the middle.",
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
            "Linear layout keeps the response sequence explicit so the viewer can follow the incident without losing the order of events.",
          facts: [
            "Longest phase: identifying the hidden dependency",
            "Correction was faster than diagnosis",
            "Source of signal: warehouse operations",
          ],
        },
        actions: [{ label: "Review lessons", target: "lessons" }],
        nextScene: "lessons",
      },
      {
        sceneId: "lessons",
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
            "Territories give the final scene room to separate lessons into practical domains instead of collapsing them into a single generic takeaway.",
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
