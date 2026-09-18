---
title: Natywne API TypeScript dodaje API potrzebne typescript-eslint
description: Natywne API TypeScript dodaje API mechanizmu sprawdzania i typów potrzebne typescript-eslint, zmniejszając luki zgodności.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Opublikowano:** 14 września 2026

Natywne API TypeScript udostępnia teraz dodatkowe API mechanizmu sprawdzania i typów potrzebne `typescript-eslint`, zmniejszając luki zgodności dla narzędzi korzystających z programistycznego API TypeScript.

## Co się zmieniło

Zmiana dodaje między innymi `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` i `getExportSymbolOfSymbol`. Typy interfejsów i klas otrzymują także `getThisType()`, a `IndexKind` jest eksportowany do zapytań o typy indeksowe.

Zaktualizowano zarówno synchroniczne, jak i asynchroniczne natywne API.

## Dlaczego to ważne

Pull request TypeScript powstał specjalnie po to, aby dodać API wskazane przez `typescript-eslint` jako brakujące. Integracje otrzymują dzięki temu więcej informacji o typach i mechanizmie sprawdzania, których oczekiwały od istniejącego API TypeScript.

## Źródło

Przeczytaj oficjalny pull request TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
