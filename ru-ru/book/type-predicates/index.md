# Предикаты типов



Предикаты типов в TypeScript — это функции, которые возвращают логическое значение и используются для сужения типа переменной до более конкретного типа.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 автоматически выводит предикаты типов (например, `x is T`) в таких функциях, как `.filter`, поэтому он понимает, когда отфильтровываются такие значения, как undefined. Это даёт более точные типы и меньше ошибок; такой вывод работает для однозначных проверок (например, `x !== undefined`), но не для неоднозначных, таких как `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

