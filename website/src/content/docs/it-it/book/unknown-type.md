---
title: Tipo Unknown
sidebar:
  order: 45
  label: 45. Tipo Unknown
---


In TypeScript, il tipo `unknown` rappresenta un valore di tipo sconosciuto. A differenza del tipo `any`, che consente qualsiasi tipo di valore, `unknown` richiede un controllo o un'asserzione di tipo prima di poter essere utilizzato in un modo specifico, quindi non sono consentite operazioni su un `unknown` senza prima aver effettuato un'asserzione o aver limitato il campo a un tipo più specifico.

Il tipo `unknown` è assegnabile solo a qualsiasi tipo e il tipo `unknown` stesso è un'alternativa type-safe ad `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valido
let value2: any = value; // Valido
let value3: boolean = value; // Non valido
let value4: number = value; // Non valido
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // non definito
```

