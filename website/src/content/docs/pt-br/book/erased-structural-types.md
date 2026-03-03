---
title: Tipos Estruturais Apagados
sidebar:
  order: 56
  label: 56. Tipos Estruturais Apagados
---


No TypeScript, os objetos não precisam corresponder a um tipo exato e específico. Por exemplo, se criarmos um objeto que satisfaça os requisitos de uma interface, podemos utilizar esse objeto em locais onde essa interface é necessária, mesmo que não haja uma conexão explícita entre eles.
Exemplo:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Válido
```

