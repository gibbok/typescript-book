---
title: Diferencias entre tipo e interfaz
sidebar:
  order: 54
  label: 54. Diferencias entre tipo e interfaz
---


Combinación de declaraciones (ampliación):

Las interfaces admiten la combinación de declaraciones: pueden definirse varias con el mismo nombre y TypeScript las combina en una sola con todas sus propiedades y métodos. Los tipos, en cambio, no la admiten. Esto resulta útil para añadir funcionalidad o personalizar tipos existentes sin modificar las definiciones originales, o para corregir tipos ausentes o incorrectos.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Extender otros tipos o interfaces:

Tanto los tipos como las interfaces pueden extender otros tipos o interfaces, aunque la sintaxis es distinta. Las interfaces utilizan `extends` para heredar propiedades y métodos, pero no pueden extender tipos complejos como una unión.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Con los tipos se utiliza el operador & para combinar varios en uno solo (intersección).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Tipos de unión e intersección:

Los tipos son más flexibles al definir uniones e intersecciones. Con `type` pueden crearse fácilmente uniones mediante `|` e intersecciones mediante `&`. Las interfaces también pueden representar uniones indirectamente, pero no disponen de compatibilidad integrada con las intersecciones.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Ejemplo con interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

