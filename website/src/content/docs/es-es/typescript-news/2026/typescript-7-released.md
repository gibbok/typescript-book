---
title: TypeScript 7.0 ya está disponible
description: TypeScript 7.0 presenta un compilador nativo y un servicio de lenguaje basados en Go, con importantes mejoras de rendimiento para compilaciones y editores.
lastUpdated: 2026-07-08
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Publicado:** 8 de julio de 2026

Microsoft ha publicado TypeScript 7.0, la primera versión estable basada en el nuevo código nativo en Go del proyecto.

## Qué cambió

TypeScript 7 utiliza código nativo, multihilo con memoria compartida y otras optimizaciones. Según el equipo de TypeScript, en las pruebas publicadas las compilaciones completas fueron entre 7,7 y 11,9 veces más rápidas que con TypeScript 6.

La versión también traslada el servicio de lenguaje al Language Server Protocol. Los editores compatibles pueden utilizar la misma base nativa para cargar proyectos, generar diagnósticos y sugerencias, y facilitar la navegación con mayor rapidez.

Instala la versión estable desde npm:

```shell
npm install --save-dev typescript
```

## Compatibilidad

TypeScript 7.0 no ofrece una API programática estable. Las herramientas que integran TypeScript, incluidas las versiones actuales de Astro, Vue, MDX, Svelte y algunos flujos de trabajo de Angular, podrían seguir necesitando TypeScript 6 hasta que la nueva API esté disponible.

El equipo de TypeScript espera presentar la nueva API en TypeScript 7.1. Antes de actualizar, los proyectos deben comprobar la compatibilidad de sus frameworks y herramientas.

## Fuente

Lee el anuncio oficial: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
