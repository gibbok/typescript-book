---
title: Вывод литеральных типов
sidebar:
  order: 18
  label: 18. Вывод литеральных типов
---


Вывод литеральных типов — это возможность TypeScript выводить тип переменной или параметра на основе его значения.

В следующем примере видно, что TypeScript считает тип `x` литеральным, поскольку его значение нельзя изменить позднее, тогда как для `y` выводится тип string, поскольку его значение позднее можно изменить.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

В следующем примере видно, что для `o.x` был выведен тип `string` (а не литеральный тип `a`), поскольку TypeScript считает, что значение можно изменить позднее.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Как видно, при передаче `o.x` в `fn` возникает ошибка, поскольку X — более узкий тип.

Эту проблему можно решить с помощью утверждения типа `const` или `X`:

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

