---
title: Kontrollflödesanalys
sidebar:
  order: 22
  label: 22. Kontrollflödesanalys
---


Kontrollflödesanalys i TypeScript är ett sätt att statiskt analysera kodflödet för att härleda typer av variabler, vilket gör det möjligt för kompilatorn att avsmalma typerna av dessa variabler efter behov, baserat på resultaten av analysen.

Före TypeScript 4.4 tillämpades kodflödesanalys enbart på kod inom en if-sats, men från och med TypeScript 4.4 kan den även tillämpas på villkorliga uttryck och diskriminantegenskapsåtkomster som indirekt refereras genom const-variabler.

Till exempel:

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

Några exempel där avsmalning inte sker:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Fel, ingen avsmalning eftersom isString inte är const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Fel, ingen avsmalning eftersom obj tilldelas i funktionskroppen
    }
};
```

Observera: Upp till fem nivåer av indirektion analyseras i villkorliga uttryck.

