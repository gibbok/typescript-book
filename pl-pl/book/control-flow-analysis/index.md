# Analiza przepływu sterowania



Analiza przepływu sterowania w TypeScript to sposób statycznej analizy przepływu kodu w celu wywnioskowania typów zmiennych, co pozwala kompilatorowi zawężać typy tych zmiennych w razie potrzeby na podstawie wyników analizy.

Przed TypeScript 4.4 analiza przepływu kodu była stosowana tylko do kodu wewnątrz instrukcji `if`, ale od TypeScript 4.4 może być również stosowana do wyrażeń warunkowych i dostępów do właściwości dyskryminujących, do których pośrednio odwołują się zmienne `const`.

Na przykład:

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

Przykłady, w których zawężanie nie zachodzi:

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

Uwaga: W wyrażeniach warunkowych analizowanych jest do pięciu poziomów pośrednictwa.

