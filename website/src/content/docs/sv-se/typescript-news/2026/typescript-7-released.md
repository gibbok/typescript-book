---
title: TypeScript 7.0 är nu tillgängligt
description: TypeScript 7.0 introducerar en Go-baserad inbyggd kompilator och språktjänst, vilket ger stora prestandaförbättringar för byggen och redigerare.
lastUpdated: 2026-07-08
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Publicerad:** 8 juli 2026

Microsoft har släppt TypeScript 7.0, den första stabila versionen som bygger på projektets nya inbyggda kodbas i Go.

## Vad har ändrats

TypeScript 7 använder inbyggd kod, flertrådning med delat minne och ytterligare optimeringar. Enligt TypeScript-teamets publicerade prestandatester var fullständiga byggen mellan 7,7 och 11,9 gånger snabbare än med TypeScript 6.

Versionen flyttar också språktjänsten till Language Server Protocol. Redigerare med stöd kan använda samma inbyggda grund för snabbare projektinläsning, diagnostik, kompletteringar och navigering.

Installera den stabila versionen från npm:

```shell
npm install --save-dev typescript
```

## Kompatibilitet

TypeScript 7.0 tillhandahåller inte ett stabilt programmatiskt API. Verktyg som bäddar in TypeScript, däribland aktuella Astro, Vue, MDX, Svelte och vissa Angular-arbetsflöden, kan fortfarande kräva TypeScript 6 tills det nya API:t blir tillgängligt.

TypeScript-teamet räknar med att introducera det nya API:t i TypeScript 7.1. Projekt bör kontrollera stödet i sina ramverk och verktyg före uppgradering.

## Källa

Läs det officiella tillkännagivandet: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
