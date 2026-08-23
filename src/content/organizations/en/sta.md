---
id: sta
language: en
acronym: STA
name: Servicios Tecnológicos Atlas
industry: Managed Services
type: Fictional case-study environment
descriptor: A growing managed-service operation separating meaningful customer signals from multi-tenant monitoring noise.
headquarters: Santo Domingo
branches: 1
employees: 120
logo: /images/organizations/logos/sta.webp
summary: A compact NOC environment where alert quality, escalation discipline, customer context, and after-hours capacity determine how quickly incidents become understood.
businessDescription: STA provides managed infrastructure, monitoring, remote support, service coordination, and operational reporting across multiple customer environments.
technologySupports: [Customer monitoring, Remote administration, Ticketing and escalation, Customer communication, Operational documentation, Secure customer connectivity]
failureConsequences: [Meaningful alerts disappear inside noise., Escalation starts late., Customers recognize impact first., Analysts lose time rebuilding context.]
infrastructureDomains:
  - { id: monitoring, label: Monitoring & Alerting, systems: [Zabbix, NOC Dashboards, Alert Routing] }
  - { id: service, label: Service Operations, systems: [GLPI, Customer Reporting, Escalation Workflows] }
  - { id: remote, label: Remote Management, systems: [Tactical RMM, RustDesk, WireGuard] }
  - { id: knowledge, label: Knowledge & Access, systems: [BookStack, Vaultwarden, Runbooks] }
  - { id: platform, label: Internal Platform, systems: [Proxmox, Microsoft 365, Backup, Customer VPNs] }
weakPoints:
  - { label: SIGNAL RISK, detail: High alert volume makes meaningful conditions harder to distinguish. }
  - { label: DOCUMENTATION GAP, detail: Customer runbooks and environment notes lag operational growth. }
  - { label: STAFFING CONSTRAINT, detail: A small NOC carries a growing multi-tenant workload. }
  - { label: ESCALATION RISK, detail: Customer-specific escalation practices remain inconsistent. }
  - { label: KNOWLEDGE RISK, detail: Important customer context is concentrated among experienced analysts. }
  - { label: COVERAGE RISK, detail: After-hours capacity is thinner than daytime operations. }
people:
  - { id: karla-fernandez, name: Karla Fernández, role: Service Delivery Manager, operationalImportance: Coordinates the incident story that customers hear while technical work continues., characteristic: Strong communicator managing constant context switching across customers., question: What does the client know so far? }
  - { id: andres-guerrero, name: Andrés Guerrero, role: NOC Lead, operationalImportance: Finds meaningful patterns inside noisy multi-customer telemetry., characteristic: Experienced monitoring investigator exposed continuously to alert fatigue., question: Is this noise or signal? }
  - { id: junior, name: Junior, role: NOC L1 Analyst, operationalImportance: Notices conditions that experienced operators may have learned to dismiss., characteristic: Curious new perspective with low confidence during escalation., question: This should not look like this, right? }
incidentIds: []
tags: [Managed services, Monitoring, Alert fatigue, Multi-tenant operations]
topology:
  nodes:
    - { id: noc, domainId: monitoring, label: NOC, subtitle: OPERATIONS, status: healthy, variant: root, size: lg, selected: true }
    - { id: zabbix, domainId: monitoring, label: Zabbix, subtitle: MONITORING, status: degraded, variant: anchor }
    - { id: alert-routing, domainId: monitoring, label: Alert Routing, subtitle: SIGNAL FLOW, status: degraded }
    - { id: glpi, domainId: service, label: GLPI, subtitle: SERVICE DESK, status: healthy, variant: anchor }
    - { id: customer-estates, domainId: platform, label: Customer Estates, subtitle: MULTI-TENANT, status: healthy }
    - { id: rmm, domainId: remote, label: Tactical RMM, subtitle: REMOTE OPS, status: healthy }
    - { id: wireguard, domainId: remote, label: WireGuard, subtitle: SECURE ACCESS, status: healthy }
    - { id: bookstack, domainId: knowledge, label: BookStack, subtitle: KNOWLEDGE, status: degraded }
    - { id: vaultwarden, domainId: knowledge, label: Vaultwarden, subtitle: ACCESS, status: healthy }
    - { id: reporting, domainId: service, label: Customer Reporting, subtitle: COMMUNICATION, status: healthy }
  relationships:
    - { from: customer-estates, to: zabbix, label: emits telemetry, active: false }
    - { from: zabbix, to: alert-routing, label: generates, active: false }
    - { from: alert-routing, to: noc, label: escalates, active: false }
    - { from: noc, to: glpi, label: records, active: false }
    - { from: rmm, to: customer-estates, label: administers, active: false }
    - { from: wireguard, to: customer-estates, label: connects, active: false }
    - { from: noc, to: bookstack, label: consults, active: false }
    - { from: noc, to: vaultwarden, label: retrieves access, active: false }
    - { from: glpi, to: reporting, label: informs, active: false }
    - { from: reporting, to: customer-estates, label: communicates, active: false }
---

STA represents the operational challenge of finding the one important signal among thousands of routine events.
