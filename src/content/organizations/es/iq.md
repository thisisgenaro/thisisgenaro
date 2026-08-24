---
id: iq
translationKey: iq
translationStatus: complete
language: es
acronym: IQ
name: Industrias Quisqueya
industry: Manufactura
type: Entorno ficticio de estudio de casos
descriptor: A food production y distribution operation where technology crosses directly into physical process control.
headquarters: San Pedro de Macorís
branches: 3
employees: 900
logo: /images/organizations/logos/iq.webp
summary: A production-first entorno where corporate IT, industrial systems, warehouse operations, y experienced operators share a narrow operativo boundary.
businessDescription: IQ manufactures, packages, warehouses, y distributes food products para domestic y export markets.
technologySupports: [Production lines, Industrial control, Materials y inventory, Operaciones de almacén, Quality reporting, Distribution planning]
failureConsequences: [Production lines may stop., Inventory y process data become unreliable., Materials can be wasted., Distribution commitments fall behind.]
infrastructureDomains:
  - { id: corporate, label: Corporate IT, systems: [Active Directory, Microsoft 365, VMware] }
  - { id: business, label: Business Systems, systems: [ERP, Warehouse Management, SQL Server] }
  - { id: ot, label: Operational Technology, systems: [SCADA, PLC Controllers, HMI Stations] }
  - { id: telemetry, label: Industrial Datos, systems: [Historian, Plant Reporting, NTP Services] }
  - { id: resilience, label: Plant Resilience, systems: [Industrial Red, Backup Platform, Remote Support] }
weakPoints:
  - { label: BOUNDARY RISK, detail: Corporate IT y plant operations share dependencias that are not always governed together. }
  - { label: LEGACY CONSTRAINT, detail: Aging PLCs y industrial equipment limit supported changes y security controls. }
  - { label: TIME RISK, detail: Inconsistent time sources can distort industrial events y production records. }
  - { label: CHANGE CONSTRAINT, detail: Maintenance windows are limited by production schedules. }
  - { label: RESILIENCE RISK, detail: El industrial historian permanece a concentrated operativo dependency. }
  - { label: KNOWLEDGE RISK, detail: Experienced operators hold process knowledge that is only partially documented. }
people:
  - { id: felix-rosario, name: Ing. Félix Rosario, role: Plant Manager, operationalImportance: Measures every incidente by stopped production y recovery time., characteristic: Disciplined production leader con a strongly operations-first perspective., question: How long will we be stopped? }
  - { id: ramon-castillo, name: Ramón Castillo, role: Infraestructura Administrator, operationalImportance: Understys how corporate technology changes can cross into plant operations., characteristic: Careful investigator working within narrow maintenance windows., question: Can this affect production? }
  - { id: dona-carmen, name: Doña Carmen, role: Production Supervisor, operationalImportance: Detects changes en line behavior before infrastructure dashboards show an obvious fault., characteristic: Carries deep historical process knowledge that permanece mostly undocumented., question: El line feels strange. }
incidentIds: []
tags: [Manufactura, Operational technology, Production, IT OT]
topology:
  nodes:
    - { id: production-line, domainId: ot, label: Production Line, subtitle: PHYSICAL PROCESS, status: healthy, variant: root, size: lg, selected: true }
    - { id: plc, domainId: ot, label: PLC Controllers, subtitle: CONTROL, status: degraded, variant: anchor }
    - { id: scada, domainId: ot, label: SCADA, subtitle: SUPERVISION, status: healthy, variant: anchor }
    - { id: hmi, domainId: ot, label: HMI Stations, subtitle: OPERATORS, status: saludable }
    - { id: historian, domainId: telemetry, label: Historian, subtitle: PROCESS DATA, status: degradado }
    - { id: erp, domainId: business, label: ERP, subtitle: BUSINESS, status: saludable }
    - { id: wms, domainId: business, label: WMS, subtitle: WAREHOUSE, status: saludable }
    - { id: active-directory, domainId: corporate, label: Active Directory, subtitle: CORPORATE ID, status: saludable }
    - { id: industrial-network, domainId: resilience, label: Industrial Red, subtitle: OT BOUNDARY, status: saludable }
    - { id: backup, domainId: resilience, label: Backup Platform, subtitle: RECOVERY, status: saludable }
  relationships:
    - { from: plc, to: production-line, label: controls, active: false }
    - { from: scada, to: plc, label: supervises, active: false }
    - { from: hmi, to: scada, label: operates, active: false }
    - { from: historian, to: scada, label: records, active: false }
    - { from: erp, to: production-line, label: schedules, active: false }
    - { from: wms, to: erp, label: synchronizes, active: false }
    - { from: active-directory, to: erp, label: authenticates, active: false }
    - { from: industrial-network, to: plc, label: connects, active: false }
    - { from: industrial-network, to: historian, label: carries telemetry, active: false }
    - { from: backup, to: historian, label: protects, active: false }
---

IQ represents el point where a technical disturbance can become a physical production event within minutes.
