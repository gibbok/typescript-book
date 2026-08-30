---
title: Optionale Eigenschaften
sidebar:
  order: 13
  label: 13. Optionale Eigenschaften
---


Ein Objekt kann optionale Eigenschaften angeben, indem dem Eigenschaftsnamen ein Fragezeichen `?` angehängt wird:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Wenn eine Eigenschaft optional ist, kann ein Standardwert angegeben werden:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

