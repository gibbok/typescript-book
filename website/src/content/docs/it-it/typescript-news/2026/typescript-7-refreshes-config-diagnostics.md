---
title: TypeScript 7 aggiorna la diagnostica dei file di configurazione dopo le modifiche
description: Il language service nativo ora ripubblica gli errori di tsconfig.json e jsconfig.json quando cambiano i file di configurazione monitorati.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Pubblicato:** 30 luglio 2026

Microsoft ha integrato una correzione che aggiorna la diagnostica dei file di configurazione nel language service nativo di TypeScript quando cambia un file `tsconfig.json` o `jsconfig.json` monitorato.

## Cosa è cambiato

La diagnostica dei file di configurazione viene pubblicata durante un aggiornamento dello snapshot del language service. In precedenza, la modifica di un file di configurazione monitorato pianificava un aggiornamento della diagnostica, ma non dello snapshot. I nuovi errori di configurazione potevano quindi rimanere obsoleti finché l'editor non effettuava un'altra richiesta che aggiornava lo snapshot.

Il language service ora rileva le modifiche ai file di configurazione monitorati e pianifica un aggiornamento dello snapshot con debounce. In questo modo, la diagnostica inviata viene ripubblicata senza dipendere da un'ulteriore richiesta dell'editor.

## Perché è importante

Quando un editor o uno strumento esterno modifica un file `tsconfig.json` o `jsconfig.json` monitorato, il language service nativo può segnalare gli errori di configurazione aggiornati basandosi sul solo evento del file watcher. Un test di regressione verifica questo comportamento con un valore `target` non valido.

## Disponibilità

La modifica è stata integrata nella codebase nativa di TypeScript dopo il rilascio di TypeScript 7.0. La fonte non indica una versione npm stabile che la includa, quindi consulta le note di rilascio della versione installata prima di fare affidamento sulla correzione.

## Fonte

Leggi la modifica ufficiale: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
