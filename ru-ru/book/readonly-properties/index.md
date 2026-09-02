# Свойства только для чтения



Запретить запись в свойство можно с помощью модификатора `readonly`, который гарантирует невозможность перезаписи свойства, но не обеспечивает полной неизменяемости:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

