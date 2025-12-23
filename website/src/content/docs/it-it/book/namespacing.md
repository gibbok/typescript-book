---
title: Namespace
sidebar:
  order: 57
  label: 57. Namespace
---


In TypeScript, gli spazi dei nomi vengono utilizzati per organizzare il codice in contenitori logici, prevenendo collisioni di nomi e fornendo un modo per raggruppare il codice correlato.
L'utilizzo delle parole chiave `export` consente l'accesso allo spazio dei nomi nei moduli "esterni".

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

