---
id: cad
language: en
acronym: CAD
name: Comercial Aurora Dominicana
industry: Retail & E-Commerce
type: Fictional case-study environment
descriptor: An omnichannel retailer whose storefront can appear healthy while payments, inventory, or external services stop revenue underneath it.
headquarters: Santo Domingo
branches: 25
employees: 1800
logo: /images/organizations/logos/cad.webp
summary: A customer-visible commerce environment shaped by traffic spikes, fast campaigns, external APIs, payment providers, and tightly coupled inventory flows.
businessDescription: CAD operates physical stores, digital commerce, loyalty services, warehousing, and national distribution for Dominican consumers.
technologySupports: [Online storefront and mobile commerce, Checkout and payments, Store operations, Loyalty services, Inventory synchronization, Warehousing and distribution]
failureConsequences: [Customers abandon carts., Revenue stops while pages remain online., Inventory becomes inconsistent., Complaints arrive before internal alerts.]
infrastructureDomains:
  - { id: commerce, label: Digital Commerce, systems: [E-Commerce Platform, Mobile App, Loyalty Platform] }
  - { id: transaction, label: Transaction Path, systems: [Checkout API, Payment Gateway, External APIs] }
  - { id: operations, label: Retail Operations, systems: [ERP, Store Systems, SQL Server] }
  - { id: fulfillment, label: Fulfillment, systems: [Warehouse Management, Inventory Sync, Distribution] }
  - { id: edge, label: Edge & Visibility, systems: [CDN, Monitoring, Customer Feedback] }
weakPoints:
  - { label: VENDOR RISK, detail: Payment authorization and other critical services sit outside direct operational control. }
  - { label: API RISK, detail: The purchase flow crosses several internal and external interfaces. }
  - { label: CAPACITY RISK, detail: Campaigns create rapid traffic changes and compressed delivery timelines. }
  - { label: VISIBILITY GAP, detail: Internal health checks can remain green while customers cannot complete purchases. }
  - { label: DATA RISK, detail: Inventory synchronization spans digital, store, and warehouse systems. }
  - { label: REPUTATION RISK, detail: Customers publicly surface failures faster than formal escalation paths. }
people:
  - { id: melissa-pena, name: Melissa Peña, role: E-Commerce Manager, operationalImportance: Measures incidents through lost orders, conversion, and customer experience., characteristic: Revenue-focused decision maker operating under campaign pressure., question: How many orders are we losing? }
  - { id: hector-diaz, name: Héctor Díaz, role: Infrastructure Engineer, operationalImportance: Investigates customer-facing failures even when internal systems appear healthy., characteristic: Strong API investigator and vendor coordinator with limited control over third parties., question: Which part of the purchase flow is failing? }
  - { id: sofia-reyes, name: Sofía Reyes, role: Customer Experience Supervisor, operationalImportance: Detects incident patterns across calls, reviews, and social media., characteristic: Highly sensitive to customer symptoms without direct access to technical causes., question: Customers are complaining. }
incidentIds: []
tags: [Retail, E-commerce, Payments, External dependency]
topology:
  nodes:
    - { id: storefront, domainId: commerce, label: Storefront, subtitle: CUSTOMER EDGE, status: healthy, variant: root, size: lg, selected: true }
    - { id: cdn, domainId: edge, label: CDN, subtitle: DELIVERY, status: healthy }
    - { id: checkout, domainId: transaction, label: Checkout API, subtitle: PURCHASE FLOW, status: healthy, variant: anchor }
    - { id: payment, domainId: transaction, label: Payment Gateway, subtitle: EXTERNAL, status: degraded, variant: anchor }
    - { id: loyalty, domainId: commerce, label: Loyalty Platform, subtitle: CUSTOMER, status: healthy }
    - { id: erp, domainId: operations, label: ERP, subtitle: OPERATIONS, status: healthy }
    - { id: inventory, domainId: fulfillment, label: Inventory Sync, subtitle: AVAILABILITY, status: degraded }
    - { id: wms, domainId: fulfillment, label: WMS, subtitle: FULFILLMENT, status: healthy }
    - { id: stores, domainId: operations, label: Store Network, subtitle: 25 LOCATIONS, status: healthy }
    - { id: monitoring, domainId: edge, label: Monitoring, subtitle: INTERNAL VIEW, status: healthy }
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

CAD represents a commerce environment where apparent availability and successful customer outcomes can diverge sharply.
