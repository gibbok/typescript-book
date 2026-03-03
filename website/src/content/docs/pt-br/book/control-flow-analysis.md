---
title: Análise de Fluxo de Controle
sidebar:
  order: 22
  label: 22. Análise de Fluxo de Controle
---


Análise de fluxo de controle em TypeScript é o processo de determinação do tipo de uma variável em diferentes pontos de um programa baseado no fluxo de controle do código. Possibilita ao TypeScript entender como o tipo de uma variável muda quando diferentes branches de código são executadas.

Em TypeScript, a análise de fluxo de controle é realizada pelos "type guards", que são funções ou expressões que realizam uma verificação de tempo de execução em um tipo e garantem esse tipo em um escopo específico. Type guards podem ser usados para estreitar o tipo de uma variável dentro de uma branch condicional, e o TypeScript usará essa informação para fornecer verificação de tipo mais precisa.

```typescript
const f = (x: string | number) => {
    if (typeof x === 'string') {
        x.length; // x é string
    } else {
        x + 1; // x é number
    }
};
```

