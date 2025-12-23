---
title: Tipi letterali
sidebar:
  order: 16
  label: 16. Tipi letterali
---


Un tipo letterale è un singolo insieme di elementi di un tipo collettivo; definisce un valore molto preciso che è una primitiva JavaScript.

I tipi letterali in TypeScript sono numeri, stringhe e booleani.

Esempio di letterali:

```typescript
const a = 'a'; // Stringa tipo letterale

const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

I tipi letterali stringa, numerico e booleano vengono utilizzati nell'unione, nella protezione dei tipi e negli alias di tipo.
Nell'esempio seguente è possibile vedere un'unione di alias di tipo, `O` può essere l'unico valore specificato e nessun'altra stringa:

```typescript
type O = 'a' | 'b' | 'c';
```

