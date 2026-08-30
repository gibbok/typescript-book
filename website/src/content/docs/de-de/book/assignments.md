---
title: Zuweisungen
sidebar:
  order: 22
  label: 22. Zuweisungen
---


TypeScript-Narrowing mithilfe von Zuweisungen ist eine Möglichkeit, den Typ einer Variablen anhand des ihr zugewiesenen Werts einzugrenzen. Wenn einer Variablen ein Wert zugewiesen wird, leitet TypeScript ihren Typ anhand des zugewiesenen Werts ab und grenzt den Typ der Variablen entsprechend dem abgeleiteten Typ ein.

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

