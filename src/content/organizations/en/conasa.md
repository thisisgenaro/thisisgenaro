---
id: conasa
language: en
acronym: CONASA
name: Cooperativa Nacional de Ahorros
industry: Financial Services
type: Fictional case-study environment
descriptor: A conservative financial cooperative balancing member trust, regulatory obligations, and long-lived systems.
headquarters: Santiago de los Caballeros
branches: 18
employees: 650
logo: /images/organizations/logos/conasa.webp
summary: A stability-first financial environment where legacy platforms and concentrated institutional knowledge support daily member services.
businessDescription: CONASA provides savings, loans, transfers, digital banking, and branch services to members across the Dominican Republic.
technologySupports: [Member accounts and transactions, Branch operations, Digital banking, Credit and loan processing, Regulatory reporting, Workforce communication]
failureConsequences: [Members lose access to financial services., Branch processing slows or stops., Trust and compliance obligations come under pressure., Staff fall back to manual coordination.]
infrastructureDomains:
  - { id: identity, label: Identity & Access, systems: [Active Directory, Group Policy, LDAP services] }
  - { id: financial, label: Financial Systems, systems: [Core Banking, SQL Clusters, Regulatory Reporting] }
  - { id: messaging, label: Collaboration, systems: [Exchange On-Premises, Microsoft 365, Teams] }
  - { id: network, label: Network & Access, systems: [Citrix NetScaler, FortiGate, Branch WAN] }
  - { id: infrastructure, label: Core Infrastructure, systems: [VMware, File Services, Backup Platform] }
weakPoints:
  - { label: TECHNICAL DEBT, detail: Legacy core banking services remain deeply embedded in member operations. }
  - { label: IDENTITY RISK, detail: Service accounts have accumulated across long-lived systems. }
  - { label: KNOWLEDGE RISK, detail: Critical configuration history is concentrated in a small number of people. }
  - { label: CHANGE CONSTRAINT, detail: Compliance and continuity concerns make change deliberately slow. }
  - { label: VISIBILITY GAP, detail: Infrastructure health is clearer than end-to-end member service health. }
  - { label: OWNERSHIP RISK, detail: Certificate and dependency ownership is not consistently documented. }
people:
  - { id: bienvenido-cruz, name: Lic. Bienvenido Cruz, role: General Manager, operationalImportance: Evaluates incidents by their effect on member trust and service continuity., characteristic: Institutional leader with a business-continuity focus and limited infrastructure visibility., question: Is this affecting members? }
  - { id: patricia-gomez, name: Patricia Gómez, role: IT Director, operationalImportance: Balances technology decisions against stability, compliance, and auditability., characteristic: Strong governance instincts with a deliberately conservative change posture., question: How will we explain this to the auditor? }
  - { id: ernesto-lora, name: Ernesto Lora, role: Senior Systems Administrator, operationalImportance: Carries the migration history and operational memory of CONASA's oldest systems., characteristic: Deep legacy knowledge that also represents a single point of knowledge risk., question: Who configured this originally? }
  - { id: rosa-martinez, name: Rosa Martínez, role: Branch Operations Supervisor, operationalImportance: Notices branch-level service degradation before central teams see a decisive signal., characteristic: Customer-facing operational sensor guided by experience and intuition., question: Something feels slower than normal. }
incidentIds: []
tags: [Financial services, Legacy systems, Compliance, Institutional knowledge]
topology:
  nodes:
    - { id: active-directory, label: Active Directory, subtitle: IDENTITY, q: -7, r: -2, status: healthy, variant: root, size: lg, selected: true }
    - { id: core-banking, label: Core Banking, subtitle: MEMBER LEDGER, q: -3, r: -4, status: degraded, variant: anchor }
    - { id: sql-cluster, label: SQL Cluster, subtitle: FINANCIAL DATA, q: 2, r: -4, status: healthy, variant: anchor }
    - { id: digital-banking, label: Digital Banking, subtitle: MEMBER ACCESS, q: 6, r: -2, status: healthy }
    - { id: branch-services, label: Branch Services, subtitle: 18 LOCATIONS, q: -5, r: 3, status: healthy, variant: anchor }
    - { id: netscaler, label: NetScaler, subtitle: ACCESS, q: 0, r: 2, status: healthy }
    - { id: exchange, label: Exchange, subtitle: ON-PREMISES, q: 5, r: 3, status: degraded }
    - { id: vmware, label: VMware, subtitle: COMPUTE, q: -3, r: 7, status: healthy }
    - { id: backup, label: Backup Platform, subtitle: RECOVERY, q: 3, r: 7, status: healthy }
    - { id: reporting, label: Reporting, subtitle: COMPLIANCE, q: 7, r: 6, status: healthy }
  relationships:
    - { from: active-directory, to: core-banking, label: authenticates, active: false }
    - { from: active-directory, to: branch-services, label: authorizes, active: false }
    - { from: core-banking, to: sql-cluster, label: records, active: false }
    - { from: digital-banking, to: core-banking, label: transacts, active: false }
    - { from: branch-services, to: core-banking, label: serves members, active: false }
    - { from: netscaler, to: digital-banking, label: publishes, active: false }
    - { from: vmware, to: core-banking, label: hosts, active: false }
    - { from: vmware, to: exchange, label: hosts, active: false }
    - { from: backup, to: sql-cluster, label: protects, active: false }
    - { from: reporting, to: sql-cluster, label: reads, active: false }
---

CONASA represents an environment where continuity and institutional trust make every technical change consequential.
