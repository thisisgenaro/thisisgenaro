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
failureConsequences: [La atención a pacientes puede retrasarse., Los profesionales pierden acceso a historiales o imágenes., Los flujos diagnósticos se vuelven manuales., Los síntomas técnicos se convierten en riesgos clínicos.]
infrastructureDomains:
  - { id: identity, label: Identidad & Collaboration, systems: [Active Directory, Entra ID, Microsoft 365] }
  - { id: clinical, label: Clinical Systems, systems: [Electronic Medical Record, PACS, Laboratory Information System] }
  - { id: data, label: Clinical Datos, systems: [SQL Server, PACS Storage, Integration Services] }
  - { id: infrastructure, label: Infraestructura, systems: [VMware, Clinical VPN, Backup Platform] }
  - { id: sites, label: Care Locations, systems: [Hospital, Clinics, Diagnostic Centers] }
weakPoints:
  - { label: RIESGO DE PROVEEDOR, detail: Las plataformas clínicas dependen de proveedores especializados y rutas de soporte estrictamente controladas. }
  - { label: RESTRICCIÓN HEREDADA, detail: Los dispositivos médicos antiguos requieren excepciones de seguridad y compatibilidad. }
  - { label: RIESGO DE RESILIENCIA, detail: El almacenamiento PACS y la base de datos principal del EMR concentran dominios de falla. }
  - { label: RIESGO DE CONOCIMIENTO, detail: El conocimiento de integración clínica está concentrado en un equipo tecnológico pequeño. }
  - { label: BRECHA DE DOCUMENTACIÓN, detail: Las interfaces entre sistemas clínicos no se documentan de forma consistente de extremo a extremo. }
  - { label: VISIBILIDAD DEL FLUJO, detail: El monitoreo no siempre representa el flujo completo de atención al paciente. }
people:
  - { id: isabel-marte, name: Dra. Isabel Marte, role: Directora del hospital, operationalImportance: Enmarca los incidentes tecnológicos en términos de seguridad del paciente y continuidad de la atención., characteristic: Líder clínica con fuerte instinto de crisis y visibilidad limitada de la infraestructura., question: ¿Esto está afectando a los pacientes? }
  - { id: carlos-tejada, name: Carlos Tejada, role: Coordinador de sistemas, operationalImportance: Conecta las condiciones técnicas con integraciones clínicas que rara vez están completamente documentadas., characteristic: Coordinador de proveedores competente, con conocimiento del entorno muy concentrado., question: ¿Qué flujo clínico está afectado? }
  - { id: julio, name: Julio, role: Técnico de radiología, operationalImportance: Detecta la degradación de PACS e imágenes antes de las alertas formales de infraestructura., characteristic: Amplio conocimiento del flujo radiológico, expresado mediante síntomas prácticos., question: ¿Por qué las imágenes tardan más? }
  - { id: ana-maria-soto, name: Ana María Soto, role: Supervisora de enfermería, operationalImportance: Escala los problemas tecnológicos cuando empiezan a interrumpir la atención al paciente., characteristic: Gran conciencia del flujo de pacientes fuera de la planificación técnica formal., question: ¿Esto está afectando la atención? }
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
