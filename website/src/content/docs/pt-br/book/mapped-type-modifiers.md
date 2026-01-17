---
title: Modificadores de Tipo Mapeado
sidebar:
  order: 38
  label: 38. Modificadores de Tipo Mapeado
---


Modificadores de Tipo Mapeado no TypeScript permitem a transformação de propriedades dentro de um tipo existente:

* `readonly` ou `+readonly`: Isso torna uma propriedade no tipo mapeado como somente leitura.
* `-readonly`: Isso permite que uma propriedade no tipo mapeado seja mutável.
* `?`: Isso designa uma propriedade no tipo mapeado como opcional.

Exemplos:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Todas as propriedades marcadas como somente leitura

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Todas as propriedades marcadas como mutáveis

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Todas as propriedades marcadas como opcionais
```

