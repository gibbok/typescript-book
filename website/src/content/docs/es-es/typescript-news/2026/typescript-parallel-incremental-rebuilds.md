---
title: "TypeScript acelera las compilaciones incrementales con comprobaciones paralelas"
description: "TypeScript comprueba en paralelo las firmas de archivos dependientes durante las compilaciones incrementales."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

Un cambio incorporado al compilador paraleliza la comprobación de firmas de archivos afectados por cambios en módulos muy importados. Antes esta fase era secuencial.

## Qué cambió

En la prueba del autor, una recompilación tras editar solo un comentario bajó de **3,4 a 1,5 segundos** en Linux con 32 núcleos. En un paquete de n8n, un caso similar pasó de **5,4 a 4,5 segundos**. Son resultados específicos, no garantías generales.

## Rendimiento y límites

El trabajo está limitado por `GOMAXPROCS`; la mejora depende de los verificadores disponibles y las dependencias. No beneficia a compilaciones con `isolatedModules`, que no recorren archivos dependientes.

## Fuente

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
