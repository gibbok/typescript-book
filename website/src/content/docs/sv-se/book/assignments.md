---
title: Tilldelningar
sidebar:
  order: 21
  label: 21. Tilldelningar
---


TypeScript-avsmalning med hjälp av tilldelningar är ett sätt att avsmalma typen av en variabel baserat på det tilldelade värdet. När en variabel tilldelas ett värde härleder TypeScript dess typ baserat på det tilldelade värdet, och avsmalmar variabelns typ för att matcha den härledda typen.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

