---
title: Annotazioni di tipo
sidebar:
  order: 11
  label: 11. Annotazioni di tipo
---


Sulle variabili dichiarate usando `var`, `let` e `const`, è possibile aggiungere facoltativamente un tipo:

```typescript
const x: number = 1;
```

TypeScript esegue un buon lavoro nell'inferenza dei tipi, soprattutto quando si tratta di tipi semplici, quindi queste dichiarazioni nella maggior parte dei casi non sono necessarie.

Sulle funzioni è possibile aggiungere annotazioni di tipo ai parametri:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Il seguente è un esempio che utilizza una funzione anonima (la cosiddetta funzione lambda):

```typescript
const sum = (a: number, b: number) => a + b;
```

Queste annotazioni possono essere evitate quando è presente un valore predefinito per un parametro:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Le annotazioni del tipo di ritorno possono essere aggiunte alle funzioni:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Questo è utile soprattutto per le funzioni più complesse, poiché scrivere esplicitamente il tipo di ritorno prima di un'implementazione può aiutare a pensare meglio alla funzione.

In genere, si consiglia di annotare le firme dei tipi, ma non le variabili locali del corpo, e di aggiungere i tipi sempre ai letterali degli oggetti.

