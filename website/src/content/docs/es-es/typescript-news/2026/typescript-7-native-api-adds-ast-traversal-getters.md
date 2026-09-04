---
title: La API nativa de TypeScript 7 añade getters de hijos y tokens del AST
description: La API nativa de TypeScript añade métodos de Node para recorrer hijos y tokens, reduciendo una diferencia con la API de JavaScript para herramientas que trabajan con el árbol de sintaxis.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Publicado:** 3 de septiembre de 2026

La API nativa de TypeScript ahora expone cinco métodos auxiliares de `Node` para recorrer nodos hijos y tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` y `getLastToken()`.

## Qué cambió

La PR #63893 añade los getters restantes de hijos y tokens que ya existen en la API de TypeScript basada en JavaScript. El cambio completa la parte de hijos y tokens de la API nativa de `Node`, después de que ya se hubieran añadido los getters de posición y texto.

## Por qué importa

Estos métodos son útiles para consumidores de la API que recorren el árbol de sintaxis, incluidas herramientas que necesitan inspeccionar tanto tokens como nodos hijos. La API nativa ahora puede usar los mismos auxiliares de recorrido de `Node` en estos casos.

## Fuente

Lee [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) y la [incidencia de seguimiento](https://github.com/microsoft/TypeScript/issues/63892).
