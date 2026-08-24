---
id: cad
translationKey: cad
translationStatus: complete
language: es
acronym: CAD
name: Comercial Aurora Dominicana
industry: Comercio y comercio electrónico
type: Entorno ficticio de estudio de casos
descriptor: Minorista omnicanal cuya tienda puede parecer saludable mientras los pagos, el inventario o los servicios externos detienen los ingresos por debajo.
headquarters: Santo Domingo
branches: 25
employees: 1800
logo: /images/organizations/logos/cad.webp
summary: A customer-visible commerce entorno shaped by traffic spikes, fast campaigns, external APIs, payment providers, y tightly coupled inventory flows.
businessDescription: CAD opera tiendas físicas, comercio digital, servicios de fidelización, almacenes y distribución nacional para consumidores dominicanos.
technologySupports: [Online storefront y mobile commerce, Checkout y payments, Store operations, Loyalty services, Inventory synchronization, Warehousing y distribution]
failureConsequences: [Los clientes abandonan sus carritos., Los ingresos se detienen aunque las páginas sigan en línea., El inventario se vuelve inconsistente., Las quejas llegan antes que las alertas internas.]
infrastructureDomains:
  - { id: commerce, label: Digital Commerce, systems: [E-Commerce Platform, Mobile App, Loyalty Platform] }
  - { id: transaction, label: Transaction Path, systems: [Checkout API, Payment Gateway, External APIs] }
  - { id: operations, label: Comercio Operations, systems: [ERP, Store Systems, SQL Server] }
  - { id: fulfillment, label: Fulfillment, systems: [Warehouse Management, Inventory Sync, Distribution] }
  - { id: edge, label: Edge & Visibilidad, systems: [CDN, Monitoreo, Customer Feedback] }
weakPoints:
  - { label: RIESGO DE PROVEEDOR, detail: La autorización de pagos y otros servicios críticos están fuera del control operativo directo. }
  - { label: RIESGO DE API, detail: El flujo de compra atraviesa varias interfaces internas y externas. }
  - { label: RIESGO DE CAPACIDAD, detail: Las campañas generan cambios rápidos de tráfico y plazos de entrega comprimidos. }
  - { label: BRECHA DE VISIBILIDAD, detail: Los chequeos internos pueden seguir en verde mientras los clientes no completan compras. }
  - { label: RIESGO DE DATOS, detail: La sincronización del inventario abarca sistemas digitales, de tiendas y de almacén. }
  - { label: RIESGO DE REPUTACIÓN, detail: Los clientes hacen visibles las fallas públicamente más rápido que las rutas formales de escalamiento. }
people:
  - { id: melissa-pena, name: Melissa Peña, role: Gerente de comercio electrónico, operationalImportance: Mide los incidentes mediante pedidos perdidos, conversión y experiencia del cliente., characteristic: Responsable de decisiones enfocada en ingresos y sometida a la presión de las campañas., question: ¿Cuántos pedidos estamos perdiendo? }
  - { id: hector-diaz, name: Héctor Díaz, role: Ingeniero de infraestructura, operationalImportance: Investiga fallas de cara al cliente aunque los sistemas internos parezcan saludables., characteristic: Investigador sólido de APIs y coordinador de proveedores, con control limitado sobre terceros., question: ¿Qué parte del flujo de compra está fallando? }
  - { id: sofia-reyes, name: Sofía Reyes, role: Supervisora de experiencia del cliente, operationalImportance: Detecta patrones de incidentes en llamadas, reseñas y redes sociales., characteristic: Muy sensible a los síntomas del cliente, sin acceso directo a las causas técnicas., question: Los clientes se están quejando. }
incidentIds: []
tags: [Comercio, Comercio electrónico, Pagos, Dependencia externa]
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
