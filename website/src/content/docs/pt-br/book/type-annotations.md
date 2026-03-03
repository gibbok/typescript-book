---
title: Anotações de Tipo
sidebar:
  order: 11
  label: 11. Anotações de Tipo
---


Em variáveis declaradas usando `var`, `let` e `const`, é possível adicionar opcionalmente um tipo:

```typescript
const x: number = 1;
```

O TypeScript faz um bom trabalho ao inferir tipos, especialmente quando são simples, portanto essas declarações, na maioria dos casos, não são necessárias.

Em funções, é possível adicionar anotações de tipo aos parâmetros:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

O seguinte é um exemplo usando funções anônimas (as chamadas funções lambda):

```typescript
const sum = (a: number, b: number) => a + b;
```

Essas anotações podem ser evitadas quando um valor padrão para um parâmetro está presente:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Anotações de tipo de retorno podem ser adicionadas às funções:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Isso é útil especialmente para funções mais complexas, pois escrever explicitamente o tipo de retorno antes de uma implementação pode ajudar a pensar melhor sobre a função.

Geralmente, considere anotar as assinaturas de tipo, mas não as variáveis locais do corpo, e sempre adicione tipos a objetos literais.

