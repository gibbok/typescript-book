---
title: Literal Inference
sidebar:
  order: 17
  label: 17. Literal Inference
---


Literal inference е функционалност в TypeScript, която позволява типът на променлива или параметър да бъде изведен въз основа на стойността му.

В следния пример може да се види, че TypeScript счита `x` за literal type, тъй като стойността не може да бъде променяна по-късно, докато `y` се извежда като string, тъй като може да бъде променяна:

```typescript
const x = 'x'; // Типът на 'x' е literal type, тъй като тази стойност не може да бъде променена
let y = 'y'; // Типът е string, тъй като тази стойност може да бъде променена
```

В следния пример може да се види, че `o.x` е изведено като `string` (а не като literal на `a`), тъй като TypeScript счита, че стойността може да бъде променяна по-късно.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Това е по-широк тип string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Както се вижда, кодът хвърля грешка при подаване на `o.x` към `fn`, тъй като `X` е по-тесен тип.

Можем да решим този проблем чрез използване на type assertion с `const` или чрез типа `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

или:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

