---
title: Tipi di oggetto
sidebar:
  order: 27
  label: 27. Tipi di oggetto
---


In TypeScript, i tipi di oggetto descrivono la forma di un oggetto. Specificano i nomi e i tipi delle proprietà dell'oggetto, nonché se tali proprietà sono obbligatorie o facoltative.

In TypeScript, è possibile definire i tipi di oggetto in due modi principali:

interface, che definisce la forma di un oggetto specificando i nomi, i tipi e l'opzionalità delle sue proprietà.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Un alias di tipo, simile a un'interfaccia, definisce la forma di un oggetto. Tuttavia, può anche creare un nuovo tipo personalizzato basato su un tipo esistente o su una combinazione di tipi esistenti. Ciò include la definizione di tipi unione, tipi intersezione e altri tipi complessi.

```typescript
type Point = {
    x: number;
    y: number;
};
```

È anche possibile definire un tipo in modo anonimo:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

