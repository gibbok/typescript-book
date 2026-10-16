---
title: El compilador nativo de TypeScript reduce el uso de memoria con optimizaciones del comprobador de tipos
description: Los cambios integrados reducen los registros de tipos estructurados y ajustan la asignación de memoria y las cachés.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Publicado:** 14 de octubre de 2026

Microsoft integró varias optimizaciones de memoria en el compilador nativo de TypeScript. Reducen la memoria retenida por las estructuras internas del comprobador de tipos sin cambiar la sintaxis de TypeScript.

## Qué cambió

* Los bloques de las arenas tipadas ahora apuntan a unos 512 bytes en lugar de contener 256 objetos fijos. En la prueba de VS Code de este cambio, la memoria heap retenida bajó un 8.54% y el trabajo de escaneo del recolector de basura un 10.44%, mientras que los eventos de asignación subieron un 13.91%.
* Las firmas opcionales, la información de índices y las cachés del constructor de nodos se trasladan fuera de los registros `StructuredType`, cuyo tamaño pasa de 144 a 88 bytes.
* Los nodos de tipo resueltos y las firmas usan almacenes paginados de enlaces entre nodos cuando hay identificadores estables, con un mapa alternativo para otros identificadores.

## Disponibilidad

Los cambios se integraron el 14 de octubre de 2026. Las solicitudes de incorporación no identifican una versión estable de npm que los incluya. Los resultados de la prueba corresponden al cambio y la carga medidos.

## Fuente

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
