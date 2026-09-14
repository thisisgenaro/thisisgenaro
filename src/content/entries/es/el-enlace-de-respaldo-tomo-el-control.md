---
id: journal-glc-inc-0104-opening-es
translationKey: journal-glc-inc-0104-opening
translationStatus: complete
language: es
title: El enlace de respaldo tomó el control
date: 2026-09-14
summary: El cambio de la WAN parecía haber funcionado en Santiago, pero un servicio crítico del almacén nunca siguió la ruta de respaldo.
topics:
  - Operaciones de Infraestructura
  - Análisis de Incidentes
  - Confiabilidad de Redes
tags:
  - GLC
  - MPLS
  - IPsec
  - Conmutación WAN
  - WMS
organizationIds:
  - glc
incidentIds:
  - GLC-INC-0104
personIds:
  - yessenia
  - laura-santana
relatedEntries: []
draft: false
slug: el-enlace-de-respaldo-tomo-el-control
readingTime: 4
---

A las 9:10 de la mañana, la conexión primaria entre el almacén de GLC en Santiago y el datacenter de Santo Domingo dejó de funcionar. La sucursal estaba diseñada para esa posibilidad, así que la red reaccionó casi de inmediato: la ruta MPLS primaria quedó fuera de servicio y el enlace de respaldo tomó el control.

Las primeras señales eran alentadoras. El túnel IPsec estaba activo, un servidor representativo en el datacenter respondía nuevamente, Active Directory y DNS estaban disponibles, y el almacén tenía acceso a Internet. La latencia era mayor de lo habitual, pero seguía dentro de lo esperado para la ruta de respaldo.

Desde el punto de vista de la red, la conmutación parecía haber funcionado.

Unos minutos después, el NOC informó que la conectividad había sido restablecida a través del circuito de respaldo. Técnicamente, esa afirmación era correcta. Santiago había recuperado el acceso al datacenter, y la mayoría de los indicadores que normalmente usamos para confirmar conectividad se veían saludables otra vez.

El problema era que el almacén todavía no podía trabajar.

Alrededor de las 9:18, Yessenia, la supervisora del almacén en Santiago, reportó que el Warehouse Management System seguía agotando el tiempo de espera. Algunos operadores podían continuar con información que ya habían cargado o impreso antes de la interrupción, pero las nuevas tareas de picking no estaban llegando, las confirmaciones de inventario no podían completarse y las transacciones de despacho no estaban pasando.

Su resumen fue mucho más simple:

**“La conexión volvió. El sistema del almacén no.”**

Eso cambió de inmediato la forma en que debíamos mirar el incidente. La red se había recuperado lo suficiente como para que varios indicadores técnicos volvieran a verde, pero uno de los servicios más importantes para la operación del almacén seguía sin estar disponible.

Laura, desde Operaciones, hizo la pregunta que realmente importaba: **¿El almacén puede despachar normalmente o no?**

La respuesta era no.

Así que el incidente siguió abierto.

Aquí es donde los escenarios de failover pueden volverse engañosos. Tendemos a describir la redundancia de una forma muy simple: falla la ruta primaria, entra la de respaldo y el servicio continúa. Ese modelo es útil, pero esconde una suposición importante: que todo aquello de lo que depende el negocio realmente va a seguir la ruta de respaldo.

En ese momento todavía no sabíamos por qué el WMS seguía sin estar disponible. La propia aplicación podía haber desarrollado un problema, algo específico de Santiago podía no haberse recuperado correctamente, o alguna de las dependencias del servicio podía estar comportándose de forma distinta al resto del tráfico hacia el datacenter.

Lo que sí sabíamos era que la falla no se comportaba como una pérdida completa de conectividad. El enlace de respaldo estaba activo, el acceso general al datacenter había regresado y, aun así, el almacén seguía sin poder llegar a un sistema del que dependía su operación.

**El enlace de respaldo había tomado el control.**

La pregunta ahora era:

**¿Qué no lo había seguido?**
