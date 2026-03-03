---
title: Modificadores de Tipo Mapeado
sidebar:
  order: 38
  label: 38. Modificadores de Tipo Mapeado
---


Modificadores de tipo mapeado no TypeScript permitem controlar a mutabilidade e opcionalidade das propriedades ao criar novos tipos baseados em tipos existentes. Existem dois modificadores: `readonly` e `?` (opcional).

* `readonly`: Torna as propriedades imutáveis.
* `?`: Torna as propriedades opcionais.
* `-readonly`: Remove o modificador readonly.
* `-?`: Remove o modificador opcional.

```typescript
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};
```

