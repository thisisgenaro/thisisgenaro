---
id: rmh
translationKey: rmh
translationStatus: complete
language: es
acronym: RMH
name: Red Médica Horizonte
industry: Salud
type: Entorno ficticio de estudio de casos
descriptor: A hospital, clinic, y diagnostics network where infrastructure health is inseparable desde patient care.
headquarters: Santo Domingo
branches: 12
employees: 2400
logo: /images/organizations/logos/rmh.webp
summary: A clinically integrated entorno where individually saludable sistemas can still fail el workflows connecting patients, clinicians, laboratories, y imaging.
businessDescription: RMH coordinates hospital care, outpatient clinics, diagnostics, radiology, laboratories, y que soporta clinical administration.
technologySupports: [Electronic medical records, Diagnostic imaging, Laboratory workflows, Clinical communications, Patient access, Remote clinical connectivity]
failureConsequences: [Patient care may be delayed., Clinicians lose acceso a records or images., Diagnostic workflows become manual., Technical symptoms become clinical risks.]
infrastructureDomains:
  - { id: identity, label: Identidad & Collaboration, systems: [Active Directory, Entra ID, Microsoft 365] }
  - { id: clinical, label: Clinical Systems, systems: [Electronic Medical Record, PACS, Laboratory Information System] }
  - { id: data, label: Clinical Datos, systems: [SQL Server, PACS Storage, Integration Services] }
  - { id: infrastructure, label: Infraestructura, systems: [VMware, Clinical VPN, Backup Platform] }
  - { id: sites, label: Care Locations, systems: [Hospital, Clinics, Diagnostic Centers] }
weakPoints:
  - { label: VENDOR RISK, detail: Clinical platforms depend on specialized vendors y tightly controlled support paths. }
  - { label: LEGACY CONSTRAINT, detail: Older medical devices require security y compatibility exceptions. }
  - { label: RESILIENCE RISK, detail: PACS storage y el primary EMR database have concentrated fallo domains. }
  - { label: KNOWLEDGE RISK, detail: Clinical integration knowledge is concentrated within a small technology team. }
  - { label: DOCUMENTATION GAP, detail: Interfaces between clinical sistemas are not consistently documented end a end. }
  - { label: WORKFLOW VISIBILITY, detail: Monitoreo does not always represent el complete patient-care workflow. }
people:
  - { id: isabel-marte, name: Dra. Isabel Marte, role: Hospital Director, operationalImportance: Frames technology incidentes en terms de patient safety y continuity de care., characteristic: Clinical leader con strong crisis instincts y limited infrastructure visibility., question: Is this affecting patients? }
  - { id: carlos-tejada, name: Carlos Tejada, role: Systems Coordinator, operationalImportance: Connects technical conditions a clinical integrations that are rarely fully documented., characteristic: Skilled vendor coordinator whose entorno knowledge is heavily concentrated., question: Which clinical workflow is affected? }
  - { id: julio, name: Julio, role: Radiology Technician, operationalImportance: Detects PACS y imaging degradation before formal infrastructure alerts., characteristic: Deep radiology workflow awareness expressed through practical symptoms., question: Why are images taking longer? }
  - { id: ana-maria-soto, name: Ana María Soto, role: Nurse Supervisor, operationalImportance: Escalates technology issues when they begin a disrupt patient care., characteristic: Strong patient-workflow awareness outside formal technical planning., question: Is this affecting care? }
incidentIds: []
tags: [Salud, Clinical systems, Integration, Patient care]
topology:
  nodes:
    - { id: emr, domainId: clinical, label: EMR, subtitle: CLINICAL RECORD, status: healthy, variant: root, size: lg, selected: true }
    - { id: active-directory, domainId: identity, label: Active Directory, subtitle: IDENTITY, status: saludable }
    - { id: integration, domainId: data, label: Integration Engine, subtitle: CLINICAL FLOW, status: degraded, variant: anchor }
    - { id: pacs, domainId: clinical, label: PACS, subtitle: IMAGING, status: healthy, variant: anchor }
    - { id: lis, domainId: clinical, label: Laboratory System, subtitle: DIAGNOSTICS, status: saludable }
    - { id: sql-server, domainId: data, label: SQL Server, subtitle: CLINICAL DATA, status: saludable }
    - { id: pacs-storage, domainId: data, label: PACS Storage, subtitle: SINGLE DOMAIN, status: degradado }
    - { id: vmware, domainId: infrastructure, label: VMware, subtitle: COMPUTE, status: saludable }
    - { id: clinics, domainId: sites, label: Care Locations, subtitle: 12 SITES, status: saludable }
    - { id: backup, domainId: infrastructure, label: Backup Platform, subtitle: RECOVERY, status: saludable }
  relationships:
    - { from: active-directory, to: emr, label: authenticates, active: false }
    - { from: emr, to: integration, label: exchanges, active: false }
    - { from: integration, to: pacs, label: routes studies, active: false }
    - { from: integration, to: lis, label: routes results, active: false }
    - { from: emr, to: sql-server, label: stores records, active: false }
    - { from: pacs, to: pacs-storage, label: stores imaging, active: false }
    - { from: vmware, to: emr, label: hosts, active: false }
    - { from: clinics, to: emr, label: consumes, active: false }
    - { from: clinics, to: pacs, label: consumes, active: false }
    - { from: backup, to: sql-server, label: protects, active: false }
---

RMH represents a healthcare entorno where el reliability de an integration can matter as much as el health de any individual system.
