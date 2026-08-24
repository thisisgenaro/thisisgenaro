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
failureConsequences: [Los miembros pierden acceso a los servicios financieros., El procesamiento en sucursales se ralentiza o se detiene., La confianza y las obligaciones de cumplimiento quedan bajo presión., El personal recurre a la coordinación manual.]
infrastructureDomains:
  - { id: identity, label: Identidad & Access, systems: [Active Directory, Group Policy, LDAP services] }
  - { id: financial, label: Financial Systems, systems: [Core Banking, SQL Clusters, Regulatory Reporting] }
  - { id: messaging, label: Collaboration, systems: [Exchange On-Premises, Microsoft 365, Teams] }
  - { id: network, label: Red & Access, systems: [Citrix NetScaler, FortiGate, Branch WAN] }
  - { id: infrastructure, label: Core Infraestructura, systems: [VMware, File Services, Backup Platform] }
weakPoints:
  - { label: DEUDA TÉCNICA, detail: Los servicios bancarios centrales heredados siguen profundamente integrados en las operaciones de los miembros. }
  - { label: RIESGO DE IDENTIDAD, detail: Las cuentas de servicio se han acumulado en sistemas de larga vida. }
  - { label: RIESGO DE CONOCIMIENTO, detail: El historial de configuración crítica está concentrado en pocas personas. }
  - { label: RESTRICCIÓN DE CAMBIO, detail: Las preocupaciones de cumplimiento y continuidad hacen que el cambio sea deliberadamente lento. }
  - { label: BRECHA DE VISIBILIDAD, detail: La salud de la infraestructura es más clara que la salud integral del servicio a los miembros. }
  - { label: RIESGO DE PROPIEDAD, detail: La propiedad de certificados y dependencias no está documentada de forma consistente. }
people:
  - { id: bienvenido-cruz, name: Lic. Bienvenido Cruz, role: Gerente general, operationalImportance: Evalúa los incidentes por su efecto en la confianza de los miembros y la continuidad del servicio., characteristic: Líder institucional enfocado en la continuidad del negocio, con visibilidad limitada de la infraestructura., question: ¿Esto está afectando a los miembros? }
  - { id: patricia-gomez, name: Patricia Gómez, role: Directora de TI, operationalImportance: Equilibra las decisiones tecnológicas con la estabilidad, el cumplimiento y la auditabilidad., characteristic: Fuerte instinto de gobierno y una postura de cambio deliberadamente conservadora., question: ¿Cómo se lo explicaremos al auditor? }
  - { id: ernesto-lora, name: Ernesto Lora, role: Administrador sénior de sistemas, operationalImportance: Conserva el historial de migraciones y la memoria operativa de los sistemas más antiguos de CONASA., characteristic: Conocimiento profundo de sistemas heredados que también representa un riesgo de concentración., question: ¿Quién configuró esto originalmente? }
  - { id: rosa-martinez, name: Rosa Martínez, role: Supervisora de operaciones de sucursal, operationalImportance: Nota la degradación del servicio en sucursales antes de que los equipos centrales vean una señal decisiva., characteristic: Sensor operativo de cara al cliente, guiado por la experiencia y la intuición., question: Algo se siente más lento de lo normal. }
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
