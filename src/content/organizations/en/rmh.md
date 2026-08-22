---
id: rmh
language: en
acronym: RMH
name: Red Médica Horizonte
industry: Healthcare
type: Fictional case-study environment
descriptor: A hospital, clinic, and diagnostics network where infrastructure health is inseparable from patient care.
headquarters: Santo Domingo
branches: 12
employees: 2400
logo: /images/organizations/logos/rmh.webp
summary: A clinically integrated environment where individually healthy systems can still fail the workflows connecting patients, clinicians, laboratories, and imaging.
businessDescription: RMH coordinates hospital care, outpatient clinics, diagnostics, radiology, laboratories, and supporting clinical administration.
technologySupports: [Electronic medical records, Diagnostic imaging, Laboratory workflows, Clinical communications, Patient access, Remote clinical connectivity]
failureConsequences: [Patient care may be delayed., Clinicians lose access to records or images., Diagnostic workflows become manual., Technical symptoms become clinical risks.]
infrastructureDomains:
  - { id: identity, label: Identity & Collaboration, systems: [Active Directory, Entra ID, Microsoft 365] }
  - { id: clinical, label: Clinical Systems, systems: [Electronic Medical Record, PACS, Laboratory Information System] }
  - { id: data, label: Clinical Data, systems: [SQL Server, PACS Storage, Integration Services] }
  - { id: infrastructure, label: Infrastructure, systems: [VMware, Clinical VPN, Backup Platform] }
  - { id: sites, label: Care Locations, systems: [Hospital, Clinics, Diagnostic Centers] }
weakPoints:
  - { label: VENDOR RISK, detail: Clinical platforms depend on specialized vendors and tightly controlled support paths. }
  - { label: LEGACY CONSTRAINT, detail: Older medical devices require security and compatibility exceptions. }
  - { label: RESILIENCE RISK, detail: PACS storage and the primary EMR database have concentrated failure domains. }
  - { label: KNOWLEDGE RISK, detail: Clinical integration knowledge is concentrated within a small technology team. }
  - { label: DOCUMENTATION GAP, detail: Interfaces between clinical systems are not consistently documented end to end. }
  - { label: WORKFLOW VISIBILITY, detail: Monitoring does not always represent the complete patient-care workflow. }
people:
  - { id: isabel-marte, name: Dra. Isabel Marte, role: Hospital Director, operationalImportance: Frames technology incidents in terms of patient safety and continuity of care., characteristic: Clinical leader with strong crisis instincts and limited infrastructure visibility., question: Is this affecting patients? }
  - { id: carlos-tejada, name: Carlos Tejada, role: Systems Coordinator, operationalImportance: Connects technical conditions to clinical integrations that are rarely fully documented., characteristic: Skilled vendor coordinator whose environment knowledge is heavily concentrated., question: Which clinical workflow is affected? }
  - { id: julio, name: Julio, role: Radiology Technician, operationalImportance: Detects PACS and imaging degradation before formal infrastructure alerts., characteristic: Deep radiology workflow awareness expressed through practical symptoms., question: Why are images taking longer? }
  - { id: ana-maria-soto, name: Ana María Soto, role: Nurse Supervisor, operationalImportance: Escalates technology issues when they begin to disrupt patient care., characteristic: Strong patient-workflow awareness outside formal technical planning., question: Is this affecting care? }
incidentIds: []
tags: [Healthcare, Clinical systems, Integration, Patient care]
topology:
  nodes:
    - { id: emr, label: EMR, subtitle: CLINICAL RECORD, q: -7, r: -2, status: healthy, variant: root, size: lg, selected: true }
    - { id: active-directory, label: Active Directory, subtitle: IDENTITY, q: -3, r: -4, status: healthy }
    - { id: integration, label: Integration Engine, subtitle: CLINICAL FLOW, q: 2, r: -4, status: degraded, variant: anchor }
    - { id: pacs, label: PACS, subtitle: IMAGING, q: 6, r: -2, status: healthy, variant: anchor }
    - { id: lis, label: Laboratory System, subtitle: DIAGNOSTICS, q: -5, r: 3, status: healthy }
    - { id: sql-server, label: SQL Server, subtitle: CLINICAL DATA, q: 0, r: 2, status: healthy }
    - { id: pacs-storage, label: PACS Storage, subtitle: SINGLE DOMAIN, q: 5, r: 3, status: degraded }
    - { id: vmware, label: VMware, subtitle: COMPUTE, q: -3, r: 7, status: healthy }
    - { id: clinics, label: Care Locations, subtitle: 12 SITES, q: 3, r: 7, status: healthy }
    - { id: backup, label: Backup Platform, subtitle: RECOVERY, q: 7, r: 6, status: healthy }
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

RMH represents a healthcare environment where the reliability of an integration can matter as much as the health of any individual system.
