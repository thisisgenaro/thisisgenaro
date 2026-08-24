---
id: cad
translationKey: cad
translationStatus: complete
language: es
acronym: CAD
name: Comercial Aurora Dominicana
industry: Comercio & E-Commerce
type: Entorno ficticio de estudio de casos
descriptor: An omnichannel retailer whose storefront can appear saludable while payments, inventory, or external servicios stop revenue underneath it.
headquarters: Santo Domingo
branches: 25
employees: 1800
logo: /images/organizations/logos/cad.webp
summary: A customer-visible commerce entorno shaped by traffic spikes, fast campaigns, external APIs, payment providers, y tightly coupled inventory flows.
businessDescription: CAD operates physical stores, digital commerce, loyalty services, warehousing, y national distribution para Dominican consumers.
technologySupports: [Online storefront y mobile commerce, Checkout y payments, Store operations, Loyalty services, Inventory synchronization, Warehousing y distribution]
failureConsequences: [Customers abyon carts., Revenue stops while pages permanecen online., Inventory becomes inconsistent., Complaints arrive before internal alerts.]
infrastructureDomains:
  - { id: commerce, label: Digital Commerce, systems: [E-Commerce Platform, Mobile App, Loyalty Platform] }
  - { id: transaction, label: Transaction Path, systems: [Checkout API, Payment Gateway, External APIs] }
  - { id: operations, label: Comercio Operations, systems: [ERP, Store Systems, SQL Server] }
  - { id: fulfillment, label: Fulfillment, systems: [Warehouse Management, Inventory Sync, Distribution] }
  - { id: edge, label: Edge & Visibilidad, systems: [CDN, Monitoreo, Customer Feedback] }
weakPoints:
  - { label: VENDOR RISK, detail: Payment authorization y other critical servicios sit outside direct operativo control. }
  - { label: API RISK, detail: El purchase flow crosses several internal y external interfaces. }
  - { label: CAPACITY RISK, detail: Campaigns create rapid traffic changes y compressed delivery timelines. }
  - { label: BRECHA DE VISIBILIDAD, detail: Internal health checks can permanecen green while clientes cannot complete purchases. }
  - { label: DATA RISK, detail: Inventory synchronization spans digital, store, y warehouse systems. }
  - { label: REPUTATION RISK, detail: Customers publicly surface failures faster than formal escalation paths. }
people:
  - { id: melissa-pena, name: Melissa Peña, role: E-Commerce Manager, operationalImportance: Measures incidentes through lost orders, conversion, y customer experience., characteristic: Revenue-focused decision maker operating under campaign pressure., question: How many orders are we losing? }
  - { id: hector-diaz, name: Héctor Díaz, role: Infraestructura Engineer, operationalImportance: Investigates customer-facing failures even when internal sistemas appear healthy., characteristic: Strong API investigator y vendor coordinator con limited control over third parties., question: Which part de el purchase flow is failing? }
  - { id: sofia-reyes, name: Sofía Reyes, role: Customer Experience Supervisor, operationalImportance: Detects incidente patterns across calls, reviews, y social media., characteristic: Highly sensitive a customer symptoms without direct acceso a technical causes., question: Customers are complaining. }
incidentIds: []
tags: [Comercio, E-commerce, Payments, External dependency]
topology:
  nodes:
    - { id: storefront, domainId: commerce, label: Storefront, subtitle: CUSTOMER EDGE, status: healthy, variant: root, size: lg, selected: true }
    - { id: cdn, domainId: edge, label: CDN, subtitle: DELIVERY, status: saludable }
    - { id: checkout, domainId: transaction, label: Checkout API, subtitle: PURCHASE FLOW, status: healthy, variant: anchor }
    - { id: payment, domainId: transaction, label: Payment Gateway, subtitle: EXTERNAL, status: degraded, variant: anchor }
    - { id: loyalty, domainId: commerce, label: Loyalty Platform, subtitle: CUSTOMER, status: saludable }
    - { id: erp, domainId: operations, label: ERP, subtitle: OPERATIONS, status: saludable }
    - { id: inventory, domainId: fulfillment, label: Inventory Sync, subtitle: AVAILABILITY, status: degradado }
    - { id: wms, domainId: fulfillment, label: WMS, subtitle: FULFILLMENT, status: saludable }
    - { id: stores, domainId: operations, label: Store Red, subtitle: 25 LOCATIONS, status: saludable }
    - { id: monitoring, domainId: edge, label: Monitoreo, subtitle: INTERNAL VIEW, status: saludable }
  relationships:
    - { from: cdn, to: storefront, label: delivers, active: false }
    - { from: storefront, to: checkout, label: initiates, active: false }
    - { from: checkout, to: payment, label: authorizes, active: false }
    - { from: storefront, to: loyalty, label: recognizes, active: false }
    - { from: checkout, to: erp, label: creates order, active: false }
    - { from: inventory, to: storefront, label: publishes stock, active: false }
    - { from: wms, to: inventory, label: updates, active: false }
    - { from: stores, to: inventory, label: updates, active: false }
    - { from: monitoring, to: storefront, label: observes, active: false }
    - { from: monitoring, to: checkout, label: observes, active: false }
---

CAD represents a commerce entorno where apparent availability y successful customer outcomes can diverge sharply.
