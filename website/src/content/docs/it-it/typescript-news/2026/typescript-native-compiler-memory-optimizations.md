---
title: Il compilatore nativo TypeScript riduce l'uso di memoria nel type checker
description: Modifiche integrate riducono le dimensioni dei record dei tipi strutturati e ottimizzano allocazione e cache.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Pubblicato:** 14 ottobre 2026

Microsoft ha integrato diverse ottimizzazioni della memoria nel compilatore nativo di TypeScript. Le modifiche riducono la memoria trattenuta dalle strutture interne del type checker senza cambiare la sintassi di TypeScript.

## Cosa è cambiato

* I blocchi delle arene tipizzate puntano ora a circa 512 byte, invece di contenere 256 oggetti fissi. Nel benchmark VS Code della modifica, la memoria heap trattenuta è diminuita dell'8.54% e la scansione del garbage collector del 10.44%, mentre gli eventi di allocazione sono aumentati del 13.91%.
* Firme opzionali, informazioni sugli indici e cache del node builder vengono spostate fuori dai record `StructuredType`, che passano da 144 a 88 byte.
* I nodi di tipo risolti e le firme usano archivi paginati dei collegamenti ai nodi quando sono disponibili ID stabili, con una mappa di riserva per gli altri ID.

## Disponibilità

Le modifiche sono state integrate il 14 ottobre 2026. Le pull request non indicano una versione npm stabile che le includa. I risultati del benchmark riguardano la modifica e il carico di lavoro misurati.

## Fonte

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
