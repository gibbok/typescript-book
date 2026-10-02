---
title: Tipo any
sidebar:
  order: 45
  label: 45. Tipo any
---


O tipo `any` é um tipo especial (supertipo universal) que pode ser usado para representar qualquer tipo de valor (primitivos, objetos, arrays, funções, erros, símbolos). É frequentemente usado em situações em que o tipo de um valor não é conhecido em tempo de compilação, ou ao trabalhar com valores de APIs externas ou bibliotecas que não possuem definições de tipos para TypeScript.

Ao utilizar o tipo `any`, você está indicando ao compilador TypeScript que os valores devem ser representados sem quaisquer limitações. Para maximizar a segurança de tipos em seu código, considere o seguinte:

* Limite o uso de `any` a casos específicos em que o tipo é realmente desconhecido.
* Não retorne tipos `any` de uma função, pois isso enfraquece a segurança de tipos no código que a utiliza.
* Em vez de `any`, use `@ts-ignore` se precisar silenciar o compilador.

```typescript
let value: any;
value = true; // Válido
value = 7; // Válido
```

