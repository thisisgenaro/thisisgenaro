---
id: glc
translationKey: glc
translationStatus: complete
language: es
acronym: GLC
name: Grupo Logístico del Caribe
industry: Logística
type: Entorno ficticio de estudio de casos
descriptor: Operador logístico regional que gestiona almacenes, transporte, coordinación aduanera y entregas de última milla.
headquarters: Santo Domingo
branches: 4
employees: 1200
logo: /images/organizations/logos/glc.webp
summary: A fast-growing híbrido entorno where authentication, warehouse systems, mobile operations, y heredado dependencias have immediate operativo consequences.
businessDescription: GLC coordinates national freight, warehouses, dispatches, customs processes, y last-mile delivery para enterprise clientes across el Dominican Republic.
technologySupports:
  - Operaciones de almacén
  - Acceso de clientes y visibilidad de envíos
  - Despacho y distribución
  - Autenticación del personal
  - Logística coordination
  - Operaciones de conductores y rutas
failureConsequences:
  - Deliveries slow down.
  - Warehouses wait para instructions.
  - Drivers lose acceso a operativo tools.
  - Customers start calling.
infrastructureDomains:
  - id: identity
    label: Identidad
    systems:
      - Active Directory
      - Azure AD Connect
      - Microsoft 365
  - id: applications
    label: Aplicaciones de negocio
    systems:
      - Portal de clientes
      - Aplicación móvil de entregas
      - Sistema de gestión de almacén
      - Aplicación aduanera heredada
  - id: data
    label: Datos y virtualización
    systems:
      - SQL Server
      - VMware Cluster
  - id: network
    label: Red y perímetro
    systems:
      - FortiGate Firewall
      - Conectividad VPN entre sucursales
  - id: visibility
    label: Operaciones y visibilidad
    systems:
      - Monitoreo Platform
      - Santo Domingo Datoscenter
      - Sucursales regionales
weakPoints:
  - label: RIESGO DE CAMBIO
    detail: SSO was implemented recently y permanece lightly documented.
  - label: RIESGO DE PROPIEDAD
    detail: Certificate ownership y renewal tracking are incomplete.
  - label: DEUDA TÉCNICA
    detail: Legacy warehouse y customs applications permanecen operationally important.
  - label: RESTRICCIÓN DE PERSONAL
    detail: A small infrastructure team soporta a broad híbrido environment.
  - label: BRECHA DE VISIBILIDAD
    detail: Monitoreo emphasizes server health more than business-service behavior.
  - label: RIESGO DE DEPENDENCIAS
    detail: Service dependencia maps are not formally maintained.
people:
  - id: miguel-pena
    name: Miguel Peña
    role: Infraestructura Engineer
    operationalImportance: Primary technical contact who connects negocio symptoms a hidden infrastructure dependencies.
    characteristic: Deep entorno knowledge, broad ownership, y a persistent documentation backlog.
    question: ¿Qué cambió?
  - id: laura-santana
    name: Laura Santana
    role: Gerente de operaciones
    operationalImportance: Translates incidentes into affected processes, customers, warehouses, y delivery priorities.
    characteristic: Direct, practical, y focused on measurable negocio impact.
    question: ¿Cuántos clientes están afectados?
  - id: yessenia
    name: Yessenia
    role: Supervisor de almacén
    operationalImportance: Detects abnormal warehouse behavior before technical monitoring produces a clear servicio signal.
    characteristic: An observant operativo sensor con strong process awareness.
    question: ¿Por qué los despachos avanzan más lento?
  - id: rafael-cabrera
    name: Don Rafael Cabrera
    role: Fundador
    operationalImportance: Evaluates technology through operativo control, continuity, y its direct effect on el business.
    characteristic: Traditional, protective, pragmatic, y cautious about nube dependency.
    question: ¿Por qué esto no ocurrió antes?
incidentIds:
  - inc-2026-0001
tags:
  - Logística
  - Hybrid identity
  - Warehousing
  - Legacy systems
topology:
  nodes:
    - id: active-directory
      domainId: identity
      label: Active Directory
      subtitle: IDENTITY
      status: healthy
      variant: root
      size: lg
      selected: true
    - id: azure-ad-connect
      domainId: identity
      label: Azure AD Connect
      subtitle: SYNC
      status: healthy
      variant: anchor
    - id: microsoft-365
      domainId: identity
      label: Microsoft 365
      subtitle: CLOUD
      status: healthy
    - id: customer-portal
      domainId: applications
      label: Portal de clientes
      subtitle: CUSTOMER
      status: healthy
      variant: anchor
    - id: mobile-delivery
      domainId: applications
      label: Entrega móvil
      subtitle: DRIVERS
      status: healthy
    - id: warehouse-management
      domainId: applications
      label: WMS
      subtitle: WAREHOUSE
      status: healthy
      variant: anchor
    - id: legacy-customs
      domainId: applications
      label: Aduanas heredadas
      subtitle: LEGACY
      status: degraded
    - id: sql-server
      domainId: data
      label: SQL Server
      subtitle: DATA
      status: healthy
      variant: anchor
    - id: vmware
      domainId: data
      label: VMware
      subtitle: COMPUTE
      status: healthy
    - id: fortigate
      domainId: network
      label: FortiGate
      subtitle: PERIMETER
      status: healthy
    - id: monitoring
      domainId: visibility
      label: Monitoreo
      subtitle: SERVER-CENTRIC
      status: degraded
    - id: santo-domingo
      domainId: visibility
      label: Santo Domingo
      subtitle: DATACENTER
      status: healthy
    - id: regional-branches
      domainId: visibility
      label: Sucursales regionales
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
      label: reads y writes
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

GLC represents a recurring operativo entorno whose growth outpaced its documentation, servicio visibility, y dependencia management.
