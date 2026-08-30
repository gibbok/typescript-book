---
title: Schreibgeschützte Eigenschaften
sidebar:
  order: 14
  label: 14. Schreibgeschützte Eigenschaften
---


Mit dem Modifizierer `readonly` kann das Schreiben in eine Eigenschaft verhindert werden. Er stellt sicher, dass der Eigenschaft kein neuer Wert zugewiesen werden kann, bietet jedoch keine Garantie für vollständige Unveränderlichkeit:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

