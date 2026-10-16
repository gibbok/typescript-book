---
title: Natywny kompilator TypeScript ogranicza zużycie pamięci dzięki optymalizacjom sprawdzania typów
description: Scalone zmiany zmniejszają rekordy typów strukturalnych i usprawniają alokację pamięci oraz pamięci podręczne.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Opublikowano:** 14 października 2026 r.

Microsoft scalił kilka optymalizacji pamięci w natywnym kompilatorze TypeScript. Ograniczają one pamięć utrzymywaną przez wewnętrzne struktury modułu sprawdzania typów bez zmiany składni TypeScript.

## Co się zmieniło

* Fragmenty typowanych aren mają teraz docelowy rozmiar około 512 bajtów zamiast stałej liczby 256 obiektów. W teście VS Code dla tej zmiany utrzymywana pamięć sterty spadła o 8.54%, skanowanie przez garbage collector o 10.44%, a liczba zdarzeń alokacji wzrosła o 13.91%.
* Opcjonalne sygnatury, informacje o indeksach i pamięci podręczne konstruktora węzłów przeniesiono poza rekordy `StructuredType`, zmniejszając ich rozmiar ze 144 do 88 bajtów.
* Rozwiązane węzły typów i sygnatury korzystają ze stronicowanych magazynów powiązań węzłów, gdy dostępne są stabilne identyfikatory; dla pozostałych używana jest mapa zapasowa.

## Dostępność

Zmiany scalono 14 października 2026 r. Źródłowe pull requesty nie wskazują stabilnej wersji npm, która je zawiera. Wyniki testów dotyczą tylko mierzonej zmiany i obciążenia.

## Źródło

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
