---
title: Modificatori di tipo mappati
sidebar:
  order: 38
  label: 38. Modificatori di tipo mappati
---


I modificatori di tipo mappati in TypeScript consentono la trasformazione delle proprietà all'interno di un tipo esistente:

* `readonly` o `+readonly`: questo rende una proprietà nel tipo mappato di sola lettura.
* `-readonly`: questo consente a una proprietà nel tipo mappato di essere modificabile.
* `?`: questo designa una proprietà nel tipo mappato come facoltativa.

Esempi:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Tutte le proprietà contrassegnate come di sola lettura

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Tutte le proprietà contrassegnate come modificabili

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Tutte le proprietà contrassegnate come facoltative
```

