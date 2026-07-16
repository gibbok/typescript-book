---
title: Modificadores de tipos mapeados
sidebar:
  order: 38
  label: 38. Modificadores de tipos mapeados
---


Los modificadores de tipos mapeados permiten transformar las propiedades de un tipo existente:

* `readonly` o `+readonly`: convierte una propiedad del tipo mapeado en una propiedad de solo lectura.
* `-readonly`: permite que una propiedad del tipo mapeado sea mutable.
* `?`: designa una propiedad del tipo mapeado como opcional.

Ejemplos:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

