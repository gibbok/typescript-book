---
title: TypeScript 7 actualiza los diagnósticos de configuración tras los cambios en archivos
description: El servicio de lenguaje nativo ahora vuelve a publicar los errores de tsconfig.json y jsconfig.json cuando cambian los archivos de configuración supervisados.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publicado:** 30 de julio de 2026

Microsoft ha integrado una corrección que actualiza los diagnósticos de los archivos de configuración en el servicio de lenguaje nativo de TypeScript cuando cambia un archivo `tsconfig.json` o `jsconfig.json` supervisado.

## Qué ha cambiado

Los diagnósticos de los archivos de configuración se publican durante una actualización de la instantánea del servicio de lenguaje. Antes, un cambio en un archivo de configuración supervisado programaba una actualización de los diagnósticos, pero no de la instantánea. Por tanto, los nuevos errores de configuración podían permanecer obsoletos hasta que el editor realizara otra solicitud que actualizara la instantánea.

Ahora, el servicio de lenguaje detecta los cambios en los archivos de configuración supervisados y programa una actualización de la instantánea con antirrebote. Esto vuelve a publicar los diagnósticos enviados sin depender de una solicitud posterior del editor.

## Por qué es importante

Cuando un editor o una herramienta externa cambia un archivo `tsconfig.json` o `jsconfig.json` supervisado, el servicio de lenguaje nativo puede informar de los errores de configuración actualizados únicamente a partir del evento del observador de archivos. Una prueba de regresión verifica este comportamiento con un valor `target` no válido.

## Disponibilidad

El cambio se integró en el código nativo de TypeScript después del lanzamiento de TypeScript 7.0. La fuente no identifica una versión estable de npm que incluya la corrección, por lo que se deben consultar las notas de la versión instalada antes de depender de ella.

## Fuente

Lee el cambio oficial: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
