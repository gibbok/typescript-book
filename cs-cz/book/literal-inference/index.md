# Odvozování literálových typů



Odvozování literálových typů je funkce TypeScriptu, která umožňuje odvodit typ proměnné nebo parametru na základě jeho hodnoty.

V následujícím příkladu vidíme, že TypeScript považuje `x` za literálový typ, protože hodnotu již později nelze změnit, zatímco u `y` odvodí typ string, protože ji lze později kdykoli upravit.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

V následujícím příkladu vidíme, že typ `o.x` byl odvozen jako `string` (a nikoli jako literál `a`), protože TypeScript předpokládá, že hodnotu lze později kdykoli změnit.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Jak vidíte, kód při předání `o.x` do `fn` vyvolá chybu, protože X je užší typ.

Tento problém můžeme vyřešit přetypováním pomocí `const` nebo typu `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

nebo:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

