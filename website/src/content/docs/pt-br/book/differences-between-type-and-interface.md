---
title: Diferenças entre Type e Interface
sidebar:
  order: 53
  label: 53. Diferenças entre Type e Interface
---


Mesclagem de declaração (augmentation):

Interfaces suportam mesclagem de declaração, o que significa que você pode definir múltiplas interfaces com o mesmo nome, e o TypeScript as mesclará em uma única interface com as propriedades e métodos combinados. Por outro lado, tipos não suportam mesclagem de declaração. Isso pode ser útil quando você deseja adicionar funcionalidade extra ou customizar tipos existentes sem modificar as definições originais ou corrigir tipos ausentes ou incorretos.

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

Estendendo outros tipos/interfaces:

Tanto tipos quanto interfaces podem estender outros tipos/interfaces, mas a sintaxe é diferente. Com interfaces, você usa a palavra-chave `extends` para herdar propriedades e métodos de outras interfaces. No entanto, uma interface não pode estender um tipo complexo como um tipo union.

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

Para tipos, você usa o operador & para combinar múltiplos tipos em um único tipo (interseção).

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

Tipos Union e Intersection:

Tipos são mais flexíveis quando se trata de definir Tipos Union e Intersection. Com a palavra-chave `type`, você pode facilmente criar tipos union usando o operador `|` e tipos intersection usando o operador `&`. Embora interfaces também possam representar tipos union indiretamente, elas não têm suporte integrado para tipos intersection.

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

Exemplo com interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union de interfaces
```

