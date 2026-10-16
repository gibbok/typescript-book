---
title: Nativní kompilátor TypeScriptu snižuje spotřebu paměti optimalizacemi kontroly typů
description: Sloučené změny zmenšují záznamy strukturovaných typů a upravují alokaci paměti a mezipaměti.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Zveřejněno:** 14. října 2026

Microsoft sloučil několik optimalizací paměti do nativního kompilátoru TypeScriptu. Snižují paměť uchovávanou interními datovými strukturami kontroly typů, aniž by měnily syntaxi TypeScriptu.

## Co se změnilo

* Bloky typovaných arén nyní cílí na přibližně 512 bajtů namísto pevného počtu 256 objektů. V benchmarku VS Code pro tuto změnu klesla uchovávaná paměť haldy o 8.54 % a objem skenování garbage collectorem o 10.44 %, zatímco počet alokačních událostí vzrostl o 13.91 %.
* Volitelné signatury, informace o indexech a mezipaměti pro tvorbu uzlů se přesouvají mimo záznamy `StructuredType`, jejichž velikost klesá ze 144 na 88 bajtů.
* Vyřešené typové uzly a signatury používají stránkovaná úložiště vazeb uzlů, pokud jsou dostupná stabilní ID; pro ostatní ID zůstává záložní mapa.

## Dostupnost

Změny byly sloučeny 14. října 2026. Zdrojové pull requesty neuvádějí stabilní verzi npm, která je obsahuje. Výsledky benchmarku platí pouze pro měřenou změnu a zátěž.

## Zdroj

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
