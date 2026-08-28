---
title: L'API nativa di TypeScript 7 aggiunge metodi di emit
description: L'API nativa di TypeScript aggiunge metodi di emit su file system e in memoria per interi programmi e output JavaScript o di dichiarazioni selezionati.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Pubblicato:** 24 luglio 2026

Il codice nativo di TypeScript ha aggiunto API programmatiche di emit per gli strumenti che devono generare output JavaScript o dichiarazioni.

## Cosa è cambiato

L'API integrata fornisce quattro modalità di emit con comportamenti diversi per output e selezione dei file.

* `program.emit(emitOnly?: EmitOnly)` emette l'intero programma nel file system, incluso un file system virtuale configurato, e rispetta opzioni che bloccano l'emit come `noEmit` e `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` emette l'intero programma come risultati stringa in memoria e rispetta anch'esso le opzioni che bloccano l'emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` restituisce in memoria l'output JavaScript dei file selezionati e ignora le opzioni che bloccano l'emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` fornisce il corrispondente output di dichiarazioni per i file selezionati.

In questo modo, chi usa l'API può scegliere tra il normale emit dell'intero programma e un output mirato in memoria.

## Disponibilità

La modifica è stata integrata nel codice nativo di TypeScript il 24 luglio 2026. La fonte non indica una versione npm stabile che includa queste API, quindi gli strumenti devono verificare il supporto nella versione di TypeScript utilizzata.

## Fonte

Leggi la pull request ufficiale: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
