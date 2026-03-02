---
title: Objekttyper
sidebar:
  order: 27
  label: 27. Objekttyper
---


I TypeScript beskriver objekttyper formen på ett objekt. De specificerar namnen och typerna på objektets egenskaper, samt huruvida dessa egenskaper är obligatoriska eller valfria.

I TypeScript kan du definiera objekttyper på två primära sätt:

Interface som definierar formen på ett objekt genom att specificera namnen, typerna och valfrihet hos dess egenskaper.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Typalias, liknande ett interface, definierar formen på ett objekt. Det kan dock även skapa en ny anpassad typ som baseras på en befintlig typ eller en kombination av befintliga typer. Detta inkluderar att definiera unionstyper, intersektionstyper och andra komplexa typer.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Det är också möjligt att definiera en typ anonymt:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

