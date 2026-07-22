---
title: Análisis del flujo de control
sidebar:
  order: 24
  label: 24. Análisis del flujo de control
---


El análisis del flujo de control de TypeScript analiza estáticamente el flujo del código para inferir los tipos de las variables, lo que permite al compilador restringirlos cuando sea necesario según los resultados.

Antes de TypeScript 4.4, el análisis del flujo solo se aplicaba al código dentro de una sentencia if; desde TypeScript 4.4 también puede aplicarse a expresiones condicionales y accesos a propiedades discriminantes referenciados indirectamente mediante variables const.

Por ejemplo:

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

Algunos ejemplos en los que no se produce la restricción:

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

Notas: en las expresiones condicionales se analizan hasta cinco niveles de indirección.

