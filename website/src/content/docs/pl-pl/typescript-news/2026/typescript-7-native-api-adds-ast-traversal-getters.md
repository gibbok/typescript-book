---
title: Natywne API TypeScript 7 dodaje gettery dzieci AST i tokenów
description: Natywne API TypeScript dodaje metody Node do przechodzenia po dzieciach i tokenach, zmniejszając różnicę względem API JavaScript dla narzędzi pracujących z drzewem składni.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Opublikowano:** 3 września 2026 r.

Natywne API TypeScript udostępnia teraz pięć metod pomocniczych `Node` do przechodzenia po węzłach potomnych i tokenach: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` i `getLastToken()`.

## Co się zmieniło

PR #63893 dodaje pozostałe gettery dzieci i tokenów, które już istnieją w API TypeScript opartym na JavaScripcie. Zmiana uzupełnia tę część natywnego API `Node` po wcześniejszym dodaniu getterów pozycji i tekstu.

## Dlaczego to ważne

Metody te są przydatne dla użytkowników API przechodzących po drzewie składni, w tym dla narzędzi, które muszą analizować zarówno tokeny, jak i węzły potomne. Natywne API może teraz używać w tych przypadkach tych samych metod pomocniczych `Node`.

## Źródło

Zobacz [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) oraz [issue śledzące](https://github.com/microsoft/TypeScript/issues/63892).
