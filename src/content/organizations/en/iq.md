---
id: iq
language: en
acronym: IQ
name: Industrias Quisqueya
industry: Manufacturing
type: Fictional case-study environment
descriptor: A food production and distribution operation where technology crosses directly into physical process control.
headquarters: San Pedro de Macorís
branches: 3
employees: 900
logo: /images/organizations/logos/iq.webp
summary: A production-first environment where corporate IT, industrial systems, warehouse operations, and experienced operators share a narrow operational boundary.
businessDescription: IQ manufactures, packages, warehouses, and distributes food products for domestic and export markets.
technologySupports: [Production lines, Industrial control, Materials and inventory, Warehouse operations, Quality reporting, Distribution planning]
failureConsequences: [Production lines may stop., Inventory and process data become unreliable., Materials can be wasted., Distribution commitments fall behind.]
infrastructureDomains:
  - { id: corporate, label: Corporate IT, systems: [Active Directory, Microsoft 365, VMware] }
  - { id: business, label: Business Systems, systems: [ERP, Warehouse Management, SQL Server] }
  - { id: ot, label: Operational Technology, systems: [SCADA, PLC Controllers, HMI Stations] }
  - { id: telemetry, label: Industrial Data, systems: [Historian, Plant Reporting, NTP Services] }
  - { id: resilience, label: Plant Resilience, systems: [Industrial Network, Backup Platform, Remote Support] }
weakPoints:
  - { label: BOUNDARY RISK, detail: Corporate IT and plant operations share dependencies that are not always governed together. }
  - { label: LEGACY CONSTRAINT, detail: Aging PLCs and industrial equipment limit supported changes and security controls. }
  - { label: TIME RISK, detail: Inconsistent time sources can distort industrial events and production records. }
  - { label: CHANGE CONSTRAINT, detail: Maintenance windows are limited by production schedules. }
  - { label: RESILIENCE RISK, detail: The industrial historian remains a concentrated operational dependency. }
  - { label: KNOWLEDGE RISK, detail: Experienced operators hold process knowledge that is only partially documented. }
people:
  - { id: felix-rosario, name: Ing. Félix Rosario, role: Plant Manager, operationalImportance: Measures every incident by stopped production and recovery time., characteristic: Disciplined production leader with a strongly operations-first perspective., question: How long will we be stopped? }
  - { id: ramon-castillo, name: Ramón Castillo, role: Infrastructure Administrator, operationalImportance: Understands how corporate technology changes can cross into plant operations., characteristic: Careful investigator working within narrow maintenance windows., question: Can this affect production? }
  - { id: dona-carmen, name: Doña Carmen, role: Production Supervisor, operationalImportance: Detects changes in line behavior before infrastructure dashboards show an obvious fault., characteristic: Carries deep historical process knowledge that remains mostly undocumented., question: The line feels strange. }
incidentIds: []
tags: [Manufacturing, Operational technology, Production, IT OT]
topology:
  nodes:
    - { id: production-line, label: Production Line, subtitle: PHYSICAL PROCESS, status: healthy, variant: root, size: lg, selected: true }
    - { id: plc, label: PLC Controllers, subtitle: CONTROL, status: degraded, variant: anchor }
    - { id: scada, label: SCADA, subtitle: SUPERVISION, status: healthy, variant: anchor }
    - { id: hmi, label: HMI Stations, subtitle: OPERATORS, status: healthy }
    - { id: historian, label: Historian, subtitle: PROCESS DATA, status: degraded }
    - { id: erp, label: ERP, subtitle: BUSINESS, status: healthy }
    - { id: wms, label: WMS, subtitle: WAREHOUSE, status: healthy }
    - { id: active-directory, label: Active Directory, subtitle: CORPORATE ID, status: healthy }
    - { id: industrial-network, label: Industrial Network, subtitle: OT BOUNDARY, status: healthy }
    - { id: backup, label: Backup Platform, subtitle: RECOVERY, status: healthy }
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

IQ represents the point where a technical disturbance can become a physical production event within minutes.
