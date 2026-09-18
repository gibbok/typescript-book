---
title: L'API nativa di TypeScript aggiunge le API richieste da typescript-eslint
description: L'API nativa di TypeScript aggiunge API del checker e dei tipi richieste da typescript-eslint, riducendo le lacune di compatibilità.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Pubblicato:** 14 settembre 2026

L'API nativa di TypeScript espone ora ulteriori API del checker e dei tipi necessarie a `typescript-eslint`, riducendo le lacune di compatibilità per gli strumenti che dipendono dall'API programmatica di TypeScript.

## Cosa è cambiato

La modifica aggiunge API tra cui `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` e `getExportSymbolOfSymbol`. I tipi di interfaccia e classe ottengono anche `getThisType()`, mentre `IndexKind` viene esportato per le query sui tipi indice.

Sono state aggiornate sia le API native sincrone sia quelle asincrone.

## Perché è importante

La pull request di TypeScript è stata creata specificamente per aggiungere API indicate come mancanti da `typescript-eslint`. Le integrazioni possono così accedere a più informazioni del checker e dei tipi già attese dall'API TypeScript esistente.

## Fonte

Leggi la pull request ufficiale di TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
