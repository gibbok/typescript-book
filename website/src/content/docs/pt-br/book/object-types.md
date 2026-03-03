---
title: Tipos de Objeto
sidebar:
  order: 27
  label: 27. Tipos de Objeto
---


No TypeScript, os tipos de objeto descrevem a forma de um objeto. Eles especificam os nomes e tipos das propriedades do objeto, bem como se essas propriedades são obrigatórias ou opcionais.

No TypeScript, você pode definir tipos de objeto de duas maneiras principais:

Interface, que define a forma de um objeto especificando os nomes, tipos e a opcionalidade de suas propriedades.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Apelido de tipo (type alias), semelhante a uma interface, define a forma de um objeto. No entanto, ele também pode criar um novo tipo personalizado baseado em um tipo existente ou em uma combinação de tipos existentes. Isso inclui definir tipos de união, tipos de interseção e outros tipos complexos.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Também é possível definir um tipo anonimamente:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

