---
title: "TypeScript przyspiesza kompilacje przyrostowe dzięki równoległym kontrolom"
description: "TypeScript równolegle sprawdza sygnatury plików zależnych podczas kompilacji przyrostowej."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

Scalona zmiana kompilatora umożliwia równoległe sprawdzanie sygnatur plików dotkniętych edycją często importowanych modułów. Wcześniej etap ten działał sekwencyjnie.

## Co się zmieniło

W teście autora kompilacja po zmianie samego komentarza na 32-rdzeniowym Linuksie skróciła się z **3,4 do 1,5 sekundy**. W pakiecie n8n podobny przypadek skrócił się z **5,4 do 4,5 sekundy**. Wyniki dotyczą konkretnych obciążeń.

## Wydajność i ograniczenia

Pracę ogranicza `GOMAXPROCS`; korzyści zależą od dostępnych kontrolerów i zależności. Nie dotyczy to `isolatedModules`, gdzie nie są przeglądane pliki odwołujące się.

## Źródło

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
