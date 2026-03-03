---
title: Análise de Fluxo de Controle
sidebar:
  order: 22
  label: 22. Análise de Fluxo de Controle
---


A Análise de Fluxo de Controle (Control Flow Analysis) no TypeScript é uma forma de analisar estaticamente o fluxo do código para inferir os tipos das variáveis, permitindo que o compilador estreite os tipos dessas variáveis conforme necessário, com base nos resultados da análise.

Antes do TypeScript 4.4, a análise de fluxo de código só seria aplicada ao código dentro de uma instrução `if`, mas a partir do TypeScript 4.4, ela também pode ser aplicada a expressões condicionais e acessos a propriedades discriminantes referenciados indiretamente por meio de variáveis `const`.

Por exemplo:

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

Alguns exemplos onde o estreitamento não ocorre:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Erro, sem estreitamento porque isString não é const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Erro, sem estreitamento porque obj é atribuído no corpo da função
    }
};
```

Notas: Até cinco níveis de indireção são analisados em expressões condicionais.

