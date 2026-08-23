---
id: glc
language: en
acronym: GLC
name: Grupo Logístico del Caribe
industry: Logistics
type: Fictional case-study environment
descriptor: Regional logistics operator supporting warehousing, transportation, customs coordination, and last-mile delivery.
headquarters: Santo Domingo
branches: 4
employees: 1200
logo: /images/organizations/logos/glc.webp
summary: A fast-growing hybrid environment where authentication, warehouse systems, mobile operations, and legacy dependencies have immediate operational consequences.
businessDescription: GLC coordinates national freight, warehouses, dispatches, customs processes, and last-mile delivery for enterprise customers across the Dominican Republic.
technologySupports:
  - Warehouse operations
  - Customer access and shipment visibility
  - Dispatch and distribution
  - Workforce authentication
  - Logistics coordination
  - Driver and route operations
failureConsequences:
  - Deliveries slow down.
  - Warehouses wait for instructions.
  - Drivers lose access to operational tools.
  - Customers start calling.
infrastructureDomains:
  - id: identity
    label: Identity
    systems:
      - Active Directory
      - Azure AD Connect
      - Microsoft 365
  - id: applications
    label: Business Applications
    systems:
      - Customer Portal
      - Mobile Delivery App
      - Warehouse Management System
      - Legacy Customs Application
  - id: data
    label: Data & Virtualization
    systems:
      - SQL Server
      - VMware Cluster
  - id: network
    label: Network & Perimeter
    systems:
      - FortiGate Firewall
      - Branch VPN connectivity
  - id: visibility
    label: Operations & Visibility
    systems:
      - Monitoring Platform
      - Santo Domingo Datacenter
      - Regional Branches
weakPoints:
  - label: CHANGE RISK
    detail: SSO was implemented recently and remains lightly documented.
  - label: OWNERSHIP RISK
    detail: Certificate ownership and renewal tracking are incomplete.
  - label: TECHNICAL DEBT
    detail: Legacy warehouse and customs applications remain operationally important.
  - label: STAFFING CONSTRAINT
    detail: A small infrastructure team supports a broad hybrid environment.
  - label: VISIBILITY GAP
    detail: Monitoring emphasizes server health more than business-service behavior.
  - label: DEPENDENCY RISK
    detail: Service dependency maps are not formally maintained.
people:
  - id: miguel-pena
    name: Miguel Peña
    role: Infrastructure Engineer
    operationalImportance: Primary technical contact who connects business symptoms to hidden infrastructure dependencies.
    characteristic: Deep environment knowledge, broad ownership, and a persistent documentation backlog.
    question: What changed?
  - id: laura-santana
    name: Laura Santana
    role: Operations Manager
    operationalImportance: Translates incidents into affected processes, customers, warehouses, and delivery priorities.
    characteristic: Direct, practical, and focused on measurable business impact.
    question: How many customers are affected?
  - id: yessenia
    name: Yessenia
    role: Warehouse Supervisor
    operationalImportance: Detects abnormal warehouse behavior before technical monitoring produces a clear service signal.
    characteristic: An observant operational sensor with strong process awareness.
    question: Why are dispatches moving more slowly?
  - id: rafael-cabrera
    name: Don Rafael Cabrera
    role: Founder
    operationalImportance: Evaluates technology through operational control, continuity, and its direct effect on the business.
    characteristic: Traditional, protective, pragmatic, and cautious about cloud dependency.
    question: Why did this not happen before?
incidentIds:
  - inc-2026-0001
tags:
  - Logistics
  - Hybrid identity
  - Warehousing
  - Legacy systems
topology:
  nodes:
    - id: active-directory
      label: Active Directory
      subtitle: IDENTITY
      status: healthy
      variant: root
      size: lg
      selected: true
    - id: azure-ad-connect
      label: Azure AD Connect
      subtitle: SYNC
      status: healthy
      variant: anchor
    - id: microsoft-365
      label: Microsoft 365
      subtitle: CLOUD
      status: healthy
    - id: customer-portal
      label: Customer Portal
      subtitle: CUSTOMER
      status: healthy
      variant: anchor
    - id: mobile-delivery
      label: Mobile Delivery
      subtitle: DRIVERS
      status: healthy
    - id: warehouse-management
      label: WMS
      subtitle: WAREHOUSE
      status: healthy
      variant: anchor
    - id: legacy-customs
      label: Legacy Customs
      subtitle: LEGACY
      status: degraded
    - id: sql-server
      label: SQL Server
      subtitle: DATA
      status: healthy
      variant: anchor
    - id: vmware
      label: VMware
      subtitle: COMPUTE
      status: healthy
    - id: fortigate
      label: FortiGate
      subtitle: PERIMETER
      status: healthy
    - id: monitoring
      label: Monitoring
      subtitle: SERVER-CENTRIC
      status: degraded
    - id: santo-domingo
      label: Santo Domingo
      subtitle: DATACENTER
      status: healthy
    - id: regional-branches
      label: Regional Branches
      subtitle: 4 SITES
      status: healthy
  relationships:
    - from: active-directory
      to: azure-ad-connect
      label: synchronizes
      active: false
    - from: azure-ad-connect
      to: microsoft-365
      label: federates
      active: false
    - from: active-directory
      to: warehouse-management
      label: authenticates
      active: false
    - from: active-directory
      to: customer-portal
      label: authenticates
      active: false
    - from: customer-portal
      to: mobile-delivery
      label: serves
      active: false
    - from: customer-portal
      to: sql-server
      label: reads and writes
      active: false
    - from: warehouse-management
      to: sql-server
      label: stores
      active: false
    - from: legacy-customs
      to: sql-server
      label: depends on
      active: false
    - from: vmware
      to: warehouse-management
      label: hosts
      active: false
    - from: vmware
      to: sql-server
      label: hosts
      active: false
    - from: fortigate
      to: customer-portal
      label: protects
      active: false
    - from: fortigate
      to: regional-branches
      label: connects
      active: false
    - from: santo-domingo
      to: vmware
      label: contains
      active: false
    - from: santo-domingo
      to: regional-branches
      label: coordinates
      active: false
    - from: monitoring
      to: vmware
      label: observes
      active: false
    - from: monitoring
      to: sql-server
      label: observes
      active: false
---

GLC represents a recurring operational environment whose growth outpaced its documentation, service visibility, and dependency management.
