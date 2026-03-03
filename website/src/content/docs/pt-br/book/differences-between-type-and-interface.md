---
title: Diferenças entre Type e Interface
sidebar:
  order: 53
  label: 53. Diferenças entre Type e Interface
---


Mesclagem de declarações (aumento):

As interfaces suportam a mesclagem de declarações, o que significa que você pode definir várias interfaces com o mesmo nome, e o TypeScript as mesclará em uma única interface com as propriedades e métodos combinados. Por outro lado, os tipos (types) não suportam a mesclagem de declarações. Isso pode ser útil quando você deseja adicionar funcionalidades extras ou personalizar tipos existentes sem modificar as definições originais ou corrigir tipos ausentes ou incorretos.

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

Tanto tipos quanto interfaces podem estender outros tipos/interfaces, mas a sintaxe é diferente. Com as interfaces, você usa a palavra-chave `extends` para herdar propriedades e métodos de outras interfaces. No entanto, uma interface não pode estender um tipo complexo, como um tipo união.

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

Para tipos, você usa o operador `&` para combinar múltiplos tipos em um único tipo (interseção).

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

Tipos União e Interseção:

Os tipos (types) são mais flexíveis quando se trata de definir Tipos União e Interseção. Com a palavra-chave `type`, você pode criar facilmente tipos união usando o operador `|` e tipos interseção usando o operador `&`. Embora as interfaces também possam representar tipos união indiretamente, elas não possuem suporte integrado para tipos interseção.

```typescript
type Department = 'dep-x' | 'dep-y'; // União

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Interseção
```

Exemplo com interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // União de interfaces
```

