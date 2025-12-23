---
title: Tipi strutturali cancellati
sidebar:
  order: 56
  label: 56. Tipi strutturali cancellati
---


In TypeScript, gli oggetti non devono necessariamente corrispondere a un tipo specifico ed esatto. Ad esempio, se creiamo un oggetto che soddisfa i requisiti di un'interfaccia, possiamo utilizzare quell'oggetto nei punti in cui l'interfaccia è richiesta, anche se non esiste una connessione esplicita tra i due.
Esempio:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valido
```

