---
title: Analisi del flusso di controllo
sidebar:
  order: 22
  label: 22. Analisi del flusso di controllo
---


L'analisi del flusso di controllo in TypeScript è un modo per analizzare staticamente il flusso di codice per dedurre i tipi di variabili, consentendo al compilatore di restringere i tipi di tali variabili secondo necessità, in base ai risultati dell'analisi.

Prima di TypeScript 4.4, l'analisi del flusso di codice veniva applicata solo al codice all'interno di un'istruzione if, ma da TypeScript 4.4 può essere applicata anche alle espressioni condizionali e agli accessi alle proprietà discriminanti referenziati indirettamente tramite variabili const.

Ad esempio:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Alcuni esempi in cui il restringimento non avviene:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Errore, nessun restringimento perché isString non è costante
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Errore, nessun restringimento perché obj è assegnato nel corpo della funzione
    }
};
```

Note: Nelle espressioni condizionali vengono analizzati fino a cinque livelli di indirezione.

