---
title: "TypeScript accelera le ricompilazioni incrementali con controlli paralleli"
description: "TypeScript verifica in parallelo le firme dei file dipendenti durante le ricompilazioni incrementali."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

Una modifica integrata nel compilatore parallelizza il controllo delle firme dei file interessati dalle modifiche a moduli importati da molti altri file. Prima questa fase era sequenziale.

## Cosa cambia

Nel benchmark dell'autore, la ricompilazione dopo una modifica a un solo commento è passata da **3,4 a 1,5 secondi** su Linux con 32 core. In un pacchetto n8n, un caso analogo è passato da **5,4 a 4,5 secondi**. Sono risultati specifici dei test, non garanzie generali.

## Prestazioni e limiti

Il lavoro è limitato da `GOMAXPROCS`; i benefici dipendono dai checker disponibili e dalle dipendenze. Non migliora le build con `isolatedModules`, che non attraversano i file dipendenti.

## Fonte

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
