---
title: La API nativa de TypeScript 7 añade métodos de emit
description: La API nativa de TypeScript añade métodos de emit al sistema de archivos y en memoria para programas completos y salidas JavaScript o de declaraciones seleccionadas.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Publicado:** 24 de julio de 2026

La base de código nativa de TypeScript ha añadido API programáticas de emit para herramientas que necesitan generar salida JavaScript o de declaraciones.

## Qué cambió

La API integrada ofrece cuatro rutas de emit con comportamientos diferentes de salida y selección de archivos.

* `program.emit(emitOnly?: EmitOnly)` emite el programa completo al sistema de archivos, incluido un sistema de archivos virtual configurado, y respeta opciones que bloquean el emit, como `noEmit` y `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` emite el programa completo como resultados de cadena en memoria y también respeta las opciones que bloquean el emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` devuelve en memoria la salida JavaScript de los archivos seleccionados y omite las opciones que bloquean el emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` proporciona la salida de declaraciones correspondiente para los archivos seleccionados.

Esto ofrece a quienes consumen la API opciones separadas para el emit normal del programa completo y la salida dirigida en memoria.

## Disponibilidad

El cambio se integró en la base de código nativa de TypeScript el 24 de julio de 2026. La fuente no identifica una versión npm estable que contenga estas API, por lo que las herramientas deben verificar la compatibilidad en la versión de TypeScript que utilicen.

## Fuente

Lee la pull request oficial: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
