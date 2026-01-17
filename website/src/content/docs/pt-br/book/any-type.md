---
title: Tipo Any
sidebar:
  order: 44
  label: 44. Tipo Any
---


O tipo `any` é um tipo especial (supertipo universal) que pode ser usado para representar qualquer tipo de valor (primitivos, objetos, arrays, funções, erros, símbolos). Ele é frequentemente usado em situações onde o tipo de um valor não é conhecido em tempo de compilação, ou ao trabalhar com valores de APIs externas ou bibliotecas que não possuem tipagens TypeScript.

Ao utilizar o tipo `any`, você está indicando ao compilador TypeScript que os valores devem ser representados sem quaisquer limitações. Para maximizar a segurança de tipos em seu código, considere o seguinte:

* Limite o uso de `any` a casos específicos onde o tipo é verdadeiramente desconhecido.
* Não retorne tipos `any` de uma função, pois você perderá a segurança de tipos no código que usa essa função, enfraquecendo sua segurança de tipos.
* Em vez de `any`, use `@ts-ignore` se você precisar silenciar o compilador.

```typescript
let value: any;
value = true; // Válido
value = 7; // Válido
```

