---
id: journal-glc-inc-0104-routing-es
translationKey: journal-glc-inc-0104-routing
translationStatus: complete
language: es
title: El firewall no lo estaba bloqueando
date: 2026-09-18
summary: El firewall aceptaba el tráfico del WMS, pero la sesión seguía tomando la ruta MPLS fallida en lugar de la ruta IPsec recuperada.
topics:
  - infrastructure-operations
  - incident-analysis
  - network-reliability
tags:
  - GLC
  - WMS
  - FortiGate
  - Firewall
  - Routing
  - IPsec
  - MPLS
organizationIds:
  - glc
incidentIds:
  - GLC-INC-0104
personIds: []
image: /images/journal/entry-2/firewall-wasnt-blocking-it.png
relatedEntries: []
draft: false
slug: el-firewall-no-lo-estaba-bloqueando
readingTime: 5
---
# El firewall no lo estaba bloqueando

Para cuando empezamos a reducir las posibilidades, una explicación ya comenzaba a ser difícil de sostener: esto no parecía una caída general del WMS.

Desde Santiago no podían acceder a la aplicación, pero otras localidades de GLC seguían utilizando normalmente la misma plataforma centralizada. El servidor de aplicación respondía desde el datacenter, la base de datos continuaba procesando transacciones y el monitoreo disponible allí no mostraba una falla general del servicio.

Eso hacía que la situación fuera aún más extraña. El servicio que todos en Santiago estaban esperando en realidad no estaba caído.

## Primero: ¿El problema es el propio WMS?

Reiniciar el WMS surgió como una opción.

Era una sugerencia razonable. El almacén no podía utilizar la aplicación y, en ocasiones, reiniciar un servicio puede ser una forma efectiva de eliminar rápidamente una condición transitoria.

Pero la evidencia todavía no lo justificaba.

Las demás localidades seguían funcionando con normalidad. Reiniciar un WMS centralizado interrumpiría a usuarios que no estaban siendo afectados y podía eliminar evidencia útil antes de que entendiéramos qué estaba ocurriendo realmente desde Santiago.

Ya existía presión para poner nuevamente al almacén en operación, pero en ese momento reiniciar la aplicación habría sido ejecutar una acción sin tener una explicación suficientemente sólida detrás.

Así que la dejamos como estaba.

## Luego: ¿Podría ser DNS?

Desde Santiago podían acceder a otros servicios del datacenter, así que una dirección incorrecta o desactualizada para el WMS era una posibilidad razonable. Si el almacén estaba intentando llegar al destino equivocado, los síntomas podían parecerse mucho a los que estábamos viendo.

La resolución de nombres parecía normal. El hostname del WMS devolvía la dirección esperada:

`10.20.40.25`

De todas formas, probamos directamente contra la dirección IP.

El resultado fue exactamente el mismo.

Eliminar DNS del camino no cambió el timeout, así que esa hipótesis desapareció rápidamente. Lo que fuera que estaba ocurriendo sucedía después de que el cliente ya sabía dónde estaba el WMS.

## Después: ¿Falta algo en la política de firewall para el respaldo?

La atención pasó entonces hacia la propia ruta de respaldo.

La conectividad general hacia el datacenter se había recuperado mediante IPsec, pero el WMS todavía podía depender de una política específica del firewall que no estuviera aplicándose correctamente después del failover. La explicación encajaba razonablemente bien con el patrón: la mayoría de las cosas funcionaban, mientras una aplicación no.

Revisamos la política correspondiente del firewall y luego inspeccionamos la sesión real.

El firewall estaba aceptando el tráfico.

Eso descartó la versión más simple de la hipótesis del firewall. Desde Santiago se estaba enviando tráfico hacia el WMS y el FortiGate no lo estaba rechazando.

Pero la sesión mostró algo que no esperábamos.

**El tráfico del WMS no estaba saliendo por el túnel IPsec.**

Estaba siendo enviado hacia la red MPLS privada.

## El problema cambia de forma

Esa observación cambió por completo la investigación.

Hasta ese momento habíamos estado preguntándonos por qué una aplicación había fallado después de que la red se recuperara. Ahora la pregunta era diferente: si la ruta de respaldo estaba activa y otro tráfico hacia el datacenter ya la estaba utilizando, ¿por qué este destino en particular seguía siendo enviado hacia la red primaria que había fallado?

El firewall permitía la conexión. El WMS estaba saludable. DNS devolvía la dirección correcta. El túnel de respaldo estaba funcionando.

Y aun así, el paquete seguía tomando la salida equivocada.

En ese momento había un solo lugar que quería revisar a continuación:

**la tabla de enrutamiento.**
