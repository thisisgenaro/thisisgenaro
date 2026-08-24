---
id: conasa
translationKey: conasa
translationStatus: complete
language: es
acronym: CONASA
name: Cooperativa Nacional de Ahorros
industry: Financial Services
type: Entorno ficticio de estudio de casos
descriptor: A conservative financial cooperative balancing member trust, regulatory obligations, y long-lived systems.
headquarters: Santiago de los Caballeros
branches: 18
employees: 650
logo: /images/organizations/logos/conasa.webp
summary: A stability-first financial entorno where heredado platforms y concentrated institutional knowledge support daily member services.
businessDescription: CONASA provides savings, loans, transfers, digital banking, y branch servicios a members across el Dominican Republic.
technologySupports: [Member accounts y transactions, Branch operations, Digital banking, Credit y loan processing, Regulatory reporting, Workforce communication]
failureConsequences: [Members lose acceso a financial services., Branch processing slows or stops., Trust y compliance obligations come under pressure., Staff fall back a manual coordination.]
infrastructureDomains:
  - { id: identity, label: Identidad & Access, systems: [Active Directory, Group Policy, LDAP services] }
  - { id: financial, label: Financial Systems, systems: [Core Banking, SQL Clusters, Regulatory Reporting] }
  - { id: messaging, label: Collaboration, systems: [Exchange On-Premises, Microsoft 365, Teams] }
  - { id: network, label: Red & Access, systems: [Citrix NetScaler, FortiGate, Branch WAN] }
  - { id: infrastructure, label: Core Infraestructura, systems: [VMware, File Services, Backup Platform] }
weakPoints:
  - { label: DEUDA TÉCNICA, detail: Legacy core banking servicios permanecen deeply embedded en member operations. }
  - { label: IDENTITY RISK, detail: Service accounts have accumulated across long-lived systems. }
  - { label: KNOWLEDGE RISK, detail: Critical configuration history is concentrated en a small number de people. }
  - { label: CHANGE CONSTRAINT, detail: Compliance y continuity concerns make change deliberately slow. }
  - { label: BRECHA DE VISIBILIDAD, detail: Infraestructura health is clearer than end-to-end member servicio health. }
  - { label: RIESGO DE PROPIEDAD, detail: Certificate y dependencia ownership is not consistently documented. }
people:
  - { id: bienvenido-cruz, name: Lic. Bienvenido Cruz, role: General Manager, operationalImportance: Evaluates incidentes by their effect on member trust y servicio continuity., characteristic: Institutional leader con a business-continuity focus y limited infrastructure visibility., question: Is this affecting members? }
  - { id: patricia-gomez, name: Patricia Gómez, role: IT Director, operationalImportance: Balances technology decisions against stability, compliance, y auditability., characteristic: Strong governance instincts con a deliberately conservative change posture., question: How will we explain this a el auditor? }
  - { id: ernesto-lora, name: Ernesto Lora, role: Senior Systems Administrator, operationalImportance: Carries el migration history y operativo memory de CONASA's oldest systems., characteristic: Deep heredado knowledge that also represents a single point de knowledge risk., question: Who configured this originally? }
  - { id: rosa-martinez, name: Rosa Martínez, role: Branch Operations Supervisor, operationalImportance: Notices branch-level servicio degradation before central teams see a decisive signal., characteristic: Customer-facing operativo sensor guided by experience y intuition., question: Something feels slower than normal. }
incidentIds: []
tags: [Servicios financieros, Legacy systems, Compliance, Institutional knowledge]
topology:
  nodes:
    - { id: active-directory, domainId: identity, label: Active Directory, subtitle: IDENTITY, status: healthy, variant: root, size: lg, selected: true }
    - { id: core-banking, domainId: financial, label: Core Banking, subtitle: MEMBER LEDGER, status: degraded, variant: anchor }
    - { id: sql-cluster, domainId: financial, label: SQL Cluster, subtitle: FINANCIAL DATA, status: healthy, variant: anchor }
    - { id: digital-banking, domainId: financial, label: Digital Banking, subtitle: MEMBER ACCESS, status: saludable }
    - { id: branch-services, domainId: network, label: Branch Services, subtitle: 18 LOCATIONS, status: healthy, variant: anchor }
    - { id: netscaler, domainId: network, label: NetScaler, subtitle: ACCESS, status: saludable }
    - { id: exchange, domainId: messaging, label: Exchange, subtitle: ON-PREMISES, status: degradado }
    - { id: vmware, domainId: infrastructure, label: VMware, subtitle: COMPUTE, status: saludable }
    - { id: backup, domainId: infrastructure, label: Backup Platform, subtitle: RECOVERY, status: saludable }
    - { id: reporting, domainId: financial, label: Reporting, subtitle: COMPLIANCE, status: saludable }
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

CONASA represents an entorno where continuity y institutional trust make every technical change consequential.
