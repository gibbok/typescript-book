---
title: Inferência de Tipo infer em Tipos Condicionais
sidebar:
  order: 41
  label: 41. Inferência de Tipo infer em Tipos Condicionais
---


A palavra-chave `infer` é usada em tipos condicionais para inferir (extrair) o tipo de um parâmetro genérico de um tipo que depende dele. Isso permite que você escreva definições de tipo mais flexíveis e reutilizáveis.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

