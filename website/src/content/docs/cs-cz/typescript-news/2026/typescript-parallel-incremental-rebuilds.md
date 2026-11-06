---
title: "TypeScript zrychluje inkrementální sestavení paralelní kontrolou signatur"
description: "TypeScript při inkrementálním sestavení nově kontroluje signatury závislých souborů paralelně."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

Sloučená změna kompilátoru umožňuje paralelní kontrolu signatur souborů ovlivněných úpravou často importovaného modulu. Dříve tato fáze probíhala sekvenčně.

## Co se změnilo

V benchmarku autora se sestavení po změně pouhého komentáře na 32jádrovém Linuxu zrychlilo z **3,4 na 1,5 sekundy**. V balíčku n8n podobný případ klesl z **5,4 na 4,5 sekundy**. Výsledky platí pro konkrétní testy.

## Výkon a omezení

Paralelismus omezuje `GOMAXPROCS`; přínos závisí na dostupných kontrolerech a závislostech. U `isolatedModules` změna nepomáhá, protože se neprocházejí odkazující soubory.

## Zdroj

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
