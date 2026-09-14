---
title: Objektové typy
sidebar:
  order: 28
  label: 28. Objektové typy
---


Objektové typy v TypeScriptu popisují strukturu objektu. Určují názvy a typy jeho vlastností i to, zda jsou tyto vlastnosti povinné, nebo volitelné.

V TypeScriptu můžete objektové typy definovat dvěma hlavními způsoby:

Rozhraní definuje strukturu objektu určením názvů, typů a volitelnosti jeho vlastností.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Typový alias podobně jako rozhraní definuje strukturu objektu. Může však také vytvořit nový vlastní typ založený na existujícím typu nebo kombinaci existujících typů. To zahrnuje definování sjednocených typů, průnikových typů a dalších složitých typů.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Typ lze také definovat anonymně:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

