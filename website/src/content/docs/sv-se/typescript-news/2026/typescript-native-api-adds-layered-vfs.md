---
title: TypeScripts inbyggda API får virtuella filsystem i lager
description: TypeScripts inbyggda API kan uppdatera ögonblicksbilder med virtuella filsystem i minnet eller i lager, inklusive tillägg, ändringar, borttagningar och fallback till värdsystemet.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Publicerad:** 9 september 2026

TypeScripts inbyggda API kan nu skapa och uppdatera ögonblicksbilder med explicit data för virtuella filsystem. Verktyg kan därmed modellera tillagda, ändrade och borttagna filer utan att bygga om hela filsystemets indata.

## Vad har ändrats

De nya hjälpfunktionerna `createFileSystem`, `createFileSystemWithLib` och `createFileSystemLayer` skapar VFS-objekt som snapshot-API:erna accepterar. `Snapshot.update` kan lägga ett nytt cachelager ovanpå en befintlig ögonblicksbild.

Ett `full`-VFS ligger helt i minnet och faller inte tillbaka på filsystemscallbacks från värden eller sessionen. Ett `layer`-VFS faller tillbaka vid cachemissar och kan använda `removedPaths` för att dölja filer eller kataloger som finns på värden. Båda formerna stöder symboliska länkar inom det virtuella filsystemet och till värdsökvägar.

## Nuvarande begränsning

VFS-baserade ögonblicksbilder räknas fortfarande som riktiga ögonblicksbilder, så det inbyggda API:t behåller begränsningen till en riktig ögonblicksbild åt gången. Snapshot-operationer är därför fortfarande seriella tills vidare.

## Källa

Läs den sammanslagna TypeScript-pull requesten: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
