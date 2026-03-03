---
title: Estendendo Tipos
sidebar:
  order: 15
  label: 15. Estendendo Tipos
---


É possível estender uma interface (copiar membros de outros tipos nomeados) usando a palavra-chave `extends`:

```typescript
interface X {
    a: string;
}

interface Y extends X {
    b: string;
}
```

Também é possível estender de múltiplos tipos:

```typescript
interface A {
    a: string;
}

interface B {
    b: string;
}

interface Y extends A, B {
    y: string;
}
```

A palavra-chave `extends` funciona apenas em interfaces e classes, para tipos use uma intersecção:

```typescript
type A = {
    a: number;
};

type B = {
    b: number;
};

type C = A & B;
```

Também é possível estender de uma interface com um tipo (usando intersecções):

```typescript
interface A {
    a: string;
}

type B = A & {
    b: number;
};
```

