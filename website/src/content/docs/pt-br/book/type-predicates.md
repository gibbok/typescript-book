---
title: Predicados de Tipo
sidebar:
  order: 23
  label: 23. Predicados de Tipo
---


Um predicado de tipo é uma função cujo tipo de retorno é um predicado, ela pode ser usada para realizar análise de fluxo de controle do tipo. Um predicado de tipo é definido retornando um tipo especial chamado "type predicate", que toma a forma `parameterName is Type`, onde "parameterName" deve ser o nome de um parâmetro da assinatura da função atual. Quando o predicado é avaliado com alguma variável, o TypeScript estreitará essa variável para o tipo específico, se o tipo original for compatível.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

Também é possível usar predicados de tipo em `filter`:

```typescript
const arr = [1, 2, 'a', 'b'];
const isString = (value: unknown): value is string => typeof value === 'string';
const strings = arr.filter(isString); // ['a', 'b']
```

