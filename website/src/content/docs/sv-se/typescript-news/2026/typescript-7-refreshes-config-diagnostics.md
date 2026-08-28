---
title: TypeScript 7 uppdaterar konfigurationsdiagnostiken efter filändringar
description: Den inbyggda språktjänsten publicerar nu fel i tsconfig.json och jsconfig.json på nytt när bevakade konfigurationsfiler ändras.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publicerad:** 30 juli 2026

Microsoft har infört en korrigering som uppdaterar diagnostiken för konfigurationsfiler i TypeScripts inbyggda språktjänst när en bevakad `tsconfig.json`- eller `jsconfig.json`-fil ändras.

## Vad har ändrats

Diagnostik för konfigurationsfiler publiceras under en uppdatering av språktjänstens ögonblicksbild. Tidigare schemalade en ändring av en bevakad konfigurationsfil en diagnostikuppdatering, men ingen uppdatering av ögonblicksbilden. Nya konfigurationsfel kunde därför förbli inaktuella tills redigeraren gjorde en ny begäran som uppdaterade ögonblicksbilden.

Språktjänsten upptäcker nu ändringar i bevakade konfigurationsfiler och schemalägger en fördröjd uppdatering av ögonblicksbilden. Detta publicerar push-diagnostiken på nytt utan att vara beroende av en efterföljande begäran från redigeraren.

## Varför det är viktigt

När en redigerare eller ett externt verktyg ändrar en bevakad `tsconfig.json`- eller `jsconfig.json`-fil kan den inbyggda språktjänsten rapportera den uppdaterade konfigurationsdiagnostiken enbart utifrån filbevakarens händelse. Ett regressionstest verifierar beteendet med ett ogiltigt `target`-värde.

## Tillgänglighet

Ändringen infördes i TypeScripts inbyggda kodbas efter TypeScript 7.0. Källan anger inte vilken stabil npm-version som innehåller korrigeringen, så kontrollera versionsinformationen för den installerade versionen innan du förlitar dig på den.

## Källa

Läs den officiella ändringen: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
