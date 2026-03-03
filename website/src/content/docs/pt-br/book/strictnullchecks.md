---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


Por padrão `null` e `undefined` são atribuíveis a todos os tipos, eles são ignorados pelo checker. É possível usar `--strictNullChecks` para impor que `null` e `undefined` sejam considerados ao fazer a verificação de tipo.

Ao usar a opção `strictNullChecks`, podem surgir erros que poderiam ser silenciados (sem a opção ativa). Ao usar o modo `strictNullChecks`, `null` e `undefined` têm seus próprios tipos chamados `null` e `undefined` respectivamente.

Em casos onde um valor pode ser de um tipo ou nulo/indefinido, você pode usar a união opcional:

```typescript
type X = string | null | undefined;
```

