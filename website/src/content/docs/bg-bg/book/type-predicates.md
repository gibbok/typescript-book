---
title: Анализ на потока на управление
sidebar:
  order: 23
  label: 23. Анализ на потока на управление
---


Анализът на потока на управление в TypeScript е начин за статичен анализ на потока на кода с цел извеждане на типовете на променливите, което позволява на компилатора да стеснява типовете на тези променливи при необходимост, базирайки се на резултатите от анализа.

Преди TypeScript 4.4, анализът на потока на кода се прилагаше само за код в рамките на if изрази, но от TypeScript 4.4 нататък той може да се прилага и за условни изрази и достъпи до дискриминантни свойства, косвено реферирани чрез const променливи.

Например:

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

Някои примери, при които не се наблюдава стесняване:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Грешка, няма стесняване, защото isString не е const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Грешка: няма стесняване, тъй като obj се присвоява в тялото на функцията
    }
};
```

Забележки: В условните изрази се анализират до пет нива на индирекция.

