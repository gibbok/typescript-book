---
title: Анализ потока управления
sidebar:
  order: 23
  label: 23. Анализ потока управления
---


Анализ потока управления в TypeScript — это способ статического анализа потока кода для вывода типов переменных, позволяющий компилятору при необходимости сужать типы этих переменных на основе результатов анализа.

До TypeScript 4.4 анализ потока управления применялся только к коду внутри инструкции if, но начиная с TypeScript 4.4 он также может применяться к условным выражениям и доступу к дискриминирующим свойствам, на которые косвенно ссылаются через переменные const.

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

Несколько примеров, в которых сужение не происходит:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Примечание: в условных выражениях анализируется до пяти уровней косвенности.

