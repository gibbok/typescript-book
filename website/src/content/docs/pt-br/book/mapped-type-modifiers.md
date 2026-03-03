---
title: Modificadores de Tipos Mapeados
sidebar:
  order: 38
  label: 38. Modificadores de Tipos Mapeados
---


Os Modificadores de Tipos Mapeados no TypeScript permitem a transformação de propriedades dentro de um tipo existente:

* `readonly` ou `+readonly`: Torna uma propriedade no tipo mapeado como somente leitura.
* `-readonly`: Permite que uma propriedade no tipo mapeado seja mutável.
* `?`: Designa uma propriedade no tipo mapeado como opcional.

Exemplos:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Todas as propriedades marcadas como somente leitura

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Todas as propriedades marcadas como mutáveis

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Todas as propriedades marcadas como opcionais
```

