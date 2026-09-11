---
title: La API nativa de TypeScript añade sistemas de archivos virtuales por capas
description: La API nativa de TypeScript puede actualizar snapshots con sistemas de archivos virtuales en memoria o por capas, incluidos altas, cambios, eliminaciones y fallback al sistema host.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Publicado:** 9 de septiembre de 2026

La API nativa de TypeScript ahora puede crear y actualizar snapshots con datos explícitos de un sistema de archivos virtual. Esto permite a las herramientas representar archivos añadidos, modificados y eliminados sin reconstruir toda la entrada del sistema de archivos.

## Qué cambió

Los nuevos helpers `createFileSystem`, `createFileSystemWithLib` y `createFileSystemLayer` crean objetos VFS aceptados por las API de snapshots. `Snapshot.update` puede aplicar una nueva capa de caché sobre un snapshot existente.

Un VFS `full` permanece completamente en memoria y no recurre a callbacks del sistema de archivos del host o de la sesión. Un VFS `layer` recurre al host cuando hay fallos de caché y puede usar `removedPaths` para ocultar archivos o directorios que existen en el host. Ambas formas admiten enlaces simbólicos dentro del sistema de archivos virtual y hacia rutas del host.

## Limitación actual

Los snapshots respaldados por VFS siguen contando como snapshots reales, por lo que la API nativa mantiene la restricción actual de un solo snapshot real a la vez. Por ahora, las operaciones de snapshot siguen siendo seriales.

## Fuente

Lee la pull request de TypeScript ya integrada: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
