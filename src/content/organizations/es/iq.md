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
failureConsequences: [Las líneas de producción pueden detenerse., Los datos de inventario y procesos dejan de ser confiables., Se pueden desperdiciar materiales., Los compromisos de distribución quedan rezagados.]
infrastructureDomains:
  - { id: corporate, label: Corporate IT, systems: [Active Directory, Microsoft 365, VMware] }
  - { id: business, label: Business Systems, systems: [ERP, Warehouse Management, SQL Server] }
  - { id: ot, label: Operational Technology, systems: [SCADA, PLC Controllers, HMI Stations] }
  - { id: telemetry, label: Industrial Datos, systems: [Historian, Plant Reporting, NTP Services] }
  - { id: resilience, label: Plant Resilience, systems: [Industrial Red, Backup Platform, Remote Support] }
weakPoints:
  - { label: RIESGO DE FRONTERA, detail: TI corporativa y operaciones de planta comparten dependencias que no siempre se gobiernan juntas. }
  - { label: RESTRICCIÓN HEREDADA, detail: Los PLC y equipos industriales antiguos limitan los cambios admitidos y los controles de seguridad. }
  - { label: RIESGO DE TIEMPO, detail: Las fuentes de tiempo inconsistentes pueden distorsionar eventos industriales y registros de producción. }
  - { label: RESTRICCIÓN DE CAMBIO, detail: Las ventanas de mantenimiento están limitadas por los calendarios de producción. }
  - { label: RIESGO DE RESILIENCIA, detail: El historiador industrial sigue siendo una dependencia operativa concentrada. }
  - { label: RIESGO DE CONOCIMIENTO, detail: Los operadores experimentados poseen conocimiento del proceso que solo está parcialmente documentado. }
people:
  - { id: felix-rosario, name: Ing. Félix Rosario, role: Gerente de planta, operationalImportance: Mide cada incidente por la producción detenida y el tiempo de recuperación., characteristic: Líder disciplinado de producción, con una perspectiva firmemente orientada a las operaciones., question: ¿Cuánto tiempo estaremos detenidos? }
  - { id: ramon-castillo, name: Ramón Castillo, role: Administrador de infraestructura, operationalImportance: Entiende cómo los cambios en la tecnología corporativa pueden cruzarse con las operaciones de planta., characteristic: Investigador cuidadoso que trabaja dentro de ventanas de mantenimiento estrechas., question: ¿Esto puede afectar la producción? }
  - { id: dona-carmen, name: Doña Carmen, role: Supervisora de producción, operationalImportance: Detecta cambios en el comportamiento de la línea antes de que los paneles de infraestructura muestren una falla evidente., characteristic: Conserva un profundo conocimiento histórico del proceso, mayormente no documentado., question: La línea se siente extraña. }
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
