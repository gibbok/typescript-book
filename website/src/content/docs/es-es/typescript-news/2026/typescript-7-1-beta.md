---
title: "TypeScript 7.1 Beta incorpora API modulares y compatibilidad con ES2026"
description: "TypeScript 7.1 Beta añade API nativas modulares, ES2026, importaciones de origen, mapeadores de contenido y mejoras de rendimiento."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Publicado:** 20 de octubre de 2026

Microsoft ha publicado TypeScript 7.1 Beta, con nuevas API nativas del compilador y compatibilidad con funciones de JavaScript. Para probar la beta:

```shell
npm install -D typescript@beta
```

## Qué ha cambiado

* `--target es2026` y `--lib es2026` ya se admiten como opciones estables, con declaraciones actualizadas de la biblioteca estándar.
* Las nuevas entradas de API incluyen `typescript/sync`, `typescript/async`, `typescript/fs` y `typescript/ast`. Los objetos `API` y `Program` deben liberarse, por ejemplo con `using`.
* Las importaciones en fase de origen (`import source` e `import.source()`) permiten obtener objetos fuente de módulos, incluidos casos de WebAssembly, con ajustes adecuados de `--module` y `esnext`.
* Los mapeadores de contenido exponen TypeScript integrado en archivos como `.vue` y `.svelte`. Su ejecución desde la línea de comandos requiere `--runExternalCode`.
* Según las pruebas publicadas por Microsoft, las compilaciones son más rápidas y consumen menos memoria que con TypeScript 7.0.

## Disponibilidad

Es una beta, no una versión estable. Comprueba la compatibilidad de frameworks y herramientas antes de actualizar. Los atributos de importación en módulos ambientales ya se trataron en otra noticia.

## Fuente

Lee el anuncio oficial: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
