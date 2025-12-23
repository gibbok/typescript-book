---
title: Inferenza letterale
sidebar:
  order: 17
  label: 17. Inferenza letterale
---


L'inferenza letterale è una funzionalità di TypeScript che consente di dedurre il tipo di una variabile o di un parametro in base al suo valore.

Nell'esempio seguente possiamo vedere che TypeScript considera `x` un tipo letterale in quanto il valore non può essere modificato in seguito, mentre `y` viene dedotto come stringa in quanto può essere modificato in seguito.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, because we can change this value
```

Nell'esempio seguente possiamo vedere che `o.x` è stato dedotto come `string` (e non come un letterale di `a`), poiché TypeScript considera che il valore possa essere modificato in qualsiasi momento successivo.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Questa è una stringa più ampia
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // L'argomento di tipo 'string' non è assegnabile al parametro di tipo 'X'
```

Come puoi vedere, il codice genera un errore quando si passa `o.x` a `fn`, poiché X è un tipo più ristretto.

Possiamo risolvere questo problema utilizzando l'asserzione di tipo `const` o il tipo `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

oppure:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

