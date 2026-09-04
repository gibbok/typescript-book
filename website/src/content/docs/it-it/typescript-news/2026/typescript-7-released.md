---
title: TypeScript 7.0 è ora disponibile
description: TypeScript 7.0 introduce un compilatore nativo e un language service basati su Go, con importanti miglioramenti delle prestazioni per build ed editor.
lastUpdated: 2026-07-08
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Pubblicato:** 8 luglio 2026

Microsoft ha pubblicato TypeScript 7.0, la prima versione stabile basata sul nuovo codice nativo in Go del progetto.

## Cosa è cambiato

TypeScript 7 utilizza codice nativo, multithreading con memoria condivisa e ulteriori ottimizzazioni. Secondo il team di TypeScript, nei benchmark pubblicati le build complete sono risultate da 7,7 a 11,9 volte più veloci rispetto a TypeScript 6.

La versione trasferisce inoltre il language service al Language Server Protocol. Gli editor supportati possono sfruttare la stessa base nativa per caricare i progetti, produrre diagnostica e completamenti e consentire la navigazione più velocemente.

Installa la versione stabile da npm:

```shell
npm install --save-dev typescript
```

## Compatibilità

TypeScript 7.0 non fornisce un'API programmatica stabile. Gli strumenti che integrano TypeScript, tra cui le versioni attuali di Astro, Vue, MDX, Svelte e alcuni flussi di lavoro Angular, potrebbero richiedere ancora TypeScript 6 finché la nuova API non sarà disponibile.

Il team di TypeScript prevede di introdurre la nuova API in TypeScript 7.1. Prima dell'aggiornamento, è opportuno verificare il supporto del framework e degli strumenti utilizzati.

## Fonte

Leggi l'annuncio ufficiale: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
